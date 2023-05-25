import React, { useState, useRef, useEffect } from "react"
import Box from "@mui/material/Box"
import { Button, Typography, Divider, useMediaQuery } from "@mui/material"
import theme from "../../../src/theme"
import Input from "../../common/Input"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import { Navigation, Scrollbar } from "swiper"
export default function TextToImageSignature({
    setOpenPopUp,
    setSignatureText,
    setShowSignatureText,
    setSignatureUrl,
    disabled,
    storedata,
    signatureUrl
}) {
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const [signature, setSignature] = useState("")
    const [success, setSuccess] = useState(false)
    const [selectedsign, setSelectedSign] = useState(-1)
    const [disable, setDisable] = React.useState(true)
    const ref = useRef(null)
    useEffect(() => {
        setSuccess(false)
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        setShowSignatureText(true)
        setSignatureText({
            title: signature,
            class: `f-f-sign-${selectedsign + 1}`
        })
        setSignatureUrl(null)
        setSuccess(false)
        setSelectedSign(-1)
        setSignature("")
        setOpenPopUp(false)
        setDisable(true)
        storedata(signatureUrl, {
            title: signature,
            class: `f-f-sign-${selectedsign + 1}`
        })
    }
    const handleScreenShot = (id) => {
        setSuccess(true)
        setSelectedSign(id)
    }
    return (
        <Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
                <form aria-label={`This is signature form`} onSubmit={(e) => handleSubmit(e)}>
                    <Box
                        className="signature-box"
                        sx={{ width: { xs: "100%" } }}
                    >
                        <Box>
                            <Typography
                                variant="body1"
                                className="f-f-i"
                                sx={{
                                    marginTop: "16px",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    lineHeight: "24px"
                                }}
                            >
                                {/* Selected Signature */}
                            </Typography>
                            <Box>
                                <Input
                                ariaLabel="Type your signature:"
                                    className={"ncr-new-input"}
                                    label="Type your signature:"
                                    disabled={disabled}
                                    sx={{
                                        minWidth: {
                                            xs: "100%"
                                        }
                                    }}
                                    name="signature"
                                    value={signature}
                                    onChange={(e) => {
                                        setSignature(e.target.value)
                                    }}
                                    maxLength={40}
                                />
                            </Box>
                        </Box>

                        <Box
                            className="signature-box"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "24px",
                                padding: "8px",
                                paddingTop: "8px",
                            }}
                        >
                            
                            <Swiper
                            aria-label="This is a swiper for signatures"
                                slidesPerView={2}
                                spaceBetween={isMobile ? 270 : 230}
                                navigation={true}
                                className="mySwiper"
                                scrollbar={{ hide: false,  draggable: true}}
                                modules={[Navigation, Scrollbar]}
                              >
                                {[1, 2, 3, 4].map((item, index) => (
                                    <SwiperSlide key={item}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign: "center",
                                                position: "relative",
                                                minWidth: "226px",
                                                height: "168px",
                                                borderRadius: "8px",
                                                padding: "16px",
                                                mb: '20px',
                                                border:
                                                    selectedsign == index
                                                        ? "1px solid #4CAF50"
                                                        : "",
                                                boxShadow:
                                                    "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                                            }}
                                        >
                                            <Box sx={{ width: "100%" }}>
                                                <Typography
                                                    ref={ref}
                                                    sx={{
                                                        wordBreak: "keep-all",
                                                        wordWrap: "break-word",
                                                        fontSize: "35px",
                                                        lineHeight: "52px",
                                                        fontWeight: "400"
                                                    }}
                                                    className={`f-f-sign-${
                                                        index + 1
                                                    }`}
                                                >
                                                    {signature == ""
                                                        ? "signature"
                                                        : signature}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    position: "absolute",
                                                    right: "16px",
                                                    bottom: "16px"
                                                }}
                                            >
                                                {!success ||
                                                selectedsign !== index ? (
                                                    <Box
                                                        onClick={() => {
                                                            if (
                                                                signature !== ""
                                                            ) {
                                                                handleScreenShot(
                                                                    index
                                                                )
                                                                setDisable(
                                                                    false
                                                                )
                                                            }
                                                        }}
                                                        className="f-f-i back-button"
                                                        sx={{
                                                            opacity:
                                                                signature == ""
                                                                    ? ".3"
                                                                    : "1",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            background:
                                                                "#fff !important",
                                                            padding: "8px 16px",
                                                            color: theme.palette
                                                                .primary.main,
                                                            fontSize: "14px",
                                                            lineHeight: "20px",
                                                            fontWeight: "500",
                                                            "&:hover": {
                                                                background:
                                                                    signature !==
                                                                    ""
                                                                        ? "#F5F6FF !important"
                                                                        : " ",
                                                                border:
                                                                    signature !==
                                                                    ""
                                                                        ? "1px solid #1D4ED8 !important "
                                                                        : ""
                                                            }
                                                        }}
                                                    >
                                                        Select
                                                    </Box>
                                                ) : selectedsign == index ? (
                                                    <Box
                                                        className="f-f-i"
                                                        sx={{
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            background:
                                                            theme.chips.background.complete,
                                                            padding: "8px 16px",
                                                            color:theme.chips.text.complete,
                                                            fontSize: "14px",
                                                            lineHeight: "20px",
                                                            fontWeight: "500"
                                                        }}
                                                    >
                                                        Selected
                                                    </Box>
                                                ) : (
                                                    ""
                                                )}
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                    
                                ))}
                                {isMobile && <SwiperSlide  />}
                            </Swiper>
                        </Box>
                        <Divider
                        aria-label="This is a divider"
                            className="divider-col"
                            sx={{ marginTop: "32px" }}
                        />

                        <Box sx={{ paddingTop: "24px" }}>
                            <Box
                                display="flex"
                                justifyContent={"flex-end"}
                                className="upload-popup-btns"
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    marginTop: 0,
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    }
                                }}
                            >
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        setOpenPopUp(false)
                                        setSignatureUrl(null)
                                    }}
                                    sx={{
                                        py: "12px",
                                        px: "0px",
                                        fontSize: { md: "16px", xs: "14px" },
                                        lineHeight: { md: "24px", xs: "18px" },
                                        fontWeight: 600,
                                        textTransform: "initial",
                                        borderRadius: "8px",
                                        color: theme.palette.primary.main,
                                        "&:hover": {
                                            background: "#F5F6FF !important"
                                        }
                                    }}
                                    aria-label="This is a cancel button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="next-button"
                                    type={"submit"}
                                    variant="contained"
                                    sx={{
                                        marginTop: { xs: "8px", md: "0px" },
                                        fontSize: { md: "16px", xs: "14px" },
                                        lineHeight: { md: "24px", xs: "18px" },

                                        fontWeight: 600,
                                        py: 3,
                                        px: 5,
                                        marginLeft: { xs: "0px", md: "8px" },
                                        borderRadius: "8px",
                                        background: "#1B76D4",
                                        transition: "ease-in-out",
                                        timeout: 1000,
                                        "&:hover": {}
                                    }}
                                    aria-label="This is a confirm signature button"
                                    disabled={disable}
                                >
                                    Confirm Signature
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}
