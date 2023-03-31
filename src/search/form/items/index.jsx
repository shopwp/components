/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Products from "../../../products"
import { usePortal } from "Hooks"
import { useSearchState } from "../../_state/hooks"
import { useItemsState } from "../../../items/_state/hooks"
import { useRequestsState } from "../../../items/_state/requests/hooks"
import { usePayloadState } from "../../../items/_state/payload/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useShopState } from "ShopState"

const SearchModal = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SearchModal-public' */ "../modal")
)

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

function SearchItems() {
  const searchState = useSearchState()
  const itemsState = useItemsState()
  const requestsState = useRequestsState()
  const payload = usePayloadState()
  const settings = useSettingsState()
  const shopState = useShopState()

  return settings.dropzonePayload ? (
    usePortal(
      <>
        {searchState.searchTerm && payload ? (
          payload.length === 0 && requestsState.isFetchingNew === false ? (
            itemsState.componentType !== "storefront" ? (
              <Notice status="info">{shopState.t.n.noItemsLeft}</Notice>
            ) : null
          ) : (
            <Products
              settings={settings}
              payload={payload}
              queryParams={requestsState.queryParams}
            />
          )
        ) : null}
      </>,
      settings.dropzonePayload
    )
  ) : (
    <SearchModal searchTerm={searchState.searchTerm} />
  )
}

export default SearchItems
