/** @jsx jsx */
import { jsx, css } from "@emotion/react"

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
  const SkeletonCSS = css`
    .shopwp-skeleton-component {
      margin-bottom: 13px;
      border-radius: 15px;
      background: #eee;
    }

    .wps-products-wrapper {
      display: flex;
      padding: 2em 0;
      width: 100%;
      max-width: 1200px;
    }

    .shopwp-skeleton-row {
      display: flex;
      justify-content: space-between;
    }

    .shopwp-col {
      flex: 1;
    }

    .shopwp-skeleton-product {
      width: 100%;
      flex: none;
    }

    .shopwp-skeleton-products {
      width: 32%;
      flex: none;
    }

    .shopwp-skeleton-product-images {
      width: 100%;
      height: 193px;
    }

    .shopwp-skeleton-cart-icon {
      width: 50px;
      height: 50px;
    }

    .shopwp-skeleton-product-image {
      width: 90%;
      height: 350px;
    }

    .shopwp-skeleton-product-title {
      width: 300px;
      height: 20px;
    }

    .shopwp-skeleton-product-price {
      width: 40%;
      height: 20px;
    }

    .shopwp-skeleton-product-description {
      width: 100%;
      height: 70px;
    }

    .shopwp-skeleton-product-buy-button {
      width: 60%;
      height: 75px;
    }

    .shopwp-skeleton-product-single {
      max-width: 1200px;
      margin: 20px auto 0px auto;
    }

    @media (max-width: 600px) {
      .shopwp-skeleton-row {
        flex-direction: column;
      }

      .shopwp-skeleton-products {
        width: 100%;
      }

      .shopwp-skeleton-product,
      .shopwp-skeleton-gallery,
      .shopwp-skeleton-component {
        width: 100%;
        max-width: 100%;
        flex: 0 0 100%;
      }
    }
  `

  return (
    <div className="shopwp-skeleton" css={SkeletonCSS}>
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
