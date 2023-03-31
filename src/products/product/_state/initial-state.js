import { hasLink } from "Common/settings"
import { isOnSale, hasManyVariants, getInitialQuantity } from "Common"

function ProductInitialState(props) {
  return {
    element: props.element,
    selectedVariant: false,
    addedToCart: false,
    hasManyImages:
      props.payload.media && props.payload.media.edges.length > 1
        ? true
        : false,
    hasManyVariants: hasManyVariants(props.payload),
    isOnSale: isOnSale(props.payload),
    hasLink: hasLink(props.settings),
    notice: false,
    missingSelections: false,
    quantity: getInitialQuantity(props.settings),
    isModalOpen: false,
    selectFirstVariant: props.settings.selectFirstVariant,
    preSelectVariant: wp.hooks.applyFilters(
      "product.preSelectVariantById",
      false,
      props.payload
    ),
    defaultGalleryCarouselSettings: {
      carouselPrevArrow: props.settings.carouselPrevArrow,
      carouselNextArrow: props.settings.carouselNextArrow,
      carouselDots: props.settings.carouselDots,
      carouselInfinite: props.settings.carouselInfinite,
      carouselSpeed: props.settings.carouselSpeed,
      carouselSlidesToShow: props.settings.carouselSlidesToShow,
      carouselSlidesToScroll: props.settings.carouselSlidesToScroll,
    },
    id: props.id, // read only
    payload: props.payload ? props.payload : false,
    selectedSubscriptionInfo: false,
    isDirectCheckingOut: false,
    directCheckoutParams: false,
  }
}

export { ProductInitialState }
