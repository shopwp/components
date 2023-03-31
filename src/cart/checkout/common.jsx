function checkoutRedirect(checkoutUrl, cb = false) {
  return managedDomainRedirect(checkoutUrl, checkoutWindowTarget(), cb)
}

function checkoutWindowTarget() {
  if (shopwp.misc.isMobile) {
    return "_self"
  }

  return shopwp.general.checkoutButtonTarget
}

function managedDomainRedirect(checkoutUrl, target, cb = false) {
  if (hasGaLoaded()) {
    var checkoutUrl = decorateCheckoutUrl(checkoutUrl)
  } else {
    var checkoutUrl = checkoutUrl
  }

  redirect(checkoutUrl, target, cb)
}

function hasGaLoaded() {
  return window.ga !== undefined
}

function decorateCheckoutUrl(link) {
  if (!window.gaplugins || !window.gaplugins.Linker || !window.ga.getAll) {
    return link
  }

  var tracker = ga.getAll()[0]
  var linker = new window.gaplugins.Linker(tracker)

  return linker.decorate(link)
}

function redirect(checkoutUrl, target, cb = false) {
  var finalUrl = encodeURI(checkoutUrl)

  window.open(wp.hooks.applyFilters("cart.checkoutUrl", finalUrl), target)

  if (cb) {
    cb(finalUrl)
  }
}

export { checkoutRedirect }
