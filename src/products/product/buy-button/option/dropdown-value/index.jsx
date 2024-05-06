/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function ProductVariantDropdownValue({
  onSelection,
  optionObj,
  isAvailableToSelect,
  isAvailableInShopify,
}) {
  const ProductVariantDropdownValueCSS = css`
    margin: 0;
    padding: 12px;
    border-bottom: 1px solid #eee;
    font-size: 15px;
    text-align: center;
    color: black;
    list-style: none;
    line-height: 1.4;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f3f3f3;
      cursor: pointer;
    }
  `

  return isAvailableToSelect ? (
    <li
      itemProp="category"
      className="wps-product-variant wps-product-style swp-modal-close-trigger"
      onClick={onSelection}
      css={ProductVariantDropdownValueCSS}
      data-is-available={isAvailableToSelect}
      data-is-available-in-shopify={isAvailableInShopify}
    >
      {wp.hooks.applyFilters("product.variantValue", optionObj.value)}
    </li>
  ) : null
}

export default ProductVariantDropdownValue
