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

import pklogo from "../assets/pklogo.png";
import inter from "../fonts/Inter_18pt-Medium.ttf";

Font.register({
    family: "inter",
    fonts: [{ src: inter, fontWeight: "200" }],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 20,
        position: "relative",
        paddingBottom: 60,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#2EA4F2",
        borderBottomWidth: 1,
        borderColor: "none",
        padding: 5,
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
    terms: {
        padding: 5,
        color: "gray",
        paddingHorizontal: 10,
    },
    Header: {
        flexDirection: "row",
        backgroundColor: "#C8E7F7",
        height: "100px",
        minHeight: "90px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
        alignSelf: "flex-start",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    footer: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        paddingRight: 30,
        borderTopColor: "gray",
        borderTopWidth: 1,
        minHeight: 40,
        maxHeight: 300,
        marginTop: 20,
    },
});

const PkSuppliesbill = ({
    name,
    address,
    items = [],
    invoiceNo,
    dateTime,
    HeaderTitles = [],
    totalAmount,
    totalFinalAmount,
    amountInWords,
    totalCGST,
    dueDate,
    paymentDate,
    ChallanDate

}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.Header} fixed>
                    <View style={{ display: "flex", flexDirection: "column", padding: 10, }}>
                        <Text
                            style={{
                                fontSize: 21,
                                color: "#2EA4F2",
                                width: 125,
                                borderRadius: 5,

                            }}>
                            INVOICE
                        </Text>
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

                        <View>

                        </View>
                    </View>

                    <View style={{ flexDirection: "column", width: 200, }}>
                        <Text style={{ fontSize: 14 }}>PK TRADERS</Text>
                        <Text style={{ fontSize: 10, paddingTop: 10, width: 150, color: "gray" }}>
                            ROAD NO 3 Beside Godavari Cuts, HAFEEZPET
                            Hyderabad,Telangana,India - 500049
                        </Text>
                    </View>

                    <Image
                        src={pklogo}
                        style={{ paddingRight: 10, height: 80, width: 100 }} />
                </View>
                <View style={styles.body}>
                    {/* Invoice + Payment + Customer Info */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        {/* Invoice Details */}
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    width: 120,
                                    padding: 5,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Invoice Details
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>Invoice No #</Text>
                                <Text style={{ color: "gray" }}>{invoiceNo}</Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>Invoice Date:</Text>
                                <Text style={{ color: "gray" }}>{dateTime}</Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>Due Date:</Text>
                                <Text style={{ color: "gray" }}>{dueDate}</Text>
                            </View>
                        </View>

                        {/* Billed By Record */}
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    width: 120,
                                    padding: 5,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    gap: 20,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Billed BY
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>GSTIN:</Text>
                                <Text style={{ color: "gray" }}>36DLUPP5801F1ZQ</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>PAN:</Text>
                                <Text style={{ color: "gray" }}>DLVPP5801F</Text>
                            </View>
                        </View>

                        {/* Customer Info */}
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    width: 120,
                                    padding: 5,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Payment Records
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,

                                }}
                            >
                                <Text>Invoice Amount</Text>
                                <Text style={{ color: "gray", fontFamily: "inter" }}>
                                    ₹{Number(totalAmount).toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>Paid Amount</Text>
                                <Text style={{ color: "gray", fontFamily: "inter" }}>
                                    (₹{Number(totalAmount).toFixed(2)})
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        {/*Billed to*/}
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    padding: 5,
                                    width: 120,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Billed To
                            </Text>
                            <View style={{ fontSize: 10, padding: 5, width: "140px" }}>
                                <Text>{name}</Text>
                            </View>
                            <View
                                style={{
                                    fontSize: 10,
                                    padding: 5,
                                    width: "140px",
                                    color: "gray",
                                }}
                            >
                                <Text>{address}</Text>
                            </View>
                        </View>
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    padding: 5,
                                    width: 120,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Shipped From
                            </Text>
                            <View style={{ fontSize: 10, padding: 5, width: "170px" }}>
                                <Text>Nandi furnishing</Text>
                            </View>
                            <View
                                style={{
                                    fontSize: 10,
                                    padding: 5,
                                    width: "140px",
                                    color: "gray",
                                }}
                            >
                                <Text > ROAD NO 3 Beside Godavari Cuts, HAFEEZPET
                                    Hyderabad,Telangana,India - 500049  </Text>
                            </View>
                        </View>
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    padding: 5,
                                    width: 120,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Shipped To
                            </Text>
                            <View style={{ fontSize: 10, padding: 5, width: "140px" }}>
                                <Text>{name}</Text>
                            </View>
                            <View
                                style={{
                                    fontSize: 10,
                                    padding: 5,
                                    width: "140px",
                                    color: "gray",
                                }}
                            >
                                <Text>{address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <View style={{ width: "33.33%", }}>
                            <Text
                                style={{
                                    backgroundColor: "#D7F5E1",
                                    width: 120,
                                    padding: 5,
                                    borderLeftColor: "#2EA4F2",
                                    borderLeftWidth: 1,
                                    fontSize: 10,
                                    marginBottom: 5,
                                    color: "gray",
                                }}
                            >
                                Transport Details
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>Transport:</Text>
                                <Text style={{ color: "gray" }}> ABDUL ROAD
                                    TRANSPORT</Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text>Challan Date: </Text>
                                <Text style={{ color: "gray" }}>{ChallanDate}</Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text> Challan
                                    Number:</Text>
                                <Text style={{ color: "gray" }}>101420216121</Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    fontSize: 10,
                                    padding: 5,
                                    gap: 20,
                                }}
                            >
                                <Text style={{ width: 100 }}>  Extra
                                    Information:</Text>
                                <Text style={{ color: "gray" }}>WE ARE NOT RESPONSIBLE ANY DAMAGE OCCUR WHILE TRANSPORTATION</Text>
                            </View>
                        </View>
                    </View>

                    {/* Table */}
                    <View style={{ marginTop: 20, borderRadius: 5, marginBottom: 140 }}>
                        {/* Table Header*/}
                        <View
                            style={[
                                styles.tableHeader,
                                {
                                    backgroundColor: "#2EA4F2",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingVertical: 6,
                                    paddingHorizontal: 10,
                                    borderTopLeftRadius: 3,
                                    borderTopRightRadius: 3,
                                },
                            ]}
                            fixed
                        >
                            {Array.isArray(HeaderTitles) &&
                                HeaderTitles.map((header, index) => (
                                    <Text
                                        key={index}
                                        style={[
                                            styles.cell,
                                            {
                                                width: header.width || "45%",
                                                fontWeight: "bold",
                                                color: "#fff",
                                                textAlign: "center",
                                                fontSize: 10,
                                            },
                                        ]}
                                    >
                                        {header.name}
                                    </Text>
                                ))}
                        </View>

                        {/* Table Data */}
                        {Array.isArray(items) &&
                            items.map((item, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.tableRow,
                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            paddingVertical: 8,
                                            paddingHorizontal: 10,
                                        },
                                    ]}
                                    wrap={false}>
                                    <Text style={[styles.cell, { width: "2%", textAlign: "center" }]}>{index + 1}</Text>
                                    <Text style={[styles.cell, { width: "30%", textAlign: "center" }]}>{item.item}</Text>
                                    <Text style={[styles.cell, { width: "7%", textAlign: "center" }]}>{item.gst}%</Text>
                                    <Text style={[styles.cell, { width: "7%", textAlign: "center" }]}>{item.quantity}</Text>
                                    <Text style={[styles.cell, { width: "11%", textAlign: "center" }]}>₹{item.price}</Text>
                                    <Text style={[styles.cell, { width: "11%", textAlign: "center" }]}>₹{item?.itemTotal}</Text>
                                    <Text style={[styles.cell, { width: "10%", textAlign: "center" }]}>₹{item.igst}</Text>
                                    <Text style={[styles.cell, { width: "10%", textAlign: "center" }]}>₹{item.igst}</Text>
                                    <Text style={[styles.cell, { width: "12%", textAlign: "center" }]}>₹{item?.total}</Text>
                                </View>
                            ))}
                    </View>
                    {/* Total Section */}
                    <View
                        style={{
                            marginTop: 15,
                            display: "flex",
                            flexDirection: "row",
                            gap: 25,
                            marginBottom: 20,
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                            <Text style={{ fontSize: 12, }}>
                                Total (In Words):
                            </Text>
                            <Text style={{ marginTop: 10, color: "#2EA4F2", fontSize: 12 }}>
                                {amountInWords}
                            </Text>

                            <Text style={{ paddingTop: 20, }}>Payment</Text>
                            <View wrap={false} style={{ marginTop: 5 }}>
                                <View style={{
                                    borderRadius: 6,
                                    overflow: "hidden",
                                    width: "100%",
                                }}>
                                    {/* Header */}
                                    <View style={{
                                        flexDirection: "row",
                                        backgroundColor: "#00A9AD",
                                        color: "#fff",
                                        fontSize: 10,
                                        fontWeight: "bold",
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
                                        }}>{paymentDate}</Text>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: "left",
                                        }}>Account Transfer</Text>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: "right",
                                            fontFamily: "inter"
                                        }}>₹{Number(totalFinalAmount).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={{ fontSize: 10, width: "30%" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            >
                                <Text style={{ color: "gray" }}>Amount</Text>
                                <Text style={{ fontFamily: "inter" }}>
                                    ₹{Number(totalAmount).toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            >
                                <Text style={{ color: "gray" }}>SGST</Text>

                                <Text style={{ fontFamily: "inter" }}>₹{Number(totalCGST).toFixed(2)}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                    marginBottom: 5,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text style={{ color: "gray" }}>CGST</Text>
                                <Text style={{ fontFamily: "inter", paddingBottom: 8 }}>
                                    ₹{Number(totalCGST).toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                    marginBottom: 5,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text style={{ fontSize: 14, }}>Total(INR)</Text>
                                <Text
                                    style={{ color: "#2EA4F2", fontSize: 14, fontFamily: "inter" }}
                                >
                                    ₹{Number(totalFinalAmount).toFixed(2)}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 5, }}>
                                <Text style={{ fontSize: 14, width: 40, }}>Amount Paid</Text>
                                <Text style={{ color: "#2EA4F2", fontSize: 14, fontFamily: "inter" }}>(₹{Number(totalFinalAmount).toFixed(2)})</Text>
                            </View>


                        </View>
                    </View>
                    <View
                        wrap={false}
                        style={{
                            backgroundColor: "#D7F5E1",
                            fontSize: 10,
                            margin: 20,
                            height: 140,
                        }}
                    >
                        <Text style={{ fontSize: 14, marginTop: 10 }}>
                            Terms and Conditions
                        </Text>
                        <Text style={{
                            padding: 5,
                            color: "gray",
                            paddingHorizontal: 10,
                        }}>
                            1. Please pay within 15 days from the date of invoice, overdue interest @ 28% will be charged on delayed payments
                        </Text>
                        <Text style={{
                            padding: 5,
                            color: "gray",
                            paddingHorizontal: 10,
                        }}>
                            2. Please quote invoice number when remitting funds.
                        </Text>
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "inter",
                                    fontSize: 10,
                                    textAlign: "center",
                                }}
                            >
                                For any enquiry, reach out via call on
                                <Text
                                    style={{
                                        fontFamily: "inter",
                                        fontWeight: "bold",
                                    }}
                                >
                                    +91 78159 36625
                                </Text>
                            </Text>
                        </View>


                    </View>

                </View>


                <View View style={styles.footer} fixed>
                    <View
                        style={{
                            fontSize: 8,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingTop: 10,
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 40,
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 8 }}>Invoice No </Text>
                                <Text style={{ color: "black", fontSize: 12 }}>
                                    {invoiceNo}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 8 }}>Invoice Date </Text>
                                <Text style={{ color: "black", fontSize: 12 }}>{dateTime}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 8 }}>Billing To </Text>
                                <Text style={{ color: "black", fontSize: 12 }}>{name} </Text>
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
                    <View style={{ fontSize: 7, textAlign: "center" }}>
                        <Text>This is an electronically generated document, no signature is required</Text>
                    </View>
                </View>
            </Page>
        </Document >
    );
};

export default PkSuppliesbill;
