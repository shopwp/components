import StorefrontFilter from "../../filter"
import { useShopState } from "@shopwp/components"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

function StorefrontFilterOptionsGroup({
  groupType,
  heading,
  areFilterOptionsEmpty,
  isLoadingItems,
  onOpen = false,
  openOnLoad = false,
  error = false,
  noFilterGroupFoundText,
  items,
}) {
  const { useState, Suspense, useEffect } = wp.element
  const shopState = useShopState()
  const [isOpen, setIsOpen] = useState(openOnLoad)

  function toggleDrawer() {
    setIsOpen(!isOpen)

    if (onOpen) {
      onOpen(!isOpen)
    }
  }

  useEffect(() => {
    if (openOnLoad) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [openOnLoad])

  return (
    <StorefrontFilter
      heading={heading}
      isOpen={isOpen}
      setIsOpen={toggleDrawer}
    >
      <div
        className="swp-storefront-filter-content wps-filter-content"
        data-is-loading-items={isLoadingItems}
      >
        {error ? (
          <Notice status="error">{error}</Notice>
        ) : areFilterOptionsEmpty && !isLoadingItems ? (
          <Notice status="info">{noFilterGroupFoundText}</Notice>
        ) : isLoadingItems && groupType !== "collections" ? (
          <p className="swp-storefront-loading-text">
            {shopState.t.l.loading + " " + groupType + " ..."}
          </p>
        ) : (
          <Suspense fallback={shopState.t.l.loading + " " + groupType + " ..."}>
            {isOpen ? items : null}
          </Suspense>
        )}
      </div>
    </StorefrontFilter>
  )
}

export default StorefrontFilterOptionsGroup
