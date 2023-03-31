function SearchInitialState(props) {
	return {
		element: props.element ? props.element : false,
		settings: props.settings ? props.settings : false,
	}
}

export default SearchInitialState
