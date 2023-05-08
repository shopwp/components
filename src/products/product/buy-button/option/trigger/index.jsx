/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { buttonCSS, IconCSS } from "@shopwp/common"
import { useFirstRender } from "@shopwp/hooks"
import isEmpty from "lodash-es/isEmpty"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

import { useProductBuyButtonState } from "../../_state/hooks"

const TriggerIcon = wp.element.lazy(() =>
  import(/* webpackChunkName: 'TriggerIcon-public' */ "./icon")
)

function ProductOptionTrigger({
  option,
  missingSelections,
  selectedOptions,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  const settings = useSettingsState()
  const productBuyButtonState = useProductBuyButtonState()

  const isFirstRender = useFirstRender()

  function onClick() {
    wp.hooks.doAction("on.variantDropdownToggle", productBuyButtonState)
    setIsDropdownOpen(!isDropdownOpen)
  }

  function getOptionName(selectedOption, option) {
    return selectedOption[option.name]
  }

  function getOptionValue() {
    return getOptionName(productBuyButtonState.selectedOptions, option)
  }

  function optionNameWithSelect() {
    return option.name + ": " + getOptionValue()
  }

  function displayOptionName() {
    if (selectedOptions.hasOwnProperty(option.name)) {
      return optionNameWithSelect()
    }

    return option.name
  }

  const dropdownCSS = keyframes`
		0%,
		100% {
			transform: translateX(0);
		}
		10%,
		30%,
		50%,
		70% {
			transform: translateX(-5px);
		}
		20%,
		40%,
		60% {
			transform: translateX(5px);
		}
		80% {
			transform: translateX(6px);
		}
		90% {
			transform: translateX(-6px);
		}


	`

  const variantDropdownCSS = css`
    && {
      animation: ${missingSelections &&
      !productBuyButtonState.isOptionSelected &&
      !isFirstRender
        ? css`
            ${dropdownCSS} 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both
          `
        : "none"};
      background-color: ${settings.variantDropdownButtonColor
        ? settings.variantDropdownButtonColor
        : "black"};
      color: ${settings.variantDropdownTextColor
        ? settings.variantDropdownTextColor
        : "white"};
      font-family: ${settings.variantDropdownTypeFontFamily
        ? settings.variantDropdownTypeFontFamily
        : "inherit"};
      font-weight: ${settings.variantDropdownTypeFontWeight
        ? settings.variantDropdownTypeFontWeight
        : "initial"};
      font-style: ${settings.variantDropdownTypeFontStyle
        ? settings.variantDropdownTypeFontStyle
        : "initial"};
      font-size: ${settings.variantDropdownTypeFontSize
        ? settings.variantDropdownTypeFontSize
        : "initial"};
      letter-spacing: ${settings.variantDropdownTypeLetterSpacing
        ? settings.variantDropdownTypeLetterSpacing
        : "initial"};
      line-height: ${settings.variantDropdownTypeLineHeight
        ? settings.variantDropdownTypeLineHeight
        : "initial"};
      text-decoration: ${settings.variantDropdownTypeTextDecoration
        ? settings.variantDropdownTypeTextDecoration
        : "initial"};
      text-transform: ${settings.variantDropdownTypeTextTransform
        ? settings.variantDropdownTypeTextTransform
        : "initial"};
    }
  `

  return (
    <button
      className="wps-btn wps-icon wps-icon-dropdown wps-modal-trigger"
      onClick={onClick}
      css={[IconCSS, buttonCSS, variantDropdownCSS]}
      aria-label="Product Variant Dropdown"
    >
      {wp.hooks.applyFilters(
        "product.optionName",
        displayOptionName(),
        productBuyButtonState
      )}
      <TriggerIcon />
    </button>
  )
}

export default ProductOptionTrigger
