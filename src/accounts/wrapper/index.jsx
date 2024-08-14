import { useAccountState } from "../_state/hooks"
import AccountSecondaryNav from "../nav-secondary"
import AccountMainNav from "../nav-main"
import CustomerLogin from "../login"
import Notifications from "../notifications"

function AccountWrapper() {
  const accountState = useAccountState()

  return (
    <>
      <div className="swp-l-row swp-l-row-end swp-account-header">
        <CustomerLogin />
      </div>
      <div
        className="swp-l-row swp-account-wrapper"
        data-is-working={accountState.isWorking}
      >
        <aside id="swp-account-sidebar">
          <AccountMainNav />
          <AccountSecondaryNav />
        </aside>
        <section className="swp-account-main swp-l-flex">
          {accountState.isBootstrapping
            ? "Loading account views ..."
            : accountState.views.map((view) => {
                return typeof view.content !== "undefined" &&
                  view.slug === accountState.activeView
                  ? React.createElement(view.content, {
                      key: view.slug,
                      view: view,
                    })
                  : null
              })}
        </section>
      </div>
      <Notifications />
    </>
  )
}

export default AccountWrapper
