import SearchWrapper from "./wrapper"
import Items from "../items"

function Search(props) {
  return (
    <Items
      {...props}
      queryType="products"
      componentType="search"
      skeletonType="shopwp/search"
      customPagination={true}
    >
      <SearchWrapper withStorefront={false} />
    </Items>
  )
}

export default Search
