import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider } from "@mui/material"
import AddNewItem from "../../../common/AddNewItem/AddNewItemDuplicate"
import { useDispatch, useSelector } from "react-redux"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import CommonButton from "../../../common/CommonButton"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import { BgIcon } from "../../../common/BgIcon"
import theme from "../../../../src/theme"

export default function RevenueCenter() {
    const router = useRouter()
    const routerID = router.query.id
    const [disabled, setDisable] = useState(false)
    const [additionalrevnue, setAdditionalRevenue] = useState([])
    const includedRevenue = ["Restaurant", "Bar", "Takeout", "Online"]
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Site Information",
        "Revenue Centers"
    )
    let dayspartper = substageinnerstages.find(
        (it) => it.name == "Day Parts"
    ).percentage
    let hoursper = substageinnerstages.find(
        (it) => it.name == "Hours of Operation"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let reveneuedata = {
        ...substageinnerstages[currentindex]
    }
    let initialData = reveneuedata.data
    const dispatch = useDispatch()
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            setAdditionalRevenue(initialData[0].rowData)
        }
    }, [initialData])
    const updateStore = (_data) => {
        let data = [
            {
                title: "Additional Revenue Center",
                rowData: [..._data],
                discription:
                    "A Revenue Center is a physical location within your business that collects revenue. Revenue Centers are created to summarize income from different sources in the restaurant."
            }
        ]
        let siteinfodataper = Math.round((hoursper + dayspartper + 100) / 3)
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Site Information",
            "Revenue Centers",
            data,
            100,
            siteinfodataper,
            false
        )

        dispatch(SetSideBarData(tempsidebar))
    }

    const submitForm = () => {
        updateStore(additionalrevnue)
        router.push({
            pathname: `/discovery/site-information/day-parts/${routerID}`,
            query: { inner: true }
        })
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/site-information/hours-of-operation/${routerID}`,
            query: { inner: true }
        })
    }
    const setData = (_data) => {
        setAdditionalRevenue(_data)
        updateStore(_data)
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
            marginTop={{
                xxl: 0,
                xl: "-1px"
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: {
                            lg: "16px",
                            md: "16px",
                            xs: "16px"
                        },
                        lineHeight: {
                            lg: "24px",
                            md: "24px",
                            xs: "24px"
                        },
                        color: theme.palette.textColor.main
                    }}
                >
                    A Revenue Center is a physical location within your business
                    that collects revenue. Revenue Centers are created to
                    summarize income from different sources in the restaurant.
                    They may also be used to track a specific type of sale
                    within your restaurant such as banquets or take-out.
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        paddingTop: "24px",
                        fontSize: {
                            lg: "16px",
                            md: "16px",
                            xs: "16px"
                        },
                        lineHeight: {
                            lg: "24px",
                            md: "24px",
                            xs: "24px"
                        },
                        color: theme.palette.textColor.main
                    }}
                >
                    Below is a list of Revenue Centers that are included with
                    your Aloha system. Please indicate any additional Revenue
                    Centers that will be needed.
                </Typography>
            </Box>
            <Box
                className="shadow"
                sx={{
                    background: "#fff",
                    marginTop: {
                        xxl: "32px",
                        xl: "31px",
                        lg: "31px",
                        md: "31.9px",
                        xs: 5.8
                    },
                    px: { md: 6, xs: 4 },
                    pt: { lg: 6, md: 6, xs: 4 },
                    pb: { lg: 5.5, md: 5.5, xs: 4 },
                    borderRadius: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 1.5,
                        mt: { lg: "0.5px", md: "0.5px", xs: 1 }
                    }}
                >
                    <Box sx={{ mt: { lg: "-4px", md: "-4px", xs: "0px" } }}>
                        <BgIcon
                            svg_image={
                                <svg
                                    width={19}
                                    height={20}
                                    viewBox="0 0 19 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>{`this is Included Revenue Centers icon`}</title>
                                    <path
                                        d="M4.5 9H2.5V16H4.5V9ZM10.5 9H8.5V16H10.5V9ZM19 18H0V20H19V18ZM16.5 9H14.5V16H16.5V9ZM9.5 2.26L14.71 5H4.29L9.5 2.26ZM9.5 0L0 5V7H19V5L9.5 0Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>
                            }
                        />
                    </Box>
                    <Typography
                        sx={{
                            fontWeight: 600,

                            fontSize: {
                                lg: "18px",
                                md: "18px",
                                xs: "18px"
                            },
                            lineHeight: {
                                md: "28px",
                                xs: "16px"
                            },
                            color: "#1E1E1E"
                        }}
                    >
                        Included Revenue Centers
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        flexWrap: "flex",
                        justifiyContent: "flex-start",
                        marginTop: {
                            xxl: "14.5px",
                            xl: "15.5px",
                            lg: "15.5px",
                            md: "14.2px",
                            xs: 4.8
                        }
                    }}
                >
                    {includedRevenue.map((item, index) => {
                        return (
                            <Typography
                                key={index + Math.random()}
                                sx={{
                                    width: { xs: "100%", md: "auto" },
                                    fontWeight: 400,
                                    marginTop:
                                        index > 0
                                            ? {
                                                xs: "8px",
                                                sm: "8px",
                                                md: "0px"
                                            }
                                            : "0px",
                                    padding: "12px 23px",
                                    mr: "8px",
                                    fontSize: {
                                        lg: "14px",
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        md: "22px",
                                        xs: "20px"
                                    },
                                    textAlign: "center",
                                    color: theme.palette.secondary.main,
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #E0E0E0",
                                    "&:hover": {
                                        boxShadow:
                                            "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                                    }
                                }}
                            >
                                {item}
                            </Typography>
                        )
                    })}
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: {
                        lg: 1,
                        md: 0.8,
                        xs: "0px"
                    }
                }}
            >
                <AddNewItem
                    description={
                        "A Revenue Center is a physical location within your business that collects revenue. Revenue Centers are created to summarize income from different sources in the restaurant."
                    }
                    disabled={disabled}
                    endpointForPost="/"
                    additionalArray={additionalrevnue}
                    setAdditonal={setData}
                    deleteTitle="Revenue Center"
                    title="Additional Revenue Center"
                    buttonText="Add New Revenue Center"
                    marginTop={"29px"}
                    hideTooltip={true}
                    fontSizeMd={"18px"}
                />
            </Box>
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",

                    marginTop: {
                        xxl: "32px",
                        xl: "32px",
                        md: "32px",
                        xs: "24px"
                    }
                }}
            />

            <Box
                paddingY={"21px"}
                display="flex"
                justifyContent="flex-end"
                sx={{
                    flexDirection: {
                        lg: "row",
                        md: "column",
                        sm: "column",
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
                            sm: "column",
                            xs: "column"
                        }
                    }}
                >
                    <CommonButton
                        className={"back-button"}
                        ariaTag={"This is Back Button"}
                        variant={"outlined"}
                        mr={{ xxl: "8px", xl: "8px", lg: "9px", md: "8px" }}
                        px={"20px"}
                        py={"12px"}
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
                        ariaTag={"This is Next Step Button"}
                        variant={"contained"}
                        mt={{ xs: "8px", md: "0px" }}
                        px={"20px"}
                        py={"12px"}
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Next Step"}
                    />
                </Box>
            </Box>
        </Box>
    )
}
