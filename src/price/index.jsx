import { prettyPrice } from "Common"
import { useShopState } from "ShopState"

function Price({ price }) {
  const shopState = useShopState()

  return prettyPrice(price, shopState)
}

export default Price
