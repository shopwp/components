const apiUrlPrefix = `https://shopify.com/${shopwp.general.customersShopId}`
const apiClientId = shopwp.general.customersClientId
const apiCustomerApiClientId = "30243aa5-17c1-465a-8493-944bcc4e88aa"
const apiVersion = shopwp.connection.storefront.apiVersion
const apiScopesUrl = "https://api.customers.com/auth/customer.graphql"
const apiRedirectUrl = shopwp.general.customersRedirectUrl

import to from "await-to-js"

import {
  generateNonce,
  generateState,
  generateCodeChallenge,
  generateCodeVerifier,
} from "./utils"

import { updatePaymentMethod, updateCustomer } from "@shopwp/api"

function createLogoutURL(id_token) {
  return `${apiUrlPrefix}/auth/logout?id_token_hint=${id_token}`
}

function contractSchema() {
  return `id
    lastPaymentStatus
    nextBillingDate
    createdAt
    originOrder {
      id
      name
      totalPrice {
        amount
      }
      lineItems(first: 20) {
        edges {
          node {
            id
            name
            title
            productId
            variantTitle
          }
        }
      }
    }
    status
    upcomingBillingCycles(first: 1) {
      edges {
        node {
          billingAttemptExpectedDate
          cycleEndAt
          cycleIndex
          cycleStartAt
          edited
          skipped
          status
        }
      }
    }`
}

function subscriptionContractRenew(variables) {
  var qu = `mutation subscriptionContractActivate($subscriptionContractId: ID!) {
    subscriptionContractActivate(subscriptionContractId: $subscriptionContractId) {
      contract {
        ${contractSchema()}
      }
    }
  }`

  return customerRequest(qu, variables)
}

function subscriptionContractPause(variables) {
  return customerRequest(
    `mutation subscriptionContractPause($subscriptionContractId: ID!) {
    subscriptionContractPause(subscriptionContractId: $subscriptionContractId) {
      contract {
        ${contractSchema()}
      }
    }
  }`,
    variables
  )
}

function subscriptionContractCancel(variables) {
  return customerRequest(
    `mutation subscriptionContractCancel($subscriptionContractId: ID!) {
    subscriptionContractCancel(subscriptionContractId: $subscriptionContractId) {
      contract {
        ${contractSchema()}
      }
    }
  }`,
    variables
  )
}

function customerSchema(identifiers = "[]") {
  return `customer {
    creationDate
    defaultAddress {
      address1
      address2
      city
      company
      country
      firstName
      formatted
      id
      phoneNumber
      province
      territoryCode
      zip
      zoneCode
    } 
    firstName
    lastName
    displayName
    id
    imageUrl
    emailAddress { 
      emailAddress
      marketingState
    }
    lastIncompleteCheckout {
      id
      note
      totalPrice {
        amount
        currencyCode
      }
    }
    metafields(identifiers:${identifiers}) { 
      type 
      namespace 
      key 
      value
    }
    phoneNumber {
      marketingState
      phoneNumber
    }
    tags
    orders(first: 30) {
      edges {
        node {
          id
          confirmationNumber
          createdAt
          financialStatus
          name
          note
          number
          statusPageUrl
          subtotal {
            amount
          }
          totalPrice {
            amount
          }
          processedAt
          refunds {
            totalRefunded {
              amount
              currencyCode
            }
          }
          paymentInformation {
            paymentCollectionUrl
            paymentStatus
            paymentTerms {
              nextDueAt
            }
            totalPaidAmount {
              amount
              currencyCode
            }
          }
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 250) {
            edges {
              node {
                id
                image {
                  url
                  altText
                  src
                  width
                  height
                }
                name
                presentmentTitle
                productType
                quantity
                title
                variantTitle
              }
            }
          }
        }
      }
    }
    subscriptionContracts(first: 30) {
      edges {
        node {
          ${contractSchema()}
        }
      }
    }
  }`
}

async function fetchCustomer(identifiers = "[]") {
  return customerRequest(`
      query {
				${customerSchema(identifiers)}
      }
		`)
}

function obtainAccessToken() {
  return new Promise((resolve, reject) => {
    const allParams = window.location.search

    if (!allParams) {
      return reject("No params found, show login button")
    }
    var searchParams = new URLSearchParams(allParams)
    const code = searchParams.get("code")

    const body = new URLSearchParams()

    body.append("grant_type", "authorization_code")
    body.append("client_id", apiClientId)
    body.append("redirect_uri", shopwp.general.customersRedirectUrl)
    body.append("code", code)

    // Public Client
    const codeVerifier = sessionStorage.getItem("swp-code-verifier")

    body.append("code_verifier", codeVerifier)

    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    }

    fetch(`${apiUrlPrefix}/auth/oauth/token`, {
      method: "POST",
      headers: headers,
      body,
    })
      .then((response) => {
        return response.json()
      })
      .then((err) => {
        if (err.error) {
          return reject(err.error_description)
        }

        if (err?.expires_in) {
          return resolve(err)
        }
      })
      .catch((error) => {
        return reject(error)
      })
  })
}

async function refreshToken() {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams()
    const refreshToken = sessionStorage.getItem("swpCustomerRefreshToken")

    if (!refreshToken) {
      reject("No refresh token found")
    }

    body.append("grant_type", "refresh_token")
    body.append("client_id", apiClientId)
    body.append("refresh_token", refreshToken)

    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    }

    var options = {
      method: "POST",
      headers: headers,
      body,
    }

    fetch(`${apiUrlPrefix}/auth/oauth/token`, options)
      .then((response) => {
        return response.json()
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

async function customerRequest(query, variables = false) {
  return new Promise(async (resolve, reject) => {
    const accessToken = sessionStorage.getItem("swpCustomerAccessToken")

    var temp = {
      query: query,
    }

    if (variables) {
      temp.variables = variables
    }

    let allOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(temp),
    }

    try {
      const result = await fetch(
        `${apiUrlPrefix}/account/customer/api/${apiVersion}/graphql`,
        allOptions
      )
      const data = await result.json()

      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

function exchangeForAccessToken(tempAccessToken) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams()

    body.append("grant_type", "urn:ietf:params:oauth:grant-type:token-exchange")
    body.append("client_id", apiClientId)
    body.append("audience", apiCustomerApiClientId)
    body.append("subject_token", tempAccessToken)
    body.append(
      "subject_token_type",
      "urn:ietf:params:oauth:token-type:access_token"
    )
    body.append("scopes", apiScopesUrl)
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    }

    fetch(`${apiUrlPrefix}/auth/oauth/token`, {
      method: "POST",
      headers: headers,
      body,
    })
      .then((response) => {
        return response.json()
      })
      .then((resp) => {
        if (resp.error) {
          resolve(resp.error)
        } else {
          resolve(resp)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

async function startLoginFlow() {
  const uniqueState = generateState()
  const nonce = generateNonce(20)

  const authorizationRequestUrl = new URL(
    `${apiUrlPrefix}/auth/oauth/authorize`
  )

  authorizationRequestUrl.searchParams.append(
    "scope",
    `openid email ${apiScopesUrl}`
  )
  authorizationRequestUrl.searchParams.append("client_id", apiClientId)
  authorizationRequestUrl.searchParams.append("response_type", "code")
  authorizationRequestUrl.searchParams.append("redirect_uri", apiRedirectUrl)
  authorizationRequestUrl.searchParams.append("state", uniqueState)
  authorizationRequestUrl.searchParams.append("nonce", nonce)

  // Public client
  const verifier = await generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)

  sessionStorage.setItem("swp-code-verifier", verifier)

  authorizationRequestUrl.searchParams.append("code_challenge", challenge)
  authorizationRequestUrl.searchParams.append("code_challenge_method", "S256")

  window.location.href = authorizationRequestUrl.toString()
}

function resetTokens() {
  sessionStorage.removeItem("swpCustomerAccessToken")
  sessionStorage.removeItem("swpCustomerRefreshToken")
  sessionStorage.removeItem("swpCustomerIdToken")
  sessionStorage.removeItem("swpCustomerData")
}

async function loadCustomer(accountState, accountDispatch) {
  accountDispatch({
    type: "SET_IS_WORKING",
    payload: true,
  })

  const [error, data] = await to(
    fetchCustomer(accountState.metafieldIdentifiers)
  )

  if (data.errors) {
    const [error, stuff] = await to(refreshToken())

    if (error) {
      resetTokens()
      return
    } else {
      sessionStorage.setItem("swpCustomerAccessToken", stuff.access_token)
      sessionStorage.setItem("swpCustomerRefreshToken", stuff.refresh_token)

      const [errorAgain, dataAgain] = await to(
        fetchCustomer(accountState.metafieldIdentifiers)
      )

      if (errorAgain || dataAgain.errors) {
        resetTokens()
        accountDispatch({
          type: "SET_NOTICE",
          payload: {
            type: "error",
            message: errorAgain
              ? JSON.stringify(errorAgain)
              : JSON.stringify(dataAgain.errors[0]),
          },
        })
      } else {
        accountDispatch({
          type: "SET_CUSTOMER",
          payload: dataAgain.data.customer,
        })
      }
    }
  } else {
    accountDispatch({
      type: "SET_CUSTOMER",
      payload: data.data.customer,
    })
  }

  // sessionStorage.setItem("swpCustomerData", JSON.stringify(data.data.customer))

  accountDispatch({
    type: "SET_IS_WORKING",
    payload: false,
  })

  accountDispatch({
    type: "SET_IS_BOOTSTRAPPING",
    payload: false,
  })
}

function cancelSubscription(subscription) {
  return new Promise((resolve, reject) => {
    subscriptionContractCancel({
      subscriptionContractId: subscription.id,
    })
      .then((resp) => {
        if (resp.errors) {
          if (resp.errors.length) {
            reject("Error: " + resp.errors[0].message)
          }
        }
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function renewSubscription(subscription) {
  return new Promise((resolve, reject) => {
    subscriptionContractRenew({
      subscriptionContractId: subscription.id,
    })
      .then((resp) => {
        if (resp.errors) {
          if (resp.errors.length) {
            reject("Error: " + resp.errors[0].message)
          }
        }
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function pauseSubscription(subscription) {
  return new Promise((resolve, reject) => {
    subscriptionContractPause({
      subscriptionContractId: subscription.id,
    })
      .then((resp) => {
        if (resp.errors) {
          if (resp.errors.length) {
            reject("Error: " + resp.errors[0].message)
          }
        }
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function updateSubscriptionPaymentMethod(customerId) {
  return new Promise((resolve, reject) => {
    updatePaymentMethod({
      customerId: customerId,
    })
      .then((resp) => {
        if (resp.errors) {
          if (resp.errors.length) {
            reject("Error: " + resp.errors[0].message)
          }
        }
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function updateShopifyCustomer(customerInput) {
  return new Promise((resolve, reject) => {
    updateCustomer({
      customerInput: customerInput,
    })
      .then((resp) => {
        if (resp.errors) {
          if (resp.errors.length) {
            reject("Error: " + resp.errors[0].message)
          }
        }
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export {
  fetchCustomer,
  startLoginFlow,
  obtainAccessToken,
  customerRequest,
  refreshToken,
  exchangeForAccessToken,
  createLogoutURL,
  resetTokens,
  loadCustomer,
  cancelSubscription,
  renewSubscription,
  pauseSubscription,
  updateSubscriptionPaymentMethod,
  updateShopifyCustomer,
}
