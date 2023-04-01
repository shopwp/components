/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function ButtonSecondary({
  onClick,
  settings,
  shopState,
  isBusy = false,
  extraCSS = false,
}) {
  const secondaryButtonCSS = css`
    text-transform: capitalize;
    padding: 5px 9px;
    background: white;
    font-size: 14px;
    border: 1px solid silver;
    appearance: none;
    font-family: inherit;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  `

  return (
    <button
      onClick={onClick}
      disabled={isBusy}
      css={[secondaryButtonCSS, extraCSS]}
    >
      {isBusy ? shopState.t.l.loading : shopState.t.l.seeMore}
    </button>
  )
}

export default ButtonSecondary
