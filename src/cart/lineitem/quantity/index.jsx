/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { updateLines, removeLines } from "../../api"
import {
  useShopState,
  useShopDispatch,
  useCartDispatch,
  useCartState,
} from "@shopwp/components"
import { getMaxQuantity } from "@shopwp/common"
import Quantity from "../../../quantity"

function CartLineItemQuantity({ lineItem, setNotice }) {
  const { useState } = wp.element
  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()
  const maxQuantity = getMaxQuantity(
    cartState.settings.showInventoryLevels,
    cartState.settings.lineitemsMaxQuantity,
    lineItem.merchandise,
    true
  )

  const minQuantity = cartState.settings.lineitemsMinQuantity
  const customStep = cartState.settings.lineitemsQuantityStep

  function onChange(newQuantity) {
    if (lineItem.quantity === newQuantity) {
      return
    }

    if (newQuantity === 0) {
      removeLines(lineItem.id, shopState, cartDispatch, shopDispatch)
    } else {
      updateLines(
        shopState,
        cartState,
        cartDispatch,
        shopDispatch,
        lineItem,
        newQuantity
      )
    }
  }

  return (
    <Quantity
      dispatch={cartDispatch}
      quantityStep={customStep}
      maxQuantity={maxQuantity}
      minQuantity={minQuantity}
      initialQuantity={lineItem.quantity}
      lineItem={lineItem}
      onChange={onChange}
      isUpdating={shopState.isCartUpdating}
      setNotice={setNotice}
      globalMaxQuantity={cartState.settings.maxQuantity}
      inventoryErrors={cartState.inventoryErrors}
    />
  )
}

export default CartLineItemQuantity
