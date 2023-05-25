import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, useMediaQuery } from "@mui/material"
import Togglebutton from "../../../common/Togglebutton"
import {
    calculatePercentage,
    get24Hours,
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import SelectBox from "../../../common/SelectBox"
import AddNewItem from "../../../common/AddNewItem/AddNewItemDuplicate"
import { useDispatch, useSelector } from "react-redux"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"
import DeletePopUp from "../../../TaxratesAddNewItem/DeletePopUp"
import ConfirmationNotification from "../../../common/ConfirmationNotification"

export default function DayParts() {
    const router = useRouter()
    const routerID = router.query.id
    const sm = useMediaQuery("(max-width:600px)")
    const xs = useMediaQuery("(max-width:0px)")
    const [addtionalDayParts, setAddtionalDayParts] = useState([])
    const [showNofication, setShowNofication] = useState(false)
    const [deletedID, setDeletedID] = useState(null)
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const [disabled, setDisable] = useState(false)
    const dispatch = useDispatch()
    const [SubmitHours, setSubmit] = useState([
        {
            title: "Included Day Parts",
            rowData: [],
            checkBoxes: []
        },
        {
            title: "Start Time",
            rowData: []
        }
    ])
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Site Information",
        "Day Parts"
    )
    let hoursper = substageinnerstages.find(
        (it) => it.name == "Hours of Operation"
    ).percentage
    let revenueper = substageinnerstages.find(
        (it) => it.name == "Revenue Centers"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let daypartdata = { ...substageinnerstages[currentindex] }
    let initialData = daypartdata.data
    const [daysData, setDayData] = useState([
        { name: "Breakfast", disabled: true, error: false, value: "" },
        { name: "Lunch", disabled: true, error: false, value: "" },
        { name: "Dinner", disabled: true, error: false, value: "" },
        { name: "Late Night", disabled: true, error: false, value: "" }
    ])

    let Hours24 = get24Hours()
    const setStoreData = (_data, _data1) => {
        let fsys = []
        _data1.map((item, i) => {
            fsys.push({ name: item[0].Value, value: item[1].Value })
        })

        let data = _data.map((item) => ({ ...item }))
        let additonalData = _data1.map((item) => ({ ...item }))
        let temp = SubmitHours.map((item) => ({
            ...item,
            ["rowData"]: [...item.rowData]
        }))
        let temp1 = [
            {
                title: "Additional Day Parts",
                rowData: [],
                checkBoxes: []
            },
            {
                title: "Start Time",
                rowData: []
            }
        ]
        data.map((item) => {
            if (item.name == "Breakfast") {
                temp[0].rowData[0] = item.name

                temp[1].rowData[0] = item.value
            } else if (item.name == "Lunch") {
                temp[0].rowData[1] = item.name

                temp[1].rowData[1] = item.value
            } else if (item.name == "Dinner") {
                temp[0].rowData[2] = item.name

                temp[1].rowData[2] = item.value
            } else if (item.name == "Late Night") {
                temp[0].rowData[3] = item.name

                temp[1].rowData[3] = item.value
            }
        })
        temp[0].checkBoxes = _data

        if (additonalData.filter((val) => val.Value === "").length === 0) {
            fsys.map((item, i) => {
                temp1[0].rowData.push(item.name)

                temp1[1].rowData.push(item.value)
            })
            temp1[0].checkBoxes = _data1
        }
        setSubmit(temp)
        let _temp = [{ dayparts: temp, additionalDayparts: temp1 }]
        let count = temp[0].checkBoxes.filter(
            (item) =>
                !item.error === true &&
                item.disabled === true &&
                item.value !== "" &&
                item.value &&
                item.value.length > 0 &&
                item.value[0] !== ":" &&
                item.value !== null
        ).length
        let _temp1 = temp[0].checkBoxes.filter(
            (item) => item.disabled === true
        ).length
        const tempPercent =
            _temp1 == 0 && count == 0 ? 0 : calculatePercentage(_temp1, count)
        const siteinfodataper = Math.round(
            (revenueper + tempPercent + hoursper) / 3
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Site Information",
            "Day Parts",
            _temp,
            tempPercent,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const setData = (addData) => {
        setStoreData(daysData, addData)
        setAddtionalDayParts(addData)
    }
    const handleChange = (value, name) => {
        let tempArr = daysData.map((item) => ({ ...item }))
        let obj = { name: name, value: value }
        let target = tempArr.find((item) => item.name == obj.name)
        if (target) {
            target.value = obj.value
        } else {
            tempArr.push(obj)
        }

        let test = tempArr.map((it) =>
            !it.disabled
                ? ""
                : it?.value[1] == "AM"
                ? Number(
                      `${Number(it.value[0].split(":")[0]) < 10 ? 0 : ""}${
                          it.value[0].split(":")[0] == 12
                              ? "00"
                              : it.value[0].split(":")[0]
                      }${it.value[0].split(":")[1]}`
                  )
                : it.value[1] == "PM"
                ? Number(
                      (Number(it.value[0].split(":")[0]) < 12
                          ? Number(it.value[0].split(":")[0]) + 12
                          : it.value[0].split(":")[0]) +
                          `${it.value[0].split(":")[1]}`
                  )
                : ""
        )

        test.every(function (x, i) {
            tempArr.map((item) => {
                if (item.name == "Breakfast") {
                    test[0] < test[i - 1] || 9999
                        ? (item.error = false)
                        : (item.error = true)
                } else if (item.name == "Lunch") {
                    if (
                        ((test[1] || 9999) > test[0] || 0) &&
                        ((test[1] || 0) < test[i + 1] || 9999)
                    ) {
                        item.error = false
                    } else item.error = true
                } else if (item.name == "Dinner") {
                    if (
                        ((test[2] || 9999) > test[1] || 0) &&
                        ((test[2] || 9999) > test[0] || 0) &&
                        ((test[2] || 0) < test[i + 1] || 9999)
                    ) {
                        item.error = false
                    } else item.error = true
                }
            })
        })
        setDayData(tempArr)
        setStoreData(tempArr, addtionalDayParts)
    }
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            setDayData(initialData[0].dayparts[0]?.checkBoxes)
            setAddtionalDayParts(
                initialData[0].additionalDayparts[0]?.checkBoxes
            )
        }
    }, [sideBarData])
    const submitForm = (e) => {
        e.preventDefault()
        const tempPercent = 100
        const siteinfodataper = Math.round(
            (revenueper + tempPercent + hoursper) / 3
        )
        siteinfodataper == 100
            ? router.push({
                  pathname: `/discovery/site-information/siteInformationConfirmation/${routerID}`,
                  query: { inner: true }
              })
            : setShowNofication(true)
    }
    const handleBack = () => {
        router.push({
            pathname: `/discovery/site-information/revenue-center/${routerID}`,
            query: { inner: true }
        })
    }
    const handledisable = (i, e) => {
        let temp = [...daysData]
        let current = { ...temp[i] }
        current.disabled = e.target.checked
        if (e.target.checked === false) {
            current.value = null
            current.error = false
        }
        temp[i] = current
        setDayData(temp)
        setStoreData(temp, addtionalDayParts)
    }
    const handleDeletePopup = (id) => {
        if (dontAskDeletePopup) {
            const tempArray = [...addtionalDayParts]
            tempArray.splice(id, 1)
            setAddtionalDayParts([...tempArray])
            setStoreData(daysData, tempArray)
        } else {
            setDeletedID(id)
            setShowDeletePopUP(true)
        }
    }
    const handleDelete = () => {
        const tempArray = [...addtionalDayParts]
        tempArray.splice(deletedID, 1)
        setAddtionalDayParts([...tempArray])
        setStoreData(daysData, tempArray)
        setDeletedID(null)
        setShowDeletePopUP(false)
    }
    const handleChange1 = (v, name) => {
        const tempArray = [...addtionalDayParts]
        let _index = tempArray.map((e) => e[0].Value).indexOf(name)
        let obj = tempArray.find((item) => item[0].Value == name)
        let tempObj = obj.map((item) => ({ ...item }))
        if (v !== "") {
            tempObj[1].Value = v
            tempArray[_index] = tempObj
            setAddtionalDayParts([...tempArray])
            setStoreData(daysData, tempArray)
        }
    }
    const handleClose = () => {
        setShowNofication(false)
    }
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        lg: "16px"
                    },
                    lineHeight: {
                        lg: "24px"
                    },
                    color: theme.palette.textColor.main
                }}
            >
                Time periods (e.g. Lunch, Dinner) are grouped into what Aloha
                calls Day Parts. Day Parts are used for certain reports which
                offer insights into daily flows of business.
                <br />
                <br />
                Please indicate the desired Start Time of each Day Part. No two
                Day Parts can start at the same time. Day Parts cannot overlap.
            </Typography>
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        md: "14px",
                        xs: "16px"
                    },
                    lineHeight: {
                        lg: "22px"
                    },
                    color: theme.palette.secondary.main,

                    maxWidth: {
                        lg: "848px"
                    },
                    mt: {
                        md: "32px",
                        xs: "22px"
                    }
                }}
            >
                You can toggle off any day part that your restaurant does not
                serve.
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
                    <Box display="flex" alignItems={"center"}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>This is Included Day Parts icon</title>
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
                            Included Day Parts
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: {
                                md: 0
                            },
                            display: { md: "flex", xs: "none", sm: "none" },
                            justifyContent: "flex-start",
                            width: {
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
                            Start Time
                        </Typography>
                    </Box>
                </Box>
                <form
                    aria-label={`This is dayparts form`}
                    action=""
                    onSubmit={submitForm}
                >
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
                        {daysData.map((item, ind) => (
                            <Box
                                key={ind}
                                sx={{
                                    display: "flex",
                                    flexDirection: { md: "row", xs: "column" },
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
                                            display: { md: "block", xs: "none" }
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
                                                ariaLabel={`This is toggle button for ${item.name}`}
                                                reverse={true}
                                                disabled={disabled}
                                                checked={daysData[ind].disabled}
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
                                                                !daysData[ind]
                                                                    .disabled ||
                                                                disabled
                                                                    ? "#5c5c5c"
                                                                    : "#1e1e1e"
                                                        }}
                                                    >
                                                        {item.name}
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
                                                    !daysData[ind].disabled ||
                                                    disabled
                                                        ? "#5c5c5c"
                                                        : "#1e1e1e"
                                            }}
                                        >
                                            {item.name}
                                            <Box>
                                                <Togglebutton
                                                    reverse={true}
                                                    disabled={disabled}
                                                    checked={
                                                        daysData[ind].disabled
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
                                                                    !daysData[
                                                                        ind
                                                                    ]
                                                                        .disabled ||
                                                                    disabled
                                                                        ? "#5c5c5c"
                                                                        : "#1e1e1e"
                                                            }}
                                                        >
                                                            {item.name}
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
                                        Start Time
                                    </Typography>
                                </Box>

                                <SelectBox
                                    ariaLabel={`{This is ${item.name} time input field}`}
                                    required={true}
                                    isDaypart={"day"}
                                    defaultLabel={"Select Time"}
                                    name={item.name}
                                    disabled={
                                        disabled || !daysData[ind].disabled
                                    }
                                    error={item.error}
                                    initialValue={daysData}
                                    list={Hours24}
                                    handleChange={handleChange}
                                    value={""}
                                    width={xs ? null : sm ? null : 340}
                                    bgColor="white"
                                />
                            </Box>
                        ))}
                    </Box>
                </form>
            </Box>
            <form
                aria-label={`This is dayparts form`}
                action=""
                onSubmit={submitForm}
            >
                {addtionalDayParts.length > 0 && (
                    <Box
                        className="shadow"
                        sx={{
                            background: "white",
                            borderRadius: "12px",
                            mt: {
                                xs: "32px"
                            },
                            pt: "1px",
                            px: {
                                md: "24px",
                                xs: "16px"
                            },
                            pb: { md: "24px", xs: "20px" }
                        }}
                    >
                        {addtionalDayParts.length > 0 &&
                            addtionalDayParts?.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Box>
                                            {index == 0 && (
                                                <Box
                                                    sx={{
                                                        "&:hover .delete-button":
                                                            {
                                                                display:
                                                                    !disabled &&
                                                                    "block"
                                                            },
                                                        ".delete-button": {
                                                            display: {
                                                                xs:
                                                                    !disabled &&
                                                                    "flex",
                                                                md: "none"
                                                            }
                                                        },
                                                        display: "flex",

                                                        marginTop:
                                                            index == 0
                                                                ? "32px"
                                                                : "52px",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box display={"flex"}>
                                                        <svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>{`this is Additional Day Parts icon`}</title>
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
                                                                ml: "8px",
                                                                fontWeight: 600,
                                                                paddingRight:
                                                                    "16px",
                                                                fontSize:
                                                                    "18px",
                                                                lineHeight:
                                                                    "28px",

                                                                color: "#1E1E1E"
                                                            }}
                                                        >
                                                            Additional Day Parts
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: {
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
                                                                fontSize:
                                                                    "18px",
                                                                lineHeight:
                                                                    "28px",
                                                                color: "#1E1E1E"
                                                            }}
                                                        >
                                                            Start Time
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            )}

                                            {/* start */}
                                            <Typography
                                                key={index + Math.random()}
                                                sx={{
                                                    "&:hover .delete-button": {
                                                        display:
                                                            !disabled &&
                                                            "block",
                                                        mt: {
                                                            xs: "-20px",
                                                            md: "-0px",
                                                            xl: "-5px"
                                                        }
                                                    },
                                                    ".delete-button": {
                                                        display: {
                                                            xs:
                                                                !disabled &&
                                                                "block",
                                                            md: "none"
                                                        },
                                                        mt: {
                                                            xs: "-20px",
                                                            md: "-0px",
                                                            xl: "-5px"
                                                        }
                                                    },
                                                    marginTop:
                                                        index == 0
                                                            ? {
                                                                  xs: "24px",
                                                                  md: "32px"
                                                              }
                                                            : {
                                                                  xs: "24px",
                                                                  md: "38px"
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
                                                {" "}
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
                                                            paddingRight:
                                                                "16px",
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
                                                            color: "#1E1E1E",
                                                            textTransform:
                                                                "capitalize"
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
                                                    <SelectBox
                                                        isDaypart={"day"}
                                                        isAdditional={"day"}
                                                        defaultLabel={
                                                            "Select Time"
                                                        }
                                                        name={item[0]?.Value}
                                                        disabled={disabled}
                                                        initialValue={[
                                                            item[1]?.Value[0],
                                                            item[1]?.Value[1]
                                                        ]}
                                                        list={Hours24}
                                                        handleChange={
                                                            handleChange1
                                                        }
                                                        value={""}
                                                        bgColor="white"
                                                    />

                                                    <Box
                                                        onClick={() => {
                                                            !disabled &&
                                                                handleDeletePopup(
                                                                    index
                                                                )
                                                        }}
                                                        className={
                                                            "delete-button"
                                                        }
                                                        sx={{
                                                            cursor: "pointer",
                                                            right: {
                                                                lg: "-8px",
                                                                md: "0px",
                                                                xs: "0px"
                                                            },
                                                            top: {
                                                                lg: "-8px",
                                                                md: "-5px",
                                                                xs: "20px"
                                                            },
                                                            display: "none",
                                                            position: "absolute"
                                                        }}
                                                    >
                                                        <svg
                                                            width={
                                                                isMobile
                                                                    ? 20
                                                                    : 16
                                                            }
                                                            height={
                                                                isMobile
                                                                    ? 20
                                                                    : 16
                                                            }
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title>{`this is selectbox icon`}</title>
                                                            <path
                                                                d="M8 0.5C3.8525 0.5 0.5 3.8525 0.5 8C0.5 12.1475 3.8525 15.5 8 15.5C12.1475 15.5 15.5 12.1475 15.5 8C15.5 3.8525 12.1475 0.5 8 0.5ZM11.75 10.6925L10.6925 11.75L8 9.0575L5.3075 11.75L4.25 10.6925L6.9425 8L4.25 5.3075L5.3075 4.25L8 6.9425L10.6925 4.25L11.75 5.3075L9.0575 8L11.75 10.6925Z"
                                                                fill="#F44336"
                                                            />
                                                        </svg>
                                                    </Box>
                                                </Box>
                                            </Typography>

                                            {/* end */}
                                        </Box>
                                    </React.Fragment>
                                )
                            })}
                    </Box>
                )}

                <AddNewItem
                    disabled={disabled}
                    description="Day Parts distinguish sales by high volume segments. Please indicate the times you would like for your Day Parts to begin."
                    type={[
                        {
                            Value: "",
                            type: "text",
                            Name: "tax-name",
                            fieldPlaceHolder: "Enter Name"
                        },
                        {
                            Value: "",
                            type: "time",
                            Name: "start-time",
                            fieldPlaceHolder: "Enter start time"
                        }
                    ]}
                    endpointForPost="/"
                    additionalArray={addtionalDayParts}
                    setAdditonal={setData}
                    title={"Additional Day Parts"}
                    deleteTitle="Day Part"
                    additionalDay={true}
                    buttonText="Add New Day Parts"
                    marginTop={"32px"}
                    // addtionalDayParts.length < 1 && 
                    hideTooltip={true}
                    isDayparts={true}
                    extraMarginFromDayPartsLg={"32px"}
                    extraMarginFromDayPartsSm={"24px"}
                    fontSizeSm={"18px"}
                />

                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",

                        marginTop: {
                            xxl: "32px",
                            xl: "32px",
                            lg: "32px",
                            md: "32px",
                            xs: "22px"
                        }
                    }}
                />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        pt: {
                            xxl: 5.5,
                            xl: 4,
                            lg: 4.4,
                            md: 6,
                            xs: 6
                        },
                        pb: "24px",
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
                                md: "row",
                                xs: "column"
                            }
                        }}
                    >
                        <CommonButton
                            className={"back-button"}
                            ariaTag={"This is Back Button"}
                            variant={"outlined"}
                            mt={{
                                xs: ".2px",
                                md: "0px",
                                lg: "5px",
                                xxl: "1px"
                            }}
                            mr={{ md: "8px" }}
                            px={"19px"}
                            py={"11px"}
                            color="#5C5C5C"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            content={"Back"}
                            onclickHandler={handleBack}
                        />
                        <CommonButton
                            className={"next-button"}
                            type={"submit"}
                            ariaTag={"This is Proceed to Confirmation Button"}
                            variant={"contained"}
                            disabled={daypartdata?.percentage < 100}
                            px={"20px"}
                            py={"12px"}
                            mt={{ xs: "7px", md: 0, lg: "6px", xxl: "1px" }}
                            color="white"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            hover="#062EC9"
                            content={"Proceed to Confirmation"}
                        />
                    </Box>
                </Box>
            </form>

            <Box>
                <ConfirmationNotification
                    open={showNofication}
                    close={handleClose}
                />
                <DeletePopUp
                    setDontAskDeletePopup={setDontAskDeletePopup}
                    title={"Additional Day Parts"}
                    deleteTitle="Day Part"
                    setShowDeletePopUP={setShowDeletePopUP}
                    showDeletePopUP={showDeletePopUP}
                    handleDeleteItem={handleDelete}
                />
            </Box>
        </Box>
    )
}
