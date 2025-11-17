import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import VPSSImage from "../assets/VPSS.png";


const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: 20,
        borderBottom: "1px solid gray",
    },
    leftHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    logo: {
        width: 140,
        height: 140,
    },
    companyInfo: {
        fontSize: 12,
        paddingTop: 30,
        marginLeft: 10,
    },
    companyName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },
    rightHeaderContainer: {
        flex: 1,
        fontSize: 12,
        paddingRight: 15,
        width: "100%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 3,
        textAlign: "left",
    },
    value: {
        marginBottom: 10,
    },
    text: {
    },
    labelValueStyles: {

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 4,
    },
    body: {
        fontSize: 12,

        borderBottom: "1px solid #000",
    },
    addres: {
        width: 200,
    },
    phone: {
        marginBottom: 10,
    },
    name: {
        fontWeight: "bold",
    },
    tableheading: {
        borderRadius: 5,
    },
    VpssHeadinger: {
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingVertical: 5,
    },
    cell: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: "inter",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 8,
    },
    labelAmountStyles: {
        display: "flex", flexDirection: "row", gap: 80,
    },
});

const VPSS = (
    {
        name,
        address,
        phone,
        invoiceNo,
        VpssHeading,
        items = [],
        dateTime,
        grandtotalBeforeGST,
        sgstAmount,
        totalAmount
    }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header} fixed>
                    <View style={styles.leftHeader}>
                        <Image src={VPSSImage} style={styles.logo} />
                        <View style={styles.companyInfo}>
                            <Text style={styles.companyName}>Victorian pool safety services </Text>
                            <Text style={styles.text}>6Q3R+2W2, Honey Park Rd, Beside Prime</Text>
                            <Text style={styles.text}>Arcade, Adajan Gam, Adajan, Kukatpally,</Text>
                            <Text style={styles.text}>Hyderabad 500085</Text>
                            <Text style={styles.text}> admin@Victorianpoolservices.com </Text>

                        </View>
                    </View>
                    <View style={styles.rightHeaderContainer}>
                        <View style={styles.labelValueStyles}>
                            <Text style={styles.label}>INVOICE</Text>
                            <Text style={styles.value}>{invoiceNo}</Text>
                        </View>

                        <View style={styles.labelValueStyles}>
                            <Text style={styles.label}>DATE</Text>
                            <Text style={styles.value}>{dateTime}</Text>
                        </View>

                        <View style={styles.labelValueStyles}>
                            <Text style={styles.label}>DUE</Text>
                            <Text style={styles.value}>On Receipt</Text>
                        </View>

                        <View style={styles.labelValueStyles}>
                            <Text style={styles.label}>BALANCE DUE</Text>
                            <Text style={styles.value}>Rs. 0.00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.label}>Bill To   </Text>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.addres}>{address}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <View style={styles.tableheading}>
                        <View style={styles.VpssHeadinger}>
                            {VpssHeading.map((head, index) => (
                                <Text key={index}
                                    style={[styles.cell,
                                    {
                                        width: head.width || "",
                                        fontWeight: "bold",
                                    },
                                    ]}
                                >
                                    {head.label}
                                </Text>
                            ))}
                        </View>
                    </View>
                    {items?.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={[styles.cell, { width: "70%" }]}>{item.item}</Text>
                            <Text style={[styles.cell, { width: "10%" }]}>Rs. {item.price}</Text>
                            <Text style={[styles.cell, { width: "10%" }]}>{item.quantity}</Text>
                            <Text style={[styles.cell, { width: "10%" }]}>Rs. {item.itemTotalAfterDiscount?.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: 11,
                        width: "40%",
                        alignSelf: "flex-end",
                        marginTop: 10,
                        marginRight: 30,
                    }}
                >
                    <View>
                        <Text style={{ marginTop: 10 }}>Amount</Text>
                        <Text style={{ marginTop: 10 }}>SGST</Text>
                        <Text style={{ marginTop: 10 }}>CGST</Text>
                        <Text style={{ marginTop: 10, fontWeight: "bold" }}>Total</Text>
                        <Text style={{ marginTop: 10, fontWeight: "bold" }}>Paid</Text>
                    </View>

                    <View>
                        <Text style={{ marginTop: 10 }}>{grandtotalBeforeGST}</Text>
                        <Text style={{ marginTop: 10 }}>{sgstAmount}</Text>
                        <Text style={{ marginTop: 10 }}>{sgstAmount}</Text>
                        <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rs. {totalAmount}</Text>
                        <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rs.{totalAmount}</Text>
                        <Text style={{ marginTop: 10, color: "gray", }}>{dateTime}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: 11,
                        width: "40%",
                        alignSelf: "flex-end",
                        marginRight: 30,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: "gray",
                        paddingVertical: 4,
                        marginTop: 8,
                    }}
                >
                    <Text style={{ fontWeight: "bold", width: 60 }}>BALANCE DUE</Text>
                    <Text style={{ fontWeight: "bold", marginLeft: 10, paddingTop: 10, }}>0.00</Text>
                </View>
            </Page>
        </Document >
    );
};

export default VPSS;
