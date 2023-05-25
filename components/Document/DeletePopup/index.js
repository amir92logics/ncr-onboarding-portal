import React, { useState } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Divider,
    Typography,
    useMediaQuery
} from "@mui/material"
import {
    useDeleteDocumentsMutation,
    useLazyActionsgetQuery,
    useLazyDocumentsGetQuery
} from "../../../redux-setup/api/data"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../redux-setup/dataSlice"
import theme from "../../../src/theme"
export default function DeleteDocumentPopUp({
    document,
    setDocument,
    setNotify
}) {
    const router = useRouter()
    const [actionstrigger] = useLazyActionsgetQuery()
    const pid = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [hadnleDelete] = useDeleteDocumentsMutation()
    const [documentGet] = useLazyDocumentsGetQuery()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        hadnleDelete(document.id).then((res) => {
            documentGet(pid)
                .unwrap()
                .then((res) => {
                    actionstrigger(pid)
                        .unwrap()
                        .then((res) => {
                            setDocument(null)
                            setLoading(false)
                            setNotify(true)
                            dispatch(SetTasks(res.data.actions))
                            dispatch(SetSubTasks(res.data.sub_tasks))
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
    }
    const TruncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ".."
        } else {
            return str
        }
    }

    return (
        <Box>
            <Dialog
                className="reset-popup"
                sx={{
                    "& div[role='dialog']": {
                        borderRadius: "4px !important"
                    }
                }}
                open={document !== null ? true : false}
                onClose={() => {
                    setDocument(null)
                }}
            >
                <DialogContent
                    sx={{
                        padding: {
                            md: " 32px",
                            xs: " 24px"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: { md: "100%", xs: "100%" },
                            alignItems: "flex-end",
                            marginTop: "",
                            flexDirection: "column"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%"
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "left",
                                    fontSize: {
                                        lg: "24px",
                                        xs: "24px"
                                    },
                                    color: "#000000DE",
                                    fontWeight: 600,
                                    lineHeight: {
                                        lg: "32px",
                                        xs: "32px"
                                    }
                                }}
                            >
                                Are you sure you want to delete this file?
                            </Typography>
                            <Box
                                sx={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    right: 15,
                                    top: 10,
                                    p: 0,
                                    minWidth: 0
                                }}
                                onClick={() => setDocument(null)}
                            >
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is delete icon</title>
                                    <path
                                        d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                        fill="#5C5C5C"
                                    />
                                </svg>
                            </Box>
                        </Box>
                        <Divider
                            className="divider-col"
                            style={{ width: "100%", marginTop: "12px" }}
                            sx={{}}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%"
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    marginTop: "16px",
                                    textAlign: "left",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: theme.palette.secondary.main,
                                    fontWeight: 500
                                }}
                            >
                                The file name{" "}
                                {TruncateString(document?.name, 20)} will be
                                permanently removed!
                            </Typography>
                        </Box>

                        <Box
                            className="cancel-reset-btn"
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    md: "row",
                                    xs: "column"
                                },
                                justifyContent: "flex-end",
                                width: "100%",
                                marginTop: "24px"
                            }}
                        >
                            <Button
                                variant="text"
                                role="button"
                                disabled={loading}
                                sx={{
                                    paddingTop: "12px",
                                    paddingBottom: "12px",

                                    paddingLeft: {
                                        lg: "20px",
                                        sm: "auto"
                                    },
                                    paddingRight: {
                                        lg: "20px",
                                        sm: "auto"
                                    },
                                    fontSize: { md: "16px", xs: "14px" },
                                    lineHeight: { md: "24px", xs: "18px" },
                                    fontWeight: "500",
                                    borderRadius: "4px"
                                }}
                                className="del-cancel-button"
                                onClick={() => {
                                    setDocument(null)
                                }}
                                aria-label="This is cancel button"
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                id={"delete-item-btn"}
                                role="button"
                                aria-label="This is delete button"
                                variant="contained"
                                type="submit"
                                sx={{
                                    ml: {
                                        md: "8px",
                                        xs: "0px"
                                    },
                                    mt: {
                                        md: "0px",
                                        xs: "8px"
                                    },
                                    borderRadius: "8px",
                                    color: "#FFFFFF !important",
                                    paddingTop: "12px",
                                    paddingBottom: "12px",
                                    paddingLeft: {
                                        md: "24px",
                                        sm: "auto"
                                    },
                                    paddingRight: {
                                        md: "24px",
                                        sm: "auto"
                                    },

                                    fontSize: { md: "16px", xs: "14px" },
                                    lineHeight: { md: "24px", xs: "18px" },
                                    fontWeight: "500",
                                    textTransform: "capitalize",
                                    backgroundColor: loading
                                        ? "#e11d486b !important"
                                        : "#E11D48 !important",
                                    width: { md: "120px", xs: "100%" },
                                    boxShadow: "none !important"
                                }}
                                onClick={(e) => {
                                    handleSubmit(e)
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={isMobile?18:24}
                                        thickness={4}
                                        color="white"
                                    />
                                ) : (
                                    <>Delete</>
                                )}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
