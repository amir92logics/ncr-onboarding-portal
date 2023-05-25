import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import { Button, Fade, Typography } from "@mui/material"
import DocumentUploader from "../Uploader"
import moment from "moment"
import DeleteDocumentPopUp from "../DeletePopup"
import theme from "../../../src/theme"
import { OverViewStatusChip } from "../../common/CustomStatusChip"
import Notification from "../../common/Notifications"
import Image from "next/image"
export default function DocumentsTableMobile({
    marginTop,
    tableData,
    signoff,
    handleDelete,
    loading,
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
    const [sortArray, setSortArray] = useState("")
    const [document, setDocument] = useState(null)
    useEffect(() => {
        setData(tableData)
    }, [tableData])

    const handleReplaceType = (type) => {
        return type === "floor_plan_upload_filename"
            ? "Floor Plan"
            : type === "menu_upload_filename"
            ? "Menu"
            : type === "credit_card_upload_filename"
            ? "Credit Card Var"
            : type === "wireless_upload_filename"
            ? "Wireless Solution"
            : type
    }
    const TruncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ".."
        } else {
            return str
        }
    }
    let _data =
        type !== "overview" ? data?.filter((val) => val.type === type) : data
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    marginTop: marginTop
                        ? {
                              lg: "24px",
                              xs: "32px"
                          }
                        : ""
                }}
            >
                <Typography
                    sx={{
                        fontSize: "18px",
                        mt:
                            type == "menu_upload_filename" ||
                            type == "wireless_upload_filename"
                                ? "1px"
                                : 0,
                        mb: type == "menu_upload_filename" ? "15px" : "14px",
                        fontWeight: "600"
                    }}
                >
                    {type == "overview"
                        ? "Documents Overview"
                        : "Uploaded Documents"}
                </Typography>
                <DeleteDocumentPopUp
                    handleDelete={handleDelete}
                    document={document}
                    setDocument={setDocument}
                    loading={loading}
                    setNotify={setNotify}
                />
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection={"column"}
                >
                    {_data.length > 0 ? (
                        _data?.map((item, index) => (
                            <Fade
                                key={`${index + 1}`}
                                in={true}
                                {...(true ? { timeout: 1000 } : {})}
                            >
                                <Box
                                    width="100%"
                                    className="shadow"
                                    sx={{
                                        display: "flex",
                                        borderRadius: "8px",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                        marginTop: index !== 0 ? "14.5px" : 0,
                                        background: "white",
                                        padding: "17px 16px 16px 16px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "50%",
                                                rowGap: 4
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: "#1E1E1E",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        paddingBottom: "8px",
                                                        lineHeight: "18px",
                                                        ml:
                                                            type ==
                                                            "menu_upload_filename"
                                                                ? "-2px"
                                                                : 0,
                                                        pt:
                                                            type ==
                                                            "menu_upload_filename"
                                                                ? "1px"
                                                                : 0
                                                    }}
                                                >
                                                    Document Name
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 400,
                                                        lineHeight: "22px",
                                                        color: "#5C5C5C",
                                                        textTransform:
                                                            "capitalize"
                                                    }}
                                                >
                                                    {TruncateString(
                                                        item?.name,
                                                        20
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: "#1E1E1E",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        paddingBottom: "10px",
                                                        lineHeight: "18px",
                                                        ml:
                                                            type ==
                                                            "menu_upload_filename"
                                                                ? "-2px"
                                                                : 0
                                                    }}
                                                >
                                                    Submitted Date
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 400,
                                                        lineHeight: "22px",
                                                        color: "#5C5C5C"
                                                    }}
                                                >
                                                    {item?.createdAt ? (
                                                        moment(
                                                            item?.createdAt
                                                        ).format("L")
                                                    ) : (
                                                        <Box
                                                            component={"span"}
                                                            className="f-f-i"
                                                            sx={{
                                                                paddingLeft:
                                                                    "28px",
                                                                lineHeight:
                                                                    "22px"
                                                            }}
                                                        >
                                                            -
                                                        </Box>
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                flexDirection: "column",
                                                display: " flex",
                                                rowGap: 4,
                                                width: "50%",
                                                pl: 6
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: "#1E1E1E",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        paddingBottom: "8px",
                                                        lineHeight: "18px"
                                                    }}
                                                >
                                                    Document Type
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 400,
                                                        lineHeight: "22px",
                                                        color: "#5C5C5C"
                                                    }}
                                                >
                                                    {handleReplaceType(
                                                        item?.type
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: "#1E1E1E",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        paddingBottom: "8px",
                                                        width: "106px",
                                                        lineHeight: "18px"
                                                    }}
                                                >
                                                    Status
                                                </Typography>

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
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{ width: "100%", marginTop: "8px" }}
                                    >
                                        {item.status === "Pending" ? (
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    mt: 4
                                                }}
                                                href={item?.file_path}
                                                target="_blank"
                                            >
                                                <Button
                                                    aria-label="this is view button"
                                                    className="back-button"
                                                    sx={{
                                                        fontWeight: "600",
                                                        width: "100%",
                                                        padding: "10px 18px 5px"
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    lineHeight: "22px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 2,
                                                    mt: 4
                                                }}
                                            >
                                                {!signoff && (
                                                    <Button
                                                        onClick={() => {
                                                            setDocument(item) &&
                                                                setNotify(true)
                                                        }}
                                                        className="back-button"
                                                        sx={{
                                                            width: "100%",
                                                            p: "6.7px 8px !important",
                                                            fontWeight: "600",
                                                            color: "rgb(227, 27, 12) !important",
                                                            "&:hover": {
                                                                color: "rgb(227, 27, 12) !important"
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                                <Button
                                                aria-label="this is view button"
                                                    href={item?.file_path}
                                                    target="_blank"
                                                    className="back-button"
                                                    sx={{
                                                        width: "100%",
                                                        p: "6.7px 8px !important",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Fade>
                        ))
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
                                <Typography
                                    sx={{ color: "#727272", fontSize: "12px" }}
                                >
                                    Once a Document is added, it will be
                                    displayed here.
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
                </Box>
            </Box>

            {notify && (
                <Notification
                    open={notify}
                    title={fileName}
                    error={"delete"}
                    subtitle={"has been deleted"}
                    close={() => setNotify(false)}
                />
            )}
        </>
    )
}
