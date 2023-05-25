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

export default function GeneralCategoriesComponent() {
    const [showNofication, setShowNofication] = useState(false)
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Reporting",
        "General Categories"
    )
    let inner1per = substageinnerstages.find(
        (it) => it.name == "Sales and Retail Categories"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let initialData = currentstagedata.data
    const dispatch = useDispatch()

    const [generalcatg] = useState([
        "All Items",
        "All Alcohol",
        "Carryover Items",
        "Pizza"
    ])
    const [addtionalgeneralcatg, SetAddtionalgeneralcatg] = useState([])
    const updateStore = (_data) => {
        SetAddtionalgeneralcatg(_data)
        const siteinfodataper = Math.round((inner1per + 100) / 2)
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Reporting",
            "General Categories",
            _data,
            100,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const setData = (_data) => {
        SetAddtionalgeneralcatg(_data)
        updateStore(_data)
    }
    const submitForm = () => {
        updateStore(addtionalgeneralcatg)
        const siteinfodataper = Math.round((inner1per + 100) / 2)
        siteinfodataper == 100
            ? router.push({
                pathname: `/discovery/reporting/reporting-confirmation/${routerID}`,
                query: { inner: true }
            })
            : setShowNofication(true)
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            SetAddtionalgeneralcatg(initialData)
        } else {
            SetAddtionalgeneralcatg([])
        }
    }, [])

    const handleBack = () => {
        router.push({
            pathname: `/discovery/reporting/salesretailcatg/${routerID}`,
            query: { inner: true }
        })
    }

    return (
        <Box
            className="reporting-set1"
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
                        lg: "24px",
                        xs: "24px"
                    },
                    color: theme.palette.textColor.main
                }}
            >
                In addition to Sales and Retail categories, items can optionally
                be grouped into more specific General categories for additional
                tracking purposes.
            </Typography>

            <Typography
                sx={{
                    fontWeight: 400,
                    marginTop: "16px",
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
            >
                The General categories below are included with your Aloha
                System. Please indicate any additional General Categories that
                will be needed.
            </Typography>

            <Box
                className="shadow"
                sx={{
                    marginTop: { xs: "27px", md: "34px" },
                    padding: { xs: "16px", md: "24px" },
                    background: "#fff",
                    borderRadius: "8px"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        display: "flex",
                        alignItem: "center",
                        fontFamily: "Inter",
                        fontSize: "18px",
                        lineHeight: "28px",
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
                            <title>{`this is General Categories icon`}</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M19 5V7H15V5H19ZM9 5V11H5V5H9ZM19 13V19H15V13H19ZM9 17V19H5V17H9ZM21 3H13V9H21V3ZM11 3H3V13H11V3ZM21 11H13V21H21V11ZM11 15H3V21H11V15Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                    </Box>
                    General Categories
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        flexWrap: "flex",
                        justifiyContent: "flex-start"
                    }}
                >
                    {generalcatg.map((item, index) => {
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
                                                lg: "10px"
                                            }
                                            : {
                                                xs: "12px",

                                                md: "12px",
                                                lg: "10px"
                                            },
                                    fontWeight: 400,
                                    padding: "11px 24.1px",
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
                description="General Categories allow for tracking specific items in your system. The left column below is what is included with your Aloha Database"
                endpointForPost="/"
                additionalArray={addtionalgeneralcatg}
                setAdditonal={setData}
                deleteTitle="General Category"
                title="Additional General Categories"
                buttonText="Add Additional General Categories"
                marginTop={"32px"}
                hideTooltip={true}
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
                        ariaTabel={"This is back button."}
                        variant={"outlined"}
                        mt={{ xs: "0px", md: "0px" }}
                        mr={{ md: "8px" }}
                        px={"20px"}
                        py={"11px"}
                        color="#5C5C5C"
                        fontSize="16px"
                        lineHeight="23.6px"
                        fontWeight="600"
                        disabled={false}
                        content={"Back"}
                        onclickHandler={handleBack}
                    />
                    <CommonButton
                        className={"next-button"}
                        onclickHandler={submitForm}
                        ariaLabel={"This is proceed to confirmation button"}
                        variant={"contained"}
                        mt={{ xs: "8px", md: "0px" }}
                        px={"20px"}
                        py={"11px"}
                        color="white"
                        fontSize="16px"
                        lineHeight="23.6px"
                        fontWeight="600"
                        content={"Proceed to Confirmation"}
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
