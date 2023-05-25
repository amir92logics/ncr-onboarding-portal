import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Button } from "@mui/material"
import { GetBase64 } from "../../../helper"
import { BorderLinearProgressBarForDocument } from "../../common/BorderLinearProgress"
import Image from "next/image"
import {
    useAddDocumentsMutation,
    useLazyActionsgetQuery,
    useLazyDocumentsGetQuery
} from "../../../redux-setup/api/data"
import { useRouter } from "next/router"
import axios from "axios"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../redux-setup/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import Notification from "../../common/Notifications"
export default function Uploader({
    uploadFor,
    disabled,
    table,
    setProgress,
    progress,
    fileName,
    setFileName,
    uploading,
    setUploading,
    notify,
    setNotify
}) {
    const router = useRouter()
    const [actionstrigger] = useLazyActionsgetQuery()
    const path = router.asPath
    const splitpath = path.split("/")
    const dispatch = useDispatch()
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const routerID = router.query.id
    const TruncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ".."
        } else {
            return str
        }
    }
    const [addDocuments] = useAddDocumentsMutation()
    const [documentsGet] = useLazyDocumentsGetQuery()

    const handleReset = () => {
        setUploading(false)
        setProgress(null)
        setNotify(true)
    }
    const handleBase64 = async (file) => {
        let base = await GetBase64(file)
        axios
            .post(
                `${baseurl}document/upload`,
                {
                    projectId: routerID,
                    fileName: file.name,
                    base64Content: base.split(",")[1]
                },
                {
                    onUploadProgress: (progressEvent) => {
                        const progrs =
                            (progressEvent.loaded / progressEvent.total) * 100
                        setProgress(Math.round(progrs))
                    }
                }
            )
            .then((res) => {
                const _url = res.data.path
                const submitData = {
                    record_id_quickbase: parseInt(routerID),
                    type: uploadFor,
                    name: file.name,
                    file_path: _url,
                    created_at: new Date(),
                    base64Content: base.split(",")[1]
                }
                addDocuments(submitData)
                    .unwrap()
                    .then((res) => {
                        documentsGet(routerID)
                            .unwrap()
                            .then((res) => {
                                actionstrigger(routerID)
                                    .unwrap()
                                    .then((res) => {
                                        handleReset()
                                        dispatch(SetTasks(res.data.actions))
                                        dispatch(
                                            SetSubTasks(res.data.sub_tasks)
                                        )
                                    })
                                let tempsidebar = [...sideBarData]
                                let docsind = tempsidebar.findIndex(
                                    (it) => it.name == "Documents"
                                )
                                let docs = { ...tempsidebar[docsind] }
                                docs.data = res
                                tempsidebar[docsind] = docs
                                dispatch(SetSideBarData(tempsidebar))
                            })
                    })
            })
            .catch((err) => {
                setFileName("")
                handleReset()
            })
    }
    const handleChange = (e) => {
        setFileName(e.target.files[0].name)
        const file = e.target.files[0]
        handleBase64(file)
        setUploading(true)
        e.target.value = null
    }
    return (
        <>
            {table ? (
                <Box sx={{ margin: "auto" }}>
                    <Button
                        disabled={disabled}
                        variant="contained"
                        sx={{
                            cursor: "pointer !important",
                            lineHeight: "18px",
                            backgroundColor: uploading
                                ? "rgba(0, 0, 0, 0.38)"
                                : "",
                            fontSize: "12px",
                            fontWeight: 600,
                            textAlign: "center",
                            "&:hover": {
                                background: "#062EC9"
                            },
                            borderRadius: "8px",
                            px: 4,
                            py: 2,
                            overFlow: "hidden"
                        }}
                        className="next-button"
                        // id="browse-file2"
                    >
                        Browse Files
                        <Box
                            sx={{
                                cursor: "pointer !important",
                                marginLeft: "8px",
                                position: "relative",
                                width: "20px",
                                height: "20px"
                            }}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/upload.svg`}
                                layout="fill"
                                alt="upload-document"
                            />
                        </Box>
                        <input
                            disabled={disabled}
                            type="file"
                            accept=".GIF,.PNG,.JPG,.JPEG,.PDF,.TIF"
                            name="document"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            className="d-absolute fileType"
                            aria-label="browse-file"
                        />
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        opacity: disabled ? 0.4 : 1,
                        cursor: disabled ? "not-allowed !important" : "",
                        position: "relative",
                        mt: path.includes("wireless-solution") && {
                            lg: "-1px",
                            xs: "1px"
                        }
                    }}
                    className={
                        uploadFor === "menu_upload_filename" ||
                        uploadFor === "wireless_upload_filename"
                            ? "uploadboxmenu"
                            : "uploadbox"
                    }
                >
                    {!uploading && (
                        <Box sx={{ display: { lg: "block", xs: "none" } }}>
                            <Box
                                sx={{
                                    mx: "auto",
                                    marginBottom: {
                                        xl: "16px",
                                        lg: "15px",
                                        xs: "16px"
                                    },
                                    width: {
                                        md: "52px",
                                        sm: "56px",
                                        xs: "50px"
                                    }
                                }}
                                style={{
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: disabled ? "not-allowed" : ""
                                }}
                                className="d-relative upload-row-icon"
                            >
                                <input
                                    style={{
                                        cursor: disabled
                                            ? "not-allowed"
                                            : "pointer"
                                    }}
                                    name="document"
                                    disabled
                                    type="file"
                                    className="d-absolute fileType"
                                    aria-label="upload-document"
                                />
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "24px",
                                        height: "24px"
                                    }}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/cloud.svg`}
                                        layout="fill"
                                        alt="Upload file"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                    <div>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column"
                            }}
                        >
                            {!uploading && (
                                <>
                                    <Typography
                                        sx={{
                                            display: {
                                                lg: "block",
                                                xs: "none"
                                            },
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#1E1E1E",
                                            textAlign: "center",
                                            lineHeight: "22px",
                                            marginBottom: "8px"
                                        }}
                                        // id="upload-document"
                                    >
                                        Drop Files Here to upload
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: {
                                                lg: "none",
                                                xs: "block"
                                            },
                                            pr: { xs: "3px", md: 0 },
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#1E1E1E",
                                            textAlign: "center",
                                            lineHeight: "22px",
                                            marginBottom: {
                                                md: "10px",
                                                xs: "8px"
                                            },
                                            marginTop:
                                                splitpath[2] ==
                                                "wireless-solution"
                                                    ? {
                                                          xxl: "1px",
                                                          xl: "-2.5px",
                                                          lg: "1.5px",
                                                          md: "0.5px",
                                                          xs: "3px"
                                                      }
                                                    : { md: "1px", xs: "3px" }
                                        }}
                                        // id="upload-document"
                                    >
                                        Upload files
                                    </Typography>
                                </>
                            )}

                            {uploading && (
                                <Box
                                    sx={{
                                        maxWidth: 150,
                                        marginTop: "34px"
                                    }}
                                >
                                    <BorderLinearProgressBarForDocument
                                        value={progress}
                                        fileName={TruncateString(fileName, 20)}
                                        documents={"docs"}
                                    />
                                </Box>
                            )}
                            {!uploading && (
                                <Typography
                                    sx={{
                                        display: { lg: "block", xs: "none" },
                                        color: "#5C5C5C",
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        textAlign: "center"
                                    }}
                                >
                                    OR
                                </Typography>
                            )}
                            {!uploading && (
                                <Box sx={{ margin: "auto" }}>
                                    <Button
                                        aria-label="Browse Files"
                                        disabled={disabled}
                                        variant="contained"
                                        sx={{
                                            lineHeight: "22px",
                                            backgroundColor: uploading
                                                ? "rgba(0, 0, 0, 0.38)"
                                                : "",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            textAlign: "center",
                                            "&:hover": {
                                                background: "#062EC9"
                                            },
                                            mr: {
                                                lg: 0,
                                                sm: 0
                                            },
                                            marginTop:
                                                splitpath[2] ==
                                                "wireless-solution"
                                                    ? {
                                                          xl: "5px",
                                                          lg: "5px",
                                                          md: "auto",
                                                          xs: "1px"
                                                      }
                                                    : {
                                                          lg: "5px",
                                                          md: "auto",
                                                          xs: "1px"
                                                      },

                                            paddingTop: {
                                                lg: "10px",
                                                sm: "11px"
                                            },
                                            paddingBottom: {
                                                lg: "10px",
                                                md: "11px",
                                                sm: "12px"
                                            },

                                            borderRadius: "8px",
                                            px: "18px",
                                            overFlow: "hidden"
                                        }}
                                        className="next-button"
                                        // id="browse-file3"
                                    >
                                        Browse Files
                                        <Box
                                            sx={{
                                                marginLeft: "8px",
                                                position: "relative",
                                                width: "20px",
                                                height: "20px"
                                            }}
                                        >
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/upload.svg`}
                                                layout="fill"
                                                alt="upload-document"
                                            />
                                        </Box>
                                        <input
                                            disabled={disabled}
                                            type="file"
                                            accept=".GIF,.PNG,.JPG,.JPEG,.PDF,.TIF"
                                            name="document"
                                            onChange={(e) => {
                                                handleChange(e)
                                            }}
                                            className="d-absolute fileType"
                                            aria-label="browse-file"
                                        />
                                    </Button>
                                </Box>
                            )}
                        </Box>
                        {!uploading && (
                            <Typography
                                sx={{
                                    color: "#5c5c5c",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    marginTop: {
                                        xl: "25px",
                                        lg: "26px",
                                        xs: "24px"
                                    },
                                    textAlign: "center",
                                    position: "relative",
                                    maxWidth: { lg: "432px", xs: "100%" }
                                }}
                            >
                                .GIF, .PNG, .jpg, .JPEG, .PDF, .ZIP, .BMP, and
                                .TIF are all supported formats
                            </Typography>
                        )}
                    </div>
                </Box>
            )}

            {notify && (
                <Notification
                    open={notify}
                    title={TruncateString(fileName, 20)}
                    error={fileName ? "added" : "delete"}
                    subtitle={fileName ? "has been added" : "Please try again"}
                    close={() => setNotify(false)}
                />
            )}
        </>
    )
}
