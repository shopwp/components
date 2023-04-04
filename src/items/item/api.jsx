import {
  fetchProducts,
  fetchProductsByCollections,
  fetchCollections,
  getTemplate,
  queryOptionsNoRefetch,
  queryOptionsWithRefetch,
  maybeHandleApiError,
} from "@shopwp/api"

import { removeSkelly, findLastItem } from "@shopwp/common"
import { useQuery } from "@tanstack/react-query"
import isEmpty from "lodash/isEmpty"
import has from "lodash/has"

import useIsMounted from "ismounted"
import { useRequestsState, useRequestsDispatch } from "../_state/requests/hooks"
import { useSettingsState, useSettingsDispatch } from "../_state/settings/hooks"
import { usePayloadDispatch } from "../_state/payload/hooks"
import { useItemsState, useItemsDispatch } from "../_state/hooks"
import { useShopState, useShopDispatch } from "@shopwp/components"
import isBase64 from "is-base64"

function useGetItemsQuery() {
  const requestsState = useRequestsState()
  const settings = useSettingsState()
  const requestsDispatch = useRequestsDispatch()
  const payloadDispatch = usePayloadDispatch()
  const { element, notice } = useItemsState()
  const itemsDispatch = useItemsDispatch()
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
          requestsState.withProducts,
          requestsState.productQueryParams
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
        if (isMounted.current) {
          requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
          requestsDispatch({
            type: "SET_IS_FETCHING_NEW",
            payload: false,
          })

          removeSkelly(element)

          itemsDispatch({
            type: "SET_NOTICE",
            payload: {
              type: "error",
              message: error.message,
            },
          })
        }
      },
      onSuccess: (newItems) => {
        var error = maybeHandleApiError(false, newItems, itemsDispatch)

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

        if (error) {
          requestsDispatch({
            type: "UPDATE_TOTAL_SHOWN",
            payload: 0,
          })

          payloadDispatch({
            type: "UPDATE_PAYLOAD",
            payload: {
              items: [],
              replace: requestsState.isReplacing,
              totalShown: totalShown,
              limit: settings.limit,
              settings: settings,
            },
          })

          itemsDispatch({
            type: "SET_NOTICE",
            payload: {
              type: "error",
              message: error,
            },
          })

          removeSkelly(element)

          return
        }

        if (isMounted.current) {
          if (
            !newItems ||
            isEmpty(newItems) ||
            (has(newItems, "edges") &&
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
                replace: requestsState.isReplacing,
                totalShown: totalShown,
                limit: settings.limit,
                settings: settings,
              },
            })

            itemsDispatch({
              type: "SET_NOTICE",
              payload: {
                type: "warning",
                message: shopState.t.n.noItemsLeft,
              },
            })

            removeSkelly(element)
          } else {
            if (!newItems.edges) {
              itemsDispatch({
                type: "SET_NOTICE",
                payload: {
                  type: "info",
                  message: shopState.t.n.noItemsLeft,
                },
              })

              return
            }

            var lastItem = findLastItem(newItems)

            requestsDispatch({
              type: "UPDATE_TOTAL_SHOWN",
              payload: newItems.edges.length,
            })

            // Sets the new translations if it has any
            // TODO: Move to the translator extension with a JS hook?
            if (has(newItems, "t")) {
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
                limit: settings.limit,
                settings: settings,
              },
            })

            if (lastItem) {
              requestsDispatch({
                type: "SET_CURSOR",
                payload: lastItem.cursor,
              })
            }

            if (settings.limit) {
              if (totalShown >= settings.limit) {
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

function useGetTemplateQuery() {
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()
  const settingsState = useSettingsState()
  const settingsDispatch = useSettingsDispatch()
  const itemsDispatch = useItemsDispatch()

  return useQuery(
    ["templates"],
    () => {
      return getTemplate(settingsState, shopState)
    },
    {
      enabled: !!settingsState.htmlTemplate && !settingsState.htmlTemplateData,
      onError: (error) => {
        itemsDispatch({
          type: "SET_NOTICE",
          payload: {
            type: "error",
            message: error,
          },
        })

        requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })
      },
      onSuccess: (template) => {
        requestsDispatch({ type: "SET_IS_BOOTSTRAPPING", payload: false })

        if (template.success === false) {
          itemsDispatch({
            type: "SET_NOTICE",
            payload: {
              type: "error",
              message: template.data,
            },
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
