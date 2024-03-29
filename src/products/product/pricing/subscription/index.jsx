/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPriceSingle from "../single"
import ProductPriceSaleNotice from "../sale-notice"

function ProductPricesSubscription({
  subscriptionInfo,
  selectedVariant,
  settings,
  shouldShowCompareAt,
}) {
  const ProductPricesSubscriptionCSS = css``

  return (
    <div
      css={ProductPricesSubscriptionCSS}
      className="swp-l-row swp-l-baseline"
    >
      {subscriptionInfo.discountPrice ? (
        <>
          {shouldShowCompareAt ? (
            <>
              <ProductPriceSaleNotice
                fontSize={settings.pricingCompareAtTypeFontSize}
                color={settings.pricingCompareAtTypeSaleTextColor}
              />
              <ProductPriceSingle
                price={subscriptionInfo.discountPrice}
                settings={settings}
              />
              <ProductPriceSingle
                price={subscriptionInfo.regularPrice}
                compareAt={true}
                settings={settings}
              />
            </>
          ) : (
            <ProductPriceSingle
              price={subscriptionInfo.discountPrice}
              settings={settings}
            />
          )}
        </>
      ) : selectedVariant.node.compareAtPrice ? (
        shouldShowCompareAt ? (
          <>
            <ProductPriceSaleNotice
              fontSize={settings.pricingCompareAtTypeFontSize}
              color={settings.pricingCompareAtTypeSaleTextColor}
            />
            <ProductPriceSingle
              price={subscriptionInfo.regularPrice}
              settings={settings}
            />
            <ProductPriceSingle
              price={selectedVariant.node.compareAtPrice.amount}
              compareAt={true}
              settings={settings}
            />
          </>
        ) : (
          <ProductPriceSingle
            price={subscriptionInfo.regularPrice}
            settings={settings}
          />
        )
      ) : (
        <ProductPriceSingle
          price={subscriptionInfo.regularPrice}
          settings={settings}
        />
      )}
    </div>
  )
}

export default ProductPricesSubscription
