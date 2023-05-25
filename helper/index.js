const TruncateString = ({ str, num }) => {
    if (str.length > num) {
        return str.slice(0, num) + "..."
    } else {
        return str
    }
}

export const CheckAuthentication = async () => {
    let auth
    let zID = localStorage.getItem("zId")
    let status = localStorage.getItem("status")
    let username = localStorage.getItem("username")
    if (status && username) {
        auth = true
    } else {
        auth = false
    }
    return auth
}

export const GetLocalStorageAuth = () => {
    let JSONAuth = {
        zId: "",
        username: "",
        status: "",
        is_api_key_valid: ""
    }
    if (CheckAuthentication()) {
        JSONAuth.zId = localStorage.getItem("zId")
        JSONAuth.username = localStorage.getItem("username")
        JSONAuth.status = localStorage.getItem("status")
        JSONAuth.is_api_key_valid = process.env.NEXT_PUBLIC_IS_API_KEY_VALID
    } else {
        JSONAuth = null
    }

    return JSONAuth
}

export const GetBase64 = function (file) {
    return new Promise((resolve) => {
        let baseURL = ""
        // Make new FileReader
        const reader = new FileReader()
        // Convert the file to base64 text
        reader.readAsDataURL(file)
        // on reader load somthing...
        reader.onload = () => {
            baseURL = reader.result !== null ? reader.result : ""
            resolve(baseURL)
        }
    })
}

export const getFullDay = (i) => {
    const Days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let fullDay
    Days.map((item) => {
        if (item.startsWith(i)) {
            fullDay = item
        }
    })
    return fullDay
}

export default TruncateString
