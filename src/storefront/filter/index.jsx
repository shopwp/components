function StorefrontFilter({ heading, children, isOpen, setIsOpen }) {
  return (
    <div
      className="swp-storefront-filter wps-filter"
      data-is-drawer-open={isOpen}
      data-wps-drawer-toggle={isOpen}
    >
      <h3
        className="swp-storefront-filter-heading wps-drawer-trigger wps-filter-heading"
        onClick={setIsOpen}
      >
        {heading}
        <span className="swp-storefront-drawer-icon wps-drawer-icon" />
      </h3>
      <div className="swp-storefront-drawer-content wps-drawer-content">
        {children}
      </div>
    </div>
  )
}

export default StorefrontFilter
