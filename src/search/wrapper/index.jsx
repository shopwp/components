import SearchItems from "../form/items"
import SearchForm from "../form"

function SearchWrapper({ withStorefront = false, hasStorefrontSelections }) {
  const { Suspense, useState } = wp.element
  const [searchTerm, setSearchTerm] = useState(false)

  return (
    <Suspense fallback={false}>
      <div className="swp-search swp-l-rel100">
        <SearchForm
          hasStorefrontSelections={hasStorefrontSelections}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          withStorefront={withStorefront}
        />
        {searchTerm ? (
          <SearchItems
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            withStorefront={withStorefront}
          />
        ) : null}
      </div>
    </Suspense>
  )
}

export default SearchWrapper
