import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
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
import { BgIcon } from "../../../common/BgIcon"

export default function VoidReasonComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const dispatch = useDispatch()
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Financial",
        "Void Reasons"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Petty Cash"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Comps"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Tax Rates"
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
            initialData[0].additionalvoiddata?.length > 0 &&
                setAdditionalvoiddata(initialData[0].additionalvoiddata)
        }
    }, [sideBarData])
    const [includedVoidReasonsData] = useState([
        "86’d",
        "Wrong Button",
        "Testing",
        "Bar Waste",
        "Food Waste",
        "Cancel",
        "Future"
    ])
    const [additionalvoiddata, setAdditionalvoiddata] = useState([])
    const updateStore = (_tempAdditionalvoiddata, _tempIncludedVoidReasonsData) => {
        let temp = [{ additionalvoiddata: _tempAdditionalvoiddata, includedVoidReasonsData: _tempIncludedVoidReasonsData }]
        let currentpercentage = 100
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Financial",
            "Void Reasons",
            temp,
            currentpercentage,
            innerper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const submitForm = () => {
        updateStore(additionalvoiddata, includedVoidReasonsData)
        router.push({
            pathname: `/discovery/financial/petty-cash/${routerID}`,
            query: { inner: true }
        })
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/financial/comps/${routerID}`,
            query: { inner: true }
        })
    }
    const setData = (data) => {
        setAdditionalvoiddata(data)
        updateStore(data, includedVoidReasonsData)
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Box sx={{ mt: { lg: "0px", sm: -0.2 } }}>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: {
                            xs: "16px"
                        },
                        lineHeight: {
                            xs: "24px"
                        },
                        color: theme.palette.textColor.main,

                        width: "100%"
                    }}
                >
                    When an ordered item is removed from a check, it is recorded
                    as a Void along with a Void Reason. Typically, an item is
                    voided before it is prepared in the kitchen; therefore there
                    is no waste or loss of inventory.
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontWeight: 400,
                    paddingTop: "24px",
                    fontSize: {
                        xs: "16px"
                    },
                    lineHeight: {
                        xs: "24px"
                    },
                    color: "#1E1E1E",
                    width: "100%"
                }}
            >
                Below are the Void Reasons included with your Aloha
                system.&nbsp;Please indicate any additional Void Reasons that
                will be needed.
            </Typography>
            <Box
                className="shadow"
                sx={{
                    background: "#fff",
                    marginTop: { lg: 8, md: 8, xs: "34px" },
                    px: { md: 6, xs: 4 },
                    pt: { lg: 6, md: 6, xs: 4.1 },
                    pb: { lg: 5.5, md: 5.5, xs: 3.8 },
                    borderRadius: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 1.5
                    }}
                >
                    <BgIcon
                        svg_image={
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`this is Included Void Reasons icon`}</title>
                                <path
                                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM2 10C2 5.58 5.58 2 10 2C11.85 2 13.55 2.63 14.9 3.69L3.69 14.9C2.63 13.55 2 11.85 2 10ZM10 18C8.15 18 6.45 17.37 5.1 16.31L16.31 5.1C17.37 6.45 18 8.15 18 10C18 14.42 14.42 18 10 18Z"
                                    fill="#1E1E1E"
                                />
                            </svg>
                        }
                    />
                    <Typography
                        sx={{
                            fontWeight: 600,

                            fontSize: {
                                xs: "18px"
                            },
                            lineHeight: {
                                lg: "28px",
                                xs: "24px"
                            },
                            color: "#1E1E1E",
                            mt: { lg: "0.5px", md: "4px" }
                        }}
                    >
                        Included Void Reasons
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mt: { lg: 3.5, md: 4, xs: 5 },
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        flexWrap: "wrap",
                        justifiyContent: "flex-start",
                        rowGap: {
                            xs: "16px",
                            sm: "8px",
                            md: "14px",
                            lg: "16px"
                        },
                        columnGap: 2
                    }}
                >
                    {includedVoidReasonsData.map((item, index) => {
                        return (
                            <Typography
                                key={index}
                                sx={{
                                    width: { xs: "100%", md: "auto" },
                                    fontWeight: 400,
                                    padding: {
                                        md: "12px 23px",
                                        xs: "11px 23px"
                                    },
                                    fontSize: {
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        xs: "22px"
                                    },
                                    color: "#5C5C5C",
                                    textAlign: "center",
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #E0E0E0",
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
            <Box
                sx={{
                    marginTop: {
                        lg: 0.5,
                        md: 0.5,
                        xs: "-0.4px"
                    }
                }}
            >
                <AddNewItem
                    disabled={disabled}
                    description="Voids allow for complete removal or deletion of an item from a check. Typically, voids are items that were never prepared in the kitchen"
                    endpointForPost="/"
                    additionalArray={additionalvoiddata}
                    setAdditonal={setData}
                    title="Additional Void Reasons"
                    deleteTitle="Void Reason"
                    buttonText="Add New Void Reason"
                    marginTop={"32px"}
                    hideTooltip={true}
                />
            </Box>
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    marginTop: { md: "33px", xs: "32px" }
                }}
            />

            <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                    py: { md: 5.5, xs: 5.8 },
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
                        mr={{ md: "8px" }}
                        px={"20px"}
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
                        py={"11px"}
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
