import { Price } from "@shopwp/components"

const ProductPriceSingle = wp.element.forwardRef((props, ref) => {
  return props.price !== false || props.price !== null ? (
    <span
      ref={ref}
      className="swp-price swp-product-price wps-product-individual-price"
      data-price={props.price}
      data-is-compare-at={props.compareAt}
    >
      <Price price={props.price} />
    </span>
  ) : null
})

export default wp.element.memo(ProductPriceSingle)
