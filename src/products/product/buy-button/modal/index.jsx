import Products from "../../../index"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useSettings } from "@shopwp/hooks"
import Modal from "../../../../modal"
import { useSettingsState } from "../../../../items/_state/settings/hooks"

function htmlTemp(payload, settings) {
  return wp.hooks.applyFilters(
    "product.modalLayout",
    `
      <div class="swp-modal-row" style="display: flex;">
         <div style="width: 50%;padding: 0px 2em 0px 1em;">
            <ProductImages />
         </div>
         <div style="width: 50%;padding-right: 1em;">
            ${
              settings.showReviews
                ? `<Reviews settings={{
              showReviews: ${settings.showReviews},
              showCreateNew: false,
              showRating: true,
              showListing: false,
              productId: payload.id
            }} payload={payload} />`
                : ""
            }
            <ProductTitle />
            <ProductPricing />
            <ProductDescription />
            <ProductBuyButton />
         </div>
      </div>
   `,
    settings,
    payload
  )
}

function findAllModalSettings(settings) {
  return Object.keys(settings)
    .filter(function (k) {
      return k.indexOf("modal") == 0
    })
    .reduce(function (newData, k) {
      newData[k] = settings[k]
      return newData
    }, {})
}

function transformKeys(obj) {
  const newObj = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key.startsWith("modal")) {
      // Remove the "modal" prefix
      let newKey = key.replace(/^modal/, "")

      // Transform the new key to camel case (first letter lowercase)
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1)

      // Assign the value to the new key in the new object
      newObj[newKey] = obj[key]
    }
  }

  return Object.keys(newObj).length > 0 ? newObj : {}
}

function customModalSettings(settings, payload) {
  var modalSettings = transformKeys(findAllModalSettings(settings))

  var modalSettingsCombined = {
    ...settings,
    ...modalSettings,
  }

  return wp.hooks.applyFilters("product.modalSettings", {
    ...modalSettingsCombined,
    titleTypeFontSize: "28px",
    htmlTemplateData: htmlTemp(payload, settings),
    payload: payload,
    linkTo: "none",
    fullWidth: true,
    isModal: true,
    pagination: false,
  })
}

function ProductModal() {
  const productState = useProductState()
  const productDispatch = useProductDispatch()

  const settings = useSettingsState()

  const pSettings = useSettings(
    settings,
    customModalSettings(settings, productState.payload)
  )

  function onModalClose() {
    productDispatch({ type: "TOGGLE_MODAL", payload: false })
  }

  return (
    <Modal isModalOpen={productState.isModalOpen} onModalClose={onModalClose}>
      <Products
        settings={pSettings}
        payload={[productState.payload]}
        isModal={productState.isModalOpen}
        id={productState.id}
        isFetchingNew={false}
      />
    </Modal>
  )
}

export default ProductModal
