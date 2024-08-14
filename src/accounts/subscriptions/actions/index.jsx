import to from "await-to-js"
import {
  cancelSubscription,
  renewSubscription,
  pauseSubscription,
  updateSubscriptionPaymentMethod,
  fetchCustomer,
} from "../../api"
import { useAccountDispatch, useAccountState } from "../../_state/hooks"
import { maybeHandleApiError } from "@shopwp/api"
import { prettyPrice } from "@shopwp/common"

function AccountSubscriptionsActions({
  subscription,
  setIsWorking,
  isWorking,
}) {
  const accountDispatch = useAccountDispatch()
  const accountState = useAccountState()

  async function updateAccountPaymentMethod(subscription) {
    setIsWorking(subscription.node.id)
    accountDispatch({
      type: "SET_IS_WORKING",
      payload: true,
    })

    const [updatePaymentMethodErr, updatePaymentMethodResp] = await to(
      updateSubscriptionPaymentMethod(accountState.customer.id)
    )

    setIsWorking(false)
    accountDispatch({
      type: "SET_IS_WORKING",
      payload: false,
    })

    if (updatePaymentMethodErr) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: updatePaymentMethodErr.message
            ? updatePaymentMethodErr.message
            : JSON.stringify(updatePaymentMethodErr),
        },
      })
      return
    }

    var maybeErr = maybeHandleApiError(
      updatePaymentMethodErr,
      updatePaymentMethodResp
    )

    if (maybeErr) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: maybeErr,
        },
      })
      return
    }
  }

  async function pauseSub(subscription, dialogText) {
    if (!window.confirm(dialogText)) {
      return
    }

    setIsWorking(subscription.node.id)
    accountDispatch({
      type: "SET_IS_WORKING",
      payload: true,
    })

    const [err, resp] = await to(pauseSubscription(subscription))

    const [customerError, responseData] = await to(fetchCustomer())

    if (customerError) {
    }

    // sessionStorage.setItem(
    //   "swpCustomerData",
    //   JSON.stringify(responseData.data.customer)
    // )

    accountDispatch({
      type: "SET_CUSTOMER",
      payload: responseData.data.customer,
    })

    accountDispatch({
      type: "SET_IS_WORKING",
      payload: false,
    })
    setIsWorking(false)

    if (err) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: err.message ? err.message : JSON.stringify(err),
        },
      })
      return
    }

    accountDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "success",
        message: "Subscription has been paused.",
      },
    })
  }

  async function renewSub(subscription, dialogText) {
    if (!window.confirm(dialogText)) {
      return
    }

    setIsWorking(subscription.node.id)
    accountDispatch({
      type: "SET_IS_WORKING",
      payload: true,
    })

    const [err, resp] = await to(renewSubscription(subscription))

    const [customerError, responseData] = await to(fetchCustomer())

    if (customerError) {
    }

    // sessionStorage.setItem(
    //   "swpCustomerData",
    //   JSON.stringify(responseData.data.customer)
    // )

    accountDispatch({
      type: "SET_CUSTOMER",
      payload: responseData.data.customer,
    })

    accountDispatch({
      type: "SET_IS_WORKING",
      payload: false,
    })
    setIsWorking(false)

    if (err) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: err.message ? err.message : JSON.stringify(err.message),
        },
      })
      return
    }

    accountDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "success",
        message: "Subscription has been renewed.",
      },
    })
  }

  async function cancelSub(subscription, dialogText) {
    if (!window.confirm(dialogText)) {
      return
    }

    setIsWorking(subscription.node.id)
    accountDispatch({
      type: "SET_IS_WORKING",
      payload: true,
    })

    const [err, resp] = await to(cancelSubscription(subscription))

    const [customerError, responseData] = await to(fetchCustomer())

    if (customerError) {
    }

    // sessionStorage.setItem(
    //   "swpCustomerData",
    //   JSON.stringify(responseData.data.customer)
    // )

    accountDispatch({
      type: "SET_CUSTOMER",
      payload: responseData.data.customer,
    })

    accountDispatch({
      type: "SET_IS_WORKING",
      payload: false,
    })
    setIsWorking(false)

    if (err) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: JSON.stringify(err),
        },
      })
      return
    }

    accountDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "success",
        message: "Subscription has been cancelled.",
      },
    })
  }

  return (
    <td
      data-is-working={isWorking === subscription.node.id}
      className="swp-td-link"
      width="400"
    >
      {isWorking === subscription.node.id ? (
        <LoadingCell />
      ) : subscription.node.status === "ACTIVE" ? (
        <>
          <CancelButton subscription={subscription.node} action={cancelSub} />
          <PauseButton subscription={subscription.node} action={pauseSub} />
          <UpdatePayment
            subscription={subscription.node}
            action={updateAccountPaymentMethod}
          />
        </>
      ) : subscription.node.status === "PAUSED" ? (
        <>
          <CancelButton subscription={subscription.node} action={cancelSub} />
          <RenewButton subscription={subscription.node} action={renewSub} />
        </>
      ) : (
        <a href="/purchase" target="_blank">
          Purchase a new subscription
        </a>
      )}
    </td>
  )
}

function SubscriptionActionButton({
  type,
  action,
  text,
  subscription,
  dialogText,
}) {
  return (
    <a
      href="#!"
      className={`swp-account-icon-${type}`}
      onClick={() => action(subscription, dialogText)}
    >
      {text}
    </a>
  )
}

function RenewButton({ subscription, action }) {
  return (
    <SubscriptionActionButton
      type="renew"
      action={action}
      text="Activate subscription"
      dialogText={`This will automatically active your subscription, and you will be charged: ${prettyPrice(
        subscription.originOrder.totalPrice.amount
      )} now. Do you wish to continue?`}
      subscription={subscription}
    />
  )
}

function UpdatePayment({ subscription, action }) {
  return (
    <SubscriptionActionButton
      type="updatePayment"
      action={action}
      text="Update payment method"
      subscription={subscription}
    />
  )
}

function PauseButton({ subscription, action }) {
  return (
    <SubscriptionActionButton
      type="pause"
      action={action}
      text="Pause subscription"
      dialogText="This will automatically pause your ShopWP subscription. You can activate your subscription again if you wish, and you won't be charged—as long as you haven't reached your renewal date. You will only be charged again on your subscription renewal date. Do you wish to continue?"
      subscription={subscription}
    />
  )
}

function CancelButton({ subscription, action }) {
  return (
    <SubscriptionActionButton
      type="cancel"
      action={action}
      text="Cancel subscription"
      dialogText="This will automatically cancel your ShopWP subscription. You will no longer be charged. If you wish to renew, you'll need to purchase a new subscription. Do you wish to continue?"
      subscription={subscription}
    />
  )
}

function LoadingCell() {
  return (
    <span className="swp-account-icon-loading swp-account-icon-left">
      Please wait ...
    </span>
  )
}

export default AccountSubscriptionsActions
