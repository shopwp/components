/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState, useShopDispatch } from "@shopwp/components"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { updateCartNote } from "../api.jsx"
import { useFirstRender, useDebounce } from "@shopwp/hooks"

function CartNote() {
  const { useState, useRef, useEffect } = wp.element
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const inputElement = useRef()
  const [noteValue, setNoteValue] = useState(shopState.cartData.note)

  const debouncedValue = useDebounce(
    noteValue,
    cartState.settings.notesUpdateFrequency
  )
  const isFirstRender = useFirstRender()

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (shopState.cartData.note === debouncedValue) {
      return
    }

    shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

    updateCartNote(
      debouncedValue,
      shopState,
      cartDispatch,
      inputElement,
      shopDispatch
    )
  }, [debouncedValue])

  useEffect(() => {
    if (shopState.cartData.note) {
      setNoteValue(shopState.cartData.note)
    }
  }, [shopState.cartData.note])

  function onChange(e) {
    if (shopState.isCartUpdating) {
      return
    }
    setNoteValue(e.target.value)
  }

  const CartNotesCSS = css``
  const CartTextareaCSS = css``

  return (
    <section className="swp-cart-notes wps-cart-notes" css={CartNotesCSS}>
      <label htmlFor="wps-input-notes">
        {shopState.t.l.checkoutNotes}{" "}
        {shopwp.general.noteRequired ? <span>(Required)</span> : null}
      </label>
      <textarea
        css={CartTextareaCSS}
        placeholder={shopwp.general.cartNotesPlaceholder}
        id="wps-input-notes"
        className="wps-input swp-input-textarea wps-input-textarea"
        value={noteValue}
        onChange={onChange}
        ref={inputElement}
        disabled={shopState.isCartUpdating}
      />
    </section>
  )
}

export default CartNote
