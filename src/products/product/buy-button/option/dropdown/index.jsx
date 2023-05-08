/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductBuyButtonState } from "../../_state/hooks"
import { mq } from "@shopwp/common"

import "tippy.js/dist/tippy.css"
import "tippy.js/animations/shift-away.css"
import Tippy from "@tippyjs/react"

import ProductOptionTrigger from "../trigger"
import ProductVariantsDropdownContent from "../dropdown-content"

function ProductOptionDropdown({ option, selectedOptions, missingSelections }) {
  const { useRef, useState } = wp.element
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const productBuyButtonState = useProductBuyButtonState()
  const dropdownElement = useRef()
  const ProductOptionDropdownCSS = css`
    position: relative;
    text-align: center;
    margin: 0 0 10px 0;
    padding: 0;
    width: 100%;

    [data-tippy-root] {
      width: 100% !important;
      max-width: 100%;

      *:focus {
        outline: none;
      }

      .tippy-box {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }

    .tippy-box {
      box-shadow: 0 28px 30px rgba(0, 0, 0, 0.11);
      padding: 0;
      max-width: 100% !important;
      margin: 0 auto;
      margin-top: -2px;
      background: white;
      border: 1px solid #313131;
      left: 0;
    }

    .tippy-content {
      padding: 0;
    }

    span[aria-expanded="true"] {
      display: block;
    }

    &[data-wps-is-selected="false"]
      .wps-product-variant[data-wps-is-selectable="false"] {
      display: none;
    }

    [aria-expanded="true"] .wps-modal-trigger {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    [aria-expanded="true"] + [data-tippy-root] .tippy-box[data-animation] {
      opacity: 1 !important;
    }

    ${mq("medium")} {
      width: 100%;
      flex: 1;
      max-width: 100%;
      padding-right: 0;
    }
  `

  return (
    <div className="wps-btn-dropdown-wrapper">
      <div
        className="wps-btn-dropdown"
        css={ProductOptionDropdownCSS}
        data-wps-is-selected={productBuyButtonState.isOptionSelected}
        ref={dropdownElement}
      >
        <Tippy
          visible={isDropdownOpen}
          placement="bottom"
          allowHTML={true}
          appendTo="parent"
          arrow={false}
          animation="shift-away"
          theme="light"
          interactive={true}
          inertia={true}
          delay={[0, 0]}
          offset={[0, 0]}
          content={
            <ProductVariantsDropdownContent
              dropdownElement={dropdownElement}
              isDropdownOpen={isDropdownOpen}
              option={option}
              selectedOptions={selectedOptions}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          }
        >
          <span>
            <ProductOptionTrigger
              missingSelections={missingSelections}
              selectedOptions={selectedOptions}
              option={option}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </span>
        </Tippy>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
