/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Products from "../../../index"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useSettings } from "@shopwp/hooks"
import Modal from "react-modal"
import { useItemsState } from "../../../../items/_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"

if (shopwp.misc.isAdmin) {
  Modal.setAppElement("#editor")
}

function htmlTemp(payload, settings) {
  return wp.hooks.applyFilters(
    "product.modalLayout",
    `
      <div class="wps-modal-row" style="display: flex;">
         <div style="width: 50%;padding: 0px 2em 0px 1em;">
            <ProductImages />
         </div>
         <div style="width: 50%;padding-right: 1em;">
            <Reviews settings={{
              showReviews: ${settings.showReviews},
              showCreateNew: false,
              showRating: true,
              showListing: false,
              productId: payload.id
            }} />
            <ProductTitle />
            <ProductPricing />
            <ProductDescription />
            <ProductBuyButton />
         </div>
      </div>
   `,
    settings
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
    showFeaturedOnly: false,
    showZoom: true,
    isModal: true,
    pagination: false,
  })
}

function ProductModal() {
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const itemsState = useItemsState()
  const settings = useSettingsState()

  const pSettings = useSettings(
    settings,
    customModalSettings(settings, productState.payload)
  )

  const customStyles = {
    overlay: {
      background: "rgb(138 138 138 / 70%)",
    },
    content: {
      maxWidth: shopwp.misc.isAdmin ? "80%" : "1100px",
      width: "960px",
      margin: "0 auto",
      borderRadius: "10px",
      border: "1px solid #b6b6b6",
      padding: "30px",
      background: "#fff",
      height: "80vh",
      opacity: "1",
      zIndex: "99999",
      left: "50%",
      overflow: "visible",
      boxShadow: "0 7px 14px 0 rgba(60,66,87,.08), 0 3px 6px 0 rgba(0,0,0,.12)",
      top: shopwp.misc.isAdmin ? "50%" : "40px",
      transform: shopwp.misc.isAdmin
        ? "translate(-50%, -50%)"
        : "translate(-50%, 40px)",
      transition: "all 0.2s ease",
    },
  }

  function onModalClose() {
    productDispatch({ type: "TOGGLE_MODAL", payload: false })
  }

  return (
    <Modal
      closeTimeoutMS={50}
      isOpen={productState.isModalOpen}
      onRequestClose={onModalClose}
      contentLabel="Example Modal"
      style={customStyles}
      bodyOpenClassName="wps-modal-open"
      appElement={itemsState.element}
    >
      <ProductModalContent
        payload={productState.payload}
        settings={pSettings}
        id={productState.id}
      />
    </Modal>
  )
}

function ProductModalCloseIcon() {
  const productDispatch = useProductDispatch()

  const ProductModalCloseIconCSS = css`
    position: absolute;
    top: ${shopwp.misc.isAdmin ? "-32px" : "-18px"};
    width: ${shopwp.misc.isAdmin ? "25px" : "70px"};
    height: ${shopwp.misc.isAdmin ? "25px" : "70px"};
    padding: 15px;
    right: ${shopwp.misc.isAdmin ? "-54px" : "-70px"};
    z-index: 99999999;
    opacity: 1;
    transition: opacity 0.2s ease;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }

    path {
      fill: white;
    }
  `

  function onModalClose() {
    productDispatch({ type: "TOGGLE_MODAL", payload: false })
  }

  return (
    <svg
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      css={ProductModalCloseIconCSS}
      onClick={onModalClose}
    >
      <path
        fill="currentColor"
        d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
      ></path>
    </svg>
  )
}

function ProductModalContent({ payload, settings, id }) {
  const ProductModalCSS = css`
    height: 100%;
  `

  const ProductModalContentInnerCSS = css`
    overflow: scroll !important;
    height: 100%;
  `

  return (
    <div className="wps-modal" aria-label="Product Modal" css={ProductModalCSS}>
      <ProductModalCloseIcon />
      <div className="wps-modal-inner" css={ProductModalContentInnerCSS}>
        <Products
          settings={settings}
          payload={[payload]}
          isModal={true}
          id={id}
          isFetchingNew={false}
        />
      </div>
    </div>
  )
}

export default wp.element.memo(ProductModal)
