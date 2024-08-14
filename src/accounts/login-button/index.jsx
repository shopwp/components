import { useAccountState } from "../_state/hooks"
import { startLoginFlow } from "../api.jsx"
import {
  useHover,
  useFloating,
  useInteractions,
  safePolygon,
  offset,
} from "@floating-ui/react"
import ItemsSkeleton from "../../items/skeleton"

function LoggedInState({ customer, accountState }) {
  const { useState } = wp.element
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10)],
  })

  const hover = useHover(context, {
    move: false,
    handleClose: safePolygon({
      requireIntent: false,
    }),
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  function onDropdownClick(view) {
    if (view.isExternal) {
      window.location.href = view.content
    } else {
      window.location.href = "/account?view=" + view.slug
    }
  }

  return (
    <>
      <div
        className="swp-customers-login-dropdown-wrapper swp-l-row"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <img
          src={customer.imageUrl}
          alt={customer.displayName + "avatar image"}
          className="swp-customers-image"
        />

        <div className="swp-customers-name swp-account-icon-dropdown">
          {customer.displayName}{" "}
        </div>

        {isOpen ? (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="swp-card swp-customers-login-dropdown"
            {...getFloatingProps()}
          >
            <div className="swp-customers-login-dropdown-list">
              <ul>
                {accountState.views.map((view) => {
                  return (
                    <li key={view.slug} onClick={() => onDropdownClick(view)}>
                      {view.title}
                    </li>
                  )
                })}
              </ul>
              <a
                href={accountState.logoutUrl}
                className="swp-customers-logout-url swp-l-row swp-account-logout"
              >
                <span className="swp-account-icon-logout">Logout</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

function LoggedOutState() {
  const accountState = useAccountState()

  function onClick(e) {
    e.preventDefault()

    if (accountState.customer) {
      window.location.href = "/account"
    } else {
      startLoginFlow()
    }
  }

  return (
    <a href="#!" onClick={onClick} className="swp-btn ">
      Sign in
    </a>
  )
}

function LoginLink() {
  const accountState = useAccountState()

  return (
    <div
      className="swp-card swp-btn-customer-login"
      data-is-logged-in={!!accountState.customer}
    >
      {!accountState.customer && !accountState.isBootstrapping ? (
        <>
          <span className="swp-login-widget-heading">Login</span>
          <p>Click below to login to your account.</p>
          <p className="swp-text-secondary swp-text-last">
            (You will be emailed an unique code.)
          </p>
        </>
      ) : null}

      {accountState.isBootstrapping ? (
        <ItemsSkeleton skeletonType="shopwp/button" />
      ) : accountState.customer ? (
        <LoggedInState
          accountState={accountState}
          customer={accountState.customer}
        />
      ) : (
        <LoggedOutState customer={accountState.customer} />
      )}
    </div>
  )
}

export default LoginLink
