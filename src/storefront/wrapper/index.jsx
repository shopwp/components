import { useFirstRender } from "@shopwp/hooks"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import {
  buildQueryStringFromSelections,
  getInitialSelections,
} from "@shopwp/common"

import forOwn from "lodash-es/forOwn"
import isEmpty from "lodash-es/isEmpty"

const SearchWrapper = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SearchWrapper-public' */ "../../search/wrapper")
)

const StorefrontSelections = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontSelections-public' */ "../selections")
)

const StorefrontOptions = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontOptions-public' */ "../options")
)

const StorefrontItems = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontItems-public' */ "../items")
)

function StorefrontWrapper() {
  const { useEffect, Suspense } = wp.element
  const isFirstRender = useFirstRender()

  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const storefrontState = useStorefrontState()
  const storefrontDispatch = useStorefrontDispatch()

  function setInitialSelections() {
    var initialSelections = getInitialSelections(settings)

    storefrontDispatch({
      type: "SET_INITIAL_SELECTIONS",
      payload: initialSelections,
    })

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
    if (storefrontState.hasSelections === false) {
      storefrontDispatch({ type: "CLEAR_SELECTIONS" })
    }
  }, [storefrontState.hasSelections])

  useEffect(() => {
    if (isFirstRender) {
      setInitialSelections()
      return
    }

    if (isEmpty(storefrontState.selections)) {
      storefrontDispatch({
        type: "SET_HAS_STOREFRONT_SELECTIONS",
        payload: false,
      })
    } else {
      storefrontDispatch({
        type: "SET_HAS_STOREFRONT_SELECTIONS",
        payload: true,
      })
    }

    if (
      storefrontState.hasSelections === false &&
      storefrontState.hasStorefrontSelections === false &&
      storefrontState.hasResults === false
    ) {
      return
    }

    if (storefrontState.searchQuery && isEmpty(storefrontState.selections)) {
      requestsDispatch({
        type: "SET_QUERY_PARAMS",
        payload: {
          ...requestsState.queryParams,
          query: storefrontState.searchQuery,
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
      <section
        id="shopwp-storefront"
        className="swp-storefront"
        data-is-fetching={requestsState.isFetchingNew}
      >
        <div className="swp-l-row">
          {settings.withSearch ? (
            <SearchWrapper
              hasStorefrontSelections={storefrontState.hasStorefrontSelections}
              withStorefront={true}
            />
          ) : null}
        </div>

        <div className="swp-storefront-selectors swp-l-row swp-l-row-between">
          {settings.showSelections ? <StorefrontSelections /> : null}
        </div>

        <div className="swp-l-row">
          <StorefrontOptions settings={settings} />

          {!storefrontState.searchQuery ? <StorefrontItems /> : null}
        </div>
      </section>
    </Suspense>
  )
}

export default StorefrontWrapper
