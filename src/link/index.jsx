import LinkModal from "../link-modal"
import LinkNormal from "../link-normal"

function Link({
  type,
  classNames = "",
  target,
  children,
  linkTo = "none",
  manualLink,
  disableLink,
  payload = false,
}) {
  function renderLink() {
    if (disableLink || shopwp.misc.isAdmin) {
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
      >
        {children}
      </LinkNormal>
    )
  }

  return renderLink()
}

export default Link
