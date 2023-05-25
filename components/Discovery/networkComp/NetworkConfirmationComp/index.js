import { Divider } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import ConfirmationTable from "../../../common/confirmationTable"
import FifthResponsiveTable from "../../../common/fifthTableResponsive"
import MulitipleHeaderTableDuplicate from "../../../common/MultipleHeaderDulplicate"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../../../redux-setup/api/data"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import CommonButton from "../../../common/CommonButton"

export default function Index() {
    const [actionstrigger] = useLazyActionsgetQuery()
    const [updatedata] = useUpdateDataMutation()
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [loading, setLoading] = useState("")
    const [dataloading, setDataloading] = useState(true)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const dispatch = useDispatch()
    const system = useSelector((state) => state.dataSlice.projectType)
    const { substageinnerstages, substageper } = getDiscoverySubStage(
        sideBarData,
        "Network",
        "Electrical, Network Wiring, and Internet Requirements",
        system
    )

    let sitenetworkindex = substageinnerstages.findIndex(
        (it) => it.name == "Network Management & Security"
    )
    let ncrmanageindex = substageinnerstages.findIndex(
        (it) => it.name == "NCR Managed Network With NSS"
    )
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let sitenetdata = { ...substageinnerstages[sitenetworkindex] }
    let ncrmanagedata = { ...substageinnerstages[ncrmanageindex] }
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        let tempQuestion = [...question]
        if (ncrmanagedata.data.length > 0) {
            setNcrmanagedata(ncrmanagedata.data)
            setDataloading(false)
        }
        if (
            sitenetdata.data.length > 0 &&
            sitenetdata.data[0].checked === true
        ) {
            tempQuestion[0].rowData = ["NCR Managed Network with NSS"]
            setQuestion(tempQuestion)
        } else {
            tempQuestion[0].rowData = [
                "Yes, another company will manage my network"
            ]
            setQuestion(tempQuestion)
            setDataloading(false)
        }
        if (substageper < 100 && !discoveryloading) {
            router.push({
                pathname: `/discovery/network/internet-requirements/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData,discoveryloading])
    const setNcrmanagedata = (data) => {
        let tempsite = [...websites]
        tempsite[0].rowData = data[0].websites?.rowData.map((it) => it[0])
        tempsite[1].rowData = data[0].websites?.rowData.map((it) => it[1])
        setWebsites(tempsite)
        let tempcontacts = [...contacts]
        tempcontacts[0].rowData = data[0].Contacts?.rowData.map((it) => it[0])
        tempcontacts[1].rowData = data[0].Contacts?.rowData.map((it) => it[1])
        tempcontacts[2].rowData = data[0].Contacts?.rowData.map((it) => it[2])
        tempcontacts[3].rowData = data[0].Contacts?.rowData.map((it) => it[3])
        setContacts(tempcontacts)
        let tempdevices = [...Devices]
        tempdevices[0].rowData = data[0].tableDevice?.map(
            (it) => it.device_Type
        )
        tempdevices[1].rowData = data[0].tableDevice?.map((it) => it.ip_address)
        tempdevices[2].rowData = data[0].tableDevice?.map((it) => it.static_ip)
        tempdevices[3].rowData = data[0].tableDevice?.map(
            (it) => it.ports_required
        )
        setDevices(tempdevices)
    }
    const router = useRouter()
    const routerID = router.query.id
    const [Devices, setDevices] = useState([
        {
            title: "Device Type",
            rowData: ["MAC"]
        },
        {
            title: "IP Address",
            rowData: ["246.66.132.114"]
        },
        {
            title: "Static or Dynamic IP",
            rowData: ["alejandra.name"]
        },
        {
            title: "Ports Required",
            rowData: ["Representative"]
        }
    ])

    const [question, setQuestion] = useState([
        {
            title: "How your network is managed",
            rowData: ["NCR Managed Network with NSS", "Other"]
        }
    ])
    const [websites, setWebsites] = useState([
        {
            title: "Website Name",
            rowData: ["Huawei Cloud"]
        },
        {
            title: "Website Address",
            rowData: ["http://juwan.biz"]
        }
    ])
    const [contacts, setContacts] = useState([
        {
            title: "IP Address",
            rowData: ["192.168.1.1"]
        },
        {
            title: "Subnet Mask",
            rowData: ["192.168.1.1"]
        },
        {
            title: "Gateway",
            rowData: ["192.168.1.1"]
        },
        {
            title: "DNS",
            rowData: ["192.168.1.1"]
        }
    ])
    const optionList = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
    ]
    const handleNext = () => {
        setLoading("loading")
        let jsonData = [[], sitenetdata.data, ncrmanagedata.data, []]
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Network",
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
                                    pathname: `/discovery/integrations/aloha-features/${routerID}`,
                                    query: { inner: true }
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Network",
                            "Confirmation",
                            ["Disabled"],
                            null,
                            substageper,
                            discoveryper,
                            system
                        )
                        dispatch(SetSideBarData(tempsidebar))
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => setLoading("error"))
            })
            .catch((err) => {
                console.error(err), setLoading("error")
            })
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                setLoading("")
                router.push({
                    pathname: `/discovery/integrations/aloha-features/${routerID}`,
                    query: { inner: true }
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }
    return (
        <Box width={"100%"} sx={{ mt: "2px" }}>
            <ConfirmationTable
                firstItemIncluded={true}
                index={0}
                optionList={optionList}
                headingColor="#5C5C5C"
                fieldFontColor="#1E1E1E"
                titleFontWeight={"600"}
                headerWidth="256px"
                cellWidth="auto"
                marginTopTitle={"0px"}
                marginTopTable={"16px"}
                data={question}
                disablebutton={disabled}
                dataloading={dataloading}
                setData={setQuestion}
                title={"Network Management & Security"}
                route={`/discovery/network/site-network/${routerID}`}
            />
            <SecondConfirmation
                name={"network"}
                isArray={false}
                index={0}
                setData={setQuestion}
                itemList={optionList}
                type="dropdown"
                marginTopTitle="-4.5px"
                marginTopTable={"-6px"}
                fontSize={"14px"}
                lineHeight={"22px"}
                fontWeight={"600"}
                data={question}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Network Management & Security"}
                route={`/discovery/network/site-network/${routerID}`}
                boxPadding={"15px 16px"}
                boxinnermargin={"13px"}
                innerboxpadding={"10.5px"}
                innerheadingpaddingTop={"0px"}
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

            {question[0].rowData[0] === "NCR Managed Network with NSS" ||
            question[0].rowData[0] === "No" ? (
                <>
                    {" "}
                    <MulitipleHeaderTableDuplicate
                        name="network"
                        index={"1.0"}
                        type={"dropdown"}
                        setData={setDevices}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        marginTopTitlemd={"40px"}
                        titleFontWeight={"600"}
                        fontSized={"12px"}
                        fontSize={"18px"}
                        lineHeight={"28px"}
                        fontWeight={"600"}
                        marginTopTitle="38px"
                        marginTopTable={"16px"}
                        data={Devices}
                        title={"NCR Managed Network with NSS"}
                        route={`/discovery/network/ncr-managed-network/${routerID}`}
                    />
                    <FifthResponsiveTable
                        name="network"
                        index={"1.0"}
                        setData={setDevices}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        isArray={false}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"600"}
                        fontSize={"18px"}
                        lineHeight={"28px"}
                        fontWeight={"600"}
                        headerWidth="auto"
                        cellWidth="191px"
                        marginTopTitle="40px"
                        marginTopTitlemd="25px"
                        marginTopTable={"21px"}
                        tablepadding={"12.7px 16px"}
                        data={Devices}
                        title={"NCR Managed Network with NSS"}
                        route={`/discovery/network/ncr-managed-network/${routerID}`}
                    />
                    {/* websites  */}
                    <MulitipleHeaderTableDuplicate
                        index={"1.1"}
                        setData={setWebsites}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"600"}
                        marginTopTablemd={"14px"}
                        fontSized={"12px"}
                        title={""}
                        marginTopTitle="0"
                        route={""}
                        marginTopTable={"14px"}
                        data={websites}
                    />
                    <FifthResponsiveTable
                        index={"1.1"}
                        setData={setWebsites}
                        isArray={false}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"600"}
                        headerWidth="auto"
                        cellWidth="191px"
                        marginTopTitle="0"
                        marginTopTable={"22px"}
                        tablepadding={"16px 16px"}
                        data={websites}
                        title={""}
                        route={""}
                    />
                    {/* contacts table  */}
                    <MulitipleHeaderTableDuplicate
                        index={"1.2"}
                        setData={setContacts}
                        headingColor="#5C5C5C"
                        marginTopTablemd={"13px"}
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"600"}
                        title={""}
                        fontSized={"12px"}
                        route={""}
                        marginTopTitle="0"
                        marginTopTable={"13px"}
                        data={contacts}
                    />
                    <FifthResponsiveTable
                        index={"1.2"}
                        setData={setContacts}
                        isArray={false}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"600"}
                        headerWidth="auto"
                        cellWidth="191px"
                        marginTopTitle="0"
                        marginTopTable={"22px"}
                        tablepadding={"16px 16px"}
                        data={contacts}
                        title={""}
                        route={""}
                    />
                    <Divider
                        className="divider-col"
                        sx={{
                            width: "100%",
                            marginTop: { md: "30px", xs: "22px" }
                        }}
                    />
                </>
            ) : null}

            <Box
                sx={{ py: { md: 6, xs: 5.5 } }}
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
                        width={{
                            xs: "100%",
                            md: 103
                        }}
                        px="24px"
                        py="12px"
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        disabled={disabled || discoveryloading}
                        fontWeight="600"
                        hover="#062EC9"
                        content={"Confirm"}
                    />
                </Box>
            </Box>
            {loading && (
                <ConfirmationNotification
                    open={loading}
                    title={"Network"}
                    close={() => handleClose()}
                />
            )}
        </Box>
    )
}
