import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import WaterMark from "../assets/Paytm-Logo.png";
import regular from "../fonts/RobotoMono-Regular.ttf";
import Notosans from "../fonts/NotoSans_SemiCondensed-Bold.ttf";
import stamp from "../assets/paytmstamp.png";

Font.register({
  family: "robotoreg",
  fonts: [{ src: regular, fontWeight: "bold" }],
});
Font.register({
  family: "NotoSans",
  fonts: [{ src: Notosans, fontWeight: "bold" }],
});

const styles = StyleSheet.create({
  page: { position: "relative" },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -250,
    marginLeft: -325,
    opacity: 0.2,
    width: 650,
    height: 500,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "15px",
    paddingBottom: "15px",
    fontSize: 12,
    borderBottom: 2,
    borderColor: "gray",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  stamp: {
    height: 100,
    width: 130,
    marginBottom: 20,
    margin: 20,
  },
  section: { margin: 20, padding: 20, marginTop: 30, flexGrow: 1 },
  details: { alignItems: "flex-end", paddingRight: "15px" },
  text: { fontFamily: "robotoreg", fontSize: 16 },
});

const ElectricBill = ({
  name,
  phone,
  OrderNo,
  billPaymentOfNumber,
  totalAmount,
  billedDate,
  generateRandom11Digit,

}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={WaterMark} style={styles.watermark} />
      <View style={styles.section}>
        <View style={styles.details}>
          <Text style={{ fontSize: "12px" }}>{name}</Text>
          <Text style={{ fontSize: "12px" }}>{phone}</Text>
        </View>

        <Text style={{ fontSize: "12px", paddingTop: 20 }}>
          Transaction Receipt
        </Text>
        <view
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "12px",
            paddingBottom: 15,
            paddingTop: "10px",
          }}
        >
          <Text>OrderNo. {OrderNo}</Text>
          <Text>{billedDate}</Text>
        </view>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 12,
            borderWidth: 2,
            borderColor: "gray",
            borderStyle: "solid",
            padding: 20,
            // borderRadius: 4,
          }}
        >
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text>Bill Payment of Number</Text>
            <Text style={{ fontWeight: "bold", paddingTop: "10px" }}>
              {billPaymentOfNumber}
            </Text>
          </View>

          <View
            style={{
              width: 1,
              backgroundColor: "gray",
              marginVertical: 2,
            }}
          />

          <View
            style={{
              flexDirection: "column",
              flex: 1,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <Text>Operator</Text>
            <Text style={{ fontWeight: "bold", paddingTop: "10px" }}>
              TGSPDCL
            </Text>
          </View>

          <View
            style={{
              width: 1,
              backgroundColor: "gray",
              marginVertical: 2,
            }}
          />

          <View
            style={{
              flexDirection: "column",
              flex: 1,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <Text>Total Amount Paid </Text>
            <Text
              style={{
                fontFamily: "NotoSans",
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              ₹ {totalAmount}
            </Text>
          </View>
        </View>
        {/* table data */}
        <view
          style={{
            borderWidth: 2,
            borderColor: "gray",
            borderStyle: "solid",
            marginTop: "15px",
          }}
        >
          <view style={styles.table}>
            <Text>Payment Mode</Text>
            <Text>Payment Cash</Text>
          </view>
          <view style={styles.table}>
            <Text>Payment Channel</Text>
            <Text>ANDROIDAPP 9.10.2</Text>
          </view>
          <view style={styles.table}>
            <Text>Convenience fee</Text>
            <Text>Rs. 0</Text>
          </view>
          <view style={styles.table}>
            <Text>Operator Reference Number</Text>
            <Text>{generateRandom11Digit}</Text>
          </view>
          <view
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: "15px",
              paddingBottom: "15px",
              fontSize: 12,
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <Text>Total Amount Paid</Text>
            <Text>Rs. {totalAmount}</Text>
          </view>
        </view>
        <view
          style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>Note:</Text>
          <Text style={{ fontSize: 12 }}>
            This is computer generated receipt and does note requires physical
            signature.
          </Text>
        </view>
        <view
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>DISCLAIMER:</Text>
          <Text style={{ fontSize: 12, marginLeft: 5, flex: 1 }}>
            Dear consumer, the bill payment will reflect in the next 72 hours or
            in the next billing cycle, at your service provider’s end.
          </Text>
        </view>
        <view
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <Text style={{ fontSize: 12 }}>
            One97 communication Ltd. bB-121, Sector 5, Uttar Pradesh-201301
          </Text>
          <Text style={{ fontSize: 12, marginTop: "5px" }}>
            GST Identification Number - 09AAACO4007A1Z3
          </Text>
        </view>
      </View>
      <view
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Image src={stamp} style={styles.stamp} />
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            wordBreak: "break-word",
            marginRight: 20,
          }}
        >
          At Paytm your trust is foremost. Your money is yours until you get
          what you paid for. We are here for you at{" "}
          <Text style={{ fontWeight: "bold" }}>paytm.com/care</Text> &{" "}
          <Text style={{ fontWeight: "bold" }}>paytm.com/myorders</Text>
        </Text>
      </view>
    </Page>
  </Document>
);

export default ElectricBill;
