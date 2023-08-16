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

  const searchWrapperCSS = css`
    max-width: 100%;
    margin: 0 auto;

    .is-loading {
      position: absolute;
      bottom: -30px;
      font-size: 19px;
    }

    .components-notice {
      margin: 0;
      width: 100%;
    }
  `

  const searchInputWrapperCSS = css`
    display: flex;
    margin-bottom: 20px;
  `

  function onSubmit(e) {
    e.preventDefault()
  }

  return usePortal(
    <form
      className="wps-search-form"
      css={searchWrapperCSS}
      onSubmit={onSubmit}
    >
      <div className="wps-search-wrapper" css={searchInputWrapperCSS}>
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
