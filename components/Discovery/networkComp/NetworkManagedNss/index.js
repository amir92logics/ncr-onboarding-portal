import {
    Button,
    Divider,
    TableBody,
    TableHead,
    Typography
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState, useEffect } from "react"
import {
    getDiscoverySubStage,
    dispatchDiscoveryData
} from "../../../../helper/Constraints"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { ManagedNetworkTabComp } from "./ManagedNetworkTabComp"
import ManagedNetworkNSSPopUp from "./ManagedNetworkNssPopup"
import NetworkTable from "./NetworkTable"
import { SetSideBarData } from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import theme from "../../../../src/theme"
import Image from "next/image"
import DeletePopUp from "./DeletePopUp"

export const ManagedNetworkNss = () => {
    const router = useRouter()
    const routerID = router.query.id
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const system = useSelector((state) => state.dataSlice.projectType)
    const dispatch = useDispatch()
    const { substageinnerstages, currentindex } = getDiscoverySubStage(
        sideBarData,
        "Network",
        "NCR Managed Network With NSS",
        system
    )
    const reroute = useSelector((state) => state.dataSlice.ncrManagedNetwork)

    let inner2per = substageinnerstages.find(
        (it) => it.name == "Network Management & Security"
    ).percentage
    let inner3per = substageinnerstages.find(
        (it) =>
            it.name == "Electrical, Network Wiring, and Internet Requirements"
    ).percentage
    let inner4per = substageinnerstages.find(
        (it) => it.name == "Networking Guidelines"
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
            initialData[0].tableDevice &&
                setTableDevice(initialData[0].tableDevice)
            initialData[0].websites && setWebsites(initialData[0].websites)
            initialData[0].Contacts && setContacts(initialData[0].Contacts)
        }
        if (reroute && routerID && !discoveryloading) {
            router.push({
                pathname: `/discovery/network/site-network/${routerID}`,
                query: { inner: true }
            })
        }
    }, [discoveryloading,initialData])
    const [showPopUp, setShowPopUp] = useState({ open: false, data: [] })
    const [Title, setTitle] = useState("")
    const [enableButton, setEnableButton] = useState(false)
    const [deviceText] = useState({
        title: "Add Device",
        description:
            "All devices on the Aloha network must be declared. If you have other network devices such as office printers, office computers, etc, please list those devices below."
    })
    const [websiteText] = useState({
        title: "Add Websites",
        description:
            "NSS will restrict the Aloha network to only the websites necessary to run your business.  Additional websites must be declared to allow access. If you need access to any business-critical websites, please list them below."
    })
    const [contactsText] = useState({
        title: "Add Static IP",
        description:
            "If you have a static IP address through your Internet provider, please provide details for the NSS team. Otherwise leave this section blank."
    })
    const DeviceData = [
        {
            Name: "DeviceType",
            fieldPlaceHolder: "Enter Device Type",
            DeviceType: "",
            type: "text",
            val: "",
            ariaLabel: "This is device type input field"
        },
        {
            Name: "IPAddress",
            fieldPlaceHolder: "Enter IP Address",
            IPAddress: "",
            type: "number",
            val: "",
            ariaLabel: "This is ip address input field"
        },
        {
            Name: "StaticorDynamicIP",
            fieldPlaceHolder: "Enter Static or Dynamic IP",
            StaticorDynamicIP: "",
            type: "radio",
            val: "",
            ariaLabel: "This is static or dynamic input field"
        },
        {
            Name: "Portsrequired",
            fieldPlaceHolder: "Enter Ports required",
            Portsrequired: "",
            type: "text",

            val: "",
            ariaLabel: "This is ports input field"
        }
    ]
    const WebData = [
        {
            Name: "WebsiteName",
            fieldPlaceHolder: "Enter Website Name",
            WebsiteName: "",
            type: "text",
            val: "",
            ariaLabel: "This is website name input field"
        },
        {
            Name: "WebsiteAddress",
            fieldPlaceHolder: "Enter Website Address",
            WebsiteAddress: "",
            type: "text",
            val: "",
            ariaLabel: "This is website address input field"
        }
    ]
    const ContactData = [
        {
            Name: "IPAddress",
            fieldPlaceHolder: "IP Address",
            IPAddress: "",
            type: "number",
            val: "",
            ariaLabel: "This is IP address input field"
        },
        {
            Name: "SubnetMask",
            fieldPlaceHolder: "Subnet Mask",
            CellPhone: "",
            type: "number",
            val: "",
            ariaLabel: "This is subnet mask input field"
        },
        {
            Name: "Gateway",
            fieldPlaceHolder: "Gateway",
            Email: "",
            type: "number",
            val: "",
            ariaLabel: "This is gateway input field"
        },
        {
            Name: "DNS",
            fieldPlaceHolder: "DNS",
            Email: "",
            type: "number",
            val: "",
            ariaLabel: "This is DNS input field"
        }
    ]
    const [editOrAdd, setEditOrAdd] = useState("Add")
    const [currentEditableID, setCurrentEditableID] = useState("")
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const [deletedID, setDeletedID] = useState(null)
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)
    const handleTogglePopUp = (value, _data) => {
        setShowPopUp({ open: value, data: _data })
    }
    const [websites, setWebsites] = useState({
        head: ["Website Name", "Website Address", "Actions"],
        rowData: [["---", "---"]]
    })
    const [Contacts, setContacts] = useState({
        head: ["IP Address", "Subnet Mask", "Gateway", "DNS"],
        rowData: [["---", "---", "---", "---"]]
    })
    const [tableDevice, setTableDevice] = useState([
        {
            device_Type: "---",
            ip_address: "---",
            static_ip: "---",
            ports_required: "---"
        }
    ])
    const [dataType, setDataType] = useState("")
    const handleStore = (_tableDevice, _websites, _Contacts) => {
        let thispercentage = 100
        let temp = [
            {
                tableDevice: _tableDevice,
                websites: _websites,
                Contacts: _Contacts
            }
        ]
        const siteinfodataper = Math.round(
            (inner2per + inner3per + inner4per + thispercentage) / 4
        )
        let tempsidebar = dispatchDiscoveryData(
            sideBarData,
            "Network",
            "NCR Managed Network With NSS",
            temp,
            thispercentage,
            siteinfodataper,
            false,
            system
        )
        dispatch(SetSideBarData(tempsidebar))
    }
    const handleAddDevice = () => {
        setDataType("AddDevice")
        setTitle(deviceText)
        setEnableButton(!enableButton)
        handleTogglePopUp(true, DeviceData)
        setEditOrAdd("Add")
    }
    const handleDeletePopup = (id, _dataType) => {
        if (dontAskDeletePopup) {
            setDeletedID(id)
            handleDelete(id, _dataType)
        } else {
            setDeletedID(id)
            setShowDeletePopUP(true)
        }
    }
    const handleWebsitesEditPopup = (id) => {
        const currentObj = websites.rowData[id]
        let tempData = WebData
        tempData.forEach((res, i) => {
            res.val = currentObj[i]
        })
        handleEditWebsites(tempData)
        setEditOrAdd("Edit")
        setCurrentEditableID(id)
    }
    const handleContactsEditPopup = (id) => {
        const currentObj = Contacts.rowData[id]
        let tempData = ContactData
        tempData.forEach((res, i) => {
            res.val = currentObj[i]
        })
        handleEditContacts(tempData)
        setEditOrAdd("Edit")
        setCurrentEditableID(id)
    }
    const handleDeviceEditPopup = (id) => {
        const currentObj = tableDevice[id]
        let tempData = DeviceData
        tempData[0].val = currentObj["device_Type"]
        tempData[1].val = currentObj["ip_address"]
        tempData[2].val = currentObj["static_ip"]
        tempData[3].val = currentObj["ports_required"]
        handleEditDevices(tempData)
        setEditOrAdd("Edit")
        setCurrentEditableID(id)
    }
    const handleDelete = (id, _dataType) => {
        if (_dataType == "AddDevice") {
            let tempTasks = [...tableDevice]
            let temData = tempTasks.filter((item, idx) => idx !== id)
            if (temData.length === 0) {
                temData = [
                    {
                        device_Type: "---",
                        ip_address: "---",
                        static_ip: "---",
                        ports_required: "---"
                    }
                ]
                setTableDevice([...temData])
            } else {
                setTableDevice([...temData])
            }
            handleStore(temData, websites, Contacts)
            setShowDeletePopUP(false)
        } else if (_dataType == "AddWebsite") {
            let temp = { ...websites }
            if (temp.rowData[0][0] !== "---" && temp.rowData[0][1] !== "---") {
                const tempTasks = [...temp.rowData]
                let temData = tempTasks.filter((item, idx) => idx !== id)
                if (temData.length === 0) {
                    temp.rowData = [["---", "---"]]
                    setWebsites(temp)
                } else {
                    temp.rowData = [...temData]
                    setWebsites(temp)
                }
            }
            handleStore(tableDevice, temp, Contacts)
            setShowDeletePopUP(false)
        } else if (_dataType == "AddContact") {
            let temp1 = { ...Contacts }
            if (
                temp1.rowData[0][0] !== "---" &&
                temp1.rowData[0][1] !== "---" &&
                temp1.rowData[0][2] !== "---" &&
                temp1.rowData[0][3] !== "---"
            ) {
                const tempTasks = [...temp1.rowData]
                let temData = tempTasks.filter((item, idx) => idx !== id)

                if (temData.length === 0) {
                    temp1.rowData = [["---", "---", "---", "---"]]
                    setContacts(temp1)
                } else {
                    temp1.rowData = [...temData]
                    setContacts(temp1)
                }
            }
            handleStore(tableDevice, websites, temp1)
            setShowDeletePopUP(false)
        }
    }

    const handleEditWebsites = (_tempData) => {
        setTitle(websiteText)
        setEnableButton(!enableButton)
        handleTogglePopUp(true, _tempData)
    }
    const handleEditContacts = (tempData) => {
        setDataType("AddContact")
        handleTogglePopUp(true, tempData)
        setTitle(contactsText)
        setEnableButton(!enableButton)
    }
    const handleEditDevices = (tempData) => {
        setDataType("AddDevice")
        handleTogglePopUp(true, tempData)
        setTitle(deviceText)
        setEnableButton(!enableButton)
    }
    const handleWebsites = () => {
        setDataType("AddWebsite")
        handleTogglePopUp(true, WebData)
        setTitle(websiteText)
        setEnableButton(!enableButton)
        setEditOrAdd("Add")
    }

    const handleAddContacts = () => {
        setDataType("AddContact")
        handleTogglePopUp(true, ContactData)
        setTitle(contactsText)
        setEnableButton(!enableButton)
        setEditOrAdd("Add")
    }

    const handleSubmitDevice = (e) => {
        if (dataType == "AddDevice") {
            let devices = tableDevice.map((item) => ({ ...item }))
            const obj = {
                device_Type: e[0].val,
                ip_address: e[1].val,
                static_ip: e[2].val,
                ports_required: e[3].val
            }
            if (editOrAdd == "Edit") {
                devices[currentEditableID] = obj
            } else {
                if (
                    devices[0].device_Type == "---" &&
                    devices[0].ip_address == "---"
                ) {
                    devices = [obj]
                } else {
                    devices.push(obj)
                }
            }
            setTableDevice(devices)
            setEnableButton(!enableButton)
            handleStore(devices, websites, Contacts)
            setEditOrAdd("Add")
        } else if (dataType == "AddWebsite") {
            let temp = { ...websites }
            if (editOrAdd == "Edit") {
                let currenttemp = [...temp.rowData]
                let current = [e[0].val, e[1].val]
                currenttemp[currentEditableID] = current
                temp.rowData = currenttemp
                temp.rowData[currentEditableID] = current
            } else {
                if (
                    temp.rowData[0][0] == "---" &&
                    temp.rowData[0][1] == "---"
                ) {
                    temp.rowData = [[e[0].WebsiteName, e[1].WebsiteAddress]]
                } else {
                    temp.rowData = [
                        ...temp.rowData,
                        [e[0].WebsiteName, e[1].WebsiteAddress]
                    ]
                }
            }
            setWebsites(temp)
            handleStore(tableDevice, temp, Contacts)
            setEnableButton(!enableButton)
        } else if (dataType == "AddContact") {
            let temp = { ...Contacts }
            if (editOrAdd == "Edit") {
                let currenttemp = [...temp.rowData]
                let current = [e[0].val, e[1].val, e[2].val, e[3].val]
                currenttemp[currentEditableID] = current
                temp.rowData = currenttemp
            } else {
                if (
                    temp.rowData[0][0] == "---" &&
                    temp.rowData[0][1] == "---"
                ) {
                    temp.rowData = [
                        [
                            e[0].IPAddress,
                            e[1].SubnetMask,
                            e[2].Gateway,
                            e[3].DNS
                        ]
                    ]
                } else {
                    temp.rowData = [
                        ...temp.rowData,
                        [
                            e[0].IPAddress,
                            e[1].SubnetMask,
                            e[2].Gateway,
                            e[3].DNS
                        ]
                    ]
                }
            }
            setContacts(temp)
            handleStore(tableDevice, websites, temp)
            setEnableButton(!enableButton)
        }
        setDataType("")
    }

    const submitForm = () => {
        handleStore(tableDevice, websites, Contacts)
        router.push({
            pathname: `/discovery/network/site-network-documentation/${routerID}`,
            query: { inner: true }
        })
    }

    return (
        <Box
            className="netw"
            display="flex"
            flexDirection="column"
            justifyContent={"flex-start"}
            flexWrap="wrap"
            sx={{ mt: { md: "0px", xs: "-1px" } }}
        >
            <Typography
                sx={{
                    marginBottom: { xs: "8px", md: "16px", lg: "16px" },
                    fontSize: "16px",
                    color: theme.palette.textColor.main
                }}
            >
                In order to ensure a seamless installation,&nbsp;NCR’s Network
                Security Services (NSS) needs some information regarding your
                network.&nbsp;Please answer the following questions.
            </Typography>
            <Typography
                sx={{
                    marginBottom: { sm: "16px", lg: "16px" },
                    fontSize: "16px",
                    color: theme.palette.textColor.main
                }}
            >
                All devices on the Aloha network must be declared.&nbsp;If you
                have other network devices such as office printers, office
                computers, etc, please list those devices below.
            </Typography>

            <Box>
                <Box
                    aria-label="This is add device Button"
                    marginBottom="7px"
                    gap={"10px"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: !disabled && "pointer",
                        p: 2,
                        ml: "auto",
                        borderRadius: "8px",
                        width: "113px",
                        "&:hover": {
                            bgcolor: !disabled ? "#F5F6FF" : ""
                        }
                    }}
                    onClick={() => {
                        !disabled && handleAddDevice()
                    }}
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
                        Add Device
                    </Typography>
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
                        <title>This is Add Device icon</title>
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
                            <clipPath>
                                <rect width={20} height={20} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>
                <Box
                    className="shadow"
                    sx={{
                        backgroundColor: "#FFFFFF",

                        borderRadius: "6px !important"
                    }}
                >
                    {tableDevice[0].device_Type == "---" ? (
                        <Box
                            sx={{
                                padding: "24px",
                                width: { xs: "100%", md: "auto" }
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <Box sx={{ mb: "8px" }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/Multi-device targeting-amico.png`}
                                        alt="Device image"
                                        width={122}
                                        height={116}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        mb: "6px",
                                        color: "#727272",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: "22px"
                                    }}
                                >
                                    No Devices added
                                </Box>
                                <Box
                                    sx={{
                                        color: "#727272",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        lineHeight: "18px"
                                    }}
                                >
                                    Once a Device is added, it will be displayed
                                    here.
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: "22px",
                                        width: { xs: "100%", md: "auto" }
                                    }}
                                >
                                    <Button
                                        aria-label="This is Add Device Button."
                                        className="next-button"
                                        disabled={disabled}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: !disabled && "pointer",
                                            width: { xs: "100%", md: "auto" },
                                            ml: "auto",
                                            borderRadius: "8px",
                                            padding: "9px 16px",
                                            "&:hover": {
                                                bgcolor: !disabled
                                                    ? "#F5F6FF"
                                                    : ""
                                            }
                                        }}
                                        onClick={() => {
                                            !disabled && handleAddDevice()
                                        }}
                                    >
                                        <Typography
                                            className="addicons"
                                            variant="body1"
                                            fontWeight="600"
                                            sx={{
                                                fontSize: "12px",
                                                color: "#fff",
                                                pr: "8px"
                                            }}
                                        >
                                            Add Device
                                        </Typography>
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
                                            <title>This is Add Device icon</title>
                                            <g clipPath="url(#clip0_785_927)">
                                                <path
                                                    d="M10.8327 5.83268H9.16602V9.16602H5.83268V10.8327H9.16602V14.166H10.8327V10.8327H14.166V9.16602H10.8327V5.83268ZM9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 16.666C6.32435 16.666 3.33268 13.6743 3.33268 9.99935C3.33268 6.32435 6.32435 3.33268 9.99935 3.33268C13.6743 3.33268 16.666 6.32435 16.666 9.99935C16.666 13.6743 13.6743 16.666 9.99935 16.666Z"
                                                    fill={"#fff"}
                                                />
                                            </g>
                                            <defs>
                                                <clipPath>
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
                            </Box>
                        </Box>
                    ) : (
                        ""
                    )}

                    {tableDevice[0].device_Type != "---" && (
                        <Table
                            aria-label="This is Device table"
                            className="table-wrap"
                            sx={{
                                display: {
                                    lg: "block",
                                    md: "block",
                                    sm: "none",
                                    xs: "none"
                                }
                            }}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        borderBottom:
                                            "1px solid rgba(229, 231, 235, 0.8);"
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            py: "18.5px",
                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        Device Type
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        IP Address
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            py: { lg: "auto", md: "10px " },

                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        Static or Dynamic IP
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        Ports Required
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "104px",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            textAlign: "center",
                                            border: 0
                                        }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableDevice?.map((item, index) => {
                                    return (
                                        <React.Fragment key={`${index + 1}`}>
                                            {index == 0 &&
                                                item.device_Type === "---" ? (
                                                ""
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            py: "23.5",
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                tableDevice?.length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item.device_Type ===
                                                            "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item.device_Type
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                tableDevice?.length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item.ip_address ===
                                                            "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item.ip_address
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                tableDevice?.length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item.static_ip ===
                                                            "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item.static_ip
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                tableDevice?.length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item.ports_required ===
                                                            "---" ||
                                                            item.ports_required ===
                                                            " " ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item.ports_required
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                tableDevice?.length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 6
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    cursor: !disabled
                                                                        ? "pointer"
                                                                        : "not-allowed",
                                                                    position:
                                                                        "relative"
                                                                }}
                                                                onClick={() => {
                                                                    if (
                                                                        item.device_Type !==
                                                                        "---" &&
                                                                        item.ip_address !==
                                                                        "---" &&
                                                                        !disabled
                                                                    ) {
                                                                        handleDeviceEditPopup(
                                                                            index
                                                                        )
                                                                        setDataType(
                                                                            "AddDevice"
                                                                        )
                                                                    }
                                                                }}
                                                            >
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/pencilIcon.svg`}
                                                                    alt="This is Edit Icon"
                                                                    layout="fill"
                                                                />
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    cursor: !disabled
                                                                        ? "pointer"
                                                                        : "not-allowed",
                                                                    position:
                                                                        "relative"
                                                                }}
                                                                onClick={() => {
                                                                    if (
                                                                        item.device_Type !==
                                                                        "---" &&
                                                                        item.ip_address !==
                                                                        "---" &&
                                                                        !disabled
                                                                    ) {
                                                                        handleDeletePopup(
                                                                            index,
                                                                            "AddDevice"
                                                                        )
                                                                        setDataType(
                                                                            "AddDevice"
                                                                        )
                                                                    }
                                                                }}
                                                            >
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/deleteIcon.svg`}
                                                                    alt="This is Delete Icon"
                                                                    layout="fill"
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </Box>

                {tableDevice[0].device_Type != "---" && (
                    <ManagedNetworkTabComp
                        handleDeletePopup={handleDeletePopup}
                        handleEditPopup={handleDeviceEditPopup}
                        setDataType={setDataType}
                        data={tableDevice}
                        nestedArray={true}
                        contact={true}
                        dataType={"AddDevice"}
                        disabled={disabled}
                    />
                )}
            </Box>
            <Divider
                className="divider-col"
                sx={{
                    mt: {
                        md:
                            tableDevice[0].device_Type == "---"
                                ? "32px"
                                : "26px",
                        xs: "24px"
                    }
                }}
            />
            <ManagedNetworkNSSPopUp
                Title={Title}
                modalInfo={showPopUp.data}
                network={true}
                showPopUp={showPopUp.open}
                handleSubmitPopUp={handleSubmitDevice}
                handleTogglePopUp={handleTogglePopUp}
                enableButton={enableButton}
                setDataType={setDataType}
            />
            <Typography
                sx={{
                    lineHeight: "24px",
                    marginTop: { xs: "24px", md: "32px", lg: "32px" },
                    fontSize: "16px",
                    color: theme.palette.textColor.main
                }}
            >
                NSS will restrict the Aloha network to only the websites
                necessary to run your business. Additional websites must be
                declared to allow access. If you need access to any
                business-critical websites, please list them below.
            </Typography>
            <Box>
                <Box
                    aria-label="This is add websites Button"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    marginBottom="8px"
                    marginTop={"16px"}
                    gap={"10px"}
                    sx={{
                        cursor: !disabled && "pointer",
                        p: 2,
                        ml: "auto",
                        borderRadius: "8px",
                        width: "128px",

                        "&:hover": {
                            bgcolor: !disabled ? "#F5F6FF" : ""
                        }
                    }}
                    onClick={() => {
                        !disabled && handleWebsites()
                    }}
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
                        Add Website
                    </Typography>
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
                        <title>This is Add Website icon</title>
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
                            <clipPath>
                                <rect width={20} height={20} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>

                <Box
                    className="shadow"
                    sx={{
                        backgroundColor: "#FFFFFF",

                        borderRadius: "6px !important"
                    }}
                >
                    {websites?.rowData[0][0] == "---" ? (
                        <Box
                            sx={{
                                padding: "24px"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <Box sx={{ mb: "8px" }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/Web search-bro.png`}
                                        alt="Device image"
                                        width={122}
                                        height={116}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        mb: "6px",
                                        color: "#727272",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: "22px"
                                    }}
                                >
                                    No Websites added
                                </Box>
                                <Box
                                    sx={{
                                        color: "#727272",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        lineHeight: "18px"
                                    }}
                                >
                                    Once a Website is added, it will be
                                    displayed here.
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: "22px",
                                        width: { xs: "100%", md: "auto" }
                                    }}
                                >
                                    <Button
                                        aria-label="This is Add Website Button."

                                        className="next-button"
                                        disabled={disabled}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: !disabled && "pointer",
                                            width: { xs: "100%", md: "auto" },
                                            ml: "auto",
                                            borderRadius: "8px",
                                            padding: "9px 16px",
                                            "&:hover": {
                                                bgcolor: !disabled
                                                    ? "#F5F6FF"
                                                    : ""
                                            }
                                        }}
                                        onClick={() => {
                                            !disabled && handleWebsites()
                                        }}
                                    >
                                        <Typography
                                            className="addicons"
                                            variant="body1"
                                            fontWeight="600"
                                            sx={{
                                                fontSize: "12px",
                                                color: "#fff",
                                                pr: "8px"
                                            }}
                                        >
                                            Add Website
                                        </Typography>
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
                                            <title>This is Add Website icon</title>
                                            <g clipPath="url(#clip0_785_927)">
                                                <path
                                                    d="M10.8327 5.83268H9.16602V9.16602H5.83268V10.8327H9.16602V14.166H10.8327V10.8327H14.166V9.16602H10.8327V5.83268ZM9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 16.666C6.32435 16.666 3.33268 13.6743 3.33268 9.99935C3.33268 6.32435 6.32435 3.33268 9.99935 3.33268C13.6743 3.33268 16.666 6.32435 16.666 9.99935C16.666 13.6743 13.6743 16.666 9.99935 16.666Z"
                                                    fill={"#fff"}
                                                />
                                            </g>
                                            <defs>
                                                <clipPath>
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
                            </Box>
                        </Box>
                    ) : (
                        ""
                    )}

                    {websites?.rowData[0][0] != "---" && (
                        <Box
                            sx={{
                                display: {
                                    lg: "block",
                                    md: "block",
                                    sm: "none",
                                    xs: "none"
                                }
                            }}
                        >
                            <Table
                                aria-label="This is Website table"
                                className="table-wrap"
                                sx={{
                                    width: "100%"
                                }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            borderBottom:
                                                "1px solid rgba(229, 231, 235, 0.8);"
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                py: "18.5px",

                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#1E1E1E",
                                                border: 0
                                            }}
                                        >
                                            Website Name
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#1E1E1E",
                                                border: 0
                                            }}
                                        >
                                            Website Adress
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: "104px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#1E1E1E",
                                                textAlign: "right",
                                                border: 0
                                            }}
                                        >
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {websites?.rowData?.map((item, index) => {
                                        return (
                                            <React.Fragment
                                                key={`${index + 1}`}
                                            >
                                                {index == 0 &&
                                                    item[0] === "---" ? (
                                                    ""
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            sx={{
                                                                py: "23.5",
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight: 400,
                                                                color: "#1E1E1E",
                                                                borderBottom:
                                                                    tableDevice?.length -
                                                                    1 ===
                                                                    index &&
                                                                    "unset"
                                                            }}
                                                        >
                                                            {item[0]}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight: 400,
                                                                color: "#1E1E1E",
                                                                borderBottom:
                                                                    tableDevice?.length -
                                                                    1 ===
                                                                    index &&
                                                                    "unset"
                                                            }}
                                                        >
                                                            {item[1]}
                                                        </TableCell>

                                                        <TableCell
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight: 400,
                                                                color: "#1E1E1E",
                                                                borderBottom:
                                                                    tableDevice?.length -
                                                                    1 ===
                                                                    index &&
                                                                    "unset"
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: 6
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        cursor: !disabled
                                                                            ? "pointer"
                                                                            : "not-allowed",
                                                                        position:
                                                                            "relative"
                                                                    }}
                                                                    onClick={() => {
                                                                        if (
                                                                            item.device_Type !==
                                                                            "---" &&
                                                                            item.ip_address !==
                                                                            "---" &&
                                                                            !disabled
                                                                        ) {
                                                                            handleWebsitesEditPopup(
                                                                                index
                                                                            )
                                                                            setDataType(
                                                                                "AddWebsite"
                                                                            )
                                                                        }
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/pencilIcon.svg`}
                                                                        alt="This is Edit Icon"
                                                                        layout="fill"
                                                                    />
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        cursor: !disabled
                                                                            ? "pointer"
                                                                            : "not-allowed",
                                                                        position:
                                                                            "relative"
                                                                    }}
                                                                    onClick={() => {
                                                                        if (
                                                                            item.device_Type !==
                                                                            "---" &&
                                                                            item.ip_address !==
                                                                            "---" &&
                                                                            !disabled
                                                                        ) {
                                                                            handleDeletePopup(
                                                                                index,
                                                                                "AddWebsite"
                                                                            )
                                                                            setDataType(
                                                                                "AddWebsite"
                                                                            )
                                                                        }
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/deleteIcon.svg`}
                                                                        alt="This is Delete Icon"
                                                                        layout="fill"
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    )}
                </Box>

                {websites?.rowData[0][0] != "---" && (
                    <ManagedNetworkTabComp
                        contact={true}
                        setDataType={setDataType}
                        dataType={"AddWebsite"}
                        handleDeletePopup={handleDeletePopup}
                        handleEditPopup={handleWebsitesEditPopup}
                        data={websites}
                        nestedArray={false}
                        disabled={disabled}
                    />
                )}
            </Box>

            <Divider
                className="divider-col"
                sx={{ mt: { lg: "32px", md: "32px", xs: "24px" } }}
            />

            <Typography
                sx={{
                    lineHeight: "24px",
                    marginTop: { xs: "24px", md: "32px" },
                    fontSize: "16px",
                    color: theme.palette.textColor.main
                }}
            >
                If you have a static IP address through your Internet provider,
                please provide details for the NSS team. Otherwise leave this
                section blank.
            </Typography>

            <Box>
                <Box
                    aria-label="This is Add Static IP Button"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    marginBottom="8px"
                    marginTop={"16px"}
                    gap={"10px"}
                    sx={{
                        cursor: !disabled && "pointer",
                        p: 2,
                        ml: "auto",
                        borderRadius: "8px",
                        width: "127px",

                        "&:hover": {
                            bgcolor: !disabled ? "#F5F6FF" : ""
                        }
                    }}
                    onClick={() => {
                        !disabled && handleAddContacts()
                    }}
                >
                    <Typography
                        className="addicons"
                        variant="body1"
                        fontWeight="600"
                        sx={{
                            fontSize: {
                                xs: "12px"
                            }
                        }}
                        color={
                            disabled
                                ? "rgba(0, 0, 0, 0.2)"
                                : theme.palette.primary.main
                        }
                    >
                        Add Static IP
                    </Typography>
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
                        <title>{`this is Add Static IP icon`}</title>
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
                            <clipPath>
                                <rect width={20} height={20} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>

                <Box
                    className="shadow"
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "6px"
                    }}
                >
                    {Contacts?.rowData[0][0] == "---" ? (
                        <Box
                            sx={{
                                padding: "24px"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <Box sx={{ mb: "8px" }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/Server-bro.png`}
                                        alt="Device image"
                                        width={122}
                                        height={116}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        mb: "6px",
                                        color: "#727272",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: "22px"
                                    }}
                                >
                                    No Static IP added
                                </Box>
                                <Box
                                    sx={{
                                        color: "#727272",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        lineHeight: "18px"
                                    }}
                                >
                                    Once a Static IP is added, it will be
                                    displayed here.
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: "22px",
                                        width: { xs: "100%", md: "auto" }
                                    }}
                                >
                                    <Button
                                        aria-label="This is Add Static IP Button."

                                        disabled={disabled}
                                        className="next-button"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: !disabled && "pointer",
                                            width: { xs: "100%", md: "auto" },
                                            ml: "auto",
                                            borderRadius: "8px",
                                            padding: "9px 16px",
                                            "&:hover": {
                                                bgcolor: !disabled
                                                    ? "#F5F6FF"
                                                    : ""
                                            }
                                        }}
                                        onClick={() => {
                                            !disabled && handleAddContacts()
                                        }}
                                    >
                                        <Typography
                                            className="addicons"
                                            variant="body1"
                                            fontWeight="600"
                                            sx={{
                                                fontSize: "12px",
                                                color: "#fff",
                                                pr: "8px"
                                            }}
                                        >
                                            Add Static IP
                                        </Typography>
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
                                            <title>{`this is Add Static IP icon`}</title>
                                            <g clipPath="url(#clip0_785_927)">
                                                <path
                                                    d="M10.8327 5.83268H9.16602V9.16602H5.83268V10.8327H9.16602V14.166H10.8327V10.8327H14.166V9.16602H10.8327V5.83268ZM9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 16.666C6.32435 16.666 3.33268 13.6743 3.33268 9.99935C3.33268 6.32435 6.32435 3.33268 9.99935 3.33268C13.6743 3.33268 16.666 6.32435 16.666 9.99935C16.666 13.6743 13.6743 16.666 9.99935 16.666Z"
                                                    fill={"#fff"}
                                                />
                                            </g>
                                            <defs>
                                                <clipPath>
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
                            </Box>
                        </Box>
                    ) : (
                        ""
                    )}

                    {Contacts?.rowData[0][0] != "---" && (
                        <Table
                            aria-label="This is Static IP table"
                            className="table-wrap"
                            sx={{
                                display: {
                                    lg: "block",
                                    md: "block",
                                    sm: "none",
                                    xs: "none"
                                }
                            }}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        borderBottom:
                                            "1px solid rgba(229, 231, 235, 0.8);"
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            py: "18.5px",
                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        IP Address
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        Subnet Mask
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            py: { lg: "auto", md: "10px " },

                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        Gateway
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "22.57%",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            border: 0
                                        }}
                                    >
                                        DNS
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "104px",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1E1E1E",
                                            textAlign: "center",
                                            border: 0
                                        }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Contacts?.rowData?.map((item, index) => {
                                    return (
                                        <React.Fragment key={`${index + 1}`}>
                                            {index == 0 && item[0] === "---" ? (
                                                ""
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            py: "23.5",
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                Contacts
                                                                    ?.rowData
                                                                    .length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item[0] === "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item[0]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                Contacts
                                                                    ?.rowData
                                                                    .length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item[1] === "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item[1]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                Contacts
                                                                    ?.rowData
                                                                    .length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item[2] === "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item[2]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                Contacts
                                                                    ?.rowData
                                                                    .length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        {item[3] === "---" ? (
                                                            <Box
                                                                sx={{
                                                                    height: " 8px",
                                                                    background:
                                                                        "#E0E0E0"
                                                                }}
                                                            ></Box>
                                                        ) : (
                                                            item[3]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            borderBottom:
                                                                Contacts
                                                                    ?.rowData
                                                                    .length -
                                                                1 ===
                                                                index &&
                                                                "unset"
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 6
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    cursor: !disabled
                                                                        ? "pointer"
                                                                        : "not-allowed",
                                                                    position:
                                                                        "relative"
                                                                }}
                                                                onClick={() => {
                                                                    if (
                                                                        item[3] !=
                                                                        "---" &&
                                                                        !disabled
                                                                    ) {
                                                                        handleContactsEditPopup(
                                                                            index,
                                                                            "AddContact"
                                                                        )
                                                                        setDataType(
                                                                            "AddContact"
                                                                        )
                                                                    }
                                                                }}
                                                            >
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/pencilIcon.svg`}
                                                                    alt="This is Edit Icon"
                                                                    layout="fill"
                                                                />
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    cursor: !disabled
                                                                        ? "pointer"
                                                                        : "not-allowed",
                                                                    position:
                                                                        "relative"
                                                                }}
                                                                onClick={() => {
                                                                    if (
                                                                        item[3] !=
                                                                        "---" &&
                                                                        !disabled
                                                                    ) {
                                                                        handleDeletePopup(
                                                                            index,
                                                                            "AddContact"
                                                                        )
                                                                        setDataType(
                                                                            "AddContact"
                                                                        )
                                                                    }
                                                                }}
                                                            >
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/deleteIcon.svg`}
                                                                    alt="This is Delete Icon"
                                                                    layout="fill"
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </Box>
                {Contacts?.rowData[0][0] != "---" && (
                    <ManagedNetworkTabComp
                        contact={true}
                        setDataType={setDataType}
                        dataType={"AddContact"}
                        handleDeletePopup={handleDeletePopup}
                        handleEditPopup={handleContactsEditPopup}
                        data={Contacts}
                        network={true}
                        nestedArray={false}
                        disabled={disabled}
                    />
                )}
            </Box>

            <Divider
                className="divider-col"
                sx={{
                    width: "100%",
                    mt: {
                        md: Contacts?.rowData[0][0] == "---" ? "32px" : "10px",
                        xs: "24px"
                    }
                }}
            />

            <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                    flexDirection: {
                        lg: "row",
                        xs: "column"
                    },
                    paddingY: { md: "22px", xs: "23px" }
                }}
            >
                <Box
                    display="flex"
                    sx={{
                        justifyContent: "flex-end",
                        flexDirection: {
                            md: "row",
                            xs: "column"
                        }
                    }}
                >
                    <Button
                        className="back-button"
                        onClick={() => {
                            router.push({
                                pathname: `/discovery/network/site-network/${routerID}`,
                                query: { inner: true }
                            })
                        }}
                        variant="outlined"
                        aria-label="This is  back button."
                        sx={{
                            marginRight: { md: "8px" },
                            padding: "11px 20px",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#5C5C5C",
                            "&:hover": {
                                bgcolor: "#F5F6FF !important ",
                                border: "1px solid #1D4ED8 !important"
                            }
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        className="next-button"
                        onClick={() => {
                            submitForm()
                        }}
                        role="button"
                        aria-label="This is Next Step Button."
                        variant="contained"
                        sx={{
                            mt: { md: "0px", xs: "8px" },
                            padding: {
                                md: "11px 20px 11px 20px",
                                xs: "11px 20px 13px 20px"
                            },
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "white"
                        }}
                    >
                        Next Step
                    </Button>
                </Box>
            </Box>
            <DeletePopUp
                setDontAskDeletePopup={setDontAskDeletePopup}
                title={
                    dataType === "AddDevice"
                        ? "Device"
                        : dataType === "AddWebsite"
                            ? "Website"
                            : dataType === "AddContact"
                                ? "Static IP"
                                : ""
                }
                setShowDeletePopUP={setShowDeletePopUP}
                showDeletePopUP={showDeletePopUP}
                handleDeleteItem={handleDelete}
                deletedID={deletedID}
                dataType={dataType}
                copy_change={true}
            />
        </Box>
    )
}
