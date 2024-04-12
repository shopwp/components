import Expire from "../expire"

function Notice({
  children,
  status,
  onRender = false,
  html = false,
  isFetchingNew = false,
}) {
  const { useEffect } = wp.element

  useEffect(() => {
    if (onRender) {
      onRender()
    }
  }, [])

  return (
    <>
      {status === "success" ? (
        <Expire delay={5000}>
          <p
            className="swp-notice"
            data-status={status}
            data-is-fetching-new={isFetchingNew}
          >
            {children}
          </p>
        </Expire>
      ) : html ? (
        <p
          className="swp-notice"
          data-status={status}
          data-is-fetching-new={isFetchingNew}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></p>
      ) : (
        <p
          className="swp-notice"
          data-status={status}
          data-is-fetching-new={isFetchingNew}
        >
          {children}
        </p>
      )}
    </>
  )
}

export default Notice
