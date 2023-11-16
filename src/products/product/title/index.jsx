/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { FilterHook } from "@shopwp/common"
import { hasLink } from "@shopwp/common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useProductState } from "../_state/hooks"
import Link from "../../../link"

function ProductTitle() {
  const settings = useSettingsState()
  const productState = useProductState()

  const titleStylesWrapper = css``

  return usePortal(
    <div
      className="swp-component wps-component wps-component-products-title"
      aria-label={productState.payload.title + " product title"}
      data-wps-component-order="0"
      data-is-single-component={settings.isSingleComponent}
      css={titleStylesWrapper}
    >
      {hasLink(settings) ? (
        <Link
          type="products"
          target={settings.linkTarget}
          linkTo={settings.linkTo}
          linkTitle={productState.payload.title}
          payload={productState.payload}
        >
          <Title classList={"swp-product-title " + settings.titleClassName} />
        </Link>
      ) : (
        <Title classList={"swp-product-title " + settings.titleClassName} />
      )}
    </div>,
    settings.dropzoneProductTitle
  )
}

function Title({ classList }) {
  const productState = useProductState()
  const CustomHeading = `h${shopwp.misc.isSingularProducts ? "1" : "2"}`

  const heading = wp.hooks.applyFilters(
    "product.titleText",
    productState.payload.title,
    productState.payload
  )

  return (
    <>
      <FilterHook name="before.productTitle" args={[productState]} />

      <FilterHook name="product.titleHtml" args={[productState]}>
        <CustomHeading itemProp="name" content={heading} className={classList}>
          {heading}
        </CustomHeading>
      </FilterHook>

      <FilterHook name="after.productTitle" args={[productState]} />
    </>
  )
}

export default ProductTitle
