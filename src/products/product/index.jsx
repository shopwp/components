import ProductProvider from "./_state/provider"
import ProductWrapper from "./wrapper"

function Product(props) {
  return (
    <ProductProvider {...props}>
      <ProductWrapper payload={props.payload} />
    </ProductProvider>
  )
}

export default Product
