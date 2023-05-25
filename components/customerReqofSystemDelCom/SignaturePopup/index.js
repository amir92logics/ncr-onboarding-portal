import React, { useState, useRef } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Dialog,
    DialogContent,
    Divider,
    Typography
} from "@mui/material"
import SignatureCanvas from "react-signature-canvas"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import TextToImageSignature from "../TextToImageSignature"
import theme from "../../../src/theme"

export default function SignaturePopup({
    openPopUp,
    setOpenPopUp,
    setSignatureUrl,
    setShowSignature,
    setSignatureText,
    setShowSignatureText,
    disabled,
    storedata,
    signatureText,
    signatureUrl
}) {
    const [success, setSuccess] = useState(false)
    const handleClose = () => {
        setOpenPopUp(false)
        setSuccess(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setShowSignature(true)
        setSignatureUrl(sigPad.getTrimmedCanvas().toDataURL("image/png"))
        setSuccess(false)
        setShowSignatureText(false)
        setSignatureText(null)
        setDisable(true)
        storedata(
            sigPad.getTrimmedCanvas().toDataURL("image/png"),
            signatureText
        )
    }
    const [value, setValue] = useState("1")
    const [disable, setDisable] = useState(true)

    const handleTabChange = (newValue) => {
        setValue(newValue)
    }
    let sigPad = useRef({})
    const handleClearSignature = () => {
        sigPad.clear()
        setDisable(true)
        setSuccess(false)
    }
    const handleTrim = () => {
        if (!sigPad.isEmpty()) {
            setSuccess(true)
            setDisable(false)
        }
    }
    return (
        <Box className="signature-popup-container">
            <Dialog
                className="signature-popup"
                open={openPopUp}
                onClose={handleClose}
                sx={{
                    "& div[role='dialog']": {
                        borderTopRightRadius: { md: 0, xs: "4px !important" },
                        borderTopLeftRadius: { md: 0, xs: "4px !important" },
                        borderBottomRightRadius: {
                            md: 0,
                            xs: "0px !important"
                        },
                        borderBottomLeftRadius: { md: 0, xs: "0px !important" },
                        borderRadius: { md: "4px !important" }
                    }
                }}
            >
                <DialogContent
                    sx={{
                        padding: { md: "32px!important", xs: "24px !important" }
                    }}
                >
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        right: 15,
                                        top: 10
                                    }}
                                >
                                    <svg
                                        onClick={() => handleClose()}
                                        cursor="pointer"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is close popup icon</title>
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                                <TabList
                                    className="signature-tabs"
                                    onChange={() => handleTabChange(value)}
                                    aria-label="This is a tab list"
                                    sx={{
                                        "& .MuiTabs-indicator": {
                                            backgroundColor: "#1D4ED8"
                                        },
                                        "& .MuiTab-root.Mui-selected": {
                                            color: "#1D4ED8"
                                        }
                                    }}
                                >
                                    <Tab
                                        sx={{
                                            fontSize: theme.fontsize.sm,
                                            textTransform: "initial",
                                            fontWeight: "600",
                                            lineHeight: "22px"
                                        }}
                                        aria-label="This is write tab"
                                        label="Write"
                                        value="1"
                                        onClick={() => setValue("1")}
                                    />
                                    <Tab
                                        sx={{
                                            fontSize: theme.fontsize.sm,
                                            textTransform: "initial",
                                            fontWeight: "600",
                                            lineHeight: "22px"
                                        }}
                                        label="Draw"
                                        value="2"
                                        onClick={() => setValue("2")}
                                    />
                                </TabList>
                            </Box>

                            <TabPanel sx={{ padding: "unset" }} value="1">
                                <TextToImageSignature
                                    setShowSignatureText={setShowSignatureText}
                                    setOpenPopUp={setOpenPopUp}
                                    setSignatureText={setSignatureText}
                                    setSignatureUrl={setSignatureUrl}
                                    disabled={disabled}
                                    signatureText={signatureText}
                                    storedata={storedata}
                                />
                            </TabPanel>

                            <TabPanel sx={{ padding: "unset" }} value="2">
                                <form aria-label={`This is signature form`} onSubmit={(e) => handleSubmit(e)}>
                                    <Box sx={{ width: { xs: "100%" } }}>
                                        <Box>
                                            <Typography
                                            
                                                variant="body1"
                                                className="f-f-i"
                                                sx={{
                                                    marginTop: "16px",
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    lineHeight: "24px"
                                                }}
                                            >
                                                Selected Signature
                                            </Typography>
                                        </Box>

                                        <Box
                                        
                                            sx={{
                                                width: "100%",
                                                position: "relative",
                                                marginTop: "16px",
                                                borderRadius: "8px",
                                                p: 1,
                                                border: "1px solid rgba(0, 0, 0, 0.12)"
                                            }}
                                        >
                                            <Box
                                             aria-label="This is a signature canvas for drawing signature"
                                            sx={{ width: "100%" }} >
                                                <SignatureCanvas
                                                
                                                    penColor="black"
                                                    ref={(ref) => {
                                                        sigPad = ref
                                                    }}
                                                    canvasProps={{
                                                        className: "sigCanvas"
                                                    }}
                                                />
                                            </Box>
                                            <svg
                                                onClick={() => {
                                                    handleClearSignature()
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    right: "16px",
                                                    top: "16px",
                                                    cursor: "pointer"
                                                }}
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>This is clear signature icon</title>
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
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                mt: "16px"
                                            }}
                                        >
                                            {!success ? (
                                                <Box
                                                    onClick={() => {
                                                        handleTrim()
                                                    }}
                                                    className="f-f-i back-button"
                                                    sx={{
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        background:
                                                            "#fff !important",
                                                        padding: "8px 16px",
                                                        color: theme.palette
                                                            .primary.main,
                                                        fontSize: "14px",
                                                        lineHeight: "20px",
                                                        fontWeight: "500",
                                                        "&:hover": {
                                                            background:
                                                                "#F5F6FF !important",
                                                            border: "1px solid #1D4ED8 !important "
                                                        }
                                                    }}
                                                >
                                                    Save Signature
                                                </Box>
                                            ) : (
                                                <Box
                                                    className="f-f-i back-button"
                                                    sx={{
                                                        borderRadius: "6px",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        background:
                                                            "#fff !important",
                                                        padding: "8px 16px",
                                                        color: "#15803D  !important",
                                                        fontSize: "14px",
                                                        lineHeight: "20px",
                                                        fontWeight: "500",
                                                        "&:hover": {
                                                            color: "#15803D  !important",
                                                        }
                                                       
                                                    }}
                                                >
                                                    <svg
                                                        style={{
                                                            marginRight: "8px"
                                                        }}
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
                                            )}
                                        </Box>
                                        <Divider
                                        aria-label="This is a divider"
                                            className="divider-col"
                                            sx={{ marginTop: "32px" }}
                                        />
                                        <Box sx={{ paddingTop: "24px" }}>
                                            <Box
                                                display="flex"
                                                justifyContent={"flex-end"}
                                                className="upload-popup-btns"
                                                sx={{
                                                    display: "flex",
                                                    width: "100%",
                                                    marginTop: 0,
                                                    flexDirection: {
                                                        md: "row",
                                                        xs: "column"
                                                    }
                                                }}
                                            >
                                                <Button
                                                
                                                    sx={{
                                                        fontSize: {
                                                            md: "16px",
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            md: "24px",
                                                            xs: "18px"
                                                        },
                                                        p: "12px",
                                                        textTransform: "none",

                                                        fontWeight: 600,

                                                        borderRadius: "8px",
                                                        color: `${theme.palette.primary.main} !important`,
                                                        "&:hover": {
                                                            background:
                                                                "#F5F6FF !important"
                                                        }
                                                    }}
                                                    aria-label="This is a cancel button"
                                                    onClick={() =>
                                                        handleClose()
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    className="next-button"
                                                    onClick={() => {
                                                        setOpenPopUp(false)
                                                    }}
                                                    type={"submit"}
                                                    variant="contained"
                                                    sx={{
                                                        marginTop: {
                                                            xs: "8px",
                                                            md: "0px"
                                                        },
                                                        fontSize: {
                                                            md: "16px",
                                                            xs: "14px"
                                                        },
                                                        px: "20px",

                                                        lineHeight: {
                                                            md: "24px",
                                                            xs: "18px"
                                                        },
                                                        fontWeight: 600,
                                                        paddingTop: "12px",
                                                        paddingBottom: "12px",
                                                        marginLeft: {
                                                            xs: "0px",
                                                            md: "8px"
                                                        },
                                                        borderRadius: "8px",
                                                        background: "#1B76D4",
                                                        transition:
                                                            "ease-in-out",
                                                        timeout: 1000
                                                    }}
                                                    aria-label="This is a confirm signature button"
                                                    disabled={disable}
                                                >
                                                    Confirm Signature
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </form>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
