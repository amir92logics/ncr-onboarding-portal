import React, { useState } from "react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import {
    Box,
    Typography,
    TableCell,
    TableRow,
    Button,
    Collapse,
    IconButton,
    Popover,
    Tooltip
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MenuItem from "@mui/material/MenuItem"
import { Swiper, SwiperSlide } from "swiper/react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import moment from "moment"
import "swiper/css/scrollbar"
import { Navigation, Scrollbar } from "swiper"
import { OverViewStatusChip } from "../common/CustomStatusChip"
import { StatusBoxTableSlider } from "../HomePage/StatusBoxTableSlider"
import theme from "../../src/theme"
import ProjectResetPopup from "../ProjectResetPopup"
import { useRouter } from "next/router"
import { ProjectOverAllProgress } from "../LayoutBase/ProjectOverAllProgress"
import { setCurrentproject, setProjectType } from "../../redux-setup/dataSlice"
import { useDispatch } from "react-redux"
import { unixDateConverter } from "../../helper/Constraints"
function ColorlibStepIcon(status) {
    return (
        <>
            {status.toString().toLowerCase() === "completed" && (
                <svg
                    width={70}
                    height={40}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is completed icon</title>
                    <g clipPath="url(#clip0_5772_102803)">
                        <circle
                            cx={35}
                            cy={20}
                            r={12}
                            fill={theme.palette.primary.main}
                        />
                        <path
                            d="M32.4982 23.4749L29.0232 19.9999L27.8398 21.1749L32.4982 25.8332L42.4982 15.8332L41.3232 14.6582L32.4982 23.4749Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath>
                            <rect
                                width={24}
                                height={24}
                                fill="white"
                                transform="translate(23 8)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}
            {status.toString().toLowerCase() === "confirmed" && (
                <svg
                    width={70}
                    height={40}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is confirmed icon</title>
                    <g clipPath="url(#clip0_5772_102803)">
                        <circle
                            cx={35}
                            cy={20}
                            r={12}
                            fill={theme.palette.primary.main}
                        />
                        <path
                            d="M32.4982 23.4749L29.0232 19.9999L27.8398 21.1749L32.4982 25.8332L42.4982 15.8332L41.3232 14.6582L32.4982 23.4749Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath>
                            <rect
                                width={24}
                                height={24}
                                fill="white"
                                transform="translate(23 8)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}
            {status.toString().toLowerCase() === "overdue" && (
                <svg
                    width={71}
                    height={40}
                    viewBox="0 0 71 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is overdue icon</title>
                    <g clipPath="url(#clip0_5772_102806)">
                        <circle cx="35.332" cy={20} r={12} fill="#B3B3B5" />
                        <path
                            d="M32.8302 23.4749L29.3552 19.9999L28.1719 21.1749L32.8302 25.8332L42.8302 15.8332L41.6552 14.6582L32.8302 23.4749Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath>
                            <rect
                                width={24}
                                height={24}
                                fill="white"
                                transform="translate(23.332 8)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}

            {status.toString().toLowerCase() === "not started" && (
                <Box
                    width={70}
                    height={40}
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <svg
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is not started icon</title>
                        <circle
                            cx="12.668"
                            cy={12}
                            r={11}
                            stroke="#B3B3B5"
                            strokeWidth={2}
                        />
                    </svg>
                </Box>
            )}
            {status.toString().toLowerCase() === "in progress" && (
                <Box
                    width={70}
                    height={40}
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <svg
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is In Progress icon</title>
                        <circle
                            cx="12.668"
                            cy={12}
                            r={11}
                            stroke="#B3B3B5"
                            strokeWidth={2}
                        />
                    </svg>
                </Box>
            )}
            {status.toString().toLowerCase() === "warning" && (
                <svg
                    width={71}
                    height={40}
                    viewBox="0 0 71 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is warning icon</title>
                    <g clipPath="url(#clip0_5772_102806)">
                        <circle cx="35.332" cy={20} r={12} fill="#B3B3B5" />
                        <path
                            d="M32.8302 23.4749L29.3552 19.9999L28.1719 21.1749L32.8302 25.8332L42.8302 15.8332L41.6552 14.6582L32.8302 23.4749Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath>
                            <rect
                                width={24}
                                height={24}
                                fill="white"
                                transform="translate(23.332 8)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}
            {status.toString().toLowerCase() === "pending approval" && (
                <Box
                    width={70}
                    height={40}
                    sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <svg
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is pending approval icon</title>
                        <circle
                            cx="12.668"
                            cy={12}
                            r={11}
                            stroke="#B3B3B5"
                            strokeWidth={2}
                        />
                    </svg>
                </Box>
            )}
        </>
    )
}
function Index({
    row,
    rowIndex,
    setToggleIndex1,
    toggleIndex1,
    pid,
    width,
    last
}) {
    const router = useRouter()
    const path = router.pathname
    const [resetProjectPopUp, setResetProjectPopUp] = useState(false)
    const [anchorEl, setAnchorEl] = useState(false)
    const dispatch = useDispatch()
    const [swiperIndex, setSwiperIndex] = useState()
    const [end, setEnd] = useState(false)
    const [showResetDropDown, setShowResetDropDown] = useState(true)
    const openResetMenu = anchorEl
    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined
    const TruncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ".."
        } else {
            return str
        }
    }
    const handleActionRedirect = (id) => {
        return `/actions/${id}`
    }
    const showtoggle = () => {
        if (toggleIndex1 != rowIndex) {
            setToggleIndex1(rowIndex)
        } else {
            setToggleIndex1(-1)
        }
    }
    const handleClose = () => {
        setShowResetDropDown(false)
        setAnchorEl(null)
    }
    const handleClick = (event) => {
        if (process.env.NEXT_PUBLIC_APP_ENV == "development") {
            setAnchorEl(event.currentTarget)
            setShowResetDropDown(true)
        }
    }
    const selectProject = (proj) => {
        dispatch(setCurrentproject(proj))
        dispatch(
            setProjectType(
                !(
                    proj?.project_template == "New Aloha Essentials Install" ||
                    proj?.project_template == "New Install"
                )
            )
        )
        router.push({
            pathname: handleActionRedirect(row.record_id_quickbase)
        })
    }
    return (
        <React.Fragment>
            <TableRow
                key={rowIndex}
                sx={{
                    height: "70px",
                    "&:last-child tr": { boxShadow: "unset" },
                    color: theme.palette.textColor.main,
                    borderTop: "1px solid transparent",
                    borderBottom: "1.2px solid transparent",
                    borderLeft:
                        (pid && "2px solid #1D4ED8") || toggleIndex1 == rowIndex
                            ? "2px solid #1D4ED8"
                            : "2px solid transparent"
                }}
            >
                <TableCell
                    onClick={() => {
                        path == "/" && selectProject(row)
                    }}
                    sx={{
                        width: "264.64px",
                        paddingLeft: {
                            xxl: "14px",
                            lg: "14px"
                        },
                        paddingY: "11px",
                        borderBottom: "unset",
                        cursor: path == "/" && "pointer"
                    }}
                >
                    <Box
                        onClick={() => {
                            selectProject(row)
                        }}
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "flex-start"
                        }}
                    >
                        <Tooltip
                            aria-label=""
                            title={row?.customer_name}
                            placement="right"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        display:
                                            (row?.customer_name &&
                                                row?.customer_name?.length <
                                                    2) ||
                                            row?.customer_name?.length < 31
                                                ? "none"
                                                : "flex",
                                        alignItems: "end",

                                        color: "#fff",
                                        fontSize: "12px",
                                        padding: "6px 12px",
                                        fontWeight: 400,
                                        lineHeight: "18px"
                                    }
                                }
                            }}
                            arrow={true}
                        >
                            <Typography
                                aria-label={row?.customer_name}
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#1E1E1E",
                                    "&:hover": {
                                        color: "#1e1e1e !important"
                                    }
                                }}
                            >
                                {TruncateString(row.customer_name, 27)}
                            </Typography>
                        </Tooltip>
                    </Box>

                    <Box
                        sx={{
                            boxSizing: "border-box",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "flex-start"
                        }}
                    >
                        <Tooltip
                            aria-label=""
                            title={row?.install_address}
                            placement="right"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        display:
                                            row?.install_address?.length < 5 ||
                                            row?.install_address?.length < 21
                                                ? "none"
                                                : "flex",
                                        alignItems: "end",

                                        color: "#fff",
                                        fontSize: "12px",
                                        padding: "6px 12px",
                                        fontWeight: 400,
                                        lineHeight: "18px"
                                    }
                                }
                            }}
                            arrow={true}
                        >
                            <Typography
                                aria-label={row?.install_address_city}
                                sx={{
                                    lineHeight: "18px",
                                    mt: "3px",
                                    letterSpacing: "-0.05%",
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#1e1e1e"
                                }}
                            >
                                {TruncateString(row.install_address_city, 32)}
                                {row.install_address_city === null
                                    ? "-"
                                    : ","}{" "}
                                {TruncateString(row.install_address_state, 32)}
                            </Typography>
                        </Tooltip>
                    </Box>

                    <Typography
                        aria-label={`${row?.project_template}`}
                        sx={{
                            lineHeight: "18px",
                            mt: "3px",
                            letterSpacing: "-0.05%",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#1e1e1e"
                        }}
                    >
                        {TruncateString(row.project_template, 32) || "-"}
                    </Typography>
                </TableCell>
                <TableCell
                    aria-label={
                        row.date_created_qbrecord
                            ? moment
                                  .utc(moment.unix(row.date_created_qbrecord))
                                  .utcOffset(0)
                                  .format("MMMM D, yyyy")
                            : "N/A"
                    }
                    sx={{
                        lineHeight: "20.02px",
                        letterSpacing: "-0.62%",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#757575",
                        paddingY: "11px",
                        borderBottom: "unset",
                        whiteSpace: "nowrap"
                    }}
                    align="left"
                >
                    {row.date_created_qbrecord
                        ? moment
                              .utc(moment.unix(row.date_created_qbrecord))
                              .utcOffset(0)
                              .format("MMMM D, yyyy")
                        : "N/A"}
                </TableCell>
                <TableCell
                    align="left"
                    sx={{
                        paddingY: "11px",
                        borderBottom: "unset",
                        paddingX: {
                            xs: "16px !important",
                            lg: "14px !important",
                            xl: "16px !important"
                        }
                    }}
                >
                    <ProjectOverAllProgress
                        title={"flex"}
                        percentage={
                            row.project_percentage_complete
                                ? row.project_percentage_complete
                                : 0
                        }
                    />
                </TableCell>
                <TableCell
                    align="left"
                    sx={{
                        paddingY: "11px",
                        borderBottom: "unset",
                        paddingX: {
                            xs: "16px !important",
                            lg: "14px !important",
                            xl: "16px !important"
                        }
                    }}
                >
                    <Box sx={{ marginRight: { lg: pid && "16px" } }}>
                        <OverViewStatusChip
                            status={row.project_status_client_portal.toLowerCase()}
                            label={row.project_status_client_portal.toLowerCase()}
                        />
                    </Box>
                </TableCell>

                <TableCell
                    align="left"
                    sx={{
                        paddingX: {
                            xs: "16px !important",
                            lg: "0px !important",
                            xl: "16px !important"
                        },
                        paddingY: "11px",
                        borderBottom: "unset"
                    }}
                >
                    {/* {row?.tasks
                        ?.find(
                            (a) => a.task_name === "Review Project Info for Discovery"
                        )
                        ?.status.toLowerCase() != "completed" ? ( */}
                    {/* {row?.tasks?.find((a) => a.action_required === true) ? (
                        <Button
                            className="next-button"
                            onClick={() => {
                                selectProject(row)
                            }}
                            sx={{
                                marginRight: pid && "-5px",
                                "&:hover": {
                                    background: theme.palette.primary.main
                                },
                                width: "100%",
                                maxWidth: "158px",
                                minWidth: "158px",
                                lineHeight: "25px",
                                px: "0 !important",
                                fontSize: { xs: "12px", xl: "12px" },
                                fontWeight: "600",
                                width: "max-content",
                                py: 1.5
                            }}
                            variant="contained"
                            aria-label="Action Required"
                        >
                            Action Required
                            <ArrowForwardIcon
                                sx={{
                                    ml: { lg: "8px" },
                                    width: { xs: "15px", xl: "20px" },
                                    height: { xs: "15px", xl: "20px" }
                                }}
                            />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => selectProject(row)}
                            disabled={false}
                            variant="outlined"
                            sx={{
                                width: "100%",
                                maxWidth: "158px",
                                minWidth: "158px",
                                py: 1.25,
                                px: "0 !important",
                                transition: "all 0.2s ease-in-out",
                                border: "1px solid #e0e0e0",
                                background: "none !important",
                                display: "flex",
                                borderRadius: 2,
                                fontSize: "12px",
                                lineHeight: "25px",
                                fontWeight: 600,
                                color: "rgb(76, 175, 80) !important",
                                textTransform: "none",
                                "&:hover": {
                                    border: " 1px solid #3b873e !important",
                                    background: "#f5faf5 !important",
                                    color: "#3b873e !important"
                                }
                            }}
                        >
                            View Details
                            <ArrowForwardIcon
                                sx={{
                                    marginLeft: "12px",
                                    height: "20px",
                                    width: "16px"
                                }}
                            />
                        </Button>
                    )} */}
                    <Button
                        className="next-button"
                        onClick={() => {
                            selectProject(row)
                        }}
                        sx={{
                            marginRight: pid && "-5px",
                            "&:hover": {
                                background: theme.palette.primary.main
                            },
                            width: "100%",
                            maxWidth: "158px",
                            minWidth: "158px",
                            lineHeight: "25px",
                            px: "0 !important",
                            fontSize: { xs: "12px", xl: "12px" },
                            fontWeight: "600",
                            width: "max-content",
                            py: 1.5
                        }}
                        variant="contained"
                        aria-label="Action Required"
                    >
                        Action Required
                        <ArrowForwardIcon
                            sx={{
                                ml: { lg: "8px" },
                                width: { xs: "15px", xl: "20px" },
                                height: { xs: "15px", xl: "20px" }
                            }}
                        />
                    </Button>
                </TableCell>
                <TableCell
                    align="left"
                    sx={{
                        paddingX: {
                            xs: "16px !important",
                            lg: "14px !important",
                            xl: "16px !important"
                        },

                        borderBottom: "unset",
                        paddingY: "11px"
                    }}
                >
                    <Box
                        component={"span"}
                        sx={{
                            display: "flex",

                            justifyContent: "space-between",
                            alignItems: "center",
                            maxWidth: {
                                xxl: "64px"
                            }
                        }}
                    >
                        <IconButton
                            component={"span"}
                            aria-label="toggle-button"
                            onClick={() => {
                                !pid && showtoggle()
                            }}
                            sx={{
                                display: path.includes("schedule")
                                    ? "none"
                                    : "flex",
                                position: "relative",

                                paddingY: "10px",
                                alignItems: "center",
                                cursor: "pointer"
                            }}
                        >
                            <svg
                                style={{
                                    transform:
                                        toggleIndex1 != rowIndex
                                            ? "rotate(180deg)"
                                            : "rotate(0)",
                                    transition: "all 300ms ease-in-out"
                                }}
                                width={12}
                                height={8}
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>This is collapse icon</title>
                                <path
                                    d="M1.41 7.41016L6 2.83016L10.59 7.41016L12 6.00016L6 0.000156403L0 6.00016L1.41 7.41016Z"
                                    fill="#5C5C5C"
                                />
                            </svg>
                        </IconButton>
                        {/* <Box
                            component={"span"}
                            sx={{ display: "block" }}
                            className="reset-menu-overview"
                        >
                            <IconButton
                                disabled={
                                    process.env.NEXT_PUBLIC_APP_ENV !=
                                    "development"
                                }
                                aria-label="more"
                                id="long-button"
                                aria-controls={
                                    openResetMenu ? "long-menu" : undefined
                                }
                                aria-expanded={
                                    openResetMenu ? "true" : undefined
                                }
                                aria-haspopup="true"
                                aria-describedby={id}
                                variant="contained"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            {showResetDropDown && (
                                <Box className="shadow">
                                    <Popover
                                        className="shadow"
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                    >
                                        <MenuItem
                                            sx={{
                                                paddingRight: "50px",
                                                display: "flex ",
                                                justifyContent: "start",
                                                textAlign: "start",
                                                paddingY: "16px",
                                                fontSize: "12px",
                                                color: "#F44336",
                                                cursor: "not-allowed"
                                            }}
                                            aria-label="Reset Project"
                                        >
                                            <svg
                                                style={{ marginRight: "8px" }}
                                                width={16}
                                                height={17}
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.00002 3.83341V1.16675L4.66669 4.50008L8.00002 7.83341V5.16675C10.2067 5.16675 12 6.96008 12 9.16675C12 11.3734 10.2067 13.1667 8.00002 13.1667C5.79335 13.1667 4.00002 11.3734 4.00002 9.16675H2.66669C2.66669 12.1134 5.05335 14.5001 8.00002 14.5001C10.9467 14.5001 13.3334 12.1134 13.3334 9.16675C13.3334 6.22008 10.9467 3.83341 8.00002 3.83341Z"
                                                    fill="#F44336"
                                                />
                                            </svg>
                                            Reset Project
                                        </MenuItem>
                                    </Popover>
                                </Box>
                            )}
                        </Box> */}
                    </Box>
                </TableCell>
            </TableRow>

            <TableRow
                sx={{
                    borderBottom:
                        rowIndex !== last && !pid && "1px solid #E0E0E0",
                    borderLeft:
                        (pid && "2px solid #1D4ED8") ||
                        (toggleIndex1 == rowIndex
                            ? "2px solid #1D4ED8"
                            : "2px solid transparent")
                }}
            >
                <TableCell
                    className="table-swiper"
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        borderBottom: 0
                    }}
                    sx={{
                        pl: {
                            lg: "12px"
                        },

                        background: "#FFFFFF",

                        paddingY: "11px"
                    }}
                    colSpan={6}
                >
                    <Collapse
                        in={
                            toggleIndex1 == rowIndex || path != "/"
                                ? true
                                : false
                        }
                        timeout="auto"
                        unmountOnExit
                    >
                        <Box>
                            <Box display="flex" justifyContent="space-between">
                                <Box
                                    style={{
                                        marginTop: "18px",
                                        marginBottom: "29px"
                                    }}
                                >
                                    <Typography
                                        aria-label={`Project Status`}
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                        sx={{
                                            fontWeight: "700",
                                            color: "#5C5C5C",
                                            fontSize: {
                                                md: "14px",
                                                xs: "16px"
                                            },
                                            mt: { xl: "1px", lg: "2px" }
                                        }}
                                    >
                                        Project Status:
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: {
                                    lg: `${width - 100}px`,

                                    md: `${width - 100}px`
                                },
                                display: {
                                    lg: "block",
                                    xs: "none"
                                },
                                mt: "3px"
                            }}
                        >
                            <Box
                                sx={{
                                    paddingLeft: path != "/" && "0",
                                    overflow: "hidden",
                                    width: {
                                        lg: `${width - 30}px`,
                                        md: `${width - 30}px`
                                    }
                                }}
                            >
                                <Swiper
                                    onActiveIndexChange={(swiperCore) => {
                                        setSwiperIndex(swiperCore.realIndex)
                                        if (!swiperCore.isEnd) {
                                            setEnd(false)
                                        }
                                    }}
                                    scrollbar={{
                                        hide: true
                                    }}
                                    onReachEnd={() => setEnd(true)}
                                    slidesPerView={"auto"}
                                    spaceBetween={20}
                                    className="mySwiper"
                                    modules={[Navigation, Scrollbar]}
                                    navigation={true}
                                    breakpoints={{
                                        640: {
                                            spaceBetween: 70
                                        },
                                        1200: {
                                            spaceBetween: 70
                                        },
                                        1360: {
                                            spaceBetween: 50
                                        },
                                        1440: {
                                            spaceBetween: 54
                                        },
                                        1500: {
                                            spaceBetween: 50
                                        },
                                        1640: {
                                            spaceBetween: 32
                                        },
                                        1711: {
                                            spaceBetween: 55
                                        },
                                        1800: {
                                            spaceBetween: 25
                                        }
                                    }}
                                >
                                    {!end ? (
                                        <button
                                            aria-label="next"
                                            role={`button`}
                                            style={{
                                                marginTop: "-43px",
                                                right:
                                                    path == "/"
                                                        ? "10px"
                                                        : {
                                                              xl: "9px",
                                                              md: "0px"
                                                          },
                                                border: "0",
                                                zIndex: "60",
                                                pointerEvents: "none",
                                                width: "40px",
                                                height: "40px",
                                                background:
                                                    theme.palette.primary.main,
                                                borderRadius: "9999px"
                                            }}
                                            className="swiper-button-next nextB"
                                        >
                                            <svg
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>
                                                    This is next button icon
                                                </title>
                                                <path
                                                    d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            aria-label="next"
                                            role={`button`}
                                            style={{
                                                marginTop: "-43px",
                                                right:
                                                    path == "/"
                                                        ? "10px"
                                                        : {
                                                              xl: "9px",
                                                              md: "0px"
                                                          },
                                                border: "0",
                                                zIndex: "60",
                                                pointerEvents: "none",
                                                width: "40px",
                                                opacity: !end ? "1" : "0",
                                                height: "40px",
                                                background:
                                                    theme.palette.primary.main,
                                                borderRadius: "9999px"
                                            }}
                                            className="swiper-button-next nextB"
                                        >
                                            <svg
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>
                                                    This is next button icon
                                                </title>
                                                <path
                                                    d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    )}

                                    {swiperIndex !== 0 && swiperIndex ? (
                                        <button
                                            aria-label={`previous`}
                                            role={`button`}
                                            style={{
                                                marginTop: "-43px",
                                                right: "0",
                                                border: "0",
                                                transition:
                                                    swiperIndex == 0 &&
                                                    !swiperIndex &&
                                                    "all",
                                                timeout:
                                                    swiperIndex == 0 &&
                                                    !swiperIndex &&
                                                    "300ms",
                                                opacity:
                                                    swiperIndex !== 0 &&
                                                    swiperIndex
                                                        ? "1"
                                                        : "0.3",
                                                zIndex: "60",
                                                pointerEvents: "none",
                                                width: "40px",
                                                height: "40px",
                                                background:
                                                    theme.palette.primary.main,
                                                borderRadius: "9999px"
                                            }}
                                            className="swiper-button-prev"
                                        >
                                            <svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>
                                                    This is back button icon
                                                </title>
                                                <path
                                                    d="M12 20L13.41 18.59L7.83 13L20 13V11L7.83 11L13.41 5.41L12 4L4 12L12 20Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            aria-label={`previous`}
                                            role={`button`}
                                            style={{
                                                marginTop: "-43px",
                                                right: "0",
                                                border: "0",

                                                opacity:
                                                    swiperIndex !== 0 &&
                                                    swiperIndex
                                                        ? "1"
                                                        : "0",
                                                zIndex: "60",
                                                pointerEvents: "none",
                                                width: "40px",
                                                height: "40px",
                                                background:
                                                    theme.palette.primary.main,
                                                borderRadius: "9999px"
                                            }}
                                            className="swiper-button-prev"
                                        >
                                            <svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>
                                                    This is back button icon
                                                </title>
                                                <path
                                                    d="M12 20L13.41 18.59L7.83 13L20 13V11L7.83 11L13.41 5.41L12 4L4 12L12 20Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    )}

                                    {row?.tasks?.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <Box
                                                    aria-label="task"
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        width: "131px",
                                                        paddingBottom: "24px"
                                                    }}
                                                >
                                                    <Box
                                                        aria-label={`${
                                                            item?.end_date !==
                                                                null &&
                                                            item?.start_date !==
                                                                null
                                                                ? item?.status.toLowerCase() ==
                                                                  "completed"
                                                                    ? unixDateConverter(
                                                                          item?.end_date,
                                                                          "MMM Do"
                                                                      )
                                                                    : unixDateConverter(
                                                                          item?.start_date,
                                                                          "MMM Do"
                                                                      )
                                                                : "TBD"
                                                        }`}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            color={
                                                                theme.palette
                                                                    .secondary
                                                                    .main
                                                            }
                                                            gutterBottom
                                                            sx={{
                                                                fontSize: {
                                                                    md: "14px"
                                                                }
                                                            }}
                                                        >
                                                            {item?.start_date
                                                                ? item?.status.toLowerCase() ==
                                                                      "completed" ||
                                                                  item?.status.toLowerCase() ==
                                                                      "confirmed"
                                                                    ? item.end_date
                                                                        ? unixDateConverter(
                                                                              item?.end_date,
                                                                              "MMM Do"
                                                                          )
                                                                        : "TBD"
                                                                    : unixDateConverter(
                                                                          item?.start_date,
                                                                          "MMM Do"
                                                                      )
                                                                : "TBD"}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        aria-label={`${
                                                            item?.schedule_name ||
                                                            item?.display_name
                                                        }`}
                                                        width="100%"
                                                        style={{
                                                            paddingTop: "12px"
                                                        }}
                                                    >
                                                        <StatusBoxTableSlider
                                                            status={item.status.toLowerCase()}
                                                            label={
                                                                item.schedule_name ||
                                                                item.display_name
                                                            }
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            position:
                                                                "relative",
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            mt: "6px",
                                                            width: "100%"
                                                        }}
                                                    >
                                                        <Stepper
                                                            activeStep={1}
                                                            alternativeLabel
                                                            sx={{
                                                                zIndex: "20"
                                                            }}
                                                        >
                                                            <Step
                                                                key={
                                                                    item.display_name
                                                                }
                                                            >
                                                                <StepLabel
                                                                    StepIconComponent={() =>
                                                                        ColorlibStepIcon(
                                                                            item.status
                                                                        )
                                                                    }
                                                                />
                                                            </Step>
                                                        </Stepper>
                                                        {i !==
                                                            row?.tasks?.length -
                                                                1 && (
                                                            <Box
                                                                className="linePosition"
                                                                sx={{
                                                                    position:
                                                                        "absolute",
                                                                    width: {
                                                                        lg: "90px",
                                                                        xl: "90px"
                                                                    },
                                                                    background:
                                                                        "rgb(189, 189, 189)",
                                                                    height: "1px",
                                                                    zIndex: "15"
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                paddingBottom: "24px",
                                overflow: "hidden",
                                width: {
                                    lg: `${width - 40}px`,
                                    md: `${width - 30}px`
                                }
                            }}
                        >
                            {!row?.tasks?.length && (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    fontSize="20px"
                                    fontWeight={"bold"}
                                >
                                    No Record Found
                                </Box>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <ProjectResetPopup
                resetProjectPopUp={resetProjectPopUp}
                setResetProjectPopUp={setResetProjectPopUp}
                projectID={parseInt(row.record_id_quickbase)}
            />
        </React.Fragment>
    )
}

export default Index
