/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Products from "../../../products"
import { usePortal } from "@shopwp/hooks"
import { useItemsState } from "../../../items/_state/hooks"
import { useRequestsState } from "../../../items/_state/requests/hooks"
import { usePayloadState } from "../../../items/_state/payload/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

const SearchModal = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SearchModal-public' */ "../modal")
)

function SearchItems({ searchTerm, setSearchTerm, withStorefront = false }) {
  const requestsState = useRequestsState()
  const payload = usePayloadState()
  const settings = useSettingsState()

  return settings.dropzonePayload ? (
    usePortal(
      <>
        {payload.length ? (
          <Products
            settings={settings}
            payload={payload}
            queryParams={requestsState.queryParams}
          />
        ) : null}
      </>,
      settings.dropzonePayload
    )
  ) : !withStorefront ? (
    <SearchModal searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  ) : null
}

export default SearchItems
