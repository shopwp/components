/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ReviewsRating from "../rating"
import {
  useProductReviewsState,
  useProductReviewsDispatch,
} from "../_state/hooks"
import { prettyDate } from "Common"
import { mq, fadeIn, buttonCSS } from "Common"
import Gravatar from "react-gravatar"
import ReviewsPagination from "../pagination"
import ReviewForm from "../write"
import { usePortal } from "Hooks"
import Notice from "../../notice"
import { useShopState } from "ShopState"

function ReviewVerifiedBuyer() {
  const shopState = useShopState()

  const ReviewVerifiedBuyerCSS = css`
    margin-top: 10px;
    background: #c0fac0;
    display: inline-block;
    padding: 1px 12px 3px 30px;
    border-radius: 22px;
    border: 1px solid #6cb46c;
    position: relative;

    span {
      display: inline-block;
      color: black;
      font-size: 12px;
      position: relative;
      top: -1px;
    }

    svg {
      position: absolute;
      width: 14px;
      height: 14px;
      left: 11px;
      top: 5px;

      path {
        fill: #287b40;
      }
    }
  `
  return (
    <p css={ReviewVerifiedBuyerCSS}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
      </svg>
      <span>{shopState.t.l.verifiedBuyer}</span>
    </p>
  )
}

function ReviewListItem({ review, size, index, reviewsState }) {
  const ReviewListItemCSS = css`
    display: flex;
    margin-bottom: 20px;
    border-bottom: ${size === index + 1 ? "none" : "1px solid #ddd"};
    padding-bottom: 30px;
    animation: ${fadeIn} 0.2s ease;

    ${mq("medium")} {
      flex-direction: column;
    }
  `

  const ReviewTitleCSS = css`
    display: block;
    font-weight: bold;
    font-size: 18px;
    margin-top: 8px;

    ${mq("medium")} {
      margin-top: 0;
    }
  `

  const ReviewContentCSS = css`
    display: block;
    margin-top: 7px;
  `

  const ReviewContentWrapperCSS = css`
    padding-left: 15px;
    flex: 1;

    ${mq("medium")} {
      padding-left: 0;
      margin-top: 20px;
    }
  `

  const ReviewBuyerCSS = css`
    width: 240px;
    display: flex;
  `

  const ReviewDateCSS = css`
    font-size: 14px;
    margin-top: 2px;
    color: #818181;
  `

  const ReviewBuyerNameCSS = css`
    font-weight: bold;
    font-size: 15px;
  `

  const ReviewBuyerContentCSS = css`
    flex: 1;
    padding-top: 2px;
  `

  const ReviewBuyerAvatarCSS = css`
    width: 65px;
    padding-top: 2px;

    ${mq("medium")} {
      width: 50px;
      padding-top: 3px;
    }

    img,
    svg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: block;

      ${mq("medium")} {
        width: 40px;
        height: 40px;
      }
    }
  `

  return (
    <div
      css={ReviewListItemCSS}
      className="swp-review-list-item"
      itemScope
      itemProp="review"
      itemType="https://schema.org/Review"
    >
      <div css={ReviewBuyerCSS} className="swp-review-buyer">
        <div css={ReviewBuyerAvatarCSS}>
          <Gravatar
            email={
              review.email
                ? review.email
                : review.social_image
                ? review.social_image
                : shopwp.misc.pluginsDirURL + "assets/default-avatar.png"
            }
            default="mp"
          />
        </div>
        <div css={ReviewBuyerContentCSS}>
          <span
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            css={ReviewBuyerNameCSS}
          >
            <span className="swp-review-buyer-name" itemProp="name">
              {review?.name ? review.name : review.user.display_name}
            </span>
          </span>
          <div
            className="swp-review-date"
            css={ReviewDateCSS}
            itemProp="datePublished"
            content={review.created_at}
          >
            {prettyDate(review.created_at)}
          </div>
          {review?.reviewer_type === "verified_buyer" ||
            (review?.verified_buyer ? <ReviewVerifiedBuyer /> : null)}
        </div>
      </div>
      <div
        css={ReviewContentWrapperCSS}
        className="swp-review-list-item-content"
        itemProp="itemReviewed"
        itemScope
        itemType="https://schema.org/Product"
      >
        {reviewsState.products ? (
          <>
            <meta
              itemProp="name"
              content={reviewsState.products[0].name}
            ></meta>
            <meta
              itemProp="image"
              content={reviewsState.products[0].image_url}
            ></meta>
            <meta
              itemProp="url"
              content={reviewsState.products[0].product_link}
            ></meta>
          </>
        ) : null}

        <div className="swp-review-rating">
          <ReviewsRating
            reviewScore={review.score}
            size={20}
            showLabel={false}
            dropzone={false}
          />
        </div>
        <div css={ReviewTitleCSS} className="swp-review-title" itemProp="name">
          {review.title}
        </div>
        <div
          css={ReviewContentCSS}
          className="swp-review-content"
          itemProp="reviewBody"
          dangerouslySetInnerHTML={{ __html: review.content }}
        />
        {review.comment && review.comment.public ? (
          <ReviewComment review={review} />
        ) : null}
      </div>
    </div>
  )
}

function ReviewComment({ review }) {
  const ReviewCommentCSS = css`
    background: rgb(238, 238, 238);
    background: linear-gradient(
      0deg,
      rgba(238, 238, 238, 1) 0%,
      rgba(247, 247, 247, 1) 100%
    );
    padding: 10px 20px 12px 20px;
    border-radius: 5px;
    margin-left: 40px;
    margin-bottom: 0;
    font-size: 14px;
    position: relative;

    svg {
      position: absolute;
      left: -32px;
      top: -2px;
      width: 27px;

      path {
        fill: #eaeaea;
      }
    }
  `
  return (
    <p css={ReviewCommentCSS}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 530.4 532"
        style={{ enableBackground: "new 0 0 530.4 532" }}
        xmlSpace="preserve"
      >
        <path d="m235.7 17.3 151.1 176c13.3 15.4 2.5 39.7-18.2 39.7h-87.9c2.3 155.1 40.8 221.9 185.8 176.6 16.1-5 28.6 14.4 18.6 28.1C453.3 481.5 392.4 521 331 521c-152.2 0-184.4-127.4-185.3-288h-80c-20.7 0-31.5-24.3-18.2-39.7l151.1-176c9.6-11.1 26.8-11.1 37.1 0z" />
      </svg>

      {review.comment.content}
    </p>
  )
}

function ReviewsListContent() {
  const reviewsState = useProductReviewsState()

  const ReviewsListCSS = css`
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;
  `

  return (
    <ul className="shopwp-reviews-list" css={ReviewsListCSS}>
      {reviewsState.reviewsTruncated.map((review, index) => (
        <ReviewListItem
          key={review.id}
          review={review}
          index={index}
          size={reviewsState.reviewsTruncated.length}
          reviewsState={reviewsState}
        />
      ))}
    </ul>
  )
}

function EmptyReviews({ onToggle }) {
  const shopState = useShopState()

  const addOne = css`
    text-decoration: underline;
    transition: all ease 0.1s;
    margin-left: 5px;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  `

  return (
    <Notice status="info">
      {shopState.t.l.noReviews}
      <span onClick={onToggle} css={addOne}>
        {shopState.t.l.writeAReview}
      </span>
    </Notice>
  )
}

function ReviewsList() {
  const reviewsState = useProductReviewsState()
  const reviewsDispatch = useProductReviewsDispatch()
  const shopState = useShopState()

  const ReviewsListWrapCSS = css`
    display: flex;
    flex-direction: column;
    max-width: 1100px;
  `

  const ReviewsListHeaderCSS = css`
    margin-bottom: 0;
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;

    h3 {
      font-size: 24px;
      margin-bottom: 15px;
    }

    p {
      margin-left: 10px;
      font-size: 14px;
      color: #818181;
      position: relative;
      top: -2px;
    }

    ${mq("small")} {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin-left: 0;
        margin-bottom: 20px;
        margin-top: 2px;
      }

      h3 {
        margin-bottom: 0;
      }
    }
  `

  function onToggle() {
    reviewsDispatch({
      type: "SET_IS_WRITING_REVIEW",
      payload: !reviewsState.isWritingReview,
    })
  }

  return usePortal(
    <div css={ReviewsListWrapCSS}>
      <header css={ReviewsListHeaderCSS}>
        <h3>{shopState.t.l.customerReviews}</h3>
        <p>
          (Showing {reviewsState.reviewsTruncated.length}
          {reviewsState.reviewsTruncated.length === 1
            ? " " + shopState.t.l.review
            : " " + shopState.t.l.reviews}
          )
        </p>
        {reviewsState.settings.showCreateNew &&
        reviewsState.settings.productId ? (
          <WriteReviewLink onToggle={onToggle} />
        ) : null}
      </header>
      {reviewsState.isWritingReview && reviewsState.settings.productId ? (
        <ReviewForm
          sku={
            reviewsState.products.length
              ? reviewsState.products[0].id
              : reviewsState.settings.productId
          }
          product_title={
            reviewsState.products.length
              ? reviewsState.products[0].name
              : shopwp.misc.postTitle
          }
          product_url={
            reviewsState.products.length
              ? reviewsState.products[0].product_link
              : window.location.href
          }
        />
      ) : null}
      {reviewsState.reviewsTruncated?.length ? <ReviewsListContent /> : null}
      {reviewsState.reviewsShown < reviewsState.reviews.length ? (
        <ReviewsPagination />
      ) : null}

      {reviewsState.reviews.length <= 0 && !reviewsState.isWritingReview ? (
        <EmptyReviews onToggle={onToggle} />
      ) : null}
    </div>,
    reviewsState.settings.dropzoneListing
  )
}

function WriteReviewLink({ onToggle }) {
  const shopState = useShopState()
  const WriteReviewLinkCSS = css`
    align-self: initial;
    margin-left: auto;
    width: 160px;
    font-size: 16px;

    ${mq("small")} {
      margin: 0px auto 20px auto;
    }
  `

  return (
    <a href="#!" onClick={onToggle} css={[buttonCSS, WriteReviewLinkCSS]}>
      {shopState.t.l.writeAReview}
    </a>
  )
}
export default ReviewsList
