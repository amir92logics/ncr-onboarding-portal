import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider } from "@mui/material"
import AddNewItem from "../../../common/AddNewItem/AddNewItemDuplicate"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"

export default function PrinterGroupComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const dispatch = useDispatch()
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Operations",
        "Printer Groups"
    )

    let inner2per = substageinnerstages.find(
        (it) => it.name == "Printer Routing"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Ordering Process"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Prep Printer Names"
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
    const IncludedprinterGrpupNames = [
        "Grill & Expo",
        "Fry & Expo",
        "Grill, Fry & Expo"
    ]
    const [printerGroupNames, SetPrinterNames] = useState([])
    const updateStore = (_tempData) => {
        let tempPercent = 100
        const siteinfodataper = Math.round(
            (tempPercent + inner2per + inner3per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Operations",
            "Printer Groups",
            _tempData,
            tempPercent,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const submitForm = () => {
       updateStore(printerGroupNames)
        router.push({
            pathname: `/discovery/operations/printer-routing/${routerID}`,
            query: { inner: true }
        })
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/operations/printer-names/${routerID}`,
            query: { inner: true }
        })
    }
    const setData = (data) => {
        SetPrinterNames(data)
        updateStore(data)

    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
            sx={{ mt: { md: "-2px", lg: "0px" } }}
        >
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        lg: "16px",
                        xs: "16px"
                    },
                    lineHeight: {
                        lg: "24px",
                        xs: "24px"
                    },
                    color: theme.palette.textColor.main
                }}
                className="Top-text2"
            >
                Prep Printers are organized into Printer Groups, allowing for
                orders with certain items to print to one or more stations. A
                Printer Group may contain one to five Printers.
                <br />
                <br />
                Below are the Printer Groups included with your system. Please
                indicate any additional Printer Groups needed.
            </Typography>

            <Box
                className="shadow"
                sx={{
                    marginTop: { xs: "27px", md: "36px", lg: "32px" },
                    padding: { xs: "16px", md: "24px" },
                    background: "#ffff",
                    borderRadius: "8px"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        display: "flex",
                        alignItem: "center",

                        fontFamily: "Inter",
                        fontSize: {
                            xs: "18px"
                        },
                        lineHeight: {
                            xs: "28px"
                        },
                        color: "#1E1E1E"
                    }}
                >
                    <Box component={"span"} sx={{ marginRight: "8px" }}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`this is Included Printer Groups icon`}</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M19 8H18V3H6V8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM8 5H16V8H8V5ZM16 17V19H8V15H16V17ZM18 15V13H6V15H4V11C4 10.45 4.45 10 5 10H19C19.55 10 20 10.45 20 11V15H18Z"
                                fill="#323232"
                            />
                            <path
                                d="M18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5C17.4477 10.5 17 10.9477 17 11.5C17 12.0523 17.4477 12.5 18 12.5Z"
                                fill="#323232"
                            />
                        </svg>
                    </Box>
                    Included Printer Groups
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            md: "row",
                            lg: "row",
                            xl: "row",
                            xs: "column"
                        },
                        flexWrap: "wrap",
                        justifiyContent: "flex-start",
                        mt: { lg: "3.1px" }
                    }}
                >
                    {IncludedprinterGrpupNames.map((item, index) => {
                        return (
                            <Typography
                                key={index}
                                sx={{
                                    width: { xs: "100%", md: "auto" },
                                    marginTop:
                                        index > 0
                                            ? {
                                                  xs: "8px",

                                                  md: "12px",
                                                  lg: "9px"
                                              }
                                            : {
                                                  xs: "12px",

                                                  md: "12px",
                                                  lg: "9px"
                                              },
                                    fontWeight: 400,
                                    padding: "11px 24.6px",
                                    mr: { md: "7px" },
                                    fontSize: {
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        xs: "22px"
                                    },
                                    border: "1px solid #E0E0E0",
                                    color: "#5C5C5C",
                                    letterSpacing: theme.letterSpacing.main,
                                    backgroundColor: "white",
                                    textAlign: "center",
                                    borderRadius: "8px",
                                    "&:hover": {
                                        boxShadow:
                                            "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                                    }
                                }}
                            >
                                {item}
                            </Typography>
                        )
                    })}
                </Box>
            </Box>
            <AddNewItem
                disabled={disabled}
                description="Printer Groups all for items to print at multiple locations, if necessary."
                endpointForPost="/"
                additionalArray={printerGroupNames}
                setAdditonal={setData}
                title="Additional Printer Groups"
                deleteTitle="Printer Group"
                buttonText="Add New Printer Group"
                marginTop={"32px"}
                isIncluded={false}
                ismenu={true}
                ToolTipText="Fry, Grill, All Kitchen"
            />
            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: { xs: "24px", md: "32px" } }}
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
                        mt={{ xs: "0px", md: "0px" }}
                        mr={{ md: "8px" }}
                        px={"19.3px"}
                        py={"11px"}
                        color="#5C5C5C"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Back"}
                        onclickHandler={handleBack}
                    />
                    <CommonButton
                        className={"next-button"}
                        onclickHandler={submitForm}
                        ariaTag={"This is Next Step Button"}
                        variant={"contained"}
                        mt={{ xs: "8px", md: "0px" }}
                        px={"20px"}
                        py={"12px"}
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
