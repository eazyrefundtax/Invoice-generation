import React from "react";
import royalImg from "../assets/RoyalPrime.png";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
} from "@react-pdf/renderer";
import inter from "../fonts/Inter_18pt-Medium.ttf";

Font.register({
    family: "inter",
    fonts: [{ src: inter, fontWeight: "200" }],
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Helvetica",
        fontSize: 11,
    },
    headerContainer: {
        backgroundColor: "#0072CE",
        color: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    companySection: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    logo: {
        width: 95,
        height: 75,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    companyInfo: {
        width: "55%",
        lineHeight: 1.4,
    },
    companyName: {
        fontSize: 12,
        fontWeight: "bold",
    },
    billedSection: {
        width: "35%",
        textAlign: "left",
        lineHeight: 1.5,
    },
    billedLabel: {
        fontSize: 10,
        textTransform: "uppercase",
    },
    billedName: {
        fontWeight: "bold",
    },
    divider: {
        marginTop: 12,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ACC3F2",
    },
    datesLabel: {
        fontSize: 10,
        marginBottom: 4,
    },
    datesValue: {
        fontSize: 11,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#ACC3F2",
        borderWidth: 1,
        borderColor: "#0072CE",
        padding: 5,
        color: "#0072CE"

    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 8,

    },
    cell: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: "inter",
    },
});

const Royal = ({ name, address, dateTime, dueDate, RoyalTitles = [], items = [], grandtotalBeforeGST, sgstAmount, totalAmount, invoiceNo }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.headerContainer} fixed>
                <Text style={styles.title}>Invoice</Text>

                <View style={styles.topRow}>
                    <View style={styles.companySection}>
                        <Image src={royalImg} style={styles.logo} />
                        <View style={styles.companyInfo}>
                            <Text style={styles.companyName}>
                                ROYAL PRIME TRADERS
                            </Text>
                            <Text>
                                Plot no: 223, General Bazar, Ameerpet,{"\n"}
                                Hyderabad., Telangana, India - 500016
                            </Text>
                            <Text>Phone: +91 73866 75543</Text>
                        </View>
                    </View>

                    <View style={styles.billedSection}>
                        <Text style={styles.billedLabel}>Billed To</Text>
                        <Text style={styles.billedName}>{name}</Text>
                        <Text>{address}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 50, }}>
                        <View>
                            <Text style={styles.datesLabel}>Invoice No #</Text>
                            <Text style={styles.datesValue}>{invoiceNo}</Text>
                        </View>
                        <View>
                            <Text style={styles.datesLabel}>Invoice Date</Text>
                            <Text style={styles.datesValue}>{dateTime}</Text>
                        </View>
                        <View>
                            <Text style={styles.datesLabel}>Due Date</Text>
                            <Text style={styles.datesValue}>{dueDate}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />
                </View>
            </View>
            <View style={{ padding: 15, }}>
                {/* Table */}
                <View style={{ marginTop: 20, borderRadius: 5, }}>
                    {/* Header */}
                    <View style={styles.tableHeader}>
                        {Array.isArray(RoyalTitles) &&
                            RoyalTitles.map((header, index) => (
                                <Text
                                    key={index}
                                    style={[
                                        styles.cell,
                                        {
                                            width: header.width || "45%",
                                            fontWeight: "bold",
                                            // color: "#fff",
                                            color: "#0072CE"
                                        },
                                    ]}
                                >
                                    {header.name}
                                </Text>
                            ))}
                    </View>
                </View>

                {/* Rows */}

                {items?.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={[styles.cell, { width: "4%" }]}>{index + 1}</Text>
                        <Text style={[styles.cell, { width: "40%" }]}>{item.item}</Text>
                        <Text style={[styles.cell, { width: "8%" }]}>18%</Text>
                        <Text style={[styles.cell, { width: "12%" }]}>{item.quantity}</Text>
                        <Text style={[styles.cell, { width: "12%" }]}>₹{Number(item.price).toFixed(2)}</Text>
                        <Text style={[styles.cell, { width: "13%" }]}>₹{Number(item?.itemTotal).toFixed(2)}</Text>
                        <Text style={[styles.cell, { width: "13%" }]}>₹{Number(item?.total).toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            <View style={{ paddingTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 15, }}>
                <View style={{ width: "65%" }}>
                    <Text style={{ color: "#0072CE", paddingBottom: 10, }}>TERMS AND CONDITIONS</Text>
                    <Text style={{ paddingBottom: 10, }}> Please pay within 15 days from the date of invoice, overdue interest @
                        14% will be charged on delayed payments.</Text>
                    <Text style={{ paddingBottom: 10, }}> Please quote invoice number when remitting funds.</Text>
                    <Text style={{ paddingBottom: 10, }}>A deposit may be required before the work begins, particularly for
                        large or complex projects.</Text>
                    <Text>Any materials used in repairs may carry a manufacturer's warranty,
                        subject to the manufacturer's terms and conditions.</Text>
                </View>
                <View style={{ width: "30%", fontFamily: "inter", }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: 15, }}>
                        <Text style={{ color: "gray" }}>Amount</Text>
                        <Text style={{ fontWeight: "bold" }}>₹ {grandtotalBeforeGST}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: 15, }}>
                        <Text style={{ color: "gray" }}>CGST</Text>
                        <Text style={{ fontWeight: "bold" }}>₹ {sgstAmount}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: 15, }}>
                        <Text style={{ color: "gray" }}>SGST</Text>
                        <Text style={{ fontWeight: "bold" }}>₹ {sgstAmount}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: 15, }}>
                        <Text style={{ color: "gray" }}>Reductinon</Text>
                        <Text style={{ fontWeight: "bold" }}>₹ 0.00</Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "white",
                            backgroundColor: "#0072CE",
                            height: 25,
                            paddingHorizontal: 5,
                        }}
                    >
                        <Text>Total (INR)</Text>
                        <Text style={{ fontWeight: "bold" }}>₹{totalAmount}</Text>
                    </View>

                </View>
            </View>
            <View style={{
                position: "absolute",
                bottom: 10,
                width: "100%",
                paddingRight: 30,
                borderTopColor: "gray",
                borderTopWidth: 1,
                fontSize: 8,
                minHeight: 30,
                maxHeight: 300,
                marginTop: 20,
                textAlign: "center",
            }} fixed>
                <Text style={{ paddingTop: 10, }}> This is an electronically generated document, no signature is required</Text>
            </View>

        </Page >
    </Document >
);

export default Royal;

