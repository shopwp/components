/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import StorefrontFilterOptionsHeading from "../heading"
import { usePortal } from "@shopwp/hooks"
import { mq } from "@shopwp/common"

const OptionCollections = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'OptionCollections-public' */ "../option-collections"
  )
)

const OptionTags = wp.element.lazy(() =>
  import(/* webpackChunkName: 'OptionTags-public' */ "../option-tags")
)

const OptionTypes = wp.element.lazy(() =>
  import(/* webpackChunkName: 'OptionTypes-public' */ "../option-types")
)

const OptionVendors = wp.element.lazy(() =>
  import(/* webpackChunkName: 'OptionVendors-public' */ "../option-vendors")
)

const OptionPrice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'OptionPrice-public' */ "../option-price")
)

function StorefrontOptionsWrapper({ settings }) {
  const StorefrontSidebarCSS = css``
  const StorefrontOptionsCSS = css``
  const StorefrontOptionsWrapperCSS = css``

  return usePortal(
    <div
      className="swp-storefront-options-wrapper"
      css={StorefrontOptionsWrapperCSS}
    >
      <div
        id="shopwp-storefront-options"
        className="swp-storefront-options"
        css={StorefrontOptionsCSS}
      >
        {settings.showOptionsHeading ? (
          <StorefrontFilterOptionsHeading settings={settings} />
        ) : null}
        <aside
          className="swp-storefront-sidebar wps-storefront-sidebar"
          css={StorefrontSidebarCSS}
        >
          {settings.showTags ? <OptionTags settings={settings} /> : null}
          {settings.showVendors ? <OptionVendors settings={settings} /> : null}
          {settings.showTypes ? <OptionTypes settings={settings} /> : null}
          {settings.showCollections ? (
            <OptionCollections settings={settings} />
          ) : null}
          {settings.showPrice ? <OptionPrice settings={settings} /> : null}
        </aside>
      </div>
    </div>,
    settings.dropzoneOptions
  )
}

export default StorefrontOptionsWrapper
