import { useAccountState } from "../_state/hooks"
import {
  onlyRealMetafields,
  onlyLicensesMetafields,
  onlyUniqueDownloads,
} from "../utils"
import AccountViewHeading from "../heading"

function AccountDownloads({ view }) {
  const accountState = useAccountState()

  const licenses = onlyUniqueDownloads(
    onlyLicensesMetafields(onlyRealMetafields(accountState.customer))
  )

  return (
    <div className="swp-account-main-inner">
      <div className="swp-account-card">
        <AccountViewHeading view={view} />
        <div className="swp-account-main-content">
          <p className="swp-account-short-description">
            This is where your downloads are listed.
          </p>

          {licenses && licenses.length ? (
            <table className="swp-account-table swp-card">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Version</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>
                {licenses.reverse().map((license) => {
                  return (
                    <tr key={license.licenseKey}>
                      <td>{license.licenseName}</td>
                      <td>{license.licenseDownloadVersion}</td>
                      <td className="swp-td-link">
                        <a
                          href={license.licenseDownloadLink}
                          download
                          className="swp-account-icon-downloads swp-account-icon-left"
                        >
                          Download v{license.licenseDownloadVersion}
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <p className="swp-notice" data-status="info">
              No downloads found yet. Please{" "}
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

export default AccountDownloads
