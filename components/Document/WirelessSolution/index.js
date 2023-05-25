import React from "react"
import Typography from "@mui/material/Typography"
import DocumentUploader from "../Uploader"
import Box from "@mui/material/Box"
import DocumentLoader from "../../common/DocumentLoader"
import { Button } from "@mui/material"
import theme from "../../../src/theme"

export default function WirelessSolution({
    disabled,
    setProgress,
    progress,
    fileName,
    setFileName,
    uploading,
    notify,
    setNotify,
    setUploading
}) {
    const loading = false

    return (
        <Box
            className="Wireless-tab"
            flexDirection="column"
            alignItems="center"
            sx={{ width: "100%" }}
            display="flex"
            justifyContent="center"
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
                                <Box
                                    sx={{
                                        fontSize: { md: "14px", xs: "16px" },
                                        fontWeight: 400,
                                        lineHeight: "22px",
                                        color: theme.palette.textColor.main
                                    }}
                                >
                                    If implementing a wireless solution, NCR
                                    requires a map of your establishment that is
                                    drawn to scale where dimensions are clearly
                                    listed and proportional to the
                                    structure.&nbsp;The map should clearly
                                    display all areas of the establishment along
                                    with seating arrangements.
                                    <Box
                                        component={"br"}
                                        sx={{
                                            display: { xs: "block" }
                                        }}
                                    />
                                    <Box
                                        component={"br"}
                                        sx={{
                                            display: { xs: "block" }
                                        }}
                                    />
                                    <Box
                                        component={"span"}
                                        sx={{
                                            display: { xs: "block" }
                                        }}
                                    >
                                        NCR will use the map you provide to
                                        conduct an on-site wireless survey which
                                        will help determine optimal placement of
                                        your wireless access points.
                                        <br />
                                    </Box>
                                    <Box
                                        component={"br"}
                                        sx={{
                                            display: { xs: "block" }
                                        }}
                                    />
                                    <Box component={"span"} sx={{}}>
                                        For best results, please submit
                                        architectural blueprints or a map
                                        showing emergency evacuation routes. If
                                        you don’t have these, you can use
                                        SmartDraw to create a map:
                                        <br />
                                    </Box>
                                    {/* <a
                                        href="https://www.edrawsoft.com"
                                        target={"__blank"}
                                    >
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Box
                                                component={"span"}
                                                style={{
                                                    color: "#1D4ED8",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    lineHeight: "24px",
                                                    alignItems: "center",
                                                    textDecoration: "underline",
                                                    underlineColor: "#1D4ED8",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                SmartDraw
                                            </Box>
                                            <Box
                                                style={{
                                                    ml: "8px",
                                                    marginTop: "3px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <svg
                                                    width={12}
                                                    height={12}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.8333 13.8333H2.16667V2.16667H8V0.5H2.16667C1.24167 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V8H13.8333V13.8333ZM9.66667 0.5V2.16667H12.6583L4.46667 10.3583L5.64167 11.5333L13.8333 3.34167V6.33333H15.5V0.5H9.66667Z"
                                                        fill="#1D4ED8"
                                                    />
                                                </svg>
                                            </Box>
                                        </Box>
                                    </a> */}
                                    <Box
                                        component={"br"}
                                        sx={{
                                            display: { xs: "block" }
                                        }}
                                    />
                                    <Box component={"span"} sx={{}}>
                                        Please upload a copy of your blueprints
                                        or map(s).
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        marginTop: {
                                            lg: "24px",
                                            md: "23px",
                                            xs: "24px"
                                        },
                                        marginBottom: {
                                            lg: "0px",
                                            md: "32px",
                                            xs: "24px"
                                        }
                                    }}
                                >
                                    <Button
                                        aria-label="This is Wireless Solution Template Button"
                                        href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Sample_Blueprints.docx"
                                        // href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/AH_CreatingaWirelessHeatmapwithNetSpot%20-%20HKS200.pdf"
                                        target="_blank"
                                        sx={{
                                            width: { md: "auto", xs: "100%" },
                                            border: "1px solid #E0E0E0",
                                            borderRadius: "8px",
                                            py: {
                                                lg: "8px",
                                                md: "9px",
                                                xs: "9.2px"
                                            },
                                            px: {
                                                lg: "22px",
                                                md: "22px",
                                                xs: "25px"
                                            },
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: {
                                                lg: "flex-start",
                                                xs: "center"
                                            },
                                            columnGap: "9px",
                                            "&:hover": {
                                                bgcolor: "#F5F6FF ",
                                                border: "1px solid #1D4ED8 "
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                lineHeight: "22px",
                                                fontWeight: 600,
                                                textTransform: "none",
                                                color: theme.palette.primary
                                                    .main,
                                                cursor: "pointer",
                                                letterSpacing:
                                                    theme.letterSpacing.main
                                            }}
                                        >
                                            Click Here for Wireless Solution
                                            Template
                                        </Typography>

                                        <svg
                                            width={11.67}
                                            height={14.17}
                                            viewBox="0 0 14 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is wireless solution
                                                template download icon
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
                                uploadFor={"wireless_upload_filename"}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
