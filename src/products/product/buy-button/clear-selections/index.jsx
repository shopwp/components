/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductDispatch } from "../../_state/hooks"
import { useProductBuyButtonDispatch } from "../_state/hooks"
import { useShopState } from "@shopwp/components"

function ClearSelections() {
  const productDispatch = useProductDispatch()
  const shopState = useShopState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()

  const ClearSelectionsCSS = css``

  function onClear() {
    productDispatch({ type: "SET_MISSING_SELECTIONS", payload: false })
    productDispatch({ type: "SET_SELECTED_VARIANT", payload: false })
    productDispatch({ type: "SET_SELECTED_SUBSCRIPTION_INFO", payload: false })
    productDispatch({ type: "SET_NOTICE", payload: false })
    productBuyButtonDispatch({
      type: "UPDATE_SELECTED_OPTIONS",
      payload: false,
    })
  }

  return (
    <p
      className="swp-clear-selections"
      css={ClearSelectionsCSS}
      onClick={onClear}
    >
      {shopState.t.l.clearSelections}
    </p>
  )
}

export default ClearSelections
