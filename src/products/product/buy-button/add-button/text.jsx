/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { getButtonText } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

function AddButtonText({
  addedToCart,
  addToCartButtonTextColor,
  isDisabled,
  productBuyButtonState,
  settings,
  isDirectCheckout,
  productState,
}) {
  const { useRef, useEffect, useState } = wp.element
  const [added, setAdded] = useState(() => false)
  const addedTest = useRef()
  const shopState = useShopState()

  function getText() {
    if (added) {
      var text = shopState.t.l.added
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

  const [text, setText] = useState(getText())

  useEffect(() => {
    if (addedToCart) {
      setAdded(true)

      setTimeout(function () {
        if (addedTest.current) {
          setAdded(false)
        }
      }, 3000)
    }
  }, [addedToCart])

  useEffect(() => {
    setText(getText())
  }, [shopState.t])

  const AddButtonTextCSS = css`
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    color: ${addToCartButtonTextColor ? addToCartButtonTextColor : "inherit"};
    transition: all 0.3s ease;

    &:hover {
      cursor: ${isDisabled ? "not-allowed" : "pointer"};
    }
  `

  return (
    <span
      css={AddButtonTextCSS}
      ref={addedTest}
      aria-label="Product Add to Cart Text"
    >
      {text}
    </span>
  )
}

export default AddButtonText
