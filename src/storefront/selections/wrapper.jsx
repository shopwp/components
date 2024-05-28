import StorefrontSelectionsClear from "./clear"
import { StorefrontSelectionsTypes } from "./types"

function StorefrontSelectionsWrapper({ selections, initialSelections }) {
  return (
    <div className="swp-l-row swp-m-l-row swp-l-baseline wps-filter-selections">
      <StorefrontSelectionsTypes selections={selections} />
      {Object.keys(initialSelections).length ? null : (
        <StorefrontSelectionsClear />
      )}
    </div>
  )
}

export default StorefrontSelectionsWrapper
