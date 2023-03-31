/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import SearchProvider from "../_state/provider"
import SearchItems from "../form/items"
import SearchForm from "../form"

function SearchWrapper(props) {
  const { Suspense } = wp.element

  const SearchCSS = css`
    position: relative;
  `

  return (
    <SearchProvider {...props}>
      <Suspense fallback={false}>
        <div css={SearchCSS}>
          <SearchForm componentType="search" />
          <SearchItems />
        </div>
      </Suspense>
    </SearchProvider>
  )
}

export default SearchWrapper
