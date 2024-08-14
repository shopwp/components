import { updateShopifyCustomer, fetchCustomer } from "../api"
import { maybeHandleApiError } from "@shopwp/api"
import { useAccountState, useAccountDispatch } from "../_state/hooks"
import Popover from "../popover"
import to from "await-to-js"
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"

function PopoverProfile({ isEditing, setIsEditing, isWorking, setIsWorking }) {
  const accountState = useAccountState()
  const accountDispatch = useAccountDispatch()

  return (
    <Popover
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      customer={accountState.customer}
      accountDispatch={accountDispatch}
      isWorking={isWorking}
      setIsWorking={setIsWorking}
      heading="Edit Profile"
      triggerText="Edit"
    >
      <AccountForm
        customer={accountState.customer}
        isWorking={isWorking}
        setIsWorking={setIsWorking}
        accountDispatch={accountDispatch}
        setIsEditing={setIsEditing}
      />
    </Popover>
  )
}

function AccountForm({
  customer,
  accountDispatch,
  isWorking,
  setIsWorking,
  setIsEditing,
}) {
  const { useState } = wp.element
  const [firstName, setFirstName] = useState(
    customer.firstName ? customer.firstName : ""
  )
  const [lastName, setLastName] = useState(
    customer.lastName ? customer.lastName : ""
  )
  const [phone, setPhone] = useState(
    customer.phoneNumber ? customer.phoneNumber.phoneNumber : ""
  )
  const [email, setEmail] = useState(
    customer.emailAddress.emailAddress ? customer.emailAddress.emailAddress : ""
  )
  const [address1, setAddress1] = useState(
    customer.defaultAddress.address1 ? customer.defaultAddress.address1 : ""
  )
  const [address2, setAddress2] = useState(
    customer.defaultAddress.address2 ? customer.defaultAddress.address2 : ""
  )
  const [city, setCity] = useState(
    customer.defaultAddress.city ? customer.defaultAddress.city : ""
  )
  const [country, setCountry] = useState(() => {
    return customer.defaultAddress.territoryCode
  })

  const [zip, setZip] = useState(
    customer.defaultAddress.zip ? customer.defaultAddress.zip : ""
  )
  const [region, setRegion] = useState(
    customer.defaultAddress.zoneCode ? customer.defaultAddress.zoneCode : ""
  )

  const [company, setCompany] = useState(
    customer.defaultAddress.company ? customer.defaultAddress.company : ""
  )

  const [newsLetterConsent, setNewsLetterConsent] = useState(
    customer.emailAddress.marketingState === "SUBSCRIBED"
  )

  const [requiredFields, setRequiredFields] = useState([])

  async function onSubmit(e) {
    e.preventDefault()

    setIsWorking(true)
    accountDispatch({
      type: "SET_IS_WORKING",
      payload: true,
    })

    var dataToSend = {
      id: customer.id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      emailMarketingConsent: {
        existingValue: customer.emailAddress.marketingState,
        newValue: newsLetterConsent ? "SUBSCRIBED" : false,
      },
      addresses: [
        {
          company: company,
          address1: address1,
          address2: address2,
          city: city,
          countryCode: country,
          provinceCode: region,
          zip: zip,
        },
      ],
    }

    const [error, resp] = await to(updateShopifyCustomer(dataToSend))

    const maybeError = maybeHandleApiError(error, resp)

    if (maybeError) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: maybeError,
        },
      })

      setIsEditing(false)
      setIsWorking(false)
      accountDispatch({
        type: "SET_IS_WORKING",
        payload: false,
      })

      return
    }

    const [customerFetchError, customerFetchData] = await to(fetchCustomer())

    setIsEditing(false)
    setIsWorking(false)

    accountDispatch({
      type: "SET_IS_WORKING",
      payload: false,
    })

    const maybeFetchError = maybeHandleApiError(
      customerFetchError,
      customerFetchData
    )

    if (maybeFetchError) {
      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: maybeFetchError,
        },
      })
    } else {
      accountDispatch({
        type: "SET_CUSTOMER",
        payload: customerFetchData.data.customer,
      })

      accountDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "success",
          message: "Successfully updated profile.",
        },
      })
    }
  }

  function checkRequired(value, type) {
    if (value && value !== "") {
      var newArr = requiredFields.filter(function (item) {
        return item !== type
      })

      setRequiredFields(newArr)
      return value
    }

    setRequiredFields([...requiredFields, type])
    return value
  }

  return (
    <form
      className="swp-account-form"
      onSubmit={onSubmit}
      data-status={isWorking}
    >
      <div className="swp-account-form-group">
        <h3>Info</h3>
        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="firstname">First name:</label>
          <input
            type="text"
            disabled={isWorking}
            id="firstname"
            name="firstname"
            data-is-valid={!requiredFields.includes("firstName")}
            value={firstName}
            onChange={(v) =>
              setFirstName(checkRequired(v.target.value, "firstName"))
            }
            required
          />
          {requiredFields.includes("firstName") ? (
            <span className="swp-account-input-required">Required</span>
          ) : null}
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="lastname">Last name:</label>
          <input
            disabled={isWorking}
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={(v) => setLastName(v.target.value)}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="phone">Phone:</label>
          <input
            disabled={isWorking}
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(v) => setPhone(v.target.value)}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="email">Email:</label>
          <input
            disabled={isWorking}
            type="email"
            id="email"
            name="email"
            value={email}
            data-is-valid={!requiredFields.includes("email")}
            onChange={(v) => setEmail(checkRequired(v.target.value, "email"))}
            required
          />

          {requiredFields.includes("email") ? (
            <span className="swp-account-input-required">Required</span>
          ) : null}
        </div>
      </div>

      <div className="swp-account-form-group">
        <h3>Address</h3>
        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="company">Company:</label>
          <input
            disabled={isWorking}
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={(v) => setCompany(v.target.value)}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="address1">Address 1:</label>
          <input
            disabled={isWorking}
            type="text"
            id="address1"
            name="address1"
            value={address1}
            onChange={(v) => setAddress1(v.target.value)}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="address2">Address 2:</label>
          <input
            disabled={isWorking}
            type="text"
            id="address2"
            name="address2"
            value={address2}
            onChange={(v) => setAddress2(v.target.value)}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="country">Country:</label>
          <SelectInput
            country={country}
            setCountry={setCountry}
            region={region}
            setRegion={setRegion}
            isWorking={isWorking}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="city">City:</label>
          <input
            disabled={isWorking}
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(v) => setCity(v.target.value)}
          />
        </div>

        <div className="swp-account-input-group swp-l-row">
          <label htmlFor="zip">Zip:</label>
          <input
            disabled={isWorking}
            type="number"
            id="zip"
            name="zip"
            value={zip}
            onChange={(v) => setZip(v.target.value)}
          />
        </div>
      </div>

      <div className="swp-account-form-group">
        <div className="swp-account-input-newsletter swp-account-input-group swp-account-input-group swp-account-input-group-shifted swp-l-row">
          <input
            type="checkbox"
            disabled={isWorking}
            name="newsLetterConsent"
            id="newsLetterConsent"
            onChange={(v) => {
              setNewsLetterConsent(!newsLetterConsent)
            }}
            checked={newsLetterConsent}
          ></input>
          <label htmlFor="newsLetterConsent">
            Add me to the ShopWP newsletter
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="swp-btn-account-secondary"
        disabled={isWorking}
      >
        {isWorking ? (
          <span className="swp-account-icon-loading swp-account-icon-left">
            Saving, please wait ...
          </span>
        ) : (
          "Save profile"
        )}
      </button>
    </form>
  )
}

function SelectInput({ country, setCountry, region, setRegion, isWorking }) {
  return (
    <div className="swp-l-row-no-wrap swp-l-flex swp-l-row-between">
      <CountryDropdown
        value={country}
        onChange={(val) => setCountry(val)}
        classes="swp-l-width49"
        disabled={isWorking}
        priorityOptions={["US"]}
        valueType="short"
      />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => setRegion(val)}
        classes="swp-l-width49"
        countryValueType="short"
        valueType="short"
        disabled={isWorking}
      />
    </div>
  )
}

export default PopoverProfile
