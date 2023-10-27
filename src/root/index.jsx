function RootElement({ settings, id, skeletonType, type = "products" }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-id={id}
      data-wpshopify-component-type={type}
      data-wpshopify-skeleton-type={skeletonType}
      data-wpshopify-payload-settings={settings}
    ></div>
  )
}

export default RootElement
