import { Button, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
export const SiteNetworkDOC = () => {
    const router = useRouter()
    const [showNofication, setShowNofication] = useState(false)
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const ncrManagedNetwork = useSelector(
        (state) => state.dataSlice.ncrManagedNetwork
    )
    const system = useSelector((state) => state.dataSlice.projectType)
    const dispatch = useDispatch()
    const { substageinnerstages } = getDiscoverySubStage(
        sideBarData,
        "Network",
        "Networking Guidelines",
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
        (it) =>
            it.name == "Electrical, Network Wiring, and Internet Requirements"
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
            "Networking Guidelines",
            temp,
            100,
            siteinfodataper,
            false,
            system
        )
        dispatch(SetSideBarData(tempsidebar))
  
        if (
            siteinfodataper == 100 
        ) {
            router.push({
                pathname: `/discovery/network/network-confirmation/${routerID}`,
                query: { inner: true }
            })
        } else setShowNofication(true)
    }
    return (
        <Box
            className="netw-doc"
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Box
                className="shadow"
                sx={{
                    padding: { xs: "20px 16px", md: "24px" },
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: theme.palette.textColor.main,
                        lineHeight: "24px",
                        letterSpacing: { md: "0.01em" }
                    }}
                >
                    Certain IP addresses, domains, and ports must be whitelisted
                    in your firewall in order for the Aloha solution to
                    function. Click the link below to download the Aloha network
                    configuration guide for your network management resource or
                    IT company.
                </Typography>
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
                            md: "0px",
                            xs: "0px"
                        }
                    }}
                >
                    <Button
                        aria-label="This is NCR Aloha Enterprise Network Configuration Guide button"
                        href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/NCR%20Aloha%20Enterprise%20Network%20Configuration%20Guide%20v22.09.01.docx"
                        target={"_blank"}
                        endIcon={ <svg
                            width={11.67}
                            height={14.17}
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                           <title>{`this is NCR Aloha Enterprise Network Configuration Guide download icon`}</title>
                            <path
                                d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z"
                                fill={theme.palette.primary.main}
                            />
                        </svg>}
                        sx={{
                            width: { md: "auto", xs: "100%" },
                            border: "1px solid ",
                            borderColor: "#E0E0E0",
                            borderRadius: "8px",
                            padding: {
                                md: "9px 18px",
                                xs: "9px 18px 9px 18px"
                            },
                            textAlign: "start",
                            fontSize: "13.8px",
                            lineHeight: "22px",
                            fontWeight: 600,
                            textTransform: "none",
                            color: theme.palette.primary.main,
                            cursor: "pointer",
                            "&:hover": {
                                bgcolor: "#F5F6FF  ",
                                border: "1px solid #1D4ED8 "
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                mr: {md:"8px"},
                                fontSize: "13.8px",
                                lineHeight: "22px",
                                fontWeight: 600,
                                textTransform: "none",

                                color: theme.palette.primary.main,
                                cursor: "pointer"
                            }}
                        >
                            NCR Aloha Enterprise Network Configuration Guide
                        </Typography>

                       
                    </Button>
                </Box>
            </Box>
            <Box
                className="shadow"
                sx={{
                    padding: { xs: "20px 16px", md: "24px" },
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    marginTop: { md: "32px", xs: "24px" }
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: theme.palette.textColor.main,
                        lineHeight: "24px",
                        letterSpacing: { md: "0.01em" }
                    }}
                >
                    NCR’s wireless POS hardware is designed to work best with
                    modern Wi-Fi appliances and technology. NCR’s Wireless
                    Network Guidelines are one of the baselines for a successful
                    implementation.
                    <br />
                    <br />
                    If you plan to use and manage your own Wi-Fi devices in your
                    implementation, click the link below to download NCR’s
                    Guidelines for your network management resource or IT
                    company.
                </Typography>
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
                            md: "0px",
                            xs: "0px"
                        }
                    }}
                >
                    <Button
                    aria-label="This is NCR Hospitality Wireless Network Guidelines button"
                        href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/NCR%20Hospitality%20Wireless%20Network%20Guidelines.pdf"
                        target="_blank"
                        endIcon={ <svg
                            width={11.67}
                            height={14.17}
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`this NCR Hospitality Wireless Network Guidelines download icon`}</title>
                            <path
                                d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z"
                                fill={theme.palette.primary.main}
                            />
                        </svg>}
                        sx={{
                            width: { md: "auto", xs: "100%" },
                            border: "1px solid ",
                            borderColor: "#E0E0E0",
                            borderRadius: "8px",
                            padding: {
                                md: "9px 18px",
                                xs: "9px 18px 9px 18px"
                            },
                            textAlign: "start",
                            "&:hover": {
                                bgcolor: "#F5F6FF  ",
                                border: "1px solid #1D4ED8 "
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                mr: {md:"8px"},
                                fontSize: "13.8px",
                                lineHeight: "22px",
                                fontWeight: 600,
                                textTransform: "none",

                                color: theme.palette.primary.main,
                                cursor: "pointer"
                            }}
                        >
                            NCR Hospitality Wireless Network Guidelines
                        </Typography>

                       
                    </Button>
                </Box>
            </Box>

            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: { xs: "24px", md: "32px" } }}
            />

            <Box
                paddingY={"22px"}
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
                    <Button
                        onClick={() => {
                            !ncrManagedNetwork
                                ? router.push({
                                      pathname: `/discovery/network/ncr-managed-network/${routerID}`,
                                      query: { inner: true }
                                  })
                                : router.push({
                                      pathname: `/discovery/network/site-network/${routerID}`,
                                      query: { inner: true }
                                  })
                        }}
                        className="back-button"
                        variant="outlined"
                        aria-label="This is Back Button"
                        sx={{
                            marginRight: { md: "8px", xl: "6px" },
                            padding: "10px 20px",
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
                            color: "#5C5C5C",
                            "&:hover": {
                                bgcolor: "#F5F6FF !important ",
                                border: "1px solid #1D4ED8 !important"
                            }
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        className="next-button"
                        onClick={() => {
                            submitForm()
                        }}
                        role="button"
                        aria-label="This is Proceed to Confirmation button"
                        variant="contained"
                        sx={{
                            marginTop: { xs: "16px", sm: "8px", md: "0px" },
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
            <ConfirmationNotification
                open={showNofication}
                close={() => setShowNofication(false)}
            />
        </Box>
    )
}
