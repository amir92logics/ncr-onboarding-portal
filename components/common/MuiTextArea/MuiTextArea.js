import React from "react"
import TextField from "@mui/material/TextField"
import theme from "../../../src/theme"
import { useRouter } from "next/router"
function MuiTextArea({ comment, handleChange, require1, disableText, aloha, ariaLabel }) {
    const router = useRouter()
    const path = router.pathname
    const pathSplit = path.split("/")
    const thirdPath = pathSplit[3]
    return (
        <>
            <TextField
               aria-label={ariaLabel}
                disabled={disableText}
                required={require1}
                variant="outlined"
                // id="outlined-textarea"
                label={`${aloha ? "Additional Notes" : "Type something..."}`}
                multiline
                value={comment}
                onChange={handleChange}
                sx={{
                    width:
                        thirdPath == "printer-routing"
                            ? { xs: "100%" }
                            : thirdPath == "other-third-party-solutions"
                            ? { xs: "100%" }
                            : "100%",
                    color: "white",
                    letterSpacing: theme.letterSpacing.main,
                    marginTop:
                        thirdPath == "printer-routing"
                            ? { md: "16px", xs: "16px" }
                            : thirdPath === "overtime"
                            ? { lg: "16px", xs: "16px" }
                            : thirdPath === "tax-rates"
                            ? "16px"
                            : thirdPath === "hours-of-operation"
                            ? "24px"
                            : "12px",
                    height: "88px !important",
                    "& .mui-style-1mrzjjx-MuiFormLabel-root-MuiInputLabel-root":
                        {
                            color: "#5C5C5C !important"
                        }
                }}
                className={
                    thirdPath === "overtime"
                        ? " f-f-i text-area-label"
                        : "f-f-i text-area-label"
                }
                rows={3}
                aria-describedby="Please indicate any special notes about"
            />
        </>
    )
}
MuiTextArea.defaultProps = {
    textArea: false
}
export default MuiTextArea
