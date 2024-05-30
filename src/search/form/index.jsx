import { usePortal } from "@shopwp/hooks"
import SearchInput from "./input"
import { useSettingsState } from "../../items/_state/settings/hooks"

function SearchForm({
  hasStorefrontSelections,
  searchTerm,
  setSearchTerm,
  withStorefront,
  setIsShowingModal,
}) {
  const settings = useSettingsState()

  function onSubmit(e) {
    e.preventDefault()
  }

  return usePortal(
    <form className="swp-search-form wps-search-form" onSubmit={onSubmit}>
      <div className="swp-search-wrapper wps-search-wrapper">
        <SearchInput
          hasStorefrontSelections={hasStorefrontSelections}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          withStorefront={withStorefront}
          setIsShowingModal={setIsShowingModal}
        />
      </div>
    </form>,
    settings.dropzoneForm
  )
}

export default wp.element.memo(SearchForm)
