/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import isObject from "lodash-es/isObject"
import isArray from "lodash-es/isArray"
import Notice from "../notice"
import { useShopState } from "@shopwp/components"

function Notices({ notices, dropzone = false, noticeGroup = "" }) {
  const shopState = useShopState()

  function checkForErrorObj(maybeError) {
    if (maybeError instanceof Error) {
      return maybeError.message
    }

    if (typeof maybeError === "string") {
      return maybeError
    }

    if (isObject(maybeError)) {
      return maybeError.message
    }

    return shopState.t.e.unknown
  }

  const noticeInnerStyles = css`
    margin-bottom: 30px;
    width: 100%;
  `

  const noticeStyles = css`
    margin: 0;
  `

  return usePortal(
    notices && notices.length ? (
      <section className={"wps-notices-" + noticeGroup} css={noticeStyles}>
        {notices.map((notice) => (
          <Notice
            key={
              isArray(notice.message)
                ? notice.message[0].message
                : notice.message
            }
            status={notice.type}
            css={noticeInnerStyles}
          >
            {checkForErrorObj(
              isArray(notice.message)
                ? notice.message[0].message
                : notice.message
            )}
          </Notice>
        ))}
      </section>
    ) : null,
    dropzone
  )
}

export default Notices
