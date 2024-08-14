import { useAccountState } from "../_state/hooks"

function Notifications() {
  const { useState, useEffect } = wp.element
  const accountState = useAccountState()
  const [isShowing, setIsShowing] = useState(true)

  useEffect(() => {
    if (accountState.notice) {
      setIsShowing(true)
    }

    setTimeout(() => {
      setIsShowing(false)
    }, 7000)
  }, [accountState.notice])

  function onClick() {
    setIsShowing(false)
  }

  return accountState.notice && isShowing ? (
    <div className="swp-account-notice-wrapper" onClick={onClick} tabIndex="0">
      <p
        data-notice-type={accountState.notice.type}
        className={`swp-account-notice swp-account-icon-left swp-account-icon-${accountState.notice.type}`}
      >
        {accountState.notice.message}
      </p>
    </div>
  ) : null
}

export default Notifications
