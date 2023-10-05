import ReactPlayer from "react-player/lazy"

function ProductFeaturedImageVideo({ videoData }) {
  return (
    <div className="swp-image-video">
      <ReactPlayer
        className="react-player"
        url={
          videoData.mediaContentType === "EXTERNAL_VIDEO"
            ? videoData.embeddedUrl
            : videoData.sources[0].url
        }
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default ProductFeaturedImageVideo
