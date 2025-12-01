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

import nandi from "../assets/nandi.png";
import inter from "../fonts/Inter_18pt-Medium.ttf";
import signature from "../assets/nandisign.png";

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
    backgroundColor: "#23940A",
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
    backgroundColor: "#D7F5E1",
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
    minHeight: 30,
    maxHeight: 300,
    marginTop: 20,
  },
});

const NandiSupplyBill = ({
  name,
  shippedName,
  address,
  shippingAddress,
  items = [],
  invoiceNo,
  invoiceDate,
  HeaderTitles = [],
  finalWithInterest,
  totalAmount,
  gstTotal,
  extraCharges,
  totalFinalAmount,
  amountInWords,
  percentPaid,
  fullPercenytPaid,
  initialPayment,
  finalPayment,
  dueDate,
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
                color: "#23940A",
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
            <Text style={{ fontSize: 14 }}>Nandi Furnishing</Text>
            <Text style={{ fontSize: 10, paddingTop: 10, width: 150 }}>
              ROAD NO 6 Beside Apollo Hospital,
              Hyderabad,Telangana,India - 500072
            </Text>
          </View>

          <Image
            src={nandi}
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
                  padding: 5,
                  borderLeftColor: "#23940A",
                  width: 120,
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
                <Text style={{ color: "gray" }}>{invoiceDate}</Text>
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
                  padding: 5,
                  borderLeftColor: "#23940A",
                  borderLeftWidth: 1,
                  fontSize: 10,
                  gap: 20,
                  width: 120,
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
                  padding: 5,
                  borderLeftColor: "#23940A",
                  borderLeftWidth: 1,
                  fontSize: 10,
                  marginBottom: 5,
                  color: "gray",
                  width: 120,

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
                  ₹{Number(finalWithInterest).toFixed(2)}
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
                  ₹{Number(finalWithInterest).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <View style={{ width: "33.33%", }}>
              <Text
                style={{
                  backgroundColor: "#D7F5E1",
                  padding: 5,
                  width: 120,
                  borderLeftColor: "#23940A",
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
                  borderLeftColor: "#23940A",
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
                <Text >Road no 6, beside apollo hospital, Hyderabad, Telangana, India - 500072</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  fontSize: 10,
                  padding: 5,
                  gap: 20,
                }}>
                <Text>GSTIN:</Text>
                <Text style={{ color: "gray" }}>36DLUPP5801F1ZQ</Text>
              </View>
            </View>
            <View style={{ width: "33.33%", }}>
              <Text
                style={{
                  backgroundColor: "#D7F5E1",
                  padding: 5,
                  width: 120,
                  borderLeftColor: "#23940A",
                  borderLeftWidth: 1,
                  fontSize: 10,
                  marginBottom: 5,
                  color: "gray",
                }}
              >
                Shipped To
              </Text>
              <View style={{ fontSize: 10, padding: 5, width: "140px" }}>
                <Text>{shippedName}</Text>
              </View>
              <View
                style={{
                  fontSize: 10,
                  padding: 5,
                  width: "140px",
                  color: "gray",
                }}
              >
                <Text>{shippingAddress}</Text>
              </View>
            </View>
          </View>



          {/* Table */}
          <View style={{ marginBottom: 140 }}>
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
              <View style={styles.tableRow} key={index} wrap={false}>
                <Text style={[styles.cell, { width: "3%" }]}>{index + 1}</Text>
                <Text style={[styles.cell, { width: "35%" }]}>{item.item}</Text>
                <Text style={[styles.cell, { width: "7%" }]}>{item.gst}%</Text>
                <Text style={[styles.cell, { width: "8%" }]}>{item.quantity}</Text>
                <Text style={[styles.cell, { width: "12%" }]}>₹{item.price}</Text>
                <Text style={[styles.cell, { width: "12%" }]}>
                  ₹{item?.itemTotal}
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
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              gap: 25,
              marginBottom: 20,
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", width: "70%" }}
            >

              <View style={{ display: "flex", flexDirection: "row", gap: 10, fontSize: 10, marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Country to Supply:</Text>
                <Text style={{ color: "gray" }}>India</Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", gap: 10, fontSize: 10, marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Place to Supply:</Text>
                <Text style={{ color: "gray" }}>Telangana(36)</Text>
              </View>
              <Text style={{ fontSize: 12, marginTop: 20 }}>
                Total (In Words):
              </Text>
              <Text style={{ marginTop: 20, color: "#23940A", fontSize: 12 }}>
                {amountInWords}
              </Text>

              <Text style={{ paddingTop: 25, }}>Payment</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                marginTop: 5,
                backgroundColor: "#23940A",
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                paddingVertical: 4,
                paddingHorizontal: 10,
                color: "white",
                fontFamily: "inter",
              }}>
                <Text style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>Date</Text>
                <Text style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>Mode</Text>
                <Text style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>Amount</Text>
              </View>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                marginTop: 5,
                paddingVertical: 4,
                paddingHorizontal: 10,
                color: "white",
                fontFamily: "inter",
              }}>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>{initialPayment}</Text>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>Cash Payment</Text>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>₹{percentPaid}</Text>

              </View>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                marginTop: 5,
                paddingVertical: 4,
                paddingHorizontal: 10,
                color: "white",
                fontFamily: "inter",
              }}>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>{finalPayment}</Text>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>Cash Payment</Text>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}>₹{fullPercenytPaid}</Text>

              </View>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                marginTop: 5,
                paddingVertical: 4,
                paddingHorizontal: 10,
                color: "white",
                fontFamily: "inter",
              }}>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%"
                }}></Text>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%",
                  fontWeight: "bold",
                }}>Total</Text>
                <Text style={{
                  color: "black",
                  fontSize: 10,
                  textAlign: "center",
                  width: "33%",
                  fontWeight: "bold",
                }}>₹{Number(totalFinalAmount).toFixed(2)}
                </Text>

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
                  ₹{totalAmount}
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

                <Text style={{ fontFamily: "inter" }}>₹{Number(gstTotal).toFixed(2)}</Text>
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
                <Text style={{ color: "gray" }}>Extra Amount</Text>
                <Text style={{ fontFamily: "inter", paddingBottom: 8 }}>
                  ₹{Number(extraCharges).toFixed(2)}
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
                  style={{ color: "#23940A", fontSize: 14, fontFamily: "inter" }}
                >
                  ₹{Number(totalFinalAmount).toFixed(2)}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 5, }}>
                <Text style={{ fontSize: 14, width: 40, }}>Amount Paid</Text>
                <Text style={{ color: "#23940A", fontSize: 14, fontFamily: "inter" }}>(₹{Number(totalFinalAmount).toFixed(2)})</Text>
              </View>
              <View>
                <Image src={signature} style={{ marginTop: 20, height: 60, width: 140, alignSelf: "center" }} />
              </View>

            </View>
          </View>
          <View
            style={{
              backgroundColor: "#D7F5E1",
              fontSize: 10,
              margin: 20,
              height: 140,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Terms and Conditions</Text>

            <Text style={{ color: "gray", marginBottom: 2 }}>
              1. Please pay within 15 days from the date of invoice, overdue interest @ 20% will be charged on delayed payments.
            </Text>

            <Text style={{ color: "gray", marginBottom: 10 }}>
              2. Please quote invoice number when remitting funds.
            </Text>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "inter",
                  fontSize: 10,
                  textAlign: "center",
                  color: "black",
                }}
              >
                For any enquiry, reach out via email at
                <Text
                  style={{
                    fontFamily: "inter",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  nandifurnishing@gmail.com
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
                <Text style={{ color: "black", fontSize: 12 }}>{invoiceDate}</Text>
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
        </View>
      </Page>
    </Document >
  );
};

export default NandiSupplyBill;
