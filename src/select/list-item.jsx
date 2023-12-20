/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { MenuItem } from "@szhsin/react-menu"

import {
  createObj,
  isVariantAvailableInShopify,
  isVariantAvailableToSelect,
} from "@shopwp/common"

function SelectItem({
  item,
  selected,
  isVariant = false,
  allSelectableOptions = false,
  selectedOptions = false,
  variants = false,
  settings = false,
}) {
  const { useEffect, useState } = wp.element
  const [isAvailableToSelect, setIsAvailableToSelect] = useState(true)

  const DropdownMenuItemCSS = css``

  useEffect(() => {
    if (!isVariant) {
      return
    }

    const optionNameValue = createObj(item.label, item.value)

    const isOptionSelected = selectedOptions.hasOwnProperty(item.label)

    // Whether the variant is actually in stock
    const isAvailableInShopify = isVariantAvailableInShopify(
      allSelectableOptions,
      item.value
    )

    // Whether the variant combination is available depending on what the user is choosing
    const isAvailableToSelect = isVariantAvailableToSelect(
      selectedOptions,
      isOptionSelected,
      optionNameValue,
      variants,
      isAvailableInShopify,
      settings
    )

    setIsAvailableToSelect(isAvailableToSelect)
  }, [selected, selectedOptions, variants])

  return (
    <div
      css={DropdownMenuItemCSS}
      className="swp-select-item"
      data-is-selected={selected ? selected.value === item.value : false}
      data-is-available-to-select={isAvailableToSelect}
    >
      <MenuItem value={item.value} label={item.label}>
        {item.value}
      </MenuItem>
    </div>
  )
}

export default SelectItem
