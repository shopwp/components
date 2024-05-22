import { prettyDate } from "@shopwp/common"
import ReviewsRating from "../rating"
import Gravatar from "react-gravatar"
import ListMeta from "./meta"
import ReviewComment from "./comment"

function ReviewListItem({ review, size, index, reviewsState }) {
  return (
    <div
      className="swp-review-list-item"
      itemScope
      itemProp="review"
      itemType="https://schema.org/Review"
      data-has-size={size === index + 1}
    >
      <div className="swp-review-buyer">
        <div className="swp-review-buyer-avatar">
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
        <div className="swp-review-buyer-content">
          <span
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            className="swp-review-buyer-name"
          >
            <span className="swp-review-buyer-name" itemProp="name">
              {review.name ? review.name : review.user.display_name}
            </span>
          </span>
          <div
            className="swp-review-date"
            itemProp="datePublished"
            content={review.created_at}
          >
            {prettyDate(review.created_at)}
          </div>
        </div>
      </div>
      <div
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
            linkToModal={false}
          />
        </div>

        <div className="swp-review-title" itemProp="name">
          {review.title}
        </div>
        <div
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
