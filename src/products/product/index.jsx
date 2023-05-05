import ProductProvider from "./_state/provider"
import ProductWrapper from "./wrapper"

function Product(props) {
  console.log("<Product />")
  return (
    <ProductProvider {...props}>
      <ProductWrapper payload={props.payload} />
    </ProductProvider>
  )
}

export default Product
