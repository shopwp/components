/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "Hooks"
import isString from "lodash/isString"
import isObject from "lodash/isObject"
import isArray from "lodash/isArray"
import Notice from "../notice"
import { useShopState } from "ShopState"

function Notices({ notices, dropzone = false, noticeGroup = "" }) {
  const shopState = useShopState()

  function checkForErrorObj(maybeError) {
    if (maybeError instanceof Error) {
      return maybeError.message
    }

    if (isString(maybeError)) {
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
