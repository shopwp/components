import { ErrorBoundary } from "react-error-boundary"
import { useProductState, useProductDispatch } from "../_state/hooks"
import { removeProductIdPrefix } from "@shopwp/common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import ErrorFallback from "../../../error-fallback"
import BuyButtonSkeleton from "../buy-button/skeleton"

const ProductCustomTemplate = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductCustomTemplate-public' */ "../template")
)

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

const ProductTitle = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductTitle-public' */ "../title")
)

const ProductPricing = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductPricing-public' */ "../pricing")
)

const ProductDescription = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductDescription-public' */ "../description")
)

const ProductImages = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductImages-public' */ "../images")
)

const ProductBuyButton = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductBuyButton-public' */ "../buy-button")
)

const Reviews = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Reviews-public' */ "../../../reviews")
)

const ProductModal = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductModal-public' */ "../buy-button/modal")
)

function ProductWrapper({ payload }) {
  const { Suspense, useEffect } = wp.element
  const settings = useSettingsState()
  const productState = useProductState()
  const productDispatch = useProductDispatch()

  const productId = removeProductIdPrefix(
    productState.payload ? productState.payload.id : ""
  )

  useEffect(() => {
    if (payload !== productState.payload) {
      productDispatch({ type: "SET_PAYLOAD", payload: payload })
    }
  }, [payload])

  useEffect(() => {
    if (!settings.selectFirstVariant) {
      productDispatch({ type: "SET_SELECTED_VARIANT", payload: false })
    } else {
      productDispatch({
        type: "SET_SELECTED_VARIANT",
        payload: productState.payload.variants.edges[0].node,
      })
    }
  }, [settings.selectFirstVariant, productState.payload])

  return (
    <li
      itemType={
        shopwp.misc.isSingularProducts ? "" : "https://schema.org/Product"
      }
      itemScope={shopwp.misc.isSingularProducts ? false : true}
      className="swp-item wps-item swp-0 swp-l-col"
      aria-label={productState.payload.title}
      role="listitem"
      data-product-id={productState.payload ? productId : false}
      data-wpshopify-is-available-for-sale={
        productState.payload ? productState.payload.availableForSale : false
      }
      data-wpshopify-is-on-sale={productState.isOnSale}
      data-is-align-height={shopwp.general.alignHeight || settings.alignHeight}
      data-is-modal={settings.isModal}
      data-is-full-width={settings.fullWidth}
    >
      <meta itemProp="productID" content={productState.payload.id} />
      {productState.payload.vendor ? (
        <meta itemProp="brand" content={productState.payload.vendor} />
      ) : null}

      {settings.htmlTemplateData ? (
        <ProductCustomTemplate
          payload={productState.payload}
          settings={settings}
          htmlTemplateData={settings.htmlTemplateData}
        />
      ) : (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {settings.excludes &&
              settings.excludes.includes("images") ? null : (
                <ProductImages />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {settings.showReviews &&
              shopwp.misc.hasYotpo &&
              productState.payload ? (
                <Reviews
                  element={false}
                  settings={{
                    showReviews: true,
                    showCreateNew: settings.showCreateNew,
                    showRating: settings.showRating,
                    showListing: settings.showListing,
                    reviewsShown: settings.reviewsShown,
                    reviewsShownIncrement: settings.reviewsShownIncrement,
                    productId: productState.payload.id,
                    dropzoneRating: settings.dropzoneRating,
                    dropzoneProductReviews: settings.dropzoneProductReviews,
                  }}
                  payload={productState.payload}
                />
              ) : null}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {settings.excludes &&
              settings.excludes.includes("title") ? null : (
                <ProductTitle />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {(settings.excludes && settings.excludes.includes("pricing")) ||
              settings.showPricingAboveAddToCartButton ? null : (
                <ProductPricing />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {settings.excludes &&
              settings.excludes.includes("description") ? null : (
                <ProductDescription />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<BuyButtonSkeleton />}>
              {settings.excludes &&
              settings.excludes.includes("buy-button") ? null : (
                <ProductBuyButton />
              )}
            </Suspense>
          </ErrorBoundary>
        </>
      )}
      {productState.isModalOpen && productState.payload ? (
        <Suspense fallback={false}>
          <ProductModal />
        </Suspense>
      ) : null}
      {productState.notice ? (
        <Notice status="warning">{productState.notice.message}</Notice>
      ) : null}
    </li>
  )
}

export default ProductWrapper
