/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { StorefrontSelectionsValues } from "./values"
import { getSelectionTypes } from "@shopwp/common"
import { useStorefrontState } from "../_state/hooks"
import isEmpty from "lodash-es/isEmpty"

function StorefrontSelectionsType({ selectionType }) {
  const storefrontState = useStorefrontState()

  const filterSelectionGroupCSS = css``
  return !isEmpty(storefrontState.selections[selectionType]) ? (
    <div className="wps-filter-selection-type">
      <div
        className="swp-selections-group swp-l-row wps-selections-group align-items-center"
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
