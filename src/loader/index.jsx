/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import LoaderSpinner from "react-loaders"
import { usePortal } from "@shopwp/hooks"

function Loader({ isLoading, dropzone, color, extraCSS, center = true }) {
  const LoaderPulseCSS = css`
    @keyframes scaleLoaderSWP {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      45% {
        transform: scale(0.1);
        opacity: 0.7;
      }
      80% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .ball-pulse > div:nth-of-type(0) {
      animation: scaleLoaderSWP 0.75s -0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div:nth-of-type(1) {
      animation: scaleLoaderSWP 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div:nth-of-type(2) {
      animation: scaleLoaderSWP 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div:nth-of-type(3) {
      animation: scaleLoaderSWP 0.75s 0s infinite
        cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div {
      background-color: ${color ? color : "#fff"} !important;
      width: 9px;
      height: 9px;
      border-radius: 100%;
      margin: 2px;
      animation-fill-mode: both;
      display: inline-block;
    }

    .loader-inner {
      line-height: 1;
    }
  `

  return usePortal(
    <div className="wps-loader-wrapper" css={[LoaderPulseCSS, extraCSS]}>
      <LoaderSpinner
        type="ball-pulse"
        color={color ? color : "#FFF"}
        innerClassName="wps-loader"
        active={isLoading}
      />
    </div>,
    dropzone
  )
}

export default Loader
