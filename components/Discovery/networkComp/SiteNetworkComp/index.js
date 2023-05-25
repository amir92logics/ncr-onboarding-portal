import {
    Button,
    Divider,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import {
    getDiscoverySubStage,
    dispatchDiscoveryData
} from "../../../../helper/Constraints"
import {
    SetNcrManagedNetwork,
    SetSideBarData
} from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"

export const SiteNetworkComp = () => {
    const [checked, setChecked] = useState(null)
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const dispatch = useDispatch()
    const system = useSelector((state) => state.dataSlice.projectType)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Network",
        "Network Management & Security",
        system
    )

    let inner2per = substageinnerstages.find(
        (it) =>
            it.name == "Electrical, Network Wiring, and Internet Requirements"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "NCR Managed Network With NSS"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Networking Guidelines"
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
            setChecked(initialData[0].checked)
        }
    }, [sideBarData])
    const handleChange = (value) => {
        if (value) {
            setChecked(value)
            let temp = [{ checked: value }]
            const siteinfodataper = Math.round(
                (inner2per + inner3per + inner4per + 100) / (value ? 4 : 3)
            )
            let tempsidebar = dispatchDiscoveryData(
                sideBarData,
                "Network",
                "Network Management & Security",
                temp,
                100,
                siteinfodataper,
                false,
                system
            )

            dispatch(SetSideBarData(tempsidebar))
            dispatch(SetNcrManagedNetwork(!value))
        } else {
            setChecked(value)
            let temp = [{ checked: value }]
            const siteinfodataper = Math.round(
                (inner2per + 0 + inner4per + 100) / (value ? 4 : 3)
            )
            let tempsidebar = dispatchDiscoveryData(
                sideBarData,
                "Network",
                "Network Management & Security",
                temp,
                100,
                siteinfodataper,
                false,
                system
            )
            let tempsidebar2 = dispatchDiscoveryData(
                tempsidebar,
                "Network",
                "NCR Managed Network With NSS",
                [],
                0,
                siteinfodataper,
                false,
                system
            )

            dispatch(SetSideBarData(tempsidebar2))
            dispatch(SetNcrManagedNetwork(!value))
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (checked) {
            router.push({
                pathname: `/discovery/network/ncr-managed-network/${routerID}`,
                query: { inner: true }
            })
        } else {
            router.push({
                pathname: `/discovery/network/site-network-documentation/${routerID}`,
                query: { inner: true }
            })
        }
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/network/internet-requirements/${routerID}`,
            query: { inner: true }
        })
    }

    return (
        <Box
            className="network-set1 network-security"
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            width="100%"
        >
            <Box>
                <RadioGroup
                    sx={{
                        maxWidth: {
                            sm: "100%"
                        }
                    }}
                >
                    <Box
                        className="Top-text"
                        sx={{
                            marginBottom: {
                                lg: "32px",
                                xs: "24px",
                                md: "24px"
                            },
                            color: theme.palette.textColor.main
                        }}
                    >
                        Managing and securing your Aloha network is important
                        for all customers, especially when it comes to
                        protecting sensitive data.&nbsp;During your deployment
                        we’ll need to understand who manages your network in
                        order to successfully install your new products and
                        services.
                        <br />
                        <br />
                        Please confirm how your network is managed:
                    </Box>
                    <Box
                        onClick={() => !disabled && handleChange(true)}
                        className="shadow"
                        aria-label="This is NCR NSS Radio Button"
                        sx={{
                            cursor: "pointer",
                            paddingTop: { xs: "3px", md: "16px" },
                            paddingX: { xs: "16px", md: "24px" },
                            paddingBottom: { xs: "15px", md: "24px" },
                            backgroundColor:
                                checked == null
                                    ? "#FFFFFF"
                                    : checked
                                    ? "#EFF6FF"
                                    : "#FFFFFF",

                            borderRadius: "8px",
                            border:
                                checked == null
                                    ? "1px solid transparent"
                                    : checked
                                    ? "1px solid #1D4ED8"
                                    : "1px solid transparent",
                            "&:hover": {
                                bgcolor: !disabled && "#EFF6FF !important ",
                                border:
                                    !disabled && "1px solid #1D4ED8 !important"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: {
                                    xs: "row"
                                },
                                display: "flex",
                                paddingBottom: { xs: "3px", md: "4.5px" },
                                alignItems: { md: "center" },
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    paddingTop: { xs: "16px", md: "0px" }
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingRight: "12px"
                                    }}
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>
                                            This is NCR Network Security
                                            Services (NSS) icon
                                        </title>
                                        <g clipPath="url(#clip0_143_52779)">
                                            <rect
                                                width={24}
                                                height={24}
                                                rx={12}
                                                fill="#E8EEFF"
                                            />
                                            <path
                                                d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
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
                                </Box>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        color: "#1E1E1E",
                                        lineHeight: "28px"
                                    }}
                                >
                                    NCR Network Security Services (NSS)
                                </Typography>
                            </Box>
                            <FormControlLabel
                                value="Yes"
                                aria-labelledby="radio-group"
                                sx={{
                                    color:
                                        checked == null
                                            ? "#1E1E1E"
                                            : checked
                                            ? "#1E1E1E"
                                            : "#5C5C5C",
                                    marginRight: "0px !important",
                                    mt: { xs: "10px", md: "0px" },
                                    justifyContent: "end",
                                    ".MuiFormControlLabel-label": {
                                        display: { md: "flex", xs: "none" }
                                    }
                                }}
                                control={
                                    <Radio
                                        required={true}
                                        disabled={disabled}
                                        checked={checked}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "transparent"
                                            },
                                            padding: "4px",
                                            mr: { md: "10px", xs: "0px" }
                                        }}
                                    />
                                }
                                label="Select"
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                color: theme.palette.secondary.main,
                                lineHeight: "24px",
                                paddingTop: { xs: "10px", md: "0px" }
                            }}
                        >
                            NCR’s NSS Team keeps managing your network easy, we
                            do it for you.
                            <br />
                            Select this option if NCR manages your network
                            <br />
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => !disabled && handleChange(false)}
                        className="shadow"
                        aria-label="This is Other Radio Button"
                        sx={{
                            cursor: "pointer",
                            paddingTop: { xs: "0px", md: "16px" },
                            paddingX: { xs: "16px", md: "24px" },
                            paddingBottom: { xs: "15px", md: "23px" },
                            backgroundColor:
                                checked == null
                                    ? "#FFFFFF"
                                    : !checked
                                    ? "#EFF6FF"
                                    : "#FFFFFF",

                            borderRadius: "8px",
                            marginTop: { md: "24px", xs: "19px" },
                            border:
                                checked == null
                                    ? "1px solid transparent"
                                    : !checked
                                    ? "1px solid #1D4ED8"
                                    : "1px solid transparent",
                            "&:hover": {
                                bgcolor: !disabled && "#EFF6FF !important ",
                                border:
                                    !disabled && "1px solid #1D4ED8 !important"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                paddingBottom: "4.5px",
                                alignItems: { md: "center" },
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    paddingTop: { xs: "16px", md: "0px" }
                                }}
                            >
                                <Box sx={{ paddingRight: "8px" }}>
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is 3rd party icon</title>
                                        <g clipPath="url(#clip0_19_39122)">
                                            <rect
                                                width={24}
                                                height={24}
                                                rx={12}
                                                fill="#E8EEFF"
                                            />
                                            <path
                                                d="M9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM9 7C9.83 7 10.5 7.67 10.5 8.5C10.5 9.33 9.83 10 9 10C8.17 10 7.5 9.33 7.5 8.5C7.5 7.67 8.17 7 9 7ZM9.05 17H4.77C5.76 16.5 7.47 16 9 16C9.11 16 9.23 16.01 9.34 16.01C9.68 15.28 10.27 14.68 10.98 14.2C10.25 14.07 9.56 14 9 14C6.66 14 2 15.17 2 17.5V19H9V17.5C9 17.33 9.02 17.16 9.05 17ZM16.5 14.5C14.66 14.5 11 15.51 11 17.5V19H22V17.5C22 15.51 18.34 14.5 16.5 14.5ZM17.71 12.68C18.47 12.25 19 11.44 19 10.5C19 9.12 17.88 8 16.5 8C15.12 8 14 9.12 14 10.5C14 11.44 14.53 12.25 15.29 12.68C15.65 12.88 16.06 13 16.5 13C16.94 13 17.35 12.88 17.71 12.68Z"
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
                                </Box>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        color: "#1E1E1E",
                                        lineHeight: "28px"
                                    }}
                                >
                                    Other
                                </Typography>
                            </Box>
                            <FormControlLabel
                                aria-labelledby="radio-group"
                                sx={{
                                    marginTop: {
                                        xs: "10px",
                                        md: 0,
                                        color:
                                            checked === null
                                                ? "#1E1E1E"
                                                : !checked
                                                ? "#1E1E1E"
                                                : "#5C5C5C"
                                    },
                                    marginRight: "0px !important",
                                    justifyContent: "end",
                                    ".MuiFormControlLabel-label": {
                                        display: { md: "flex", xs: "none" }
                                    }
                                }}
                                value="No"
                                control={
                                    <Radio
                                        required={true}
                                        disabled={disabled}
                                        checked={
                                            checked === null ? false : !checked
                                        }
                                        sx={{
                                            "&:hover": {
                                                bgcolor:
                                                    "transparent !important "
                                            },
                                            padding: "4px",
                                            mr: { md: "10px", xs: "0px" }
                                        }}
                                    />
                                }
                                label="Select"
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                color: theme.palette.secondary.main,
                                lineHeight: "24px",
                                paddingTop: { xs: "4px", md: "0px" }
                            }}
                        >
                            Select this option if a 3rd party manages your
                            network, you self-manage, or you’re unsure.
                        </Typography>
                    </Box>
                </RadioGroup>

                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: {
                            xl: "32px",
                            lg: "31px",
                            md: "22px",
                            xs: "23px"
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
                            onClick={() => handleBack()}
                            className="back-button"
                            variant="outlined"
                            aria-label="This is Back Button"
                            sx={{
                                marginRight: { md: "8px" },
                                padding: "10.8px 20px",
                                fontWeight: 600,
                                display: "flex",
                                justifyContent: "center",
                                fontSize: "16px",
                                lineHeight: "24.6px",
                                color: "#5C5C5C",
                                borderRadius: "6px",
                                "&:hover": {
                                    bgcolor: "#F5F6FF !important ",
                                    border: "1px solid #1D4ED8 !important"
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={(e) => submitForm(e)}
                            className="next-button"
                            role="button"
                            disabled={checked == null}
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
        </Box>
    )
}
