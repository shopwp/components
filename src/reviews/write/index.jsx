/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ReviewRating from "../rating"
import { buttonCSS } from "@shopwp/common"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

import { to } from "@shopwp/common"
import { createYotpoReview, maybeHandleApiError } from "@shopwp/api"
import { useProductReviewsState } from "../_state/hooks"
import Notice from "../../notice"
import { useShopState } from "@shopwp/components"

function ReviewForm(props) {
  const { useState } = wp.element
  const state = useProductReviewsState()
  const shopState = useShopState()
  const [isBusy, setIsBusy] = useState(false)
  const [reviewName, setReviewName] = useState("")
  const [reviewEmail, setReviewEmail] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewBody, setReviewBody] = useState("")
  const [reviewScore, setReviewScore] = useState(0)

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [bodyError, setBodyError] = useState(false)
  const [scoreError, setScoreError] = useState(false)

  const [apiError, setApiError] = useState(false)
  const [successMessage, setSuccess] = useState(false)

  const ReviewFormCSS = css`
    margin-bottom: 50px;

    h4 {
      font-size: 20px;
    }
  `
  const ReviewFieldGroupCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  `

  const ReviewLabelCSS = css`
    font-size: 16px;
    margin-bottom: 3px;
    font-weight: bold;
    transition: opacity 0.3s ease;
    opacity: ${isBusy ? 0.4 : 1};
  `
  const ReviewInputCSS = css`
    padding: 10px;
    font-size: 16px;
    border-radius: 7px;
    border: 1px solid #a5a5a5;
    font-family: helvetica, sans-serif;

    &.swp-field-error {
      border-color: red;
    }
  `

  const inputErrorCSS = css`
    color: red;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 14px;
  `

  const SubmitReviewsCSS = css`
    display: inline-block;
    max-width: 200px;
    margin-bottom: 20px;
  `

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

    const [error, resp] = await to(
      createYotpoReview({
        sku: props.sku,
        product_title: props.product_title,
        product_url: props.product_url,
        display_name: reviewName,
        email: reviewEmail,
        review_score: reviewScore,
        review_title: reviewTitle,
        review_content: reviewBody,
      })
    )

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
    const HeadingProductNameCSS = css`
      font-size: 16px;
      font-weight: normal;
      margin-left: 5px;
    `
    return (
      <span
        css={HeadingProductNameCSS}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    )
  }

  return state.settings.productId ? (
    <div css={ReviewFormCSS}>
      {!successMessage ? (
        <>
          <h4>
            {shopState.t.l.writeAReview}{" "}
            {props.product_title ? (
              <HeadingProductName title={props.product_title} />
            ) : state.products.length ? (
              <HeadingProductName title={state.products[0].name} />
            ) : (
              false
            )}
          </h4>
          <div className="shopwp-fieldgroup" css={ReviewFieldGroupCSS}>
            <label css={ReviewLabelCSS} htmlFor="name">
              {shopState.t.l.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={reviewName}
              disabled={isBusy}
              onChange={(e) => maybeSetName(e.target.value)}
              css={ReviewInputCSS}
              className={nameError ? "swp-field-error" : ""}
            />
            {nameError ? <p css={inputErrorCSS}>{nameError}</p> : null}
          </div>
          <div className="shopwp-fieldgroup" css={ReviewFieldGroupCSS}>
            <label css={ReviewLabelCSS} htmlFor="email">
              {shopState.t.l.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.smith@example.com"
              value={reviewEmail}
              disabled={isBusy}
              onChange={(e) => maybeSetEmail(e.target.value)}
              css={ReviewInputCSS}
              className={emailError ? "swp-field-error" : ""}
            />
            {emailError ? <p css={inputErrorCSS}>{emailError}</p> : null}
          </div>
          <div className="shopwp-fieldgroup" css={ReviewFieldGroupCSS}>
            <label css={ReviewLabelCSS} htmlFor="rating">
              {shopState.t.n.reviewRating}
            </label>
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
            {scoreError ? <p css={inputErrorCSS}>{scoreError}</p> : null}
          </div>
          <div className="shopwp-fieldgroup" css={ReviewFieldGroupCSS}>
            <label css={ReviewLabelCSS} htmlFor="title">
              {shopState.t.n.reviewTitle}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={shopState.t.n.reviewPlaceTitle}
              value={reviewTitle}
              disabled={isBusy}
              onChange={(e) => maybeSetTitle(e.target.value)}
              css={ReviewInputCSS}
              className={titleError ? "swp-field-error" : ""}
            />
            {titleError ? <p css={inputErrorCSS}>{titleError}</p> : null}
          </div>
          <div className="shopwp-fieldgroup" css={ReviewFieldGroupCSS}>
            <label css={ReviewLabelCSS} htmlFor="body">
              {shopState.t.n.bodyOfReview}
            </label>
            <textarea
              rows="5"
              cols="33"
              id="body"
              name="body"
              placeholder={shopState.t.n.reviewPlaceWrite}
              value={reviewBody}
              disabled={isBusy}
              onChange={(e) => maybeSetBody(e.target.value)}
              css={ReviewInputCSS}
              className={bodyError ? "swp-field-error" : ""}
            />
            {bodyError ? <p css={inputErrorCSS}>{bodyError}</p> : null}
          </div>
          <button css={[buttonCSS, SubmitReviewsCSS]} onClick={createReview}>
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
