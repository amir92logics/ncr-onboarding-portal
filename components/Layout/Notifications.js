import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { useSelector, useDispatch } from "react-redux"
import {
    setNotifications,
    toggleNotifications
} from "../../redux-setup/dataSlice"
import { Button, Divider, Typography } from "@mui/material"
import { useUpdateNotificationMutation } from "../../redux-setup/api/data"
import { useState } from "react"
import moment from "moment"
const selectIcon = (status) => {
    switch (status) {
        case "Overdue":
            return (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Overdue icon</title>
                    <path
                        d="M9.00002 0.68335C4.40835 0.68335 0.68335 4.40835 0.68335 9.00002C0.68335 13.5917 4.40835 17.3167 9.00002 17.3167C13.5917 17.3167 17.3167 13.5917 17.3167 9.00002C17.3167 4.40835 13.5917 0.68335 9.00002 0.68335ZM8.56668 15.6667V10.45H5.66668L9.83335 2.33335V7.55002H12.625L8.56668 15.6667Z"
                        fill="#F44336"
                    />
                </svg>
            )

        case "Complete":
            return (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Complete icon</title>
                    <path
                        d="M9.00002 0.68335C4.40835 0.68335 0.68335 4.40835 0.68335 9.00002C0.68335 13.5917 4.40835 17.3167 9.00002 17.3167C13.5917 17.3167 17.3167 13.5917 17.3167 9.00002C17.3167 4.40835 13.5917 0.68335 9.00002 0.68335ZM8.56668 15.6667V10.45H5.66668L9.83335 2.33335V7.55002H12.625L8.56668 15.6667Z"
                        fill="#4CAF50"
                    />
                </svg>
            )

        case "Warning":
            return (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Warning icon</title>
                    <path
                        d="M9.00002 0.68335C4.40835 0.68335 0.68335 4.40835 0.68335 9.00002C0.68335 13.5917 4.40835 17.3167 9.00002 17.3167C13.5917 17.3167 17.3167 13.5917 17.3167 9.00002C17.3167 4.40835 13.5917 0.68335 9.00002 0.68335ZM8.56668 15.6667V10.45H5.66668L9.83335 2.33335V7.55002H12.625L8.56668 15.6667Z"
                        fill="#FF9800"
                    />
                </svg>
            )

        case "In Progress":
            return (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is In Progress icon</title>
                    <path
                        d="M9.00002 0.68335C4.40835 0.68335 0.68335 4.40835 0.68335 9.00002C0.68335 13.5917 4.40835 17.3167 9.00002 17.3167C13.5917 17.3167 17.3167 13.5917 17.3167 9.00002C17.3167 4.40835 13.5917 0.68335 9.00002 0.68335ZM8.56668 15.6667V10.45H5.66668L9.83335 2.33335V7.55002H12.625L8.56668 15.6667Z"
                        fill="#5364FD"
                    />
                </svg>
            )
        default:
            return (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is default icon</title>

                    <path
                        d="M9.00002 0.68335C4.40835 0.68335 0.68335 4.40835 0.68335 9.00002C0.68335 13.5917 4.40835 17.3167 9.00002 17.3167C13.5917 17.3167 17.3167 13.5917 17.3167 9.00002C17.3167 4.40835 13.5917 0.68335 9.00002 0.68335ZM8.56668 15.6667V10.45H5.66668L9.83335 2.33335V7.55002H12.625L8.56668 15.6667Z"
                        fill="#5364FD"
                    />
                </svg>
            )
    }
}
const selectColor = (status) => {
    switch (status) {
        case "Overdue":
            return {
                bgColor: "#FDECEA",
                color: "#621B16",
                iconColor: "#F44336"
            }
        case "Complete":
            return {
                bgColor: "#EFF7EE",
                color: "#1E4620",
                iconColor: "#4CAF50"
            }

        case "In Progress":
            return {
                bgColor: "#E7E8FF",
                color: "#212865",
                iconColor: "#5364FD"
            }
        case "Warning":
            return {
                bgColor: "#FDF4E7",
                color: "#663D00",
                iconColor: "#FF9800"
            }
        default:
            return {
                bgColor: "#E7E8FF",
                color: "#212865",
                iconColor: "#5364FD"
            }
    }
}
const Notification = ({ body, status, time, news, ariaLabel }) => {
    const color = selectColor(status)
    return (
        <Box sx={{ paddingX: 2, paddingY: "13px" }}>
            <Box
                display="flex"
                alignItems="baseline"
                sx={{ paddingBottom: "11px" }}
            >
                <Box
                    component="div"
                    sx={{
                        width: "8px",
                        minWidth: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: news
                            ? "primary.main"
                            : "primary.contrastText",
                        marginRight: "14px"
                    }}
                />
                <Typography
                    sx={{ fontWeight: "400" }}
                    aria-label={ariaLabel}
                    variant="body2"
                >
                    {body}
                </Typography>
            </Box>
            <Box role="status" aria-label={status} sx={{ paddingLeft: "20px" }}>
                <Box
                    sx={{
                        border: 0,
                        borderRadius: "16px",
                        width: "max-content",
                        height: "24px",
                        padding: "2px 0px"
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor={color.bgColor}
                    fontSize="13px"
                >
                    <Box
                        sx={{
                            paddingTop: "5px",
                            color: color.iconColor,
                            paddingLeft: "5.68px"
                        }}
                    >
                        {selectIcon(status)}
                    </Box>
                    <Box
                        sx={{
                            color: color.color,
                            pr: "10px",
                            fontSize: "13px",
                            lineHeight: "18px",
                            fontWeight: 500
                        }}
                        ml="7.68px"
                        textAlign="left"
                    >
                        {status || "N/A"}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: "20px" }}>
                <Typography
                    aria-label={time}
                    variant="caption"
                    sx={{ paddingTop: "13px", color: "text.secondary" }}
                >
                    {time}
                </Typography>
            </Box>
        </Box>
    )
}

const Notifications = () => {
    const [updateNotification, { isLoading }] = useUpdateNotificationMutation()
    const user = useSelector((state) => state.auth.user)
    const notification = []
    // useSelector((state) => state.dataSlice.notifications)

    const [newMsgCount, setNewMsgCount] = useState(0)
    // useEffect(() => {
    //     if (notification.length) {
    //         handleGetNewMsgCount(notification)
    //     }
    // }, [notification])
    const handleNotifcationDescription = (status) => {
        let description = ""
        if (status === "COMPLETED") {
            description = "is completed"
        } else if (status === "Overdue") {
            description = " is overdue"
        } else if (status === "Warning") {
            description = "is in warning state"
        } else if (status === "In Progress") {
            description = "is in progress"
        }
        return description
    }
    const handleGetNewMsgCount = (data) => {
        setNewMsgCount(data?.filter((obj) => !obj.viewed)?.length)
    }
    const rightNotificationBar = useSelector(
        (state) => state.dataSlice.rightNotificationBar
    )
    const dispatch = useDispatch()
    const updatenotification = (id) => {
        // updateNotification(id)
        //     .unwrap()
        //     .then((res) => {
        //         notificationtrigger(user?.mcn)
        //             .unwrap()
        //             .then((res) => {
        //                 handleGetNewMsgCount(res)
        //                 dispatch(setNotifications(res))
        //             })
        //     })
    }
    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 320,
                display: "flex",
                flexDirection: "column"
            }}
            role="presentation"
        >
            {notification?.length > 0 ? (
                <Box display="flex" flexDirection="column">
                    {newMsgCount !== 0 ? (
                        <>
                            {" "}
                            <Typography
                                sx={{
                                    paddingX: 3,
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    lineHeight: "19.92px",
                                    marginTop: "10px"
                                }}
                                variant="caption"
                            >
                                {newMsgCount !== 0 &&
                                    "New (" + newMsgCount + ")"}
                            </Typography>
                            <Divider />
                        </>
                    ) : (
                        ""
                    )}
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{
                            height: "700px",
                            overflow: "hidden",
                            overflowY: "auto"
                        }}
                    >
                        <div>
                            {notification?.map((item, index) => {
                                return (
                                    <Box
                                        key={`${index + 1}`}
                                        sx={{
                                            cursor: isLoading
                                                ? "progress"
                                                : "pointer"
                                        }}
                                        onClick={() =>
                                            item.viewed
                                                ? ""
                                                : updatenotification(item.id)
                                        }
                                    >
                                        <Notification
                                            body={
                                                <>
                                                    <b
                                                        style={{
                                                            fontWeight: "700",
                                                            textTransform:
                                                                "capitalize"
                                                        }}
                                                    >
                                                        {item?.title}
                                                    </b>{" "}
                                                    {handleNotifcationDescription(
                                                        item?.tag
                                                    )}
                                                    .
                                                </>
                                            }
                                            status={
                                                item?.tag == "COMPLETED"
                                                    ? "Complete"
                                                    : item?.tag
                                            }
                                            time={moment()
                                                .endOf("day")
                                                .fromNow(item?.createdAt)}
                                            news={!item.viewed}
                                            ariaLabel={item?.description}
                                        />
                                        <Divider />
                                    </Box>
                                )
                            })}
                        </div>
                    </Box>
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 0px 0px 24px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "20px",
                                lineHighlight: "32px",
                                fontWeight: "700",
                                color: "inherit"
                            }}
                        >
                            Notifications
                        </Typography>

                        <Button

                            onClick={() => {
                                dispatch(toggleNotifications(false))
                            }}
                            sx={{
                                py: "16px",
                                m: "4px",
                                "&:hover": {
                                    backgroundColor: "#eee",
                                    borderRadius: "9999px"
                                },
                                transition: "all 300ms ease-in-out"
                            }}
                        >
                            <svg
                                cursor={"pointer"}

                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.0005 6.41L17.5905 5L12.0005 10.59L6.41049 5L5.00049 6.41L10.5905 12L5.00049 17.59L6.41049 19L12.0005 13.41L17.5905 19L19.0005 17.59L13.4105 12L19.0005 6.41Z"
                                    fill="black"
                                    fillOpacity="0.6"
                                />
                            </svg>
                        </Button>
                        {/* <svg
                            cursor={"pointer"}
                           
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.0005 6.41L17.5905 5L12.0005 10.59L6.41049 5L5.00049 6.41L10.5905 12L5.00049 17.59L6.41049 19L12.0005 13.41L17.5905 19L19.0005 17.59L13.4105 12L19.0005 6.41Z"
                                fill="black"
                                fillOpacity="0.6"
                            />
                        </svg> */}
                    </Box>

                    <Divider className="divider-col" />
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: "400",
                                paddingX: "24px",
                                paddingTop: "12px",
                                color: "#000000"
                            }}
                        >
                            No Notifications
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    )

    return (
        <div>
            <Drawer
                className="drawer"
                anchor={"right"}
                open={rightNotificationBar}
                onClose={() => {
                    dispatch(toggleNotifications(false))
                }}
            >
                {list("right")}
            </Drawer>
        </div>
    )
}
export default Notifications
