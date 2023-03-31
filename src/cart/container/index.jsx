import CartHeader from "../header"
import CartFooter from "../footer"

const CartContents = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContents-public' */ "../contents")
)

function CartContainer({ settings, isCartOpen }) {
  const { Suspense } = wp.element

  return (
    <>
      <CartHeader settings={settings} />
      <Suspense fallback={false}>
        {isCartOpen ? <CartContents /> : null}
      </Suspense>
      <CartFooter />
    </>
  )
}

export default CartContainer
