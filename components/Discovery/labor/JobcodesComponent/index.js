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
import ConfirmationNotification from "../../../common/ConfirmationNotification"

export default function JobcodesComponent() {
    const router = useRouter()
    const [showNofication, setShowNofication] = useState(false)
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Labor",
        "Job Codes"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Payroll"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Overtime"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (it) => it.name == "Confirmation"
    ).data
    let innerdata = { ...substageinnerstages[currentindex] }
    const initialData = innerdata?.data
    const dispatch = useDispatch()
    const jobscodes = [
        "Server",
        "Bartender",
        "Bar Labor",
        "Cocktail",
        "Cashier",
        "Host",
        "FOH Trainer",
        "Cook",
        "Busser",
        "Bar Back",
        "Manager",
        "Server Training",
        "Bar Training",
        "Cocktail Training"
    ]
    const [additionalJobsCodes, setAdditionalJobsCodes] = useState([])
    const [disable, setDisable] = useState(false)
    const updateStore = (_data) => {
        let currentpercentage = 100
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per) / 3
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Labor",
            "Job Codes",
            _data,
            currentpercentage,
            innerper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const submitForm = () => {
        updateStore(additionalJobsCodes)
        let currentpercentage = 100
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per) / 3
        )
        innerper == 100
            ? router.push({
                pathname: `/discovery/labor/labor-confirmation/${routerID}`,
                query: { inner: true }
            })
            : setShowNofication(true)
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData != 0) {
            setAdditionalJobsCodes(initialData)
        }
    }, [sideBarData])

    const handleBack = () => {
        router.push({
            pathname: `/discovery/labor/overtime/${routerID}`,
            query: { inner: true }
        })
    }
    const setData = (_data) => {
        updateStore(_data)

    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        lg: "16px",
                        xs: "16px"
                    },
                    lineHeight: {
                        xxl: "24px",
                        xl: "24px",
                        md: "24px",
                        xs: "24px"
                    },
                    color: "#1E1E1E"
                }}
                className="Top-text"
            >
                Job codes control whether an employee can enter orders, operate
                a cash drawer, take breaks, and more. An employee&apos;s jobcode
                controls how they will interact with the POS system.
                <br />
                <br />
                For example, a Server may enter orders from tables whereas a
                Cook may only be able to clock in and out. An employee may have
                many jobcodes but can work under only one at a time.
            </Typography>
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: {
                        lg: "16px",
                        xs: "16px"
                    },
                    lineHeight: {
                        lg: "24.6px",
                        xs: "24px"
                    },
                    color: "#1E1E1E",
                    marginTop: { md: "32px", xs: "24px" }
                }}
                className="Top-text"
            >
                The following job codes are already included with your system.
                Please indicate any additional Jobcodes needed.
            </Typography>

            <Box
                className="shadow"
                sx={{
                    marginTop: { xs: "27px", md: "34px", lg: "32px" },
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
                            sm: "18px",
                            xs: "16px"
                        },
                        lineHeight: {
                            lg: "28px",
                            xs: "24px"
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
                            <title>{`this is Included Job Codes icon`}</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M11 14.1702L8.83 12.0002L11 9.83016L9.59 8.41016L6 12.0002L9.59 15.5902L11 14.1702Z"
                                fill="#323232"
                            />
                            <path
                                d="M14.41 15.5902L18 12.0002L14.41 8.41016L13 9.83016L15.17 12.0002L13 14.1702L14.41 15.5902Z"
                                fill="#323232"
                            />
                            <path
                                d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.86 3 4.73 3.01 4.6 3.04C4.21 3.12 3.86 3.32 3.59 3.59C3.41 3.77 3.26 3.99 3.16 4.23C3.06 4.46 3 4.72 3 5V15V16V19C3 19.27 3.06 19.54 3.16 19.78C3.26 20.02 3.41 20.23 3.59 20.42C3.86 20.69 4.21 20.89 4.6 20.97C4.73 20.99 4.86 21 5 21H19C20.1 21 21 20.1 21 19V16V15V5C21 3.9 20.1 3 19 3ZM12 2.75C12.41 2.75 12.75 3.09 12.75 3.5C12.75 3.91 12.41 4.25 12 4.25C11.59 4.25 11.25 3.91 11.25 3.5C11.25 3.09 11.59 2.75 12 2.75ZM19 15V16V19H5V16V15V5H19V15Z"
                                fill="#323232"
                            />
                        </svg>
                    </Box>
                    Included Job Codes
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
                    {jobscodes.map((item, index) => {
                        return (
                            <Typography
                                key={`${item}${index + 1}`}
                                sx={{
                                    width: { xs: "100%", md: "auto" },
                                    marginTop:
                                        index > 0
                                            ? {
                                                xs: "8px",

                                                md: "12px",
                                                lg: "10px"
                                            }
                                            : {
                                                xs: "12px",

                                                md: "12px",
                                                lg: "10px"
                                            },
                                    fontWeight: 400,
                                    padding: "10px 24.1px",
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
                disabled={disable}
                endpointForPost="/"
                additionalArray={additionalJobsCodes}
                setAdditonal={setData}
                title="Additional Job Codes"
                deleteTitle="Job Code"
                buttonText="Add New Job Codes"
                marginTop={"32px"}
                description={
                    "Job codes control whether an employee can enter orders, operate a cash drawer, take breaks, and more."
                }
                hideTooltip={true}
            />
            <Divider
                className="divider-col"
                sx={{
                    width: "100%",

                    marginTop: {
                        lg: "32px",
                        md: "32.4px",
                        xs: "23px"
                    }
                }}
            />

            <Box
                paddingY={"22.6px"}
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
                        mr={{ md: "8px" }}
                        px={"20px"}
                        py={{ xs: "11px", lg: "10px" }}
                        color={theme.palette.primary.main}
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Back"}
                        onclickHandler={handleBack}
                    />
                    <CommonButton
                        className={"next-button"}
                        onclickHandler={submitForm}
                        ariaTag={"This is Proceed to Confirmation Button"}
                        variant={"contained"}
                        mt={{ xs: "8px", md: "0px" }}
                        px={"20px"}
                        py={"12px"}
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        hover="#062EC9"
                        content={"Proceed to Confirmation"}
                    />
                </Box>
                <ConfirmationNotification
                    open={showNofication}
                    close={() => setShowNofication(false)}
                />
            </Box>
        </Box>
    )
}
