import ShopProvider from "./_state/provider"

function Shop(props) {
  const { useEffect } = wp.element

  useEffect(() => {
    // document.getElementById("shopwp-skeleton-loader").remove()

    document
      .querySelectorAll("[data-wpshopify-component] > .shopwp-skeleton")
      .forEach((el) => (el.style.display = "none"))
  }, [])
  return (
    <div className="shopwp-root">
      <ShopProvider {...props}>{props.children}</ShopProvider>
    </div>
  )
}

export default Shop
