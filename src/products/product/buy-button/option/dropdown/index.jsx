/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../../_state/hooks"
import { onVariantSelection } from "@shopwp/common"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

const Select = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../../../../select")
)

function ProductOptionDropdown({
  option,
  selectedOptions,
  missingSelections,
  selectFirstVariant,
}) {
  const { useRef, Suspense } = wp.element
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const dropdownElement = useRef()
  const settings = useSettingsState()

  const items = option.values.map((opt) => {
    return {
      label: opt.value,
      value: opt,
    }
  })

  function onSelection(stuff) {
    onVariantSelection({
      option: stuff.value,
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
    <div className="wps-btn-dropdown-wrapper">
      <div
        className="wps-btn-dropdown"
        data-wps-is-selected={productBuyButtonState.isOptionSelected}
        ref={dropdownElement}
      >
        <Suspense fallback="Loading ...">
          <Select
            items={items}
            onChange={onSelection}
            label={option.name}
            missingSelections={missingSelections}
            isVariant={true}
            allSelectableOptions={productBuyButtonState.allSelectableOptions}
            selectedOption={selectedOption}
            selectedOptions={selectedOptions}
            variants={productBuyButtonState.variants}
            settings={settings}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
