import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import DocumentUploader from "../Uploader"
import DocumentLoader from "../../common/DocumentLoader"
import { Button } from "@mui/material"
import theme from "../../../src/theme"
export default function RequiredDocuments({
    disabled,
    setProgress,
    progress,
    fileName,
    notify,
    setNotify,
    setFileName,
    uploading,
    setUploading
}) {
    const loading = false
    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            sx={{ width: "100%" }}
        >
            <Box
                sx={{
                    width: {
                        xs: "100%"
                    }
                }}
            >
                <Box className="flex-responsive">
                    {loading ? (
                        <DocumentLoader />
                    ) : (
                        <>
                            <Box className="">
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 400,
                                        lineHeight: "22px",
                                        color: theme.palette.textColor.main
                                    }}
                                    variant="body1"
                                >
                                    A Credit Card VAR sheet is the document that
                                    holds all the data to program your system to
                                    be able to accept payments and route those
                                    payments to your bank account. This can be
                                    obtained from your Credit Card Processor.
                                    <br />
                                    <br />
                                    Please work with your Credit Card Processor
                                    and submit this document as soon as it has
                                    been received. It is integral that this is
                                    submitted at least 2 weeks prior to
                                    installation to allow enough time for
                                    testing to ensure that your revenue reaches
                                    your bank account.
                                    <br />
                                    <br />
                                    Please upload a copy of your Credit Card VAR
                                    Sheet.
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        marginTop: {
                                            lg: "24px",
                                            md: "22px",
                                            xs: "22px"
                                        },
                                        marginBottom: {
                                            lg: "0px",
                                            md: "32px",
                                            xs: "22px"
                                        }
                                    }}
                                >
                                    <Button
                                       aria-label="This is VAR SHEET Example button" 
                                        href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Credit%20Card%20VAR.png"
                                        target={"_blank"}
                                        sx={{
                                            width: { md: "auto", xs: "100%" },
                                            border: "1px solid ",
                                            borderColor: "#E0E0E0",
                                            borderRadius: "8px",
                                            padding: {
                                                md: "9px 18px",
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
                                                fontSize: "14px",
                                                lineHeight: "22px",
                                                fontWeight: 600,
                                                textTransform: "none",

                                                color: theme.palette.primary
                                                    .main,
                                                cursor: "pointer"
                                            }}
                                        >
                                            Click Here for VAR SHEET Example
                                        </Typography>

                                        <svg
                                            width={11.67}
                                            height={14.17}
                                            viewBox="0 0 14 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                             <title>
                                                This is VAR SHEET download
                                                icon
                                            </title>
                                            <path
                                                d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z"
                                                fill={
                                                    theme.palette.primary.main
                                                }
                                            />
                                        </svg>
                                    </Button>
                                </Box>
                            </Box>
                            <DocumentUploader
                                notify={notify}
                                setNotify={setNotify}
                                setProgress={setProgress}
                                progress={progress}
                                fileName={fileName}
                                setFileName={setFileName}
                                uploading={uploading}
                                setUploading={setUploading}
                                disabled={disabled}
                                uploadFor={"credit_card_upload_filename"}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
