import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Button, Divider, FormControlLabel, TextField } from "@mui/material"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import SignaturePopup from "./SignaturePopup"
import Stack from "@mui/material/Stack"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { useRouter } from "next/router"
import theme from "../../src/theme"

export default function CustomerReqofSystemDelCom() {
    const [openPopUp, setOpenPopUp] = useState(false)
    const [signatureUrl, setSignatureUrl] = useState(null)
    const [signatureText, setSignatureText] = useState(null)
    const [showSignature, setShowSignature] = useState(false)
    const [showSignatureText, setShowSignatureText] = useState(false)
    const [date, setDate] = useState(null)
    const [acknowledgement, setAcknowledgement] = useState(false)
    const router = useRouter()
    const routerID = router.query.id
    useEffect(() => {
        if (signatureUrl !== null) {
            setShowSignature(true)
            setShowSignatureText(false)
        } else if (signatureText !== null) {
            setShowSignatureText(true)
            setShowSignature(false)
        }
    }, [signatureUrl, signatureText])
    const handleReset = () => {
        setSignatureUrl(null)
        setSignatureText(null)
        setShowSignature(false)
        setShowSignatureText(false)
    }

    const handleDateChange = (newValue) => {
        setDate(newValue)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    const handleCheckValidation = () => {
        if (
            acknowledgement &&
            date !== null &&
            (signatureUrl !== null || signatureText !== null)
        ) {
            return true
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
        >
            <form
                aria-label={`This is Confirm installation date form`}
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <Box>
                    <Typography
                        className="f-f-i"
                        sx={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#1E1E1E"
                        }}
                    >
                        We will commit to delivering your system on the date
                        that you request as long as all infrastructure
                        prerequisites have been completed.
                    </Typography>
                    <Typography
                        className="f-f-i"
                        sx={{
                            fontWeight: 400,
                            paddingTop: "24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#1E1E1E"
                        }}
                    >
                        We provided a 14-day grace period before the requested
                        date to change the scheduled system delivery and
                        installation. This date can be rescheduled at any time
                        before the 14-day deadline.
                    </Typography>

                    <Typography
                        className="f-f-i"
                        sx={{
                            fontWeight: 400,
                            paddingTop: "24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#1E1E1E"
                        }}
                    >
                        If we do not receive a new requested date before this
                        date or are unable to install the system on the
                        requested date for any reason, the system will be
                        delivered and full payment will be due at the time of
                        delivery.
                    </Typography>

                    <Typography
                        className="f-f-i"
                        sx={{
                            fontWeight: 400,
                            fontSize: "16px",
                            paddingTop: "24px",
                            lineHeight: "24px",
                            color: "#1E1E1E"
                        }}
                    >
                        NCR cannot be held responsible for construction delays
                        or other logistical issues beyond our control once you
                        have requested a date.
                    </Typography>
                    <Typography
                        className="f-f-i"
                        sx={{
                            fontWeight: 400,
                            fontSize: "16px",
                            paddingTop: "24px",
                            lineHeight: "24px",
                            color: "#1E1E1E"
                        }}
                    >
                        As an authorized representative, I request the equipment
                        to be delivered by:
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        marginTop: "32px",
                        alignItems: { md: "center" }
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            paddingRight: "16px",
                            fontSize: "18px",
                            lineHeight: "28px",
                            color: "#000000DE",
                            marginBottom: {
                                lg: "0px",
                                md: "3px",
                                sm: "16px",
                                xs: "16px"
                            }
                        }}
                    >
                        Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "8px"
                            }}
                            spacing={3}
                        >
                            <DesktopDatePicker
                                label="Select Date"
                                inputFormat="MM-DD-YYYY"
                                value={date}
                                disablePast={true}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        aria-label="Select Date"
                                        {...params}
                                        variant="standard"
                                        required
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: theme.palette.primary
                                                    .main
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "&.Mui-focused fieldset": {
                                                    borderColor:
                                                        theme.palette.primary
                                                            .main
                                                }
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Box>
                <Typography
                    className="f-f-i"
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        paddingTop: "24px",
                        lineHeight: "24px",
                        color: "#1E1E1E",
                        marginBottom: "32px"
                    }}
                >
                    If my installation needs to be rescheduled, I acknowledge
                    and agree to provide full payment upon receiving the
                    hardware. I agree to pay any additional travel charges or
                    rescheduling feeds that are associated with return trips to
                    finalize the installation.
                </Typography>
                <Box>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            sx={{
                                width: { md: "max-content", xs: "100%" },
                                marginBottom: { xs: "12px", md: "0px" }
                            }}
                            value="I have read and agreed to the installation date above."
                            control={
                                <Radio
                                    sx={{
                                        "&.Mui-checked": {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                />
                            }
                            onChange={(e) => {
                                setAcknowledgement(e.target.checked)
                            }}
                            label="I have read and agreed to the installation date above."
                            aria-label="I have read and agreed to the installation date above."
                        />
                        <FormControlLabel
                            sx={{ width: { md: "max-content", xs: "100%" } }}
                            value="I would like to discuss another date with someone at NCR"
                            control={
                                <Radio
                                    sx={{
                                        "&.Mui-checked": {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                />
                            }
                            label="I would like to discuss another date with someone at NCR"
                            aria-label="I would like to discuss another date with someone at NCR"
                        />
                    </RadioGroup>
                </Box>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: "28px",
                        color: "#1E1E1E",
                        marginTop: "32px"
                    }}
                >
                    Please Insert your Signature:
                </Typography>
                <Box sx={{ width: { xs: "auto" } }}>
                    <Button
                        onClick={() => setOpenPopUp(true)}
                        aria-label="This is a sign it button"
                        sx={{
                            width: { xs: "auto" },
                            marginTop: "16px",
                            border: " 2px dashed #BDBDBD",
                            padding: "12px 24px",
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
                            color: `${theme.palette.primary.main} !important`,
                            "&:hover": {
                                color: theme.palette.primary.main,
                                border: `2px dashed ${theme.palette.primary.main}`,
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
                            <g clipPath="url(#clip0_46_59062)">
                                <path
                                    d="M3 17C6.333 13.667 8 11 8 9C8 6 7 6 6 6C5 6 3.968 7.085 4 9C4.034 11.048 5.658 13.877 6.5 15C8 17 9 17.5 10 16L12 13C12.333 15.667 13.333 17 15 17C15.53 17 17.639 15 18 15C18.517 15 19.517 15.667 21 17"
                                    stroke="#1D4ED8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_46_59062">
                                    <rect width={24} height={24} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Sign it
                    </Button>
                </Box>
                {showSignatureText ? (
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#000000DE",
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
                                    handleReset()
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
                                        <path
                                            d="M8.9974 0.666992C4.3974 0.666992 0.664062 4.40033 0.664062 9.00033C0.664062 13.6003 4.3974 17.3337 8.9974 17.3337C13.5974 17.3337 17.3307 13.6003 17.3307 9.00033C17.3307 4.40033 13.5974 0.666992 8.9974 0.666992ZM8.9974 15.667C5.3224 15.667 2.33073 12.6753 2.33073 9.00033C2.33073 5.32533 5.3224 2.33366 8.9974 2.33366C12.6724 2.33366 15.6641 5.32533 15.6641 9.00033C15.6641 12.6753 12.6724 15.667 8.9974 15.667ZM12.8224 5.31699L7.33073 10.8087L5.1724 8.65866L3.9974 9.83366L7.33073 13.167L13.9974 6.50033L12.8224 5.31699Z"
                                            fill="#15803D "
                                        />
                                    </svg>
                                    Saved
                                </Box>
                            </Box>
                            .
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
                                    handleReset()
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
                                    height: "63px"
                                }}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                        height: "auto",
                                        width: "100%"
                                    }}
                                    alt="This is a signature image"
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
                                        color: "#15803D !important",
                                       
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
                <Divider
                    aria-label="divider"
                    className="divider-col"
                    style={{ width: "100%", marginTop: "32px" }}
                />
                <Box
                    paddingY={"24px"}
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
                                sm: "column-reverse",
                                xs: "column-reverse"
                            }
                        }}
                    >
                        <Button
                            className="back-button"
                            variant="outlined"
                            aria-label="This is a back button"
                            sx={{
                                marginTop: { xs: "8px", sm: "8px", md: "0px" },
                                marginRight: { md: "16px" },
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
                                color: "#5C5C5C"
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            className="next-button"
                            type="submit"
                            disabled={!handleCheckValidation()}
                            role="button"
                            aria-label="This is next step button"
                            variant="contained"
                            sx={{
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
                            Next Step
                        </Button>
                    </Box>
                </Box>{" "}
            </form>

            <SignaturePopup
                setSignatureUrl={setSignatureUrl}
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                setSignatureText={setSignatureText}
            />
        </Box>
    )
}
