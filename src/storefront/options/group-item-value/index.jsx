import isEmpty from "lodash/isEmpty"
import some from "lodash/some"
import { useStorefrontState } from "../../_state/hooks"

function CheckboxItem({
  itemValue,
  itemType,
  storefrontDispatch,
  isLoading,
  initialSelections,
}) {
  const { useState, useEffect } = wp.element
  const [isSelected, setIsSelected] = useState(() => {
    var stuff = initialSelections[itemType]

    if (!stuff || stuff.length === 0) {
      return false
    }

    if (itemType === "collections") {
      var found = stuff.filter((selected) => selected.label === itemValue.label)

      return found.length
    }

    if (stuff && stuff.length && itemValue) {
      return stuff.includes(String(itemValue).toLowerCase())
    }

    return false
  })
  const itemLabel = itemType === "collections" ? itemValue.label : itemValue

  const state = useStorefrontState()

  function onClick() {
    if (isLoading) {
      return
    }

    var settingThis = {
      itemValue: itemValue,
      itemType: itemType,
      isSelected: !isSelected,
    }

    setIsSelected(!isSelected)

    storefrontDispatch({
      type: "SET_LAST_SELECTED",
      payload: settingThis,
    })
  }

  useEffect(() => {
    if (isEmpty(state.selections)) {
      setIsSelected(false)
    }

    if (isEmpty(state.selections[itemType])) {
      setIsSelected(false)
    }

    if (itemType === "collections") {
      var found = some(state.selections[itemType], itemValue)
    } else {
      if (state.selections[itemType] && itemValue) {
        if (state.selections[itemType].length) {
          var found = state.selections[itemType].includes(
            String(itemValue).toLowerCase()
          )
        } else {
          var found = isSelected
        }
      } else {
        var found = isSelected
      }
    }

    if (!found) {
      setIsSelected(false)
    }
  }, [state.selections])

  return (
    <li
      data-wps-is-selected={isSelected}
      data-wps-filter-value={itemLabel}
      data-wps-display-style="checkbox"
      className={"wps-checkbox-wrapper"}
    >
      <label className="wps-input-label">
        <input
          type="checkbox"
          onChange={onClick}
          disabled={isLoading}
          checked={isSelected ? "checked" : ""}
          className="wps-input-value"
        />

        {itemLabel && <span>{itemLabel}</span>}
      </label>
    </li>
  )
}

export default CheckboxItem
