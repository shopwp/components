/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import StorefrontSelectionsClear from "./clear"
import { StorefrontSelectionsTypes } from "./types"

function StorefrontSelectionsWrapper({ selections, initialSelections }) {
  const StorefrontSelectionsWrapperCSS = css``

  return (
    <div
      className="swp-l-row swp-l-baseline wps-filter-selections"
      css={StorefrontSelectionsWrapperCSS}
    >
      <StorefrontSelectionsTypes selections={selections} />
      {Object.keys(initialSelections).length ? null : (
        <StorefrontSelectionsClear />
      )}
    </div>
  )
}

export default StorefrontSelectionsWrapper
