import { useProductState, useProductDispatch } from "../../_state/hooks"
import {
  createSelectedOptionsObject,
  findVariantFromVariantId,
  createObj,
} from "@shopwp/common"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"

import isEmpty from "lodash-es/isEmpty"

function createSelected(options) {
  const obj = {}

  options.forEach((o) => (obj[o.name] = o.value))

  return obj
}

function ProductOption({ children, selectedOptions, option }) {
  const { useEffect } = wp.element
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()

  // Allows for selecting first variant
  useEffect(() => {
    if (productState.selectFirstVariant) {
      if (!productState.payload.variants.edges.length) {
        console.warn(
          "ShopWP warning: Unable to select first variant because no variants exist."
        )
        return
      }

      const firstVariant = productState.payload.variants.edges[0].node

      if (
        !productState.payload.availableForSale ||
        !firstVariant.availableForSale ||
        !firstVariant.selectedOptions
      ) {
        console.warn(
          "ShopWP warning: Unable to select first variant because product is not available for sale."
        )
        return
      }

      const selectedVariant = createSelected(firstVariant.selectedOptions)

      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: selectedVariant,
      })
    } else if (productState.preSelectVariant) {
      var foundVariant = findVariantFromVariantId(
        productState.preSelectVariant,
        productState.payload
      )

      if (foundVariant) {
        var createdOptions = createSelectedOptionsObject(
          foundVariant.node.selectedOptions
        )

        productDispatch({
          type: "SET_SELECTED_VARIANT",
          payload: foundVariant,
        })

        createdOptions.forEach((selectedOption) => {
          productBuyButtonDispatch({
            type: "UPDATE_SELECTED_OPTIONS",
            payload: selectedOption,
          })
        })

        wp.hooks.doAction("on.beforeAddToCart", productState)
      }
    }
  }, [])

  return children
}

export default wp.element.memo(ProductOption)
