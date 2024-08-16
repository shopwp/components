const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../../link")
)

function AddButtonWrapper({
  hasLink,
  children,
  linkTo,
  linkTarget,
  isDirectCheckout,
  linkWithBuyButton,
  payload,
  manualLink,
}) {
  return hasLink && !isDirectCheckout && !linkWithBuyButton ? (
    <Link
      type="products"
      linkTo={linkTo}
      target={linkTarget}
      payload={payload}
      manualLink={manualLink}
    >
      {children}
    </Link>
  ) : (
    children
  )
}

export default AddButtonWrapper
