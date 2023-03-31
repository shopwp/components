/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import useIsMounted from "ismounted"
import { SlideInFromTop } from "Common/animations"
import Expire from "../expire"
import { removeSkelly } from "Common"

function Notice({
  children,
  status,
  extraCSS = false,
  onRender = false,
  html = false,
  element = false,
}) {
  const isMounted = useIsMounted()
  const { useEffect } = wp.element

  const noticeStyles = css`
    margin: 0;
    background-color: ${status === "warning"
      ? "#fef8e7"
      : status === "info"
      ? "#e8f5f9"
      : status === "error"
      ? "#f8ebea"
      : "#eef6ee"};
    padding: 0.6em 1.1em;
    border-left: 0.35em solid
      ${status === "warning"
        ? "#f0b849"
        : status === "info"
        ? "#419ecd"
        : status === "error"
        ? "#cd423b"
        : "#4db54f"};
    font-size: 15px;
  `

  useEffect(() => {
    if (element && status === "error") {
      removeSkelly(element)
    }

    if (onRender) {
      onRender()
    }
  }, [])

  return (
    <SlideInFromTop>
      {status === "success" && isMounted.current ? (
        <Expire delay={5000}>
          <p css={[noticeStyles, extraCSS]}>{children}</p>
        </Expire>
      ) : html ? (
        <p
          css={[noticeStyles, extraCSS]}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></p>
      ) : (
        <p css={[noticeStyles, extraCSS]}>{children}</p>
      )}
    </SlideInFromTop>
  )
}

export default Notice
