import { useShopState } from "@shopwp/components"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../notice")
)

function ErrorFallback({ error = "" }) {
  const shopState = useShopState()

  return (
    <Notice status="error">
      {error.message ? error.message : shopState.t.e.unknown}
    </Notice>
  )
}

export default ErrorFallback
