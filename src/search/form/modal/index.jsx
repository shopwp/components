/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Product from "../../../products/product"
import Pagination from "../../../pagination"
import Notice from "../../../notice"
import { usePayloadState } from "../../../items/_state/payload/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function SearchModal({ searchTerm }) {
  const { useEffect } = wp.element

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
    box-sizing: border-box;
    top: 50px;
    left: 0;
    width: 100%;
    background: white;
    padding: ${searchTerm ? "30px 20px" : "0"};
    box-shadow: ${searchTerm ? "0 0 21px -13px rgb(0 0 0 / 42%)" : "none"};
    border-radius: 8px;
    border: ${searchTerm ? "1px solid #ddd" : "none"};
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
        <Notice status="info">{settings.noResultsText}</Notice>
      )}
    </div>
  ) : null
}

export default SearchModal
