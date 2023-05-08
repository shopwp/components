/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"
import { useFirstRender, useDebounce } from "@shopwp/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import {
  useRequestsState,
  useRequestsDispatch,
} from "../../../items/_state/requests/hooks"

const SearchIcon = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SearchIcon-public' */ "../../icon")
)

function SearchInput({ hasStorefrontSelections, setSearchTerm }) {
  const { useEffect, useState, Suspense } = wp.element
  const [localTerm, setLocalTerm] = useState("")
  const debouncedSearchTerm = useDebounce(localTerm, 350)

  const isFirstRender = useFirstRender()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const settings = useSettingsState()
  const shopState = useShopState()

  // TODO: Remove this somehow
  function setNativeInput() {
    const input = document.querySelector("#wps-search-input")

    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set.call(input, "")

    // This will trigger a new render wor the component
    input.dispatchEvent(new Event("change", { bubbles: true }))
  }

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (hasStorefrontSelections) {
      setLocalTerm("")
      setNativeInput()
    }
  }, [hasStorefrontSelections])

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (settings.searchBy) {
      var searchBy = settings.searchBy
    } else {
      var searchBy = "title"
    }

    if (debouncedSearchTerm) {
      if (settings.searchExactMatch) {
        var newQ = searchBy + ':"' + debouncedSearchTerm + '"'
      } else {
        var newQ = searchBy + ":" + debouncedSearchTerm
      }

      if (settings.searchBy === "title" && !settings.searchExactMatch) {
        newQ += "*"
      }
    } else {
      var newQ = ""
    }

    // This check allows users to combine mandatory conditions to the search
    if (
      requestsState.originalParams.query &&
      requestsState.originalParams.query !== "*"
    ) {
      newQ = requestsState.originalParams.query + " AND " + newQ
    }

    requestsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: {
        ...requestsState.queryParams,
        query: newQ,
      },
    })

    // if (newQ === "") {
    //   itemsDispatch({
    //     type: "SET_SEARCH_QUERY",
    //     payload: false,
    //   })
    // } else {
    //   itemsDispatch({
    //     type: "SET_SEARCH_QUERY",
    //     payload: newQ,
    //   })
    // }

    setSearchTerm(debouncedSearchTerm)

    if (!debouncedSearchTerm) {
      return
    }

    requestsDispatch({
      type: "SET_CURSOR",
      payload: false,
    })

    requestsDispatch({
      type: "SET_IS_REPLACING",
      payload: true,
    })

    requestsDispatch({ type: "SET_IS_FETCHING_NEW", payload: true })
  }, [debouncedSearchTerm])

  const spinnerCSS = css`
    position: absolute;
    top: 14px;
    right: 30px;
    font-size: 15px;
  `

  const searchInputCSS = css`
    padding: 1em;
    font-size: 1em;
    border: none;
    border: 1px solid #ddd;
    outline: none;
    width: 100%;
    -webkit-appearance: none;

    &::-webkit-search-cancel-button {
      display: ${requestsState.isFetchingNew ? "none" : "block"};
      &:hover {
        cursor: pointer;
      }
    }
  `
  const searchInputWrapperCSS = css`
    width: 100%;
    position: relative;
  `

  function onChange(e) {
    setLocalTerm(e.target.value)
  }

  return (
    <Suspense fallback={false}>
      <div className="wps-search-input-wrapper" css={searchInputWrapperCSS}>
        <input
          type="search"
          id="wps-search-input"
          className="wps-search-input"
          name="search"
          role="searchbox"
          val={localTerm ? localTerm : ""}
          placeholder={settings.searchPlaceholderText}
          aria-label={settings.searchPlaceholderText}
          css={searchInputCSS}
          onChange={onChange}
        />
        {!localTerm ? <SearchIcon /> : null}

        {requestsState.isFetchingNew && !requestsState.isBootstrapping ? (
          <div css={spinnerCSS}>{shopState.t.l.loading} ...</div>
        ) : null}
      </div>
    </Suspense>
  )
}

export default SearchInput
