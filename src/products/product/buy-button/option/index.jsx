import { useProductState, useProductDispatch } from "../../_state/hooks"
import {
  createSelectedOptionsObject,
  findVariantFromVariantId,
} from "@shopwp/common"
import { useProductBuyButtonDispatch } from "../_state/hooks"

import isEmpty from "lodash-es/isEmpty"

function createSelected(options) {
  const obj = {}

  options.forEach((o) => (obj[o.name] = o.value))

  return obj
}

function ProductOption({ children, selectedOptions }) {
  const { useEffect } = wp.element
  const productState = useProductState()
  const productDispatch = useProductDispatch()
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

      productBuyButtonDispatch({
        type: "SET_SELECTED_OPTION",
        payload: selectedVariant,
      })

      productBuyButtonDispatch({
        type: "SET_IS_OPTION_SELECTED",
        payload: true,
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

          productBuyButtonDispatch({
            type: "SET_SELECTED_OPTION",
            payload: selectedOption,
          })

          productBuyButtonDispatch({
            type: "SET_IS_OPTION_SELECTED",
            payload: true,
          })
        })

        wp.hooks.doAction("on.beforeAddToCart", productState)
      }
    }
  }, [])

  // Resets the selected options state
  useEffect(() => {
    if (isEmpty(selectedOptions)) {
      productBuyButtonDispatch({
        type: "SET_IS_OPTION_SELECTED",
        payload: false,
      })

      productBuyButtonDispatch({
        type: "SET_SELECTED_OPTION",
        payload: {},
      })
    }
  }, [selectedOptions, productBuyButtonDispatch])

  return children
}

export default wp.element.memo(ProductOption)
