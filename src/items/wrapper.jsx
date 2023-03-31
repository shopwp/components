import { useGetItemsQuery, useGetTemplateQuery } from "./item/api"
import { useSettingsState, useSettingsDispatch } from "./_state/settings/hooks"
import { useRequestsState, useRequestsDispatch } from "./_state/requests/hooks"
import { useItemsState } from "./_state/hooks"
import { useShopState, useShopDispatch } from "ShopState"
import { useFirstRender, useAction, usePortal } from "Hooks"
import { isTheSameObject } from "Common"
import Item from "./item"
import ItemsSkeleton from "./skeleton"
import isBase64 from "is-base64"

function ItemsWrapper({ settings, queryType, queryParams, element, children }) {
  const { useEffect } = wp.element

  const itemsState = useItemsState()
  const getTemplateQuery = useGetTemplateQuery()
  const getItemsQuery = useGetItemsQuery()
  const settingsState = useSettingsState()
  const settingsDispatch = useSettingsDispatch()
  const isFirstRender = useFirstRender()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()

  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const doShopHydrate = useAction("do.shopHydrate", null)

  useEffect(() => {
    if (isFirstRender || !settingsState) {
      return
    }

    if (isTheSameObject(settings, settingsState)) {
      console.info(
        "ShopWP :: Info :: Settings from outside are the same as internal settings, exiting ..."
      )
      return
    }

    if (isBase64(settings.htmlTemplateData)) {
      settings.htmlTemplateData = atob(settings.htmlTemplateData)
    }

    settingsDispatch({
      type: "SET_SETTINGS",
      payload: settings,
    })
  }, [settings])

  useEffect(() => {
    if (isFirstRender || !queryType) {
      return
    }

    if (queryType === requestsState.queryType) {
      console.info(
        "ShopWP :: Info :: The query type from outside is the same as internal type, exiting ..."
      )
      return
    }

    requestsDispatch({
      type: "SET_QUERY_TYPE",
      payload: queryType,
    })

    if (queryType !== "products") {
      requestsDispatch({
        type: "SET_WITH_PRODUCTS",
        payload: true,
      })
    } else {
      requestsDispatch({
        type: "SET_WITH_PRODUCTS",
        payload: false,
      })
    }
  }, [queryType])

  useEffect(() => {
    if (isFirstRender || !queryParams) {
      return
    }

    if (isTheSameObject(queryParams, requestsState.queryParams)) {
      console.info(
        "ShopWP :: Info :: Query params from outside are the same as internal params, exiting ..."
      )
      return
    }

    requestsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: queryParams,
    })

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })

    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: true,
    })
  }, [queryParams])

  useEffect(() => {
    if (isFirstRender || doShopHydrate === null || doShopHydrate === false) {
      return
    }

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })

    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: true,
    })
  }, [doShopHydrate])

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })

    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: true,
    })
  }, [shopState.buyerIdentity])

  return usePortal(
    <>
      {requestsState.isBootstrapping && itemsState.skeletonType ? (
        <ItemsSkeleton skeletonType={itemsState.skeletonType} />
      ) : (
        <Item>{children}</Item>
      )}
    </>,
    element
  )
}

export default ItemsWrapper
