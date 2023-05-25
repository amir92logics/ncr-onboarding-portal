import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Button, Dialog, DialogContent, Typography } from "@mui/material"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import theme from "../../../src/theme"

export default function InstallDateCalendarPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp
}) {
    const handleClose = (value) => {
        handleTogglePopUp(value)
    }
    const [upcomingFourWeeks, setUpcomingFourWeeks] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSubmitPopUp(value)
        handleClose(false)
    }
    const [value, onChange] = useState(new Date())

    useEffect(() => {
        let fourWeeks = new Date()
        fourWeeks.setDate(fourWeeks.getDate() + 28)
        setUpcomingFourWeeks(fourWeeks)
    }, [])

    return (
        <Box>
            <Dialog
                className="InstallDate-calendar-popup"
                open={showPopUp}
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
                            lg: "32px 32px",
                            md: "32px 32px",
                            xs: " 24px 24px"
                        }
                    }}
                >
                    <form aria-label={`This is installtion date calender form`} onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            sx={{
                                display: "flex",
                                width: { md: "100%", xs: "100%" },
                                alignItems: "center",
                                marginTop: "",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%"
                                }}
                            >
                                <Typography
                                    className="f-f-i"
                                    variant="body1"
                                    sx={{
                                        marginTop: "8px",
                                        textAlign: "left",
                                        fontSize: "24px",
                                        color: "#1E1E1E",
                                        fontWeight: 600,
                                        lineHeight: "32px"
                                    }}
                                >
                                    Request new Installation Date
                                </Typography>

                                <svg
                                    onClick={() => handleClose()}
                                    cursor="pointer"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>This is close popup icon </title>
                                    <path
                                        d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                        fill="#5C5C5C"
                                    />
                                </svg>
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    marginTop: "16px",
                                    marginBottom: "32px",
                                    textAlign: "left",
                                    fontSize: "16px",
                                    color: "#5C5C5C",
                                    fontWeight: 400,
                                    lineHeight: "24px"
                                }}
                            >
                                Please select & request for a new Installation
                                date, the new date cannot be any less than 4
                                weeks from current date.
                            </Typography>
                            <Box sx={{ height: { sm: "400px" } }}>
                                <Calendar
                                    tileDisabled={({ date, view }) =>
                                        (view === "month" &&
                                            date.getDay() === 0) ||
                                        date.getDay() === 6
                                    }
                                    minDate={upcomingFourWeeks}
                                    onChange={onChange}
                                    value={value}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    },
                                    justifyContent: "flex-end",
                                    width: "100%",
                                    paddingTop: { md: "24px", xs: "24px" },
                                    borderTop: "1px solid #e0e0e0 !important"
                                }}
                            >
                                <Button
                                    role="button"
                                    sx={{
                                        p: "12px",
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },

                                        fontWeight: "600",
                                        color: `${theme.palette.primary.main} !important`,
                                        "&:hover": {
                                            bgcolor: "#F5F6FF !important "
                                        }
                                    }}
                                    onClick={() => {
                                        handleClose(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    role="button"
                                    className="next-button"
                                    aria-label="Submit Feedback"
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        mt: { md: "0px", xs: "8px" },

                                        ml: {
                                            md: "8px",
                                            xs: "0px"
                                        },

                                        color: "#FFFFFF !important",
                                        paddingTop: "12px",
                                        paddingBottom: "12px",
                                        paddingLeft: {
                                            md: "20px",
                                            xs: "auto"
                                        },
                                        paddingRight: {
                                            md: "20px",
                                            xs: "auto"
                                        },

                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },
                                        fontWeight: "600"
                                    }}
                                >
                                    Request Date
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
