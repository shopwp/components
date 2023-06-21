import StorefrontProvider from "./_state/provider"
import Items from "../items"
import StorefrontWrapper from "./wrapper"

function Storefront(props) {
  return (
    <Items
      {...props}
      queryType="products"
      componentType="storefront"
      skeletonType="shopwp/storefront"
      customPagination={true}
    >
      <StorefrontProvider {...props}>
        <StorefrontWrapper />
      </StorefrontProvider>
    </Items>
  )
}

export default Storefront
