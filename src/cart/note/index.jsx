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
      inputElement.current.focus()
    }
  }, [shopState.cartData.note])

  function onChange(e) {
    if (shopState.isCartUpdating) {
      return
    }

    setNoteValue(e.target.value)
  }

  return (
    <section className="swp-cart-notes wps-cart-notes">
      <label htmlFor="wps-input-notes">
        {shopState.t.l.checkoutNotes}{" "}
        {shopwp.general.noteRequired ? <span>(Required)</span> : null}
      </label>
      <textarea
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
