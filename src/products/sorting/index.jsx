/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { findDefaultSelectVal, updateQueryParamsWithSort } from "@shopwp/common"

import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { usePortal } from "@shopwp/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useShopState } from "@shopwp/components"

const Dropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../select")
)

function ProductsSorting() {
  const { Suspense } = wp.element
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const settings = useSettingsState()
  const shopState = useShopState()

  const sortingWrapperCSS = css``

  var collectionOptions = wp.hooks.applyFilters("collections.sortingOptions", [
    {
      label: shopState.t.l.titleDes,
      value: "TITLE",
    },
    {
      label: shopState.t.l.titleAsc,
      value: "TITLE-REVERSE",
    },
    {
      label: shopState.t.l.priceLowToHigh,
      value: "PRICE",
    },
    {
      label: shopState.t.l.priceHighToLow,
      value: "PRICE-REVERSE",
    },
    {
      label: shopState.t.l.bestSelling,
      value: "BEST_SELLING",
    },
    {
      label: shopState.t.l.recentlyAdded,
      value: "CREATED",
    },
    {
      label: shopState.t.l.collectionDefault,
      value: "COLLECTION_DEFAULT",
    },
    {
      label: shopState.t.l.collectionManual,
      value: "MANUAL",
    },
  ])

  var collectionOptionsNew = collectionOptions.map((o) => {
    return {
      label: o.value,
      value: o.label,
    }
  })

  var productOptions = wp.hooks.applyFilters("product.sortingOptions", [
    {
      label: shopState.t.l.titleDes,
      value: "TITLE",
    },
    {
      label: shopState.t.l.titleAsc,
      value: "TITLE-REVERSE",
    },
    {
      label: shopState.t.l.priceLowToHigh,
      value: "PRICE",
    },
    {
      label: shopState.t.l.priceHighToLow,
      value: "PRICE-REVERSE",
    },
    {
      label: shopState.t.l.bestSelling,
      value: "BEST_SELLING",
    },
    {
      label: shopState.t.l.recentlyAdded,
      value: "CREATED_AT",
    },
    {
      label: shopState.t.l.recentlyUpdated,
      value: "UPDATED_AT",
    },
    {
      label: shopState.t.l.productType,
      value: "PRODUCT_TYPE",
    },
    {
      label: shopState.t.l.productVendor,
      value: "VENDOR",
    },
  ])

  var productOptionsNew = productOptions.map((o) => {
    return {
      label: o.value,
      value: o.label,
    }
  })

  function customOnChange(data) {
    const params = updateQueryParamsWithSort(data.label)

    requestsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: {
        ...requestsState.queryParams,
        ...params,
      },
    })

    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: true,
    })
  }

  return settings.withSorting && !requestsState.isBootstrapping
    ? usePortal(
        <Suspense fallback="Loading sorting dropdown ...">
          <div id="shopwp-storefront-sorting" css={sortingWrapperCSS}>
            <Dropdown
              settings={settings}
              items={
                requestsState.queryType !== "products"
                  ? collectionOptionsNew
                  : productOptionsNew
              }
              onChange={customOnChange}
              label={settings.sortByLabelText}
              selectedOption={findDefaultSelectVal(
                requestsState.queryType !== "products"
                  ? collectionOptionsNew
                  : productOptionsNew,
                settings.sortBy,
                settings.reverse
              )}
              isBusy={requestsState.isFetchingNew}
              inline={true}
            />
          </div>
        </Suspense>,
        settings.dropzoneSorting
      )
    : null
}

export default ProductsSorting
