import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    Divider,
    Tab,
    Typography
} from "@mui/material"
import SelectBox from "../../../common/SelectBox"
import theme from "../../../../src/theme"
import Input from "../../../common/Input"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import CountryPhoneInput from "../../../common/CountryPhoneInput"
import { isValidPhoneNumber } from "react-phone-number-input"

export default function ContactsPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp,
    modalInfo,
    id,
    Title,
    primarydata,
    page,
    edit,
    primary,
    contactsData,
    title,
    setNotify,
    setNotify2
}) {
    const [_modalData, setModalData] = useState([])

    const [errorr, setErro] = useState(false)
    const [sho, setSho] = useState(false)
    const [contactsDetails, setContactsDetails] = useState("")
    const [err, setErr] = useState(true)
    const [error, setError] = useState({
        name: false,
        email: false,
        phone: false
    })

    const [enable, setDisable] = useState(false)
    const [newValue, setNewValue] = useState({
        name: "interface",
        value: ""
    })
    const handleClose = (value) => {
        handleTogglePopUp(value, [])
        setDisable(false)
    }
    const handleChange = (e, index, info) => {
        const clonedData = [..._modalData]

        let thiscontact = edit
            ? contactsData.find((it) => it.id == id)
            : {
                  name: "",
                  email: "",
                  phone: ""
              }
        let names = contactsData.map((it) => it.name)
        let phones = contactsData.map((it) => it.phone)
        let emails = contactsData.map((it) => it.email)
        if (info.Name == "CellPhone") {
            if (e) {
                isValidPhoneNumber(e) ? setErro(false) : setErro(true)
            } else {
                setErro(false)
            }

            clonedData[index][e] = e
            clonedData[index]["val"] = e
            if (phones.includes(e) && thiscontact.phone != e) {
                setError({ ...error, phone: true })
                setNotify("phone")
                setNotify2(true)
            } else {
                setError({ ...error, phone: false })
            }
        } else if (info.Name == "Email") {
            clonedData[index][e.target.name] = e.target.value
            clonedData[index]["val"] = e.target.value
            e.target.name == "Email" &&
            e.target.value.includes("@") &&
            e.target.value.split("@")[1].includes(".")
                ? setErr(true)
                : setErr(false)
            if (
                emails.includes(e.target.value) &&
                thiscontact.email !== e.target.value
            ) {
                setError({ ...error, email: true })
                setNotify("email")
                setNotify2(true)
            } else {
                setError({ ...error, email: false })
            }
        } else {
            clonedData[index][e.target.name] = e.target.value
            clonedData[index]["val"] = e.target.value
            if (
                names.includes(e.target.value) &&
                thiscontact.name != e.target.value
            ) {
                setError({ ...error, name: true })
                setNotify("name")
                setNotify2(true)
            } else {
                setError({ ...error, name: false })
            }
        }

        setModalData(clonedData)
    }
    let val1 = _modalData?.filter((item) => item.val === "")

    const handleSubmit = (e) => {
        e.preventDefault()
        handleClose(false)
        handleSubmitPopUp(_modalData)

        setModalData([])
        handleClose(false)
    }
    useEffect(() => {
        if (page) {
            setNewValue({ name: "interface", value: "" })
            let sameContact = contactsData.filter((it) => it.type != title)
            let thisContat = contactsData.filter((it) => it.type == title)
            let preprepre2 = thisContat.map((it) => it.name)

            let tempData = sameContact.map((it) => it.name)
            let newData = [...new Set(tempData)]
            let anothertemp = newData.filter((it) => !preprepre2.includes(it))
            let temp2 = anothertemp.map((it) => {
                return { label: it, value: it }
            })

            setContactsDetails(temp2)
        }

        setModalData(modalInfo)
    }, [modalInfo])

    const handleOption = (e) => {
        if (e.target.checked) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }
    const handleChange3 = (value, i) => {
        let thiscontact = contactsData.find((it) => it.name == i)
        let tempmodaldata = [
            {
                Name: "name",
                fieldPlaceHolder: i == primary ? "Primary" : "Enter Name",
                name: thiscontact.name,
                type: "text",
                val: thiscontact.name
            },
            {
                Name: "CellPhone",
                fieldPlaceHolder: "Contact Phone",
                CellPhone: thiscontact.phone,
                type: "number",
                val: thiscontact.phone
            },
            {
                Name: "Email",
                fieldPlaceHolder: "Contact Email",
                Email: thiscontact.email,
                type: "email",
                val: thiscontact.email
            }
        ]
        setModalData(tempmodaldata)
        setNewValue({ name: "interface", value: i })

        setSho(true)
    }
    const [value, setValue] = useState("1")
    const handleTabChange = (newValue) => {
        setValue(newValue)
    }

    return (
        <>
            {modalInfo.length === 2 || edit ? (
                <Box>
                    <Dialog
                        className="customer-survey-popup"
                        sx={{
                            "& div[role='dialog']": {
                                borderTopRightRadius: {
                                    md: 0,
                                    xs: "4px !important"
                                },
                                borderTopLeftRadius: {
                                    md: 0,
                                    xs: "4px !important"
                                },
                                borderBottomRightRadius: {
                                    md: 0,
                                    xs: "0px !important"
                                },
                                borderBottomLeftRadius: {
                                    md: 0,
                                    xs: "0px !important"
                                },
                                borderRadius: { md: "4px !important" }
                            }
                        }}
                        open={showPopUp}
                        onClose={() => {
                            handleClose(false)
                        }}
                    >
                        {page && (
                            <Box
                                onClick={() => {
                                    handleClose(false)
                                }}
                                sx={{
                                    position: "absolute",
                                    right: "0px",
                                    padding: "16px",
                                    paddingRight: "20px",
                                    cursor: "pointer",
                                    zIndex: 2
                                }}
                            >
                                <svg
                                    width={14}
                                    height={12}
                                    viewBox="0 0 14 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is close popup icon</title>
                                    <path
                                        d="M1.04145 10.2697C0.638134 10.647 0.617041 11.2798 0.994338 11.6832C1.37164 12.0865 2.00445 12.1076 2.40777 11.7303L1.04145 10.2697ZM7.75259 6.73027C8.15591 6.35297 8.17701 5.72016 7.79971 5.31684C7.42241 4.91353 6.7896 4.89243 6.38628 5.26973L7.75259 6.73027ZM6.38628 5.26973C5.98296 5.64703 5.96187 6.27984 6.33917 6.68316C6.71646 7.08647 7.34928 7.10757 7.75259 6.73027L6.38628 5.26973ZM13.0974 1.73027C13.5007 1.35297 13.5218 0.720161 13.1445 0.316843C12.7672 -0.0864749 12.1344 -0.107569 11.7311 0.269729L13.0974 1.73027ZM7.75259 5.26973C7.34928 4.89243 6.71646 4.91353 6.33917 5.31684C5.96187 5.72016 5.98296 6.35297 6.38628 6.73027L7.75259 5.26973ZM11.7311 11.7303C12.1344 12.1076 12.7672 12.0865 13.1445 11.6832C13.5218 11.2798 13.5007 10.647 13.0974 10.2697L11.7311 11.7303ZM6.38628 6.73027C6.7896 7.10757 7.42241 7.08647 7.79971 6.68316C8.17701 6.27984 8.15591 5.64703 7.75259 5.26973L6.38628 6.73027ZM2.40777 0.269729C2.00445 -0.107569 1.37164 -0.0864749 0.994338 0.316843C0.617041 0.720161 0.638134 1.35297 1.04145 1.73027L2.40777 0.269729ZM2.40777 11.7303L7.75259 6.73027L6.38628 5.26973L1.04145 10.2697L2.40777 11.7303ZM7.75259 6.73027L13.0974 1.73027L11.7311 0.269729L6.38628 5.26973L7.75259 6.73027ZM6.38628 6.73027L11.7311 11.7303L13.0974 10.2697L7.75259 5.26973L6.38628 6.73027ZM7.75259 5.26973L2.40777 0.269729L1.04145 1.73027L6.38628 6.73027L7.75259 5.26973Z"
                                        fill="#5C5C5C"
                                    />
                                </svg>
                            </Box>
                        )}
                        <DialogContent
                            sx={{
                                padding: {
                                    md: "  32px",

                                    xs: "24px"
                                },
                                mt: "20px",
                                width: {
                                    xs: "100%",
                                    md: "560px"
                                }
                            }}
                        >
                            <form
                                aria-label={`This is contacts form`}
                                onSubmit={(e) => handleSubmit(e)}
                                width={"100%"}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: { md: "100%", xs: "100%" },
                                        alignItems: "flex-start",
                                        marginTop: "",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: "left",
                                            fontFamily: "inter",
                                            mt: "14px",
                                            fontSize: {
                                                lg: "24px",
                                                xs: "24px"
                                            },
                                            lineHeight: {
                                                lg: "32px",
                                                xs: "32px"
                                            },
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        {page && modalInfo.length === 2
                                            ? "Edit Primary Contact"
                                            : edit
                                            ? "Edit Contact"
                                            : Title?.title}
                                    </Typography>
                                    {page && (
                                        <Divider
                                            className="divider-col"
                                            sx={{ width: "100%", my: "8px" }}
                                        />
                                    )}

                                    {page && modalInfo.length === 2 && (
                                        <>
                                            <Input
                                                ariaLabel="This is a contact name input"
                                                disabled={true}
                                                fullWidth={true}
                                                id="id-address"
                                                className="ncr-new-input"
                                                label={"Contact Name"}
                                                sx={{ mt: "8px" }}
                                                inputProps={{
                                                    maxLength: 30
                                                }}
                                                name={""}
                                                value={primary}
                                            />
                                            <Input
                                                ariaLabel="This is a contact role input"
                                                disabled={true}
                                                fullWidth={true}
                                                id="id-address"
                                                className="ncr-new-input"
                                                label={"Contact Role"}
                                                sx={{ mt: "16px" }}
                                                inputProps={{
                                                    maxLength: 30
                                                }}
                                                name={""}
                                                value={"Primary Contact"}
                                            />
                                        </>
                                    )}
                                    {_modalData?.length !== 0
                                        ? _modalData?.map((info, index) => {
                                              return (
                                                  <Box
                                                      key={`${info.Name}`}
                                                      sx={{
                                                          width: "100%",

                                                          marginTop: "16px"
                                                      }}
                                                  >
                                                      {info.Name !=
                                                      "CellPhone" ? (
                                                          <Input
                                                              err={
                                                                  info.Name ==
                                                                      "Email" &&
                                                                  !err
                                                              }
                                                              className="ncr-new-input"
                                                              variant="standard"
                                                              ariaLabel={`This is a ${info.fieldPlaceHolder} input`}
                                                              label={
                                                                  info.fieldPlaceHolder
                                                              }
                                                              name={info.Name}
                                                              type={info.type}
                                                              disabled={enable}
                                                              inputProps={{
                                                                  maxLength: 30
                                                              }}
                                                              defaultValue={
                                                                  info.val
                                                              }
                                                              onChange={(e) => {
                                                                  handleChange(
                                                                      e,
                                                                      index,
                                                                      info
                                                                  )
                                                              }}
                                                              value={info.Value}
                                                              fullWidth={true}
                                                          />
                                                      ) : (
                                                          <Box>
                                                              <CountryPhoneInput
                                                                  international
                                                                  placeholder="Contact Number"
                                                                  error={errorr}
                                                                  style={{
                                                                      display:
                                                                          "flex",
                                                                      flexDirection:
                                                                          "row"
                                                                  }}
                                                                  defaultCountry="US"
                                                                  value={
                                                                      info.val
                                                                  }
                                                                  onChange={(
                                                                      e
                                                                  ) => {
                                                                      handleChange(
                                                                          e,
                                                                          index,
                                                                          info
                                                                      )
                                                                  }}
                                                              />
                                                          </Box>
                                                      )}
                                                  </Box>
                                              )
                                          })
                                        : ""}

                                    <Box
                                        paddingTop={"32px"}
                                        display="flex"
                                        width="100%"
                                        justifyContent="flex-end"
                                        sx={{
                                            flexDirection: {
                                                md: "row",
                                                xs: "column"
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",

                                                justifyContent: "flex-end",
                                                flexDirection: {
                                                    md: "row",
                                                    xs: "column"
                                                },
                                                pb: { md: 0, xs: 6 }
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    handleClose(false)
                                                }}
                                                className="back-button"
                                                variant="text"
                                                aria-label="This is a cancel button"
                                                sx={{
                                                    marginRight: "0px",
                                                    padding: "12px 20px",
                                                    fontWeight: 600,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px"
                                                    },
                                                    border: "none !important",
                                                    mr: "8px",
                                                    "&:hover": {
                                                        border: "none !important",
                                                        background:
                                                            "#F5F6FF !important"
                                                    },

                                                    lineHeight: {
                                                        md: "24px",
                                                        xs: "18px"
                                                    },
                                                    color: "#5C5C5C"
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                role="button"
                                                aria-label={`This is ${
                                                    page ? "add" : "confirm"
                                                } button`}
                                                className="next-button"
                                                disabled={
                                                    error.name ||
                                                    error.email ||
                                                    error.phone ||
                                                    val1.length > 0 ||
                                                    !err ||
                                                    errorr ||
                                                    !_modalData[0]?.val
                                                }
                                                variant="contained"
                                                sx={{
                                                    mt: { md: 0, xs: 2 },
                                                    padding: "12px 20px",
                                                    fontWeight: 600,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px"
                                                    },
                                                    lineHeight: {
                                                        md: "24px",
                                                        xs: "18px"
                                                    },
                                                    color: "white"
                                                }}
                                            >
                                                {page ? "   Add" : "Confirm"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </DialogContent>
                    </Dialog>
                </Box>
            ) : (
                <Box>
                    <Dialog
                        className="cont-popup"
                        sx={{
                            "& div[role='dialog']": {
                                borderTopRightRadius: {
                                    md: 0,
                                    xs: "4px !important"
                                },
                                borderTopLeftRadius: {
                                    md: 0,
                                    xs: "4px !important"
                                },
                                borderBottomRightRadius: {
                                    md: 0,
                                    xs: "0px !important"
                                },
                                borderBottomLeftRadius: {
                                    md: 0,
                                    xs: "0px !important"
                                },
                                borderRadius: { md: "4px !important" }
                            }
                        }}
                        open={showPopUp}
                        onClose={() => {
                            handleClose(false)
                        }}
                    >
                        {page && (
                            <Box
                                onClick={() => {
                                    handleClose(false)
                                }}
                                sx={{
                                    position: "absolute",
                                    right: "0px",
                                    padding: "16px",
                                    paddingRight: "20px",
                                    cursor: "pointer",
                                    zIndex: 2
                                }}
                            >
                                <svg
                                    width={14}
                                    height={12}
                                    viewBox="0 0 14 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is close popup icon</title>
                                    <path
                                        d="M1.04145 10.2697C0.638134 10.647 0.617041 11.2798 0.994338 11.6832C1.37164 12.0865 2.00445 12.1076 2.40777 11.7303L1.04145 10.2697ZM7.75259 6.73027C8.15591 6.35297 8.17701 5.72016 7.79971 5.31684C7.42241 4.91353 6.7896 4.89243 6.38628 5.26973L7.75259 6.73027ZM6.38628 5.26973C5.98296 5.64703 5.96187 6.27984 6.33917 6.68316C6.71646 7.08647 7.34928 7.10757 7.75259 6.73027L6.38628 5.26973ZM13.0974 1.73027C13.5007 1.35297 13.5218 0.720161 13.1445 0.316843C12.7672 -0.0864749 12.1344 -0.107569 11.7311 0.269729L13.0974 1.73027ZM7.75259 5.26973C7.34928 4.89243 6.71646 4.91353 6.33917 5.31684C5.96187 5.72016 5.98296 6.35297 6.38628 6.73027L7.75259 5.26973ZM11.7311 11.7303C12.1344 12.1076 12.7672 12.0865 13.1445 11.6832C13.5218 11.2798 13.5007 10.647 13.0974 10.2697L11.7311 11.7303ZM6.38628 6.73027C6.7896 7.10757 7.42241 7.08647 7.79971 6.68316C8.17701 6.27984 8.15591 5.64703 7.75259 5.26973L6.38628 6.73027ZM2.40777 0.269729C2.00445 -0.107569 1.37164 -0.0864749 0.994338 0.316843C0.617041 0.720161 0.638134 1.35297 1.04145 1.73027L2.40777 0.269729ZM2.40777 11.7303L7.75259 6.73027L6.38628 5.26973L1.04145 10.2697L2.40777 11.7303ZM7.75259 6.73027L13.0974 1.73027L11.7311 0.269729L6.38628 5.26973L7.75259 6.73027ZM6.38628 6.73027L11.7311 11.7303L13.0974 10.2697L7.75259 5.26973L6.38628 6.73027ZM7.75259 5.26973L2.40777 0.269729L1.04145 1.73027L6.38628 6.73027L7.75259 5.26973Z"
                                        fill="#5C5C5C"
                                    />
                                </svg>
                            </Box>
                        )}
                        <DialogContent
                            value={value}
                            sx={{
                                padding: {
                                    md: "  32px",

                                    xs: " 24px"
                                },
                                mt: "20px",
                                width: {
                                    xs: "100%",
                                    md: "560px"
                                },
                                minHeight: "422px"
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    typography: "body1",
                                    height: "100px"
                                }}
                            >
                                <TabContext
                                    value={value}
                                    sx={{ height: "100%" }}
                                >
                                    <Box>
                                        <TabList
                                            className="signature-tabs"
                                            onChange={() =>
                                                handleTabChange(value)
                                            }
                                            aria-label="lab API tabs example"
                                            sx={{
                                                "& .MuiTabs-indicator": {
                                                    backgroundColor: "#1D4ED8"
                                                },
                                                "& .MuiTab-root.Mui-selected": {
                                                    color: "#1D4ED8"
                                                }
                                            }}
                                        >
                                            <Tab
                                                aria-label="This is add existing contact tab"
                                                sx={{
                                                    fontSize: theme.fontsize.sm,
                                                    textTransform: "initial",
                                                    fontWeight: "600",
                                                    lineHeight: "22px"
                                                }}
                                                label="Add Existing Contact"
                                                value="1"
                                                onClick={() => setValue("1")}
                                            />
                                            <Tab
                                                aria-label="This is add new contact tab"
                                                sx={{
                                                    fontSize: theme.fontsize.sm,
                                                    textTransform: "initial",
                                                    fontWeight: "600",
                                                    lineHeight: "22px"
                                                }}
                                                label="Add new Contact"
                                                value="2"
                                                onClick={() =>
                                                    !sho &&
                                                    !_modalData[1].val &&
                                                    setValue("2")
                                                }
                                            />
                                        </TabList>
                                    </Box>
                                    <TabPanel
                                        sx={{ padding: "unset" }}
                                        value="2"
                                    >
                                        <form
                                        aria-label={`This is contacts form`}
                                            onSubmit={(e) => handleSubmit(e)}
                                            width={"100%"}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    width: {
                                                        md: "100%",
                                                        xs: "100%"
                                                    },
                                                    alignItems: "flex-start",
                                                    marginTop: "",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                {_modalData?.length !== 0
                                                    ? _modalData?.map(
                                                          (info, index) => {
                                                              return (
                                                                  <Box
                                                                      key={`${info.Name}`}
                                                                      sx={{
                                                                          width: "100%",
                                                                          marginBottom:
                                                                              "27px",
                                                                          marginTop:
                                                                              page &&
                                                                              index ===
                                                                                  0 &&
                                                                              "32px"
                                                                      }}
                                                                  >
                                                                      {info.Name ===
                                                                      "CellPhone" ? (
                                                                          <Box
                                                                              sx={{}}
                                                                          >
                                                                              <CountryPhoneInput
                                                                                  international
                                                                                  placeholder="Contact Number"
                                                                                  error={
                                                                                      errorr
                                                                                  }
                                                                                  style={{
                                                                                      display:
                                                                                          "flex",
                                                                                      flexDirection:
                                                                                          "row"
                                                                                  }}
                                                                                  defaultCountry="US"
                                                                                  value={
                                                                                      info.val
                                                                                  }
                                                                                  onChange={(
                                                                                      e
                                                                                  ) => {
                                                                                      handleChange(
                                                                                          e,
                                                                                          index,
                                                                                          info
                                                                                      )
                                                                                  }}
                                                                              />
                                                                          </Box>
                                                                      ) : (
                                                                          <Input
                                                                              ariaLabel={`This is a ${info.fieldPlaceHolder} input`}
                                                                              className="ncr-new-input"
                                                                              variant="standard"
                                                                              label={
                                                                                  info.fieldPlaceHolder
                                                                              }
                                                                              name={
                                                                                  info.Name
                                                                              }
                                                                              err={
                                                                                  info.Name ==
                                                                                      "Email" &&
                                                                                  !err
                                                                              }
                                                                              type={
                                                                                  info.type
                                                                              }
                                                                              inputProps={{
                                                                                  maxLength: 30
                                                                              }}
                                                                              defaultValue={
                                                                                  info.val
                                                                              }
                                                                              onChange={(
                                                                                  e
                                                                              ) => {
                                                                                  handleChange(
                                                                                      e,
                                                                                      index,
                                                                                      info
                                                                                  )
                                                                              }}
                                                                              //   value={
                                                                              //       info.Value
                                                                              //   }
                                                                              fullWidth={
                                                                                  true
                                                                              }
                                                                          />
                                                                      )}
                                                                  </Box>
                                                              )
                                                          }
                                                      )
                                                    : ""}

                                                <Box
                                                    paddingTop={"px"}
                                                    display="flex"
                                                    width="100%"
                                                    justifyContent="flex-end"
                                                    sx={{
                                                        flexDirection: {
                                                            md: "row",
                                                            xs: "column"
                                                        }
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-end",
                                                            flexDirection: {
                                                                md: "row",
                                                                xs: "column"
                                                            },
                                                            width: "100%",
                                                            mt: {
                                                                md: 3,
                                                                xs: 4
                                                            },
                                                            pb: { md: 0, xs: 6 }
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={() => {
                                                                handleClose(
                                                                    false
                                                                )
                                                            }}
                                                            className="back-button"
                                                            variant="text"
                                                            aria-label="This is a cancel button"
                                                            sx={{
                                                                marginRight:
                                                                    "0px",
                                                                padding:
                                                                    "12px 20px",
                                                                fontWeight: 600,
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize: {
                                                                    md: "16px",
                                                                    xs: "14px"
                                                                },
                                                                lineHeight: {
                                                                    md: "24px",
                                                                    xs: "18px"
                                                                },
                                                                border: "none !important",
                                                                mr: "8px",
                                                                "&:hover": {
                                                                    border: "none !important",
                                                                    background:
                                                                        "#F5F6FF !important"
                                                                },

                                                                color: "#5C5C5C"
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            type="submit"
                                                            role="button"
                                                            aria-label={`This is ${
                                                                page
                                                                    ? "add"
                                                                    : "confirm"
                                                            } button`}
                                                            className="next-button"
                                                            disabled={
                                                                error.name ||
                                                                error.email ||
                                                                error.phone ||
                                                                val1.length >
                                                                    0 ||
                                                                !err ||
                                                                errorr ||
                                                                !_modalData[1]
                                                                    ?.val
                                                            }
                                                            variant="contained"
                                                            sx={{
                                                                mt: {
                                                                    md: 0,
                                                                    xs: 2
                                                                },
                                                                padding:
                                                                    "12px 20px",
                                                                fontWeight: 600,
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize: {
                                                                    md: "16px",
                                                                    xs: "14px"
                                                                },
                                                                lineHeight: {
                                                                    md: "24px",
                                                                    xs: "18px"
                                                                },
                                                                color: "white"
                                                            }}
                                                        >
                                                            {page
                                                                ? "   Add"
                                                                : "Confirm"}
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </form>
                                    </TabPanel>
                                    <TabPanel
                                        sx={{
                                            padding: "unset",
                                            height: "100%"
                                        }}
                                        value="1"
                                    >
                                        {page && modalInfo.length > 2 && !edit && (
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <>
                                                    <Box
                                                        sx={{
                                                            mt: "24px",
                                                            mb: "24px"
                                                        }}
                                                    >
                                                        <SelectBox
                                                            ariaLabel={
                                                                "This is select name select box"
                                                            }
                                                            prime={primarydata}
                                                            required={false}
                                                            defaultLabel={
                                                                "Select Name"
                                                            }
                                                            name="select"
                                                            primary={primary}
                                                            disabled={
                                                                contactsDetails.length ==
                                                                0
                                                            }
                                                            page={page}
                                                            initialValue={
                                                                newValue.value
                                                            }
                                                            list={
                                                                contactsDetails ||
                                                                []
                                                            }
                                                            handleChange={
                                                                handleChange3
                                                            }
                                                            value={""}
                                                            width={"100%"}
                                                            bgColor="white"
                                                        />
                                                    </Box>
                                                    {sho && _modalData[1].val && (
                                                        <Box
                                                            className="project-signoff-card"
                                                            sx={{
                                                                background:
                                                                    "#FFFFFF",
                                                                width: {
                                                                    xs: "100%"
                                                                },
                                                                borderRadius:
                                                                    "12px",
                                                                paddingX:
                                                                    "24px",
                                                                paddingY:
                                                                    "20px",
                                                                border: "1px solid #B3B3B5",
                                                                mb: "10px"
                                                            }}
                                                        >
                                                            <Box>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight:
                                                                            "600",
                                                                        fontSize:
                                                                            "18px",
                                                                        lineHeight:
                                                                            "28px",
                                                                        color: "#1E1E1E"
                                                                    }}
                                                                >
                                                                    Contact
                                                                    Info:
                                                                </Typography>
                                                            </Box>

                                                            <Box
                                                                display="flex"
                                                                marginTop="16px"
                                                            >
                                                                {" "}
                                                                <svg
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>This is phone icon</title>
                                                                    <g clipPath="url(#clip0_692_61270)">
                                                                        <path
                                                                            d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3Z"
                                                                            fill="#727272"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_692_61270">
                                                                            <rect
                                                                                width={
                                                                                    24
                                                                                }
                                                                                height={
                                                                                    24
                                                                                }
                                                                                fill="white"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                                <Typography
                                                                    sx={{
                                                                        marginLeft:
                                                                            "8px",
                                                                        fontWeight:
                                                                            "400",
                                                                        fontSize:
                                                                            "16px",
                                                                        lineHeight:
                                                                            "24px",
                                                                        color: "#5C5C5C"
                                                                    }}
                                                                >
                                                                    {
                                                                        _modalData[1]
                                                                            .val
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                marginTop="16px"
                                                            >
                                                                <svg
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>This is email icon</title>
                                                                    <g clipPath="url(#clip0_692_61273)">
                                                                        <path
                                                                            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 10.99L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                                                                            fill="#727272"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_692_61273">
                                                                            <rect
                                                                                width={
                                                                                    24
                                                                                }
                                                                                height={
                                                                                    24
                                                                                }
                                                                                fill="white"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <Box
                                                                    sx={{
                                                                        textDecoration:
                                                                            "none",
                                                                        marginLeft:
                                                                            "8px",
                                                                        fontWeight:
                                                                            "400",
                                                                        fontSize:
                                                                            "16px",
                                                                        lineHeight:
                                                                            "24px",
                                                                        color: "#1D4ED8"
                                                                    }}
                                                                    className="no-underline"
                                                                    href="Mailto:Support.SMB-Northeast@ncr.com"
                                                                >
                                                                    {
                                                                        _modalData[2]
                                                                            .val
                                                                    }
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </>
                                                <Box
                                                    paddingTop={"10px"}
                                                    display="flex"
                                                    width="100%"
                                                    justifyContent="flex-end"
                                                    sx={{
                                                        flexDirection: {
                                                            md: "row",
                                                            xs: "row"
                                                        },
                                                        position: "relative",
                                                        bottom:
                                                            sho &&
                                                            _modalData[1].val
                                                                ? ""
                                                                : "-157px"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: {
                                                                xs: "flex"
                                                            },
                                                            justifyContent:
                                                                "flex-end",
                                                            flexDirection: {
                                                                md: "row",
                                                                xs: "column"
                                                            },
                                                            width: "100%",
                                                            pb: {
                                                                md: 0,
                                                                xs: 6
                                                            }
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={() => {
                                                                handleClose(
                                                                    false
                                                                )
                                                            }}
                                                            className="model-button"
                                                            variant="text"
                                                            aria-label="This is a cancel button"
                                                            sx={{
                                                                marginRight:
                                                                    "0px",
                                                                padding:
                                                                    "12px 20px",
                                                                fontWeight: 600,
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize: {
                                                                    md: "16px",
                                                                    xs: "14px"
                                                                },
                                                                lineHeight: {
                                                                    md: "24px",
                                                                    xs: "18px"
                                                                },
                                                                border: "none !important",
                                                                mr: "8px",
                                                                color: "#5C5C5C"
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={(e) =>
                                                                handleSubmit(e)
                                                            }
                                                            type="submit"
                                                            role="button"
                                                            aria-label={`This is ${
                                                                page
                                                                    ? "   Add"
                                                                    : "Confirm"
                                                            } button`}
                                                            className="next-button"
                                                            disabled={
                                                                error.name ||
                                                                error.email ||
                                                                error.phone ||
                                                                val1.length >
                                                                    0 ||
                                                                !err ||
                                                                errorr ||
                                                                !_modalData[1]
                                                                    ?.val
                                                            }
                                                            variant="contained"
                                                            sx={{
                                                                padding:
                                                                    "12px 20px",
                                                                fontWeight: 600,
                                                                mt: {
                                                                    md: 0,
                                                                    xs: 2
                                                                },
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize: {
                                                                    md: "16px",
                                                                    xs: "14px"
                                                                },
                                                                lineHeight: {
                                                                    md: "24px",
                                                                    xs: "18px"
                                                                },
                                                                color: "white"
                                                            }}
                                                        >
                                                            {page
                                                                ? "   Add"
                                                                : "Confirm"}
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )}
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </Box>
            )}
        </>
    )
}
