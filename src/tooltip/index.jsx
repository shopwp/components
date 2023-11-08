/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function Tooltip({ children, label }) {
  const { useState } = wp.element

  const [isShowing, setIsShowing] = useState(false)

  const tooltipIconCSS = css``
  const tooltipCSS = css``
  const tooltipLabelCSS = css``
  const tooltipContentCSS = css``

  function onMouseEnter() {
    setIsShowing(true)
  }

  function onMouseLeave() {
    setIsShowing(false)
  }

  return (
    <div className="swp-tooltip" css={tooltipCSS} onMouseLeave={onMouseLeave}>
      <label
        className="swp-tooltip-label"
        css={tooltipLabelCSS}
        onMouseEnter={onMouseEnter}
      >
        {label}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="swp-tooltip-icon"
          css={tooltipIconCSS}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </label>

      {isShowing ? (
        <div className="swp-tooltip-content" css={tooltipContentCSS}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default Tooltip
