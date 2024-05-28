import { usePortal } from "@shopwp/hooks"
import { usePayloadState } from "../../items/_state/payload/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useRequestsState } from "../../items/_state/requests/hooks"
import Product from "../../products/product"
import Pagination from "../../pagination"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

function StorefrontItems() {
  const payload = usePayloadState()
  const settings = useSettingsState()
  const requestsState = useRequestsState()

  return usePortal(
    <div className="swp-storefront-items-wrapper">
      {payload && payload.length ? (
        <Pagination queryType="products" payload={payload}>
          <Product settings={settings} />
        </Pagination>
      ) : !requestsState.isBootstrapping ? (
        <Notice status="info">{settings.noResultsText}</Notice>
      ) : null}
    </div>,
    settings.dropzonePayload
  )
}

export default StorefrontItems
