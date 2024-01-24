/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import SearchInput from "./input"
import { useSettingsState } from "../../items/_state/settings/hooks"

function SearchForm({
  hasStorefrontSelections,
  searchTerm,
  setSearchTerm,
  withStorefront,
}) {
  const settings = useSettingsState()

  const searchWrapperCSS = css``
  const searchInputWrapperCSS = css``

  function onSubmit(e) {
    e.preventDefault()
  }

  return usePortal(
    <form
      className="swp-search-form wps-search-form"
      css={searchWrapperCSS}
      onSubmit={onSubmit}
    >
      <div
        className="swp-search-wrapper wps-search-wrapper"
        css={searchInputWrapperCSS}
      >
        <SearchInput
          hasStorefrontSelections={hasStorefrontSelections}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          withStorefront={withStorefront}
        />
      </div>
    </form>,
    settings.dropzoneForm
  )
}

export default wp.element.memo(SearchForm)
