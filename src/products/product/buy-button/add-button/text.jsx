/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { getButtonText } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

function AddButtonText({
  addedToCart,
  productBuyButtonState,
  settings,
  isDirectCheckout,
  productState,
}) {
  const { useRef, useEffect, useState } = wp.element
  const [added, setAdded] = useState(() => false)
  const addedTest = useRef()
  const shopState = useShopState()

  const [text, setText] = useState("")

  function getText(addedForce = false) {
    if (added || addedForce) {
      var text = settings.afterAddedText
    } else {
      var text = getButtonText(
        settings,
        isDirectCheckout,
        settings.linkWithBuyButton,
        shopState
      )
    }

    return wp.hooks.applyFilters(
      "product.addToCartText",
      text,
      productBuyButtonState,
      productState
    )
  }

  useEffect(() => {
    if (addedToCart) {
      setAdded(true)
      setText(getText(true))

      setTimeout(function () {
        if (addedTest.current) {
          setAdded(false)
          setText(getText())
        }
      }, 3000)
    }
  }, [addedToCart])

  useEffect(() => {
    setText(getText())
  }, [shopState.t, settings])

  return (
    <span
      className="swp-add-to-cart-text"
      ref={addedTest}
      aria-label={productState.payload.title + " add to cart text"}
    >
      {text}
    </span>
  )
}

export default AddButtonText
