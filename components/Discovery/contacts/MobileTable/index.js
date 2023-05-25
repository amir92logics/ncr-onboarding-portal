import { Collapse, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import React, { useState } from "react"

export const MobileTable = (data) => {
    const [open, SetOpen] = useState(null)
    const handleDel = (id) => {
        data.handleDeletePopup(id, data?.dataType, data?.idx)
    }
    const handleEdit = (id) => {
        data.handleEditPopup(id, data?.idx)
    }

    return (
        <Collapse timeout={500} in={data.cardID === data.idx} unmountOnExit>
            {data?.contactsData?.map((item, index) => (
                <Box
                    key={index}
                    display="flex"
                    flexDirection="column"
                    justifyContent={"flex-start"}
                    marginBottom="16px"
                    flexWrap="wrap"
                    sx={{
                        borderTop: "1px solid #C9C9C9",
                        backgroundColor: "white",
                        mt: "4px",
                        borderRadius: data.contact && "8px",
                        marginX: !data.contact && "16px",
                        paddingTop: 4,
                        paddingX: data.contact === false ? 0 : 4,
                        paddingBottom: data.contact === false ? 1 : 4,
                        display: {
                            lg: "none",
                            md: "none",
                            sm: "block",
                            xs: "block"
                        }
                    }}
                >
                    {data?.data.head[0] && (
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            sx={{
                                marginTop: { md: "0px", xs: "-2px" }
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    paddingRight: "32px",
                                    marginBottom: data?.data.head[1] ? 4 : 0
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            letterSpacing: "-0.0062em",
                                            marginBottom: {
                                                md: "0px",
                                                xs: "2px"
                                            }
                                        }}
                                    >
                                        {data?.data.head[0]}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            letterSpacing: "-0.0062em",
                                            mt: "6px",
                                            wordBreak: "break-all"
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                </Box>

                                <Box>
                                    {!data.contact && data?.data.head[1] && (
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    letterSpacing: "-0.0062em"
                                                }}
                                            >
                                                {data?.data.head[1]}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    letterSpacing: "-0.0062em",
                                                    mt: "6px"
                                                }}
                                            >
                                                {item.phone}
                                            </Typography>
                                        </Box>
                                    )}
                                    {data?.data.head[2] === "Cell Phone" && (
                                        <Box
                                            sx={{
                                                marginTop: "14px"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    letterSpacing: "-0.0062em"
                                                }}
                                            >
                                                {data?.data.head[2]}
                                            </Typography>
                                            <Typography>
                                                {data?.data?.rowData[index][2]}
                                
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: "4px",
                                    marginRight: "9px",
                                    cursor: "pointer",
                                    px: 1
                                }}
                                onClick={() =>
                                    !data.disabled &&
                                    SetOpen(open === index ? null : index)
                                }
                            >
                                <svg
                                    width={4}
                                    height={16}
                                    viewBox="0 0 4 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is actions icon</title>
                                    <path
                                        d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"
                                        fill="#5C5C5C"
                                    />
                                </svg>

                                {open === index ? (
                                    <Box
                                        sx={{
                                            transition: "all",

                                            padding: 2,

                                            width: "180px",
                                            background: "#FFFFFF",
                                            boxShadow:
                                                " 0px 8px 16px 3px rgba(117, 117, 117, 0.09)",
                                            borderRadius: "4px",
                                            position: "absolute",
                                            zIndex: 30,
                                            right: 12,
                                            marginTop: "9px"
                                        }}
                                    >
                                        {item.name != data.primary && (
                                            <Box
                                                onClick={() => {
                                                    handleEdit(item.id)
                                                    data.setDataType(
                                                        data.dataType
                                                    )
                                                    SetOpen(
                                                        open === index
                                                            ? null
                                                            : index
                                                    )
                                                }}
                                                sx={{
                                                    cursor: "pointer",
                                                    padding: "8px",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <svg
                                                    width={13}
                                                    height={12}
                                                    viewBox="0 0 13 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>This is Edit icon</title>
                                                    <path
                                                        d="M7.37333 4.01333L7.98667 4.62667L1.94667 10.6667H1.33333V10.0533L7.37333 4.01333ZM9.77333 0C9.60667 0 9.43333 0.0666666 9.30667 0.193333L8.08667 1.41333L10.5867 3.91333L11.8067 2.69333C12.0667 2.43333 12.0667 2.01333 11.8067 1.75333L10.2467 0.193333C10.1133 0.06 9.94667 0 9.77333 0ZM7.37333 2.12667L0 9.5V12H2.5L9.87333 4.62667L7.37333 2.12667Z"
                                                        fill="#5C5C5C"
                                                    />
                                                </svg>
                                                <Typography
                                                    variant="body1"
                                                    color="initial"
                                                    sx={{
                                                        marginLeft: "10px",
                                                        color: "#5C5C5C",
                                                        fontWeight: 400,
                                                        fontSize: "12px",
                                                        lineHeight: "16px"
                                                    }}
                                                >
                                                    Edit
                                                </Typography>{" "}
                                            </Box>
                                        )}
                                        <Box
                                            sx={{
                                                cursor: "pointer",
                                                padding: "8px",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                            onClick={() => {
                                                handleDel(item.id)
                                                data.setDataType(data.dataType)
                                                SetOpen(
                                                    open === index
                                                        ? null
                                                        : index
                                                )
                                            }}
                                        >
                                            <Box sx={{}}>
                                                <svg
                                                    width={10}
                                                    height={12}
                                                    viewBox="0 0 10 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title>This is remove icon</title>
                                                    <path
                                                        d="M7.66732 4V10.6667H2.33398V4H7.66732ZM6.66732 0H3.33398L2.66732 0.666667H0.333984V2H9.66732V0.666667H7.33398L6.66732 0ZM9.00065 2.66667H1.00065V10.6667C1.00065 11.4 1.60065 12 2.33398 12H7.66732C8.40065 12 9.00065 11.4 9.00065 10.6667V2.66667Z"
                                                        fill="#5C5C5C"
                                                    />
                                                </svg>
                                            </Box>{" "}
                                            <Typography
                                                sx={{
                                                    marginLeft: "13px",
                                                    color: "#5C5C5C",
                                                    fontWeight: 400,
                                                    fontSize: "12px",
                                                    lineHeight: "16px"
                                                }}
                                            >
                                                Remove
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : (
                                    ""
                                )}
                            </Box>
                        </Box>
                    )}

                    <Box
                        sx={{
                            marginTop: data.contact && "16px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                letterSpacing: "-0.0062em"
                            }}
                        >
                            {data?.data.head[2] != "Actions" &&
                                data?.data.head[2]}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "400",
                                letterSpacing: "-0.0062em",
                                paddingTop: "8px"
                            }}
                        >
                            {item.email}
                        </Typography>
                    </Box>

                    {data.contact && (
                        <Box
                            sx={{
                                marginTop: "16px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    letterSpacing: "-0.0062em"
                                }}
                            >
                                {data?.data.head[3]}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    letterSpacing: "-0.0062em",
                                    mt: "6.5px"
                                }}
                            >
                                {data?.data?.rowData[index][3]}
                            </Typography>
                        </Box>
                    )}
                </Box>
            ))}
        </Collapse>
    )
}
