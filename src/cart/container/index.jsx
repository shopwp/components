import CartHeader from "../header"
import CartFooter from "../footer"

const CartContents = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContents-public' */ "../contents")
)

function CartContainer({ settings }) {
  const { Suspense } = wp.element

  return (
    <>
      <CartHeader settings={settings} />
      <Suspense fallback={false}>
        <CartContents />
      </Suspense>
      <CartFooter />
    </>
  )
}

export default CartContainer
