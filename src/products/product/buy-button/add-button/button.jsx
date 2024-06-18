/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useShopState } from "../../../../shop/_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import {
  findVariantFromSelectedOptions,
  findVariantByVariantId,
  allOptionsSelectedMatch,
  to,
  createCheckoutUrl,
} from "@shopwp/common"
import { maybeHandleApiError } from "@shopwp/api"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"

import { directCheckout } from "../../../../cart/api.jsx"

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

function buildLines(variant, quantity, productState, buttonRef) {
  var customAttrs = wp.hooks.applyFilters(
    "cart.lineItemAttributes",
    [],
    variant,
    quantity,
    productState,
    buttonRef
  )

  const data = {
    attributes: customAttrs,
    merchandiseId: variant.node.id,
    quantity: quantity,
  }

  // Responsible for turning a normal product into a subscription before adding to cart
  if (productState?.selectedSubscription) {
    data["sellingPlanId"] = productState.selectedSubscription.id
  }

  return wp.hooks.applyFilters("cart.lineItems", [data], variant, productState)
}

function AddButton({
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
  const [isDisabled, setIsDisabled] = useState(
    !productState.payload.availableForSale && linkTo === "none"
  )
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const button = useRef()

  function findVariant() {
    if (settings.variantId) {
      return findVariantByVariantId(productState.payload, settings.variantId)
    }

    if (hasManyVariants) {
      return findVariantFromSelectedOptions(
        productState.payload.variants,
        selectedOptions
      )
    } else {
      return findSingleVariantFromPayload(productState.payload)
    }
  }

  var variant = findVariant()

  const buttonCSS = css``
  const addToCartCSS = css``

  const NoticeCSS = css`
    margin-top: 15px;
    width: 100%;
  `

  async function handleClick(e) {
    if (linkTo === "modal" && !linkWithBuyButton) {
      productDispatch({ type: "TOGGLE_MODAL", payload: true })
      return
    }

    if (hasLink && !linkWithBuyButton) {
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

    const lines = buildLines(variant, quantity, productState, button.current)

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

    if (settings.variantId) {
      wp.hooks.doAction("do.addToCart", {
        lines: lines,
        extras: {
          openCartAfterAdding: settings.openCartAfterAdding,
        },
      })
      return
    }

    // If the product requires a selling plan, but no subscription selected, complain
    if (
      productState.payload.requiresSellingPlan &&
      !productState.selectedSubscription
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

  useEffect(() => {
    var allOptionsSelected = allOptionsSelectedMatch(
      selectedOptions,
      productState.payload
    )

    if (!allOptionsSelected) {
      if (!productState.payload.availableForSale && linkTo === "none") {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }

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

  useEffect(() => {
    if (!shopState.directCheckoutError) {
      return
    }
    setIsCheckingOut(false)
    productBuyButtonDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: shopState.directCheckoutError,
      },
    })
  }, [shopState.directCheckoutError])

  return (
    <>
      {isDirectCheckout ? (
        <DirectCheckoutButton
          shopState={shopState}
          isDisabled={isDisabled}
          addedToCart={addedToCart}
          productBuyButtonState={productBuyButtonState}
          productBuyButtonDispatch={productBuyButtonDispatch}
          settings={settings}
          productState={productState}
          productDispatch={productDispatch}
          quantity={quantity}
          variant={variant}
          hasManyVariants={hasManyVariants}
        />
      ) : (
        <button
          ref={button}
          type="button"
          role="button"
          itemProp="potentialAction"
          itemScope
          itemType="https://schema.org/BuyAction"
          className="swp-btn swp-btn-add-to-cart wps-btn wps-btn-secondary wps-add-to-cart"
          data-is-direct-checkout={isDirectCheckout}
          data-should-shake={shouldShake}
          data-is-checking-out={isCheckingOut}
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
              productBuyButtonState={productBuyButtonState}
              settings={settings}
              isDirectCheckout={isDirectCheckout}
              productState={productState}
            />
          )}
        </button>
      )}

      {productBuyButtonState.notice ? (
        <Notice
          status={productBuyButtonState.notice.type}
          extraCSS={NoticeCSS}
          className="swp-l-row-break"
        >
          {productBuyButtonState.notice.message}
        </Notice>
      ) : null}
    </>
  )
}

function DirectCheckoutButton({
  isDisabled,
  addedToCart,
  settings,
  productState,
  shopState,
  variant,
  quantity,
  productBuyButtonState,
  productDispatch,
  hasManyVariants,
  productBuyButtonDispatch,
}) {
  const { useState, useRef } = wp.element

  const [checkoutLink, setCheckoutLink] = useState(undefined)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const button = useRef()

  var shouldDisable = false

  async function onCheckout(e) {
    if (!variant && hasManyVariants) {
      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      return
    }

    if (!variant) {
      console.error("ShopWP error: handleClick variant undefined ")

      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })

      return
    }

    if (shouldDisable) {
      return
    }

    setIsCheckingOut(true)

    const lines = buildLines(variant, quantity, productState, button.current)

    var checkoutData = {
      lines: lines,
      note: false,
      discountCode: false,
      customAttributes: false,
      settings: settings,
    }

    productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: true })

    const [error, resp] = await to(directCheckout(checkoutData, shopState))

    var errMsg = maybeHandleApiError(error, resp)

    if (errMsg) {
      setIsCheckingOut(false)
      productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: false })

      productBuyButtonDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: errMsg,
        },
      })
      return
    }

    if (resp) {
      var checkoutURL = createCheckoutUrl({
        checkoutUrl: resp.checkoutUrl,
        trackingParams: shopState.trackingParams,
      })

      setCheckoutLink(checkoutURL)
    }
  }

  function callbackAfter() {
    setTimeout(() => {
      setIsCheckingOut(false)
      productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: false })
      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })
      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: false })
      setCheckoutLink(undefined)
    }, 500)
  }

  return isCheckingOut && checkoutLink ? (
    <AutoClickLink href={checkoutLink} callback={callbackAfter} />
  ) : (
    <div
      className="swp-btn swp-l-flex swp-btn swp-btn-add-to-cart swp-btn-direct-checkout"
      onClick={onCheckout}
      ref={button}
      data-is-disabled={isCheckingOut || isDisabled}
    >
      {isCheckingOut ? (
        <Loader />
      ) : (
        <AddButtonText
          isDisabled={isDisabled}
          addedToCart={addedToCart}
          productBuyButtonState={productBuyButtonState}
          settings={settings}
          productState={productState}
          isDirectCheckout={true}
        />
      )}
    </div>
  )
}

function AutoClickLink({ href, callback }) {
  const { useEffect, useRef } = wp.element
  const linkBtn = useRef()

  useEffect(() => {
    linkBtn.current.click()
    callback()
  }, [])

  return (
    <a
      ref={linkBtn}
      href={href}
      className="swp-btn swp-l-flex swp-btn-direct-checkout-linker"
      target={
        shopwp.misc.isMobile ? "_self" : shopwp.general.checkoutButtonTarget
      }
      data-is-disabled={true}
    >
      <Loader />
    </a>
  )
}

export default AddButton
