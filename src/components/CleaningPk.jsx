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
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#09A3B3",
    padding: 5,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
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
    backgroundColor: "#D2EEF7",
    height: "120px",
    minHeight: "90px",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    alignSelf: "flex-start",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    paddingRight: 30,
    borderTopColor: "gray",
    borderTopWidth: 1,
    minHeight: 30,
    maxHeight: 300,
    marginTop: 20,
  },
});

const CleaningPk = ({
  name,
  address,
  items = [],
  InvoiceNo,
  dateTime,
  HeaderTitles = [],
  grandtotalBeforeGST,
  amountInWords,
  gstAmount,
  interestAmount,
  finalWithInterest,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.Header} fixed>
          <Text
            style={{
              fontSize: 23,
              color: "#09A3B3",
              width: 125,
            }}
          >
            {"\n"} PK{"\n"} SERVICES{"\n"} INVOICE
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

          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 14 }}>PK TRAIDERS</Text>
            <Text style={{ fontSize: 10, paddingTop: 10, width: 150, color: "gray", }}>
              ROAD NO 3 BESIDE {"\n"}GODABVARI CUTS, HAFEEZPET,
              {"\n"}Hyderabad,Telangana, {"\n"}India - 500049
            </Text>
          </View>

          <Image
            src={pklogo}
            style={{ paddingRight: 10, height: 100, width: 120 }}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 30, marginTop: 20 }}>
          <View>
            <Text
              style={{
                backgroundColor: "#D2EEF7",
                padding: 5,
                borderLeftColor: "#09A3B3",
                borderLeftWidth: 1,
                fontSize: 12,
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
                fontSize: 12,
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
                fontSize: 12,
                padding: 5,
                gap: 20,
              }}
            >
              <Text>Invoice Date:</Text>
              <Text style={{ color: "gray" }}>{dateTime}</Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                backgroundColor: "#D2EEF7",
                padding: 5,
                borderLeftColor: "#09A3B3",
                borderLeftWidth: 1,
                fontSize: 12,
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
                justifyContent: "space-between",
                fontSize: 12,
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
                justifyContent: "space-between",
                fontSize: 12,
                padding: 5,
                gap: 20,
              }}
            >
              <Text>PAN:</Text>
              <Text style={{ color: "gray" }}>DLVPP5801F</Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                backgroundColor: "#D2EEF7",
                padding: 5,
                borderLeftColor: "#09A3B3",
                borderLeftWidth: 1,
                fontSize: 12,
                marginBottom: 5,
                color: "gray",
              }}
            >
              Payment Records
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: 12,
                padding: 5,
                gap: 20,

              }}
            >
              <Text>Invoice Amount</Text>
              <Text style={{ color: "gray", fontFamily: "inter" }}>
                ₹{Number(finalWithInterest).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: 12,
                padding: 5,
                gap: 20,
              }}
            >
              <Text>Paid Amount</Text>
              <Text style={{ color: "gray", fontFamily: "inter" }}>
                ₹{Number(finalWithInterest).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 30, marginTop: 20 }}></View>
        <View>
          <Text
            style={{
              backgroundColor: "#D2EEF7",
              padding: 5,
              width: 120,
              borderLeftColor: "#09A3B3",
              borderLeftWidth: 1,
              fontSize: 12,
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
              fontSize: 12,
              padding: 5,
              width: "140px",
              color: "gray",
            }}
          >
            <Text>{address}</Text>
          </View>

        </View>
        <View style={{ marginBottom: 140 }}>
          {/* Table */}
          <View style={{ marginTop: 20, borderRadius: 5 }}>
            {/* Header */}
            <View style={styles.tableHeader}>
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
              <Text style={[styles.cell, { width: "3%" }]}>{index + 1}</Text>
              <Text style={[styles.cell, { width: "35%" }]}>{item.item}</Text>
              <Text style={[styles.cell, { width: "7%" }]}>18%</Text>
              <Text style={[styles.cell, { width: "8%" }]}>{item.quantity}</Text>
              <Text style={[styles.cell, { width: "12%" }]}>₹{item.price}</Text>
              <Text style={[styles.cell, { width: "12%" }]}>
                ₹{item?.baseAmount}
              </Text>
              <Text style={[styles.cell, { width: "13%" }]}>
                ₹{item.gstAmount}
              </Text>

              <Text style={[styles.cell, { width: "12%" }]}>₹{item?.total}</Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View
          wrap={false}
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            gap: 25,
            marginBottom: 20,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "column", width: "65%" }}
          >
            <Text style={{ fontSize: 12, marginTop: 20 }}>
              Total (In Words) :
            </Text>
            <Text style={{ marginTop: 20, color: "#09A3B3", fontSize: 14 }}>
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
                  }}>{dateTime}</Text>
                  <Text style={{
                    flex: 1,
                    textAlign: "left",
                  }}>Account Transfer</Text>
                  <Text style={{
                    flex: 1,
                    textAlign: "right",
                    fontFamily: "inter"
                  }}>₹{Number(finalWithInterest).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ fontSize: 12, width: "35%" }}>
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
                ₹{grandtotalBeforeGST}
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
              <Text style={{ color: "gray" }}>IGST</Text>

              <Text style={{ fontFamily: "inter" }}>₹{gstAmount}</Text>
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
              <Text style={{ color: "gray" }}>INTREST AMOUNT</Text>
              <Text style={{ fontFamily: "inter", paddingBottom: 8 }}>
                ₹{Number(interestAmount).toFixed(2)}
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
              <Text style={{ fontSize: 12 }}>Total(INR)</Text>
              <Text
                style={{ color: "#09A3B3", fontSize: 16, fontFamily: "inter" }}
              >
                ₹{Number(finalWithInterest).toFixed(2)}
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
              <Text style={{ fontSize: 12 }}>Amount Paid</Text>
              <Text
                style={{ color: "#09A3B3", fontSize: 16, fontFamily: "inter" }}
              >
                (₹{Number(finalWithInterest).toFixed(2)})
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            wrap={false}
            style={{
              fontSize: "9",
              color: "black",
              textAlign: "center",
              height: 50,
              backgroundColor: "#D2EEF7",
              marginTop: 5,
            }}
          >
            For any enquiry, reach out via call on +91 78159 36625
          </Text>
        </View>

        <View View style={styles.footer} fixed>
          <View
            style={{
              fontSize: 10,
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
                  {InvoiceNo}{" "}
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
          <View>
            <Text
              style={{
                fontSize: "9",
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

export default CleaningPk;
