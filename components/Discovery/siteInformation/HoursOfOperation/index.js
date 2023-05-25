/* eslint-disable react/display-name */
import React, { useState, Suspense, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { Divider, useMediaQuery, Skeleton } from "@mui/material"
import SelectBox from "../../../common/SelectBox"
import MuiTextArea from "../../../common/MuiTextArea/MuiTextArea"
import { useDispatch, useSelector } from "react-redux"
import {
    calculatePercentage,
    get24Hours,
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"

const ClockLists = React.memo(
    ({
        hoursOfOperation,
        show,
        setShow,
        DaysData,
        Hours24,
        handleChange,
        error,
        md,
        xs,
        sm,
        disabled
    }) => {
        return hoursOfOperation.map((item, index) => {
            return (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        marginTop: { md: index === 0 ? "" : "24px" },
                        justifyContent: {
                            md: "space-between",
                            xs: "flex-start"
                        },
                        alignItems: { md: "center" },
                        maxWidth: { lg: "838px", xl: "944px" }
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: { xs: "600", md: "400" },
                            paddingRight: "16px",
                            fontSize: {
                                lg: "16px",
                                xs: "14px"
                            },
                            lineHeight: {
                                lg: "24px",
                                xs: "16px"
                            },
                            my: "auto",
                            color: "#000000DE",
                            alignItems: "center"
                        }}
                    >
                        {index === 0 && (
                            <Typography
                                sx={{
                                    display: { xs: "none", md: "block" },
                                    fontWeight: 600,
                                    fontSize: {
                                        xs: "18px",
                                        lg: "18px"
                                    },
                                    lineHeight: {
                                        xs: "28px",
                                        lg: "28px"
                                    },
                                    color: "#1E1E1E",
                                    marginBottom: { xs: "24px" },
                                    marginTop: "-14px"
                                }}
                            >
                                Day
                            </Typography>
                        )}
                        <Box
                            sx={{
                                fontSize: {
                                    md: "16px"
                                },
                                fontWeight: {
                                    md: 400
                                },
                                marginTop:
                                    index === 0
                                        ? { xs: "0px", md: "40px" }
                                        : "",
                                my: "auto",
                                alignItems: { md: "center" }
                            }}
                        >
                            {item.day}
                        </Box>
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                        <Box sx={{ width: "100%" }}>
                            {index === 0 && (
                                <Typography
                                    sx={{
                                        display: { xs: "none", md: "block" },
                                        fontWeight: 600,
                                        fontSize: {
                                            lg: "18px",
                                            xs: "18px"
                                        },
                                        lineHeight: {
                                            lg: "28px",
                                            xs: "28px"
                                        },
                                        color: "#1E1E1E",
                                        marginBottom: { xs: "24px" }
                                    }}
                                >
                                    Open Time
                                </Typography>
                            )}

                            <Suspense fallback={<div>Loading....</div>}>
                                <SelectBox
                                    show={show}
                                    isDaypart={""}
                                    HInputs={"md-width"}
                                    setShow={setShow}
                                    required={true}
                                    defaultLabel={"Select Time"}
                                    name={`${item.day}-Open Time`}
                                    disabled={disabled}
                                    initialValue={DaysData}
                                    list={Hours24}
                                    handleChange={handleChange}
                                    fontColor="#1E1E1E"
                                    value={""}
                                    width={296}
                                    error={error}
                                    bgColor="white"
                                />
                            </Suspense>
                        </Box>

                        <Box
                            className="input-margin"
                            sx={{
                                width: "100%",

                                marginLeft: {
                                    xl: "0px",
                                    md: "16px",
                                    xs: "16px"
                                }
                            }}
                        >
                            {index === 0 && (
                                <Typography
                                    sx={{
                                        display: { xs: "none", md: "block" },
                                        fontWeight: 600,
                                        fontSize: {
                                            lg: "18px",
                                            xs: "18px"
                                        },
                                        lineHeight: {
                                            lg: "28px",
                                            xs: "28px"
                                        },
                                        color: "#1E1E1E",
                                        marginBottom: { xs: "24px" }
                                    }}
                                >
                                    Close Time
                                </Typography>
                            )}
                            <Suspense fallback={<div>Loading....</div>}>
                                <SelectBox
                                    isDaypart={""}
                                    show={show}
                                    setShow={setShow}
                                    required={true}
                                    defaultLabel={"Select Time"}
                                    name={`${item.day}-Close Time`}
                                    disabled={disabled}
                                    initialValue={DaysData}
                                    list={Hours24}
                                    handleChange={handleChange}
                                    value={""}
                                    HInputs={"md-width"}
                                    error={error}
                                    width={296}
                                    bgColor="white"
                                />
                            </Suspense>
                        </Box>
                    </Box>
                </Box>
            )
        })
    }
)
const ClockLoader = React.memo(({ hoursOfOperation }) => {
    return hoursOfOperation.map((item, index) => {
        return (
            <Box
                key={index}
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    marginTop: { md: "24px" },
                    justifyContent: { md: "space-between", xs: "flex-start" },
                    alignItems: { md: "center" }
                }}
            >
                <Skeleton
                    animation="pulse"
                    width={"100px"}
                    height={"25px"}
                    variant={"text"}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Box sx={{ width: "100%" }}>
                        <Typography
                            sx={{
                                display: { xs: "none", md: "none" },
                                fontWeight: "400",
                                paddingBottom: "8px",
                                fontSize: {
                                    xs: "14px"
                                },
                                lineHeight: {
                                    xs: "21px"
                                },
                                color: "#5C5C5C",
                                marginBottom: { xs: "7px", md: "0" }
                            }}
                        >
                            Open Time
                        </Typography>
                        <Skeleton
                            animation="pulse"
                            width={"340px"}
                            height={"56px"}
                            variant={"text"}
                        />
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            marginLeft: { lg: "32px", md: "24px", xs: "16px" }
                        }}
                    >
                        <Typography
                            sx={{
                                display: { xs: "none", md: "none" },
                                fontWeight: "400",
                                paddingBottom: "8px",
                                fontSize: {
                                    xs: "14px"
                                },
                                lineHeight: {
                                    xs: "21px"
                                },
                                color: "#5C5C5C",
                                marginBottom: { xs: "7px", md: "0" }
                            }}
                        >
                            Close Time
                        </Typography>
                        <Skeleton
                            animation="pulse"
                            width={"340px"}
                            height={"56px"}
                            variant={"text"}
                        />
                    </Box>
                </Box>
            </Box>
        )
    })
})
export default function HoursOfOperation() {
    const [Loading] = useState(true)
    const md = useMediaQuery("(max-width:900px)")
    const currentproject = useSelector(
        (state) => state.dataSlice.currentproject
    )
    const router = useRouter()
    const [disabled, setDisable] = useState(false)
    const [disableNext, setDisableNext] = useState(true)
    const routerID = router.query.id
    const sm = useMediaQuery("(max-width:600px)")
    const xs = useMediaQuery("(max-width:0px)")
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Site Information",
        "Hours of Operation"
    )
    let dayspartper = substageinnerstages.find(
        (it) => it.name == "Day Parts"
    ).percentage
    let revenueper = substageinnerstages.find(
        (it) => it.name == "Revenue Centers"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let hoursdata = { ...substageinnerstages[currentindex] }
    let initialData = hoursdata.data
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            setDayData(initialData[0]?.checkboxes)
            setNotes(initialData[0]?.notes || "")
        }
    }, [sideBarData])

    const dispatch = useDispatch()
    const [notes, setNotes] = useState("")

    const [SubmitHours, setSubmit] = useState([
        {
            title: "Days",
            rowData: [],
            checkboxes: [],

            other: {},
            notes: ""
        },
        {
            title: "Open Time",
            rowData: []
        },
        {
            title: "Close Time",
            rowData: []
        }
    ])
    const [hoursOfOperation] = useState([
        {
            day: "Saturday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        },
        {
            day: "Sunday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        },
        {
            day: "Monday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        },
        {
            day: "Tuesday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        },

        {
            day: "Wednesday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        },
        {
            day: "Thursday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        },
        {
            day: "Friday",
            openingTime: "12:00 AM",
            closingTime: "12:00 AM"
        }
    ])
    const [DaysData, setDayData] = useState([
        { name: "Saturday-Open Time", value: "" },
        { name: "Sunday-Open Time", value: "" },
        { name: "Monday-Open Time", value: "" },
        { name: "Tuesday-Open Time", value: "" },
        { name: "Wednesday-Open Time", value: "" },
        { name: "Thursday-Open Time", value: "" },
        { name: "Friday-Open Time", value: "" },
        { name: "Saturday-Close Time", value: "" },
        { name: "Sunday-Close Time", value: "" },
        { name: "Monday-Close Time", value: "" },
        { name: "Tuesday-Close Time", value: "" },
        { name: "Wednesday-Close Time", value: "" },
        { name: "Thursday-Close Time", value: "" },
        { name: "Friday-Close Time", value: "" },
        { name: "earliestTime", value: "" }
    ])
    const [dom, updateDom] = useState(false)
    const [show, setShow] = useState("")
    const [error] = useState(false)

    let Hours24 = get24Hours()
    const handleChange = (name, value) => {
        let tempArr = DaysData.map((item) => ({ ...item }))
        let obj = { name: name, value: value }
        let target = tempArr.find((item) => item.name == obj.name)
        if (obj.name.includes("Open")) {
            if (
                obj.name != "Sunday-Open Time" &&
                obj.name != "Saturday-Open Time" &&
                !obj.name.includes("Close Time")
            ) {
                let monToFriOpen = tempArr.filter(
                    (item) =>
                        item.name != "Sunday-Open Time" &&
                        item.name != "Saturday-Open Time" &&
                        !item.name.includes("Close Time")
                )
                tempArr.map((ar) => {
                    monToFriOpen.map((mf) => {
                        if (ar.value === "" && ar.name === mf.name) {
                            ar.value = obj.value
                        }
                    })
                })
            } else {
                let ssOpen = tempArr.filter(
                    (item) =>
                        item.name === "Sunday-Open Time" ||
                        (item.name === "Saturday-Open Time" &&
                            !item.name.includes("Close Time"))
                )
                tempArr.map((ar) => {
                    ssOpen.map((mf) => {
                        if (ar.value === "" && ar.name === mf.name) {
                            ar.value = obj.value
                        }
                    })
                })
            }
        } else {
            if (
                obj.name != "Sunday-Close Time" &&
                obj.name != "Saturday-Close Time" &&
                !obj.name.includes("Open Time")
            ) {
                let monToFriClose = tempArr.filter(
                    (item) =>
                        item.name != "Sunday-Close Time" &&
                        item.name != "Saturday-Close Time" &&
                        !item.name.includes("Open Time")
                )
                tempArr.map((ar) => {
                    monToFriClose.map((mf) => {
                        if (ar.value === "" && ar.name === mf.name) {
                            ar.value = obj.value
                        }
                    })
                })
            } else {
                let ssClose = tempArr.filter(
                    (item) =>
                        item.name === "Sunday-Close Time" ||
                        (item.name === "Saturday-Close Time" &&
                            !item.name.includes("Open Time"))
                )
                tempArr.map((ar) => {
                    ssClose.map((mf) => {
                        if (ar.value === "" && ar.name === mf.name) {
                            ar.value = obj.value
                        }
                    })
                })
            }
        }
        if (target) {
            target.value = obj.value

            setDayData(tempArr)

            updateDom(!dom)
        } else {
            tempArr.push(obj)
            setDayData(tempArr)
            updateDom(!dom)
        }
        handleStore(notes, tempArr)
    }
    const handleStore = (temText, _tempArr) => {
        let data = _tempArr.map((item) => ({ ...item }))
        let temp = SubmitHours.map((item) => ({
            ...item,
            ["rowData"]: [...item.rowData]
        }))
        data.map((item) => {
            if (item.name.split("-")[1] == "Open Time") {
                if (item.name.includes("Sunday")) {
                    temp[1].rowData[0] = item.value
                } else if (item.name.includes("Monday")) {
                    temp[1].rowData[1] = item.value
                } else if (item.name.includes("Tuesday")) {
                    temp[1].rowData[2] = item.value
                } else if (item.name.includes("Wednesday")) {
                    temp[1].rowData[3] = item.value
                } else if (item.name.includes("Thursday")) {
                    temp[1].rowData[4] = item.value
                } else if (item.name.includes("Friday")) {
                    temp[1].rowData[5] = item.value
                } else {
                    temp[1].rowData[6] = item.value
                }
                !temp[0].rowData.includes(
                    item.name.split("-")[0].slice(0, 3)
                ) && temp[0].rowData.push(item.name.split("-")[0].slice(0, 3))
            } else if (item.name.split("-")[1] == "Close Time") {
                if (item.name.includes("Sunday")) {
                    temp[2].rowData[0] = item.value
                } else if (item.name.includes("Monday")) {
                    temp[2].rowData[1] = item.value
                } else if (item.name.includes("Tuesday")) {
                    temp[2].rowData[2] = item.value
                } else if (item.name.includes("Wednesday")) {
                    temp[2].rowData[3] = item.value
                } else if (item.name.includes("Thursday")) {
                    temp[2].rowData[4] = item.value
                } else if (item.name.includes("Friday")) {
                    temp[2].rowData[5] = item.value
                } else {
                    temp[2].rowData[6] = item.value
                }
                !temp[0].rowData.includes(
                    item.name.split("-")[0].slice(0, 3)
                ) && temp[0].rowData.push(item.name.split("-")[0].slice(0, 3))
            } else {
                temp[0].other = item
            }
        })

        temp[0].checkboxes = _tempArr
        setSubmit(temp)
        const tempTextData = temText
        temp[0].notes = tempTextData
        const tempState = _tempArr.filter((item) => item.value == "").length
        const count = tempState === 0 ? 1 : 0
        const tempPercent = calculatePercentage(1, count)
        const siteinfodataper = Math.round(
            (revenueper + dayspartper + tempPercent) / 3
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Site Information",
            "Hours of Operation",
            temp,
            tempPercent,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const submitForm = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/discovery/site-information/revenue-center/${routerID}`,
            query: { inner: true }
        })
    }

    const handleBack = () => {
        {
            router.push({
                pathname: `/discovery/site-information/hours-of-operation/${routerID}`
            })
        }
    }
    const handleTextCahnge = (e) => {
        setNotes(e.target.value)
        handleStore(e.target.value, DaysData)
    }
    useEffect(() => {
        const tempState = DaysData.filter((item) => item.value == "").length
        setDisableNext(tempState !== 0)
    }, [DaysData])

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
                    fontWeight: 600,
                    paddingRight: "16px",
                    fontSize: {
                        lg: "20px",
                        xs: "14px",
                        sm: "20px"
                    },
                    lineHeight: {
                        lg: "28px",
                        xs: "16px",
                        sm: "28px"
                    },
                    color: "#1E1E1E",
                    marginBottom: "30px"
                }}
            >
                What are the business hours of operation?
            </Typography>

            <form aria-label={`This is hours of operations form`} action="" onSubmit={submitForm}>
                <Box className="Hours-of-operation" sx={{ maxWidth: "944px" }}>
                    {!Loading ? (
                        <ClockLoader hoursOfOperation={hoursOfOperation} />
                    ) : (
                        <ClockLists
                            disabled={disabled}
                            hoursOfOperation={hoursOfOperation}
                            show={show}
                            setShow={setShow}
                            DaysData={DaysData}
                            Hours24={Hours24}
                            handleChange={handleChange}
                            error={error}
                            md={md}
                            xs={xs}
                            sm={sm}
                        />
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        justifyContent: {
                            md: "space-between",
                            xs: "flex-start"
                        },
                        alignItems: { lg: "center" },
                        maxWidth: { md: "944px", sm: "408px" },
                        marginTop: {
                            xxl: "2rem",
                            xl: "2.1rem",
                            lg: "2.1rem",
                            md: "2rem"
                        }
                    }}
                    className="Hours-of-operation"
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            paddingRight: "16px",
                            fontSize: {
                                lg: "18px",
                                xs: "14px",
                                sm: "18px"
                            },
                            lineHeight: {
                                lg: "28px",
                                xs: "16px",
                                sm: "28px"
                            },
                            marginBottom: { xs: "16px", sm: "16px", md: "0px" },
                            color: "#1E1E1E",
                            maxWidth: {
                                lg: "560px",
                                md: "408px",
                                sm: "408px",
                                xs: "358px"
                            }
                        }}
                    >
                        Earliest time any employee will be clocking into the
                        system
                    </Typography>
                    <SelectBox
                        show={show}
                        setShow={setShow}
                        required={true}
                        defaultLabel={"Select Time"}
                        name={`earliestTime`}
                        disabled={disabled}
                        initialValue={DaysData}
                        list={Hours24}
                        handleChange={handleChange}
                        error={error}
                        value={""}
                        width={xs ? null : sm ? 192 : md ? 192 : 272}
                        bgColor="white"
                    />
                </Box>
                <Typography
                    sx={{
                        marginTop: "32px",
                        fontWeight: 600,
                        fontSize: {
                            lg: "18px",
                            xs: "14px",
                            sm: "18px"
                        },
                        lineHeight: {
                            lg: "28px",
                            xs: "16px",
                            sm: "28px"
                        },
                        color: "#1E1E1E"
                    }}
                >
                    Special Notes
                </Typography>
                <Typography
                    sx={{
                        marginTop: {
                            xxl: "1rem",
                            xl: ".9rem",
                            lg: "1rem",
                            md: ".9rem"
                        },
                        fontWeight: 400,
                        fontSize: {
                            lg: "16px",
                            xs: "14px",
                            sm: "16px"
                        },
                        lineHeight: {
                            lg: "24px",
                            xs: "16px",
                            sm: "24px",
                            md: "25px"
                        },
                        color: "#5C5C5C",
                        letterSpacing: theme.letterSpacing.main,
                        maxWidth: {
                            xxl: "848px",
                            xl: "848px",
                            lg: "848px",
                            md: "615px",
                            xs: "100%"
                        }
                    }}
                >
                    Please indicate any special notes about Open or Close times
                    that are not accounted for above. This may include closing
                    certain parts of the day or always closing certain days of
                    the week.
                </Typography>
                {/* Text area Here */}
                <Box>
                    <MuiTextArea
                        disableText={disabled}
                        handleChange={(e) => handleTextCahnge(e)}
                        comment={notes}
                    />
                </Box>

                <Divider style={{ width: "100%", marginTop: "32px" }} />

                <Box
                    paddingY={"24px"}
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        flexDirection: {
                            lg: "row",
                            md: "column",
                            sm: "column",
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
                                xs: "column-reverse"
                            }
                        }}
                    >
                        <CommonButton
                            className={"back-button"}
                            aria-label={"Clear"}
                            variant={"outlined"}
                            mt={{ xs: "16px", md: "0px" }}
                            mr={{ md: "12px" }}
                            px={"20px"}
                            py={"12px"}
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
                            aria-label={"Next Step"}
                            variant={"contained"}
                            disabled={disableNext}
                            px={"20px"}
                            py={"12px"}
                            color="white"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            hover="#062EC9"
                            content={"Next Step"}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
