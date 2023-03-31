import has from "lodash/has"
import PagMap from "./map-clone"

const Carousel = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Carousel-public' */ "../../carousel")
)

function PaginationItemsMap({ children, payload, settings, element, id }) {
  return settings.carousel && payload.length > settings.carouselSlidesToShow ? (
    <Carousel settings={settings} element={element}>
      {payload.map((item) => {
        return wp.element.cloneElement(children, {
          key: has(item, "node") ? item.node.id : item.id,
          payload: has(item, "node") ? item.node : item,
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
