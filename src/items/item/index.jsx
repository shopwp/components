/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useItemsState } from "../_state/hooks"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

function Item({ children }) {
  const { Suspense } = wp.element
  const itemsState = useItemsState()

  return itemsState.notice &&
    itemsState.componentType !== "search" &&
    itemsState.componentType !== "storefront" ? (
    <Suspense fallback={false}>
      <Notice status={itemsState.notice.type} element={itemsState.element}>
        {itemsState.notice.message}
      </Notice>
    </Suspense>
  ) : (
    children
  )
}

export default Item
