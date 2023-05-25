import {
    Box,
    Collapse,
    Paper,
    Skeleton,
    Typography,
    Divider,
    Tooltip,
    useMediaQuery
} from "@mui/material"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import theme from "../../src/theme"
import { useRouter } from "next/router"
import React, { useEffect, useState, useLayoutEffect } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Link from "next/link"
import { CustomTooltip } from "../Tooltip"
import {
    reset,
    SetApiloadingState,
    setCurrentproject,
    setDiscoveryLoading,
    SetNcrManagedNetwork,
    setProjectType,
    SetSideBarData,
    setSidebarToggle,
    SetSubTasks,
    setTabledata,
    SetTasks
} from "../../redux-setup/dataSlice"
import {
    useLazyGetWorkFlowsQuery,
    useLazyGetWorkFlowbyidQuery,
    useLazyActionsgetQuery,
    useLazyDocumentsGetQuery
} from "../../redux-setup/api/data"

export default function Sidebardata() {
    const isMobile = useMediaQuery((Theme) => Theme.breakpoints.down("lg"))
    const show = useSelector((state) => state.dataSlice.sidebarToggle)
    const ncrManage = useSelector((state) => state.dataSlice.ncrManagedNetwork)
    const tabledata = useSelector((state) => state.dataSlice.tableData)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const currentproject = useSelector(
        (state) => state.dataSlice.currentproject
    )
    const user = useSelector((state) => state.auth.user)
    const sidebar = useSelector((state) => state.dataSlice.homepagesidebar)
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const system = useSelector((state) => state.dataSlice.projectType)
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const [worflowtrigger] = useLazyGetWorkFlowsQuery()
    const [workflowbyid] = useLazyGetWorkFlowbyidQuery()
    const [documentsGet] = useLazyDocumentsGetQuery()
    const [actionstrigger] = useLazyActionsgetQuery()
    const dispatch = useDispatch()
    const router = useRouter()
    const pid = router.query.id
    const newpath = router.asPath
    const splitpath = newpath.split("/")
    const [open, setOpen] = useState(false)
    const System = (e) => {
        let docs = tasks?.find(
            (it) => it.task_name == "Upload Required Documents"
        )
        let docscheck = docs?.json[e]
        return docscheck
    }
    useEffect(() => {
        if (newpath == "/" && !pid) {
            dispatch(reset())
            if (user) {
                if (user.mcn?.length) {
                    worflowtrigger(user.mcn)
                        .unwrap()
                        .then((res) => {
                            if (res?.status == false) {
                                dispatch(SetApiloadingState(false))
                            } else if (res.length) {
                                dispatch(SetApiloadingState(false))
                                dispatch(setTabledata(res))
                            } else {
                                dispatch(SetApiloadingState(false))
                            }
                        })
                        .catch((err) => {
                            dispatch(SetApiloadingState(false))
                            console.error("Error is :", err)
                        })
                }
            }
        }
        if (pid && Object.keys(currentproject).length == 0) {
            workflowbyid(pid)
                .unwrap()
                .then((res) => {
                    if (res?.record_id_quickbase) {
                        dispatch(
                            setProjectType(
                                !(
                                    res?.project_template ==
                                        "New Aloha Essentials Install" ||
                                    res?.project_template == "New Install"
                                )
                            )
                        )
                        dispatch(setCurrentproject(res))
                        dispatch(setTabledata([res]))
                    } else {
                        dispatch(SetApiloadingState(false))
                    }
                })
                .catch((err) => dispatch(SetApiloadingState(false)))
        }
    }, [pid, user])
    useLayoutEffect(() => {
        let current = currentproject?.record_id_quickbase
        if (current) {
            dispatch(SetApiloadingState(true))
            actionstrigger(current)
                .unwrap()
                .then((res) => {
                    if (res && res.status && res.data) {
                        documentsGet(current)
                            .unwrap()
                            .then((docs) => {
                                dispatch(SetTasks(res.data.actions))
                                dispatch(SetSubTasks(res.data.sub_tasks))
                                setDiscoveryData(
                                    res.data.sub_tasks,
                                    res.data.actions,
                                    system,
                                    docs
                                )
                                dispatch(SetApiloadingState(false))
                            })
                    } else {
                        dispatch(SetApiloadingState(false))
                    }
                })
                .catch((err) => {
                    dispatch(SetApiloadingState(false))
                    console.error("Error is :", err)
                })
        }
    }, [currentproject])

    const setDiscoveryData = (data, actionsdata, system, docs) => {
        let tempsidebar = [...sideBarData]
        let discoveryindex = tempsidebar.findIndex(
            (it) => it.name == "Discovery"
        )
        let docsind = tempsidebar.findIndex((it) => it.name == "Documents")
        let doc = { ...tempsidebar[docsind] }
        doc.data = docs
        tempsidebar[docsind] = doc
        let discoverydata = { ...tempsidebar[discoveryindex] }
        let tempsubs =
            system === true
                ? [...discoverydata.systemrefresh]
                : [...discoverydata.subStages]
        for (let i = 0; i < tempsubs.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (
                    tempsubs[i].name == data[j].display_name &&
                    data[j]?.json !== null &&
                    data[j]?.json.length > 0
                ) {
                    let currentsubstage = { ...tempsubs[i] }
                    currentsubstage.percentage = data[j].percent_complete
                    let currentinnerstage = [...currentsubstage.subStages]
                    for (let k = 0; k < currentinnerstage.length; k++) {
                        let c2 = { ...currentinnerstage[k] }
                        c2.name == "Confirmation"
                            ? (c2.data = ["Disabled"])
                            : ((c2.data = data[j].json[k]
                                  ? [...data[j].json[k]]
                                  : []),
                              (c2.percentage =
                                  c2.name == "NCR Managed Network With NSS"
                                      ? data[j].json[k].length > 0
                                          ? 100
                                          : 0
                                      : data[j].json[k]
                                      ? 100
                                      : 0))
                        currentinnerstage[k] = c2
                        c2.name == "Network Management & Security" &&
                            dispatch(
                                SetNcrManagedNetwork(
                                    !data[j].json[k][0]?.checked
                                )
                            )
                    }
                    currentsubstage.subStages = currentinnerstage
                    tempsubs[i] = currentsubstage
                }
            }
        }
        discoverydata[system === true ? "systemrefresh" : "subStages"] =
            tempsubs
        discoverydata.percentage = actionsdata.find(
            (it) => it.task_name == "Review Project Info for Discovery"
        )?.percent_complete
        tempsidebar[discoveryindex] = discoverydata

        dispatch(SetSideBarData(tempsidebar))
        dispatch(setDiscoveryLoading(false))
    }
    const reviewhandler = (name) => {
        let discovery = sideBarData.find((it) => it.name == "Discovery")
        let system = discovery.systemrefresh.find(
            (it) => it.name == "Back Office Computer & Printer"
        ).percentage
        if (system < 100) {
            return true
        }
    }
    const projectSignOffHandler = () => {
        let temp =
            tasks.length > 0 &&
            tasks.filter((it) => it.status.toLowerCase() !== "completed")
                .length <= 1
        return temp
    }
    const handleSubStage = (index, item) => {
        if (item.name == "Discovery" || item.name == "Documents") {
            if (item.name.toLowerCase() == splitpath[1]) {
                router.push({ pathname: `/actions/${pid}`, query: {} })
            } else {
                router.push({
                    pathname: `${item.subStages[0].route}/${pid}`,
                    query: {}
                })
            }
        } else {
            router.push({ pathname: `${item.route}/${pid}`, query: {} })
        }
    }
    const SubStageMaintain = (index, item) => {
        if (
            item.name.toLowerCase() == splitpath[1] &&
            item.display &&
            !newpath.includes("inner")
        ) {
            return true
        }
    }
    const handleSubStageInner = (e, _item) => {
        let element = document?.getElementById("sidebarscroll")
        setTimeout(() => {
            element.scrollTop = 0
        }, 100)
        if (
            _item.route.includes("discovery") &&
            _item.name !== "Discovery Overview"
        ) {
            router.push({
                pathname: `${_item.route}/${pid}`,
                query: {
                    inner: true
                }
            })
        } else {
            dispatch(setSidebarToggle(false))
            router.push({
                pathname: `${_item.route}/${pid}`
            })
        }
    }
    const subStageInnerMaintain = (_item, idx) => {
        return (
            _item.name.toLowerCase().replaceAll(" ", "-") == splitpath[2] &&
            newpath.includes("inner")
        )
    }

    const handleSubStageInternal = (_item, i, _inner, check) => {
        router.push({
            pathname: _inner.route + "/" + pid,
            query: {
                inner: true
            }
        })
    }
    const getsubstage = (item) => {
        if (system && item.name == "Discovery") {
            return "systemrefresh"
        } else {
            return "subStages"
        }
    }

    const getStageNames = () => {
        if (newpath.includes("inner")) {
            return splitpath[2].replaceAll("-", " ")
        }
    }
    const confirmationHandler = (i) => {
        const ind = sideBarData.findIndex((it) => it.name == "Discovery")
        let subStages = system
            ? sideBarData[ind].systemrefresh
            : sideBarData[ind].subStages
        if (subStages[i]?.percentage == 100) {
            return true
        }
    }
    let sidebarcollapse = newpath?.includes("inner")
    const handleActive = (item) => {
        item.subStages !== null && setOpen(!open)
    }
    const TruncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ".."
        } else {
            return str
        }
    }
    return (
        <Box
            sx={{
                boxSizing: "border-box",
                position: "fixed",
                zIndex: "999",
                width: {
                    xs: "240px"
                },
                borderRight: "1px solid #E0E0E0",
                marginTop: {
                    xs: router.pathname == "/" ? "-5px" : "",
                    lg: router.pathname == "/" ? "19px" : ""
                },
                backgroundColor: "#fff"
            }}
        >
            {router.pathname == "/" ? (
                <Box sx={{ boxSizing: "border-box", px: 2 }}>
                    {sidebar?.map((item, index) => {
                        return (
                            <Box
                                sx={{
                                    boxSizing: "border-box",
                                    paddingX: "8px"
                                }}
                                key={item.name}
                                id={index}
                            >
                                <Paper
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        tabledata?.length > 0 &&
                                            handleActive(item)
                                    }}
                                    sx={{
                                        p: "10px 4px 10px 14px",
                                        cursor:
                                            tabledata?.length == 0 &&
                                            "Overview" !== item.name
                                                ? "not-allowed"
                                                : "pointer",
                                        background:
                                            "Overview" == item.name ||
                                            ("Projects" == item.name && open)
                                                ? "#1D4ED808"
                                                : "transparent",
                                        border:
                                            "Overview" == item.name &&
                                            "Projects" !== item.name
                                                ? `1px solid ${theme.palette.primary.main}`
                                                : " 1px solid transparent",
                                        borderRadius:
                                            "Overview" == item.name ||
                                            "Projects" == item.name
                                                ? "8px"
                                                : "",
                                        transition: "all 200ms ease-in-out",
                                        color: "rgba(0, 0, 0, 0.6)",
                                        mb: item.name === "Overview" ? 4 : "",
                                        "&:hover": {
                                            color: "#1E1E1E",
                                            background:
                                                ("Overview" == item.name &&
                                                    !open) ||
                                                ("Projects" == item.name &&
                                                    open)
                                                    ? "rgba(29, 78, 216, 0.03)"
                                                    : tabledata?.length > 0
                                                    ? "#F5F5F5"
                                                    : ""
                                        }
                                    }}
                                    variant="none"
                                    className="list"
                                >
                                    <Box>
                                        <Box
                                            className="routeText"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                boxSizing: "border-box"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    boxSizing: "border-box",
                                                    display: "flex",
                                                    alignItems: "center",

                                                    color:
                                                        "Overview" ==
                                                            item.name ||
                                                        ("Projects" ==
                                                            item.name &&
                                                            open)
                                                            ? "#1D4ED8"
                                                            : "#5C5C5C"
                                                }}
                                            >
                                                {item.svg}

                                                <Typography
                                                    aria-label={item?.name}
                                                    sx={{
                                                        fontSize:
                                                            theme.fontsize.sm,
                                                        lineHeight: "24px",
                                                        fontWeight: 600,
                                                        pl: "10px",

                                                        color:
                                                            "Overview" ==
                                                                item.name ||
                                                            ("Projects" ==
                                                                item.name &&
                                                                open)
                                                                ? "#1D4ED8"
                                                                : "#5C5C5C"
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Box>

                                            {item.name !== "Overview" && (
                                                <Box
                                                    sx={{
                                                        width: "40px",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        color:
                                                            ("Overview" ==
                                                                item.name &&
                                                                !open) ||
                                                            ("Projects" ==
                                                                item.name &&
                                                                open)
                                                                ? "#1D4ED8"
                                                                : "#5C5C5C"
                                                    }}
                                                >
                                                    <svg
                                                        className={`${
                                                            item.subStages !==
                                                                null && open
                                                                ? "rotate-45"
                                                                : "-rotate-45"
                                                        }`}
                                                        width={10}
                                                        height={5}
                                                        viewBox="0 0 10 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <title>
                                                            This is {item.name}{" "}
                                                            icon
                                                        </title>
                                                        <path
                                                            d="M0 0L5 5L10 0H0Z"
                                                            fill="currentColor"
                                                            fillOpacity="1"
                                                        />
                                                    </svg>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Paper>
                                {item.subStages !== null && (
                                    <Box
                                        sx={{
                                            boxSizing: "border-box",
                                            height: "calc(100vh - 270px)",
                                            overflow: "auto",
                                            mt: "16px"
                                        }}
                                        className="scrollbar"
                                    >
                                        <Collapse
                                            in={open}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            {tabledata?.status === false ? (
                                                <></>
                                            ) : (
                                                tabledata?.map(
                                                    (subItems, j) => {
                                                        return (
                                                            <Box
                                                                onClick={() => {
                                                                    setOpen(
                                                                        false
                                                                    )
                                                                    dispatch(
                                                                        setSidebarToggle(
                                                                            false
                                                                        )
                                                                    )
                                                                    dispatch(
                                                                        setProjectType(
                                                                            !(
                                                                                subItems?.project_template ==
                                                                                    "New Aloha Essentials Install" ||
                                                                                subItems?.project_template ==
                                                                                    "New Install"
                                                                            )
                                                                        )
                                                                    )
                                                                    dispatch(
                                                                        setCurrentproject(
                                                                            subItems
                                                                        )
                                                                    )
                                                                }}
                                                                id={`project${subItems.record_id_quickbase}`}
                                                                className="list"
                                                                key={
                                                                    subItems.record_id_quickbase
                                                                }
                                                                sx={{
                                                                    boxSizing:
                                                                        "border-box",
                                                                    border: "1px solid transparent",
                                                                    borderRadius:
                                                                        "8px",
                                                                    cursor: "pointer",
                                                                    transition:
                                                                        "all 200ms ease-in-out",
                                                                    color: theme
                                                                        .palette
                                                                        .secondary
                                                                        .main,

                                                                    "&:hover": {
                                                                        color: "#1E1E1E"
                                                                    }
                                                                }}
                                                            >
                                                                <Link
                                                                    sx={{
                                                                        textDecoration:
                                                                            "none",
                                                                        paddingTop:
                                                                            j ==
                                                                            0
                                                                                ? "16px"
                                                                                : "8px"
                                                                    }}
                                                                    className="noUnderline"
                                                                    href={`actions/${subItems.record_id_quickbase}`}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            boxSizing:
                                                                                "border-box",
                                                                            padding:
                                                                                "10px 18px",
                                                                            margin: ""
                                                                        }}
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                display:
                                                                                    "flex",
                                                                                alignItems:
                                                                                    "center",
                                                                                justifyContent:
                                                                                    "space-between"
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                    maxWidth:
                                                                                        "134px"
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    aria-label={
                                                                                        subItems?.customer_name
                                                                                    }
                                                                                    sx={{
                                                                                        display:
                                                                                            "flex",
                                                                                        alignItems:
                                                                                            "center",

                                                                                        justifyContent:
                                                                                            "space-between",
                                                                                        // fontSize:
                                                                                        //     "14px",
                                                                                        // lineHeight:
                                                                                        //     "22px",
                                                                                        fontSize:
                                                                                            "16px",
                                                                                        lineHeight:
                                                                                            "150%",
                                                                                        fontWeight: 600,
                                                                                        color: "#5C5C5C"
                                                                                    }}
                                                                                >
                                                                                    {TruncateString(
                                                                                        subItems.customer_name,
                                                                                        28
                                                                                    )}
                                                                                </Typography>
                                                                                <Typography
                                                                                    aria-label={
                                                                                        subItems?.project_template
                                                                                    }
                                                                                    sx={{
                                                                                        display:
                                                                                            "flex",
                                                                                        alignItems:
                                                                                            "center",

                                                                                        justifyContent:
                                                                                            "space-between",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        lineHeight:
                                                                                            "22px",

                                                                                        fontWeight: 400,
                                                                                        color: "#5C5C5C"
                                                                                    }}
                                                                                >
                                                                                    {subItems?.project_template ? (
                                                                                        subItems?.project_template
                                                                                    ) : (
                                                                                        <>
                                                                                            <Skeleton
                                                                                                component={
                                                                                                    "span"
                                                                                                }
                                                                                                width={
                                                                                                    190
                                                                                                }
                                                                                            />
                                                                                            <Skeleton
                                                                                                component={
                                                                                                    "span"
                                                                                                }
                                                                                                width={
                                                                                                    80
                                                                                                }
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </Typography>
                                                                            </Box>
                                                                            <svg
                                                                                className={`${"-rotate-45"}`}
                                                                                style={{
                                                                                    marginLeft:
                                                                                        "6px"
                                                                                }}
                                                                                width={
                                                                                    10
                                                                                }
                                                                                height={
                                                                                    5
                                                                                }
                                                                                viewBox="0 0 10 5"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <title>
                                                                                    This
                                                                                    is
                                                                                    collapse
                                                                                    icon
                                                                                </title>

                                                                                <path
                                                                                    d="M0 0L5 5L10 0H0Z"
                                                                                    fill="currentColor"
                                                                                    fillOpacity="1"
                                                                                />
                                                                            </svg>
                                                                        </Box>
                                                                    </Box>
                                                                </Link>
                                                            </Box>
                                                        )
                                                    }
                                                )
                                            )}
                                        </Collapse>
                                    </Box>
                                )}
                            </Box>
                        )
                    })}
                </Box>
            ) : (
                <Box
                    sx={{
                        boxSizing: "border-box",
                        mt: "24px"
                    }}
                >
                    <Box sx={{ boxSizing: "border-box" }}>
                        <Box sx={{ boxSizing: "border-box", px: "24px" }}>
                            {!currentproject?.project_template ? (
                                <>
                                    <Skeleton width={190} />
                                    <Skeleton width={190} />
                                </>
                            ) : (
                                <Box
                                    sx={{
                                        // cursor: "pointer",
                                        display: "flex",
                                        alignItems: "flex-start"
                                    }}
                                >
                                    <Tooltip
                                        title={currentproject?.customer_name}
                                        placement="right"
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    display:
                                                        currentproject
                                                            ?.customer_name
                                                            ?.length < 31
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
                                        <Box
                                            component={"span"}
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                lineHeight: "28px",
                                                color: "#1E1E1E",
                                                "&:hover": {
                                                    color: "#1e1e1e !important"
                                                }
                                            }}
                                        >
                                            {TruncateString(
                                                currentproject.customer_name,
                                                30
                                            )}
                                        </Box>
                                    </Tooltip>
                                </Box>
                            )}
                        </Box>
                        {!currentproject?.project_template ? (
                            <>
                                <Box
                                    sx={{
                                        boxSizing: "border-box",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        mt: "2px",
                                        px: "24px"
                                    }}
                                >
                                    <Skeleton width={190} />
                                    <Skeleton width={190} />
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        boxSizing: "border-box",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        mt: "2px",
                                        px: "24px"
                                    }}
                                >
                                    <Tooltip
                                        title={currentproject?.install_address}
                                        placement="right"
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    display:
                                                        currentproject?.shipping_address ==
                                                            " ,  " ||
                                                        currentproject?.install_address ==
                                                            " ,  " ||
                                                        currentproject
                                                            ?.install_address
                                                            ?.length < 21
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
                                        <Box
                                            component={"span"}
                                            sx={{
                                                color: "#737373",
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                py: "3px",
                                                fontWeight: 400
                                            }}
                                        >
                                            {TruncateString(
                                                currentproject.install_address_city,
                                                32
                                            )}
                                            {currentproject.install_address_city ===
                                            null
                                                ? "-"
                                                : ","}{" "}
                                            {TruncateString(
                                                currentproject.install_address_state,
                                                32
                                            )}
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box
                                    sx={{
                                        boxSizing: "border-box",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        mt: "2px",
                                        px: "24px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#737373",
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            fontWeight: "400",

                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {currentproject?.project_template ? (
                                            currentproject?.project_template
                                        ) : (
                                            <>
                                                <Skeleton
                                                    component={"span"}
                                                    width={190}
                                                />
                                                <Skeleton
                                                    component={"span"}
                                                    width={80}
                                                />
                                            </>
                                        )}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Divider
                        className="divider-col"
                        sx={{
                            borderColor: "#E0E0E0",
                            mx: "16px",
                            mt: "16px",
                            mb: !newpath.includes("inner=true") && "32px"
                        }}
                    />

                    {newpath.includes("inner=true") && (
                        <>
                            <Box
                                onClick={(e) => {
                                    e.stopPropagation()
                                    router.push({ query: { id: pid } })
                                }}
                                sx={{
                                    boxSizing: "border-box",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    mt: "16px",
                                    pr: {
                                        xs: "24px"
                                    },
                                    pl: {
                                        xs: "20px"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        mt: "-3.5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    <svg
                                        width={12}
                                        height={12}
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>
                                            This is Discovery collapse icon
                                        </title>
                                        <path
                                            d="M7.6875 2.625L4.3125 6L7.6875 9.375"
                                            stroke="#1D4ED8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Box>
                                <Typography
                                    sx={{
                                        color: "#1D4ED8",
                                        fontSize: "12px",
                                        lineHeight: "18px",
                                        fontWeight: "600",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {currentproject?.project_template ? (
                                        "Discovery"
                                    ) : (
                                        <>
                                            <Skeleton
                                                component={"span"}
                                                width={190}
                                            />
                                            <Skeleton
                                                component={"span"}
                                                width={80}
                                            />
                                        </>
                                    )}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    boxSizing: "border-box",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    mt: "4px",
                                    mb: "32px",
                                    pr: {
                                        xs: "24px"
                                    },
                                    pl: {
                                        xs: "32px"
                                    }
                                }}
                            >
                                <Typography
                                    aria-label={
                                        currentproject?.project_template
                                            ? getStageNames()
                                            : ""
                                    }
                                    sx={{
                                        color: "#1E1E1E",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        fontWeight: "600",

                                        textTransform: "capitalize"
                                    }}
                                >
                                    {currentproject?.project_template ? (
                                        getStageNames()
                                    ) : (
                                        <>
                                            <Skeleton
                                                component={"span"}
                                                width={190}
                                            />
                                            <Skeleton
                                                component={"span"}
                                                width={80}
                                            />
                                        </>
                                    )}
                                </Typography>
                            </Box>
                        </>
                    )}

                    <Box
                        id="sidebarscroll"
                        className="scrollbar"
                        sx={{
                            overflow: "auto",

                            height: {
                                xs: "calc(100vh - 340px)",
                                lg: "calc(100vh - 314px)"
                            },
                            px: 4,
                            mt: 4
                        }}
                    >
                        <Box disablePadding={true} sx={{}}>
                            {sideBarData.map((item, index) => {
                                return (
                                    <React.Fragment key={item.name}>
                                        {item.display ? (
                                            <Collapse
                                                sx={{
                                                    boxSizing: "border-box",
                                                    width: "100%"
                                                }}
                                                in={!sidebarcollapse}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box
                                                    onClick={(e) => {
                                                        !(
                                                            item.name ==
                                                                "Discovery" ||
                                                            item.name ==
                                                                "Documents"
                                                        ) &&
                                                            projectSignOffHandler() &&
                                                            dispatch(
                                                                setSidebarToggle(
                                                                    false
                                                                )
                                                            )

                                                        item.name ===
                                                        "Project Sign Off"
                                                            ? projectSignOffHandler() ===
                                                              true
                                                                ? handleSubStage(
                                                                      index,
                                                                      item
                                                                  )
                                                                : ""
                                                            : handleSubStage(
                                                                  index,
                                                                  item
                                                              )
                                                    }}
                                                    sx={{
                                                        boxSizing: "border-box",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "center",
                                                        width: "100%",
                                                        alignItems: "center"
                                                    }}
                                                    disablePadding={true}
                                                    disabled={
                                                        item.name ===
                                                        "Project Sign Off"
                                                            ? !projectSignOffHandler()
                                                            : false
                                                    }
                                                >
                                                    {item.name ==
                                                    "Documents" ? (
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    "relative",
                                                                mt: newpath.includes(
                                                                    "discovery"
                                                                )
                                                                    ? 7
                                                                    : "",
                                                                background:
                                                                    newpath.includes(
                                                                        item.name.toLowerCase()
                                                                    )
                                                                        ? "#1D4ED808"
                                                                        : "transparent",
                                                                border: "1px solid transparent",

                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                mb: {
                                                                    xs: "16px"
                                                                },
                                                                py: {
                                                                    xs: "11.5px"
                                                                },
                                                                px: {
                                                                    xs: "15.5px"
                                                                },
                                                                borderRadius:
                                                                    "8px",
                                                                width: "100%",
                                                                alignItems:
                                                                    "center",
                                                                color: newpath.includes(
                                                                    item.name.toLowerCase()
                                                                )
                                                                    ? theme
                                                                          .palette
                                                                          .primary
                                                                          .main
                                                                    : "#5C5C5C",
                                                                "&:hover": {
                                                                    color: newpath.includes(
                                                                        item.name.toLowerCase()
                                                                    )
                                                                        ? theme
                                                                              .palette
                                                                              .primary
                                                                              .main
                                                                        : "#1E1E1E",
                                                                    backgroundColor:
                                                                        newpath.includes(
                                                                            item.name.toLowerCase()
                                                                        )
                                                                            ? "#1D4ED808"
                                                                            : "#F5F5F5"
                                                                }
                                                            }}
                                                        >
                                                            <Typography
                                                                aria-label={
                                                                    item.name
                                                                }
                                                                sx={{
                                                                    fontSize:
                                                                        "14px",
                                                                    lineHeight:
                                                                        {
                                                                            xs: "22px"
                                                                        },
                                                                    fontWeight:
                                                                        "600"
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                            <svg
                                                                className={`${
                                                                    newpath.includes(
                                                                        item.name.toLowerCase()
                                                                    )
                                                                        ? "rotate-45"
                                                                        : "-rotate-45"
                                                                }`}
                                                                width={10}
                                                                height={5}
                                                                viewBox="0 0 10 5"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>
                                                                    This is{" "}
                                                                    {item.name}{" "}
                                                                    collapse
                                                                    icon
                                                                </title>
                                                                <path
                                                                    d="M0 0L5 5L10 0H0Z"
                                                                    fill="currentColor"
                                                                    fillOpacity="1"
                                                                />
                                                            </svg>
                                                        </Box>
                                                    ) : item.name ==
                                                      "Discovery" ? (
                                                        <Box
                                                            sx={{
                                                                background:
                                                                    newpath ==
                                                                    item.route +
                                                                        "/" +
                                                                        pid
                                                                        ? theme
                                                                              .palette
                                                                              .primary
                                                                              .main
                                                                        : newpath.includes(
                                                                              item.name.toLowerCase()
                                                                          )
                                                                        ? "#1D4ED808"
                                                                        : "transparent",
                                                                border: "1px solid transparent",

                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                mb: {
                                                                    xs: "15.9px"
                                                                },
                                                                mt: "17px",
                                                                py: {
                                                                    xs: "11.5px"
                                                                },

                                                                px: {
                                                                    xs: "15.5px"
                                                                },
                                                                borderRadius:
                                                                    "8px",
                                                                width: "100%",
                                                                alignItems:
                                                                    "center",
                                                                color:
                                                                    newpath ==
                                                                    item.route +
                                                                        "/" +
                                                                        pid
                                                                        ? theme
                                                                              .palette
                                                                              .primary
                                                                              .main
                                                                        : newpath.includes(
                                                                              item.name.toLowerCase()
                                                                          )
                                                                        ? `#1D4ED8`
                                                                        : "#5C5C5C",
                                                                "&:hover": {
                                                                    color:
                                                                        newpath ==
                                                                        item.route +
                                                                            "/" +
                                                                            pid
                                                                            ? theme
                                                                                  .palette
                                                                                  .primary
                                                                                  .main
                                                                            : "#1E1E1E",
                                                                    backgroundColor:
                                                                        newpath ==
                                                                        item.route +
                                                                            "/" +
                                                                            pid
                                                                            ? "#1D4ED808"
                                                                            : "#F5F5F5"
                                                                }
                                                            }}
                                                        >
                                                            <Box>
                                                                <Box
                                                                    sx={{
                                                                        fontSize:
                                                                            "14px",
                                                                        lineHeight:
                                                                            {
                                                                                xs: "22px"
                                                                            },
                                                                        fontWeight:
                                                                            "600"
                                                                    }}
                                                                >
                                                                    <a
                                                                        className={
                                                                            "noUnderline"
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>

                                                                    {item?.percentage !==
                                                                        null && (
                                                                        <>
                                                                            {discoveryloading ? (
                                                                                <>
                                                                                    <Box
                                                                                        component={
                                                                                            "span"
                                                                                        }
                                                                                        sx={{
                                                                                            position:
                                                                                                "relative",
                                                                                            top: "5px",
                                                                                            left: "13px"
                                                                                        }}
                                                                                        className="snippet"
                                                                                        data-title=".dot-elastic"
                                                                                    >
                                                                                        <Box className="stage">
                                                                                            <Box className="dot-elastic"></Box>
                                                                                        </Box>
                                                                                    </Box>
                                                                                </>
                                                                            ) : (
                                                                                <Typography
                                                                                    aria-label={
                                                                                        item?.percentage ==
                                                                                        undefined
                                                                                            ? 0 +
                                                                                              "%"
                                                                                            : item?.percentage +
                                                                                              "%"
                                                                                    }
                                                                                    sx={{
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        mt: "4px",
                                                                                        lineHeight:
                                                                                            {
                                                                                                xs: "18px"
                                                                                            },
                                                                                        fontWeight:
                                                                                            "400",
                                                                                        color: newpath.includes(
                                                                                            item.name.toLowerCase()
                                                                                        )
                                                                                            ? "#727272"
                                                                                            : "#5C5C5C"
                                                                                    }}
                                                                                >
                                                                                    {item?.percentage ==
                                                                                    undefined
                                                                                        ? 0 +
                                                                                          "%"
                                                                                        : item?.percentage +
                                                                                          "%"}
                                                                                </Typography>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Box>
                                                            </Box>

                                                            {item?.subStages && (
                                                                <svg
                                                                    className={`${
                                                                        newpath.includes(
                                                                            item.name.toLowerCase()
                                                                        )
                                                                            ? "rotate-45"
                                                                            : "-rotate-45"
                                                                    }`}
                                                                    width={10}
                                                                    height={5}
                                                                    viewBox="0 0 10 5"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>
                                                                        This is{" "}
                                                                        {
                                                                            item.name
                                                                        }{" "}
                                                                        collapse
                                                                        icon
                                                                    </title>

                                                                    <path
                                                                        d="M0 0L5 5L10 0H0Z"
                                                                        fill="currentColor"
                                                                        fillOpacity="1"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </Box>
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    "relative",
                                                                cursor:
                                                                    item.name ===
                                                                    "Project Sign Off"
                                                                        ? projectSignOffHandler()
                                                                            ? "pointer"
                                                                            : "not-allowed"
                                                                        : "pointer",
                                                                opacity:
                                                                    item.name ===
                                                                    "Project Sign Off"
                                                                        ? projectSignOffHandler()
                                                                            ? "1"
                                                                            : "0.4"
                                                                        : "1",

                                                                mt:
                                                                    item.name ===
                                                                        "Project Sign Off" &&
                                                                    router.pathname.includes(
                                                                        "documents"
                                                                    )
                                                                        ? 2
                                                                        : "0px",
                                                                background:
                                                                    newpath ==
                                                                        item.route +
                                                                            "/" +
                                                                            pid ||
                                                                    (!(
                                                                        newpath.includes(
                                                                            "documents"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "discovery"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "schedule"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "project-sign-off"
                                                                        )
                                                                    ) &&
                                                                        item.name ==
                                                                            "Actions")
                                                                        ? "#1D4ED808"
                                                                        : "transparent",
                                                                border:
                                                                    newpath ==
                                                                        item.route +
                                                                            "/" +
                                                                            pid ||
                                                                    (!(
                                                                        newpath.includes(
                                                                            "documents"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "discovery"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "schedule"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "project-sign-off"
                                                                        )
                                                                    ) &&
                                                                        item.name ==
                                                                            "Actions")
                                                                        ? `1px solid ${theme.palette.primary.main}`
                                                                        : "1px solid transparent",

                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                mb: {
                                                                    xs:
                                                                        item.name !==
                                                                            "Schedule" &&
                                                                        "16px"
                                                                },
                                                                py: {
                                                                    xs: "11.5px"
                                                                },
                                                                px: {
                                                                    xs: "15.5px"
                                                                },
                                                                borderRadius:
                                                                    "8px",
                                                                width: "100%",
                                                                alignItems:
                                                                    "start",
                                                                color:
                                                                    newpath ==
                                                                        item.route +
                                                                            "/" +
                                                                            pid ||
                                                                    (!(
                                                                        newpath.includes(
                                                                            "documents"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "discovery"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "schedule"
                                                                        ) ||
                                                                        newpath.includes(
                                                                            "project-sign-off"
                                                                        )
                                                                    ) &&
                                                                        item.name ==
                                                                            "Actions")
                                                                        ? theme
                                                                              .palette
                                                                              .primary
                                                                              .main
                                                                        : "#5C5C5C",
                                                                "&:hover":
                                                                    item.name ===
                                                                    "Project Sign Off"
                                                                        ? projectSignOffHandler()
                                                                            ? {
                                                                                  color:
                                                                                      newpath ==
                                                                                          item.route +
                                                                                              "/" +
                                                                                              pid ||
                                                                                      (!(
                                                                                          newpath.includes(
                                                                                              "documents"
                                                                                          ) ||
                                                                                          newpath.includes(
                                                                                              "discovery"
                                                                                          ) ||
                                                                                          newpath.includes(
                                                                                              "schedule"
                                                                                          ) ||
                                                                                          newpath.includes(
                                                                                              "project-sign-off"
                                                                                          )
                                                                                      ) &&
                                                                                          item.name ==
                                                                                              "Actions")
                                                                                          ? theme
                                                                                                .palette
                                                                                                .primary
                                                                                                .main
                                                                                          : "#1E1E1E",
                                                                                  backgroundColor:
                                                                                      newpath ==
                                                                                          item.route +
                                                                                              "/" +
                                                                                              pid ||
                                                                                      (!(
                                                                                          newpath.includes(
                                                                                              "documents"
                                                                                          ) ||
                                                                                          newpath.includes(
                                                                                              "discovery"
                                                                                          ) ||
                                                                                          newpath.includes(
                                                                                              "schedule"
                                                                                          ) ||
                                                                                          newpath.includes(
                                                                                              "project-sign-off"
                                                                                          )
                                                                                      ) &&
                                                                                          item.name ==
                                                                                              "Actions")
                                                                                          ? "#1D4ED808"
                                                                                          : "#F5F5F5"
                                                                              }
                                                                            : ""
                                                                        : {
                                                                              color:
                                                                                  newpath ==
                                                                                      item.route +
                                                                                          "/" +
                                                                                          pid ||
                                                                                  (!(
                                                                                      newpath.includes(
                                                                                          "documents"
                                                                                      ) ||
                                                                                      newpath.includes(
                                                                                          "discovery"
                                                                                      ) ||
                                                                                      newpath.includes(
                                                                                          "schedule"
                                                                                      ) ||
                                                                                      newpath.includes(
                                                                                          "project-sign-off"
                                                                                      )
                                                                                  ) &&
                                                                                      item.name ==
                                                                                          "Actions")
                                                                                      ? theme
                                                                                            .palette
                                                                                            .primary
                                                                                            .main
                                                                                      : "#1E1E1E",
                                                                              backgroundColor:
                                                                                  newpath ==
                                                                                      item.route +
                                                                                          "/" +
                                                                                          pid ||
                                                                                  (!(
                                                                                      newpath.includes(
                                                                                          "documents"
                                                                                      ) ||
                                                                                      newpath.includes(
                                                                                          "discovery"
                                                                                      ) ||
                                                                                      newpath.includes(
                                                                                          "schedule"
                                                                                      ) ||
                                                                                      newpath.includes(
                                                                                          "project-sign-off"
                                                                                      )
                                                                                  ) &&
                                                                                      item.name ==
                                                                                          "Actions")
                                                                                      ? "#1D4ED808"
                                                                                      : "#F5F5F5"
                                                                          }
                                                            }}
                                                        >
                                                            <Box>
                                                                <Box
                                                                    sx={{
                                                                        fontSize:
                                                                            "14px",
                                                                        lineHeight:
                                                                            {
                                                                                xs: "22px"
                                                                            },
                                                                        fontWeight:
                                                                            "600"
                                                                    }}
                                                                >
                                                                    <a
                                                                        className={
                                                                            "noUnderline"
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>

                                                                    {item?.percentage !==
                                                                        null &&
                                                                        item.name !==
                                                                            "Project Sign Off" && (
                                                                            <Typography
                                                                                aria-label={`${item?.percentage} %`}
                                                                                sx={{
                                                                                    fontSize:
                                                                                        "12px",
                                                                                    mt: "4px",
                                                                                    lineHeight:
                                                                                        {
                                                                                            xs: "18px"
                                                                                        },
                                                                                    fontWeight:
                                                                                        "400"
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item?.percentage
                                                                                }

                                                                                %
                                                                            </Typography>
                                                                        )}
                                                                </Box>
                                                            </Box>
                                                            {item?.subStages && (
                                                                <svg
                                                                    width={18}
                                                                    height={18}
                                                                    viewBox="0 0 18 18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>
                                                                        This is{" "}
                                                                        {
                                                                            item.name
                                                                        }{" "}
                                                                        collapse
                                                                        icon
                                                                    </title>
                                                                    <path
                                                                        d="M6.42773 14.1412L11.5706 8.99833L6.42773 3.85547L6.42773 14.1412Z"
                                                                        fill="#5C5C5C"
                                                                    />
                                                                </svg>
                                                            )}

                                                            {item.name ===
                                                                "Project Sign Off" &&
                                                                projectSignOffHandler() ===
                                                                    false && (
                                                                    <Box
                                                                        sx={{
                                                                            position:
                                                                                "absolute",
                                                                            top: "15px",
                                                                            right: 15
                                                                        }}
                                                                    >
                                                                        <Tooltip
                                                                            aria-label=""
                                                                            title="Please fill all the data in above stages."
                                                                            placement="bottom"
                                                                            componentsProps={{
                                                                                tooltip:
                                                                                    {
                                                                                        sx: {
                                                                                            display:
                                                                                                "flex",
                                                                                            alignItems:
                                                                                                "end",

                                                                                            color: "#fff",
                                                                                            fontSize:
                                                                                                "12px",
                                                                                            padding:
                                                                                                "6px 12px",
                                                                                            fontWeight: 400,
                                                                                            lineHeight:
                                                                                                "18px"
                                                                                        }
                                                                                    }
                                                                            }}
                                                                            arrow={
                                                                                true
                                                                            }
                                                                        >
                                                                            <Box
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    e.stopPropagation()
                                                                                }
                                                                                component={
                                                                                    "span"
                                                                                }
                                                                                sx={{
                                                                                    cursor: "pointer",
                                                                                    mt: -1
                                                                                }}
                                                                            >
                                                                                <svg
                                                                                    width={
                                                                                        18
                                                                                    }
                                                                                    height={
                                                                                        18
                                                                                    }
                                                                                    viewBox="0 0 18 18"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <title>
                                                                                        This
                                                                                        is{" "}
                                                                                        {
                                                                                            item.name
                                                                                        }{" "}
                                                                                        tooltip
                                                                                        icon
                                                                                    </title>
                                                                                    <path
                                                                                        d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                                                        fill="#757575"
                                                                                    />
                                                                                </svg>
                                                                            </Box>
                                                                        </Tooltip>
                                                                    </Box>
                                                                )}
                                                        </Box>
                                                        // {/* </Box> */}
                                                    )}
                                                </Box>
                                            </Collapse>
                                        ) : (
                                            ""
                                        )}

                                        <Box
                                            sx={{ width: "100%" }}
                                            disablePadding={true}
                                        >
                                            {discoveryloading &&
                                            SubStageMaintain(index, item) &&
                                            newpath.includes("discovery")
                                                ? [1, 2, 3, 4].map((it) => (
                                                      <Box
                                                          sx={{
                                                              display: "flex",
                                                              justifyContent:
                                                                  "space-between",
                                                              alignItems:
                                                                  "center",
                                                              border: "1px solid #D3D3D3",
                                                              width: "100%",
                                                              mx: "auto",
                                                              py: "13.5px",
                                                              px: "10px",
                                                              borderRadius:
                                                                  "8px",
                                                              mb: 2
                                                          }}
                                                          key={it}
                                                      >
                                                          <Box>
                                                              <Skeleton
                                                                  variant="circular"
                                                                  width={20}
                                                                  height={20}
                                                              />
                                                          </Box>
                                                          <Box
                                                              sx={{
                                                                  width: "100%"
                                                              }}
                                                          >
                                                              <Skeleton
                                                                  sx={{
                                                                      height: "20px",
                                                                      mx: "15px"
                                                                  }}
                                                              />
                                                              <Skeleton
                                                                  sx={{
                                                                      width: "20%",
                                                                      height: "15px",
                                                                      mx: "15px"
                                                                  }}
                                                              />
                                                          </Box>
                                                      </Box>
                                                  ))
                                                : item[getsubstage(item)]?.map(
                                                      (_item, idx) => {
                                                          return (
                                                              <React.Fragment
                                                                  key={
                                                                      _item.name
                                                                  }
                                                              >
                                                                  <Collapse
                                                                      sx={{
                                                                          width: "100%"
                                                                      }}
                                                                      in={SubStageMaintain(
                                                                          index,
                                                                          item
                                                                      )}
                                                                      timeout="auto"
                                                                      unmountOnExit
                                                                  >
                                                                      <Box
                                                                          disabled={
                                                                              _item.name ==
                                                                                  "Confirmation" &&
                                                                              reviewhandler(
                                                                                  item.name
                                                                              )
                                                                          }
                                                                          onClick={(
                                                                              e
                                                                          ) => {
                                                                              handleSubStageInner(
                                                                                  e,
                                                                                  _item
                                                                              )
                                                                          }}
                                                                          sx={{
                                                                              width: "100%",
                                                                              cursor:
                                                                                  _item.name ==
                                                                                      "Confirmation" &&
                                                                                  !reviewhandler(
                                                                                      item.name
                                                                                  )
                                                                                      ? "pointer"
                                                                                      : _item.name !==
                                                                                        "Confirmation"
                                                                                      ? "pointer"
                                                                                      : "default",
                                                                              pointerEvents:
                                                                                  _item.name ==
                                                                                      "Confirmation" &&
                                                                                  !reviewhandler(
                                                                                      item.name
                                                                                  )
                                                                                      ? "all"
                                                                                      : _item.name !==
                                                                                        "Confirmation"
                                                                                      ? "all"
                                                                                      : "none"
                                                                          }}
                                                                          disablePadding={
                                                                              true
                                                                          }
                                                                      >
                                                                          <Box
                                                                              sx={{
                                                                                  background:
                                                                                      newpath ==
                                                                                          _item.route +
                                                                                              "/" +
                                                                                              pid ||
                                                                                      newpath ==
                                                                                          _item.route +
                                                                                              "/" +
                                                                                              pid +
                                                                                              "?inner=true"
                                                                                          ? "#1D4ED808"
                                                                                          : "transparent",
                                                                                  border:
                                                                                      newpath ==
                                                                                          _item.route +
                                                                                              "/" +
                                                                                              pid ||
                                                                                      newpath ==
                                                                                          _item.route +
                                                                                              "/" +
                                                                                              pid +
                                                                                              "?inner=true"
                                                                                          ? `1px solid ${theme.palette.primary.main}`
                                                                                          : "1px solid transparent",
                                                                                  display:
                                                                                      "flex",
                                                                                  justifyContent:
                                                                                      "space-between",
                                                                                  mt: "1px",
                                                                                  mb: {
                                                                                      xs: "6.9px"
                                                                                  },
                                                                                  py: {
                                                                                      xs: "11.9px"
                                                                                  },
                                                                                  px: {
                                                                                      xs: "16px"
                                                                                  },
                                                                                  //   ml: "8px",
                                                                                  borderRadius:
                                                                                      "8px",
                                                                                  width: "100%",
                                                                                  alignItems:
                                                                                      "flex-start",
                                                                                  color:
                                                                                      newpath ==
                                                                                          _item.route +
                                                                                              "/" +
                                                                                              pid ||
                                                                                      newpath ==
                                                                                          _item.route +
                                                                                              "/" +
                                                                                              pid +
                                                                                              "?inner=true"
                                                                                          ? theme
                                                                                                .palette
                                                                                                .primary
                                                                                                .main
                                                                                          : _item?.percentage >=
                                                                                            100
                                                                                          ? "#1E1E1E"
                                                                                          : "#5C5C5C",

                                                                                  "&:hover":
                                                                                      {
                                                                                          background:
                                                                                              newpath ==
                                                                                                  _item.route +
                                                                                                      "/" +
                                                                                                      pid ||
                                                                                              newpath ==
                                                                                                  _item.route +
                                                                                                      "/" +
                                                                                                      pid +
                                                                                                      "?inner=true"
                                                                                                  ? "#1D4ED808"
                                                                                                  : "#F5F5F5",
                                                                                          color:
                                                                                              newpath ==
                                                                                                  _item.route +
                                                                                                      "/" +
                                                                                                      pid ||
                                                                                              newpath ==
                                                                                                  _item.route +
                                                                                                      "/" +
                                                                                                      pid +
                                                                                                      "?inner=true"
                                                                                                  ? theme
                                                                                                        .palette
                                                                                                        .primary
                                                                                                        .main
                                                                                                  : "#1E1E1E"
                                                                                      }
                                                                              }}
                                                                          >
                                                                              {_item.name !=
                                                                                  "Confirmation" &&
                                                                                  _item?.percentage >=
                                                                                      100 && (
                                                                                      <Box
                                                                                          sx={{
                                                                                              mt: 1,
                                                                                              mr: "8px",
                                                                                              flexShrink:
                                                                                                  "0",
                                                                                              width: "20px",
                                                                                              height: "20px",
                                                                                              borderRadius:
                                                                                                  "50%",
                                                                                              display:
                                                                                                  "flex",
                                                                                              flexDirection:
                                                                                                  "column",
                                                                                              alignItems:
                                                                                                  "center",
                                                                                              justifyContent:
                                                                                                  "center"
                                                                                          }}
                                                                                      >
                                                                                          <svg
                                                                                              width={
                                                                                                  20
                                                                                              }
                                                                                              height={
                                                                                                  20
                                                                                              }
                                                                                              viewBox="0 0 16 16"
                                                                                              fill="none"
                                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                                          >
                                                                                              <title>
                                                                                                  This
                                                                                                  is{" "}
                                                                                                  {
                                                                                                      _item.name
                                                                                                  }{" "}
                                                                                                  status
                                                                                                  icon
                                                                                              </title>

                                                                                              <rect
                                                                                                  width={
                                                                                                      16
                                                                                                  }
                                                                                                  height={
                                                                                                      16
                                                                                                  }
                                                                                                  rx={
                                                                                                      8
                                                                                                  }
                                                                                                  fill={
                                                                                                      "#4CAF50"
                                                                                                  }
                                                                                              />
                                                                                              <path
                                                                                                  d="M4.7998 8.67015L6.76629 10.7992L11.1998 5.19922"
                                                                                                  stroke="white"
                                                                                                  strokeWidth="1.5"
                                                                                                  strokeLinecap="round"
                                                                                                  strokeLinejoin="round"
                                                                                              />
                                                                                          </svg>
                                                                                      </Box>
                                                                                  )}

                                                                              <Box
                                                                                  sx={{
                                                                                      width: "100%",
                                                                                      display:
                                                                                          "flex",
                                                                                      justifyContent:
                                                                                          "space-between",
                                                                                      alignItems:
                                                                                          "center"
                                                                                  }}
                                                                              >
                                                                                  <Box
                                                                                      sx={{
                                                                                          fontSize:
                                                                                              "14px",
                                                                                          lineHeight:
                                                                                              {
                                                                                                  xs: "22px"
                                                                                              },
                                                                                          fontWeight:
                                                                                              "600",
                                                                                          maxWidth:
                                                                                              _item.name ===
                                                                                              "Back Office Computer & Printer"
                                                                                                  ? "117px"
                                                                                                  : "100%"
                                                                                      }}
                                                                                  >
                                                                                      <a
                                                                                          aria-label={
                                                                                              _item?.name
                                                                                          }
                                                                                          className={
                                                                                              "noUnderline"
                                                                                          }
                                                                                      >
                                                                                          {
                                                                                              _item.name
                                                                                          }

                                                                                          {item?.name ===
                                                                                              "Documents" && (
                                                                                              <>
                                                                                                  <br />{" "}
                                                                                                  {_item.name !==
                                                                                                      "Documents Overview" && (
                                                                                                      <Box
                                                                                                          sx={{
                                                                                                              pt: "2px",
                                                                                                              fontSize:
                                                                                                                  "12px",
                                                                                                              color: "#5C5C5C"
                                                                                                          }}
                                                                                                      >
                                                                                                          {discoveryloading ? (
                                                                                                              <>
                                                                                                                  <Box
                                                                                                                      component={
                                                                                                                          "span"
                                                                                                                      }
                                                                                                                      sx={{
                                                                                                                          position:
                                                                                                                              "relative",
                                                                                                                          top: "5px",
                                                                                                                          left: "13px"
                                                                                                                      }}
                                                                                                                      className="snippet"
                                                                                                                      data-title=".dot-elastic"
                                                                                                                  >
                                                                                                                      <Box className="stage">
                                                                                                                          <Box className="dot-elastic"></Box>
                                                                                                                      </Box>
                                                                                                                  </Box>
                                                                                                              </>
                                                                                                          ) : System(
                                                                                                                _item.type
                                                                                                            ) ? (
                                                                                                              "Required"
                                                                                                          ) : (
                                                                                                              "Optional"
                                                                                                          )}
                                                                                                      </Box>
                                                                                                  )}{" "}
                                                                                              </>
                                                                                          )}
                                                                                      </a>
                                                                                      {_item?.percentage !==
                                                                                          null && (
                                                                                          <Typography
                                                                                              sx={{
                                                                                                  fontSize:
                                                                                                      "12px",
                                                                                                  color:
                                                                                                      _item?.percentage >=
                                                                                                      100
                                                                                                          ? "#1E1E1E"
                                                                                                          : "#5C5C5C",
                                                                                                  mt: "2px",
                                                                                                  lineHeight:
                                                                                                      {
                                                                                                          xs: "18px"
                                                                                                      },
                                                                                                  fontWeight:
                                                                                                      "400"
                                                                                              }}
                                                                                          >
                                                                                              {
                                                                                                  _item?.percentage
                                                                                              }

                                                                                              %
                                                                                          </Typography>
                                                                                      )}
                                                                                  </Box>
                                                                                  {_item?.subStages && (
                                                                                      <svg
                                                                                          width={
                                                                                              18
                                                                                          }
                                                                                          height={
                                                                                              18
                                                                                          }
                                                                                          viewBox="0 0 18 18"
                                                                                          fill="none"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                      >
                                                                                          <title>
                                                                                              This
                                                                                              is{" "}
                                                                                              {
                                                                                                  _item.name
                                                                                              }{" "}
                                                                                              collapse
                                                                                              icon
                                                                                          </title>

                                                                                          <path
                                                                                              d="M6.42773 14.1412L11.5706 8.99833L6.42773 3.85547L6.42773 14.1412Z"
                                                                                              fill={
                                                                                                  newpath ==
                                                                                                      _item.route +
                                                                                                          "/" +
                                                                                                          pid ||
                                                                                                  newpath ==
                                                                                                      _item.route +
                                                                                                          "/" +
                                                                                                          pid +
                                                                                                          "?inner=true"
                                                                                                      ? theme
                                                                                                            .palette
                                                                                                            .primary
                                                                                                            .main
                                                                                                      : "#5C5C5C"
                                                                                              }
                                                                                          />
                                                                                      </svg>
                                                                                  )}
                                                                              </Box>
                                                                          </Box>
                                                                      </Box>
                                                                  </Collapse>

                                                                  {_item?.subStages?.map(
                                                                      (
                                                                          _inner,
                                                                          i
                                                                      ) => {
                                                                          return (
                                                                              <React.Fragment
                                                                                  key={
                                                                                      _inner.name
                                                                                  }
                                                                              >
                                                                                  <Collapse
                                                                                      key={
                                                                                          _inner.name
                                                                                      }
                                                                                      sx={{
                                                                                          width: "100%"
                                                                                      }}
                                                                                      in={subStageInnerMaintain(
                                                                                          _item,
                                                                                          idx
                                                                                      )}
                                                                                      timeout="auto"
                                                                                      unmountOnExit
                                                                                  >
                                                                                      {newpath.includes(
                                                                                          "inner"
                                                                                      ) ? (
                                                                                          <Box
                                                                                              onClick={() => {
                                                                                                  dispatch(
                                                                                                      setSidebarToggle(
                                                                                                          false
                                                                                                      )
                                                                                                  )
                                                                                                  _inner?.subStages !==
                                                                                                  null
                                                                                                      ? handleSubStageInternal(
                                                                                                            _item,
                                                                                                            i,
                                                                                                            _inner
                                                                                                        )
                                                                                                      : _inner.name ===
                                                                                                            "Confirmation" ||
                                                                                                        _inner.name.includes(
                                                                                                            "Confirm"
                                                                                                        )
                                                                                                      ? confirmationHandler(
                                                                                                            idx
                                                                                                        ) ===
                                                                                                        true
                                                                                                          ? handleSubStageInternal(
                                                                                                                _item,
                                                                                                                i,
                                                                                                                _inner,
                                                                                                                true
                                                                                                            )
                                                                                                          : null
                                                                                                      : !ncrManage &&
                                                                                                        _inner.name ===
                                                                                                            "NCR Managed Network With NSS"
                                                                                                      ? handleSubStageInternal(
                                                                                                            _item,
                                                                                                            i,
                                                                                                            _inner,
                                                                                                            true
                                                                                                        )
                                                                                                      : _inner.name !==
                                                                                                            "NCR Managed Network With NSS" &&
                                                                                                        handleSubStageInternal(
                                                                                                            _item,
                                                                                                            i,
                                                                                                            _inner,
                                                                                                            true
                                                                                                        )
                                                                                              }}
                                                                                              disabled={
                                                                                                  _inner.name ===
                                                                                                      "Confirmation" ||
                                                                                                  _inner.name.includes(
                                                                                                      "Confirm"
                                                                                                  )
                                                                                                      ? confirmationHandler(
                                                                                                            idx
                                                                                                        ) ===
                                                                                                        true
                                                                                                          ? false
                                                                                                          : true
                                                                                                      : ncrManage &&
                                                                                                        _inner.name ===
                                                                                                            "NCR Managed Network With NSS"
                                                                                              }
                                                                                              sx={{
                                                                                                  opacity:
                                                                                                      _inner.name ===
                                                                                                          "Confirmation" ||
                                                                                                      _inner.name.includes(
                                                                                                          "Confirm"
                                                                                                      )
                                                                                                          ? confirmationHandler(
                                                                                                                idx
                                                                                                            )
                                                                                                              ? 1
                                                                                                              : 0.4
                                                                                                          : ncrManage &&
                                                                                                            _inner.name ===
                                                                                                                "NCR Managed Network With NSS"
                                                                                                          ? 0.4
                                                                                                          : 1,
                                                                                                  pt: "1px",
                                                                                                  width: "100%",
                                                                                                  cursor:
                                                                                                      _inner.name ===
                                                                                                          "Confirmation" ||
                                                                                                      _inner.name.includes(
                                                                                                          "Confirm"
                                                                                                      )
                                                                                                          ? confirmationHandler(
                                                                                                                idx
                                                                                                            )
                                                                                                              ? "pointer"
                                                                                                              : "not-allowed"
                                                                                                          : ncrManage &&
                                                                                                            _inner.name ===
                                                                                                                "NCR Managed Network With NSS"
                                                                                                          ? "not-allowed"
                                                                                                          : "pointer",
                                                                                                  pb:
                                                                                                      _inner.name ==
                                                                                                      "Confirmation"
                                                                                                          ? "74px"
                                                                                                          : "",
                                                                                                  pointerEvents:
                                                                                                      ncrManage &&
                                                                                                      _inner.name ===
                                                                                                          "NCR Managed Network With NSS" &&
                                                                                                      "none"
                                                                                              }}
                                                                                              disablePadding={
                                                                                                  true
                                                                                              }
                                                                                          >
                                                                                              <Box
                                                                                                  sx={{
                                                                                                      background:
                                                                                                          newpath ==
                                                                                                          _inner.route +
                                                                                                              "/" +
                                                                                                              pid +
                                                                                                              "?inner=true"
                                                                                                              ? "#1D4ED808"
                                                                                                              : "transparent",
                                                                                                      border:
                                                                                                          newpath ==
                                                                                                          _inner.route +
                                                                                                              "/" +
                                                                                                              pid +
                                                                                                              "?inner=true"
                                                                                                              ? `1px solid ${theme.palette.primary.main}`
                                                                                                              : "1px solid transparent",
                                                                                                      display:
                                                                                                          "flex",
                                                                                                      justifyContent:
                                                                                                          "space-between",
                                                                                                      mb:
                                                                                                          _inner.name ==
                                                                                                          "Confirmation"
                                                                                                              ? 0
                                                                                                              : "14.3px",
                                                                                                      pt:
                                                                                                          _inner.name ==
                                                                                                          "Confirmation"
                                                                                                              ? "11.5px"
                                                                                                              : "12.04px",
                                                                                                      pb:
                                                                                                          newpath ==
                                                                                                              _inner.route +
                                                                                                                  "/" +
                                                                                                                  pid +
                                                                                                                  "?inner=true" &&
                                                                                                          _inner.name ==
                                                                                                              "Confirmation"
                                                                                                              ? "12.5px"
                                                                                                              : "10px",
                                                                                                      px: "15.5px",
                                                                                                      borderRadius:
                                                                                                          "8px",
                                                                                                      width: "100%",
                                                                                                      alignItems:
                                                                                                          "start",
                                                                                                      color:
                                                                                                          newpath ==
                                                                                                          _inner.route +
                                                                                                              "/" +
                                                                                                              pid +
                                                                                                              "?inner=true"
                                                                                                              ? theme
                                                                                                                    .palette
                                                                                                                    .primary
                                                                                                                    .main
                                                                                                              : _inner?.percentage ==
                                                                                                                100
                                                                                                              ? "#1E1E1E"
                                                                                                              : "#5C5C5C",
                                                                                                      "&:hover":
                                                                                                          {
                                                                                                              background:
                                                                                                                  newpath ==
                                                                                                                  _inner.route +
                                                                                                                      "/" +
                                                                                                                      pid +
                                                                                                                      "?inner=true"
                                                                                                                      ? "#1D4ED808"
                                                                                                                      : "#F5F5F5",
                                                                                                              color:
                                                                                                                  newpath ==
                                                                                                                  _inner.route +
                                                                                                                      "/" +
                                                                                                                      pid +
                                                                                                                      "?inner=true"
                                                                                                                      ? theme
                                                                                                                            .palette
                                                                                                                            .primary
                                                                                                                            .main
                                                                                                                      : "#1E1E1E"
                                                                                                          }
                                                                                                  }}
                                                                                              >
                                                                                                  {_inner?.percentage ==
                                                                                                  100 ? (
                                                                                                      <Box
                                                                                                          sx={{
                                                                                                              mt: 1,
                                                                                                              mr: 2,
                                                                                                              flexShrink:
                                                                                                                  "0",
                                                                                                              width: "20px",
                                                                                                              height: "20px",
                                                                                                              borderRadius:
                                                                                                                  "50%",
                                                                                                              display:
                                                                                                                  "flex",
                                                                                                              flexDirection:
                                                                                                                  "column",
                                                                                                              alignItems:
                                                                                                                  "center",
                                                                                                              justifyContent:
                                                                                                                  "center"
                                                                                                          }}
                                                                                                      >
                                                                                                          <svg
                                                                                                              width={
                                                                                                                  20
                                                                                                              }
                                                                                                              height={
                                                                                                                  20
                                                                                                              }
                                                                                                              viewBox="0 0 20 20"
                                                                                                              fill="none"
                                                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                                                          >
                                                                                                              <title>
                                                                                                                  This
                                                                                                                  is{" "}
                                                                                                                  {
                                                                                                                      _inner.item
                                                                                                                  }{" "}
                                                                                                                  status
                                                                                                                  icon
                                                                                                              </title>

                                                                                                              <g clipPath="url(#clip0_3786_102501)">
                                                                                                                  <rect
                                                                                                                      width={
                                                                                                                          20
                                                                                                                      }
                                                                                                                      height={
                                                                                                                          20
                                                                                                                      }
                                                                                                                      rx={
                                                                                                                          10
                                                                                                                      }
                                                                                                                      fill={
                                                                                                                          theme
                                                                                                                              .palette
                                                                                                                              .primary
                                                                                                                              .main
                                                                                                                      }
                                                                                                                  />
                                                                                                                  <path
                                                                                                                      d="M5 10.9971L8.07263 14.1654L15 5.83203"
                                                                                                                      stroke="white"
                                                                                                                      strokeWidth="1.66667"
                                                                                                                      strokeLinecap="round"
                                                                                                                      strokeLinejoin="round"
                                                                                                                  />
                                                                                                              </g>
                                                                                                              <defs>
                                                                                                                  <clipPath>
                                                                                                                      <rect
                                                                                                                          width={
                                                                                                                              20
                                                                                                                          }
                                                                                                                          height={
                                                                                                                              20
                                                                                                                          }
                                                                                                                          fill="white"
                                                                                                                      />
                                                                                                                  </clipPath>
                                                                                                              </defs>
                                                                                                          </svg>
                                                                                                      </Box>
                                                                                                  ) : (
                                                                                                      _inner?.percentage !=
                                                                                                          null && (
                                                                                                          <Box
                                                                                                              sx={{
                                                                                                                  mr: 2,
                                                                                                                  mt: 1,
                                                                                                                  flexShrink:
                                                                                                                      "0",
                                                                                                                  width: "20px",
                                                                                                                  height: "20px",
                                                                                                                  Radius: "100%",
                                                                                                                  display:
                                                                                                                      "flex",
                                                                                                                  flexDirection:
                                                                                                                      "column",
                                                                                                                  alignItems:
                                                                                                                      "center",

                                                                                                                  borderColor:
                                                                                                                      newpath ==
                                                                                                                      _inner.route +
                                                                                                                          "/" +
                                                                                                                          pid +
                                                                                                                          "?inner=true"
                                                                                                                          ? theme
                                                                                                                                .palette
                                                                                                                                .primary
                                                                                                                                .main
                                                                                                                          : "#5C5C5C",
                                                                                                                  justifyContent:
                                                                                                                      "center"
                                                                                                              }}
                                                                                                              border={
                                                                                                                  "2px solid #B3B3B5"
                                                                                                              }
                                                                                                              borderRadius={
                                                                                                                  "100px"
                                                                                                              }
                                                                                                          >
                                                                                                              <Typography
                                                                                                                  fontSize={
                                                                                                                      "12px"
                                                                                                                  }
                                                                                                                  fontWeight={
                                                                                                                      "600"
                                                                                                                  }
                                                                                                                  variant="body1"
                                                                                                              >
                                                                                                                  {i +
                                                                                                                      1}
                                                                                                              </Typography>
                                                                                                          </Box>
                                                                                                      )
                                                                                                  )}
                                                                                                  <Box
                                                                                                      sx={{
                                                                                                          width: "100%"
                                                                                                      }}
                                                                                                  >
                                                                                                      <Box
                                                                                                          sx={{
                                                                                                              display:
                                                                                                                  (_inner?.name ==
                                                                                                                      "Confirmation" ||
                                                                                                                      _inner.name.includes(
                                                                                                                          "Confirm"
                                                                                                                      )) &&
                                                                                                                  "flex",
                                                                                                              justifyContent:
                                                                                                                  "center",
                                                                                                              alignItems:
                                                                                                                  "center",
                                                                                                              fontSize:
                                                                                                                  "14px",
                                                                                                              lineHeight:
                                                                                                                  {
                                                                                                                      xs: "22px"
                                                                                                                  },
                                                                                                              fontWeight:
                                                                                                                  "600"
                                                                                                          }}
                                                                                                      >
                                                                                                          <a
                                                                                                              className={
                                                                                                                  "noUnderline"
                                                                                                              }
                                                                                                          >
                                                                                                              {
                                                                                                                  _inner.name
                                                                                                              }
                                                                                                          </a>

                                                                                                          {(_inner?.name ==
                                                                                                              "Confirmation" ||
                                                                                                              _inner.name.includes(
                                                                                                                  "Confirm"
                                                                                                              )) && (
                                                                                                              <Box
                                                                                                                  sx={{
                                                                                                                      width: "100%",
                                                                                                                      display:
                                                                                                                          "flex",
                                                                                                                      justifyItems:
                                                                                                                          "end",
                                                                                                                      alignItems:
                                                                                                                          "end",
                                                                                                                      justifyContent:
                                                                                                                          "end",
                                                                                                                      mt: "9px !important"
                                                                                                                  }}
                                                                                                              >
                                                                                                                  {confirmationHandler(
                                                                                                                      idx
                                                                                                                  ) !==
                                                                                                                  true ? (
                                                                                                                      <Tooltip
                                                                                                                          aria-label=""
                                                                                                                          title="Please fill all the data in above stages."
                                                                                                                          placement="bottom"
                                                                                                                          componentsProps={{
                                                                                                                              tooltip:
                                                                                                                                  {
                                                                                                                                      sx: {
                                                                                                                                          display:
                                                                                                                                              "flex",
                                                                                                                                          alignItems:
                                                                                                                                              "end",

                                                                                                                                          color: "#fff",
                                                                                                                                          fontSize:
                                                                                                                                              "12px",
                                                                                                                                          padding:
                                                                                                                                              "6px 12px",
                                                                                                                                          fontWeight: 400,
                                                                                                                                          lineHeight:
                                                                                                                                              "18px"
                                                                                                                                      }
                                                                                                                                  }
                                                                                                                          }}
                                                                                                                          arrow={
                                                                                                                              true
                                                                                                                          }
                                                                                                                      >
                                                                                                                          <Box
                                                                                                                              component={
                                                                                                                                  "span"
                                                                                                                              }
                                                                                                                              sx={{
                                                                                                                                  cursor: "pointer",
                                                                                                                                  mt: -1
                                                                                                                              }}
                                                                                                                          >
                                                                                                                              <svg
                                                                                                                                  width={
                                                                                                                                      18
                                                                                                                                  }
                                                                                                                                  height={
                                                                                                                                      18
                                                                                                                                  }
                                                                                                                                  viewBox="0 0 18 18"
                                                                                                                                  fill="none"
                                                                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                                                              >
                                                                                                                                  <title>
                                                                                                                                      This
                                                                                                                                      is
                                                                                                                                      confirmation
                                                                                                                                      ToolTip
                                                                                                                                      icon
                                                                                                                                  </title>

                                                                                                                                  <path
                                                                                                                                      d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                                                                                                      fill="#757575"
                                                                                                                                  />
                                                                                                                              </svg>
                                                                                                                          </Box>
                                                                                                                      </Tooltip>
                                                                                                                  ) : (
                                                                                                                      _item.percentage !==
                                                                                                                          100 && (
                                                                                                                          <Tooltip
                                                                                                                              aria-label=""
                                                                                                                              title="Please fill all the data in above stages."
                                                                                                                              placement="bottom"
                                                                                                                              componentsProps={{
                                                                                                                                  tooltip:
                                                                                                                                      {
                                                                                                                                          sx: {
                                                                                                                                              display:
                                                                                                                                                  "flex",
                                                                                                                                              alignItems:
                                                                                                                                                  "end",

                                                                                                                                              color: "#fff",
                                                                                                                                              fontSize:
                                                                                                                                                  "12px",
                                                                                                                                              padding:
                                                                                                                                                  "6px 12px",
                                                                                                                                              fontWeight: 400,
                                                                                                                                              lineHeight:
                                                                                                                                                  "18px"
                                                                                                                                          }
                                                                                                                                      }
                                                                                                                              }}
                                                                                                                              arrow={
                                                                                                                                  true
                                                                                                                              }
                                                                                                                          >
                                                                                                                              <Box
                                                                                                                                  component={
                                                                                                                                      "span"
                                                                                                                                  }
                                                                                                                                  sx={{
                                                                                                                                      cursor: "pointer",
                                                                                                                                      mt: -1
                                                                                                                                  }}
                                                                                                                              >
                                                                                                                                  <svg
                                                                                                                                      width={
                                                                                                                                          18
                                                                                                                                      }
                                                                                                                                      height={
                                                                                                                                          18
                                                                                                                                      }
                                                                                                                                      viewBox="0 0 18 18"
                                                                                                                                      fill="none"
                                                                                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                                                                                  >
                                                                                                                                      <title>
                                                                                                                                          This
                                                                                                                                          is
                                                                                                                                          confirmation
                                                                                                                                          ToolTip
                                                                                                                                          icon
                                                                                                                                      </title>
                                                                                                                                      <path
                                                                                                                                          d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                                                                                                                          fill="#757575"
                                                                                                                                      />
                                                                                                                                  </svg>
                                                                                                                              </Box>
                                                                                                                          </Tooltip>
                                                                                                                      )
                                                                                                                  )}
                                                                                                              </Box>
                                                                                                          )}
                                                                                                          {_inner?.percentage !==
                                                                                                              null && (
                                                                                                              <Typography
                                                                                                                  sx={{
                                                                                                                      fontSize:
                                                                                                                          "12px",
                                                                                                                      mt: "5px",
                                                                                                                      lineHeight:
                                                                                                                          "18px",
                                                                                                                      fontWeight:
                                                                                                                          "500",
                                                                                                                      color:
                                                                                                                          newpath ==
                                                                                                                          _inner.route +
                                                                                                                              "/" +
                                                                                                                              pid +
                                                                                                                              "?inner=true"
                                                                                                                              ? "#727272"
                                                                                                                              : _inner?.percentage ==
                                                                                                                                100
                                                                                                                              ? "#1E1E1E"
                                                                                                                              : "#5C5C5C"
                                                                                                                  }}
                                                                                                              >
                                                                                                                  {
                                                                                                                      _inner?.percentage
                                                                                                                  }

                                                                                                                  %
                                                                                                              </Typography>
                                                                                                          )}
                                                                                                      </Box>
                                                                                                  </Box>
                                                                                                  {_inner?.subStages && (
                                                                                                      <svg
                                                                                                          width={
                                                                                                              18
                                                                                                          }
                                                                                                          height={
                                                                                                              18
                                                                                                          }
                                                                                                          viewBox="0 0 18 18"
                                                                                                          fill="none"
                                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                                      >
                                                                                                          <title>
                                                                                                              This
                                                                                                              is
                                                                                                              collapse
                                                                                                              icon
                                                                                                          </title>
                                                                                                          <path
                                                                                                              d="M6.42773 14.1412L11.5706 8.99833L6.42773 3.85547L6.42773 14.1412Z"
                                                                                                              fill="#5C5C5C"
                                                                                                          />
                                                                                                      </svg>
                                                                                                  )}
                                                                                              </Box>
                                                                                          </Box>
                                                                                      ) : (
                                                                                          <Box
                                                                                              sx={{
                                                                                                  display:
                                                                                                      "flex",
                                                                                                  justifyContent:
                                                                                                      "space-between",
                                                                                                  alignItems:
                                                                                                      "center",
                                                                                                  border: "1px solid #D3D3D3",
                                                                                                  width: "100%",
                                                                                                  mx: "auto",
                                                                                                  py: "13.5px",
                                                                                                  px: 2.5,
                                                                                                  borderRadius:
                                                                                                      "8px",
                                                                                                  mb: 2
                                                                                              }}
                                                                                          >
                                                                                              <Box>
                                                                                                  <Skeleton
                                                                                                      variant="circular"
                                                                                                      width={
                                                                                                          20
                                                                                                      }
                                                                                                      height={
                                                                                                          20
                                                                                                      }
                                                                                                  />
                                                                                              </Box>
                                                                                              <Box
                                                                                                  sx={{
                                                                                                      width: "100%"
                                                                                                  }}
                                                                                              >
                                                                                                  <Skeleton
                                                                                                      sx={{
                                                                                                          height: "20px",
                                                                                                          mx: "15px"
                                                                                                      }}
                                                                                                  />
                                                                                                  <Skeleton
                                                                                                      sx={{
                                                                                                          width: "20%",
                                                                                                          height: "15px",
                                                                                                          mx: "15px"
                                                                                                      }}
                                                                                                  />
                                                                                              </Box>
                                                                                          </Box>
                                                                                      )}
                                                                                  </Collapse>
                                                                              </React.Fragment>
                                                                          )
                                                                      }
                                                                  )}
                                                              </React.Fragment>
                                                          )
                                                      }
                                                  )}
                                        </Box>
                                    </React.Fragment>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            )}
            <Box
                sx={{
                    left: `${!isMobile || show ? "0" : "-100%"}`,
                    transitionProperty: "all",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "fixed",
                    flexShrink: 0,
                    height: "100%",
                    zIndex: 900,
                    background: "white",
                    overflowY: "auto",

                    maxHeight: "64px",
                    // border: "1px solid #E0E0E0",

                    bottom: "0",
                    width: {
                        xs: "239px"
                    }
                }}
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/bottomLogo.svg`}
                    alt="NCR"
                    layout="fill"
                />
            </Box>
        </Box>
    )
}
