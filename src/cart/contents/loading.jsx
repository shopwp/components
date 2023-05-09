/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { IconLogo } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function CartLoadingContents({ isUpdating }) {
  const shopState = useShopState()
  const { Suspense } = wp.element

  const updatingOverlayTextCSS = css`
    opacity: ${isUpdating ? 1 : 0};
    z-index: ${isUpdating ? "9999" : "-1"};
    margin-top: 0;
    font-size: 22px;
    text-align: center;
    padding: 70px 0;
    background: none;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translateY(
      ${isUpdating ? "calc(50vh - 255px)" : "calc(50vh - 230px)"}
    );
    transition: all 0.3s ease;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    svg {
      padding-left: 40%;
      height: 55px;
      position: absolute;
      top: 18px;
      text-align: center;
    }
  `

  return (
    <Suspense fallback="Loading...">
      <div css={[updatingOverlayTextCSS]}>
        <IconLogo color="#000" />

        {shopState.t.l.updatingCart}

        <Loader color="#000" center={true} />
      </div>
    </Suspense>
  )
}

export default CartLoadingContents
