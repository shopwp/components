function ReviewComment({ review }) {
  return (
    <p className="swp-review-comment">
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

export default ReviewComment
