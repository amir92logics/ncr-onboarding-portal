import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, useMediaQuery } from "@mui/material"
import {
    calculatePercentage,
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import InputAdornment from "@mui/material/InputAdornment"
import SelectBox from "../../../common/SelectBoxV2"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import Input from "../../../../components/common/Input"

import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import CommonButton from "../../../common/CommonButton"

export default function PayrollComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Labor",
        "Payroll"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Job Codes"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Overtime"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let currentdata = { ...substageinnerstages[currentindex] }
    const initilData = currentdata?.data
    const dispatch = useDispatch()
    const [DaysData, setDayData] = useState([
        {
            title: "What is the first day of your restaurant’s pay period?",
            rowData: []
        },
        {
            title: "What is the minimum wage for employees who receive tips?",
            rowData: []
        },
        {
            title: " What is the minimum wage for employees who do not receive tips?",
            rowData: []
        },
        {
            title: "Which scenario best describes how employees receive their tips?",
            rowData: []
        }
    ])

    const [enableButton, setEnableButton] = useState(true)
    const [disabled, setDisable] = useState(false)
    const [firstInput, setFirstInput] = useState("")
    const [SecondInput, setSecondInput] = useState("")
    const [selectBox, setSelectBox] = useState("")
    const [selectBox2, setSelectBox2] = useState("")

    const updateStore = (_tempData) => {
        const count =
            _tempData[0].rowData.length +
            _tempData[1].rowData.length +
            _tempData[2].rowData.length +
            _tempData[3].rowData.length
        let currentpercentage = calculatePercentage(4, count)
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per) / 3
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Labor",
            "Payroll",
            _tempData,
            currentpercentage,
            innerper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const handleChange = (name, value) => {
        let tempArr = [...DaysData]
        let temprow = { ...tempArr[0] }
        setSelectBox(value)
        temprow.rowData = [value]
        tempArr[0] = temprow
        setDayData(tempArr)
        updateStore(tempArr)
    }
    const handleChange2 = (e) => {
        let tempArr = [...DaysData]
        if (e.target.name == "id-minimum-tipped") {
            let temprow = { ...tempArr[2] }
            setSecondInput(e.target.value)
            temprow.rowData = e.target.value !== "" ? [e.target.value] : []
            tempArr[2] = temprow
        } else if (e.target.name == "id-minimum-wage") {
            setFirstInput(e.target.value)
            let temprow = { ...tempArr[1] }
            temprow.rowData = e.target.value !== "" ? [e.target.value] : []
            tempArr[1] = temprow
        }
        setDayData(tempArr)
        updateStore(tempArr)
    }
    const submitFunct = (e) => {
        e.preventDefault()
        if (disabled) {
            router.push({
                pathname: `/discovery/labor/overtime/${routerID}`,
                query: { inner: true }
            })
        } else {
            updateStore(DaysData)
            router.push({
                pathname: `/discovery/labor/overtime/${routerID}`,
                query: { inner: true }
            })
        }
    }
    const handleChangeDropDown = (name, value) => {
        let tempArr = [...DaysData]
        let temprow = { ...tempArr[3] }
        setSelectBox2(value)
        temprow.rowData = [value]
        tempArr[3] = temprow
        setDayData(tempArr)
        updateStore(tempArr)
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initilData.length != 0) {
            setDayData(initilData)
            setFirstInput(initilData[1].rowData[0])
            setSecondInput(initilData[2].rowData[0])
            setSelectBox(initilData[0].rowData[0])
            setSelectBox2(initilData[3].rowData[0])
        }
    }, [sideBarData])

    useEffect(() => {
        const _enableButton = DaysData.filter((it) => it.rowData.length == 0)
        setEnableButton(_enableButton.length !== 0)
    }, [DaysData])
    const exceptThisSymbols = ["e", "E", "+", "-"]

    // custom media query defined for select boxes width
    const custLG = useMediaQuery("(min-width:1152px)")

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Typography
                aria-label="Please tell us about your payroll schedule and minimum wage.
            Aloha POS will use the information you provide for labor
            reporting and overtime calculations."
                sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",

                    color: "#1E1E1E"
                }}
            >
                Please tell us about your payroll schedule and minimum wage.
                Aloha POS will use the information you provide for labor
                reporting and overtime calculations.
            </Typography>
            <form aria-label={`This is payroll form`} action="" onSubmit={(e) => submitFunct(e)}>
                <Box
                    className="shadow"
                    sx={{
                        marginTop: { md: "24px", xs: "16px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        padding: { xs: "19px 16px", md: " 23px 24px" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { lg: "row", xs: "column" },
                            justifyContent: {
                                lg: "space-between",
                                xs: "flex-start"
                            },
                            alignItems: { lg: "center" }
                        }}
                    >
                        <Typography
                            aria-label=" What is the first day of your restaurant’s pay
                        period?"
                            display={"flex"}
                            gap={"4px"}
                            alignItems="start"
                            sx={{
                                fontWeight: 400,
                                paddingRight: "16px",
                                fontSize: {
                                    lg: "16px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "25px",
                                    md: "22px",
                                    xs: "23.6px"
                                },
                                marginBottom: {
                                    xs: "14.6px",
                                    md: "14px",
                                    lg: "0px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            <span style={{ textAlign: "center" }}>1.</span>
                            What is the first day of your restaurant’s pay
                            period?
                        </Typography>
                        <></>
                        <SelectBox
                        ariaLabel={"Select Day"}
                            defaultLabel={"Select Day"}
                            name="Breakfast"
                            disabled={disabled}
                            initialValue={selectBox}
                            list={[
                                { label: "Sunday", value: "Sunday" },
                                { label: "Monday", value: "Monday" },
                                { label: "Tuesday", value: "Tuesday" },
                                { label: "Wednesday", value: "Wednesday" },
                                { label: "Thursday", value: "Thursday" },
                                { label: "Friday", value: "Friday" },
                                { label: "Saturday", value: "Saturday" }
                            ]}
                            handleChange={handleChange}
                            value={""}
                            width={custLG ? 340 : "100%"}
                            bgColor="white"
                            color="#5c5c5c"
                        />
                    </Box>
                </Box>

                <Box
                    className="shadow"
                    sx={{
                        marginTop: { md: "24px", xs: "16px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        padding: { xs: "19px 16px", md: " 23px 24px" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { lg: "row", xs: "column" },
                            justifyContent: {
                                lg: "space-between",
                                xs: "flex-start"
                            },
                            alignItems: { lg: "center" }
                        }}
                    >
                        <Typography
                            display={"flex"}
                            gap={"4px"}
                            alignItems="start"
                            sx={{
                                fontWeight: 400,
                                paddingRight: {
                                    lg: "16px",
                                    xs: "0px"
                                },
                                fontSize: {
                                    lg: "16px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "24px",
                                    md: "25px",
                                    xs: "24.4px"
                                },
                                marginBottom: {
                                    xs: "14.6px",
                                    md: "14.6px",
                                    lg: "0px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            <span style={{ textAlign: "center" }}>2.</span> What
                            is the minimum wage for employees who receive tips?
                        </Typography>
                        <Input
                            onKeyDown={(e) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                            }
                            // id="id-minimum-wage"
                            name="id-minimum-wage"
                            type="number"
                            className="ncr-new-input"
                            label="Enter $ Amount"
                            value={firstInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        sx={{
                                            marginLeft: {
                                                xs: -0.5,
                                                md: -0.5
                                            }
                                        }}
                                        position="start"
                                    >
                                        {"$"}
                                    </InputAdornment>
                                )
                            }}
                            disabled={disabled}
                            onChange={handleChange2}
                        />
                    </Box>
                </Box>

                <Box
                    className="shadow"
                    sx={{
                        marginTop: { md: "24px", xs: "16px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        padding: { xs: "19px 16px", md: " 23px 24px" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { lg: "row", xs: "column" },
                            justifyContent: {
                                lg: "space-between",
                                xs: "flex-start"
                            },
                            alignItems: { lg: "center" }
                        }}
                    >
                        <Typography
                            display={"flex"}
                            gap={"4px"}
                            alignItems="start"
                            sx={{
                                fontWeight: 400,
                                paddingRight: {
                                    lg: "16px",
                                    xs: "0px"
                                },

                                fontSize: {
                                    lg: "16px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "23px",
                                    md: "26px",
                                    xs: "24.6px"
                                },
                                marginBottom: {
                                    xs: "14.4px",
                                    md: "14px",
                                    lg: "0px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            <span>
                                <span style={{ textAlign: "center" }}>3.</span>{" "}
                                What is the minimum wage for employees who{" "}
                                <b
                                    style={{
                                        whiteSpace: "nowrap",
                                        position: "relative"
                                    }}
                                >
                                    do not{" "}
                                </b>
                                receive tips?
                            </span>
                        </Typography>
                        <Input
                            onKeyDown={(e) =>
                                exceptThisSymbols.includes(e.key) &&
                                e.preventDefault()
                            }
                            // id="id-minimum-tipped"
                            type="number"
                            className="ncr-new-input"
                            label="Enter $ Amount"
                            name={'id-minimum-tipped'}
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    sm: "100%",
                                    lg: 340
                                }
                            }}
                            value={SecondInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        sx={{
                                            marginLeft: {
                                                xs: -0.5,
                                                md: -0.5
                                            }
                                        }}
                                        position="start"
                                    >
                                        {"$"}
                                    </InputAdornment>
                                )
                            }}
                            disabled={disabled}
                            onChange={handleChange2}
                        />
                    </Box>
                </Box>
                <Box
                    className="shadow"
                    sx={{
                        marginTop: { md: "24px", xs: "16px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        padding: { xs: "19px 16px", md: " 23px 24px" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { lg: "row", xs: "column" },
                            justifyContent: {
                                lg: "space-between",
                                xs: "flex-start"
                            },
                            alignItems: { lg: "center" }
                        }}
                    >
                        <Typography
                            display={"flex"}
                            gap={"4px"}
                            alignItems="start"
                            sx={{
                                fontWeight: 400,
                                paddingRight: {
                                    lg: "16px",
                                    xs: "0px"
                                },

                                fontSize: {
                                    lg: "16px",
                                    xs: "16px"
                                },
                                lineHeight: {
                                    lg: "23px",
                                    md: "26px",
                                    xs: "24.6px"
                                },
                                marginBottom: {
                                    xs: "14.4px",
                                    md: "14px",
                                    lg: "0px"
                                },
                                color: "#1E1E1E"
                            }}
                        >
                            <span style={{ textAlign: "center" }}>4.</span>{" "}
                            Which scenario best describes how employees receive
                            their tips?
                        </Typography>

                        <SelectBox
                            defaultLabel={"Select an Option"}
                            required={true}
                            name="SelectBox"
                            disabled={disabled}
                            payroll={true}
                            initialValue={selectBox2}
                            list={[
                                {
                                    label: "Employees receive their credit card tips in cash after their shift",
                                    value: "Employees receive their credit card tips in cash after their shift"
                                },
                                {
                                    label: "Restaurant collects credit card tips and distributes them through payroll",
                                    value: "Restaurant collects credit card tips and distributes them through payroll"
                                },
                                { label: "I don’t know", value: "I don’t know" }
                            ]}
                            handleChange={handleChangeDropDown}
                            value={""}
                            width={custLG ? "340px" : "100%"}
                            bgColor="white"
                        />
                    </Box>
                </Box>

                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",

                        marginTop: {
                            xxl: "31px",
                            xl: "32px",
                            md: "32px",
                            xs: "24px"
                        }
                    }}
                />

                <Box
                    paddingY={"23px"}
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
                                sm: "column",
                                xs: "column"
                            }
                        }}
                    >
                        <CommonButton
                            className={"next-button"}
                            type={"submit"}
                            ariaTag={"This is Next Step Button"}
                            variant={"contained"}
                            mt={{ xs: "7px", md: "0px" }}
                            disabled={enableButton}
                            px={"20px"}
                            py={{ xl: "10.6px", md: "10px", xs: "13.6px" }}
                            color="white"
                            fontSize="16px"
                            lineHeight={{ md: "24px", xs: "21px" }}
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
