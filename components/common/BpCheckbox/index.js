import { Checkbox } from "@mui/material"
import { styled } from "@mui/material/styles"

const BpIcon = styled("span")(({ theme, name }) => ({
    borderRadius:
        name === "site-readiness" ? 3 : "third-party-integration" ? 3 : 4,

    width:
        name === "site-readiness" ? 15 : "third-party-integration" ? 13.5 : 22,
    height:
        name === "site-readiness" ? 15 : "third-party-integration" ? 13.5 : 22,
    boxShadow:
        theme.palette.mode === "dark"
            ? "0 0 0 1px rgb(16 22 26 / 40%)"
            : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)"
}))

const BpCheckedIcon = styled(BpIcon)(({ name }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D4ED8",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    width:
        name === "site-readiness"
            ? 16.25
            : "third-party-integration"
            ? 13.5
            : 22,
    height:
        name === "site-readiness"
            ? 16.25
            : "third-party-integration"
            ? 13.5
            : 22,
    "&:before": {
        display: "block",
        width:
            name === "site-readiness"
                ? 13
                : "third-party-integration"
                ? 12
                : 18,
        height:
            name === "site-readiness"
                ? 13
                : "third-party-integration"
                ? 12
                : 18,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""'
    },
    "input:hover ~ &": {
        backgroundColor: "#0048A6"
    }
}))
export default function BpCheckbox(props) {
    return (
        <Checkbox
            aria-label={`This is checkbox for ${props.checked}`}
            checked={props.checked}
            disabled={props.disabled}
            onChange={props.handleChange}
            sx={{
                "&:hover": { bgcolor: "transparent" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                pr: { md: 4.5, xs: 5 },
                pt: 1.3
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon name={props.name} />}
            icon={<BpIcon name={props.name} />}
            inputProps={{ "aria-label": "Checkbox demo" }}
            {...props}
        />
    )
}
