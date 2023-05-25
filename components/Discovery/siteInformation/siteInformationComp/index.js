import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import {
    dispatchDiscoveryData,
    get24Hours
} from "../../../../helper/Constraints"
import ConfirmationTable from "../../../common/confirmationTable"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
import ConfirmationIncludedItemTable from "../../../common/confirmationIncludedItemTable"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import CommonButton from "../../../common/CommonButton"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../../../redux-setup/api/data"
import HourOfOperationConfirmationTable from "../../../common/HourOfOperationConfirmationTable"
import HourOfOperationResponsiveConfirmation from "../../../common/HourOfOperationResponsiveConfirmation"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
export default function SiteInformationComp() {
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const [loading, setLoading] = useState(false)
    const [actionstrigger] = useLazyActionsgetQuery()
    const [disabled, setDisable] = useState(false)
    const [dataloading, setDataloading] = useState(true)
    const [updatedata] = useUpdateDataMutation()
    const router = useRouter()
    const dispatch = useDispatch()
    const routerID = router.query.id
    const defaultData = [
        {
            day: "Monday",
            close: false,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        },
        {
            day: "Tuesday",
            close: false,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        },

        {
            day: "Wednesday",
            close: false,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        },
        {
            day: "Thursday",
            close: false,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        },
        {
            day: "Friday",
            close: false,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        },
        {
            day: "Saturday",
            close: true,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        },
        {
            day: "Sunday",
            close: true,
            everyTimeOpen: [""],
            openingTime: [""],
            closingTime: [""]
        }
    ]
    const [hoursOfOperation, setHoursOfOperation] = useState(defaultData)

    const [earliestTime, setEarliestTime] = useState([
        {
            title: "Earliest time any employee will be clocking into the system",
            rowData: ["22:12"]
        }
    ])

    const [revenueCenter] = useState([
        {
            title: "Included Revenue Centers",
            rowData: ["Food", "Bevs", "Liquor", "Wine", "Beer"]
        }
    ])
    const [addtionalRevenueCenter, setAdditionRevenue] = useState([
        {
            title: "Additional Revenue Center",
            rowData: [],
            discription:
                "A Revenue Center is a physical location within your business that collects revenue. Revenue Centers are created to summarize income from different sources in the restaurant."
        }
    ])

    const [daysParts, setDayParts] = useState([
        {
            title: "Included Day Parts",
            rowData: ["Breakfast", "Lunch", "Dinner", "Late Night"]
        },
        {
            title: "Start Time",
            rowData: ["", "", "", ""]
        }
    ])
    const [additonDayparts, setAdditonDayparts] = useState([
        {
            title: "Additional Day Parts",
            rowData: []
        },
        {
            title: "Start Time",
            rowData: []
        }
    ])
    const [commentData, setCommentData] = useState([
        {
            title: "Special Notes",
            rowData: ["N/A"]
        }
    ])

    const optionList = get24Hours()
    let discoveryindex = sideBarData.findIndex((it) => it.name == "Discovery")
    let discoverysubstages = [...sideBarData[discoveryindex].subStages]
    let siteinfoindex = discoverysubstages.findIndex(
        (it) => it.name == "Site Information"
    )
    let siteinfosubs = [...discoverysubstages[siteinfoindex].subStages]
    let confirmationdata = siteinfosubs.find(
        (it) => it.name == "Confirmation"
    ).data
    let hoursdata = siteinfosubs.find(
        (it) => it.name == "Hours of Operation"
    ).data
    let daypartdata = siteinfosubs.find((it) => it.name == "Day Parts").data
    let reveneuedata = siteinfosubs.find(
        (it) => it.name == "Revenue Centers"
    ).data
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        daypartdata[0]?.additionalDayparts.length > 0 &&
            setAdditonDayparts(daypartdata[0].additionalDayparts)
        daypartdata[0]?.dayparts.length > 0 &&
            (setDayParts(daypartdata[0].dayparts), setDataloading(false))
        hoursdata[0]?.notes &&
            setCommentData([
                { ...commentData[0], rowData: [hoursdata[0].notes] }
            ])
        hoursdata[0]?.earlyTime.value &&
            setEarliestTime([
                { ...earliestTime[0], rowData: [hoursdata[0].earlyTime.value] }
            ])
        setHoursOfOperation(hoursdata[0]?.hourData)
        reveneuedata.length > 0 && setAdditionRevenue(reveneuedata)
        if (
            discoverysubstages[siteinfoindex].percentage < 100 &&
            !discoveryloading
        ) {
            router.push({
                pathname: `/discovery/site-information/hours-of-operation/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData, discoveryloading])

    const handleNext = () => {
        let jsonData = [
            hoursdata,
            reveneuedata[0].rowData.length ? reveneuedata : [],
            daypartdata,
            [{ submit_date: new Date().toString() }]
        ]
        setLoading("loading")
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Site Information",
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
                                router.push({
                                    pathname: `/discovery/labor/payroll/${routerID}`,
                                    query: { inner: true }
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Site Information",
                            "Confirmation",
                            ["Disabled"],
                            null,
                            discoverysubstages[siteinfoindex].percentage,
                            discoveryper
                        )
                        dispatch(SetSideBarData(tempsidebar))
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((error) => setLoading("error"))
                setDisable(true)
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
                    pathname: `/discovery/labor/payroll/${routerID}`,
                    query: { inner: true }
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }

    return (
        <Box
            className="Overview-container"
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <>
                <HourOfOperationConfirmationTable
                    index={0}
                    optionList={optionList}
                    slice={{ start: 0, end: 8 }}
                    headerWidth="195px"
                    cellWidth="auto"
                    border={" "}
                    marginTopTitle={"1px"}
                    extraPad={0.65}
                    marginTopTable={"17px"}
                    fieldFontColor="#1E1E1E"
                    titleFontWeight={"400"}
                    setData={setHoursOfOperation}
                    data={hoursOfOperation}
                    disableButton={disabled}
                    dataloading={dataloading}
                    title={"Hours of Operation"}
                    route={`/discovery/site-information/hours-of-operation/${routerID}`}
                    screenSize={"(width:100%)"}
                    MinScreenSize={"(max-width:1600px)"}
                    type={"time"}
                />
                <HourOfOperationResponsiveConfirmation
                    index={0}
                    setData={setHoursOfOperation}
                    marginTopTitle={"0px"}
                    marginTopTable={"16px"}
                    data={hoursOfOperation}
                    optionList={optionList}
                    type="time"
                    disableButton={disabled}
                    dataloading={dataloading}
                    title={"Hours of Operation"}
                    route={`/discovery/site-information/hours-of-operation/${routerID}`}
                />
                <HourOfOperationResponsiveConfirmation
                    index={0}
                    setData={setEarliestTime}
                    marginTopTitle={"0px"}
                    marginTopTable={"16px"}
                    data={earliestTime}
                    optionList={optionList}
                    type="earliestTime"
                    title={""}
                    route={``}
                />
                <ConfirmationTable
                    firstItemIncluded={true}
                    index={1}
                    optionList={optionList}
                    headerWidth="auto"
                    cellWidth="195.5px"
                    cellpadding={""}
                    marginTopTitle="31px"
                    marginTopTable={"15px"}
                    data={earliestTime}
                    earliestPadding={"15.89px"}
                    setData={setEarliestTime}
                    titleFontWeight={"600"}
                    textFontSize={"14px"}
                    title={""}
                    route={""}
                />

                <ConfirmationTable
                    firstItemIncluded={true}
                    type={"inputText"}
                    setData={setCommentData}
                    index={0.5}
                    fieldFontColor="#1E1E1E"
                    titleFontWeight={"600"}
                    headerWidth="195px"
                    cellWidth="auto"
                    marginTopTitle="0px"
                    specialNotesDayParts={true}
                    marginTopTable={"16px"}
                    data={commentData}
                    title={""}
                    route={""}
                />

                <SecondConfirmation
                    fontWeight={"600"}
                    isArray={false}
                    index={0.5}
                    setData={setCommentData}
                    type="text-area"
                    marginTopTitle="32px"
                    marginTopTable={"2px"}
                    data={commentData}
                    title={""}
                    disablebutton={disabled}
                    dataloading={dataloading}
                    route={`/discovery/site-information/revenue-center/${routerID}`}
                    boxPadding={"16px 16px"}
                    innerboxpadding={"11.5px"}
                />
                {/* revenueCenter */}
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: "32px",
                        display: {
                            md: "none",
                            xs: "block"
                        }
                    }}
                />
                <SecondConfirmation
                    fontWeight={"600"}
                    index={1}
                    type="Not"
                    marginTopTitle={"30px"}
                    marginTopTable={"15px"}
                    data={revenueCenter}
                    title={"Revenue Centers"}
                    disablebutton={disabled}
                    dataloading={dataloading}
                    route={`/discovery/site-information/revenue-center/${routerID}`}
                    boxPadding={"16px 16px"}
                    innerboxpadding={"11.5px"}
                />

                <ConfirmationIncludedItemTable
                    titleFont={"400"}
                    type="Additional"
                    marginTopTitle="36.5px"
                    marginTopTable="25px"
                    PadingY={"14.5px"}
                    padLeft={"6.5px"}
                    mdMargin={{ mt: "34px", mb: "-3.7px" }}
                    disableButton={disabled}
                    dataloading={dataloading}
                    title={"Revenue Centers"}
                    route={`/discovery/site-information/revenue-center/${routerID}`}
                    data={revenueCenter}
                    cellWidth={{
                        xs: "245px",
                        md: "240px",
                        lg: "210px",
                        xxl: "196px",
                        xl: "205px"
                    }}
                    boxWidth={{ lg: "12px 24px", xs: "11px 24px" }}
                />

                <ConfirmationIncludedItemTable
                    titleFont={"400"}
                    title=""
                    type={"Additional"}
                    marginTopTitle="32px"
                    PadingY={"14.5px"}
                    padLeft={"6.5px"}
                    marginTopTable="12.5px"
                    data={addtionalRevenueCenter}
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
                    index={1}
                    setData={setAdditionRevenue}
                    marginTopTitle={"0px"}
                    type="add-item"
                    marginTopTable={"16px"}
                    data={addtionalRevenueCenter}
                    title={""}
                    route={""}
                    boxPadding={"16px 16px"}
                    innerboxpadding={"11.5px"}
                />

                {/* revenueCenter ended */}
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: "32px",
                        display: {
                            md: "none",
                            xs: "block"
                        }
                    }}
                />
                {/* dayparts */}
                <ConfirmationTable
                    optionList={optionList}
                    setData={setDayParts}
                    headerWidth="195px"
                    cellWidth={{ xl: "218px", lg: "163px", md: "107px" }}
                    marginTopTitle={"35px"}
                    marginTopTable={"16.3px"}
                    data={daysParts}
                    title={"Day Parts"}
                    marginMd={"33px"}
                    type="time"
                    fieldFontColor="#1E1E1E"
                    titleFontWeight={"600"}
                    fullPadding={"full"}
                    disablebutton={disabled}
                    dataloading={dataloading}
                    index={2}
                    route={`/discovery/site-information/day-parts/${routerID}`}
                />
                <HourOfOperationResponsiveConfirmation
                    index={0}
                    setData={setDayParts}
                    marginTopTitle={"32px"}
                    marginTopTable={"16px"}
                    data={daysParts}
                    optionList={optionList}
                    type="dropdown"
                    disableButton={disabled}
                    dataloading={dataloading}
                    title={"Day Parts"}
                    route={`/discovery/site-information/day-parts/${routerID}`}
                />

                {/* new table for addtional  */}
                {additonDayparts[0].rowData.length > 0 && (
                    <>
                        <ConfirmationTable
                            optionList={optionList}
                            setData={setDayParts}
                            headerWidth="195px"
                            cellWidth="auto"
                            marginTopTitle={"32px"}
                            marginTopTable={"16px"}
                            data={additonDayparts}
                            title={""}
                            type="time"
                            fieldFontColor="#1E1E1E"
                            titleFontWeight={"600"}
                            index={2}
                            disablebutton={disabled}
                            dataloading={dataloading}
                            route={`/discovery/site-information/day-parts/${routerID}`}
                        />
                        <HourOfOperationResponsiveConfirmation
                            index={2}
                            setData={setAdditonDayparts}
                            marginTopTitle={"40px"}
                            marginTopTable={"16px"}
                            data={additonDayparts}
                            optionList={optionList}
                            type="dropdown"
                            title={""}
                            disablebutton={disabled}
                            dataloading={dataloading}
                            route={`/discovery/site-information/day-parts/${routerID}`}
                        />
                    </>
                )}
            </>
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
                        onclickHandler={handleNext}
                        className={"next-button"}
                        ariaTag={"This is Confirm Button"}
                        variant={"contained"}
                        width={{
                            xs: "100%",
                            md: "103px"
                        }}
                        disabled={disabled || discoveryloading}
                        px={"20px"}
                        py={"12px"}
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
                title={"Site Information"}
                close={() => handleClose()}
            />
        </Box>
    )
}
