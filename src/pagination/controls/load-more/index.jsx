import { usePortal } from "@shopwp/hooks"
import { InView } from "react-intersection-observer"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../../items/_state/requests/hooks"

import Loader from "../../../loader"

function PaginationLoadMore() {
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()

  function onViewChange(inView, entry) {
    if (!settings.infiniteScroll) {
      return
    }

    if (inView && !requestsState.isFetchingNew) {
      onClick()
    }
  }

  function onClick(e) {
    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_FETCHING_NEW",
      payload: true,
    })
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      onClick(e)
    }
  }

  return usePortal(
    <InView rootMargin="10px 0px 0px 0px" as="div" onChange={onViewChange}>
      <div
        disabled={requestsState.isFetchingNew}
        className="swp-btn swp-button-pagination wps-btn-next-page"
        data-is-working={requestsState.isFetchingNew}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex="0"
      >
        {requestsState.isFetchingNew ? (
          <Loader isLoading={requestsState.isFetchingNew} />
        ) : null}

        <span className="swp-add-to-cart-text">
          {settings.paginationLoadMoreText}
        </span>
      </div>
    </InView>,
    settings.dropzoneLoadMore
  )
}

export default PaginationLoadMore
