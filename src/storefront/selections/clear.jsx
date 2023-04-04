/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useItemsDispatch } from "../../items/_state/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { useStorefrontDispatch } from "../_state/hooks"
import { useShopState } from "@shopwp/components"

function StorefrontSelectionsClear() {
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const itemsDispatch = useItemsDispatch()
  const storefrontDispatch = useStorefrontDispatch()
  const shopState = useShopState()

  function clearAllSelections() {
    storefrontDispatch({ type: "CLEAR_SELECTIONS" })

    requestsDispatch({ type: "SET_QUERY_TYPE", payload: "products" })

    requestsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: requestsState.originalParams,
    })

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })
    requestsDispatch({ type: "SET_IS_FETCHING_NEW", payload: true })
    itemsDispatch({ type: "SET_HAS_STOREFRONT_SELECTIONS", payload: false })
    itemsDispatch({ type: "SET_SEARCH_QUERY", payload: false })
  }

  const clearAllCSS = css`
    text-decoration: underline;
    font-size: 14px;
    margin-left: 4px;
    margin-top: 0px;
    position: relative;
    top: -2px;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  `

  return (
    <div
      className="wps-filter-selections-clear"
      onClick={clearAllSelections}
      css={clearAllCSS}
    >
      {shopState.t.l.clearAll}
    </div>
  )
}

export { StorefrontSelectionsClear }
