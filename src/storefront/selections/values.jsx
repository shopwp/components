import { buildNewSelection } from "@shopwp/common"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import { useShopState, IconRemove } from "@shopwp/components"
import { useRequestsState } from "../../items/_state/requests/hooks"

function StorefrontSelectionsValue({ selectionType, val }) {
  const storefrontState = useStorefrontState()
  const storefrontDispatch = useStorefrontDispatch()
  const shopState = useShopState()
  const requestsState = useRequestsState()

  if (storefrontState.initialSelections[selectionType]) {
    var isAnInitialSelection =
      storefrontState.initialSelections[selectionType].includes(val)
  } else {
    var isAnInitialSelection = false
  }

  function onClick(e) {
    if (requestsState.isFetchingNew || isAnInitialSelection) {
      return
    }

    const newSelections = buildNewSelection(
      val,
      selectionType,
      false,
      storefrontState.selections,
      storefrontState.initialSelections
    )

    storefrontDispatch({
      type: "SET_SELECTIONS",
      payload: newSelections.allSelections,
    })

    for (const prop in newSelections.allSelections) {
      storefrontDispatch({
        type: "SET_SELECTED_" + String(prop).toUpperCase(),
        payload: newSelections.allSelections[prop],
      })
    }
  }

  return (
    <span
      className="swp-storefront-selection-value wps-filter-selection-value wps-mr-2"
      onClick={onClick}
      data-initial-selection={isAnInitialSelection}
    >
      {selectionType === "available_for_sale"
        ? shopState.t.l.availSale
        : typeof val === "string"
        ? val
        : val.label}
      {isAnInitialSelection ? null : <IconRemove />}
    </span>
  )
}

function StorefrontSelectionsValues({ selectionType, vals }) {
  return vals.map((item) => {
    return item ? (
      <StorefrontSelectionsValue
        key={typeof item === "string" ? item : item.id}
        selectionType={selectionType}
        val={item}
      />
    ) : null
  })
}

export { StorefrontSelectionsValues }
