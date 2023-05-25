import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import SelectBox from "../../../common/SelectBoxV2"
import {
    calculatePercentage,
    dispatchDiscoveryData,
    getDiscoverySubStage
} from "../../../../helper/Constraints"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import CommonButton from "../../../common/CommonButton"

export default function OrderingProcessComponent() {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Operations",
        "Ordering Process"
    )
    let inner2per = substageinnerstages.find(
        (it) => it.name == "Printer Routing"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) => it.name == "Prep Printer Names"
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
            setorderingData(initialData)
        }
    }, [sideBarData])
    const dispatch = useDispatch()
    const [orderingdata, setorderingData] = useState([
        { name: "FirstRadio", value: "" },
        { name: "SecondRadio", value: "" },
        { name: "SelectBox", value: "" }
    ])
    const enableButton = orderingdata.filter((it) => it.value == "")

    const handleChange = (name, value) => {
        let Index
        let TempArr = orderingdata.map((item) => ({ ...item }))
        let obj = TempArr.find((item, index) => {
            if (item.name === name) {
                Index = index
            }
            return item.name === name
        })
        if (Index != undefined && obj) {
            let tempobj = { ...obj }
            tempobj.value = value
            obj = tempobj
            TempArr[Index] = obj
        }
        setorderingData(TempArr)
        const count = TempArr.filter((item) => item.value != "")
        const tempPercent = calculatePercentage(3, count.length)
        const siteinfodataper = Math.round(
            (tempPercent + inner2per + inner3per + inner4per) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Operations",
            "Ordering Process",
            TempArr,
            tempPercent,
            siteinfodataper,
            false
        )
        dispatch(SetSideBarData(tempsidebar))
    }

    const submitForm = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/discovery/operations/printer-names/${routerID}`,
            query: { inner: true }
        })
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
                A server or bartender always has access to the orders they
                start. Depending on the environment, they may also need to
                access their team&apos;s orders.
            </Typography>
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
                    color: theme.palette.textColor.main,
                    marginTop: { md: "24px", xs: "16px" }
                }}
            >
                Examples: A server may need to reorder drinks or print a receipt
                for another server’s table. A busy bar may require bartenders to
                work with each other&apos;s tabs.
            </Typography>
            <form aria-label="This is ordring process form" onSubmit={submitForm}>
                <Box
                    className="shadow"
                    display="flex"
                    alignItems="center"
                    sx={{
                        marginTop: { md: "23px", xs: "17px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        display: {
                            xs: "block",
                            md: "flex"
                        },
                        padding: {
                            xs: "19px 16px",
                            md: "23px 24px",
                            lg: "19px 24px"
                        }
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            minWidth: {
                                xs: "100%",
                                lg: "60%",
                                md: "68%"
                            },

                            color: "#1E1E1E",

                            marginBottom: { xs: "24px", md: "0px" }
                        }}
                    >
                        Should servers have access to other servers&apos;
                        orders?
                    </Typography>
                    <RadioGroup
                        aria-label="Does your location use a security camera system?"
                        name="FirstRadio"
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        value={orderingdata[0].value}
                        sx={{
                            display: "flex",
                            gap: { md: 6, xs: 7.5 },
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: { md: "flex-end" }
                        }}
                    >
                        <FormControlLabel
                            value="Yes"
                            sx={{
                                marginLeft: "0px !important",
                                color: "#5c5c5c"
                            }}
                            control={
                                <Radio
                                    aria-label="This is radio button for yes option"
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "#f5f5f5 !important"
                                        },
                                        "&.Mui-checked": {
                                            color: disabled
                                                ? "#5c5c5c"
                                                : theme.palette.primary.main
                                        },
                                        padding: {
                                            md: "4px 4px 4px 4px !important",
                                            xs: "0px 0px 0px 0px !important"
                                        },
                                        mr: {
                                            md: "8px !important",
                                            xs: "10px !important"
                                        }
                                    }}
                                    disabled={disabled}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            value="No"
                            sx={{
                                marginRight: "0px !important",
                                color: "#5c5c5c"
                            }}
                            control={
                                <Radio
                                aria-label="This is radio button for no option"
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "#f5f5f5 !important"
                                        },
                                        "&.Mui-checked": {
                                            color: disabled
                                                ? "#5c5c5c"
                                                : theme.palette.primary.main
                                        },
                                        padding: {
                                            md: "4px 4px 4px 4px !important",
                                            xs: "0px 0px 0px 0px !important"
                                        },
                                        mr: {
                                            md: "7px !important",
                                            xs: "10px !important"
                                        }
                                    }}
                                    disabled={disabled}
                                />
                            }
                            label="No"
                        />
                    </RadioGroup>
                </Box>
                <Box
                    className="shadow"
                    display="flex"
                    alignItems="center"
                    sx={{
                        marginTop: { md: "24px", xs: "16px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        display: {
                            xs: "block",
                            md: "flex"
                        },
                        padding: {
                            xs: "19px 16px",
                            md: "23px 24px",
                            lg: "19px 24px"
                        }
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            minWidth: {
                                xs: "100%",
                                lg: "60%",
                                md: "68%"
                            },

                            color: "#1E1E1E",

                            marginBottom: { xs: "24px", md: "0px" }
                        }}
                    >
                        Should bartenders have access to other bartenders&apos;
                        orders?
                    </Typography>
                    <RadioGroup
                        aria-label="Does your location use a security camera system?"
                        name="SecondRadio"
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        value={orderingdata[1].value}
                        sx={{
                            display: "flex",
                            gap: { md: 6, xs: 7.5 },
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: { md: "flex-end" }
                        }}
                    >
                        <FormControlLabel
                            value="Yes"
                            sx={{
                                marginLeft: "0px !important",
                                color: "#5c5c5c"
                            }}
                            control={
                                <Radio
                                aria-label="This is radio button for yes option"
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "#f5f5f5 !important"
                                        },
                                        "&.Mui-checked": {
                                            color: disabled
                                                ? "#5c5c5c"
                                                : theme.palette.primary.main
                                        },
                                        padding: {
                                            md: "4px 4px 4px 4px !important",
                                            xs: "0px !important"
                                        },
                                        mr: {
                                            md: "8px !important",
                                            xs: "10px !important"
                                        }
                                    }}
                                    disabled={disabled}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            value="No"
                            sx={{
                                marginRight: "0px !important",

                                color: "#5c5c5c"
                            }}
                            control={
                                <Radio
                                aria-label="This is radio button for no option"
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "#f5f5f5 !important"
                                        },
                                        "&.Mui-checked": {
                                            color: disabled
                                                ? "#5c5c5c"
                                                : theme.palette.primary.main
                                        },
                                        padding: {
                                            md: "4px 4px 4px 4px !important",
                                            xs: "0px !important"
                                        },
                                        mr: {
                                            md: "7px !important",
                                            xs: "10px !important"
                                        }
                                    }}
                                    disabled={disabled}
                                />
                            }
                            label="No"
                        />
                    </RadioGroup>
                </Box>
                <Box
                    className="shadow"
                    sx={{
                        marginTop: { md: "24px", xs: "16px" },
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        padding: { xs: "19px 16px", md: " 23px 24px" }
                    }}
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
                            color: "#1E1E1E",
                            marginBottom: "24px"
                        }}
                    >
                        Pivot Seating allows a table&apos;s order to be entered
                        by seat number to ensure correct tray setup and delivery
                        of items.
                        <br />
                        Additionally, Ordering Process can show next to items
                        when they print or display at certain prep stations.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { md: "row", xs: "column" },
                            justifyContent: {
                                md: "space-between",
                                xs: "flex-start"
                            },
                            alignItems: { md: "center" }
                        }}
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

                                maxWidth: {
                                    xs: "100%",
                                    lg: "100%"
                                },
                                marginBottom: { xs: "16px", md: "0px" },
                                color: "#1E1E1E"
                            }}
                        >
                            Do you use Pivot Seating?
                        </Typography>
                        <SelectBox
                            ariaLabel="This is ordring process selectbox"
                            defaultLabel={"Select an Option"}
                            required={true}
                            name="SelectBox"
                            disabled={disabled}
                            initialValue={orderingdata}
                            list={[
                                {
                                    label: "I do not use pivot seating",
                                    value: "I do not use pivot seating"
                                },
                                {
                                    label: "I use pivot seating",
                                    value: "I use pivot seating"
                                },
                                { label: "I don’t know", value: "I don’t know" }
                            ]}
                            handleChange={handleChange}
                            value={""}
                            width={340}
                            bgColor="white"
                        />
                    </Box>
                </Box>
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: { xs: "24px", md: "32px" }
                    }}
                />

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        flexDirection: {
                            lg: "row",
                            md: "column",
                            sm: "column",
                            xs: "column"
                        },
                        paddingY: { md: "24px", xs: "25px" }
                    }}
                >
                    <Box
                        display="flex"
                        sx={{
                            mt: { xs: "auto", md: "-1px" },
                            justifyContent: "flex-end",
                            flexDirection: {
                                lg: "row",
                                md: "row",
                                sm: "column",
                                xs: "column"
                            }
                        }}
                    >
                        {" "}
                        <CommonButton
                            className={"next-button"}
                            type="submit"
                            ariaTag={"This is Next Step Button"}
                            variant={"contained"}
                            disabled={enableButton.length > 0}
                            mt={{ xs: "8px", md: "0px" }}
                            px={"20px"}
                            py={{ xs: "12px", md: "11px" }}
                            color="white"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            content={"Next Step"}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
