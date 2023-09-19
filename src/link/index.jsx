import LinkModal from "../link-modal"
import LinkNormal from "../link-normal"

function Link({
  type,
  classNames = "",
  target,
  from = false,
  children,
  linkTo = shopwp.general.productsLinkTo,
  manualLink,
  disableLink,
  linkTitle,
  payload = false,
}) {
  function renderLink() {
    if (
      disableLink ||
      shopwp.misc.isAdmin ||
      (shopwp.general.productsLinkTo !== "wordpress" && from === "cart")
    ) {
      return children
    }

    if (linkTo === "none" && !manualLink) {
      return children
    }

    if (linkTo === "modal") {
      return <LinkModal>{children}</LinkModal>
    }

    return (
      <LinkNormal
        type={type}
        linkTo={linkTo}
        manualLink={manualLink}
        target={target}
        classNames={classNames}
        payload={payload}
        linkTitle={linkTitle}
      >
        {children}
      </LinkNormal>
    )
  }

  return renderLink()
}

export default Link
