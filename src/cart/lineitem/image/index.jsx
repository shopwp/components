import { addCustomSizingToImageUrl } from "@shopwp/common"

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

  return (
    <Link
      payload={lineItem.merchandise}
      type="products"
      from="cart"
      classNames="wps-cart-lineitem-img-link"
      target={settings.lineitemsLinkTarget}
      manualLink={manualLink}
      disableLink={disableLink}
      linkTitle={lineItem.merchandise.product.title}
    >
      <img
        className="swp-cart-img wps-cart-lineitem-img"
        src={actualImageUrl(lineItem)}
        alt={"Product thumbnail for " + lineItem.merchandise.product.title}
      />
    </Link>
  )
}

export default CartLineItemImage
