import SearchWrapper from "./wrapper"
import Items from "../items"

function Search(props) {
  console.log("<Search />")
  return (
    <Items
      {...props}
      queryType="products"
      componentType="search"
      customPagination={true}
    >
      <SearchWrapper />
    </Items>
  )
}

export default Search
