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

  const CartNotesCSS = css`
    margin-bottom: 0.5em;
    padding: 0;
    font-weight: none;
    color: #121212;

    span {
      color: red;
    }

    label {
      font-size: 15px;
      display: block;
      margin-bottom: 5px;
    }
  `

  const CartTextareaCSS = css`
    width: 100%;
    color: #121212;
    display: block;
    font-size: 15px;
    padding: 10px;
    border-color: #7e7e7e;
    appearance: none;
    font-family: inherit;
    border-radius: ${shopwp.general.globalBorderRadius};
    min-height: 100px;
    background: transparent;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: #969696;
    }
  `
  return (
    <section className="wps-cart-notes" css={CartNotesCSS}>
      <label htmlFor="wps-input-notes">
        {shopState.t.l.checkoutNotes}{" "}
        {shopwp.general.noteRequired ? <span>(Required)</span> : null}
      </label>
      <textarea
        css={CartTextareaCSS}
        placeholder={shopwp.general.cartNotesPlaceholder}
        id="wps-input-notes"
        className="wps-input wps-input-textarea"
        value={noteValue}
        onChange={onChange}
        ref={inputElement}
        disabled={shopState.isCartUpdating}
      />
    </section>
  )
}

export default CartNote
