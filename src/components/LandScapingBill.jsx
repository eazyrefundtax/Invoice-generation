import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import inter from "../fonts/Inter_18pt-Medium.ttf";

Font.register({
  family: "inter",
  fonts: [{ src: inter, fontWeight: "200" }],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: "column",
    backgroundColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "black",
    color: "white",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    alignItems: "flex-start",
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
  Header: {
    height: "100px",
    minHeight: "90px",
    width: "100%",
    alignItems: "flex-end",
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
    paddingRight: 40,
    minHeight: 30,
    marginTop: 20,
  },
});

const LandScaping = ({
  Invoice,
  invoiceDate,
  dueDate,
  name,
  phone,
  HeaderTitles,
  items = [],
  grandtotal,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* FIXED HEADER */}
        <View style={styles.Header} fixed>
          {/* <View fixed style={{ alignItems: "flex-end" }}> */}
          <View style={{ fontSize: 18, marginBottom: 10 }}>
            <Text>Invoice</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              fontSize: 10,
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ marginBottom: 10 }}>Invoice # </Text>
              <Text style={{ marginBottom: 10 }}>Issued</Text>
              <Text style={{ marginBottom: 10 }}>Due</Text>
            </View>

            <View>
              <Text style={{ marginBottom: 10 }}>{Invoice}</Text>
              <Text style={{ marginBottom: 10 }}>{invoiceDate}</Text>
              <Text style={{ marginBottom: 10 }}>{dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* FROM + TO */}
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              gap: 60,
              marginTop: 10,
            }}
          >
            <View style={{ fontSize: 12 }}>
              <Text style={{ marginBottom: 10 }}>From</Text>
              <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 10 }}>
                OXYGEN LANDSCAPING AND
              </Text>
              <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 10 }}>
                HORTICULTURE
              </Text>
              <Text style={{ fontSize: 10 }}>
                H-NO 181 FLAT NO 5 KPHB JAMMU 1880005
              </Text>
              <Text style={{ fontSize: 10 }}>vinodhkumar.mukkamala@gmail.com</Text>
            </View>

            <View style={{ fontSize: 12 }}>
              <Text style={{ marginBottom: 10 }}>Billed To</Text>
              <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 10 }}>
                {name}
              </Text>
              <Text style={{ fontSize: 10 }}>{phone}</Text>
            </View>
          </View>

          {/* ITEMS TABLE */}
          <View style={{ marginTop: 20, marginBottom: 140 }}>
            <View style={styles.tableHeader} fixed>
              {HeaderTitles.map((header, index) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    {
                      width: header.width,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {header.name}
                </Text>
              ))}
            </View>

            {items?.map((item, index) => (
              <View style={styles.tableRow} key={index} wrap={false}>
                <Text style={[styles.cell, { width: "15%" }]}>
                  {invoiceDate}
                </Text>

                <View style={{ width: "50%" }}>
                  <Text style={styles.cell}>{item.item}</Text>
                  <Text style={styles.cell}>{item.description}</Text>
                </View>

                <Text style={[styles.cell, { width: "9%" }]}>
                  {item.quantity}
                </Text>

                <Text style={[styles.cell, { width: "13%" }]}>
                  ₹{item.price}
                </Text>

                <Text style={[styles.cell, { width: "13%" }]}>
                  ₹{item.amount}
                </Text>
              </View>
            ))}
          </View>

          {/* TOTALS */}
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row", gap: 12, fontSize: 10 }}>
              <Text>Subtotal</Text>
              <Text> INR {grandtotal}</Text>
            </View>


            <View
              style={{
                flexDirection: "row",
                gap: 12,
                backgroundColor: "black",
                color: "white",
                padding: 5,
                marginTop: 10,
                fontSize: 10,
              }}
            >
              <Text>Total Due</Text>
              <Text> INR {grandtotal}</Text>
            </View>
          </View>

        </View>
        {/*  FOOTER */}
        <View fixed style={styles.footer}>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text style={{ fontSize: 10 }}>Thanks you for Your business</Text>
          </View>
          <View
            style={{
              fontSize: 10,
              flexDirection: "row",
              width: "100%",
              gap: 20,
            }}
          >
            <Text
              style={{ color: "black" }}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />

            <View style={{ flexDirection: "row", gap: 40 }}>
              <View style={{ flexDirection: "row" }}>
                <Text>Invoice # </Text>
                <Text>{Invoice}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default LandScaping;

