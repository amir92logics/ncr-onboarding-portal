import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Button, Divider } from "@mui/material"
import {
    getDiscoverySubStage,
    dispatchDiscoveryData
} from "../../../../helper/Constraints"
import theme from "../../../../src/theme"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"

export default function InternetRequirments() {
    const router = useRouter()
    const routerID = router.query.id
    const dispatch = useDispatch()

    const system = useSelector((state) => state.dataSlice.projectType)
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages } = getDiscoverySubStage(
        sideBarData,
        "Network",
        "Electrical, Network Wiring, and Internet Requirements",
        system
    )

    let inner2per = substageinnerstages.find(
        (it) => it.name == "Network Management & Security"
    ).percentage
    let value = substageinnerstages.find(
        (it) => it.name == "Network Management & Security"
    ).data
    let inner3per = substageinnerstages.find(
        (it) => it.name == "NCR Managed Network With NSS"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Networking Guidelines"
    ).percentage
    const submitForm = () => {
        let temp = []
        const siteinfodataper = Math.round(
            (inner2per +
                (value[0]?.checked ? inner3per : 100) +
                inner4per +
                100) /
                4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Network",
            "Electrical, Network Wiring, and Internet Requirements",
            temp,
            100,
            siteinfodataper,
            false,
            system
        )
        dispatch(SetSideBarData(tempsidebar))
        router.push({
            pathname: `/discovery/network/site-network/${routerID}`,
            query: { inner: true }
        })
    }

    return (
        <Box
          
        >
            <Box
                className="shadow"
                sx={{
                    padding: "24px",
                    backgroundColor: "#FFFFFF",

                    borderRadius: "8px"
                }}
            >
                <Box sx={{ display: "flex",alignItems:"flex-end",columnGap:2, paddingBottom: "20px" }}>
                
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                             <title>This is Electrical Requirements icon</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M21 14C21 13.45 20.55 13 20 13H18V15H20C20.55 15 21 14.55 21 14Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M20 17H18V19H20C20.55 19 21 18.55 21 18C21 17.45 20.55 17 20 17Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M12 14H10V18H12C12 19.1 12.9 20 14 20H17V12H14C12.9 12 12 12.9 12 14Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M5 13C5 11.9 5.9 11 7 11H8.5C10.43 11 12 9.43 12 7.5C12 5.57 10.43 4 8.5 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6H8.5C9.33 6 10 6.67 10 7.5C10 8.33 9.33 9 8.5 9H7C4.79 9 3 10.79 3 13C3 15.21 4.79 17 7 17H9V15H7C5.9 15 5 14.1 5 13Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                   
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            color: "#1E1E1E",
                            lineHeight: "28px"
                        }}
                    >
                        Electrical Requirements
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: theme.palette.secondary.main,
                        lineHeight: "24px"
                    }}
                >
                    Even though Aloha POS runs on state-of-the-art hardware, a
                    stable electrical foundation is necessary to ensure
                    reliable, worry-free operations.
                    <Box component={"span"} sx={{ mt: "16px" }}>
                        {" "}
                        NCR’s electrical requirements for Aloha POS are one of
                        the baselines for a successful installation. Click the
                        link below to download NCR’s requirements which you can
                        provide to your contractor or electrician.
                    </Box>
                </Typography>
            </Box>

            <Box
                className="shadow"
                sx={{
                    padding: "24px",
                    backgroundColor: "#FFFFFF",

                    borderRadius: "8px",
                    marginTop: "26px"
                }}
            >
                <Box sx={{ display: "flex",alignItems:{md:"flex-end",xs:"flex-start"},columnGap:2, paddingBottom: "20px" }}>
                   
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>This is Network Wiring Requirements icon</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M7.77031 6.76047L6.23031 5.48047L0.820312 12.0005L6.23031 18.5205L7.77031 17.2405L3.42031 12.0005L7.77031 6.76047ZM7.00031 13.0005H9.00031V11.0005H7.00031V13.0005ZM17.0003 11.0005H15.0003V13.0005H17.0003V11.0005ZM11.0003 13.0005H13.0003V11.0005H11.0003V13.0005ZM17.7703 5.48047L16.2303 6.76047L20.5803 12.0005L16.2303 17.2405L17.7703 18.5205L23.1803 12.0005L17.7703 5.48047Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                    
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "17.7px",
                            color: "#1E1E1E",
                            lineHeight: "28px",
                            mt:{md:0,xs:-1}
                        }}
                    >
                        Network Wiring Requirements
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: theme.palette.secondary.main,
                        lineHeight: "24px"
                    }}
                >
                    Aloha’s POS terminals, prep printers, kitchen displays, and
                    back-office server are always communicating with each other.
                    NCR’s network wiring requirements help to ensure those
                    communications go uninterrupted.
                    <Box component={"span"} sx={{ mt: "16px" }}>
                        {" "}
                        Click the link below to download NCR’s requirements
                        which you can provide to your contractor, electrician,
                        or low-voltage company.
                        <Box
                            component={"span"}
                            sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                color: theme.palette.secondary.main,
                                lineHeight: "24px"
                            }}
                        >
                            {" "}
                            NCR does not run or terminate network wiring.
                        </Box>
                    </Box>
                </Typography>
            </Box>

            <Box
                className="shadow"
                sx={{
                    padding: "24px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    marginTop: "26px"
                }}
            >
                <Box sx={{ display: "flex",alignItems:"flex-end",columnGap:2, paddingBottom: "20px" }}>
                  
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>This is Internet Requirements icon</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M20 5V4C20 3.45 19.55 3 19 3H17C16.45 3 16 3.45 16 4V5H15V9C15 9.55 15.45 10 16 10H17V17C17 18.1 16.1 19 15 19C13.9 19 13 18.1 13 17V7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7V14H4C3.45 14 3 14.45 3 15V19H4V20C4 20.55 4.45 21 5 21H7C7.55 21 8 20.55 8 20V19H9V15C9 14.45 8.55 14 8 14H7V7C7 5.9 7.9 5 9 5C10.1 5 11 5.9 11 7V17C11 19.21 12.79 21 15 21C17.21 21 19 19.21 19 17V10H20C20.55 10 21 9.55 21 9V5H20Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                   
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            color: "#1E1E1E",
                            lineHeight: "28px"
                        }}
                    >
                        Internet Requirements
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: theme.palette.secondary.main,
                        lineHeight: "24px"
                    }}
                >
                    Aloha POS requires a landline Internet connection type of
                    fiber-optic, cable, or DSL (in that order of preference).
                    NCR does not support wireless means of primary Internet
                    access including cellular (4G/5G) and satellite connections.
                    <Box component={"span"} sx={{ mt: "16px" }}>
                        {" "}
                        Aloha POS requires minimum bandwidth of 25 Mbps download
                        and 5 Mbps upload. Other Internet usage at your
                        establishment such as video streaming to TVs and guest
                        Wi-Fi may require additional bandwidth. Download NCR’s
                        requirements document to learn more.
                    </Box>
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    marginTop: {
                        lg: "24px",
                        md: "24px",
                        xs: "24px"
                    },
                    marginBottom: {
                        lg: "0px",
                        md: "32px",
                        xs: "24px"
                    }
                }}
            >
                <Button
                    aria-label="This is a Download Requirements Document Button"
                    target={"_blank"}
                    href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Electrical,%20Network%20Wiring,%20and%20Internet%20Requirements%20-%201-5-23.pdf"
                    sx={{
                        width: { md: "auto", xs: "100%" },
                        border: "1px solid ",
                        borderColor: "#E0E0E0",
                        borderRadius: "8px",
                        padding: {
                            md: "9px 19px",
                            xs: "9px 38px 9px 32px"
                        },
                        "&:hover": {
                            bgcolor: "#F5F6FF ",
                            border: "1px solid #1D4ED8 "
                        }
                    }}
                >
                    <Typography
                        sx={{
                            mr: "9px",
                            mt: "1px",
                            fontSize: "13.7px",
                            lineHeight: "22px",
                            fontWeight: 600,
                            textTransform: "none",

                            color: theme.palette.primary.main,
                            cursor: "pointer"
                        }}
                    >
                        <span>Download Requirements Document</span>
                    </Typography>

                    <svg
                        width={11.67}
                        height={14.17}
                        viewBox="0 0 14 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is Download Requirements Document icon</title>
                        <path
                            d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z"
                            fill={theme.palette.primary.main}
                        />
                    </svg>
                </Button>
            </Box>
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: {
                        xl: "32px",
                        lg: "31px",
                        md: "31px",
                        xs: "25px"
                    }
                }}
            />

            <Box
                paddingY={"24px"}
                display="flex"
                justifyContent="flex-end"
                sx={{
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
                    <Button
                        onClick={() => submitForm()}
                        className="next-button"
                        role="button"
                        aria-label="This is Next Step Button"
                        variant="contained"
                        sx={{
                            marginTop: {
                                xs: "7px",
                                md: "0px"
                            },
                            padding: "11.5px 20px",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "16px",
                            lineHeight: "24.6px",
                            color: "white"
                        }}
                    >
                        Next Step
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
