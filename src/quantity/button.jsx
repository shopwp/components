/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "@shopwp/common"

function QuantityButton({
  onClick,
  customCSS,
  type,
  customButtonSize,
  children,
}) {
  const QuantityIncDecCSS = css`
    && {
      color: #333;
      display: block;
      margin-top: 0;
      position: relative;
      padding: 0 10px;
      font-size: 17px;
      font-family: monospace;
      background: white;
      box-shadow: none;
      cursor: pointer;
      text-align: center;
      border: 1px solid #606060;
      width: ${customButtonSize};
      height: ${customButtonSize};
      min-height: 45px;
      min-width: 40px;
      outline: none;
      outline-offset: 0;
      transition: all 0.2s ease;

      &:hover {
        background: #f1f1f1;
      }

      ${mq("small")} {
        font-size: 26px;
        width: 50px;
        height: 50px;
        max-height: 50px;
      }
    }
  `

  return (
    <button
      className={"wps-quantity-" + type}
      css={[QuantityIncDecCSS, customCSS]}
      type="button"
      role="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default QuantityButton
