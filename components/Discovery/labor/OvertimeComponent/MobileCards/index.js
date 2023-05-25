import { Box, styled, Switch, TextField, Typography } from "@mui/material"
import Image from "next/image"
import React from "react"
import theme from "../../../../../src/theme"
import Input from "../../../../../components/common/Input"
import Togglebutton from "../../../../common/Togglebutton"
export default function MobileCards({
    disable,
    mainToggle,
    handleChange,
    overtime
}) {
    return (
        <Box>
            <Box
                className="shadow"
                sx={{
                    background: "#ffffff",
                    padding: { md: "23px", xs: "20px 16px 19px 16px" },
                    borderRadius: "12px",
                    marginTop: "24px"
                }}
            >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent="space-between"
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Box
                            width={"24px"}
                            height={"100%"}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <Image
                                width={"24px"}
                                height="24px"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/Overtime-Calendar.svg`}
                                alt="Overtime Calender Icon"
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "28px",
                                marginLeft: "8px",

                                color: "#1E1E1E"
                            }}
                        >
                            Weekly Overtime
                        </Typography>
                    </Box>
                    <Box display={"flex"}>
                        <Togglebutton
                            disabled={disable}
                            checked={mainToggle[0]?.toggle}
                            onChange={(e) => {
                                handleChange("toggle1", e.target.checked)
                            }}
                            label={
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: mainToggle[0]?.toggle
                                            ? disable
                                                ? "#5c5c5c"
                                                : "#1E1E1E"
                                            : "#5c5c5c",
                                        ml: "12px",
                                        width: 24
                                    }}
                                >
                                    {mainToggle[0]?.toggle ? "On" : "Off"}
                                </Typography>
                            }
                        />
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection="row"
                    alignItems={"center"}
                    sx={{ mt: "32px", flexWrap: { lg: "nowrap", xs: "wrap" } }}
                >
                    <Box
                        sx={{
                            display: { md: "flex", xs: "flex" },
                            alignItems: "end",
                            width: "100%"
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#1E1E1E"
                            }}
                        >
                            After
                        </Box>
                        <Input
                            type="number"
                            className={"ncr-new-input"}
                            label="Hours"
                            disabled={!mainToggle[0]?.toggle || disable}
                            sx={{
                                ml: "28px",
                                maxWidth: {
                                    md: "276px",
                                    lg: "100%"
                                }
                            }}
                            name={"WeeklyHours"}
                            value={overtime[0]?.value}
                            onChange={(e) => {
                                handleChange("WeeklyHours", e.target.value)
                            }}
                        />
                    </Box>
                    <Box width="100%" mt="24px">
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 400,

                                fontSize: "16px",
                                lineHeight: "24px",

                                color: "#1E1E1E"
                            }}
                        >
                            hours worked per week,&nbsp;multiply hourly
                        </Box>
                        <Box display={"flex"} alignItems="end" mt="8px">
                            <Box
                                className="overtime-text3"
                                component="span"
                                sx={{
                                    fontWeight: 400,

                                    fontSize: "16px",
                                    lineHeight: "24px",

                                    color: "#1E1E1E",
                                    mr: "12px",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                rate by
                            </Box>
                            <Input
                                type="number"
                                className="overtime-textfield"
                                label="Rate"
                                disabled={!mainToggle[0]?.toggle || disable}
                                sx={{
                                    mt: {
                                        md: "24px",
                                        lg: 0
                                    },
                                    maxWidth: {
                                        md: "276px",
                                        lg: "100%"
                                    }
                                }}
                                name={"WeeklyRate"}
                                value={overtime[1]?.value}
                                onChange={(e) => {
                                    handleChange("WeeklyRate", e.target.value)
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                className="shadow"
                sx={{
                    background: "#ffffff",
                    padding: { md: "23px", xs: "20px 16px 19px 16px" },
                    borderRadius: "12px",
                    marginTop: "24px"
                }}
            >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent="space-between"
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Box
                            width={"24px"}
                            height={"100%"}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <Image
                                width={"24px"}
                                height="24px"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/Daily-Overtime.svg`}
                                alt="Clock Icon"
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "28px",
                                marginLeft: "8px",

                                color: "#1E1E1E"
                            }}
                        >
                            Daily Overtime
                        </Typography>
                    </Box>
                    <Box display={"flex"}>
                        <Togglebutton
                            checked={mainToggle[1].toggle}
                            disabled={disable}
                            onChange={(e) => {
                                handleChange("toggle2", e.target.checked)
                            }}
                            label={
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: mainToggle[1]?.toggle
                                            ? disable
                                                ? "#5c5c5c"
                                                : "#1E1E1E"
                                            : "#5c5c5c",
                                        ml: "12px",
                                        width: 24
                                    }}
                                >
                                    {mainToggle[1].toggle ? "On" : "Off"}
                                </Typography>
                            }
                        />
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection="row"
                    alignItems={"center"}
                    sx={{ mt: "32px", flexWrap: { lg: "nowrap", xs: "wrap" } }}
                >
                    <Box
                        sx={{
                            display: { md: "flex", xs: "flex" },
                            alignItems: "end",
                            width: "100%"
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#1E1E1E"
                            }}
                        >
                            After
                        </Box>
                        <Input
                            type="number"
                            className="overtime-textfield"
                            label="Hours"
                            sx={{
                                ml: "28px",
                                maxWidth: {
                                    md: "276px",
                                    lg: "100%"
                                }
                            }}
                            name="DailyHours"
                            value={overtime[2]?.value}
                            onChange={(e) => {
                                handleChange("DailyHours", e.target.value)
                            }}
                            disabled={!mainToggle[1].toggle || disable}
                        />
                    </Box>
                    <Box width="100%" mt="23px">
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 400,

                                fontSize: "16px",
                                lineHeight: "24px",

                                color: "#1E1E1E"
                            }}
                        >
                            hours worked per day,&nbsp;multiply hourly
                        </Box>
                        <Box display={"flex"} alignItems="end" mt="8px">
                            <Box
                                className="overtime-text3"
                                component="span"
                                sx={{
                                    fontWeight: 400,

                                    fontSize: "16px",
                                    lineHeight: "24px",

                                    color: "#1E1E1E",
                                    mr: "12px",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                rate by
                            </Box>
                            <Input
                                type="number"
                                className="overtime-textfield"
                                label="Rate"
                                sx={{
                                    mt: {
                                        md: "24px",
                                        lg: 0
                                    },
                                    maxWidth: {
                                        md: "276px",
                                        lg: "100%"
                                    }
                                }}
                                name="DailyRate"
                                value={overtime[3]?.value}
                                onChange={(e) => {
                                    handleChange("DailyRate", e.target.value)
                                }}
                                disabled={!mainToggle[1].toggle || disable}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
