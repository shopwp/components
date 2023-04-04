/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { StorefrontSelectionsValues } from "./values"
import { getSelectionTypes } from "@shopwp/common"
import { useStorefrontState } from "../_state/hooks"
import isEmpty from "lodash/isEmpty"

function StorefrontSelectionsType({ selectionType }) {
  const storefrontState = useStorefrontState()

  const filterSelectionTypeCSS = css`
    margin-bottom: 10px;
  `

  const filterSelectionGroupCSS = css`
    display: flex;
    flex-wrap: wrap;
  `
  return !isEmpty(storefrontState.selections[selectionType]) ? (
    <div className="wps-filter-selection-type" css={filterSelectionTypeCSS}>
      <div
        className="wps-selections-group align-items-center"
        css={filterSelectionGroupCSS}
      >
        <StorefrontSelectionsValues
          selectionType={selectionType}
          vals={storefrontState.selections[selectionType]}
        />
      </div>
    </div>
  ) : null
}

function StorefrontSelectionsTypes({ selections }) {
  const selectionTypes = getSelectionTypes(selections)

  return selectionTypes.map((selectionType, index) => (
    <StorefrontSelectionsType key={index} selectionType={selectionType} />
  ))
}

export { StorefrontSelectionsTypes }
