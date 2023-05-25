import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import ConfirmationTable from "../../../common/confirmationTable"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
import ConfirmationIncludedItemTable from "../../../common/confirmationIncludedItemTable"
import MulitipleHeaderTableDuplicate from "../../../common/MultipleHeaderDulplicate"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import FourthTableResponsive from "../../../common/fourthResponsiveTable"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../../../redux-setup/api/data"
import { dispatchDiscoveryData } from "../../../../helper/Constraints"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import CommonButton from "../../../common/CommonButton"
export default function OperationConfirmationComp() {
    const [loading, setLoading] = useState("")
    const [dataloading, setDataloading] = useState(true)
    const [updatedata] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    let discoveryindex = sideBarData.findIndex((it) => it.name == "Discovery")
    let discoverysubstages = [...sideBarData[discoveryindex].subStages]
    let currentsubstageindex = discoverysubstages.findIndex(
        (it) => it.name == "Operations"
    )
    let currentsubstagedata = { ...discoverysubstages[currentsubstageindex] }
    let currentinnerstages = [...currentsubstagedata.subStages]
    let routingindex = currentinnerstages.findIndex(
        (it) => it.name == "Printer Routing"
    )
    let groupsindex = currentinnerstages.findIndex(
        (it) => it.name == "Printer Groups"
    )
    let seatnumberindex = currentinnerstages.findIndex(
        (it) => it.name == "Ordering Process"
    )
    let printernamesindex = currentinnerstages.findIndex(
        (it) => it.name == "Prep Printer Names"
    )
    let confirmationdata = currentinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    const routingdata = currentinnerstages[routingindex].data
    const printernamesdata = currentinnerstages[printernamesindex].data
    const groupsdata = currentinnerstages[groupsindex].data
    const seatnumberdata = currentinnerstages[seatnumberindex].data

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (routingdata.length > 0) {
            routingdataset()
            setDataloading(false)
        }
        if (seatnumberdata.length > 0) {
            seatdataset()
            setDataloading(false)
        }
        if (groupsdata.length > 0) {
            groupdataset()
            setDataloading(false)
        }
        if (printernamesdata.length > 0) {
            setprinternames()
            setDataloading(false)
        }
        if (currentsubstagedata.percentage < 100 && !discoveryloading) {
            router.push({
                pathname: `/discovery/operations/ordering-process/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData, discoveryloading])
    const setprinternames = () => {
        let temp = [...addtionalPrinterNameData]
        temp[0].rowData = printernamesdata
        setAddtionalPrinterNameData(temp)
    }
    const groupdataset = () => {
        let temp = [...addtionalPrinterGroups]
        temp[0].rowData = groupsdata
        SetAddtionalPrinterGroups(temp)
    }
    const routingdataset = () => {
        let temp = [...printerRoutes]
        temp[0].rowData = (routingdata[0]?.addtionalPrinterGroup.length &&
            routingdata[0].addtionalPrinterGroup.map(
                (item) => item[0].Value
            )) || ["N/A"]
        temp[1].rowData = (routingdata[0]?.addtionalPrinterGroup.length &&
            routingdata[0].addtionalPrinterGroup.map(
                (item) => item[1].Value
            )) || ["N/A"]
        if (routingdata[0].comment) {
            let tempcom = [...comment]
            tempcom[0].rowData = [routingdata[0].comment]
            SetComment(tempcom)
        }
        setPrinterRoutes(temp)
    }

    const seatdataset = () => {
        let temp = [...seatNumbersData]

        temp[0].rowData = [seatnumberdata[0].value]
        temp[1].rowData = [seatnumberdata[1].value]
        temp[2].rowData = [seatnumberdata[2].value]
    }
    const dispatch = useDispatch()
    const router = useRouter()
    const routerID = router.query.id
    const [printerRoutes, setPrinterRoutes] = useState([
        {
            title: "Menu Category",
            rowData: ["Grill & Expo1", "Grill & Expo2", "Grill & Expo3"],
            editable: true
        },
        {
            title: "Printer Groups",
            rowData: ["Fry & Expo", "Fry & Expo", "Fry & Expo"],
            editable: true
        }
    ])
    const [seatNumbersData, SetSeatNumbersData] = useState([
        {
            title: "Should servers have access to other servers' orders?",
            rowData: ["No"],
            editable: true
        },
        {
            title: "Should bartenders have access to other bartenders' orders?",
            rowData: ["No"],
            editable: true
        },
        {
            title: "Do you use Pivot Seating?",
            rowData: ["I don’t know"],
            editable: true
        }
    ])
    const [addtionalPrinterNameData, setAddtionalPrinterNameData] = useState([
        {
            title: "Prep Printer Names",
            rowData: ["N/A"],
            discription:
                "Please list short descriptive names for the physical bar/kitchen printers. Please see the example in the left column below.",
            editable: true
        }
    ])
    const [addtionalPrinterGroups, SetAddtionalPrinterGroups] = useState([
        {
            title: "Additional Printer Groups",
            rowData: ["N/A"],
            discription:
                "Printer Groups all for items to print at multiple locations, if necessary. Please see the example in the left 2 columns below.",
            editable: true
        }
    ])
    const [includedprinters] = useState({
        title: "Included Printer Groups",
        rowData: [["Grill & Expo", "Fry & Expo", "Grill, Fry & Expo"]]
    })
    const [comment, SetComment] = useState([
        {
            title: "Comment ",
            rowData: ["N/A"],
            editable: false
        }
    ])

    const options = [
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" }
    ]
    const handleNext = () => {
        setLoading("loading")
        let jsonData = [
            seatnumberdata,
            printernamesdata,
            groupsdata,
            routingdata
        ]
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Operation",
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
                                    pathname: `/discovery/network/internet-requirements/${routerID}`,
                                    query: { inner: true }
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Operations",
                            "Confirmation",
                            ["Disabled"],
                            null,
                            currentsubstagedata.percentage,
                            discoveryper
                        )
                        dispatch(SetSideBarData(tempsidebar))
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => setLoading("error"))
                setDisable(true)
            })
            .catch((err) => {
                setLoading("error")
                console.error(err)
            })
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                setLoading("")
                router.push({
                    pathname: `/discovery/network/internet-requirements/${routerID}`,
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
            <ConfirmationTable
                boxShadow={"inset 0px -1px 0px #FFFFFF"}
                type="dropdown"
                index={0}
                firstItemIncluded={true}
                headerWidth="auto"
                cellWidth={{ lg: "195px", md: "191px" }}
                marginTopTitle={"0px"}
                marginTopTable={"17.4px"}
                lineHeight="21.7px"
                headingColor="#1E1E1E"
                cellPadding={{ lg: "14px 15px", md: "14px 17px" }}
                optionList={options}
                slice={{ start: 0, end: 4 }}
                fieldFontColor="#1E1E1E"
                marginToptitlemd={"1px"}
                titleFontWeight={"600"}
                data={seatNumbersData}
                setData={SetSeatNumbersData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Ordering Process"}
                route={`/discovery/operations/ordering-process/${routerID}`}
            />

            <SecondConfirmation
                isArray={false}
                index={0}
                type="dropdown"
                marginTopTitle="0px"
                marginTopTable={"3px"}
                maxWidth={"190px"}
                fullWidth={"100%"}
                alignItems={"center"}
                fontSize={"16px"}
                lineHeight={"22px"}
                inputPadding={"15px 16px"}
                boxPadding={"15px 15px"}
                boxinnermargin={"17px"}
                innerboxpadding={"11.5px 16px"}
                setData={SetSeatNumbersData}
                fontWeight={"600"}
                data={seatNumbersData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Ordering Process"}
                route={`/discovery/operations/ordering-process/${routerID}`}
            />

            <Divider
                className="divider-col"
                style={{ width: "100%", marginTop: "25px" }}
                sx={{
                    display: {
                        sm: "block",
                        md: "none"
                    }
                }}
            />
            <SecondConfirmation
                isArray={false}
                index={0}
                type="dropdown"
                marginTopTitle="25px"
                marginTopTable={"1px"}
                maxWidth={"200px"}
                fullWidth={"100%"}
                alignItems={"center"}
                fontSize={"16px"}
                lineHeight={"22px"}
                inputPadding={"15px 16px"}
                fontWeight={"600"}
                boxPadding={"14.4px 15px"}
                boxinnermargin={"17px"}
                innerboxpadding={"11.5px 16px"}
                data={addtionalPrinterNameData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Prep Printer Names"}
                route={`/discovery/operations/printer-names/${routerID}`}
            />

            <ConfirmationIncludedItemTable
                titleFont={"400"}
                marginTopTitlemd={"36px"}
                type={"Additional"}
                title={"Prep Printer Names"}
                marginTopTitle="36px"
                marginTopTable="17px"
                data={addtionalPrinterNameData}
                disableButton={disabled}
                dataloading={dataloading}
                route={`/discovery/operations/printer-names/${routerID}`}
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
            />
            <ConfirmationIncludedItemTable
                titleFont={"400"}
                route={`/discovery/operations/printer-groups/${routerID}`}
                disableButton={disabled}
                dataloading={dataloading}
                marginTopTitle="37px"
                marginTopTitlemd={"36px"}
                marginTopTable="16px"
                data={includedprinters}
                title={"Printer Groups"}
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
            />

            <ConfirmationIncludedItemTable
                titleFont={"600"}
                title={""}
                route={`/discovery/operations/printer-groups/${routerID}`}
                disableButton={disabled}
                dataloading={dataloading}
                type={"Additional"}
                marginTopTitle="37px"
                marginTopTable="14px"
                data={addtionalPrinterGroups}
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
                setData={SetAddtionalPrinterGroups}
                type="Not"
                marginTopTitle="40px"
                marginTopTable={"16px"}
                data={addtionalPrinterGroups}
                title={"Printer Groups"}
                disablebutton={disabled}
                dataloading={dataloading}
                route={`/discovery/operations/printer-groups/${routerID}`}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />

            <MulitipleHeaderTableDuplicate
                index={"1.0"}
                type={"dropdown"}
                setData={setPrinterRoutes}
                headingColor="#5C5C5C"
                fieldFontColor="#1E1E1E"
                titleFontWeight={"600"}
                marginTopTitle="36px"
                marginTopTable={"17px"}
                data={printerRoutes}
                printer={true}
                title={"Printer Routing"}
                disablebutton={disabled}
                dataloading={dataloading}
                route={`/discovery/operations/printer-routing/${routerID}`}
            />

            <FourthTableResponsive
                setData={setPrinterRoutes}
                index={0}
                marginTopTitle={"40px"}
                marginTopTable={"16px"}
                type="Not"
                data={printerRoutes}
                title={"Printer Routing"}
                disablebutton={disabled}
                dataloading={dataloading}
                route={`/discovery/operations/printer-routing/${routerID}`}
            />

            <ConfirmationTable
                firstItemIncluded={true}
                index={"3.2c"}
                setData={SetComment}
                headingColor="#5C5C5C"
                fieldFontColor="#1E1E1E"
                border={true}
                headerWidth="180px"
                cellWidth="auto"
                marginTopTitle=""
                marginTopTable={"16px"}
                data={comment}
                title={""}
                route={""}
            />
     
            <SecondConfirmation
                fontWeight={"600"}
                isArray={false}
                index={"3.2c"}
                setData={SetComment}
                type="text-area"
                marginTopTitle="32px"
                marginTopTable={"16px"}
                data={comment}
                title={""}
                borderFull={true}
                route={""}
                boxPadding={"16px 16px"}
                innerboxpadding={"11.5px"}
            />
            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: "32px" }}
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
                        hover="#062EC9"
                        content={"Confirm"}
                    />
                </Box>
            </Box>
            <ConfirmationNotification
                open={loading}
                title={"Operations"}
                close={() => handleClose()}
            />
        </Box>
    )
}
