import React from "react"
import { Button, CircularProgress } from "@mui/material"
function CommonButton({
    color,
    textColor,
    hover,
    borderWidth,
    borderColor,
    content,
    px,
    py,
    small,
    fontSize,
    lineHeight,
    fontWeight,
    ariaTag,
    disabled,
    type,
    className,
    mt,
    mr,
    mb,
    onclickHandler,
    variant,
    width,
    svgicon,
    loading,
    height,
    name,
    textTransform
}) {
    return (
        <Button
            variant={variant}
            size="small"
            onClick={() => {
                type != "submit" && onclickHandler()
            }}
            className={className}
            type={type}
            aria-label={ariaTag}
            disabled={disabled}
            sx={{
                textTransform: textTransform || "",
                display: "flex",
                justifyContent: "center",
                color: textColor || "#FAFAFA",
                "&:hover": {
                    background:
                        content.includes("Back") || content == "View"
                            ? "#F5F6FF !important"
                            : hover,
                    border:
                        content.includes("Back") || content == "View"
                            ? "1px solid #1D4ED8 !important "
                            : hover
                },
                border: `${
                    borderWidth ? borderWidth : "1px"
                } solid ${borderColor}`,
                px: small ? "" : px,
                py: small ? "" : py,
                fontSize: fontSize,
                lineHeight: lineHeight,
                fontWeight: fontWeight,
                mt: mt,
                mr: mr,
                mb: mb,
                width: width,
                height: height
            }}
        >
            {loading === true || loading === "loading" ? (
                <CircularProgress size={24} thickness={4} color="white" />
            ) : loading === "confirm" ? (
                <svg
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>{`This is tooltip icon for ${ariaTag}`}</title>
                    <g clipPath="url(#clip0_55_7425)">
                        <path
                            d="M5.83325 14.0001L11.6666 19.8334L23.3333 8.16675"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_55_7425">
                            <rect width={28} height={28} fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            ) : (
                <>
                    {content}
                    {svgicon}
                </>
            )}
        </Button>
    )
}

export default CommonButton
