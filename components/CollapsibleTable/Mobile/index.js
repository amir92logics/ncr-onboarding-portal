import {
    Button,
    IconButton,
    MenuItem,
    Popover,
    Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { OverViewStatusChip } from "../../common/CustomStatusChip"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { OneCard } from "./OneCard"
import { useRouter } from "next/router"
import ProjectResetPopup from "../../ProjectResetPopup"
import theme from "../../../src/theme"
import Head from "next/head"
import { LayoutBase } from "../../LayoutBase"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { ProjectOverAllProgress } from "../../LayoutBase/ProjectOverAllProgress"
import { getMessage } from "../../../helper/Constraints"
import {
    setCurrentproject,
    setProjectType
} from "../../../redux-setup/dataSlice"
import { unixDateConverter } from "../../../helper/Constraints"

function Index({ rows }) {
    const [expand, setExpand] = useState(false)
    const [cardID, setCardID] = useState()
    const [resetProjectPopUp, setResetProjectPopUp] = useState(false)
    const [anchorEl, setAnchorEl] = useState(false)
    const [showResetDropDown, setShowResetDropDown] = useState(true)
    const [delay, setDelay] = useState("")
    const openResetMenu = anchorEl
    const router = useRouter()
    const path = router.pathname
    const pid = router.query.id
    const [time, setTime] = useState("")
    const handlemore = (id) => {
        clearTimeout(time)
        cardID == id ? setExpand(!expand) : setExpand(true)
        setCardID(id)
        setDelay(id)
        expand &&
            setTime(
                setTimeout(() => {
                    setDelay("")
                }, 700)
            )
    }
    const handleClose = () => {
        setShowResetDropDown(false)
        setAnchorEl(null)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setShowResetDropDown(true)
    }
    const handleActionRedirect = (id) => {
        return `/actions/${id}`
    }
    const dispatch = useDispatch()
    const state = useSelector((state) => state.auth.user)
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
            pathname: handleActionRedirect(proj.record_id_quickbase)
        })
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ px: "8px" }}>
                <Head>
                    <title>Overview | NCR Onboarding</title>
                    <meta name="description" content="NCR Onboarding." />
                </Head>
                <Box>
                    <LayoutBase
                        showPercentageProgress={true}
                        title={
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: theme.palette.textColor.main,
                                            fontWeight: "600",
                                            fontSize: "24px",
                                            lineHeight: "32px"
                                        }}
                                    >
                                        {" "}
                                        {getMessage()}, {state?.firstName}
                                    </Typography>
                                </Box>
                            </Box>
                        }
                    ></LayoutBase>
                </Box>
                <Box>
                    {rows.map((row, i) => (
                        <React.Fragment key={row.record_id_quickbase}>
                            {path == "/" && i == 0 && (
                                <Box
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        lineHeight: "28px",
                                        mt: { xs: "-16px", md: "0px" }
                                    }}
                                >
                                    Projects
                                </Box>
                            )}
                            {pid ? (
                                pid == row.record_id_quickbase && (
                                    <Box key={row?.record_id_quickbase} sx={{}}>
                                        <Box
                                            className="shadow"
                                            sx={{
                                                borderRadius:
                                                    delay ==
                                                        row.record_id_quickbase ||
                                                    (cardID ==
                                                        row.record_id_quickbase &&
                                                        expand)
                                                        ? "0px 8px 0px 0px"
                                                        : "8px",
                                                border:
                                                    delay ==
                                                        row.record_id_quickbase ||
                                                    (cardID ==
                                                        row.record_id_quickbase &&
                                                        expand)
                                                        ? ""
                                                        : "1px solid #eee",
                                                borderTop:
                                                    expand && "1px solid #eee",
                                                borderLeft:
                                                    delay ==
                                                        row.record_id_quickbase ||
                                                    (cardID ==
                                                        row.record_id_quickbase &&
                                                        expand)
                                                        ? "2px solid #1D4ED8"
                                                        : "2px solid transparent",
                                                borderRight:
                                                    expand && "1px solid #eee",
                                                backgroundColor: "white"
                                            }}
                                        >
                                            {pid && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        cursor: "pointer",

                                                        justifyContent:
                                                            "space-between",
                                                        px: "16px",
                                                        alignItems: "center",
                                                        marginBottom: {
                                                            md: "16px",
                                                            xs: "16px"
                                                        },
                                                        pt: pid && "16px"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }}
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: "/"
                                                            })
                                                        }
                                                    >
                                                        <svg
                                                            width={8}
                                                            height={12}
                                                            viewBox="0 0 8 12"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>
                                                                This is Back To
                                                                Projects button
                                                                icon
                                                            </title>
                                                            <path
                                                                d="M6.25 1.5L1.75 6L6.25 10.5"
                                                                stroke="#5C5C5C"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight:
                                                                    "600",
                                                                paddingLeft: {
                                                                    md: "9.5px",
                                                                    xs: "9px"
                                                                },

                                                                color: "#5C5C5C"
                                                            }}
                                                        >
                                                            Back To Projects
                                                        </Typography>
                                                    </Box>
                                                    {/* <Box>
                                                        <IconButton
                                                            sx={{
                                                                padding: "0px"
                                                            }}
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={
                                                                openResetMenu
                                                                    ? "long-menu"
                                                                    : undefined
                                                            }
                                                            aria-expanded={
                                                                openResetMenu
                                                                    ? "true"
                                                                    : undefined
                                                            }
                                                            aria-haspopup="true"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    </Box> */}
                                                </Box>
                                            )}
                                            <Box
                                                sx={{
                                                    px: "16px",
                                                    pt: !pid && "16px"
                                                }}
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="flex-start"
                                                    justifyContent="space-between"
                                                    sx={{
                                                        backgroundColor: [
                                                            `white`
                                                        ],

                                                        borderRadius:
                                                            "8px 8px 0px 0px"
                                                    }}
                                                >
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <Box
                                                            marginLeft="0px"
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <Typography
                                                                onClick={() =>
                                                                    selectProject(
                                                                        row
                                                                    )
                                                                }
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    fontSize:
                                                                        "20px",
                                                                    fontWeight:
                                                                        "600",
                                                                    lineHeight:
                                                                        "28px",
                                                                    width: "100%"
                                                                }}
                                                                variant="body1"
                                                            >
                                                                {
                                                                    row.customer_name
                                                                }
                                                            </Typography>

                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    marginTop:
                                                                        "6px",
                                                                    lineHeight:
                                                                        "20.02px",
                                                                    letterSpacing:
                                                                        "-0.62%",
                                                                    color: "#1e1e1e"
                                                                }}
                                                            >
                                                                {row.install_address_city ==
                                                                " ,  "
                                                                    ? "--"
                                                                    : row.install_address_city}
                                                                {row.install_address_city ===
                                                                null
                                                                    ? "-"
                                                                    : ","}
                                                                {row.install_address_city !==
                                                                    " ,  " &&
                                                                    " "}
                                                                {
                                                                    row.install_address_state
                                                                }
                                                                <Box
                                                                    component={
                                                                        "span"
                                                                    }
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                        width: "100%",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "flex-start",
                                                                        mt: "6px",
                                                                        color: "#1e1e1e"
                                                                    }}
                                                                >
                                                                    {
                                                                        row.project_template
                                                                    }
                                                                </Box>
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box></Box>
                                                    {showResetDropDown && (
                                                        <>
                                                            <Popover
                                                                className="shadow"
                                                                id="long-menu"
                                                                MenuListProps={{
                                                                    "aria-labelledby":
                                                                        "long-button"
                                                                }}
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                open={
                                                                    openResetMenu
                                                                }
                                                                onClose={
                                                                    handleClose
                                                                }
                                                                anchorOrigin={{
                                                                    vertical:
                                                                        "bottom",
                                                                    horizontal:
                                                                        "right"
                                                                }}
                                                                transformOrigin={{
                                                                    vertical:
                                                                        "top",
                                                                    horizontal:
                                                                        "right"
                                                                }}
                                                                sx={{
                                                                    borderRadius:
                                                                        "3px"
                                                                }}
                                                            >
                                                                <MenuItem
                                                                    sx={{
                                                                        paddingRight:
                                                                            "50px",
                                                                        fontWeight: 400,
                                                                        display:
                                                                            "flex ",
                                                                        justifyContent:
                                                                            "start",
                                                                        textAlign:
                                                                            "start",
                                                                        paddingY:
                                                                            "16px",
                                                                        fontSize:
                                                                            "12px",

                                                                        color: "#E31B0C"
                                                                    }}
                                                                    aria-label="Reset Project"
                                                                >
                                                                    <svg
                                                                        style={{
                                                                            marginRight:
                                                                                "8px"
                                                                        }}
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            17
                                                                        }
                                                                        viewBox="0 0 16 17"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <title>
                                                                            This
                                                                            is
                                                                            Reset
                                                                            project
                                                                            icon
                                                                        </title>
                                                                        <path
                                                                            d="M8.00002 3.83341V1.16675L4.66669 4.50008L8.00002 7.83341V5.16675C10.2067 5.16675 12 6.96008 12 9.16675C12 11.3734 10.2067 13.1667 8.00002 13.1667C5.79335 13.1667 4.00002 11.3734 4.00002 9.16675H2.66669C2.66669 12.1134 5.05335 14.5001 8.00002 14.5001C10.9467 14.5001 13.3334 12.1134 13.3334 9.16675C13.3334 6.22008 10.9467 3.83341 8.00002 3.83341Z"
                                                                            fill="#F44336"
                                                                        />
                                                                    </svg>
                                                                    Reset
                                                                    Project
                                                                </MenuItem>
                                                            </Popover>
                                                        </>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{ paddingX: "16px" }}
                                                marginTop="12px"
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: "8px",

                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: {
                                                                md: "12px",
                                                                xs: "14px"
                                                            },
                                                            whiteSpace:
                                                                "nowrap",

                                                            color: "#727272",
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        Project Creation Date:
                                                        <Typography
                                                            component={"span"}
                                                            sx={{
                                                                fontSize: {
                                                                    md: "14px",
                                                                    xs: "14px"
                                                                },

                                                                color: "#5C5C5C",
                                                                fontWeight:
                                                                    "400",
                                                                ml: "8px"
                                                            }}
                                                        >
                                                            {row.date_created_qbrecord
                                                                ? unixDateConverter(
                                                                      row.date_created_qbrecord,
                                                                      "MMMM D, yyyy"
                                                                  )
                                                                : "N/A"}
                                                        </Typography>
                                                    </Typography>

                                                    <OverViewStatusChip
                                                        status={row.project_status_client_portal.toLowerCase()}
                                                        label={row.project_status_client_portal.toLowerCase()}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        mt: {
                                                            lg: 0,
                                                            xs: "16px"
                                                        }
                                                    }}
                                                >
                                                    <ProjectOverAllProgress
                                                        title={"Progress "}
                                                        width="100%"
                                                        percentage={
                                                            row?.project_percentage_complete
                                                        }
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: {
                                                            md: "row",
                                                            xs: "column"
                                                        },
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            pt: "15px",
                                                            pb: {
                                                                md: "14px",
                                                                xs: "16px"
                                                            },
                                                            width: {
                                                                md: "auto",
                                                                xs: "100%"
                                                            }
                                                        }}
                                                    >
                                                        {/* {row?.tasks
                                                            ?.find(
                                                                (a) =>
                                                                    a.task_name ===
                                                                    "Review Project Info for Discovery"
                                                            )
                                                            ?.status.toLowerCase() !=
                                                        "completed" ? ( */}
                                                        {/* {row?.tasks?.find(
                                                            (a) =>
                                                                a.action_required ===
                                                                true
                                                        ) ? (
                                                            <Button
                                                                onClick={() =>
                                                                    selectProject(
                                                                        row
                                                                    )
                                                                }
                                                                disabled={false}
                                                                variant="contained"
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "center",
                                                                    alignItems:
                                                                        "center",
                                                                    textTransform:
                                                                        "initial",
                                                                    padding:
                                                                        "10px 18px",
                                                                    width: "100%",
                                                                    borderRadius:
                                                                        "8px"
                                                                }}
                                                            >
                                                                Action Required
                                                                <ArrowForwardIcon
                                                                    sx={{
                                                                        marginLeft:
                                                                            "12px",
                                                                        height: "20px",
                                                                        width: "16px"
                                                                    }}
                                                                />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() =>
                                                                    selectProject(
                                                                        row
                                                                    )
                                                                }
                                                                disabled={false}
                                                                variant="outlined"
                                                                sx={{
                                                                    maxWidth: {
                                                                        md: 170,
                                                                        xs: "100%"
                                                                    },
                                                                    minWidth: {
                                                                        md: 170
                                                                    },
                                                                    width: "100%",
                                                                    transition:
                                                                        "all 0.2s ease-in-out",
                                                                    border: "1px solid #e0e0e0",
                                                                    background:
                                                                        "none !important",
                                                                    py: 2.25,
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    borderRadius: 2,
                                                                    fontWeight: 600,
                                                                    color: "rgb(76, 175, 80) !important",
                                                                    textTransform:
                                                                        "none",
                                                                    "&:hover": {
                                                                        border: " 1px solid #3b873e !important",
                                                                        background:
                                                                            "#f5faf5 !important",
                                                                        color: "#3b873e !important"
                                                                    }
                                                                }}
                                                            >
                                                                View Details
                                                                <ArrowForwardIcon
                                                                    sx={{
                                                                        marginLeft:
                                                                            "12px",
                                                                        height: "20px",
                                                                        width: "16px"
                                                                    }}
                                                                />
                                                            </Button>
                                                        )} */}
                                                        <Button
                                                            onClick={() =>
                                                                selectProject(
                                                                    row
                                                                )
                                                            }
                                                            disabled={false}
                                                            variant="contained"
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                                textTransform:
                                                                    "initial",
                                                                padding:
                                                                    "10px 18px",
                                                                width: "100%",
                                                                borderRadius:
                                                                    "8px"
                                                            }}
                                                        >
                                                            Action Required
                                                            <ArrowForwardIcon
                                                                sx={{
                                                                    marginLeft:
                                                                        "12px",
                                                                    height: "20px",
                                                                    width: "16px"
                                                                }}
                                                            />
                                                        </Button>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                            paddingBottom: {
                                                                md: 0,
                                                                xs: "20px"
                                                            },
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => {
                                                            handlemore(
                                                                row.record_id_quickbase
                                                            )
                                                        }}
                                                    >
                                                        <Button
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                                lineHeight:
                                                                    "22px",
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                                fontWeight: 600,
                                                                textTransform:
                                                                    "capitalize",
                                                                width: {
                                                                    xs: "100%",
                                                                    md: "auto"
                                                                }
                                                            }}
                                                        >
                                                            {" "}
                                                            View{" "}
                                                            {expand &&
                                                            cardID ==
                                                                row.record_id_quickbase
                                                                ? "Less"
                                                                : "More"}
                                                            <KeyboardArrowUpIcon
                                                                className={`${
                                                                    expand &&
                                                                    cardID ==
                                                                        row.record_id_quickbase
                                                                        ? "-rotate-animate"
                                                                        : "rotate-animate"
                                                                }`}
                                                                sx={{
                                                                    fontSize:
                                                                        "20px",
                                                                    color: theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                    marginLeft:
                                                                        "6px"
                                                                }}
                                                            />
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <OneCard
                                            expand={
                                                expand &&
                                                cardID ==
                                                    row.record_id_quickbase
                                            }
                                            row={row}
                                        />
                                    </Box>
                                )
                            ) : (
                                <Box
                                    key={i}
                                    sx={{
                                        marginTop: { xs: "18px", md: "16px" }
                                    }}
                                >
                                    <Box
                                        className="shadow"
                                        sx={{
                                            borderRadius:
                                                delay ==
                                                    row.record_id_quickbase ||
                                                (cardID ==
                                                    row.record_id_quickbase &&
                                                    expand)
                                                    ? "0px 8px 0px 0px"
                                                    : "8px",
                                            borderLeft:
                                                delay ==
                                                    row.record_id_quickbase ||
                                                (cardID ==
                                                    row.record_id_quickbase &&
                                                    expand)
                                                    ? "2px solid #1D4ED8"
                                                    : "2px solid transparent",
                                            backgroundColor: "white"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                px: "16px",
                                                pt: "16px"
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="flex-start"
                                                justifyContent="space-between"
                                                sx={{
                                                    backgroundColor: [`white`],

                                                    borderRadius:
                                                        "8px 8px 0px 0px",
                                                    width: "100%"
                                                }}
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    sx={{ width: "100%" }}
                                                >
                                                    <Box
                                                        marginLeft="0px"
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <Typography
                                                            onClick={() =>
                                                                selectProject(
                                                                    row
                                                                )
                                                            }
                                                            sx={{
                                                                cursor: "pointer",
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "600",
                                                                lineHeight:
                                                                    "28px",
                                                                width: "100%"
                                                            }}
                                                            variant="body1"
                                                        >
                                                            {row.customer_name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: "#1e1e1e",
                                                                marginTop:
                                                                    "6px",
                                                                lineHeight:
                                                                    "20.02px",
                                                                letterSpacing:
                                                                    "-0.62%"
                                                            }}
                                                        >
                                                            {row.install_address_city ==
                                                            " ,  "
                                                                ? "--"
                                                                : row.install_address_city}
                                                            {row.install_address_city ===
                                                            null
                                                                ? "-"
                                                                : ","}
                                                            {row.install_address_city !==
                                                                " ,  " &&
                                                                " "}{" "}
                                                            {
                                                                row.install_address_state
                                                            }
                                                            <Box
                                                                component={
                                                                    "span"
                                                                }
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    width: "100%",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    alignItems:
                                                                        "flex-start",
                                                                    marginTop:
                                                                        "6px"
                                                                }}
                                                            >
                                                                {
                                                                    row.project_template
                                                                }
                                                            </Box>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                {/* <Box>
                                        
                                                        <IconButton
                                                            sx={{
                                                                padding: "0px"
                                                            }}
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={
                                                                openResetMenu
                                                                    ? "long-menu"
                                                                    : undefined
                                                            }
                                                            aria-expanded={
                                                                openResetMenu
                                                                    ? "true"
                                                                    : undefined
                                                            }
                                                            aria-haspopup="true"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                  
                                                </Box> */}
                                                {showResetDropDown && (
                                                    <>
                                                        <Popover
                                                            id="long-menu"
                                                            MenuListProps={{
                                                                "aria-labelledby":
                                                                    "long-button"
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={openResetMenu}
                                                            onClose={
                                                                handleClose
                                                            }
                                                            anchorOrigin={{
                                                                vertical:
                                                                    "bottom",
                                                                horizontal:
                                                                    "right"
                                                            }}
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal:
                                                                    "right"
                                                            }}
                                                            sx={{
                                                                borderRadius:
                                                                    "3px"
                                                            }}
                                                        >
                                                            <MenuItem
                                                                sx={{
                                                                    paddingRight:
                                                                        "50px",
                                                                    fontWeight: 400,
                                                                    display:
                                                                        "flex ",
                                                                    justifyContent:
                                                                        "start",
                                                                    textAlign:
                                                                        "start",
                                                                    paddingY:
                                                                        "16px",
                                                                    fontSize:
                                                                        "12px",

                                                                    color: "#E31B0C",
                                                                    cursor: "not-allowed"
                                                                }}
                                                                aria-label="Reset Project"
                                                            >
                                                                <svg
                                                                    style={{
                                                                        marginRight:
                                                                            "8px"
                                                                    }}
                                                                    width={16}
                                                                    height={17}
                                                                    viewBox="0 0 16 17"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>
                                                                        This is
                                                                        Reset
                                                                        Project
                                                                        icon
                                                                    </title>
                                                                    <path
                                                                        d="M8.00002 3.83341V1.16675L4.66669 4.50008L8.00002 7.83341V5.16675C10.2067 5.16675 12 6.96008 12 9.16675C12 11.3734 10.2067 13.1667 8.00002 13.1667C5.79335 13.1667 4.00002 11.3734 4.00002 9.16675H2.66669C2.66669 12.1134 5.05335 14.5001 8.00002 14.5001C10.9467 14.5001 13.3334 12.1134 13.3334 9.16675C13.3334 6.22008 10.9467 3.83341 8.00002 3.83341Z"
                                                                        fill="#F44336"
                                                                    />
                                                                </svg>
                                                                Reset Project
                                                            </MenuItem>
                                                        </Popover>
                                                    </>
                                                )}
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{ paddingX: "16px" }}
                                            marginTop="12px"
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    flexWrap: "wrap",
                                                    gap: "8px",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: {
                                                            md: "12px",
                                                            xs: "14px"
                                                        },
                                                        whiteSpace: "nowrap",
                                                        color: "#727272",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    Project Creation Date:
                                                    <Typography
                                                        component={"span"}
                                                        sx={{
                                                            fontSize: {
                                                                md: "14px",
                                                                xs: "14px"
                                                            },

                                                            color: "#5C5C5C",
                                                            fontWeight: "400",
                                                            ml: "8px"
                                                        }}
                                                    >
                                                        {row.date_created_qbrecord
                                                            ? moment
                                                                  .utc(
                                                                      moment.unix(
                                                                          row.date_created_qbrecord
                                                                      )
                                                                  )
                                                                  .utcOffset(0)
                                                                  .format(
                                                                      "MMMM D, yyyy"
                                                                  )
                                                            : "N/A"}
                                                    </Typography>
                                                </Typography>
                                                <OverViewStatusChip
                                                    status={row.project_status_client_portal?.toLowerCase()}
                                                    label={row.project_status_client_portal?.toLowerCase()}
                                                />
                                            </Box>
                                            <Box sx={{ mt: 4 }}>
                                                <ProjectOverAllProgress
                                                    width="100%"
                                                    title={"Progress "}
                                                    percentage={
                                                        row?.project_percentage_complete
                                                    }
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: {
                                                        md: "row",
                                                        xs: "column"
                                                    },
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        pt: "15px",
                                                        pb: {
                                                            md: "14px",
                                                            xs: "16px"
                                                        },
                                                        width: {
                                                            md: "auto",
                                                            xs: "100%"
                                                        }
                                                    }}
                                                >
                                                    {/* {row?.tasks
                                                        ?.find(
                                                            (a) =>
                                                                a.task_name ===
                                                                "Review Project Info for Discovery"
                                                        )
                                                        ?.status.toLowerCase() !=
                                                    "completed" ? ( */}
                                                    {/* {row?.tasks?.find(
                                                        (a) =>
                                                            a.action_required ===
                                                            true
                                                    ) ? (
                                                        <Button
                                                            className="next-button"
                                                            onClick={() =>
                                                                selectProject(
                                                                    row
                                                                )
                                                            }
                                                            disabled={false}
                                                            variant="contained"
                                                            sx={{
                                                                width: {
                                                                    md: 171,
                                                                    xs: "100%"
                                                                },
                                                                py: 2.5,
                                                                borderRadius:
                                                                    "8px"
                                                            }}
                                                        >
                                                            Action Required
                                                            <ArrowForwardIcon
                                                                sx={{
                                                                    marginLeft:
                                                                        "12px",
                                                                    height: "20px",
                                                                    width: "16px"
                                                                }}
                                                            />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                selectProject(
                                                                    row
                                                                )
                                                            }
                                                            disabled={false}
                                                            variant="outlined"
                                                            sx={{
                                                                width: {
                                                                    md: 171,
                                                                    xs: "100%"
                                                                },
                                                                py: 2.25,
                                                                transition:
                                                                    "all 0.2s ease-in-out",
                                                                border: "1px solid #e0e0e0",
                                                                background:
                                                                    "none !important",
                                                                display: "flex",
                                                                borderRadius: 2,

                                                                fontWeight: 600,
                                                                color: "rgb(76, 175, 80) !important",
                                                                textTransform:
                                                                    "none",
                                                                "&:hover": {
                                                                    border: " 1px solid #3b873e !important",
                                                                    background:
                                                                        "#f5faf5 !important",
                                                                    color: "#3b873e !important"
                                                                }
                                                            }}
                                                        >
                                                            View Details
                                                            <ArrowForwardIcon
                                                                sx={{
                                                                    marginLeft:
                                                                        "12px",
                                                                    height: "20px",
                                                                    width: "16px"
                                                                }}
                                                            />
                                                        </Button>
                                                    )} */}
                                                    <Button
                                                        className="next-button"
                                                        onClick={() =>
                                                            selectProject(row)
                                                        }
                                                        disabled={false}
                                                        variant="contained"
                                                        sx={{
                                                            width: {
                                                                md: 171,
                                                                xs: "100%"
                                                            },
                                                            py: 2.5,
                                                            borderRadius: "8px"
                                                        }}
                                                    >
                                                        Action Required
                                                        <ArrowForwardIcon
                                                            sx={{
                                                                marginLeft:
                                                                    "12px",
                                                                height: "20px",
                                                                width: "16px"
                                                            }}
                                                        />
                                                    </Button>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        paddingBottom: {
                                                            md: 0,
                                                            xs: "20px"
                                                        },
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        handlemore(
                                                            row.record_id_quickbase
                                                        )
                                                    }}
                                                >
                                                    <Button
                                                        sx={{
                                                            fontSize: "14px",
                                                            lineHeight: "22px",
                                                            color: theme.palette
                                                                .primary.main,
                                                            fontWeight: 600,
                                                            textTransform:
                                                                "capitalize",
                                                            width: {
                                                                xs: "100%",
                                                                md: "auto"
                                                            }
                                                        }}
                                                    >
                                                        {" "}
                                                        View{" "}
                                                        {expand &&
                                                        cardID ==
                                                            row.record_id_quickbase
                                                            ? "Less"
                                                            : "More"}
                                                        <KeyboardArrowUpIcon
                                                            className={`${
                                                                expand &&
                                                                cardID ==
                                                                    row.record_id_quickbase
                                                                    ? "-rotate-animate"
                                                                    : "rotate-animate"
                                                            }`}
                                                            sx={{
                                                                fontSize:
                                                                    "20px",
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                                marginLeft:
                                                                    "6px"
                                                            }}
                                                        />
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <OneCard
                                        expand={
                                            expand &&
                                            cardID == row.record_id_quickbase
                                        }
                                        row={row}
                                    />
                                </Box>
                            )}
                        </React.Fragment>
                    ))}
                    <ProjectResetPopup
                        resetProjectPopUp={resetProjectPopUp}
                        setResetProjectPopUp={setResetProjectPopUp}
                        projectID={parseInt(cardID)}
                    />
                    <Box marginTop={12} sx={{ flexGrow: 1 }} width="100%"></Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Index
