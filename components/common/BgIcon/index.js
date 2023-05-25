import React from "react"
import { Box } from "@mui/material"
import { useRouter } from "next/router"

export function BgIcon({ svg_image }) {
    const router = useRouter()
    const path = router.pathname
    const splitpath = path.split("/")
    const thirdpath = splitpath[3]

    return (
        <Box
            sx={{
                background: "#E8EEFF",
                borderRadius: "100px",
                width: "24px",
                height: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: thirdpath == "revenue-center" && { md: 0, xs: "-2px" }
            }}
        >
            {svg_image}
        </Box>
    )
}
