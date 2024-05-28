import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../../_state/hooks"
import { onVariantSelection } from "@shopwp/common"

import { useSettingsState } from "../../../../../items/_state/settings/hooks"

const Dropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../../../../select")
)

function ProductOptionDropdown({
  option,
  selectedOptions,
  missingSelections,
  selectFirstVariant,
  selectedVariant,
}) {
  const { useRef, Suspense } = wp.element
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const dropdownElement = useRef()
  const settings = useSettingsState()

  const items = option.values.map((opt) => {
    return {
      label: opt.name,
      value: opt.value,
    }
  })

  function onSelection(stuff) {
    var found = option.values.filter((opt) => opt.value === stuff.value)

    onVariantSelection({
      option: found[0],
      productBuyButtonState: productBuyButtonState,
      productBuyButtonDispatch: productBuyButtonDispatch,
    })
  }

  if (selectFirstVariant) {
    if (productBuyButtonState.selectedOptions && option) {
      var selectedOption = {
        label: productBuyButtonState.selectedOptions[option.name],
        value: {
          name: option.name,
          value: productBuyButtonState.selectedOptions[option.name],
        },
      }
    } else {
      var selectedOption = false
    }
  } else {
    var selectedOption = false
  }

  return (
    <div className="swp-btn-dropdown-wrapper wps-btn-dropdown-wrapper">
      <div
        className="wps-btn-dropdown"
        data-wps-is-selected={productBuyButtonState.isOptionSelected}
        ref={dropdownElement}
      >
        <Suspense fallback="Loading product option dropdown ...">
          <Dropdown
            settings={settings}
            items={items}
            onChange={onSelection}
            label={option.name}
            missingSelections={missingSelections}
            isVariant={true}
            allSelectableOptions={productBuyButtonState.allSelectableOptions}
            selectedOption={selectedOption}
            selectedOptions={selectedOptions}
            variants={productBuyButtonState.variants}
            selectedVariant={selectedVariant}
            totalOptions={productBuyButtonState.totalOptions}
            productState={productBuyButtonState}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
