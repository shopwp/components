/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { IconRemove } from "Components"
import { createSelectionsOfType, buildNewSelection } from "Common"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import isString from "lodash/isString"
import { useShopState } from "ShopState"

function StorefrontSelectionsValue({ selectionType, val }) {
  const storefrontState = useStorefrontState()
  const storefrontDispatch = useStorefrontDispatch()
  const shopState = useShopState()

  function onClick(e) {
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
    margin-bottom: 10px;
    text-transform: capitalize;
    padding: 5px 9px 5px 12px;
    background: transparent;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid silver;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
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
        : isString(val)
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
        key={isString(item) ? item : item.id}
        selectionType={selectionType}
        val={item}
      />
    ) : null
  })
}

export { StorefrontSelectionsValues }
