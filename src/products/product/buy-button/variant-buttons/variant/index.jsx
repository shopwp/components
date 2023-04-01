/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { isMatching, findVariantFromOptionObject, FilterHook } from "Common"
import { Price } from "Components"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

function ProductVariantButtonValue({
  optionObj,
  onSelection,
  selectedOptions,
  isAvailableToSelect,
  variants,
  totalOptions,
  isAvailableInShopify,
}) {
  const settings = useSettingsState()
  const isSelected = isMatching(selectedOptions, optionObj)
  const border = isSelected ? "#415aff" : "#606060"
  const color = isSelected ? "white" : "black"
  const backgroundColor = isSelected ? "#415aff" : "transparent"
  const opacity = isAvailableToSelect ? 1 : 0.4

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
    border-radius: 5px;
    opacity: ${opacity};
    color: ${color};
    background-color: ${backgroundColor};
    transition: all ease 0.2s;
	text-decoration: ${!isAvailableInShopify ? "line-through" : "none"};

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
      text-decoration: ${!isAvailableInShopify ? "line-through" : "none"};
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

    let variantValue = wp.hooks.applyFilters(
      "product.colorSwatchValue",
      optionObj.value
    )

    if (variantValue === "white" || variantValue === "White") {
      var border = isSelected ? "3px solid #333" : "1px solid #333"
    } else {
      var border = isSelected ? "1px solid " + variantValue : "none"
    }

    return `
        margin: 0 10px 10px 0;
        outline: none;
        padding: 10px;
        background-color: ${variantValue};
        text-indent: 150%;
        white-space: nowrap;
        overflow: hidden;
        width: 40px;
        height: 40px;
        font-size: 0;
        opacity: ${isAvailableToSelect ? 1 : 0.1};
        border-radius: 50%;
        border: ${border};
        box-shadow: ${isSelected ? "inset 0 0 0px 4px white" : "none"};
        transition: all ease 0.15s;
        line-height: 11;

        &:hover {
            transform: scale(1.2);
            cursor: ${!isSelected ? "pointer" : "auto"};
            opacity: 1 !important;
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
      type="button"
      onMouseDown={onSelection}
      data-is-variant-selected={isSelected}
      data-is-available={isAvailableToSelect}
      data-is-available-in-shopify={isAvailableInShopify}
      data-option-name={optionName}
      data-variant-name={variantValue}
      title={variantValue}
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
          <ProductVariantButtonPrice
            variantObject={variantObject}
            settings={settings}
          />
        )}
      </FilterHook>
    </button>
  )
}

function ProductVariantButtonPrice({ variantObject, settings }) {
  const variantObjectCSS = css`
    && {
      font-size: 15px;
      margin-top: 5px;
      margin-bottom: 0;
      display: inline;
      margin-left: 10px;
    }
  `

  return (
    <p css={variantObjectCSS} className="wps-variant-button-price">
      <Price price={variantObject[0].node.price.amount} />
    </p>
  )
}

export default ProductVariantButtonValue
