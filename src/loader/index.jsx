import LoaderSpinner from "react-loaders"
import { usePortal } from "@shopwp/hooks"

function Loader({ isLoading, dropzone }) {
  return usePortal(
    <div className="swp-loader wps-loader-wrapper">
      <LoaderSpinner
        type="ball-pulse"
        innerClassName="swp-loader-icon wps-loader"
        active={isLoading}
      />
    </div>,
    dropzone
  )
}

export default Loader
