import { updatePayload } from "@shopwp/common"

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
        action.payload.settings
      )

      wp.hooks.doAction("on.afterPayloadUpdate", newPayload)

      return newPayload
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in PayloadReducer`)
    }
  }
}

export default PayloadReducer
