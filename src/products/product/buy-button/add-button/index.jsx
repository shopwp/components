/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { findVariantFromSelectedOptions, allOptionsSelectedMatch } from "Common"
import { buttonCSS, mq } from "Common/css"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"
import Notice from "../../../../notice"
import Link from "../../../../link"
import Loader from "../../../../loader"
import ProductBuyButtonLeftInStock from "../left-in-stock"
import { useShopState } from "ShopState"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import Quantity from "../../../../quantity"
import { getButtonText } from "Common/settings"

const { useRef, useEffect, useState } = wp.element

function findSingleVariantFromPayload(payload) {
  if (!payload.variants.edges.length) {
    return false
  }

  return payload.variants.edges[0]
}

function buildLines(variant, quantity, productBuyButtonState) {
  const data = {
    attributes: wp.hooks.applyFilters(
      "cart.lineItemAttributes",
      [],
      variant,
      quantity,
      productBuyButtonState
    ),
    merchandiseId: variant.node.id,
    quantity: quantity,
  }

  if (productBuyButtonState?.subscription) {
    data["sellingPlanId"] = productBuyButtonState.subscription.sellingPlanId
  }

  return [data]
}

function AddButtonWrapper({
  hasLink,
  children,
  linkTo,
  linkTarget,
  isDirectCheckout,
  linkWithBuyButton,
  payload,
}) {
  return hasLink && !isDirectCheckout && !linkWithBuyButton ? (
    <Link type="products" linkTo={linkTo} target={linkTarget} payload={payload}>
      {children}
    </Link>
  ) : (
    children
  )
}

function AddButton({
  addToCartButtonColor,
  addToCartButtonTextColor,
  hasLink,
  linkWithBuyButton,
  isDirectCheckout,
  hasManyVariants,
  loader,
  addedToCart,
  quantity,
  selectedOptions,
  linkTo,
}) {
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const settings = useSettingsState()

  const [shouldShake, setShouldShake] = wp.element.useState(false)
  const shopState = useShopState()
  function findVariant() {
    if (hasManyVariants) {
      return findVariantFromSelectedOptions(
        productState.payload,
        selectedOptions
      )
    } else {
      return findSingleVariantFromPayload(productState.payload)
    }
  }

  const [isDisabled, setIsDisabled] = useState(false)
  var variant = findVariant()

  useEffect(() => {
    var allOptionsSelected = allOptionsSelectedMatch(
      selectedOptions,
      productState.payload
    )

    if (!allOptionsSelected) {
      setIsDisabled(false)
      return
    }

    let variantNew = findVariant()

    if (!variantNew) {
      setIsDisabled(true)
      return
    }

    if (variantNew.node.availableForSale) {
      setShouldShake(true)
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [selectedOptions])

  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const button = useRef()
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const maxQuantity = settings.maxQuantity

  const NoticeCSS = css`
    margin-top: 15px;
  `

  const headShake = keyframes`
		0% {
			transform: translateX(0);
		}

		6.5% {
			transform: translateX(-6px) rotateY(-9deg);
		}

		18.5% {
			transform: translateX(5px) rotateY(7deg);
		}

		31.5% {
			transform: translateX(-3px) rotateY(-5deg);
		}

		43.5% {
			transform: translateX(2px) rotateY(3deg);
		}

		50% {
			transform: translateX(0);
		}
	`

  const addToCartCSS = css`
		font-family: ${
      settings.addToCartButtonTypeFontFamily
        ? settings.addToCartButtonTypeFontFamily
        : "inherit"
    };
		font-weight: ${
      settings.addToCartButtonTypeFontWeight
        ? settings.addToCartButtonTypeFontWeight
        : "initial"
    };
		font-style: ${
      settings.addToCartButtonTypeFontStyle
        ? settings.addToCartButtonTypeFontStyle
        : "initial"
    };
		font-size: ${
      settings.addToCartButtonTypeFontSize
        ? settings.addToCartButtonTypeFontSize
        : "initial"
    };
		letter-spacing: ${
      settings.addToCartButtonTypeLetterSpacing
        ? settings.addToCartButtonTypeLetterSpacing
        : "initial"
    };
		line-height: ${
      settings.addToCartButtonTypeLineHeight
        ? settings.addToCartButtonTypeLineHeight
        : 1
    };
		text-decoration: ${
      settings.addToCartButtonTypeTextDecoration
        ? settings.addToCartButtonTypeTextDecoration
        : "initial"
    };
		text-transform: ${
      settings.addToCartButtonTypeTextTransform
        ? settings.addToCartButtonTypeTextTransform
        : "initial"
    };
		overflow-y: hidden;
		flex: 1;
		min-width: 160px;
    min-height: 45px;
		animation: ${
      shouldShake
        ? css`
            ${headShake} 0.9s ease-in-out
          `
        : "none"
    }

		&:focus,
		&:hover {
			text-decoration: none;
			cursor: ${isCheckingOut || isDisabled ? "not-allowed" : "pointer"};

			color: ${
        isCheckingOut || isDisabled
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.7)"
      };
		}

		&& {
			background-color: ${isDisabled ? "#cfcfcf" : addToCartButtonColor};
		}
	`

  async function handleClick(e) {
    if (linkTo === "modal" && !isDirectCheckout && !linkWithBuyButton) {
      productDispatch({ type: "TOGGLE_MODAL", payload: true })
      return
    }

    if (hasLink && !isDirectCheckout && !linkWithBuyButton) {
      return
    }

    e.preventDefault()

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!variant && hasManyVariants) {
      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      return
    }

    if (!variant) {
      // TODO: Handle this better
      console.error("ShopWP error: handleClick variant undefined ")

      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })
      return
    }

    const lineItemOptions = wp.hooks.applyFilters("product.lineItemOptions", {
      minQuantity: settings.minQuantity,
      maxQuantity: settings.maxQuantity,
      subscription: productBuyButtonState.subscription,
      attributes: productBuyButtonState.attributes,
      variantId: variant.node.id,
    })

    const lines = buildLines(variant, quantity, productBuyButtonState)

    if (
      shopwp.cart.maxQuantity &&
      shopState.cartData.totalQuantity + quantity > shopwp.cart.maxQuantity
    ) {
      productBuyButtonDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: shopState.t.w.maxCartTotal,
        },
      })

      return
    }

    if (isDirectCheckout) {
      var checkoutData = {
        lines: lines,
        lineItemOptions: [
          {
            variantId: variant.node.id,
            options: lineItemOptions,
          },
        ],
        note: false,
        discountCode: false,
        customAttributes: false,
      }

      productDispatch({
        type: "SET_DIRECT_CHECKOUT_PARAMS",
        payload: checkoutData,
      })

      productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: true })

      wp.hooks.doAction("do.directCheckout", checkoutData)
    } else {
      const resetAfter = settings.resetVariantsAfterAdding
      const openCartAfterAdding = settings.openCartAfterAdding

      let addToCartParams = {
        lines: lines,
        extras: {
          openCartAfterAdding: settings.openCartAfterAdding,
        },
      }

      if (
        productState.payload.requiresSellingPlan &&
        !productBuyButtonState.subscription
      ) {
        productBuyButtonDispatch({
          type: "SET_NOTICE",
          payload: {
            type: "error",
            message: shopState.t.e.requireSub,
          },
        })
        return
      }

      if (resetAfter) {
        productDispatch({ type: "SET_ADDED_VARIANT", payload: variant.node })
        productDispatch({ type: "SET_SELECTED_VARIANT", payload: false })
      }

      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })
      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: false })
      productDispatch({ type: "SET_NOTICE", payload: false })

      wp.hooks.doAction("do.addToCart", addToCartParams)
    }
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        role="button"
        itemProp="potentialAction"
        itemScope
        itemType="https://schema.org/BuyAction"
        className="wps-btn wps-btn-secondary wps-add-to-cart"
        data-wps-is-direct-checkout={isDirectCheckout ? "1" : "0"}
        onClick={handleClick}
        css={[buttonCSS, addToCartCSS]}
        disabled={isCheckingOut || isDisabled}
      >
        {isCheckingOut ? (
          loader
        ) : (
          <AddButtonText
            isDisabled={isDisabled}
            addedToCart={addedToCart}
            addToCartButtonTextColor={addToCartButtonTextColor}
            productBuyButtonState={productBuyButtonState}
            settings={settings}
            isDirectCheckout={isDirectCheckout}
            productState={productState}
          />
        )}
      </button>

      {productBuyButtonState.notice ? (
        <Notice status={productBuyButtonState.notice.type} extraCSS={NoticeCSS}>
          {productBuyButtonState.notice.message}
        </Notice>
      ) : null}
    </>
  )
}

function AddButtonText({
  addedToCart,
  addToCartButtonTextColor,
  isDisabled,
  productBuyButtonState,
  settings,
  isDirectCheckout,
  productState,
}) {
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
      wp.hooks.applyFilters(
        "product.addToCart.text",
        text,
        productBuyButtonState,
        productState
      ),
      productBuyButtonState
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

function ProductAddButton({
  hasLink,
  linkTarget,
  linkTo,
  linkWithBuyButton,
  addToCartButtonColor,
  addToCartButtonTextColor,
  isDirectCheckout,
  hasManyVariants,
  productDispatch,
  addedToCart,
  quantity,
  selectedOptions,
  shouldShowQuantity,
}) {
  const settings = useSettingsState()
  const productState = useProductState()

  const AddButtonWrapperCSS = css`
    display: ${shouldShowQuantity ? "flex" : "block"};
    align-items: flex-start;
    flex-wrap: wrap;

    .wps-quantity-container {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    ${mq("medium")} {
      flex-direction: column;

      .wps-quantity-container {
        margin-bottom: 10px;
      }
    }
  `

  function onQuantityChange(newQuantity) {
    productDispatch({ type: "UPDATE_QUANTITY", payload: newQuantity })
  }

  return (
    <div
      className="wps-component wps-component-products-add-button wps-btn-wrapper"
      aria-label="Product Add Button"
    >
      <div css={AddButtonWrapperCSS}>
        {shouldShowQuantity ? (
          <Quantity
            dispatch={productDispatch}
            onChange={onQuantityChange}
            quantityStep={settings.quantityStep}
            maxQuantity={
              settings.maxQuantity
                ? settings.maxQuantity
                : productState.payload.totalInventory
                ? productState.payload.totalInventory
                : false
            }
            minQuantity={settings.minQuantity}
            initialQuantity={
              settings.minQuantity > 1 ? settings.minQuantity : 1
            }
            globalMaxQuantity={shopwp.cart.maxQuantity}
            small={false}
          />
        ) : null}

        <AddButtonWrapper
          hasLink={hasLink}
          linkTarget={linkTarget}
          linkTo={linkTo}
          linkWithBuyButton={linkWithBuyButton}
          isDirectCheckout={isDirectCheckout}
          payload={productState.payload}
        >
          <AddButton
            hasLink={hasLink}
            linkWithBuyButton={linkWithBuyButton}
            addToCartButtonColor={addToCartButtonColor}
            addToCartButtonTextColor={addToCartButtonTextColor}
            loader={<Loader />}
            isDirectCheckout={isDirectCheckout}
            hasManyVariants={hasManyVariants}
            addedToCart={addedToCart}
            quantity={quantity}
            selectedOptions={selectedOptions}
            linkTo={linkTo}
          />
        </AddButtonWrapper>
      </div>

      {settings.showInventoryLevels &&
      productState.payload.availableForSale &&
      productState.payload.totalInventory ? (
        <ProductBuyButtonLeftInStock />
      ) : null}
    </div>
  )
}

export default ProductAddButton
