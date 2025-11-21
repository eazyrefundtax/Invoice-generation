import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import JBMLogo from "../assets/JBMLogo.png";
import jblogo from "../assets/jblogo.png";
import inter from "../fonts/Inter_18pt-Medium.ttf";

Font.register({
    family: "inter",
    fonts: [{ src: inter, fontWeight: "200" }],
});

// Styles for PDF  
const styles = StyleSheet.create({
    page: {
        flexDirection: "column", // better for vertical layout
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        border: "1pt solid #ccc",
        borderRadius: 4,
    },
    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#95C4DE",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#000",
        fontWeight: "bold",
        color: "#000",
        fontSize: 9,
        textAlign: "center",
        height: 30,
        alignItems: "center",
    },

    tableRow: {
        flexDirection: "row",
        alignItems: "stretch",
        borderBottomWidth: 1,
        borderColor: "#000",
        height: 60,
    },

    cell: {
        borderRightWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        fontSize: 10,
        height: "100%",
        padding: 4,
        fontFamily: "inter"
    },


});

const JBMBill = ({
    name,
    phone,
    getDate,
    totalNetRate,
    items = [],
    tableHead = []
}) => {
    console.log("Items", items)
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ fontSize: 9, fontWeight: "bold" }}>
                        <Text>To,</Text>
                        <Text>Mr/Ms. {name}</Text>
                        <Text>Mob.{phone}</Text>
                    </View>
                    <View>
                        <Image
                            src={JBMLogo}
                            style={{ paddingRight: 10, height: 65, width: 200, paddingLeft: 30 }} />
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: 10, fontWeight: "bold" }}>
                    <View>
                        <Text>Dear Sir/Madam</Text>
                        <Text> Please find the Best and Final quotation as per your requirement</Text>
                    </View>
                    <View>
                        <Text style={{ marginTop: 20, }}>Date:{getDate}</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 10, borderRadius: 5, fontWeight: "bold",
                }}>
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFF00",
                            borderLeft: 1,
                            borderRight: 1,
                            borderTop: 1,
                            borderColor: "#000",
                            height: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}    >
                        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 10 }}>
                            Kohler Quotation
                        </Text>
                    </View>
                    <View style={[styles.tableHeader, { borderLeft: 1, }]}>
                        {Array.isArray(tableHead) &&
                            tableHead.map((header, index) => (
                                <Text
                                    key={index}
                                    style={[
                                        styles.cell,
                                        {
                                            width: header.width || "45%",
                                            fontWeight: "bold",
                                            color: "#fff",
                                        },
                                    ]}
                                >
                                    {header.name}
                                </Text>
                            ))}
                    </View>
                    <View>

                    </View>
                </View>

                {/* Rows */}

                {items?.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={[styles.cell, { width: "6%", borderLeftWidth: 1, borderColor: "#000", paddingTop: 23 }]}>{index + 1}</Text>
                        <Text style={[styles.cell, { width: "30%", paddingTop: 23 }]}>{item.item}</Text>
                        <View style={[styles.cell, { width: "15%", alignItems: "center", }]}>
                            {item.image && <Image src={item.image} style={{ width: 50, height: 50 }} />}
                        </View>
                        <Text style={[styles.cell, { width: "8%", paddingTop: 23 }]}>{item.quantity}</Text>
                        <Text style={[styles.cell, { width: "13%", paddingTop: 23 }]}>₹{item.price}</Text>
                        <Text style={[styles.cell, { width: "14%", paddingTop: 23 }]}>₹{item.netRate}</Text>
                        <Text style={[styles.cell, { width: "14%", paddingTop: 23 }]}>₹{item.netRate}</Text>
                    </View>
                ))}

                <View
                    style={{
                        flexDirection: "row",
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: "#000",
                        height: 22,
                        fontWeight: "bold",
                    }}
                >
                    <View
                        style={{
                            flex: 1,

                        }}
                    />
                    <View
                        style={{
                            width: 100,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "bold",
                            }}
                        >
                            Total Amount
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 80,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "bold",
                                fontFamily: "inter",
                            }}
                        >
                            ₹{totalNetRate}
                        </Text>
                    </View>
                </View>
                <View
                    wrap={false}
                    style={{ fontSize: 10, fontWeight: "bold", marginTop: 10, }}>
                    <Text>Terms & Conditions </Text>
                    <Text>1. 100% Advance along with confirm PO (or) Oder.</Text>
                    <Text> 2. Material will be delivered with in 2-3 Weeks from the date of confirm PO and payment</Text>
                    <Text>3. Once order placed, models or quantities can't be changed.</Text>
                    <Text> 4. For Site delivery Transport and unloading your scope only (Extra).</Text>
                    <Text> 5. Gst@18% Inclusive.</Text>
                </View>
                <View
                    wrap={false}
                    style={{ display: "flex", flexDirection: "row", gap: 30, fontSize: 10, fontWeight: "bold", marginTop: 20, }}>
                    <View>
                        <Text>Regards,</Text>
                        <Text>For JAYA BUILD MART</Text>
                        <Text style={
                            { marginTop: 20 }
                        }>Mob: 6399789999</Text>
                    </View>
                    <View>

                        <Image src={jblogo} style={{ width: 330, height: 100, }} />
                    </View>
                </View>
            </Page >
        </Document >
    )
};

export default JBMBill;
