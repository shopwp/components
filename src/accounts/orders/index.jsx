import { useAccountState } from "../_state/hooks"
import { Price } from "@shopwp/components"
import { prettyDate } from "@shopwp/common"
import AccountViewHeading from "../heading"

function AccountOrders({ view }) {
  const accountState = useAccountState()

  return (
    <div className="swp-account-main-inner">
      <div className="swp-account-card">
        <AccountViewHeading view={view} />
        <div className="swp-account-main-content">
          <p className="swp-account-short-description">
            This is where your orders are listed.
          </p>

          {!accountState.customer.orders.edges.length ? (
            <p className="swp-notice" data-status="info">
              No ShopWP orders found yet. Please{" "}
              <a href="https://wpshop.io/purchase">
                purchase a new subscription
              </a>
            </p>
          ) : (
            <table className="swp-account-table swp-card">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {accountState.customer.orders.edges.reverse().map((order) => {
                  return (
                    <tr key={order.node.id}>
                      <td>#{order.node.number}</td>
                      <td>{prettyDate(order.node.createdAt, "short")}</td>
                      <td className="swp-account-table-col-name">
                        {order.node.lineItems.edges.map((lineItem) => {
                          return (
                            <p key={lineItem.node.name}>{lineItem.node.name}</p>
                          )
                        })}
                      </td>
                      <td>
                        <Price price={order.node.totalPrice.amount} />
                      </td>
                      <td className="swp-td-link">
                        <a
                          href={order.node.statusPageUrl}
                          className="swp-account-icon-receipt"
                          target="_blank"
                        >
                          Receipt
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountOrders
