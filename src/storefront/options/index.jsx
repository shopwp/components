import isEmpty from "lodash/isEmpty"
import { useStorefrontState, useStorefrontDispatch } from "../_state/hooks"
import StorefrontOptionsProvider from "./_state/provider"
import StorefrontOptionsWrapper from "./wrapper"
import { createSelectionsOfType, buildNewSelection } from "@shopwp/common"

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
      storefrontState.selections
    )

    storefrontDispatch({
      type: "SET_SELECTIONS",
      payload: createSelectionsOfType(
        storefrontState.lastSelected.itemType,
        newList
      ),
    })

    storefrontDispatch({
      type:
        "SET_SELECTED_" +
        String(storefrontState.lastSelected.itemType).toUpperCase(),
      payload: newList,
    })

    if (newList.length) {
      storefrontDispatch({
        type: "SET_HAS_SELECTIONS",
        payload: true,
      })
    } else {
      storefrontDispatch({
        type: "SET_HAS_SELECTIONS",
        payload: false,
      })
    }
  }, [storefrontState.lastSelected])

  return (
    <StorefrontOptionsProvider>
      <StorefrontOptionsWrapper
        settings={settings}
        dropzoneHeading={settings.dropzoneHeading}
      />
    </StorefrontOptionsProvider>
  )
}

export default StorefrontOptions
