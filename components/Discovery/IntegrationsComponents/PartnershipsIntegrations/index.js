import {
    Button,
    Divider,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import {
    calculatePercentage,
    getDiscoverySubStage,
    dispatchDiscoveryData
} from "../../../../helper/Constraints"
import MultiSelectPopupComp from "./MuiltiSelectPopup"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import AlohaSVG from "./../AlohaSvgs"

export const PartnershipsIntegrations = () => {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [disableNext, setDisableNext] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [showPopup1, setShowPopup1] = useState(false)
    const [currentObj, setCurrentObj] = useState("")
    const [customerDisble, setCustomerDisble] = useState(true)
    const [employeeDisble, setEmployeeDisble] = useState(true)
    const [currentTitle, setCurrentTitle] = useState("")
    const [currentTitle1, setCurrentTitle1] = useState("")
    const system = useSelector((state) => state.dataSlice.projectType)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Integrations",
        "Partnership & Integration",
        system
    )
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Aloha Essentials Features"
    ).percentage

    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    const initialData = currentstagedata.data
    const [customer, setCustomer] = useState([
        {
            name: "Web Ordering Partners",
            description: 'Will you use any Partners that add Web Ordering capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        },
        {
            name: "Delivery Partners",
            description: 'Will you use any Partners that add Delivery capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        },
        {
            name: "Take Out or To Go Partners",
            description: 'Will you use any Partners that add Take Out or To/Go capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        },
        {
            name: "Customer Loyalty Partners",
            description: 'Will you use any Partners that add Customer Loyalty capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        },
        {
            name: "Gift Card Partners",
            description: ' Will you use any Partners that add Gift Card capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        }
    ])
    const [employee, setEmployee] = useState([
        {
            name: "Scheduling Partners",
            description: 'Will you use any Partners that add Scheduling capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        },
        {
            name: "Inventory Partners",
            description: 'Will you use any Partners that add Inventory capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        },
        {
            name: "Reporting Partners",
            description: 'Will you use any Partners that add Reporting capabilities to the Aloha System?',
            value: "",
            list: ["Manager", "Admin", "CEO"],
            selected: ""
        }
    ])
    const clcPercentage = (
        _tempSelect,
        _customerDisble,
        _tempArr,
        _employeeDisble
    ) => {
        let count = 0
        let count1 = 0
        const _temp1 = _tempSelect.map((item) => ({ ...item }))
        if (_customerDisble) {
            _temp1.forEach((element) => {
                if (element.value !== "") {
                    count += 1
                }
            })
        }

        const _temp2 = _tempArr.map((item) => ({ ...item }))
        if (_employeeDisble) {
            _temp2.forEach((element) => {
                if (element.value !== "") {
                    count1 += 1
                }
            })
        }
        return count + count1
    }
    const handleStore = (
        _superSelect,
        _customerDisble,
        _tempArr,
        _employeeDisble
    ) => {
        let temp = [
            {
                customerFacingPartner: _customerDisble ? "Yes" : "No",
                customerData: _superSelect,
                employeeFacingPartner: _employeeDisble ? "Yes" : "No",
                employeeData: _tempArr
            }
        ]
        const count = clcPercentage(
            _superSelect,
            _customerDisble,
            _tempArr,
            _employeeDisble
        )
        const temp1 =
            !_employeeDisble && _customerDisble
                ? 5
                : _employeeDisble && !_customerDisble
                    ? 3
                    : 8
        const tempPercent =
            !_employeeDisble && !_customerDisble
                ? 100
                : calculatePercentage(temp1, count)
        const siteinfodataper = Math.round((inner2per + tempPercent) / 2)
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Integrations",
            "Partnership & Integration",
            temp,
            tempPercent,
            siteinfodataper,
            false,
            system
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const setData = (_data) => {
        let tempArr = customer.map((item) => ({ ...item }))
        let tempIndex = tempArr.findIndex((it) => it.name == _data.name)
        let tempData = _data
        tempData.value = tempData.selected.length !== 0 ? "Yes" : "No"
        tempArr[tempIndex] = tempData
        setCustomer(tempArr)
        handleStore(tempArr, customerDisble, employee, employeeDisble)
        setCurrentObj({})
    }
    const setData1 = (_data) => {
        let tempArr = employee?.map((item) => ({ ...item }))
        let tempIndex = tempArr.findIndex((it) => it.name == _data.name)
        let tempData = _data
        tempData.value = tempData?.selected.length !== 0 ? "Yes" : "No"
        tempArr[tempIndex] = tempData
        setEmployee(tempArr)
        handleStore(customer, customerDisble, tempArr, employeeDisble)
        setCurrentObj({})
    }
    const handleChange = (name, value) => {
        let obj = { name: name, value: value }
        let tempArr = customer.map((item) => ({ ...item }))
        let target = tempArr.find((item) => item.name == obj.name)
        if (target) {
            if (value === "Yes") {
                setShowPopup(true)
                setCurrentTitle(target.name)
                setCurrentObj(target)
            } else {
                target.value = obj.value
                setCustomer([...tempArr])
                handleStore(tempArr, customerDisble, employee, employeeDisble)
            }
        } else {
            tempArr.push(obj)
            setCustomer(tempArr)
            handleStore(tempArr, customerDisble, employee, employeeDisble)
        }
    }
    const handleChange1 = (name, value) => {
        let obj = { name: name, value: value }
        let tempArr = employee.map((item) => ({ ...item }))
        let target = tempArr.find((item) => item.name == obj.name)
        if (target) {
            if (value === "Yes") {
                setShowPopup1(true)
                setCurrentTitle1(target.name)
                setCurrentObj(target)
            } else {
                target.value = obj.value
                setEmployee([...tempArr])
                handleStore(customer, customerDisble, tempArr, employeeDisble)
            }
        } else {
            tempArr.push(obj)
            setEmployee(tempArr)
            handleStore(customer, customerDisble, tempArr, employeeDisble)
        }
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData && initialData.length > 0) {
            const _temp = initialData.map((item) => ({ ...item }))
            const _tempCustomerData = _temp[0].customerData.map((item) => ({
                ...item
            }))
            const _tempEmployeeData = _temp[0].employeeData.map((item) => ({
                ...item
            }))
            setCustomer(_tempCustomerData)
            setEmployee(_tempEmployeeData)
            setEmployeeDisble(
                _temp[0].employeeFacingPartner == "No" ? false : true
            )
            setCustomerDisble(
                _temp[0].customerFacingPartner == "No" ? false : true
            )
        }
    }, [initialData])
    useEffect(() => {
        const tempEmp = employee.filter((item) => item.value == "").length
        const tempCus = customer.filter((item) => item.value == "").length
        const temp =
            (employeeDisble && tempEmp !== 0) ||
            (customerDisble && tempCus !== 0)
        setDisableNext(temp)
    }, [employee, customer, customerDisble, employeeDisble])
    const dispatch = useDispatch()
    const [showNofication, setShowNofication] = useState(false)

    const submitForm = () => {
        const count = clcPercentage(
            customer,
            customerDisble,
            employee,
            employeeDisble
        )
        const temp1 =
            !employeeDisble && customerDisble
                ? 5
                : employeeDisble && !customerDisble
                    ? 3
                    : 8
        const tempPercent =
            !employeeDisble && !customerDisble
                ? 100
                : calculatePercentage(temp1, count)
        const siteinfodataper = Math.round((inner2per + tempPercent) / 2)
        siteinfodataper == 100
            ? router.push({
                pathname: `/discovery/integrations/integration-confirmation/${routerID}`,
                query: { inner: true }
            })
            : setShowNofication(true)
    }
    return (
        <Box
            className="integration-set"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            width="100%"
        >
            {/* Text Content at top */}
            <Box className="partnership-text">
                <Typography
                    lineHeight="24px"
                    fontWeight="400"
                    fontSize="16px"
                    sx={{
                        color: theme.palette.textColor.main
                    }}
                >
                    NCR powers the technology that runs the restaurant – even
                    when it&apos;s not our tech. Our Partner Program is an
                    extension of the NCR product portfolio, so customers don’t
                    need to worry about selecting, vetting, or integrating
                    multiple vendors’ solutions.
                    <br />
                    <br />
                    In an effort to help our team plan for your installation and
                    potential integrations the next several pages will ask about
                    different services.
                </Typography>
            </Box>
            <Divider className="divider-col" sx={{ width: "100%", mt: "24px", mb: "0px" }} />

            {/* Customer Facing Partner Integrations Section */}
            <Box
                className="partnership-text"
                sx={{
                    marginTop: { xs: "24px", md: "32px", lg: "32px" }
                }}
            >
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box maxWidth={24} maxHeight={24}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`this is Customer Facing Partner Integrations icon`}</title>
                            <g clipPath="url(#clip0_782_108028)">
                                <path
                                    d="M22 11V3H15V6H9V3H2V11H9V8H11V18H15V21H22V13H15V16H13V8H15V11H22ZM7 9H4V5H7V9ZM17 15H20V19H17V15ZM17 5H20V9H17V5Z"
                                    fill="#1E1E1E"
                                />
                            </g>
                            <defs>
                                <clipPath >
                                    <rect width={24} height={24} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Box>

                    <Typography
                        marginLeft="12px"
                        marginRight="24px"
                        fontWeight="600"
                        fontSize="20px"
                        lineHeight="28px"
                        sx={{
                            color: "#1E1E1E",
                            letterSpacing: "-0.004em"
                        }}
                    >
                        Customer Facing Partner Integrations
                    </Typography>
                </Box>
                <Typography
                    marginTop="12px"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="24px"
                    sx={{
                        color: theme.palette.secondary.main
                    }}
                >
                    Please fill out the following if you have partners that
                    provide customer facing solutions such as Web Ordering, To
                    Go & Delivery Services, Customer Loyalty or Gift Cards:
                </Typography>
            </Box>

            {/* Customer Facing Partner Integrations Section Cards*/}

            <Box

                // gap={{ xs: "16px", md: "24px", lg: "16px" }}
                sx={{
                    marginTop: 6,
                    display: "grid",
                    gap: 4,
                    mb: 6,
                    gridTemplateColumns: {
                        xs: "repeat(1, minmax(0, 1fr))",
                        md: "repeat(2, minmax(0, 1fr))"
                    }
                }}
            >
                {customer.map((item, i) =>
                    <Grid
                        key={i}
                        className="shadow"
                        sx={{
                            borderRadius: 3,
                            position: "relative",
                            background: "#fff",
                            p: 6,
                            width: "100%"
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems='center'
                            gap="12px"
                            sx={{
                                maxHeight: {
                                    xs: "56px",
                                    md: "28px"
                                }
                            }}
                        >
                            <Box sx={{ mt: '4px' }}>
                                <AlohaSVG name={item.name} />
                            </Box>
                            <Box>
                                <Typography
                                    lineHeight="28px"
                                    fontWeight="600"
                                    letterSpacing="-0.0060em"
                                    fontSize="18px"
                                    sx={{
                                        color: "#1E1E1E"
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    marginTop: {
                                        xs: "8px",
                                        md: "12px"
                                    },
                                    color: "#5C5C5C",
                                    width: {
                                        xs: "100%"
                                    }
                                }}
                            >
                                <Typography
                                    className="f-f-i "
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: theme.palette.secondary.main,
                                        width: "100%"
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </Box>

                        {/* More information */}

                        {/* radio buttons */}
                        <Box
                            display="flex"
                            gap="24px"
                            justifyContent={"space-between"}
                            flexDirection={{ md: "row", xs: "column" }}
                            flexWrap={{ xs: "wrap", lg: "nowrap" }}
                            mt={{
                                xs: "20px",
                                md: "20px",
                                lg: "12px"
                            }}
                        >
                            <form aria-label={item.name} onSubmit={submitForm}>
                                <Box display="flex" sx={{ ml: "-9px" }}>
                                    <RadioGroup
                                        aria-label={item.description}
                                        name={item.name}
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        value={item.value}
                                        sx={{
                                            display: "flex",
                                            gap: "26px",
                                            flexDirection: "row",
                                            width: "100%",
                                            justifyContent: { md: "flex-end" }
                                        }}
                                    >
                                        <FormControlLabel
                                            disabled={
                                                !customerDisble || disabled
                                            }
                                            value="Yes"
                                            sx={{
                                                marginLeft: {
                                                    xs: "1px",
                                                    md: "0px !important"
                                                },
                                                marginRight: {
                                                    xs: "4px",
                                                    md: "0px !important"
                                                },

                                                color: "#5c5c5c"
                                            }}
                                            control={
                                                <Radio
                                                  aria-label={item.name}
                                                    sx={{
                                                        "&:hover": {
                                                            bgcolor:
                                                                "#F5F5F5 !important"
                                                        },
                                                        "&.Mui-checked": {
                                                            color: disabled
                                                                ? "#727272"
                                                                : theme.palette
                                                                    .primary
                                                                    .main
                                                        },
                                                        padding: {
                                                            xs: "6px !important"
                                                        },
                                                        mr: {
                                                            md: "4px !important",
                                                            xs: "4px !important"
                                                        },
                                                        scale: "0.9"
                                                    }}
                                                />
                                            }
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            disabled={
                                                !customerDisble || disabled
                                            }
                                            value="No"
                                            sx={{
                                                marginLeft: {
                                                    xs: "1px",
                                                    md: "0px !important"
                                                },
                                                marginRight: {
                                                    xs: "4px",
                                                    md: "0px !important"
                                                },
                                                color: "#5c5c5c"
                                            }}
                                            control={
                                                <Radio
                                                aria-label={item.name}
                                                    sx={{
                                                        "&:hover": {
                                                            bgcolor:
                                                                "#F5F5F5 !important"
                                                        },
                                                        "&.Mui-checked": {
                                                            color: disabled
                                                                ? "#727272"
                                                                : theme.palette
                                                                    .primary
                                                                    .main
                                                        },
                                                        padding: {
                                                            xs: "6px !important"
                                                        },
                                                        mr: {
                                                            md: "4px !important",
                                                            xs: "4px !important"
                                                        },
                                                        scale: "0.9"
                                                    }}
                                                />
                                            }
                                            label="No"
                                        />
                                    </RadioGroup>
                                </Box>
                            </form>
                            {item.value == "Yes" && (
                                <Box width={{ xs: "100%", lg: "auto" }}>
                                    <Button
                                       aria-label="This is edit information button"
                                        disabled={disabled}
                                        onClick={() => {
                                            let tempArr = customer.map(
                                                (it) => ({
                                                    ...it
                                                })
                                            )
                                            let target = tempArr.find(
                                                (it) =>
                                                    it.name == item.name
                                            )

                                            setShowPopup(true)
                                            setCurrentTitle(target.name)
                                            setCurrentObj(target)
                                        }}
                                        fontWeight="600"
                                        fontSize={{ xs: "12px", md: "10px" }}
                                        lineHeight="18px"
                                        letterSpacing="-0.0060em"
                                        sx={{
                                            textTransform: "initial",
                                            color: "#1D4ED8",
                                            fontWeight: 600,
                                            fontSize: {
                                                xs: "14px",
                                                md: "12px"
                                            },
                                            lineHeight: "18px",
                                            border: {
                                                xs: "1px solid #E0E0E0",
                                                lg: "0px"
                                            },
                                            display: {
                                                xs: "flex",
                                                lg: "initial"
                                            },
                                            width: { xs: "100%", lg: "auto" },
                                            padding: "8px",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                background: "#F5F6FF"
                                            }
                                        }}
                                    >
                                        Edit Information
                                    </Button>
                                </Box>
                            )}
                        </Box>

                    </Grid>)}
            </Box>





            <Divider className="divider-col" sx={{ width: "100%", mt: "24px", mb: "12px" }} />
            {/* Employee Facing Partner Integrations Section */}
            <Box
                className="partnership-text"
                sx={{
                    marginTop: { xs: "18px", md: "10px", lg: "16px" }
                }}
            >
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box maxWidth={24} maxHeight={24}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`this is Employee Facing Partner Integrations icon`}</title>
                            <g clipPath="url(#clip0_570_51058)">
                                <path
                                    d="M22 5.18L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78L22 5.18ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C13.57 4 15.04 4.46 16.28 5.25L17.73 3.8C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.73 22 15.36 21.56 16.78 20.78L15.28 19.28C14.28 19.74 13.17 20 12 20ZM19 15H16V17H19V20H21V17H24V15H21V12H19V15Z"
                                    fill="#1E1E1E"
                                />
                            </g>
                            <defs>
                                <clipPath >
                                    <rect width={24} height={24} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Box>
                    <Typography
                        marginLeft="12px"
                        marginRight="28px"
                        fontWeight="600"
                        fontSize="20px"
                        lineHeight="28px"
                        sx={{
                            color: "#1E1E1E",
                            letterSpacing: "-0.007em"
                        }}
                    >
                        Employee Facing Partner Integrations
                    </Typography>
                </Box>
                <Typography
                    marginTop="12px"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="24px"
                    sx={{
                        color: theme.palette.secondary.main
                    }}
                >
                    Please let us know if your business will use any Partners
                    that provide employee facing solutions such as Reporting
                    Scheduling, Inventory:
                </Typography>
            </Box>

            {/* Employee Facing Partner Integrations Section Cards*/}
            <Box

                // gap={{ xs: "16px", md: "24px", lg: "16px" }}
                sx={{
                    marginTop: 6,
                    display: "grid",
                    gap: 4,
                    // mb: 6,
                    gridTemplateColumns: {
                        xs: "repeat(1, minmax(0, 1fr))",
                        md: "repeat(2, minmax(0, 1fr))"
                    }
                }}
            >
                {employee.map((item, i) =>
                    <Grid
                        key={i}

                        className="shadow"
                        sx={{
                            borderRadius: 3,
                            position: "relative",
                            background: "#fff",
                            p: 6,
                            width: "100%"
                        }}
                    >
                        <Box
                            display="flex"
                            gap="12px"
                            sx={{
                                maxHeight: {
                                    xs: "56px",
                                    md: "28px"
                                }
                            }}
                        >
                            <Box sx={{ mt: '4px' }}>
                                <AlohaSVG name={item.name} />
                            </Box>
                            <Box>
                                <Typography
                                    lineHeight="28px"
                                    fontWeight="600"
                                    letterSpacing="-0.0060em"
                                    fontSize="18px"
                                    sx={{
                                        color: "#1E1E1E"
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    marginTop: {
                                        xs: "8px",
                                        md: "12px"
                                    },
                                    color: "#5C5C5C",
                                    width: {
                                        xs: "100%"
                                    }
                                }}
                            >
                                <Typography
                                    className="f-f-i "
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: theme.palette.secondary.main,
                                        width: "100%"
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </Box>

                        {/* More information */}

                        {/* radio buttons */}
                        <Box
                            display="flex"
                            gap="24px"
                            justifyContent={"space-between"}
                            flexDirection={{ md: "row", xs: "column" }}
                            flexWrap={{ xs: "wrap", lg: "nowrap" }}
                            mt={{
                                xs: "20px",
                                md: "20px",
                                lg: "12px"
                            }}
                        >
                            <form aria-label={item.name} onSubmit={submitForm}>
                                <Box display="flex" sx={{ ml: "-9px" }}>
                                    <RadioGroup
                                        aria-label={item.description}
                                        name={item.name}
                                        onChange={(e) =>
                                            handleChange1(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        value={item.value}
                                        sx={{
                                            display: "flex",
                                            gap: "26px",
                                            flexDirection: "row",
                                            width: "100%",
                                            justifyContent: { md: "flex-end" }
                                        }}
                                    >
                                        <FormControlLabel
                                            disabled={
                                                !customerDisble || disabled
                                            }
                                            value="Yes"
                                            sx={{
                                                marginLeft: {
                                                    xs: "1px",
                                                    md: "0px !important"
                                                },
                                                marginRight: {
                                                    xs: "4px",
                                                    md: "0px !important"
                                                },

                                                color: "#5c5c5c"
                                            }}
                                            control={
                                                <Radio
                                                aria-label={item.name}
                                                    sx={{
                                                        "&:hover": {
                                                            bgcolor:
                                                                "#F5F5F5 !important"
                                                        },
                                                        "&.Mui-checked": {
                                                            color: disabled
                                                                ? "#727272"
                                                                : theme.palette
                                                                    .primary
                                                                    .main
                                                        },
                                                        padding: {
                                                            xs: "6px !important"
                                                        },
                                                        mr: {
                                                            md: "4px !important",
                                                            xs: "4px !important"
                                                        },
                                                        scale: "0.9"
                                                    }}
                                                />
                                            }
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            disabled={
                                                !customerDisble || disabled
                                            }
                                            value="No"
                                            sx={{
                                                marginLeft: {
                                                    xs: "1px",
                                                    md: "0px !important"
                                                },
                                                marginRight: {
                                                    xs: "4px",
                                                    md: "0px !important"
                                                },
                                                color: "#5c5c5c"
                                            }}
                                            control={
                                                <Radio
                                                aria-label={item.name}
                                                    sx={{
                                                        "&:hover": {
                                                            bgcolor:
                                                                "#F5F5F5 !important"
                                                        },
                                                        "&.Mui-checked": {
                                                            color: disabled
                                                                ? "#727272"
                                                                : theme.palette
                                                                    .primary
                                                                    .main
                                                        },
                                                        padding: {
                                                            xs: "6px !important"
                                                        },
                                                        mr: {
                                                            md: "4px !important",
                                                            xs: "4px !important"
                                                        },
                                                        scale: "0.9"
                                                    }}
                                                />
                                            }
                                            label="No"
                                        />
                                    </RadioGroup>
                                </Box>
                            </form>
                            {item.value == "Yes" && (
                                <Box width={{ xs: "100%", lg: "auto" }}>
                                    <Button
                                    aria-label="This is edit information button"
                                        disabled={disabled}
                                        onClick={() => {
                                            let tempArr = employee.map(
                                                (ite) => ({
                                                    ...ite
                                                })
                                            )
                                            let target = tempArr.find(
                                                (it) =>
                                                    it.name == item.name
                                            )

                                            setShowPopup1(true)
                                            setCurrentTitle1(target.name)
                                            setCurrentObj(target)
                                        }}
                                        fontWeight="600"
                                        fontSize={{ xs: "12px", md: "10px" }}
                                        lineHeight="18px"
                                        letterSpacing="-0.0060em"
                                        sx={{
                                            textTransform: "initial",
                                            color: "#1D4ED8",
                                            fontWeight: 600,
                                            fontSize: {
                                                xs: "14px",
                                                md: "12px"
                                            },
                                            lineHeight: "18px",
                                            border: {
                                                xs: "1px solid #E0E0E0",
                                                lg: "0px"
                                            },
                                            display: {
                                                xs: "flex",
                                                lg: "initial"
                                            },
                                            width: { xs: "100%", lg: "auto" },
                                            padding: "8px",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                background: "#F5F6FF"
                                            }
                                        }}
                                    >
                                        Edit Information
                                    </Button>
                                </Box>
                            )}
                        </Box>

                    </Grid>)}
            </Box>

            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: {
                        xs: "24px",
                        md: "32px",
                        lg: "32px",
                        xl: "36px",
                        xxl: "36px"
                    }
                }}
            />

            {/* Buttons */}

            <Box
                paddingY={"24px"}
                width="100%"
                display="flex"
                justifyContent="flex-end"
                sx={{
                    flexDirection: {
                        lg: "row",
                        md: "column",

                        xs: "column"
                    }
                }}
            >
                <Box
                    display="flex"
                    sx={{
                        justifyContent: "flex-end",
                        flexDirection: {
                            lg: "row",
                            md: "row",

                            xs: "column"
                        }
                    }}
                >
                    <Button
                        variant="outlined"
                        className="back-button"
                        aria-label="This is back button"
                        sx={{
                            marginRight: { md: "8px" },
                            padding: {
                                xs: "10px 20px",
                                md: "10px 20px",
                                lg: "12px 20px"
                            },
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: {
                                lg: "16px",
                                xs: "16px"
                            },
                            lineHeight: {
                                lg: "22px",
                                xs: "24px"
                            },
                            color: "#5C5C5C",
                            "&:hover": {
                                bgcolor: "#F5F6FF !important ",
                                border: "1px solid #1D4ED8 !important"
                            }
                        }}
                        onClick={() => {
                            router.push({
                                pathname: `/discovery/integrations/aloha-features/${routerID}`,
                                query: { inner: true }
                            })
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        className="next-button"
                        onClick={(e) => {
                            submitForm()
                        }}
                        disabled={disableNext}
                        role="button"
                        aria-label="This is next step button"
                        variant="contained"
                        sx={{
                            marginTop: { xs: "8px", md: "0px" },
                            padding: "12px 20px",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: {
                                lg: "16px",
                                xs: "16px"
                            },
                            lineHeight: {
                                lg: "24px",
                                xs: "24px"
                            },
                            color: "white"
                        }}
                    >
                        Proceed to Confirmation
                    </Button>
                </Box>
            </Box>

            <Box>
                <ConfirmationNotification
                    open={showNofication}
                    close={() => setShowNofication(false)}
                />
            </Box>
            <Box>
                <MultiSelectPopupComp
                    title={currentTitle}
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    data={currentObj}
                    bgClr={"#f5f5f5"}
                    setData={setData}
                />
                <MultiSelectPopupComp
                    title={currentTitle1}
                    showPopup={showPopup1}
                    setShowPopup={setShowPopup1}
                    data={currentObj}
                    setData={setData1}
                />
            </Box>
        </Box>
    )
}
