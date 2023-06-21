/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { IconRemove } from "@shopwp/components"
import { createSelectionsOfType, buildNewSelection } from "@shopwp/common"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import { useShopState } from "@shopwp/components"
import { useRequestsState } from "../../items/_state/requests/hooks"

function StorefrontSelectionsValue({ selectionType, val }) {
  const storefrontState = useStorefrontState()
  const storefrontDispatch = useStorefrontDispatch()
  const shopState = useShopState()
  const requestsState = useRequestsState()

  function onClick(e) {
    if (requestsState.isFetchingNew) {
      return
    }
    const newList = buildNewSelection(
      val,
      selectionType,
      false,
      storefrontState.selections
    )

    var createdSelections = createSelectionsOfType(selectionType, newList)

    storefrontDispatch({
      type: "SET_SELECTIONS",
      payload: createdSelections,
    })

    storefrontDispatch({
      type: "SET_SELECTED_" + String(selectionType).toUpperCase(),
      payload: newList,
    })
  }

  const selectionValueCSS = css`
    margin-right: 8px;
    margin-bottom: 0;
    text-transform: capitalize;
    padding: 5px 9px 5px 12px;
    background: transparent;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid silver;
    border-radius: ${shopwp.general.globalBorderRadius};
    opacity: ${requestsState.isFetchingNew ? "0.6" : 1};

    &:hover {
      cursor: ${requestsState.isFetchingNew ? "not-allowed" : "pointer"};
      opacity: ${requestsState.isFetchingNew ? "0.6" : "0.8"};
    }

    .wps-icon {
      width: 7px;
      height: 7px;
      display: inline-block;
      right: 2px;
      position: relative;
      top: 0;
      margin-left: 10px;
    }

    .wps-icon svg {
      width: 7px;
      height: 7px;
      display: inline-block;
      position: relative;
      position: absolute;
      top: 0;
    }
  `

  return (
    <span
      className="wps-filter-selection-value wps-mr-2"
      onClick={onClick}
      css={selectionValueCSS}
    >
      {selectionType === "available_for_sale"
        ? shopState.t.l.availSale
        : typeof val === "string"
        ? val
        : val.label}
      <IconRemove />
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
