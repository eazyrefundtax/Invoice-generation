import React from 'react';
import logo from "../assets/ActImg.png";
import icon from "../assets/profileicon.png";
import Banner from "../assets/Actbanner1.png";
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        margin: 40,
        fontSize: 8,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    address: {
        marginBottom: 3,
    },
    payrow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        gap: 6,
        marginTop: 15,
    },
    paybox: {
        borderWidth: 1,
        borderColor: "#777",
        width: "14%",
    },
    boxHeader: {
        backgroundColor: "#737577",
        color: "#fff",
        textAlign: "center",
        fontWeight: 500,
        paddingVertical: 8,
    },
    boxValue: {
        textAlign: "center",
        paddingVertical: 8,
        color: "#555",
    },
    payButton: {
        backgroundColor: "#e53935",
        color: "#fff",
        fontWeight: 500,
        paddingVertical: 8,
        paddingHorizontal: 15,
        textAlign: "center",
        marginLeft: 6,
    },

    row: {
        flexDirection: "row",
        gap: 10,
        marginTop: 15,

    },

    box: {
        backgroundColor: "#e53935",
        padding: 15,
        borderRadius: 3,
        width: "42.5%",
    },

    title: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: 500,
        marginBottom: 6,
        color: "#fff",
    },

    divider: {
        height: 1,
        backgroundColor: "#ffffff55",
        marginBottom: 6,
    },

    lineItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 3,
    },

    label: {
        color: "#fff",
    },

    value: {
        color: "#fff",
    },
    sectionHeader: {
        padding: 8,
        marginBottom: 5,
    },
    sectionTitle: {
        color: "#e53935",
        fontSize: 12,
    },
    rightText: {
        position: "absolute",
        right: 20,
        top: 25,
        fontSize: 10,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableColHeader: {
        width: "16.6%",
        backgroundColor: "#e53935",
        color: "#fff",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: "center",
        padding: 5,
        fontWeight: "bold",
    },
    tableCol: {
        width: "16.6%",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: "center",
        padding: 5,
    },
    summaryRow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    summaryText: {
        fontSize: 10,
        width: "70%"
    },
});
// Create Document Component 
const ActWifi = ({ name, addres, UserID, ActinvoiceNO, phone, totalAmount, }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={{}}>
                <Image
                    src={logo}
                    style={{
                        height: 80,
                        width: 110,
                    }} />
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 5, }}>
                <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
                    TAX INVOICE
                </Text>
                <Text>
                    (Original for the Receipient)
                </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 100, }}>
                <View>
                    <View style={{ marginTop: 5, marginBottom: 10, display: "flex", flexDirection: "row", gap: 5, }}>
                        <Image
                            src={icon}
                            style={{ height: 12, width: 12, }}
                        />
                        <Text style={{ color: "red", fontSize: 14, fontWeight: "bold", width: 200, }}>
                            {name}
                        </Text>
                    </View>
                    <View style={{ color: "gray", }}>
                        <Text style={{ width: 120, marginBottom: 3, }}>{addres}</Text>
                        <Text style={styles.address}>Mobile: {phone}</Text>
                        <Text style={styles.address}>Alternate Mobile :</Text>
                        <Text style={styles.address}>User Id : {UserID}</Text>
                        <Text style={styles.address}>Account No : {UserID}</Text>
                        <Text style={styles.address}>Invoice No. :TG-B1-{ActinvoiceNO}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ color: "gray", marginTop: 30, }}>
                        <Text style={styles.address}>ATRIA CONVERGENCE TECHNOLOGIES LIMITED,</Text>
                        <Text style={styles.address}>8-2-618/1/2, Road No 11,</Text>
                        <Text style={styles.address}>Banjara Hills, Hyderabad, Telangana 500034.</Text>
                        <Text style={styles.address}>Ph.No : 9121212121,7288999999</Text>
                        <Text style={styles.address}>www.actcorp.in</Text>
                        <Text style={styles.address}>E-mail : helpdesk@actcorp.in</Text>
                        <Text style={styles.address}>GSTIN : 36AACCA8907B1ZZ</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.payrow}>
                    <View style={styles.paybox}>
                        <Text style={styles.boxHeader}>Billing Period</Text>
                        <Text style={styles.boxValue}>Nov, 2025</Text>
                    </View>
                    <View style={styles.paybox}>
                        <Text style={styles.boxHeader}>Invoice Date</Text>
                        <Text style={styles.boxValue}>01/11/2025</Text>
                    </View>
                    <View style={styles.paybox}>
                        <Text style={styles.boxHeader}>Amount Payable</Text>
                        <Text style={styles.boxValue}>₹619.5</Text>
                    </View>
                    <View style={styles.paybox}>
                        <Text style={styles.boxHeader}>Due Date</Text>
                        <Text style={styles.boxValue}>10/11/2025</Text>
                    </View>
                    <View style={styles.paybox}>
                        <Text style={styles.boxHeader}>Amount After Due Date</Text>
                        <Text style={styles.boxValue}>₹737.5</Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.payButton}>PAY BILL</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.box}>
                    <Text style={styles.title}>Account Summary</Text>
                    <View style={styles.divider} />
                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Previous Due (A)</Text>
                        <Text style={styles.value}>₹619.5</Text>
                    </View>
                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Invoice Amount (B)</Text>
                        <Text style={styles.value}>₹619.5</Text>
                    </View>
                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Adjustments (C)</Text>
                        <Text style={styles.value}>₹0</Text>
                    </View>
                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Payments Received (D)</Text>
                        <Text style={styles.value}>₹619.5</Text>
                    </View>
                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Balance Amount (A+B-C-D)</Text>
                        <Text style={styles.value}>₹619.5</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>This Month's Summary</Text>
                    <View style={styles.divider} />

                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Total Charges</Text>
                        <Text style={styles.value}>₹525.00</Text>
                    </View>

                    <View style={styles.lineItem}>
                        <Text style={styles.label}>CGST</Text>
                        <Text style={styles.value}>₹47.25</Text>
                    </View>

                    <View style={styles.lineItem}>
                        <Text style={styles.label}>SGST</Text>
                        <Text style={styles.value}>₹47.25</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.lineItem}>
                        <Text style={styles.label}>Total</Text>
                        <Text style={styles.value}>₹619.5</Text>
                    </View>
                </View>
            </View>
            <View>
                <Image
                    src={Banner}
                    style={{
                        marginTop: 10,
                        width: "86.2%",
                        height: 180,
                    }}
                />
            </View>
            <View style={{ width: "86.2%", backgroundColor: "#f3f3f3", marginTop: 10, }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Invoice Charges</Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ textAlign: "right" }}>Account No: 101652802973</Text>
                        <Text style={{ textAlign: "right" }}>User Name: 101652802973</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Plan Name</Text>
                        <Text style={styles.tableColHeader}>From Date</Text>
                        <Text style={styles.tableColHeader}>To Date</Text>
                        <Text style={styles.tableColHeader}>Quantity</Text>
                        <Text style={styles.tableColHeader}>Rental</Text>
                        <Text style={styles.tableColHeader}>Net Amount</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>A Max Loyalty 1M</Text>
                        <Text style={styles.tableCol}>01/11/2025</Text>
                        <Text style={styles.tableCol}>30/11/2025</Text>
                        <Text style={styles.tableCol}>30 days</Text>
                        <Text style={styles.tableCol}>525</Text>
                        <Text style={styles.tableCol}>525</Text>
                    </View>
                </View>

                <View style={styles.summaryRow}>
                    <View style={{ width: "70%" }}>
                        <Text>Sub Total: </Text>
                    </View>
                    <View style={{ width: "20%", }}>
                        <Text>522</Text>
                    </View>
                </View>
            </View>

        </Page>
    </Document>
);

export default ActWifi;