import { rSet } from "@shopwp/common"

function ProductGalleryReducer(state, action) {
  switch (action.type) {
    case "SET_FEAT_IMAGE": {
      return rSet("featImage", action, state)
    }

    case "SET_FEAT_IMAGE_ELEMENT": {
      return rSet("featImageElement", action, state)
    }

    case "SET_FEAT_IMAGE_IS_VIDEO": {
      return rSet("featImageIsVideo", action, state)
    }

    default: {
      throw new Error(
        `Unhandled action type: ${action.type} in ProductGalleryReducer`
      )
    }
  }
}

export default ProductGalleryReducer
