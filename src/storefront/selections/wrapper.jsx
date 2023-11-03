/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import StorefrontSelectionsClear from "./clear"
import { StorefrontSelectionsTypes } from "./types"

function StorefrontSelectionsWrapper({ selections, initialSelections }) {
  const StorefrontSelectionsWrapperCSS = css`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    flex-wrap: wrap;
  `

  return (
    <div className="wps-filter-selections" css={StorefrontSelectionsWrapperCSS}>
      <StorefrontSelectionsTypes selections={selections} />
      {Object.keys(initialSelections).length ? null : (
        <StorefrontSelectionsClear />
      )}
    </div>
  )
}

export default StorefrontSelectionsWrapper
