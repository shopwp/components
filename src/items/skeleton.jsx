function TitleSkeleton() {
  return (
    <div className="shopwp-skeleton-row">
      <div className="shopwp-col shopwp-skeleton-product">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-title"></div>
      </div>
    </div>
  )
}

function PricingSkeleton() {
  return (
    <div className="shopwp-skeleton-row">
      <div className="shopwp-col shopwp-skeleton-product">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-price"></div>
      </div>
    </div>
  )
}

function DescriptionSkeleton() {
  return (
    <div className="shopwp-skeleton-row">
      <div className="shopwp-col shopwp-skeleton-product">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-description"></div>
      </div>
    </div>
  )
}

function BuyButtonSkeleton() {
  return (
    <div className="shopwp-skeleton-row">
      <div className="shopwp-col shopwp-skeleton-product">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-buy-button"></div>
      </div>
    </div>
  )
}

function ImagesSkeleton() {
  return (
    <div className="shopwp-skeleton-row">
      <div className="shopwp-col shopwp-skeleton-product">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-images"></div>
      </div>
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="shopwp-skeleton-row">
      <div className="shopwp-col shopwp-skeleton-products">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-description"></div>
      </div>
      <div className="shopwp-col shopwp-skeleton-products">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-description"></div>
      </div>
      <div className="shopwp-col shopwp-skeleton-products">
        <div className="shopwp-skeleton-component shopwp-skeleton-product-description"></div>
      </div>
    </div>
  )
}

function ItemsSkeleton({ skeletonType }) {
  return (
    <div className="swp-skeleton shopwp-skeleton">
      {skeletonType === "shopwp/title" || skeletonType === "shopwp/search" ? (
        <TitleSkeleton />
      ) : skeletonType === "shopwp/pricing" ? (
        <PricingSkeleton />
      ) : skeletonType === "shopwp/description" ? (
        <DescriptionSkeleton />
      ) : skeletonType === "shopwp/images" ? (
        <ImagesSkeleton />
      ) : skeletonType === "shopwp/buy-button" ? (
        <BuyButtonSkeleton />
      ) : skeletonType === "shopwp/products" ||
        skeletonType === "shopwp/storefront" ||
        skeletonType === "shopwp/collections" ||
        !skeletonType ? (
        <ProductsSkeleton />
      ) : skeletonType === "shopwp/collection-title" ? (
        <TitleSkeleton />
      ) : skeletonType === "shopwp/collection-description" ? (
        <DescriptionSkeleton />
      ) : skeletonType === "shopwp/collection-image" ? (
        <ImagesSkeleton />
      ) : null}
    </div>
  )
}

export default ItemsSkeleton
