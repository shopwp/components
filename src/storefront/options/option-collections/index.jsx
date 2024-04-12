/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import isEmpty from "lodash-es/isEmpty"
import union from "lodash-es/union"
import { fetchCollections, maybeHandleApiError } from "@shopwp/api"
import { to, shouldOpenOnLoad } from "@shopwp/common"
import { ButtonSecondary, useShopState } from "@shopwp/components"

import StorefrontFilterOptionsGroupItems from "../group-items"
import StorefrontFilterOptionsGroup from "../group"

function OptionCollections({ settings }) {
  const { useState, useEffect } = wp.element
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [error, setError] = useState(false)
  const [existingCollections, setExistingCollections] = useState([])
  const [itemsRaw, setItemsRaw] = useState([])
  const [filterableValues, setFilterableValues] = useState([])
  const shouldOpen = shouldOpenOnLoad(settings, "collections")
  const shopState = useShopState()

  function createFilterableValues(resp) {
    return resp.edges.map((collection) => {
      return { label: collection.node.title, id: collection.node.id }
    })
  }

  async function grabCollections(cursor = false) {
    setIsLoadingItems(true)

    var params = {
      query: "*",
      sortKey: "TITLE",
      first: wp.hooks.applyFilters(
        "storefront.collectionsToFetch",
        shopwp.general.numPosts
      ),
      reverse: false,
    }

    if (cursor) {
      params["cursor"] = cursor
    }

    const [err, resp] = await to(fetchCollections(params, shopState))

    setIsLoadingItems(false)

    var errorMessage = maybeHandleApiError(err, resp)

    if (errorMessage) {
      setError(errorMessage)
      return
    }

    if (resp) {
      setItemsRaw(resp.edges)

      if (resp.pageInfo.hasNextPage) {
        setHasNextPage(true)
      } else {
        setHasNextPage(false)
      }

      const finalCollections = wp.hooks.applyFilters(
        "storefront.availableCollections",
        union(existingCollections.concat(createFilterableValues(resp)))
      )

      setFilterableValues(finalCollections)
      setExistingCollections(finalCollections)
    }
  }

  function onOpen(isOpen) {
    if (!isOpen) {
      return
    }

    if (existingCollections.length) {
      setFilterableValues(existingCollections)
      return
    }

    grabCollections()
  }

  async function onLoadMore() {
    var lastItem = itemsRaw[itemsRaw.length - 1]

    if (lastItem && lastItem.hasOwnProperty("cursor")) {
      grabCollections(lastItem.cursor)
    }
  }

  useEffect(() => {
    onOpen(true)
  }, [])

  return (
    <StorefrontFilterOptionsGroup
      error={error}
      onOpen={onOpen}
      openOnLoad={shouldOpen}
      isLoadingItems={isLoadingItems}
      groupType="collections"
      areFilterOptionsEmpty={isEmpty(filterableValues)}
      noFilterGroupFoundText={shopState.t.n.noItemsLeft}
      heading={settings.collectionsHeading}
      items={
        <>
          <StorefrontFilterOptionsGroupItems
            filterOptions={filterableValues}
            isBusy={isLoadingItems}
            itemType="collections"
          />
          {hasNextPage ? (
            <ButtonSecondary
              shopState={shopState}
              isBusy={isLoadingItems}
              onClick={onLoadMore}
            />
          ) : null}
        </>
      }
    />
  )
}

export default OptionCollections
