import { hasLink, getURLParam } from "@shopwp/common"
import {
  isOnSale,
  hasManyVariants,
  getInitialQuantity,
  maybeFindFirstSellingPlan,
} from "@shopwp/common"

function ProductInitialState(props) {
  var selectedSubscription = false
  const variantIdFromURL = getURLParam("variant")

  const preselectVariant = wp.hooks.applyFilters(
    "product.preSelectVariantById",
    variantIdFromURL
      ? "gid://shopify/ProductVariant/" + variantIdFromURL
      : false,
    props.payload
  )
  if (props.settings.subscriptionsSelectOnLoad) {
    selectedSubscription = maybeFindFirstSellingPlan(props.payload)
  }

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
    preSelectVariant: preselectVariant,
    defaultGalleryCarouselSettings: {
      carouselPrevArrow: props.settings.carouselPrevArrow,
      carouselNextArrow: props.settings.carouselNextArrow,
      carouselDots: props.settings.carouselDots,
      carouselInfinite: props.settings.carouselInfinite,
      carouselAutoplay: props.settings.carouselAutoplay,
      carouselAutoplaySpeed: props.settings.carouselAutoplaySpeed,
      carouselSpeed: props.settings.carouselSpeed,
      carouselSlidesToShow: props.settings.carouselSlidesToShow,
      carouselSlidesToScroll: props.settings.carouselSlidesToScroll,
    },
    id: props.id, // read only
    payload: props.payload ? props.payload : false,
    selectedSubscription: selectedSubscription,
    isDirectCheckingOut: false,
    subscriptionPricing: false,
    activeSellingGroup: "onetime",
  }
}

export { ProductInitialState }
