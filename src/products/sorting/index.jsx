/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { findDefaultSelectVal, updateQueryParamsWithSort } from "@shopwp/common"

import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { usePortal } from "@shopwp/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useItemsState } from "../../items/_state/hooks"
import { useShopState } from "@shopwp/components"

const Select = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../select")
)

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function ProductsSorting() {
  const { Suspense } = wp.element
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const settings = useSettingsState()
  const itemsState = useItemsState()
  const shopState = useShopState()

  const sortingWrapperCSS = css`
    width: 100%;
    max-width: 270px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 20px;
    align-items: baseline;

    #swp-collections-sorting *:hover {
      cursor: pointer;
    }
  `

  const collectionOptions = [
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
  ]

  const productOptions = [
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
  ]

  function customOnChange(data) {
    const params = updateQueryParamsWithSort(data.value)

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

  return (settings.withSorting && !requestsState.isBootstrapping) ||
    (settings.showSorting && itemsState.componentType === "storefront")
    ? usePortal(
        <Suspense fallback="Loading ...">
          <div css={sortingWrapperCSS}>
            <Select
              items={
                requestsState.queryType !== "products"
                  ? collectionOptions
                  : productOptions
              }
              onChange={customOnChange}
              label={shopState.t.l.sort}
              selectedOption={findDefaultSelectVal(
                requestsState.queryType !== "products"
                  ? collectionOptions
                  : productOptions,
                settings.sortBy,
                settings.reverse
              )}
              id="swp-products-sorting"
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
