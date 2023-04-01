/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import PaginationControls from "../controls"
import { isHidingPagination } from "Common"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useRequestsState } from "../../items/_state/requests/hooks"

function PaginationControlsWrapper() {
  const settings = useSettingsState()
  const requestsState = useRequestsState()

  const hidingPagination = isHidingPagination(
    settings,
    requestsState.hasNextPage
  )

  return hidingPagination === false ? <PaginationControls /> : null
}

export default PaginationControlsWrapper
