import {
  useFloating,
  useId,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingOverlay,
  FloatingFocusManager,
  useTransitionStyles,
} from "@floating-ui/react"

function Popover({
  isEditing,
  setIsEditing,
  setIsWorking,
  accountDispatch,
  heading,
  triggerText,
  children,
}) {
  const { refs, context } = useFloating({
    open: isEditing,
    onOpenChange: (modalState) => {
      setIsEditing(modalState)

      if (!modalState) {
        setIsWorking(false)
        accountDispatch({
          type: "SET_IS_WORKING",
          payload: false,
        })
      }
    },
  })

  const { isMounted, styles } = useTransitionStyles(context)

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
  })
  const role = useRole(context)

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  // Set up label and description ids
  const labelId = useId()
  const descriptionId = useId()

  return (
    <>
      <p
        className="swp-card swp-customers-edit-button swp-account-button-icon swp-account-icon-updatePayment swp-account-icon-left"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {triggerText}
      </p>
      {isEditing && isMounted && (
        <FloatingOverlay
          lockScroll
          style={{ background: "rgba(0, 0, 0, 0.4)", ...styles }}
          className="swp-account-modal"
        >
          <FloatingFocusManager context={context}>
            <div
              className="swp-account-modal-inner"
              ref={refs.setFloating}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <button
                onClick={() => {
                  setIsEditing(false)
                  setIsWorking(false)
                  accountDispatch({
                    type: "SET_IS_WORKING",
                    payload: false,
                  })
                }}
                className="swp-icon-close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>

              <h2 id={labelId}>{heading}</h2>
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  )
}

export default Popover
