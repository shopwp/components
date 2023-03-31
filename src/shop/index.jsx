import ShopProvider from "./_state/provider"

function Shop(props) {
  return (
    <div className="shopwp-root">
      <ShopProvider {...props}>{props.children}</ShopProvider>
    </div>
  )
}

export default Shop
