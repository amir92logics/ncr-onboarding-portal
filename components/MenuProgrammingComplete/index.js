import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Button, Divider } from "@mui/material"
import SignaturePopup from "../customerReqofSystemDelCom/SignaturePopup"
import { useDispatch, useSelector } from "react-redux"
import {
    setMenuProgramingSignature,
    SetSubTasks,
    SetTasks
} from "../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import theme from "../../src/theme"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../redux-setup/api/data"
import ConfirmationNotification from "../common/ConfirmationNotification"
import CommonButton from "../common/CommonButton"
import Image from "next/image"

export default function MenuProgrammingComplete() {
    const [openPopUp, setOpenPopUp] = useState(false)
    const [signatureUrl, setSignatureUrl] = useState(null)
    const [signatureText, setSignatureText] = useState(null)
    const [updatedata] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    const [showSignature, setShowSignature] = useState(false)
    const [showSignatureText, setShowSignatureText] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth.user)
    const router = useRouter()
    const routerID = router.query.id
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.dataSlice.tasks)
    let currentTask = tasks?.find(
        (task) => task.task_name === "Confirm Menu Programming"
    )
    const menuProgramingSignature = useSelector(
        (state) => state.dataSlice.menuProgramingSignature
    )
    const [disabled, setDisable] = useState(false)

    useEffect(() => {
        if (currentTask && currentTask.json !== null) {
            setDisable(true)
            if (currentTask.json.signatureText) {
                setSignatureText(currentTask.json.signatureText)
                setShowSignatureText(true)
            } else {
                setSignatureUrl(currentTask.json.signatureUrl)
                setShowSignature(true)
            }
        } else if (menuProgramingSignature.length > 0) {
            if (menuProgramingSignature[0].signatureText) {
                setSignatureText(menuProgramingSignature[0].signatureText)
                setShowSignatureText(true)
            } else {
                setSignatureUrl(menuProgramingSignature[0].signatureUrl)
                setShowSignature(true)
            }
        }
    }, [tasks, menuProgramingSignature])

    const handleReset = () => {
        setSignatureUrl(null)
        setSignatureText(null)
        setShowSignature(false)
        setShowSignatureText(false)
    }

    const handleClick = (e) => {
        setLoading("loading")
        const storeData = {
            signatureUrl,
            signatureText,
            user_email: user.email
        }

        dispatch(setMenuProgramingSignature(storeData))
        if (disabled) {
            router.push({
                pathname: `/actions/${routerID}`
            })
        } else {
            updatedata({
                record_id_quickbase: routerID,
                task_name: "Confirm Menu Programming",
                json_data: storeData
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
                                    setLoading("")
                                    router.push({
                                        pathname: `/actions/${routerID}`
                                    })
                                }, 2000)
                            }, 2000)
                            dispatch(SetTasks(res.data.actions))
                            dispatch(SetSubTasks(res.data.sub_tasks))
                            router.push({
                                pathname: `/actions/${routerID}`
                            })
                        })
                        .catch((err) => setLoading("error"))
                })
                .catch((err) => setLoading("error"))
        }
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
    const handleBack = () => {
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    const storeData = (url, text) => {
        const storedata = [
            {
                signatureUrl: url,
                signatureText: text
            }
        ]
        dispatch(setMenuProgramingSignature(storedata))
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            width="100%"
        >
            <Box
                className="shadow"
                sx={{
                    background: "#ffffff",
                    padding: { md: "23px", xs: "20px 16px 19px 16px" },
                    borderRadius: "12px"
                }}
            >
                <Box>
                    <Box display={"flex"}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            
                            <title>This is sales tax confirmation icon</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2V16H3V19C3 20.66 4.34 22 6 22H18C19.66 22 21 20.66 21 19V2L19.5 3.5ZM15 20H6C5.45 20 5 19.55 5 19V18H15V20ZM19 19C19 19.55 18.55 20 18 20C17.45 20 17 19.55 17 19V16H8V5H19V19Z"
                                fill="#1E1E1E"
                            />
                            <path d="M15 7H9V9H15V7Z" fill="#1E1E1E" />
                            <path d="M18 7H16V9H18V7Z" fill="#1E1E1E" />
                            <path d="M15 10H9V12H15V10Z" fill="#1E1E1E" />
                            <path d="M18 10H16V12H18V10Z" fill="#1E1E1E" />
                        </svg>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "18px",
                                marginLeft: "8px",
                                lineHeight: "28px",
                                color: "#1E1E1E"
                            }}
                        >
                            Sales Tax Confirmation
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            paddingTop: { md: "8px", xs: "7px" },
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: "400",
                            color: theme.palette.secondary.main
                        }}
                    >
                        Sales taxes are an important part of the accounting of
                        your system. We have programmed your tax rates per the
                        settings defined during your Discovery Meeting. By
                        signing below, you:
                    </Typography>
                    <ul
                        style={{
                            paddingLeft: "23px",
                            marginTop: "8px",
                            marginBottom: "0px"
                        }}
                    >
                        <li style={{ fontWeight: "600", color: "#5C5C5C" }}>
                            Confirm the tax rates provided to NCR are accurate
                            and in accordance with government requirements
                        </li>
                        <li
                            style={{
                                fontWeight: "600",
                                color: "#5C5C5C",
                                marginTop: "8px"
                            }}
                        >
                            Confirm the requested specifications have been set
                            properly in your database
                        </li>
                        <li
                            style={{
                                fontWeight: "600",
                                color: "#5C5C5C",
                                marginTop: "8px"
                            }}
                        >
                            Acknowledge responsibility for programming taxes
                            correctly on your system going forward
                        </li>
                    </ul>
                </Box>
                <Box sx={{ paddingTop: "24px" }}>
                    <Box display={"flex"}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>
                                This is menu & programming confirmation icon
                            </title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M17.5 10.5C18.38 10.5 19.23 10.59 20 10.76V9.24C19.21 9.09 18.36 9 17.5 9C15.8 9 14.26 9.29 13 9.83V11.49C14.13 10.85 15.7 10.5 17.5 10.5Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M13 12.4902V14.1502C14.13 13.5102 15.7 13.1602 17.5 13.1602C18.38 13.1602 19.23 13.2502 20 13.4202V11.9002C19.21 11.7502 18.36 11.6602 17.5 11.6602C15.8 11.6602 14.26 11.9602 13 12.4902Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M17.5 14.3301C15.8 14.3301 14.26 14.6201 13 15.1601V16.8201C14.13 16.1801 15.7 15.8301 17.5 15.8301C18.38 15.8301 19.23 15.9201 20 16.0901V14.5701C19.21 14.4101 18.36 14.3301 17.5 14.3301Z"
                                fill="#1E1E1E"
                            />
                        </svg>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "18px",
                                marginLeft: "8px",
                                lineHeight: "28px",
                                color: "#1E1E1E !important"
                            }}
                        >
                            Menu & Programming Confirmation
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            paddingTop: "8px",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: theme.palette.secondary.main
                        }}
                    >
                        The final review of my system is complete, and I accept
                        the programming that NCR has provided based on the
                        information that I have supplied them during database
                        discovery. I understand it is my responsibility to
                        complete any information not supplied to NCR and any
                        future menu programming.
                    </Typography>
                </Box>
            </Box>
            <Box
                className="shadow"
                sx={{
                    width: { xs: "auto" },
                    background: "#ffffff",
                    padding: { md: "23px", xs: "19px 16px 19px 16px" },
                    borderRadius: "12px",
                    marginTop: { md: "24px", xs: "16px" }
                }}
            >
                <Box>
                    <Typography sx={{ color: "#1E1E1E" }}>
                        By signing this document, I acknowledge the above.
                    </Typography>
                </Box>
                <Box
                    display={
                        showSignatureText || showSignature ? "none" : "block"
                    }
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "28px",
                            color: "#1E1E1E",
                            marginTop: { md: "24px", xs: "25px" }
                        }}
                    >
                        Please Insert your Signature:
                    </Typography>
                    <Button
                        onClick={() => {
                            !disabled && setOpenPopUp(true)
                        }}
                        aria-label="This is sign it button"
                        disabled={disabled}
                        sx={{
                            width: { md: "auto", xs: "100%" },
                            marginTop: { md: "16px", xs: "15px" },
                            border: " 1px dashed #BDBDBD",
                            padding: {
                                lg: "12px 24px 10px 24px",
                                md: "12px 21px 10px 21px",
                                xs: "12px 24px 10px 24px"
                            },
                            fontWeight: 500,
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            borderRadius: "8px",
                            fontSize: {
                                lg: "14px",
                                xs: "16px"
                            },
                            lineHeight: {
                                lg: "21px",
                                xs: "24px"
                            },
                            textTransform: "none",
                            color:
                                !disabled &&
                                `${theme.palette.primary.main} !important`,
                            "&:hover": {
                                color: theme.palette.primary.main,
                                border: `1px dashed ${theme.palette.primary.main}`,
                                backgroundColor: "#1D4ED808"
                            },
                            "&.focus": {
                                color: `${theme.palette.primary.main} !important`
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
                                    stroke={
                                        disabled
                                            ? "rgba(0, 0, 0, 0.2)"
                                            : "#1D4ED8"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath>
                                    <rect width={24} height={24} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Sign It
                    </Button>
                </Box>
                {showSignatureText ? (
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#1E1E1E",
                                marginTop: "24px"
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
                                sx={{
                                    zIndex: "50",
                                    display: "flex",
                                    opacity: disabled ? 0 : 1,
                                    justifyContent: "flex-end",
                                    position: "relative"
                                }}
                            >
                                <svg
                                    onClick={() => {
                                        !disabled && handleReset()
                                    }}
                                    cursor={"pointer"}
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>
                                        This is delete selected signature icon
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
                                onClick={() => {
                                    !disabled && setOpenPopUp(true)
                                }}
                                sx={{
                                    cursor: "pointer",
                                    position: "relative",

                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "45px",
                                    paddingBottom: "32px"
                                }}
                            >
                                <Typography
                                    sx={{
                                        wordBreak: "keep-all",
                                        wordWrap: "break-word",
                                        fontSize: "35px",
                                        lineHeight: "52px",
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
                                            color: "#15803D  !important",
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
                ) : showSignature ? (
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#000000DE",
                                marginTop: "24px"
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
                                sx={{
                                    display: "flex",
                                    opacity: disabled ? 0 : 1,
                                    justifyContent: "flex-end"
                                }}
                            >
                                <svg
                                    onClick={() => {
                                        !disabled && handleReset()
                                    }}
                                    cursor="pointer"
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
                                onClick={() => {
                                    !disabled && setOpenPopUp(true)
                                }}
                                sx={{
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: "45px",
                                    mb: "32px",
                                    position: "relative"
                                }}
                            >
                                <Image
                                    height={63}
                                    width={150}
                                    alt="This is a signature image"
                                    src={signatureUrl}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Box
                                    className="f-f-i back-"
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
                                        color: "#15803D  !important",
                                       
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
                ) : (
                    ""
                )}
            </Box>
            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: { md: "31.5px", xs: "24px" } }}
            />
            <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                    flexDirection: {
                        lg: "row",
                        md: "column",
                        sm: "column",
                        xs: "column"
                    }
                    // paddingY: { md: "22px", xs: "23px" }
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
                                alignItems: "center",
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
                                ariaTag={"This is a back button"}
                                width={{
                                    xs: "100%",
                                    md: "auto"
                                }}
                            />
                            <CommonButton
                                className="next-button"
                                onclickHandler={handleClick}
                                disabled={
                                    (signatureUrl == null &&
                                        signatureText == null) ||
                                    disabled
                                }
                                content={"Confirm"}
                                ariaTag={"This is a confirm button"}
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
                                mt={{ xs: "8px", md: "0px" }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>{" "}
            <ConfirmationNotification
                open={loading}
                title={"Sign off - Menu Programming Complete"}
                close={() => handleClose()}
            />
            <SignaturePopup
                setShowSignatureText={setShowSignatureText}
                setShowSignature={setShowSignature}
                setSignatureUrl={setSignatureUrl}
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                storedata={storeData}
                setSignatureText={setSignatureText}
                signatureText={signatureText}
                signatureUrl={signatureUrl}
            />
        </Box>
    )
}
