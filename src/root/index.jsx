function RootElement({ settings, id, type = "products" }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-id={id}
      data-wpshopify-component-type={type}
      role={type}
      data-wpshopify-payload-settings={settings}
    ></div>
  )
}

export default RootElement
