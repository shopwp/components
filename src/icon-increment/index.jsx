/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common"

function IconIncrement() {
  const QuantityIncIconCSS = css`
    position: relative;
    display: block;
    height: 1px;
    background: black;
    width: 10px;
    position: absolute;
    top: calc(50% - 1px);
    left: calc(50% - 5px);

    ${mq("small")} {
      width: 20px;
      left: calc(50% - 10px);
    }

    &:after {
      content: "";
      display: block;
      height: 1px;
      transform: rotate(90deg);
      background: black;
      width: 10px;
      position: absolute;
      top: calc(50% - 0);
      left: calc(50% - 5px);

      ${mq("small")} {
        width: 20px;
        left: calc(50% - 10px);
      }
    }
  `

  return (
    <span
      css={QuantityIncIconCSS}
      className="wps-quantity-icon wps-quantity-increment-icon"
    />
  )
}

export default IconIncrement
