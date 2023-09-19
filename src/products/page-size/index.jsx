/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useSettingsState } from "../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../items/_state/requests/hooks"
import { mq, findDefaultSelectVal } from "@shopwp/common"

const Dropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../select")
)

function ProductsPageSize() {
  const { Suspense } = wp.element
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const options = [
    {
      label: "10",
      value: 10,
    },
    {
      label: "25",
      value: 25,
    },
    {
      label: "50",
      value: 50,
    },
    {
      label: "100",
      value: 100,
    },
  ]

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

  const pageSizeWrapperCSS = css`
    width: auto;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 20px;
    align-items: baseline;
    margin-left: 10px;

    ${mq("medium")} {
      width: 100%;
      margin-left: 0;
    }
  `

  return (
    <div id="shopwp-storefront-page-size" css={pageSizeWrapperCSS}>
      <Suspense fallback="Loading ...">
        <Dropdown
          items={options}
          onChange={customOnChange}
          label={settings.pageSizeLabelText}
          selectedOption={defaultVal}
          isBusy={requestsState.isFetchingNew}
          dropzone={settings.dropzonePageSize}
          inline={true}
        />
      </Suspense>
    </div>
  )
}

export default ProductsPageSize
