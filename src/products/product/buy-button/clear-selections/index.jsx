/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductDispatch } from "../../_state/hooks"
import { fadeIn } from "@shopwp/common"
import { useProductBuyButtonDispatch } from "../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useShopState } from "@shopwp/components"

function ClearSelections() {
  const productDispatch = useProductDispatch()
  const settings = useSettingsState()
  const shopState = useShopState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()

  const ClearSelectionsCSS = css`
    position: absolute;
    right: 0;
    font-size: 14px;
    text-decoration: underline;
    margin: 0;
    z-index: 2;
    top: ${settings.variantStyle === "dropdown" ? "0px" : "-25px"};
    padding: 5px 0;
    animation: ${fadeIn} 0.2s ease;
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);

    &:hover {
      cursor: pointer;
    }
  `

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
    <p css={[ClearSelectionsCSS, fadeIn]} onClick={onClear}>
      {shopState.t.l.clearSelections}
    </p>
  )
}

export default ClearSelections
