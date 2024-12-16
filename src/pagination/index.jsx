import PaginationControlsWrapper from "./controls-wrapper"
import PaginationItems from "./items"
import { usePayloadState } from "../items/_state/payload/hooks"
import { addFinishedLoadingClass } from "@shopwp/common"

function Pagination({
  children,
  payload = false,
  customPagination = false,
  queryType,
}) {
  const { useEffect, Suspense } = wp.element

  payload = payload ? payload : usePayloadState()

  useEffect(() => {
    if (customPagination || (payload && payload.length)) {
      wp.hooks.doAction("on.itemsLoad", payload)
      addFinishedLoadingClass()
    }
  }, [payload])

  return customPagination ? (
    children
  ) : payload && payload.length ? (
    <Suspense fallback={false}>
      <PaginationItems payload={payload}>{children}</PaginationItems>
      <PaginationControlsWrapper />
    </Suspense>
  ) : null
}

export default Pagination
