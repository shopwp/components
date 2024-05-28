function QuantityButton({ onClick, type, children }) {
  return (
    <button
      className={
        "swp-btn-quantity swp-btn-quantity-" + type + " wps-quantity-" + type
      }
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
