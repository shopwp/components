/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Selects from "../../storefront/selects"
import { findDefaultSelectVal, updateQueryParamsWithSort } from "@shopwp/common"
import Loader from "../../loader"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { usePortal } from "@shopwp/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useItemsState } from "../../items/_state/hooks"
import { useShopState } from "@shopwp/components"

function ProductsSorting() {
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const settings = useSettingsState()
  const itemsState = useItemsState()
  const shopState = useShopState()

  const sortingWrapperCSS = css`
    width: 100%;
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
        <div css={sortingWrapperCSS}>
          {requestsState.isFetchingNew ? <Loader color="#000" /> : null}
          <Selects
            labelText={shopState.t.l.sort}
            selectId="swp-products-sorting"
            options={
              requestsState.queryType !== "products"
                ? collectionOptions
                : productOptions
            }
            customOnChange={customOnChange}
            defaultValue={findDefaultSelectVal(
              requestsState.queryType !== "products"
                ? collectionOptions
                : productOptions,
              settings.sortBy,
              settings.reverse
            )}
            isLoading={requestsState.isFetchingNew}
          />
        </div>,
        settings.dropzoneSorting
      )
    : null
}

export default ProductsSorting
