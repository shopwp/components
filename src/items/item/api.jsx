import {
  fetchProducts,
  fetchProductsByCollections,
  fetchCollections,
  getTemplate,
  queryOptionsNoRefetch,
  queryOptionsWithRefetch,
  maybeHandleApiError,
} from "@shopwp/api"

import { findLastItem } from "@shopwp/common"
import { useQuery } from "@tanstack/react-query"
import isEmpty from "lodash-es/isEmpty"

import useIsMounted from "ismounted"
import { useRequestsState, useRequestsDispatch } from "../_state/requests/hooks"
import { useSettingsState, useSettingsDispatch } from "../_state/settings/hooks"
import { usePayloadDispatch } from "../_state/payload/hooks"
import { useShopState, useShopDispatch } from "@shopwp/components"
import isBase64 from "is-base64"

function useGetItemsQuery(setNotice) {
  const requestsState = useRequestsState()
  const settings = useSettingsState()
  const requestsDispatch = useRequestsDispatch()
  const payloadDispatch = usePayloadDispatch()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const isMounted = useIsMounted()

  var options = requestsState.cursor
    ? queryOptionsNoRefetch
    : queryOptionsWithRefetch

  return useQuery(
    [
      requestsState.queryType,
      requestsState.queryParams,
      shopState.buyerIdentity,
    ],
    () => {
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
    {
      enabled: requestsState.isFetchingNew,
      retry: false,
      suspense: false,
      onError: (error) => {
        wp.hooks.doAction("on.afterPayloadUpdate", error)
        if (isMounted.current) {
          requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
          requestsDispatch({
            type: "SET_IS_FETCHING_NEW",
            payload: false,
          })

          setNotice({
            type: "error",
            message: error.message,
          })
        }
      },
      onSuccess: (newItems) => {
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

        if (isMounted.current) {
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
        }
      },
      ...options,
    }
  )
}

function useGetTemplateQuery(setNotice) {
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()
  const settingsState = useSettingsState()
  const settingsDispatch = useSettingsDispatch()

  return useQuery(
    ["templates"],
    () => {
      return getTemplate(settingsState, shopState)
    },
    {
      enabled: !!settingsState.htmlTemplate && !settingsState.htmlTemplateData,
      onError: (error) => {
        setNotice({
          type: "error",
          message: error,
        })

        requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
      },
      onSuccess: (template) => {
        requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })

        if (template.success === false) {
          setNotice({
            type: "error",
            message: template.data,
          })
        } else {
          if (isBase64(template.data)) {
            var temData = atob(template.data)
          } else {
            var temData = template.data
          }

          settingsDispatch({
            type: "UPDATE_HTML_TEMPLATE_DATA",
            payload: temData,
          })
        }
      },
      ...queryOptionsNoRefetch,
    }
  )
}

export { useGetItemsQuery, useGetTemplateQuery }
