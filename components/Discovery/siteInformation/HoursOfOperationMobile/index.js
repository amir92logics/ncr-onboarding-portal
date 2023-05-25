import React from "react"
import Box from "@mui/material/Box"
import { Button, Typography } from "@mui/material"
import theme from "../../../../src/theme"
import SelectBox from "../../../common/SelectBox"

export default function HoursOfOperationMobile({
    hoursOfOperation,
    setopenTimePopUp,
    setDaysselected,
    disabled
}) {
    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection={"column"}
            sx={{ rowGap: 6.2, mt: 6, width: "100%" }}
        >
            {hoursOfOperation?.map((item, id) => (
                <Box
                    key={id}
                    className="shadow"
                    sx={{
                        borderRadius: "8px",
                        alignItems: "center",
                        width: "100%",
                        background: "white",
                        padding: "15.1px 16px 16px 16px"
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box sx={{ maxWidth: "155px", width: "100%" }}>
                                <Typography
                                    sx={{
                                        color: "#1E1E1E",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        paddingBottom: "8px",
                                        lineHeight: "18px"
                                    }}
                                >
                                    Day
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 400,
                                        lineHeight: "22px",
                                        color: item?.close
                                            ? "#727272"
                                            : "#1e1e1e !important",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {item?.day}
                                </Typography>
                            </Box>
                            <Box sx={{ maxWidth: "163px", width: "100%" }}>
                                <Typography
                                    sx={{
                                        color: "#1E1E1E",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        paddingBottom: "8px",
                                        lineHeight: "18px"
                                    }}
                                >
                                    Timings
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 400,
                                        lineHeight: "22px",
                                        color: "#5c5c5c"
                                    }}
                                >
                                    {item.close ? (
                                        <Box>Closed</Box>
                                    ) : (
                                        <>
                                            {" "}
                                            {item?.alltime !== "" ? (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            rowGap: 2
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    theme
                                                                        .fontsize
                                                                        .sm,
                                                                lineHeight:
                                                                    "19px",
                                                                color: "#1e1e1e"
                                                            }}
                                                        >
                                                            {item.alltime}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                color: theme
                                                                    .palette
                                                                    .secondary
                                                                    .main,
                                                                fontSize:
                                                                    "12px",
                                                                lineHeight:
                                                                    "18px",
                                                                fontWeight: 400,
                                                                textTransform:
                                                                    "capitalize",
                                                                py: "3px",
                                                                px: 2,
                                                                backgroundColor:
                                                                    "#f5f5f5",
                                                                borderRadius: 6,
                                                                width: "max-content"
                                                            }}
                                                        >
                                                            End of Day Time
                                                        </Box>
                                                    </Box>
                                                </>
                                            ) : (
                                                <>
                                                    {item?.time?.map(
                                                        (item1, idx) => (
                                                            <Typography
                                                                key={idx}
                                                                sx={{
                                                                    fontSize:
                                                                        theme
                                                                            .fontsize
                                                                            .sm,
                                                                    lineHeight:
                                                                        "19px",
                                                                    mt:
                                                                        idx !==
                                                                        0
                                                                            ? 3
                                                                            : 0,

                                                                    color: item?.close
                                                                        ? "#727272"
                                                                        : "#5C5C5C"
                                                                }}
                                                            >
                                                                {item1.open
                                                                    ? item1.open +
                                                                      " to " +
                                                                      item1.close
                                                                    : "--"}{" "}
                                                            </Typography>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", mt: 4 }}>
                        <Box
                            sx={{
                                width: "100%",
                                fontWeight: "600",
                                fontSize: "14px",
                                lineHeight: "22px"
                            }}
                            target="_blank"
                            onClick={() => {
                                !disabled &&
                                    (setDaysselected([item?.day]),
                                    setopenTimePopUp(true))
                            }}
                        >
                            <Button
                                aria-label="This is Edit Hours Button"
                                disabled={disabled}
                                className="back-button"
                                sx={{
                                    width: "100%",
                                    p: "6.75px 8px !important",
                                    opacity: disabled && 0.5
                                }}
                            >
                                Edit Hours
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}
