import React from "react"
import Box from "@mui/material/Box"
import {
    Divider,
    Dialog,
    DialogContent,
    Typography,
    useMediaQuery,
    Tooltip
} from "@mui/material"

import AlohaSVG from "../../AlohaSvgs"
import Image from "next/image"

export default function TooltipPopup({ showPopup, setShowPopup, data }) {
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const handleClose = (value) => {
        setShowPopup(value)
    }

    return (
        <Box>
            {data.name !== "Property Management Integration" && (
                <Dialog
                    id="aloha-integrations-popup2"
                    className="aloha-popup"
                    open={isMobile && showPopup}
                    onClose={() => {
                        handleClose(false)
                    }}
                    sx={{
                        "& div[role='dialog']": {
                            borderTopRightRadius: {
                                md: 0,
                                xs: "4px !important"
                            },
                            borderTopLeftRadius: {
                                md: 0,
                                xs: "4px !important"
                            },
                            borderBottomRightRadius: {
                                md: 0,
                                xs: "0px !important"
                            },
                            borderBottomLeftRadius: {
                                md: 0,
                                xs: "0px !important"
                            },
                            borderRadius: { md: "4px !important" }
                        }
                    }}
                >
                    <DialogContent
                        sx={{
                            padding: {
                                md: " 32px",
                                xs: " 24px 16px"
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
                                    width: { md: "100%", xs: "100%" },
                                    flexDirection: "row",
                                    position: "relative"
                                }}
                            >
                                <Box display="flex">
                                    <AlohaSVG name={data.name} />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            ml: "8px",
                                            width: { xs: "100%", md: "auto" },
                                            fontWeight: 600,
                                            textAlign: "left",
                                            fontFamily: "inter",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        {data.name}
                                    </Typography>
                                </Box>

                                <Box
                                    display={"flex"}
                                    justifyContent="flex-end"
                                    sx={{
                                        marginBottom: { xs: "12px", md: "0px" },
                                        position: "absolute",
                                        right: 0,
                                        top: { md: "-10px", xs: "0px" },
                                        display: { xs: "block", md: "block" },
                                        cursor: "pointer"
                                    }}
                                    onClick={() => handleClose(false)}
                                >
                                    <svg
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
                            </Box>{" "}
                            <Divider
                                className="divider-col"
                                sx={{
                                    width: "100%",
                                    marginTop: "12px"
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    my: "24px",
                                    width: { xs: "100%", md: "auto" },
                                    fontWeight: 400,
                                    textAlign: "left",
                                    fontFamily: "inter",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#5C5C5C"
                                }}
                            >
                                Mobile app that provides owners and managers
                                real-time visibility into the restaurant’s
                                sales, tickets, forecasts and more all from
                                their personal devices.
                            </Typography>
                            <Image
                                width={591}
                                height={375}
                                alt={"food"}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/${data.svg}.png`}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
            )
       
        }
        </Box>
    )
}
