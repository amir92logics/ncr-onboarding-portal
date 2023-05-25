import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import { Button, Card, CardMedia, Divider, Typography } from "@mui/material"
import DefaultUser from "../../../src/avatar/defaultUser.jpg"
import moment from "moment"
import Image from "next/image"
import theme from "../../../src/theme"

export default function MessagingBody({
    messagingArray,
    handleSendMessage,
    updateDom
}) {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        if (messagesEndRef !== null) {
            const scroll =
                messagesEndRef.current.scrollHeight -
                messagesEndRef.current.clientHeight
            messagesEndRef.current.scrollTo(0, scroll)
        }
    }

    useEffect(() => {
        setMessages(messagingArray)
        scrollToBottom()
    }, [messagingArray, updateDom])

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const tempMessageChip = {
            messageId: Math.random(),
            status: "inherit",
            message: message,
            name: "NCR Admin",
            time: moment(new Date()).format("LT"),
            avatar: DefaultUser,
            attachment: null
        }
        handleSendMessage(tempMessageChip)
        handleResetForm()
    }
    const handleResetForm = () => {
        setMessage("")
    }
    return (
        <Box
            className={"message-box-container"}
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: "12px 16px",
                borderRadius: "8px",
                width: "100%",
                background: "#FFFFFF",
                boxShadow: " 0px 8px 20px 3px rgba(117, 117, 117, 0.04)"
            }}
        >
            <Box
                ref={messagesEndRef}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    overflowY: "scroll",
                    height: { lg: "520px" }
                }}
            >
                {messages?.map((item, index) => (
                    <Box key={index}>
                        {item?.status == "unread" && (
                            <Box
                                sx={{
                                    width: "100%",
                                    justifyContent: "center !important",
                                    alignItems: "center !important",
                                    display: "flex",
                                    overflow: "hidden",
                                    marginTop: "12px"
                                }}
                            >
                                <Divider className="Messaging-divider" />
                                <Box
                                    sx={{
                                        width: "max-content",
                                        padding: "10px 20px",
                                        fontWeight: "500",
                                        fontSize: "13px",
                                        lineHeight: "15px",
                                        color: "#000000DE",
                                        border: "1px solid rgba(0, 0, 0, 0.12)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: "max-content",
                                            fontWeight: "500",
                                            fontSize: "13px",
                                            lineHeight: "15px",
                                            color: "#000000DE"
                                        }}
                                    >
                                        Unread (03)
                                    </Typography>
                                    <svg
                                        style={{ marginLeft: "12px" }}
                                        width={8}
                                        height={5}
                                        viewBox="0 0 8 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.28 0.47C7.14 0.33 6.94 0.249999 6.75 0.249999C6.56 0.249999 6.37 0.32 6.22 0.47L4 2.69L1.78 0.47C1.64 0.33 1.44 0.249999 1.25 0.249999C1.06 0.249999 0.86 0.32 0.720001 0.47C0.580001 0.619999 0.5 0.809999 0.5 1C0.5 1.19 0.580001 1.39 0.720001 1.53L3.47 4.28C3.62 4.43 3.81 4.5 4 4.5C4.19 4.5 4.38 4.42 4.53 4.28L4.56 4.25L7.28 1.53C7.43 1.39 7.5 1.19 7.5 1C7.5 0.809999 7.43 0.619999 7.28 0.47Z"
                                            fill="black"
                                            fillOpacity="0.87"
                                        />
                                    </svg>
                                </Box>
                                <Divider className="Messaging-divider" />
                            </Box>
                        )}

                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                marginTop: index !== 0 ? "24px" : "0px"
                            }}
                        >
                            <Box
                                sx={{
                                    height: "40px",
                                    objectFit: "contain",
                                    width: "40px",
                                    maxHeight: "40px",
                                    maxWidth: "40px",
                                    marginRight: "16px"
                                }}
                            >
                                <Box style={{ height: "40px", width: "40px" }}>
                                    <Image
                                        style={{ borderRadius: "8px" }}
                                        width="40"
                                        height="40"
                                        objectFit="cover"
                                        src={item?.avatar}
                                        alt="NCR-user"
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "16px",
                                            color: "#000000DE"
                                        }}
                                    >
                                        {item?.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            paddingLeft: "4px",
                                            fontWeight: "600",
                                            fontSize: "12px",
                                            lineHeight: "12px",
                                            color: "#00000099"
                                        }}
                                    >
                                        {item?.time}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            paddingRight: "12px",
                                            marginTop: "8px",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            color: "#00000099"
                                        }}
                                    >
                                        {item?.message}
                                    </Typography>
                                    {item?.attachment !== null && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                marginTop: "8px"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    width: "2px",
                                                    height: "232px",
                                                    background:
                                                        "rgba(0, 0, 0, 0.1)",
                                                    marginRight: "16px"
                                                }}
                                            ></Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <svg
                                                        style={{
                                                            marginRight: "11px"
                                                        }}
                                                        width={20}
                                                        height={20}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_28_2599)">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M5.12493 0H11.8116L17.4787 5.90705V17.3963C17.4787 18.8356 16.3143 20 14.88 20H5.12493C3.68565 20 2.52124 18.8356 2.52124 17.3963V2.60369C2.52121 1.16441 3.68563 0 5.12493 0V0Z"
                                                                fill="#E5252A"
                                                            />
                                                            <path
                                                                opacity="0.302"
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M11.8066 0V5.86207H17.4788L11.8066 0Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M5.41479 14.9227V11.2695H6.96902C7.35383 11.2695 7.65869 11.3745 7.88857 11.5894C8.11845 11.7993 8.23341 12.0841 8.23341 12.4389C8.23341 12.7938 8.11845 13.0786 7.88857 13.2885C7.65869 13.5034 7.35383 13.6084 6.96902 13.6084H6.34933V14.9227H5.41479ZM6.34933 12.8138H6.86408C7.004 12.8138 7.11395 12.7838 7.18892 12.7138C7.26387 12.6489 7.30388 12.5589 7.30388 12.439C7.30388 12.319 7.2639 12.2291 7.18892 12.1641C7.11397 12.0941 7.00402 12.0642 6.86408 12.0642H6.34933V12.8138ZM8.61819 14.9227V11.2695H9.91254C10.1674 11.2695 10.4073 11.3045 10.6322 11.3795C10.8571 11.4544 11.062 11.5594 11.2419 11.7043C11.4218 11.8442 11.5667 12.0341 11.6717 12.274C11.7716 12.5139 11.8266 12.7888 11.8266 13.0986C11.8266 13.4035 11.7716 13.6783 11.6717 13.9182C11.5667 14.1581 11.4218 14.348 11.2419 14.4879C11.0619 14.6328 10.8571 14.7378 10.6322 14.8128C10.4073 14.8877 10.1674 14.9227 9.91254 14.9227H8.61819ZM9.53274 14.1281H9.8026C9.94752 14.1281 10.0825 14.1131 10.2074 14.0781C10.3273 14.0432 10.4423 13.9882 10.5522 13.9132C10.6572 13.8383 10.7421 13.7333 10.8021 13.5934C10.8621 13.4535 10.8921 13.2885 10.8921 13.0986C10.8921 12.9037 10.8621 12.7388 10.8021 12.5989C10.7421 12.459 10.6572 12.354 10.5522 12.279C10.4423 12.2041 10.3274 12.1491 10.2074 12.1141C10.0825 12.0792 9.94752 12.0641 9.8026 12.0641H9.53274V14.1281ZM12.2964 14.9227V11.2695H14.8951V12.0641H13.2309V12.6488H14.5602V13.4384H13.2309V14.9227H12.2964Z"
                                                                fill="white"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_28_2599">
                                                                <rect
                                                                    width={20}
                                                                    height={20}
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                            lineHeight: "12px",
                                                            color: "#000000DE"
                                                        }}
                                                    >
                                                        {
                                                            item?.attachment
                                                                ?.fileName
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            paddingLeft: "12px",
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                            lineHeight: "12px",
                                                            color: "#00000099"
                                                        }}
                                                    >
                                                        Size:{" "}
                                                        {item?.attachment?.size}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        height: "200px",
                                                        overflow: "hidden",
                                                        borderRadius: "4px",
                                                        width: "355.5px",
                                                        maxHeight: "200px",
                                                        maxWidth: "355.5px",
                                                        marginTop: "12px"
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                        src={
                                                            item?.attachment
                                                                ?.preview
                                                        }
                                                        alt="NCR-user"
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            <form
            aria-label={`This is Message form`}
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <Box
                    sx={{
                        marginTop: "28px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        display: "flex",
                        flexDirection: "column",
                        padding: "24px",
                        borderRadius: "8px"
                    }}
                    className="messagebox"
                >
                    <textarea
                        className="f-f-r "
                        placeholder="Type something"
                        name="phone"
                        style={{
                            width: "100%"
                        }}
                        onChange={(e) => {
                            handleMessageChange(e)
                        }}
                        value={message}
                        rows="2"
                        required
                        type={"textarea"}
                        autoComplete="newPassword"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            {/* bold */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={10}
                                    height={12}
                                    viewBox="0 0 10 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.312 6.008C8.008 5.48 8.4 4.72 8.4 3.8C8.4 2.144 7.056 0.799999 5.4 0.799999H0.6C0.272 0.799999 0 1.072 0 1.4V11.4C0 11.728 0.272 12 0.6 12H6C7.768 12 9.2 10.568 9.2 8.8C9.2 7.52 8.496 6.528 7.312 6.008ZM4.2 2C5.192 2 6 2.808 6 3.8C6 4.792 5.192 5.6 4.2 5.6H2.392V2H4.2ZM2.4 10.8V6.8H4.6H4.8C5.904 6.8 6.8 7.696 6.8 8.8C6.8 9.904 5.904 10.8 4.8 10.8H2.4Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>
                            {/* italic */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={16}
                                    height={13}
                                    viewBox="0 0 16 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.296 6C6.72 5.504 5.68 4.616 5.68 3.68C5.68 2.6 6.704 1.76 8.16 1.76C9.784 1.76 10.928 2.568 10.928 3.6C10.928 3.928 11.2 4.2 11.528 4.2C11.856 4.2 12.128 3.928 12.128 3.6C12.128 1.864 10.488 0.639999 8.16 0.639999C5.96 0.639999 4.4 1.896 4.4 3.68C4.4 4.592 4.952 5.432 5.84 6H1.2C0.872 6 0.6 6.272 0.6 6.6C0.6 6.928 0.872 7.2 1.2 7.2H14.8C15.128 7.2 15.4 6.928 15.4 6.6C15.4 6.272 15.128 6 14.8 6H8.296ZM10.512 8.4C10.592 8.632 10.64 8.896 10.64 9.12C10.64 10.2 9.616 11.04 8.16 11.04C6.536 11.04 5.384 10.232 5.384 9.2C5.384 8.872 5.112 8.6 4.784 8.6C4.456 8.6 4.184 8.872 4.184 9.2C4.184 10.936 5.832 12.16 8.16 12.16C10.36 12.16 11.92 10.904 11.92 9.12C11.92 8.896 11.888 8.632 11.84 8.4H10.512Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>

                            {/* line on text */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={16}
                                    height={13}
                                    viewBox="0 0 16 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.296 6C6.72 5.504 5.68 4.616 5.68 3.68C5.68 2.6 6.704 1.76 8.16 1.76C9.784 1.76 10.928 2.568 10.928 3.6C10.928 3.928 11.2 4.2 11.528 4.2C11.856 4.2 12.128 3.928 12.128 3.6C12.128 1.864 10.488 0.639999 8.16 0.639999C5.96 0.639999 4.4 1.896 4.4 3.68C4.4 4.592 4.952 5.432 5.84 6H1.2C0.872 6 0.6 6.272 0.6 6.6C0.6 6.928 0.872 7.2 1.2 7.2H14.8C15.128 7.2 15.4 6.928 15.4 6.6C15.4 6.272 15.128 6 14.8 6H8.296ZM10.512 8.4C10.592 8.632 10.64 8.896 10.64 9.12C10.64 10.2 9.616 11.04 8.16 11.04C6.536 11.04 5.384 10.232 5.384 9.2C5.384 8.872 5.112 8.6 4.784 8.6C4.456 8.6 4.184 8.872 4.184 9.2C4.184 10.936 5.832 12.16 8.16 12.16C10.36 12.16 11.92 10.904 11.92 9.12C11.92 8.896 11.888 8.632 11.84 8.4H10.512Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>
                            {/* bracket */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={16}
                                    height={10}
                                    viewBox="0 0 16 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.008 9.6C7.272 9.6 7.52 9.416 7.584 9.152L9.584 0.759999C9.592 0.712 9.6 0.664 9.6 0.615999C9.6 0.296 9.352 0 8.992 0C8.728 0 8.488 0.183999 8.424 0.448L6.424 8.84C6.408 8.896 6.4 8.944 6.4 9C6.4 9.312 6.656 9.6 7.008 9.6ZM3.8 7.6C4.128 7.6 4.4 7.328 4.4 7C4.4 6.84 4.344 6.68 4.224 6.576L2.2 4.8L4.216 3.032C4.336 2.928 4.4 2.768 4.4 2.6C4.4 2.272 4.128 2 3.8 2C3.632 2 3.488 2.08 3.368 2.184L0.992 4.36C0.872 4.472 0.8 4.624 0.8 4.8C0.8 4.976 0.872 5.128 0.992 5.24L3.376 7.424C3.496 7.528 3.64 7.6 3.8 7.6ZM12.2 7.6C12.36 7.6 12.504 7.528 12.624 7.424L15.008 5.24C15.128 5.128 15.2 4.976 15.2 4.8C15.2 4.624 15.128 4.472 15.008 4.36L12.632 2.184C12.512 2.08 12.368 2 12.2 2C11.872 2 11.6 2.272 11.6 2.6C11.6 2.768 11.664 2.928 11.784 3.032L13.8 4.8L11.776 6.576C11.656 6.68 11.6 6.84 11.6 7C11.6 7.328 11.872 7.6 12.2 7.6Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>
                            {/* Clip */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={14}
                                    height={13}
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.568 9.04C8.384 9.032 9.208 8.72 9.832 8.096L12.464 5.464C13.088 4.84 13.4 4.024 13.4 3.2C13.4 2.384 13.088 1.56 12.464 0.936C11.84 0.311999 11.016 -9.53674e-07 10.2 -9.53674e-07C9.376 -9.53674e-07 8.56 0.311999 7.936 0.936L7.056 1.816C6.808 2.08 6.808 2.432 7.056 2.664C7.336 2.912 7.664 2.904 7.904 2.664L8.784 1.784C9.176 1.4 9.688 1.2 10.2 1.2C10.712 1.192 11.224 1.4 11.616 1.784C12 2.176 12.208 2.688 12.2 3.2C12.2 3.712 12 4.224 11.616 4.616L8.976 7.248C8.592 7.64 8.08 7.832 7.568 7.832C6.712 7.848 6.336 7.376 5.872 6.912C5.64 6.68 5.256 6.68 5.024 6.912C4.816 7.128 4.792 7.448 4.96 7.688C5.616 8.536 6.448 9.032 7.568 9.04ZM3.8 12.8C4.624 12.8 5.44 12.488 6.064 11.864L6.944 10.984C7.192 10.72 7.192 10.368 6.944 10.136C6.664 9.888 6.336 9.896 6.096 10.136L5.216 11.016C4.824 11.4 4.312 11.6 3.8 11.6C3.288 11.6 2.776 11.4 2.384 11.016C2 10.624 1.8 10.112 1.8 9.6C1.8 9.088 2 8.576 2.384 8.184L5.024 5.552C5.408 5.16 5.92 4.968 6.432 4.968C7.448 4.968 7.752 5.512 8.128 5.888C8.36 6.12 8.744 6.12 8.976 5.888C9.304 5.56 9.096 5.104 8.696 4.704C8.072 4.08 7.256 3.768 6.432 3.76C5.616 3.768 4.792 4.08 4.168 4.704L1.536 7.336C0.912 7.96 0.6 8.776 0.6 9.6C0.6 10.416 0.912 11.24 1.536 11.864C2.16 12.488 2.984 12.8 3.8 12.8Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={14}
                                    height={3}
                                    viewBox="0 0 14 3"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.2 1.4C3.2 0.631999 2.568 -4.76837e-07 1.8 -4.76837e-07C1.032 -4.76837e-07 0.4 0.631999 0.4 1.4C0.4 2.168 1.032 2.8 1.8 2.8C2.576 2.8 3.2 2.176 3.2 1.4ZM8.4 1.4C8.4 0.672 7.736 -4.76837e-07 7 -4.76837e-07C6.232 -4.76837e-07 5.6 0.631999 5.6 1.4C5.6 2.168 6.232 2.8 7 2.8C7.776 2.8 8.4 2.176 8.4 1.4ZM13.6 1.4C13.6 0.631999 12.968 -4.76837e-07 12.2 -4.76837e-07C11.432 -4.76837e-07 10.8 0.631999 10.8 1.4C10.8 2.168 11.432 2.8 12.2 2.8C12.976 2.8 13.6 2.176 13.6 1.4Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>
                            {/* Aa */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={16}
                                    height={13}
                                    viewBox="0 0 16 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 12H1.304L2.304 9.016H6.752L7.744 12H9.048L5.456 1.584C5.112 0.591999 3.968 0.599999 3.624 1.584L0 12ZM4.488 2.504C4.504 2.448 4.568 2.448 4.584 2.504L6.408 7.976H2.656L4.488 2.504ZM12.728 3.104C10.744 3.096 9.416 4.152 9.416 5.752H10.624C10.624 4.896 11.464 4.32 12.728 4.32C13.968 4.32 14.8 4.896 14.8 5.768V7.2H12.032C10.352 7.2 9.232 8.192 9.232 9.672C9.232 11.16 10.352 12.152 12.032 12.152C13.08 12.152 14.128 11.656 14.8 10.856V12H16V5.752C16 4.168 14.688 3.112 12.728 3.104ZM12.032 11.032C11.072 11.032 10.432 10.488 10.432 9.672C10.432 8.864 11.072 8.32 12.032 8.32H14.8V9.328C13.968 10.544 12.864 11.032 12.032 11.032Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    />
                                </svg>
                            </Box>
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={14}
                                    height={15}
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 0.599999C3.248 0.599999 0.2 3.648 0.2 7.4C0.2 11.152 3.248 14.2 7 14.2C8.256 14.2 9.432 13.88 10.464 13.312L10.488 13.296C10.68 13.192 10.808 12.992 10.808 12.768C10.808 12.44 10.536 12.168 10.208 12.168C10.104 12.168 10 12.2 9.912 12.248C9.048 12.728 8.056 13 7 13C3.912 13 1.4 10.488 1.4 7.4C1.4 4.312 3.912 1.8 7 1.8C10.088 1.8 12.6 4.312 12.6 7.4C12.6 8.744 12.176 9.4 11.4 9.4C10.712 9.4 10.2 8.776 10.2 8V4.8C10.2 4.472 9.928 4.2 9.6 4.2C9.272 4.2 9 4.472 9 4.8V4.904C8.456 4.464 7.76 4.2 7 4.2C5.232 4.2 3.8 5.632 3.8 7.4C3.8 9.168 5.232 10.6 7 10.6C7.968 10.6 8.84 10.168 9.424 9.488C9.856 10.16 10.576 10.6 11.4 10.6C12.888 10.6 13.8 9.392 13.8 7.4C13.8 3.648 10.752 0.599999 7 0.599999ZM7 9.4C5.896 9.4 5 8.504 5 7.4C5 6.296 5.896 5.4 7 5.4C8.104 5.4 9 6.296 9 7.4C9 8.504 8.104 9.4 7 9.4Z"
                                        fill="black"
                                        fillOpacity="0.6"
                                    />
                                </svg>
                            </Box>
                            {/* emoji */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={16}
                                    height={15}
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 0.2C4.024 0.2 0.8 3.424 0.8 7.4C0.8 11.376 4.024 14.6 8 14.6C11.976 14.6 15.2 11.376 15.2 7.4C15.2 3.424 11.976 0.2 8 0.2ZM8 1.4C11.312 1.4 14 4.088 14 7.4C14 10.712 11.312 13.4 8 13.4C4.688 13.4 2 10.712 2 7.4C2 4.088 4.688 1.4 8 1.4ZM6 7C6.664 7 7.2 6.464 7.2 5.8C7.2 5.136 6.664 4.6 6 4.6C5.336 4.6 4.8 5.136 4.8 5.8C4.8 6.464 5.336 7 6 7ZM10 7C10.664 7 11.2 6.464 11.2 5.8C11.2 5.136 10.664 4.6 10 4.6C9.336 4.6 8.8 5.136 8.8 5.8C8.8 6.464 9.336 7 10 7ZM8 11.16C10.336 11.16 11.6 9.488 11.6 8.56C11.6 8.24 11.352 7.96 11 7.96C10.728 7.96 10.488 8.144 10.424 8.416C10.208 9.336 8.984 9.96 8 9.96C6.936 9.96 5.8 9.336 5.576 8.408C5.512 8.144 5.272 7.96 5 7.96C4.648 7.96 4.4 8.24 4.4 8.56C4.4 9.56 5.704 11.16 8 11.16Z"
                                        fill="black"
                                        fillOpacity="0.6"
                                    />
                                </svg>
                            </Box>

                            {/* attachment */}
                            <Box
                                sx={{ paddingRight: "16px", cursor: "pointer" }}
                            >
                                <svg
                                    width={10}
                                    height={15}
                                    viewBox="0 0 10 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 14.6C7.648 14.6 9.8 12.448 9.8 9.8V3.8C9.8 1.808 8.192 0.2 6.2 0.2C4.208 0.2 2.6 1.808 2.6 3.8V9.8C2.6 11.128 3.672 12.2 5 12.2C6.328 12.2 7.4 11.128 7.4 9.8V4.4C7.4 4.064 7.136 3.8 6.8 3.8C6.472 3.8 6.2 4.064 6.2 4.4V9.8C6.2 10.464 5.664 11 5 11C4.336 11 3.8 10.464 3.8 9.8V3.8C3.8 2.472 4.872 1.4 6.2 1.4C7.528 1.4 8.6 2.472 8.6 3.8V9.8C8.6 11.792 6.992 13.4 5 13.4C3.008 13.4 1.4 11.792 1.4 9.8V5.2C1.4 4.864 1.136 4.6 0.8 4.6C0.472 4.6 0.2 4.864 0.2 5.2V9.8C0.2 12.448 2.352 14.6 5 14.6Z"
                                        fill="black"
                                        fillOpacity="0.6"
                                    />
                                </svg>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                textDecoration: "none",
                                boxShadow: "none",

                                borderRadius: "8px",
                                width: "81px",
                                backgroundColor: theme.palette.primary.main,
                                fontWeight: "600",
                                fontSize: "14px",
                                lineHeigh: "18px",
                                paddingTop: "8px 22px",
                                "&:hover": {
                                    background: theme.palette.primary.main,
                                    boxShadow: "none"
                                }
                            }}
                            aria-label="Send"
                            type={"submit"}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
