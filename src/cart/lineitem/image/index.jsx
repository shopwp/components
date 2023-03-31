/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common/css"
import { addCustomSizingToImageUrl } from "Common/images"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CartLineItemImage({ lineItem, settings }) {
  const manualLink = wp.hooks.applyFilters(
    "cart.lineItemsLink",
    lineItem?.shopwp ? lineItem.shopwp.url : false,
    lineItem
  )

  const disableLink = settings.lineitemsDisableLink

  function actualImageUrl(lineItem) {
    if (lineItem.merchandise.image) {
      var src = lineItem.merchandise.image.originalSrc
    } else if (lineItem.merchandise.product?.featuredImage) {
      var src = lineItem.merchandise.product.featuredImage.url
    } else {
      return false
    }

    return wp.hooks.applyFilters(
      "cart.lineItemThumbnailUrl",
      addCustomSizingToImageUrl({
        src: src,
        width: 300,
        height: 300,
        crop: "center",
      }),
      lineItem
    )
  }

  const lineItemImgCSS = css`
    background-image: url(${actualImageUrl(lineItem)});
    width: 55px;
    height: 55px;
    margin-right: 5px;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #e5e5e5;

    ${mq("small")} {
      width: 60px;
      height: 60px;
    }
  `

  return (
    <Link
      payload={lineItem.merchandise}
      type="products"
      classNames="wps-cart-lineitem-img-link"
      target={settings.lineitemsLinkTarget}
      manualLink={manualLink}
      disableLink={disableLink}
    >
      <div className="wps-cart-lineitem-img" css={[lineItemImgCSS]} />
    </Link>
  )
}

export default CartLineItemImage
