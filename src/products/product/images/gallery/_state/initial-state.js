function ProductGalleryInitialState(props) {
  if (!props.payload.media || props.payload.media.edges.length === 0) {
    var featImage = false
    var featImageIsVideo = false
  } else {
    if (props.payload.media.edges[0]?.node.mediaContentType === "IMAGE") {
      var featImage = props.payload.media.edges[0].node.image
      var featImageIsVideo = false
    } else {
      var featImage = props.payload.media.edges[0].node
      var featImageIsVideo = true
    }
  }

  return {
    featImageIsVideo: featImageIsVideo,
    featImage: props.payload
      ? featImage
      : {
          originalSrc:
            shopwp.misc.pluginsDirURL + "public/imgs/placeholder.png",
          altText: "Placeholder Product Image",
        },
    featImageElement: false,
    featImagePlaceholder: {
      originalSrc: shopwp.misc.pluginsDirURL + "public/imgs/placeholder.png",
      altText: "Placeholder Product Image",
    },
  }
}

export default ProductGalleryInitialState
