import React, { useEffect, useState } from "react"
import { Button, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import Popup from "./Popup"
import DeletePopUp from "./DeletePopUp"
import ClockComp from "../ClockCom"
import theme from "../../../src/theme"
import { ConfirmationTooltip } from "../../Tooltip/ConfirmationTooltip"

function AddNewItem({
    title,
    buttonText,
    deleteTitle,
    additionalArray,
    marginTop,
    setAdditonal,
    description,
    type,
    disabled,
    ToolTipText,
    hideTooltip,
    isDayparts,
    extraMarginFromDayPartsLg,
    extraMarginFromDayPartsSm,
    fontSizeSm,
    fontSizeMd,
    AdditionalPrinterGroup,
    printer,
    width
}) {
    const md = useMediaQuery("(max-width:671px)")

    const [arrayOfItems, setArrayOfItems] = useState([""])
    const [addNew, setAddNew] = useState(false)
    const [newItem, setNewItem] = useState("")
    const [success, setSucces] = useState(false)
    const [deletedID, setDeletedID] = useState(null)
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const isMobile = useMediaQuery((th) => th.breakpoints.down("md"))

    useEffect(() => {
        setArrayOfItems(additionalArray)
    }, [additionalArray])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSucces(false)
                setAddNew(false)
                setNewItem("")
            }, 1000)
        }
    }, [success])

    const handleAddNewItem = () => {
        if (isDayparts) {
            if (newItem[1].Value !== "") {
                const tempArray = [...arrayOfItems]
                tempArray.push(newItem)
                setAdditonal && setAdditonal(tempArray)
                setArrayOfItems(tempArray)
                setSucces(true)
            } else {
                setAddNew(false)
            }
        } else {
            if (newItem) {
                const tempArray = [...arrayOfItems]
                tempArray.push(newItem)
                setAdditonal && setAdditonal(tempArray)
                setArrayOfItems(tempArray)
                setSucces(true)
            } else {
                setAddNew(false)
            }
        }
    }
    const handleDelete = () => {
        const tempArray = arrayOfItems
        const tempArryData = tempArray.filter(
            (item, index) => index !== deletedID
        )
        setArrayOfItems([...tempArryData])
        setAdditonal([...tempArryData])
        setDeletedID(null)
        setShowDeletePopUP(false)
    }

    const handleDeletePopup = (id) => {
        if (dontAskDeletePopup) {
            const tempArray = arrayOfItems
            const tempArryData = tempArray.filter((item, index) => index !== id)
            setArrayOfItems([...tempArryData])
            setAdditonal([...tempArryData])
            setDeletedID(null)
            setShowDeletePopUP(false)
        } else {
            setDeletedID(id)
            setShowDeletePopUP(true)
        }
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    marginTop: {
                        xl: marginTop,
                        lg: isDayparts
                            ? extraMarginFromDayPartsLg || "24px"
                            : marginTop,
                        md: marginTop,
                        xs: title.includes("Job Codes")
                            ? "18px"
                            : title.includes("Void Reasons")
                                ? "32px"
                                : title.includes("Printer Groups")
                                    ? "25px"
                                    : extraMarginFromDayPartsSm || "24px"
                    },
                    justifyContent: { xs: "space-between", md: "flex-start" },
                    alignItems: "center"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        paddingRight: "16px",
                        fontSize: {
                            lg: fontSizeMd || "17.7px",
                            xs: fontSizeSm || "17.7px"
                        },
                        lineHeight: {
                            lg: "28px",
                            xs: "28px"
                        },
                        color: "#1E1E1E"
                    }}
                >
                    {!printer && title && title}
                </Typography>
                {hideTooltip ? (
                    ""
                ) : (
                    <Box
                        sx={{
                            fontWeight: 400,
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "-11px",
                            fontSize: "12px",
                            lineHeight: {
                                lg: "18px",
                                xs: "16px"
                            },
                            color: "#5C5C5C",
                            width: {
                                md: "120px",
                                sm: "128px"
                            },
                            display: "flex"
                        }}
                    >
                        View Examples
                        <Box
                            sx={{
                                paddingLeft: { xs: "9.7", md: "9.5px" },
                                marginTop: "3px",
                                marginLeft: "0px",
                                position: { xs: "relative", md: "unset" },
                                left: { md: "3px", xs: "11px" }
                            }}
                        >
                            {title === "Add New Printer" ||
                                title === "Printer Groups" ||
                                title === "Menu Category" ||
                                title === "Additional Printer Groups" ? (
                                // <ConfirmationTooltip text={ToolTipText}  width={width}/>
                                <Tooltip
                                    aria-label=""
                                    title={ToolTipText}
                                    arrow={true}
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                color: "#fff",
                                                fontSize: "12px",
                                                padding: "6px 12px",
                                                fontWeight: 400,
                                                lineHeight: "18px"
                                            }
                                        }
                                    }}
                                    enterTouchDelay={0}
                                >
                                    <svg
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>{`this is ${title} tooltip icon`}</title>
                                        <path
                                            d="M8.16406 4.83329H9.83073V6.49996H8.16406V4.83329ZM8.16406 8.16663H9.83073V13.1666H8.16406V8.16663ZM8.9974 0.666626C4.3974 0.666626 0.664062 4.39996 0.664062 8.99996C0.664062 13.6 4.3974 17.3333 8.9974 17.3333C13.5974 17.3333 17.3307 13.6 17.3307 8.99996C17.3307 4.39996 13.5974 0.666626 8.9974 0.666626ZM8.9974 15.6666C5.3224 15.6666 2.33073 12.675 2.33073 8.99996C2.33073 5.32496 5.3224 2.33329 8.9974 2.33329C12.6724 2.33329 15.6641 5.32496 15.6641 8.99996C15.6641 12.675 12.6724 15.6666 8.9974 15.6666Z"
                                            fill="#757575"
                                        />
                                    </svg>
                                </Tooltip>
                            ) : (
                                <>
                                    {" "}
                                    <Box>
                                        <ConfirmationTooltip
                                            ariaLabel={`This is ${title} tooltip`}
                                            text={
                                                "You can add addtional items here"
                                            }
                                            additional="additional"
                                        />
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection:
                        buttonText == "Add Printer Routing"
                            ? { xs: "row" }
                            : { md: "row", xs: "column" },
                    flexWrap: "wrap !important",
                    justifyContent:
                        buttonText == "Add Printer Routing"
                            ? "flex-end"
                            : "flex-start",
                    alignItems:
                        buttonText == "Add Printer Routing"
                            ? "flex-end"
                            : "center"
                }}
            >
                {buttonText == "Add Printer Routing"
                    ? ""
                    : arrayOfItems?.length > 0 &&
                    !isDayparts &&
                    arrayOfItems?.map((item, index) => {
                        return (
                            <Typography
                                key={`${index + 1}`}
                                sx={{
                                    "&:hover .delete-button": {
                                        display: !disabled && "block"
                                    },
                                    "&:hover": {
                                        boxShadow:
                                            "0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.02)"
                                    },
                                    position: "relative",
                                    ".delete-button": {
                                        display: {
                                            xs: !disabled && "block",
                                            md: "none"
                                        }
                                    },
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "auto"
                                    },
                                    textAlign: "center",
                                    marginTop: title.includes("Petty Cash")
                                        ? {
                                            xs: "8px",
                                            md: "16px",
                                            lg: "16.3px",
                                            xl: "15.7px"
                                        }
                                        : title.includes("Void Reasons")
                                            ? {
                                                xs: "16px",
                                                sm: "6px",
                                                md: "14px",
                                                lg: "16px"
                                            }
                                            : { xs: "16px" },
                                    fontWeight: 400,
                                    padding: "12px 24px",
                                    mr: title.includes("Petty Cash")
                                        ? {
                                            lg: "6px",
                                            md: "6.9px",
                                            xs: "5px"
                                        }
                                        : "8px",
                                    fontSize: {
                                        lg: "14px",
                                        xs: "14px"
                                    },
                                    lineHeight: {
                                        lg: "21px",
                                        xs: "16px"
                                    },
                                    color: "#5c5c5c !important",
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #e0e0e0",
                                    display:
                                        title ===
                                        "Add Additional Day Parts" &&
                                        "none"
                                }}
                            >
                                <Box
                                    component={"span"}
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
                                        width={isMobile ? 20 : 16}
                                        height={isMobile ? 20 : 16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>{`this is delete icon`}</title>
                                        <path
                                            d="M8 0.5C3.8525 0.5 0.5 3.8525 0.5 8C0.5 12.1475 3.8525 15.5 8 15.5C12.1475 15.5 15.5 12.1475 15.5 8C15.5 3.8525 12.1475 0.5 8 0.5ZM11.75 10.6925L10.6925 11.75L8 9.0575L5.3075 11.75L4.25 10.6925L6.9425 8L4.25 5.3075L5.3075 4.25L8 6.9425L10.6925 4.25L11.75 5.3075L9.0575 8L11.75 10.6925Z"
                                            fill="#F44336"
                                        />
                                    </svg>
                                </Box>

                                {typeof item === "string" ? (
                                    item
                                ) : (
                                    <Box
                                        component={"span"}
                                        display={"none"}
                                        gap={"15px"}
                                        justifyContent="space-between"
                                    >
                                        {item?.map((child, i) => {
                                            return child.type == "time" ? (
                                                <Box
                                                    key={`${child.Name}${i + 1
                                                        }`}
                                                >
                                                    {!md ? (
                                                        <ClockComp
                                                            ariaLabel={`This is ${child.Name} input`}
                                                            isMobile={false}
                                                            isCon={true}
                                                            required={true}
                                                            name={`${child.Name}`}
                                                            handleChange={() => { }}
                                                            isDaypart={true}
                                                            value={
                                                                child.Value
                                                            }
                                                            error={false}
                                                        />
                                                    ) : (
                                                        <ClockComp
                                                            ariaLabel={`This is ${child.Name} input`}
                                                            isMobile={true}
                                                            isCon={true}
                                                            required={true}
                                                            name={`${child.Name}`}
                                                            handleChange={() => { }}
                                                            isDaypart={true}
                                                            value={
                                                                child.Value
                                                            }
                                                            error={false}
                                                        />
                                                    )}
                                                </Box>
                                            ) : (
                                                <Box
                                                    key={`${child.Value}+${i + 1
                                                        }`}
                                                    sx={{
                                                        marginY: "auto",
                                                        fontSize: "16px",
                                                        color: "#1E1E1E"
                                                    }}
                                                >
                                                    {child.Value}
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                )}
                            </Typography>
                        )
                    })}

                {!success && (
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            display:
                                buttonText == "Add Printer Routing" && "flex",
                            justifyContent:
                                buttonText == "Add Printer Routing" &&
                                "flex-end"
                        }}
                    >
                        {buttonText == "Add Printer Routing2" ? (
                            <Button
                                onClick={() => setAddNew(true)}
                                aria-label={`This is ${title} button`}
                                disabled={disabled}
                                className="next-button"
                                sx={{
                                    textTransform: "initial",
                                    borderRadius: "8px",
                                    padding: "10px 18px",
                                    fontWeight: 600,
                                    display: "flex",
                                    gap: 2,
                                    justifyContent: title.includes(
                                        "Void Reasons"
                                    )
                                        ? { xs: "center", md: "space-between" }
                                        : buttonText == "Add Printer Routing"
                                            ? "flex-end"
                                            : "center",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    color: `white `,
                                    transition: "all",
                                    "&:hover": {
                                        backgroundColor: "#1D4ED808"
                                    }
                                }}
                            >
                                {title}

                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill={"#fff"}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>{`this is ${title} icon`}</title>
                                    <g clipPath="url(#clip0_785_927)">
                                        <path
                                            d="M10.8327 5.83268H9.16602V9.16602H5.83268V10.8327H9.16602V14.166H10.8327V10.8327H14.166V9.16602H10.8327V5.83268ZM9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 16.666C6.32435 16.666 3.33268 13.6743 3.33268 9.99935C3.33268 6.32435 6.32435 3.33268 9.99935 3.33268C13.6743 3.33268 16.666 6.32435 16.666 9.99935C16.666 13.6743 13.6743 16.666 9.99935 16.666Z"
                                            fill={"#fff"}
                                        />
                                    </g>
                                    <defs>
                                        <clipPath >
                                            <rect
                                                width={20}
                                                height={20}
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setAddNew(true)}
                                aria-label={`This is ${buttonText} button`}
                                disabled={disabled}
                                className="ncr-default-btn"
                                sx={{
                                    width: title.includes("Void Reasons")
                                        ? {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "227px"
                                        }
                                        : buttonText == "Add Printer Routing"
                                            ? { xs: "auto" }
                                            : buttonText == "Add Printer Routing2"
                                                ? { xs: "100" }
                                                : {
                                                    xs: "100%",
                                                    sm: "100%",
                                                    md: "auto"
                                                },
                                    marginTop: isDayparts
                                        ? { md: 6, xs: 4 }
                                        : title.includes("Void Reasons")
                                            ? { md: 3.5, xs: 4 }
                                            : buttonText == "Add Printer Routing"
                                                ? { md: "7px", xs: "0px" }
                                                : { md: 4, xs: 5.4 },
                                    textTransform: "initial",
                                    border:
                                        buttonText == "Add Printer Routing"
                                            ? ""
                                            : " 2px dashed #BDBDBD",
                                    borderRadius: "8px",
                                    padding:
                                        buttonText == "Add Printer Routing"
                                            ? "8px"
                                            : {
                                                xs: "10px 24px",
                                                md: "10px 22px"
                                            },
                                    fontWeight: 600,
                                    display: "flex",
                                    gap: title.includes("Void Reasons")
                                        ? { xs: 2, md: 0 }
                                        : buttonText == "Add Printer Routing"
                                            ? 1.6
                                            : 2,
                                    justifyContent: title.includes(
                                        "Void Reasons"
                                    )
                                        ? { xs: "center", md: "space-between" }
                                        : buttonText == "Add Printer Routing"
                                            ? "flex-end"
                                            : "center",
                                    fontSize: {
                                        xs:
                                            buttonText == "Add Printer Routing"
                                                ? "12px"
                                                : "14px"
                                    },
                                    lineHeight: {
                                        xs:
                                            buttonText == "Add Printer Routing"
                                                ? "18px"
                                                : "22px"
                                    },
                                    letterSpacing: title.includes(
                                        "Prep Printer Names"
                                    )
                                        ? "-0.004em"
                                        : title.includes("Sales Categories") ||
                                            title.includes("General Categories")
                                            ? "-0.005em"
                                            : "",
                                    color: "#1D4ED8",
                                    transition: "all",
                                    "&:hover":
                                        buttonText == "Add Printer Routing"
                                            ? ""
                                            : {
                                                color: "#1D4ED8",
                                                border: " 2px dashed #1D4ED8",
                                                backgroundColor: "#1D4ED808"
                                            },
                                    "&.focus": {
                                        color: "#1D4ED8 !important"
                                    }
                                }}
                            >
                                {buttonText}

                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill={
                                        disabled
                                            ? "rgba(0, 0, 0, 0.2)"
                                            : theme.palette.primary.main
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>{`this is ${buttonText} icon`}</title>
                                    <g clipPath="url(#clip0_785_927)">
                                        <path
                                            d="M10.8327 5.83268H9.16602V9.16602H5.83268V10.8327H9.16602V14.166H10.8327V10.8327H14.166V9.16602H10.8327V5.83268ZM9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 16.666C6.32435 16.666 3.33268 13.6743 3.33268 9.99935C3.33268 6.32435 6.32435 3.33268 9.99935 3.33268C13.6743 3.33268 16.666 6.32435 16.666 9.99935C16.666 13.6743 13.6743 16.666 9.99935 16.666Z"
                                            fill={
                                                disabled
                                                    ? "rgba(0, 0, 0, 0.2)"
                                                    : theme.palette.primary.main
                                            }
                                        />
                                    </g>
                                    <defs>
                                        <clipPath >
                                            <rect
                                                width={20}
                                                height={20}
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Button>
                        )}
                    </Box>
                )}
                {addNew && !success && (
                    <Popup
                        Title={{ title: title, description: description }}
                        newItem={newItem}
                        modalInfo={type}
                        handleTogglePopUp={setAddNew}
                        showPopUp={addNew}
                        onChange={setNewItem}
                        close={close}
                        arrayOfItems={arrayOfItems}
                        handleSubmitPopUp={() => handleAddNewItem()}
                        isDayparts={isDayparts}
                        AdditionalPrinterGroup={AdditionalPrinterGroup}
                    />
                )}

                {
                    <DeletePopUp
                        setDontAskDeletePopup={setDontAskDeletePopup}
                        title={title}
                        close={close}
                        deleteTitle={deleteTitle}
                        setShowDeletePopUP={setShowDeletePopUP}
                        showDeletePopUP={showDeletePopUP}
                        handleDeleteItem={handleDelete}
                    />
                }
                {buttonText == "Add Printer Routing" && success ? (
                    <Box sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}>
                        <Button
                            onClick={() => setAddNew(true)}
                            aria-label={`This is ${buttonText} button`}
                            disabled={disabled}
                            className="ncr-default-btn"
                            sx={{
                                width: title.includes("Void Reasons")
                                    ? { xs: "100%", sm: "100%", md: "227px" }
                                    : { xs: "100%", sm: "100%", md: "auto" },
                                marginTop: isDayparts
                                    ? 6
                                    : title.includes("Void Reasons")
                                        ? { md: 3.5, xs: 4 }
                                        : buttonText == "Add Printer Routing"
                                            ? { md: "7px", xs: "0px" }
                                            : { md: 4, xs: 5.4 },
                                textTransform: "initial",
                                border:
                                    buttonText == "Add Printer Routing"
                                        ? ""
                                        : " 2px dashed #BDBDBD",
                                borderRadius: "8px",
                                padding:
                                    buttonText == "Add Printer Routing"
                                        ? "8px 1px"
                                        : { xs: "10px 24px", md: "10px 22px" },
                                fontWeight: 600,
                                display: "flex",
                                gap: title.includes("Void Reasons")
                                    ? { xs: 2, md: 0 }
                                    : buttonText == "Add Printer Routing"
                                        ? 1.6
                                        : 2,
                                justifyContent: title.includes("Void Reasons")
                                    ? { xs: "center", md: "space-between" }
                                    : buttonText == "Add Printer Routing"
                                        ? "flex-end"
                                        : "center",
                                fontSize: {
                                    xs:
                                        buttonText == "Add Printer Routing"
                                            ? "12px"
                                            : "14px"
                                },
                                lineHeight: {
                                    xs:
                                        buttonText == "Add Printer Routing"
                                            ? "18px"
                                            : "22px"
                                },
                                letterSpacing: title.includes(
                                    "Prep Printer Names"
                                )
                                    ? "-0.004em"
                                    : title.includes("Sales Categories") ||
                                        title.includes("General Categories")
                                        ? "-0.005em"
                                        : "",
                                color: "#1D4ED8",
                                transition: "all",
                                "&:hover":
                                    buttonText == "Add Printer Routing"
                                        ? ""
                                        : {
                                            color: "#1D4ED8",
                                            border: " 2px dashed #1D4ED8",
                                            backgroundColor: "#1D4ED808"
                                        },
                                "&.focus": {
                                    color: "#1D4ED8 !important"
                                }
                            }}
                        >
                            {buttonText}

                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill={
                                    disabled
                                        ? "rgba(0, 0, 0, 0.2)"
                                        : theme.palette.primary.main
                                }
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`this is ${buttonText} icon`}</title>
                                <g clipPath="url(#clip0_785_927)">
                                    <path
                                        d="M10.8327 5.83268H9.16602V9.16602H5.83268V10.8327H9.16602V14.166H10.8327V10.8327H14.166V9.16602H10.8327V5.83268ZM9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 16.666C6.32435 16.666 3.33268 13.6743 3.33268 9.99935C3.33268 6.32435 6.32435 3.33268 9.99935 3.33268C13.6743 3.33268 16.666 6.32435 16.666 9.99935C16.666 13.6743 13.6743 16.666 9.99935 16.666Z"
                                        fill={
                                            disabled
                                                ? "rgba(0, 0, 0, 0.2)"
                                                : theme.palette.primary.main
                                        }
                                    />
                                </g>
                                <defs>
                                    <clipPath >
                                        <rect
                                            width={20}
                                            height={20}
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Button>
                    </Box>
                ) : (
                    success && (
                        <Box
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            marginTop: { xs: "16px", sm: "16px", md: "16px" },
                            backgroundColor: theme.chips.background.complete,
                            boxShadow:
                                "0px 4px 8px 3px rgba(117, 117, 117, 0.04)",
                            borderRadius: "6px",

                            padding: "12px 24px",
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: {
                                lg: "14px",
                                xs: "16px"
                            },
                            lineHeight: {
                                lg: "21px",
                                xs: "24px"
                            },
                            color:theme.chips.text.complete
                        }}
                    >
                        <svg
                            style={{ marginRight: "8px" }}
                            width={20}
                            height={21}
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`This is Saved icon`}</title>
                            <rect
                                y="0.5"
                                width={20}
                                height={20}
                                rx={10}
                                fill={`${theme.chips.text.complete}`}
                            />
                            <path
                                d="M5 11.4986L8.07263 14.6668L15 6.3335"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Saved
                    </Box>
                    )
                )}
            </Box>
        </>
    )
}

AddNewItem.defaultProps = {
    type: "Enter Name"
}
export default AddNewItem
