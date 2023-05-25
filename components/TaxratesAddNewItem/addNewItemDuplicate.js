import React, { useEffect, useState } from "react"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useMediaQuery } from "@mui/material"

import Popup from "./Popup"
import DeletePopUp from "./DeletePopUp"
import { Cookie } from "@mui/icons-material"
import { ConfirmationTooltip } from "../Tooltip/ConfirmationTooltip"
import theme from "../../src/theme"

function AddNewItem({
    title,
    buttonText,
    check,
    additionalArray,
    marginTop,
    setAdditonal,
    description,
    type,
    ToolTipText,
    hideTooltip,
    isDayparts,
    Screen,
    disabled,
    deleteTitle,
    AdditionalPrinterGroup,
    updatedTooltip,
    name
}) {
    const md = useMediaQuery("(max-width:671px)")

    const [arrayOfItems, setArrayOfItems] = useState([""])
    const [addNew, setAddNew] = useState(false)
    const [newItem, setNewItem] = useState("")
    const [success, setSucces] = useState(false)
    const [deletedID, setDeletedID] = useState(null)
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const [enableButton, setEnableButton] = useState(true)
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
        const tempArray = [...arrayOfItems]
        tempArray.push(newItem)

        setAdditonal && setAdditonal(tempArray)
        setArrayOfItems(tempArray)
        setSucces(true)
    }
    const handleDelete = () => {
        const tempArray = arrayOfItems
        tempArray.splice(deletedID, 1)
        setArrayOfItems([...tempArray])
        setDeletedID(null)
        setShowDeletePopUP(false)
    }

    const handleDeletePopup = (id) => {
        if (dontAskDeletePopup) {
            setDeletedID(id)
            handleDelete()
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
                    marginTop: marginTop,
                    justifyContent: { xs: "space-between", md: "flex-start" },
                    alignItems: "center"
                }}
            >
                {Screen != "printer-routing" && (
                    <Typography
                        sx={{
                            mt: title == "Additional Tax Rates" && {
                                lg: 0,
                                md: 0.5,
                                sm: -1.5,
                                xs: -1.9
                            },
                            fontWeight: 600,
                            marginRight: updatedTooltip ? "2px" : "8px",
                            fontSize: {
                                lg: "18px",
                                xs: "18px"
                            },
                            lineHeight: {
                                lg: "28px",
                                xs: "28px"
                            },
                            color: "#1E1E1E"
                        }}
                    >
                        {title}
                    </Typography>
                )}
                {hideTooltip ? (
                    ""
                ) : (
                    <Typography
                        sx={{
                            fontWeight: 400,

                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: {
                                lg: "12px",
                                xs: "12px"
                            },
                            lineHeight: {
                                lg: "18px",
                                xs: "16px"
                            },

                            color: "#5C5C5C",
                            width: "120px",
                            display: title.includes("Additional")
                                ? {
                                      xs: "none",
                                      md: "flex",
                                      lg: "none",
                                      xl: "none"
                                  }
                                : "flex"
                        }}
                    >
                        View Examples
                        <Box
                            component={"span"}
                            sx={{ paddingLeft: "8px", marginTop: "3px" }}
                        >
                            {title === "Prep Printer Names" ||
                            title === "Additional Printer Groups" ? (
                                <ConfirmationTooltip text={ToolTipText} />
                            ) : updatedTooltip ? (
                                <Box sx={{}}>
                                    <ConfirmationTooltip
                                        text={"You can add addtional ite"}
                                        additional="additional"
                                        title={title}
                                        updatedTooltip={true}
                                    />
                                </Box>
                            ) : (
                                <Box component={"span"} sx={{}}>
                                    <ConfirmationTooltip
                                        text={
                                            "You can add addtional items here"
                                        }
                                        additional="additional"
                                    />
                                </Box>
                            )}
                        </Box>
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    flexWrap: "wrap !important",
                    justifyContent:
                        Screen === "printer-routing"
                            ? "flex-end"
                            : "flex-start",
                    alignItems: Screen === "printer-routing" ? "" : "center"
                }}
            >
                {!success && Screen != "printer-routing" ? (
                    <Box sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}>
                        <Button
                            disabled={disabled}
                            onClick={() => !disabled && setAddNew(true)}
                            aria-label={`This is ${buttonText} button`}
                            className="ncr-default-btn"
                            sx={{
                                boxSizing: "border-box",
                                width: { xs: "100%", sm: "100%", md: "auto" },
                                marginTop: name.includes("Tax Rates")
                                    ? { md: "24px", xs: "16px" }
                                    : "16px",
                                border: " 2px dashed rgba(0, 0, 0, 0.2)",
                                borderRadius: " 8px ",
                                padding: check ? "10px 21.5px" : "10px 21px",
                                fontWeight: 600,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                fontSize: {
                                    lg: "14px",
                                    xs: "14px"
                                },
                                lineHeight: {
                                    lg: "22px",
                                    xs: "22px"
                                },
                                color: theme.palette.primary.main,
                                transition: "all",
                                "&:hover": {
                                    color: theme.palette.primary.main,
                                    border: `2px dashed ${theme.palette.primary.main}`,
                                    backgroundColor: `#1D4ED808`
                                },
                                "&.focus": {
                                    color: `${theme.palette.primary.main} !important`
                                }
                            }}
                        >
                            {buttonText}

                            <svg
                                style={{ marginLeft: "8px" }}
                                width={20}
                                height={20}
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`this is ${buttonText} icon`}</title>
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
                ) : (
                    Screen === "printer-routing" && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            marginBottom="16px"
                            gap={"10px"}
                            sx={{ cursor: !disabled && "pointer" }}
                            onClick={() => !disabled && setAddNew(true)}
                        >
                            <Typography
                                className="addicons"
                                variant="body1"
                                fontWeight="600"
                                sx={{
                                    fontSize: "12px"
                                }}
                                color={
                                    disabled
                                        ? "rgba(0, 0, 0, 0.2)"
                                        : theme.palette.primary.main
                                }
                            >
                                Add New
                            </Typography>
                            <svg
                                width={16}
                                height={17}
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>{`this is Add New icon`}</title>

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
                                    d="M5.33325 8.5H10.6666"
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
                        </Box>
                    )
                )}
                {addNew && !success && (
                    <Popup
                        enableButton={enableButton}
                        Title={{ title: title, description: description }}
                        newItem={newItem}
                        Screen={"printer-routing"}
                        modalInfo={type}
                        handleTogglePopUp={setAddNew}
                        showPopUp={addNew}
                        onChange={setNewItem}
                        AdditionalPrinterGroup={AdditionalPrinterGroup}
                        arrayOfItems={arrayOfItems}
                        handleSubmitPopUp={() => handleAddNewItem()}
                        isDayparts={isDayparts}
                    />
                )}

                {
                    <DeletePopUp
                        setDontAskDeletePopup={setDontAskDeletePopup}
                        title={title}
                        deleteTitle={deleteTitle}
                        setShowDeletePopUP={setShowDeletePopUP}
                        showDeletePopUP={showDeletePopUP}
                        handleDeleteItem={handleDelete}
                    />
                }
                {success && Screen != "printer-routing" && (
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            marginTop: { xs: "16px", sm: "16px", md: "16px" },
                            backgroundColor: "#4CAF501A",
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
                                lg: "22px",
                                xs: "24px"
                            },
                            color: "#15803D ",
                            border: "2px  dashed transparent"
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
                            <title>{`this is  Saved icon`}</title>
                            <rect
                                y="0.5"
                                width={20}
                                height={20}
                                rx={10}
                                fill="#15803D "
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
                )}
            </Box>
        </>
    )
}
AddNewItem.defaultProps = {
    type: "Enter Name"
}
export default AddNewItem
