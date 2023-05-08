/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import SearchItems from "../form/items"
import SearchForm from "../form"

function SearchWrapper(props) {
  const { Suspense, useState } = wp.element
  const [searchTerm, setSearchTerm] = useState(false)

  const SearchCSS = css`
    position: relative;
  `

  return (
    <Suspense fallback={false}>
      <div css={SearchCSS}>
        <SearchForm
          componentType="search"
          hasStorefrontSelections={props.hasStorefrontSelections}
          setSearchTerm={setSearchTerm}
        />
        <SearchItems searchTerm={searchTerm} />
      </div>
    </Suspense>
  )
}

export default SearchWrapper
