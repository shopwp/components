import { useAccountState } from "../_state/hooks"
import AccountWrapper from "../wrapper"
import CustomerLogin from "../login"
import { usePortal } from "@shopwp/hooks"
import {
  getAvailableElements,
  getClientComponentsOptions,
} from "@shopwp/common"

function Account() {
  const accountState = useAccountState()

  /*
	
	Only render Account Dashboard is user is viewing it
	
	*/
  const customerAccountComponents = getClientComponentsOptions(
    getAvailableElements("customers_account")
  )

  /*
	
	Only render Login component if one is present on the page 
	
	*/
  const customerLoginComponents = getClientComponentsOptions(
    getAvailableElements("customers_login")
  )

  return (
    <>
      {customerAccountComponents.length
        ? customerAccountComponents.map((c) =>
            accountState.customer
              ? usePortal(
                  <AccountWrapper options={{ ...c }} key={c.id} />,
                  c.element
                )
              : usePortal(
                  <CustomerLogin options={{ ...c }} key={c.id} />,
                  c.element
                )
          )
        : null}
      {customerLoginComponents.length
        ? customerLoginComponents.map((c) =>
            usePortal(
              <CustomerLogin options={{ ...c }} key={c.id} />,
              c.element
            )
          )
        : null}
    </>
  )
}

export default Account
