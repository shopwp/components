import { rSet } from "Common"

function ProductOptionReducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_OPTION": {
      return rSet("selectedOption", action, state)
    }

    case "SET_IS_OPTION_SELECTED": {
      return rSet("isOptionSelected", action, state)
    }

    case "TOGGLE_DROPDOWN": {
      return rSet("isDropdownOpen", action, state)
    }

    default: {
      throw new Error(
        `Unhandled action type: ${action.type} in ProductOptionReducer`
      )
    }
  }
}

export { ProductOptionReducer }
