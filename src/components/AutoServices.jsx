import React from "react";
import {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import logo from "../assets/AutoServices.png";
import inter from "../fonts/Inter_18pt-Medium.ttf";
Font.register({
    family: "inter",
    fonts: [{ src: inter, fontWeight: "200" }],
});

const styles = StyleSheet.create({
    page: {
        padding: 25,
        fontSize: 11,
        fontFamily: "inter",
    },



    logo: {
        width: 120,
    },

    invoiceTitle: {
        width: 120,
        fontSize: 22,
        fontWeight: "bold",
        color: "#e60000",
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 10,
        color: "#000",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    label: {
        fontWeight: "bold",
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#e60000",
        padding: 6,
        color: "#fff",
        marginTop: 15,
    },

    tableRow: {
        flexDirection: "row",
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },

    cell: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: "inter",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 15,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        marginTop: 25,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
        fontSize: 10,
        height: "40px",
        minHeight: "40px",
        color: "#555",
    },

    body: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },

});

const AutoServices = ({
    invoiceDate,
    name,
    HeaderTitles,
    items = [],
    totalAmount,
    amountInWords,
    BillingNumber
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* HEADER */}
                <View style={styles.headerContainer} fixed>
                    <Image src={logo} style={styles.logo} />
                    <View style={{ flexDirection: "column", width: 220, }}>
                        <Text style={{ fontSize: 14 }}>Auto Service</Text>
                        <Text style={{ fontSize: 10, paddingTop: 10, width: 150 }}>
                            ROAD NO 6 Beside Apollo Hospital,
                            Hyderabad,Telangana,India - 500072
                        </Text>
                    </View>
                    <Text style={styles.invoiceTitle}>SERVICE INVOICE</Text>
                </View>

                {/* CUSTOMER INFO */}
                <View style={styles.body}>
                    <Text style={styles.sectionTitle}>Customer Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text>{name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Invoice No:</Text>
                        <Text>{BillingNumber}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Invoice Date:</Text>
                        <Text>{invoiceDate}</Text>
                    </View>



                    {/* Table */}
                    <View>
                        <View style={{ marginTop: 20, borderRadius: 5 }} fixed>
                            {/* Header */}
                            <View style={styles.tableHeader} fixed>
                                {HeaderTitles.map((header, index) => (
                                    <Text
                                        key={index}
                                        style={[
                                            styles.cell,
                                            {
                                                width: header.width || "45%",
                                                fontWeight: "bold",
                                                color: "#fff",
                                            },
                                        ]}>
                                        {header.name}
                                    </Text>
                                ))}
                            </View>
                        </View>


                        {/* Rows */}
                        {items?.map((item, index) => (
                            <View style={styles.tableRow} key={index} wrap={false}>
                                <Text style={[styles.cell, { width: "5%" }]}>
                                    {index + 1}
                                </Text>
                                <Text style={[styles.cell, { width: "40%" }]}>
                                    {item.item}
                                </Text>
                                <Text style={[styles.cell, { width: "7%" }]}>18%</Text>
                                <Text style={[styles.cell, { width: "12%" }]}>
                                    {item.quantity}
                                </Text>
                                <Text style={[styles.cell, { width: "12%" }]}>
                                    ₹{item.price}
                                </Text>
                                <Text style={[styles.cell, { width: "12%" }]}>
                                    ₹{item?.baseAmount}
                                </Text>
                                <Text style={[styles.cell, { width: "12%" }]}>
                                    ₹{item?.total}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* SUMMARY */}
                    <View style={{
                        marginTop: 40, borderWidth: 1,
                        borderColor: "#000",
                        borderRadius: 6,
                        padding: 10,
                    }} wrap={false}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.label}>Grand Total:</Text>
                            <Text style={{ fontWeight: "bold" }}>₹{totalAmount}</Text>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.label}>Amount in Words:</Text>
                            <Text style={{ fontWeight: "bold" }}>{amountInWords}</Text>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <Text style={styles.footer} fixed>
                    Thank you for choosing Auto Services.
                </Text>

            </Page>
        </Document>
    );
};

export default AutoServices
