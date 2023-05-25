import { Divider, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import ConfirmationTable from "../../../common/confirmationTable"
import SecondConfirmation from "../../../common/secondConfirmationResponsive"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
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
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import CommonButton from "../../../common/CommonButton"
export const IntegrationConfirmationComp = () => {
    const [loading, setLoading] = useState("")
    const [updatedata] = useUpdateDataMutation()
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const dispatch = useDispatch()
    const system = useSelector((state) => state.dataSlice.projectType)
    const { substageper, substageinnerstages } = getDiscoverySubStage(
        sideBarData,
        "Integrations",
        "Confirmation",
        system
    )
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    let inner1data = substageinnerstages.find(
        (it) => it.name == "Aloha Essentials Features"
    ).data

    let inner2data = substageinnerstages.find(
        (it) => it.name == "Partnership & Integration"
    ).data

    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [actionstrigger] = useLazyActionsgetQuery()
    const [disabled, setDisable] = useState(false)
    const [dataloading, setDataloading] = useState(true)
    const router = useRouter()
    const routerID = router.query.id
    const [AlohaFeaturesState] = useState([
        {
            title: `NCR offers a wide variety of features that extend the Aloha software in critical business areas.  Do you currently use or plan to use any additional Aloha services with your Aloha system?`,
            rowData: ["Yes"]
        }
    ])

    const [AlohaFeatures, setAlohaFeatures] = useState([
        {
            title: `Do you currently use or plan to use <a>Real-Time Analytics App</a> with your Aloha system?`,
            rowData: ["No"]
        },
        {
            title: "Do you currently use or plan to use <a> Online Ordering</a> with your Aloha system?",
            rowData: ["No"]
        },
        {
            title: "Do you currently use or plan to use  <a>Insight Reporting</a> with your Aloha system?",
            rowData: ["No"]
        },
        {
            title: "Do you currently use or plan to use <a>Basic Loyalty</a> with your Aloha system?",
            rowData: ["No"]
        },
        {
            title: "Do you currently use or plan to use <a>Gift Cards</a> with your Aloha system?",
            rowData: ["Yes"]
        },
        {
            title: "Do you currently use or plan to use <a>Aloha Takeout</a> with your Aloha system?",
            rowData: ["No"]
        },
        {
            title: "Do you currently use or plan to use <a>Mobile Payment</a> with your Aloha system?",
            rowData: ["No"]
        },
        {
            title: "Do you currently use or plan to use <a>Property Management Integration</a> with your Aloha system?",
            rowData: ["Yes"]
        }
    ])

    const [alohaStoredValueData, setAlohaStoredValueData] = useState([
        {
            title: "Would you like to have your current Gift Cards converted to be used with Aloha?",
            rowData: ["No"]
        },
        {
            title: "Do you currently use a 3rd Party Gift Card Processor?",
            rowData: ["No"]
        }
    ])
    // Property Management Integration Data
    const [alohaPropertyManagementData, setAlohaPropertyManagementData] =
        useState([
            {
                title: "PMS Company Name",
                rowData: ["AlphaSquad"]
            },
            {
                title: "PMS Connection Type",
                rowData: ["TCP/IP"]
            },
            {
                title: "IP Address of PMS Server",
                rowData: ["192.168.1.1"]
            },
            {
                title: "Port Number to match PMS Server",
                rowData: ["192.168.1.1"]
            }
        ])
    const [
        alohaPropertyManagementCommentData,
        setalohaPropertyManagementCommentData
    ] = useState([
        {
            title: "Comments",
            rowData: ["None"]
        }
    ])
    // Partnerships & Integrations Data
    const [
        partnershipsAndIntegrationsData,
        setPartnershipsAndIntegrationsData
    ] = useState([
        {
            title: "Do you have any partners that provide Customer Facing solutions such as Web Ordering, To Go & Delivery Services, Customer Loyalty or Gift Cards:",
            rowData: ["Yes"]
        },
        {
            title: "Do you have any partners that provide Employee Facing solutions such as Reporting Scheduling, Inventory",
            rowData: ["Yes"]
        }
    ])
    // Customer Facing Partner Integrations
    const [customer, setCustomer] = useState([
        [
            {
                title: "Will you use any Partners that add Web Ordering capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Web Ordering Partners",
                rowData: ["Chowly, OLO"]
            }
        ],
        [
            {
                title: "Will you use any Partners that add Delivery capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Delivery Partners",
                rowData: ["Chowly, OLO"]
            }
        ],
        [
            {
                title: "Will you use any Partners that add Take Out or To/Go capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Take Out or To/Go Partners",
                rowData: ["Chowly, OLO"]
            }
        ],
        [
            {
                title: "Will you use any Partners that add Customer Loyalty capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Customer Loyalty Partners",
                rowData: ["Chowly, OLO"]
            }
        ],
        [
            {
                title: "Will you use any Partners that add Gift Card capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Gift Card Partners",
                rowData: ["Chowly, OLO"]
            }
        ]
    ])
    // Employee Facing Partner Integrations
    const [employee, setEmployee] = useState([
        [
            {
                title: "Will you use any Partners that add <a>Scheduling</a> capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Scheduling Partners",
                rowData: ["Chowly, OLO"]
            }
        ],
        [
            {
                title: "Will you use any Partners that add <a>Inventory</a> capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Inventory Partners",
                rowData: ["Chowly, OLO"]
            }
        ],
        [
            {
                title: "Will you use any Partners that add <a>Reporting</a> capabilities to the Aloha System?",
                rowData: ["Yes"]
            },
            {
                title: "Please list your Reporting Partners",
                rowData: ["Chowly, OLO"]
            }
        ]
    ])

    const optionList = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
    ]

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (inner1data[0] && inner1data[0].length != 0) {
            const tempData = inner1data.map((item) => ({ ...item }))
            const tempQues = [...AlohaFeatures]
            const tempalohaStoredValueData = [...alohaStoredValueData]
            const tempalohaPropertyManagementData = [
                ...alohaPropertyManagementData
            ]
            const tempalohaPropertyManagementCommentData = [
                ...alohaPropertyManagementCommentData
            ]
            tempQues.forEach((item, i) => {
                item.rowData = [tempData[i].value]
                if (
                    tempData[i].name == "Gift Cards" &&
                    tempData[i].value == "Yes"
                ) {
                    const _tempData = tempData[i].Aloha_Gift_Cards_Data
                    tempalohaStoredValueData[0].rowData = [_tempData[0].value]
                    tempalohaStoredValueData[1].rowData = [_tempData[1].value]
                } else if (
                    tempData[i].name == "Property Management Integration" &&
                    tempData[i].value == "Yes"
                ) {
                    const _tempData1 =
                        tempData[i].Aloha_Property_Management_Data
                    tempalohaPropertyManagementData[0].rowData = [
                        _tempData1[0].value
                    ]
                    tempalohaPropertyManagementData[1].rowData = [
                        _tempData1[1].value
                    ]
                    setAlohaPropertyManagementData([
                        tempalohaPropertyManagementData[0],
                        tempalohaPropertyManagementData[1]
                    ])
                    if (_tempData1[1].value == "TCP/IP") {
                        const _tempData1 =
                            tempData[i].Aloha_Property_Management_Data
                        tempalohaPropertyManagementData.map((item, i) => {
                            item.rowData = [_tempData1[i].value]
                        })
                        setAlohaPropertyManagementData([
                            ...tempalohaPropertyManagementData
                        ])
                    }
                    tempalohaPropertyManagementCommentData[0].rowData = [
                        _tempData1[4]?.value
                    ]
                    setalohaPropertyManagementCommentData(
                        tempalohaPropertyManagementCommentData
                    )
                }
            })
            setAlohaStoredValueData(tempalohaStoredValueData)
            setAlohaFeatures(tempQues)
            setDataloading(false)
        }
        if (inner2data[0] && inner2data[0].length != 0) {
            const tempPartnershipsAndIntegrationsData = [
                ...partnershipsAndIntegrationsData
            ]
            tempPartnershipsAndIntegrationsData[0].rowData = [
                inner2data[0].customerFacingPartner
            ]
            tempPartnershipsAndIntegrationsData[1].rowData = [
                inner2data[0].employeeFacingPartner
            ]

            setPartnershipsAndIntegrationsData(
                tempPartnershipsAndIntegrationsData
            )
            if (inner2data[0].customerFacingPartner === "Yes") {
                const tempCustomer = inner2data[0].customerData.map((item) => ({
                    ...item
                }))
                const _tempCustomer = [...customer]
                _tempCustomer.map((item, i) => {
                    item[0].rowData = [tempCustomer[i].value]
                    item[1].rowData = [tempCustomer[i].selected.toString()]
                })
                setCustomer(_tempCustomer)
            }

            if (inner2data[0].employeeFacingPartner === "Yes") {
                const tempEmployee = inner2data[0].employeeData.map((item) => ({
                    ...item
                }))
                const _tempEmployeee = [...employee]
                _tempEmployeee.map((item, i) => {
                    item[0].rowData = [tempEmployee[i].value]
                    item[1].rowData = [tempEmployee[i].selected.toString()]
                })
                setEmployee(_tempEmployeee)
            }
            setDataloading(false)
        }
        if (substageper < 100 && !discoveryloading) {
            router.push({
                pathname: `/discovery/integrations/aloha-features/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData, discoveryloading])
    const handleNext = () => {
        setLoading("loading")
        let jsonData = [inner1data, inner2data]
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Integrations",
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
                                    pathname: `/actions/${routerID}`
                                })
                            }, 2000)
                        }, 2000)
                        let discoveryper = res.data.actions.find(
                            (it) => it.task_name == "Review Project Info for Discovery"
                        )?.percent_complete
                        let tempsidebar = dispatchDiscoveryData(
                            sideBarData,
                            "Integrations",
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
                    pathname: `/actions/${routerID}`
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }
    const custLG = useMediaQuery("(min-width:1151px)")

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
            marginTop={"2px"}
        >
            <ConfirmationTable
                type="dropdown"
                index={1}
                optionList={optionList}
                setData={setAlohaFeatures}
                disablebutton={disabled}
                dataloading={dataloading}
                firstItemIncluded={true}
                headerWidth="auto"
                cellWidth={{ lg: "195px", md: "196px" }}
                titleFontWeight="400"
                lineHeight={"21.015px"}
                headingColor="#1E1E1E"
                cellPadding={{ lg: "16px 15px", md: "27px 16px" }}
                lowpadding={true}
                highpadding={true}
                marginTopTitle={"0px"}
                marginToptitlemd={"-2px"}
                marginTopTable={"17.4px"}
                fullPadding={true}
                data={
                    AlohaFeaturesState[0].rowData[0] == "No"
                        ? AlohaFeaturesState
                        : AlohaFeatures
                }
                border={true}
                title={"Aloha Essentials Features"}
                alohaClr={"#5c5c5c"}
                capitalizeProps={"capitalize"}
                route={`/discovery/integrations/aloha-features/${routerID}`}
                letterSpacing={"0"}
            />

            <SecondConfirmation
                setData={setAlohaFeatures}
                isArray={false}
                itemList={optionList}
                index={1}
                type="dropdown"
                disablebutton={disabled}
                dataloading={dataloading}
                marginTopTitle="-1px"
                marginTopTable={"0px"}
                data={
                    AlohaFeaturesState[0].rowData[0] == "No"
                        ? AlohaFeaturesState
                        : AlohaFeatures
                }
                title={"Aloha Essentials Features"}
                route={`/discovery/integrations/aloha-features/${routerID}`}
                boxPadding={"14px 16px 16px 16px"}
                boxinnermargin={"17px"}
                innerheadingpaddingTop={"2px"}
                innerboxpadding={"11.5px"}
                inputPadding={"12px 14px"}
                lineHeight={"22px"}
            />

            {/* Gift Cards Table */}

            {AlohaFeatures[4].rowData[0] == "Yes" && (
                <>
                    <ConfirmationTable
                        type="dropdown"
                        index={0}
                        optionList={optionList}
                        firstItemIncluded={true}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"400"}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        headerWidth="auto"
                        cellWidth="195px"
                        marginTopTitle="33.5px"
                        marginTopTable={"15.5px"}
                        marginToptitlemd={"33px"}
                        cellPadding={{ lg: "16px 15px", md: "14px 17px" }}
                        fullPadding={true}
                        letterSpacing={"0"}
                        data={alohaStoredValueData}
                        setData={setAlohaStoredValueData}
                        title={"Gift Cards"}
                        route={`/discovery/integrations/aloha-features/${routerID}`}
                    />

                    <SecondConfirmation
                        itemList={optionList}
                        index={0}
                        setData={setAlohaStoredValueData}
                        isArray={false}
                        type="dropdown"
                        disablebutton={disabled}
                        dataloading={dataloading}
                        marginTopTitle="20px"
                        marginTopTable={"-4px"}
                        maxWidth={"175px"}
                        fullWidth={"100%"}
                        alignItems={"center"}
                        data={alohaStoredValueData}
                        title={"Gift Cards"}
                        route={`/discovery/integrations/aloha-features/${routerID}`}
                        boxPadding={"16px 16px"}
                        boxinnermargin={"16px"}
                        innerboxpadding={"11.5px"}
                        inputPadding={"13px 14px"}
                    />
                </>
            )}

            {/* Property Management Integration */}

            {AlohaFeatures[7].rowData[0] == "Yes" && (
                <>
                    {" "}
                    <ConfirmationTable
                        type="dropdown"
                        index={1}
                        optionList={optionList}
                        setData={setAlohaPropertyManagementData}
                        firstItemIncluded={true}
                        headerWidth="auto"
                        cellWidth={{ lg: "195px", md: "196px" }}
                        titleFontWeight="400"
                        disablebutton={disabled}
                        dataloading={dataloading}
                        lineHeight={"21.015px"}
                        headingColor="#1E1E1E"
                        cellPadding={{ lg: "17px 15px", md: "17px 17px" }}
                        lowpadding={true}
                        highpadding={true}
                        marginTopTitle={"33px"}
                        marginTopTable={"18px"}
                        fullPadding={true}
                        letterSpacing={"0"}
                        data={alohaPropertyManagementData}
                        title={"Property Management Integration"}
                        route={`/discovery/integrations/aloha-features/${routerID}`}
                    />
                    <SecondConfirmation
                        itemList={optionList}
                        setData={setAlohaPropertyManagementData}
                        index={1}
                        isArray={false}
                        type="dropdown"
                        marginTopTitle="20px"
                        disablebutton={disabled}
                        dataloading={dataloading}
                        marginTopTable={"-4px"}
                        maxWidth={"165px"}
                        fullWidth={"100%"}
                        alignItems={"center"}
                        data={alohaPropertyManagementData}
                        title={"Property Management Integration"}
                        boxPadding={"16px 16px"}
                        boxinnermargin={"16px"}
                        innerboxpadding={"11.5px"}
                        route={`/discovery/integrations/aloha-features/${routerID}`}
                        inputPadding={"13px 14px"}
                        s
                    />
                    <ConfirmationTable
                        type="dropdown"
                        index={1}
                        optionList={optionList}
                        firstItemIncluded={true}
                        setData={setalohaPropertyManagementCommentData}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"400"}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        headerWidth={custLG ? "256px" : "192px"}
                        cellWidth="auto"
                        marginTopTitle="36px"
                        marginTopTable={"14px"}
                        lineHeight={"24px"}
                        data={alohaPropertyManagementCommentData}
                        title={""}
                        route={`/discovery/integrations/aloha-features/${routerID}`}
                    />
                    <SecondConfirmation
                        itemList={optionList}
                        setData={setalohaPropertyManagementCommentData}
                        index={1}
                        isArray={false}
                        type="dropdown"
                        marginTopTable={"0px"}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        data={alohaPropertyManagementCommentData}
                        title={""}
                        boxPadding={"17px 16px"}
                        innerboxpadding={"0px"}
                        lineHeight={"17px"}
                        route={`/discovery/integrations/aloha-features/${routerID}`}
                        innerheadingpaddingTop={"1px"}
                        inputPadding={"14px 14px"}
                    />
                </>
            )}

            {/* Partnerships & Integrations Table */}

            <ConfirmationTable
                type="dropdown"
                index={1}
                optionList={optionList}
                firstItemIncluded={true}
                setData={setPartnershipsAndIntegrationsData}
                headingColor="#5C5C5C"
                fieldFontColor="#1E1E1E"
                titleFontWeight={"400"}
                headerWidth="auto"
                cellWidth={{ lg: "195px", md: "196px" }}
                marginTopTitle="34px"
                marginToptitlemd={"33px"}
                marginTopTable={"16px"}
                cellPadding={{ lg: "14px 15px", md: "14px 17px" }}
                letterSpacing={"0"}
                fullPadding={true}
                lineHeight={"22px"}
                capitalizeProps={"capitalize"}
                data={partnershipsAndIntegrationsData}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Partnership & Integration"}
                route={`/discovery/integrations/partnerships-integrations/${routerID}`}
            />
            <SecondConfirmation
                itemList={optionList}
                setData={setPartnershipsAndIntegrationsData}
                index={1}
                isArray={false}
                type="dropdown"
                marginTopTitle="20px"
                marginTopTable={"-3px"}
                data={partnershipsAndIntegrationsData}
                maxWidth={"161px"}
                fullWidth={"100%"}
                alignItems={"center"}
                disablebutton={disabled}
                dataloading={dataloading}
                title={"Partnership & Integration"}
                route={`/discovery/integrations/partnerships-integrations/${routerID}`}
                boxPadding={"15px 16px 16px 16px"}
                innerheadingpaddingTop={"0.3px"}
                inputPadding={"15px 14px"}
                boxinnermargin={"16px"}
                lineHeight={"22px"}
                innerboxpadding={"20px"}
            />

            {customer.map((item, i) => {
                return (
                    <React.Fragment key={i}>
                        <ConfirmationTable
                            type="dropdown"
                            index={2}
                            setData={setCustomer}
                            optionList={optionList}
                            firstItemIncluded={true}
                            headingColor="#5C5C5C"
                            fieldFontColor="#1E1E1E"
                            titleFontWeight={"400"}
                            headerWidth="auto"
                            cellWidth="195px"
                            marginTopTitle="34px"
                            cellPadding={{ lg: "16px 15px", md: "16px 17px" }}
                            marginToptitlemd={"32px"}
                            marginTopTable={"16px"}
                            marginTopTablelg={"16px"}
                            letterSpacing={"0"}
                            disablebutton={disabled}
                            dataloading={dataloading}
                            capitalizeProps={"capitalize"}
                            fullPadding={true}
                            data={item}
                            title={
                                i == 0
                                    ? "Customer Facing Partner Integrations"
                                    : ""
                            }
                            route={`/discovery/integrations/partnerships-integrations/${routerID}`}
                        />
                        <SecondConfirmation
                            itemList={optionList}
                            setData={setCustomer}
                            index={2}
                            isArray={false}
                            type="dropdown"
                            marginTopTitle="20px"
                            marginTopTable={"-4px"}
                            maxWidth={"215px"}
                            fullWidth={"100%"}
                            alignItems={"center"}
                            data={item}
                            disablebutton={disabled}
                            dataloading={dataloading}
                            title={
                                i == 0
                                    ? "Customer Facing Partner Integrations"
                                    : ""
                            }
                            route={`/discovery/integrations/partnerships-integrations/${routerID}`}
                            boxPadding={"16px 16px"}
                            boxinnermargin={"16px"}
                            innerboxpadding={"11.5px"}
                            inputPadding={"13px 14px"}
                        />
                    </React.Fragment>
                )
            })}
            {/* Employee Integrations Tables */}
            {employee.map((item, i) => (
                <React.Fragment key={i}>
                    <ConfirmationTable
                        type="dropdown"
                        index={3}
                        setData={setEmployee}
                        optionList={optionList}
                        firstItemIncluded={true}
                        headingColor="#5C5C5C"
                        capitalizeProps={"capitalize"}
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"400"}
                        headerWidth="auto"
                        cellWidth="195px"
                        cellPadding={{ lg: "16px 15px", md: "17px 17px" }}
                        marginTopTitle="34px"
                        marginToptitlemd={"32px"}
                        marginTopTable={"16.2px"}
                        letterSpacing={"0"}
                        fullPadding={true}
                        data={item}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        title={
                            i == 0 ? "Employee Facing Partner Integrations" : ""
                        }
                        route={`/discovery/integrations/partnerships-integrations/${routerID}`}
                    />
                    <SecondConfirmation
                        index={3}
                        setData={setEmployee}
                        isArray={false}
                        itemList={optionList}
                        type="dropdown"
                        marginTopTitle="20px"
                        marginTopTable={"-4px"}
                        maxWidth={"213px"}
                        fullWidth={"100%"}
                        alignItems={"center"}
                        data={item}
                        disablebutton={disabled}
                        dataloading={dataloading}
                        title={
                            i == 0 ? "Employee Facing Partner Integrations" : ""
                        }
                        route={`/discovery/integrations/partnerships-integrations/${routerID}`}
                        boxPadding={"16px 16px"}
                        boxinnermargin={"16px"}
                        innerboxpadding={"11.5px"}
                        inputPadding={"13px 14px"}
                    />
                </React.Fragment>
            ))}

            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: {
                        xl: "32px",
                        lg: "31px",
                        md: "22px",
                        xs: "23px"
                    }
                }}
            />

            <Box sx={{ py: 5.5 }} display="flex" justifyContent="flex-end">
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
                        fontWeight="600"
                        disabled={disabled || discoveryloading}
                        hover="#062EC9"
                        content={"Confirm"}
                    />
                </Box>
            </Box>
            {loading && (
                <ConfirmationNotification
                    open={loading}
                    title={"Integrations"}
                    close={() => handleClose()}
                />
            )}
        </Box>
    )
}
