/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import StorefrontFilterOptionsHeading from "../heading"
import { usePortal } from "Hooks"

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

function StorefrontOptionsWrapper({ settings, dropzoneHeading }) {
  const StorefrontSidebarCSS = css`
    margin-bottom: 200px;

    .wps-checkbox-wrapper {
      align-items: center;
      margin: 0;
      padding: 0 0 0 18px;

      &:hover {
        cursor: pointer;

        background-color: #f0f0f0;

        label,
        input {
          cursor: pointer;
        }
      }
    }

    .wps-input-value {
      opacity: 1;
      margin: 0;
      display: block;
      position: static;
      width: 16px;
      height: 16px;
      top: 0;

      [disabled],
      [disabled] + label {
        opacity: 0.5;

        &:hover {
          cursor: not-allowed;
        }
      }
    }

    .wps-input-label {
      display: flex;
      flex: 1;
      padding: 9px 0;

      span {
        flex: 1;
        text-transform: capitalize;
        margin-bottom: 0;
        margin-left: 0;
        padding: 0 0 0 10px;
        line-height: 1;
      }
    }
  `

  return usePortal(
    <>
      {settings.showOptionsHeading && (
        <StorefrontFilterOptionsHeading dropzone={dropzoneHeading} />
      )}
      <aside className="wps-storefront-sidebar" css={StorefrontSidebarCSS}>
        {settings.showCollections && <OptionCollections settings={settings} />}

        {settings.showPrice && <OptionPrice settings={settings} />}

        {settings.showTags && <OptionTags settings={settings} />}

        {settings.showVendors && <OptionVendors settings={settings} />}

        {settings.showTypes && <OptionTypes settings={settings} />}
      </aside>
    </>,
    settings.dropzoneOptions
  )
}

export default wp.element.memo(StorefrontOptionsWrapper)
