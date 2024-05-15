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

function customModalSettings(settings, payload) {
  return wp.hooks.applyFilters("product.modalSettings", {
    ...settings,
    payload: payload,
    titleTypeFontSize: "28px",
    linkTo: "none",
    htmlTemplateData: htmlTemp(payload, settings),
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
