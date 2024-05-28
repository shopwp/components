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

function SearchInput({
  hasStorefrontSelections,
  searchTerm,
  setSearchTerm,
  withStorefront,
  setIsShowingModal,
}) {
  const { useEffect, useState, Suspense } = wp.element
  const [localTerm, setLocalTerm] = useState("")
  const debouncedSearchTerm = useDebounce(localTerm, 350)

  const isFirstRender = useFirstRender()
  const requestsState = useRequestsState()
  const requestsDispatch = useRequestsDispatch()
  const settings = useSettingsState()
  const shopState = useShopState()

  const onFocus = () => setIsShowingModal(true)
  const onBlur = () => setIsShowingModal(false)

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
    if (!searchTerm) {
      setLocalTerm("")
      setNativeInput()
    }
  }, [searchTerm])

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
      var newQ = searchBy + ":" + debouncedSearchTerm + "*"
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

    setIsShowingModal(true)

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

  function onChange(e) {
    setLocalTerm(e.target.value)

    // This resets the storefront layout when search is cleared out
    if (!e.target.value && withStorefront) {
      requestsDispatch({
        type: "SET_QUERY_PARAMS",
        payload: requestsState.originalParams,
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
  }

  return (
    <Suspense fallback={false}>
      <div
        className="swp-search-input-wrapper wps-search-input-wrapper"
        data-is-fetching-new={requestsState.isFetchingNew}
      >
        <input
          type="search"
          id="wps-search-input"
          className="swp-search-input wps-search-input"
          name="search"
          role="searchbox"
          val={localTerm ? localTerm : ""}
          placeholder={settings.searchPlaceholderText}
          aria-label={settings.searchPlaceholderText}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {!localTerm ? <SearchIcon /> : null}

        {requestsState.isFetchingNew && !requestsState.isBootstrapping ? (
          <div className="swp-search-spinner">{shopState.t.l.loading} ...</div>
        ) : null}
      </div>
    </Suspense>
  )
}

export default SearchInput
