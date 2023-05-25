import React, { useState } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogContent,
    Divider,
    FormControlLabel,
    Typography
} from "@mui/material"
import { useProjectREsetApiMutation } from "../../redux-setup/api/data"

export default function ProjectResetPopup({
    resetProjectPopUp,
    setResetProjectPopUp,
    projectID
}) {
    const [resetProject] = useProjectREsetApiMutation()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState("")
    const [disableResetBtn, setDisableResetBtn] = useState(false)
    const handleClose = (value) => {
        setResetProjectPopUp(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        resetProject(projectID)
            .unwrap()
            .then((res) => {
                setResetProjectPopUp(false), setLoading(false)
            })
    }

    return (
        <Dialog
            className="reset-popup"
            sx={{
                "& div[role='dialog']": {
                    borderRadius: "4px !important"
                }
            }}
            open={resetProjectPopUp}
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
                <Box
                    sx={{
                        display: "flex",
                        width: { xs: "100%" },
                        alignItems: "center",
                        marginTop: "",
                        flexDirection: "column"
                    }}
                >
                    {projectID !== null ? (
                        <>
                            {" "}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    maxWidth: "560px"
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
                                        color: "#1e1e1e",
                                        fontWeight: 600,
                                        lineHeight: {
                                            lg: "32px",
                                            xs: "32px"
                                        }
                                    }}
                                >
                                    Reset Project
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
                                        <title>This is close icon</title>
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    maxWidth: "560px"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginTop: "16px",
                                        textAlign: "left",
                                        fontSize: "16px",
                                        color: "#1E1E1E",
                                        fontWeight: 400,
                                        lineHeight: "24px"
                                    }}
                                >
                                    By resetting everything will be cleared from
                                    this project. Do you want to continue?
                                </Typography>
                            </Box>
                            <Box sx={{ marginTop: "8px", width: "100%" }}>
                                <FormControlLabel
                                    aria-label="Don’t ask me again for confirmation"
                                    control={
                                        <Checkbox
                                            sx={{
                                                transform: "scale(.8)",
                                                fontSize: "0px !important",
                                                borderColor:
                                                    "#5C5C5C !important"
                                            }}
                                        />
                                    }
                                    sx={{
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#5C5C5C",
                                        ml: "-11px !important",
                                        mr: "0px !important"
                                    }}
                                    label="Don’t ask me again for confirmation"
                                />
                            </Box>
                        </>
                    ) : (
                        <>
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
                                        marginTop: "8px",
                                        textAlign: "left",
                                        fontSize: {
                                            lg: "18px",
                                            xs: "18px"
                                        },
                                        color: "#000000DE",
                                        fontWeight: 600,
                                        lineHeight: {
                                            lg: "18px",
                                            xs: "18px"
                                        }
                                    }}
                                >
                                    Please enter project number to reset.
                                </Typography>
                            </Box>
                            <Divider
                                className="divider-col"
                                style={{ width: "100%", marginTop: "12px" }}
                                sx={{
                                    display: {
                                        sm: "none",
                                        xl: "block"
                                    }
                                }}
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
                                        marginTop: "24px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        color: "#00000099",
                                        fontWeight: 500,
                                        lineHeight: "21px"
                                    }}
                                >
                                    Project number
                                </Typography>
                            </Box>

                            <Box sx={{ marginTop: "12px", width: "100%" }}>
                                <input
                                    className="project-rest-input"
                                    type={"text"}
                                    name="projectId"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        if (projectID == null) {
                                            value == ""
                                                ? setDisableResetBtn(true)
                                                : setDisableResetBtn(false)
                                        } else {
                                            setDisableResetBtn(false)
                                        }
                                    }}
                                    placeholder="Enter Project Number"
                                />
                            </Box>
                        </>
                    )}

                    <Box
                        className="cancel-reset-btn"
                        sx={{
                            display: "flex",
                            flexDirection: { md: "row", xs: "column" },
                            justifyContent: "flex-end",
                            width: "100%",
                            marginTop: "32px"
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
                            className="model-button"
                            onClick={() => {
                                handleClose(false)
                            }}
                            aria-label="Cancel"
                        >
                            Cancel
                        </Button>
                        <Button
                            id={"delete-item-btn"}
                            disabled={disableResetBtn || loading}
                            role="button"
                            aria-label="reset"
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
                                width: { xs: "100%", md: "94.5px" },
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
                                textTransform: "none",

                                fontSize: { md: "16px", xs: "14px" },
                                lineHeight: { md: "24px", xs: "18px" },
                                fontWeight: "500",
                                backgroundColor:
                                    disableResetBtn || loading
                                        ? "#e11d486b !important"
                                        : "#E11D48 !important",
                                borderRadius: true ? "4px" : projectID,
                                boxShadow: "none",
                                "&:hover": {
                                    boxShadow: "none"
                                }
                            }}
                            onClick={(e) => {
                                handleSubmit(e)
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={25} />
                            ) : (
                                "Confirm"
                            )}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
