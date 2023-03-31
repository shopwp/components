/** @jsx jsx */
import { jsx, css } from "@emotion/react"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

function CartLineItemOutOfStock({ noticeUnavailableText }) {
  const extraCSS = css`
    font-size: 13px;
  `
  return (
    <Notice status="warning" extraCSS={extraCSS}>
      {noticeUnavailableText}
    </Notice>
  )
}

export default CartLineItemOutOfStock
