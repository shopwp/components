import { useShopState } from "@shopwp/components"

function StockStatusInline({ inStock }) {
  const shopState = useShopState()

  return inStock ? (
    <p>{shopState.t.l.inStock}</p>
  ) : (
    <p>{shopState.t.l.outOfStockNotify})</p>
  )
}

export default StockStatusInline
