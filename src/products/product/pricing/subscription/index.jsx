/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPriceSingle from "../single"
import { SlideInFromRight } from "@shopwp/common"

function ProductPricesSubscription({
  subscriptionInfo,
  selectedVariant,
  settings,
}) {
  const ProductPricesSubscriptionCSS = css`
    display: flex;
    flex-direction: row;
  `

  return (
    <SlideInFromRight>
      <div css={ProductPricesSubscriptionCSS}>
        {subscriptionInfo.discountPrice ? (
          <>
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
        ) : selectedVariant.node.compareAtPrice ? (
          <>
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
        )}
      </div>
    </SlideInFromRight>
  )
}

export default ProductPricesSubscription
