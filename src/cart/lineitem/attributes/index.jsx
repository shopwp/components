function CartAttribute({ attribute }) {
  return (
    <div className="swp-cart-attr">
      <p className="swp-cart-attr-line swp-cart-attr-key">{attribute.key}</p>
      <p className="swp-cart-attr-line swp-cart-attr-value">
        {attribute.value}
      </p>
    </div>
  )
}

function CartAttributes({ lineItem }) {
  return (
    <div className="swp-cart-attrs">
      {lineItem.attributes.map((attribute) => (
        <CartAttribute
          key={attribute.key + attribute.value}
          attribute={attribute}
        />
      ))}
    </div>
  )
}

export default CartAttributes
