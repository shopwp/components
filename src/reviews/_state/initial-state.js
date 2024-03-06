function ProductReviewsInitialState(props) {
  const hasApiConnection =
    shopwp.general.yotpoApiKey === "" ||
    shopwp.general.yotpoApiSecretKey === "" ||
    shopwp.general.yotpoUtoken === ""
      ? false
      : true

  const initialNotice = hasApiConnection
    ? false
    : {
        type: "info",
        message: props.shopState.t.l.addApiKeys,
      }

  return {
    reviews: false,
    reviewsBottomLine: false,
    reviewsTruncated: false,
    reviewsShown: props.settings?.reviewsShown
      ? props.settings.reviewsShown
      : 10,
    reviewsShownIncrement: props.settings?.reviewsShownIncrement
      ? props.settings.reviewsShownIncrement
      : 10,
    settings: props?.settings ? props.settings : false,
    element: props?.element ? props.element : false,
    id: props?.id ? props.id : false,
    payload: props.payload ? props.payload : false,
    notice: initialNotice,
    hasApiConnection: hasApiConnection,
    products: false,
    isWritingReview: false,
  }
}

export default ProductReviewsInitialState
