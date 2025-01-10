import { hasLink, getURLParam } from "@shopwp/common"
import {
  isOnSale,
  hasManyVariants,
  getInitialQuantity,
  maybeFindFirstSellingPlan,
} from "@shopwp/common"

function ProductInitialState(props) {
  var selectedSubscription = false
  var selectFirstVariant = props.settings.selectFirstVariant
  const variantIdFromURL = getURLParam("variant")

  if (props.settings.selectVariant) {
    var preselectVariant =
      "gid://shopify/ProductVariant/" + props.settings.selectVariant
  }

  var preselectVariantFromFilter = wp.hooks.applyFilters(
    "product.preSelectVariantById",
    variantIdFromURL
      ? "gid://shopify/ProductVariant/" + variantIdFromURL
      : false,
    props.payload
  )

  // Ensures backwards compatibility. Might want to think about removing filter.
  if (preselectVariantFromFilter) {
    preselectVariant = preselectVariantFromFilter
  }

  if (props.settings.subscriptionsSelectOnLoad) {
    selectedSubscription = maybeFindFirstSellingPlan(props.payload)
  }

  if (preselectVariant) {
    selectFirstVariant = false
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
    selectFirstVariant: selectFirstVariant,
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
