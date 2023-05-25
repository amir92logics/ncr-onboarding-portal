import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
    Divider,
    Tooltip,
    tableCellClasses,
    styled,
    tooltipClasses,
    useMediaQuery,
    Button
} from "@mui/material"
import MuiTextArea from "../../../common/MuiTextArea/MuiTextArea"
import AddNewItem from "../../../common/AddNewItem/AddNewItemDuplicate"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CommonButton from "../../../common/CommonButton"
import { useRouter } from "next/router"
import theme from "../../../../src/theme"
import { useDispatch, useSelector } from "react-redux"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import Image from "next/image"

export default function PrinterRoutingComponent() {
    const IncludedPrinterRouting = [
        {
            title: "Menu Category",

            name: [" Apps", "Salads", " Sandwiches", "Entress"]
        },
        {
            title: "Printer Groups",

            name: ["Fry & Expo", "Expo", "Grill & Expo", "All Kitchen"]
        }
    ]

    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip
            aria-label=""
            {...props}
            arrow
            classes={{ popper: className }}
            title={
                <>
                    <Box
                        display="flex"
                        flexDirection="row"
                        sx={{
                            bgcolor: "#616161",
                            color: "#FFFFFF",
                            borderRadius: "8px"
                        }}
                    >
                        {IncludedPrinterRouting.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Box
                                        sx={{
                                            borderRight:
                                                index == 0 &&
                                                "1px solid #B0B1B4"
                                        }}
                                    >
                                        <Typography
                                            padding={"16px 12px"}
                                            fontSize="12px"
                                            lineHeight="18px"
                                            fontWeight={600}
                                            color="#E0E0E0"
                                        >
                                            {item.title}
                                        </Typography>

                                        {item.name.map((names, ind) => {
                                            return (
                                                <Box
                                                    fontSize="12px"
                                                    lineHeight="18px"
                                                    sx={{
                                                        borderTop:
                                                            (ind == 0 ||
                                                                ind == 2) &&
                                                            "1px solid #B0B1B4",
                                                        borderBottom:
                                                            (ind == 0 ||
                                                                ind == 2) &&
                                                            "1px solid #B0B1B4"
                                                    }}
                                                    padding={"16px 12px"}
                                                    key={ind}
                                                >
                                                    {names}
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </React.Fragment>
                            )
                        })}
                    </Box>
                </>
            }
            placement="right-start"
            componentsProps={{
                tooltip: {
                    sx: {
                        mt: "-20px",
                        borderRadius: "11px",
                        bgcolor: "#616161",

                        color: "#fff",
                        fontSize: "12px",
                        padding: "0px",
                        fontWeight: 400,
                        lineHeight: "18px"
                    }
                }
            }}
        ></Tooltip>
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: "#616161",
            marginTop: "10px"
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#616161"
        }
    }))
    const isDesktop = useMediaQuery((th) => th.breakpoints.up("1151"))
    const isTablet = useMediaQuery((th) => th.breakpoints.up("671"))
    const isTablet2 = useMediaQuery((th) => th.breakpoints.down("lg"))
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const router = useRouter()
    const routerID = router.query.id
    const [addtionalMenu, setAdditonalMenu] = useState([])
    const [showNofication, setShowNofication] = useState(false)
    const [addtionalPrinterGroup, setPrinterGroup] = useState([])
    const [tooltipOpen, settooltipOpen] = useState(false)
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const dispatch = useDispatch()
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Operations",
        "Printer Routing"
    )
    let inner2 = substageinnerstages.find((it) => it.name == "Printer Groups")
    let inner2per = inner2?.percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Ordering Process"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Prep Printer Names"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let initialData = currentstagedata.data
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            initialData[0].addtionalPrinterGroup?.length > 0 &&
                setPrinterGroup(initialData[0].addtionalPrinterGroup)
            initialData[0].addtionalMenu?.length > 0 &&
                setAdditonalMenu(initialData[0].addtionalMenu)
            initialData[0].comment && setComment(initialData[0].comment)
        }


    }, [initialData])

    const [comment, setComment] = useState("")
    const updateStore = (_addtionalMenu, _addtionalPrinterGroup, _comment) => {
        let data = [
            {
                addtionalMenu: _addtionalMenu,
                addtionalPrinterGroup: _addtionalPrinterGroup,
                comment: _comment
            }
        ]
        let count = _addtionalPrinterGroup.length > 0 ? 1 : 0
        let tempPercent = (count / 1) * 100
        const currentinnerpercentage = Math.round(
            (tempPercent + inner2per + inner3per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Operations",
            "Printer Routing",
            data,
            tempPercent,
            currentinnerpercentage,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const submitForm = () => {
        let data = [{ addtionalMenu, addtionalPrinterGroup, comment }]
        let count = addtionalPrinterGroup.length > 0 ? 1 : 0
        let tempPercent = (count / 1) * 100

        const currentinnerpercentage = Math.round(
            (tempPercent + inner2per + inner3per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Operations",
            "Printer Routing",
            data,
            tempPercent,
            currentinnerpercentage,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
        currentinnerpercentage == 100
            ? router.push({
                pathname: `/discovery/operations/operation-confirmation/${routerID}`,
                query: { inner: true }
            })
            : setShowNofication(true)
    }

    const handleChange = (e) => {
        setComment(e)
        updateStore(addtionalMenu, addtionalPrinterGroup, e)
    }
    const setPrinterData = (_data) => {
        setPrinterGroup(_data)
        updateStore(addtionalMenu, _data, comment)
    }
    const handleBack = () => {
        router.push({
            pathname: `/discovery/operations/printer-groups/${routerID}`,
            query: { inner: true }
        })
    }

    useEffect(() => {
        isDesktop && settooltipOpen(false)
    }, [isDesktop])


    return (

        <Box
            onClick={() => tooltipOpen && settooltipOpen(false)}
            className="operations-set1"
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Box
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        xs: "16px"
                    },
                    lineHeight: {
                        xs: "24px"
                    },
                    color: theme.palette.textColor.main,
                    width: "100%"
                }}
                className="Top-text"
            >
                Please list your Menu Categories below and assign a Printer
                Group to designate where items from that Menu Category will need
                to print.{" "}
                <Box
                    component={"br"}
                    sx={{ display: { lg: "none", md: "block", xs: "none" } }}
                />{" "}
                Please see the examples.{" "}
                <Box
                    onClick={(event) => {
                        event.preventDefault()

                        isTablet2 && settooltipOpen(!tooltipOpen)
                    }}
                    component={"span"}
                    sx={{
                        position: "relative",
                        display: { md: "inline-flex", xs: "none" },
                        alignItems: "center",
                        columnGap: 1.2,
                        ml: { xxl: 3, xl: 1.9, lg: 2.3, md: 1, xs: 1.5 }
                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.secondary.main,
                            fontSize: "12px",
                            lineHeight: "18px"
                        }}
                    >
                        View Examples
                    </Typography>{" "}
                    {isTablet && (
                        <Box sx={{ display: { lg: "none", md: "block" } }}>
                            <BootstrapTooltip aria-label='This is printer routing tooltip' open={isTablet2 && tooltipOpen}>
                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "24px",
                                        lineHeight: "22px",
                                        cursor: "pointer"
                                    }}
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>{`this is View Examples tooltip icon`}</title>
                                        <g clipPath="url(#clip0_3970_10880)">
                                            <path
                                                d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                stroke="#8E8E8E"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                stroke="black"
                                                strokeOpacity="0.2"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 14.1641V14.1741"
                                                stroke="#8E8E8E"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 14.1641V14.1741"
                                                stroke="black"
                                                strokeOpacity="0.2"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9.9987 11.249C9.98335 10.9785 10.0563 10.7103 10.2066 10.4848C10.3569 10.2594 10.5764 10.0889 10.832 9.999C11.1453 9.87922 11.4264 9.68836 11.6533 9.44146C11.8803 9.19456 12.0468 8.89835 12.1398 8.57616C12.2328 8.25396 12.2498 7.91458 12.1893 7.58472C12.1289 7.25486 11.9927 6.94354 11.7915 6.67526C11.5903 6.40698 11.3295 6.18907 11.0298 6.03868C10.73 5.88829 10.3995 5.80953 10.0641 5.8086C9.72879 5.80767 9.3978 5.8846 9.09723 6.03332C8.79667 6.18204 8.53473 6.39851 8.33203 6.66567"
                                                stroke="#8E8E8E"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9.9987 11.249C9.98335 10.9785 10.0563 10.7103 10.2066 10.4848C10.3569 10.2594 10.5764 10.0889 10.832 9.999C11.1453 9.87922 11.4264 9.68836 11.6533 9.44146C11.8803 9.19456 12.0468 8.89835 12.1398 8.57616C12.2328 8.25396 12.2498 7.91458 12.1893 7.58472C12.1289 7.25486 11.9927 6.94354 11.7915 6.67526C11.5903 6.40698 11.3295 6.18907 11.0298 6.03868C10.73 5.88829 10.3995 5.80953 10.0641 5.8086C9.72879 5.80767 9.3978 5.8846 9.09723 6.03332C8.79667 6.18204 8.53473 6.39851 8.33203 6.66567"
                                                stroke="black"
                                                strokeOpacity="0.2"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath >
                                                <rect
                                                    width={20}
                                                    height={20}
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Typography>
                            </BootstrapTooltip>
                        </Box>
                    )}
                    {isDesktop && (
                        <BootstrapTooltip>
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "24px",
                                    lineHeight: "22px",
                                    cursor: "pointer"
                                }}
                            >
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>{`this is View Examples tooltip icon`}</title>
                                    <g clipPath="url(#clip0_3970_10880)">
                                        <path
                                            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                            stroke="#8E8E8E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                            stroke="black"
                                            strokeOpacity="0.2"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10 14.1641V14.1741"
                                            stroke="#8E8E8E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10 14.1641V14.1741"
                                            stroke="black"
                                            strokeOpacity="0.2"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.9987 11.249C9.98335 10.9785 10.0563 10.7103 10.2066 10.4848C10.3569 10.2594 10.5764 10.0889 10.832 9.999C11.1453 9.87922 11.4264 9.68836 11.6533 9.44146C11.8803 9.19456 12.0468 8.89835 12.1398 8.57616C12.2328 8.25396 12.2498 7.91458 12.1893 7.58472C12.1289 7.25486 11.9927 6.94354 11.7915 6.67526C11.5903 6.40698 11.3295 6.18907 11.0298 6.03868C10.73 5.88829 10.3995 5.80953 10.0641 5.8086C9.72879 5.80767 9.3978 5.8846 9.09723 6.03332C8.79667 6.18204 8.53473 6.39851 8.33203 6.66567"
                                            stroke="#8E8E8E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.9987 11.249C9.98335 10.9785 10.0563 10.7103 10.2066 10.4848C10.3569 10.2594 10.5764 10.0889 10.832 9.999C11.1453 9.87922 11.4264 9.68836 11.6533 9.44146C11.8803 9.19456 12.0468 8.89835 12.1398 8.57616C12.2328 8.25396 12.2498 7.91458 12.1893 7.58472C12.1289 7.25486 11.9927 6.94354 11.7915 6.67526C11.5903 6.40698 11.3295 6.18907 11.0298 6.03868C10.73 5.88829 10.3995 5.80953 10.0641 5.8086C9.72879 5.80767 9.3978 5.8846 9.09723 6.03332C8.79667 6.18204 8.53473 6.39851 8.33203 6.66567"
                                            stroke="black"
                                            strokeOpacity="0.2"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath >
                                            <rect
                                                width={20}
                                                height={20}
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Typography>
                        </BootstrapTooltip>
                    )}
                </Box>
            </Box>
            {isMobile && (
                <Box
                    component={"span"}
                    onClick={(event) => {
                        event.preventDefault()
                        settooltipOpen(!tooltipOpen)
                    }}
                    sx={{
                        display: { md: "none", xs: "inline-flex" },
                        alignItems: "center",
                        columnGap: 1.2
                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.secondary.main,
                            fontSize: "12px",
                            lineHeight: "18px"
                        }}
                    >
                        View Examples
                    </Typography>{" "}
                    <BootstrapTooltip aria-label='This is printer routing tooltip.' open={tooltipOpen}>
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "24px",
                                lineHeight: "22px",
                                cursor: "pointer"
                            }}
                        >
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`this is View Examples tooltip icon`}</title>
                                <g clipPath="url(#clip0_3970_10880)">
                                    <path
                                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                        stroke="#8E8E8E"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                        stroke="black"
                                        strokeOpacity="0.2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 14.1641V14.1741"
                                        stroke="#8E8E8E"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 14.1641V14.1741"
                                        stroke="black"
                                        strokeOpacity="0.2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.9987 11.249C9.98335 10.9785 10.0563 10.7103 10.2066 10.4848C10.3569 10.2594 10.5764 10.0889 10.832 9.999C11.1453 9.87922 11.4264 9.68836 11.6533 9.44146C11.8803 9.19456 12.0468 8.89835 12.1398 8.57616C12.2328 8.25396 12.2498 7.91458 12.1893 7.58472C12.1289 7.25486 11.9927 6.94354 11.7915 6.67526C11.5903 6.40698 11.3295 6.18907 11.0298 6.03868C10.73 5.88829 10.3995 5.80953 10.0641 5.8086C9.72879 5.80767 9.3978 5.8846 9.09723 6.03332C8.79667 6.18204 8.53473 6.39851 8.33203 6.66567"
                                        stroke="#8E8E8E"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.9987 11.249C9.98335 10.9785 10.0563 10.7103 10.2066 10.4848C10.3569 10.2594 10.5764 10.0889 10.832 9.999C11.1453 9.87922 11.4264 9.68836 11.6533 9.44146C11.8803 9.19456 12.0468 8.89835 12.1398 8.57616C12.2328 8.25396 12.2498 7.91458 12.1893 7.58472C12.1289 7.25486 11.9927 6.94354 11.7915 6.67526C11.5903 6.40698 11.3295 6.18907 11.0298 6.03868C10.73 5.88829 10.3995 5.80953 10.0641 5.8086C9.72879 5.80767 9.3978 5.8846 9.09723 6.03332C8.79667 6.18204 8.53473 6.39851 8.33203 6.66567"
                                        stroke="black"
                                        strokeOpacity="0.2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath >
                                        <rect
                                            width={20}
                                            height={20}
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Typography>
                    </BootstrapTooltip>
                </Box>
            )}

            <AddNewItem
                disabled={disabled}
                description="Please list your Menu Categories below and assign a Printer Group to designate where items from that Menu Category will need to print."
                type={[
                    {
                        Value: " ",
                        type: "text",
                        Name: "tax-name",
                        fieldPlaceHolder: "Menu Category"
                    },
                    {
                        Value: "",
                        type: "select-box",
                        Name: "tax-amount",
                        fieldPlaceHolder: "Printer Group"
                    }
                ]}
                endpointForPost="/"
                additionalArray={addtionalPrinterGroup}
                setAdditonal={setPrinterData}
                title="Add Printer Routing"
                deleteTitle="Printer Routing"
                buttonText="Add Printer Routing"
                marginTop={"25px"}
                hideTooltip={true}
                printer={true}
                Screen={"printer-routing"}
                AdditionalPrinterGroup={inner2?.data}
            />
            {/* Here is PopUP */}

            {addtionalPrinterGroup.length > 0 ? (
                <TableContainer
                    component={Paper}
                    className="shadow"
                    sx={{
                        marginTop: "8px",
                        width: "100%",
                        borderRadius: "6px !important"
                    }}
                >
                    <Table
                        size="small"
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none"
                            }
                        }}
                        aria-label="This is printer routing table."
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: {
                                            xxl: "54.3%",
                                            xl: "46.1%",
                                            lg: "36.4%",
                                            md: "13.5%"
                                        },
                                        boxShadow:
                                            "inset 0px -1px 0px rgba(229, 231, 235, 0.8)",

                                        padding: "15.5px 16px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#1E1E1E"
                                    }}
                                >
                                    Menu Category
                                </TableCell>
                                <TableCell
                                    width={"50%"}
                                    sx={{
                                        boxShadow:
                                            "inset 0px -1px 0px rgba(229, 231, 235, 0.8)",

                                        padding: "15.5px 16px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#1E1E1E"
                                    }}
                                    align="left"
                                >
                                    Printer Groups
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addtionalPrinterGroup.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            boxShadow:
                                                addtionalPrinterGroup.length -
                                                    1 ===
                                                    i
                                                    ? ""
                                                    : "inset 0px -1px 0px rgba(229, 231, 235, 0.8)",

                                            padding: "19.5px 16px",
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        {row[0].Value}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            boxShadow:
                                                addtionalPrinterGroup.length -
                                                    1 ===
                                                    i
                                                    ? ""
                                                    : "inset 0px -1px 0px rgba(229, 231, 235, 0.8)",

                                            padding: "19.5px 16px",
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        {row[1].Value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        width: "100%",
                        py: 6,
                        boxShadow:
                            "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)",
                        textAlign: "center"
                    }}
                >
                    <Image
                        alt={"This is Printer image"}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/printer.png`}
                        width={122}
                        height={122}
                    />

                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{ fontWeight: 600, color: "#727272" }}>
                            No Printer Routings
                        </Typography>
                        <Typography sx={{ color: "#727272" }}>
                            Once a Printer Routing is added, it will be
                            displayed here.
                        </Typography>
                    </Box>
                    <Box width={200} sx={{ mx: "auto" }}>
                        <AddNewItem
                            disabled={disabled}
                            description="Please list your Menu Categories below and assign a Printer Group to designate where items from that Menu Category will need to print."
                            type={[
                                {
                                    Value: " ",
                                    type: "text",
                                    Name: "tax-name",
                                    fieldPlaceHolder: "Menu Category"
                                },
                                {
                                    Value: "",
                                    type: "select-box",
                                    Name: "tax-amount",
                                    fieldPlaceHolder: "Printer Group"
                                }
                            ]}
                            additionalArray={addtionalPrinterGroup}
                            setAdditonal={setPrinterData}
                            title="Add Printer Routing"
                            deleteTitle="Printer Routing"
                            buttonText="Add Printer Routing2"
                            marginTop={"24px"}
                            hideTooltip={true}
                            printer={true}
                            Screen={"printer-routing"}
                            AdditionalPrinterGroup={inner2?.data}
                        />
                    </Box>
                </Box>
            )}

            <Typography
                sx={{
                    fontWeight: 400,
                    marginTop: { md: 8, xs: 6 },
                    fontSize: {
                        xs: "16px"
                    },
                    lineHeight: {
                        xs: "24px"
                    },
                    color: theme.palette.textColor.main
                }}
            >
                Please list any exceptions to the printer routing specified
                above.
            </Typography>
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        xs: "16px"
                    },
                    lineHeight: {
                        xs: "24px"
                    },
                    color: theme.palette.textColor.main
                }}
            >
                Ex: Cookie with ice cream needs to go to Cold and Hot.
            </Typography>
            <Box>
                <MuiTextArea
                    ariaLabel="This is textArea."
                    disableText={disabled}
                    handleChange={(e) => {
                        handleChange(e.target.value)
                    }}
                    comment={comment}
                />
            </Box>

            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: { md: 8, xs: 6 } }}
            />
            <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                    pt: { md: "22px", xs: "23px" },
                    pb: "24px",
                    flexDirection: {
                        lg: "row",
                        xs: "column"
                    }
                }}
            >
                <Box
                    display="flex"
                    sx={{
                        justifyContent: "flex-end",
                        flexDirection: {
                            md: "row",
                            xs: "column"
                        }
                    }}
                >
                    <CommonButton
                        className={"back-button"}
                        ariaTag={"This is back button"}
                        variant={"outlined"}
                        mr={{ md: "8.5px" }}
                        px={"19px"}
                        py={"11px"}
                        color="#5C5C5C"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Back"}
                        onclickHandler={handleBack}
                    />
                    <CommonButton
                        className={"next-button"}
                        onclickHandler={submitForm}
                        ariaTag={"This is proceed to confirmation button"}
                        variant={"contained"}
                        disabled={addtionalPrinterGroup == ""}
                        px={"20px"}
                        py={"12px"}
                        mt={{ xs: "8px", md: "0px" }}
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Proceed to Confirmation"}
                    />
                </Box>
            </Box>

            <ConfirmationNotification
                open={showNofication}
                close={() => setShowNofication(false)}
            />
        </Box>
    )
}
