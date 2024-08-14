import to from "await-to-js"
import { useAccountState, useAccountDispatch } from "../_state/hooks"
import {
  obtainAccessToken,
  loadCustomer,
  exchangeForAccessToken,
  createLogoutURL,
  fetchCustomer,
  resetTokens,
} from "../api"
import Account from "../account"

function AccountEntry() {
  const { useEffect } = wp.element

  const accountState = useAccountState()
  const accountDispatch = useAccountDispatch()

  useEffect(() => {
    const swpCustomerAccessToken = sessionStorage.getItem(
      "swpCustomerAccessToken"
    )

    if (accountState.customer) {
      accountDispatch({
        type: "SET_IS_BOOTSTRAPPING",
        payload: false,
      })

      accountDispatch({
        type: "SET_IS_WORKING",
        payload: false,
      })
      return
    }

    // check for existing token
    if (swpCustomerAccessToken && swpCustomerAccessToken !== "undefined") {
      loadCustomer(accountState, accountDispatch)
    } else {
      doFlow()
    }
  }, [])

  async function doFlow() {
    const [error, resp] = await to(obtainAccessToken())

    if (error) {
      resetTokens()

      accountDispatch({
        type: "SET_IS_BOOTSTRAPPING",
        payload: false,
      })
      return
    }

    const [err, response] = await to(exchangeForAccessToken(resp.access_token))

    if (err) {
      resetTokens()
      accountDispatch({
        type: "SET_IS_BOOTSTRAPPING",
        payload: false,
      })
      return
    }

    sessionStorage.setItem("swpCustomerAccessToken", response.access_token)
    sessionStorage.setItem("swpCustomerRefreshToken", resp.refresh_token)
    sessionStorage.setItem("swpCustomerIdToken", resp.id_token)

    const [customerError, responseData] = await to(
      fetchCustomer(accountState.metafieldIdentifiers)
    )

    if (customerError) {
      accountDispatch({
        type: "SET_IS_BOOTSTRAPPING",
        payload: false,
      })
      return
    }

    accountDispatch({
      type: "SET_IS_BOOTSTRAPPING",
      payload: false,
    })

    accountDispatch({
      type: "SET_CUSTOMER",
      payload: responseData.data.customer,
    })

    accountDispatch({
      type: "SET_LOGOUT_URL",
      payload: createLogoutURL(resp.id_token),
    })
  }

  return <Account />
}

export default AccountEntry
