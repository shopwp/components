import isEmpty from "lodash-es/isEmpty"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import StorefrontOptionsWrapper from "./wrapper"
import { buildNewSelection } from "@shopwp/common"

function StorefrontOptions({ settings }) {
  const { useEffect } = wp.element
  const storefrontState = useStorefrontState()
  const storefrontDispatch = useStorefrontDispatch()

  useEffect(() => {
    if (isEmpty(storefrontState.lastSelected)) {
      return
    }

    const newList = buildNewSelection(
      storefrontState.lastSelected.itemValue,
      storefrontState.lastSelected.itemType,
      storefrontState.lastSelected.isSelected,
      storefrontState.selections,
      storefrontState.initialSelections
    )

    storefrontDispatch({
      type: "SET_SELECTIONS",
      payload: newList.allSelections,
    })

    for (const prop in newList.allSelections) {
      storefrontDispatch({
        type: "SET_SELECTED_" + String(prop).toUpperCase(),
        payload: newList.allSelections[prop],
      })
    }

    if (isEmpty(newList.allSelections)) {
      storefrontDispatch({
        type: "SET_HAS_SELECTIONS",
        payload: false,
      })
    } else {
      storefrontDispatch({
        type: "SET_HAS_SELECTIONS",
        payload: true,
      })
    }
  }, [storefrontState.lastSelected])

  return <StorefrontOptionsWrapper settings={settings} />
}

export default StorefrontOptions
