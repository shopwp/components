import { getURLParam } from "@shopwp/common"
import AccountProfile from "../profile"
import AccountLicenses from "../licenses"
import AccountSubscriptions from "../subscriptions"
import AccountOrders from "../orders"
import AccountDownloads from "../downloads"
import { createLogoutURL } from "../api"

function AccountInitialState(props) {
  const id_token = sessionStorage.getItem("swpCustomerIdToken")
  var customerData = sessionStorage.getItem("swpCustomerData")

  if (customerData) {
    customerData = JSON.parse(customerData)
  }

  const activeView = getURLParam("view")
  const allViews = [
    "profile",
    "orders",
    "subscriptions",
    "license",
    "downloads",
  ]

  return {
    isBootstrapping: true,
    activeView: allViews.includes(activeView) ? activeView : "profile",
    customer: customerData ? customerData : false,
    isWorking: false,
    logoutUrl: id_token ? createLogoutURL(id_token) : false,
    notice: false,
    // metafieldIdentifiers: "[]",
    metafieldIdentifiers: '[{ namespace: "shopwp", key: "licenses" }]',
    views: [
      {
        slug: "profile",
        title: "Profile",
        isActive: true,
        isExternal: false,
        content: AccountProfile,
      },
      {
        slug: "orders",
        title: "Orders",
        isActive: true,
        isExternal: false,
        content: AccountOrders,
      },
      {
        slug: "subscriptions",
        title: "Subscriptions",
        isActive: true,
        isExternal: false,
        content: AccountSubscriptions,
      },
      {
        slug: "license",
        title: "Licenses",
        isActive: true,
        isExternal: false,
        content: AccountLicenses,
      },
      {
        slug: "downloads",
        title: "Downloads",
        isActive: true,
        isExternal: false,
        content: AccountDownloads,
      },
      {
        slug: "ticket",
        title: "Submit a ticket",
        isActive: true,
        isExternal: true,
        content: "https://wpshop.io/support",
      },
    ],
    ...props,
  }
}

export default AccountInitialState
