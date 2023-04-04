/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { updateLines } from "../../api"
import { useCartDispatch, useCartState } from "@shopwp/components"
import { useShopState, useShopDispatch } from "@shopwp/components"

const Quantity = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Quantity-public' */ "../../../quantity")
)

function CartLineItemQuantity({ lineItem, setNotice }) {
  const cartState = useCartState()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()
  const quantityAvailable = lineItem.merchandise.quantityAvailable
  const maxQuantity = cartState.settings.lineitemsMaxQuantity
    ? cartState.settings.lineitemsMaxQuantity
    : quantityAvailable
    ? quantityAvailable
    : false

  const minQuantity = cartState.settings.lineitemsMinQuantity
  const customStep = cartState.settings.lineitemsQuantityStep

  function onChange(newQuantity) {
    if (lineItem.quantity === newQuantity) {
      return
    }

    updateLines(shopState, cartDispatch, shopDispatch, lineItem, newQuantity)
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
    />
  )
}

export default CartLineItemQuantity
