import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { Box } from "@mui/system"

import { Collapse, Typography } from "@mui/material"

export default function LabourTable({
    data,
    setDataType,
    handleDeletePopup,
    dataType,
    handleEditPopup,
    contact,
    disabled,
    collap,
    primary,
    contacts
}) {
    const [open1, SetOpen1] = useState(null)
    const [open, SetOpen] = useState(null)
    const handleDel = (id) => {
        handleDeletePopup(id)
        SetOpen1(false)
    }

    const handleEdit = (id) => {
        handleEditPopup(id)
    }

    return (
        <Collapse
            in={contact ? collap : true}
            sx={{
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                width: "100%",
                borderRadius: "6px",
                display: {
                    md: "flex",
                    xs: "none"
                }
            }}
        >
            <Box>
                <Table
                    className={`${!contact && "shadow"}`}
                    sx={{
                        backgroundColor: "#ffffff",

                        borderTop: contact && "1px solid #E0E0E0",
                        borderBottom: contact && "1px solid #E0E0E0",

                        borderRadius: !contact && "6px",
                        borderBottomLeftRadius: contact && "8px",
                        borderBottomRightRadius: contact && "8px",
                        borderCollapse: "separate",
                        borderLeft: contact && "unset",
                        borderRight: contact && "unset"
                    }}
                >
                    <TableBody>
                        <TableRow>
                            {contact && (
                                <TableCell
                                    sx={{
                                        fontSize: "12px !important",
                                        lineHeight: "24px",
                                        fontWeight: "600",
                                        color: "#1E1E1E",
                                        letterSpacing: "-0.0062em",
                                        textAlign: "left",
                                        whiteSpace: "nowrap",
                                        width: "12px !important"
                                    }}
                                >
                                    S. &nbsp;No
                                </TableCell>
                            )}
                            {data?.head?.map((rowItem, j) => {
                                return (
                                    <TableCell
                                        key={`${j + 1}`}
                                        sx={{
                                            fontSize: "12px   !important",
                                            border: !contact && 0,
                                            lineHeight: "24px",
                                            fontWeight: "600",
                                            color: "#1E1E1E",
                                            letterSpacing: "-0.0062em",

                                            width:
                                                rowItem == "Actions" ||
                                                rowItem == "Action"
                                                    ? "79px"
                                                    : "auto",
                                            textAlign:
                                                rowItem == "Actions" ||
                                                rowItem == "Action"
                                                    ? "center"
                                                    : "left"
                                        }}
                                    >
                                        {rowItem}
                                    </TableCell>
                                )
                            })}
                        </TableRow>

                        {contacts?.map((item, index) => (
                            <React.Fragment key={`${index + 1}`}>
                                {index == 0 && item[0] === "---" ? (
                                    ""
                                ) : (
                                    <TableRow
                                        sx={{
                                            fontSize: {
                                                lg: "12px",
                                                xs: "16px"
                                            },
                                            fontWeight: 600,
                                            lineHeight: {
                                                lg: "12px",
                                                xs: "24px"
                                            }
                                        }}
                                    >
                                        {contact && (
                                            <TableCell
                                                sx={{
                                                    width: "12px !important",
                                                    maxWidth: "79px",
                                                    fontSize:
                                                        "14px   !important",
                                                    lineHeight: "24px",
                                                    fontWeight: "400",
                                                    color: "#5C5C5C",
                                                    letterSpacing: "-0.0062em"
                                                }}
                                                align="center"
                                            >
                                                {" "}
                                                <Box>{index + 1}</Box>
                                            </TableCell>
                                        )}

                                        <TableCell
                                            sx={{
                                                fontSize: "14px   !important",
                                                lineHeight: "24px",
                                                fontWeight: "400",
                                                color: "#5C5C5C",
                                                letterSpacing: "-0.0062em"
                                            }}
                                        >
                                            {item.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: "14px   !important",
                                                lineHeight: "24px",
                                                fontWeight: "400",
                                                color: "#5C5C5C",
                                                letterSpacing: "-0.0062em"
                                            }}
                                        >
                                            {item.phone}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: "14px   !important",
                                                lineHeight: "24px",
                                                fontWeight: "400",
                                                color: "#5C5C5C",
                                                letterSpacing: "-0.0062em"
                                            }}
                                        >
                                            {item.email}
                                        </TableCell>

                                        {contact ? (
                                            <TableCell
                                                sx={{
                                                    cursor: !disabled
                                                        ? "pointer"
                                                        : "not-allowed",
                                                    position: "relative",
                                                    px: 1
                                                }}
                                                align="center"
                                                onClick={() =>
                                                    !disabled &&
                                                    SetOpen(
                                                        open === index
                                                            ? null
                                                            : index
                                                    )
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

                                                {open == index && (
                                                    <Box
                                                        sx={{
                                                            transition: "all",
                                                            padding: 2,

                                                            width: "180px",
                                                            background:
                                                                "#FFFFFF",
                                                            boxShadow:
                                                                " 0px 8px 16px 3px rgba(117, 117, 117, 0.09)",

                                                            borderRadius: "4px",
                                                            position:
                                                                "absolute",
                                                            zIndex: 30,
                                                            right: 0,

                                                            marginTop: "9px"
                                                        }}
                                                    >
                                                        {item.name !=
                                                            primary && (
                                                            <Box
                                                                onClick={() => {
                                                                    if (
                                                                        !disabled
                                                                    ) {
                                                                        handleEdit(
                                                                            item.id
                                                                        )
                                                                        setDataType(
                                                                            dataType
                                                                        )
                                                                    }
                                                                }}
                                                                sx={{
                                                                    cursor: !disabled
                                                                        ? "pointer"
                                                                        : "not-allowed",
                                                                    padding:
                                                                        "8px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center"
                                                                }}
                                                            >
                                                                <svg
                                                                    width={13}
                                                                    height={12}
                                                                    viewBox="0 0 13 12"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>This is edit icon</title>
                                                                    <path
                                                                        d="M7.37333 4.01333L7.98667 4.62667L1.94667 10.6667H1.33333V10.0533L7.37333 4.01333ZM9.77333 0C9.60667 0 9.43333 0.0666666 9.30667 0.193333L8.08667 1.41333L10.5867 3.91333L11.8067 2.69333C12.0667 2.43333 12.0667 2.01333 11.8067 1.75333L10.2467 0.193333C10.1133 0.06 9.94667 0 9.77333 0ZM7.37333 2.12667L0 9.5V12H2.5L9.87333 4.62667L7.37333 2.12667Z"
                                                                        fill="#5C5C5C"
                                                                    />
                                                                </svg>
                                                                <Typography
                                                                    variant="body1"
                                                                    color="initial"
                                                                    sx={{
                                                                        marginLeft:
                                                                            "10px",
                                                                        color: "#5C5C5C",
                                                                        fontWeight: 400,
                                                                        fontSize:
                                                                            "12px",
                                                                        lineHeight:
                                                                            "16px"
                                                                    }}
                                                                >
                                                                    Edit
                                                                </Typography>{" "}
                                                            </Box>
                                                        )}
                                                        <Box
                                                            sx={{
                                                                cursor: !disabled
                                                                    ? "pointer"
                                                                    : "not-allowed",
                                                                padding: "8px",
                                                                display: "flex",
                                                                alignItems:
                                                                    "center"
                                                            }}
                                                            onClick={() => {
                                                                if (!disabled) {
                                                                    handleDel(
                                                                        item.id
                                                                    )
                                                                    setDataType(
                                                                        dataType
                                                                    )
                                                                }
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
                                                                    marginLeft:
                                                                        "13px",
                                                                    color: "#5C5C5C",
                                                                    fontWeight: 400,
                                                                    fontSize:
                                                                        "12px",
                                                                    lineHeight:
                                                                        "16px"
                                                                }}
                                                            >
                                                                Remove
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </TableCell>
                                        ) : (
                                            ""
                                        )}
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Collapse>
    )
}
