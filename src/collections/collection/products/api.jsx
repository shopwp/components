import {
  fetchProductsByCollections,
  queryOptionsNoRefetch,
  maybeHandleApiError,
} from "Api"

import { useQuery } from "@tanstack/react-query"
import { findLastItem } from "Common"

function useGetCollectionProductsQuery(
  state,
  dispatch,
  shopState,
  requestsDispatch,
  requestsState
) {
  return useQuery(
    [
      "fetchProductsByCollections",
      state.productQueryParams,
      requestsState.cursor,
    ],
    () => {
      dispatch({ type: "SET_IS_LOADING", payload: true })

      return fetchProductsByCollections(
        state.productQueryParams,
        shopState,
        requestsState.cursor
      )
    },
    {
      enabled: state.isFetchingNew,
      retry: false,
      onError: (error) => {
        dispatch({ type: "SET_IS_LOADING", payload: false })
        dispatch({
          type: "SET_IS_FETCHING_NEW",
          payload: false,
        })

        console.error("ShopWP fetchProductsByCollections Error", error)
      },
      onSuccess: (newItems) => {
        if (newItems.pageInfo) {
          requestsDispatch({
            type: "SET_HAS_NEXT_PAGE",
            payload: newItems.pageInfo.hasNextPage,
          })

          dispatch({
            type: "SET_PRODUCTS_HAS_NEXT_PAGE",
            payload: newItems.pageInfo.hasNextPage,
          })
        }

        dispatch({ type: "SET_IS_LOADING", payload: false })

        requestsDispatch({
          type: "SET_IS_FETCHING_NEW",
          payload: false,
        })

        var error = maybeHandleApiError(false, newItems, dispatch)

        if (error) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: {
              products: [],
              replace: true,
            },
          })
          return
        }

        if (newItems && newItems.edges.length) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: {
              products: newItems.edges,
              replace: state.shouldReplace,
            },
          })

          var lastItem = findLastItem(newItems)

          if (lastItem) {
            requestsDispatch({
              type: "SET_CURSOR",
              payload: lastItem.cursor,
            })
          }
        }
      },
      ...queryOptionsNoRefetch,
    }
  )
}

export { useGetCollectionProductsQuery }
