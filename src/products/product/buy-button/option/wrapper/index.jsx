import { ProductOptionContext } from "../_state/context"
import { useProductState, useProductDispatch } from "../../../_state/hooks"
import {
  createSelectedOptionsObject,
  findVariantFromVariantId,
} from "@shopwp/common"
import { useFirstRender } from "@shopwp/hooks"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../../_state/hooks"

import isEmpty from "lodash/isEmpty"

const { useContext, useEffect } = wp.element

function createSelected(options) {
  const obj = {}

  options.forEach((o) => (obj[o.name] = o.value))

  return obj
}

function ProductOptionWrapper({ children }) {
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const [, productOptionDispatch] = useContext(ProductOptionContext)
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const isFirstRender = useFirstRender()

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

      productOptionDispatch({
        type: "SET_SELECTED_OPTION",
        payload: selectedVariant,
      })

      productOptionDispatch({
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

          productOptionDispatch({
            type: "SET_SELECTED_OPTION",
            payload: selectedOption,
          })

          productOptionDispatch({
            type: "SET_IS_OPTION_SELECTED",
            payload: true,
          })
        })

        wp.hooks.doAction("on.beforeAddToCart", productState)
      }
    }
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (isEmpty(productBuyButtonState.selectedOptions)) {
      productOptionDispatch({
        type: "SET_IS_OPTION_SELECTED",
        payload: false,
      })

      productOptionDispatch({
        type: "SET_SELECTED_OPTION",
        payload: {},
      })
    }
  }, [productBuyButtonState.selectedOptions, productOptionDispatch])

  return children
}

export default ProductOptionWrapper
