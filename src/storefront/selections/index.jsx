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
  const { Suspense } = wp.element
  const storefrontState = useStorefrontState()
  const settings = useSettingsState()

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
