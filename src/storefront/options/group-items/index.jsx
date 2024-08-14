import memoize from "memoize-one"
import CheckboxItem from "../group-item-value"
import { useStorefrontDispatch, useStorefrontState } from "../../_state/hooks"
import { useRequestsState } from "../../../items/_state/requests/hooks"
import { useVirtualizer } from "@tanstack/react-virtual"

const Row = wp.element.memo(({ data, index, size, start }) => {
  const {
    filterOptions,
    itemType,
    storefrontDispatch,
    isLoading,
    initialSelections,
  } = data

  const itemValue = filterOptions[index]

  return (
    <ul
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${size}px`,
        transform: `translateY(${start}px)`,
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      <CheckboxItem
        itemType={itemType}
        itemValue={itemValue}
        storefrontDispatch={storefrontDispatch}
        isLoading={isLoading}
        initialSelections={initialSelections}
      />
    </ul>
  )
})

const createItemData = memoize(
  (
    filterOptions,
    itemType,
    storefrontDispatch,
    isLoading,
    initialSelections
  ) => ({
    filterOptions,
    itemType,
    storefrontDispatch,
    isLoading,
    initialSelections,
  })
)

function StorefrontFilterOptionsGroupItems({ filterOptions, itemType }) {
  const storefrontDispatch = useStorefrontDispatch()
  const storefrontState = useStorefrontState()
  const requestsState = useRequestsState()

  const itemData = createItemData(
    filterOptions,
    itemType,
    storefrontDispatch,
    requestsState.isFetchingNew,
    storefrontState.selections
  )

  const parentRef = wp.element.useRef()

  const rowVirtualizer = useVirtualizer({
    count: filterOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: wp.element.useCallback(() => 30, []),
  })

  return (
    <ul
      className={"wps-" + itemType}
      ref={parentRef}
      style={{
        height: `auto`,
        width: `300px`,
        overflow: "auto",
      }}
    >
      <li
        className="ListInner"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <Row
            key={virtualItem.key}
            data={itemData}
            index={virtualItem.index}
            size={virtualItem.size}
            start={virtualItem.start}
          />
        ))}
      </li>
    </ul>
  )
}

export default StorefrontFilterOptionsGroupItems
