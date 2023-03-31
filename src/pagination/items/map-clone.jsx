import has from "lodash/has"

function PagMap(props) {
  return props.payload.map((item) => {
    return wp.element.cloneElement(props.childrenItems, {
      ...props,
      id: props.id,
      key: item.cursor + "-" + props.id,
      payload: has(item, "node") ? item.node : item,
      settings: props.settings,
      element: props.element,
    })
  })
}

export default PagMap
