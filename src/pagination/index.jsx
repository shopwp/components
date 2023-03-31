import PaginationControlsWrapper from "./controls-wrapper"
import PaginationItems from "./items"
import { usePayloadState } from "../items/_state/payload/hooks"

function Pagination({ children, payload = false, customPagination = false }) {
  const { Suspense } = wp.element

  payload = payload ? payload : usePayloadState()

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
