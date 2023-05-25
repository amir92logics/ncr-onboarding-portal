import { Button } from "@mui/material"
import theme from "../../../src/theme"
import Link from "next/link"
export default function ActionTaskButton({
    status,
    routes,
    data,
    signoffDisable,
    id,
    item
}) {
    const GetArrowSVG = (type) => {
        switch (type) {
            case "not started":
                return (
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is an arrow icon</title>
                        <path
                            d="M7 12H17"
                            stroke={
                                signoffDisable
                                    ? "rgba(0, 0, 0, 0.26)"
                                    : theme.palette.primary.main
                            }
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M13 8L17 12L13 16"
                            stroke={
                                signoffDisable
                                    ? "rgba(0, 0, 0, 0.26)"
                                    : "#8E8E8E"
                            }
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )
            case "completed":
                return (
                    <svg
                        style={{ marginLeft: "8px" }}
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is an arrow icon</title>
                        <path
                            d="M10.4688 4.375L16.0938 10L10.4688 15.625"
                            stroke="#3B873E"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15.3125 10H3.90625"
                            stroke="#3B873E"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )
            case "disabled":
                return (
                    <svg
                        style={{ marginLeft: "8px" }}
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is an arrow icon</title>
                        <path
                            d="M10.4688 4.375L16.0938 10L10.4688 15.625"
                            stroke="rgba(0, 0, 0, 0.6)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15.3125 10H3.90625"
                            stroke="rgba(0, 0, 0, 0.6)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )
            default:
                return (
                    <svg
                        style={{ marginLeft: "8px" }}
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is an arrow icon</title>
                        <path
                            d="M10.4688 4.375L16.0938 10L10.4688 15.625"
                            stroke={theme.palette.primary.main}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15.3125 10H3.90625"
                            stroke={theme.palette.primary.main}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )
        }
    }
    if (
        status === "not started" ||
        status == "in progress" ||
        status == "disabled"
    ) {
        return (
            <>
                {data.task_name == "Project Sign Off" &&
                data.status == "NOT STARTED" &&
                signoffDisable ? (
                    <a
                        style={{
                            textDecoration: "none",
                            width: "100%",
                            cursor: "not-allowed"
                        }}
                        className="noUnderline"
                    >
                        <Button
                            disabled={signoffDisable}
                            aria-label={`This is complete task button of ${item.display_name} task`}
                            variant="contained"
                            // id={
                            //     !data?.redirect
                            //         ? "action-pending-btn"
                            //         : ""
                            // }
                            className={
                                !data?.redirect
                                    ? "complete-task"
                                    : "complete-task-disable"
                            }
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "100%",
                                    md: "max-content"
                                },
                                boxSizing: "border-box",
                                display: "flex",
                                border: "none",
                                borderRadius: "8px",
                                background: "none !important",
                                padding: "6px 14px",
                                fontSize: "14px",
                                lineHeight: "21px",
                                fontWeight: "600",
                                color: theme.palette.primary.main,
                                textTransform: "none",
                                boxShadow: "none !important",
                                mt: { md: "-1px", xs: "0px" },
                                background: " none !important",
                                border: " 1px solid #e0e0e0",
                                cursor: "not-allowed"
                            }}
                        >
                            Complete Task
                            {GetArrowSVG(status)}
                        </Button>
                    </a>
                ) : (
                    <Link href={routes[data?.task_name]}>
                        <a
                            // id={data?.redirect ? "" : "not-allowed"}
                            style={{ textDecoration: "none", width: "100%" }}
                            className="noUnderline"
                        >
                            <Button
                                disabled={
                                    data.task_name == "Project Sign Off" &&
                                    data.status == "NOT STARTED" &&
                                    signoffDisable
                                }
                                aria-label={`This is complete task button of ${item.display_name} task`}
                                variant="contained"
                                className={
                                    !data?.redirect
                                        ? `complete-task action-pending-btn-${id}`
                                        : `complete-task-disable action-disable-btn-${id}`
                                }
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "max-content"
                                    },
                                    background: " none !important",
                                    border: "1px solid #e0e0e0",
                                    transition: " all 0.2s ease-in-out",
                                    boxSizing: "border-box",
                                    display: "flex",
                                    // border: "none",
                                    borderRadius: "8px",
                                    background: "none !important",
                                    padding: "6px 14px",
                                    fontSize: "14px",
                                    lineHeight: "21px",
                                    fontWeight: "600",
                                    color: theme.palette.primary.main,
                                    textTransform: "none",
                                    boxShadow: "none !important",
                                    mt: { md: "-1px", xs: "0px" },
                                    "&:hover": {
                                        borderColor: " #1d4ed8 !important",
                                        color: " #062ec9 !important",
                                        background: "#f5f6ff !important"
                                    }
                                }}
                            >
                                Complete Task
                                {GetArrowSVG(
                                    status == "not started" && data?.redirect
                                        ? "disabled"
                                        : "pending"
                                )}
                            </Button>
                        </a>
                    </Link>
                )}
            </>
        )
    } else if (status == "completed")
        return (
            <Link href={routes[data?.task_name]}>
                <a
                    className="noUnderline"
                    style={{ textDecoration: "none", width: "100%" }}
                >
                    <Button
                        aria-label={`This is view details button of ${item.display_name} task`}
                        variant="contained"
                        role="button"
                        className={`action-success-btn-${id}`}
                        // id="action-success-btn"
                        sx={{
                            boxSizing: "border-box",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "max-content"
                            },
                            display: "flex",
                            borderRadius: "8px",
                            letterSpacing: "-0.0062em",
                            border: `1px solid ${theme.chips.text.complete} !important`,
                            transition: " all 0.2s ease-in-out",
                            background: " none !important",
                            fontSize: "14px",
                            lineHeight: " 22px",
                            fontWeight: 600,
                            color: theme.chips.text.complete,
                            boxShadow: " rgb(0 0 0 / 0%) 0px 0px 0px",
                            textTransform: "none",
                            padding: " 9px 17.5px",
                            "&:hover": {
                                border: "1px solid #3b873e !important",
                                background: "#f5faf5 !important",
                                color: " #3b873e !important",
                                boxShadow: "none"
                            }
                        }}
                    >
                        View Details
                        {GetArrowSVG(status)}
                    </Button>
                </a>
            </Link>
        )
    else
        return status == "pending" ||
            status == "pending approval" ||
            status == "not-allowed" ? (
            <Link
                style={{ textDecoration: "none" }}
                href={routes[data?.task_name]}
            >
                <a className="noUnderline">
                    <Button
                        aria-label={`This is complete action button of ${item.display_name} task`}
                        variant="contained"
                        className={`complete-action action-pending-btn-${id}`}
                        sx={{
                            boxSizing: "border-box",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "max-content"
                            },
                            display: "flex",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "none",
                            padding: "8px 14px",
                            fontSize: "14px",
                            lineHeight: "22px",
                            fontWeight: "600px",
                            color: theme.palette.primary.main,
                            boxShadow: "none !important"
                        }}
                    >
                        Complete Action
                        {GetArrowSVG(status)}
                    </Button>
                </a>
            </Link>
        ) : (
            <Link
                style={{ textDecoration: "none" }}
                href={routes[data?.task_name]}
            >
                <a className="noUnderline">
                    <Button
                        aria-label={`This is complete action button of ${item.display_name} task`}
                        variant="contained"
                        id="action-pending-btn"
                        className={`complete-action action-pending-btn-${id}`}
                        sx={{
                            boxSizing: "border-box",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "max-content"
                            },
                            display: "flex",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "none",
                            padding: "8px 14px",
                            fontSize: "14px",
                            lineHeight: "22px",
                            fontWeight: "600px",
                            color: theme.palette.primary.main,
                            boxShadow: "none !important"
                        }}
                    >
                        Complete Action
                        {GetArrowSVG(status)}
                    </Button>
                </a>
            </Link>
        )
}
