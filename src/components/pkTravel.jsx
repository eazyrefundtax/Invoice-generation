import React from "react";
import pklogo from "../assets/PkTravelsLogo.png";
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
        backgroundColor: "#B30000",
        color: "#fff",
        marginBottom: "20px",
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
        padding: 5,
        color: "#B30000"

    },
    tableRow: {
        flexDirection: "row",
        // borderBottomWidth: 1,
        // borderColor: "#ccc",
        paddingVertical: 8,

    },

    body: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    cell: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: "inter",
    },
    footer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderTopColor: "gray",
        borderTopWidth: 1,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },

});

const pkTravel = ({ name, pickup, drop, amount, totalAmount, gstAmount, amountInWords, invoiceDate, BillingNumber }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.headerContainer} fixed>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, }}>
                    <Text style={styles.title}>PK Travels</Text>

                    <View
                        style={{
                            backgroundColor: "green",
                            height: 16,
                            width: 30,
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 4,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 10,
                                fontFamily: "inter",
                                textAlign: "center",
                            }}
                        >
                            Paid
                        </Text>
                    </View>
                </View>

                <View style={styles.topRow}>
                    <View style={styles.companySection}>
                        <Image src={pklogo} style={styles.logo} />
                        <View style={styles.companyInfo}>
                            <Text style={styles.companyName}>
                                PK TRAVELS
                            </Text>
                            <Text>
                                ROAD NO 3 BESIDE GODAVARI CUTS{"\n"}
                                Hyderabad., Telangana, India - 500049
                            </Text>
                            <Text> GSTIN: 36DLVPP5801F1ZQ</Text>
                            <Text> PAN: DLVPP5801F</Text>

                        </View>
                    </View>

                    <View style={styles.billedSection}>
                        <Text style={styles.billedLabel}>Billed To</Text>
                        <Text style={styles.billedName}>{name}</Text>

                    </View>
                </View>

                <View style={styles.divider} />

                <View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 50, }}>
                        <View>
                            <Text style={styles.datesLabel}>Invoice No #</Text>
                            <Text style={styles.datesValue}>{BillingNumber}</Text>
                        </View>
                        <View>
                            <Text style={styles.datesLabel}>Invoice Date</Text>
                            <Text style={styles.datesValue}>{invoiceDate}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />
                </View>
            </View>
            <View style={styles.body}>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: "#FFB8B8",
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: "#D0D7E2",
                    }}
                >
                    <View style={{ width: "48%" }}>
                        <Text style={[styles.billedLabel, { fontSize: 10, color: "#555" }]}>
                            PickUp Location
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 2 }}>{pickup}</Text>
                    </View>

                    <View style={{ width: "48%" }}>
                        <Text style={[styles.billedLabel, { fontSize: 10, color: "#555" }]}>
                            Drop Location
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 2 }}>{drop}</Text>
                    </View>
                </View>

                {/* <View style={{ paddingTop: 20, display: "flex", flexDirection: "row", gap: 100, padding: 15, }}>
                </View> */}
                <View style={{ display: "flex", alignItems: "flex-end" }}>
                    <View style={{ fontFamily: "inter", paddingVertical: 10, width: "70%", }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingBottom: 8,
                            }}
                        >
                            <Text style={{ color: "gray" }}>Amount</Text>
                            <Text style={{ fontWeight: "bold" }}>₹{amount}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingBottom: 8,
                            }}
                        >
                            <Text style={{ color: "gray" }}>IGST</Text>
                            <Text style={{ fontWeight: "bold" }}>₹{gstAmount}</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View
                                style={{
                                    backgroundColor: "#B30000",
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}

                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>Total (INR)</Text>
                                <Text style={{ color: "white", fontWeight: "bold" }}>₹{Number(totalAmount).toFixed(2)}</Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#B30000",
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    borderTopWidth: 1,
                                    borderTopColor: "white",
                                }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>Amount Paid</Text>
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                    (₹{Number(totalAmount).toFixed(2)})
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: "#B30000", paddingTop: 10, }}>TOTAL (IN WORDS) :</Text>
                            <Text style={{ paddingTop: 10, }}>{amountInWords}</Text>
                        </View>
                    </View>
                </View>

                <View wrap={false} style={{ marginTop: 5 }}>
                    <View style={{
                        borderRadius: 6,
                        overflow: "hidden",
                        width: "100%",
                    }}>
                        {/* Header */}

                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFB8B8",
                            fontSize: 10,
                            paddingVertical: 6,
                            paddingHorizontal: 4,
                        }} fixed>
                            <Text style={{
                                flex: 1,
                                textAlign: "left",
                            }}>Date</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: "left",
                            }}>Mode</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: "right",
                            }}>Amount</Text>
                        </View>

                        {/* Row */}
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#fff",
                            borderTop: "0.5px solid #ddd",
                            fontSize: 10,
                            paddingVertical: 6,
                            paddingHorizontal: 4,
                        }}>
                            <Text style={{
                                flex: 1,
                                textAlign: "left",
                            }}>{invoiceDate}</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: "left",
                            }}>Cash Payment</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: "right",
                                fontFamily: "inter"
                            }}>₹{Number(totalAmount).toFixed(2)}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ borderColor: "#ACC3F2", borderWidth: 1, textAlign: "center", marginTop: 20, }}>
                    <Text style={{ marginTop: 10, marginBottom: 10, }}>For any enquiry, reach out via call on +91 78159 36625</Text>
                </View>

            </View>
            <View style={styles.footer} fixed>
                <View style={{
                    fontSize: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingTop: 6,
                    alignItems: "center"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginRight: 30 }}>
                            <Text style={{ fontSize: 8 }}>Invoice No</Text>
                            <Text style={{ color: "black", fontSize: 12 }}>{BillingNumber}</Text>
                        </View>

                        <View style={{ marginRight: 30 }}>
                            <Text style={{ fontSize: 8 }}>Invoice Date</Text>
                            <Text style={{ color: "black", fontSize: 12 }}>{invoiceDate}</Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: 8 }}>Billing To</Text>
                            <Text style={{ color: "black", fontSize: 12 }}>{name}</Text>
                        </View>
                    </View>

                    <View>
                        <Text
                            style={{ color: "black" }}
                            render={({ pageNumber, totalPages }) =>
                                `Page ${pageNumber} of ${totalPages}`
                            }
                        />
                    </View>
                </View>

                <View style={{ textAlign: "center", fontSize: 8, marginTop: 4 }}>
                    <Text>
                        This is an electronically generated document, no signature is required
                    </Text>
                </View>
            </View>

        </Page >
    </Document >
);

export default pkTravel;

