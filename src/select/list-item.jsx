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

  const DropdownMenuItemCSS = css`
    text-align: center;
    margin-bottom: 0;
    padding: 0;
    border-bottom: 1px solid #ddd;
    opacity: ${isAvailableToSelect || selected ? 1 : 0.4};
    text-decoration: ${isAvailableToSelect || selected
      ? "none"
      : "line-through"};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &[data-is-selected="true"] {
      background-color: rgb(233, 233, 233);
      color: black;

      &:hover {
        background-color: rgb(233, 233, 233);

        li {
          background-color: rgb(233, 233, 233);
        }
      }
    }

    .szh-menu__item {
      padding: 0.4rem 1.5rem;
      width: 100%;
      display: block;
      font-size: 16px;
      box-sizing: border-box;
    }

    &:hover,
    &:focus {
      cursor: pointer;
      background-color: rgb(233, 233, 233);
    }
  `

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
      data-is-selected={selected ? selected.value === item.value : false}
    >
      <MenuItem value={item.value} label={item.label}>
        {item.value}
      </MenuItem>
    </div>
  )
}

export default SelectItem
