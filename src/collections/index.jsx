import Collection from "./collection"
import Items from "../items"

function Collections(props) {
  console.log("<Collections />")
  return (
    <Items {...props} queryType="collections" componentType="collections">
      <Collection {...props} />
    </Items>
  )
}

export default Collections
