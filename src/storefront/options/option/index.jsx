import { to } from "@shopwp/common"
import isEmpty from "lodash-es/isEmpty"
import { maybeHandleApiError } from "@shopwp/api"

import StorefrontFilterOptionsGroupItems from "../group-items"

const StorefrontFilterOptionsGroup = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'StorefrontFilterOptionsGroup-public' */ "../group"
  )
)

function StorefrontFilterOptionsGroupOption({
  queryFn,
  groupType,
  heading,
  openOnLoad = false,
  filterName = false,
  noFilterGroupFoundText,
}) {
  const { useState, useEffect } = wp.element
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [error, setError] = useState(false)
  const [existingItems, setExistingItems] = useState(false)
  const [filterableValues, setFilterableValues] = useState([])

  async function onOpen(isOpen) {
    if (!isOpen) {
      return
    }

    if (existingItems) {
      setFilterableValues(existingItems)
      return
    }

    setIsLoadingItems(true)

    const [err, resp] = await to(queryFn())

    setIsLoadingItems(false)

    const errorMessage = maybeHandleApiError(err, resp)

    if (errorMessage) {
      setError(errorMessage)
      return
    }

    if (filterName) {
      var filterData = wp.hooks.applyFilters(filterName, resp.data)
    } else {
      var filterData = resp.data
    }

    setExistingItems(filterData)
    setFilterableValues(filterData)
  }

  useEffect(() => {
    if (openOnLoad) {
      onOpen(openOnLoad)
    }
  }, [])

  return (
    <StorefrontFilterOptionsGroup
      onOpen={onOpen}
      openOnLoad={openOnLoad}
      error={error}
      isLoadingItems={isLoadingItems}
      groupType={groupType}
      noFilterGroupFoundText={noFilterGroupFoundText}
      areFilterOptionsEmpty={isEmpty(filterableValues)}
      heading={heading}
      items={
        <StorefrontFilterOptionsGroupItems
          filterOptions={filterableValues}
          itemType={groupType}
        />
      }
    />
  )
}

export default StorefrontFilterOptionsGroupOption
