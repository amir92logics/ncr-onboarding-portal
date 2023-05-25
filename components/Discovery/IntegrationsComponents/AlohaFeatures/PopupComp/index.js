import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Divider,
    Dialog,
    DialogContent,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio
} from "@mui/material"
import theme from "../../../../../src/theme"

export default function PopUpComp({
    showPopup,
    setShowPopup,
    handleDeleteItem,
    title,
    data,
    setData,
    currentType
}) {
    const [type, setType] = useState("A")
    const [copied, setCopied] = useState("")

    const handleClose = (value) => {
        setShowPopup(value)
    }
    let TempData = data.find(
        (it) => it.name == "Gift Cards"
    ).Aloha_Gift_Cards_Data
    const handleChange = (name, value) => {
        let tempArr = TempData.map((item) => ({ ...item }))
        if (name == "question1") {
            tempArr[0].value = value
            setType("B")
            setData(tempArr)
        } else {
            tempArr[1].value = value
            setData(tempArr)
        }
    }
    useEffect(() => {
        setType(currentType)
    }, [currentType])
    const renderContent = () => {
        switch (type) {
            case "A":
                return (
                    <>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 400,
                                textAlign: "left",
                                fontSize: {
                                    lg: "18px",
                                    xs: "18px"
                                },
                                lineHeight: {
                                    lg: "28px",
                                    xs: "28px"
                                },
                                color: "#1D4ED8"
                            }}
                        >
                            Question 1/2
                        </Typography>
                        <Divider
                            className="divider-col"
                            sx={{
                                width: "100%",
                                marginTop: "12px"
                            }}
                        />
                        <>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    paddingTop: "16px",
                                    fontFamily: "inter",
                                    fontSize: {
                                        lg: "20px",
                                        xs: "20px"
                                    },
                                    lineHeight: {
                                        lg: "28px",
                                        xs: "28px"
                                    },
                                    color: "#1E1E1E",
                                    marginBottom: "24px",
                                    letterSpacing: "-0.004em"
                                }}
                            >
                                {TempData[0].question1}
                            </Typography>

                            <RadioGroup
                                aria-label="Do you currently use or plan to use Real-Time Analytics App with your Aloha system?"
                                name={"question1"}
                                defaultValue={TempData[0].value}
                                onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                }
                                sx={{
                                    display: "flex",
                                    gap: { md: "8px", xs: "8px" },
                                    flexDirection: "column",
                                    width: "100%",
                                    justifyContent: { md: "flex-end" },
                                    ml: "-9px"
                                }}
                            >
                                <FormControlLabel
                                    value="Yes"
                                    sx={{
                                        marginLeft: {
                                            xs: "1px",
                                            md: "0px !important"
                                        },
                                        marginRight: {
                                            xs: "4px",
                                            md: "0px !important"
                                        },
                                        color: "#5c5c5c"
                                    }}
                                    control={
                                        <Radio
                                        aria-label="This is radio button for yes option"
                                            sx={{
                                                "&:hover": {
                                                    bgcolor:
                                                        "#F5F5F5 !important"
                                                },
                                                "&.Mui-checked": {
                                                    color: theme.palette.primary
                                                        .main
                                                },
                                                padding: {
                                                    xs: "6px !important"
                                                },
                                                mr: {
                                                    md: "4px !important",
                                                    xs: "4px !important"
                                                },
                                                scale: "0.9"
                                            }}
                                        />
                                    }
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="No"
                                    sx={{
                                        marginLeft: {
                                            xs: "1px",
                                            md: "0px !important"
                                        },
                                        marginRight: {
                                            xs: "4px",
                                            md: "0px !important"
                                        },
                                        color: "#5c5c5c"
                                    }}
                                    control={
                                        <Radio
                                        aria-label="This is radio button for no option"
                                            sx={{
                                                "&:hover": {
                                                    bgcolor:
                                                        "#F5F5F5 !important"
                                                },
                                                "&.Mui-checked": {
                                                    color: theme.palette.primary
                                                        .main
                                                },
                                                padding: {
                                                    xs: "6px !important"
                                                },
                                                mr: {
                                                    md: "4px !important",
                                                    xs: "4px !important"
                                                },
                                                scale: "0.9"
                                            }}
                                        />
                                    }
                                    label="No"
                                />
                            </RadioGroup>
                        </>
                    </>
                )

            case "B":
                return (
                    <>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 400,
                                textAlign: "left",
                                fontFamily: "inter",
                                fontSize: {
                                    lg: "18px",
                                    xs: "18px"
                                },
                                lineHeight: {
                                    lg: "28px",
                                    xs: "28px"
                                },
                                color: "#1D4ED8"
                            }}
                        >
                            Question 2/2
                        </Typography>
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
                                fontWeight: 600,
                                paddingTop: "16px",
                                fontFamily: "inter",
                                fontSize: {
                                    lg: "20px",
                                    xs: "20px"
                                },
                                lineHeight: {
                                    lg: "28px",
                                    xs: "28px"
                                },
                                color: "#1E1E1E",
                                marginBottom: "16px",
                                letterSpacing: "-0.004em"
                            }}
                        >
                            {TempData[1].question2}
                        </Typography>

                        <RadioGroup
                            aria-label="Do you currently use or plan to use Real-Time Analytics App with your Aloha system?"
                            name={"question2"}
                            defaultValue={TempData[1].value}
                            onChange={(e) =>
                                handleChange(e.target.name, e.target.value)
                            }
                            sx={{
                                display: "flex",
                                gap: { md: "8px", xs: "8px" },
                                flexDirection: "column",
                                width: "100%",
                                justifyContent: { md: "flex-end" },
                                ml: "-9px"
                            }}
                        >
                            <FormControlLabel
                                value="Yes"
                                sx={{
                                    marginLeft: "0px !important",
                                    marginRight: "0px !important",
                                    color: "#5c5c5c"
                                }}
                                control={
                                    <Radio
                                       aria-label="This is radio button for yes option"
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "#F5F5F5 !important"
                                            },
                                            "&.Mui-checked": {
                                                color: theme.palette.primary
                                                    .main
                                            },
                                            padding: {
                                                xs: "6px !important"
                                            },
                                            mr: {
                                                md: "4px !important",
                                                xs: "4px !important"
                                            },
                                            scale: "0.9"
                                        }}
                                    />
                                }
                                label="Yes"
                            />
                            <FormControlLabel
                                value="No"
                                sx={{
                                    marginRight: "0px !important",
                                    marginLeft: "0px !important",
                                    color: "#5c5c5c"
                                }}
                                control={
                                    <Radio
                                        aria-label="This is radio button for no option"
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "#F5F5F5 !important"
                                            },
                                            "&.Mui-checked": {
                                                color: theme.palette.primary
                                                    .main
                                            },
                                            padding: {
                                                xs: "6px !important"
                                            },
                                            mr: {
                                                md: "4px !important",
                                                xs: "4px !important"
                                            },
                                            scale: "0.9"
                                        }}
                                    />
                                }
                                label="No"
                            />
                        </RadioGroup>
                        <Box
                            display="flex"
                            width="100%"
                            sx={{
                                width: "100%",
                                justifyContent: {
                                    md: "flex-end",
                                    xs: "center"
                                },
                                flexDirection: {
                                    lg: "row",
                                    md: "column",
                                    sm: "column",
                                    xs: "column"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    }
                                }}
                                display="flex"
                                alignSelf={{ md: "flex-end" }}
                                gap={"8px"}
                                marginTop={{ sm: 0, md: "24px" }}
                            >
                                <Button
                                    aria-label="This is back button"
                                    sx={{
                                        marginTop: {
                                            xs: "16px",
                                            sm: "24px",
                                            md: "0px"
                                        },

                                        textTransform: "none",
                                        marginRight: { md: "8x" },
                                        padding: "12px",
                                        fontWeight: 600,
                                        display: "flex",
                                        justifyContent: "center",
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },
                                        borderRadius: "8px",

                                        "&:hover": {
                                            bgcolor: "#F5F6FF !important ",
                                            color: "#062ec9"
                                        }
                                    }}
                                    onClick={() => {
                                        setType("A")
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    disabled={TempData[1].value == ""}
                                    className="next-button"
                                    onClick={(e) => {
                                        setType("D")
                                    }}
                                    role="button"
                                    aria-label="This is confirm button"
                                    variant="contained"
                                    sx={{
                                        padding: "12px 20px",
                                        fontWeight: 600,
                                        display: "flex",
                                        justifyContent: "center",
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },
                                        color: "white"
                                    }}
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </Box>
                    </>
                )
            case "C":
                return (
                    <>
                        <Divider
                            className="divider-col"
                            sx={{
                                width: "100%",
                                marginTop: "6px"
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 400,
                                paddingTop: "16px",
                                fontFamily: "inter",
                                fontSize: {
                                    lg: "16px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "24px",
                                    xs: "24px"
                                },
                                color: "#1E1E1E",
                                marginBottom: "32px",
                                letterSpacing: "-0.004em"
                            }}
                        >
                            If you select{" "}
                            <span style={{ fontWeight: 700 }}>No</span>, all the
                            questions you have answered for this feature will be
                            reset. Do you wish to proceed?
                        </Typography>
                        <Box
                            display="flex"
                            width="100%"
                            sx={{
                                width: "100%",
                                justifyContent: {
                                    md: "flex-end",
                                    xs: "center"
                                },
                                flexDirection: {
                                    lg: "row",
                                    md: "column",
                                    sm: "column",
                                    xs: "column"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    },
                                    justifyContent: {
                                        md: "flex-end",
                                        xs: "center"
                                    }
                                }}
                                display="flex"
                            >
                                <Button
                                    className="next-button"
                                    onClick={(e) => {
                                        setData([
                                            {
                                                question1:
                                                    "Would you like to have your current Gift Cards converted to be used with Aloha?",
                                                value: ""
                                            },
                                            {
                                                question2:
                                                    "Do you currently use a 3rd Party Gift Card Processor?",
                                                value: ""
                                            }
                                        ])
                                        setShowPopup(false)
                                    }}
                                    role="button"
                                    aria-label="This is Proceed button"
                                    variant="contained"
                                    sx={{
                                        padding: "12px 20px",
                                        fontWeight: 600,
                                        display: "flex",
                                        justifyContent: "center",
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },
                                        color: "white"
                                    }}
                                >
                                    Proceed
                                </Button>
                            </Box>
                        </Box>
                    </>
                )
            case "D":
                return (
                    <>
                        <Divider
                            className="divider-col"
                            sx={{
                                width: "100%",
                                marginTop: "0px"
                            }}
                        />
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            width="100%"
                            sx={{
                                background: "#FAFAFA",
                                width: "100%",
                                padding: "20px",
                                marginTop: "24px",
                                borderRadius: "12px"
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 400,
                                    fontFamily: "inter",
                                    fontSize: {
                                        lg: "16px",
                                        xs: "16px"
                                    },
                                    lineHeight: {
                                        lg: "24px",
                                        xs: "24px"
                                    },
                                    color: "#5C5C5C",
                                    marginBottom: "24px"
                                }}
                            >
                                In order to convert your current gift cards to
                                be used with the Aloha system, there are a few
                                steps we need you to perform.
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 400,
                                    fontFamily: "inter",
                                    fontSize: {
                                        lg: "16px",
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        lg: "24px",
                                        xs: "24px"
                                    },
                                    color: "#5C5C5C"
                                }}
                            >
                                <ol id="aloha-integrations-ol">
                                    <li>
                                        Please send physical cards for testing
                                        compatibility to the address below.{" "}
                                        <br />
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="flex-end"
                                            gap="18px"
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontFamily: "inter",
                                                        fontSize: {
                                                            lg: "16px",
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            lg: "24px",
                                                            xs: "24px"
                                                        },
                                                        color: "#727272"
                                                    }}
                                                >
                                                    NCR Corp
                                                    <br />
                                                    Attn: Gary Seagle <br />
                                                    864 Spring St NW<br/>
                                                    Atlanta, GA 30308
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                            >
                                                <Button
                                                    aria-label="This is copy address button"
                                                    onClick={() => {
                                                        setCopied("address")
                                                        setTimeout(() => {
                                                            setCopied("")
                                                        }, 1000)
                                                        navigator.clipboard.writeText(
                                                            "NCR Corp Attn: Gary Seagle 864 Spring St NW Atlanta, GA 30308"
                                                        )
                                                    }}
                                                    sx={{
                                                        display: "flex",
                                                        columnGap: "10px",
                                                        padding: "8px",
                                                        borderRadius: "8px"
                                                    }}
                                                >
                                                    <svg
                                                        width={20}
                                                        height={20}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{
                                                            marginBottom: "1px"
                                                        }}
                                                    >
                                                        <title>This is {copied == "address"
                                                            ? "Copied"
                                                            : "Copy address"} icon</title>
                                                        <g clipPath="url(#clip0_899_3912)">
                                                            <path
                                                                d="M3.33366 1.99967H2.83366V2.49967V13.6663H2.16699V2.49967C2.16699 1.85915 2.69313 1.33301 3.33366 1.33301H12.8337V1.99967H3.33366ZM15.8337 17.9997H16.3337V17.4997V5.83301V5.33301H15.8337H6.66699H6.16699V5.83301V17.4997V17.9997H6.66699H15.8337ZM6.66699 4.66634H15.8337C16.4742 4.66634 17.0003 5.19248 17.0003 5.83301V17.4997C17.0003 18.1402 16.4742 18.6663 15.8337 18.6663H6.66699C6.02647 18.6663 5.50033 18.1402 5.50033 17.4997V5.83301C5.50033 5.19248 6.02647 4.66634 6.66699 4.66634Z"
                                                                fill="#323232"
                                                                stroke="#1D4ED8"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_899_3912">
                                                                <rect
                                                                    width={20}
                                                                    height={20}
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                    <Typography
                                                        sx={{
                                                            textTransform:
                                                                "initial",
                                                            fontWeight: 600,
                                                            fontFamily: "inter",
                                                            fontSize: {
                                                                lg: "12px",
                                                                xs: "14px"
                                                            },
                                                            lineHeight: {
                                                                lg: "24px",
                                                                xs: "24px"
                                                            },
                                                            color: "#1D4ED8"
                                                        }}
                                                    >
                                                        {copied == "address"
                                                            ? "Copied"
                                                            : "Copy address"}
                                                    </Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                    </li>
                                    <li>
                                        Once you email the package please send
                                        your Name, Site Name, Site Physical
                                        Address and package tracking information
                                        to the follow address. <br />
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="flex-end"
                                            gap="18px"
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontFamily: "inter",
                                                        fontSize: {
                                                            lg: "16px",
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            lg: "24px",
                                                            xs: "24px"
                                                        },
                                                        color: "#727272"
                                                    }}
                                                >
                                                    SMB, Conversions
                                                    <br />
                                                    SC230549@ncr.com
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                gap="10px"
                                            >
                                                <Button
                                    aria-label="This is copy email button"

                                                    onClick={() => {
                                                        setCopied("email")
                                                        setTimeout(() => {
                                                            setCopied("")
                                                        }, 1000)
                                                        navigator.clipboard.writeText(
                                                            "SMB, Conversions SC230549@ncr.com"
                                                        )
                                                    }}
                                                    sx={{
                                                        display: "flex",
                                                        columnGap: "10px",
                                                        padding: "8px",
                                                        borderRadius: "8px"
                                                    }}
                                                >
                                                    <svg
                                                        width={20}
                                                        height={20}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{
                                                            marginBottom: "1px"
                                                        }}
                                                    >
                                                         <title>This is {copied == "email"
                                                            ? "Copied"
                                                            : "Copy email"} icon</title>
                                                        <g clipPath="url(#clip0_899_3912)">
                                                            <path
                                                                d="M3.33366 1.99967H2.83366V2.49967V13.6663H2.16699V2.49967C2.16699 1.85915 2.69313 1.33301 3.33366 1.33301H12.8337V1.99967H3.33366ZM15.8337 17.9997H16.3337V17.4997V5.83301V5.33301H15.8337H6.66699H6.16699V5.83301V17.4997V17.9997H6.66699H15.8337ZM6.66699 4.66634H15.8337C16.4742 4.66634 17.0003 5.19248 17.0003 5.83301V17.4997C17.0003 18.1402 16.4742 18.6663 15.8337 18.6663H6.66699C6.02647 18.6663 5.50033 18.1402 5.50033 17.4997V5.83301C5.50033 5.19248 6.02647 4.66634 6.66699 4.66634Z"
                                                                fill="#323232"
                                                                stroke="#1D4ED8"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_899_3912">
                                                                <rect
                                                                    width={20}
                                                                    height={20}
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                    <Typography
                                                        sx={{
                                                            textTransform:
                                                                "initial",
                                                            fontWeight: 600,
                                                            fontFamily: "inter",
                                                            fontSize: {
                                                                lg: "12px",
                                                                xs: "14px"
                                                            },
                                                            lineHeight: {
                                                                lg: "22px",
                                                                xs: "24px"
                                                            },
                                                            color: "#1D4ED8"
                                                        }}
                                                    >
                                                        {copied == "email"
                                                            ? "Copied"
                                                            : "Copy email"}
                                                    </Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                    </li>
                                </ol>
                            </Typography>
                        </Box>

                        <Box
                            marginTop={6}
                            display="flex"
                            width="100%"
                            sx={{
                                width: "100%",
                                justifyContent: {
                                    md: "flex-end",
                                    xs: "center"
                                },
                                flexDirection: {
                                    lg: "row",
                                    md: "column",
                                    sm: "column",
                                    xs: "column"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    }
                                }}
                                display="flex"
                                alignSelf={{ md: "flex-end" }}
                                gap={"8px"}
                            >
                                <Button
                                                                        aria-label="This is back button"

                                    sx={{
                                        marginTop: {
                                            md: "0px"
                                        },
                                        padding: "12px ",
                                        fontWeight: 600,
                                        display: "flex",
                                        justifyContent: "center",
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        color: "#1d4ed8",
                                        "&:hover": {
                                            bgcolor: "#F5F6FF !important ",
                                            color: "#062ec9"
                                        }
                                    }}
                                    onClick={() => {
                                        setType("B")
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    className="next-button"
                                    onClick={(e) => {
                                        setShowPopup(false)
                                    }}
                                    role="button"
                                    aria-label="This is confirmation button"
                                    variant="contained"
                                    sx={{
                                        padding: "12px 20px",
                                        fontWeight: 600,
                                        display: "flex",
                                        justifyContent: "center",
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            md: "24px",
                                            xs: "18px"
                                        },
                                        color: "white"
                                    }}
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </Box>
                    </>
                )
            default:
        }
    }

    return (
        <Box>
            <Dialog
                aria-label="This is  gift cards popup"
                id="aloha-integrations-popup"
                open={showPopup}
                onClose={() => {
                    handleClose(false)
                }}
                padding="0px"
                sx={{
                    "& div[role='dialog']": {
                        borderTopRightRadius: { md: 0, xs: "4px !important" },
                        borderTopLeftRadius: { md: 0, xs: "4px !important" },
                        borderBottomRightRadius: {
                            md: 0,
                            xs: "0px !important"
                        },
                        borderBottomLeftRadius: { md: 0, xs: "0px !important" },
                        borderRadius: { md: "4px !important" }
                    }
                }}
            >
                <DialogContent
                    sx={{
                        position: "relative",
                        padding: { xs: "24px", md: "32px" }
                    }}
                >
                    <form aria-label="This is gift cards form" onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            display={"flex"}
                            justifyContent="flex-end"
                            sx={{
                                ml: "auto",
                                maxWidth: "24px",
                                position: "absolute",
                                right: 32,
                                top: 24,
                                cursor: "pointer",
                                zIndex: 10,
                                marginBottom: { xs: "12px", md: "0px" },
                                display: { xs: "block", md: "none" }
                            }}
                            onClick={() => handleClose(false)}
                        >
                            <svg
                                cursor="pointer"
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
                        <Box
                            sx={{
                                display: "flex",
                                width: { md: "100%", xs: "100%" },
                                flexDirection: "row",
                                position: "relative"
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontFamily: "inter",
                                        fontSize: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        lineHeight: {
                                            lg: "32px",
                                            xs: "32px"
                                        },
                                        color: "#1E1E1E",
                                        marginBottom: "9px",
                                        letterSpacing: "-0.004em"
                                    }}
                                >
                                    Gift Cards
                                </Typography>
                            </Box>
                            <Box
                                onClick={() => handleClose(false)}
                                display={"flex"}
                                justifyContent="flex-end"
                                sx={{
                                    marginBottom: { xs: "12px", md: "0px" },
                                    position: "absolute",
                                    right: 0,
                                    top: "-10px",
                                    display: { xs: "none", md: "block" },
                                    cursor: "pointer"
                                }}
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
                        </Box>
                        {renderContent()}
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
