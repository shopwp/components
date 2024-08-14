import {
  fetchProducts,
  fetchProductsByCollections,
  fetchCollections,
  getTemplate,
  maybeHandleApiError,
  maybeAlterErrorMessage,
} from "@shopwp/api"
import { to, findLastItem } from "@shopwp/common"
import { useRequestsState, useRequestsDispatch } from "../_state/requests/hooks"
import { useSettingsState, useSettingsDispatch } from "../_state/settings/hooks"
import { usePayloadDispatch } from "../_state/payload/hooks"
import { useShopState, useShopDispatch } from "@shopwp/components"
import isEmpty from "lodash-es/isEmpty"
import isBase64 from "is-base64"

function useGetItemsQuery(setNotice) {
  const { useEffect } = wp.element
  const requestsState = useRequestsState()
  const settings = useSettingsState()
  const requestsDispatch = useRequestsDispatch()
  const payloadDispatch = usePayloadDispatch()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()

  useEffect(() => {
    if (!requestsState.isFetchingNew) {
      return
    }

    wp.hooks.doAction("on.beforePayloadUpdate", requestsState)

    if (
      requestsState.queryType === "collectionProducts" ||
      (requestsState.queryType === "products" &&
        requestsState.queryParams.collection_titles)
    ) {
      fetchProductsByCollections(
        requestsState.queryParams,
        shopState,
        requestsState.cursor
      )
        .then((response) => {
          onSuccess(response)
        })
        .catch((err) => {
          onError(err)
        })
    } else if (requestsState.queryType === "collections") {
      fetchCollections(
        requestsState.queryParams,
        shopState,
        requestsState.cursor,
        requestsState.withProducts
      )
        .then((response) => {
          onSuccess(response)
        })
        .catch((err) => {
          onError(err)
        })
    } else {
      fetchProducts(requestsState.queryParams, shopState, requestsState.cursor)
        .then((response) => {
          onSuccess(response)
        })
        .catch((err) => {
          onError(err)
        })
    }
  }, [requestsState.isFetchingNew])

  function onError(error) {
    wp.hooks.doAction("on.afterPayloadUpdate", error)

    requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: false,
    })

    setNotice({
      type: "error",
      message: maybeAlterErrorMessage(error.message, shopState),
    })
  }

  function onSuccess(response) {
    if (!response) {
      return
    }

    const newItems = response

    var error = maybeHandleApiError(false, newItems)

    requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: false,
    })

    if (newItems.edges) {
      var totalShown = requestsState.totalShown + newItems.edges.length
    } else {
      var totalShown = requestsState.totalShown
    }

    wp.hooks.doAction("on.afterPayloadUpdate", newItems)

    const limit =
      requestsState.queryType === "collections"
        ? settings.collectionsLimit
        : settings.limit

    const pageSize =
      requestsState.queryType === "collections"
        ? settings.collectionsPageSize
        : settings.pageSize

    const pagination =
      requestsState.queryType === "collections"
        ? settings.collectionsPagination
        : settings.pagination

    if (error) {
      requestsDispatch({
        type: "UPDATE_TOTAL_SHOWN",
        payload: 0,
      })

      payloadDispatch({
        type: "UPDATE_PAYLOAD",
        payload: {
          items: [],
          replace: true,
          totalShown: totalShown,
          limit: limit,
          pageSize: pageSize,
          pagination: pagination,
          settings: settings,
        },
      })

      setNotice({
        type: "error",
        message: error,
      })

      return
    }

    if (
      !newItems ||
      isEmpty(newItems) ||
      (newItems.hasOwnProperty("edges") &&
        (!newItems.edges || !newItems.edges.length))
    ) {
      requestsDispatch({
        type: "UPDATE_TOTAL_SHOWN",
        payload: 0,
      })

      var toUpdate = {
        items: [],
        replace: true,
        totalShown: totalShown,
        limit: limit,
        pageSize: pageSize,
        pagination: pagination,
        settings: settings,
      }

      payloadDispatch({
        type: "UPDATE_PAYLOAD",
        payload: toUpdate,
      })

      setNotice({
        type: "warning",
        message: settings.noResultsText,
      })
    } else {
      if (!newItems.edges) {
        setNotice({
          type: "info",
          message: settings.noResultsText,
        })

        return
      }

      setNotice(false)

      var lastItem = findLastItem(newItems)

      requestsDispatch({
        type: "UPDATE_TOTAL_SHOWN",
        payload: newItems.edges.length,
      })

      // Sets the new translations if it has any
      // TODO: Move to the translator extension with a JS hook?
      if (newItems.hasOwnProperty("t")) {
        shopDispatch({
          type: "SET_TRANSLATIONS",
          payload: wp.hooks.applyFilters(
            "shop.textContent",
            newItems.t,
            shopState
          ),
        })
      }

      var toUpdate2 = {
        items: newItems.edges,
        replace: requestsState.isReplacing,
        totalShown: totalShown,
        limit: limit,
        pageSize: pageSize,
        pagination: pagination,
        settings: settings,
      }

      payloadDispatch({
        type: "UPDATE_PAYLOAD",
        payload: toUpdate2,
      })

      shopDispatch({
        type: "SET_PRODUCTS_VISIBLE",
        payload: true,
      })

      if (lastItem) {
        requestsDispatch({
          type: "SET_CURSOR",
          payload: lastItem.cursor,
        })
      }

      if (limit) {
        if (totalShown >= limit) {
          requestsDispatch({
            type: "SET_HAS_NEXT_PAGE",
            payload: false,
          })

          requestsDispatch({
            type: "SET_HAS_PREVIOUS_PAGE",
            payload: false,
          })

          return
        }
      }

      requestsDispatch({
        type: "SET_HAS_NEXT_PAGE",
        payload: newItems.pageInfo.hasNextPage,
      })

      requestsDispatch({
        type: "SET_HAS_PREVIOUS_PAGE",
        payload: newItems.pageInfo.hasPreviousPage,
      })
    }
  }
}

function useGetTemplateQuery(setNotice) {
  const { useEffect } = wp.element
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()
  const settingsState = useSettingsState()
  const settingsDispatch = useSettingsDispatch()

  async function getLayoutTemplate() {
    const [error, result] = await to(getTemplate(settingsState, shopState))

    var errMsg = maybeHandleApiError(error, result)

    if (errMsg) {
      setNotice({
        type: "error",
        message: errMsg,
      })

      requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
    }

    if (!result) {
      return
    }

    requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })

    if (isBase64(result.data)) {
      var temData = decodeURI(atob(result.data))
    } else {
      var temData = result.data
    }

    settingsDispatch({
      type: "UPDATE_HTML_TEMPLATE_DATA",
      payload: temData,
    })
  }

  useEffect(() => {
    if (!settingsState.htmlTemplate || settingsState.htmlTemplateData) {
      return
    }

    getLayoutTemplate()
  }, [settingsState.htmlTemplate, settingsState.htmlTemplateData])
}

export { useGetItemsQuery, useGetTemplateQuery }
