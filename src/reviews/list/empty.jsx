import { useShopState } from "@shopwp/components"
import Notice from "../../notice"

function EmptyReviews({ onToggle }) {
  const shopState = useShopState()

  return (
    <Notice status="info">
      {shopState.t.l.noReviews}
      <span onClick={onToggle} className="swp-empty-review">
        {shopState.t.l.writeAReview}
      </span>
    </Notice>
  )
}

export default EmptyReviews
