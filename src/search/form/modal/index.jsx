/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Product from "../../../products/product"
import Pagination from "../../../pagination"
import Notice from "../../../notice"
import { usePayloadState } from "../../../items/_state/payload/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useShopState } from "@shopwp/components"

function SearchModal({ searchTerm }) {
  const { useEffect } = wp.element
  const shopState = useShopState()
  const payload = usePayloadState()
  const settings = useSettingsState()

  let bodyEl = document.getElementsByTagName("body")[0]

  useEffect(() => {
    if (searchTerm) {
      bodyEl.classList.add("shopwp-is-searching")
    } else {
      bodyEl.classList.remove("shopwp-is-searching")
    }
  }, [searchTerm])

  const SearchModalCSS = css`
    position: absolute;
    top: 52px;
    left: 0;
    width: 100%;
    background: white;
    padding: ${searchTerm ? "30px 20px" : "0"};
    box-shadow: ${searchTerm ? "0 0 21px -13px rgb(0 0 0 / 42%)" : "none"};
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: ${searchTerm ? "1px solid #ddd" : "none"};
    border-top: 0;
    max-height: 400px;
    overflow-y: scroll;
  `

  return searchTerm && payload ? (
    <div css={SearchModalCSS}>
      {payload.length ? (
        <Pagination queryType="products" payload={payload}>
          <Product settings={settings} />
        </Pagination>
      ) : (
        <Notice status="info">{shopState.t.n.noItemsLeft}</Notice>
      )}
    </div>
  ) : null
}

export default SearchModal
