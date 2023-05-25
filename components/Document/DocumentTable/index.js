import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Fade, Typography } from "@mui/material"
import DocumentUploader from "../Uploader"
import moment from "moment"
import DeleteDocumentPopUp from "../DeletePopup"
import theme from "../../../src/theme"
import { useRouter } from "next/router"
import { OverViewStatusChip } from "../../common/CustomStatusChip"
import Notification from "../../common/Notifications"
import Image from "next/image"
export default function DocumentsTable({
    signoff,
    tableData,
    disableSubmit,
    type,
    setProgress,
    progress,
    fileName,
    setFileName,
    uploading,
    notify1,
    setNotify1,
    setUploading
}) {
    const [notify, setNotify] = useState(false)
    const [data, setData] = useState([
        { name: "", type: "", createdAt: "", status: "", file_path: "" }
    ])
    const [document, setDocument] = useState(null)
    useEffect(() => {
        setData([...tableData])
    }, [tableData])
    let _data =
        type !== "overview" ? data?.filter((val) => val.type === type) : data
    const handleReplaceType = (type) => {
        return type === "floor_plan_upload_filename"
            ? "Floor Plan"
            : type === "menu_upload_filename"
            ? "Menu"
            : type === "credit_card_upload_filename"
            ? "Credit Card VAR"
            : type === "wireless_upload_filename"
            ? "Wireless Solution"
            : type
    }
    const router = useRouter()

    const path = router.asPath
    // const [sortArray, setSortArray] = useState("")
    // const sortBy = (type) => {
    //     setSortArray(type)
    //     const temp = [...tableData]
    //     if (type !== "DEFAULT") {
    //         const temp1 = temp?.filter((val) => val.type == type)
    //         const temp2 = temp?.filter((val) => val.type !== type)
    //         setTableData([...temp1, ...temp2])
    //     } else {
    //         setTableData([...temp])
    //     }
    // }
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
                width: "100%"
            }}
        >
            <Box
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    marginBottom: {
                        lg: path.includes("menu") ? "24px" : "19px",
                        md: path.includes("menu") ? "25px" : "17px",
                        xs: path.includes("menu") ? "25px" : "16px"
                    },
                    mt: {
                        xl: path.includes("menu")
                            ? "0px"
                            : path.includes("wireless-solution")
                            ? "10px"
                            : "",
                        lg: path.includes("menu")
                            ? "7px"
                            : path.includes("wireless-solution")
                            ? "10px"
                            : "",
                        md: path.includes("menu")
                            ? "5px"
                            : path.includes("wireless-solution")
                            ? "8px"
                            : "",
                        xs: path.includes("menu")
                            ? "25px"
                            : path.includes("wireless-solution")
                            ? "10px"
                            : ""
                    }
                }}
            >
                <Typography
                    sx={{
                        color: theme.palette.textColor.main,
                        fontSize: "18px",
                        fontWeight: "600"
                    }}
                >
                    {type == "overview"
                        ? "Documents Overview"
                        : "Uploaded Documents"}
                </Typography>
            </Box>
            <DeleteDocumentPopUp
                document={document}
                setDocument={setDocument}
                setNotify={setNotify}
            />

            {_data.length > 0 ? (
                <TableContainer
                    className="shadow"
                    sx={{
                        mt: path.includes("wireless-solution")
                            ? "22px"
                            : "20px !important",
                        border: "unset",
                        borderRadius: "8px !important"
                    }}
                    size="medium"
                    aria-label="document table"
                    component={Paper}
                >
                    <Table
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none"
                            },
                            minWidth: { lg: 650, md: "auto" },
                            border: "unset"
                        }}
                        size="medium"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    borderBottom: "1px solid #EEEEEE",
                                    fontSize: "4px",
                                    fontWeight: 600,
                                    lineHeight: "22px"
                                }}
                            >
                                <TableCell
                                    className="Document-Name"
                                    aria-label="Document Name"
                                    sx={{
                                        pr: 0,
                                        color: theme.palette.textColor.main,
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "22px",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    Document Name
                                </TableCell>
                                <TableCell
                                    className="Document-Type"
                                    aria-label="Document Type"
                                    align="left"
                                    sx={{
                                        color: theme.palette.textColor.main,
                                        pr: 0,
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "22px"
                                    }}
                                >
                                    Document Type
                                </TableCell>
                                <TableCell
                                    className="Submitted-Date"
                                    aria-label="Submitted Date"
                                    align="left"
                                    sx={{
                                        color: theme.palette.textColor.main,
                                        pr: 0,
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "22px"
                                    }}
                                >
                                    Submitted Date
                                </TableCell>
                                <TableCell
                                    className="Status"
                                    aria-label="Status"
                                    align="left"
                                    sx={{
                                        color: theme.palette.textColor.main,
                                        pr: 0,
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "22px",
                                        pt: {
                                            lg:
                                                type == "overview" ||
                                                type ==
                                                    "wireless_upload_filename"
                                                    ? "17px"
                                                    : "auto",
                                            md:
                                                type == "overview"
                                                    ? "16px"
                                                    : type ==
                                                      "menu_upload_filename"
                                                    ? "16px"
                                                    : "auto"
                                        }
                                    }}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    className="View"
                                    aria-label="View"
                                    align="left"
                                    sx={{
                                        pr: 0,
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "22px"
                                    }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_data.map((item, index) => {
                                return (
                                    <Fade
                                        key={`${index + 1}`}
                                        in={true}
                                        {...(true ? { timeout: 1000 } : {})}
                                    >
                                        <TableRow
                                            sx={{
                                                borderBottom:
                                                    "1px solid #EEEEEE"
                                            }}
                                        >
                                            <TableCell
                                                aria-label={item?.name}
                                                sx={{ py: 2.5, px: 4 }}
                                            >
                                                <Typography
                                                    className="f-f-i"
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 400,
                                                        lineHeight: "24px",
                                                        color: "#1e1e1e"
                                                    }}
                                                >
                                                    {item?.name ? (
                                                        TruncateString(
                                                            item?.name,
                                                            20
                                                        )
                                                    ) : (
                                                        <svg
                                                            width={70}
                                                            height={6}
                                                            viewBox="0 0 70 6"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>
                                                                This is empty
                                                                data icon
                                                            </title>
                                                            <rect
                                                                width={70}
                                                                height={6}
                                                                rx={3}
                                                                fill="#D9D9D9"
                                                            />
                                                        </svg>
                                                    )}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                aria-label={item?.type}
                                                align="left"
                                            >
                                                <Box
                                                    sx={{
                                                        pt: {
                                                            xl: 0,
                                                            md: "2px"
                                                        },
                                                        display: " flex",
                                                        justifyContent:
                                                            "flex-start",
                                                        alignItems:
                                                            "flex-start",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <Typography
                                                        className="f-f-i"
                                                        sx={{
                                                            color: theme.palette
                                                                .textColor.main,
                                                            fontSize: "14px",
                                                            fontWeight: 400,
                                                            lineHeight: "12px"
                                                        }}
                                                    >
                                                        {handleReplaceType(
                                                            item?.type
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                aria-label={item?.createdAt}
                                                align="left"
                                            >
                                                <Typography
                                                    className="f-f-i"
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: theme.palette
                                                            .textColor.main,
                                                        fontWeight: 400,
                                                        lineHeight: "12px"
                                                    }}
                                                >
                                                    {item?.createdAt ? (
                                                        moment(
                                                            item?.createdAt
                                                        ).format("L")
                                                    ) : (
                                                        <span
                                                            className="f-f-i"
                                                            style={{
                                                                paddingLeft:
                                                                    "28px"
                                                            }}
                                                        >
                                                            -
                                                        </span>
                                                    )}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{ p: "15px", pt: "14px" }}
                                                aria-label={item?.createdAt}
                                                align="left"
                                            >
                                                {item.submitted ? (
                                                    <OverViewStatusChip
                                                        fontSize={12}
                                                        px="8px"
                                                        py="3px"
                                                        hideSvg={true}
                                                        status={
                                                            item?.status
                                                                ? item.status
                                                                : "Submitted"
                                                        }
                                                        label={
                                                            item?.status
                                                                ? item.status
                                                                : "Submitted"
                                                        }
                                                    />
                                                ) : (
                                                    <>
                                                        {/* <DocumnetStatusChip
                                                    status={
                                                        item?.status
                                                            ? item.status
                                                            : "Submitted"
                                                    }
                                                    label={
                                                        item?.status ===
                                                        "Submitted"
                                                            ? "Submitted"
                                                            : item.status
                                                            ? item.status
                                                            : "Submitted"
                                                    }
                                                /> */}
                                                        <OverViewStatusChip
                                                            fontSize={12}
                                                            px="8px"
                                                            py="3px"
                                                            hideSvg={true}
                                                            status={
                                                                item?.status
                                                                    ? item.status
                                                                    : "completed"
                                                            }
                                                            label={
                                                                item?.status ===
                                                                "Submitted"
                                                                    ? "Submitted"
                                                                    : item.status
                                                                    ? item.status
                                                                    : "Submitted"
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </TableCell>
                                            {item.status === "Pending" ? (
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-start",
                                                            alignItems:
                                                                "center",
                                                            textDecoration:
                                                                "none",
                                                            fontSize: "14px",
                                                            lineHeight: "24px",
                                                            fontWeight: 500,
                                                            color: disableSubmit
                                                                ? "#5b5b5b"
                                                                : theme.palette
                                                                      .primary
                                                                      .main
                                                        }}
                                                    ></Box>
                                                </TableCell>
                                            ) : (
                                                <>
                                                    <TableCell
                                                        aria-label="View"
                                                        align="left"
                                                    >
                                                        <Box
                                                            sx={{
                                                                gap: 4,
                                                                display:
                                                                    " flex",
                                                                justifyContent:
                                                                    "flex-start",
                                                                alignItems:
                                                                    "center"
                                                            }}
                                                        >
                                                            <a
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    fontSize:
                                                                        "14px",
                                                                    lineHeight:
                                                                        "24px",
                                                                    fontWeight: 600,
                                                                    paddingLeft:
                                                                        "20px",
                                                                    cursor: "pointer"
                                                                }}
                                                                href={
                                                                    item?.file_path
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <span
                                                                    style={{
                                                                        color: theme
                                                                            .palette
                                                                            .primary
                                                                            .main
                                                                    }}
                                                                >
                                                                    View
                                                                </span>
                                                            </a>

                                                            {!signoff && (
                                                                <span
                                                                    onClick={() => {
                                                                        setDocument(
                                                                            item
                                                                        )
                                                                    }}
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                        fontSize:
                                                                            "14px",
                                                                        lineHeight:
                                                                            "24px",
                                                                        fontWeight: 500,
                                                                        color: "#E31B0C",
                                                                        cursor: "pointer"
                                                                    }}
                                                                >
                                                                    Delete
                                                                </span>
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                    </Fade>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box
                    sx={{
                        borderRadius: 2,
                        width: "100%",
                        py: 6,
                        bgcolor: "#FFFFFF",
                        boxShadow:
                            " 0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)",
                        textAlign: "center"
                    }}
                >
                    <Image
                        alt={"No Documents Found"}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/documentsempty.svg`}
                        width={122}
                        height={122}
                    />

                    <Box sx={{ mt: 2, mb: 6 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "#727272"
                            }}
                        >
                            No Documents Uploaded
                        </Typography>
                        <Typography sx={{ color: "#727272", fontSize: "12px" }}>
                            Once a Document is added, it will be displayed here.
                        </Typography>
                    </Box>

                    <DocumentUploader
                        notify={notify1}
                        setNotify={setNotify1}
                        setProgress={setProgress}
                        progress={progress}
                        fileName={fileName}
                        setFileName={setFileName}
                        uploading={uploading}
                        setUploading={setUploading}
                        disabled={signoff}
                        uploadFor={type}
                        table={true}
                    />
                </Box>
            )}
            {notify && (
                <Notification
                    open={notify}
                    title={fileName}
                    error={"delete"}
                    subtitle={"has been deleted"}
                    close={() => setNotify(false)}
                />
            )}
        </Box>
    )
}
