import {
    Button,
    Divider,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
    Tooltip,
    Grid,
    styled,
    tooltipClasses,
    useMediaQuery
} from "@mui/material"
// import new from "../public/images/food.png"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import {
    calculatePercentage,
    getDiscoverySubStage,
    dispatchDiscoveryData
} from "../../../../helper/Constraints"
import PopupComp from "./PopupComp"
import ManegementPopupComp from "./ManagementModel"
import AlohaSVG from "./../AlohaSvgs"
import Image from "next/image"
import TooltipPopup from "./TooltipPopup"

const LightTooltip = ""

const SetContant = (id) => {
    LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            marginLeft: "-20px"
        },
        [`& .${tooltipClasses.arrow}`]: {
            marginLeft: "-29px"
        }
    }))
}

export const AlohaFeatures = () => {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const system = useSelector((state) => state.dataSlice.projectType)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Integrations",
        "Aloha Essentials Features",
        system
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Partnership & Integration"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let initialData = currentstagedata.data

    const dispatch = useDispatch()
    const [isGiftCards, setIsGiftCards] = useState("")
    const [type, setType] = useState("A")
    const [tooltipIndex, setToolTipIndex] = useState()
    const [showtooltip, setShowToolTip] = useState(false)
    const [showtooltip2, setShowToolTip2] = useState(false)

    const [status, setStatus] = useState("")
    const [status1, setStatus1] = useState("")
    const [currentitem, setCurrentItem] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [showPopup1, setShowPopup1] = useState(false)
    const [showPopup2, setShowPopup2] = useState(false)
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const istablet = useMediaQuery((th) => th.breakpoints.down("lg"))
    const isDesktop = useMediaQuery((th) => th.breakpoints.down("xl"))

    useEffect(() => {
        !isMobile && setShowPopup2(false)

        isMobile && setShowToolTip(false)
        isDesktop && setShowToolTip(false)
    }, [isMobile, isDesktop])

    const [selectBoxes, setSelectBoxes] = useState([
        {
            name: "Real-Time Analytics App",
            description:
                "Do you currently use or plan to use Real-Time Analytics App with your Aloha system?",
            value: "",
            tooltip:
                "Mobile app that provides owners and managers real-time visibility into the restaurant’s sales, tickets, forecasts and more all from their personal devices.",
            svg: "Real-Time-Analytics-App"
        },
        {
            name: "Online Ordering",
            description:
                "Do you currently use or plan to use Online Ordering with your Aloha system?",
            value: "",
            tooltip:
                "Enables guests to order their food online through any web browser. Online ordering also enables contactless ordering within the restaurant for guests to order and pay on their phone via scanning a QR code.",
            svg: "Online-Ordering"
        },
        {
            name: "Insight Reporting",
            description:
                "Do you currently use or plan to use Insight Reporting with your Aloha system?",
            value: "",
            tooltip:
                "Robust, cloud-based reporting for owners and managers to view and understand sales and labor data. Insight Reporting also enables data exports through integrations to many accounting and payroll solutions.",
            svg: "Insight-Reporting"
        },
        {
            name: "Basic Loyalty",
            description:
                "Do you currently use or plan to use Basic Loyalty with your Aloha system?",
            value: "",
            tooltip:
                "Enables operators to offer reward programs to their guests to encourage repeat visits and increase brand loyalty.",
            svg: "Basic-Loyalty"
        },
        {
            name: "Gift Cards",
            description:
                "Do you currently use or plan to use Gift Cards with your Aloha system?",
            value: "",
            tooltip:
                "Offer and accept gift cards to your guests, with all forms of stored value configured and managed from one location, whether for all stores or a single site.",
            svg: "Gift-Cards",
            Aloha_Gift_Cards_Data: [
                {
                    question1:
                        "Would you like to have your current Gift Cards converted to be used with Aloha?",
                    value: ""
                },
                {
                    question2:
                        "Do you currently use a 3rd Party Gift Card Processor?",
                    value: ""
                }
            ]
        },
        {
            name: "Aloha Takeout",
            description:
                "Do you currently use or plan to use Aloha Takeout with your Aloha system?",
            value: "",
            tooltip:
                "Allows for better management of call-in and future orders, as well as streamlines the restaurant’s takeout and delivery operations.",
            svg: "Aloha-Takeout"
        },
        {
            name: "Mobile Payment",
            description:
                "Do you currently use or plan to use Mobile Payment with your Aloha system?",
            value: "",
            tooltip:
                "Enables guests to pay for their meals on their personal mobile devices via a web application by scanning a QR code provided on their checks.",
            svg: "Mobile-Payment"
        },
        {
            name: "Property Management Integration",
            description:
                " Do you currently use or plan to use Property Management Integration with your Aloha system?",
            value: "",
            tooltip:
                "Allows for integration of the Aloha point of sale to third party property management systems to facilitate guest billing information. This integration is typically found within hotel environments.",
            svg: "",
            Aloha_Property_Management_Data: [
                { name: "PMS Company Name", value: "" },
                {
                    name: "PMS Connection Type",
                    value: ""
                },
                {
                    name: "IP Address of PMS Server",
                    value: ""
                },
                {
                    name: "Port Number to match PMS Server",
                    value: ""
                },
                { name: "Additonal Note", value: "" }
            ]
        }
    ])
    const clcPercentage = (_tempSelect) => {
        let count = 0
        const _tempArr = _tempSelect.map((item) => ({ ...item }))
        const temp = _tempArr.filter((item) => item.name == "Gift Cards")
        const tempGift = temp[0].Aloha_Gift_Cards_Data
        const tempPropertyManagement = _tempArr.filter(
            (item) => item.name == "Property Management Integration"
        )
        const _tempPropertyManagement =
            tempPropertyManagement[0]?.Aloha_Property_Management_Data
        const _tempPropertyManagementCount = _tempPropertyManagement?.filter(
            (item) => item.value == "" && item.name !== "Additonal Note"
        )
        const _temp1 = _tempPropertyManagement?.filter(
            (item) =>
                item.name !== "IP Address of PMS Server" &&
                item.name !== "Port Number to match PMS Server" &&
                item.value === "" &&
                item.name !== "Additonal Note"
        )
        const _temp = tempGift.filter((item) => item.value == "")
        _tempArr.forEach((element) => {
            if (element.value !== "") {
                if (element.name == "Gift Cards") {
                    if (temp[0].value == "Yes") {
                        if (_temp.length == 0) {
                            count += 1
                        }
                    } else {
                        count += 1
                    }
                } else if (element.name == "Property Management Integration") {
                    if (tempPropertyManagement[0].value == "Yes") {
                        if (_tempPropertyManagementCount.length == 0) {
                            count += 1
                        } else if (_temp1.length == 0) {
                            if (
                                _tempPropertyManagement[1].value == "TCP/IP" ||
                                _tempPropertyManagement[1].value == "Serial" ||
                                _tempPropertyManagement[1].value ==
                                "I am not sure"
                            ) {
                                count += 1
                            }
                        }
                    } else {
                        count += 1
                    }
                } else {
                    count += 1
                }
            }
        })
        return count
    }
    const handleStore = (_superSelect) => {
        let temp = _superSelect
        const count = clcPercentage(_superSelect)
        const tempPercent = calculatePercentage(8, count)
        const siteinfodataper = Math.round((inner2per + tempPercent) / 2)
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Integrations",
            "Aloha Essentials Features",
            temp,
            tempPercent,
            siteinfodataper,
            false,
            system
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const setData = (_data) => {
        let tempArr = selectBoxes.map((item) => ({ ...item }))
        if (isGiftCards == "No") {
            tempArr[4].value = "No"
        }

        tempArr[4].Aloha_Gift_Cards_Data = _data
        setSelectBoxes(tempArr)
        handleStore([...tempArr])
        setIsGiftCards("")
    }
    const setData1 = (_data) => {
        let tempArr = selectBoxes.map((item) => ({ ...item }))

        tempArr[7].Aloha_Property_Management_Data = _data
        setSelectBoxes(tempArr)
        handleStore([...tempArr])
    }
    const handleChange = (name, value) => {
        let obj = { name: name, value: value }
        let tempArr = selectBoxes.map((item) => ({ ...item }))
        let tempArrGift = selectBoxes.find((item) => item.name == "Gift Cards")
        let target = tempArr.find((item) => item.name == obj.name)
        if (target) {
            target.value = obj.value
            if (
                name == "Gift Cards" &&
                tempArrGift.value !== "" &&
                value === "No"
            ) {
                setType("C")
                setShowPopup(true)
                tempArr[4].Aloah_Gift_Cards_Data = [
                    {
                        question1:
                            "Would you like to have your current Gift Cards converted to be used with Aloha?",
                        value: ""
                    },
                    {
                        question2:
                            "Do you currently use a 3rd Party Gift Card Processor?",
                        value: ""
                    }
                ]
                setIsGiftCards("No")
            } else {
                setSelectBoxes([...tempArr])
                handleStore([...tempArr])
            }
        } else {
            tempArr.push(obj)
            setSelectBoxes(tempArr)
            handleStore([...tempArr])
        }
    }
    const submitForm = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/discovery/integrations/partnerships-integrations/${routerID}`,
            query: { inner: true }
        })
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData && initialData.length > 0) {
            const _temp = initialData.map((item) => ({ ...item }))
            setSelectBoxes(_temp)
        }
    }, [initialData])
    useEffect(() => {
        const tempGift = selectBoxes[4].Aloha_Gift_Cards_Data
        const _temp = tempGift.filter((item) => item.value === "")
        if (selectBoxes[4].value == "Yes") {
            if (_temp.length !== 0) {
                setStatus("pending")
            } else {
                setStatus("completed")
            }
        } else {
            setStatus("")
        }

        //Property Management Integration Status
        const _dataProperty = selectBoxes[7].Aloha_Property_Management_Data
        const _tempProperty = _dataProperty.filter(
            (item) => item.value === "" && item.name !== "Additonal Note"
        )
        const _temp1 = _dataProperty.filter(
            (item) =>
                item.name !== "IP Address of PMS Server" &&
                item.name !== "Port Number to match PMS Server" &&
                item.value === "" &&
                item.name !== "Additonal Note"
        )
        if (selectBoxes[7].value == "Yes") {
            if (_tempProperty.length === 0) {
                setStatus1("completed")
            } else if (_temp1.length == 0) {
                if (
                    _dataProperty[1].value == "TCP/IP" ||
                    _dataProperty[1].value == "Serial" ||
                    _dataProperty[1].value == "I am not sure"
                ) {
                    setStatus1("completed")
                } else {
                    setStatus1("pending")
                }
            } else {
                setStatus1("pending")
            }
        } else {
            setStatus1("")
        }
    }, [selectBoxes])
    const isDisbled = calculatePercentage(8, clcPercentage(selectBoxes)) != 100
    return (
        <Box
            onClick={() => {
                showtooltip && setShowToolTip(false)
                showtooltip2 && setShowToolTip2(false)
            }}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            width="100%"
        >
            <Typography
                sx={{
                    mb: { xs: "24px", md: "32px" },
                    color: "#1E1E1E",
                    fontSize: "16px"
                }}
            >
                Below are capabilities included within the Aloha Essentials
                solution; please select ‘yes’ next to each feature that you
                would like configured and enabled for your restaurant.
            </Typography>
            <Box
                // gap={{ xs: "16px", md: "24px", lg: "16px" }}
                sx={{
                    display: "grid",
                    gap: 4,
                    // mb: {md:6},

                    gridTemplateColumns: {
                        xs: "repeat(1, minmax(0, 1fr))",
                        md: "repeat(2, minmax(0, 1fr))"
                    }
                }}
            >
                {selectBoxes.map((item, i) => (
                    <Grid
                        key={i}
                        className="shadow"
                        sx={{
                            borderRadius: 3,
                            position: "relative",
                            background: "#fff",
                            p: 6,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box>
                            <Box
                                display="flex"
                                gap="12px"
                                sx={{
                                    alignItems: "flex-start"

                                    // maxHeight: {
                                    //     xs: "56px",
                                    //     md: "28px"
                                    // }
                                }}
                            >
                                <Box sx={{ mt: "4px" }}>
                                    <AlohaSVG name={item.name} />
                                </Box>
                                <Box>
                                    <Typography
                                        fontWeight="600"
                                        letterSpacing="-0.0060em"
                                        fontSize="18px"
                                        sx={{
                                            color: "#1E1E1E",
                                            lineHeight: "28px"
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
                                        className="f-f-i"
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

                            {/* More information desktop */}
                            <Box
                                // onClick={() =>
                                //     setToolTipIndex(i) ||
                                //     setShowToolTip(!showtooltip)
                                // }
                                sx={{
                                    display: { lg: "flex", xs: "none" },

                                    alignItems: "center",
                                    gap: 2,
                                    mt: "12px"
                                }}
                            >
                                <LightTooltip
                                    aria-label={`this is ${item.name} tooltip`}
                                    title={
                                        <Box>
                                            <Box
                                                mb="8px"
                                                fontSize="14px"
                                                lineHeight="22px"
                                            >
                                                {item.tooltip}
                                            </Box>
                                            {item.name !==
                                                "Property Management Integration" && (
                                                    <Box>
                                                        <Image
                                                            width={591}
                                                            height={375}
                                                            alt={`this is ${item.name} icon`}
                                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/${item.svg}.png`}
                                                        />
                                                        {/* <AlohaSVG name={item.svg} /> */}
                                                    </Box>
                                                )}
                                        </Box>
                                    }
                                    placement="bottom-start"
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                borderRadius: "4px",
                                                position: "relative",
                                                minWidth: {
                                                    lg: "615px",
                                                    md: "424px"
                                                },
                                                // width: "100%",
                                                display: "flex",
                                                alignItems: "center",

                                                color: "#fff",
                                                fontSize: "12px",
                                                padding: "12px",
                                                fontWeight: 400,
                                                lineHeight: "18px"
                                            }
                                        }
                                    }}
                                    arrow={true}
                                >
                                    <Box
                                        component={"span"}
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "24px",
                                            lineHeight: "24px",
                                            color: "#757575",
                                            "&:hover": {
                                                color: "#2E2E2E !important"
                                            },
                                            display: "flex",
                                            gap: 2,
                                            cursor: "pointer"
                                        }}
                                    >
                                        <svg
                                            width={14}
                                            height={14}
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>{`this is ${item.name} tooltip icon`}</title>
                                            <path
                                                d="M6.3335 3.66634H7.66683V4.99967H6.3335V3.66634ZM6.3335 6.33301H7.66683V10.333H6.3335V6.33301ZM7.00016 0.333008C3.32016 0.333008 0.333496 3.31967 0.333496 6.99967C0.333496 10.6797 3.32016 13.6663 7.00016 13.6663C10.6802 13.6663 13.6668 10.6797 13.6668 6.99967C13.6668 3.31967 10.6802 0.333008 7.00016 0.333008ZM7.00016 12.333C4.06016 12.333 1.66683 9.93967 1.66683 6.99967C1.66683 4.05967 4.06016 1.66634 7.00016 1.66634C9.94016 1.66634 12.3335 4.05967 12.3335 6.99967C12.3335 9.93967 9.94016 12.333 7.00016 12.333Z"
                                                fill="#727272"
                                            />
                                        </svg>
                                        <Typography
                                            lineHeight="12px"
                                            fontWeight="500"
                                            letterSpacing="-0.0060em"
                                            fontSize="12px"
                                            sx={{
                                                color: "#727272",
                                                mt: "2px"
                                            }}
                                        >
                                            More details
                                        </Typography>
                                    </Box>
                                </LightTooltip>
                                {SetContant(i)}
                            </Box>

                            {/* More information Tablet */}
                            {istablet && (
                                <Box
                                    onClick={() =>
                                        setToolTipIndex(i) ||
                                        setShowToolTip(!showtooltip)
                                    }
                                    sx={{
                                        display: { md: "flex", xs: "none" },

                                        alignItems: "center",
                                        gap: 2,
                                        mt: "12px"
                                    }}
                                >
                                    <LightTooltip
                                        aria-label={`this is ${item.name} tooptip`}
                                        open={i == tooltipIndex && showtooltip}
                                        title={
                                            <Box>
                                                <Box
                                                    mb="8px"
                                                    fontSize="14px"
                                                    lineHeight="22px"
                                                >
                                                    {item.tooltip}
                                                </Box>
                                                {item.name !==
                                                    "Property Management Integration" && (
                                                        <Box>
                                                            <Image
                                                                width={591}
                                                                height={375}
                                                                alt={`this is ${item.name} icon`}
                                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/${item.svg}.png`}
                                                            />
                                                            {/* <AlohaSVG name={item.svg} /> */}
                                                        </Box>
                                                    )}
                                            </Box>
                                        }
                                        placement="bottom-start"
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    borderRadius: "4px",
                                                    position: "relative",
                                                    minWidth: {
                                                        lg: "615px",
                                                        md: "424px"
                                                    },
                                                    // width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",

                                                    color: "#fff",
                                                    fontSize: "12px",
                                                    padding: "12px",
                                                    fontWeight: 400,
                                                    lineHeight: "18px"
                                                }
                                            }
                                        }}
                                        arrow={true}
                                    >
                                        <Box
                                            component={"span"}
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "24px",
                                                lineHeight: "24px",
                                                color: "#757575",
                                                "&:hover": {
                                                    color: "#2E2E2E !important"
                                                },
                                                display: "flex",
                                                gap: 2,
                                                cursor: "pointer"
                                            }}
                                        >
                                            <svg
                                                width={14}
                                                height={14}
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>{`this is ${item.name} tooltip icon`}</title>
                                                <path
                                                    d="M6.3335 3.66634H7.66683V4.99967H6.3335V3.66634ZM6.3335 6.33301H7.66683V10.333H6.3335V6.33301ZM7.00016 0.333008C3.32016 0.333008 0.333496 3.31967 0.333496 6.99967C0.333496 10.6797 3.32016 13.6663 7.00016 13.6663C10.6802 13.6663 13.6668 10.6797 13.6668 6.99967C13.6668 3.31967 10.6802 0.333008 7.00016 0.333008ZM7.00016 12.333C4.06016 12.333 1.66683 9.93967 1.66683 6.99967C1.66683 4.05967 4.06016 1.66634 7.00016 1.66634C9.94016 1.66634 12.3335 4.05967 12.3335 6.99967C12.3335 9.93967 9.94016 12.333 7.00016 12.333Z"
                                                    fill="#727272"
                                                />
                                            </svg>
                                            <Typography
                                                lineHeight="12px"
                                                fontWeight="500"
                                                letterSpacing="-0.0060em"
                                                fontSize="12px"
                                                sx={{
                                                    color: "#727272",
                                                    mt: "2px"
                                                }}
                                            >
                                                More details
                                            </Typography>
                                        </Box>
                                    </LightTooltip>
                                    {SetContant(i)}
                                </Box>
                            )}

                            {/* More information mobile */}
                            <Box
                                onClick={() => {
                                    if (isMobile) {
                                        setShowPopup2(true)
                                        setCurrentItem(item)

                                        if (
                                            item.name ==
                                            "Property Management Integration"
                                        ) {
                                            setShowToolTip2(!showtooltip2)
                                        }
                                    }
                                }}
                                sx={{
                                    display: { md: "none", xs: "flex" },

                                    alignItems: "center",
                                    gap: 2,
                                    mt: "12px"
                                }}
                            >
                                {item.name ==
                                    "Property Management Integration" ? (
                                    <Tooltip
                                    aria-label=""
                                        open={showtooltip2}
                                        title={
                                            <Box>
                                                <Typography
                                                    mb="8px"
                                                    fontSize="14px"
                                                    lineHeight="22px"
                                                >
                                                    Allows for integration of
                                                    the Aloha point of sale to
                                                    third party property
                                                    management systems to
                                                    facilitate guest billing
                                                    information. This
                                                    integration is typically
                                                    found within hotel
                                                    environments.
                                                </Typography>
                                            </Box>
                                        }
                                        placement="bottom-start"
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    borderRadius: "4px",
                                                    position: "relative",
                                                    minWidth: {
                                                        lg: "615px",
                                                        md: "424px"
                                                    },
                                                    // width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",

                                                    color: "#fff",
                                                    fontSize: "12px",
                                                    padding: "12px",
                                                    fontWeight: 400,
                                                    lineHeight: "18px"
                                                }
                                            }
                                        }}
                                        arrow={true}
                                    >
                                        <Box
                                            component={"span"}
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "24px",
                                                lineHeight: "24px",
                                                color: "#757575",
                                                "&:hover": {
                                                    color: "#2E2E2E !important"
                                                },
                                                display: "flex",
                                                gap: 2,
                                                cursor: "pointer"
                                            }}
                                        >
                                            <svg
                                                width={14}
                                                height={14}
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>{`this is ${item.name} tooltip icon`}</title>
                                                <path
                                                    d="M6.3335 3.66634H7.66683V4.99967H6.3335V3.66634ZM6.3335 6.33301H7.66683V10.333H6.3335V6.33301ZM7.00016 0.333008C3.32016 0.333008 0.333496 3.31967 0.333496 6.99967C0.333496 10.6797 3.32016 13.6663 7.00016 13.6663C10.6802 13.6663 13.6668 10.6797 13.6668 6.99967C13.6668 3.31967 10.6802 0.333008 7.00016 0.333008ZM7.00016 12.333C4.06016 12.333 1.66683 9.93967 1.66683 6.99967C1.66683 4.05967 4.06016 1.66634 7.00016 1.66634C9.94016 1.66634 12.3335 4.05967 12.3335 6.99967C12.3335 9.93967 9.94016 12.333 7.00016 12.333Z"
                                                    fill="#727272"
                                                />
                                            </svg>
                                            <Typography
                                                lineHeight="12px"
                                                fontWeight="500"
                                                letterSpacing="-0.0060em"
                                                fontSize="12px"
                                                sx={{
                                                    color: "#727272",
                                                    mt: "2px"
                                                }}
                                            >
                                                More details
                                            </Typography>
                                        </Box>
                                    </Tooltip>
                                ) : (
                                    <Box
                                        component={"span"}
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "24px",
                                            lineHeight: "24px",
                                            color: "#757575",
                                            "&:hover": {
                                                color: "#2E2E2E !important"
                                            },
                                            display: "flex",
                                            gap: 2,
                                            cursor: "pointer"
                                        }}
                                    >
                                        <svg
                                            width={14}
                                            height={14}
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>{`this is ${item.name} tooltip icon`}</title>
                                            <path
                                                d="M6.3335 3.66634H7.66683V4.99967H6.3335V3.66634ZM6.3335 6.33301H7.66683V10.333H6.3335V6.33301ZM7.00016 0.333008C3.32016 0.333008 0.333496 3.31967 0.333496 6.99967C0.333496 10.6797 3.32016 13.6663 7.00016 13.6663C10.6802 13.6663 13.6668 10.6797 13.6668 6.99967C13.6668 3.31967 10.6802 0.333008 7.00016 0.333008ZM7.00016 12.333C4.06016 12.333 1.66683 9.93967 1.66683 6.99967C1.66683 4.05967 4.06016 1.66634 7.00016 1.66634C9.94016 1.66634 12.3335 4.05967 12.3335 6.99967C12.3335 9.93967 9.94016 12.333 7.00016 12.333Z"
                                                fill="#727272"
                                            />
                                        </svg>
                                        <Typography
                                            lineHeight="12px"
                                            fontWeight="500"
                                            letterSpacing="-0.0060em"
                                            fontSize="12px"
                                            sx={{
                                                color: "#727272",
                                                mt: "2px"
                                            }}
                                        >
                                            More details
                                        </Typography>
                                    </Box>
                                )}

                                {/* {SetContant(i)} */}
                            </Box>
                            <Box>
                                {" "}
                                {item.name == "Gift Cards" &&
                                    status !== "" &&
                                    (status === "completed" ? (
                                        <Box
                                            sx={{
                                                position: "relative"
                                            }}
                                            minWidth={{
                                                xxl: "auto",
                                                xl: "50%",
                                                md: "fit-content"
                                            }}
                                            display="flex"
                                            alignSelf="flex-start"
                                            justifyContent="flex-end"
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: theme.chips.background.complete,
                                                    color: theme.chips.text.complete,
                                                    borderRadius: "24px",
                                                    position: "absolute",
                                                    right: "0px",
                                                    padding: {
                                                        xs: "0px 5px",
                                                        md: "0px 4px",
                                                        lg: "0px 7px 0px 3px",
                                                        xxl: "1px 7px 1px 4px"
                                                    },
                                                    display: "flex",
                                                    gap: "4px",
                                                    alignSelf: "flex-end",
                                                    flexWrap: "nowrap",

                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontWeight: 400,
                                                    fontSize: {
                                                        xs: "12px"
                                                    },
                                                    lineHeight: {
                                                        xs: "16px",
                                                        md: "18px"
                                                    },
                                                    border: "2px  dashed transparent"
                                                }}
                                            >
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>{`this is completed icon`}</title>
                                                    <g clipPath="url(#clip0_572_37125)">
                                                        <path
                                                            d="M8.00016 1.33203C4.32016 1.33203 1.3335 4.3187 1.3335 7.9987C1.3335 11.6787 4.32016 14.6654 8.00016 14.6654C11.6802 14.6654 14.6668 11.6787 14.6668 7.9987C14.6668 4.3187 11.6802 1.33203 8.00016 1.33203ZM6.66683 11.332L3.3335 7.9987L4.2735 7.0587L6.66683 9.44536L11.7268 4.38536L12.6668 5.33203L6.66683 11.332Z"
                                                            fill={`${theme.chips.text.complete}`}
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_572_37125">
                                                            <rect
                                                                width={16}
                                                                height={16}
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Completed
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box
                                            position={"relative"}
                                            minWidth={{
                                                xxl: "200px",
                                                xl: "200px",
                                                xs: "200px"
                                            }}
                                            display="flex"
                                            alignSelf="flex-start"
                                            justifyContent="flex-end"
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: theme.chips.background.warning,
                                                    color: theme.chips.text.warning,
                                                    borderRadius: "24px",
                                                    position: "absolute",
                                                    right: "0px",
                                                    padding: {
                                                        xs: "0px 5px",
                                                        md: "0px 4px",
                                                        lg: "0px 7px 0px 3px",
                                                        xxl: "1px 7px 1px 4px"
                                                    },
                                                    display: "flex",
                                                    gap: "4px",
                                                    alignSelf: "flex-end",
                                                    flexWrap: "nowrap",

                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontWeight: 400,
                                                    fontSize: {
                                                        xs: "12px"
                                                    },
                                                    lineHeight: {
                                                        xs: "16px",
                                                        md: "18px"
                                                    },
                                                    border: "2px  dashed transparent"
                                                }}
                                            >
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>{`this is Pending Information icon`}</title>
                                                    <g clipPath="url(#clip0_572_36976)">
                                                        <path
                                                            d="M8.00001 1.33203C4.32001 1.33203 1.33334 4.3187 1.33334 7.9987C1.33334 11.6787 4.32001 14.6654 8.00001 14.6654C11.68 14.6654 14.6667 11.6787 14.6667 7.9987C14.6667 4.3187 11.68 1.33203 8.00001 1.33203ZM8.66668 11.332H7.33334V9.9987H8.66668V11.332ZM8.66668 8.66536H7.33334V4.66536H8.66668V8.66536Z"
                                                            fill={`${theme.chips.text.warning}`}
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_572_36976">
                                                            <rect
                                                                width={16}
                                                                height={16}
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Pending Information
                                            </Box>
                                        </Box>
                                    ))}
                                {item.name ==
                                    "Property Management Integration" &&
                                    status1 !== "" &&
                                    (status1 === "completed" ? (
                                        <Box
                                            minWidth={{
                                                xxl: "auto",
                                                xl: "50%",
                                                md: "fit-content"
                                            }}
                                            display="flex"
                                            alignSelf="flex-start"
                                            justifyContent="flex-end"
                                            sx={{ position: "relative" }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: theme.chips.background.complete,
                                                    color: theme.chips.text.complete,
                                                    borderRadius: "24px",
                                                    position: "absolute",
                                                    right: "0px",
                                                    padding: {
                                                        xs: "0px 5px",
                                                        md: "0px 4px",
                                                        lg: "0px 7px 0px 3px",
                                                        xxl: "1px 7px 1px 4px"
                                                    },
                                                    display: "flex",
                                                    gap: "4px",
                                                    alignSelf: "flex-end",
                                                    flexWrap: "nowrap",

                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontWeight: 400,
                                                    fontSize: {
                                                        xs: "12px"
                                                    },
                                                    lineHeight: {
                                                        xs: "16px",
                                                        md: "18px"
                                                    },
                                                    border: "2px  dashed transparent"
                                                }}
                                            >
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>{`this is completed icon`}</title>
                                                    <g clipPath="url(#clip0_572_37125)">
                                                        <path
                                                            d="M8.00016 1.33203C4.32016 1.33203 1.3335 4.3187 1.3335 7.9987C1.3335 11.6787 4.32016 14.6654 8.00016 14.6654C11.6802 14.6654 14.6668 11.6787 14.6668 7.9987C14.6668 4.3187 11.6802 1.33203 8.00016 1.33203ZM6.66683 11.332L3.3335 7.9987L4.2735 7.0587L6.66683 9.44536L11.7268 4.38536L12.6668 5.33203L6.66683 11.332Z"
                                                            fill={`${theme.chips.text.complete}`}
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_572_37125">
                                                            <rect
                                                                width={16}
                                                                height={16}
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Completed
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box
                                            position={"relative"}
                                            minWidth={{
                                                xxl: "200px",
                                                xl: "200px",
                                                xs: "200px"
                                            }}
                                            display="flex"
                                            alignSelf="flex-start"
                                            justifyContent="flex-end"
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: theme.chips.background.warning,
                                                    color: theme.chips.text.warning,
                                                    borderRadius: "24px",
                                                    position: "absolute",
                                                    right: "0px",
                                                    padding: {
                                                        xs: "0px 5px",
                                                        md: "0px 4px",
                                                        lg: "0px 7px 0px 3px",
                                                        xxl: "1px 7px 1px 4px"
                                                    },
                                                    display: "flex",
                                                    gap: "4px",
                                                    alignSelf: "flex-end",
                                                    flexWrap: "nowrap",

                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontWeight: 400,
                                                    fontSize: {
                                                        xs: "12px"
                                                    },
                                                    lineHeight: {
                                                        xs: "16px",
                                                        md: "18px"
                                                    },
                                                    border: "2px  dashed transparent"
                                                }}
                                            >
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>{`this is Pending Information icon`}</title>
                                                    <g clipPath="url(#clip0_572_36976)">
                                                        <path
                                                            d="M8.00001 1.33203C4.32001 1.33203 1.33334 4.3187 1.33334 7.9987C1.33334 11.6787 4.32001 14.6654 8.00001 14.6654C11.68 14.6654 14.6667 11.6787 14.6667 7.9987C14.6667 4.3187 11.68 1.33203 8.00001 1.33203ZM8.66668 11.332H7.33334V9.9987H8.66668V11.332ZM8.66668 8.66536H7.33334V4.66536H8.66668V8.66536Z"
                                                            fill={`${theme.chips.text.warning}`}
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_572_36976">
                                                            <rect
                                                                width={16}
                                                                height={16}
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Pending Information
                                            </Box>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>

                        {/* radio buttons */}
                        <Box
                            display="flex"
                            gap="24px"
                            justifyContent={"space-between"}
                            flexDirection={{ md: "row", xs: "column" }}
                            flexWrap={{ xs: "wrap", lg: "nowrap" }}
                            mt={{
                                xs: "20px",
                                lg: "24px"
                            }}
                        >
                            <form aria-label={item.name} onSubmit={submitForm}>
                                <Box display="flex" sx={{ ml: "-9px" }}>
                                    <RadioGroup
                                        aria-label={`This is ${item.name} radio button`}
                                        name={item.name}
                                        onChange={(e) => {
                                            if (
                                                item.name == "Gift Cards" &&
                                                e.target.value === "Yes"
                                            ) {
                                                setShowPopup(true)
                                                setType("A")
                                            } else if (
                                                item.name ==
                                                "Property Management Integration" &&
                                                e.target.value === "Yes"
                                            ) {
                                                setShowPopup1(true)
                                            }
                                            handleChange(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }}
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
                                            disabled={disabled}
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
                                                    aria-label={`This is ${item.name} radio button`}
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
                                            disabled={disabled}
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
                                                    aria-label={`This is ${item.name} radio button`}

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
                            {item.name == "Gift Cards" && status !== "" && (
                                <Box width={{ xs: "100%", lg: "auto" }}>
                                    <Button
                                        aria-label="This is edit information button"
                                        disabled={disabled}
                                        onClick={() => setShowPopup(true)}
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
                            {item.name == "Property Management Integration" &&
                                status1 !== "" && (
                                    <Box width={{ xs: "100%", lg: "auto" }}>
                                        <Button
                                            aria-label="This is edit information button"
                                            disabled={disabled}
                                            onClick={() => setShowPopup1(true)}
                                            fontWeight="600"
                                            fontSize={{
                                                xs: "12px",
                                                md: "10px"
                                            }}
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
                                                width: {
                                                    xs: "100%",
                                                    lg: "auto"
                                                },
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
                    </Grid>
                ))}
            </Box>

            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: {
                        xs: "24px",
                        md: "32px"
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
                        className="next-button"
                        onClick={(e) => {
                            submitForm(e)
                        }}
                        disabled={isDisbled}
                        role="button"
                        aria-label="This is next step button"
                        variant="contained"
                        sx={{
                            // marginTop: { xs: "8px", md: "0px" },
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
                        Next Step
                    </Button>
                </Box>
            </Box>
            <Box>
                <PopupComp
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    data={selectBoxes}
                    setData={setData}
                    currentType={type}
                />
            </Box>
            <Box>
                <ManegementPopupComp
                    showPopup={showPopup1}
                    setShowPopup={setShowPopup1}
                    data={selectBoxes}
                    setData={setData1}
                    disabled={disabled}
                />
            </Box>

            <Box>
                <TooltipPopup
                    showPopup={showPopup2}
                    setShowPopup={setShowPopup2}
                    data={currentitem}
                />
            </Box>
        </Box>
    )
}
