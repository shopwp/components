/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { SlideInFromTop } from "@shopwp/common"

function Tooltip({ children, label }) {
  const { useState } = wp.element

  const [isShowing, setIsShowing] = useState(false)

  const tooltipIconCSS = css`
    width: 13px;
    height: 13px;
    position: relative;
    top: 2px;
    right: -4px;
  `

  const tooltipCSS = css`
    position: relative;
    padding: 10px 0;
    margin-top: -10px;

    &:hover {
      cursor: help;
    }
  `

  const tooltipLabelCSS = css`
    display: flex;
    font-size: 15px;
    display: inline-block;
  `

  const tooltipContentCSS = css`
    position: absolute;
    left: 0;
    background: white;
    z-index: 3;
    padding: 15px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: ${shopwp.general.globalBorderRadius};
    box-shadow: rgba(0, 0, 0, 0.66) 0px 0px 9px -6px;

    &:hover {
      cursor: text;
    }

    p {
      margin: 0;
      font-size: 15px;
    }
  `

  function onMouseEnter() {
    setIsShowing(true)
  }

  function onMouseLeave() {
    setIsShowing(false)
  }

  return (
    <div css={tooltipCSS} onMouseLeave={onMouseLeave}>
      <label css={tooltipLabelCSS} onMouseEnter={onMouseEnter}>
        {label}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          css={tooltipIconCSS}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </label>

      {isShowing ? (
        <SlideInFromTop>
          <div css={tooltipContentCSS}>{children}</div>
        </SlideInFromTop>
      ) : null}
    </div>
  )
}

export default Tooltip
