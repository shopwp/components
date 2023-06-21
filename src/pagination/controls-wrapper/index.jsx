/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import PaginationControls from "../controls"
import { isHidingPagination } from "@shopwp/common"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useRequestsState } from "../../items/_state/requests/hooks"

function PaginationControlsWrapper() {
  const settings = useSettingsState()
  const requestsState = useRequestsState()

  const hidingPagination = isHidingPagination(
    settings,
    requestsState.hasNextPage,
    requestsState.queryType
  )

  return hidingPagination === false ? <PaginationControls /> : null
}

export default PaginationControlsWrapper
