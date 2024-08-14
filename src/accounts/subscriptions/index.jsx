import { useAccountState } from "../_state/hooks"
import { prettyDate } from "@shopwp/common"
import { Price } from "@shopwp/components"
import AccountViewHeading from "../heading"
import AccountSubscriptionsActions from "./actions"

function AccountSubscriptions({ view }) {
  const accountState = useAccountState()
  const { useState } = wp.element
  const [isWorking, setIsWorking] = useState(false)

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  }

  function findSubInterval(sub) {
    var numOfdays = dateDiffInDays(
      new Date(sub.node.createdAt),
      new Date(sub.node.nextBillingDate)
    )

    if (numOfdays === 30) {
      return "month"
    } else if (numOfdays === 60) {
      return "2 months"
    } else if (numOfdays === 90) {
      return "3 months"
    } else if (numOfdays === 365) {
      return "year"
    }
    return numOfdays + " days"
  }

  return (
    <div className="swp-account-main-inner">
      <div className="swp-account-card">
        <AccountViewHeading view={view} />
        <div className="swp-account-main-content">
          <p className="swp-account-short-description">
            This is where your subscriptions are listed.
          </p>

          {!accountState.customer.subscriptionContracts.edges.length ? (
            <p className="swp-notice" data-status="info">
              No ShopWP subscriptions found yet. Please{" "}
              <a href="https://wpshop.io/purchase">
                purchase a new subscription
              </a>
            </p>
          ) : (
            accountState.customer.subscriptionContracts.edges
              .reverse()
              .map((sub) => (
                <section
                  className="swp-account-table-wrapper"
                  key={sub.node.id}
                >
                  <h3>
                    Subscription: <b>{sub.node.originOrder.name}</b> -{" "}
                    <span data-status={sub.node.status.toLowerCase()}>
                      {sub.node.status.toLowerCase()}
                    </span>
                  </h3>
                  <table
                    className="swp-account-table swp-account-table-subscriptions swp-card"
                    key={sub.node.id}
                    data-is-working={isWorking === sub.node.id}
                  >
                    <tbody>
                      <tr>
                        <td width="80" align="right">
                          Purchased
                        </td>
                        <td width="400" className="swp-account-table-col-name">
                          {sub.node.originOrder.lineItems.edges.map(
                            (lineItem) => {
                              return (
                                <p key={lineItem.node.name}>
                                  {lineItem.node.name}
                                </p>
                              )
                            }
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td width="80" align="right">
                          Amount
                        </td>
                        <td>
                          <Price
                            price={sub.node.originOrder.totalPrice.amount}
                          />{" "}
                          /{findSubInterval(sub)}
                        </td>
                      </tr>

                      <tr>
                        <td width="80" align="right">
                          Status
                        </td>
                        <td data-status={sub.node.status.toLowerCase()}>
                          {sub.node.status.toLowerCase()}
                        </td>
                      </tr>

                      <tr>
                        <td width="80" align="right">
                          Next payment on
                        </td>
                        <td>{prettyDate(sub.node.nextBillingDate, "short")}</td>
                      </tr>

                      <tr>
                        <td width="80" align="right">
                          Actions
                        </td>
                        <AccountSubscriptionsActions
                          subscription={sub}
                          setIsWorking={setIsWorking}
                        />
                      </tr>
                    </tbody>
                  </table>
                </section>
              ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountSubscriptions
