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
import logoImage from "../assets/generated-removebg-preview.png";
import inter from "../fonts/Inter_18pt-Medium.ttf";
Font.register({
  family: "inter",
  fonts: [{ src: inter, fontWeight: "200" }],
});


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20, // reserve space for footer
    position: "relative",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2A8C2E",
    padding: 5,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingVertical: 8,
    backgroundColor: "#ECF3F8",
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
    backgroundColor: "#ECF3F8",
    height: "90px",
    minHeight: "90px",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: "20px",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "gray",
    backgroundColor: "#fff",
    height: "90px",
    minHeight: "90px",
    width: "100%",
  },
});

const WashTogBill = ({
  name,
  address,
  items = [],
  InvoiceNo,
  dateTime,
  HeaderTitles,
  grandtotalBeforeGST,
  onlyCGST,
  reductions,
  newFinalAmount,
  amountInWords,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.Header} fixed >
          <Text style={{ fontSize: 28, color: "#2A8C2E" }}>Invoice</Text>

          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 16 }}>WASHTOG</Text>
            <Text
              style={{ fontSize: 12, paddingTop: 10, color: "gray" }}
            >
              India
            </Text>
          </View>

          <Image src={logoImage} style={{ height: 65, width: 190 }} />
        </View>

        <View style={styles.body}>
          {/* Invoice + Payment + Customer Info */}
          <View style={{ flexDirection: "row", gap: 50, marginTop: 20 }}>
            {/* Invoice Details */}
            <View>
              <Text
                style={{
                  backgroundColor: "#ECF3F8",
                  padding: 5,
                  borderLeftColor: "#23940A",
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
                  justifyContent: "space-between",
                  fontSize: 10,
                  padding: 5,
                  gap: 20,
                }}
              >
                <Text>Invoice No #</Text>
                <Text style={{ color: "gray" }}>{InvoiceNo}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: 10,
                  padding: 5,
                  gap: 20,
                }}
              >
                <Text>Invoice Date:</Text>
                <Text style={{ color: "gray" }}>{dateTime}</Text>
              </View>
            </View>

            {/* Payment Record */}
            <View>
              <Text
                style={{
                  backgroundColor: "#ECF3F8",
                  padding: 5,
                  borderLeftColor: "#23940A",
                  borderLeftWidth: 1,
                  fontSize: 10,
                  gap: 20,
                  marginBottom: 5,
                  color: "gray",
                }}
              >
                Payment Record
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: 10,
                  padding: 5,
                  gap: 20,
                }}
              >
                <Text>Invoice Amount</Text>
                <Text style={{ color: "gray", fontFamily: "inter" }}>
                  ₹{newFinalAmount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: 10,
                  padding: 5,
                  gap: 20,
                }}
              >
                <Text>Due Amount</Text>
                <Text
                  style={{
                    color: "#23940A",
                    fontSize: 10,
                    fontFamily: "inter",
                  }}
                >
                  ₹{newFinalAmount}
                </Text>
              </View>
            </View>

            {/* Customer Info */}
            <View>
              <Text
                style={{
                  backgroundColor: "#ECF3F8",
                  padding: 5,
                  borderLeftColor: "#23940A",
                  borderLeftWidth: 1,
                  fontSize: 10,
                  marginBottom: 5,
                  color: "gray",
                }}
              >
                Billed To
              </Text>
              <View style={{ fontSize: 12, padding: 5, width: "140px" }}>
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

          {/* Table */}
          <View>
            <View style={{ marginTop: 20, borderRadius: 5 }}>
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

          {/* Totals + Terms block – keep together above footer */}
          <View wrap={false}>
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <Text style={{ fontSize: 12, marginTop: 20 }}>
                  Total (In Words) :
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    color: "#2A8C2E",
                    fontSize: 14,
                  }}
                >
                  {amountInWords}
                </Text>
              </View>
              <View style={{ fontSize: 12, width: "30%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                    fontFamily: "inter",
                  }}
                >
                  <Text style={{ color: "gray" }}>Amount</Text>
                  <Text>₹{grandtotalBeforeGST}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    fontFamily: "inter",
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ color: "gray" }}>CGST</Text>
                  <Text>₹{onlyCGST}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                    fontFamily: "inter",
                  }}
                >
                  <Text style={{ color: "gray" }}>SGST</Text>

                  <Text>₹{onlyCGST}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    fontFamily: "inter",
                  }}
                >
                  <Text style={{ color: "gray" }}>Reduction</Text>
                  <Text>₹{Number(reductions).toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>Total(INR)</Text>
                  <Text
                    style={{
                      color: "#23940A",
                      fontSize: 16,
                      fontFamily: "inter",
                    }}
                  >
                    ₹{Number(newFinalAmount).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Terms and Conditions */}
            <View
              style={{
                backgroundColor: "#ECF3F8",
                fontSize: 10,
                margin: 20,
                height: 140,
              }}
            >
              <Text style={{ fontSize: 14, marginTop: 10 }}>
                Terms and Conditions
              </Text>
              <Text style={styles.terms}>
                1. All services will be performed in accordance with the
                client's specified requirements and instructions.
              </Text>
              <Text style={styles.terms}>
                2. The cleaning provider will take reasonable care in
                performing the services to avoid causing damage to property.
              </Text>
              <Text style={styles.terms}>
                3. The client is responsible for removing any personal
                belongings, valuables, or fragile items before cleaning.
              </Text>
              <Text style={styles.terms}>
                4. The client must provide clear instructions regarding
                areas to be cleaned or avoided.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed >
          <View
            style={{
              fontSize: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 40,
              }}
            >
              <View>
                <Text style={{ fontSize: 8 }}>Invoice No </Text>
                <Text style={{ color: "black", fontSize: 12 }}>
                  {InvoiceNo}
                </Text>
              </View>

              <View>
                <Text style={{ fontSize: 8 }}>Invoice Date </Text>
                <Text style={{ color: "black", fontSize: 12 }}>
                  {dateTime}
                </Text>
              </View>

              <View>
                <Text style={{ fontSize: 8 }}>Billing To </Text>
                <Text style={{ color: "black", fontSize: 12 }}>
                  {name}
                </Text>
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

          <View>
            <Text
              style={{
                fontSize: 9,
                color: "black",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              This is electrically generated document, No signature is required
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default WashTogBill;
