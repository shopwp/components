import { rErr, updatePayload } from "@shopwp/common"

function PayloadReducer(currentPayload, action) {
  switch (action.type) {
    case "UPDATE_PAYLOAD": {
      if (!action.payload) {
        return currentPayload
      }

      if (!action.payload.hasOwnProperty("replace")) {
        action.payload.replace = true
      }

      const newPayload = updatePayload(
        currentPayload,
        action.payload.items,
        action.payload.replace,
        action.payload.totalShown,
        action.payload.limit,
        action.payload.pageSize,
        action.payload.pagination
      )

      return newPayload
    }

    default: {
      rErr(action, "Payload")
    }
  }
}

export default PayloadReducer
