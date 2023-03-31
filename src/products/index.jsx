import Product from "./product"
import Items from "../items"

function Products(props) {
  return (
    <Items {...props} componentType="products">
      <Product />
    </Items>
  )
}

export default Products
