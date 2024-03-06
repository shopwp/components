import JsxParser from "react-jsx-parser"
import ProductBuyButton from "../buy-button"
import ProductTitle from "../title"
import ProductPricing from "../pricing"
import ProductDescription from "../description"
import ProductImages from "../images"
import Reviews from "../../../reviews"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "../../../error-fallback"

function ProductCustomTemplate({ htmlTemplateData, payload, settings }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <JsxParser
        components={{
          Reviews,
          ProductBuyButton,
          ProductTitle,
          ProductPricing,
          ProductDescription,
          ProductImages,
        }}
        bindings={{
          payload: payload,
          settings: settings,
        }}
        renderInWrapper={false}
        showWarnings={true}
        jsx={htmlTemplateData}
        blacklistedTags={["script"]}
      />
    </ErrorBoundary>
  )
}

export default wp.element.memo(ProductCustomTemplate)
