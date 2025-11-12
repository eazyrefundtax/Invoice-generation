import React from "react";
import logoImg from "../assets/Ezyrefund.png";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        // padding: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 20,
        fontSize: 10,
    },
    section: {
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
    },
});
const EzyRefundBill = ({ amount, InvoiceNumber, date, dueDate, amountInWords }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 1,
                }}
            >
                <Text style={{ fontSize: 11, }}>BILL OF SUPPLY</Text>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#BEBEBE",
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        borderRadius: 3,
                    }}
                >
                    <Text style={{ fontSize: 9, color: "#444" }}>ORIGINAL FOR RECIPIENT</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <View style={{ width: 80, marginRight: 10 }}>
                    <Image
                        src={logoImg}
                        style={{ width: 80, height: 60, objectFit: "contain" }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            color: "#C82909",
                            fontSize: 22.5,
                            fontWeight: "Bold",
                            marginBottom: 2,
                        }}
                    >
                        EAZYREFUND CONSULTANCY LLP
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            lineHeight: 1.3,
                        }}
                    >
                        6TH, Plot No.1148, 6th Floor Siri Heights, Serlingampally, Khanamet,
                        Hyderabad, Telangana, 500033
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 3,
                            gap: 52,
                        }}
                    >
                        <Text style={{ fontSize: 9 }}>
                            <Text>Mobile:</Text> +1 (909)999-6214
                        </Text>
                        <Text style={{ fontSize: 9 }}>
                            <Text>GSTIN:</Text> 36AAJFE1030B1Z6
                        </Text>
                        <Text style={{ fontSize: 9 }}>
                            <Text>PAN Number:</Text> AAJFE1030B
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    height: 8,
                    backgroundColor: "#C82909",
                    marginTop: 8,
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "#f2f2f2",
                    gap: 100,
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                }}
            >
                <Text style={{ fontSize: 10 }}>Invoice No.: {InvoiceNumber}</Text>
                <Text style={{ fontSize: 10 }}>Invoice Date: {date}</Text>
                <Text style={{ fontSize: 10 }}>Due Date: {dueDate}</Text>
            </View>
            <View>
                <Text style={{ marginTop: 5, marginBottom: 5, }}>BILL TO EAZYREFUNDCONSULTANCY LLC</Text>
                <Text style={{ marginBottom: 3, }}>1314 Hidden Rdg, Apt 2101, Irving, 75038</Text>
                <Text>Mobile: +19099996214</Text>
            </View>
            <View
                style={{
                    height: 2,
                    backgroundColor: "#C82909",
                    marginTop: 8,
                }}
            />
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, marginBottom: 10, }}>
                <View style={{ width: "60%", }}>
                    <Text style={{ marginLeft: 10, }}>
                        SERVICES
                    </Text>
                </View>
                <View style={{ width: "20%" }}>
                    <Text >
                        CURRENCY
                    </Text>
                </View>
                <View style={{ width: "20%", textAlign: "right", marginRight: 10, }}>
                    <Text >
                        AMOUNT
                    </Text>
                </View>
            </View>
            <View
                style={{
                    height: 2,
                    backgroundColor: "#C82909",

                }}
            />
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, marginBottom: 20, borderBottom: 1, borderColor: "gray", }}>
                <View style={{ width: "60%", }}>
                    <Text style={{ marginLeft: 10, marginBottom: 5, }}>
                        PROFESSIONAL CHARGES
                    </Text>
                </View>
                <View style={{ width: "20%", marginBottom: 5, }}>
                    <Text >
                        USD
                    </Text>
                </View>
                <View style={{ width: "20%", textAlign: "right", marginRight: 10, marginBottom: 5, }}>
                    <Text>{amount}</Text>
                </View>
            </View>
            <View
                style={{
                    height: 2,
                    backgroundColor: "#C82909",
                    marginTop: 90,

                }}
            />
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                <View style={{ width: "60%", }}>
                    <Text style={{ marginLeft: 10, marginBottom: 5, }}>
                        SUBTOTAL
                    </Text>
                </View>
                <View style={{ width: "20%", textAlign: "right", marginRight: 10, marginBottom: 5, }}>
                    <Text>${amount}</Text>
                </View>
            </View>
            <View
                style={{
                    height: 2,
                    backgroundColor: "#C82909",

                }}
            />
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text style={{ marginTop: 12, }}>BANK DETAILS</Text>
                    <View style={{ display: "flex", flexDirection: "row", gap: 20, fontSize: 9, }}>
                        <View>
                            <Text style={{ marginTop: 5, }}>Name:</Text>
                            <Text style={{ marginTop: 5, }}>IFSC Code:</Text>
                            <Text style={{ marginTop: 5, }}>Account No:</Text>
                            <Text style={{ marginTop: 5, }}>Bank:</Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 5, }}>EAZY REFUND CONSULTANCY LLP</Text>
                            <Text style={{ marginTop: 5, }}>HDFC0002391</Text>
                            <Text style={{ marginTop: 5, }}>50200060897139</Text>
                            <Text style={{ marginTop: 5, }}>HDFC Bank , BANJARA HILL ROAD NO. THREE</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: "row", borderBottom: 1, borderColor: "black", paddingVertical: 4, marginTop: 8, }}>
                        <Text style={{ width: "100px", textAlign: "left" }}>TAXABLE AMOUNT</Text>
                        <Text style={{ width: "20px", textAlign: "center" }}>$</Text>
                        <Text style={{ textAlign: "right" }}>{amount}</Text>
                    </View>
                    <View style={{ flexDirection: "row", borderBottom: 1, borderColor: "black", paddingVertical: 4 }}>
                        <Text style={{ width: "100px", textAlign: "left" }}>TOTAL AMOUNT</Text>
                        <Text style={{ width: "20px", textAlign: "center" }}>$</Text>
                        <Text style={{ textAlign: "right" }}>{amount}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20, paddingVertical: 4 }}>
                        <Text style={{ width: "100px", textAlign: "left" }}>Received Amount</Text>
                        <Text style={{ width: "20px", textAlign: "center" }}>$</Text>
                        <Text style={{ textAlign: "center" }}>0</Text>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: "flex-end", marginTop: 10, }}>
                <Text>Total Amount(in words) :{amountInWords}</Text>
            </View>
            <View style={{ marginTop: 150, }}>
                <Text>TERMS AND CONDITIONS:</Text>
                <Text>1) Theamount has to be paid with in 7days from invoice date</Text>
                <Text>2) Exchange Rate shall be determined based on the invoice date only</Text>
                <Text>3) Incase of any discrepencies please let us know with in 7 days</Text>
            </View>
        </Page>
    </Document>


);

export default EzyRefundBill;
