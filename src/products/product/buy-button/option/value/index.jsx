import { ProductOptionContext } from "../_state/context"
import { createObj, findVariantFromVariantsList } from "@shopwp/common"
import { useProductBuyButtonDispatch } from "../../_state/hooks"
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
  productOptionState,
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
  if (productOptionState.isOptionSelected) {
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
  variants = false,
  totalOptions = false,
  children,
  allSelectableOptions,
}) {
  const { useContext } = wp.element
  const [productOptionState, productOptionDispatch] =
    useContext(ProductOptionContext)
  const optionNameValue = createObj(optionObj.name, optionObj.value)

  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const settings = useSettingsState()

  // Whether the variant is actually in stock
  const isAvailableInShopify = isVariantAvailableInShopify(
    allSelectableOptions,
    optionObj
  )

  // Whether the variant combination is available depending on what the user is choosing
  const isAvailableToSelect = isVariantAvailableToSelect(
    selectedOptions,
    productOptionState,
    optionNameValue,
    variants,
    isAvailableInShopify,
    settings
  )

  function onSelection() {
    productBuyButtonDispatch({
      type: "UPDATE_SELECTED_OPTIONS",
      payload: optionNameValue,
    })

    productOptionDispatch({
      type: "SET_SELECTED_OPTION",
      payload: optionNameValue,
    })

    productOptionDispatch({
      type: "TOGGLE_DROPDOWN",
      payload: false,
    })

    productOptionDispatch({
      type: "SET_IS_OPTION_SELECTED",
      payload: true,
    })

    wp.hooks.doAction(
      "on.variantsSelection",
      optionNameValue,
      productOptionState
    )
  }

  return wp.element.cloneElement(children, {
    onSelection: onSelection,
    optionObj: optionObj,
    isAvailableToSelect: isAvailableToSelect,
    selectedOptions: selectedOptions,
    variants: variants,
    totalOptions: totalOptions,
    isAvailableInShopify: isAvailableInShopify,
  })
}

export default ProductOptionValue
