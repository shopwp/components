/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { prettyDate } from "@shopwp/common"
import ReviewsRating from "../rating"
import Gravatar from "react-gravatar"
import ListMeta from "./meta"
import ReviewComment from "./comment"
import { mq, fadeIn } from "@shopwp/common"

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
            <ListMeta type="name" content={reviewsState.products[0].name} />
            <ListMeta
              type="image"
              content={reviewsState.products[0].image_url}
            />
            <ListMeta
              type="url"
              content={reviewsState.products[0].product_link}
            />
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

export default ReviewListItem
