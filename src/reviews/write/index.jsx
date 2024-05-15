import ReviewRating from "../rating"
import { to } from "@shopwp/common"
import { createYotpoReview, maybeHandleApiError } from "@shopwp/api"
import { useProductReviewsState } from "../_state/hooks"
import Notice from "../../notice"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function ReviewForm(props) {
  const { useState } = wp.element
  const state = useProductReviewsState()
  const shopState = useShopState()
  const [isBusy, setIsBusy] = useState(false)
  const [reviewName, setReviewName] = useState("")
  const [reviewEmail, setReviewEmail] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewBody, setReviewBody] = useState("")
  const [reviewScore, setReviewScore] = useState(5)

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [bodyError, setBodyError] = useState(false)
  const [scoreError, setScoreError] = useState(false)

  const [apiError, setApiError] = useState(false)
  const [successMessage, setSuccess] = useState(false)

  function maybeSetName(value) {
    setReviewName(value)

    if (value === "") {
      setNameError(shopState.t.n.reviewEnterName)
    } else {
      setNameError(false)
    }
  }

  function maybeSetEmail(value) {
    setReviewEmail(value)

    if (value === "") {
      setEmailError(shopState.t.n.reviewEnterEmail)
    } else {
      setEmailError(false)
    }
  }

  function maybeSetScore(value) {
    setReviewScore(value)

    if (value === 0) {
      setScoreError(shopState.t.n.reviewEnterRating)
    } else {
      setScoreError(false)
    }
  }

  function maybeSetTitle(value) {
    setReviewTitle(value)

    if (value === "") {
      setTitleError(shopState.t.n.reviewEnterTitle)
    } else {
      setTitleError(false)
    }
  }

  function maybeSetBody(value) {
    setReviewBody(value)

    if (value === "") {
      setBodyError(shopState.t.n.reviewEnterReview)
    } else {
      setBodyError(false)
    }
  }

  async function createReview() {
    maybeSetName(reviewName)
    maybeSetEmail(reviewEmail)
    maybeSetScore(reviewScore)
    maybeSetTitle(reviewTitle)
    maybeSetBody(reviewBody)

    if (nameError || emailError || titleError || bodyError || scoreError) {
      return
    }

    if (
      reviewName === "" ||
      reviewEmail === "" ||
      reviewTitle === "" ||
      reviewBody === ""
    ) {
      return
    }

    setIsBusy(true)
    setSuccess(false)
    setApiError(false)

    let data = {
      sku: state.reviewsProductId,
      product_title: state.payload.title,
      product_url: state.payload.onlineStoreUrl
        ? state.payload.onlineStoreUrl
        : window.location.href,
      display_name: reviewName,
      email: reviewEmail,
      review_score: reviewScore,
      review_title: reviewTitle,
      review_content: reviewBody,
    }

    const [error, resp] = await to(createYotpoReview(data))

    setIsBusy(false)

    var errr = maybeHandleApiError(error, resp)

    if (errr) {
      setApiError(errr)
      return
    } else {
      setSuccess(shopState.t.n.reviewSubmitThanks)
    }
  }

  function HeadingProductName({ title }) {
    return (
      <span
        className="swp-review-product-name"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    )
  }

  return state.reviewsProductId ? (
    <div className="swp-review-form" data-is-busy={isBusy}>
      {!successMessage ? (
        <>
          <h4>
            {shopState.t.l.writingAReviewFor}{" "}
            {props.product_title ? (
              <HeadingProductName title={props.product_title} />
            ) : state.products.length ? (
              <HeadingProductName title={state.products[0].name} />
            ) : (
              false
            )}
          </h4>
          <div className="swp-review-fieldgroup">
            <label htmlFor="name">{shopState.t.l.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={reviewName}
              disabled={isBusy}
              onChange={(e) => maybeSetName(e.target.value)}
              className={nameError ? "swp-field-error" : "swp-review-input"}
            />
            {nameError ? <p className="swp-review-error">{nameError}</p> : null}
          </div>
          <div className="swp-review-fieldgroup">
            <label htmlFor="email">{shopState.t.l.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.smith@example.com"
              value={reviewEmail}
              disabled={isBusy}
              onChange={(e) => maybeSetEmail(e.target.value)}
              className={emailError ? "swp-field-error" : "swp-review-input"}
            />
            {emailError ? (
              <p className="swp-review-error">{emailError}</p>
            ) : null}
          </div>
          <div className="swp-review-fieldgroup">
            <label htmlFor="rating">{shopState.t.n.reviewRating}</label>
            <ReviewRating
              type="dynamic"
              onScore={maybeSetScore}
              showTooltip={true}
              showLabel={false}
              tooltipArray={["Terrible", "Bad", "Average", "Good", "Excellent"]}
              size={30}
              isBusy={isBusy}
              className={scoreError ? "swp-field-error" : ""}
              reviewScore={reviewScore}
              dropzone={false}
            />
            {scoreError ? (
              <p className="swp-review-error">{scoreError}</p>
            ) : null}
          </div>
          <div className="swp-review-fieldgroup">
            <label htmlFor="title">{shopState.t.n.reviewTitle}</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={shopState.t.n.reviewPlaceTitle}
              value={reviewTitle}
              disabled={isBusy}
              onChange={(e) => maybeSetTitle(e.target.value)}
              className={titleError ? "swp-field-error" : "swp-review-input"}
            />
            {titleError ? (
              <p className="swp-review-error">{titleError}</p>
            ) : null}
          </div>
          <div className="swp-review-fieldgroup">
            <label htmlFor="body">{shopState.t.n.bodyOfReview}</label>
            <textarea
              rows="5"
              cols="33"
              id="body"
              name="body"
              placeholder={shopState.t.n.reviewPlaceWrite}
              value={reviewBody}
              disabled={isBusy}
              onChange={(e) => maybeSetBody(e.target.value)}
              className={bodyError ? "swp-field-error" : "swp-review-input"}
            />
            {bodyError ? <p className="swp-review-error">{bodyError}</p> : null}
          </div>
          <button className="swp-btn swp-review-btn" onClick={createReview}>
            {isBusy ? (
              <Loader isLoading={isBusy} />
            ) : (
              shopState.t.l.submitReview
            )}
          </button>
        </>
      ) : null}

      {apiError ? <Notice status="error">{apiError}</Notice> : null}
      {successMessage ? (
        <Notice status="success">{successMessage}</Notice>
      ) : null}
    </div>
  ) : (
    <Notice status="error">{shopState.t.w.noProdFound}</Notice>
  )
}

export default ReviewForm
