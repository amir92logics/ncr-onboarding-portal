import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import ConfirmationTable from "../common/confirmationTable"
import SecondConfirmation from "../common/secondConfirmationResponsive"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import CommonButton from "../common/CommonButton"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../redux-setup/api/data"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../helper/Constraints"
import {
    SetTasks,
    SetSideBarData,
    SetSubTasks
} from "../../redux-setup/dataSlice"
import ConfirmationNotification from "../common/ConfirmationNotification"
export default function ReviewProject() {
    const [loading, setLoading] = useState("")
    const [dataloading, setDataloading] = useState(true)
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const [updatedata] = useUpdateDataMutation()
    const dispatch = useDispatch()
    const [actionstrigger] = useLazyActionsgetQuery()
    const { substageinnerstages } = getDiscoverySubStage(
        sideBarData,
        "Back Office Computer & Printer",
        "Back Office Computer & Printer",
        true
    )
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    let bocdata = substageinnerstages.find(
        (it) => it.name == "Back Office Computer & Printer"
    )
    let confirmation = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data

    const [bodummydata, setbodummyData] = useState([
        {
            rowData: ["N/A"],
            title: "1. Where is your current back office computer located?"
        },
        {
            rowData: ["N/A"],
            title: "2. How is your current back office monitor configured?"
        },
        {
            rowData: ["N/A"],
            title: "3. Does your computer use a device to share your keyboard, monitor, and/or mouse? (KVM or KVMP)"
        },
        {
            rowData: ["N/A"],
            title: `4. Please specify the make and model of your printer.`
        },
        {
            rowData: ["N/A"],
            title: `5. How will your office printer connect to your Aloha system? (NCR recommends a USB cable connection to your Aloha back-of-house server)`
        },
        {
            rowData: ["N/A"],
            title: `6. Please provide the IP address of your printer.`
        }
    ])

    const [disbaleReviewSubmit, setDisbaleReviewSubmit] = useState(false)
    useEffect(() => {
        const filteredData = bocdata.data.filter(
            (item) => item.rowData[0] !== ""
        )
        confirmation[0] == "Disabled" && setDisbaleReviewSubmit(true)
        {
            bocdata.data.length > 0 &&
                (setbodummyData(filteredData), setDataloading(false))
        }
        if (bocdata.percentage < 100 && !discoveryloading) {
            router.push({
                pathname: `/discovery/back-office-computer-&-printer/back-office-computer-&-printer/${routerID}`,
                query: { inner: true }
            })
        }
    }, [sideBarData, discoveryloading])
    const router = useRouter()
    const routerID = router.query.id
    const postData = () => {
        setLoading("loading")
        updatedata({
            record_id_quickbase: routerID,
            task_name: "Back Office Computer",
            json_data: [bocdata.data]
        })
            .unwrap()
            .then((res) => {
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        if (!res.isError) {
                            setTimeout(() => {
                                setTimeout(() => {
                                    setLoading("")
                                    router.push({
                                        pathname: `/discovery/network/internet-requirements/${routerID}`,
                                        query: { inner: true }
                                    })
                                }, 2000)
                                setLoading("confirm")
                            }, 2000)
                            let discoveryper = res.data.actions?.find(
                                (it) =>
                                    it.task_name == "Review Project Info for Discovery"
                            )?.percent_complete
                            let tempsidebar = dispatchDiscoveryData(
                                sideBarData,
                                "Back Office Computer & Printer",
                                "Confirmation",
                                ["Disabled"],
                                null,
                                bocdata.percentage,
                                discoveryper,
                                true
                            )
                            dispatch(SetSideBarData(tempsidebar))
                            dispatch(SetTasks(res.data.actions))
                            dispatch(SetSubTasks(res.data.sub_tasks))
                        } else {
                            setLoading("error")
                        }
                    })
            })
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setLoading("")
            router.push({
                pathname: `/discovery/network/internet-requirements/${routerID}`,
                query: { inner: true }
            })
        } else if (loading == "error") {
            setLoading("")
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            width="100%"
        >
            <Box
                sx={{
                    width: {
                        xs: "100%"
                    }
                }}
            >
                <Box>
                    <ConfirmationTable
                        firstItemIncluded={true}
                        index={0}
                        Discovery={"system-refresh"}
                        slice={{ start: 0, end: 4 }}
                        headingColor="#5C5C5C"
                        fieldFontColor="#1E1E1E"
                        titleFontWeight={"400"}
                        headerWidth="auto"
                        cellWidth="191px"
                        marginTopTitle="0px"
                        marginTopTable={"17px"}
                        data={bodummydata}
                        disablebutton={disbaleReviewSubmit}
                        dataloading={dataloading}
                        title={"Back Office Computer & Printer"}
                        route={`/discovery/back-office-computer-&-printer/back-office-computer-&-printer/${routerID}`}
                    />

                    <SecondConfirmation
                        isArray={false}
                        index={0}
                        type={"dropdown"}
                        disablebutton={disbaleReviewSubmit}
                        dataloading={dataloading}
                        marginTopTitle="0px"
                        marginTopTable={"16px"}
                        data={bodummydata}
                        title={"Back Office Computer & Printer"}
                        borderFull={true}
                        check={false}
                        route={`/discovery/back-office-computer-&-printer/back-office-computer-&-printer/${routerID}`}
                        boxPadding={"16px 16px"}
                        innerboxpadding={"11.5px"}
                    />
                </Box>{" "}
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: { lg: 7.7, md: 8, xs: 6 }
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: { md: "row", xs: "column" },
                        py: { xxl: 6, xl: 6, lg: 6, xs: 5 }
                    }}
                >
                    <CommonButton
                        className={"next-button"}
                        onclickHandler={postData}
                        variant={"contained"}
                        disabled={disbaleReviewSubmit || discoveryloading}
                        px={"20px"}
                        py={{ xs: "12px" }}
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        width={{
                            xs: "100%",
                            md: "103px"
                        }}
                        content={"Confirm"}
                        mt={{ xs: "8px", md: "3px", lg: "0" }}
                    />
                </Box>
            </Box>
            <ConfirmationNotification
                open={loading}
                title={"Back Office Computer & Printer"}
                close={() => handleClose()}
            />
        </Box>
    )
}
