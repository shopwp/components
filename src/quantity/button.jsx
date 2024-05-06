/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function QuantityButton({ onClick, type, children }) {
  const QuantityIncDecCSS = css``

  return (
    <button
      className={
        "swp-btn-quantity swp-btn-quantity-" + type + " wps-quantity-" + type
      }
      css={[QuantityIncDecCSS]}
      type="button"
      role="button"
      tabIndex="0"
      aria-label={"Quantity " + type + " button"}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default QuantityButton
