/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function WriteReviewLink({ onToggle }) {
  const shopState = useShopState()
  const WriteReviewLinkCSS = css``
  const buttonCSS = css``

  return (
    <a
      href="#!"
      className="swp-btn swp-btn-write-review"
      onClick={onToggle}
      css={[buttonCSS, WriteReviewLinkCSS]}
    >
      {shopState.t.l.writeAReview}
    </a>
  )
}

export default WriteReviewLink
