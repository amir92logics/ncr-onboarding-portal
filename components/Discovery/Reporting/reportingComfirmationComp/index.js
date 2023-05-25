import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import ConfirmationIncludedItemTable from "../../../common/confirmationIncludedItemTable"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
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
import { dispatchDiscoveryData } from "../../../../helper/Constraints"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
export default function ReportingComfirmationComp() {
    const [loading, setLoading] = useState("")
    const [dataloading, setDataloading] = useState(true)
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [updatedata] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const dispatch = useDispatch()
    const router = useRouter()
    const routerID = router.query.id
    const [includedSalesCategoriesData] = useState({
        title: "Sales Categories",
        rowData: [["Food", "Bevs", "Liquor", "Bear", "Wine", "Retail"]]
    })
    const [includedSalesCategoriesDataResp] = useState([
        {
            title: "Sales Categories",
            rowData: ["Food", "Bevs", "Liquor", "Wine", "Retail", "Bear"]
        }
    ])

    const [addtionalSalesCategoriesData, SetAddtionalSalesCategoriesData] =
        useState([
            {
                title: "Additional Sales Categories",
                rowData: ["N/A"],
                discription:
                    "General Categories allow for tracking specific items in your system. The left column below is what is included with your Aloha Database.        "
            }
        ])

    const [includedGeneralCategories] = useState({
        title: "General Categories",
        rowData: [["All Items", "All Alcohol", "Carryover Items", "Pizza"]]
    })

    const [includedGeneralCategoriesResp] = useState([
        {
            title: "General Categories",
            rowData: ["All Items", "All Alcohol", "Carryover Items", "Pizza"]
        }
    ])

    const [addtionalGeneralCategories, SetAddtionalGeneralCategories] =
        useState([
            {
                title: "Additional General Categories",
                rowData: ["N/A"],
                discription:
                    "General Categories allow for tracking specific items in your system. The left column below is what is included with your Aloha Database"
            }
        ])

    let discoveryindex = sideBarData.findIndex((it) => it.name == "Discovery")
    let discoverysubstages = [...sideBarData[discoveryindex].subStages]
    let reportingIndex = discoverysubstages.findIndex(
        (it) => it.name == "Reporting"
    )
    const getStagename = () => {
        let reportingSubs = [...discoverysubstages[reportingIndex].subStages]
        return reportingSubs
    }
    let confirmationdata = getStagename().find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    const getSalesData = () => {
        let salesIndex = getStagename().findIndex(
            (it) => it.name == "Sales and Retail Categories"
        )
        let salesdata = [...getStagename()[salesIndex].data]
        return salesdata
    }
    const getGeneralData = () => {
        let generalIndex = getStagename().findIndex(
            (it) => it.name == "General Categories"
        )
        let generaldata = [...getStagename()[generalIndex].data]
        return generaldata
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        SetAddtionalSalesCategoriesData([
            { ...addtionalSalesCategoriesData[0], rowData: [...getSalesData()] }
        ])
        SetAddtionalGeneralCategories([
            { ...addtionalGeneralCategories[0], rowData: [...getGeneralData()] }
        ])
        if (typeof window !== "undefined") {
            setDataloading(false)
        }
        if (
            discoverysubstages[reportingIndex]?.percentage < 100 &&
            !discoveryloading
        ) {
            router.push({
                pathname: `/discovery/reporting/salesretailcatg/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData, discoveryloading])
    const handleNext = () => {
        setLoading("loading")
        let jsonData = [getSalesData(), getGeneralData()]
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Reporting",
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
                                    pathname: `/discovery/operations/ordering-process/${routerID}`,
                                    query: { inner: true }
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Reporting",
                            "Confirmation",
                            ["Disabled"],
                            null,
                            sideBarData[discoveryindex].subStages[
                                reportingIndex
                            ].percentage,
                            discoveryper
                        )
                        dispatch(SetSideBarData(tempsidebar))
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => {
                        setLoading("error")
                    })
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
                    pathname: `/discovery/operations/ordering-process/${routerID}`,
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
            <ConfirmationIncludedItemTable
                titleFont={"#5C5C5C"}
                itemFont="#1E1E1E"
                marginTopTitle="4px"
                marginTopTablemd={"18px"}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "197px",
                    xl: "205px"
                }}
                boxWidth={{
                    md: "11px 23.47px",
                    lg: "12px 23.47px",
                    xs: "11px 24px",
                    xl: "12px 23.47px"
                }}
                marginTopTable={"17px"}
                marginTopTitlemd={"5px"}
                marginTopTitlexs={"-3px"}
                data={includedSalesCategoriesData}
                disableButton={disabled}
                dataloading={dataloading}
                title={"Sales Categories"}
                route={`/discovery/reporting/salesretailcatg/${routerID}`}
            />
            <SecondConfirmation
                index={""}
                marginTopTitle="0px"
                marginTopTable={"0px"}
                boxPadding={"12px 16px"}
                innerheadingpaddingTop={"4px"}
                boxinnermargin={"16px"}
                innerboxpadding={"11.5px"}
                fontSize={"16px"}
                lineHeight={"24px"}
                fontWeight={"600"}
                type="Not"
                disablebutton={disabled}
                dataloading={dataloading}
                data={includedSalesCategoriesDataResp}
                title={"Sales Categories"}
                route={`/discovery/reporting/salesretailcatg/${routerID}`}
            />

            <ConfirmationIncludedItemTable
                titleFont={"#5C5C5C"}
                itemFont="#1E1E1E"
                marginTopTitle="40px"
                marginTopTitlemd="40px"
                marginTopTable={"13px"}
                marginTopTablemd={"14px"}
                boxWidth={{ lg: "12px 24px", xs: "11px 24px" }}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "196px",
                    xl: "205px"
                }}
                type={"Additional"}
                data={addtionalSalesCategoriesData}
                title={""}
            />
            <SecondConfirmation
                isArray={false}
                index={0}
                setData={SetAddtionalSalesCategoriesData}
                type="add-item"
                marginTopTitle="2px"
                marginTopTable={"0px"}
                boxPadding={"14px 16px"}
                innerheadingpaddingTop={"4px"}
                boxinnermargin={"16px"}
                innerboxpadding={"11.5px"}
                fontSize={"16px"}
                lineHeight={"24px"}
                fontWeight={"600"}
                data={addtionalSalesCategoriesData}
                title={""}
                route={""}
            />
            <Divider
                className="divider-col"
                style={{ width: "100%", marginTop: "32px" }}
                sx={{
                    display: {
                        sm: "none",
                        md: "none"
                    }
                }}
            />

            <ConfirmationIncludedItemTable
                titleFont={"#5C5C5C"}
                itemFont="#1E1E1E"
                marginTopTitle="36px"
                marginTopTablemd={"18px"}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "197px",
                    xl: "202px"
                }}
                boxWidth={{
                    md: "11px 23.47px",
                    lg: "12px 23.47px",
                    xs: "11px 24px",
                    xl: "12px 23.47px"
                }}
                marginTopTable={"17px"}
                marginTopTitlemd={"36px"}
                marginTopTitlexs={"-3px"}
                data={includedGeneralCategories}
                disableButton={disabled}
                dataloading={dataloading}
                title={"General Categories"}
                route={`/discovery/reporting/generalcatg/${routerID}`}
            />
            <SecondConfirmation
                index={""}
                marginTopTitle="24px"
                marginTopTable={"0px"}
                boxPadding={"12px 16px"}
                innerheadingpaddingTop={"6px"}
                innerboxpadding={"11.5px"}
                boxinnermargin={"16px"}
                fontSize={"16px"}
                lineHeight={"24px"}
                fontWeight={"600"}
                type="Not"
                data={includedGeneralCategoriesResp}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"General Categories"}
                route={`/discovery/reporting/generalcatg/${routerID}`}
            />

            <ConfirmationIncludedItemTable
                titleFont={"#5C5C5C"}
                itemFont="#1E1E1E"
                marginTopTitle="40px"
                marginTopTablemd={"17px"}
                marginTopTable={"13px"}
                boxWidth={{ lg: "12px 24px", xs: "11px 24px" }}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "196px",
                    xl: "205px"
                }}
                type={"Additional"}
                data={addtionalGeneralCategories}
                title={""}
            />
            <SecondConfirmation
                isArray={false}
                type="add-item"
                index={1}
                setData={SetAddtionalGeneralCategories}
                marginTopTitle="0px"
                marginTopTable={"0px"}
                innerboxpadding={"13px"}
                boxPadding={"16px 16px"}
                fontSize={"16px"}
                lineHeight={"24px"}
                fontWeight={"600"}
                data={addtionalGeneralCategories}
                title={""}
                route={""}
            />

            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: { xs: "24px", md: "31px", lg: "33px" }
                }}
            />

            <Box
                sx={{ py: { md: 5.5, xs: 5.5 } }}
                display="flex"
                justifyContent="flex-end"
            >
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
                        disabled={disabled || discoveryloading}
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
                        content={"Confirm"}
                    />
                </Box>
            </Box>
            <ConfirmationNotification
                open={loading}
                title={"Reporting"}
                close={() => handleClose()}
            />
        </Box>
    )
}
