import React, { useState } from "react"
import Box from "@mui/material/Box"
import {
    Button,
    Dialog,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material"

export default function UploadPopUp({
    openPopUp,
    handleTogglePopUp,
    fileData,
    setnewDocument,
    base64Value
}) {
    const [type, setType] = useState("")
    const handleClose = () => {
        handleTogglePopUp(false)
    }
    const handleChange = (e) => {
        setType(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let tempData = {
            name: "",
            type: "",
            status: "Uploading...",
            base64Value: null
        }
        tempData["name"] = fileData.name
        tempData["type"] = type
        tempData["base64Value"] = base64Value
        setnewDocument(tempData)
        handleClose()
        setType("")
    }

    return (
        <Box>
            <Dialog
                className="upload-popup"
                open={openPopUp}
                onClose={handleClose}
                sx={{
                    "& div[role='dialog']": {
                        borderTopRightRadius: { md: 0, xs: "4px !important" },
                        borderTopLeftRadius: { md: 0, xs: "4px !important" },
                        borderBottomRightRadius: {
                            md: 0,
                            xs: "0px !important"
                        },
                        borderBottomLeftRadius: { md: 0, xs: "0px !important" },
                        borderRadius: { md: "4px !important" }
                    }
                }}
            >
                <DialogContent
                    sx={{
                        px: { md: "32px !important", xs: "24px !important" },
                        py: { md: "32px !important", xs: "24px !important" }
                    }}
                >
                    <Box sx={{display:'flex',justifyContent:"space-between"}}>
                    <Box
                        sx={{
                            fontSize: "24px",
                            lineHeight: "32px",
                            color: "#1E1E1E",
                            fontWeight: 600
                        }}
                    >
                        Upload Documents
                    </Box>
                    <Box
                                    sx={{
                                        cursor: "pointer",
                                        position: "relative",
                                        right: 8,
                                        top: -6
                                    }}
                                    onClick={() => handleClose()}
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is add document icon</title>
                                        <path
                                            d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929L12.7071 12.7071ZM11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071L12.7071 11.2929ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.2929 12.7071ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM7.70711 17.7071L12.7071 12.7071L11.2929 11.2929L6.29289 16.2929L7.70711 17.7071ZM12.7071 12.7071L17.7071 7.70711L16.2929 6.29289L11.2929 11.2929L12.7071 12.7071ZM11.2929 12.7071L16.2929 17.7071L17.7071 16.2929L12.7071 11.2929L11.2929 12.7071ZM12.7071 11.2929L7.70711 6.29289L6.29289 7.70711L11.2929 12.7071L12.7071 11.2929Z"
                                            fill="#5C5C5C"
                                        />
                                    </svg>
                                </Box>
                    </Box>
                    <form aria-label={`This is documents upload form`} onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            sx={{
                                display: "flex",
                                width: { md: "442px", xs: "100%" },
                                alignItems: "center",
                                marginTop: "",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                height="80px"
                                width="100%"
                                sx={{
                                    backgroundColor: "#F9FAFB",
                                    display: "flex",
                                    borderRadius: "8px",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    marginTop: 4,
                                    p:1.5
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <svg
                                        width={48}
                                        height={48}
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is add {fileData?.name} icon</title>
                                        <path
                                            d="M12 0C10.35 0 9 1.35 9 3V45C9 46.65 10.35 48 12 48H42C43.65 48 45 46.65 45 45V12L33 0H12Z"
                                            fill="#E2E5E7"
                                        />
                                        <path
                                            d="M36 12H45L33 0V9C33 10.65 34.35 12 36 12Z"
                                            fill="#B0B7BD"
                                        />
                                        <path
                                            d="M45 21L36 12H45V21Z"
                                            fill="#CAD1D8"
                                        />
                                        <path
                                            d="M39 39C39 39.825 38.325 40.5 37.5 40.5H4.5C3.675 40.5 3 39.825 3 39V24C3 23.175 3.675 22.5 4.5 22.5H37.5C38.325 22.5 39 23.175 39 24V39Z"
                                            fill="#F15642"
                                        />
                                        <path
                                            d="M9.53906 28.4218C9.53906 28.0258 9.85106 27.5938 10.3536 27.5938H13.1241C14.6841 27.5938 16.0881 28.6377 16.0881 30.6387C16.0881 32.5347 14.6841 33.5907 13.1241 33.5907H11.1216V35.1747C11.1216 35.7027 10.7856 36.0012 10.3536 36.0012C9.95756 36.0012 9.53906 35.7027 9.53906 35.1747V28.4218ZM11.1216 29.1042V32.0922H13.1241C13.9281 32.0922 14.5641 31.3827 14.5641 30.6387C14.5641 29.8002 13.9281 29.1042 13.1241 29.1042H11.1216Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M18.4374 36.0026C18.0414 36.0026 17.6094 35.7866 17.6094 35.2601V28.4471C17.6094 28.0166 18.0414 27.7031 18.4374 27.7031H21.1839C26.6649 27.7031 26.5449 36.0026 21.2919 36.0026H18.4374ZM19.1934 29.1671V34.5401H21.1839C24.4224 34.5401 24.5664 29.1671 21.1839 29.1671H19.1934Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M28.4889 29.2646V31.1711H31.5474C31.9794 31.1711 32.4114 31.6031 32.4114 32.0216C32.4114 32.4176 31.9794 32.7416 31.5474 32.7416H28.4889V35.2601C28.4889 35.6801 28.1904 36.0026 27.7704 36.0026C27.2424 36.0026 26.9199 35.6801 26.9199 35.2601V28.4471C26.9199 28.0166 27.2439 27.7031 27.7704 27.7031H31.9809C32.5089 27.7031 32.8209 28.0166 32.8209 28.4471C32.8209 28.8311 32.5089 29.2631 31.9809 29.2631H28.4889V29.2646Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M37.5 40.5H9V42H37.5C38.325 42 39 41.325 39 40.5V39C39 39.825 38.325 40.5 37.5 40.5Z"
                                            fill="#CAD1D8"
                                        />
                                    </svg>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            paddingLeft: "19px"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    md: "14px",
                                                    xs: "12px"
                                                },
                                                fontWeight: 500,
                                                lineHeight: "14px",
                                                color: "#1F2937"
                                            }}
                                        >
                                            {fileData?.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: 400,
                                                lineHeight: "12px",
                                                color: "#4B5563",
                                                paddingTop: "8px"
                                            }}
                                        >
                                            {Math.round(fileData?.size / 1024) >
                                            1024
                                                ? Math.round(
                                                      fileData?.size /
                                                          (1024 * 1024)
                                                  ) + " MB"
                                                : Math.round(
                                                      fileData?.size / 1024
                                                  ) + " KB"}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is add {fileData?.name} icon</title>
                                        <path
                                            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM14.59 5.58L8 12.17L5.41 9.59L4 11L8 15L16 7L14.59 5.58Z"
                                            fill="#4CAF50"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                        </Box>

                        <Box marginTop="24px">
                            <Box
                                sx={{
                                    paddingTop: "16px"
                                }}
                            >
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        width: "100%",
                                        borderRadius: "unset"
                                    }}
                                >
                                    <InputLabel>Document Type</InputLabel>
                                    <Select
                                        required={true}
                                        value={type}
                                        displayEmpty
                                        label="Document Ty"
                                        onChange={(e) => handleChange(e)}
                                        className="comps-dropdown"
                                        sx={{ backgroundColor: "transparent" }}
                                        inputProps={{
                                            "aria-label": "Without label"
                                        }}
                                    >
                                        <MenuItem
                                            value={"floor_plan_upload_filename"}
                                        >
                                            Floor Plan
                                        </MenuItem>
                                        <MenuItem
                                            value={"menu_upload_filename"}
                                        >
                                            Menu
                                        </MenuItem>
                                        <MenuItem
                                            value={
                                                "credit_card_upload_filename"
                                            }
                                        >
                                            Credit Card Var
                                        </MenuItem>
                                        <MenuItem
                                            value={"wireless_upload_filename"}
                                        >
                                            Wireless Solution
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: "24px" }}>
                            <Box
                                display="flex"
                                justifyContent={"flex-end"}
                                className="upload-popup-btns"
                                sx={{
                                    display: "flex",
                                    flexDirection: {md:"row",xs:'column'},
                                    width: "100%",
                                    marginTop: 0
                                }}
                            >
                                <Button
                                    variant="text"
                                    className="model-button"
                                    sx={{
                                        fontSize: { md: "16px", xs: "14px" },
                                        lineHeight:{ md:"24px",xs:'18px'},
                                        height: "46px",
                                        fontWeight: 600,
                                        padding: "12px 20px",
                                        borderRadius: "8px"
                                    }}
                                    aria-label="Cancel"
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    className="next-button"
                                    sx={{
                                        fontSize: { md: "16px", xs: "14px" },
                                        lineHeight:{ md:"24px",xs:'18px'},
                                        height: "46px",
                                        fontWeight: 600,
                                        padding: "12px 20px",
                                        marginLeft: {md:"8px",xs:0},
                                        marginTop:{md:0,xs:2},
                                        borderRadius: "8px",
                                        background: "#1B76D4",
                                        transition: "ease-in-out",
                                        timeout: 1000
                                    }}
                                    aria-label=" Confirm Upload"
                                >
                                    Upload
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
