import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { useStorefrontDispatch } from "../_state/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"

function StorefrontSelectionsClear() {
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const storefrontDispatch = useStorefrontDispatch()
  const settings = useSettingsState()

  function clearAllSelections() {
    storefrontDispatch({ type: "CLEAR_SELECTIONS" })
    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

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

    storefrontDispatch({
      type: "SET_HAS_STOREFRONT_SELECTIONS",
      payload: false,
    })

    storefrontDispatch({ type: "SET_SEARCH_QUERY", payload: false })
  }

  return (
    <div
      className="swp-storefront-clear-selections wps-filter-selections-clear"
      onClick={clearAllSelections}
    >
      {settings.clearFilterSelectionsText}
    </div>
  )
}

export default StorefrontSelectionsClear
