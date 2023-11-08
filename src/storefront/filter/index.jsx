/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function StorefrontFilter({ heading, children, isOpen, setIsOpen }) {
  const filterHeadingCSS = css``
  const drawerIconCSS = css``
  const FilterCSS = css``
  const drawerContentCSS = css``

  return (
    <div
      className="swp-storefront-filter wps-filter"
      css={FilterCSS}
      data-is-drawer-open={isOpen}
      data-wps-drawer-toggle={isOpen}
    >
      <h3
        className="swp-storefront-filter-heading wps-drawer-trigger wps-filter-heading"
        css={filterHeadingCSS}
        onClick={setIsOpen}
      >
        {heading}
        <span
          className="swp-storefront-drawer-icon wps-drawer-icon"
          css={drawerIconCSS}
        />
      </h3>
      <div
        className="swp-storefront-drawer-content wps-drawer-content"
        css={drawerContentCSS}
      >
        {children}
      </div>
    </div>
  )
}

export default StorefrontFilter
