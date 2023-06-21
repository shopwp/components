/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useItemsState } from "../_state/hooks"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

function Item({ children, notice, isFetchingNew }) {
  const { Suspense } = wp.element
  const itemsState = useItemsState()

  return notice &&
    itemsState.componentType !== "search" &&
    itemsState.componentType !== "storefront" ? (
    <Suspense fallback={false}>
      <Notice
        status={notice.type}
        element={itemsState.element}
        isFetchingNew={isFetchingNew}
      >
        {notice.message}
      </Notice>
    </Suspense>
  ) : (
    children
  )
}

export default Item
