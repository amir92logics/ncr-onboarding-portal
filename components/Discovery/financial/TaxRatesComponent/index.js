import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, useMediaQuery, TextField } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"
import MuiTextArea from "../../../common/MuiTextArea/MuiTextArea"
import AddNewItem from "../../../TaxratesAddNewItem/addNewItemDuplicate"
import { useDispatch, useSelector } from "react-redux"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"
import DeletePopUp from "../../../common/AddNewItem/DeletePopUp"
import Input from "../../../common/Input"
import Togglebutton from "../../../common/Togglebutton"

export default function TaxRatesComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const [taxfields, setTaxFields] = useState([
        { label: "Food", disabled: false, value: "" },
        { label: "Liquor", disabled: false, value: "" },
        { label: "Beer", disabled: false, value: "" },
        { label: "Wine", disabled: false, value: "" },
        { label: "Retail", disabled: false, value: "" }
    ])
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Financial",
        "Tax Rates"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Petty Cash"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Comps"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Void Reasons"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let initialData = currentstagedata.data
    const [additionalFields, setAdditionalField] = useState([])
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            initialData[0].taxfields && setTaxFields(initialData[0].taxfields)
            initialData[0].comment && setComment(initialData[0].comment)
            initialData[0].additionalFields &&
                setAdditionalField(initialData[0].additionalFields)
        }
    }, [sideBarData])
    const updateStore = (_taxfields, _comment, _additionalFields) => {
        const temp = [
            {
                taxfields: _taxfields,
                comment: _comment,
                additionalFields: _additionalFields
            }
        ]
        const check = _taxfields.filter((it) => it.value !== "").length == 0
        let currentpercentage
        if (check) {
            currentpercentage = 0
        } else {
            currentpercentage = 100
        }

        currentpercentage =
            currentstagedata.percentage !== 0
                ? currentstagedata.percentage
                : currentpercentage
                    ? currentpercentage
                    : 100

        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Financial",
            "Tax Rates",
            temp,
            currentpercentage,
            innerper,
            false
        )

        dispatch(SetSideBarData(tempsidebar))
    }
    const handleChange2 = (e) => {
        setComment(e.target.value)
        updateStore(taxfields, e.target.value, additionalFields)
    }

    const handleChange = (e, label, index) => {
        let obj = [...taxfields]
        let current = { ...obj[index] }
        current = {
            label: label,
            value:
                Number(e.target.value) < 100 || Number(e.target.value) == 100
                    ? e.target.value
                    : "",
            disabled: obj[index].disabled
        }
        obj[index] = current
        setTaxFields(obj)
        updateStore(obj, comment, additionalFields)
    }

    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault()
        updateStore(taxfields, comment, additionalFields)
        router.push({
            pathname: `/discovery/financial/comps/${routerID}`,
            query: { inner: true }
        })
    }
    const exceptThisSymbols = ["e", "E", "+", "-"]
    const setData = (e) => {
        setAdditionalField(e)
        updateStore(taxfields, comment, e)
    }

    const handleDelete = (id) => {
        const tempArray = [...additionalFields]
        tempArray.splice(id, 1)
        setAdditionalField([...tempArray])
        updateStore(taxfields, comment, tempArray)
        setShowDeletePopUP(false)
    }
    const handleDeletePopup = (id) => {
        if (dontAskDeletePopup) {
            const tempArray = [...additionalFields]
            tempArray.splice(id, 1)
            setAdditionalField([...tempArray])
            updateStore(taxfields, comment, tempArray)
        } else {
            setShowDeletePopUP(true)
        }
    }
    const handleChange1 = (e, i) => {
        const tempArray = [...additionalFields]
        let current = { ...tempArray[i] }
        let currentValue = { ...current[1] }

        let Taxratespercent =
            Number(e.target.value) < 100 || Number(e.target.value) == 100
                ? e.target.value
                : ""

        currentValue.Value = Taxratespercent
        current[1] = currentValue
        tempArray[i] = current
        setAdditionalField([...tempArray])
        updateStore(taxfields, comment, tempArray)
    }
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    const handledisable = (i, e) => {
        let temp = [...taxfields]
        let current = { ...temp[i] }
        current.disabled = e.target.checked
        if (e.target.checked === false) {
            current.value = ""
            current.error = false
        }
        temp[i] = current
        setTaxFields(temp)
    }
    return (
        <form aria-label={`This is tax rates form`} onSubmit={submitForm}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent={"flex-start"}
                flexWrap="wrap"
                width="100%"
            >
                <Typography
                    sx={{
                        mt: { lg: 0, md: -0.2, xs: -0.2 },
                        fontWeight: 400,
                        fontSize: {
                            lg: "16px",
                            xs: "16px"
                        },
                        lineHeight: {
                            lg: "24px",
                            xs: "24px"
                        },
                        color: theme.palette.textColor.main,

                        width: "100%"
                    }}
                >
                    Calculating the proper Restaurant Sales Tax is a critical
                    function to your business. Please provide the ‘Tax % Amount’
                    for the sales tax that you will charge the customer on items
                    in your restaurant. We will discuss Tax Rates in further
                    detail during the Discovery Meeting.
                </Typography>

                <Box
                    className="shadow"
                    sx={{
                        background: "white",
                        borderRadius: "12px",
                        mt: {
                            xs: "32px"
                        },
                        px: {
                            md: "24px",
                            xs: "16px"
                        },
                        pb: { md: "24px", xs: "20px" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            marginTop: { xs: "24px" },
                            justifyContent: "space-between"
                        }}
                    >
                        <Box display="flex" alignItems={"center"} width="100%">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`this is Included Tax Rates icon`}</title>
                                <rect
                                    width={24}
                                    height={24}
                                    rx={12}
                                    fill="#E8EEFF"
                                />
                                <path
                                    d="M16.24 7.74828C15.07 6.57828 13.54 5.98828 12 5.98828V11.9883L7.76 16.2283C10.1 18.5683 13.9 18.5683 16.25 16.2283C18.59 13.8883 18.59 10.0883 16.24 7.74828ZM12 1.98828C6.48 1.98828 2 6.46828 2 11.9883C2 17.5083 6.48 21.9883 12 21.9883C17.52 21.9883 22 17.5083 22 11.9883C22 6.46828 17.52 1.98828 12 1.98828ZM12 19.9883C7.58 19.9883 4 16.4083 4 11.9883C4 7.56828 7.58 3.98828 12 3.98828C16.42 3.98828 20 7.56828 20 11.9883C20 16.4083 16.42 19.9883 12 19.9883Z"
                                    fill="#1E1E1E"
                                />
                            </svg>

                            <Typography
                                sx={{
                                    width: {
                                        xl: "540px",
                                        md: "220px",
                                        xs: "210px",
                                        sm: "211px"
                                    },
                                    fontWeight: 600,
                                    paddingRight: "16px",
                                    fontSize: "18px",
                                    marginTop: {
                                        md: "0",
                                        xs: "0px"
                                    },
                                    ml: "8px",
                                    lineHeight: "28px",
                                    color: "#1E1E1E"
                                }}
                            >
                                Included Tax Rates
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                mt: {
                                    md: 0
                                },
                                display: { md: "flex", xs: "none", sm: "none" },
                                justifyContent: "flex-start",
                                width: "100%",
                                maxWidth: {
                                    xl: "368px",
                                    md: "340px",
                                    xs: "210px",
                                    sm: "211px"
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "28px",
                                    color: "#1E1E1E",
                                    justifyContent: "flex-start",
                                    marginBottom: { md: "2px", lg: "1px" }
                                }}
                            >
                                Tax % Amount
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                md: "block",
                                sm: "flex"
                            },
                            mx: "auto",
                            flexDirection: {
                                sm: "column"
                            },
                            gap: {
                                sm: "2px"
                            },
                            marginTop: {
                                md: "31.3px",
                                lg: "31.6px"
                            }
                        }}
                    >
                        {taxfields.map((item, ind) => (
                            <Box
                                key={`${ind + 1}`}
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        md: "row",
                                        xs: "column"
                                    },
                                    mt: {
                                        md: "31.3px",
                                        xs: "32px"
                                    },
                                    justifyContent: {
                                        md: "space-between",
                                        xs: "flex-start"
                                    },
                                    alignItems: { md: "center" }
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        alignItems: "center",
                                        flexDirection: {
                                            lg: "row",
                                            md: "row",

                                            xs: "row-reverse"
                                        },
                                        mb: {
                                            md: "0",
                                            xs: "22px"
                                        },
                                        justifyContent: {
                                            md: "normal",
                                            xs: "space-between"
                                        }
                                    }}
                                >
                                    <Box
                                        component={"span"}
                                        sx={{
                                            display: {
                                                md: "block",
                                                xs: "none"
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                justifyContent: {
                                                    lg: "center"
                                                },
                                                alignItems: "center",
                                                mt: {
                                                    md: "0",
                                                    xs: "-2px"
                                                }
                                            }}
                                        >
                                            <Togglebutton
                                                ariaLabel={`This is ${item.label} toggle button.`}
                                                reverse={true}
                                                disabled={disabled}
                                                checked={
                                                    taxfields[ind].disabled
                                                }
                                                onChange={(e) => {
                                                    handledisable(ind, e)
                                                }}
                                                label={
                                                    <Box
                                                        component={"span"}
                                                        sx={{
                                                            pl: "0",
                                                            fontSize: "16px",
                                                            color:
                                                                !taxfields[ind]
                                                                    .disabled ||
                                                                    disabled
                                                                    ? "#5c5c5c"
                                                                    : "#1e1e1e"
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        component={"span"}
                                        sx={{
                                            display: {
                                                md: "none",
                                                xs: "block"
                                            },
                                            width: "100%"
                                        }}
                                    >
                                        <Box
                                            className="toggle-margin-dayparts"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mt: {
                                                    md: "0",
                                                    xs: "-2px"
                                                },
                                                color:
                                                    !taxfields[ind].disabled ||
                                                        disabled
                                                        ? "#5c5c5c"
                                                        : "#1e1e1e"
                                            }}
                                        >
                                            {item.label}
                                            <Box>
                                                <Togglebutton
                                                    ariaLabel={`This is ${item.label} toggle button.`}
                                                    reverse={true}
                                                    disabled={disabled}
                                                    checked={
                                                        taxfields[ind].disabled
                                                    }
                                                    onChange={(e) => {
                                                        handledisable(ind, e)
                                                    }}
                                                    label={
                                                        <Box
                                                            component={"span"}
                                                            sx={{
                                                                display: {
                                                                    md: "block",
                                                                    xs: "none"
                                                                },
                                                                pl: "0",
                                                                fontSize:
                                                                    "16px",
                                                                color:
                                                                    !taxfields[
                                                                        ind
                                                                    ]
                                                                        .disabled ||
                                                                        disabled
                                                                        ? "#5c5c5c"
                                                                        : "#1e1e1e"
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Box>
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            marginBottom: { xs: "11px" },
                                            fontSize: {
                                                xs: "14px"
                                            },
                                            lineHeight: {
                                                xs: "22px"
                                            },
                                            color: "#1E1E1E",

                                            display: {
                                                xs: "none",
                                                md: "none"
                                            }
                                        }}
                                    >
                                        Tax % Amount
                                    </Typography>
                                </Box>
                                <Input
                                    type="number"
                                    onKeyDown={(e) =>
                                        exceptThisSymbols.includes(e.key) &&
                                        e.preventDefault()
                                    }
                                    className="ncr-new-input"
                                    name={item?.label}
                                    label="Enter tax % amount"
                                    variant="standard"
                                    sx={{
                                        marginTop: { xs: "16px", md: "0" },
                                        maxWidth: {
                                            xs: "100%",
                                            md: 340,
                                            lg: 344,
                                            xl: 368
                                        },
                                        width: "100%"
                                    }}
                                    disabled={
                                        disabled || !taxfields[ind].disabled
                                    }
                                    value={taxfields[ind].value}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                sx={{ marginTop: "0px" }}
                                                position="end"
                                            >
                                                {"%"}
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            min: 0,
                                            max: 100,
                                            step: "any"
                                        }
                                    }}
                                    onChange={(e) => {
                                        handleChange(e, item?.label, ind)
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
                {additionalFields.length > 0 && (
                    <Box
                        className="shadow"
                        sx={{
                            backgroundColor: "#fff",
                            marginTop: { md: "32px", xs: "24px" },
                            p: { md: 6, xs: 4 },
                            borderRadius: "12px",
                            maxWidth: {
                                xxl: "1072px"
                            }
                        }}
                    >
                        {additionalFields.length > 0 &&
                            additionalFields?.map((item, index) => {
                                return (
                                    <>
                                        {index == 0 && (
                                            <Box
                                                sx={{
                                                    "&:hover .delete-button": {
                                                        display:
                                                            !disabled && "block"
                                                    },

                                                    display: "flex",

                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Box display={"flex"}>
                                                    <Box
                                                        component={"span"}
                                                        sx={{
                                                            marginRight: "8px"
                                                        }}
                                                    >
                                                        <svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>{`this is Additional Tax Rates icon`}</title>
                                                            <rect
                                                                width={24}
                                                                height={24}
                                                                rx={12}
                                                                fill="#E8EEFF"
                                                            />
                                                            <path
                                                                d="M13.17 4L18 8.83V20H6V4H13.17ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM15 11H11V12H14C14.55 12 15 12.45 15 13V16C15 16.55 14.55 17 14 17H13V18H11V17H9V15H13V14H10C9.45 14 9 13.55 9 13V10C9 9.45 9.45 9 10 9H11V8H13V9H15V11Z"
                                                                fill="#1E1E1E"
                                                            />
                                                        </svg>
                                                    </Box>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            paddingRight:
                                                                "16px",
                                                            fontSize: "18px",
                                                            lineHeight: "28px",

                                                            color: "#1E1E1E"
                                                        }}
                                                    >
                                                        Additional Tax Rates
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: {
                                                            xl: "370px",
                                                            lg: "346px",
                                                            xs: "340px"
                                                        },
                                                        display: {
                                                            md: "flex",
                                                            xs: "none",
                                                            sm: "none"
                                                        },
                                                        padding: {},

                                                        justifyContent:
                                                            "flex-start"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            paddingRight:
                                                                "16px",
                                                            fontSize: "18px",
                                                            lineHeight: "28px",
                                                            color: "#1E1E1E"
                                                        }}
                                                    >
                                                        Tax % Amount
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        <Typography
                                        
                                            sx={{
                                                "&:hover .delete-button": {
                                                    display:
                                                        !disabled && "block"
                                                },
                                                marginTop: {
                                                    xs: "24px",
                                                    md: "32px"
                                                },
                                                position: "relative",

                                                textAlign: "center",
                                                fontSize: {
                                                    lg: "14px",
                                                    xs: "14px"
                                                },
                                                lineHeight: {
                                                    lg: "21px",
                                                    xs: "16px"
                                                },
                                                color: "#00000099",

                                                borderRadius: "8px"
                                            }}
                                        >
                                            <Box
                                                className={"delete-button"}
                                                sx={{
                                                    cursor: "pointer",
                                                    right: {
                                                        md: "-8px",
                                                        xs: "-8px"
                                                    },
                                                    top: {
                                                        md: "-8px",
                                                        xs: "40px"
                                                    },
                                                    display: "none",
                                                    position: "absolute"
                                                }}
                                            ></Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: {
                                                        md: "row",
                                                        xs: "column"
                                                    },

                                                    justifyContent: {
                                                        md: "space-between",
                                                        xs: "flex-start"
                                                    },
                                                    alignItems: {
                                                        xs: "start",
                                                        md: "center"
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: {
                                                            xs: 600,
                                                            md: 400
                                                        },
                                                        paddingRight: "16px",
                                                        fontSize: {
                                                            lg: "16px",
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            lg: "24px",
                                                            xs: "16px"
                                                        },
                                                        marginBottom: {
                                                            xs: "16px",
                                                            lg: "0px"
                                                        },
                                                        color: disabled
                                                            ? "#5c5c5c"
                                                            : "#1e1e1e"
                                                    }}
                                                >
                                                    {item[0]?.Value}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 400,
                                                        marginBottom: {
                                                            xs: "12px"
                                                        },
                                                        fontSize: {
                                                            xs: "14px"
                                                        },
                                                        lineHeight: {
                                                            xs: "21px"
                                                        },
                                                        color: "#1E1E1E",
                                                        display: {
                                                            xs: "none",
                                                            md: "none"
                                                        }
                                                    }}
                                                >
                                                    Start Time
                                                </Typography>

                                                <Input
                                                    required
                                                    type="number"
                                                    disabled={disabled}
                                                    onKeyDown={(e) =>
                                                        exceptThisSymbols.includes(
                                                            e.key
                                                        ) && e.preventDefault()
                                                    }
                                                    className="ncr-new-input"
                                                    name={
                                                        "item[index]?.fieldPlaceHolder"
                                                    }
                                                    label={
                                                        item[1].fieldPlaceHolder
                                                    }
                                                    sx={{
                                                        marginTop: {
                                                            xs: "12px",
                                                            md: "0px"
                                                        },
                                                        fontFamily: "Inter",
                                                        maxWidth: {
                                                            xs: "100%",
                                                            md: 340,
                                                            lg: 344,
                                                            xl: 368
                                                        },
                                                        width: "100%"
                                                    }}
                                                    value={item[1].Value}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment
                                                                sx={{
                                                                    marginTop:
                                                                        "0px"
                                                                }}
                                                                position="end"
                                                            >
                                                                {"%"}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={(e) => {
                                                        handleChange1(e, index)
                                                    }}
                                                />
                                                <Box
                                                    onClick={() => {
                                                        !disabled &&
                                                            handleDeletePopup(
                                                                index
                                                            )
                                                    }}
                                                    className={"delete-button"}
                                                    sx={{
                                                        cursor: "pointer",
                                                        right: {
                                                            md: "0px",
                                                            xs: "0px"
                                                        },
                                                        top: {
                                                            md: "-2px",
                                                            xs: "40px"
                                                        },
                                                        display:{xs:disabled ? "none" : "",lg:"none"},
                                                        position: "absolute"
                                                    }}
                                                >
                                                    <svg
                                                        width={
                                                            isMobile ? 18 : 16
                                                        }
                                                        height={
                                                            isMobile ? 18 : 16
                                                        }
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <title>{`this is Included Tax Rates delete icon`}</title>
                                                        <path
                                                            d="M8 0.5C3.8525 0.5 0.5 3.8525 0.5 8C0.5 12.1475 3.8525 15.5 8 15.5C12.1475 15.5 15.5 12.1475 15.5 8C15.5 3.8525 12.1475 0.5 8 0.5ZM11.75 10.6925L10.6925 11.75L8 9.0575L5.3075 11.75L4.25 10.6925L6.9425 8L4.25 5.3075L5.3075 4.25L8 6.9425L10.6925 4.25L11.75 5.3075L9.0575 8L11.75 10.6925Z"
                                                            fill="#F44336"
                                                        />
                                                    </svg>
                                                </Box>
                                            </Box>
                                        </Typography>
                                    </>
                                )
                            })}
                    </Box>
                )}
                <AddNewItem
                    disabled={disabled}
                    description="This is the sales tax that you will charge the customer on items in your restaurant. Please fill in the Tax % Amount column and any additional Tax Rates and percentages that are needed."
                    type={[
                        {
                            Value: "",
                            type: "text",
                            Name: "tax-name",
                            fieldPlaceHolder: "Enter Name"
                        },
                        {
                            Value: "",
                            type: "Number",
                            Name: "tax-amount",
                            fieldPlaceHolder: "Enter tax % Amount"
                        }
                    ]}
                    additionalArray={additionalFields}
                    setAdditonal={setData}
                    name={"Tax Rates"}
                    title={
                        "Additional Tax Rates"
                    }
                    deleteTitle="Tax Rates"
                    buttonText="Add Additional Tax Rates"
                    check={true}
                    marginTop={"32px"}
                    hideTooltip={true}
                />
                <Box display={"flex"}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            marginTop: { md: "32px", xs: "24px" },
                            fontSize: {
                                xs: "18px"
                            },
                            lineHeight: {
                                lg: "24px",
                                xs: "24px"
                            },
                            color: "#1E1E1E",
                            paddingRight: "4px"
                        }}
                    >
                        Additional Comments
                    </Typography>
                </Box>

                <Box
                    sx={{
                        mt: { md: "8px", xs: "0px" },
                        maxWidth: {
                            xxl: "100%",
                            xl: "100%",
                            lg: "100%"
                        }
                    }}
                >
                    <MuiTextArea
                        ariaLabel={`This is Additional Note Text Area.`}
                        disableText={disabled}
                        comment={comment}
                        handleChange={handleChange2}
                    />
                </Box>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontFamily: "Inter",
                        marginTop: { lg: "32px", md: "32px", xs: "24px" },
                        fontSize: {
                            xs: "18px"
                        },
                        lineHeight: {
                            lg: "28px",
                            xs: "24px"
                        },
                        color: "#1E1E1E",
                        letterSpacing: theme.letterSpacing.main
                    }}
                >
                    Important:
                </Typography>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            marginTop: "10px",
                            fontSize: {
                                lg: "16px",
                                xs: "16px"
                            },
                            lineHeight: {
                                lg: "24px",
                                xs: "24px"
                            },
                            color: theme.palette.secondary.main,
                            width: "100%"
                        }}
                    >
                        NCR will only configure the tax rate provided in this
                        document and is not responsible for improperly
                        configured tax rates. Please verify the tax rate is
                        accurate prior to opening to the public.
                    </Typography>
                </Box>
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",

                        marginTop: { md: "32px", xs: "17px" }
                    }}
                />
                <Box
                    paddingY={"23px"}
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        flexDirection: {
                            lg: "row",

                            xs: "column"
                        }
                    }}
                >
                    <Box
                        display="flex"
                        sx={{
                            justifyContent: "flex-end",
                            flexDirection: {
                                lg: "row",
                                md: "row",
                                sm: "column",
                                xs: "column"
                            }
                        }}
                    >
                        {" "}
                        <CommonButton
                            className={"next-button"}
                            type={"submit"}
                            ariaTag={"This is Next Step Button"}
                            variant={"contained"}
                            mt={{ xs: "8px", md: "0px" }}
                            px={"20px"}
                            py={"11px"}
                            color="white"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            content={"Next Step"}
                        />
                    </Box>
                </Box>

                <DeletePopUp
                    setDontAskDeletePopup={setDontAskDeletePopup}
                    title={"additional Tax Rates"}
                    deleteTitle={"Tax Rate"}
                    setShowDeletePopUP={setShowDeletePopUP}
                    showDeletePopUP={showDeletePopUP}
                    handleDeleteItem={handleDelete}
                />
            </Box>
        </form>
    )
}
