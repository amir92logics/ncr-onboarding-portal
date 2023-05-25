import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
    Button,
    Divider,
    Skeleton,
    Tooltip,
    useMediaQuery
} from "@mui/material"
import DocumentsTable from "./DocumentTable"
import DocumentsTableMobile from "./DocumentTableMobile"
import { LayoutBase } from "../LayoutBase"
import Menu from "./Menu"
import RequiredDocs from "./RequiredDocument"
import CreditCard from "./CreditCard"
import DocumentUploadLoader from "./DocumentUploadLoader"
import Overview from "./Overview"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import WirelessSolution from "./WirelessSolution"
import theme from "../../src/theme"

export default function Docs({ type }) {
    const router = useRouter()
    const routerID = router.query.id
    const path = router.asPath
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const splitpath = path.split("/")
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [fetching] = useState(false)
    const [tableData, setTableData] = useState([])
    const [progress, setProgress] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [fileName, setFileName] = useState(null)
    const [notify, setNotify] = useState(false)
    useEffect(() => {
        let docs = sideBarData.find((it) => it.name === "Documents")
        setTableData(docs?.data)
    }, [sideBarData])
    const handleSubmit = () => {
        splitpath[2] == "credit-card"
            ? router.push({
                  pathname: `/documents/wireless-solution/${routerID}`
              })
            : splitpath[2] == "floor-plan"
            ? router.push({
                  pathname: `/documents/credit-card/${routerID}`
              })
            : splitpath[2] == "menu"
            ? router.push({
                  pathname: `/documents/floor-plan/${routerID}`
              })
            : splitpath[2] == "wireless-solution"
            ? router.push({
                  pathname: `/documents/${routerID}`
              })
            : router.push({
                  pathname: `/actions/${routerID}`
              })
    }
    const handleback = (e) => {
        if (e == "menu_upload_filename") {
            router.push({
                pathname: `/documents/${routerID}`
            })
        } else if (e == "floor_plan_upload_filename") {
            router.push({
                pathname: `/documents/menu/${routerID}`
            })
        } else if (e == "wireless_upload_filename") {
            router.push({
                pathname: `/documents/credit-card/${routerID}`
            })
        } else if (e == "credit_card_upload_filename") {
            router.push({
                pathname: `/documents/floor-plan/${routerID}`
            })
        }
    }
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    let signoff =
        tasks?.find((it) => it.task_name == "Project Sign Off")?.status ==
        "COMPLETED"

    const System = (e) => {
        let docs = tasks?.find(
            (it) => it.task_name == "Upload Required Documents"
        )
        let docscheck = docs?.json[e]
        return !docscheck
    }
    const renderDocument = () => {
        switch (type) {
            case "credit_card_upload_filename":
                return (
                    <LayoutBase
                        showPercentageProgress={false}
                        title={
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                position={"relative"}
                            >
                                <Typography
                                    className="f-f-f"
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        color: theme.palette.textColor.main
                                    }}
                                >
                                    Credit Card VAR{" "}
                                    {discoveryloading ? (
                                        <Skeleton
                                            component={"span"}
                                            variant="rectangular"
                                            width={60}
                                            sx={{ borderRadius: "8px", ml: 2 }}
                                            height={18}
                                        />
                                    ) : (
                                        <Box
                                            component={"span"}
                                            sx={{
                                                ml: 2,
                                                lineHeight: "22px",
                                                fontSize: "14px",
                                                fontWeight: 400
                                            }}
                                        >
                                            {System(
                                                "credit_card_upload_filename"
                                            )
                                                ? " (Optional)"
                                                : " (Required)"}
                                        </Box>
                                    )}
                                    <Tooltip
                                        aria-label=""
                                        title="This document is provided by your credit card processor. It contains all the necessary information required for your business to accept credit card payments. "
                                        placement={
                                            isMobile ? "bottom-start" : "right"
                                        }
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "end",
                                                    color: "#fff",
                                                    fontSize: "12px",
                                                    padding: "6px 12px",
                                                    fontWeight: 400,
                                                    lineHeight: "18px"
                                                }
                                            }
                                        }}
                                        enterTouchDelay={0}
                                        arrow={true}
                                    >
                                        <svg
                                            style={{
                                                marginBottom: 4,
                                                marginLeft: 8,
                                                cursor: "pointer"
                                            }}
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is credit card var tooltip
                                            </title>
                                            <path
                                                d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                fill="#757575"
                                            />
                                        </svg>
                                    </Tooltip>
                                </Typography>
                            </Box>
                        }
                    >
                        <CreditCard
                            setProgress={setProgress}
                            progress={progress}
                            fileName={fileName}
                            notify={notify}
                            setNotify={setNotify}
                            setFileName={setFileName}
                            uploading={uploading}
                            setUploading={setUploading}
                            disabled={signoff||discoveryloading}
                        />
                    </LayoutBase>
                )

            case "floor_plan_upload_filename":
                return (
                    <LayoutBase
                        showPercentageProgress={false}
                        title={
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="end"
                                position={"relative"}
                            >
                                <Typography
                                    className="f-f-f"
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        color: theme.palette.textColor.main
                                    }}
                                >
                                    Floor Plan{" "}
                                    {discoveryloading ? (
                                        <Skeleton
                                            component={"span"}
                                            variant="rectangular"
                                            width={60}
                                            sx={{ borderRadius: "8px", ml: 2 }}
                                            height={18}
                                        />
                                    ) : (
                                        <Box
                                            component={"span"}
                                            sx={{
                                                ml: 2,
                                                lineHeight: "22px",
                                                fontSize: "14px",
                                                fontWeight: 400
                                            }}
                                        >
                                            {System(
                                                "floor_plan_upload_filename"
                                            )
                                                ? " (Optional)"
                                                : " (Required)"}
                                        </Box>
                                    )}
                                    <Tooltip
                                        aria-label=""
                                        title="While Floor Plans are not necessary to use Aloha POS, but do make it much easier for staff to start and manage tables. Providing this information now will help our Software Configuration Partners program your floor plan layout to be ready on at installation time.
"
                                        placement={
                                            isMobile ? "bottom-start" : "right"
                                        }
                                        arrow={true}
                                        enterTouchDelay={0}
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    color: "#fff",
                                                    fontSize: "12px",
                                                    padding: "6px 12px",
                                                    fontWeight: 400,
                                                    lineHeight: "18px"
                                                }
                                            }
                                        }}
                                    >
                                        <svg
                                            style={{
                                                marginLeft: 8,
                                                marginBottom: 4,
                                                cursor: "pointer"
                                            }}
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is floor plan tooltip
                                            </title>
                                            <path
                                                d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                fill="#757575"
                                            />
                                        </svg>
                                    </Tooltip>
                                </Typography>
                            </Box>
                        }
                    >
                        <RequiredDocs
                            notify={notify}
                            setNotify={setNotify}
                            setProgress={setProgress}
                            progress={progress}
                            fileName={fileName}
                            setFileName={setFileName}
                            uploading={uploading}
                            setUploading={setUploading}
                            disabled={signoff||discoveryloading}
                        />
                    </LayoutBase>
                )

            case "menu_upload_filename":
                return (
                    <LayoutBase
                        showPercentageProgress={false}
                        title={
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                position={"relative"}
                            >
                                <Typography
                                    className="f-f-f"
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        color: theme.palette.textColor.main
                                    }}
                                >
                                    Menu{" "}
                                    {discoveryloading ? (
                                        <Skeleton
                                            component={"span"}
                                            variant="rectangular"
                                            width={60}
                                            sx={{ borderRadius: "8px", ml: 2 }}
                                            height={18}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                ml: 2,
                                                lineHeight: "22px",
                                                fontSize: "14px",
                                                fontWeight: 400
                                            }}
                                        >
                                            {System("menu_upload_filename")
                                                ? "(Optional)"
                                                : "(Required)"}
                                        </Box>
                                    )}
                                    <Tooltip
                                        aria-label=""
                                        title="Our build teams will use this date to build and configure your system. Once the menu build has been approved by you, you will be trained to make subsequent menu or database changes and will be responsible to do so moving forward"
                                        placement={
                                            isMobile ? "bottom-start" : "right"
                                        }
                                        arrow={true}
                                        enterTouchDelay={0}
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    color: "#fff",
                                                    fontSize: "12px",
                                                    padding: "6px 12px",
                                                    fontWeight: 400,
                                                    lineHeight: "18px"
                                                }
                                            }
                                        }}
                                    >
                                        <svg
                                            style={{
                                                marginLeft: 8,
                                                marginBottom: 4,
                                                cursor: "pointer"
                                            }}
                                            width={18}
                                            height={18}
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>This is Menu tooltip</title>
                                            <path
                                                d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                fill="#757575"
                                            />
                                        </svg>
                                    </Tooltip>
                                </Typography>
                            </Box>
                        }
                    >
                        {" "}
                        <Menu
                            notify={notify}
                            setNotify={setNotify}
                            setProgress={setProgress}
                            progress={progress}
                            fileName={fileName}
                            setFileName={setFileName}
                            uploading={uploading}
                            setUploading={setUploading}
                            disabled={signoff||discoveryloading}
                        />
                    </LayoutBase>
                )
            case "wireless_upload_filename":
                return (
                    <LayoutBase
                        showPercentageProgress={false}
                        title={
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{ mt: { lg: 0.3, xs: 0 } }}
                                position={"relative"}
                            >
                                <Typography
                                    className="f-f-f"
                                    sx={{
                                        color: theme.palette.textColor.main
                                    }}
                                >
                                    Wireless Solution -{"  "}
                                    <br className="documents-br" />
                                    Restaurant Blueprints {""}
                                    <Box
                                        component={"span"}
                                        sx={{
                                            lineHeight: "22px",
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            ml: { md: 2 },
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 2
                                        }}
                                    >
                                        {discoveryloading ? (
                                            <Skeleton
                                                component={"span"}
                                                variant="rectangular"
                                                width={60}
                                                sx={{ borderRadius: "8px" }}
                                                height={18}
                                            />
                                        ) : (
                                            <Box component={"span"}>
                                                {" "}
                                                {System(
                                                    "wireless_upload_filename"
                                                )
                                                    ? "(Optional)"
                                                    : "(Required)"}
                                            </Box>
                                        )}
                                        <Tooltip
                                            aria-label=""
                                            title="NCR will use the map you provide to conduct an on-site wireless survey which will help determine optimal placement of your wireless access points."
                                            placement={
                                                isMobile
                                                    ? "bottom-start"
                                                    : "right"
                                            }
                                            arrow={true}
                                            enterTouchDelay={0}
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        color: "#fff",
                                                        fontSize: "12px",
                                                        padding: "6px 12px",
                                                        fontWeight: 400,
                                                        lineHeight: "18px"
                                                    }
                                                }
                                            }}
                                        >
                                            <svg
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                                width={18}
                                                height={18}
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>
                                                    This is wireless solution -
                                                    restaurant blueprints
                                                    tooltip
                                                </title>
                                                <path
                                                    d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                    fill="#757575"
                                                />
                                            </svg>
                                        </Tooltip>
                                    </Box>
                                </Typography>
                            </Box>
                        }
                    >
                        {" "}
                        <WirelessSolution
                            notify={notify}
                            setNotify={setNotify}
                            setProgress={setProgress}
                            progress={progress}
                            fileName={fileName}
                            setFileName={setFileName}
                            uploading={uploading}
                            setUploading={setUploading}
                            disabled={signoff||discoveryloading}
                        />
                    </LayoutBase>
                )
            default:
                return (
                    <>
                        <LayoutBase
                            showPercentageProgress={false}
                            title={
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        className="f-f-f"
                                        sx={{
                                            color: theme.palette.textColor.main
                                        }}
                                    >
                                        Documents Overview
                                    </Typography>
                                </Box>
                            }
                        >
                            <Box></Box>

                            <Box
                                className="container-layout"
                                sx={{
                                    marginTop: {
                                        xs: "16px !important",
                                        lg: "16px !important",
                                        md: "15px !important"
                                    }
                                }}
                            >
                                <Overview
                                    disabled={signoff||discoveryloading}
                                    Page="document-overview"
                                />
                            </Box>
                        </LayoutBase>
                    </>
                )
        }
    }
    return fetching ? (
        <DocumentUploadLoader />
    ) : (
        <Box
            className="container-layout"
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: {
                    xs: "100%"
                }
            }}
        >
            <Box
                display="flex"
                alignItems="start"
                sx={{
                    width: {
                        xs: "100%"
                    }
                }}
            >
                <Box
                    display="flex-col"
                    alignItems="start"
                    flexWrap="wrap"
                    width="100%"
                    sx={{
                        width: {
                            xs: "100%"
                        }
                    }}
                >
                    {renderDocument()}

                    <Box
                        display={type == "overview" ? "none" : "flex"}
                        alignItems="flex-start"
                        flexDirection={"column"}
                        sx={{
                            maxWidth: {
                                lg: "100%",
                                xs: "100%"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                marginTop: { md: "32px", xs: "24px" },
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                paddingX: {
                                    xl: 0,
                                    lg: "32px",
                                    md: "24px",
                                    xs: "16px"
                                }
                            }}
                            className={`${
                                !path.includes("menu")
                                    ? "container-layout  document-table-layout"
                                    : "container-layout"
                            }`}
                        >
                            <Box
                                sx={{
                                    display: {
                                        md: "block",
                                        xs: "none"
                                    },
                                    width: {
                                        xs: "100%"
                                    }
                                }}
                            >
                                <DocumentsTable
                                    notify1={notify}
                                    setNotify1={setNotify}
                                    setProgress={setProgress}
                                    progress={progress}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                    uploading={uploading}
                                    setUploading={setUploading}
                                    signoff={signoff||discoveryloading}
                                    setTableData={setTableData}
                                    tableData={tableData}
                                    marginTop={false}
                                    type={type}
                                />
                            </Box>
                        </Box>

                        <Box
                            className="document-table-layout"
                            sx={{
                                display: {
                                    md: "none",
                                    sm: "block"
                                },
                                px: 4,
                                width: {
                                    xs: "100%"
                                }
                            }}
                        >
                            <DocumentsTableMobile
                                notify1={notify}
                                setNotify1={setNotify}
                                setProgress={setProgress}
                                progress={progress}
                                fileName={fileName}
                                setFileName={setFileName}
                                uploading={uploading}
                                setUploading={setUploading}
                                signoff={signoff||discoveryloading}
                                setTableData={setTableData}
                                tableData={tableData}
                                marginTop={false}
                                type={type}
                            />
                        </Box>
                    </Box>
                    <Box sx={{}}>
                        <Divider
                            className="divider-col"
                            sx={{
                                mt: { xs: 6, md: 8 },

                                mx: {
                                    md: "24px",
                                    xs: "16px",
                                    lg: "32px",
                                    xl: "0px"
                                }
                            }}
                        />

                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            sx={{
                                flexDirection: {
                                    md: "row",
                                    xs: "column"
                                },
                                mx: {
                                    md: "24px",
                                    xs: "16px",
                                    lg: "32px",
                                    xl: "0px"
                                },
                                paddingY: {
                                    xl:
                                        splitpath[2] == "wireless-solution"
                                            ? 6
                                            : 5.5,
                                    lg: 5.5,
                                    md: 6,
                                    xs: 5.5
                                }
                            }}
                        >
                            <Box>
                                {type != "overview" && (
                                    <Button
                                        role="button"
                                        className="back-button"
                                        aria-label="This is Back Button"
                                        type="submit"
                                        variant="outlined"
                                        onClick={() => handleback(type)}
                                        sx={{
                                            mb: {
                                                lg: 0,
                                                xs: "8px"
                                            },
                                            mt: {
                                                lg: 0,
                                                xs: "0px"
                                            },
                                            padding: "11px 19px",
                                            fontSize: "16px",

                                            lineHeight: "24px",
                                            marginRight: "8px",
                                            width: {
                                                md: "auto",
                                                xs: "100%"
                                            },
                                            fontWeight: 600,
                                            "&:focus": {
                                                boxShadow: "none !important"
                                            },
                                            "&:hover": {
                                                background:
                                                    "#F5F6FF !important",
                                                border: "1px solid #1D4ED8 !important "
                                            }
                                        }}
                                    >
                                        Back
                                    </Button>
                                )}
                            </Box>
                            <Box>
                                {type != "wireless_upload_filename" && (
                                    <Button
                                        disabled={discoveryloading}
                                        role="button"
                                        className="next-button"
                                        aria-label={
                                            type == "overview"
                                                ? "This is Submit Button"
                                                : "This is Next Button"
                                        }
                                        type="submit"
                                        variant="contained"
                                        onClick={() => handleSubmit()}
                                        sx={{
                                            textTransform: "none",
                                            padding: "12px 20px",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            width: {
                                                md: "auto",
                                                xs: "100%"
                                            },
                                            fontWeight: 600,
                                            "&:focus": {
                                                boxShadow: "none !important"
                                            }
                                        }}
                                    >
                                        {type == "overview" ? "Submit" : "Next"}
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
