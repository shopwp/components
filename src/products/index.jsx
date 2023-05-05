import Product from "./product"
import Items from "../items"

function Products(props) {
  console.log("<Products />")
  return (
    <Items {...props} componentType="products">
      <Product />
    </Items>
  )
}

export default Products
