import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import anuImage from "../assets/AnuFurniture.png";
import Signature from "../assets/signature.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
    borderBottom: "1px solid gray",
  },
  leftHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logo: {
    width: 180,
    height: 150,
  },
  companyInfo: {
    fontSize: 12,
    paddingTop: 30,
    marginLeft: 10,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rightHeaderContainer: {
    flex: 1,
    fontSize: 12,
    paddingRight: 15,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "left",
  },
  value: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 6,
  },
  labelValueStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 4,
  },
  body: {
    fontSize: 12,

    borderBottom: "1px solid #000",
  },
  addres: {
    width: 200,
  },
  phone: {
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
  },
  tableheading: {
    borderRadius: 5,
  },
  Tableheader: {
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingVertical: 5,
  },
  cell: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "inter",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  labelAmountStyles: {
    display: "flex", flexDirection: "row", gap: 80,
  },
});

const AnuFurniture = (
  {
    name,
    address,
    phone,
    invoiceNo,
    tableHead,
    items = [],
    invoiceDate,
    grandtotalBeforeGST,
    sgstAmount,
    totalAmount,

  }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header} fixed>
          <View style={styles.leftHeader}>
            <Image src={anuImage} style={styles.logo} />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>Anu Furnitures</Text>
              <Text style={styles.text}>4-100, Opp: Telephone Exchange</Text>
              <Text style={styles.text}>Chandanagar</Text>
              <Text style={styles.text}>Hyderabad</Text>
              <Text style={styles.text}>040-23032067</Text>
              <Text style={styles.text}>info@anuFurnitures.com</Text>
            </View>
          </View>

          <View style={styles.rightHeaderContainer}>
            <View style={styles.labelValueStyles}>
              <Text style={styles.label}>INVOICE</Text>
              <Text style={styles.value}>{invoiceNo}</Text>
            </View>

            <View style={styles.labelValueStyles}>
              <Text style={styles.label}>DATE</Text>
              <Text style={styles.value}>{invoiceDate}</Text>
            </View>

            <View style={styles.labelValueStyles}>
              <Text style={styles.label}>DUE</Text>
              <Text style={styles.value}>On Receipt</Text>
            </View>

            <View style={styles.labelValueStyles}>
              <Text style={styles.label}>BALANCE DUE</Text>
              <Text style={styles.value}>Rs. 0.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.label}>Bill To   </Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.addres}>{address}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
        <View style={styles.tableheading}>
          <View style={styles.Tableheader}>
            {tableHead.map((head, index) => (
              <Text key={index}
                style={[styles.cell,
                {
                  width: head.width || "",
                  fontWeight: "bold",
                },

                ]}
              >
                {head.label}
              </Text>
            ))}
          </View>
        </View>
        {items?.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.cell, { width: "50%" }]}>{item.item}</Text>
            <Text style={[styles.cell, { width: "12.5%" }]}>Rs. {item.price}</Text>
            <Text style={[styles.cell, { width: "12.5%" }]}>{item.quantity}</Text>
            <View
              style={[
                styles.cell,
                {
                  width: "12.5%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                },
              ]}
            >

              <Text style={{ fontSize: 10 }}>{item.DiscountAmount?.toFixed(2)}</Text>
              <Text style={{ fontSize: 8, color: "gray" }}>{item.discount ? `${item.discount}%` : "-"}</Text>
            </View>

            <Text style={[styles.cell, { width: "12.5%" }]}>{item.itemTotalAfterDiscount?.toFixed(2)}</Text>
          </View>
        ))}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            width: "40%",
            alignSelf: "flex-end",
            marginTop: 10,
            marginRight: 30,
          }}
        >
          <View>
            <Text style={{ marginTop: 10 }}>Amount</Text>
            <Text style={{ marginTop: 10 }}>SGST</Text>
            <Text style={{ marginTop: 10 }}>CGST</Text>
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Total</Text>
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Paid</Text>
          </View>

          <View>
            <Text style={{ marginTop: 10 }}>{grandtotalBeforeGST}</Text>
            <Text style={{ marginTop: 10 }}>{sgstAmount}</Text>
            <Text style={{ marginTop: 10 }}>{sgstAmount}</Text>
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Rs. {totalAmount}</Text>
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>{totalAmount}</Text>
            <Text style={{ marginTop: 15, color: "gray", }}>{invoiceDate}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            width: "40%",
            alignSelf: "flex-end",
            marginRight: 30,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "gray",
            paddingVertical: 4,
            marginTop: 8,
          }}
        >
          <Text style={{ fontWeight: "bold", }}>BALANCE DUE</Text>
          <Text style={{ fontWeight: "bold", marginLeft: 10, }}>0.00</Text>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginRight: 20,
        }}>
          <Image
            src={Signature}
            style={{ width: 150, height: 60, marginTop: 8, }}
          />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 10, }}>Date Signed</Text>
            <Text style={{ color: "gray", fontSize: 10, }}>{invoiceDate}</Text>
          </View>
        </View>


      </Page>
    </Document >
  );
};

export default AnuFurniture;
