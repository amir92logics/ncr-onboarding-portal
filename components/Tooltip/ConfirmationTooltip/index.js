import React from "react"
import { Box } from "@mui/system"
import { Typography, tableCellClasses } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export const ConfirmationTooltip = ({
    title,
    width,
    text,
    additional,
    updatedTooltip,
    ariaLabel
}) => {
    function createData(name = name, catagories = catagories) {
        return { name, catagories }
    }
    const rows = [
        createData("Appetizer", "Expo"),
        createData("Salads", "Cold"),
        createData("Entress", "All Kitchen"),
        createData("Dessers", "Cold")
    ]
    return (
        <Box sx={{ position: "relative" }}>
            <Box
                sx={{
                    cursor: "pointer",
                    color: "#757575",
                    "&:hover": {
                        color: "#2E2E2E"
                    }
                }}
                className="tooltipb"
            >
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is {title} tooltip icon</title>
                    <path
                        d="M8.16675 4.83317H9.83342V6.49984H8.16675V4.83317ZM8.16675 8.1665H9.83342V13.1665H8.16675V8.1665ZM9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM9.00008 15.6665C5.32508 15.6665 2.33341 12.6748 2.33341 8.99984C2.33341 5.32484 5.32508 2.33317 9.00008 2.33317C12.6751 2.33317 15.6667 5.32484 15.6667 8.99984C15.6667 12.6748 12.6751 15.6665 9.00008 15.6665Z"
                        fill="currentColor"
                    />
                </svg>
            </Box>
            {updatedTooltip && (
                <Box
                    className="showText"
                    sx={{
                        zIndex: "1",
                        display: "none",
                        opacity: "0",
                        position: "absolute !important",
                        width: { md: "max-content", xs: "max-content" },
                        height: { md: "38px" },
                        borderRadius: "8px !important",
                        left: { xs: "-250px", md: "25px" },
                        top: "2px",
                        marginLeft: "10px"
                    }}
                >
                    {" "}
                    <TableContainer
                        aria-label={ariaLabel}
                        sx={{
                            boxShadow:
                                "0px 8px 10px 1px rgba(0, 0, 0, 0.03), 0px 3px 14px 2px rgba(0, 0, 0, 0.02) !important"
                        }}
                        component={Paper}
                    >
                        <Table
                            sx={{
                                [`& .${tableCellClasses.root}`]: {
                                    border: "none"
                                },
                                borderRadius: "8px"
                            }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        aria-label="Menu Category"
                                        sx={{
                                            padding: "12px 12px",
                                            color:
                                                title != "Menu Category"
                                                    ? "#B3B3B5"
                                                    : "#1E1E1E",
                                            backgroundColor:
                                                title === "Menu Category"
                                                    ? "#FFFFFF"
                                                    : "#FAFAFA",
                                            boxShadow:
                                                "inset 0px -1px 0px rgba(229, 231, 235, 0.6)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            lineHeight: "18px",
                                            borderRight: "1px solid FAFAFA"
                                        }}
                                    >
                                        Menu Category
                                    </TableCell>
                                    <TableCell
                                        aria-label="Printer Groups"
                                        sx={{
                                            padding: "12px 12px",
                                            color:
                                                title === "Menu Category"
                                                    ? "#B3B3B5"
                                                    : "#1E1E1E",
                                            backgroundColor:
                                                title != "Menu Category"
                                                    ? "#FFFFFF"
                                                    : "#FAFAFA",
                                            boxShadow:
                                                "inset 0px -1px 0px rgba(229, 231, 235, 0.6)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            lineHeight: "18px"
                                        }}
                                        align="right"
                                    >
                                        Printer Groups
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 }
                                        }}
                                    >
                                        <TableCell
                                            aria-label={row.name}
                                            sx={{
                                                padding: "12px 12px",
                                                color:
                                                    title != "Menu Category"
                                                        ? "#B3B3B5"
                                                        : "#1E1E1E",
                                                backgroundColor:
                                                    title === "Menu Category"
                                                        ? "#FFFFFF"
                                                        : "#FAFAFA",
                                                boxShadow:
                                                    "inset 0px -1px 0px rgba(229, 231, 235, 0.6)",
                                                fontSize: "12px",
                                                fontWeight: 400,
                                                lineHeight: "18px"
                                            }}
                                            component="th"
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                padding: "12px 12px",
                                                fontSize: "12px",
                                                backgroundColor:
                                                    title != "Menu Category"
                                                        ? "#FFFFFF"
                                                        : "#FAFAFA",
                                                fontWeight: 400,
                                                lineHeight: "18px",
                                                boxShadow:
                                                    "inset 0px -1px 0px rgba(229, 231, 235, 0.6)",
                                                color:
                                                    title === "Menu Category"
                                                        ? "#B3B3B5"
                                                        : "#1E1E1E"
                                            }}
                                            align="left"
                                        >
                                            {row.catagories}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
            <Box
                className="showText"
                sx={{
                    zIndex: "1",
                    display: "none",
                    opacity: "0",
                    position: "absolute !important",
                    width: width ? width : { md: "max-content", xs: "170px" },
                    // height: { md: "30px" },

                    background: "#616161",
                    borderRadius: "4px",
                    left: { xs: "-160px", md: "25px" },
                    top:
                        additional === "additional"
                            ? { xs: "40px", md: "-10px" }
                            : { xs: "40px", md: "-6px" },
                    marginLeft: "10px"
                }}
            >
                <Box
                    className="tool"
                    sx={{
                        backgroundColor: "#616161",
                        position: "absolute",
                        left: "-6px",
                        top: additional === "additional" ? "6px" : "6px",

                        color: "#616161",
                        display: { xs: "none", md: "flex" }
                    }}
                >
                    <svg
                        width={7}
                        height={19}
                        viewBox="0 0 7 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is {title} tooltip icon</title>
                        <path
                            d="M8.34742e-08 7L7 8.34742e-08L7 14L8.34742e-08 7Z"
                            fill="#616161"
                        />
                    </svg>
                </Box>
                <Box
                    className="tool2"
                    sx={{
                        backgroundColor: "#616161",
                        position: "absolute",
                        left: "148px",
                        top: "-13px",
                        display: { md: "none", xs: "flex" },
                        color: "#616161"
                    }}
                >
                    <svg
                        width={19}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>This is {title} tooltip icon</title>

                        <path
                            d="M8.34742e-08 7L7 8.34742e-08L7 14L8.34742e-08 7Z"
                            fill="#616161"
                        />
                    </svg>
                </Box>
                <Typography
                    sx={{
                        fontWeight: "400",
                        lineHeight: "18px",
                        fontSize: "12px",
                        px: 3,
                        py: 1.5,
                        color: "white"
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </Box>
    )
}
