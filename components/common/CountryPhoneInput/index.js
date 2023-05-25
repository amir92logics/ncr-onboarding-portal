import React from "react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import theme from "../../../src/theme"
import { isValidPhoneNumber } from "react-phone-number-input"
import CustomPhoneNumber from "../PhoneNumber"
function Index({
    disabled,
    value,
    onChange,
    error,
    name
}) {
    return (
        <PhoneInput
            defaultCountry="US"
            disabled={disabled}
            name={name}
            error={error}
            value={value}
            onChange={onChange}
            inputComponent={CustomPhoneNumber}
        />
    )
}

export default Index
