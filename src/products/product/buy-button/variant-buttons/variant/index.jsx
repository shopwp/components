/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  isMatching,
  findVariantFromOptionObject,
  FilterHook,
} from "@shopwp/common"
import { Price } from "@shopwp/components"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"
import colorAlpha from "color-alpha"

function ProductVariantButtonValue({
  optionObj,
  onSelection,
  selectedOptions,
  isAvailableToSelect,
  variants,
  totalOptions,
  isAvailableInShopify,
}) {
  const { useRef } = wp.element

  const settings = useSettingsState()
  const isSelected = isMatching(selectedOptions, optionObj)
  const border = isSelected ? "#415aff" : "#606060"
  const color = isSelected ? "white" : "black"
  const backgroundColor = isSelected ? "#415aff" : "transparent"

  if (settings.showPriceUnderVariantButton && totalOptions === 1) {
    var variantObject = findVariantFromOptionObject(optionObj, variants)
  } else {
    var variantObject = false
  }

  const colorSwatchNames = settings.colorSwatchNames

  const defaultVariantStyles = `margin: 0 10px 10px 0;
    outline: none;
    border: 1px solid ${border};
    font-size: 16px;
    padding: 10px;
    border-radius: ${settings.globalBorderRadius};
    opacity: ${isAvailableToSelect ? 1 : 0.5};
    color: ${color};
    background-color: ${backgroundColor};
    transition: all ease 0.2s;
	  text-decoration: ${!isAvailableToSelect ? "line-through" : "none"};

    &:hover,
    &:focus {
      cursor: ${
        !isAvailableToSelect ? "not-allowed" : !isSelected ? "pointer" : "auto"
      };
      background-color: ${
        !isAvailableToSelect
          ? backgroundColor
          : !isSelected
          ? "#e9e9e9"
          : backgroundColor
      };
      text-decoration: ${!isAvailableToSelect ? "line-through" : "none"};
    }`

  function maybeColorSwatches(optionObj, defaultCustomStyles) {
    if (!colorSwatchNames) {
      return defaultCustomStyles
    }

    var namesLowerCased = colorSwatchNames.map((v) => String(v).toLowerCase())

    if (
      namesLowerCased &&
      !namesLowerCased.includes(String(optionObj.name).toLowerCase())
    ) {
      return defaultCustomStyles
    }

    let variantValue = wp.hooks
      .applyFilters("product.colorSwatchValue", optionObj.value)
      .toLowerCase()

    function convertToAlpha(variantValue) {
      if (isAvailableToSelect) {
        return variantValue
      }

      return colorAlpha(variantValue, 0.1)
    }

    return `
        margin: 0 10px 10px 0;
        padding: 10px;
        background-color: ${convertToAlpha(variantValue)};
        text-indent: 150%;
        white-space: nowrap;
        width: 40px;
        height: 40px;
        font-size: 0;
        border-radius: 50%;
        border: none;
        box-shadow: ${isSelected ? "inset 0 0 0px 2px white" : "none"};
        outline: ${isSelected ? "2px dotted " + variantValue : "none"};
        transition: all ease 0.15s;
        line-height: 11;
        overflow: hidden;
        transform: ${isSelected ? "scale(1.1)" : "none"};

        &:focus,
        &:hover {
            cursor: ${!isSelected ? "pointer" : "auto"};
            opacity: 1 !important;
            box-shadow: ${isSelected ? "inset 0 0 0px 2px white" : "none"};
            outline: ${isSelected ? "2px dotted " + variantValue : "none"};
        }
      `
  }

  var ProductVariantButtonValueButtonCSS = css`
    && {
      ${wp.hooks.applyFilters(
        "product.variantStyles",
        maybeColorSwatches(optionObj, defaultVariantStyles),
        optionObj,
        isSelected,
        isAvailableToSelect
      )}
    }
  `

  return (
    <ProductVariantButtonValueButton
      defaultStyles={ProductVariantButtonValueButtonCSS}
      onSelection={onSelection}
      isSelected={isSelected}
      isAvailableToSelect={isAvailableToSelect}
      isAvailableInShopify={isAvailableInShopify}
      variantValue={optionObj.value}
      optionName={optionObj.name}
      variantObject={variantObject}
      settings={settings}
    />
  )
}

function ProductVariantButtonValueButton({
  defaultStyles,
  onSelection,
  isSelected,
  isAvailableToSelect,
  isAvailableInShopify,
  variantValue,
  variantObject,
  optionName,
  settings,
}) {
  return (
    <button
      css={defaultStyles}
      className="swp-product-variant-button"
      type="button"
      onMouseDown={onSelection}
      data-is-variant-selected={isSelected}
      data-is-available={isAvailableToSelect}
      data-is-available-in-shopify={isAvailableInShopify}
      data-option-name={optionName}
      data-variant-name={variantValue}
      title={variantValue}
      tabIndex="0"
    >
      <FilterHook
        name="product.variantButtonHtml"
        args={[
          {
            optionName: optionName,
            isSelected: isSelected,
            isAvailableToSelect: isAvailableToSelect,
            isAvailableInShopify: isAvailableInShopify,
            variantValue: variantValue,
            variantObject: variantObject,
            settings: settings,
          },
        ]}
      >
        {wp.hooks.applyFilters(
          "product.variantValue",
          variantValue,
          variantObject
        )}

        {variantObject && (
          <ProductVariantButtonPrice variantObject={variantObject} />
        )}
      </FilterHook>
    </button>
  )
}

function ProductVariantButtonPrice({ variantObject }) {
  return (
    <p className="swp-variant-button-price wps-variant-button-price">
      <Price price={variantObject[0].node.price.amount} />
    </p>
  )
}

export default ProductVariantButtonValue
