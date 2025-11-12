import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import bill_img from "../assets/4x.png";
import Bottom_logo from "../assets/Object.png";
import lightFont from "../fonts/RobotoMono-Light.ttf";
import regular from "../fonts/RobotoMono-Regular.ttf";


const styles = StyleSheet.create({
  page: {
    padding: 5,
  },
  section: {
    margin: 10,
    // padding: 10,
    fontFamily: "roboto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  },
  ImagePic: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "3px",
  },
  logoImg: {
    width: 50,
    height: 20,
  },
  text: {
    fontSize: 12,
  },
  date: {
    fontSize: 4,
    textAlign: "center",
  },
  combine: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: "2px",
    borderColor: "#000",
    position: "relative",
    paddingTop: 2,
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginTop: 2,
  },
  token: {
    position: "absolute",
    top: -3,
    left: "40%",
    backgroundColor: "#fff",
    fontSize: 4,
    fontFamily: "robotoreg",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  id: {
    fontSize: 4,
    paddingTop: 3,
    fontFamily: "robotoreg",
    textAlign: "center",
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    // marginBottom: 10,
    width: "100%",
    borderStyle: "dashed",
  },
});

export const BillDocument = ({
  name,
  billPaymentOfNumber,
  phone,
  dateTime,
}) => {
  Font.register({
    family: "roboto",
    fonts: [{ src: lightFont, fontWeight: "200" }],
  });
  Font.register({
    family: "robotoreg",
    fonts: [{ src: regular, fontWeight: "bold" }],
  });
  Font.register({
    family: "thick",
    fonts: [{ src: regular, fontWeight: "700" }],
  });

  return (
    <Document>
      <Page size={[144, 350]} style={styles.page}>
        <View style={styles.section}>
          <View style={styles.ImagePic}>
            <Image src={bill_img} style={styles.logoImg} />
            <Text style={styles.date}>{dateTime}</Text>
          </View>
          <View style={styles.combine}>
            <Text style={styles.token}>Token</Text>
            <Text style={styles.id}>0237-7746-8981-9028-5626</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "6px" }}>Token Type</Text>
            <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
              Credit
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              // gap: "5px",
            }}
          >
            <View style={styles.line} />

            <View
              style={{
                paddingTop: 6,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "6px" }}>Customer Name</Text>
              <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
                {name}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "6px" }}>Email</Text>
              <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
                {billPaymentOfNumber}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "6px" }}>Mobile</Text>
              <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
                {phone}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "6px" }}>Meter Number</Text>
            <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
              04172997324
            </Text>
          </View>
          <View style={styles.line} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              // gap: "5px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "6px" }}>Amount</Text>
              <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
                950 NGN
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "6px" }}>Tax</Text>
              <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
                50 NGN
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "6px",
              }}
            >
              <Text style={{ fontSize: "6px" }}>Total</Text>
              <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
                1000 NGN
              </Text>
            </View>
            <View style={styles.line} />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "6px" }}>Operator</Text>
            <Text style={{ fontSize: "6px", fontFamily: "robotoreg" }}>
              Ade
            </Text>
          </View>
          <Text style={{ fontSize: "4px" }}>
            Thanks for fueling our passion. Drop by again, if your wallet isn't
            still sulking. You're always welcome here!
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <Image
              src={Bottom_logo}
              style={{
                width: 50,
                height: 20,
              }}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BillDocument;
