import { createObj, findVariantFromVariantsList } from "@shopwp/common"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../../_state/hooks"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

import find from "lodash-es/find"

function isSelectedVariantAvailableToSelect(allSelectableOptions, optionObj) {
  return allSelectableOptions.filter((selectableOption) => {
    var found = find(selectableOption.selectedOptions, optionObj)

    if (found) {
      return selectableOption
    }

    return false
  })
}

function onlyAvailableForSale(variants) {
  return variants.filter((variant) => variant.availableForSale)
}

function isVariantAvailableInShopify(allSelectableOptions, optionObj) {
  var matchedVariants = isSelectedVariantAvailableToSelect(
    allSelectableOptions,
    optionObj
  )

  var onlyMatchesThatAreAvailable = onlyAvailableForSale(matchedVariants)

  if (onlyMatchesThatAreAvailable.length) {
    return true
  }

  return false
}

function isVariantAvailableToSelect(
  selectedOptions,
  isOptionSelected,
  optionNameValue,
  variants,
  isAvailableInShopify,
  settings
) {
  if (settings.showOutOfStockVariants) {
    return true
  }

  /*

	If the option row is selected, then we want to ensure the rest of the 
	variants in that row are also available to select -- unless the variant is out of stock

	*/

  if (isOptionSelected) {
    if (!isAvailableInShopify) {
      return false
    }

    return true
  }

  var couldSelect = { ...optionNameValue, ...selectedOptions }

  var foundVariantFromSelectedOptions = findVariantFromVariantsList(
    couldSelect,
    variants
  )

  if (foundVariantFromSelectedOptions.length) {
    var stuff = foundVariantFromSelectedOptions.filter(function (variant) {
      return variant.node.availableForSale
    })

    if (stuff.length) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function ProductOptionValue({
  optionObj,
  selectedOptions,
  children,
  setIsDropdownOpen = null,
}) {
  const optionNameValue = createObj(optionObj.name, optionObj.value)
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const settings = useSettingsState()

  // Whether the variant is actually in stock
  const isAvailableInShopify = isVariantAvailableInShopify(
    productBuyButtonState.allSelectableOptions,
    optionObj
  )

  // Whether the variant combination is available depending on what the user is choosing
  const isAvailableToSelect = isVariantAvailableToSelect(
    selectedOptions,
    productBuyButtonState.isOptionSelected,
    optionNameValue,
    productBuyButtonState.variants,
    isAvailableInShopify,
    settings
  )

  function onSelection() {
    productBuyButtonDispatch({
      type: "UPDATE_SELECTED_OPTIONS",
      payload: optionNameValue,
    })

    productBuyButtonDispatch({
      type: "SET_SELECTED_OPTION",
      payload: optionNameValue,
    })

    if (setIsDropdownOpen !== null) {
      setIsDropdownOpen(false)
    }

    if (selectedOptions && selectedOptions.hasOwnProperty(optionObj.name)) {
      productBuyButtonDispatch({
        type: "SET_IS_OPTION_SELECTED",
        payload: true,
      })
    } else {
      productBuyButtonDispatch({
        type: "SET_IS_OPTION_SELECTED",
        payload: false,
      })
    }

    wp.hooks.doAction(
      "on.variantsSelection",
      optionNameValue,
      productBuyButtonState
    )
  }

  return wp.element.cloneElement(children, {
    onSelection: onSelection,
    optionObj: optionObj,
    isAvailableToSelect: isAvailableToSelect,
    selectedOptions: selectedOptions,
    variants: productBuyButtonState.variants,
    totalOptions: productBuyButtonState.totalOptions,
    isAvailableInShopify: isAvailableInShopify,
  })
}

export default ProductOptionValue
