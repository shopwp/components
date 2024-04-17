import SubscriptionsBuyButtonProvider from "./_state/provider"
import SubscriptionsBuyButtonWrapper from "./wrapper"

function SubscriptionsBuyButton(props) {
  return (
    <SubscriptionsBuyButtonProvider {...props}>
      <SubscriptionsBuyButtonWrapper {...props} />
    </SubscriptionsBuyButtonProvider>
  )
}

export default SubscriptionsBuyButton
