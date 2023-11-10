/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import PaginationLoadMore from "./load-more"
import { containerFluidCSS } from "@shopwp/common"

function PaginationControls() {
  const paginationControlsCSS = css``

  return (
    <section
      className="swp-pagination-controls wps-pagination-controls"
      css={[containerFluidCSS, paginationControlsCSS]}
    >
      <PaginationLoadMore />
    </section>
  )
}

export default PaginationControls
