import {
  createObj,
  isVariantAvailableToSelect,
  isVariantAvailableInShopify,
  onVariantSelection,
} from "@shopwp/common"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../../_state/hooks"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

function ProductOptionValue(props) {
  const optionNameValue = createObj(props.optionObj.name, props.optionObj.value)
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const settings = useSettingsState()

  const isOptionSelected = props.selectedOptions.hasOwnProperty(
    props.optionObj.name
  )

  // Whether the variant is actually in stock
  const isAvailableInShopify = isVariantAvailableInShopify(
    productBuyButtonState.allSelectableOptions,
    props.optionObj
  )

  // Whether the variant combination is available depending on what the user is choosing
  const isAvailableToSelect = isVariantAvailableToSelect(
    props.selectedOptions,
    isOptionSelected,
    optionNameValue,
    productBuyButtonState.variants,
    isAvailableInShopify,
    settings
  )

  function onSelection() {
    onVariantSelection({
      option: props.optionObj,
      productBuyButtonState: productBuyButtonState,
      productBuyButtonDispatch: productBuyButtonDispatch,
    })
  }

  return wp.element.cloneElement(props.children, {
    ...props,
    onSelection: onSelection,
    optionObj: props.optionObj,
    isAvailableToSelect: isAvailableToSelect,
    selectedOptions: props.selectedOptions,
    variants: productBuyButtonState.variants,
    totalOptions: productBuyButtonState.totalOptions,
    isAvailableInShopify: isAvailableInShopify,
  })
}

export default ProductOptionValue
