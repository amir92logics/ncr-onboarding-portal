import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, Checkbox, Skeleton, Link } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import CustomerSurveyPopup from "./CustomerSurveyPopup/index"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../redux-setup/api/data"
import { useRouter } from "next/router"
import { SetSubTasks, SetTasks } from "../../redux-setup/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../src/theme"
import CommonButton from "../common/CommonButton"
import ConfirmationNotification from "../common/ConfirmationNotification"

export default function ProjectSignOf() {
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const projData = tasks
        ? tasks.find((task) => task.task_name == "Project Sign Off")?.json
        : []
    const currentproject = useSelector(
        (state) => state.dataSlice.currentproject
    )
    const [loading, setLoading] = useState(false)
    let temp2 = tasks.filter((it) => it.status.toLowerCase() !== "completed")
    let region = currentproject?.region || "Southeast"
    const [installDate, setInstallDate] = useState(false)
    const [surveyPop, setSurveyPop] = useState(false)
    const [UpdateData] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    let surveyURL = currentproject?.qualtrics_url || ""
    const handleTogglePopUp = (value) => {
        setSurveyPop(value)
    }
    const [disabled, setDisable] = useState(false)
    useEffect(() => {
        if (projData && projData[0].installDate) {
            setDisable(true)
            setInstallDate(projData[0].installDate)
        }
        if (temp2.length > 1) {
            router.push({
                pathname: `/actions/${routerID}`
            })
        }
    }, [tasks])

    const router = useRouter()
    const routerID = router.query.id

    const [fetching] = useState(true)

    const handleCheckBox = (e) => {
        if (e.target.checked) {
            setInstallDate(true)
        } else {
            setInstallDate(false)
        }
    }
    const handleBack = () => {
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    const contacts = {
        West: {
            name: "West Region",
            contact: "844-263-0298",
            email: "Support.SMB-West@ncr.com"
        },
        Central: {
            name: "Central Region",
            contact: "844-263-0147",
            email: "Support.SMB-Central@ncr.com"
        },
        Southeast: {
            name: "Southeast Region",
            contact: "844-249-9602",
            email: "Support.SMB-Southeast@ncr.com"
        },
        Northeast: {
            name: "Northeast Region",
            contact: "844-263-0190",
            email: "Support.SMB-Northeast@ncr.com"
        },
        Texas: {
            name: "Texas Region",
            contact: "844-263-0305",
            email: "Support.SMB-Texas@ncr.com"
        }
    }
    const submitData = () => {
        UpdateData({
            record_id_quickbase: routerID,
            task_name: "Project Sign Off",
            json_data: [{ installDate }]
        })
            .unwrap()
            .then((res) => {
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                        if (surveyURL) {
                            setSurveyPop(true)
                        } else {
                            setTimeout(() => {
                                setLoading("confirm")
                                setTimeout(() => {
                                    setLoading("")
                                    router.push({
                                        pathname: `/actions/${routerID}`
                                    })
                                }, 2000)
                            }, 2000)
                        }
                    })
                    .catch((err) => setLoading("error"))
            })
            .catch((err) => setLoading("error"))
        !surveyURL && setLoading("loading")
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                setLoading("")
                router.push({
                    pathname: `/actions/${routerID}`
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }
    return !fetching ? (
        <>
            <Box
                display="flex"
                justifyContent="start"
                flexDirection="column"
                alignItems="start"
            >
                <Typography
                    variant="body1"
                    lineHeight="24px"
                    fontWeight="400"
                    color="#1E1E1E"
                    fontSize="16px"
                    sx={{
                        maxWidth: { xl: "800px", lg: "704px" },
                        width: {
                            xxs: "100%",
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "100%"
                        }
                    }}
                >
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <br />

                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                    <Skeleton animation="pulse" variant={"text"} />
                </Typography>

                <Box
                    marginTop="32px"
                    sx={{
                        width: "100%",

                        display: {
                            sm: "block",
                            xl: "flex-col"
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            marginBottom: "22px"
                        }}
                    >
                        <Skeleton
                            sx={{
                                maxWidth: {
                                    md: "745.2px"
                                },
                                height: "32px"
                            }}
                            animation="pulse"
                            variant="rounded"
                        />
                    </Box>
                    <Skeleton height="3px" animation="pulse" variant="text" />
                    <Box display="flex" justifyContent="flex-end">
                        <Skeleton
                            style={{ marginRight: theme.spacing(1) }}
                            sx={{
                                mr: {
                                    lg: 2,
                                    sm: 0
                                },

                                paddingTop: {
                                    lg: "38px",
                                    sm: "45px"
                                },
                                paddingBottom: {
                                    lg: "9px",
                                    sm: "12px"
                                },
                                px: {
                                    lg: "20px",
                                    sm: "12px"
                                },
                                width: {
                                    lg: "91px",
                                    sm: "100%"
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    ) : (
        <Box sx={{ marginTop: { xs: "-1px", lg: "0px" } }}>
            <CustomerSurveyPopup
                id={routerID}
                handleTogglePopUp={handleTogglePopUp}
                surveyPop={surveyPop}
                surveyURL={surveyURL}
            />

            <Box
                display="flex"
                justifyContent="start"
                flexDirection="column"
                alignItems="start"
                width={"100%"}
            >
                <Box display="flex" alignItems="start" width={"100%"}>
                    <Box width={"100%"}>
                        <Typography
                            variant="body1"
                            lineHeight="24px"
                            fontWeight="400"
                            color="#1E1E1E"
                            fontSize="16px"
                            sx={{
                                marginBottom: { md: "32px", xs: "24px" }
                            }}
                        >
                            Thank you for choosing NCR as your Technology
                            Partner. We are excited to confirm you have
                            successfully completed all project milestones. As
                            such, we are ready to close your engagement with the
                            Deployment team and transition you to our Support
                            Organization. NCR’s support team is organized
                            regionally to best service our customer base. Below
                            you will find their contact information:
                        </Typography>
                        <Box
                            className="project-signoff-card shadow"
                            sx={{
                                background: "#FFFFFF",
                                width: { lg: "339px", xs: "100%" },
                                borderRadius: "12px",
                                padding: "24px"
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        lineHeight: "28px",
                                        color: theme.palette.secondary.main
                                    }}
                                >
                                    Contact Info:
                                </Typography>
                            </Box>
                            <Divider
                                className="divider-col"
                                sx={{
                                    marginTop: "5.5px",
                                    marginBottom: "23.5px"
                                }}
                            />
                            <Box display="flex" sx={{ alignItems: "center" }}>
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is region icon</title>
                                    <rect
                                        width={24}
                                        height={24}
                                        rx={12}
                                        fill="#E8EEFF"
                                    />
                                    <path
                                        d="M17.0022 15H19.0022V17H17.0022V15ZM17.0022 11H19.0022V13H17.0022V11ZM17.0022 7H19.0022V9H17.0022V7ZM13.7422 7L15.0022 7.84V7H13.7422Z"
                                        fill="#1E1E1E"
                                    />
                                    <path
                                        d="M10 3V4.51L12 5.84V5H21V19H17V21H23V3H10Z"
                                        fill="#1E1E1E"
                                    />
                                    <path
                                        d="M8.17 5.69995L15 10.25V21H1V10.48L8.17 5.69995ZM10 19H13V11.16L8.17 8.08995L3 11.38V19H6V13H10V19Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>
                                <Typography
                                    sx={{
                                        marginLeft: "8px",
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        lineHeight: "28px",
                                        color: "#5C5C5C"
                                    }}
                                >
                                    {Object.keys(currentproject).length > 0 ? (
                                        contacts[region]?.name
                                    ) : (
                                        <Skeleton variant="text" width={100} />
                                    )}
                                </Typography>
                            </Box>
                            <Box display="flex" marginTop="16px">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is phone number icon</title>
                                    <rect
                                        width={24}
                                        height={24}
                                        rx={12}
                                        fill="#E8EEFF"
                                    />
                                    <path
                                        d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>

                                <Typography
                                    sx={{
                                        marginLeft: "8px",
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#5C5C5C"
                                    }}
                                >
                                    {Object.keys(currentproject).length > 0 ? (
                                        contacts[region]?.contact
                                    ) : (
                                        <Skeleton variant="text" width={100} />
                                    )}
                                </Typography>
                            </Box>
                            <Box display="flex" marginTop="16px">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is email icon</title>
                                    <rect
                                        width={24}
                                        height={24}
                                        rx={12}
                                        fill="#E8EEFF"
                                    />
                                    <path
                                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 10.99L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>

                                <Link
                                aria-label={contacts[region]?.email}
                                    sx={{
                                        textDecoration: "none",
                                        marginLeft: "8px",
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#1D4ED8"
                                    }}
                                    className="no-underline"
                                    href={`Mailto:${contacts[region]?.email}`}
                                >
                                    {Object.keys(currentproject).length > 0 ? (
                                        contacts[region]?.email
                                    ) : (
                                        <Skeleton variant="text" width={200} />
                                    )}
                                </Link>
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            alignItems="flex-start"
                            sx={{
                                marginTop: { md: "32px", xs: "25px" },
                                maxWidth: {
                                    lg: "100%",
                                    sm: "100%"
                                },
                                flexDirection: "column"
                            }}
                            padding="0px 0px 0px 0px"
                        >
                            <FormControlLabel
                                aria-label="I acknowledge that I have received all deliverables and my project has been completed to my satisfaction."
                                // aria-selected={installDate}
                                onChange={(e) => handleCheckBox(e)}
                                checked={installDate}
                                disabled={
                                    disabled ||
                                    Object.keys(currentproject).length == 0
                                }
                                control={
                                    <Checkbox
                                        sx={{
                                            transform: "scale(.7)",
                                            alignSelf: "flex-start",
                                            marginRight: {
                                                md: "5px",
                                                xs: "0px"
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    display: "flex",
                                    color: installDate ? "#1E1E1E" : "#5C5C5C",
                                    alignSelf: "flex-start",
                                    fontSize: "16px",
                                    lineHeight: "24px"
                                }}
                                label="I acknowledge that I have received all deliverables and my project has been completed to my satisfaction."
                                className="site-readniess-achknowledgment"
                            />
                        </Box>
                        <Divider
                            className="divider-col"
                            sx={{
                                width: "100%",
                                marginTop: { xl: "31", md: "32px", xs: "24px" }
                            }}
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
                                    alignItems: "center",
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
                                    width={{
                                        md: "auto",
                                        xs: "100%"
                                    }}
                                />
                                <CommonButton
                                    className={"next-button"}
                                    onclickHandler={submitData}
                                    ariaTag={"This is submit button"}
                                    variant={"contained"}
                                    disabled={!installDate || disabled}
                                    px={"20px"}
                                    py={{ xs: "12px" }}
                                    width={{
                                        md: "95px",
                                        sm: "100%",
                                        xs: "100%"
                                    }}
                                    color="white"
                                    fontSize="16px"
                                    lineHeight="24px"
                                    fontWeight="600"
                                    content={"Submit"}
                                    mt={{ xs: 2, md: 0 }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ConfirmationNotification
                open={loading}
                title={"Project Complete"}
                close={() => handleClose()}
            />
        </Box>
    )
}
