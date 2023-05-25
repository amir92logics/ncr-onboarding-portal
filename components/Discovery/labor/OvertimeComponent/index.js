import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, useMediaQuery } from "@mui/material"
import MuiTextArea from "../../../common/MuiTextArea/MuiTextArea"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
    calculatePercentage,
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"
import Input from "../../../../components/common/Input"

import Image from "next/image"
import MobileCards from "./MobileCards"
import Togglebutton from "../../../common/Togglebutton"
export default function OvertimeComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const isMobile = useMediaQuery("(max-width:671px)")

    const [comment3, setComment3] = useState("")

    const [mainToggle, setMainToggle] = useState([
        { label: "toggle1", toggle: true },
        { label: "toggle2", toggle: false }
    ])

    const [disable, setDisable] = useState(false)
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Labor",
        "Overtime"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Job Codes"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Payroll"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let currentdata = { ...substageinnerstages[currentindex] }
    const initialData = currentdata?.data

    const dispatch = useDispatch()

    const [overtime, setOvertime] = useState([
        { label: "WeeklyHours", value: "" },
        { label: "WeeklyRate", value: "" },
        { label: "DailyHours", value: "" },
        { label: "DailyRate", value: "" }
    ])
    const updateStore = (_tempOvertime, _tempCommnet, _tempToggle) => {
        const temp = [
            {
                overtime: _tempOvertime,
                comment: _tempCommnet,
                mainToggle: _tempToggle
            }
        ]
        let currentpercentage = 0
        let count = 0
        _tempOvertime.map((item, i) => {
            if (item.value !== "") {
                count += 1
            }
        })
        if (_tempToggle[0].toggle && _tempToggle[1].toggle) {
            currentpercentage = calculatePercentage(4, count)
        } else if (!_tempToggle[0].toggle && !_tempToggle[1].toggle) {
            currentpercentage = 0
        } else if (_tempToggle[0].toggle || _tempToggle[1].toggle) {
            currentpercentage = calculatePercentage(2, count)
        } else if (!_tempToggle[0].toggle || !_tempToggle[1].toggle) {
            currentpercentage = 100
        } else {
            currentpercentage = 100
        }

        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per) / 3
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Labor",
            "Overtime",
            temp,
            currentpercentage,
            innerper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const handleChange = (name, value) => {
        const _temp = overtime.map((item) => ({ ...item }))
        let temp2 = mainToggle.map((item) => ({ ...item }))
        let target2 = temp2.find((item) => item.label == name)
        if (target2) {
            target2.toggle = value
            setMainToggle([...temp2])
        } else {
            let target = _temp.find((item) => item.label == name)
            if (target) {
                if (target.label.includes("Hours")) {
                    if (target.label == "WeeklyHours") {
                        target.value =
                            Number(value) < 100 || Number(value) == 100
                                ? value
                                : ""
                    } else {
                        target.value =
                            Number(value) < 24 || Number(value) == 24
                                ? value
                                : ""
                    }
                    setOvertime([..._temp])
                } else {
                    target.value = value
                    setOvertime([..._temp])
                }
            }
        }
        if (name == "toggle1" && !value) {
            for (let i = 0; i < _temp.length; i++) {
                let current = { ..._temp[i] }
                if (i == 0 || i == 1) {
                    current.value = ""
                }
                _temp[i] = current
            }
        } else if (name == "toggle2" && !value) {
            for (let i = 0; i < _temp.length; i++) {
                let current = { ..._temp[i] }
                if (i == 2 || i == 3) {
                    current.value = ""
                }
                _temp[i] = current
            }
        }
        updateStore(_temp, comment3, temp2)
    }

    const handleChangeTextArea = (e) => {
        setComment3(e.target.value)
        updateStore(overtime, e.target.value, mainToggle)
    }

    let count = 0
    overtime.map((item) => {
        if (item.value !== "") {
            count += 1
        }
    })

    const submitForm = (e) => {
        e.preventDefault()

        updateStore(overtime, comment3, mainToggle)

        router.push({
            pathname: `/discovery/labor/jobcodes/${routerID}`,
            query: { inner: true }
        })
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            setOvertime(initialData[0].overtime)
            setComment3(initialData[0].comment)

            setMainToggle(initialData[0].mainToggle)
        }
    }, [sideBarData])

    const handleBack = () => {
        router.push({
            pathname: `/discovery/labor/payroll/${routerID}`,
            query: { inner: true }
        })
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
            className="overtime"
        >
            <Typography
                className="overtime-text"
                sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",

                    color: "#1E1E1E"
                }}
            >
                Please tell us about the overtime rules for your state and
                municipality. Aloha POS will use the information you provide for
                overtime calculations.
            </Typography>
            <form aria-label={`This is overtime form`} onSubmit={submitForm}>
                <Box sx={{ display: { md: "block", xs: "none" } }}>
                    <Box
                        className="shadow"
                        sx={{
                            background: "#ffffff",
                            padding: { md: "23px", xs: "20px 16px 19px 16px" },
                            borderRadius: "12px",
                            marginTop: "32px"
                        }}
                    >
                        <Box display={"flex"} alignItems={"center"}>
                            <Box
                                width={"24px"}
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"}
                            >
                                <Image
                                    width={"24px"}
                                    height="24px"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/Overtime-Calendar.svg`}
                                    alt="Overtime Calender Icon"
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "28px",
                                    marginLeft: "8px",
                                    marginRight: "16px",

                                    color: "#1E1E1E"
                                }}
                            >
                                Weekly Overtime
                            </Typography>
                            <Box display={"flex"}>
                                <Togglebutton
                                    label={
                                        <Typography
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                color: mainToggle[0]?.toggle
                                                    ? disable
                                                        ? "#5c5c5c"
                                                        : "#1E1E1E"
                                                    : "#5c5c5c",
                                                ml: "10px"
                                            }}
                                        >
                                            {mainToggle[0]?.toggle
                                                ? "On"
                                                : "Off"}
                                        </Typography>
                                    }
                                    disabled={disable}
                                    checked={mainToggle[0]?.toggle}
                                    onChange={(e) => {
                                        handleChange(
                                            "toggle1",
                                            e.target.checked
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection="row"
                            alignItems={"end"}
                            sx={{
                                mt: "32px",
                                flexWrap: { lg: "nowrap", xs: "wrap" }
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#1E1E1E"
                                }}
                            >
                                After
                            </Box>
                            <Input
                            ariaLabel='This is hours input'
                                type="number"
                                className="overtime-textfield"
                                label="Hours"
                                sx={{
                                    mx: "12px",
                                    maxWidth: {
                                        md: "276px",
                                        lg: "100%"
                                    }
                                }}
                                name={"WeeklyHours"}
                                value={overtime[0]?.value}
                                onChange={(e) => {
                                    handleChange("WeeklyHours", e.target.value)
                                }}
                                disabled={!mainToggle[0]?.toggle || disable}
                            />

                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 400,
                                    mt: {
                                        xs: "24px",
                                        md: "0px"
                                    },
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    whiteSpace: "nowrap",

                                    color: "#1E1E1E"
                                }}
                            >
                                hours worked per week,&nbsp;
                            </Box>

                            <Box
                                className="overtime-text3"
                                component="span"
                                sx={{
                                    fontWeight: 400,
                                    mt: {
                                        xs: "24px",
                                        lg: 0
                                    },
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    whiteSpace: "nowrap",

                                    color: "#1E1E1E",
                                    mr: "12px"
                                }}
                            >
                                multiply hourly rate by
                            </Box>
                            <Input
                                ariaLabel="This is rate input"
                                type="number"
                                className="overtime-textfield"
                                label="Rate"
                                sx={{
                                    mt: {
                                        md: "24px",
                                        lg: 0
                                    },
                                    maxWidth: {
                                        md: "276px",
                                        lg: "100%"
                                    }
                                }}
                                name={"WeeklyRate"}
                                disabled={!mainToggle[0]?.toggle || disable}
                                value={overtime[1]?.value}
                                onChange={(e) => {
                                    handleChange("WeeklyRate", e.target.value)
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        className="shadow"
                        sx={{
                            background: "#ffffff",
                            padding: { md: "23px", xs: "20px 16px 19px 16px" },
                            borderRadius: "12px",
                            marginTop: { lg: "32px", md: "24px" }
                        }}
                    >
                        <Box display={"flex"} alignItems={"center"}>
                            <Box
                                width={"24px"}
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"}
                            >
                                <Image
                                    width={"24px"}
                                    height="24px"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/Daily-Overtime.svg`}
                                    alt="Clock Icon"
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "28px",
                                    marginLeft: "8px",
                                    marginRight: "16px",

                                    color: "#1E1E1E"
                                }}
                            >
                                Daily Overtime
                            </Typography>
                            <Box display={"flex"}>
                                <Box>
                                    <Togglebutton
                                        checked={mainToggle[1].toggle}
                                        disabled={disable}
                                        onChange={(e) => {
                                            handleChange(
                                                "toggle2",
                                                e.target.checked
                                            )
                                        }}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    color: mainToggle[1].toggle
                                                        ? disable
                                                            ? "#5c5c5c"
                                                            : "#1E1E1E"
                                                        : "#5c5c5c",
                                                    ml: "15px"
                                                }}
                                            >
                                                {mainToggle[1].toggle
                                                    ? "On"
                                                    : "Off"}
                                            </Typography>
                                        }
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection="row"
                            alignItems={"end"}
                            sx={{
                                mt: "32px",
                                flexWrap: { lg: "nowrap", xs: "wrap" }
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#1E1E1E"
                                }}
                            >
                                After
                            </Box>
                            <Input
                                ariaLabel="This is hours input"
                                type="number"
                                className="overtime-textfield"
                                label="Hours"
                                sx={{
                                    mx: "12px",
                                    maxWidth: {
                                        md: "276px",
                                        lg: "100%"
                                    }
                                }}
                                name="DailyHours"
                                value={overtime[2]?.value}
                                onChange={(e) => {
                                    handleChange("DailyHours", e.target.value)
                                }}
                                disabled={!mainToggle[1].toggle || disable}
                            />
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 400,
                                    mt: {
                                        xs: "24px",
                                        md: "0px"
                                    },
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    whiteSpace: "nowrap",

                                    color: "#1E1E1E"
                                }}
                            >
                                hours worked per day,&nbsp;
                            </Box>

                            <Box
                                className="overtime-text3"
                                component="span"
                                sx={{
                                    fontWeight: 400,
                                    mt: {
                                        xs: "24px",
                                        lg: 0
                                    },
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    whiteSpace: "nowrap",

                                    color: "#1E1E1E",
                                    mr: "12px"
                                }}
                            >
                                multiply hourly rate by
                            </Box>
                            <Input
                                ariaLabel="This is rate input"
                                type="number"
                                className="overtime-textfield"
                                label="Rate"
                                sx={{
                                    mt: {
                                        md: "24px",
                                        lg: 0
                                    },
                                    maxWidth: {
                                        md: "276px",
                                        lg: "100%"
                                    }
                                }}
                                name="DailyRate"
                                value={overtime[3]?.value}
                                onChange={(e) => {
                                    handleChange("DailyRate", e.target.value)
                                }}
                                disabled={!mainToggle[1].toggle || disable}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    {isMobile && (
                        <MobileCards
                            disable={disable}
                            mainToggle={mainToggle}
                            handleChange={handleChange}
                            overtime={overtime}
                        />
                    )}
                </Box>

                <Typography
                    className="f-f-i"
                    sx={{
                        marginTop: { lg: "32px", xs: "24px" },
                        fontWeight: 400,
                        fontSize: {
                            lg: "16px",
                            xs: "16px"
                        },
                        lineHeight: {
                            lg: "24px",
                            xs: "24px"
                        },
                        marginBottom: { xs: "0px", lg: "0px" },
                        color: "#1E1E1E",
                        letterSpacing: {
                            xs: theme.letterSpacing.main,
                            sm: 0
                        }
                    }}
                >
                    Please tell us about any other overtime rules observed by
                    your establishment.
                </Typography>
                <MuiTextArea
                    disableText={disable}
                    require1={false}
                    comment={comment3}
                    handleChange={handleChangeTextArea}
                    InputLabelProps={{
                        style: {
                            lineHeight: "0px"
                        }
                    }}
                />

                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",

                        marginTop: {
                            lg: "32px",
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
                            className={"back-button"}
                            ariaTag={"This is Back Button"}
                            variant={"outlined"}
                            mr={{ md: "8px" }}
                            px={"20px"}
                            py={"11px"}
                            color="#5C5C5C"
                            fontSize="16px"
                            lineHeight={{ xs: "22px", md: "24px" }}
                            fontWeight="600"
                            content={"Back"}
                            onclickHandler={handleBack}
                        />
                        <CommonButton
                            className={"next-button"}
                            type={"submit"}
                            ariaTag={"This is Next Step Button"}
                            variant={"contained"}
                            disabled={currentdata?.percentage < 100}
                            mt={{ xs: "8px", md: "0px" }}
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
