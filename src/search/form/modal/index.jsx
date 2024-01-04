import Product from "../../../products/product"
import Pagination from "../../../pagination"
import Notice from "../../../notice"
import { usePayloadState } from "../../../items/_state/payload/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function SearchModal({ searchTerm, setSearchTerm }) {
  const { useEffect, useRef } = wp.element

  const componentRef = useRef(null)
  const payload = usePayloadState()
  const settings = useSettingsState()

  let bodyEl = document.getElementsByTagName("body")[0]

  // Function to handle clicks outside the component
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      // Clicked outside the component, do something
      setSearchTerm("")
    }
  }

  useEffect(() => {
    if (searchTerm) {
      bodyEl.classList.add("shopwp-is-searching")
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      bodyEl.classList.remove("shopwp-is-searching")
      document.removeEventListener("mousedown", handleClickOutside)
    }

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchTerm])

  return (
    <div
      ref={componentRef}
      data-has-search-term={!!searchTerm}
      className="swp-search-modal"
    >
      {payload.length ? (
        <Pagination queryType="products" payload={payload}>
          <Product settings={settings} />
        </Pagination>
      ) : (
        <Notice status="info">{settings.noResultsText}</Notice>
      )}
    </div>
  )
}

export default SearchModal
