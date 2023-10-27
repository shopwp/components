/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductDispatch } from "../products/product/_state/hooks"

function LinkModal({ children }) {
  const productDispatch = useProductDispatch()
  const LinkModalCSS = css`
    text-decoration: none;
    display: block;

    &:hover {
      cursor: pointer;
    }
  `

  function onClick() {
    productDispatch({ type: "TOGGLE_MODAL", payload: true })
  }
  return (
    <a
      href="#!"
      onClick={onClick}
      css={LinkModalCSS}
      className="wps-link-modal"
      aria-label="Link to modal window"
    >
      {children}
    </a>
  )
}

export default LinkModal
