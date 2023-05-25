import Head from "next/head"
import React from "react"
import Docs from "../../../components/Document"

export default function Index() {
    return (
        <>
            <Head>
                <title>Floor Plan | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <Docs
                type={"floor_plan_upload_filename"}
                title="Requested Floor Plan"
            />
        </>
    )
}
