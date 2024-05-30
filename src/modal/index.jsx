import ReactModal from "react-modal"
// import Dialog from "rc-dialog"

if (shopwp.misc.isAdmin) {
  ReactModal.setAppElement(".wp-admin")
} else {
  ReactModal.setAppElement("#shopwp-root")
}

function Modal({ isModalOpen, onModalClose, children }) {
  if (shopwp.misc.isAdmin) {
    var parent = document.getElementById("wpwrap")
  } else {
    var parent = document.getElementById("shopwp-root")
  }

  const customStyles = {
    overlay: {
      background: "rgb(138 138 138 / 70%)",
    },
    content: {
      maxWidth: shopwp.misc.isAdmin ? "80%" : "1200px",
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

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onModalClose}
      style={customStyles}
      bodyOpenClassName="swp-modal-open wps-modal-open"
      parentSelector={() => parent}
      shouldReturnFocusAfterClose={false}
    >
      <ModalContent onClose={onModalClose}>{children}</ModalContent>
    </ReactModal>
  )
}

function ModalCloseIcon({ onClose }) {
  function onKeyDown(e) {
    if (e.key === "Enter") {
      onClose()
    }
  }

  return (
    <svg
      focusable="true"
      role="img"
      alt="Close ShopWP modal icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      onClick={onClose}
      onKeyDown={onKeyDown}
      tabIndex="0"
      className="swp-modal-close-icon"
    >
      <path
        fill="currentColor"
        d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
      ></path>
    </svg>
  )
}

function ModalContent({ onClose, children }) {
  return (
    <div className="swp-modal wps-modal" aria-label="Modal content">
      <ModalCloseIcon onClose={onClose} />
      <div className="swp-modal-inner wps-modal-inner">{children}</div>
    </div>
  )
}

export default wp.element.memo(Modal)
