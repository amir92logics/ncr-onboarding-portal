import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
import ConfirmationIncludedItemTable from "../../../common/confirmationIncludedItemTable"
import FourthTableResponsive from "../../../common/fourthResponsiveTable"
import ConfirmationTable from "../../../common/confirmationTable"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import CommonButton from "../../../common/CommonButton"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../../../redux-setup/api/data"
import HourOfOperationConfirmationTable from "../../../common/HourOfOperationConfirmationTable"
import CompsMobile from "../../../common/CompsMobile"
import { dispatchDiscoveryData } from "../../../../helper/Constraints"

export default function FinancialComfirmationComp() {
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [updatedata] = useUpdateDataMutation()
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const [loading, setLoading] = useState(false)
    const [dataloading, setDataloading] = useState(true)
    const [actionstrigger] = useLazyActionsgetQuery()
    const dispatch = useDispatch()
    const router = useRouter()
    const routerID = router.query.id
    let discoveryindex = sideBarData.findIndex((it) => it.name == "Discovery")
    let discoverydata = { ...sideBarData[discoveryindex] }
    let discoverysubstages = [...discoverydata.subStages]
    let currentsubstageindex = discoverysubstages.findIndex(
        (it) => it.name == "Financial"
    )
    let currentsubstagedata = { ...discoverysubstages[currentsubstageindex] }
    let currentinnerstages = [...currentsubstagedata.subStages]
    let pettycashdata = currentinnerstages.find(
        (ite) => ite.name == "Petty Cash"
    )
    let taxratedata = currentinnerstages.find((ite) => ite.name == "Tax Rates")
    let voidreasondata = currentinnerstages.find(
        (ite) => ite.name == "Void Reasons"
    )
    let compsdata = currentinnerstages.find((ite) => ite.name == "Comps")
    let confirmationdata = currentinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    const getData = () => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (taxratedata.data.length > 0) {
            taxratedata.data[0].comment &&
                setCommentData([
                    {
                        title: "Comment",
                        rowData: [taxratedata.data[0].comment]
                    }
                ])
            let temp = [...taxRatesData]
            temp[1].rowData = taxratedata.data[0].taxfields.map((it) =>
                it.value ? it.value + "%" : "-"
            )
            setTaxRatesData(temp)
            if (taxratedata.data[0]?.additionalFields?.length > 0) {
                let temp2 = [...addtionalTaxRatesData]

                temp2[0].rowData = taxratedata.data[0].additionalFields.map(
                    (it) => it[0].Value
                )
                temp2[1].rowData = taxratedata.data[0].additionalFields.map(
                    (it) => it[1].Value + "%"
                )
                setAddtionalTaxRatesData(temp2)
            }
        }
        if (compsdata.data.length > 0) {
            let temp = [
                ...compsdata.data[0].compsData,
                ...compsdata.data[0].additonalCards
            ]

            setCompsData(temp)
        }
        if (voidreasondata.data.length > 0) {
            let temp = [...addtionalincludedVoidReasons]
            temp[0].rowData = voidreasondata.data[0].additionalvoiddata || [
                "N/A"
            ]
            SetAddtionalincludedVoidReasons(temp)
        }
        if (pettycashdata.data.length > 0) {
            let temp = [...addtionalPettyCashData]
            temp[0].rowData = pettycashdata.data[0].additionalpettycash || [
                "N/A"
            ]
            SetAddtionalPettyCashData(temp)
        }
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            getData()
            setDataloading(false)
            if (currentsubstagedata?.percentage < 100 && !discoveryloading) {
                router.push({
                    pathname: `/discovery/financial/tax-rates/${routerID}`,
                    query: { inner: true }
                })
            }
        }
    }, [sideBarData, discoveryloading])

    const [taxRatesData, setTaxRatesData] = useState([
        {
            title: "Included Tax Rates",
            rowData: ["Food", "Liquor", "Beer", "Wine", "Retail"]
        },
        {
            title: "Tax % Amount",
            rowData: ["-", "-", "-", "-", "-"]
        }
    ])

    const [addtionalTaxRatesData, setAddtionalTaxRatesData] = useState([
        {
            title: "Addition Tax Rates",
            rowData: ["N/A"]
        },
        {
            title: "Tax % Amount",
            rowData: ["N/A"]
        }
    ])

    const [compsData, setCompsData] = useState([
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for $ Amount",
            amountDeducted: "-"
        }
    ])
    const [includedVoidReasonsData] = useState([
        {
            title: "Included Void Reasons",
            rowData: [
                [
                    "86’d",
                    "Wrong Button",
                    "Testing",
                    "Bar Waste",
                    "Food Waste",
                    "Cancel",
                    "Future"
                ]
            ]
        }
    ])
    const [includedVoidReasonsDataresponsive] = useState([
        {
            title: "Included Void Reasons",
            rowData: [
                "86’d",
                "Wrong Button",
                "Testing",
                "Bar Waste",
                "Food Waste",
                "Cancel",
                "Future"
            ]
        }
    ])

    const [addtionalincludedVoidReasons, SetAddtionalincludedVoidReasons] =
        useState([
            {
                title: "Additional Void Reasons",
                rowData: ["N/A"],
                discription:
                    "Voids allow for complete removal or deletion of an item from a check. Typically, voids are items that were never prepared in the kitchen"
            }
        ])

    const [includedPettyCashData] = useState({
        title: "Included Petty Cash Accounts",
        rowData: [
            [
                "Drawer In",
                "Tips Paid ",
                "Tips Paid In",
                "Grocery ",
                "Office Supplies",
                "Restaurant Supplies",
                "Janitorial Supplies ",
                "Miscellaneous In",
                "Miscellaneous Out"
            ]
        ]
    })
    const [includedPettyCashDataResponsive] = useState([
        {
            title: "Included Petty Cash Accounts",
            rowData: [
                "Drawer In",
                "Tips Paid ",
                "Tips Paid In",
                "Grocery ",
                "Office Supplies",
                "Restaurant Supplies",
                "Janitorial Supplies ",
                "Miscellaneous In",
                "Miscellaneous Out"
            ]
        }
    ])

    const [addtionalPettyCashData, SetAddtionalPettyCashData] = useState([
        {
            title: "Additional Petty Cash Accounts",
            rowData: ["N/A"],
            discription:
                "Petty Cash Accounts allow Aloha to track small restaurant expenses or income. Below is what is included with your Aloha Database."
        }
    ])
    const [commentData, setCommentData] = useState([
        {
            title: "Comment",
            rowData: ["N/A"]
        }
    ])

    const handleSubmit = () => {
        setLoading("loading")
        let jsonData = [
            taxratedata.data,
            compsdata.data,
            voidreasondata.data,
            pettycashdata.data
        ]

        updatedata({
            record_id_quickbase: routerID,
            task_name: "Financial",
            json_data: jsonData
        })
            .unwrap()
            .then((res) => {
                setDisable(true)
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        setTimeout(() => {
                            setLoading("confirm")
                            setTimeout(() => {
                                setLoading("")
                                router.push({
                                    pathname: `/discovery/reporting/salesretailcatg/${routerID}`,
                                    query: { inner: true }
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Financial",
                            "Confirmation",
                            ["Disabled"],
                            null,
                            currentsubstagedata.percentage,
                            discoveryper
                        )
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                        dispatch(SetSideBarData(tempsidebar))
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
                    pathname: `/discovery/reporting/salesretailcatg/${routerID}`,
                    query: { inner: true }
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }

    return (
        <Box
            sx={{
                px: { xs: "16px", md: "24px", lg: "32px", xl: "0px" }
            }}
        >
            {/* Tax Rates */}
            <ConfirmationTable
                type={"inputNumber"}
                setData={setTaxRatesData}
                index={0}
                fieldFontColor="#1E1E1E"
                titleFontWeight={"600"}
                headerWidth="197px"
                cellWidth="auto"
                marginTopTitle={"17px"}
                marginTopTable={"16px"}
                data={taxRatesData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Tax Rates"}
                route={`/discovery/financial/tax-rates/${routerID}`}
            />

            <FourthTableResponsive
                setData={setTaxRatesData}
                index={0}
                marginTopTitle={"8px"}
                marginTopTable={"18px"}
                type="Not"
                data={taxRatesData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Tax Rates"}
                route={`/discovery/financial/tax-rates/${routerID}`}
            />

            <ConfirmationTable
                firstItemIncluded={true}
                type={"inputText"}
                setData={setCommentData}
                index={0.5}
                fieldFontColor="#1E1E1E"
                titleFontWeight={"600"}
                headerWidth="197px"
                cellWidth="auto"
                marginTopTitle="0px"
                marginTopTable={"15px"}
                data={commentData}
                title={""}
                route={""}
            />

            <SecondConfirmation
                fontWeight="600"
                isArray={false}
                index={0.5}
                setData={setCommentData}
                type="text-area"
                marginTopTitle="32px"
                marginTopTable={"0px"}
                data={commentData}
                title={""}
                name={"tax-rates-comment"}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            <ConfirmationTable
                firstItemIncluded={true}
                type={"inputText"}
                setData={setAddtionalTaxRatesData}
                index={0.7}
                fieldFontColor="#1E1E1E"
                titleFontWeight={"600"}
                headerWidth="195px"
                cellWidth="auto"
                marginTopTitle={"0px"}
                marginTopTable={"14px"}
                data={addtionalTaxRatesData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={""}
                route={`/discovery/financial/tax-rates/${routerID}`}
            />
            <FourthTableResponsive
                setData={setAddtionalTaxRatesData}
                index={0.7}
                marginTopTitle="0px"
                marginTopTable={"14px"}
                data={addtionalTaxRatesData}
                title={""}
                type={"add-item"}
                route={""}
                firstItemIncluded={true}
            />

            {/* Comps */}
            <Divider
                className="divider-col"
                sx={{
                    display: {
                        sm: "block",
                        md: "none"
                    },
                    width: "100%",
                    marginTop: { md: "32px", xs: "18px" }
                }}
            />

            <HourOfOperationConfirmationTable
                index={0}
                slice={{ start: 0, end: 8 }}
                comps={true}
                headerWidth="195px"
                cellWidth="auto"
                border={" "}
                marginTopTitle={"31px"}
                extraPad={0.65}
                marginTopTable={"17px"}
                fieldFontColor="#1E1E1E"
                titleFontWeight={"400"}
                disableButton={disabled}
                dataloading={dataloading}
                data={compsData}
                title={"Comps"}
                route={`/discovery/financial/comps/${routerID}`}
                screenSize={"(width:100%)"}
                MinScreenSize={"(max-width:1600px)"}
                type={"time"}
            />
            <CompsMobile
                marginTopTitle={"32px"}
                route={`/discovery/financial/comps/${routerID}`}
                title={"Comps"}
                disablebutton={disabled}
                dataloading={dataloading}
                data={compsData}
            />

            <Divider
                className="divider-col"
                style={{ width: "100%", marginTop: "25px" }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    }
                }}
            />

            <ConfirmationIncludedItemTable
                marginTopTitle="35px"
                marginTopTitlemd="32px"
                marginTopTable={{
                    xl: "15px",
                    lg: "24px",
                    md: "16px",
                    xs: "16px"
                }}
                data={includedVoidReasonsData[0]}
                disableButton={disabled}
                dataloading={dataloading}
                title={"Void Reasons"}
                route={`/discovery/financial/void-reasons/${routerID}`}
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
                index={""}
                setData={(data) => { }}
                type="Not"
                marginTopTitle="24px"
                marginTopTable={"0px"}
                disablebutton={disabled}
                dataloading={dataloading}
                data={includedVoidReasonsDataresponsive}
                title={"Void Reasons"}
                route={`/discovery/financial/void-reasons/${routerID}`}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
                lineHeight={"18px"}
                fontWeight={"600"}
            />

            <ConfirmationIncludedItemTable
                marginTopTitle="32px"
                marginTopTitlemd="32px"
                marginTopTable={"13px"}
                data={addtionalincludedVoidReasons}
                type={"Additional"}
                title={""}
                disableButton={disabled}
                dataloading={dataloading}
                route={`/discovery/financial/void-reasons/${routerID}`}
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
                isArray={false}
                index={2}
                setData={SetAddtionalincludedVoidReasons}
                name={"additional void"}
                marginTopTitle={"40px"}
                marginTopTable={"0px"}
                type={"add-item"}
                data={addtionalincludedVoidReasons}
                title={""}
                route={""}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            <ConfirmationIncludedItemTable
                marginTopTitle="36px"
                marginTopTitlemd="32px"
                marginTopTable={{ xl: "16px", lg: "24px", xs: "16px" }}
                data={includedPettyCashData}
                title={"Petty Cash Accounts"}
                disableButton={disabled}
                dataloading={dataloading}
                route={`/discovery/financial/petty-cash/${routerID}`}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "196px",
                    xl: "205px"
                }}
                boxWidth={{ lg: "12px 24px", xs: "11px 24px" }}
            />
            <Divider
                className="divider-col"
                style={{ width: "100%", marginTop: "31px" }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    }
                }}
            />
            <SecondConfirmation
                fontWeight={"600"}
                name={"petty-cash"}
                index={""}
                setData={(data) => { }}
                marginTopTitle={"32px"}
                marginTopTable={"0px"}
                disablebutton={disabled}
                dataloading={dataloading}
                type="Not"
                data={includedPettyCashDataResponsive}
                title={"Petty Cash Accounts"}
                route={`/discovery/financial/petty-cash/${routerID}`}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            <ConfirmationIncludedItemTable
                marginTopTitle="32px"
                marginTopTitlemd="32px"
                marginTopTable={"12px"}
                data={addtionalPettyCashData}
                disableButton={disabled}
                dataloading={dataloading}
                cellWidth={{
                    xs: "245px",
                    md: "240px",
                    lg: "210px",
                    xxl: "196px",
                    xl: "205px"
                }}
                type={"Additional"}
                title={""}
                route={`/discovery/financial/petty-cash/${routerID}`}
            />
            <SecondConfirmation
                fontWeight={"600"}
                name={"petty-cash-additional"}
                isArray={false}
                index={3}
                setData={SetAddtionalPettyCashData}
                type="add-item"
                marginTopTitle={"0px"}
                marginTopTable={"0px"}
                data={addtionalPettyCashData}
                title={""}
                route={""}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: { xl: "31px", lg: "31px", xs: "30px" }
                }}
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
                        onclickHandler={handleSubmit}
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
                title={"Financial"}
                close={() => handleClose()}
            />
        </Box>
    )
}
