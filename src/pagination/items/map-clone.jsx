function PagMap(props) {
  return props.payload.map((item) => {
    return wp.element.cloneElement(props.childrenItems, {
      ...props,
      id: props.id,
      key: item.cursor + "-" + props.id,
      payload: item.hasOwnProperty("node") ? item.node : item,
      settings: props.settings,
      element: props.element,
    })
  })
}

export default PagMap
