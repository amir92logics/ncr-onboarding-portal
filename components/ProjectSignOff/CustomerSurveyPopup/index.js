import React from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Dialog,
    DialogContent,
    Divider,
    Typography
} from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"

export default function CustomerSurveyPopup({
    surveyPop,
    id,
    surveyURL,
    handleTogglePopUp
}) {
    const router = useRouter()
    const handleClose = (value) => {
        handleTogglePopUp(value)
    }
    const today = new Date()

    const iframeSource = `<iframe  width='100%' height='400'  src=${surveyURL}></iframe>`

    return (
        <Box>
            <Dialog
                className="customer-survey-popup2"
                open={surveyPop}
                onClose={() => {
                    handleClose(false)
                }}
                sx={{
                    "& div[role='dialog']": {
                        borderTopRightRadius: { md: 0, xs: "4px !important" },
                        borderTopLeftRadius: { md: 0, xs: "4px !important" },
                        borderBottomRightRadius: {
                            md: 0,
                            xs: "0px !important"
                        },
                        borderBottomLeftRadius: { md: 0, xs: "0px !important" },
                        borderRadius: { md: "4px !important" }
                    }
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
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#5c5c5c"
                                }}
                            >
                                {moment(today).format("LL")}
                            </Typography>

                            <svg
                                aria-label="Close button"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    handleClose(false)
                                }}
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
                                    marginBottom: "16px",
                                    textAlign: "left",
                                    fontSize: "24px",
                                    color: "#1E1E1E",
                                    fontWeight: 600,
                                    lineHeight: "24px"
                                }}
                            >
                                NCR Customer Satisfaction Survey
                            </Typography>
                        </Box>

                        <div
                            className="iframe"
                            dangerouslySetInnerHTML={{ __html: iframeSource }}
                        ></div>

                        <Divider
                            className="divider-col"
                            style={{ width: "100%", marginTop: "32px" }}
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
                                flexDirection: { md: "row", xs: "column" },
                                justifyContent: "flex-end",
                                width: "100%",
                                marginTop: "24px"
                            }}
                        >
                            <Button
                                role="button"
                                className="next-button"
                                aria-label="This is go to actions page button"
                                variant="contained"
                                type="submit"
                                sx={{
                                    ml: {
                                        md: "16px",
                                        xs: "0px"
                                    },
                                    mt: {
                                        md: "0px",
                                        xs: "16px"
                                    },
                                    color: "#FFFFFF !important",
                                    paddingTop: "12px",
                                    paddingBottom: "12px",
                                    paddingLeft: {
                                        md: "20px",
                                        xs: "0px"
                                    },
                                    paddingRight: {
                                        md: "20px",
                                        xs: "0px"
                                    },

                                    fontSize: { md: "16px", xs: "14px" },
                                    lineHeight: { md: "24px", xs: "18px" },
                                    fontWeight: "600"
                                }}
                                onClick={() => {
                                    router.push({
                                        pathname: `/actions/${id}`
                                    })
                                }}
                            >
                                Go to Actions Page
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
