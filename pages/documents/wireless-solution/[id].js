import Head from "next/head"
import React from "react"
import Docs from "../../../components/Document"

export default function Index() {
    return (
        <>
            <Head>
                <title>
                    Wireless Solution - Restaurant Blueprints | NCR Onboarding
                </title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <Docs
                type={"wireless_upload_filename"}
                title="Wireless Solution-Restaurant Blueprints"
            />
        </>
    )
}
