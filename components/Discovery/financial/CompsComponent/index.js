import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
    Button,
    Divider,
    Grid,
    InputAdornment,
    useMediaQuery
} from "@mui/material"
import AddNewCompsPopUp from "./AddNewCompsPopUp"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"

import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import DeletePopUp from "../../../common/AddNewItem/DeletePopUp"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"
import {
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import Input from "../../../common/Input"

export default function CompsComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Financial",
        "Comps"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Petty Cash"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Tax Rates"
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
    const includedRevenueData = useSelector(
        (state) => state.dataSlice.includedRevenueData
    )
    useEffect(() => {
        confirmationdata[0] == "Disabled" && setDisable(true)
        if (initialData.length > 0) {
            initialData[0].compsData?.length > 0 &&
                setIncludeRevenueData(initialData[0].compsData)
            initialData[0].additonalCards.length > 0 &&
                setAdditionalCards(initialData[0].additonalCards)
        }
    }, [sideBarData])
    const dispatch = useDispatch()
    const [showPopUp, setShowPopUp] = useState(false)
    const [deletedID, setDeletedID] = useState(null)
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const [additonalCards, setAdditionalCards] = useState([])

    const [includeRevenueData, setIncludeRevenueData] = useState([
        ...includedRevenueData
    ])

    const updateStore = (_tempIncluded, _tempAdditional) => {
        let temp = [
            { additonalCards: _tempAdditional, compsData: _tempIncluded }
        ]
        let currentpercentage = 100
        let innerper = Math.round(
            (currentpercentage + inner3per + inner2per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Financial",
            "Comps",
            temp,
            currentpercentage,
            innerper,
            false
        )

        dispatch(SetSideBarData(tempsidebar))
    }
    const handleTogglePopUp = (value) => {
        setShowPopUp(value)
    }
    const submitForm = (e) => {
        e.preventDefault()
        updateStore(includeRevenueData, additonalCards)
        router.push({
            pathname: `/discovery/financial/void-reasons/${routerID}`,
            query: { inner: true }
        })
    }

    const handleSubmitPopUp = (obj) => {
        const tempArray = [...additonalCards]
        tempArray.push(obj)
        setAdditionalCards(tempArray)
        updateStore(includeRevenueData, tempArray)
    }

    const handleDelete = () => {
        const tempArray = [...additonalCards]
        tempArray.splice(deletedID, 1)
        setAdditionalCards([...tempArray])
        setDeletedID(null)
        setShowDeletePopUP(false)
        updateStore(includeRevenueData, [...tempArray])
    }
    const handleDeletePopup = (id) => {
        if (dontAskDeletePopup) {
            const tempArray = [...additonalCards]
            tempArray.splice(id, 1)
            setAdditionalCards([...tempArray])
            setDeletedID(null)
            setShowDeletePopUP(false)
            updateStore(includeRevenueData, [...tempArray])
        } else {
            setDeletedID(id)
            setShowDeletePopUP(true)
        }
    }

    const handleBack = () => {
        router.push({
            pathname: `/discovery/financial/tax-rates/${routerID}`,
            query: { inner: true }
        })
    }
    const exceptThisSymbols = ["e", "E", "+", "-"]
    const handlechange = (e, item) => {
        const tempItem = { ...item }

        let compsNumber =
            Number(e.target.value) < 100 || Number(e.target.value) == 100
                ? e.target.value
                : ""
        tempItem.amountDeducted = compsNumber
        const tempArray = [...includeRevenueData]
        tempArray.forEach((element, index) => {
            if (element.includedComps === tempItem.includedComps) {
                tempArray[index] = tempItem
            }
        })
        setIncludeRevenueData(tempArray)
        updateStore(tempArray, additonalCards)
    }
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))
    return (
        <form
            aria-label={`This is comps form`}
            onSubmit={(e) => {
                submitForm(e)
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent={"flex-start"}
                flexWrap="wrap"
                width="100%"
            >
                <Box sx={{ mt: { lg: "0px", md: "-1.5px" } }}>
                    {" "}
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: {
                                lg: "16px",
                                xs: "16px"
                            },
                            lineHeight: {
                                md: "24px",
                                xs: "21.9px"
                            },
                            color: theme.palette.textColor.main
                        }}
                    >
                        Comps (complimentary discounts) are used for removing an
                        already prepared item, or all items, from a guest check
                        for a variety of reasons such as employee meals, manager
                        discounts or guest satisfaction.
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        mt: { xs: "22px", md: "24px" },
                        fontWeight: 400,
                        marginTop: "22px",
                        fontSize: {
                            md: "16px",
                            xs: "16px"
                        },
                        lineHeight: {
                            md: "24px",
                            xs: "22px"
                        },
                        color: theme.palette.textColor.main
                    }}
                >
                    Below are the Comps that are included with your Aloha
                    Database. Please fill in any additional Comps that will be
                    needed and indicate a percentage or dollar amount. We will
                    review your additions in the Discovery Meeting.
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 600,
                        marginTop: { lg: "32px", xs: "35px" },
                        fontSize: {
                            xs: "18px"
                        },
                        lineHeight: {
                            lg: "28px",
                            xs: "24px"
                        },
                        color: "#1E1E1E",
                        letterSpacing: theme.letterSpacing.main,
                        maxWidth: "1072px"
                    }}
                >
                    Comps
                </Typography>

                <Grid
                    container
                    sx={{
                        gap: { lg: "16px", md: "32px 24px", xs: "16px" },
                        display: "grid",

                        width: "100%",
                        gridTemplateColumns: {
                            xs: "100%",
                            md: "auto auto",
                            lg: "auto auto auto"
                        },
                        marginTop: "16.2px",
                        pb: 8,
                        overflow: "hidden"
                    }}
                >
                    {includeRevenueData.map((item, index) => {
                        return (
                            <Grid
                                item
                                key={`${index + 1}`}
                                className="shadow"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItem: "flex-start",
                                    borderRadius: "8px",
                                    backgroundColor: "white",
                                    paddingLeft: "16px",
                                    paddingTop: "15px",
                                    paddingRight: "16px",
                                    paddingBottom: { md: "16px", xs: "21.7px" }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "12px",
                                            xs: "12px"
                                        },
                                        lineHeight: {
                                            lg: "18px",
                                            xs: "20px"
                                        },
                                        color: "#727272",
                                        backgroundColor: "white",
                                        borderRadius: "8px"
                                    }}
                                >
                                    Included Comps
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "14px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            lg: "22px",
                                            md: "18px",
                                            xs: "18px"
                                        },
                                        color: "#1E1E1E",
                                        backgroundColor: "white",
                                        borderRadius: "8px"
                                    }}
                                >
                                    {item?.includedComps}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        mt: { xs: "17.2px", md: "16px" },
                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "12px",
                                            xs: "12px"
                                        },
                                        lineHeight: {
                                            lg: "18px",
                                            xs: "20px"
                                        },
                                        color: "#727272",
                                        backgroundColor: "white",
                                        borderRadius: "8px"
                                    }}
                                >
                                    Comps Type
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 600,

                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "14px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            lg: "22px",
                                            md: "22px",
                                            xs: "22px"
                                        },
                                        color: "#1E1E1E",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        mb: "15.8px"
                                    }}
                                >
                                    {item?.compsType}
                                </Typography>
                                {item?.compsType?.includes("Prompt") ? (
                                    <Input
                                        ariaLabel={`This is Amount Deducted input field.`}
                                        className={"ncr-new-input"}
                                        label="Amount Deducted"
                                        disabled={true}
                                        name="includedComps"
                                        value={"Prompt for $ Amount"}
                                        onChange={(e) => {
                                            handlechange(e, item)
                                        }}
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        InputProps={{
                                            inputProps: {
                                                min: 0,
                                                max: 100,
                                                step: "any"
                                            }
                                        }}
                                        sx={{
                                            marginTop: {
                                                xs: "7.5px",
                                                md: "8px",
                                                lg: "7px",
                                                color: "#757575",
                                                backgroundColor: "#f5f5f5"
                                            },
                                            fontFamily: "Inter",
                                            minWidth: {
                                                xs: "100%"
                                            }
                                        }}
                                    />
                                ) : (
                                    <Input
                                        ariaLabel={`This is Percentage Deducted input field.`}
                                        className={"ncr-new-input"}
                                        label="Percentage Deducted"
                                        disabled={disabled}
                                        name="includedComps"
                                        value={item?.amountDeducted}
                                        onChange={(e) => {
                                            handlechange(e, item)
                                        }}
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment
                                                    sx={{ marginTop: "0px" }}
                                                    position="end"
                                                >
                                                    {"%"}
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                min: 0,
                                                max: 100,
                                                step: "any"
                                            }
                                        }}
                                        type={"number"}
                                        sx={{
                                            marginTop: {
                                                xs: "7.5px",
                                                md: "8px",
                                                lg: "7px"
                                            },
                                            fontFamily: "Inter",
                                            minWidth: {
                                                xs: "100%"
                                            }
                                        }}
                                    />
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {
                            md: "flex-start",
                            xs: "space-between"
                        },
                        alignItems: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            marginTop: "2px",
                            paddingRight: "16px",
                            fontSize: {
                                xs: "18px"
                            },
                            lineHeight: {
                                lg: "28px",
                                xs: "16px"
                            },
                            color: "#1E1E1E",
                            letterSpacing: theme.letterSpacing.main
                        }}
                    >
                        Additional Comps
                    </Typography>
                </Box>
                <Box>
                    <Button
                        disabled={disabled}
                        aria-label="This is  Add Additional Comps Button."
                        onClick={() => setShowPopUp(true)}
                        sx={{
                            marginTop: "16px",
                            width: { lg: "auto", xs: "100%" },
                            border: " 2px dashed rgba(0, 0, 0, 0.2)",
                            padding: "12px 22.3px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            textTransform: "none",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "14px",
                            lineHeight: "21px",
                            color: theme.palette.primary.main,

                            transition: "all",
                            "&:hover": {
                                color: theme.palette.primary.main,
                                border: `2px dashed ${theme.palette.primary.main}`,
                                backgroundColor: "#1D4ED808"
                            },
                            "&.focus": {
                                color: `${theme.palette.primary.main} !important`
                            }
                        }}
                    >
                        Add Additional Comps
                        <svg
                            style={{ marginLeft: "8px" }}
                            width={20}
                            height={20}
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`this is Add Additional Comps icon`}</title>
                            <path
                                d="M8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5Z"
                                stroke={
                                    disabled
                                        ? "rgba(0, 0, 0, 0.2)"
                                        : theme.palette.primary.main
                                }
                                strokeWidth="1.25"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5.3335 8.5H10.6668"
                                stroke={
                                    disabled
                                        ? "rgba(0, 0, 0, 0.2)"
                                        : theme.palette.primary.main
                                }
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 11.1667L8 5.83334"
                                stroke={
                                    disabled
                                        ? "rgba(0, 0, 0, 0.2)"
                                        : theme.palette.primary.main
                                }
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Button>
                </Box>

                <Grid
                    container
                    sx={{
                        gap: { lg: "16px", md: "32px 24px", xs: "16px" },
                        display: "grid",

                        width: "100%",
                        gridTemplateColumns: {
                            xs: "100%",
                            md: "47% 47%",
                            lg: "32.6% 32.6% 32.6%"
                        },
                        marginTop: "32px",
                        marginBottom: additonalCards.length > 0 && "32px"
                    }}
                >
                    {additonalCards.map((item, index) => {
                        return (
                            <Grid
                                item
                                key={`${index + 1}`}
                                className="shadow"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItem: "flex-start",
                                    borderRadius: "8px",
                                    backgroundColor: "white",
                                    pt: "15px",
                                    pb: "16px",
                                    px: "16px",
                                    position: "relative",
                                    "&:hover .delete-button": {
                                        display: "block"
                                    },
                                    ".delete-button": {
                                        display: {
                                            xs: !disabled && "flex",
                                            md: "none"
                                        }
                                    }
                                }}
                            >
                                <Box
                                    aria-label={`This is Delete Button.`}
                                    onClick={() => {
                                        !disabled && handleDeletePopup(index)
                                    }}
                                    className={"delete-button"}
                                    sx={{
                                        cursor: "pointer",
                                        right: "-8px",
                                        top: "-8px",
                                        display: "none",
                                        position: "absolute"
                                    }}
                                >
                                    <svg
                                        role="button"
                                        width={isMobile ? 20 : 16}
                                        height={isMobile ? 20 : 16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>{`this is Included Comps icon`}</title>
                                        <path
                                            d="M8 0.5C3.8525 0.5 0.5 3.8525 0.5 8C0.5 12.1475 3.8525 15.5 8 15.5C12.1475 15.5 15.5 12.1475 15.5 8C15.5 3.8525 12.1475 0.5 8 0.5ZM11.75 10.6925L10.6925 11.75L8 9.0575L5.3075 11.75L4.25 10.6925L6.9425 8L4.25 5.3075L5.3075 4.25L8 6.9425L10.6925 4.25L11.75 5.3075L9.0575 8L11.75 10.6925Z"
                                            fill="#F44336"
                                        />
                                    </svg>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        color: "#727272"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            mt: "8px",
                                            FontFamily: "inter",
                                            fontSize: {
                                                lg: "12px",
                                                xs: "12px"
                                            },
                                            lineHeight: {
                                                lg: "18px",
                                                xs: "18px"
                                            },
                                            color: "#727272",
                                            backgroundColor: "white",
                                            borderRadius: "8px",
                                            letterSpacing:
                                                theme.letterSpacing.main
                                        }}
                                    >
                                        Included Comps
                                    </Typography>
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        mt: "4px",
                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "14px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            lg: "18px",
                                            xs: "18px"
                                        },
                                        color: "#1E1E1E",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        letterSpacing: theme.letterSpacing.main
                                    }}
                                >
                                    {item?.includedComps}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        mt: "16px",
                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "12px",
                                            xs: "12px"
                                        },
                                        lineHeight: {
                                            lg: "18px",
                                            xs: "18px"
                                        },
                                        color: "#727272",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        letterSpacing: theme.letterSpacing.main
                                    }}
                                >
                                    Comps Type
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        mt: "4px",
                                        FontFamily: "inter",
                                        fontSize: {
                                            lg: "14px",
                                            xs: "14px"
                                        },
                                        lineHeight: {
                                            lg: "18px",
                                            xs: "18px"
                                        },
                                        color: "#1E1E1E",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        mb: "16px"
                                    }}
                                >
                                    {item?.compsType}
                                </Typography>

                                {item?.compsType?.includes("Prompt") ? (
                                    <Input
                                        className={"ncr-new-input"}
                                        label={
                                            item?.amountDeducted.includes("$")
                                                ? "Amount Deducted"
                                                : "Percentage Deducted"
                                        }
                                        disabled={true}
                                        name="includedComps"
                                        value={item?.amountDeducted}
                                        onChange={(e) => {
                                            handlechange(e, item)
                                        }}
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        InputProps={{
                                            inputProps: {
                                                min: 0,
                                                max: 100,
                                                step: "any"
                                            }
                                        }}
                                        sx={{
                                            color: "#757575",
                                            backgroundColor: "#f5f5f5",
                                            minWidth: {
                                                xs: "100%"
                                            }
                                        }}
                                    />
                                ) : (
                                    <Input
                                        disabled={disabled}
                                        name="includedComps"
                                        placeholder="Amount Deducted"
                                        defaultValue={item?.amountDeducted}
                                        value={item?.amountDeducted}
                                        InputProps={{
                                            endAdornment: item?.compsType ==
                                                "Percent Discount" && (
                                                    <InputAdornment
                                                        sx={{ marginTop: "0px" }}
                                                        position="end"
                                                    >
                                                        {"%"}
                                                    </InputAdornment>
                                                ),

                                            startAdornment: item?.compsType ==
                                                "Dollar Discount" && (
                                                    <InputAdornment
                                                        sx={{ marginTop: "0px" }}
                                                        position="start"
                                                    >
                                                        {"$"}
                                                    </InputAdornment>
                                                ),
                                            inputProps: {
                                                maxLength: 40,
                                                inputProps: { min: 0 }
                                            }
                                        }}
                                        onChange={(e) => {
                                            const tempItem = { ...item }
                                            if (
                                                item?.compsType ==
                                                "Percent Discount"
                                            ) {
                                                let compsNumber =
                                                    Number(e.target.value) <
                                                        100 ||
                                                        Number(e.target.value) ==
                                                        100
                                                        ? e.target.value
                                                        : ""
                                                tempItem.amountDeducted =
                                                    compsNumber
                                            } else {
                                                tempItem.amountDeducted =
                                                    e.target.value
                                            }

                                            const tempArray =
                                                additonalCards.map((item) => ({
                                                    ...item
                                                }))
                                            tempArray.forEach((element) => {
                                                if (
                                                    element.includedComps ===
                                                    tempItem.includedComps
                                                ) {
                                                    tempArray[index] = tempItem
                                                }
                                            })
                                            setAdditionalCards(tempArray)
                                            let temp = [
                                                {
                                                    additonalCards: tempArray,
                                                    compsData:
                                                        includeRevenueData
                                                }
                                            ]
                                            let currentpercentage = 100
                                            let innerper = Math.round(
                                                (currentpercentage +
                                                    inner3per +
                                                    inner2per +
                                                    inner4per) /
                                                4
                                            )
                                            let tempsidebar =
                                                dispatchDiscoveryData(
                                                    sideBarData,
                                                    "Financial",
                                                    "Comps",
                                                    temp,
                                                    currentpercentage,
                                                    innerper,
                                                    false
                                                )
                                            dispatch(
                                                SetSideBarData(tempsidebar)
                                            )
                                        }}
                                        onKeyDown={(e) =>
                                            exceptThisSymbols.includes(e.key) &&
                                            e.preventDefault()
                                        }
                                        label={
                                            item?.compsType ==
                                                "Percent Discount"
                                                ? "Percentage Deducted"
                                                : "Amount Deducted"
                                        }
                                        sx={{
                                            marginTop: {
                                                xs: "12px",
                                                md: "0px"
                                            }
                                        }}
                                        required
                                    />
                                )}
                            </Grid>
                        )
                    })}
                </Grid>

                <AddNewCompsPopUp
                    handleTogglePopUp={handleTogglePopUp}
                    showPopUp={showPopUp}
                    handleSubmitPopUp={handleSubmitPopUp}
                />

                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",

                        mt: { xl: -0.5, lg: -0.5, xs: -0.2 }
                    }}
                />

                <Box
                    paddingY={"23.2px"}
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Box
                        sx={{
                            width: { md: "auto", xs: "100%" },
                            flexDirection: { md: "row", xs: "column" },
                            gap: { md: "0px", xs: "8px" }
                        }}
                        display="flex"
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
                            type={"submit"}
                            ariaTag={"This is Next Step Button"}
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
            <DeletePopUp
                setDontAskDeletePopup={setDontAskDeletePopup}
                title={"additional comps"}
                deleteTitle="Comp"
                setShowDeletePopUP={setShowDeletePopUP}
                showDeletePopUP={showDeletePopUP}
                handleDeleteItem={handleDelete}
            />
        </form>
    )
}
