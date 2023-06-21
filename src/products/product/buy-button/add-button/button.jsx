/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useShopState } from "../../../../shop/_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import {
  findVariantFromSelectedOptions,
  findVariantByVariantId,
  allOptionsSelectedMatch,
} from "@shopwp/common"
import { buttonCSS } from "@shopwp/common"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"

const AddButtonText = wp.element.lazy(() =>
  import(/* webpackChunkName: 'AddButtonText-public' */ "./text")
)

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../../notice")
)

import Loader from "../../../../loader"

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

function AddButton({
  addToCartButtonColor,
  addToCartButtonTextColor,
  hasLink,
  linkWithBuyButton,
  isDirectCheckout,
  hasManyVariants,
  addedToCart,
  quantity,
  selectedOptions,
  linkTo,
}) {
  const { useRef, useEffect, useState } = wp.element

  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const settings = useSettingsState()
  const shopState = useShopState()
  const [shouldShake, setShouldShake] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const button = useRef()

  function findVariant() {
    if (settings.variantId) {
      return findVariantByVariantId(productState.payload, settings.variantId)
    }

    if (hasManyVariants) {
      return findVariantFromSelectedOptions(
        productState.payload,
        selectedOptions
      )
    } else {
      return findSingleVariantFromPayload(productState.payload)
    }
  }

  var variant = findVariant()

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
    } !important;
		letter-spacing: ${
      settings.addToCartButtonTypeLetterSpacing
        ? settings.addToCartButtonTypeLetterSpacing
        : "initial"
    };
		line-height: ${
      settings.addToCartButtonTypeLineHeight
        ? settings.addToCartButtonTypeLineHeight
        : 1
    } !important;
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
    min-height: 45px;
    width: 100%;
    max-width: auto;
    min-width: auto;
    flex: 1;
    border-radius: ${settings.globalBorderRadius};

		animation: ${
      shouldShake && !isCheckingOut
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
      if (settings.linkTarget === "_self") {
        setIsCheckingOut(true)
      }

      var checkoutData = {
        lines: lines,
        note: false,
        discountCode: false,
        customAttributes: false,
        settings: settings,
      }

      productDispatch({
        type: "SET_DIRECT_CHECKOUT_PARAMS",
        payload: checkoutData,
      })

      productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: true })

      wp.hooks.doAction("do.directCheckout", checkoutData)
    } else {
      if (settings.variantId) {
        wp.hooks.doAction("do.addToCart", {
          lines: lines,
          extras: {
            openCartAfterAdding: settings.openCartAfterAdding,
          },
        })
        return
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

      productDispatch({ type: "SET_ADDED_VARIANT", payload: variant.node })

      if (settings.resetVariantsAfterAdding) {
        productDispatch({ type: "SET_SELECTED_VARIANT", payload: false })

        productBuyButtonDispatch({
          type: "UPDATE_SELECTED_OPTIONS",
          payload: false,
        })
      }

      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: false })
      productDispatch({ type: "SET_NOTICE", payload: false })

      wp.hooks.doAction("do.addToCart", {
        lines: lines,
        extras: {
          openCartAfterAdding: settings.openCartAfterAdding,
        },
      })
    }
  }

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
          <Loader />
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

export default AddButton
