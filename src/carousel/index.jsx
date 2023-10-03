/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { mq } from "@shopwp/common"
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

  const CarouselCSS = css`
    max-width: 100%;
    margin: 0 auto 30px auto;

    .slick-next,
    .slick-prev {
      top: ${settings.showThumbsCarousel
        ? "calc(50% - 5px)"
        : "calc(50% - 28px)"};
      width: 55px;
      height: 55px;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;

      svg {
        width: 55px;
        height: 55px;
        padding: ${settings.showThumbsCarousel ? "15px" : "0"};
      }

      &:hover,
      &:focus {
        opacity: 0.7;
      }

      &:before {
        color: black;
        font-size: 35px;
        content: "";
      }
    }

    .slick-list {
      padding-top: ${settings.showThumbsCarousel ? "10px" : "0"};
    }

    .slick-prev {
      left: ${settings.showThumbsCarousel ? "-45px" : "-55px"};
    }

    .slick-next {
      right: ${settings.showThumbsCarousel ? "-40px" : "-55px"};
    }

    .slick-slide > div {
      margin: 0 10px;
    }

    .slick-dots {
      margin: 0;
      padding: 0;
      bottom: -20px;

      li button:before {
        width: 10px;
        height: 10px;
        font-size: 10px;
        left: calc(50% - 5px);
      }
    }

    ${mq("large")} {
      display: table !important;
      table-layout: fixed !important;
      width: 100% !important;

      .slick-prev {
        left: ${settings.showThumbsCarousel ? "-35px" : "0"};
        z-index: 999;
      }

      .slick-next {
        right: ${settings.showThumbsCarousel ? "-35px" : "0"};
        z-index: 999;
      }

      .slick-list {
        width: ${settings.showThumbsCarousel ? "100%" : "75%"};
        margin: 0 auto;
      }
    }

    ${mq("medium")} {
      .slick-prev,
      .slick-next {
        width: ${settings.showThumbsCarousel ? "55px" : "35px"};
        height: ${settings.showThumbsCarousel ? "55px" : "35px"};
      }
    }
  `

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
    >
      {children}
    </Slider>
  )
}

export default Carousel
