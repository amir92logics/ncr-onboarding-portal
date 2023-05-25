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
    setFileName,
    uploading,
    setUploading,
    notify,
    setNotify
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
                                    The Table Service POS system uses hard-coded
                                    screens for most areas of the order entry
                                    screen; however, you can make certain
                                    enhancements to the order entry screen. The
                                    Floor Plan feature replaces the Working with
                                    Tables screen as the default screen used to
                                    start a new order. With a little creativity
                                    and Panel Editor tools, you can create a
                                    functional floor plan that represents the
                                    layout of your restaurant. <br />
                                    <br />
                                    If you would like to utilize this feature,
                                    please provide a detailed diagram of the
                                    layout of your restaurant with tables, table
                                    numbers and table shapes. This will be used
                                    as both a visual display of the tables in
                                    your restaurant and a convenient way to
                                    start a new check. The “Floor Plan”
                                    interface allows staff to open checks with
                                    the touch of a button.
                                    <br />
                                    <br />
                                    If you need a template you can download one
                                    below.
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        marginTop: {
                                            lg: "24px",
                                            md: "22px",
                                            xs: "21px"
                                        },
                                        marginBottom: {
                                            lg: "0px",
                                            md: "32px",
                                            xs: "24px"
                                        }
                                    }}
                                >
                                    <Button
                                        aria-label="This is Example Seating Chart Button"
                                        href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Floor%20Plan.png"
                                        target={"_blank"}
                                        sx={{
                                            width: { md: "auto", xs: "100%" },
                                            border: "1px solid ",
                                            borderColor: "#E0E0E0",
                                            borderRadius: "8px",
                                            padding: {
                                                md: "9px 21px 8px 18px",
                                                xs: "9px 39px 9px 32px"
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
                                            Example Seating Chart
                                        </Typography>

                                        <svg
                                            width={11.67}
                                            height={14.17}
                                            viewBox="0 0 14 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is Example Seating Chart
                                                download icon
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
                                name={"floor-plan"}
                                disabled={disabled}
                                uploadFor={"floor_plan_upload_filename"}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
