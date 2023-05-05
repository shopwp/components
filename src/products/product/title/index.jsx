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

  const titleStyles = css`
    && {
      font-family: ${settings.titleTypeFontFamily
        ? settings.titleTypeFontFamily
        : "inherit"};
      font-weight: ${settings.titleTypeFontWeight
        ? settings.titleTypeFontWeight
        : "initial"};
      font-size: ${settings.titleTypeFontSize
        ? settings.titleTypeFontSize
        : settings.titleSize};
      letter-spacing: ${settings.titleTypeLetterSpacing
        ? settings.titleTypeLetterSpacing
        : "initial"};
      line-height: ${settings.titleTypeLineHeight
        ? settings.titleTypeLineHeight
        : "initial"};
      text-decoration: ${settings.titleTypeTextDecoration
        ? settings.titleTypeTextDecoration
        : "initial"};
      text-transform: ${settings.titleTypeTextTransform
        ? settings.titleTypeTextTransform
        : "initial"};
      font-style: ${settings.titleTypeFontStyle
        ? settings.titleTypeFontStyle
        : "initial"};

      color: ${settings.titleColor};
      white-space: normal;
      margin: 0;
    }
  `

  const titleStylesWrapper = css`
    margin-bottom: ${settings.isSingleComponent ? "0px" : "10px"};
  `

  return usePortal(
    <div
      className="wps-component wps-component-products-title"
      aria-label="Product Title"
      data-wps-component-order="0"
      css={titleStylesWrapper}
    >
      {hasLink(settings) ? (
        <Link
          type="products"
          target={settings.linkTarget}
          linkTo={settings.linkTo}
          payload={productState.payload}
        >
          <Title styles={titleStyles} classList={settings.titleClassName} />
        </Link>
      ) : (
        <Title styles={titleStyles} classList={settings.titleClassName} />
      )}
    </div>,
    settings.dropzoneProductTitle
  )
}

function Title({ styles, classList }) {
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
        <CustomHeading
          itemProp="name"
          content={heading}
          className={classList}
          css={styles}
        >
          {heading}
        </CustomHeading>
      </FilterHook>

      <FilterHook name="after.productTitle" args={[productState]} />
    </>
  )
}

export default ProductTitle
