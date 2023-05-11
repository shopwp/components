/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { findDefaultSelectVal, updateQueryParamsWithSort } from "@shopwp/common"
import { useCollectionState, useCollectionDispatch } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useRequestsState } from "../../../items/_state/requests/hooks"
import { useShopState } from "@shopwp/components"

const Select = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../../select")
)

function CollectionSorting() {
  const { Suspense } = wp.element
  const collectionDispatch = useCollectionDispatch()
  const collectionState = useCollectionState()
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const shopState = useShopState()

  const CollectionsSortingWrapperCSS = css`
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

  const options = [
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
      label: shopState.t.l.recentlyUpdated,
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

  function customOnChange(data) {
    const params = updateQueryParamsWithSort(data.value)

    const finalNewParams = {
      ...collectionState.productQueryParams,
      ...params,
    }

    collectionDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    collectionDispatch({
      type: "SET_PRODUCT_QUERY_PARAMS",
      payload: finalNewParams,
    })

    collectionDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: true,
    })

    collectionDispatch({
      type: "SET_SHOULD_REPLACE",
      payload: true,
    })
  }

  return (
    <div css={CollectionsSortingWrapperCSS}>
      <Suspense fallback="Loading ...">
        <Select
          items={options}
          onChange={customOnChange}
          label={shopState.t.l.sort}
          selectedOption={findDefaultSelectVal(
            options,
            settings.sortBy,
            settings.reverse
          )}
          id="swp-collections-sorting"
          isBusy={requestsState.isFetchingNew}
        />
      </Suspense>
    </div>
  )
}

export default CollectionSorting
