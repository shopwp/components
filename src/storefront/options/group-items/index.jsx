import memoize from "memoize-one"
import CheckboxItem from "../group-item-value"
import { useStorefrontDispatch, useStorefrontState } from "../../_state/hooks"
import { useRequestsState } from "../../../items/_state/requests/hooks"
import { useVirtual } from "react-virtual"

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
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${size}px`,
        transform: `translateY(${start}px)`,
      }}
    >
      <CheckboxItem
        itemType={itemType}
        itemValue={itemValue}
        storefrontDispatch={storefrontDispatch}
        isLoading={isLoading}
        initialSelections={initialSelections}
      />
    </div>
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
  const { useState } = wp.element
  const [initialSelections] = useState(storefrontState.selections)
  const requestsState = useRequestsState()

  const itemData = createItemData(
    filterOptions,
    itemType,
    storefrontDispatch,
    requestsState.isFetchingNew,
    initialSelections
  )

  const parentRef = wp.element.useRef()

  const rowVirtualizer = useVirtual({
    size: filterOptions.length,
    parentRef,
    estimateSize: wp.element.useCallback(() => 30, []),
  })

  return (
    <ul
      className={"wps-" + itemType}
      ref={parentRef}
      style={{
        height: `250px`,
        width: `300px`,
        overflow: "auto",
      }}
    >
      <div
        className="ListInner"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <Row
            key={virtualRow.index + virtualRow.end}
            data={itemData}
            index={virtualRow.index}
            size={virtualRow.size}
            start={virtualRow.start}
          />
        ))}
      </div>
    </ul>
  )
}

export default StorefrontFilterOptionsGroupItems
