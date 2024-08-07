const defaults = {
  cart: {
    icon: false,
    type: "inline",
    showCounter: true,
    dataType: false,
    iconColor: "#ffffff",
    inlineIconColor: "#000",
    backgroundColor: "#000000",
    counterBackgroundColor: "#6ae06a",
    counterTextColor: "#ffffff",
    showInventoryLevels: true,
    leftInStockThreshold: 10,
    leftInStockText: "Hurry, we're almost out of this one!",
    cartTitle: "Shopping cart",
    checkoutText: "Begin checkout",
    updatingText: "Updating cart",
    checkoutFailedMessage:
      "Unable to checkout. Please reload the page and try again.",
    lineitemRemoveText: "Remove",
    lineitemSaleLabelText: "Sale!",
    lineitemsDisableLink: false,
    lineitemsLinkTarget: "_self",
    lineitemsMaxQuantity: false,
    lineitemsMinQuantity: 1,
    lineitemsQuantityStep: false,
    notesLabel: "Checkout notes",
    notesUpdateFrequency: 450,
    notesPlaceholder: "asdasdasd",
    emptyCartText: "Your cart is empty",
    subtotalLabelText: "Subtotal:",
    showCartCloseIcon: true,
    showCartTitle: true,
    maxQuantity: false,
    language: "en",
    country: "US",
    currency: "USD",
  },
  collections: {
    query: "",
    sortBy: "collection_default",
    reverse: false,
    pageSize: 10,
    product: false,
    productId: false,
    postId: false,
    availableForSale: "any",
    productType: false,
    tag: false,
    collection: false,
    title: false,
    titleColor: "#111",
    titleTypeFontFamily: false,
    titleTypeFontSize: false,
    titleTypeFontWeight: false,
    titleTypeTextTransform: false,
    titleTypeFontStyle: false,
    titleTypeTextDecoration: false,
    titleTypeLineHeight: false,
    titleTypeLetterSpacing: false,
    descriptionLength: false,
    descriptionColor: "#111",
    descriptionTypeFontFamily: false,
    descriptionTypeFontSize: false,
    descriptionTypeFontWeight: false,
    descriptionTypeTextTransform: false,
    descriptionTypeFontStyle: false,
    descriptionTypeTextDecoration: false,
    descriptionTypeLineHeight: false,
    descriptionTypeLetterSpacing: false,
    variantsPrice: false,
    vendor: false,
    postMeta: false,
    connective: "OR",
    limit: false,
    random: false,
    excludes: ["description"],
    itemsPerRow: 3,
    gridColumnGap: "20px",
    noResultsText: "No products left to show",
    alignHeight: false,
    pagination: true,
    dropzonePageSize: false,
    dropzoneLoadMore: false,
    dropzoneProductBuyButton: false,
    dropzoneProductTitle: false,
    dropzoneProductDescription: false,
    dropzoneProductPricing: false,
    dropzoneProductGallery: false,
    skipInitialRender: false,
    queryType: "collectionProducts",
    infiniteScroll: false,
    infiniteScrollOffset: -200,
    isSingleComponent: false,
    isSingular: false,
    linkTo: "wordpress",
    linkTarget: "_self",
    linkWithBuyButton: false,
    directCheckout: false,
    htmlTemplate: false,
    type: "products",
    fullWidth: false,
    keepCommas: false,
    showPriceUnderVariantButton: false,
    addToCartButtonText: false,
    addToCartButtonTextColor: false,
    addToCartButtonColor: "#415aff",
    addToCartButtonTypeFontFamily: false,
    addToCartButtonTypeFontSize: false,
    addToCartButtonTypeFontWeight: false,
    addToCartButtonTypeTextTransform: false,
    addToCartButtonTypeFontStyle: false,
    addToCartButtonTypeTextDecoration: false,
    addToCartButtonTypeLineHeight: false,
    addToCartButtonTypeLetterSpacing: false,
    variantDropdownButtonColor: "#000000",
    variantLabelTextColor: "#FFFFFF",
    variantDropdownTypeFontFamily: false,
    variantDropdownTypeFontSize: false,
    variantDropdownTypeFontWeight: false,
    variantDropdownTypeTextTransform: false,
    variantDropdownTypeFontStyle: false,
    variantDropdownTypeTextDecoration: false,
    variantDropdownTypeLineHeight: false,
    variantDropdownTypeLetterSpacing: false,
    variantStyle: "buttons",
    hideQuantity: false,
    minQuantity: false,
    maxQuantity: false,
    pricingTypeFontFamily: false,
    pricingTypeFontSize: false,
    pricingTypeFontWeight: false,
    pricingTypeTextTransform: false,
    pricingTypeFontStyle: false,
    pricingTypeTextDecoration: false,
    pricingTypeLineHeight: false,
    pricingTypeLetterSpacing: false,
    pricingColor: false,
    showPriceRange: true,
    showCompareAt: false,
    showFeaturedOnly: false,
    showZoom: false,
    imagesSizingToggle: true,
    imagesSizingWidth: 400,
    imagesSizingHeight: 400,
    imagesSizingCrop: "center",
    imagesSizingScale: 0,
    imagesAlign: "left",
    imagesShowNextOnHover: false,
    thumbnailImagesSizingToggle: true,
    thumbnailImagesSizingWidth: 70,
    thumbnailImagesSizingHeight: 70,
    thumbnailImagesSizingCrop: "center",
    thumbnailImagesSizingScale: 0,
    showImagesCarousel: false,
    carousel: false,
    carouselDots: true,
    carouselInfinite: true,
    carouselAutoplay: false,
    carouselAutoplaySpeed: 3000,
    carouselSpeed: 500,
    carouselSlidesToShow: 3,
    carouselSlidesToScroll: 3,
    carouselPrevArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-left' class='svg-inline--fa fa-angle-left fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z'%3E%3C/path%3E%3C/svg%3E",
    carouselNextArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-right' class='svg-inline--fa fa-angle-right fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z'%3E%3C/path%3E%3C/svg%3E",
    subscriptions: true,
    subscriptionsSelectOnLoad: false,
    subscriptionsDetailsText:
      "Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime.",
    subscriptionsDetailsHeading: "How subscriptions work:",
    showOutOfStockVariants: false,
    leftInStockThreshold: 10,
    showInventoryLevels: true,
    cacheTemplates: false,
    containerWidth: "1300px",
    mobileColumns: 1,
    selectFirstVariant: false,
    resetVariantsAfterAdding: true,
    openCartAfterAdding: true,
    clearSelectionsText: "Clear selections",
    quantityStep: false,
    colorSwatchNames: ["color"],
    imageZoomOptions: {
      inlinePane: false,
      inlineOffsetX: 0,
      inlineOffsetY: 0,
      touchDelay: 100,
    },
    showSaleNotice: true,
    showOutOfStockNotice: true,
    imagePlaceholder:
      "/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png",
    titleClassName: "wps-products-title",
    noticeUnavailableText: "Out of stock",
    outOfStockNoticeText:
      "Out of stock. Please try selecting a different variant combination.",
    variantNotAvailableText:
      "Sorry, this variant is not available. Please try a different combination.",
    saleLabelText: "Sale!",
    soldOutImageLabelText: "Sold out",
    collectionsQuery: "*",
    collectionsSortBy: "TITLE",
    collectionsReverse: false,
    collectionsPageSize: 10,
    collectionsSingle: false,
    collectionsCollectionType: false,
    collectionsImagesSizingToggle: 0,
    collectionsCollectionId: false,
    collectionsPostId: false,
    collectionsConnective: "OR",
    collectionsTitle: false,
    collectionsCollection: false,
    collectionsItemsPerRow: 3,
    collectionsLimit: false,
    collectionsPostMeta: false,
    collectionsExcludes: ["products"],
    collectionsPagination: true,
    collectionsDropzonePageSize: false,
    collectionsDropzoneLoadMore: false,
    collectionsSkipInitialRender: false,
    collectionsDropzoneCollectionTitle: false,
    collectionsDropzoneCollectionImage: false,
    collectionsDropzoneCollectionDescription: false,
    collectionsDropzoneCollectionProducts: false,
    collectionsInfiniteScroll: false,
    collectionsInfiniteScrollOffset: -200,
    collectionsQueryType: "collections",
    collectionsIsSingular: false,
    collectionsLinkTo: "wordpress",
    collectionsLinkTarget: "_self",
    collectionsNoResultsText: "No collections left to show",
    collectionsType: "collection",
    collectionsSorting: false,
  },
  products: {
    query: "*",
    sortBy: "title",
    reverse: false,
    pageSize: 8,
    product: false,
    productId: false,
    postId: false,
    availableForSale: "any",
    productType: false,
    tag: false,
    collection: false,
    title: false,
    titleColor: "#111",
    titleTypeFontFamily: false,
    titleTypeFontSize: false,
    titleTypeFontWeight: false,
    titleTypeTextTransform: false,
    titleTypeFontStyle: false,
    titleTypeTextDecoration: false,
    titleTypeLineHeight: false,
    titleTypeLetterSpacing: false,
    descriptionLength: false,
    descriptionColor: "#111",
    descriptionTypeFontFamily: false,
    descriptionTypeFontSize: false,
    descriptionTypeFontWeight: false,
    descriptionTypeTextTransform: false,
    descriptionTypeFontStyle: false,
    descriptionTypeTextDecoration: false,
    descriptionTypeLineHeight: false,
    descriptionTypeLetterSpacing: false,
    variantsPrice: false,
    vendor: false,
    postMeta: false,
    connective: "OR",
    limit: false,
    random: false,
    excludes: ["description"],
    itemsPerRow: 3,
    gridColumnGap: "20px",
    noResultsText: "No products left to show",
    alignHeight: false,
    pagination: true,
    dropzonePageSize: false,
    dropzoneLoadMore: false,
    dropzoneProductBuyButton: false,
    dropzoneProductTitle: false,
    dropzoneProductDescription: false,
    dropzoneProductPricing: false,
    dropzoneProductGallery: false,
    skipInitialRender: false,
    queryType: "products",
    infiniteScroll: false,
    infiniteScrollOffset: -200,
    isSingleComponent: false,
    isSingular: false,
    linkTo: "wordpress",
    linkTarget: "_self",
    linkWithBuyButton: false,
    directCheckout: false,
    htmlTemplate: false,
    type: "products",
    fullWidth: false,
    keepCommas: false,
    showPriceUnderVariantButton: false,
    addToCartButtonText: false,
    addToCartButtonTextColor: false,
    addToCartButtonColor: "#415aff",
    addToCartButtonTypeFontFamily: false,
    addToCartButtonTypeFontSize: false,
    addToCartButtonTypeFontWeight: false,
    addToCartButtonTypeTextTransform: false,
    addToCartButtonTypeFontStyle: false,
    addToCartButtonTypeTextDecoration: false,
    addToCartButtonTypeLineHeight: false,
    addToCartButtonTypeLetterSpacing: false,
    variantDropdownButtonColor: "#000000",
    variantLabelTextColor: "#FFFFFF",
    variantDropdownTypeFontFamily: false,
    variantDropdownTypeFontSize: false,
    variantDropdownTypeFontWeight: false,
    variantDropdownTypeTextTransform: false,
    variantDropdownTypeFontStyle: false,
    variantDropdownTypeTextDecoration: false,
    variantDropdownTypeLineHeight: false,
    variantDropdownTypeLetterSpacing: false,
    variantStyle: "buttons",
    hideQuantity: false,
    minQuantity: false,
    maxQuantity: false,
    pricingTypeFontFamily: false,
    pricingTypeFontSize: false,
    pricingTypeFontWeight: false,
    pricingTypeTextTransform: false,
    pricingTypeFontStyle: false,
    pricingTypeTextDecoration: false,
    pricingTypeLineHeight: false,
    pricingTypeLetterSpacing: false,
    pricingColor: false,
    showPriceRange: true,
    showCompareAt: false,
    showFeaturedOnly: false,
    showZoom: false,
    imagesSizingToggle: true,
    imagesSizingWidth: 400,
    imagesSizingHeight: 400,
    imagesSizingCrop: "center",
    imagesSizingScale: 0,
    imagesAlign: "left",
    imagesShowNextOnHover: false,
    thumbnailImagesSizingToggle: true,
    thumbnailImagesSizingWidth: 70,
    thumbnailImagesSizingHeight: 70,
    thumbnailImagesSizingCrop: "center",
    thumbnailImagesSizingScale: 0,
    showImagesCarousel: false,
    carousel: false,
    carouselDots: true,
    carouselInfinite: true,
    carouselSpeed: 500,
    carouselSlidesToShow: 3,
    carouselSlidesToScroll: 3,
    carouselPrevArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-left' class='svg-inline--fa fa-angle-left fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z'%3E%3C/path%3E%3C/svg%3E",
    carouselNextArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-right' class='svg-inline--fa fa-angle-right fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z'%3E%3C/path%3E%3C/svg%3E",
    subscriptions: true,
    subscriptionsSelectOnLoad: false,
    subscriptionsDetailsText:
      "Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime.",
    subscriptionsDetailsHeading: "How subscriptions work:",
    showOutOfStockVariants: false,
    leftInStockThreshold: 10,
    showInventoryLevels: true,
    cacheTemplates: false,
    containerWidth: "1300px",
    mobileColumns: 1,
    selectFirstVariant: false,
    resetVariantsAfterAdding: true,
    openCartAfterAdding: true,
    clearSelectionsText: "Clear selections",
    quantityStep: false,
    colorSwatchNames: ["color"],
    imageZoomOptions: {
      inlinePane: false,
      inlineOffsetX: 0,
      inlineOffsetY: 0,
      touchDelay: 100,
    },
    showSaleNotice: true,
    showOutOfStockNotice: true,
    imagePlaceholder:
      "/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png",
    titleClassName: "wps-products-title",
    noticeUnavailableText: "Out of stock",
    outOfStockNoticeText:
      "Out of stock. Please try selecting a different variant combination.",
    variantNotAvailableText:
      "Sorry, this variant is not available. Please try a different combination.",
    saleLabelText: "Sale!",
    soldOutImageLabelText: "Sold out",
    withSorting: false,
  },
  search: {
    query: "*",
    sortBy: "title",
    reverse: false,
    pageSize: 8,
    product: false,
    productId: false,
    postId: false,
    availableForSale: "any",
    productType: false,
    tag: false,
    collection: false,
    title: false,
    titleColor: "#111",
    titleTypeFontFamily: false,
    titleTypeFontSize: "16px",
    titleTypeFontWeight: false,
    titleTypeTextTransform: false,
    titleTypeFontStyle: false,
    titleTypeTextDecoration: false,
    titleTypeLineHeight: false,
    titleTypeLetterSpacing: false,
    descriptionLength: false,
    descriptionColor: "#111",
    descriptionTypeFontFamily: false,
    descriptionTypeFontSize: false,
    descriptionTypeFontWeight: false,
    descriptionTypeTextTransform: false,
    descriptionTypeFontStyle: false,
    descriptionTypeTextDecoration: false,
    descriptionTypeLineHeight: false,
    descriptionTypeLetterSpacing: false,
    variantsPrice: false,
    vendor: false,
    postMeta: false,
    connective: "OR",
    limit: false,
    random: false,
    excludes: ["description", "buy-button"],
    itemsPerRow: 5,
    gridColumnGap: "20px",
    noResultsText: "No search results found",
    alignHeight: false,
    pagination: false,
    dropzonePageSize: false,
    dropzoneLoadMore: false,
    dropzoneProductBuyButton: false,
    dropzoneProductTitle: false,
    dropzoneProductDescription: false,
    dropzoneProductPricing: false,
    dropzoneProductGallery: false,
    skipInitialRender: true,
    queryType: "products",
    infiniteScroll: false,
    infiniteScrollOffset: -200,
    isSingleComponent: false,
    isSingular: false,
    linkTo: "wordpress",
    linkTarget: "_self",
    linkWithBuyButton: false,
    directCheckout: false,
    htmlTemplate: false,
    type: "search",
    fullWidth: false,
    keepCommas: false,
    showPriceUnderVariantButton: false,
    addToCartButtonText: false,
    addToCartButtonTextColor: false,
    addToCartButtonColor: "#415aff",
    addToCartButtonTypeFontFamily: false,
    addToCartButtonTypeFontSize: false,
    addToCartButtonTypeFontWeight: false,
    addToCartButtonTypeTextTransform: false,
    addToCartButtonTypeFontStyle: false,
    addToCartButtonTypeTextDecoration: false,
    addToCartButtonTypeLineHeight: false,
    addToCartButtonTypeLetterSpacing: false,
    variantDropdownButtonColor: "#000000",
    variantLabelTextColor: "#FFFFFF",
    variantDropdownTypeFontFamily: false,
    variantDropdownTypeFontSize: false,
    variantDropdownTypeFontWeight: false,
    variantDropdownTypeTextTransform: false,
    variantDropdownTypeFontStyle: false,
    variantDropdownTypeTextDecoration: false,
    variantDropdownTypeLineHeight: false,
    variantDropdownTypeLetterSpacing: false,
    variantStyle: "buttons",
    hideQuantity: false,
    minQuantity: false,
    maxQuantity: false,
    pricingTypeFontFamily: false,
    pricingTypeFontSize: "16px",
    pricingTypeFontWeight: false,
    pricingTypeTextTransform: false,
    pricingTypeFontStyle: false,
    pricingTypeTextDecoration: false,
    pricingTypeLineHeight: false,
    pricingTypeLetterSpacing: false,
    pricingColor: false,
    showPriceRange: false,
    showCompareAt: false,
    showFeaturedOnly: true,
    showZoom: false,
    imagesSizingToggle: true,
    imagesSizingWidth: 400,
    imagesSizingHeight: 400,
    imagesSizingCrop: "center",
    imagesSizingScale: 0,
    imagesAlign: "left",
    imagesShowNextOnHover: false,
    thumbnailImagesSizingToggle: true,
    thumbnailImagesSizingWidth: 70,
    thumbnailImagesSizingHeight: 70,
    thumbnailImagesSizingCrop: "center",
    thumbnailImagesSizingScale: 0,
    showImagesCarousel: false,
    carousel: false,
    carouselDots: true,
    carouselInfinite: true,
    carouselSpeed: 500,
    carouselSlidesToShow: 3,
    carouselSlidesToScroll: 3,
    carouselPrevArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-left' class='svg-inline--fa fa-angle-left fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z'%3E%3C/path%3E%3C/svg%3E",
    carouselNextArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-right' class='svg-inline--fa fa-angle-right fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z'%3E%3C/path%3E%3C/svg%3E",
    subscriptions: true,
    subscriptionsSelectOnLoad: false,
    subscriptionsDetailsText:
      "Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime.",
    subscriptionsDetailsHeading: "How subscriptions work:",
    showOutOfStockVariants: false,
    leftInStockThreshold: 10,
    showInventoryLevels: true,
    cacheTemplates: false,
    containerWidth: "1300px",
    mobileColumns: 1,
    selectFirstVariant: false,
    resetVariantsAfterAdding: true,
    openCartAfterAdding: true,
    clearSelectionsText: "Clear selections",
    quantityStep: false,
    colorSwatchNames: ["color"],
    imageZoomOptions: {
      inlinePane: false,
      inlineOffsetX: 0,
      inlineOffsetY: 0,
      touchDelay: 100,
    },
    showSaleNotice: true,
    showOutOfStockNotice: true,
    imagePlaceholder:
      "/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png",
    titleClassName: "wps-products-title",
    noticeUnavailableText: "Out of stock",
    outOfStockNoticeText:
      "Out of stock. Please try selecting a different variant combination.",
    variantNotAvailableText:
      "Sorry, this variant is not available. Please try a different combination.",
    saleLabelText: "Sale!",
    soldOutImageLabelText: "Sold out",
    dropzoneForm: false,
    dropzonePayload: false,
    dropzoneLoader: false,
    dropzoneOptions: false,
    dropzoneSorting: false,
    dropzoneHeading: false,
    paginationHideInitial: true,
    showPagination: false,
    searchBy: "title",
    searchPlaceholderText: "Search the store",
  },
  storefront: {
    query: "*",
    withSorting: true,
    sortBy: "TITLE",
    reverse: false,
    pageSize: 10,
    product: false,
    productId: false,
    postId: false,
    availableForSale: "any",
    productType: false,
    tag: false,
    collection: false,
    title: false,
    titleColor: "#111",
    titleTypeFontFamily: false,
    titleTypeFontSize: false,
    titleTypeFontWeight: false,
    titleTypeTextTransform: false,
    titleTypeFontStyle: false,
    titleTypeTextDecoration: false,
    titleTypeLineHeight: false,
    titleTypeLetterSpacing: false,
    descriptionLength: false,
    descriptionColor: "#111",
    descriptionTypeFontFamily: false,
    descriptionTypeFontSize: false,
    descriptionTypeFontWeight: false,
    descriptionTypeTextTransform: false,
    descriptionTypeFontStyle: false,
    descriptionTypeTextDecoration: false,
    descriptionTypeLineHeight: false,
    descriptionTypeLetterSpacing: false,
    variantsPrice: false,
    vendor: false,
    postMeta: false,
    connective: "OR",
    limit: false,
    random: false,
    excludes: ["description"],
    itemsPerRow: 3,
    gridColumnGap: "20px",
    noResultsText: "No results found",
    alignHeight: false,
    pagination: true,
    dropzonePageSize: "#shopwp-storefront-page-size",
    dropzoneLoadMore: true,
    dropzoneProductBuyButton: false,
    dropzoneProductTitle: false,
    dropzoneProductDescription: false,
    dropzoneProductPricing: false,
    dropzoneProductGallery: false,
    skipInitialRender: false,
    queryType: "products",
    infiniteScroll: false,
    infiniteScrollOffset: -200,
    isSingleComponent: false,
    isSingular: false,
    linkTo: "wordpress",
    linkTarget: "_self",
    linkWithBuyButton: false,
    directCheckout: false,
    htmlTemplate: false,
    type: "storefront",
    fullWidth: false,
    keepCommas: false,
    showPriceUnderVariantButton: false,
    addToCartButtonText: false,
    addToCartButtonTextColor: false,
    addToCartButtonColor: "#415aff",
    addToCartButtonTypeFontFamily: false,
    addToCartButtonTypeFontSize: false,
    addToCartButtonTypeFontWeight: false,
    addToCartButtonTypeTextTransform: false,
    addToCartButtonTypeFontStyle: false,
    addToCartButtonTypeTextDecoration: false,
    addToCartButtonTypeLineHeight: false,
    addToCartButtonTypeLetterSpacing: false,
    variantDropdownButtonColor: "#000000",
    variantLabelTextColor: "#FFFFFF",
    variantDropdownTypeFontFamily: false,
    variantDropdownTypeFontSize: false,
    variantDropdownTypeFontWeight: false,
    variantDropdownTypeTextTransform: false,
    variantDropdownTypeFontStyle: false,
    variantDropdownTypeTextDecoration: false,
    variantDropdownTypeLineHeight: false,
    variantDropdownTypeLetterSpacing: false,
    variantStyle: "buttons",
    hideQuantity: false,
    minQuantity: false,
    maxQuantity: false,
    pricingTypeFontFamily: false,
    pricingTypeFontSize: false,
    pricingTypeFontWeight: false,
    pricingTypeTextTransform: false,
    pricingTypeFontStyle: false,
    pricingTypeTextDecoration: false,
    pricingTypeLineHeight: false,
    pricingTypeLetterSpacing: false,
    pricingColor: false,
    showPriceRange: true,
    showCompareAt: false,
    showFeaturedOnly: false,
    showZoom: false,
    imagesSizingToggle: true,
    imagesSizingWidth: 400,
    imagesSizingHeight: 400,
    imagesSizingCrop: "center",
    imagesSizingScale: 0,
    imagesAlign: "left",
    imagesShowNextOnHover: false,
    thumbnailImagesSizingToggle: true,
    thumbnailImagesSizingWidth: 70,
    thumbnailImagesSizingHeight: 70,
    thumbnailImagesSizingCrop: "center",
    thumbnailImagesSizingScale: 0,
    showImagesCarousel: false,
    carousel: false,
    carouselDots: true,
    carouselInfinite: true,
    carouselSpeed: 500,
    carouselSlidesToShow: 3,
    carouselSlidesToScroll: 3,
    carouselPrevArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-left' class='svg-inline--fa fa-angle-left fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z'%3E%3C/path%3E%3C/svg%3E",
    carouselNextArrow:
      "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-right' class='svg-inline--fa fa-angle-right fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z'%3E%3C/path%3E%3C/svg%3E",
    subscriptions: true,
    subscriptionsSelectOnLoad: false,
    subscriptionsDetailsText:
      "Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime.",
    subscriptionsDetailsHeading: "How subscriptions work:",
    showOutOfStockVariants: false,
    leftInStockThreshold: 10,
    showInventoryLevels: true,
    cacheTemplates: false,
    containerWidth: "1300px",
    mobileColumns: 1,
    selectFirstVariant: false,
    resetVariantsAfterAdding: true,
    openCartAfterAdding: true,
    clearSelectionsText: "Clear selections",
    quantityStep: false,
    colorSwatchNames: ["color"],
    imageZoomOptions: {
      inlinePane: false,
      inlineOffsetX: 0,
      inlineOffsetY: 0,
      touchDelay: 100,
    },
    showSaleNotice: true,
    showOutOfStockNotice: true,
    imagePlaceholder:
      "/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png",
    titleClassName: "wps-products-title",
    noticeUnavailableText: "Out of stock",
    outOfStockNoticeText:
      "Out of stock. Please try selecting a different variant combination.",
    variantNotAvailableText:
      "Sorry, this variant is not available. Please try a different combination.",
    saleLabelText: "Sale!",
    soldOutImageLabelText: "Sold out",
    showTags: true,
    showVendors: true,
    showTypes: true,
    showCollections: true,
    showPrice: true,
    showSelections: true,
    showSorting: true,
    showPagination: true,
    showOptionsHeading: true,
    dropzonePayload: "#shopwp-storefront-payload",
    dropzoneOptions: "#shopwp-storefront-options",
    dropzoneSelections: "#shopwp-storefront-selections",
    dropzoneSorting: "#shopwp-storefront-sort",
    dropzoneHeading: false,
    dropzoneLoader: false,
    dropzoneNotices: false,
    price: false,
    filterOptionOpenOnLoad: false,
    sortingOptionsCollections: [
      {
        label: "Title (A-Z)",
        value: "TITLE",
      },
      {
        label: "Title (Z-A)",
        value: "TITLE-REVERSE",
      },
      {
        label: "Price (Low to high)",
        value: "PRICE",
      },
      {
        label: "Price (high to low)",
        value: "PRICE-REVERSE",
      },
      {
        label: "Best Selling",
        value: "BEST_SELLING",
      },
      {
        label: "Recently Added",
        value: "CREATED",
      },
      {
        label: "Collection default",
        value: "COLLECTION_DEFAULT",
      },
      {
        label: "Manual",
        value: "MANUAL",
      },
    ],
    sortingOptionsProducts: [
      {
        label: "Title (A-Z)",
        value: "TITLE",
      },
      {
        label: "Title (Z-A)",
        value: "TITLE-REVERSE",
      },
      {
        label: "Price (Low to high)",
        value: "PRICE",
      },
      {
        label: "Price (High to low)",
        value: "PRICE-REVERSE",
      },
      {
        label: "Best Selling",
        value: "BEST_SELLING",
      },
      {
        label: "Recently Added",
        value: "CREATED_AT",
      },
    ],
    sortingOptionsPageSize: [
      {
        label: "10",
        value: 10,
      },
      {
        label: "25",
        value: 25,
      },
      {
        label: "50",
        value: 50,
      },
      {
        label: "100",
        value: 100,
      },
    ],
    filterablePriceValues: [
      "$0.00 - $15.00",
      "$15.00 - $25.00",
      "$25.00 - $50.00",
      "$50.00 - $100.00",
      "$100.00 +",
    ],

    noFilterGroupFoundText: "No items found",
  },
}

export default defaults
