/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/shift-toward.css"
import "tippy.js/themes/light-border.css"
import Tippy from "@tippyjs/react"
import { useDebounce } from "@shopwp/hooks"

function Tooltip({ label, children, options }) {
  const { useState } = wp.element
  const [isShowingDetails, setIsShowingDetails] = useState(false)
  const isShowingDetailsDebounced = useDebounce(isShowingDetails, 250)

  const TooltipCSS = css`
    width: 210px;
    padding: 2px 0 2px 0;
    margin: 0;

    &:hover {
      cursor: help;
    }

    .tippy-content {
      padding: 15px 20px 10px 20px;

      strong + p {
        margin-top: 5px;
      }
    }
  `
  const TooltipInnerCSS = css`
    flex: 1;
    display: flex;
    width: 100%;
  `

  const iconCSS = css`
    width: 15px;
    height: 15px;
    margin: 0 0 0 7px;
  `

  const textCSS = css`
    && {
      margin: 0;
      font-size: 15px;
      line-height: 1;
    }
  `

  function onMouseLeave() {
    setIsShowingDetails(false)
  }

  function onMouseEnter() {
    setIsShowingDetails(true)
  }

  return (
    <div
      css={TooltipCSS}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Tippy
        interactive={true}
        visible={isShowingDetailsDebounced}
        placement={options.placement}
        appendTo="parent"
        allowHTML={true}
        animation="shift-toward"
        theme="light-border"
        inertia={false}
        delay={50}
        content={children}
      >
        <div css={TooltipInnerCSS}>
          <p css={textCSS}>{label}</p>

          <svg
            css={iconCSS}
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="info-circle"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
            ></path>
          </svg>
        </div>
      </Tippy>
    </div>
  )
}

export default Tooltip
