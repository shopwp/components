import uniqBy from "lodash-es/uniqBy"
import update from "immutability-helper"
import { rSet, rErr } from "@shopwp/common"

function CollectionReducer(state, action) {
  switch (action.type) {
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

    case "SET_QUERY_PARAMS": {
      return rSet("queryParams", action, state)
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
      rErr(action, "Collection")
    }
  }
}

export default CollectionReducer
