import { getItemLink } from "@shopwp/common"
import { usePayloadState } from "../items/_state/payload/hooks"

function LinkNormal({
  type,
  linkTo,
  manualLink,
  target,
  classNames,
  children,
  linkTitle,
  payload = false,
}) {
  payload = payload ? payload : usePayloadState()
  const className = "swp-link wps-" + type + "-link" + " " + classNames

  function getTarget(target) {
    if (target) {
      return target
    }

    return "_blank"
  }

  var link = wp.hooks.applyFilters(
    "misc.linkHref",
    manualLink ? encodeURI(manualLink) : getItemLink(payload, type, linkTo),
    linkTo,
    payload
  )

  const typeSingular = type === "collections" ? " collection" : " product"

  return (
    <a
      href={link}
      className={className}
      aria-label={linkTitle + typeSingular + " link"}
      target={wp.hooks.applyFilters(
        "misc.linkTarget",
        getTarget(target),
        type,
        payload
      )}
    >
      {children}
    </a>
  )
}

export default LinkNormal
