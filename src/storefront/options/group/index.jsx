/** @jsx jsx */
import { jsx, css } from "@emotion/react"
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
  const { useState, Suspense } = wp.element
  const shopState = useShopState()
  const [isOpen, setIsOpen] = useState(openOnLoad)

  function toggleDrawer() {
    setIsOpen(!isOpen)

    if (onOpen) {
      onOpen(!isOpen)
    }
  }

  const filterContentCSS = css`
    padding: 0 0 10px 0;
    transition: all 0.2s ease;
    opacity: ${isLoadingItems ? 0.6 : 1};

    .components-notice {
      width: 100%;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `

  const LoadingTextCSS = css`
    padding-left: 0;
    color: black;
    font-size: 16px;
    margin-top: 15px;
    text-align: center;
    margin-bottom: 35px;
  `

  return (
    <StorefrontFilter
      heading={heading}
      isOpen={isOpen}
      setIsOpen={toggleDrawer}
    >
      <div className="wps-filter-content" css={filterContentCSS}>
        {error ? (
          <Notice status="error">{error}</Notice>
        ) : areFilterOptionsEmpty && !isLoadingItems ? (
          <Notice status="info">{noFilterGroupFoundText}</Notice>
        ) : isLoadingItems && groupType !== "collections" ? (
          <p css={LoadingTextCSS}>
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
