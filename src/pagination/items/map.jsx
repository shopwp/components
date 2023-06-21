import PagMap from "./map-clone"

const Carousel = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Carousel-public' */ "../../carousel")
)

function PaginationItemsMap({ children, payload, settings, element, id }) {
  return settings.carousel && payload.length > settings.carouselSlidesToShow ? (
    <Carousel settings={settings}>
      {payload.map((item) => {
        let hasOwn = item.hasOwnProperty("node")
        return wp.element.cloneElement(children, {
          key: hasOwn ? item.node.id : item.id,
          payload: hasOwn ? item.node : item,
          settings: settings,
          id: id,
        })
      })}
    </Carousel>
  ) : (
    <PagMap
      childrenItems={children}
      payload={payload}
      settings={settings}
      element={element}
      id={id}
    />
  )
}

export default PaginationItemsMap
