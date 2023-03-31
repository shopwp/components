import RequestsProvider from "./_state/requests/provider"
import PayloadProvider from "./_state/payload/provider"
import SettingsProvider from "./_state/settings/provider"
import ItemsProvider from "./_state/provider"
import ItemsWrapper from "./wrapper"
import Pagination from "../pagination"
import { addSkeletonLoader } from "Common"

function Items(props) {
  const { useEffect } = wp.element

  useEffect(() => {
    if (!props || !props.element) {
      return
    }
    if (!props.element.firstChild) {
      addSkeletonLoader(props.element)
    }
  }, [])

  return (
    <RequestsProvider {...props}>
      <PayloadProvider {...props}>
        <SettingsProvider {...props}>
          <ItemsProvider {...props}>
            <ItemsWrapper {...props}>
              <Pagination {...props}>{props.children}</Pagination>
            </ItemsWrapper>
          </ItemsProvider>
        </SettingsProvider>
      </PayloadProvider>
    </RequestsProvider>
  )
}

export default Items
