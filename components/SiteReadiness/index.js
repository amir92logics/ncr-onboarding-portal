import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Divider, Checkbox } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import SiteReadinessTable from "./SiteReadinessTable"
import {
    setEmptySiteReadinessData,
    SetSubTasks,
    SetTasks
} from "../../redux-setup/dataSlice"
import SiteReadinessLoader from "./SiteReadinessLoader/index"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import ConfirmationNotification from "../../components/common/ConfirmationNotification"
import {
    useUpdateDataMutation,
    useLazyActionsgetQuery
} from "../../redux-setup/api/data"
import theme from "../../src/theme"
import CommonButton from "../../components/common/CommonButton"

export default function SiteReadiness() {
    const [loading, setLoading] = useState("")
    const router = useRouter()
    const routerID = router.query.id
    const [toggleIndex, setToggleIndex] = useState(null)
    const [posting] = useState(false)
    const [fetching] = useState(false)
    const [disableSubmit] = useState(false)
    const [setBtnDisable] = useState(true)
    const [actionstrigger] = useLazyActionsgetQuery()
    const [submitDate] = useState(new Date().toString())
    const [updatedata] = useUpdateDataMutation()
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const data = useSelector((state) => state.dataSlice.EmptySiteReadinessData)
    const user = useSelector((state) => state.auth.user)
    const [disabled, setDisable] = useState(false)
    useEffect(() => {
        if (tasks.length > 0) {
            let infodata = tasks.find(
                (it) => it.task_name == "Site Readiness"
            ).json
            if (infodata) {
                setDisable(true)
                dispatch(setEmptySiteReadinessData(infodata?.data))
            }
        }
    }, [tasks])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading("loading")
        const tempData = {
            taskData: null,
            data: data,
            submit_date: submitDate,
            user_email: user.email
        }

        updatedata({
            record_id_quickbase: routerID,
            task_name: "Site Readiness",
            json_data: tempData
        })
            .unwrap()
            .then((res) => {
                setDisable(true)
                actionstrigger(routerID)
                    .unwrap()
                    .then((res) => {
                        setTimeout(() => {
                            setLoading("confirm")
                            setTimeout(() => {
                                router.push({
                                    pathname: `/actions/${routerID}`
                                })
                            }, 2000)
                        }, 2000)
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => {
                        setLoading("error")
                    })
            })
            .catch((err) => {
                setLoading("error")
            })
    }

    const handleChange = (e) => {
        let temp = [...data]
        let current = { ...temp[4] }
        current.submitted = e.target.checked
        temp[4] = current
        dispatch(setEmptySiteReadinessData(temp))
    }

    const handleclose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                router.push({
                    pathname: `/actions/${routerID}`
                })
            }, 2000)
        } else {
            setLoading("")
        }
    }
    const handleBack = () => {
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    return fetching ? (
        <SiteReadinessLoader />
    ) : (
        <Box className="site-rediness">
            <form aria-label={`This is site readiness form`} onSubmit={(e) => handleSubmit(e)}>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box
                        display="flex"
                        alignItems="start"
                        sx={{
                            width: {
                                xs: "100%",
                                xl: "auto"
                            }
                        }}
                    >
                        <Box
                            width="100%"
                            sx={{
                                width: {
                                    xs: "100%"
                                }
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="flex-start"
                                flexDirection={"column"}
                                sx={{
                                    maxWidth: {
                                        lg: "100%",
                                        xs: "100%"
                                    }
                                }}
                                padding="0px 0px 0px 0px"
                            >
                                <Typography
                                    className="overtime-text"
                                    sx={{
                                        paddingBottom: {
                                            md: "32px",
                                            sm: "27px",
                                            xs: "16px"
                                        },
                                        color: "#1E1E1E"
                                    }}
                                >
                                    In order to ensure an efficient and
                                    successful installation, NCR needs
                                    confirmation your site is ready. Please
                                    review the checklist items below. NCR
                                    requires these items to be completed prior
                                    to your scheduled installation date.
                                </Typography>
                                <SiteReadinessTable
                                    disabled={disabled}
                                    setBtnDisable={setBtnDisable}
                                    posting={posting}
                                    data={data}
                                    disableSubmit={disableSubmit}
                                    marginTop={false}
                                    toggleIndex={toggleIndex}
                                    index={0}
                                    setToggleIndex={setToggleIndex}
                                />
                                <SiteReadinessTable
                                    disabled={disabled}
                                    setBtnDisable={setBtnDisable}
                                    posting={posting}
                                    data={data}
                                    disableSubmit={disableSubmit}
                                    marginTop={true}
                                    toggleIndex={toggleIndex}
                                    index={1}
                                    setToggleIndex={setToggleIndex}
                                />
                                <SiteReadinessTable
                                    disabled={disabled}
                                    setBtnDisable={setBtnDisable}
                                    posting={posting}
                                    data={data}
                                    disableSubmit={disableSubmit}
                                    marginTop={true}
                                    toggleIndex={toggleIndex}
                                    index={2}
                                    setToggleIndex={setToggleIndex}
                                />
                                <SiteReadinessTable
                                    disabled={disabled}
                                    setBtnDisable={setBtnDisable}
                                    posting={posting}
                                    data={data}
                                    disableSubmit={disableSubmit}
                                    marginTop={true}
                                    toggleIndex={toggleIndex}
                                    index={3}
                                    setToggleIndex={setToggleIndex}
                                />
                            </Box>

                            <Box
                                className="site-readiness"
                                sx={{
                                    marginTop: {
                                        lg: "32px",
                                        xs: "32px"
                                    }
                                }}
                            >
                                <FormControlLabel
                                    disabled={disabled}
                                    control={
                                        <Checkbox
                                            disabled={disableSubmit}
                                            checked={data[4]?.submitted}
                                            onChange={handleChange}
                                            style={{
                                                transform: "scale(.9)"
                                            }}
                                            sx={{
                                                mt: "-8px",
                                                "&:hover": {
                                                    background: "#F5F5F5"
                                                }
                                            }}
                                            required
                                        />
                                    }
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        columnGap: 1.5,
                                        color: theme.palette.textColor.main
                                    }}
                                    label={
                                        <Typography
                                            sx={{
                                                color: theme.palette.textColor
                                                    .main
                                            }}
                                        >
                                            {" "}
                                            I certify that all above
                                            requirements have been met and to
                                            the best of my knowledge the site is
                                            ready to have the NCR provided and
                                            specified equipment installed. If my
                                            install needs to be rescheduled, I
                                            acknowledge and agree to provide
                                            full payment upon receiving the
                                            hardware and agree to pay any
                                            additional travel charges or
                                            rescheduling fees that are
                                            associated with having to return to
                                            complete the installation, if the
                                            installation cannot be completed due
                                            to improper site readiness. I
                                            further acknowledge and agree that I
                                            understand that the hardware support
                                            coverage date on my hardware
                                            commences on the date that the
                                            hardware is delivered to my
                                            requested location.
                                        </Typography>
                                    }
                                />
                            </Box>
                            <Divider
                                className="divider-col"
                                sx={{
                                    width: "100%",
                                    mt: { md: 8, xs: 6 }
                                }}
                            />

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                sx={{
                                    py: 6,
                                    flexDirection: {
                                        md: "row",
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
                                    py={"12px"}
                                    color={theme.palette.secondary.main}
                                    fontSize="16px"
                                    lineHeight="24px"
                                    fontWeight="600"
                                    width={{ md: "auto", xs: "100%" }}
                                    content={"Back"}
                                    onclickHandler={handleBack}
                                />

                                 <CommonButton
                                    className={"next-button"}
                                    type="submit"
                                    ariaTag={"This is Submit Button"}
                                    variant={"contained"}
                                    disabled={
                                        posting ||
                                        disableSubmit ||
                                        disabled ||
                                        data.some((item) => !item?.submitted)
                                    }
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
                                    content={"Submit"}
                                    mt={{ xs: "8px", md: "0px" }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </form>
            <ConfirmationNotification
                open={loading}
                title={"Site Readiness"}
                close={() => handleclose()}
            />
        </Box>
    )
}
