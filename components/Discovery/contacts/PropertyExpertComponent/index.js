import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Button, Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
    SetSideBarData,
    SetSubTasks,
    SetTasks
} from "../../../../redux-setup/dataSlice"
import { useRouter } from "next/router"
import DeletePopUp from "../../networkComp/NetworkManagedNss/DeletePopUp"
import ContactsPopUp from "../ContactsPopUp"
import LabourTable from "../../networkComp/NetworkManagedNss/NetworkTable"
import {
    useLazyActionsgetQuery,
    useUpdateDataMutation
} from "../../../../redux-setup/api/data"
import theme from "../../../../src/theme"
import ConfirmationNotification from "../../../common/ConfirmationNotification"
import CommonButton from "../../../common/CommonButton"
import Notification from "../../../common/Notifications"
import { MobileTable } from "../MobileTable"

export default function PropertyExpertComponent() {
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const currentProject = useSelector(
        (state) => state.dataSlice.currentproject
    )
    const [loading, setLoading] = useState("")
    const [cardID, setCardID] = useState()
    const [error, setError] = useState(" ")
    const [updatedata] = useUpdateDataMutation()
    const [actionstrigger] = useLazyActionsgetQuery()
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)

    const [contacts, setContacts1] = useState([
        {
            id: "1",
            title: "Primary Contact",
            discription:
                " A Primary Contact is NCR’s primary point of contact for all project milestones. This individual will serve as the liaison between your Company and NCR’s Deployment team. They should have decision making abilities, working knowledge of the project and the desired outcomes to ensure a successful implementation. Lastly, the primary contact should be able to engage other inter-company stakeholders to ensure NCR has the most current and accurate information. ",
            contactrole: "Primary contact",
            buttonrole: "Edit Contact Details",
            data: {
                head: ["Name", "Phone Number", "Email", "Action"]
            }
        },
        {
            id: "2",
            title: "Invoice or Billing Contact",
            discription:
                "At times during the project we may need to reach out for invoice or billing questions. Do you wish to provide a separate accounting contact for this project?",

            contactrole: "Current Contact(s)",
            buttonrole: "Add new Contact",
            data: {
                head: ["Name", "Phone Number", "Email", "Action"]
            }
        },
        {
            id: "3",
            title: "Construction Contact",
            discription:
                "If your establishment is undergoing construction, NCR may need to reach out to determine the site’s readiness to install. Your construction contact may be a general contractor or superintendent. Do you wish to provide a separate construction contact for this project?",
            contactrole: "Current Contact(s)",
            buttonrole: "Add new Contact",
            data: {
                head: ["Name", "Phone Number", "Email", "Action"]
            }
        },
        {
            id: "4",
            title: "IT Contact",
            discription:
                "If your establishment has a dedicated IT resource, NCR may need to reach out to ensure your Aloha system will function seamlessly with your network and other technologies. Do you wish to provide a separate IT contact for this project?",
            contactrole: "Current Contact(s)",
            buttonrole: "Add new Contact",
            data: {
                head: ["Name", "Phone Number", "Email", "Action"]
            }
        },
        {
            id: "5",
            title: "Training Contact",
            discription:
                " NCR may need to reach out regarding staff training and scheduling. Do you wish to provide a separate Training contact for this project?",
            contactrole: "Current Contact(s)",
            buttonrole: "Add new Contact",
            data: {
                head: ["Name", "Phone Number", "Email", "Action"]
            }
        },
         {
            id: "6",
            title: "Other Contacts",
            discription:
                "Do you wish to provide any other contacts for this project?",
            contactrole: "Current Contact(s)",
            buttonrole: "Add new Contact",
            data: {
                head: ["Name", "Phone Number", "Email", "Action"]
            }
        }
    ])
    const [open, SetOpen] = useState(null)
    const [notify, setNotify] = useState(false)
    const [contactsData, setContactsData] = useState([
        {
            name: currentProject?.contact_fullname,
            phone: currentProject?.contact_phone,
            email: currentProject?.contact_email,
            type: "Primary Contact",
            id: 1
        }
    ])
    const handlemore = (id) => {
        setCardID(id === cardID ? null : id)
    }

    useEffect(() => {
        if (tasks.length > 0) {
            let contactdata = tasks.find(
                (it) => it.task_name == "Confirm Project Contacts"
            )?.json
            let contactsind = sideBarData.findIndex(
                (a) => a.name === "Contacts"
            )
            let currentdata1 = sideBarData[contactsind].data

            if (contactdata) {
                setDisable(true)
                setContactsData(contactdata?.contacts)
            } else if (currentdata1) {
                setContactsData(currentdata1.contacts)
            }

            if (currentProject && !contactdata && !currentdata1) {
                setContactsData([
                    {
                        name: currentProject?.contact_fullname,
                        phone: currentProject?.contact_phone,
                        email: currentProject?.contact_email,
                        type: "Primary Contact",
                        id: 1
                    }
                ])
            }
        }
    }, [tasks, sideBarData, currentProject])
    const router = useRouter()

    const routerID = router.query.id
    const dispatch = useDispatch()
    const [disabled, setDisable] = useState(false)
    const [edit, setEdit] = useState(false)
    const [showPopUp, setShowPopUp] = useState({ open: false, data: [] })

    const [Title, setTitle] = useState("")
    const [enableButton, setEnableButton] = useState(false)

    const [contactsText] = useState({
        title: "Add new Contact",
        description:
            "Please list any contact who are authorized to request changes to the NSS configuration."
    })

    const ContactData = [
        {
            Name: "name",
            fieldPlaceHolder: "Contact Name",
            name: "",
            type: "text",
            val: ""
        },
        {
            Name: "CellPhone",
            fieldPlaceHolder: "Contact Phone",
            CellPhone: "",
            type: "number",
            val: ""
        },
        {
            Name: "Email",
            fieldPlaceHolder: "Contact Email",
            Email: "",
            type: "email",
            val: ""
        }
    ]
    const [editOrAdd, setEditOrAdd] = useState("Add")
    const [currentEditableID, setCurrentEditableID] = useState("")
    const [dontAskDeletePopup, setDontAskDeletePopup] = useState(false)
    const [deletedID, setDeletedID] = useState(null)
    const [showDeletePopUP, setShowDeletePopUP] = useState(false)

    const handleTogglePopUp = (value, _data, id, name) => {
        setShowPopUp({ open: value, data: _data, id: id, name: name || "" })
    }

    const [dataType, setDataType] = useState("")
    const handleStore = (_Contacts) => {
        let temp = {
            contacts: _Contacts
        }

        let tempsidebar = [...sideBarData]
        let contactsind = tempsidebar.findIndex((a) => a.name === "Contacts")
        let currentdata = { ...tempsidebar[contactsind] }
        currentdata.data = temp
        currentdata.percentage = Math.round(100)
        tempsidebar[contactsind] = { ...currentdata }

        dispatch(SetSideBarData(tempsidebar))
    }

    const handleDeletePopup = (id) => {
        setDeletedID(id)
        setShowDeletePopUP(true)
    }
    const handleContactsEditPopup = (id) => {
        if (id == 1) {
            let tempmodaldata = [
                {
                    Name: "CellPhone",
                    fieldPlaceHolder: "Contact Phone",
                    CellPhone: contactsData[0]?.phone,
                    type: "number",
                    val: contactsData[0]?.phone,
                    primary: true
                },
                {
                    Name: "Email",
                    fieldPlaceHolder: "Contact Email",
                    Email: contactsData[0]?.email,
                    type: "email",
                    val: contactsData[0]?.email,
                    primary: true
                }
            ]

            handleEditContacts(tempmodaldata, id)
            setEditOrAdd("Edit")
            setCurrentEditableID(id)
        } else {
            let currentind = contactsData.findIndex((it) => it.id == id)

            let currentdata = { ...contactsData[currentind] }
            let tempData = [
                {
                    Name: "name",
                    fieldPlaceHolder: "Contact Name",
                    name: "",
                    type: "text",
                    val: currentdata?.name
                },
                {
                    Name: "CellPhone",
                    fieldPlaceHolder: "Contact Phone",
                    CellPhone: "",
                    type: "number",
                    val: currentdata?.phone
                },
                {
                    Name: "Email",
                    fieldPlaceHolder: "Contact Email",
                    Email: "",
                    type: "email",
                    val: currentdata?.email
                }
            ]

            handleEditContacts(tempData, id)
            setEditOrAdd("Edit")
            setCurrentEditableID(id)
            setEdit(true)
        }
    }
    const handleDelete = () => {
        setNotify(true)
        setError("delete")

        let temp = contactsData.filter((it) => it.id != deletedID)
        setContactsData(temp)

        handleStore(temp)
        setShowDeletePopUP(false)
    }
    const handleEditContacts = (tempData, id) => {
        handleTogglePopUp(true, tempData, id)
        setTitle(contactsText)
        setEnableButton(!enableButton)
        setEditOrAdd("Edit")
    }

    const handleAddContacts = (id, name) => {
        handleTogglePopUp(true, ContactData, id, name)
        setTitle(contactsText)
        setEnableButton(!enableButton)
        setEditOrAdd("Add")
        setEdit(false)
    }

    const handleSubmitDevice = (e) => {
        let { id, name } = showPopUp
        if (id == 1) {
            let temp = {
                name: currentProject.contact_fullname,
                phone: e[0].val,
                email: e[1].val,
                type: "Primary Contact",
                id: 1
            }

            let allcontacts = [...contactsData]
            let samePrimary = contactsData.filter(
                (it) => it.name == currentProject?.contact_fullname
            )
            allcontacts[0] = temp
            for (let i = 0; i < samePrimary.length; i++) {
                let current = { ...samePrimary[i] }
                current.email = e[1].val
                current.phone = e[0].val
                let index1 = allcontacts.findIndex((it) => it.id === current.id)
                allcontacts[index1] = current
            }

            setContactsData(allcontacts)
            handleStore(allcontacts)
            setError("updated")
        } else if (editOrAdd != "Edit") {
            let currentdataa = contacts.find((it) => it.id == id)?.title
            let temp = [...contactsData]
            let contactsId = temp.length > 0 ? temp[temp.length - 1].id + 1 : 2
            temp.push({
                name: e[0].val,
                phone: e[1].val,
                email: e[2].val,
                type: currentdataa,
                id: contactsId
            })
            setContactsData(temp)
            handleStore(temp)
            setError("added")
        } else if (editOrAdd == "Edit" && id != 1) {
            let currentdataa = contactsData.find((it) => it.id == id)?.type
            let index = contactsData.findIndex((it) => it.id == id)
            let temp = [...contactsData]
            temp[index] = {
                name: e[0].val,
                phone: e[1].val,
                email: e[2].val,
                type: currentdataa,
                id: id
            }
            setContactsData(temp)
            handleStore(temp)
            setError("updated")
        }

        setNotify(true)

        setDataType("")
    }
    const onClickNextStep = () => {
        setLoading("loading")

        updatedata({
            record_id_quickbase: routerID,
            task_name: "Confirm Project Contacts",
            json_data: { contacts: contactsData }
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
                                setLoading("")
                                router.push({
                                    pathname: `/actions/${routerID}`
                                })
                            }, 2000)
                        }, 2000)
                        dispatch(SetTasks(res.data.actions))
                        dispatch(SetSubTasks(res.data.sub_tasks))
                    })
                    .catch((err) => setLoading("error"))
            })
            .catch((err) => setLoading("error"))
    }
    const handleClose = () => {
        if (loading == "confirm") {
            setTimeout(() => {
                setLoading("")
                router.push({
                    pathname: `/actions/${routerID}`
                })
            }, 2000)
        } else if (loading == "error") {
            setLoading("")
        }
    }

    const handleBack = () => {
        router.push({
            pathname: `/actions/${routerID}`
        })
    }
    const handledisable = () => {
        if (
            disabled ||
            typeof contactsData.find((it) => it.type == contacts[1].title)
                ?.name == "undefined" ||
            !(contactsData[0].phone || contactsData[0].email)
        ) {
            return true
        }
    }
    return (
        <>
            <Typography
                className="overtime-text"
                color={"#1E1E1E"}
                sx={{ marginBottom: { lg: "24px", xs: "16px" } }}
            >
                Some projects can be complex in nature and, therefore, require
                multiple stakeholders. Please provide details for all applicable
                contacts listed below:
            </Typography>
            <Box>
                {contacts?.map((item, index) => {
                    return (
                        <Box
                            key={`${item.title + index}`}
                            className="shadow"
                            sx={{
                                paddingTop: "22px",
                                backgroundColor: "#FFFFFF",
                                borderRadius: "8px",
                                marginTop:
                                    index == 0
                                        ? "0px"
                                        : index == 1
                                        ? "24px"
                                        : index == 2
                                        ? "22px"
                                        : index == 3
                                        ? "20px"
                                        : "21px"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingX: { xs: "16px", md: "24px" }
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        paddingBottom: {
                                            xs: "12px",
                                            md: "20px"
                                        },
                                        mt: { xs: "-1px", md: "8px" }
                                    }}
                                >
                                    <Box sx={{ paddingRight: "10px" }}>
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>This is primary contact icon</title>
                                            <rect
                                                width={24}
                                                height={24}
                                                rx={12}
                                                fill="#E8EEFF"
                                            />
                                            <path
                                                d="M9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM9 7C9.83 7 10.5 7.67 10.5 8.5C10.5 9.33 9.83 10 9 10C8.17 10 7.5 9.33 7.5 8.5C7.5 7.67 8.17 7 9 7ZM9.05 17H4.77C5.76 16.5 7.47 16 9 16C9.11 16 9.23 16.01 9.34 16.01C9.68 15.28 10.27 14.68 10.98 14.2C10.25 14.07 9.56 14 9 14C6.66 14 2 15.17 2 17.5V19H9V17.5C9 17.33 9.02 17.16 9.05 17ZM16.5 14.5C14.66 14.5 11 15.51 11 17.5V19H22V17.5C22 15.51 18.34 14.5 16.5 14.5ZM17.71 12.68C18.47 12.25 19 11.44 19 10.5C19 9.12 17.88 8 16.5 8C15.12 8 14 9.12 14 10.5C14 11.44 14.53 12.25 15.29 12.68C15.65 12.88 16.06 13 16.5 13C16.94 13 17.35 12.88 17.71 12.68Z"
                                                fill="#1E1E1E"
                                            />
                                        </svg>
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "18px",
                                            color: "#1E1E1E",
                                            lineHeight: "28px"
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: "12px",
                                            color:
                                                item.title !=
                                                    "Invoice or Billing Contact" &&
                                                item.title != "Primary Contact"
                                                    ? theme.chips.text.progress
                                                    : theme.chips.text.warning,

                                            borderRadius: "99px",

                                            backgroundColor:
                                                item.title !=
                                                    "Invoice or Billing Contact" &&
                                                item.title != "Primary Contact"
                                                    ? theme.chips.background.progress
                                                    : theme.chips.background.warning,
                                            height: "20px",
                                            mt: "5px",
                                            mx: "10px",
                                            px: "10px",
                                            pt: "1px"
                                        }}
                                    >
                                        {item.title !=
                                            "Invoice or Billing Contact" &&
                                        item.title != "Primary Contact"
                                            ? "Optional"
                                            : "Required"}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: { xs: "none", md: "block" }
                                    }}
                                >
                                    <Button
                                        aria-label={
                                            item.title === "Primary Contact"
                                                ? "This is an add contact details button"
                                                : `This is an ${item.buttonrole} button`
                                        }
                                        disabled={disabled}
                                        sx={{
                                            width: { md: "auto", xs: "100%" },
                                            border: "1px solid ",
                                            borderColor: "#E0E0E0",
                                            borderRadius: "8px",
                                            padding: {
                                                md: "9px 19px",
                                                xs: "9px 38px 9px 32px"
                                            },
                                            "&:hover": {
                                                bgcolor: "#F5F6FF ",
                                                border: "1px solid #1D4ED8 "
                                            }
                                        }}
                                        onClick={() => {
                                            !disabled &&
                                                (index == 0
                                                    ? handleContactsEditPopup(1)
                                                    : handleAddContacts(
                                                          item.id,
                                                          item.title
                                                      ))
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                mr: "6px",
                                                mt: "1px",
                                                fontSize: "13.7px",
                                                lineHeight: "22px",
                                                fontWeight: 600,
                                                textTransform: "none",

                                                color: disabled
                                                    ? "#1d4ed"
                                                    : "#1D4ED8",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <span>
                                                {item.title ===
                                                "Primary Contact"
                                                    ? "Add Contact Details"
                                                    : item.buttonrole}
                                            </span>
                                        </Typography>

                                        <svg
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>This is arrow icon</title>
                                            <path
                                                d="M10.4688 4.375L16.0938 10L10.4688 15.625"
                                                stroke={
                                                    disabled
                                                        ? "rgb(92, 92, 92)"
                                                        : "#1D4ED8"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M15.3125 10H3.90625"
                                                stroke={
                                                    disabled
                                                        ? "rgb(92, 92, 92)"
                                                        : "#1D4ED8"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Button>
                                </Box>
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: { xs: "16px", md: "14px" },
                                    color: theme.palette.secondary.main,
                                    lineHeight: { xs: "24px", md: "22px" },
                                    paddingX: {
                                        xs: "15px",
                                        md: "22px",
                                        lg: "24px"
                                    }
                                }}
                            >
                                {item.discription}
                            </Typography>
                            <Box
                                sx={{
                                    display: { md: "none" },
                                    paddingX: {
                                        xs: "16px",
                                        md: "22px",
                                        lg: "24px"
                                    },
                                    mt: "15px"
                                }}
                            >
                                <Button
                                    aria-label={`This is an ${item.buttonrole} button`}
                                    sx={{
                                        width: { md: "auto", xs: "100%" },
                                        border: "1px solid ",
                                        borderColor: "#E0E0E0",
                                        borderRadius: "8px",
                                        padding: {
                                            md: "9px 19px",
                                            xs: "9px 38px 9px 32px"
                                        }
                                    }}
                                    onClick={() => {
                                        !disabled &&
                                            (index == 0
                                                ? handleContactsEditPopup(
                                                      item.id,
                                                      index
                                                  )
                                                : handleAddContacts(
                                                      item.id,
                                                      item.title
                                                  ))
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            mr: "6px",
                                            mt: "1px",
                                            fontSize: "13.7px",
                                            lineHeight: "22px",
                                            fontWeight: 600,
                                            textTransform: "none",

                                            color: "#1D4ED8",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <span>{item.buttonrole}</span>
                                    </Typography>

                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is {item.buttonrole} icon</title>
                                        <path
                                            d="M10.4688 4.375L16.0938 10L10.4688 15.625"
                                            stroke="#1D4ED8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15.3125 10H3.90625"
                                            stroke="#1D4ED8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    borderTop: "1px solid #EEEEEE",
                                    marginTop: { xs: "18px", md: "24px" }
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingY: "16px",
                                        paddingX: { xs: "16px", md: "24px" },
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: {
                                            xs: "row",
                                            md: "row"
                                        }
                                    }}
                                >
                                    {item.title != "Primary Contact" ? (
                                        <Box
                                            sx={{
                                                color: theme.palette.secondary
                                                    .main,
                                                fontSize: {
                                                    xs: "16px",
                                                    md: "14px"
                                                },
                                                fontWeight: 400,
                                                lineHeight: "22px",
                                                display: "flex",
                                                flexDirection: {
                                                    md: "row",
                                                    xs: "column"
                                                },
                                                textAlign: "start",

                                                alignItems: { md: "center" }
                                            }}
                                        >
                                            {item.contactrole}:&nbsp;
                                            <span
                                                style={{
                                                    color: theme.palette
                                                        .secondary.main,
                                                    fontSize: {
                                                        xs: "14px",
                                                        md: "14px"
                                                    },
                                                    fontWeight: 600,
                                                    lineHeight: "22px",
                                                    marginRight: "auto"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 2
                                                    }}
                                                >
                                                    {contactsData
                                                        ?.filter(
                                                            (it) =>
                                                                it.type ==
                                                                item.title
                                                        )
                                                        .map((it) => it.name)
                                                        .length > 0 ? (
                                                        contactsData
                                                            ?.filter(
                                                                (it) =>
                                                                    it.type ==
                                                                    item.title
                                                            )
                                                            .map(
                                                                (it) => it.name
                                                            )
                                                            .splice(0, 3)
                                                            .map((it, ind) => (
                                                                <Box
                                                                    key={`${
                                                                        it + ind
                                                                    }`}
                                                                >
                                                                    {ind !==
                                                                        0 &&
                                                                        " , "}
                                                                    {it}
                                                                </Box>
                                                            ))
                                                    ) : (
                                                        <Box>None </Box>
                                                    )}
                                                    {contactsData
                                                        ?.filter(
                                                            (it) =>
                                                                it.type ==
                                                                item.title
                                                        )
                                                        .map((it) => it.name)
                                                        .length > 3 && (
                                                        <Box>
                                                            +
                                                            {contactsData
                                                                ?.filter(
                                                                    (it) =>
                                                                        it.type ==
                                                                        item.title
                                                                )
                                                                .map(
                                                                    (it) =>
                                                                        it.name
                                                                ).length -
                                                                3}{" "}
                                                            more
                                                        </Box>
                                                    )}
                                                </Box>
                                            </span>
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                pr: "24px",
                                                maxWidth: "494px",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                pb: "14px",
                                                flexDirection: {
                                                    xs: "column",
                                                    md: "row"
                                                }
                                            }}
                                        >
                                            <Box>
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            color: "#1E1E1E",
                                                            mt: {
                                                                xs: "0px",
                                                                md: "0px"
                                                            }
                                                        }}
                                                    >
                                                        Contact Name
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            pt: "8px"
                                                        }}
                                                    >
                                                        {currentProject.contact_fullname
                                                            ? currentProject.contact_fullname
                                                            : "N/A"}
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: {
                                                            xs: "none",
                                                            md: "block"
                                                        }
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            color: "#1E1E1E",
                                                            mt: {
                                                                xs: "16px",
                                                                md: "24px"
                                                            }
                                                        }}
                                                    >
                                                        Phone Number
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            pt: "8px"
                                                        }}
                                                    >
                                                        {contactsData[0]
                                                            ?.type ==
                                                        "Primary Contact"
                                                            ? contactsData[0]
                                                                  ?.phone
                                                            : "---"}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    marginLeft: { md: "101px" }
                                                }}
                                            >
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            color: "#1E1E1E",
                                                            mt: {
                                                                xs: "16px",
                                                                md: "0px"
                                                            }
                                                        }}
                                                    >
                                                        Contact Role
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            pt: "8px"
                                                        }}
                                                    >
                                                        {currentProject.contact_role
                                                            ? currentProject.contact_role
                                                            : "N/A"}
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: { md: "none" }
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            color: "#1E1E1E",
                                                            mt: {
                                                                xs: "16px",
                                                                md: "24px"
                                                            }
                                                        }}
                                                    >
                                                        Phone Number
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            pt: "8px"
                                                        }}
                                                    >
                                                        {contactsData[0]
                                                            ?.type ==
                                                        "Primary Contact"
                                                            ? contactsData[0]
                                                                  ?.phone
                                                            : "---"}
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            color: "#1E1E1E",
                                                            mt: {
                                                                xs: "16px",
                                                                md: "24px"
                                                            }
                                                        }}
                                                    >
                                                        Email Address
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 400,
                                                            color: "#1E1E1E",
                                                            pt: "8px"
                                                        }}
                                                    >
                                                        {contactsData[0]
                                                            ?.type ==
                                                        "Primary Contact"
                                                            ? contactsData[0]
                                                                  ?.email
                                                            : "---"}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}

                                    {item.title != "Primary Contact" && (
                                        <Button
                                            aria-label={
                                                cardID === item.id
                                                    ? "Hide"
                                                    : item.title ==
                                                      "Primary Contact"
                                                    ? ""
                                                    : "View" + item.title ===
                                                      "Primary Contact"
                                                    ? ""
                                                    : "Contacts"
                                            }
                                            disabled={
                                                contactsData?.filter(
                                                    (it) =>
                                                        it.type == item.title
                                                ).length == 0
                                            }
                                            sx={{
                                                height: {
                                                    md: "36px",
                                                    xs: "auto"
                                                },

                                                minWidth: {
                                                    md:
                                                        item.title ===
                                                        "Primary Contact"
                                                            ? "165.13px"
                                                            : "128.19px",
                                                    xs: "auto"
                                                },

                                                p: { md: "8px", xs: "0px" },
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: {
                                                    md: "center",
                                                    xs: "start"
                                                },
                                                mt: { xs: "0px", md: "0px" },
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    background: {
                                                        md: "#F5F6FF",
                                                        xs: "transparent"
                                                    }
                                                }
                                            }}
                                            onClick={() => {
                                                handlemore(item.id)
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "12px",
                                                    lineHeight: "18px",
                                                    color: "#1D4ED8",
                                                    fontWeight: 600,
                                                    display: {
                                                        md: "block",
                                                        xs: "none"
                                                    },
                                                    opacity:
                                                        contactsData?.filter(
                                                            (it) =>
                                                                it.type ==
                                                                item.title
                                                        ).length == 0
                                                            ? 0.4
                                                            : 1,
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {" "}
                                                {cardID === item.id
                                                    ? "Hide"
                                                    : item.title ==
                                                      "Primary Contact"
                                                    ? ""
                                                    : "View"}{" "}
                                                {item.title ===
                                                "Primary Contact"
                                                    ? ""
                                                    : "Contacts"}
                                            </Box>

                                            {item.title !=
                                                "Primary Contact" && (
                                                <KeyboardArrowUpIcon
                                                
                                                    className={`${
                                                        cardID != item.id
                                                            ? "rotate-90"
                                                            : "-rotate-90"
                                                    }`}
                                                    sx={{
                                                        opacity:
                                                            contactsData?.filter(
                                                                (it) =>
                                                                    it.type ==
                                                                    item.title
                                                            ).length == 0
                                                                ? 0.4
                                                                : 1,
                                                        fontSize: "20px",
                                                        color: "#1D4ED8",
                                                        marginLeft: "6px"
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    )}
                                </Box>

                                {item.contactrole != "Primary contact" && (
                                    <>
                                        <LabourTable
                                            setDataType={setDataType}
                                            dataType={"AddContact"}
                                            contact={true}
                                            title={item.title}
                                            collap={
                                                contactsData?.filter(
                                                    (it) =>
                                                        it.type == item.title
                                                ).length > 0 &&
                                                cardID == item.id
                                            }
                                            open1={open}
                                            disabled={disabled}
                                            SetOpen1={SetOpen}
                                            index={index}
                                            contacts={contactsData?.filter(
                                                (it) => it.type == item.title
                                            )}
                                            handleDeletePopup={
                                                handleDeletePopup
                                            }
                                            handleEditPopup={
                                                handleContactsEditPopup
                                            }
                                            marginTopTable={"16px"}
                                            data={item.data}
                                            primary={
                                                currentProject.contact_fullname
                                                    ? currentProject.contact_fullname
                                                    : "No name available"
                                            }
                                            idx={item.id}
                                        />

                                        <MobileTable
                                            setDataType={setDataType}
                                            priamryCheck={
                                                !contacts[index]?.data
                                                    .primaryContact
                                            }
                                            disabled={disabled}
                                            dataType={"AddContact"}
                                            handleDeletePopup={
                                                handleDeletePopup
                                            }
                                            cardID={cardID}
                                            idx={item.id}
                                            contact={false}
                                            open1={open}
                                            handleEditPopup={
                                                handleContactsEditPopup
                                            }
                                            primary={
                                                currentProject.contact_fullname
                                                    ? currentProject.contact_fullname
                                                    : "No name available"
                                            }
                                            data={item.data}
                                            contactsData={contactsData?.filter(
                                                (it) => it.type == item.title
                                            )}
                                            nestedArray={false}
                                        />
                                    </>
                                )}
                            </Box>
                        </Box>
                    )
                })}
                <Divider
                    className="divider-col"
                    sx={{
                        width: "100%",
                        marginTop: {
                            md: "32px",
                            xs: "25px"
                        }
                    }}
                />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        py: 5.5,
                        flexDirection: {
                            lg: "row",

                            xs: "column"
                        }
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
                        <CommonButton
                            onclickHandler={handleBack}
                            className={"back-button"}
                            ariaTag={"This is back button"}
                            variant={"outlined"}
                            mt={{ xs: "0px", md: "0px" }}
                            mr={{ md: "8px" }}
                            px={"19.3px"}
                            py={{ xs: "11px" }}
                            color="#5C5C5C"
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            content={"Back"}
                        />

                        <CommonButton
                            className={"next-button"}
                            onclickHandler={(e) => onClickNextStep()}
                            ariaTag={"This is confirm button"}
                            variant={"contained"}
                            disabled={handledisable()}
                            px={"20px"}
                            py={{ xs: "12px" }}
                            color="white"
                            width={{
                                xs: "100%",
                                md: "103px"
                            }}
                            fontSize="16px"
                            lineHeight="24px"
                            fontWeight="600"
                            content={"Confirm"}
                            mt={{ xs: "8px", md: "0px" }}
                        />
                    </Box>
                </Box>
            </Box>

            {showPopUp.open && (
                <ContactsPopUp
                    required={false}
                    Title={Title}
                    id={showPopUp.id}
                    contactsData={contactsData}
                    modalInfo={showPopUp.data}
                    showPopUp={showPopUp.open}
                    title={showPopUp.name || ""}
                    handleSubmitPopUp={handleSubmitDevice}
                    handleTogglePopUp={handleTogglePopUp}
                    enableButton={enableButton}
                    setDataType={setDataType}
                    page={true}
                    disable={disabled}
                    contacts={contacts}
                    showPop={showPopUp.id}
                    setNotify={setError}
                    setNotify2={setNotify}
                    edit={edit}
                    primary={
                        currentProject.contact_fullname
                            ? currentProject.contact_fullname
                            : "No name available"
                    }
                />
            )}

            {notify && (
                <Notification
                    open={notify}
                    title={"Contact"}
                    error={error}
                    subtitle={
                        error === "updated"
                            ? "has been updated"
                            : error === "added"
                            ? "has been added"
                            : error === "delete"
                            ? "has been deleted"
                            : error === "exist"
                            ? "already exist"
                            : error === "name"
                            ? "Name already exist"
                            : error === "phone"
                            ? "Phone number already exist"
                            : error === "email"
                            ? "Email already exist"
                            : "has been added"
                    }
                    close={() => setNotify(false)}
                />
            )}

            {loading && (
                <ConfirmationNotification
                    open={loading}
                    title={"Provide Project Contacts"}
                    close={() => handleClose()}
                />
            )}
            <DeletePopUp
                setDontAskDeletePopup={setDontAskDeletePopup}
                title={"Contacts"}
                contact={true}
                setShowDeletePopUP={setShowDeletePopUP}
                showDeletePopUP={showDeletePopUP}
                handleDeleteItem={handleDelete}
                deletedID={deletedID}
                dataType={dataType}
            />
        </>
    )
}
