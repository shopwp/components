/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import merge from "lodash-es/merge"
import { DefaultPrevArrow, DefaultNextArrow, CustomArrow } from "./arrows"

function Carousel({
  children,
  settings,
  customSettings,
  extraCSS,
  customChange = false,
}) {
  var sliderRef = false

  const { useEffect, useState } = wp.element

  const [carouselSettings, setCarouselSettings] = useState(
    combineSettings(settings, customSettings)
  )

  const CarouselCSS = css``

  useEffect(() => {
    if (customChange !== false) {
      sliderRef.slickGoTo(customChange)
    }

    var combined = combineSettings(settings, customSettings)

    setCarouselSettings(combined)
  }, [customChange, settings])

  function combineSettings(settings, customSettings) {
    var defaults = {
      dots: settings.carouselDots,
      infinite: settings.carouselInfinite,
      autoplay: settings.carouselAutoplay,
      autoplaySpeed: settings.carouselAutoplaySpeed,
      speed: settings.carouselSpeed,
      slidesToShow: settings.carouselSlidesToShow,
      slidesToScroll: settings.carouselSlidesToScroll,
      nextArrow:
        settings.carouselNextArrow === false ? (
          <DefaultNextArrow />
        ) : (
          <CustomArrow arrowSrc={settings.carouselNextArrow} />
        ),
      prevArrow:
        settings.carouselPrevArrow === false ? (
          <DefaultPrevArrow />
        ) : (
          <CustomArrow arrowSrc={settings.carouselPrevArrow} />
        ),
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    var combinedSettings = merge(defaults, customSettings)

    return wp.hooks.applyFilters("misc.carouselSettings", combinedSettings)
  }

  return (
    <Slider
      {...carouselSettings}
      ref={(slider) => (sliderRef = slider)}
      css={[CarouselCSS, extraCSS]}
      className="swp-carousel"
    >
      {children}
    </Slider>
  )
}

export default Carousel
