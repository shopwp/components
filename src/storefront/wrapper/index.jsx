/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useFirstRender } from "Hooks"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import { useItemsState, useItemsDispatch } from "../../items/_state/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import {
  buildQueryStringFromSelections,
  getInitialSelections,
  removeSkelly,
} from "Common"

import forOwn from "lodash/forOwn"
import isEmpty from "lodash/isEmpty"

const SearchWrapper = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SearchWrapper-public' */ "../../search/wrapper")
)

const StorefrontSelections = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontSelections-public' */ "../selections")
)

const StorefrontOptions = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontOptions-public' */ "../options")
)

const StorefrontPageSize = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontPageSize-public' */ "../page-size")
)

const StorefrontItems = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontItems-public' */ "../items")
)

function StorefrontWrapper() {
  const { useEffect, Suspense } = wp.element
  const isFirstRender = useFirstRender()

  const itemsState = useItemsState()
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const itemsDispatch = useItemsDispatch()
  const storefrontState = useStorefrontState()
  const storefrontDispatch = useStorefrontDispatch()

  useEffect(() => {
    if (itemsState.searchQuery) {
      storefrontDispatch({ type: "CLEAR_SELECTIONS" })
    } else {
      if (isEmpty(storefrontState.selections)) {
        requestsDispatch({
          type: "RESET_QUERY_PARAMS",
        })

        requestsDispatch({
          type: "SET_IS_FETCHING_NEW",
          payload: true,
        })
      }
    }
  }, [itemsState.searchQuery])

  function setInitialSelections() {
    var initialSelections = getInitialSelections(settings)

    storefrontDispatch({
      type: "SET_SELECTIONS",
      payload: initialSelections,
    })

    forOwn(initialSelections, function (value, key) {
      if (key !== "available_for_sale" && key !== "availableForSale") {
        storefrontDispatch({
          type: "SET_SELECTED_" + String(key).toUpperCase(),
          payload: value,
        })
      }
    })
  }

  useEffect(() => {
    if (isFirstRender) {
      setInitialSelections()

      if (itemsState.element) {
        removeSkelly(itemsState.element)
      }

      return
    }

    if (isEmpty(storefrontState.selections)) {
      itemsDispatch({ type: "SET_HAS_STOREFRONT_SELECTIONS", payload: false })
    } else {
      itemsDispatch({ type: "SET_HAS_STOREFRONT_SELECTIONS", payload: true })
    }

    if (itemsState.searchQuery && isEmpty(storefrontState.selections)) {
      requestsDispatch({
        type: "SET_QUERY_PARAMS",
        payload: {
          ...requestsState.queryParams,
          query: itemsState.searchQuery,
        },
      })

      requestsDispatch({
        type: "SET_IS_FETCHING_NEW",
        payload: true,
      })

      return
    }

    if (storefrontState.selections?.collections) {
      requestsDispatch({
        type: "SET_QUERY_TYPE",
        payload: "collectionProducts",
      })

      requestsDispatch({
        type: "RESET_QUERY_PARAMS",
      })

      if (!isEmpty(storefrontState.selections?.collections)) {
        requestsDispatch({
          type: "SET_QUERY_PARAMS",
          payload: {
            ...requestsState.queryParams,
            ids: storefrontState.selections.collections,
          },
        })
      }
    } else {
      requestsDispatch({ type: "SET_QUERY_TYPE", payload: "products" })

      requestsDispatch({
        type: "SET_QUERY_PARAMS",
        payload: {
          ...requestsState.queryParams,
          query: buildQueryStringFromSelections(
            storefrontState.selections,
            settings
          ),
        },
      })
    }

    if (!storefrontState.hasSelections) {
      requestsDispatch({ type: "SET_QUERY_TYPE", payload: "products" })
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
  }, [storefrontState.selections])

  return (
    <Suspense fallback={false}>
      {settings.showSearch ? <SearchWrapper /> : null}
      {settings.dropzoneSelections ? <StorefrontSelections /> : null}
      {settings.showPagination ? <StorefrontPageSize /> : null}

      <StorefrontOptions settings={settings} />

      {!itemsState.searchQuery ? <StorefrontItems /> : null}
    </Suspense>
  )
}

export default StorefrontWrapper
