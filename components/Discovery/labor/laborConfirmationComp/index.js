import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
import ConfirmationIncludedItemTable from "../../../common/confirmationIncludedItemTable"
import ConfirmationTable from "../../../common/confirmationTable"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import CommonButton from "../../../common/CommonButton"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../../../redux-setup/api/data"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
export default function LaborConfirmationComp() {
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const currentproject = useSelector(
        (state) => state.dataSlice.currentproject
    )
    const [loading, setLoading] = useState(false)
    const [dataloading, setDataloading] = useState(true)
    const [actionstrigger] = useLazyActionsgetQuery()
    const [updatedata] = useUpdateDataMutation()
    const dispatch = useDispatch()
    const router = useRouter()
    const routerID = router.query.id
    const [payrollData, setPayrollData] = useState([
        {
            title: "What is the first day of your restaurant’s pay period?  ",
            rowData: ["Sunday"]
        },
        {
            title: "What is the minimum wage for employees who receive tips?",
            rowData: ["7.15"]
        },
        {
            title: " What is the minimum wage for employees who do not receive tips?",
            rowData: ["2.13"]
        }
    ])

    const [overTimeData, setOverTimeData] = useState([
        {
            title: "Does your establishment observes Weekly Overtime rules? ",
            rowData: ["Yes"]
        }
    ])

    const [comment1, setComment1] = useState([
        {
            title: "Weekly Overtime Rule ",
            rowData: [""]
        }
    ])
    const [comment2, setComment2] = useState([
        {
            title: "Daily Overtime Rule",
            rowData: [""]
        }
    ])
    const [comment3, setComment3] = useState([
        {
            title: "Please tell us about any other overtime rules observed by your establishment.",
            rowData: ["N/A"]
        }
    ])
    const [overTimeData2, setOverTimeData2] = useState([
        {
            title: "Does your establishment observes Daily Overtime rules? ",
            rowData: ["Yes"]
        }
    ])

    const [jobsCodes] = useState({
        title: "Included Jobcodes",
        rowData: [
            [
                "Busser",
                "Server",
                "Bartender",
                "Cocktail",
                "Host",
                "FOH Trainer",
                "Cook",
                "Manager",
                "Bar Back",
                "Dish",
                "Cocktail",
                "Dish",
                "Busser",
                "Server/Bar/Cocktail"
            ]
        ]
    })
    const [jobsCodesResponsive] = useState([
        {
            title: "Included Job Codes",
            rowData: [
                "Busser",
                "Server",
                "Bartender",
                "Cocktail",
                "Host",
                "FOH Trainer",
                "Cook",
                "Manager",
                "Bar Back",
                "Dish"
            ]
        }
    ])
    const [addtionalJobcodes, SetAddtionalJobcodes] = useState([
        {
            title: "Additional Jobcodes",
            rowData: ["N/A"],
            discription:
                "Jobcode assignment denotes how the employee will operate within the Aloha Software (example; a server may see a floor plan, but a bartender sees a fresh tab)."
        }
    ])

    const optionListPayroll = [
        { label: "Sunday", value: "Sunday" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thrusday", value: "Thrusday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" }
    ]
    const { substageinnerstages, substageper } = getDiscoverySubStage(
        sideBarData,
        "Labor",
        "Overtime"
    )
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let pay = substageinnerstages.find((it) => it.name == "Payroll").data
    let overT = substageinnerstages.find((it) => it.name == "Overtime").data
    let jobcode = substageinnerstages.find((it) => it.name == "Job Codes").data
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    useEffect(() => {
        if (sideBarData && sideBarData.length !== 0) {
            SetAddtionalJobcodes([
                {
                    title: "Additional Jobcodes",
                    rowData: jobcode
                }
            ])
            if (pay.length != 0) {
                let tempData = JSON.parse(JSON.stringify(pay))
                tempData[1].rowData[0] = "$ " + `${pay[1].rowData[0]}`
                tempData[2].rowData[0] = "$ " + pay[2].rowData[0]
                setPayrollData(tempData)
                setDataloading(false)
            }
            if (overT.length != 0) {
                const tempAdditonal2 = [...overTimeData]

                tempAdditonal2[0].rowData[0] =
                    overT[0]?.mainToggle[0].toggle === true ? "Yes" : "No"

                setOverTimeData(tempAdditonal2)

                const tempAdditonal3 = [...overTimeData2]

                tempAdditonal3[0].rowData[0] =
                    overT[0]?.mainToggle[1].toggle === true ? "Yes" : "No"
                setOverTimeData2(tempAdditonal3)
                const tempAdditonal4 = [...comment1]

                {
                    overT[0]?.overtime[0].value !== "" ||
                    overT[0]?.overtime[1].value !== ""
                        ? (tempAdditonal4[0].rowData = [
                              `After ${overT[0]?.overtime[0].value} hours worked per week, multiply hourly rate by ${overT[0]?.overtime[1].value}`
                          ])
                        : (tempAdditonal4[0].rowData = [""])
                }

                setComment1(tempAdditonal4)
                const tempAdditonal5 = [...comment2]

                {
                    overT[0]?.overtime[2].value !== "" ||
                    overT[0]?.overtime[3].value !== ""
                        ? (tempAdditonal5[0].rowData = [
                              `After ${overT[0]?.overtime[2].value} hours worked per week, multiply hourly rate by ${overT[0]?.overtime[3].value}`
                          ])
                        : (tempAdditonal5[0].rowData = [""])
                }
                setComment2(tempAdditonal5)
                const tempAdditonal1 = [...comment3]
                if (overT[0]?.comment) {
                    tempAdditonal1[0].rowData[0] = overT[0]?.comment
                } else {
                    tempAdditonal1[0].rowData[0] = "N/A"
                }

                setComment3(tempAdditonal1)
            }
            if (jobcode.length != 0) {
                const tempAdditonal = [...addtionalJobcodes]

                tempAdditonal[0].rowData = jobcode
                jobcode.length != 0 && SetAddtionalJobcodes([tempAdditonal[0]])
            }
        }
        if (substageper < 100 && !discoveryloading) {
            router.push({
                pathname: `/discovery/labor/payroll/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData, discoveryloading])

    const handleNext = () => {
        setLoading("loading")
        let jsonData = [pay, overT, jobcode]
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Labor",
            json_data: jsonData
        })
            .unwrap()
            .then((res) => {
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        setTimeout(() => {
                            setLoading("confirm")
                            setTimeout(() => {
                                setLoading("")
                                router.push({
                                    pathname: `/discovery/financial/tax-rates/${routerID}`,
                                    query: { inner: true }
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Labor",
                            "Confirmation",
                            ["Disabled"],
                            null,
                            substageper,
                            discoveryper
                        )
                        dispatch(SetSideBarData(tempsidebar))
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => setLoading("error"))
            })
            .catch((err) => {
                console.error(err)
                setLoading("error")
            })
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                setLoading("")
                router.push({
                    pathname: `/discovery/financial/tax-rates/${routerID}`,
                    query: { inner: true }
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            {/* Payroll */}

            <ConfirmationTable
                marginToptitlemd="0px"
                firstItemIncluded={true}
                index={0}
                optionList={optionListPayroll}
                headerWidth="auto"
                cellWidth="191px"
                marginTopTitle="2px"
                marginTopTable={"17px"}
                fieldFontColor="#1e1e1e"
                disablebutton={confirmationdata[0] == "Disabled"}
                dataloading={dataloading}
                data={payrollData}
                type={["dropdown", "inputNumber", "inputNumber"]}
                setData={setPayrollData}
                title={"Payroll"}
                route={`/discovery/labor/payroll/${routerID}`}
            />
            <SecondConfirmation
                fontWeight={"600"}
                boxinnermargin={"14px"}
                inputPadding={"16px"}
                isArray={false}
                index={0}
                setData={setPayrollData}
                itemList={optionListPayroll}
                type={"dropdown"}
                marginTopTitle="1px"
                marginTopTable={"1px"}
                data={payrollData}
                title={"Payroll"}
                borderFull={true}
                disablebutton={confirmationdata[0] == "Disabled"}
                dataloading={dataloading}
                route={`/discovery/labor/payroll/${routerID}`}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            {/* Overtime */}
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: { xs: "24px", lg: "32px" },
                    display: { xs: "block", md: "none" }
                }}
            />
            <ConfirmationTable
                lineHeightmd="24px"
                firstItemIncluded={true}
                index={"1.0"}
                optionList={[
                    { label: "No", value: "No" },
                    { label: "Yes", value: "Yes" }
                ]}
                headerWidth="auto"
                cellWidth="191px"
                fullPadding={true}
                marginToptitlemd="31px"
                marginTopTitle="35px"
                marginTopTable={"17px"}
                data={overTimeData}
                setData={setOverTimeData}
                disablebutton={confirmationdata[0] == "Disabled"}
                dataloading={dataloading}
                title={"Overtime"}
                route={`/discovery/labor/overtime/${routerID}`}
            />
            <SecondConfirmation
                fontWeight={"600"}
                boxinnermargin={"14px"}
                isArray={false}
                itemList={[
                    { label: "No", value: "No" },
                    { label: "Yes", value: "Yes" }
                ]}
                index={"1.0"}
                setData={setOverTimeData}
                type="dropdown"
                marginTopTitle="24px"
                marginTopTable={"1px"}
                data={overTimeData}
                title={"Overtime"}
                name="Overtime"
                borderFull={true}
                disablebutton={confirmationdata[0] == "Disabled"}
                dataloading={dataloading}
                route={`/discovery/labor/overtime/${routerID}`}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
                inputPadding={"16px"}
            />
            {comment1[0]?.rowData[0] !== "" && (
                <>
                    <ConfirmationTable
                        lineHeightmd="24px"
                        firstItemIncluded={true}
                        index={"1.2"}
                        type="inputText"
                        headerWidth="197px"
                        setData={setComment1}
                        cellWidth="auto"
                        HeadersWidthxs={"180px"}
                        fieldFontColor="#1e1e1e"
                        fullPadding={true}
                        marginTopTitle=""
                        marginTopTablemd="14px"
                        marginTopTable={"16px"}
                        data={comment1}
                        title={""}
                        route={""}
                    />

                    <SecondConfirmation
                        fontWeight={"600"}
                        boxinnermargin={"14px"}
                        inputPadding={"16px"}
                        name="Overtime"
                        isArray={false}
                        index={"1.2"}
                        setData={setComment1}
                        type="text-area"
                        marginTopTitle="24px"
                        marginTopTable={"0px"}
                        data={comment1}
                        title={""}
                        borderFull={true}
                        route={""}
                        boxPadding={"16px 16px"}
                        innerboxpadding={"11.5px"}
                    />
                </>
            )}

            <SecondConfirmation
                fontWeight={"600"}
                boxinnermargin={"14px"}
                inputPadding={"16px"}
                name="Overtime"
                isArray={false}
                setData={setOverTimeData2}
                itemList={[
                    { label: "No", value: "No" },
                    { label: "Yes", value: "Yes" }
                ]}
                index={"1.1"}
                type="dropdown"
                marginTopTitle="32px"
                marginTopTable={"1px"}
                data={overTimeData2}
                title={""}
                borderFull={true}
                route={""}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />
            <ConfirmationTable
                lineHeightmd="24px"
                firstItemIncluded={true}
                setData={setOverTimeData2}
                index={"1.1"}
                optionList={[
                    { label: "No", value: "No" },
                    { label: "Yes", value: "Yes" }
                ]}
                headerWidth="auto"
                fullPadding={true}
                cellWidth="195px"
                marginTopTitle="32px"
                marginTopTable={"17px"}
                data={overTimeData2}
                title={""}
                route={""}
            />

            {comment2[0].rowData[0] !== "" && (
                <>
                    <ConfirmationTable
                        lineHeightmd="24px"
                        firstItemIncluded={true}
                        index={"1.3"}
                        type="inputText"
                        headerWidth="197px"
                        cellWidth="auto"
                        marginTopTitle=""
                        fullPadding={true}
                        fieldFontColor="#1e1e1e"
                        marginTopTable={"16px"}
                        data={comment2}
                        HeadersWidthxs={"180px"}
                        setData={setComment2}
                        title={""}
                        route={""}
                    />
                    <SecondConfirmation
                        fontWeight={"600"}
                        boxinnermargin={"14px"}
                        inputPadding={"16px"}
                        name="Overtime"
                        setData={setComment2}
                        isArray={false}
                        index={"1.3"}
                        type="text-area"
                        marginTopTitle="32px"
                        marginTopTable={"2px"}
                        data={comment2}
                        fullPadding={true}
                        title={""}
                        borderFull={true}
                        route={""}
                        boxPadding={"16px 16px"}
                        innerboxpadding={"11.5px"}
                    />
                </>
            )}

            <ConfirmationTable
                lineHeightmd="22.5px"
                firstItemIncluded={true}
                index={"1.4"}
                setData={setComment3}
                headerWidth="555px"
                type="inputText"
                cellWidth="auto"
                marginTopTitle=""
                fullPadding={true}
                fieldFontColor="#1e1e1e"
                marginTopTable={"16.5px"}
                data={comment3}
                HeadersWidthovertimemd={"433px"}
                title={""}
                route={""}
            />

            <SecondConfirmation
                fontWeight={"600"}
                boxinnermargin={"14px"}
                inputPadding={"16px"}
                name="Overtime"
                setData={setComment3}
                index={"1.4"}
                isArray={false}
                marginTopTitle="32px"
                type="text-area"
                marginTopTable={"2px"}
                data={comment3}
                title={""}
                borderFull={true}
                route={""}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            {/* Jobcodes */}
            {/* Overtime */}
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: { xs: "24px", lg: "32px" },
                    display: { xs: "none", md: "none" }
                }}
            />
            <ConfirmationIncludedItemTable
                marginTopTitlemd="35px"
                titleFont={"400"}
                title="Job Codes"
                route={`/discovery/labor/jobcodes/${routerID}`}
                disableButton={confirmationdata[0] == "Disabled"}
                dataloading={dataloading}
                marginTopTitle="37px"
                marginTopTable="17px"
                data={jobsCodes}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "215px",
                    xxl: "198px",
                    xl: "205px"
                }}
                boxWidth={{
                    lg: "12px 23px",
                    xs: "11px 24px",
                    xxl: "12px 24px"
                }}
            />
            <SecondConfirmation
                fontWeight={"600"}
                boxinnermargin="12px"
                index={""}
                marginTopTitle="24px"
                marginTopTable="9px"
                type="Not"
                data={jobsCodesResponsive}
                title={"Job Codes"}
                disablebutton={confirmationdata[0] == "Disabled"}
                dataloading={dataloading}
                route={`/discovery/labor/jobcodes/${routerID}`}
                boxPadding={"14px 16px"}
                innerboxpadding={"11.5px"}
            />
            {/* Addittional */}

            <ConfirmationIncludedItemTable
                titleFont={"400"}
                title=""
                type={"Additional"}
                marginTopTitle="32px"
                marginTopTable="14px"
                data={addtionalJobcodes}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "196px",
                    xl: "205px"
                }}
                boxWidth={{ lg: "12px 24px", xs: "11px 24px" }}
            />

            <SecondConfirmation
                fontWeight={"600"}
                marginTopTitle="32px"
                marginTopTable={"16px"}
                data={addtionalJobcodes}
                isArray={true}
                type={"add-item"}
                title={""}
                route={""}
                index={2}
                setData={SetAddtionalJobcodes}
                boxPadding={"9.5px 16px"}
                innerboxpadding={"11.5px"}
            />

            <Divider
                className="divider-col"
                style={{ width: "100%", marginTop: "32px" }}
            />

            <Box paddingY={"24px"} display="flex" justifyContent="flex-end">
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            md: "auto"
                        }
                    }}
                    display="flex"
                >
                    <CommonButton
                        className={"next-button"}
                        onclickHandler={handleNext}
                        ariaTag={"This is Confirm Button"}
                        variant={"contained"}
                        disabled={
                            confirmationdata[0] == "Disabled" ||
                            discoveryloading
                        }
                        width={{
                            xs: "100%",
                            md: 103
                        }}
                        px="24px"
                        py="12px"
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        hover="#062EC9"
                        content={"Confirm"}
                    />
                </Box>
            </Box>

            <ConfirmationNotification
                open={loading}
                title={"Labor"}
                close={() => handleClose()}
            />
        </Box>
    )
}
