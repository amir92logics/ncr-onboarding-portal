import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {
    Divider,
    useMediaQuery,
    Skeleton,
    Tooltip,
    styled,
    tooltipClasses
} from "@mui/material"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import SelectBox from "../common/Select"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { SetSideBarData } from "../../redux-setup/dataSlice"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../helper/Constraints"
import { makeStyles } from "@mui/styles"
import CommonButton from "../common/CommonButton"
import Input from "../common/Input"
import Image from "next/image"
const ToolTip = ""
const SetContant = () => {
    ToolTip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            // marginLeft: "-20px"
        },
        [`& .${tooltipClasses.arrow}`]: {
            // marginLeft: "10px"
        }
    }))
}
const useStyles = makeStyles(() => ({
    root: {
        "&:hover": {
            backgroundColor: "white !important"
        }
    }
}))

export default function BackOfficeComputer() {
    const [regextest, setRegextest] = useState(true)
    const [isIp, setIsIp] = useState(true)
    const [showTooltip, setShowToolTip] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    let count = 0
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Back Office Computer & Printer",
        "Back Office Computer & Printer",
        "refresh"
    )
    let bocdata = { ...substageinnerstages[currentindex] }
    let confirmation = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let initialData = [...bocdata.data]
    const [bocData, setBocData] = useState({
        computerLocated: {
            value: "",
            list: [
                {
                    value: "Sitting on my desk",
                    label: "Sitting on my desk"
                },
                {
                    value: "On the floor or under a desk",
                    label: "On the floor or under a desk"
                },
                {
                    value: "Mounted in a rack",
                    label: "Mounted in a rack"
                },
                {
                    value: "I’m not sure",
                    label: "I’m not sure"
                }
            ]
        },
        monitorConfigured: {
            value: "",
            list: [
                {
                    value: "Sitting on my desk",
                    label: "Sitting on my desk"
                },
                {
                    value: "On the floor or under a desk",
                    label: "On the floor or under a desk"
                },
                {
                    value: "Mounted in a rack",
                    label: "Mounted in a rack"
                },
                {
                    value: "I’m not sure",
                    label: "I’m not sure"
                }
            ]
        },

        shareKeyboard: {
            value: "",
            list: ["Yes", "No"]
        },
        externalModem: {
            value: "",
            list: ["Yes", "No"]
        },
        interface: {
            value: "",
            list: [
                {
                    value: "USB Cable",
                    label: "USB Cable"
                },
                {
                    value: "Wired Network (LAN Cable)",
                    label: "Wired Network (LAN Cable)"
                },
                {
                    value: "Wi-Fi",
                    label: "Wi-Fi"
                },
                {
                    value: "I don't know",
                    label: "I don't know"
                }
            ]
        },
        printermakemodel: {
            value: "",
            label: "Printer's make and model"
        },
        printerIp: {
            validIP: "",
            value: "",
            label: "Printer's IP address"
        }
    })

    let ValidationString =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+/[!@#$%^&*()_+-=[]{};:<>?],~;".split(
            ""
        )

    useEffect(() => {
        confirmation[0] == "Disabled" && setFieldsDisable(true)
        if (initialData?.length > 0) {
            let temp = { ...bocData }
            initialData.forEach((it) => {
                if (it.title.includes("keyboard")) {
                    temp.shareKeyboard.value = it.rowData[0]
                } else if (it.title.includes("interface")) {
                    temp.interface.value = it.rowData[0]
                } else if (it.title.includes("monitor")) {
                    temp.monitorConfigured.value = it.rowData[0]
                } else if (it.title.includes("modem")) {
                    temp.externalModem.value = it.rowData[0]
                } else if (it.title.includes("computer")) {
                    temp.computerLocated.value = it.rowData[0]
                } else if (it.title.includes("make and model")) {
                    temp.printermakemodel.value = it.rowData[0]
                    regextest ? setIsIp(true) : setIsIp(false)
                } else if (it.title.includes("IP address")) {
                    temp.printerIp.value = it.rowData[0]
                    regextest ? setIsIp(true) : setIsIp(false)
                }
            })
         
            setBocData({ ...temp })
        }
    }, [sideBarData])
    const theme = useTheme()
    const [fieldsDisable, setFieldsDisable] = useState(false)
    const [fetching] = useState(false)
    const octet = "(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)"
    const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`)

    const handleChange = (name, newValue) => {
        const currentStatus = { ...bocData }

        currentStatus[name].value = newValue

        if (name == "interface") {
            if (
                currentStatus.interface.value.includes("USB") ||
                currentStatus.interface.value.includes("I don't know")
            ) {
                currentStatus.printerIp.value = ""
            }
        }

        setBocData({ ...currentStatus })

        let temp = [
            {
                rowData: [currentStatus.computerLocated.value],
                title: "1. Where is your current back office computer located?"
            },
            {
                rowData: [currentStatus.monitorConfigured.value],
                title: "2. How is your current back office monitor configured?"
            },
            {
                rowData: [currentStatus.shareKeyboard.value],
                title: "3. Does your computer use a device to share your keyboard, video, and/or mouse? (KVM or KVMP)"
            },

            {
                rowData: [currentStatus.printermakemodel.value],
                title: "4. Please specify the make and model of your printer"
            },
            {
                rowData: [currentStatus.interface.value],
                title: "5. Which type of interface does your computer use?"
            },
            {
                rowData: [currentStatus.printerIp.value],
                title: "6. Please provide the IP address of your printer"
            }
        ]

        const backofficepercentage = 0
        if (
            currentStatus.interface.value.includes("Wired Network") ||
            currentStatus.interface.value.includes("Wi-Fi") ||
            name == "printerIp"
        ) {
            const _regextest = regextest
            if (name == "printerIp") {
                _regextest = regex.test(newValue)
                setRegextest(_regextest)
                _regextest ? setIsIp(true) : setIsIp(false)
            }

            count =
                (currentStatus.computerLocated.value ? 1 : 0) +
                (currentStatus.monitorConfigured.value ? 1 : 0) +
                (currentStatus.shareKeyboard.value ? 1 : 0) +
                (currentStatus.printermakemodel.value ? 1 : 0) +
                (currentStatus.interface.value ? 1 : 0) +
                (currentStatus.printerIp.value && _regextest ? 1 : 0)
            backofficepercentage = (count / 6) * 100
           
        } else {
            count =
                (currentStatus.computerLocated.value ? 1 : 0) +
                (currentStatus.monitorConfigured.value ? 1 : 0) +
                (currentStatus.shareKeyboard.value ? 1 : 0) +
                (currentStatus.printermakemodel.value ? 1 : 0) +
                (currentStatus.interface.value ? 1 : 0)
            backofficepercentage = (count / 5) * 100
        }

      
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Back Office Computer & Printer",
            "Back Office Computer & Printer",
            temp,
            Math.round(backofficepercentage),
            Math.round(backofficepercentage),
            false,
            true
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const isTablet = useMediaQuery((th) => th.breakpoints.down("lg"))
    const onClickNextStep = () => {
        router.push({
            pathname: `/discovery/back-office-computer-&-printer/confirmation/${routerID}`,
            query: { inner: true }
        })
    }

    return fetching ? (
        <Box
            className="boc-com"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            sx={{ width: "100%" }}
        >
            <Box
                sx={{
                    width: {
                        xxs: "100%",
                        xs: "100%",
                        md: "700px",
                        xl: "100%"
                    },
                    mt: {
                        md: 6
                    }
                }}
            >
                <Skeleton
                    sx={{
                        mt: 2,
                        fontWeight: "500",
                        animation: "pulse"
                    }}
                />

                <Box
                    sx={{
                        display: {
                            xl: "flex",
                            xs: "block"
                        }
                    }}
                    marginTop={theme.spacing(5)}
                >
                    <Skeleton
                        animation="pulse"
                        width="310px"
                        style={{ borderRadius: "6px" }}
                        height={"55.5px"}
                    />
                </Box>

                <Box
                    sx={{
                        display: {
                            xl: "flex",
                            xs: "block"
                        },
                        alignItem: "center"
                    }}
                    marginTop={theme.spacing(5)}
                >
                    <Skeleton
                        animation="pulse"
                        width="310px"
                        sx={{
                            borderRadius: "6px",
                            borderRight: "4px",
                            height: "55.5px"
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: { xl: "flex", xs: "block" },
                        alignItems: "start"
                    }}
                    marginTop={theme.spacing(5)}
                >
                    <Skeleton width="50%" animation="pulse" variant={"text"} />
                </Box>

                <Box
                    sx={{
                        display: { xl: "flex", xs: "block" },
                        alignItems: "start"
                    }}
                    marginTop={theme.spacing(5)}
                >
                    <Skeleton width="50%" animation="pulse" variant={"text"} />
                </Box>
            </Box>
        </Box>
    ) : (
        <Box
            onClick={() => showTooltip && setShowToolTip(false)}
            className="boc-com"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            sx={{ width: "100%" }}
        >
            <Box
                sx={{
                    width: {
                        xxs: "100%",
                        xs: "100%",
                        md: "100%",
                        xl: "100%"
                    },
                    mt: { md: "10px ", xs: "10px" }
                }}
            >
                <Box
                    className="shadow"
                    sx={{
                        backgroundColor: "#FFFFFF",
                        padding: {
                            lg: "24px 24px 24px 24px",
                            md: "22px 24px 24px 24px",
                            xs: "16px 16px 16px 16px"
                        },
                        borderRadius: "8px"
                    }}
                >
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        sx={{
                            marginBottom: { lg: "16px", md: "16px", xs: "12px" }
                        }}
                    >
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>This is Back office computer icon</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M20 18C21.1 18 21.99 17.1 21.99 16L22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V16C2 17.1 2.9 18 4 18H0V20H24V18H20ZM4 6H20V16H4V6Z"
                                fill="#1E1E1E"
                            />
                        </svg>

                        <Typography
                            sx={{
                                marginLeft: "8px",
                                fontSize: "20px",
                                lineHeight: "28px",
                                fontWeight: "600",
                                color: "#1E1E1E"
                            }}
                        >
                            Back Office Computer
                        </Typography>
                    </Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            lineHeight: "24px",
                            fontWeight: "400",
                            color: theme.palette.secondary.main
                        }}
                    >
                        This information will help us install and configure your
                        back office computer.
                    </Typography>
                    <Box
                        sx={{
                            display: {
                                md: "flex",
                                xs: "block"
                            },
                            alignItems: "center",
                            marginTop: { lg: "24px", md: "24px", xs: "24px" }
                        }}
                    >
                        <Typography
                            variant="body1"
                            aria-label=" Where is your current back office computer located?"
                            sx={{
                                display: "flex",
                                width: {
                                    xs: "100%"
                                },
                                marginBottom: {
                                    md: 0,
                                    xs: "16px"
                                },
                                marginRight: theme.spacing(5),
                                color: "#1E1E1E",
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 400
                            }}
                        >
                            1.&nbsp;Where is your current back office computer
                            located?
                        </Typography>
                        <Box
                            sx={{
                                marginLeft: {
                                    md: "33px",
                                    xs: 0
                                }
                            }}
                        >
                            <SelectBox
                                ariaLabel="this is computer Location selectbox"
                                color={theme.palette.secondary.main}
                                fontColor={theme.palette.secondary.main}
                                borderColor="#BDBDBD"
                                name="computerLocated"
                                disabled={fieldsDisable}
                                list={bocData?.computerLocated.list}
                                handleChange={handleChange}
                                value={bocData?.computerLocated?.value}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                md: "flex",
                                xs: "block"
                            },
                            alignItems: "center",
                            marginTop: { xs: "24px" }
                        }}
                    >
                        <Typography
                            aria-label="How is your current back office monitor configured?"
                            variant="body1"
                            sx={{
                                width: {
                                    xs: "100%"
                                },
                                marginBottom: {
                                    xs: "16px",
                                    md: 0
                                },
                                color: "#1E1E1E",
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 400
                            }}
                            marginRight={theme.spacing(5)}
                        >
                            2.&nbsp;How is your current back office monitor
                            configured?
                        </Typography>
                        <Box
                            sx={{
                                marginLeft: {
                                    md: "33px",
                                    xs: 0
                                }
                            }}
                        >
                            <SelectBox
                                ariaLabel="this is monitor Configuration selectbox"
                                color={theme.palette.secondary.main}
                                fontColor={theme.palette.secondary.main}
                                borderColor="#BDBDBD"
                                name="monitorConfigured"
                                list={bocData?.monitorConfigured.list}
                                handleChange={handleChange}
                                disabled={fieldsDisable}
                                value={bocData?.monitorConfigured.value}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                md: "flex",
                                xs: "block",
                                alignItems: "center"
                            },
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: {
                                xs: "24px"
                            }
                        }}
                    >
                        <Box
                            className="back-office-third-text"
                            variant="body1"
                            sx={{ display: "flex", color: "#1E1E1E" }}
                        >
                            {isMobile ? (
                                <>
                                    <Box
                                        component={"span"}
                                        style={{
                                            width: "100%"
                                        }}
                                    >
                                        <Box
                                            component={"span"}
                                            aria-label="Does your computer use a device to share your keyboard,
                          video, and/or mouse (KVM or KVMP)?"
                                            style={{
                                                color: "#1E1E1E",
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                fontWeight: 400
                                            }}
                                        >
                                            3.&nbsp;Does your computer use a
                                            device to share your keyboard,
                                            monitor, and/or mouse? (KVM or KVMP)
                                            <Box
                                                onClick={() =>
                                                    setShowToolTip(!showTooltip)
                                                }
                                                component={"span"}
                                                sx={{
                                                    display: "inline-block",
                                                    paddingLeft: {
                                                        xl: "4px",
                                                        lg: "0px"
                                                    },
                                                    alignItems: "end",
                                                    position: "relative",
                                                    top: "4px",
                                                    left: "3px"
                                                }}
                                            >
                                                <Tooltip
                                                    aria-label=""
                                                    open={showTooltip}
                                                    title={
                                                        <Box>
                                                            <Typography
                                                                display={
                                                                    "block"
                                                                }
                                                                sx={{
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "16px",
                                                                    color: "#fff",
                                                                    mb: "12px"
                                                                }}
                                                            >
                                                                KVM Switch
                                                            </Typography>

                                                            <Image
                                                                width={591}
                                                                height={375}
                                                                alt={"kvm-switch"}
                                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/kvm-switch.png`}
                                                            />
                                                        </Box>
                                                    }
                                                    placement="top"
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems:
                                                                    "end",

                                                                color: "#fff",
                                                                fontSize:
                                                                    "12px",
                                                                padding: "12px",
                                                                fontWeight: 400,
                                                                lineHeight:
                                                                    "18px"
                                                            }
                                                        }
                                                    }}
                                                    arrow={true}
                                                >
                                                    <Box
                                                        component={"span"}
                                                        sx={{
                                                            cursor: "pointer",
                                                            fontWeight: "700",
                                                            fontSize: "24px",
                                                            lineHeight: "32px",
                                                            color: "#757575",
                                                            "&:hover": {
                                                                color: "#1e1e1e !important"
                                                            }
                                                        }}
                                                    >
                                                        <svg
                                                            width={18}
                                                            height={18}
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>{`This is tooltip icon for KVM Switch`}</title>
                                                            <path
                                                                d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            ) : (
                                <Box
                                    component={"span"}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}
                                >
                                    <Box
                                        component={"span"}
                                        aria-label="Does your computer use a device to share your keyboard,
                        video, and/or mouse (KVM or KVMP)?"
                                        sx={{
                                            color: "#1E1E1E",
                                            fontSize: "16px",
                                            lineHeight: {
                                                xs: "24px"
                                            },
                                            fontWeight: 400
                                        }}
                                    >
                                        3.&nbsp;Does your computer use a device
                                        to share your keyboard, monitor, and/or
                                        mouse?{" "}
                                        <Box
                                            component={"span"}
                                            whiteSpace="nowrap"
                                        >
                                            (KVM or KVMP)
                                            <Box
                                                onClick={() =>
                                                    isTablet &&
                                                    setShowToolTip(!showTooltip)
                                                }
                                                component={"span"}
                                                sx={{
                                                    display: "inline-block",
                                                    paddingLeft: {
                                                        xl: "4px",
                                                        lg: "0px"
                                                    },
                                                    alignItems: "end",
                                                    position: "relative",
                                                    top: {
                                                        xl: "5.1px",
                                                        lg: "5.1px",
                                                        md: "2px"
                                                    },
                                                    left: {
                                                        xl: "3px",
                                                        lg: "3px",
                                                        md: "5px"
                                                    }
                                                }}
                                            >
                                                {isTablet && (
                                                    <Box
                                                        sx={{
                                                            display: {
                                                                lg: "none",
                                                                md: "block"
                                                            }
                                                        }}
                                                    >
                                                        <ToolTip
                                                            aria-label=""
                                                            open={showTooltip}
                                                            title={
                                                                <Box>
                                                                    <Typography
                                                                        display={
                                                                            "block"
                                                                        }
                                                                        sx={{
                                                                            fontWeight:
                                                                                "600",
                                                                            lineHeight:
                                                                                "16px",
                                                                            color: "#fff",
                                                                            mb: "12px"
                                                                        }}
                                                                    >
                                                                        KVM
                                                                        Switch
                                                                    </Typography>

                                                                    <Image
                                                                        width={
                                                                            591
                                                                        }
                                                                        height={
                                                                            375
                                                                        }
                                                                        alt={
                                                                            "kvm-switch"
                                                                        }
                                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/kvm-switch.png`}
                                                                    />
                                                                </Box>
                                                            }
                                                            placement="top"
                                                            componentsProps={{
                                                                tooltip: {
                                                                    sx: {
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "end",

                                                                        color: "#fff",
                                                                        fontSize:
                                                                            "12px",
                                                                        padding:
                                                                            "12px",
                                                                        fontWeight: 400,
                                                                        lineHeight:
                                                                            "18px"
                                                                    }
                                                                }
                                                            }}
                                                            arrow={true}
                                                        >
                                                            <Box
                                                                component={
                                                                    "span"
                                                                }
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    fontWeight:
                                                                        "700",
                                                                    fontSize:
                                                                        "24px",
                                                                    lineHeight:
                                                                        "32px",
                                                                    color: "#757575",
                                                                    "&:hover": {
                                                                        color: "#1e1e1e !important"
                                                                    }
                                                                }}
                                                            >
                                                                <svg
                                                                    width={18}
                                                                    height={18}
                                                                    viewBox="0 0 18 18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>{`This is tooltip icon for KVM Switch`}</title>

                                                                    <path
                                                                        d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                            </Box>
                                                        </ToolTip>
                                                    </Box>
                                                )}
                                                <Box
                                                    sx={{
                                                        display: {
                                                            lg: "block",
                                                            md: "none"
                                                        }
                                                    }}
                                                >
                                                    <ToolTip
                                                        aria-label=""
                                                        title={
                                                            <Box>
                                                                <Typography
                                                                    display={
                                                                        "block"
                                                                    }
                                                                    sx={{
                                                                        fontWeight:
                                                                            "600",
                                                                        lineHeight:
                                                                            "16px",
                                                                        color: "#fff",
                                                                        mb: "12px"
                                                                    }}
                                                                >
                                                                    KVM Switch
                                                                </Typography>

                                                                <Image
                                                                    width={591}
                                                                    height={375}
                                                                    alt={"kvm-switch"}
                                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/kvm-switch.png`}
                                                                />
                                                            </Box>
                                                        }
                                                        placement="top"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "end",

                                                                    color: "#fff",
                                                                    fontSize:
                                                                        "12px",
                                                                    padding:
                                                                        "12px",
                                                                    fontWeight: 400,
                                                                    lineHeight:
                                                                        "18px"
                                                                }
                                                            }
                                                        }}
                                                        arrow={true}
                                                    >
                                                        <Box
                                                            component={"span"}
                                                            sx={{
                                                                cursor: "pointer",
                                                                fontWeight:
                                                                    "700",
                                                                fontSize:
                                                                    "24px",
                                                                lineHeight:
                                                                    "32px",
                                                                color: "#757575",
                                                                "&:hover": {
                                                                    color: "#1e1e1e !important"
                                                                }
                                                            }}
                                                        >
                                                            <svg
                                                                width={18}
                                                                height={18}
                                                                viewBox="0 0 18 18"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>{`This is tooltip icon for  KVM Switch`}</title>

                                                                <path
                                                                    d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </Box>
                                                    </ToolTip>
                                                </Box>
                                                {SetContant()}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box
                            sx={{
                                marginLeft: {
                                    md: "33px",
                                    xs: "4px"
                                },
                                marginTop: {
                                    md: "0px",
                                    xs: "16px"
                                },
                                width: "48%"
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "end",
                                    color: "#1E1E1E",
                                    width: "100%"
                                }}
                            >
                                <RadioGroup
                                    aria-label="This is radio button for yes option"
                                    name="shareKeyboard"
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.name,
                                            e.target.value
                                        )
                                    }
                                    value={bocData.shareKeyboard.value}
                                    sx={{
                                        display: "flex",
                                        gap: { md: 9, xs: 0 },
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },
                                        width: "100%",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <FormControlLabel
                                        value="Yes"
                                        control={
                                            <Radio
                                                classes={{
                                                    checked: classes.root
                                                }}
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: fieldsDisable
                                                            ? "#727272"
                                                            : theme.palette
                                                                  .primary.main
                                                    },
                                                    "&:hover": {
                                                        background:
                                                            "#F5F5F5 !important"
                                                    },
                                                    marginRight: {
                                                        xs: "16px !important"
                                                    },
                                                    padding: {
                                                        xs: "4px 4px 4px 4px !important"
                                                    }
                                                }}
                                                disabled={fieldsDisable}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    color: theme.palette
                                                        .secondary.main
                                                }}
                                            >
                                                Yes
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        sx={{
                                            mt: { md: 0, xs: 4 }
                                        }}
                                        value="No"
                                        control={
                                            <Radio
                                                aria-label="This is radio button for no option"
                                                classes={{
                                                    checked: classes.root
                                                }}
                                                sx={{
                                                    "&:hover": {
                                                        background:
                                                            "#F5F5F5 !important"
                                                    },
                                                    "&.Mui-checked": {
                                                        color: fieldsDisable
                                                            ? "#727272"
                                                            : theme.palette
                                                                  .primary.main
                                                    },
                                                    mr: {
                                                        xs: "16px !important"
                                                    },
                                                    padding: {
                                                        xs: "4px !important"
                                                    }
                                                }}
                                                disabled={fieldsDisable}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    color: theme.palette
                                                        .secondary.main
                                                }}
                                            >
                                                No
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    className="shadow"
                    sx={{
                        backgroundColor: "#FFFFFF",
                        padding: { md: "24px", xs: "16px" },
                        marginTop: { md: "30px", xs: "25.5px" },
                        borderRadius: "8px"
                    }}
                >
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        sx={{ marginBottom: { md: "16px", xs: "12px" } }}
                    >
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>This is Back Office Printer icon</title>
                            <g clipPath="url(#clip0_21_45252)">
                                <rect
                                    width={24}
                                    height={24}
                                    rx={12}
                                    fill="#E8EEFF"
                                />
                                <title>This is Back Office Printer icon</title>
                                <path
                                    d="M19 8H18V3H6V8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM8 5H16V8H8V5ZM16 17V19H8V15H16V17ZM18 15V13H6V15H4V11C4 10.45 4.45 10 5 10H19C19.55 10 20 10.45 20 11V15H18Z"
                                    fill="#1E1E1E"
                                />
                                <path
                                    d="M18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5C17.4477 10.5 17 10.9477 17 11.5C17 12.0523 17.4477 12.5 18 12.5Z"
                                    fill="#1E1E1E"
                                />
                            </g>
                            <defs>
                                <clipPath>
                                    <rect
                                        width={24}
                                        height={24}
                                        rx={12}
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>

                        <Typography
                            sx={{
                                marginLeft: "8px",
                                fontSize: "20px",
                                lineHeight: "28px",
                                fontWeight: "600",
                                color: "#1E1E1E"
                            }}
                        >
                            Back Office Printer
                        </Typography>
                    </Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            lineHeight: "24px",
                            fontWeight: "400",
                            color: theme.palette.secondary.main
                        }}
                    >
                        Since there may be a Back Office computer involved in
                        your order we would also like to ask a few questions
                        concerning a Back Office Report printer if you have one
                        at your location. Most modern Report Printers use a USB
                        or a Network connection to interface with the Back
                        Office Computer.
                    </Typography>
                    <Box
                        display={"flex"}
                        sx={{
                            flexDirection: { md: "row", xs: "column" },
                            marginTop: {
                                lg: "24px",
                                md: "24px",
                                xs: "24px"
                            },
                            alignItems: { md: "center" }
                        }}
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                lineHeight: "24px",
                                mb: { md: 0, xs: "16px" },
                                marginRight: theme.spacing(5),

                                color: theme.palette.textColor.main
                            }}
                        >
                            Please specify the make and model of your printer:
                        </Typography>
                        <Input
                            ariaLabel="this is printer make model input"
                            className={"ncr-new-input"}
                            label={bocData.printermakemodel.label}
                            disabled={fieldsDisable}
                            sx={{
                                marginLeft: {
                                    md: "33px",
                                    xs: 0
                                },
                                maxWidth: { lg: "340px", md: "300px" }
                            }}
                            name="printermakemodel"
                            value={bocData.printermakemodel.value}
                            onChange={(e) => {
                                handleChange("printermakemodel", e.target.value)
                            }}
                            maxLength={40}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: {
                                md: "flex",
                                xs: "block"
                            },
                            alignItems: "center",
                            marginTop: { lg: "24px", md: "24px", xs: "24px" }
                        }}
                    >
                        <Typography
                            aria-label=" Where is your current back office computer located?"
                            variant="body1"
                            sx={{
                                display: "flex",
                                width: {
                                    xs: "100%"
                                },
                                marginBottom: {
                                    md: 0,
                                    xs: "16px"
                                },
                                marginRight: theme.spacing(5),
                                color: "#1E1E1E",
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 400
                            }}
                        >
                            How will your office printer connect to your Aloha
                            system? (NCR recommends a USB cable connection to
                            your Aloha back-of-house server)
                        </Typography>
                        <Box
                            sx={{
                                marginLeft: {
                                    md: "33px",
                                    xs: 0
                                }
                            }}
                        >
                            <SelectBox
                                ariaLabel="this is interface selectbox"
                                color={theme.palette.secondary.main}
                                fontColor={theme.palette.secondary.main}
                                borderColor="#BDBDBD"
                                name="interface"
                                disabled={fieldsDisable}
                                list={bocData?.interface.list}
                                handleChange={handleChange}
                                value={bocData?.interface?.value}
                            />
                        </Box>
                    </Box>
                    {(bocData.interface.value.includes("Wired Network") ||
                        bocData.interface.value.includes("Wi-Fi")) && (
                        <Box
                            sx={{
                                display: {
                                    md: "flex",
                                    xs: "block"
                                },
                                alignItems: "center",
                                marginTop: {
                                    lg: "24px",
                                    md: "24px",
                                    xs: "24px"
                                }
                            }}
                        >
                            <Typography
                                aria-label=" Where is your current back office computer located?"
                                variant="body1"
                                sx={{
                                    display: "flex",
                                    width: {
                                        xs: "100%"
                                    },
                                    marginBottom: {
                                        md: 0,
                                        xs: "16px"
                                    },
                                    marginRight: theme.spacing(5),
                                    color: "#1E1E1E",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    fontWeight: 400
                                }}
                            >
                                Please provide the IP address of your printer:
                            </Typography>
                            <Box
                                sx={{
                                    marginLeft: {
                                        md: "33px",
                                        xs: 0
                                    }
                                }}
                            >
                                <Input
                                    ariaLabel="this is printer ip address input"
                                    className={"ncr-new-input"}
                                    label={bocData.printerIp.label}
                                    disabled={fieldsDisable}
                                    sx={{
                                        minWidth: { lg: "340px", md: "300px" }
                                    }}
                                    name="printerIp"
                                    value={bocData.printerIp.value}
                                    onChange={(e) => {
                                        handleChange(
                                            "printerIp",
                                            e.target.value
                                        )
                                    }}
                                    maxLength={40}
                                    err={
                                        isIp || bocData.printerIp.value == ""
                                            ? false
                                            : true
                                    }
                                    onKeyDown={(e) =>
                                        ValidationString.includes(e.key) &&
                                        e.preventDefault()
                                    }
                                />
                            </Box>
                        </Box>
                    )}
                </Box>

                <>
                    <Divider
                        className="divider-col"
                        sx={{
                            display: {
                                md: "block",
                                xs: "block"
                            },

                            width: "100%",
                            marginTop: {
                                lg: "32px",
                                md: "32px",
                                xs: "24px"
                            }
                        }}
                    />
                    <Box
                        justifyContent="flex-start"
                        sx={{
                            paddingY: {
                                lg: theme.spacing(6),
                                md: theme.spacing(6),
                                xs: theme.spacing(5.6)
                            },
                            display: {
                                xs: "flex"
                            },
                            justifyContent: "flex-end",
                            flexDirection: {
                                md: "row",
                                xs: "column"
                            },
                            width: { xs: "100%", md: "auto" }
                        }}
                    >
                        <CommonButton
                            className={"next-button"}
                            onclickHandler={onClickNextStep}
                            ariaTag={"this is Proceed to Confirmation button"}
                            variant={"contained"}
                            disabled={bocdata.percentage !== 100}
                            px={{ md: "20px", xs: "21px" }}
                            py={{ md: "10px", xs: "12px" }}
                            width={{
                                xs: "100%",
                                md: "auto"
                            }}
                            color="white"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            content={"Proceed to Confirmation"}
                            mb="8px"
                        />
                    </Box>
                </>
            </Box>
        </Box>
    )
}
