import { useAccountState, useAccountDispatch } from "../_state/hooks"

function AccountMainNav() {
  const accountState = useAccountState()
  const accountDispatch = useAccountDispatch()

  function changeAccountView(view) {
    if (view.isExternal) {
      return
    }

    accountDispatch({
      type: "SET_ACTIVE_VIEW",
      payload: view.slug,
    })
  }
  return (
    <ul className="swp-0 swp-account-nav-main">
      {accountState.views.map((view) => {
        return (
          <li
            key={view.slug}
            className={`swp-account-nav-link`}
            onClick={() => changeAccountView(view)}
            data-is-active={view.slug === accountState.activeView}
            data-is-external={view.isExternal}
            data-view={view.slug}
          >
            {view.isExternal ? (
              <a
                href={view.content}
                target="_blank"
                className={`swp-btn-account-secondary`}
              >
                <span
                  className={`swp-account-icon-${view.slug} swp-account-icon-left`}
                >
                  {view.title}
                </span>
              </a>
            ) : (
              <span
                className={`swp-account-icon-${view.slug} swp-account-icon-left`}
              >
                {view.title}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default AccountMainNav
