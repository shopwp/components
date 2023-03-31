import SubscriptionsBuyButtonProvider from './_state/provider'
import SubscriptionsBuyButtonWrapper from './wrapper'

function SubscriptionsBuyButton(props) {
	return (
		<SubscriptionsBuyButtonProvider {...props}>
			<SubscriptionsBuyButtonWrapper />
		</SubscriptionsBuyButtonProvider>
	)
}

export default SubscriptionsBuyButton
