import { useProductDispatch } from "../products/product/_state/hooks"

function LinkModal({ children }) {
  const productDispatch = useProductDispatch()

  function onClick() {
    productDispatch({ type: "TOGGLE_MODAL", payload: true })
  }
  return (
    <a
      href="#!"
      onClick={onClick}
      css={LinkModalCSS}
      className="swp-link wps-link-modal"
      aria-label="Link to modal window"
    >
      {children}
    </a>
  )
}

export default LinkModal
