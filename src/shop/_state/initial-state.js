import { createStorefrontApiClient } from "@shopify/storefront-api-client"

function getInitialCartState() {
  if (shopwp.misc.isAdmin) {
    return true
  }

  if (window.shopwpDivi) {
    if (window.shopwpDivi.isEditingTemplateLayout) {
      return true
    }
  }

  return false
}

function get_lang() {
  if (shopwp.misc.siteLang === shopwp.general.languageCode) {
    return shopwp.general.languageCode
  } else {
    return shopwp.misc.siteLang
  }
}

function findSavedBuyerIdentity(sessionValue) {
  // We don't want to use the "users" saved value in the admin area
  if (!sessionValue || shopwp.misc.isAdmin) {
    let defaults = {
      language: get_lang(),
      country: shopwp.general.countryCode,
      currency: shopwp.general.currencyCode,
    }

    return defaults
  }

  sessionValue = JSON.parse(sessionValue)

  var finalStuff = {
    language: sessionValue?.language ? sessionValue.language : get_lang(),
    country: sessionValue?.country
      ? sessionValue.country
      : shopwp.general.countryCode,
    currency: sessionValue?.currency
      ? sessionValue.currency
      : shopwp.general.currencyCode,
  }

  return finalStuff
}

function ShopInitialState(props) {
  var isCartLoaded = getInitialCartState()
  var savedIdentity = findSavedBuyerIdentity(
    sessionStorage.getItem("shopwp-buyer-identity")
  )

  /*
  
  Priorities:

  1. Use identity from shortcode / Render API
  2. Use cached identity from LS
  3. Use default plugin settings (will populate on server-side)
  
  */
  const buyerIdentity = {
    country: props.country
      ? props.country.toUpperCase()
      : savedIdentity
      ? savedIdentity.country.toUpperCase()
      : false,
  }

  if (props.companyLocationId && props.companyLocationId !== "") {
    buyerIdentity.companyLocationId = props.companyLocationId
  }

  if (props.customerAccessToken && props.customerAccessToken !== "") {
    buyerIdentity.customerAccessToken = props.customerAccessToken
  }

  if (props.phone && props.phone !== "") {
    buyerIdentity.phone = props.phone
  }

  if (props.email && props.email !== "") {
    buyerIdentity.email = props.email
  }

  const client = shopwp.connection.storefront.storefrontAccessToken
    ? createStorefrontApiClient({
        storeDomain: "https://" + shopwp.connection.storefront.domain,
        apiVersion: shopwp.connection.storefront.apiVersion,
        publicAccessToken: shopwp.connection.storefront.storefrontAccessToken,
      })
    : false

  const lang = props.language
    ? props.language.toUpperCase()
    : savedIdentity
    ? savedIdentity.language.toUpperCase()
    : false

  const currency = props.currency
    ? props.currency.toUpperCase()
    : savedIdentity
    ? savedIdentity.currency.toUpperCase()
    : false

  var state = {
    buyerIdentity: buyerIdentity,
    jwt: props.jwt ? props.jwt : false,
    isCartOpen: false,
    isCartReady: isCartLoaded,
    cartData: false,
    isCartUpdating: isCartLoaded,
    theme: shopwp.misc.theme,
    productsVisible: false,
    trackingParams: false,
    directCheckoutError: null,
    client: client,
    language: lang,
    currency: currency,
  }

  state.t = wp.hooks.applyFilters("shop.textContent", shopwp.t, state)

  return state
}

export default ShopInitialState
