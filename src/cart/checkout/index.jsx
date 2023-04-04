import ErrorFallback from "../../error-fallback"
import { ErrorBoundary } from "react-error-boundary"
import { useCartState } from "@shopwp/components"
import { FilterHook } from "@shopwp/common"
import CartCheckoutButton from "./button"

function CartCheckout() {
  const cartState = useCartState()

  return (
    <>
      <FilterHook name="before.cartCheckoutButton" args={[cartState]} />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CartCheckoutButton />
      </ErrorBoundary>

      <FilterHook name="after.cartCheckoutButton" args={[cartState]} />
    </>
  )
}

export default CartCheckout
