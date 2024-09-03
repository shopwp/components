import RequestsProvider from "./_state/requests/provider"
import PayloadProvider from "./_state/payload/provider"
import SettingsProvider from "./_state/settings/provider"
import ItemsProvider from "./_state/provider"
import ItemsWrapper from "./wrapper"
import Pagination from "../pagination"
import { useShopState } from "@shopwp/components"
import { updateVariablesInCSS } from "@shopwp/common"

function Items(props) {
  const shopState = useShopState()

  const { useEffect } = wp.element

  useEffect(() => {
    updateVariablesInCSS(props.componentType, props.settings, props.element)
  }, [props])

  return (
    <RequestsProvider shopState={shopState} {...props}>
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
