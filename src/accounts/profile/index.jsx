import { useAccountState } from "../_state/hooks"
import AccountViewHeading from "../heading"

const PopoverProfile = wp.element.lazy(() =>
  import(/* webpackChunkName: 'PopoverProfile-public' */ "../popover-profile")
)

function AccountProfile({ view }) {
  const { useState, Suspense } = wp.element
  const accountState = useAccountState()
  const [isWorking, setIsWorking] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="swp-account-main-inner">
      <div className="swp-account-card">
        <AccountViewHeading view={view} />
        <p className="swp-account-short-description">
          This is where you can edit your profile and such.
        </p>
        <div className="swp-account-main-content">
          <Suspense fallback="Loading edit profile modal ...">
            <PopoverProfile
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isWorking={isWorking}
              setIsWorking={setIsWorking}
            />
          </Suspense>

          <table className="swp-account-table swp-card">
            <tbody>
              <tr>
                <td width="80" align="right">
                  Name
                </td>
                <td className="swp-l-row swp-l-row-between swp-l-col-center">
                  {accountState.customer.displayName}
                </td>
              </tr>
              <tr>
                <td width="80" align="right">
                  Email
                </td>
                <td>{accountState.customer.emailAddress.emailAddress}</td>
              </tr>
              <tr>
                <td width="80" align="right">
                  Company
                </td>
                <td>
                  {accountState.customer.defaultAddress
                    ? accountState.customer.defaultAddress.company
                    : ""}
                </td>
              </tr>
              <tr>
                <td width="80" align="right">
                  Address
                </td>
                <td className="swp-l-row swp-l-row-between swp-l-col-center">
                  {accountState.customer.defaultAddress
                    ? accountState.customer.defaultAddress.address1 +
                      " " +
                      accountState.customer.defaultAddress.city +
                      " " +
                      accountState.customer.defaultAddress.zoneCode +
                      " " +
                      accountState.customer.defaultAddress.zip
                    : "No address found"}
                </td>
              </tr>
              <tr>
                <td width="80" align="right">
                  Phone
                </td>
                <td>
                  {accountState.customer.phoneNumber
                    ? accountState.customer.phoneNumber.phoneNumber
                    : ""}
                </td>
              </tr>
              <tr>
                <td width="80" align="right">
                  Newsletter
                </td>
                <td
                  className="swp-account-profile-marketing-state"
                  data-status={accountState.customer.emailAddress.marketingState.toLowerCase()}
                >
                  {accountState.customer.emailAddress.marketingState ===
                  "NOT_SUBSCRIBED"
                    ? "Not subscribed"
                    : accountState.customer.emailAddress.marketingState}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Need help?{" "}
          <a href="https://wpshop.io/support/" target="_blank">
            Submit a ticket
          </a>
        </p>
      </div>
    </div>
  )
}

export default AccountProfile
