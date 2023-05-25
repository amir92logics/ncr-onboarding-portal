import React, { useState } from "react"
import { useTheme } from "@mui/material/styles"
import MessagingBody from "./MessagingBody/index"
import User from "../../src/avatar/user.jpg"
import DefaultUser from "../../src/avatar/defaultUser.jpg"
import Preview from "../../src/avatar/preview.jpg"

export default function MessagingComponent() {
    const [updateDom, setUpdateDom] = useState(false)
    const [messagingArray, SetMessagingArray] = useState([
        {
            messageId: "1",
            message:
                "Hi there, I would like to know what can i use the software in order to progress with the project?",
            name: "Karren",
            time: "1:35 PM",
            status: "opened",
            avatar: User,
            attachment: {
                fileName: "Document Name.pdf",
                fileType: "pdf",
                size: "10MB",
                preview: Preview
            }
        },
        {
            messageId: "2",
            status: "unread",
            message:
                "Thanks for your recent purchase. I know you are going to love the new equipment and software. The team is ready and excited to help. Simply follow along in the portal and let us know if you need any help.",
            name: "Andy Griffith",
            time: "1:35 PM",
            avatar: DefaultUser,
            attachment: null
        },
        {
            messageId: "3",
            status: "inherit",
            message: "Let’s schedule a call for tomorrow.",
            name: "Karren",
            time: "1:35 PM",
            avatar: User,
            attachment: null
        },
        {
            messageId: "2",
            status: "unread",
            message:
                "Thanks for your recent purchase. I know you are going to love the new equipment and software. The team is ready and excited to help. Simply follow along in the portal and let us know if you need any help d software. The team is ready and excited to help. Simply follow along in the portal and let us know if you need any helpd software. The team is ready and excited to help. Simply follow along in the portal and let us know if you need any help.",
            name: "Andy Griffith",
            time: "1:35 PM",
            avatar: DefaultUser,
            attachment: null
        }
    ])
    const handleSendMessage = (data) => {
        const tempMessageArray = messagingArray
        tempMessageArray.push(data)
        SetMessagingArray(tempMessageArray)
        setUpdateDom(!updateDom)
    }
    return false ? (
        ""
    ) : (
        <>
            <MessagingBody
                messagingArray={messagingArray}
                updateDom={updateDom}
                handleSendMessage={handleSendMessage}
            />
        </>
    )
}
