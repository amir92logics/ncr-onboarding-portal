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

export default function SalesAndRetailCategoriesComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Reporting",
        "Sales and Retail Categories"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "General Categories"
    ).percentage
    let confirmationdata = substageinnerstages.find(
        (ite) => ite.name == "Confirmation"
    ).data
    const [disabled, setDisable] = useState(false)
    let currentstagedata = { ...substageinnerstages[currentindex] }
    let initialData = currentstagedata.data
    const dispatch = useDispatch()
    const [salesAndRetailCategories] = useState([
        "Food",
        "Bevs",
        "Liquor",
        "Beer",
        "Wine",
        "Retail"
    ])
    const [
        addtionalSalesAndRetailCategories,
        SetAddtionalSalesAndRetailCategories
    ] = useState([])
    const updateStore = (_data) => {
        const tempPercent = 100
        const siteinfodataper = Math.round((tempPercent + inner2per) / 2)
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Reporting",
            "Sales and Retail Categories",
            _data,
            tempPercent,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const setData = (_data) => {
        SetAddtionalSalesAndRetailCategories(_data)
       updateStore(_data)
    }
    const submitForm = () => {
        updateStore(addtionalSalesAndRetailCategories)
        router.push({
            pathname: `/discovery/reporting/generalcatg/${routerID}`,
            query: { inner: true }
        })
    }

    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            SetAddtionalSalesAndRetailCategories(initialData)
        } else {
            SetAddtionalSalesAndRetailCategories([])
        }
    }, [sideBarData])
    return (
        <Box
            className="reporting-set"
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
                        xs: "16px"
                    },
                    lineHeight: {
                        xs: "24px",
                        lg: "24px"
                    },
                    color: theme.palette.textColor.main
                }}
            >
                Menu items are grouped into Sales and Retail categories for
                reporting purposes. A sales category has the most visibility on
                both front of house and back office reporting.
                <br />
                <br />
                Below are the sales categories included within your Aloha
                Database. Please indicate any additional categories needed.
            </Typography>

            <Box
                className="shadow"
                sx={{
                    marginTop: { xs: "27px", md: "34px" },
                    padding: { xs: "16px", md: "24px" },
                    background: "#ffff",
                    borderRadius: "8px",
                    maxWidth: { md: "100%", xs: "100%" }
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
                            <title>{`this is Sales Categories icon`}</title>
                            <rect
                                width={24}
                                height={24}
                                rx={12}
                                fill="#E8EEFF"
                            />
                            <path
                                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"
                                fill="#1E1E1E"
                            />
                        </svg>
                    </Box>
                    Sales Categories
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        flexWrap: "flex",
                        justifiyContent: "flex-start"
                    }}
                >
                    {salesAndRetailCategories.map((item, index) => {
                        return (
                            <Typography
                                key={item}
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
                                    border: "1px solid",
                                    borderColor: "#E0E0E0",
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
            <Box sx={{ maxWidth: { md: "100%", xs: "100%" } }}>
                <AddNewItem
                    disabled={disabled}
                    description="General Categories allow for tracking specific items in your system. The left column below is what is included with your Aloha Database"
                    endpointForPost="/"
                    additionalArray={addtionalSalesAndRetailCategories}
                    setAdditonal={setData}
                    deleteTitle="Sales Category"
                    title="Additional Sales Categories"
                    buttonText="Add Additional Sales Categories"
                    marginTop={"32px"}
                    hideTooltip={true}
                />
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: { xs: "24px", md: "32px", lg: "32px" }
                    }}
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
                            className={"next-button"}
                            onclickHandler={submitForm}
                            mt={{ xs: "8px", md: "0px" }}
                            ariaTabel={"This is next step button"}
                            variant={"contained"}
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
        </Box>
    )
}
