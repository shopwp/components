import { useProductState } from "../../_state/hooks"
import {
  createSelectedOptionsObject,
  findVariantFromVariantId,
  onlyInStockVariants,
} from "@shopwp/common"
import { useProductBuyButtonDispatch } from "../_state/hooks"

function createSelected(options) {
  const obj = {}

  options.forEach((o) => (obj[o.name] = o.value))

  return obj
}

function ProductOption({ children }) {
  const { useEffect } = wp.element
  const productState = useProductState()
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

      var firstVariant = onlyInStockVariants(
        productState.payload.variants.edges
      )

      if (!firstVariant.length) {
        productBuyButtonDispatch({
          type: "SET_NOTICE",
          payload: {
            type: "error",
            message: "No in stock variants found to select",
          },
        })
        return
      } else {
        firstVariant = firstVariant[0].node
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

export default ProductOption
