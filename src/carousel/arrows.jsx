function DefaultNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "inherit" }}
      onClick={onClick}
    >
      <button
        tabIndex="0"
        id="swp-carousel-next-button"
        className="swp-carousel-button"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 512"
        >
          <path
            fill="currentColor"
            d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"
          ></path>
        </svg>
      </button>
    </div>
  )
}

function DefaultPrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "inherit" }}
      onClick={onClick}
    >
      <button
        tabIndex="0"
        id="swp-carousel-prev-button"
        className="swp-carousel-button"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 512"
        >
          <path
            fill="currentColor"
            d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"
          ></path>
        </svg>
      </button>
    </div>
  )
}

function CustomArrow(props) {
  const { className, style, onClick, arrowSrc } = props

  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "inherit" }}
      onClick={onClick}
    >
      <img src={arrowSrc} />
    </div>
  )
}

export { DefaultNextArrow, DefaultPrevArrow, CustomArrow }
