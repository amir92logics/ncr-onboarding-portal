import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Button, Dialog, DialogContent, Typography } from "@mui/material"
import theme from "../../../../../src/theme"
import Input from "../../../../common/Input"
export default function ManagedNetworkNSSPopUp({
    showPopUp,
    handleTogglePopUp,
    handleSubmitPopUp,
    modalInfo,
    Title,
    page,
    network
}) {
    const [_modalData, setModalData] = useState([])
    const [titleName, setTitleName] = useState("")
    const [anError, setAnError] = useState(false)
    const [err, setErr] = useState(true)
    const [enable, setDisable] = useState(false)

    const handleClose = (value) => {
        handleTogglePopUp(value, [])
        setDisable(false)
        setAnError(false)
    }
    const exceptThisSymbols = ["e", "E", "+", "-"]
    function isValidIP(str) {
        const octet = "(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)"
        const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`)
        return regex.test(str)
    }

    const handleChangeIpAddress = (e, index) => {
        const clonedData = [..._modalData]
        if (isValidIP(e.target.value)) {
            setTitleName(clonedData[index].Name)
            setAnError(false)

            clonedData[index][e.target.name] = e.target.value
            clonedData[index]["val"] = e.target.value
            setModalData(clonedData)
        } else {
            setTitleName(clonedData[index].Name)
            setAnError(true)
        }
    }

    const handleChange = (e, index, info) => {
        const clonedData = [..._modalData]

        if (info.Name == "Email") {
            clonedData[index][e.target.name] = e.target.value
            clonedData[index]["val"] = e.target.value
            e.target.name == "Email" &&
            e.target.value.includes("@") &&
            e.target.value.split("@")[1].includes(".")
                ? setErr(true)
                : setErr(false)
        } else if (info.Name == "WebsiteAddress") {
            clonedData[index][e.target.name] = e.target.value
            clonedData[index]["val"] = e.target.value
            e.target.value.includes(".") ? setErr(true) : setErr(false)
        } else {
            clonedData[index][e.target.name] = e.target.value
            clonedData[index]["val"] = e.target.value
        }

        setModalData(clonedData)
    }
    const handleChangeRadio = (e, index) => {
        let clonedData = [..._modalData]
        let current = { ...clonedData[index] }
        current["val"] = e.target.value
        clonedData[index] = current
        setModalData(clonedData)
    }
    let val1 = _modalData?.filter((item) => item.val === "")

    const handleSubmit = (e) => {
        e.preventDefault()
        handleClose(false)
        handleSubmitPopUp(_modalData)

        setModalData([])
        handleClose(false)
    }

    useEffect(() => {
        setModalData(modalInfo)
    }, [modalInfo])
    let ValidationString =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+/[!@#$%^&*()_+-=[]{};:<>?],~;".split(
            ""
        )

    return (
        <Box>
            <Dialog
                className={`${
                    !network ? "customer-survey-popup" : "network-popup"
                }`}
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
                open={showPopUp}
                onClose={() => {
                    handleClose(false)
                }}
            >
                <DialogContent
                    sx={{
                        padding: {
                            md: "  32px",

                            xs: "24px"
                        },
                        width: { xs: "100%", md: !network ? "494px" : "100%" }
                    }}
                >
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        width={"100%"}
                        aria-label={`This is ${Title?.title} form`}
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
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "left",
                                        fontFamily: "inter",
                                        mt: !network && "14px",
                                        fontSize: {
                                            lg: "24px",
                                            xs: "24px"
                                        },
                                        lineHeight: {
                                            lg: !network && "32px",
                                            xs: "32px"
                                        },
                                        color: "#1E1E1E"
                                    }}
                                >
                                    {Title?.title}
                                </Typography>
                                <Box
                                    aria-label="This is close Button"
                                    sx={{
                                        cursor: "pointer",
                                        position: "relative",
                                        right: 8,
                                        top: -6
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
                                        <title>
                                            This is {Title?.title} icon
                                        </title>
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                            </Box>

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
                                    color: theme.palette.secondary.main
                                }}
                            >
                                {Title?.description}
                            </Typography>

                            {_modalData?.length !== 0
                                ? _modalData?.map((info, index) => {
                                      return (
                                          <Box
                                              key={`${info.Name}`}
                                              sx={{
                                                  width: "100%",
                                                  marginBottom:info.type === "radio"?'20px': "22px",
                                                  marginTop:
                                                      page &&
                                                      modalInfo.length === 2 &&
                                                      index === 0
                                                          ? "16px"
                                                          : index == 0
                                                          ? "32px"
                                                          : ""
                                              }}
                                          >
                                              {info.type === "radio" ? (
                                                  <Box>
                                                      <RadioGroup
                                                          onChange={(e) => {
                                                              handleChangeRadio(
                                                                  e,
                                                                  index
                                                              )
                                                          }}
                                                          value={info.val}
                                                          sx={{
                                                              display: "flex",
                                                              flexDirection:
                                                                  "row"
                                                          }}
                                                          aria-labelledby="demo-radio-buttons-group-label"
                                                          defaultValue=""
                                                          name="radio-buttons-group"
                                                      >
                                                          <FormControlLabel
                                                             
                                                              value="Static IP"
                                                              control={
                                                                  <Radio
                                                                      sx={{
                                                                          "&.Mui-checked":
                                                                              {
                                                                                  color: theme
                                                                                      .palette
                                                                                      .primary
                                                                                      .main
                                                                              }
                                                                      }}
                                                                  />
                                                              }
                                                              label="Static IP"
                                                              aria-label="This is Static IP radio button"
                                                          />
                                                          <FormControlLabel
                                                              sx={{
                                                                  marginRight:
                                                                      "0px !important",
                                                                 
                                                              }}
                                                              value="Dynamic IP"
                                                              control={
                                                                  <Radio
                                                                      sx={{
                                                                          "&.Mui-checked":
                                                                              {
                                                                                  color: theme
                                                                                      .palette
                                                                                      .primary
                                                                                      .main
                                                                              }
                                                                      }}
                                                                  />
                                                              }
                                                              label="Dynamic IP"
                                                              aria-label="This is Dynamic IP radio button"
                                                          />
                                                      </RadioGroup>
                                                  </Box>
                                              ) : info.type === "number" ? (
                                                  <Input
                                                      className="ncr-new-input"
                                                      err={
                                                          titleName ==
                                                              info.Name &&
                                                          anError
                                                      }
                                                      type="text"
                                                      ariaLabel={info.ariaLabel}
                                                      id="id-address"
                                                      label={
                                                          info.fieldPlaceHolder
                                                      }
                                                      onKeyDown={(e) =>
                                                          exceptThisSymbols.includes(
                                                              e.key
                                                          ) &&
                                                          e.preventDefault()
                                                      }
                                                      disabled={enable}
                                                      name={info.Name}
                                                      inputProps={{
                                                          maxLength: 30
                                                      }}
                                                      defaultValue={info.val}
                                                      onChange={(e) => {
                                                          handleChangeIpAddress(
                                                              e,
                                                              index
                                                          )
                                                      }}
                                                      value={info.Value}
                                                      sx={{
                                                          maxWidth: "100%"
                                                      }}
                                                  />
                                              ) : (
                                                  //   info.fieldPlaceHolder.includes("Enter Static or Dynamic IP") &&
                                                  <Input
                                                      className="ncr-new-input"
                                                      variant="standard"
                                                      ariaLabel={info.ariaLabel}
                                                      err={
                                                          info.Name ==
                                                              "WebsiteAddress" &&
                                                          !err
                                                      }
                                                      label={
                                                          info.fieldPlaceHolder
                                                      }
                                                      name={info.Name}
                                                      type={info.type}
                                                      disabled={enable}
                                                      defaultValue={info.val}
                                                      onChange={(e) => {
                                                          handleChange(
                                                              e,
                                                              index,
                                                              info
                                                          )
                                                      }}
                                                      value={info.Value}
                                                      fullWidth={true}
                                                  />
                                              )}
                                          </Box>
                                      )
                                  })
                                : ""}

                            <Box
                                paddingTop={"10px"}
                                display="flex"
                                width="100%"
                                justifyContent="flex-end"
                                sx={{
                                    flexDirection: {
                                        lg: "row",
                                        xs: "column"
                                    },
                                    paddingBottom: !network && "12px"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { lg: "auto", xs: "100%" },
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        flexDirection: {
                                            md: "row",
                                            xs: "column"
                                        }
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            handleClose(false)
                                        }}
                                        className="model-button"
                                        variant="text"
                                        aria-label="Cancel"
                                        sx={{
                                            marginRight: "0px",
                                            padding: "12px 20px",
                                            fontWeight: 600,
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: {
                                                md: "16px",
                                                xs: "14px"
                                            },
                                            border: "none !important",
                                            mr: { md: "8px", xs: "0px" },
                                            lineHeight: {
                                                md: "24px",
                                                xs: "18px"
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        role="button"
                                        aria-label="Next Step"
                                        className="next-button"
                                        disabled={
                                            val1.length > 0 || !err || anError
                                        }
                                        variant="contained"
                                        sx={{
                                            mt: { md: 0, xs: 2 },
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
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
