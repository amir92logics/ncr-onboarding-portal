import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
    Button,
    Checkbox,
    Divider,
    List,
    ListItem,
    Skeleton
} from "@mui/material"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import moment from "moment"
import InstallDateCalendarPopUp from "./InstallDateCalendarPopUp/index.js"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import SignaturePopup from "../customerReqofSystemDelCom/SignaturePopup"
import {
    setInstalldatedata,
    SetSubTasks,
    SetTasks
} from "../../redux-setup/dataSlice"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../redux-setup/api/data"
import theme from "../../src/theme"
import { makeStyles } from "@mui/styles"
import ConfirmationNotification from "../common/ConfirmationNotification"
import CommonButton from "../common/CommonButton/index.js"
import { OverViewStatusChip } from "../common/CustomStatusChip/index.js"
import Image from "next/image.js"
import { unixDateConverter } from "../../helper/Constraints.js"
const useStyles = makeStyles(() => ({
    root: {
        "&:hover": {
            backgroundColor: "white !important"
        }
    }
}))
export default function InstallationDeliveryDocument() {
    const classes = useStyles()
    const [loading, setLoading] = useState("")
    const router = useRouter()
    const [updatedata] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const routerID = router.query.id
    const [installDate, setInstallDate] = useState(false)
    const dispatch = useDispatch()
    const [openPopUp, setOpenPopUp] = useState(false)
    const [signatureText, setSignatureText] = useState(null)
    const [showSignatureText, setShowSignatureText] = useState(false)
    const [showSignature, setShowSignature] = useState(false)
    const [signatureUrl, setSignatureUrl] = useState(null)
    const handleTogglePopUp = (value) => {
        setShowPopUp(value)
    }
    const user = useSelector((state) => state.auth.user)
    const initialdata = useSelector((state) => state.dataSlice.installDate)
    const handleSubmitPopUp = (date) => {
        setRequestedDate(new Date(date).getTime() / 1000)
        let estinmateddate =
            new Date(moment(date).subtract(2, "days")).getTime() / 1000
        const _tempData = {
            submit_date: new Date().toString(),
            approve_install_date: false,
            requested_install_date: new Date(date).getTime() / 1000,
            hardware_delivery_date: estinmateddate,
            installDate: false,
            signatureUrl: null,
            signatureText: null
        }
        setSucces(false)
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Confirm Install Date",
            json_data: _tempData
        })
            .unwrap()
            .then((res) => {
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
            })
        setRequiredDate(moment(date).format("MMMM Do, YYYY"))
    }
    const [showPopUp, setShowPopUp] = useState(false)
    const [requestedDate, setRequestedDate] = useState(null)
    const [estinmateddate, setEstinmateddate] = useState(null)
    const [requiredDate, setRequiredDate] = useState(null)
    const [success, setSucces] = useState(true)
    const [disableStage, setDisableStage] = useState(false)
    let installDatedata = tasks?.find(
        (it) => it.task_name == "Confirm Install Date"
    )
    let infodata = installDatedata?.json
    let confirmation = installDatedata?.status.toLowerCase()
    const [fetching, setFetching] = useState(true)
    useEffect(() => {
        if (infodata != null) {
            if (
                confirmation == "pending approval" &&
                infodata.requested_install_date
            ) {
                setSucces(false)
                setRequestedDate(infodata.requested_install_date)
            } else if (
                confirmation == "confirmed" ||
                confirmation == "completed"
            ) {
                setRequestedDate(infodata.requested_install_date)
                setRequiredDate(infodata.requested_install_date)
                setEstinmateddate(infodata.hardware_delivery_date)
                setSucces(true)
                if (infodata.signatureText !== null) {
                    setDisableStage(true)
                    setShowSignatureText(true)
                    setShowSignature(false)
                    setSignatureText(infodata.signatureText)
                } else if (infodata.signatureUrl) {
                    setDisableStage(true)
                    setShowSignatureText(false)
                    setShowSignature(true)
                    setSignatureUrl(infodata.signatureUrl)
                }
                setInstallDate(infodata.installDate)
            } else {
                setRequiredDate(infodata.requested_install_date)
                setEstinmateddate(infodata.hardware_delivery_date)
                setSucces(true)
            }
        }
        if (initialdata?.signatureUrl || initialdata?.signatureText) {
            if (initialdata.signatureText !== null) {
                setShowSignatureText(true)
                setInstallDate(initialdata.installDate)
                setShowSignature(false)
                setSignatureText(initialdata.signatureText)
            } else if (initialdata.signatureUrl) {
                setShowSignatureText(false)
                setInstallDate(initialdata.installDate)
                setShowSignature(true)
                setSignatureUrl(initialdata.signatureUrl)
            }
        }
        confirmation && setFetching(false)
    }, [tasks, initialdata])
    const post = async () => {
        setLoading("loading")
        const _tempData = {
            installDate,
            submit_date: new Date().toString(),
            signatureUrl,
            signatureText,
            approve_install_date: true,
            requested_install_date: requiredDate,
            hardware_delivery_date: estinmateddate,
            user_email: user.email
        }
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Confirm Install Date",
            json_data: _tempData
        })
            .unwrap()
            .then((res) => {
                setDisableStage(true)
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        setTimeout(() => {
                            setLoading("confirm")
                            setTimeout(() => {
                                setLoading("")
                                router.push({
                                    pathname: `/actions/${routerID}`
                                })
                            }, 2000)
                        }, 2000)
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => setLoading("error"))
            })
            .catch((err) => setLoading("error"))
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
    const handleOptionDate = (e) => {
        setInstallDate(e.target.checked)
    }
    const handleBack = () => {
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    const handleReset = () => {
        setSignatureUrl(null)
        setSignatureText(null)
        setShowSignature(false)
        setShowSignatureText(false)
    }
    const storeData = (url, text) => {
        const storedata = {
            signatureUrl: url,
            signatureText: text,
            installDate
        }
        dispatch(setInstalldatedata(storedata))
    }

    return (
        <Box
            className="intallation"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            alignSelf="center"
        >
            <Box
                className="shadow"
                sx={{
                    background: "white",
                    borderRadius: "8px",
                    padding: { xs: "20px 16px", md: "23px 24px 24px 24px" },
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: { xl: "start" }
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
                    <Box sx={{ mt: { xs: "0px", md: "2px" } }}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>
                                This is customer request of system installation
                            </title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M21 3H3C1.89 3 1 3.89 1 5V17C1 18.1 1.89 19 3 19H8V21H16V19H21C22.1 19 22.99 18.1 22.99 17L23 5C23 3.89 22.1 3 21 3ZM21 17H3V5H21V17Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                    </Box>
                    <Box>
                        <Typography
                            lineHeight="28px"
                            fontWeight="600"
                            letterSpacing="-0.0060em"
                            fontSize="20px"
                            sx={{
                                color: "#1E1E1E"
                            }}
                        >
                            Customer Request of System Installation
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ maxWidth: "1024px" }}>
                    <Box
                        sx={{
                            marginTop: {
                                xs: "24px"
                            },
                            color: theme.palette.secondary.main,
                            maxWidth: "100%"
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
                            There are{" "}
                            <Box component={"span"} sx={{ fontWeight: 600 }}>
                                2
                            </Box>{" "}
                            important dates we need defined for your project,
                            Delivery Date, and Installation Date. Your accuracy
                            in setting and commitment to meeting these agreed
                            upon dates are critical for the success of the
                            project and meeting your timeline:
                        </Typography>
                        <Box
                            sx={{
                                fontWeight: 400,
                                paddingY: "8px",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: theme.palette.secondary.main
                            }}
                        >
                            <List
                                sx={{
                                    listStyleType: "disc",
                                    "& .MuiListItem-root": {
                                        display: "list-item"
                                    },
                                    paddingLeft: "25px"
                                }}
                            >
                                <ListItem
                                    disablePadding
                                    sx={{
                                        letterSpacing: "-0.001em",
                                        mb: "20px"
                                    }}
                                >
                                    <Box
                                        component={"span"}
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Delivery Date –
                                    </Box>{" "}
                                    is the date you will receive all your
                                    hardware to your previously defined ‘Install
                                    Address.’ Estimated arrival date is 2
                                    business days prior to installation date.
                                </ListItem>
                                {/* <br /> */}

                                <ListItem
                                    disablePadding
                                    sx={{ letterSpacing: "-0.0019em" }}
                                >
                                    <Box
                                        component={"span"}
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Installation Date –
                                    </Box>{" "}
                                    is the date an NCR resource will arrive
                                    onsite to install all hardware and software
                                </ListItem>
                            </List>
                        </Box>

                        <Typography
                            className="f-f-i"
                            sx={{
                                fontWeight: 400,

                                fontSize: "16px",
                                lineHeight: "24px",
                                color: theme.palette.secondary.main
                            }}
                        >
                            NCR will commit to the installation of your hardware
                            on the date you requested.
                            <br />
                            <br /> Once your requested date is confirmed, the
                            hardware delivery date is locked in and cannot be
                            changed. Please arrange to receive and properly
                            store your hardware to prevent damage until you are
                            ready to proceed. Final payment is due upon
                            equipment delivery.
                        </Typography>

                        <Typography
                            className="f-f-i"
                            sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                paddingTop: "24px",
                                lineHeight: "24px",
                                color: theme.palette.secondary.main
                            }}
                        >
                            NCR cannot be held responsible for construction
                            delays or other logistical issues beyond our control
                            once you have requested a date. However, if a
                            requested installation date needs rescheduled, NCR
                            will make best effort to accommodate new date with a
                            14-day notice. Installation dates are based on
                            resource availability therefore if new date cannot
                            be accommodated, an alternate date will be
                            suggested.
                        </Typography>
                        <Typography
                            className="f-f-i"
                            sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                paddingTop: "24px",
                                lineHeight: "24px",
                                color: theme.palette.secondary.main
                            }}
                        >
                            If proper reschedule notice is not given or site is
                            not ready upon installation date, additional travel
                            or rescheduling fees may be applied.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                className="shadow"
                sx={{
                    background: "white",
                    borderRadius: "8px",
                    padding: { xs: "19px 16px 20px", md: "23px 24px" },
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: { xl: "start" },
                    marginTop: { xs: "24px", md: "32px" }
                }}
            >
                <Box
                    sx={{
                        display: {
                            xs: "block",
                            xl: "flex-col",
                            width: "100%"
                        },
                        paddingY: "2px"
                    }}
                >
                    <Box
                        sx={{
                            display: { lg: "flex" },

                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "row"
                                }
                            }}
                            gap="12px"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "12px"
                                }}
                            >
                                <Box sx={{ mt: { xs: "3px", lg: "2px" } }}>
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>
                                            This is requested installation date
                                            icon
                                        </title>
                                        <rect
                                            width={24}
                                            height={24}
                                            rx={12}
                                            fill="#E8EEFF"
                                        />
                                        <path
                                            d="M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z"
                                            fill="#1E1E1E"
                                        />
                                    </svg>
                                </Box>
                                <Box>
                                    <Typography
                                        lineHeight="28px"
                                        fontWeight="600"
                                        letterSpacing="-0.01em"
                                        fontSize="20px"
                                        sx={{
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        {fetching ? (
                                            <Skeleton
                                                variant="text"
                                                width={200}
                                            />
                                        ) : (
                                            "Requested Installation Date:"
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "20px",
                                    lineHeight: "28px",
                                    color: "#1E1E1E",
                                    paddingLeft: {
                                        lg: "16px"
                                    }
                                }}
                            >
                                {fetching ? (
                                    <Skeleton variant="text" width={300} />
                                ) : requestedDate ? (
                                    unixDateConverter(
                                        requestedDate,
                                        "MMMM Do, YYYY"
                                    )
                                ) : requiredDate ? (
                                    unixDateConverter(
                                        requiredDate,
                                        "MMMM Do, YYYY"
                                    )
                                ) : (
                                    "N/A"
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { md: "row", xs: "column" },
                                justifyContent: "flex-start",
                                alignItems: { xs: "start", md: "center" },
                                marginTop: { xs: "11px", lg: "0px" }
                            }}
                        >
                            {fetching ? (
                                <Skeleton
                                    height={48}
                                    sx={{ ml: 4 }}
                                    variant="rectangular"
                                    width={150}
                                />
                            ) : requestedDate ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        maxWidth: { xs: "308px", md: "100%" }
                                    }}
                                >
                                    {!success ? (
                                        <Box
                                            sx={{
                                                marginLeft: "16px",
                                                marginTop: {
                                                    md: "0px",
                                                    xs: "4px"
                                                }
                                            }}
                                        >
                                            <OverViewStatusChip
                                                label="Pending Approval"
                                                status={""}
                                            />
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                marginTop: {
                                                    xs: "4px",
                                                    md: "0px"
                                                },
                                                marginLeft: {
                                                    xl: "16px",
                                                    lg: "20px",
                                                    md: "20px",
                                                    sm: "0px",
                                                    xs: "0px"
                                                }
                                            }}
                                        >
                                            <OverViewStatusChip
                                                label="Date Accepted"
                                                status={"completed"}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            ) : (
                                <Button
                                    onClick={() => setShowPopUp(true)}
                                    disabled={disableStage}
                                    className="back-button"
                                    sx={{
                                        p: "9px 17px",
                                        border: "1px solid #EEEEEE",
                                        color: "#1D4ED8",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        borderRadius: "8px",
                                        marginTop: {
                                            xs: "4px",
                                            md: "0px"
                                        },
                                        marginX: { md: "16px", xs: "0px" },
                                        alignItems: "center",
                                        textAlign: "center",
                                        width: { xs: "100%", md: "auto" },

                                        "&:disabled": { opacity: "0.4" },
                                        cursor: "pointer",
                                        "&:hover": {
                                            background: "#F5F6FF !important",
                                            border: "1px solid #1D4ED8 !important "
                                        }
                                    }}
                                >
                                    Request a New Date
                                </Button>
                            )}

                            <InstallDateCalendarPopUp
                                handleTogglePopUp={handleTogglePopUp}
                                handleSubmitPopUp={handleSubmitPopUp}
                                setRequiredDate={setRequiredDate}
                                showPopUp={showPopUp}
                            />
                        </Box>
                    </Box>
                    {requiredDate || requestedDate ? (
                        <Box>
                            {success ? (
                                <>
                                    {" "}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                md: "row",
                                                xs: "column"
                                            },
                                            justifyContent: "flex-start",
                                            alignItems: {
                                                xs: "start",
                                                md: "center"
                                            },
                                            marginTop: {
                                                xs: "24px",
                                                md: "24px",
                                                lg: "27px",
                                                xxl: "25px"
                                            }
                                        }}
                                    >
                                        <Typography
                                            lineHeight="28px"
                                            fontWeight="600"
                                            letterSpacing="-0.008em"
                                            fontSize="18px"
                                            sx={{
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            Estimated Hardware Delivery Date:
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                lineHeight: "28px",
                                                color: theme.palette.secondary
                                                    .main,
                                                marginTop: {
                                                    xs: "13px",
                                                    md: "0px"
                                                },
                                                paddingLeft: {
                                                    lg: "16px"
                                                }
                                            }}
                                        >
                                            {estinmateddate
                                                ? unixDateConverter(
                                                      estinmateddate,
                                                      "MMMM Do, YYYY"
                                                  )
                                                : "N/A"}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        lineHeight="24px"
                                        fontWeight="400"
                                        fontSize="16px"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            mt: "23px",
                                            color: theme.palette.secondary.main,
                                            maxWidth: {
                                                xs: "100%",
                                                md: "800px",
                                                xl: "896px"
                                            }
                                        }}
                                    >
                                        I acknowledge and agree to the requested
                                        installation date. I understand once I
                                        accept this date, hardware delivery
                                        cannot be changed therefore I will be
                                        responsible for delivery acceptance
                                        regardless of any future installation
                                        reschedule requests.
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: {
                                                xs: "block",
                                                md: "flex"
                                            },
                                            flexDirection: {
                                                lg: "row",
                                                xs: "column"
                                            },
                                            alignItems: {
                                                xs: "flex-start"
                                            }
                                        }}
                                    >
                                        <RadioGroup
                                            onChange={handleOptionDate}
                                            sx={{
                                                maxWidth: {
                                                    xl: "743px",
                                                    lg: "100%",
                                                    md: "100%",
                                                    xs: "100%"
                                                },
                                                pt: {
                                                    lg: "14px",
                                                    xs: "16px"
                                                },
                                                color: "#1E1E1E"
                                            }}
                                            className="site-readniess-achknowledgment"
                                        >
                                            <FormControlLabel
                                                sx={{
                                                    marginTop: {
                                                        xs: "8px",
                                                        md: "0px"
                                                    },
                                                    paddingLeft: "0px"
                                                }}
                                                aria-labelledby="radio-group"
                                                control={
                                                    <Checkbox
                                                        classes={{
                                                            checked:
                                                                classes.root
                                                        }}
                                                        disabled={disableStage}
                                                        onChange={(e) =>
                                                            handleOptionDate(e)
                                                        }
                                                        checked={installDate}
                                                        sx={{
                                                            marginTop: {
                                                                md: "0px",
                                                                xs: "2px"
                                                            },
                                                            color: theme.palette
                                                                .textColor.main,
                                                            paddingRight: {
                                                                xs: "10px"
                                                            },
                                                            transform:
                                                                "scale(.9)",

                                                            // "&.Mui-checked": {
                                                            //     color: "#1D4ED8"
                                                            // },
                                                            alignSelf:
                                                                "flex-start",
                                                            "&:hover": {
                                                                background:
                                                                    "#F5F5F5 !important"
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="I have read and agree to the installation date above."
                                            />
                                        </RadioGroup>
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "18px",
                                            lineHeight: "28px",
                                            color: "#1E1E1E",
                                            marginTop: {
                                                xs: "23px",
                                                md: "16px"
                                            },
                                            letterSpacing: "-0.008em",
                                            opacity: !installDate && 0.5
                                        }}
                                    >
                                        Please Insert your Signature:
                                    </Typography>
                                    <Box>
                                        <Button
                                            onClick={() => setOpenPopUp(true)}
                                            aria-label="Clear"
                                            disabled={
                                                !installDate || disableStage
                                            }
                                            sx={{
                                                textTransform: "initial",
                                                minWidth: {
                                                    xs: "100%",
                                                    md: "auto"
                                                },
                                                marginTop: "16px",
                                                border: " 2px dashed #BDBDBD",
                                                padding: "10px 22px",
                                                fontWeight: 500,
                                                display: "flex",
                                                gap: 2,
                                                justifyContent: "center",
                                                borderRadius: " 8px",
                                                background: "#FAFAFA",
                                                fontSize: {
                                                    xs: "14px"
                                                },
                                                lineHeight: {
                                                    lg: "20px",
                                                    xs: "24px"
                                                },
                                                opacity: !installDate && 0.5,
                                                color:
                                                    !disableStage &&
                                                    "#1D4ED8 !important",
                                                "&:hover": {
                                                    color: "#1D4ED8",
                                                    border: " 2px dashed #1D4ED8",
                                                    backgroundColor:
                                                        "#F5F6FF important"
                                                },
                                                "&.focus": {
                                                    color: "#1D4ED8 !important"
                                                }
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
                                                    This is sign it icon
                                                </title>
                                                <g clipPath="url(#clip0_46_59062)">
                                                    <path
                                                        d="M3 17C6.333 13.667 8 11 8 9C8 6 7 6 6 6C5 6 3.968 7.085 4 9C4.034 11.048 5.658 13.877 6.5 15C8 17 9 17.5 10 16L12 13C12.333 15.667 13.333 17 15 17C15.53 17 17.639 15 18 15C18.517 15 19.517 15.667 21 17"
                                                        stroke={
                                                            disableStage
                                                                ? "rgba(0, 0, 0, 0.2)"
                                                                : "#1D4ED8"
                                                        }
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath>
                                                        <rect
                                                            width={24}
                                                            height={24}
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            Sign It
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    <Box
                                        sx={{
                                            color: theme.palette.secondary.main,
                                            fontSize: "18px",
                                            fontWeight: 600,
                                            lineHeight: "28px",
                                            marginTop: "24px"
                                        }}
                                    >
                                        Your request has been submitted to NCR
                                        for review. Once they approve you
                                        requested installation date, you will
                                        receive a confirmation email at your
                                        registered email address.
                                    </Box>
                                </>
                            )}
                        </Box>
                    ) : (
                        <>
                            {" "}
                            {fetching ? (
                                <Box sx={{ mt: 4 }}>
                                    <Skeleton variant="text" width={"75%"} />
                                    <Skeleton variant="text" width={"75%"} />
                                    <Skeleton variant="text" width={"75%"} />
                                    <Skeleton variant="text" width={"75%"} />
                                </Box>
                            ) : (
                                <Typography
                                    variant="body1"
                                    lineHeight="24px"
                                    fontWeight="400"
                                    fontSize="16px"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        mt: 6,
                                        color: theme.palette.secondary.main,
                                        maxWidth: {
                                            xs: "100%",

                                            lg: "100%"
                                        }
                                    }}
                                >
                                    I acknowledge and agree to the requested
                                    installation date. I understand once I
                                    accept this date, hardware delivery cannot
                                    be changed therefore I will be responsible
                                    for delivery acceptance regardless of any
                                    future installation reschedule requests.
                                </Typography>
                            )}
                            <Box
                                sx={{
                                    display: {
                                        xs: "block",
                                        md: "flex"
                                    },
                                    mt: { lg: "21.5px", xs: 4 },
                                    flexDirection: { lg: "row", xs: "column" },
                                    alignItems: {
                                        xs: "flex-start"
                                    }
                                }}
                            >
                                <RadioGroup
                                    onChange={handleOptionDate}
                                    sx={{
                                        p: 0,
                                        maxWidth: {
                                            xl: "743px",
                                            lg: "100%",
                                            md: "100%",
                                            xs: "100%"
                                        },

                                        color: "#1E1E1E",
                                        lineHeight: "24px"
                                    }}
                                >
                                    <FormControlLabel
                                        sx={{ m: 0 }}
                                        aria-labelledby="radio-group"
                                        control={
                                            <Checkbox
                                                disabled={
                                                    disableStage ||
                                                    !requiredDate
                                                }
                                                onChange={(e) =>
                                                    handleOptionDate(e)
                                                }
                                                checked={installDate}
                                                sx={{
                                                    p: "2.5px 4.5px 3.5px 2.5px",
                                                    mr: "15px",
                                                    ml: "-2px",
                                                    marginTop: {
                                                        xs: "5px",
                                                        md: "0px"
                                                    },
                                                    transform: "scale(0.9)",

                                                    "&.Mui-checked": {
                                                        color: "#1D4ED8"
                                                    },
                                                    alignSelf: "flex-start",
                                                    "&:hover": {
                                                        bgcolor: "#F5F5F5"
                                                    }
                                                }}
                                            />
                                        }
                                        label="I have read and agree to the installation date above."
                                    />
                                </RadioGroup>
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "28px",
                                    color: "#1E1E1E",
                                    marginTop: "20.5px",
                                    opacity: !installDate && 0.5
                                }}
                            >
                                Please Insert your Signature:
                            </Typography>
                            <Box sx={{ width: { xs: "auto" } }}>
                                <Button
                                    onClick={() => setOpenPopUp(true)}
                                    aria-label="Clear"
                                    disabled={!installDate || disableStage}
                                    sx={{
                                        textTransform: "initial",
                                        width: { xs: "100%", md: "auto" },
                                        marginTop: "16px",
                                        border: " 2px dashed #BDBDBD",
                                        padding: "10px 22px",
                                        fontWeight: 500,
                                        display: "flex",
                                        gap: 2,
                                        justifyContent: "center",
                                        borderRadius: " 8px",
                                        background: "#FAFAFA",
                                        fontSize: {
                                            lg: "14px",
                                            xs: "16px"
                                        },
                                        lineHeight: {
                                            lg: "21px",
                                            xs: "24px"
                                        },
                                        opacity: !installDate && 0.5,
                                        color: "#1D4ED8 !important",
                                        "&:hover": {
                                            color: "#1D4ED8",
                                            border: " 2px dashed #1D4ED8",
                                            backgroundColor:
                                                "#F5F6FF !important"
                                        },
                                        "&.focus": {
                                            color: "#1D4ED8 !important"
                                        }
                                    }}
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is sign it icon</title>
                                        <g clipPath="url(#clip0_46_59062)">
                                            <path
                                                d="M3 17C6.333 13.667 8 11 8 9C8 6 7 6 6 6C5 6 3.968 7.085 4 9C4.034 11.048 5.658 13.877 6.5 15C8 17 9 17.5 10 16L12 13C12.333 15.667 13.333 17 15 17C15.53 17 17.639 15 18 15C18.517 15 19.517 15.667 21 17"
                                                stroke="#1D4ED8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath>
                                                <rect
                                                    width={24}
                                                    height={24}
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Sign It
                                </Button>
                            </Box>
                        </>
                    )}
                    {showSignatureText ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: theme.palette.textColor.main,
                                    marginTop: "32px"
                                }}
                            >
                                Selected Signature
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                sx={{
                                    marginTop: "16px",
                                    padding: "16px",
                                    backgroundColor: "#FFFFFF",
                                    maxWidth: "360px",
                                    height: "220px",
                                    border: "1px solid #4CAF50",
                                    borderRadius: "8px"
                                }}
                            >
                                <Box
                                    onClick={() => {
                                        !disableStage && handleReset()
                                    }}
                                    sx={{
                                        display: "flex",
                                        cursor: disableStage ? "" : "pointer",
                                        opacity: disableStage ? 0 : 1,
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>
                                            This is delete signature icon
                                        </title>
                                        <path
                                            d="M0 10C0 4.47715 4.47715 0 10 0V0C15.5228 0 20 4.47715 20 10V10C20 15.5228 15.5228 20 10 20V20C4.47715 20 0 15.5228 0 10V10Z"
                                            fill="#B3B3B5"
                                        />
                                        <path
                                            d="M13.5 7.205L12.795 6.5L10 9.295L7.205 6.5L6.5 7.205L9.295 10L6.5 12.795L7.205 13.5L10 10.705L12.795 13.5L13.5 12.795L10.705 10L13.5 7.205Z"
                                            fill="white"
                                        />
                                    </svg>
                                </Box>
                                <Box
                                    onClick={() =>
                                        !disableStage && setOpenPopUp(true)
                                    }
                                    sx={{
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "47px",
                                        height: "73px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            wordBreak: "keep-all",
                                            wordWrap: "break-word",
                                            fontSize: "35px",
                                            lineHeight: "40px",
                                            fontWeight: "400"
                                        }}
                                        className={signatureText?.class}
                                    >
                                        {signatureText?.title}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <Box
                                        className="f-f-i back-button"
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "auto"
                                            },
                                            marginBottom: "-17px",
                                            backgroundColor: "#fff !important",
                                            boxShadow:
                                                "0px 4px 8px 3px rgba(117, 117, 117, 0.04)",
                                            borderRadius: "6px",
                                            padding: "8px 16px",
                                            fontWeight: 500,
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            color: "#15803D  !important",

                                            "&:hover": {
                                                color: "#15803D  !important"
                                            }
                                        }}
                                    >
                                        <svg
                                            style={{ marginRight: "8px" }}
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>This is saved icon</title>
                                            <path
                                                d="M8.9974 0.666992C4.3974 0.666992 0.664062 4.40033 0.664062 9.00033C0.664062 13.6003 4.3974 17.3337 8.9974 17.3337C13.5974 17.3337 17.3307 13.6003 17.3307 9.00033C17.3307 4.40033 13.5974 0.666992 8.9974 0.666992ZM8.9974 15.667C5.3224 15.667 2.33073 12.6753 2.33073 9.00033C2.33073 5.32533 5.3224 2.33366 8.9974 2.33366C12.6724 2.33366 15.6641 5.32533 15.6641 9.00033C15.6641 12.6753 12.6724 15.667 8.9974 15.667ZM12.8224 5.31699L7.33073 10.8087L5.1724 8.65866L3.9974 9.83366L7.33073 13.167L13.9974 6.50033L12.8224 5.31699Z"
                                                fill="#15803D "
                                            />
                                        </svg>
                                        Saved
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : showSignature && signatureUrl !== "" ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: theme.palette.textColor.main,
                                    marginTop: "32px"
                                }}
                            >
                                Selected Signature
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                sx={{
                                    marginTop: "16px",
                                    padding: "16px",
                                    backgroundColor: "#FFFFFF",
                                    maxWidth: "360px",
                                    height: "220px",
                                    border: "1px solid #4CAF50",
                                    borderRadius: "8px"
                                }}
                            >
                                <Box
                                    onClick={() => {
                                        !disableStage && handleReset()
                                    }}
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 10C0 4.47715 4.47715 0 10 0V0C15.5228 0 20 4.47715 20 10V10C20 15.5228 15.5228 20 10 20V20C4.47715 20 0 15.5228 0 10V10Z"
                                            fill="#B3B3B5"
                                        />
                                        <path
                                            d="M13.5 7.205L12.795 6.5L10 9.295L7.205 6.5L6.5 7.205L9.295 10L6.5 12.795L7.205 13.5L10 10.705L12.795 13.5L13.5 12.795L10.705 10L13.5 7.205Z"
                                            fill="white"
                                        />
                                    </svg>
                                </Box>

                                <Box
                                    sx={{
                                        overflow: "hidden",
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "47px",
                                        height: "63px",
                                        mx: "auto",
                                        position: "relative",
                                        width: 150
                                    }}
                                >
                                    <Image
                                        layout="fill"
                                        alt="Signature"
                                        src={signatureUrl}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "32px"
                                    }}
                                >
                                    <Box
                                        className="f-f-i back-button"
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "auto"
                                            },

                                            backgroundColor: "#fff !important",
                                            boxShadow:
                                                "0px 4px 8px 3px rgba(117, 117, 117, 0.04)",
                                            borderRadius: "6px",
                                            padding: "8px 16px",
                                            fontWeight: 500,
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            color: "#4CAF50 !important",
                                            "&:hover": {
                                                color: "#4CAF50 !important"
                                            }
                                        }}
                                    >
                                        <svg
                                            style={{ marginRight: "8px" }}
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>This is saved icon</title>
                                            <path
                                                d="M8.9974 0.666992C4.3974 0.666992 0.664062 4.40033 0.664062 9.00033C0.664062 13.6003 4.3974 17.3337 8.9974 17.3337C13.5974 17.3337 17.3307 13.6003 17.3307 9.00033C17.3307 4.40033 13.5974 0.666992 8.9974 0.666992ZM8.9974 15.667C5.3224 15.667 2.33073 12.6753 2.33073 9.00033C2.33073 5.32533 5.3224 2.33366 8.9974 2.33366C12.6724 2.33366 15.6641 5.32533 15.6641 9.00033C15.6641 12.6753 12.6724 15.667 8.9974 15.667ZM12.8224 5.31699L7.33073 10.8087L5.1724 8.65866L3.9974 9.83366L7.33073 13.167L13.9974 6.50033L12.8224 5.31699Z"
                                                fill="#4CAF50"
                                            />
                                        </svg>
                                        Saved
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    mt: { xs: "22px", md: "30px", lg: "31px" }
                }}
            />

            <Box
                sx={{
                    // py: "23px",
                    alignSelf: { xs: "center", md: "end" },
                    minWidth: { xs: "100%", md: "auto" },
                    flexDirection: {
                        md: "row",
                        xs: "column"
                    }
                }}
            >
                <Box sx={{}} className="noUnderline">
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{
                            py: 5.5,
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
                                onclickHandler={handleBack}
                                className={"back-button"}
                                ariaTag={"This is Back Button"}
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
                                onclickHandler={() => post()}
                                className={"next-button"}
                                ariaTag={"This is Submit Button"}
                                variant={"contained"}
                                disabled={
                                    disableStage ||
                                    (!signatureText && !signatureUrl) ||
                                    !requiredDate
                                }
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
                                content={"Submit"}
                                mt={{ xs: "8px", md: "0px" }}
                            />
                        </Box>
                    </Box>

                    <ConfirmationNotification
                        open={loading}
                        title={"Confirm Install Date"}
                        close={() => handleClose()}
                    />
                    <SignaturePopup
                        setSignatureUrl={setSignatureUrl}
                        openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp}
                        storedata={storeData}
                        setShowSignatureText={setShowSignatureText}
                        setShowSignature={setShowSignature}
                        setSignatureText={setSignatureText}
                        disabled={disableStage}
                        signatureText={signatureText}
                        signatureUrl={signatureUrl}
                    />
                </Box>
            </Box>
        </Box>
    )
}
