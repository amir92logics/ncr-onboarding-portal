import Head from "next/head"
import React from "react"
import Docs from "../../../components/Document"

export default function Index() {
    return (
        <>
            <Head>
                <title>Menu | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <Docs type={"menu_upload_filename"} title="Menu" />
        </>
    )
}
