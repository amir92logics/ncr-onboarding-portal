import React from "react"
import Box from "@mui/material/Box"
import { Button, Dialog, DialogContent, Typography } from "@mui/material"
import theme from "../../../../src/theme"

export default function DeletePopUp({
    deletedID,
    dataType,
    setShowDeletePopUP,
    showDeletePopUP,
    handleDeleteItem,
    title,
    contact,
    copy_change = false
}) {
    const handleClose = (value) => {
        setShowDeletePopUP(value)
    }

    const handleSubmit = (e) => {
        if (e) {
            if (typeof e.preventDefault === "function") {
                e.preventDefault()
            }
            if (typeof e.stopPropagation === "function") {
                e.stopPropagation()
                handleDeleteItem(deletedID, dataType)
            }
        }
    }
    return (
        <Box>
            <Dialog
                className="delete-addtional-item-popup"
                sx={{
                    "& div[role='dialog']": {
                        borderRadius: "4px !important"
                    }
                }}
                open={showDeletePopUP}
                onClose={() => {
                    handleClose(false)
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
                    <form aria-label={`This is nss management network form`} onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            sx={{
                                display: "flex",
                                width: { md: "100%", xs: "100%" },
                                alignItems: "flex-start",
                                marginTop: "",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontSize: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        lineHeight: {
                                            lg: "32px",
                                            xs: "32px"
                                        },
                                        color: "#1E1E1E"
                                    }}
                                >
                                    Confirm Delete
                                </Typography>
                                <Box
                                    sx={{
                                        cursor: "pointer",
                                        position: "relative",
                                        right: 8,
                                        top: -6
                                    }}
                                    onClick={() => handleClose(false)}
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is close popup icon</title>
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                            {contact ? (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 400,
                                        paddingTop: "16px",
                                        fontFamily: "inter",
                                        fontSize: {
                                            lg: "16px",
                                            xs: "16px"
                                        },
                                        lineHeight: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        color: theme.palette.secondary.main
                                    }}
                                >
                                    Are you sure you want to detele this
                                    contact?
                                </Typography>
                            ) : (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 400,
                                        paddingTop: "16px",
                                        fontFamily: "inter",
                                        fontSize: {
                                            lg: "16px",
                                            xs: "16px"
                                        },
                                        lineHeight: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        color: theme.palette.secondary.main
                                    }}
                                >
                                    {copy_change ? (
                                        <>
                                            Please confirm if you want to delete
                                            this {title}
                                        </>
                                    ) : (
                                        <>
                                            Please confirm if you wanted to
                                            Delete item from{" "}
                                            <span
                                                style={{
                                                    color: theme.palette
                                                        .secondary.main,
                                                    fontWeight: "700"
                                                }}
                                            >
                                                {title}
                                            </span>
                                        </>
                                    )}
                                    , You can’t revert it once it’s deleted!
                                </Typography>
                            )}
                            <Box
                                paddingTop={"32px"}
                                display="flex"
                                width="100%"
                                sx={{
                                    width: "100%",
                                    justifyContent: {
                                        md: "flex-end",
                                        xs: "center"
                                    },
                                    flexDirection: {
                                        lg: "row",
                                        md: "column",
                                        sm: "column",
                                        xs: "column"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },
                                        justifyContent: {
                                            md: "flex-end",
                                            xs: "center"
                                        }
                                    }}
                                    display="flex"
                                >
                                    <Button
                                        onClick={() => {
                                            handleClose(false)
                                        }}
                                        variant="text"
                                        aria-label="This is a cancel button"
                                        className="del-cancel-button"
                                        sx={{
                                            marginRight: {
                                                md: "8px",
                                                xs: "0px"
                                            },
                                            padding: "12px 20px",
                                            fontWeight: 600,
                                            textTransform: "none",
                                            borderRadius: "8px",
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: {
                                                md: "16px",
                                                xs: "14px"
                                            },
                                            lineHeight: {
                                                md: "24px",
                                                xs: "18px"
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        id={"delete-item-btn"}
                                        type="submit"
                                        role="button"
                                        aria-label="This is a delete button"
                                        variant="contained"
                                        sx={{
                                            marginTop: { md: "0px", xs: "8px" },
                                            padding: "12px 20px",
                                            fontWeight: 600,
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: {
                                                md: "16px",
                                                xs: "14px"
                                            },
                                            lineHeight: {
                                                md: "24px",
                                                xs: "18px"
                                            },
                                            color: "white",
                                            textTransform: "capitalize",
                                            borderRadius: "8px"
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
