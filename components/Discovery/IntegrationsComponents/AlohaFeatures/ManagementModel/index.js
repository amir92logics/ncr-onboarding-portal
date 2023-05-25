import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Divider,
    Dialog,
    DialogContent,
    Typography,
    TextField
} from "@mui/material"
import theme from "../../../../../src/theme"
import SelectBox from "../../../../common/SelectBox/index"
import MuiTextArea from "../../../../common/MuiTextArea/MuiTextArea"
import Input from "../../../../common/Input"

export default function ManagementPopup({
    showPopup,
    setShowPopup,
    data,
    setData,
    disabled
}) {
    const [isIp, setIsIp] = useState(false)
    const handleClose = (value) => {
        setShowPopup(value)
    }
    let TempData = data.find(
        (it) => it.name == "Property Management Integration"
    ).Aloha_Property_Management_Data

    const [temp, setTemp] = useState(TempData)
    const exceptThisSymbols = ["e", "E", "+", "-"]
    function isValidIP(str) {
        const octet = "(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)"
        const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`)
        return regex.test(str)
    }

    const handleChange = (name, value) => {
        let tempArr = temp.map((item) => ({ ...item }))
        let target = tempArr.findIndex((item) => item.name == name)
        if (target !== -1) {
            tempArr[target].value = value
            setTemp(tempArr)
        } else {
            tempArr[4].value = name.target.value

            setTemp(tempArr)
        }
    }
    const handleDisable = () => {
        const _temp = temp.filter(
            (item) => item.value === "" && item.name !== "Additonal Note"
        )
        const _temp1 = temp.filter(
            (item) =>
                item.name !== "IP Address of PMS Server" &&
                item.name !== "Port Number to match PMS Server" &&
                item.value === "" &&
                item.name !== "Additonal Note"
        )
        if (_temp.length === 0 && temp[1].value == "TCP/IP" && !isIp) {
            return false
        } else if (_temp1.length == 0) {
            if (temp[1].value == "TCP/IP") {
                return true
            }
            return false
        } else {
            return true
        }
    }
    useEffect(() => {
        setTemp(TempData)
    }, [data])

    return (
        <Box>
            <Dialog
                aria-label="This is property management integration popup"
                id="aloha-integrations-popup"
                className="aloha-popup"
                open={showPopup}
                onClose={() => {
                    handleClose(false)
                }}
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
                        padding: {
                            md: " 32px",
                            xs: " 24px"
                        }
                    }}
                >
                    <form
                        aria-label={`This is management model form`}
                        onSubmit={(e) => {
                            e.preventDefault()
                            setData(temp)
                            setShowPopup(false)
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
                                <Typography
                                    variant="body1"
                                    sx={{
                                        width: { xs: "80%", md: "auto" },
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontFamily: "inter",
                                        fontSize: "24px",
                                        lineHeight: "32px",
                                        color: "#1E1E1E"
                                    }}
                                >
                                    Property Management Integration
                                </Typography>

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
                            </Box>
                            <>
                                {" "}
                                <Divider
                                    className="divider-col"
                                    sx={{
                                        width: "100%",
                                        marginTop: "12px"
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },

                                        alignItems: { lg: "center" },
                                        justifyContent: {
                                            md: "space-between",
                                            xs: "flex-start"
                                        },
                                        marginTop: "24px",
                                        marginBottom: "15px",
                                        minWidth: "100%"
                                    }}
                                >
                                    <Input
                                        ariaLabel={`This is ${temp[0]?.name} input`}
                                        className={"ncr-new-input"}
                                        label={temp[0]?.name}
                                        disabled={disabled}
                                        sx={{
                                            minWidth: "100%"
                                        }}
                                        name="contact_phone"
                                        value={temp[0]?.value}
                                        onChange={(e) =>
                                            handleChange(
                                                "PMS Company Name",
                                                e.target.value
                                            )
                                        }
                                        maxLength={40}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        },

                                        alignItems: { lg: "center" },
                                        justifyContent: {
                                            md: "space-between",
                                            xs: "flex-start"
                                        },
                                        marginBottom: "16px",
                                        minWidth: { xs: "100%", md: "100%" }
                                    }}
                                >
                                    <SelectBox
                                        ariaLabel={`This is ${temp[1]?.name} selectbox`}
                                        required={true}
                                        defaultLabel={temp[1]?.name}
                                        initialValue={temp[1]?.value}
                                        name="PMS Connection Type"
                                        fontColor="#1E1E1E"
                                        width={{
                                            xs: "100%",
                                            md: "100%",
                                            lg: "100%"
                                        }}
                                        list={[
                                            {
                                                label: "Serial",
                                                value: "Serial"
                                            },
                                            {
                                                label: "TCP/IP",
                                                value: "TCP/IP"
                                            },
                                            {
                                                label: "I am not sure",
                                                value: "I am not sure"
                                            }
                                        ]}
                                        bgColor={"white"}
                                        value=""
                                        handleChange={(name, value) => {
                                            handleChange(name, value)
                                        }}
                                    ></SelectBox>
                                </Box>
                                {temp[1]?.value == "TCP/IP" && (
                                    <>
                                        {" "}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: {
                                                    md: "row",
                                                    xs: "column"
                                                },

                                                alignItems: { lg: "center" },
                                                justifyContent: {
                                                    md: "space-between",
                                                    xs: "flex-start"
                                                },
                                                marginBottom: "16px",
                                                minWidth: "100%"
                                            }}
                                        >
                                            <Input
                                                ariaLabel={`This is ${temp[2]?.name} input`}
                                                className={"ncr-new-input"}
                                                label={temp[2]?.name}
                                                disabled={disabled}
                                                sx={{
                                                    minWidth: "100%"
                                                }}
                                                name="contact_phone"
                                                value={temp[2]?.value}
                                                onChange={(e) => {
                                                    if (
                                                        isValidIP(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setIsIp(false)
                                                    } else {
                                                        setIsIp(true)
                                                    }
                                                    handleChange(
                                                        "IP Address of PMS Server",
                                                        e.target.value
                                                    )
                                                }}
                                                maxLength={40}
                                                err={!isIp ? false : true}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: {
                                                    md: "row",
                                                    xs: "column"
                                                },

                                                alignItems: { lg: "center" },
                                                justifyContent: {
                                                    md: "space-between",
                                                    xs: "flex-start"
                                                },
                                                marginBottom: "32px",
                                                minWidth: "100%"
                                            }}
                                        >
                                            <Input
                                                ariaLabel={`This is ${temp[3]?.name} input`}
                                                className={"ncr-new-input"}
                                                label={temp[3]?.name}
                                                disabled={disabled}
                                                type={'number'}
                                                sx={{
                                                    minWidth: "100%"
                                                }}
                                                name="contact_phone"
                                                value={temp[3]?.value}
                                                onChange={(e) => {
                                                    handleChange(
                                                        "Port Number to match PMS Server",
                                                        e.target.value
                                                    )
                                                }}
                                                maxLength={40}
                                                onKeyDown={(e) =>
                                                    exceptThisSymbols.includes(
                                                        e.key
                                                    ) && e.preventDefault()
                                                }
                                            />
                                        </Box>
                                    </>
                                )}
                                <Box
                                    className="Top-text"
                                    display="flex"
                                    flexDirection="column"
                                    sx={{
                                        minWidth: {
                                            xs: "100%",
                                            md: "100% !important"
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#1E1E1E",
                                            marginBottom: "4px"
                                        }}
                                    >
                                        Please provide any additional notes:
                                    </Typography>
                                    <MuiTextArea
                                        ariaLabel={`This is ${temp[4]?.name} textArea`}
                                        handleChange={handleChange}
                                        comment={temp[4]?.value}
                                        aloha={true}
                                    />
                                </Box>
                            </>

                            <Box
                                paddingTop={"24px"}
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
                                        md: "row",
                                        sm: "column",
                                        xs: "column"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: {
                                            md: "row",
                                            xs: "column-reverse"
                                        }
                                    }}
                                    display="flex"
                                >
                                    <>
                                        <Button
                                            disabled={handleDisable()}
                                            className="next-button"
                                            type="submit"
                                            role="button"
                                            aria-label="This is Confirm buttton"
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
                                    </>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
