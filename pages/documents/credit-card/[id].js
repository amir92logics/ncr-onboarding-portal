import Head from "next/head"
import React from "react"
import Docs from "../../../components/Document"

export default function Index() {
    return (
        <>
            <Head>
                <title>Credit Card | NCR Onboarding</title>
                <meta name="description" content="NCR Onboarding." />
            </Head>
            <Docs
                type={"credit_card_upload_filename"}
                title="Credit Card VAR"
            />
        </>
    )
}
