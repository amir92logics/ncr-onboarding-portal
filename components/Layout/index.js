import React, { useEffect } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import LogoutRightBar from "./LogoutRightBar"

import { Box } from "@mui/system"
import Notifications from "./Notifications"
function Index({ children }) {
    return (
        <>
            <Box display={"flex"}>
                <Box display={"flex"}>
                    <Sidebar />
                </Box>
                <Box width={"100%"}>
                    <Header />

                    <LogoutRightBar />
                    <Notifications />
                    <Box sx={{ ml: { lg: "240px" } }}>{children}</Box>
                </Box>
            </Box>
        </>
    )
}

export default Index