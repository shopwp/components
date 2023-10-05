/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { buttonCSS } from "@shopwp/common"
import { InView } from "react-intersection-observer"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../../items/_state/requests/hooks"
import { useShopState } from "@shopwp/components"

import Loader from "../../../loader"

function PaginationLoadMore() {
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()

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

  const loadMoreButtonCSS = css`
    max-width: 150px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    background-color: ${settings.paginationLoadMoreButtonColor};
  `

  return usePortal(
    <InView rootMargin="10px 0px 0px 0px" as="div" onChange={onViewChange}>
      <div
        css={[buttonCSS, loadMoreButtonCSS]}
        disabled={requestsState.isFetchingNew}
        className="wps-btn-next-page"
        onClick={onClick}
      >
        {requestsState.isFetchingNew ? (
          <Loader isLoading={requestsState.isFetchingNew} />
        ) : (
          settings.paginationLoadMoreText
        )}
      </div>
    </InView>,
    settings.dropzoneLoadMore
  )
}

export default PaginationLoadMore
