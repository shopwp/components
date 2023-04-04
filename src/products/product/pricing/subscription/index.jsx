/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductPriceSingle from "../single"
import { SlideInFromRight } from "@shopwp/common"

function ProductPricesSubscription({ subscriptionInfo, selectedVariant }) {
  const ProductPricesSubscriptionCSS = css`
    display: flex;
    flex-direction: row;
  `

  return (
    <SlideInFromRight>
      <div css={ProductPricesSubscriptionCSS}>
        {subscriptionInfo.discountPrice ? (
          <>
            <ProductPriceSingle price={subscriptionInfo.discountPrice} />
            <ProductPriceSingle
              price={subscriptionInfo.regularPrice}
              compareAt={true}
            />
          </>
        ) : selectedVariant.node.compareAtPrice ? (
          <>
            <ProductPriceSingle price={subscriptionInfo.regularPrice} />
            <ProductPriceSingle
              price={selectedVariant.node.compareAtPrice.amount}
              compareAt={true}
            />
          </>
        ) : (
          <ProductPriceSingle price={subscriptionInfo.regularPrice} />
        )}
      </div>
    </SlideInFromRight>
  )
}

export default ProductPricesSubscription
