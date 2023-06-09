/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { getItemLink } from "@shopwp/common"
import { usePayloadState } from "../items/_state/payload/hooks"

function LinkNormal({
  type,
  linkTo,
  manualLink,
  target,
  classNames,
  children,
  payload = false,
}) {
  payload = payload ? payload : usePayloadState()
  const className = "wps-" + type + "-link" + " " + classNames

  const linkCSS = css`
    text-decoration: none;
    display: block;

    .wps-product-image {
      &:hover {
        cursor: pointer;
      }
    }
  `

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

  return (
    <a
      href={link}
      className={className}
      css={linkCSS}
      aria-label="Product Link"
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
