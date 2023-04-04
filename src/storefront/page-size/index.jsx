/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useSettingsState } from "../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { findDefaultSelectVal } from "@shopwp/common"
import Selects from "../selects"
import { useShopState } from "@shopwp/components"

function StorefrontPageSize() {
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const shopState = useShopState()
  const options = settings.sortingOptionsPageSize

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
    <Selects
      dropzone={settings.dropzonePageSize}
      labelText={shopState.t.l.pageSize}
      selectId="swp-pagesize"
      options={options}
      isLoading={requestsState.isFetchingNew}
      customOnChange={customOnChange}
      defaultValue={findDefaultSelectVal(options, settings.pageSize)}
    />
  )
}

export default StorefrontPageSize
