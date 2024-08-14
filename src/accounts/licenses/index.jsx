import { onlyRealMetafields, onlyLicensesMetafields } from "../utils"
import { useAccountState } from "../_state/hooks"
import AccountViewHeading from "../heading"
import { prettyDate } from "@shopwp/common"

function AccountLicenses({ view }) {
  const accountState = useAccountState()
  const licenses = onlyLicensesMetafields(
    onlyRealMetafields(accountState.customer)
  )

  return (
    <div className="swp-account-main-inner">
      <div className="swp-account-card">
        <AccountViewHeading view={view} />

        <div className="swp-account-main-content">
          <p className="swp-account-short-description">
            This is where your ShopWP license keys can be found
          </p>

          {!accountState.isWorking && licenses && licenses.length ? (
            <table className="swp-account-table swp-card">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th width="100" scope="col">
                    Status
                  </th>
                  <th scope="col">Expires</th>
                  <th scope="col">Order</th>
                  <th scope="col">License Key</th>
                </tr>
              </thead>
              <tbody>
                {licenses.reverse().map((license) => {
                  return (
                    <tr key={license.licenseKey}>
                      <td>{license.licenseName}</td>
                      <td
                        width="100"
                        data-status={license.licenseStatus.toLowerCase()}
                      >
                        {license.licenseStatus.toLowerCase()}
                      </td>
                      <td>{prettyDate(license.licenseExpiresAt, "short")}</td>
                      <td>{license.licenseOrderNumber}</td>
                      <td className="swp-account-table-cell-license-key">
                        <code className="swp-account-icon-license">
                          {license.licenseKey}
                        </code>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <p className="swp-notice" data-status="info">
              No license keys found yet. Please{" "}
              <a href="https://wpshop.io/purchase">
                purchase a new subscription
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountLicenses
