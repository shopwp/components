function AccountViewHeading({ view }) {
  return (
    <span
      className={`swp-account-icon-left swp-account-icon-${view.slug} swp-account-heading`}
    >
      {view.title}
    </span>
  )
}

export default AccountViewHeading
