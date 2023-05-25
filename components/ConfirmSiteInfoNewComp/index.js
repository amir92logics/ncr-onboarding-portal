import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import theme from "../../src/theme"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../redux-setup/api/data"
import { SetTasks } from "../../redux-setup/dataSlice"
import { BgIcon } from "../common/BgIcon"
import CommonButton from "../common/CommonButton"
import ConfirmationNotification from "../common/ConfirmationNotification"
export default function ConfirmSiteInfoNewComp() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const routerID = router.query.id
    const dispatch = useDispatch()
    const [updatedata] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const currentProject = useSelector(
        (state) => state.dataSlice.currentproject
    )
    const [disabled, setDisable] = useState(false)
    useEffect(() => {
        if (tasks.length > 0) {
            let infodata = tasks.find(
                (it) => it.task_name == "Confirm Site Information"
            )?.status
            if (infodata == "COMPLETED") {
                setDisable(true)
            }
        }
    }, [tasks])
    const onClickNextStep = (e) => {
        e.preventDefault()
        setLoading("loading")
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Confirm Site Information",
            json_data: []
        })
            .unwrap()
            .then((res) => {
                setDisable(true)
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        setTimeout(() => {
                            setLoading("confirm")
                            setTimeout(() => {
                                router.push({
                                    pathname: `/actions/${routerID}`
                                })
                            }, 2000)
                        }, 2000)
                        dispatch(SetTasks(res.data.actions))
                    })
                    .catch((err) => setLoading("error"))
            })
            .catch((err) => setLoading("error"))
    }
    const displayingAddress = (data) => {
        if (data) {
            if (data.length < 5) {
                return "N/A"
            } else {
                return data
            }
        } else {
            return "N/A"
        }
    }

    const handleBack = () => {
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                router.push({
                    pathname: `/actions/${routerID}`
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }
    return (
        <Box className="site-info">
            <form aria-label={`This is confirm site information form`} width="100%" onSubmit={onClickNextStep}>
                <Box width="100%">
                    <Typography
                        sx={{ color: "#1E1E1E" }}
                        className="overtime-text"
                    >
                        Please validate your Site Information for accuracy. Your
                        ship-to and installation addresses may be different so
                        it&apos;s important we have accurate information.
                        <br />
                        <br />
                        If this information needs to be changed, please provide
                        updated details to your Project Manager.
                    </Typography>
                    <Box sx={{ mt: "32px" }}>
                        <Box
                            className="shadow"
                            sx={{
                                background: "#fff",
                                px: { md: 6, xs: 4 },
                                py: { md: 5.5, xs: 4.9 },
                                boxSizing: "border-box",
                                borderRadius: 2
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        columnGap: "7px"
                                    }}
                                >
                                    <BgIcon
                                        svg_image={
                                            <svg
                                                width={20}
                                                height={18}
                                                viewBox="0 0 20 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>This is site name icon</title>
                                                <path
                                                    d="M10 4V0H0V18H20V4H10ZM4 16H2V14H4V16ZM4 12H2V10H4V12ZM4 8H2V6H4V8ZM4 4H2V2H4V4ZM8 16H6V14H8V16ZM8 12H6V10H8V12ZM8 8H6V6H8V8ZM8 4H6V2H8V4ZM18 16H10V14H12V12H10V10H12V8H10V6H18V16ZM16 8H14V10H16V8ZM16 12H14V14H16V12Z"
                                                    fill="#1E1E1E"
                                                />
                                            </svg>
                                        }
                                    />

                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: {
                                                xs: "18px"
                                            },
                                            lineHeight: {
                                                xs: "28px"
                                            },
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        Site Name
                                    </Typography>
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: {
                                            xs: "16px"
                                        },
                                        lineHeight: {
                                            xs: "24px"
                                        },
                                        marginTop: { md: "8px", xs: "7px" },
                                        color: theme.palette.secondary.main
                                    }}
                                >
                                    {currentProject?.customer_name
                                        ? currentProject?.customer_name
                                        : "N/A"}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: " flex",
                                    marginTop: {
                                        md: 6.1,
                                        xs: 6
                                    },
                                    width: "100%",
                                    alignItems: {
                                        md: "center",
                                        xs: "flex-start"
                                    },
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    },
                                    rowGap: { md: 0, xs: 6 },
                                    columnGap: { md: 4 }
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: {
                                            xxl: "504px",
                                            xl: "440px",
                                            lg: "392px",
                                            md: "284px"
                                        },
                                        width: "100%"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: "7px"
                                        }}
                                    >
                                        <BgIcon
                                            svg_image={
                                                <svg
                                                    width={22}
                                                    height={16}
                                                    viewBox="0 0 22 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>This is shipping address icon</title>
                                                    <path
                                                        d="M19 4H16V0H2C0.9 0 0 0.9 0 2V13H2C2 14.66 3.34 16 5 16C6.66 16 8 14.66 8 13H14C14 14.66 15.34 16 17 16C18.66 16 20 14.66 20 13H22V8L19 4ZM18.5 5.5L20.46 8H16V5.5H18.5ZM5 14C4.45 14 4 13.55 4 13C4 12.45 4.45 12 5 12C5.55 12 6 12.45 6 13C6 13.55 5.55 14 5 14ZM7.22 11C6.67 10.39 5.89 10 5 10C4.11 10 3.33 10.39 2.78 11H2V2H14V11H7.22ZM17 14C16.45 14 16 13.55 16 13C16 12.45 16.45 12 17 12C17.55 12 18 12.45 18 13C18 13.55 17.55 14 17 14Z"
                                                        fill="#1E1E1E"
                                                    />
                                                </svg>
                                            }
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: {
                                                    lg: "18px",
                                                    xs: "18px"
                                                },
                                                lineHeight: {
                                                    lg: "28px",
                                                    xs: "28px"
                                                },
                                                color: "#1E1E1E"
                                            }}
                                        >
                                            Shipping Address
                                        </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: {
                                                xs: "16px"
                                            },
                                            lineHeight: {
                                                xs: "24px"
                                            },
                                            marginTop: {
                                                md: "8px",
                                                xs: "8.5px"
                                            },
                                            color: theme.palette.secondary.main
                                        }}
                                    >
                                        {displayingAddress(
                                            currentProject?.shipping_address
                                        )}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: "7px"
                                        }}
                                    >
                                        <BgIcon
                                            svg_image={
                                                <svg
                                                    width={14}
                                                    height={20}
                                                    viewBox="0 0 14 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>This is install address icon</title>
                                                    <path
                                                        d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7C12 9.88 9.12 14.19 7 16.88C4.92 14.21 2 9.85 2 7Z"
                                                        fill="#1E1E1E"
                                                    />
                                                    <path
                                                        d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5Z"
                                                        fill="#1E1E1E"
                                                    />
                                                </svg>
                                            }
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: {
                                                    xs: "18px"
                                                },
                                                lineHeight: {
                                                    xs: "28px"
                                                },
                                                color: "#1E1E1E"
                                            }}
                                        >
                                            Install Address
                                        </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: {
                                                xs: "16px"
                                            },
                                            lineHeight: {
                                                xs: "24px"
                                            },

                                            marginTop: "8px",
                                            color: theme.palette.secondary.main
                                        }}
                                    >
                                        {displayingAddress(
                                            currentProject?.install_address
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Divider
                        className="divider-col"
                        sx={{ width: "100%", marginTop: { md: 8, xs: 6 } }}
                    />

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{
                            py: 5.5,
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
                                    md: "row",
                                    xs: "column"
                                }
                            }}
                        >
                            <CommonButton
                            
                                onclickHandler={handleBack}
                                className={"back-button"}
                                ariaTag={"This is back button"}
                                variant={"outlined"}
                                mt={{ xs: "0px", md: "0px" }}
                                mr={{ md: "8px" }}
                                px={"19.3px"}
                                py={{ xs: "11px" }}
                                color="#5C5C5C"
                                fontSize="16px"
                                lineHeight="24px"
                                fontWeight="600"
                                content={"Back"}
                            />
                            <CommonButton
                                className={"next-button"}
                                type="submit"
                                ariaTag={"This is confirm button"}
                                variant={"contained"}
                                disabled={disabled}
                                px={"20px"}
                                py={{ xs: "12px" }}
                                color="white"
                                width={{
                                    xs: "100%",
                                    md: "103px"
                                }}
                                fontSize="16px"
                                lineHeight="24px"
                                fontWeight="600"
                                content={"Confirm"}
                                mt={{ xs: "8px", md: "0px" }}
                            />
                        </Box>
                    </Box>
                </Box>

                <ConfirmationNotification
                    open={loading}
                    title={"Confirm Site Information"}
                    close={() => handleClose()}
                />
            </form>
        </Box>
    )
}
