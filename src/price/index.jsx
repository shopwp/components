import { prettyPrice } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

function Price({ price }) {
  const shopState = useShopState()

  return (
    <>
      <meta itemProp="price" content={prettyPrice(price, shopState)} />
      <meta
        itemProp="priceCurrency"
        content={shopState.buyerIdentity.currency}
      />
      {prettyPrice(price, shopState)}
    </>
  )
}

export default Price
