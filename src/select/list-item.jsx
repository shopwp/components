/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  createObj,
  isVariantAvailableInShopify,
  isVariantAvailableToSelect,
} from "@shopwp/common"

function SelectItem({
  item,
  index,
  getItemProps,
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
    padding: 7px 10px;
    border-bottom: 1px solid #ddd;
    opacity: ${isAvailableToSelect || selected ? 1 : 0.4};
    text-decoration: ${isAvailableToSelect || selected
      ? "none"
      : "line-through"};

    min-height: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &[data-is-selected="true"] {
      background-color: #2b51d2;
      color: white;

      &:hover {
        background-color: #2b51d2;
      }
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

    const optionNameValue = createObj(item.value.name, item.value.value)
    const isOptionSelected = selectedOptions.hasOwnProperty(item.value.name)

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
  }, [selected])

  return (
    <li
      css={DropdownMenuItemCSS}
      data-is-selected={selected ? selected.label === item.label : false}
      {...getItemProps({ item, index })}
    >
      <span>{item.label}</span>
    </li>
  )
}

export default SelectItem
