/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import Product from "../../products/product"
import Pagination from "../../pagination"
import { usePayloadState } from "../../items/_state/payload/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useRequestsState } from "../../items/_state/requests/hooks"
import { removeSkelly } from "@shopwp/common"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

function StorefrontItems() {
  const payload = usePayloadState()
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const { useEffect, useState } = wp.element
  const [removedSkelly, setRemovedSkelly] = useState(false)

  settings.withSorting = false

  const noticeCSS = css`
    && {
      margin-left: 40px;
      margin-top: 0;
    }
  `

  const storefrontItemsWrapperCSS = css`
    position: relative;
  `

  useEffect(() => {
    if (payload.length && !removedSkelly) {
      removeSkelly(document.getElementById("shopwp-storefront"))
      setRemovedSkelly(true)
    }
  }, [payload])

  return usePortal(
    <div css={storefrontItemsWrapperCSS}>
      {payload && payload.length ? (
        <Pagination queryType="products" payload={payload}>
          <Product settings={settings} />
        </Pagination>
      ) : !requestsState.isBootstrapping ? (
        <Notice css={noticeCSS} status="info">
          {settings.noResultsText}
        </Notice>
      ) : null}
    </div>,
    settings.dropzonePayload
  )
}

export default StorefrontItems
