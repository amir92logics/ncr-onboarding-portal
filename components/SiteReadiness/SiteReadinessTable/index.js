import React, { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
    TableRow,
    TableCell,
    Collapse,
    Table,
    TableBody,
    IconButton,
    FormControlLabel,
    Checkbox,
    Tooltip,
    tooltipClasses,
    useMediaQuery
} from "@mui/material"
import { useDispatch } from "react-redux"
import { styled } from "@mui/system"
import theme from "../../../src/theme"
import Image from "next/image"
import { OverViewStatusChip } from "../../common/CustomStatusChip"
import { setEmptySiteReadinessData } from "../../../redux-setup/dataSlice"
const SetContant = (index, id, tooltipOpen, settooltipOpen, time, setTime) => {
    const lg = useMediaQuery(theme.breakpoints.up("xl"))

    const setdata = (e) => {
        clearTimeout(time)
        settooltipOpen(e)
        setTime(
            setTimeout(() => {
                settooltipOpen("")
            }, 2000)
        )
    }
    const xs = useMediaQuery(theme.breakpoints.up("xs"))
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip   {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#616161",
            borderRadius: "8px",
            margin: xs ? "16px" : ""
        },
        [`& .${tooltipClasses.arrow}`]: {
            background: "transparent",
            "&:before": {
                background: "#616161"
            }
        }
    }))
    switch (index) {
        case 0:
            switch (id) {
                case 0:
                    return `All electrical circuits are dedicated, isolated, and grounded.`
                case 1:
                    return (
                        <Box sx={{ position: "relative" }}>
                            All{" "}
                            {lg ? (
                                <LightTooltip
                                  aria-label=""
                                    sx={{
                                        left: "10px !important"
                                    }}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 5.3,
                                                py: 4,
                                                position: "relative",
                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                Outlets
                                            </Box>
                                            <Image
                                                width={222}
                                                height={152}
                                                alt={"This is an outlets image"}
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/outlets.png`}
                                            />
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                >
                                    <Typography
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textUnderlineOffset: 4,
                                            textDecoration: "underline"
                                        }}
                                    >
                                        outlets
                                    </Typography>
                                </LightTooltip>
                            ) : (
                                <LightTooltip
                                aria-label=""
                                    sx={{
                                        left: "10px !important",
                                        mb: "0"
                                    }}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 5.3,
                                                py: 4,
                                                position: "relative",
                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                Outlets
                                            </Box>
                                            <Image

                                                width={222}
                                                height={152}
                                                alt={"This is an outlets image"}
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/outlets.png`}
                                            />
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                    open={tooltipOpen == "Outlets"}
                                >
                                    <Typography
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setdata("Outlets")
                                        }}
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textUnderlineOffset: 4,
                                            textDecoration: "underline"
                                        }}
                                    >
                                        outlets
                                    </Typography>
                                </LightTooltip>
                            )}{" "}
                            have been tested to provide 110 to 120 volts of
                            power. `
                        </Box>
                    )
                case 2:
                    return "There is a duplex (2 plugs) at each terminal or kitchen station."
                case 3:
                    return "Each prep printer station has a simplex outlet (1 plug) or duplex outlet (2 plugs)."
                case 4:
                    return "There is a quad outlet and duplex outlet (6 plugs) at the file server location."
                default:
                    return null
            }
        case 1:
            switch (id) {
                case 0:
                    return "There are two data RJ45 Ethernet jacks per terminal (unless the Project Lead specifies more)."
                case 1:
                    return (
                        <Box sx={{ position: "relative" }}>
                            There is one{" "}
                            {lg ? (
                                <LightTooltip
                                aria-label=""
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 6,
                                                py: 4,
                                                position: "relative",
                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                Data Jack
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    columnGap: "15px",
                                                    mt: 3
                                                }}
                                            >
                                                <Image
                                                    height={140}
                                                    width={117}
                                                    alt={"This is an data jack image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/datajack1.png`}
                                                />
                                                <Image
                                                    height={140}
                                                    width={94}
                                                    alt={"This is an data jack image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/datajack2.png`}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                >
                                    <Typography
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textDecoration: "underline",
                                            textUnderlineOffset: 4
                                        }}
                                    >
                                        data jack
                                    </Typography>
                                </LightTooltip>
                            ) : (
                                <LightTooltip
                                aria-label={""}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 6,
                                                py: 4,
                                                position: "relative",
                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                Data Jack
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    columnGap: "15px",
                                                    mt: 3
                                                }}
                                            >
                                                <Image
                                                    height={140}
                                                    width={117}
                                                    alt={"This is an data jack image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/datajack1.png`}
                                                />
                                                <Image
                                                    height={140}
                                                    width={94}
                                                    alt={"This is an data jack image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/datajack2.png`}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                    open={tooltipOpen == "data jack"}
                                >
                                    <Typography
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setdata("data jack")
                                        }}
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textDecoration: "underline",
                                            textUnderlineOffset: 4
                                        }}
                                    >
                                        data jack
                                    </Typography>
                                </LightTooltip>
                            )}{" "}
                            per prep printer and kitchen display.
                        </Box>
                    )
                case 2:
                    return (
                        <Box sx={{ position: "relative" }}>
                            All data lines are terminated, connected to a{" "}
                            {lg ? (
                                <LightTooltip
                                aria-label=""
                                    sx={{
                                        left: { md: 0, xs: "-10px !important" }
                                    }}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 6,
                                                py: 4,
                                                position: "relative",
                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                Patch Panel
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    height: "100%"
                                                }}
                                            >
                                                <Image
                                                    height={54}
                                                    width={222}
                                                    alt={"This is an patch panel image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/patch-panel.png`}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                >
                                    <Typography
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textDecoration: "underline",
                                            textUnderlineOffset: 4
                                        }}
                                    >
                                        patch panel
                                    </Typography>
                                </LightTooltip>
                            ) : (
                                <LightTooltip
                                aria-label={""}
                                    sx={{
                                        left: { md: 0, xs: "-10px !important" }
                                    }}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 6,
                                                py: 4,
                                                position: "relative",
                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                Patch Panel
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    height: "100%"
                                                }}
                                            >
                                                <Image
                                                    height={54}
                                                    width={222}
                                                    alt={"This is an patch panel image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/patch-panel.png`}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                    open={tooltipOpen == "patch panel"}
                                >
                                    <Typography
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setdata("patch panel")
                                        }}
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",
                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textDecoration: "underline",
                                            textUnderlineOffset: 4
                                        }}
                                    >
                                        patch panel
                                    </Typography>
                                </LightTooltip>
                            )}{" "}
                            , and labeled.
                        </Box>
                    )

                case 3:
                    return (
                        <Box sx={{ position: "relative" }}>
                            {lg ? (
                                <LightTooltip
                                aria-label={""}
                                    sx={{
                                        left: "10px !important"
                                    }}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 6,
                                                py: 4,

                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                               2 Inch Drilled Holes
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    height: "100%"
                                                }}
                                            >
                                                <Image
                                                    width={222}
                                                    height={87}
                                                    alt={"This is an 2 inch drilled holes image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/holes.png`}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                >
                                    <Typography
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",

                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textDecoration: "underline",
                                            textUnderlineOffset: 4
                                        }}
                                    >
                                        Holes
                                    </Typography>
                                </LightTooltip>
                            ) : (
                                <LightTooltip
                                aria-label={""}
                                    sx={{
                                        left: "10px !important"
                                    }}
                                    title={
                                        <Box
                                            sx={{
                                                height: 204,
                                                width: 255,
                                                px: 6,
                                                py: 4,

                                                fontSize: theme.fontsize.base,
                                                color: theme.palette.secondary
                                                    .main
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    fontWeight: 600,
                                                    color: "#fff"
                                                }}
                                            >
                                                 2 Inch Drilled Holes
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    height: "100%"
                                                }}
                                            >
                                                <Image
                                                    width={222}
                                                    height={87}
                                                    alt={"This is an 2 inch drilled holes image"}
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/holes.png`}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    placement="top"
                                    arrow={true}
                                    open={tooltipOpen == "Holes"}
                                >
                                    <Typography
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setdata("Holes")
                                        }}
                                        component={"span"}
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "28px",

                                            "&:hover": {
                                                color: "#1e1e1e !important"
                                            },
                                            textDecoration: "underline",
                                            textUnderlineOffset: 4
                                        }}
                                    >
                                        Holes
                                    </Typography>
                                </LightTooltip>
                            )}{" "}
                            have been drilled to allow ease of access to all
                            data and power connection points on the equipment.
                            There are no obstructions by other furniture or
                            devices. All mounting brackets will be
                            professionally installed prior to the installation.
                        </Box>
                    )
                default:
                    return null
            }
        case 2:
            if (id === 0) {
                return "Fiber, cable, or DSL high-speed Internet (25 Mbps download / 5 Mbps upload minimum) is available."
            }
            return null

        case 3:
            switch (id) {
                case 0:
                    return "All the locations for the POS system have a stable, flat surface to have equipment placed."
                case 1:
                    return "Holes have been drilled to allow for access for cables to the equipment"
                case 2:
                    return "All mounting brackets will be installed by a contractor prior to install. (NCR will provide mounting hardware prior to that install)"
                default:
                    return null
            }
    }
}

export default function SiteReadinessTable({
    data,
    disabled,
    marginTop,
    setData,
    toggleIndex,
    setToggleIndex,
    index,
    disableSubmit,
    posting
}) {
    const [time, setTime] = useState("")
    const [tooltipOpen, settooltipOpen] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [updateCheckBox, setUpdateCheckBox] = useState(false)
    const handleOpen = (currState) => {
        setOpen(!open)

        setToggleIndex(index)
    }
    const handleCheckBox = (e, field, i) => {
        const tempData = [...data]
        let temp = { ...tempData[index] }
        let option = [...temp.options]
        let currentElement = { ...option[i] }
        currentElement.checked = e.target.checked

        option[i] = currentElement

        temp.options = option

        const result = temp?.options?.filter((item) => !item.checked)
        temp.submitted = result.length === 0 ? true : false

        tempData[index] = temp

        dispatch(setEmptySiteReadinessData(tempData))
        result.length === 0 && handleOpen()
        setUpdateCheckBox(!updateCheckBox)
    }
    const handleSelectAll = (e, index) => {
        e.stopPropagation()
        const tempData = [...data]
        let temp = { ...tempData[index] }
        let option = [...temp.options]

        for (let i = 0; i < option.length; i++) {
            let current = { ...option[i] }
            current.checked = e.target.checked

            option[i] = current
        }
        e.target.checked && setOpen(false)
        temp.options = option
        temp.submitted = e.target.checked

        tempData[index] = temp
        dispatch(setEmptySiteReadinessData(tempData))
    }
    const toggleOpenSvg = (
        <svg
            width={10}
            height={5}
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>This is toggle open icon</title>
            <path
                d="M11.832 5.91699L5.9987 0.0836587L0.165365 5.91699L11.832 5.91699Z"
                fill="black"
                fillOpacity="0.6"
            />
        </svg>
    )

    const toggleCloseSvg = (
        <svg
            width={10}
            height={5}
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>This is toggle close icon</title>
            <path
                d="M0.167969 0.0830078L6.0013 5.91634L11.8346 0.0830078L0.167969 0.0830078Z"
                fill="black"
                fillOpacity="0.6"
            />
        </svg>
    )
    return (
        <Box
            className="shadow"
            sx={{
                borderRadius: "8px",
                width: "100%",
                marginTop: marginTop
                    ? {
                          lg: "33px",
                          xs: "28px"
                      }
                    : ""
            }}
        >
            <Table
                sx={{
                    background: "white",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}
                aria-label="collapsible table"
            >
                <TableBody>
                    <TableRow
                        onClick={() => {
                            handleOpen(open)
                        }}
                        sx={{
                            display: "flex",
                            cursor: "pointer",
                            justifyContent: "space-between",
                            alignItems: "center",
                            "& > *": {
                                borderBottom: "unset",
                                backgroundColor: `white`
                            },
                            px: { md: 6, xs: 4 },
                            py: { md: "19px", xs: "19.5px" }
                        }}
                    >
                        <TableCell
                            sx={{
                                borderBottom: "unset",
                                padding: 0,
                                display: "flex",
                                alignItems: "center"
                            }}
                            align="left"
                        >
                            <FormControlLabel
                            aria-label={data[index]?.title}
                                disabled={disabled}
                                onChange={(e) => {
                                    handleSelectAll(e, index)
                                }}
                                checked={data[index].submitted}
                                control={
                                    <Checkbox
                                        onClick={(e) => e.stopPropagation()}
                                        required={true}
                                        sx={{
                                            transform: "scale(.9)",
                                            mt: { md: 0, xs: -0.2 },
                                            "&:hover": {
                                                background: "#F5F5F5"
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    display: "flex",
                                    alignItems: {
                                        md: "center",
                                        xs: "flex-start"
                                    },
                                    columnGap: 1.5
                                }}
                                label={
                                    <Typography
                                        aria-label={data[index]?.title}
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{
                                            mt: { md: 0, xs: 1.5 },
                                            fontSize: {
                                                xs: "20px"
                                            },
                                            lineHeight: {
                                                xs: "28px"
                                            },
                                            fontWeight: 600,
                                            color: "#1E1E1E"
                                        }}
                                    >
                                        {data[index]?.title}
                                    </Typography>
                                }
                                
                                
                            />
                        </TableCell>

                        <TableCell
                            sx={{ borderBottom: "unset", padding: 0 }}
                            align="left"
                        >
                            <Box
                                id={"collapse-table" + Math.random()}
                                sx={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                {/* <SiteReadinessStatusChip
                                    status={
                                        data[index]?.submitted
                                            ? "Complete"
                                            : "Warning"
                                    }
                                    label={
                                        data[index]?.submitted
                                            ? "Completed"
                                            : "Pending Items"
                                    }
                                /> */}
                                <OverViewStatusChip
                                    lineHeight="24px"
                                    fontSize="14px"
                                    px="11.5px"
                                    py="4px"
                                    fontWeight={500}
                                    hideSvg={true}
                                    status={
                                        data[index]?.submitted
                                            ? "completed"
                                            : "warning"
                                    }
                                    label={
                                        data[index]?.submitted
                                            ? "Completed"
                                            : "Pending Items"
                                    }
                                />
                                <IconButton
                                    sx={{
                                        marginLeft: {
                                            md: "19px",
                                            xs: "12px"
                                        },
                                        py: "8px",
                                        px: "6px"
                                    }}
                                    onClick={() => {
                                        handleOpen(open)
                                    }}
                                    aria-label="expand row"
                                    size="small"
                                >
                                    {open ? toggleOpenSvg : toggleCloseSvg}
                                </IconButton>
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            // aria-controls="collapse-table"
                            aria-label={`tasks row`}
                            sx={{
                                background: "white"
                            }}
                            style={{
                                paddingBottom: 0,
                                paddingTop: 0,
                                borderBottom: 0
                            }}
                            colSpan={6}
                        >
                            <Collapse
                                sx={{
                                    borderTop:
                                        "1px solid rgba(224, 224, 224, 1)"
                                }}
                                in={open}
                                timeout="auto"
                                unmountOnExit
                            >
                                <Box>
                                    <Box>
                                        <Box
                                            display="flex"
                                            flexDirection={"column"}
                                            justifyContent={"flex-start"}
                                            alignItems={"flex-start"}
                                            sx={{
                                                pt: { md: 4.4, xs: 4 },
                                                pb: { md: 6, xs: 5.7 },
                                                pl: { md: 0, xs: 0 },
                                                px: { lg: 2, md: 2 }
                                            }}
                                        >
                                            {data[index]?.options?.map(
                                                (item, idx) => {
                                                    return (
                                                        <FormControlLabel
                                                            disabled={disabled}
                                                            key={`${idx + 1}`}
                                                            onChange={(e) =>
                                                                handleCheckBox(
                                                                    e,
                                                                    item,
                                                                    idx
                                                                )
                                                            }
                                                            checked={
                                                                item.checked
                                                            }
                                                            control={
                                                                <Checkbox
                                                                    required={
                                                                        true
                                                                    }
                                                                    disabled={
                                                                        disableSubmit
                                                                    }
                                                                    sx={{
                                                                        transform:
                                                                            "scale(.9)",
                                                                        alignSelf:
                                                                            "flex-start",
                                                                        mt: {
                                                                            xs: "-6px",
                                                                            md: "-8px"
                                                                        },
                                                                        pl: 2.5,
                                                                        "&:hover":
                                                                            {
                                                                                background:
                                                                                    "#F5F5F5"
                                                                            }
                                                                    }}
                                                                />
                                                            }
                                                            sx={{
                                                                color: "#1E1E1E",
                                                                display:
                                                                    "inline-flex",
                                                                alignItems:
                                                                    "flex-start",
                                                                columnGap: 1.5,
                                                                fontSize: {
                                                                    lg: "16px",
                                                                    xs: "16px"
                                                                },
                                                                lineHeight: {
                                                                    lg: "24px",
                                                                    xs: "24px"
                                                                },

                                                                pt:
                                                                    idx !== 0
                                                                        ? {
                                                                              lg: "14px",
                                                                              md:
                                                                                  data[
                                                                                      index
                                                                                  ]
                                                                                      ?.options
                                                                                      .length -
                                                                                      1 ==
                                                                                  idx
                                                                                      ? "12px"
                                                                                      : "14.1px",
                                                                              xs:
                                                                                  data[
                                                                                      index
                                                                                  ]
                                                                                      ?.options
                                                                                      .length -
                                                                                      2 ==
                                                                                      idx ||
                                                                                  data[
                                                                                      index
                                                                                  ]
                                                                                      ?.options
                                                                                      .length -
                                                                                      1 ==
                                                                                      idx
                                                                                      ? "11px"
                                                                                      : "13px"
                                                                          }
                                                                        : "",
                                                                mr: 0
                                                            }}
                                                            aria-label={
                                                                item?.value
                                                            }
                                                            label={
                                                                <Typography
                                                                    className="siteReadiness"
                                                                    sx={{
                                                                        color: item.checked
                                                                            ? theme
                                                                                  .palette
                                                                                  .textColor
                                                                                  .main
                                                                            : theme
                                                                                  .palette
                                                                                  .secondary
                                                                                  .main
                                                                    }}
                                                                >
                                                                    {SetContant(
                                                                        index,
                                                                        idx,
                                                                        tooltipOpen,
                                                                        settooltipOpen,
                                                                        time,
                                                                        setTime
                                                                    )}
                                                                </Typography>
                                                            }
                                                        />
                                                    )
                                                }
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}
