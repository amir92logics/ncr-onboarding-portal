import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ActionTaskButton from "./ActionTaskButton/index.js"
import { useSelector } from "react-redux"
import { useRouter } from "next/router.js"
import { Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ProjectOverAllProgress } from "../LayoutBase/ProjectOverAllProgress/index.js"
import Image from "next/image.js"
import theme from "../../src/theme.js"
export default function ActionsView() {
    const router = useRouter()
    const pid = router.query.id
    const task = useSelector((state) => state.dataSlice.tasks)
    const apiloadingstate = useSelector(
        (state) => state.dataSlice.apiloadingstate
    )

    const [tasks, SetTasks] = useState({ incomplete: [], completed: [] })
    useEffect(() => {
        let temp1 = task.filter((it) => it.status.toLowerCase() === "completed")
        let temp2 = task.filter((it) => it.status.toLowerCase() !== "completed")
        SetTasks({ incomplete: temp2, completed: temp1 })
    }, [task])
    const routes = {
        "Confirm Site Information": `/confirm-site-info/${pid}`,
        "Confirm Install Date": `/install-date/${pid}`,
        "Confirm Project Contacts": `/contacts/${pid}`,
        "Upload Required Documents": `/documents/${pid}`,
        "Review Project Info for Discovery": `/discovery/${pid}`,
        "Confirm Menu Programming": `/menu-programming-complete/${pid}`,
        "Site Readiness": `/site-readiness/${pid}`,
        "Project Sign Off": `/project-sign-off/${pid}`
    }
    const projectSignOffHandler = () => {
        const total = tasks?.incomplete.length <= 1
        return total
    }
    return apiloadingstate ? (
        <Box className="Overview-container">
            {/* Skeleton for Text */}
            <Box
                sx={{
                    display: "flex",
                    mt: { sm: "16px", md: "24px", xl: "28px" },
                    paddingX: { xs: "0px", md: "0px" }
                }}
            >
                <Box sx={{ width: { sm: "100%", md: "50%" } }}>
                    <Skeleton variant="text" width={"100%"} height={42} />
                </Box>
            </Box>
            {/* Skeleton for Cards */}
            <Box
                className="shadow"
                sx={{
                    background: "white",
                    display: "flex",
                    justifyContent: {
                        xs: "flex-start",
                        md: "space-between"
                    },
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row",
                        xl: "row"
                    },

                    py: "14.5px",
                    pl: "24px",
                    pr: "24px",
                    borderRadius: "8px",
                    mt: { sm: "16px", md: "24px", xl: "24px" }
                }}
            >
                <Box>
                    <Skeleton variant="text" width={200} height={42} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "full"
                        }}
                    >
                        <Skeleton variant="text" width={70} height={22} />
                    </Box>
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "100px"
                        }}
                    >
                        <Skeleton variant="text" width={70} height={22} />
                    </Box>
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "8px",
                            display: {
                                md: "block",
                                sm: "none"
                            }
                        }}
                    >
                        <Skeleton variant="rounded" width={100} height={22} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        py: "9px",

                        mt: "12px",
                        border: "1px transparent",
                        borderRadius: "8px",
                        display: {
                            md: "none",
                            sm: "block"
                        }
                    }}
                >
                    <Skeleton variant="rounded" width={310} height={22} />
                </Box>
            </Box>
            <Box
                className="shadow"
                sx={{
                    background: "white",
                    display: "flex",
                    justifyContent: {
                        xs: "flex-start",
                        md: "space-between"
                    },
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row",
                        xl: "row"
                    },

                    py: "14.5px",
                    pl: "24px",
                    pr: "24px",
                    borderRadius: "8px",
                    mt: "14px"
                }}
            >
                <Box>
                    <Skeleton variant="text" width={200} height={42} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "full"
                        }}
                    >
                        <Skeleton variant="text" width={70} height={22} />
                    </Box>
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "100px"
                        }}
                    >
                        <Skeleton variant="text" width={70} height={22} />
                    </Box>
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "8px",
                            display: {
                                md: "block",
                                sm: "none"
                            }
                        }}
                    >
                        <Skeleton variant="rounded" width={100} height={22} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        py: "9px",
                        mt: "12px",
                        border: "1px transparent",
                        borderRadius: "8px",
                        display: {
                            md: "none",
                            sm: "block"
                        }
                    }}
                >
                    <Skeleton variant="rounded" width={310} height={22} />
                </Box>
            </Box>
            <Box
                className="shadow"
                sx={{
                    background: "white",
                    display: "flex",
                    justifyContent: {
                        xs: "flex-start",
                        md: "space-between"
                    },
                    flexDirection: {
                        xs: "column",
                        md: "row"
                    },

                    py: "14.5px",
                    px: 6,
                    borderRadius: "8px",
                    mt: "14px"
                }}
            >
                <Box>
                    <Skeleton variant="text" width={200} height={42} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "full"
                        }}
                    >
                        <Skeleton variant="text" width={70} height={22} />
                    </Box>
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "100px"
                        }}
                    >
                        <Skeleton variant="text" width={70} height={22} />
                    </Box>
                    <Box
                        sx={{
                            py: "9px",
                            px: { sm: "0", md: "17.5px" },
                            border: "1px transparent",
                            borderRadius: "8px",
                            display: {
                                md: "block",
                                sm: "none"
                            }
                        }}
                    >
                        <Skeleton variant="rounded" width={100} height={22} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        py: "9px",
                        mt: "12px",
                        border: "1px transparent",
                        borderRadius: "8px",
                        display: {
                            md: "none",
                            sm: "block"
                        }
                    }}
                >
                    <Skeleton variant="rounded" width={310} height={22} />
                </Box>
            </Box>
        </Box>
    ) : (
        <Box display="flex" flexDirection="column" width="100%">
            <Box
                display="flex"
                alignItems="center"
                width="100%"
                className="Overview-container"
                sx={{
                    boxSizing: "border-box",
                    px: 0
                }}
            >
                <Box
                    display="flex-col"
                    alignItems="center"
                    flexWrap="wrap"
                    width="100%"
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: { xs: "24px", md: "32px" }
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: {
                                    lg: "28px",
                                    xs: "24px"
                                },

                                color: "#1E1E1E"
                            }}
                        >
                            Please complete the following tasks.
                        </Typography>
                    </Box>

                    {Object.keys(tasks).map((task, i) => (
                        <React.Fragment key={task}>
                            <Box
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    display:
                                        tasks[task]?.length == 0 &&
                                        task == "incomplete"
                                            ? "none"
                                            : "flex",
                                    // : "none",
                                    alignItems: "center",
                                    gap: 2,
                                    lineHeight: {
                                        lg: "28px",
                                        xs: "24px"
                                    },
                                    mt: i == 1 && 10,
                                    mb: "2px",
                                    textTransform: "capitalize",
                                    color:
                                        i == 0
                                            ? theme.chips.text.warning
                                            : theme.chips.text.complete,
                                    backgroundColor:
                                        i == 0
                                            ? theme.chips.background.warning
                                            : theme.chips.background.complete,
                                    border:
                                        i == 0
                                            ? `1px solid ${theme.chips.text.warning}`
                                            : `1px solid ${theme.chips.text.complete}`,
                                    py: 2.5,
                                    px: 3.5,
                                    borderRadius: "8px"
                                }}
                            >
                                {i == 0 ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "9999px"
                                        }}
                                    >
                                        <svg
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is an incomplete icon
                                            </title>
                                            <path
                                                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                                                fill={`${theme.chips.text.warning}`}
                                            />
                                        </svg>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "9999px"
                                        }}
                                    >
                                        <svg
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>
                                                This is an completed icon
                                            </title>
                                            <path
                                                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                                                fill={`${theme.chips.text.complete}`}
                                            />
                                        </svg>
                                    </Box>
                                )}
                                <Box component={"span"}> {task}</Box>
                            </Box>

                            {tasks[task]?.length > 0 ? (
                                tasks[task]?.map((item, index) => (
                                    <Box
                                        key={item.display_name}
                                        display="flex"
                                        width="100%"
                                        className="shadow"
                                        sx={{
                                            boxSizing: "border-box",
                                            alignItems: {
                                                xs: "flex-start",
                                                md: "center"
                                            },
                                            justifyContent: {
                                                xs: "flex-start",
                                                md: "space-between"
                                            },
                                            flexDirection: {
                                                xs: "column",
                                                md: "row"
                                            },
                                            background: "white",
                                            display: "flex",
                                            py: {
                                                md: "14.5px",
                                                xs: 4
                                            },
                                            pl: 6,
                                            pr: { xs: 6, md: 3.5 },
                                            borderRadius: "8px",
                                            mb:
                                                tasks[task].length - 1 == index
                                                    ? 8
                                                    : index !== 0
                                                    ? 4
                                                    : 0,
                                            mt: 4,
                                            width: "100%"
                                        }}
                                    >
                                        <Box
                                            sx={{ boxSizing: "border-box" }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,

                                                    fontSize: "16px",
                                                    mb: { xs: 5, md: 0 },
                                                    lineHeight: "24px",
                                                    // maxWidth: {
                                                    //     lg: "100%",
                                                    //     md: "100%",
                                                    //     xs: "100%"
                                                    // },
                                                    letterSpacing: "-0.0992px",
                                                    color:
                                                        item.display_name ===
                                                            "Sign off - Project Complete" &&
                                                        !projectSignOffHandler()
                                                            ? "rgba(0, 0, 0, 0.26)"
                                                            : "#1E1E1E"
                                                }}
                                            >
                                                {item.display_name}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{
                                                boxSizing: "border-box",
                                                alignItems: {
                                                    xs: "flex-start",
                                                    md: "center"
                                                },
                                                justifyContent: {
                                                    xs: "space-between",
                                                    md: "flex-end"
                                                },
                                                width: {
                                                    xs: "100%",
                                                    md: "auto"
                                                },
                                                flexDirection: {
                                                    xs: "column",
                                                    md: "row"
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    mx: { md: 5, xs: 0 },
                                                    width: "100%"
                                                }}
                                            >
                                                <ProjectOverAllProgress
                                                    width={"191px"}
                                                    title={"Progress "}
                                                    percentage={
                                                        item?.percent_complete
                                                    }
                                                />
                                            </Box>
                                            <Box
                                                sx={{
                                                    marginBottom: {
                                                        xs: 4,
                                                        md: "0px"
                                                    },
                                                    marginTop: {
                                                        xs: 3,
                                                        md: "0px"
                                                    },
                                                    justifyContent: {
                                                        xs: "space-between"
                                                    },
                                                    width: "100%"
                                                }}
                                                display="flex"
                                                alignItems="center"
                                            ></Box>
                                            <ActionTaskButton
                                                signoffDisable={
                                                    !projectSignOffHandler()
                                                }
                                                item={item}
                                                id={index}
                                                routes={routes}
                                                data={item}
                                                status={
                                                    item.status.toLowerCase() ==
                                                        "confirmed" ||
                                                    item.status.toLowerCase() ==
                                                        "overdue" ||
                                                    item.status.toLowerCase() ==
                                                        "pending approval"
                                                        ? "not started"
                                                        : item.status.toLowerCase()
                                                }
                                            />
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        my: 4,
                                        display:
                                            task == "incomplete" ? "none" : "",
                                        border: "2px dashed #E0E0E0",
                                        borderRadius: 2,
                                        width: "100%",
                                        py: 6,
                                        textAlign: "center"
                                    }}
                                >
                                    <Image
                                        alt={"No Tasks"}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/Emptyactions.svg`}
                                        width={100}
                                        height={100}
                                    />

                                    <Box sx={{ mt: 2 }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: "#5C5C5C"
                                            }}
                                        >
                                            No completed Actions
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#5C5C5C",
                                                fontSize: "12px"
                                            }}
                                        >
                                            Once an Action is completed, it will
                                            be displayed here.
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
