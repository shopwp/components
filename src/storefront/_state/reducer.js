import update from "immutability-helper"
import { rSet, rErr } from "@shopwp/common"

function StorefrontReducer(state, action) {
  switch (action.type) {
    // Is called dynamically
    case "SET_SELECTED_TAGS": {
      return rSet("selectedTags", action, state)
    }

    // Is called dynamically
    case "SET_SELECTED_COLLECTIONS": {
      return rSet("selectedCollections", action, state)
    }

    // Is called dynamically
    case "SET_SELECTED_TYPES": {
      return rSet("selectedTypes", action, state)
    }

    // Is called dynamically
    case "SET_SELECTED_VENDORS": {
      return rSet("selectedVendors", action, state)
    }

    // Is called dynamically
    case "SET_SELECTED_PRICE": {
      return rSet("selectedPrice", action, state)
    }

    // Is called dynamically
    case "SET_HAS_SELECTIONS": {
      return rSet("hasSelections", action, state)
    }

    case "SET_INITIAL_SELECTIONS": {
      return rSet("initialSelections", action, state)
    }

    case "CLEAR_SELECTIONS": {
      return {
        ...state,
        selections: update(state.selections, { $set: {} }),
        selectedVendors: update(state.selectedVendors, { $set: [] }),
        selectedTags: update(state.selectedTags, { $set: [] }),
        selectedTypes: update(state.selectedTypes, { $set: [] }),
        selectedCollections: update(state.selectedCollections, { $set: [] }),
        selectedAvailableForSale: update(state.selectedCollections, {
          $set: state.settings.availableForSale,
        }),
        hasSelections: update(state.hasSelections, { $set: false }),
      }
    }

    case "CLEAR_SELECTED_VENDORS": {
      return {
        ...state,
        selectedVendors: update(state.selectedVendors, { $set: [] }),
      }
    }

    case "CLEAR_SELECTED_TAGS": {
      return {
        ...state,
        selectedTags: update(state.selectedTags, { $set: [] }),
      }
    }

    case "CLEAR_SELECTED_TYPES": {
      return {
        ...state,
        selectedTypes: update(state.selectedTypes, { $set: [] }),
      }
    }

    case "SET_SELECTIONS": {
      if (!action.payload) {
        return state
      }

      return {
        ...state,
        selections: update(state.selections, { $set: action.payload }),
      }
    }

    case "SET_LAST_SELECTED": {
      if (!action.payload) {
        return state
      }

      return {
        ...state,
        lastSelected: update(state.lastSelected, {
          $set: action.payload,
        }),
      }
    }

    // Is called dynamically
    case "SET_SELECTED_AVAILABLE_FOR_SALE": {
      if (!action.payload) {
        var newVal = null
      } else {
        var newVal = action.payload
      }

      return {
        ...state,
        selectedAvailableForSale: update(state.selectedAvailableForSale, {
          $set: newVal,
        }),
      }
    }

    case "SET_SEARCH_QUERY": {
      return rSet("searchQuery", action, state)
    }

    case "SET_HAS_STOREFRONT_SELECTIONS": {
      return rSet("hasStorefrontSelections", action, state)
    }

    default: {
      rErr(action, "Storefront")
    }
  }
}

export default StorefrontReducer
