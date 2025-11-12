import React from "react";
import pklogo from "../assets/pklogo.png";
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
    padding: 5,
    color: "#0072CE"

  },
  tableRow: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // borderColor: "#ccc",
    paddingVertical: 8,

  },
  cell: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "inter",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingRight: 30,
    borderTopColor: "gray",
    borderTopWidth: 1,
    minHeight: 30,
    maxHeight: 300,
    marginTop: 20,
  },
});

const PKsupply = ({ name, address, dateTime, PKheadings = [], items = [], onlyAmount, totalGST, PKInvoiceNo, grandTotal, amountInWords }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.headerContainer} fixed>
        <View style={{ display: "flex", flexDirection: "row", gap: 10, }}>
          <Text style={styles.title}>PK CONSTRUCTION SERVICES</Text>

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
                PK TRADERS
              </Text>
              <Text>
                ROAD NO  BESIDE GODAVARI CUTS{"\n"}
                Hyderabad., Telangana, India - 500049
              </Text>
              <Text> GSTIN: 36DLVPP5801F1ZQ</Text>
              <Text> PAN: DLVPP5801F</Text>

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
              <Text style={styles.datesValue}>{PKInvoiceNo}</Text>
            </View>
            <View>
              <Text style={styles.datesLabel}>Invoice Date</Text>
              <Text style={styles.datesValue}>{dateTime}</Text>
            </View>
          </View>

          <View style={styles.divider} />
        </View>
      </View>
      <View style={{ padding: 15 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#0072CE",
            borderRadius: 5,
            overflow: "hidden",
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,

          }}
        >
          {/* Header */}
          <View style={styles.tableHeader}>
            {Array.isArray(PKheadings) &&
              PKheadings.map((header, index) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    {
                      width: header.width || "45%",
                      fontWeight: "bold",
                      color: "#0072CE",
                    },
                  ]}
                >
                  {header.name}
                </Text>
              ))}
          </View>

          {/* Rows */}
          {items?.map((item, index) => (
            <View
              style={[
                styles.tableRow,
                {
                  borderTopWidth: 1,
                  borderColor: "#0072CE", // internal row separator
                },
              ]}
              key={index}
            >
              <Text style={[styles.cell, { width: "3%" }]}>{index + 1}</Text>
              <Text style={[styles.cell, { width: "35%" }]}>{item.item}</Text>
              <Text style={[styles.cell, { width: "7%" }]}>{item.gst}%</Text>
              <Text style={[styles.cell, { width: "8%" }]}>{item.quantity}</Text>
              <Text style={[styles.cell, { width: "12%" }]}>₹{item.price}</Text>
              <Text style={[styles.cell, { width: "12%" }]}>₹{item?.baseAmount}</Text>
              <Text style={[styles.cell, { width: "13%" }]}>₹{item.gstAmount}</Text>
              <Text style={[styles.cell, { width: "12%" }]}>₹{item?.total}</Text>
            </View>
          ))}
        </View>
      </View>


      <View style={{ paddingTop: 20, display: "flex", flexDirection: "row", gap: 100, padding: 15, }}>
      </View>
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
            <Text style={{ fontWeight: "bold" }}>₹{onlyAmount}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 8,
            }}
          >
            <Text style={{ color: "gray" }}>IGST</Text>
            <Text style={{ fontWeight: "bold" }}>₹{totalGST}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 8,
            }}
          >
            <Text style={{ color: "gray" }}>INTREST AMOUNT</Text>
            <Text style={{ fontWeight: "bold" }}>₹0</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                backgroundColor: "#0072CE",
                paddingVertical: 10,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Total (INR)</Text>
              <Text style={{ color: "white", fontWeight: "bold" }}>₹{grandTotal}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#0072CE",
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
                (₹{grandTotal})
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ color: "#0072CE", paddingTop: 10, }}>TOTAL (IN WORDS) :</Text>
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
            backgroundColor: "#ACC3F2",
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
            }}>{dateTime}</Text>
            <Text style={{
              flex: 1,
              textAlign: "left",
            }}>Cash Payment</Text>
            <Text style={{
              flex: 1,
              textAlign: "right",
              fontFamily: "inter"
            }}>₹{Number(grandTotal).toFixed(2)}</Text>
          </View>
        </View>

      </View>
      <View style={{ borderColor: "#ACC3F2", borderWidth: 1, textAlign: "center", marginTop: 20, }}>
        <Text style={{ marginTop: 10, marginBottom: 10, }}>For any enquiry, reach out via call on +91 78159 36625</Text>
      </View>

      <View View style={styles.footer} fixed>
        <View>
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
                  {PKInvoiceNo}
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
          <View style={{ textAlign: "center", fontSize: 8 }}>
            <Text>This is an electronically generated document, no signature is required</Text>
          </View>
        </View>
      </View>

    </Page >
  </Document >
);

export default PKsupply;

