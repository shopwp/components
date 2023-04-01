/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common"
import PaginationItemsMap from "./map"
import { useItemsState } from "../../items/_state/hooks"
import { useSettingsState } from "../../items/_state/settings/hooks"
import { useRequestsState } from "../../items/_state/requests/hooks"
import { removeSkelly } from "Common"
import ProductsSorting from "../../products/sorting"

function PaginationItems({ children, payload }) {
  const itemsState = useItemsState()
  const settings = useSettingsState()
  const requestsState = useRequestsState()
  const { useEffect } = wp.element

  useEffect(() => {
    removeSkelly(itemsState.element)
    wp.hooks.doAction("on.itemsLoad", payload, settings)
  }, [])

  const PaginationItemsCSS = css`
    display: ${settings.carousel &&
    payload.length > settings.carouselSlidesToShow
      ? "block"
      : "grid"};
    grid-template-columns: repeat(
      ${payload.length <= 1 ? 1 : settings.itemsPerRow},
      1fr
    );
    grid-column-gap: ${settings.gridColumnGap
      ? settings.gridColumnGap
      : "20px"};
    grid-row-gap: ${settings.isSingleComponent ? "0px" : "40px"};
    padding: 0;
    transition: opacity 0.3s ease;
    opacity: ${requestsState.isFetchingNew ? 0.4 : 1};

    ${mq("medium")} {
      grid-template-columns: ${payload.length === 1
        ? "repeat(1, 1fr)"
        : "repeat(2, 1fr)"};
    }

    ${mq("small")} {
      grid-template-columns: ${"repeat(" + settings.mobileColumns + ", 1fr)"};
    }
  `

  const PaginationItemsContainerCSS = css`
    max-width: ${settings.containerWidth};
    margin: 0 auto;
    padding: 0;

    ${mq("medium")} {
      padding: 0 15px;
    }
  `

  return payload && payload.length ? (
    <section className="wps-items-wrapper" css={PaginationItemsContainerCSS}>
      <ProductsSorting />
      <section className="wps-items wps-items-list" css={PaginationItemsCSS}>
        <PaginationItemsMap
          payload={payload}
          settings={settings}
          element={itemsState.element}
          id={itemsState.id}
        >
          {children}
        </PaginationItemsMap>
      </section>
    </section>
  ) : null
}

export default PaginationItems
