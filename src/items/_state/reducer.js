import { rErr } from "@shopwp/common"

function ItemsReducer(state, action) {
  switch (action.type) {
    default: {
      rErr(action, "Items")
    }
  }
}

export default ItemsReducer
