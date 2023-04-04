import { prettyPrice } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

function Price({ price }) {
  const shopState = useShopState()

  return prettyPrice(price, shopState)
}

export default Price
