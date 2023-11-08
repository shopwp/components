import { useGetItemsQuery, useGetTemplateQuery } from "./item/api"
import { useSettingsState, useSettingsDispatch } from "./_state/settings/hooks"
import { useRequestsState, useRequestsDispatch } from "./_state/requests/hooks"
import { useItemsState } from "./_state/hooks"
import { useShopState } from "@shopwp/components"
import { useFirstRender, useAction, usePortal } from "@shopwp/hooks"
import { isTheSameObject } from "@shopwp/common"
import Item from "./item"
import ItemsSkeleton from "./skeleton"
import isBase64 from "is-base64"

function ItemsWrapper({ settings, queryType, queryParams, element, children }) {
  const { useState, useEffect } = wp.element

  const [notice, setNotice] = useState(false)
  const itemsState = useItemsState()
  const getTemplateQuery = useGetTemplateQuery(setNotice)
  const getItemsQuery = useGetItemsQuery(setNotice)
  const settingsState = useSettingsState()
  const settingsDispatch = useSettingsDispatch()
  const isFirstRender = useFirstRender()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()

  const shopState = useShopState()
  const doShopHydrate = useAction("do.shopHydrate", null)

  useEffect(() => {
    if (isFirstRender || !settingsState) {
      return
    }

    if (isTheSameObject(settings, settingsState)) {
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
      {requestsState.isBootstrapping ? (
        <ItemsSkeleton skeletonType={itemsState.skeletonType} />
      ) : (
        <Item notice={notice} isFetchingNew={requestsState.isFetchingNew}>
          {children}
        </Item>
      )}
    </>,
    element
  )
}

export default ItemsWrapper
