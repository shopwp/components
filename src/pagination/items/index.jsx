import { useItemsState } from "../../items/_state/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useRequestsState } from "../../items/_state/requests/hooks"
import PaginationItemsMap from "./map"
import ProductsSorting from "../../products/sorting"
import ProductsPageSize from "../../products/page-size"

function PaginationItems({ children, payload }) {
  const itemsState = useItemsState()
  const settings = useSettingsState()
  const requestsState = useRequestsState()

  return (
    <section
      className="swp-items-wrapper wps-items-wrapper"
      data-items-type={itemsState.componentType}
      data-is-fetching-new={requestsState.isFetchingNew}
      data-is-showing-more-than-one={payload.length > 1}
      data-is-carousel={
        settings.carousel && payload.length > settings.carouselSlidesToShow
      }
    >
      {itemsState.componentType !== "collections" ? (
        <div className="swp-items-sorting-and-pagination-wrapper swp-l-row swp-l-row-end">
          {settings.withSorting && !settings.isModal ? (
            <ProductsSorting />
          ) : null}
          {settings.withPageSize && !settings.isModal ? (
            <ProductsPageSize />
          ) : null}
        </div>
      ) : null}

      <ul className="swp-items wps-items wps-items-list" role="list">
        <PaginationItemsMap
          payload={payload}
          settings={settings}
          element={itemsState.element}
          id={itemsState.id}
        >
          {children}
        </PaginationItemsMap>
      </ul>
    </section>
  )
}

export default PaginationItems
