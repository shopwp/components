/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common"

function IconDecrement() {
  const IconDecrementCSS = css`
    position: relative;
    content: "";
    display: block;
    height: 1px;
    background: black;
    width: 12px;
    position: absolute;
    top: calc(50% - 1px);
    left: calc(50% - 6px);

    ${mq("small")} {
      width: 20px;
      left: calc(50% - 10px);
    }
  `

  return (
    <span
      css={IconDecrementCSS}
      className="wps-quantity-icon wps-quantity-decrement-icon"
    />
  )
}

export default IconDecrement
