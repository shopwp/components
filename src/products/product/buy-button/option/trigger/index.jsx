/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { buttonCSS, IconCSS } from "@shopwp/common"
import { useFirstRender } from "@shopwp/hooks"
import { ProductOptionContext } from "../_state/context"
import isEmpty from "lodash-es/isEmpty"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

function TriggerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      style={{
        maxWidth: "19px",
        position: "absolute",
        right: "16px",
        top: "calc(50% - 9px)",
      }}
    >
      <path fill="#fff" d="M15 17.8L3.2 6 .7 8.7 15 23 29.3 8.7 26.8 6z" />
    </svg>
  )
}

function ProductOptionTrigger({ missingSelections, selectedOptions }) {
  const { useContext } = wp.element

  const settings = useSettingsState()
  const [productOptionState, productOptionDispatch] =
    useContext(ProductOptionContext)

  const isFirstRender = useFirstRender()

  function onClick() {
    wp.hooks.doAction("on.variantDropdownToggle", productOptionState)

    productOptionDispatch({
      type: "TOGGLE_DROPDOWN",
      payload: !productOptionState.isDropdownOpen,
    })
  }

  function getOptionName(selectedOption, option) {
    return selectedOption[option.name]
  }

  function getOptionValue() {
    return getOptionName(
      productOptionState.selectedOption,
      productOptionState.option
    )
  }

  function optionNameWithSelect() {
    return productOptionState.option.name + ": " + getOptionValue()
  }

  function displayOptionName() {
    return productOptionState.isOptionSelected && !isEmpty(selectedOptions)
      ? optionNameWithSelect()
      : productOptionState.option.name
  }

  const asdasd = keyframes`
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
      !productOptionState.isOptionSelected &&
      !isFirstRender
        ? css`
            ${asdasd} 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both
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
        productOptionState
      )}
      <TriggerIcon />
    </button>
  )
}

export default ProductOptionTrigger
