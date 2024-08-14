async function generateCodeVerifier() {
  const rando = generateRandomCode()

  return base64UrlEncode(rando)
}

async function generateCodeChallenge(codeVerifier) {
  const digestOp = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(codeVerifier)
  )
  const hash = convertBufferToString(digestOp)
  return base64UrlEncode(hash)
}

function generateRandomCode() {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return String.fromCharCode.apply(null, Array.from(arr))
}

function base64UrlEncode(str) {
  const base64 = btoa(str)

  // This is to ensure that the encoding does not have +, /, or = characters in it.
  var finalString = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  return finalString
}

function convertBufferToString(hash) {
  const uintArray = new Uint8Array(hash)
  const numberArray = Array.from(uintArray)
  return String.fromCharCode(...numberArray)
}

async function generateState() {
  const timestamp = Date.now().toString()
  const randomString = Math.random().toString(36).substring(2)
  return timestamp + randomString
}

async function generateNonce(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let nonce = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    nonce += characters.charAt(randomIndex)
  }

  return nonce
}

function findIdentifiersFromOrders(orders) {
  if (!orders.edges.length) {
    return false
  }

  var namespaces = orders.edges.reduce((prevVal, order) => {
    var finalKeys = []

    // [{ namespace: "shopwp", key: "license" }]

    order.node.lineItems.edges.forEach((lineItem) => {
      if (order.node.confirmationNumber) {
        finalKeys.push(
          "swp_" + order.node.confirmationNumber + "_" + lineItem.node.id
        )
      }
    })

    prevVal.push(finalKeys)

    return prevVal
  }, [])

  var namespacesFlattened = namespaces.flat()

  var identifiers = namespacesFlattened.reduce((prevVal, namespace) => {
    return prevVal + `{ namespace: "${namespace}", key: "license" },`
  }, "")

  identifiers = "[" + identifiers + "]"

  return identifiers
}

function onlyRealMetafields(customer) {
  var allTruthyMetafields = customer.metafields.filter(Boolean)

  if (allTruthyMetafields.length) {
    return allTruthyMetafields
  }

  return false
}

function onlyLicensesMetafields(metafields) {
  if (!metafields) {
    return false
  }

  var license = metafields.filter(
    (metafield) =>
      metafield.key === "licenses" && metafield.namespace === "shopwp"
  )

  if (license.length) {
    return JSON.parse(license[0].value)
  } else {
    return false
  }
}

function onlyUniqueDownloads(licenses) {
  if (!licenses) {
    return false
  }

  const unique = [
    ...new Map(
      licenses.map((license) => [license.licenseName, license])
    ).values(),
  ]

  return unique
}

export {
  generateNonce,
  generateState,
  convertBufferToString,
  base64UrlEncode,
  generateRandomCode,
  generateCodeChallenge,
  generateCodeVerifier,
  findIdentifiersFromOrders,
  onlyRealMetafields,
  onlyLicensesMetafields,
  onlyUniqueDownloads,
}
