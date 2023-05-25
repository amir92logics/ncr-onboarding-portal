import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"
import AddNewItem from "../../../common/AddNewItem/AddNewItemDuplicate"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"

export default function PrinterNameComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Operations",
        "Prep Printer Names"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Printer Routing"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Ordering Process"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Printer Groups"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let initialData = currentstagedata.data
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            SetPrinterNames(initialData)
        }
    }, [sideBarData])
    const dispatch = useDispatch()
    const [printerName, SetPrinterNames] = useState([])
    const updateStore = (_tempPrinterName) => {
        let tempPercent = 100
        const siteinfodataper = Math.round(
            (tempPercent + inner2per + inner3per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Operations",
            "Prep Printer Names",
            _tempPrinterName,
            tempPercent,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const submitForm = () => {
        updateStore(printerName)
        router.push({
            pathname: `/discovery/operations/printer-groups/${routerID}`,
            query: { inner: true }
        })
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/operations/ordering-process/${routerID}`,
            query: { inner: true }
        })
    }
    const setData = (data) => {
        SetPrinterNames(data)
        updateStore(data)

    }
    return (
        <Box
            className="operations-set"
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Box
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        xs: "16px"
                    },
                    lineHeight: {
                        lg: "24px",
                        xs: "23.6px"
                    },
                    color: theme.palette.textColor.main,
                    width: "100%",
                    marginTop: { xl: "0px", lg: "0" }
                }}
            >
                Orders print to Prep Printers which are placed at various prep
                stations (Grill, Fryer, Bar, etc.). Please indicate the desired
                name of each Prep Printer.
            </Box>

            <AddNewItem
                disabled={disabled}
                setAdditonal={setData}
                description="Orders print to Prep Printers which are placed at various prep stations. Please indicate the desired name of each Prep Printer. "
                endpointForPost="/"
                additionalArray={printerName}
                title="Add New Printer"
                deleteTitle="Printer"
                ToolTipText="Hot Printer, 
                Cold Printer,    
                Expo Printer,
                App Printer,
                Fry Printer,
                Grill Printer,
                Sautee Printer"
                buttonText="Add New Printer"
                marginTop={"32px"}
                width={{md:'310px',xs:'170px'}}
            />
            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: { xs: "24px", md: "32px" } }}
            />

            <Box
                paddingY={"22px"}
                display="flex"
                justifyContent="flex-end"
                sx={{
                    flexDirection: {
                        lg: "row",
                        xs: "column"
                    }
                }}
            >
                <Box
                    display="flex"
                    sx={{
                        justifyContent: "flex-end",
                        flexDirection: {
                            md: "row",
                            xs: "column"
                        }
                    }}
                >
                    <CommonButton
                        className={"back-button"}
                        ariaTag={"This is back button"}
                        variant={"outlined"}
                        mr={{ md: "16px", xl: "8px" }}
                        px={"19.3px"}
                        py={{ md: "11px", xs: "12px" }}
                        color="#5C5C5C"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Back"}
                        onclickHandler={handleBack}
                        mt={{ xs: "0px", md: "0px" }}
                    />
                    <CommonButton
                        mt={{ xs: "8px", md: "0px" }}
                        className={"next-button"}
                        onclickHandler={submitForm}
                        disabled={printerName == ""}
                        ariaTag={"This is next step button"}
                        variant={"contained"}
                        px={"20px"}
                        py={{ md: "11px", xs: "11.6px" }}
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Next Step"}
                    />
                </Box>
            </Box>
        </Box>
    )
}
