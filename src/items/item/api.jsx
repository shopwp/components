import {
  fetchProducts,
  fetchProductsByCollections,
  fetchCollections,
  getTemplate,
  queryOptionsNoRefetch,
  queryOptionsWithRefetch,
  maybeHandleApiError,
  maybeAlterErrorMessage,
} from "@shopwp/api"

import { findLastItem } from "@shopwp/common"
import { useQuery } from "@tanstack/react-query"
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

  var options = requestsState.cursor
    ? queryOptionsNoRefetch
    : queryOptionsWithRefetch

  const query = useQuery({
    queryKey: [
      requestsState.queryType,
      requestsState.queryParams,
      shopState.buyerIdentity,
    ],
    queryFn: () => {
      wp.hooks.doAction("on.beforePayloadUpdate", requestsState)

      if (
        requestsState.queryType === "collectionProducts" ||
        (requestsState.queryType === "products" &&
          requestsState.queryParams.collection_titles)
      ) {
        return fetchProductsByCollections(
          requestsState.queryParams,
          shopState,
          requestsState.cursor
        )
      } else if (requestsState.queryType === "collections") {
        return fetchCollections(
          requestsState.queryParams,
          shopState,
          requestsState.cursor,
          requestsState.withProducts
        )
      } else {
        return fetchProducts(
          requestsState.queryParams,
          shopState,
          requestsState.cursor
        )
      }
    },
    enabled: requestsState.isFetchingNew,
    retry: false,
    suspense: false,
    ...options,
  })

  useEffect(() => {
    if (!query.error) {
      return
    }

    wp.hooks.doAction("on.afterPayloadUpdate", query.error)

    requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: false,
    })

    setNotice({
      type: "error",
      message: maybeAlterErrorMessage(query.error.message, shopState),
    })
  }, [query.error])

  useEffect(() => {
    if (!query.data) {
      return
    }

    const newItems = query.data

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
        message: maybeAlterErrorMessage(error, shopState),
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

      payloadDispatch({
        type: "UPDATE_PAYLOAD",
        payload: {
          items: newItems.edges,
          replace: requestsState.isReplacing,
          totalShown: totalShown,
          limit: limit,
          pageSize: pageSize,
          pagination: pagination,
          settings: settings,
        },
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
  }, [query.data])
}

function useGetTemplateQuery(setNotice) {
  const { useEffect } = wp.element
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()
  const settingsState = useSettingsState()
  const settingsDispatch = useSettingsDispatch()

  const query = useQuery({
    queryKey: ["templates"],
    queryFn: () => {
      return getTemplate(settingsState, shopState)
    },
    enabled: !!settingsState.htmlTemplate && !settingsState.htmlTemplateData,
    ...queryOptionsNoRefetch,
  })

  useEffect(() => {
    if (!query.error) {
      return
    }
    setNotice({
      type: "error",
      message: maybeAlterErrorMessage(query.error, shopState),
    })

    requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
  }, [query.error])

  useEffect(() => {
    if (!query.data) {
      return
    }

    requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })

    if (query.data.success === false) {
      setNotice({
        type: "error",
        message: maybeAlterErrorMessage(query.data.data, shopState),
      })
    } else {
      if (isBase64(query.data.data)) {
        var temData = atob(query.data.data)
      } else {
        var temData = query.data.data
      }

      settingsDispatch({
        type: "UPDATE_HTML_TEMPLATE_DATA",
        payload: temData,
      })
    }
  }, query.data)
}

export { useGetItemsQuery, useGetTemplateQuery }
