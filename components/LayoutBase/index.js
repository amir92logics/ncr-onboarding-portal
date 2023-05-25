import React, { useEffect, useState, useRef } from "react"
import Box from "@mui/material/Box"
import { Skeleton, Typography, useMediaQuery } from "@mui/material"
import { ProjectOverAllProgress } from "./ProjectOverAllProgress"
import Divider from "@mui/material/Divider"
import { useRouter } from "next/router"
import { setSidebarToggle } from "../../redux-setup/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../src/theme"
import { useLayoutEffect } from "react"

export function LayoutBase({
    title,
    children,
    showPercentageProgress,
    pid,
    pi
}) {
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const ref = useRef(null)
    const [loading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const path = router.pathname
    const id = router.query.id
    const splitpath = path.split("/")
    const isMobile = useMediaQuery((th) => th.breakpoints.down("lg"))
    const [scroll, setScroll] = useState(null)
    const newpath = splitpath[1]
    const handlePath = (e, index) => {
        if (e == "discovery") {
            router.push({
                pathname: `/discovery/${id}`
            })
            isMobile && dispatch(setSidebarToggle(true))
        } else if (e == "documents") {
            router.push({
                pathname: `/documents/${id}`
            })
            isMobile && dispatch(setSidebarToggle(true))
        } else if (index >= 1) {
            router.push({ query: { id } })
        }
    }
    const onScroll = (e) => {
        const { scrollY } = window
        setScroll(scrollY)
    }

    useEffect(() => {
        //add eventlistener to window
        window.onresize = function () {
            // your code
            setWidth(ref.current?.clientWidth)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll, { passive: true })
        }
    }, [])
    const tasks = useSelector((state) => state.dataSlice.tasks)
    let docs = tasks?.find(
        (it) => it.task_name == "Upload Required Documents"
    )?.percent_complete
    const calculatePercent = (data) => {
        let discoverpercent = data.find(
            (it) => it.name == "Discovery"
        )?.percentage
        let taskspercent = tasks.length
            ? tasks
                  ?.map((it) => it?.percent_complete)
                  ?.reduce((a, b) => a + b) -
              tasks?.find((it) => it?.task_name == "Review Project Info for Discovery")
                  ?.percent_complete +
              discoverpercent
            : 0
        return Math.round(taskspercent / tasks.length)
    }

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, [width])

    return (
        <Box className="container-layout">
            <Box
                className={scroll > 64 && isMobile ? "shadow" : ""}
                display="block"
                sx={{
                    position: isMobile ? "fixed" : "relative",
                    zIndex: isMobile && "99",
                    left: 0,
                    top: 0,
                    backgroundColor: "#F5F5F5 !important",
                    width: "100%",

                    mt: {
                        lg: !pid && "32px"
                    },
                    px: {
                        md:
                            !pid &&
                            path !== "/" &&
                            !path.includes("schedule") &&
                            !pi &&
                            "24px",
                        lg: "32px",
                        xl: "0px"
                    }
                }}
            >
                <Box
                    ref={ref}
                    sx={{
                        pb: !pid && "12px",
                        display: "flex",
                        flexDirection: {
                            md: "row",
                            xs: "column"
                        },
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            md: "flex-end",
                            lg:
                                splitpath[3] == "internet-requirements" ||
                                splitpath[3] == "site-network-documentation"
                                    ? "flex-end"
                                    : "center"
                        }
                    }}
                >
                    {loading ? (
                        <>
                            <Box
                                sx={{
                                    width: {
                                        md: "311px",
                                        xs: "100%"
                                    }
                                }}
                            >
                                <Skeleton
                                    sx={{
                                        width: {
                                            md: "311px",
                                            xs: "100%"
                                        },
                                        marginBottom: "32px"
                                    }}
                                    animation="pulse"
                                    variant={"text"}
                                />
                            </Box>
                            {showPercentageProgress && (
                                <Box
                                    sx={{
                                        width: {
                                            md: "311px",
                                            xs: "100%"
                                        }
                                    }}
                                >
                                    <Skeleton
                                        sx={{
                                            width: {
                                                md: "311px",
                                                xs: "100%"
                                            },
                                            marginBottom: "32px"
                                        }}
                                        animation="pulse"
                                        variant={"text"}
                                    />
                                </Box>
                            )}
                        </>
                    ) : (
                        <Box
                            sx={{
                                mt: {
                                    xs: isMobile ? "88px" : "0px",
                                    md: isMobile ? "94px" : "0px"
                                },
                                paddingX: {
                                    xs: "24px",
                                    md:
                                        (path.includes("schedule") && "32px") ||
                                        (path === "/" && "32px"),
                                    lg: "0px"
                                },
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: { md: "flex-end" }
                            }}
                        >
                            <Box className="">
                                <Box
                                    sx={{
                                        display:
                                            path === "/" ||
                                            path.includes("schedule") ||
                                            path.includes("actions")
                                                ? "none"
                                                : "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        mb: "8px",
                                        maxWidth: "max-content"
                                    }}
                                >
                                    {splitpath.map((pathname, index) => (
                                        <Typography
                                            key={`${pathname + index}1`}
                                            sx={{
                                                fontSize: theme.fontsize.xs,
                                                textTransform: "capitalize",
                                                display:
                                                    pathname == "[id]"
                                                        ? "none"
                                                        : "flex",
                                                alignItems: "center",
                                                lineHeight: "18px"
                                            }}
                                        >
                                            {index == 0 ? (
                                                <Box
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: `/actions/${id}`
                                                        })
                                                    }}
                                                    component={"span"}
                                                    sx={{
                                                        mt: -0.5,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        height: 18,
                                                        py: "1px"
                                                    }}
                                                >
                                                    {" "}
                                                    <svg
                                                        width={11}
                                                        height={12}
                                                        viewBox="0 0 11 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <title>
                                                            This is home icon
                                                        </title>
                                                        <g clipPath="url(#clip0_3797_261675)">
                                                            <path
                                                                d="M5.62159 2.17561C5.58962 2.14501 5.54706 2.12793 5.50278 2.12793C5.45853 2.12793 5.41597 2.14501 5.38398 2.17561L1.42871 5.95406C1.41191 5.97013 1.39855 5.98945 1.38943 6.01082C1.38031 6.0322 1.37562 6.05521 1.37564 6.07846L1.375 9.62467C1.375 9.80701 1.44743 9.98187 1.57636 10.1108C1.7053 10.2397 1.88016 10.3122 2.0625 10.3122H4.12714C4.21832 10.3122 4.30576 10.2759 4.37021 10.2115C4.43469 10.147 4.47089 10.0596 4.47089 9.96842V7.04654C4.47089 7.00095 4.489 6.95723 4.52125 6.92501C4.55348 6.89278 4.5972 6.87467 4.64277 6.87467H6.36151C6.4071 6.87467 6.45083 6.89278 6.48305 6.92501C6.5153 6.95723 6.53339 7.00095 6.53339 7.04654V9.96842C6.53339 10.0596 6.56961 10.147 6.63409 10.2115C6.69854 10.2759 6.78598 10.3122 6.87714 10.3122H8.94093C9.12327 10.3122 9.29815 10.2397 9.42708 10.1108C9.55601 9.98187 9.62843 9.80701 9.62843 9.62467V6.07846C9.62847 6.05521 9.62377 6.0322 9.61466 6.01082C9.60553 5.98945 9.59216 5.97013 9.57536 5.95406L5.62159 2.17561Z"
                                                                fill="#5C5C5C"
                                                            />
                                                            <path
                                                                d="M10.5469 5.24541L8.93986 3.70799V1.375C8.93986 1.28383 8.90366 1.1964 8.83919 1.13193C8.77471 1.06747 8.68729 1.03125 8.59611 1.03125H7.56486C7.4737 1.03125 7.38626 1.06747 7.32181 1.13193C7.25733 1.1964 7.22111 1.28383 7.22111 1.375V2.0625L5.97674 0.872695C5.86029 0.754961 5.68713 0.6875 5.5 0.6875C5.31351 0.6875 5.14078 0.754961 5.02434 0.87291L0.454618 5.24498C0.320985 5.37389 0.304227 5.58594 0.425828 5.72559C0.456364 5.76084 0.493753 5.7895 0.535721 5.80985C0.577686 5.83017 0.623354 5.84177 0.669942 5.8439C0.716529 5.84603 0.763064 5.83866 0.806712 5.82224C0.85036 5.80581 0.890211 5.78067 0.923836 5.74836L5.38183 1.48844C5.41383 1.45784 5.45639 1.44076 5.50064 1.44076C5.54492 1.44076 5.58748 1.45784 5.61945 1.48844L10.0779 5.74836C10.1436 5.81133 10.2315 5.8457 10.3225 5.84394C10.4135 5.84216 10.5001 5.80439 10.5632 5.73891C10.6951 5.60226 10.6842 5.37668 10.5469 5.24541Z"
                                                                fill="#5C5C5C"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath>
                                                                <rect
                                                                    width={11}
                                                                    height={11}
                                                                    fill="white"
                                                                    transform="translate(0 0.5)"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    {/* <Box
                                                        component={"span"}
                                                        sx={{
                                                            ml: 1,
                                                            pt: -1,
                                                            display:
                                                                path.includes(
                                                                    "discovery"
                                                                ) ||
                                                                path.includes(
                                                                    "documents"
                                                                ) ||
                                                                path.includes(
                                                                    "actions"
                                                                )
                                                                    ? "none"
                                                                    : ""
                                                        }}
                                                    >
                                                        Actions
                                                    </Box> */}
                                                </Box>
                                            ) : (
                                                index !==
                                                    splitpath.length - 2 && (
                                                    <Box
                                                        onClick={() =>
                                                            index !== 3 &&
                                                            handlePath(
                                                                pathname,
                                                                index
                                                            )
                                                        }
                                                        component={"span"}
                                                        sx={{}}
                                                    >
                                                        {pathname.replaceAll(
                                                            "-",
                                                            " "
                                                        )}
                                                    </Box>
                                                )
                                            )}
                                            {pathname !== " " &&
                                                index <
                                                    splitpath.length - 2 && (
                                                    <Box
                                                        sx={{
                                                            height: 18,
                                                            py: "0px"
                                                        }}
                                                        component={"span"}
                                                    >
                                                        <svg
                                                            width={16}
                                                            height={16}
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>
                                                                This is
                                                                seperation icon
                                                            </title>
                                                            <g clipPath="url(#clip0_3797_261678)">
                                                                <path
                                                                    d="M6 4L10 8L6 12"
                                                                    stroke="#5C5C5C"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath>
                                                                    <rect
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </Box>
                                                )}
                                        </Typography>
                                    ))}
                                </Box>
                                {title}
                            </Box>

                            {newpath == "discovery" ? (
                                <Box
                                    sx={{
                                        mt: { xs: "16px", md: "0" },
                                        width: {
                                            xs: "100% !important",
                                            md: "auto !important"
                                        }
                                    }}
                                >
                                    <ProjectOverAllProgress
                                        title={"Discovery Progress "}
                                        percentage={sideBarData[2]?.percentage}
                                    />
                                </Box>
                            ) : newpath == "documents" ? (
                                <Box
                                    sx={{
                                        mt: { xs: "16px", md: "0" },
                                        width: {
                                            xs: "100% !important",
                                            md: "auto !important"
                                        }
                                    }}
                                >
                                    <ProjectOverAllProgress
                                        title={"Documents Progress "}
                                        percentage={docs}
                                    />
                                </Box>
                            ) : newpath == "schedule" || path == "/" ? (
                                ""
                            ) : (
                                <Box
                                    sx={{
                                        mt: { xs: "16px", md: "0" },
                                        width: {
                                            xs: "100% !important",
                                            md: "auto !important"
                                        }
                                    }}
                                >
                                    <ProjectOverAllProgress
                                        percentage={
                                            calculatePercent(sideBarData) || 0
                                        }
                                    />
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>

                <Divider
                    className="divider-col"
                    sx={{
                        display: pid ? "none" : "block",
                        mx: {
                            xs: "-16px",
                            md: "-24px",
                            lg: "0px"
                        }
                    }}
                />

                <Box
                    display="block"
                    sx={{
                        display: {
                            xs: "none",
                            lg: pid ? "none" : "block"
                        },
                        mt: path.includes("schedule") ? "14px" : "32px"
                    }}
                    position="relative"
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        width="100%"
                    >
                        <Box className="container-layout">{children}</Box>{" "}
                    </Box>{" "}
                </Box>
            </Box>
            {isMobile && (
                <Box
                    className={`${
                        path.includes("wireless-solution")
                            ? "wireless-solution"
                            : ""
                    }`}
                    sx={{
                        height: path === "/" ? height : height + 24
                    }}
                />
            )}

            <Box
                sx={{
                    display: { lg: "none" },

                    px: "24px"
                }}
                position="relative"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    width="100%"
                >
                    <Box
                        className={
                            newpath == "actions"
                                ? ""
                                : path.includes("back-office-computer") ||
                                  path.includes("network-information")
                                ? "container-layout-system-refresh"
                                : "container-layout"
                        }
                    >
                        {children}
                    </Box>{" "}
                </Box>{" "}
            </Box>
        </Box>
    )
}
