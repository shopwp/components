import { findLastItem } from "@shopwp/common"

function CollectionInitialState(props) {
  props.settings.collection = props.payload.title
  props.settings.queryType = "collectionProducts"
  props.settings.collectionsQueryType = "collections"

  if (props.payload.products) {
    var lastProduct = findLastItem(props.payload.products)

    if (lastProduct) {
      var cursor = lastProduct.cursor
    } else {
      var cursor = false
    }
  } else {
    var cursor = false
  }

  /*
  
  Only needed when displaying products on a CDP created via layout builder
  
  */
  function getProductsSettingsFromComment() {
    var element = document.querySelector(".wp-block-column")

    if (!element) {
      return false
    }

    var foundComment = false

    for (var i = 0; i < element.childNodes.length; i++) {
      if (element.childNodes[i].nodeType == 8) {
        if (element.childNodes[i].data.includes("wp:shopwp/products")) {
          foundComment = element.childNodes[i].data
          break
        }
      }
    }

    if (foundComment) {
      var splitOne = foundComment.split('","clientId')

      if (splitOne.length) {
        var splitTwo = splitOne[0].split('"')

        if (splitTwo.length) {
          var finallyFound = splitTwo[splitTwo.length - 1]

          return JSON.parse(decodeURI(atob(finallyFound)))
        }
      }
    }

    return foundComment
  }

  var productSettings = getProductsSettingsFromComment()

  if (productSettings) {
    var finalProductSettings = {
      ...shopwp.products,
      ...productSettings,
    }
  } else {
    var finalProductSettings = props.settings
  }

  return {
    id: props.payload.id,
    settings: props.settings,
    payload: props.payload,
    hasNextPage: false,
    shouldReplace: false,
    productsHasNextPage: props.payload.products
      ? props.payload.products.pageInfo.hasNextPage
      : false,
    products: props.payload.products ? props.payload.products.edges : [],
    productsSettings: finalProductSettings,
    cursor: cursor,
    notice: false,
    isFetchingNew: false,
    isLoading: false,
    element: false,
    selectedVariant: false,
  }
}

export default CollectionInitialState
