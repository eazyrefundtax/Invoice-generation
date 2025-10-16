import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    padding: 30,
    display: "flex",
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
    // borderLeftColor: "white",
    // borderLeftWidth: 1,
    // borderRightColor: "white",
    // borderRightWidth: 1,
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
  // info: {
  //   display: "flex",
  //   // flexDirection: "row",
  //   justifyContent: "space-between",
  //   fontSize: 12,
  //   gap: 20,
  //   marginBottom: "10px",
  // },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingRight: 40,

    minHeight: 30,
    maxHeight: 300,
    marginTop: 20,
  },
});
const LandScaping = ({
  Invoice,
  issueDate,
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
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <View style={{ fontSize: 18, marginBottom: "10px" }}>
            <Text>Invoice</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              fontSize: 10,
              marginBottom: "10px",
            }}
          >
            <View>
              <Text style={{ marginBottom: 10 }}>Invoice # </Text>
              <Text style={{ marginBottom: 10 }}>Issued</Text>
              <Text style={{ marginBottom: 10 }}>Due</Text>
            </View>

            <View>
              <Text style={{ marginBottom: 10 }}>{Invoice}</Text>
              <Text style={{ marginBottom: 10 }}>{issueDate}</Text>
              <Text style={{ marginBottom: 10 }}> {dueDate}</Text>
            </View>
          </View>

          {/* <View style={styles.info}>

            
          </View> */}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            gap: 60,
          }}
        >
          <View style={{ fontSize: "12px" }}>
            <Text style={{ marginBottom: "10px" }}>From</Text>
            <Text
              style={{ fontWeight: "bold", marginBottom: "10px", fontSize: 10 }}
            >
              OXYGEN LANDSCAPINGM AND
            </Text>
            <Text
              style={{ fontWeight: "bold", marginBottom: "10px", fontSize: 10 }}
            >
              HORTICULTURE
            </Text>
            <Text style={{ fontSize: 10 }}>
              H-NO 181 FLAT NO 5 KPHB JAMMU 1880005
            </Text>
            <Text>vinodhkumar.mukkamala@gmail.com</Text>
          </View>
          <view style={{ fontSize: "12px" }}>
            <Text style={{ marginBottom: "10px" }}>Billed To</Text>
            <Text
              style={{ fontWeight: "bold", marginBottom: "10px", fontSize: 10 }}
            >
              {name}
            </Text>
            <Text style={{ fontSize: 10 }}>{phone}</Text>
          </view>
        </View>

        <View style={{ marginTop: 20, borderRadius: 5 }}>
          {/* Header */}
          <View style={styles.tableHeader}>
            {HeaderTitles.map((header, index) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  {
                    width: header.width,
                    fontWeight: "bold",
                    color: "#fff",
                  },
                ]}
              >
                {header.name}
              </Text>
            ))}
          </View>
          {items?.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.cell, { width: "15%" }]}> {issueDate}</Text>
              <View style={{ width: "50%" }}>
                <Text style={styles.cell}>{item.item}</Text>
                <Text style={styles.cell}>{item.Discription}</Text>
              </View>
              <Text style={[styles.cell, { width: "9%" }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cell, { width: "13%" }]}>₹{item.price}</Text>
              <Text style={[styles.cell, { width: "13%" }]}>
                ₹{item.amount}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 20, alignItems: "flex-end" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              fontSize: 10,
            }}
          >
            <Text>Subtotal</Text>

            <Text> INR {grandtotal}</Text>
          </View>

          <View
            style={{
              display: "flex",
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
        <View
          style={{
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <Text style={{ fontSize: 10 }}>Thanks you for Your business</Text>
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
              <View style={styles.info}>
                <Text>Invoice # </Text>
                <Text>{Invoice}</Text>
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
    </Document>
  );
};

export default LandScaping;
