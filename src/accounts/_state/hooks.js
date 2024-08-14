import { AccountStateContext, AccountDispatchContext } from './context'

function useAccountState() {
	const context = wp.element.useContext(AccountStateContext)

	if (!context) {
		throw new Error('useAccountState must be used within the AccountProvider')
	}

	return context
}

function useAccountDispatch() {
	const context = wp.element.useContext(AccountDispatchContext)

	if (!context) {
		throw new Error(
			'useAccountDispatch must be used within the AccountProvider'
		)
	}

	return context
}

export { useAccountState, useAccountDispatch }
