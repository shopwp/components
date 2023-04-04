import { objectIsEmpty } from "@shopwp/common"
import { usePortal } from "@shopwp/hooks"
import { useStorefrontState } from "../_state/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"

const StorefrontSelectionsWrapper = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontSelectionsWrapper-public' */ "./wrapper"
  )
)

function StorefrontSelections() {
  const storefrontState = useStorefrontState()
  const settings = useSettingsState()

  const { Suspense } = wp.element

  return (
    <Suspense fallback={false}>
      {usePortal(
        !objectIsEmpty(storefrontState.selections) ? (
          <StorefrontSelectionsWrapper
            selections={storefrontState.selections}
          />
        ) : null,
        settings.dropzoneSelections
      )}
    </Suspense>
  )
}

export default StorefrontSelections
