import React from "react"
import Typography from "@mui/material/Typography"
import DocumentUploader from "../Uploader"
import Box from "@mui/material/Box"
import DocumentLoader from "../../common/DocumentLoader"
import { Button, List, ListItem } from "@mui/material"
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
                                        lineHeight: { md: "22px", xs: "26px" },
                                        color: theme.palette.textColor.main
                                    }}
                                >
                                    Submitting a menu/menu files early in the
                                    implementation process is necessary to allow
                                    enough time to program, review, and make any
                                    necessary changes prior to your
                                    installation.
                                    <Box
                                        component={"br"}
                                        sx={{
                                            display: {
                                                lg: "block",
                                                xs: "block"
                                            }
                                        }}
                                    />
                                    <Box
                                        component={"br"}
                                        sx={{
                                            display: {
                                                lg: "block",
                                                xs: "block"
                                            }
                                        }}
                                    />
                                    <Box
                                        component={"span"}
                                        sx={{
                                            display: {
                                                lg: "block",
                                                xs: "block"
                                            }
                                        }}
                                    >
                                        Please submit all menus and pricing,
                                        including but not limited to: <br />
                                    </Box>
                                    <List
                                        disablePadding
                                        sx={{
                                            listStyleType: "disc",
                                            "& .MuiListItem-root": {
                                                display: "list-item"
                                            },
                                            paddingLeft: {
                                                md: "21.6px",
                                                xs: "23.6px"
                                            },
                                            paddingTop: {
                                                md: "21px",
                                                xs: "20px"
                                            },
                                            marginBottom: "0px"
                                        }}
                                    >
                                        <ListItem disablePadding>
                                            Food (Breakfast, Brunch, Lunch,
                                            Dinner, Late Night)
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Kids Menus
                                        </ListItem>
                                        <ListItem disablePadding>
                                            To-Go & Delivery Menus
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Happy Hour Menus
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Catering & Event Menus
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Non-Alcoholic Beverages
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Liquor/Beer/Wine -Mixed Drinks (e.g.
                                            Martinis)
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Specialty Cocktails & Drinks
                                        </ListItem>
                                        <ListItem disablePadding>
                                            Retail Items
                                        </ListItem>
                                    </List>{" "}
                                    <br />
                                    <Typography
                                        sx={{
                                            letterSpacing:
                                                theme.letterSpacing.main,
                                            fontWeight: "600",
                                            fontSize: {
                                                md: "14px",
                                                xs: "16px"
                                            },
                                            lineHeight: "22px"
                                        }}
                                    >
                                        Please be advised the project cannot
                                        move forward until this information is
                                        received.
                                    </Typography>{" "}
                                    <br />
                                    Please upload a copy of your Menu(s).
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
                                        aria-label="This is Menu Template Button"
                                        href="https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Menu.zip"
                                        target={"_blank"}
                                        sx={{
                                            width: { md: "auto", xs: "100%" },
                                            border: "1px solid ",
                                            borderColor: "#E0E0E0",
                                            borderRadius: "8px",
                                            py: "9px",
                                            pl: {
                                                md: "17px",
                                                xs: "32px"
                                            },
                                            pr: {
                                                md: "23px",
                                                xs: "39px"
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
                                            Click Here for Menu Template
                                        </Typography>

                                        <svg
                                            width={11.67}
                                            height={14.17}
                                            viewBox="0 0 14 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is Menu Template download
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
                                uploadFor={"menu_upload_filename"}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
