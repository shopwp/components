/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"
import { mq, buttonCSS } from "@shopwp/common"

function WriteReviewLink({ onToggle }) {
  const shopState = useShopState()
  const WriteReviewLinkCSS = css`
    align-self: initial;
    margin-left: auto;
    width: 160px;
    font-size: 16px;

    ${mq("small")} {
      margin: 0px auto 20px auto;
    }
  `

  return (
    <a href="#!" onClick={onToggle} css={[buttonCSS, WriteReviewLinkCSS]}>
      {shopState.t.l.writeAReview}
    </a>
  )
}

export default WriteReviewLink
