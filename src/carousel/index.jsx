/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { mq } from "Common/css"
import merge from "lodash/merge"
import { removeSkelly } from "Common"
import { DefaultPrevArrow, DefaultNextArrow, CustomArrow } from "./arrows"

function Carousel({
  children,
  settings,
  customSettings,
  extraCSS,
  element,
  customChange = false,
}) {
  var sliderRef = false

  const { useEffect } = wp.element

  const CarouselCSS = css`
    max-width: 100%;
    margin: 0 auto;

    .slick-next,
    .slick-prev {
      top: calc(50% - 30px);
      width: 55px;
      height: 55px;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;

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

    .slick-prev {
      left: -55px;
    }

    .slick-next {
      right: -55px;
    }

    .slick-slide > div {
      margin: 0 10px;
    }

    .slick-dots {
      margin: 0;
      padding: 0;

      li button:before {
        width: 10px;
        height: 10px;
        font-size: 10px;
      }
    }

    ${mq("large")} {
      display: table !important;
      table-layout: fixed !important;
      width: 100% !important;

      .slick-prev {
        left: 0;
        z-index: 999;
      }

      .slick-next {
        right: 0;
        z-index: 999;
      }

      .slick-list {
        width: 75%;
        margin: 0 auto;
      }
    }

    ${mq("medium")} {
      .slick-prev,
      .slick-next {
        width: 35px;
        height: 35px;
      }
    }
  `

  useEffect(() => {
    if (customChange !== false) {
      sliderRef.slickGoTo(customChange)
    }
  }, [customChange])

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
    onInit: function () {
      removeSkelly(element)
    },
  }

  var combinedSettings = merge(defaults, customSettings)

  const settingsFinal = wp.hooks.applyFilters(
    "misc.carouselSettings",
    combinedSettings
  )

  return (
    <Slider
      ref={(slider) => (sliderRef = slider)}
      {...settingsFinal}
      css={[CarouselCSS, extraCSS]}
    >
      {children}
    </Slider>
  )
}

export default Carousel
