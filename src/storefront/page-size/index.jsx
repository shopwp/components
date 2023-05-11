/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useSettingsState } from "../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { findDefaultSelectVal } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const Select = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../select")
)

function StorefrontPageSize() {
  const { Suspense } = wp.element
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()
  const options = settings.sortingOptionsPageSize

  const defaultVal = findDefaultSelectVal(options, settings.pageSize)

  function customOnChange(data) {
    requestsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: {
        ...requestsState.queryParams,
        first: parseInt(data.value),
      },
    })

    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })

    requestsDispatch({ type: "SET_IS_FETCHING_NEW", payload: true })
  }

  return (
    <Suspense fallback="Loading ...">
      <Select
        items={options}
        onChange={customOnChange}
        label={shopState.t.l.pageSize}
        selectedOption={defaultVal}
        id="swp-pagesize"
        isBusy={requestsState.isFetchingNew}
        dropzone={settings.dropzonePageSize}
        inline={true}
      />
    </Suspense>
  )
}

export default StorefrontPageSize
