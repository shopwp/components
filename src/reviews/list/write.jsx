import { useShopState } from "@shopwp/components"

function WriteReviewLink({ onToggle }) {
  const shopState = useShopState()

  return (
    <a href="#!" className="swp-btn swp-btn-write-review" onClick={onToggle}>
      {shopState.t.l.writeAReview}
    </a>
  )
}

export default WriteReviewLink
