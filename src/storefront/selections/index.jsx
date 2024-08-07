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
      <div
        id="shopwp-storefront-selections"
        className="swp-storefront-selections"
      >
        {usePortal(
          !objectIsEmpty(storefrontState.selections) ? (
            <StorefrontSelectionsWrapper
              selections={storefrontState.selections}
              initialSelections={storefrontState.initialSelections}
            />
          ) : null,
          settings.dropzoneSelections
        )}
      </div>
    </Suspense>
  )
}

export default StorefrontSelections
