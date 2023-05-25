import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider } from "@mui/material"
import AddNewItem from "../../../common/AddNewItem/AddNewItemDuplicate"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import CommonButton from "../../../common/CommonButton"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import theme from "../../../../src/theme"

export default function PettyCashComponent() {
    const router = useRouter()
    const [showNofication, setShowNofication] = useState(false)
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const dispatch = useDispatch()
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Financial",
        "Petty Cash"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Tax Rates"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Comps"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Void Reasons"
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
            initialData[0].additionalpettycash?.length > 0 &&
                setAdditionalpettycash(initialData[0].additionalpettycash)
        }
    }, [sideBarData])
    const [additionalpettycash, setAdditionalpettycash] = useState([])
    const [includedpettycash] = useState([
        "Drawer In",
        "Tips Paid",
        "Tips Paid In",
        "Grocery",
        "Office Supplies",
        "Restaurant Supplies",
        "Janitorial Supplies",
        "Miscellaneous In",
        "Miscellaneous Out"
    ])
    const updateStore = (_includedpettycash, _additionalpettycash ) => {
        let temp = [{ includedpettycash: _includedpettycash, additionalpettycash: _additionalpettycash }]
        let currentpercentage = 100
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Financial",
            "Petty Cash",
            temp,
            currentpercentage,
            innerper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const submitForm = () => {
        updateStore(includedpettycash, additionalpettycash)
        let currentpercentage = 100
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per + inner4per) / 4
        )
        innerper == 100
            ? router.push({
                  pathname: `/discovery/financial/financial-confirmation/${routerID}`,
                  query: { inner: true }
              })
            : setShowNofication(true)
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/financial/void-reasons/${routerID}`,
            query: { inner: true }
        })
    }
    const setData = (data) => {
        setAdditionalpettycash(data)
        updateStore(includedpettycash, data)

    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            width="100%"
        >
            <Box sx={{ mt: { lg: "0px", md: "-1.5px", xs: "-1.5px" } }}>
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
                    className="Top-text"
                >
                    Petty Cash Accounts are used to track small cash expenses
                    and incomes. Below are the accounts included with your Aloha
                    system.
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
                    color: theme.palette.textColor.main
                }}
            >
                Please indicate any additional Petty Cash Accounts that will be
                needed.
            </Typography>
            <Box
                className="shadow"
                sx={{
                    marginTop: { xs: "24px", md: "32px", lg: "31px" },
                    borderRadius: "8px !important",
                    maxWidth: { md: "100%", xs: "100%" }
                }}
            >
                <Box
                    sx={{
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        p: {
                            lg: "22px 0 12px 23px",
                            md: "24px 0 11.8px 23px",
                            xs: "16px 16px 13px 16px"
                        },
                        fontSize: {
                            xs: "18px"
                        },
                        lineHeight: {
                            xs: "28px"
                        },
                        background: "white",
                        color: "#1E1E1E",
                        borderRadius: "8px 8px 0 0"
                    }}
                >
                    <Box
                        sx={{
                            mr: "7px",
                            mt: { md: "1px", lg: "2px", xs: "2px" }
                        }}
                    >
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`this is Included Petty Cash Accounts icon`}</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 9V15H13V9H20ZM5 19V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5Z"
                                fill="#1E1E1E"
                            />
                            <path
                                d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                    </Box>
                    Included Petty Cash Accounts
                </Box>
                <Box
                    sx={{
                        pl: {
                            md: "24px",
                            xs: "16px"
                        },
                        pr: {
                            lg: "7.5px",
                            md: "24px",
                            xs: "16px"
                        },
                        pb: {
                            md: "24px",
                            xs: "14px"
                        },
                        borderRadius: "0px 0px 8px 8px ",
                        background: "white",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        flexWrap: {
                            md: "wrap"
                        },
                        justifiyContent: {
                            lg: "justify-evenly",
                            md: "flex-start"
                        },
                        alignItems: {
                            xs: "center"
                        },

                        rowGap: {
                            xs: "8px",
                            md: "14px",
                            lg: "13px"
                        },
                        columnGap: {
                            lg: "8px",
                            md: "8px",
                            xs: "5px"
                        }
                    }}
                >
                    {includedpettycash.map((item, index) => {
                        return (
                            <Typography
                                key={index}
                                sx={{
                                    width: { xs: "100%", md: "auto" },
                                    fontWeight: 400,
                                    padding: {
                                        xs: "11px 24px",
                                        md: "12px 22px 12px 24px"
                                    },
                                    fontSize: {
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        xs: "22px"
                                    },
                                    border: "1px solid #E0E0E0",
                                    color: "#5C5C5C",
                                    textAlign: "center",

                                    backgroundColor: "white",
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
                description="Petty Cash Accounts allow Aloha to track small restaurant expenses or income. Below is what is included with your Aloha Database."
                endpointForPost="/"
                additionalArray={additionalpettycash}
                setAdditonal={setData}
                deleteTitle="Petty Cash Account"
                title="Additional&nbsp; Petty Cash Accounts"
                buttonText="Add New Petty Cash Account"
                marginTop={"32px"}
                hideTooltip={true}
            />

            <Divider
                className="divider-col"
                sx={{ width: "100%", marginTop: { xs: "24px", md: "32px" } }}
            />

            <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                    py: { md: 5.5, xs: 6 },
                    flexDirection: {
                        lg: "row",
                        md: "column",

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
                        px={"20px"}
                        py={{ xs: "11px" }}
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
                        ariaTag={"This is Proceed to Confirmation Button"}
                        variant={"contained"}
                        px={"20px"}
                        py={{ xs: "12px" }}
                        color="white"
                        fontSize="16px"
                        lineHeight="24px"
                        fontWeight="600"
                        content={"Proceed to Confirmation"}
                        mt={{ xs: "8px", md: "0px" }}
                    />
                </Box>
            </Box>
            <ConfirmationNotification
                open={showNofication}
                close={() => setShowNofication(false)}
            />
        </Box>
    )
}
