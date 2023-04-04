/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import PaginationLoadMore from "./load-more"
import { containerFluidCSS } from "@shopwp/common"

function PaginationControls() {
  const paginationControlsCSS = css`
    margin-top: 60px;
    margin-bottom: 60px;
    text-align: center;
    display: block;
  `
  return (
    <section
      className="wps-pagination-controls"
      css={[containerFluidCSS, paginationControlsCSS]}
    >
      <PaginationLoadMore />
    </section>
  )
}

export default PaginationControls
