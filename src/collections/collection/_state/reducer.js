import { rSet } from "Common"
import uniqBy from "lodash/uniqBy"
import update from "immutability-helper"

function CollectionReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCT_OPTIONS": {
      if (!action.payload) {
        return {
          ...state,
        }
      }

      return rSet("productOptions", action, state)
    }

    case "SET_PRODUCTS": {
      if (action.payload.replace) {
        var newProducts = update(state.products, {
          $set: action.payload.products,
        })
      } else {
        var newProducts = update(state.products, {
          $set: uniqBy(
            update(state.products, { $push: action.payload.products }),
            "cursor"
          ),
        })
      }

      return {
        ...state,
        products: newProducts,
      }
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    case "SET_PRODUCTS_HAS_NEXT_PAGE": {
      return rSet("productsHasNextPage", action, state)
    }

    case "SET_IS_LOADING": {
      return rSet("isLoading", action, state)
    }

    case "SET_PRODUCT_QUERY_PARAMS": {
      return rSet("productQueryParams", action, state)
    }

    case "SET_CURSOR": {
      return rSet("cursor", action, state)
    }

    case "SET_SHOULD_REPLACE": {
      return rSet("shouldReplace", action, state)
    }

    case "SET_IS_FETCHING_NEW": {
      return rSet("isFetchingNew", action, state)
    }

    default: {
      throw new Error(
        `Unhandled action type: ${action.type} in CollectionReducer`
      )
    }
  }
}

export default CollectionReducer
