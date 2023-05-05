/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"
import Notice from "../../notice"

function EmptyReviews({ onToggle }) {
  const shopState = useShopState()

  const addOne = css`
    text-decoration: underline;
    transition: all ease 0.1s;
    margin-left: 5px;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  `

  return (
    <Notice status="info">
      {shopState.t.l.noReviews}
      <span onClick={onToggle} css={addOne}>
        {shopState.t.l.writeAReview}
      </span>
    </Notice>
  )
}

export default EmptyReviews
