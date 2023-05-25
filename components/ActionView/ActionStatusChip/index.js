import React from "react"
import Typography from "@mui/material/Typography"
import theme from "../../../src/theme"
import moment from "moment"

export default function ActionStatusChip({ status, date, data }) {
    return status == "Pending" ? (
        <Typography
            sx={{
                boxSizing: "border-box",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "18px",
                color: "#5364FD",
                marginRight: "20px",
                background: "none",
                padding: "3px 12px 3px 12px",
                borderRadius: "50px",
                border: "1px solid #5364FD",
                width: "max-content",
                letterSpacing: theme.letterSpacing.main
            }}
        >
            Pending
        </Typography>
    ) : status == "not started" ? (
        ""
    ) : status == "in progress" ? (
        <Typography
            sx={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "18px",
                color: "#5C5C5C",
                marginRight: { xs: "5px", md: "22px" },
                background: "none",
                padding: "1.9px 8px 1.9px 8px",
                borderRadius: "50px",
                width: "max-content",
                letterSpacing: theme.letterSpacing.main,
                border: "1px solid #BDBDBD"
            }}
        >
            In Progress
        </Typography>
    ) : status == "completed" ? (
        <Typography
            sx={{
                boxSizing: "border-box",
                fontWeight: 500,
                fontSize: { xs: "12px", md: "12px" },
                lineHeight: "18px",
                color: theme.chips.text.complete,
                width: "max-content",
                letterSpacing: theme.letterSpacing.main,
                marginRight: { xs: "0px", md: "20px" }
            }}
        >
            Completed:{" "}
            <span style={{ color: "#5C5C5C", fontWeight: 600 }}>
                {date && moment(date).format("MMM Do, YYYY")}
            </span>
        </Typography>
    ) : (
        <div></div>
    )
}
