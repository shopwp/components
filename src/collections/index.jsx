import Collection from "./collection"
import Items from "../items"

function Collections(props) {
  return (
    <Items
      {...props}
      queryType="collections"
      componentType="collections"
      skeletonType="shopwp/collections"
    >
      <Collection {...props} />
    </Items>
  )
}

export default Collections
