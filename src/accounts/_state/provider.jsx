import AccountReducer from './reducer'
import AccountInitialState from './initial-state'
import { AccountStateContext, AccountDispatchContext } from './context'

function AccountProvider(props) {
	const [state, dispatch] = wp.element.useReducer(
		AccountReducer,
		AccountInitialState(props)
	)

	return (
		<AccountStateContext.Provider value={state}>
			<AccountDispatchContext.Provider value={dispatch}>
				{props.children}
			</AccountDispatchContext.Provider>
		</AccountStateContext.Provider>
	)
}

export default AccountProvider
