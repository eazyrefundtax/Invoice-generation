import React from "react";
import Urban from "../assets/urbanLogo.png";
import signature from "../assets/image.png";

import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    width: 150,
    objectFit: "contain",
  },
});

const UrbanCompany1Bill = ({
  name,
  address,
  dateTime,
  InvoiceNo,
  InvoiceNo2,
  ucitem,
  ucPlatformPrice,
  ucprice,
  ucgstAmount,
  uctotalPlatformFee,
  ucPartnerTotalFee,
  ucigstAmount,
  ucPlatformPriceInWords,
  ucplucPlatformgstInWords,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Image src={Urban} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <View style={{ fontSize: 10 }}>
            <Text style={{ paddingBottom: 10 }}> 416, Udyog Vihar 111</Text>
            <Text>Sector 20, Gurugram, Haryana 122008</Text>
            <Text>GSTIN: 06AABCU7755Q1ZK</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              ORIGINAL TAX INVOICE
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 10,
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                justifyContent: "space-between",
              }}
            >
              <Text style={{}}>Customer Name</Text>
              <Text style={{ marginBottom: 10 }}>{name}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Customer GSTIN
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Invoice no: {InvoiceNo}
              </Text>
            </View>
            <view style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Delivery Addrress
              </Text>
              <Text style={{ marginBottom: 5, width: 140 }}>{address}</Text>
            </view>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Invoice Date
              </Text>
              <Text style={{ marginBottom: 5 }}>{dateTime}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                State Name & Code
              </Text>
              <Text style={{ marginBottom: 5 }}>Telengana 36</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Place of Supply
              </Text>
              <Text style={{ marginBottom: 5 }}>Telengana 36</Text>
            </View>
          </View>
          <View>
            <View style={{ fontWeight: "bold" }}>
              <Text>DELIVERY SERVICES PROVIDER</Text>
            </View>
            <View style={{ borderBottomWidth: 1 }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Business GSTIN
              </Text>
              <Text style={{ marginBottom: 5 }}>06AABCU7755Q1ZK</Text>
            </View>
            <View style={{ borderBottomWidth: 1 }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Business Name
              </Text>
              <Text style={{ marginBottom: 5 }}>
                Urbanclap Technologies India Pvt.Ltd
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1 }}>
              <Text style={{ paddingBottom: 10, paddingTop: 5 }}>Address</Text>
              <Text> 416, Udyog Vihar 111</Text>
              <Text style={{ marginBottom: 5 }}>
                Sector 20, Gurugram, Haryana 122008
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text style={{ paddingBottom: 10 }}>State Name & Code</Text>
              <Text>Telengana 36</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 11,
            justifyContent: "space-between",
            marginTop: 20,
            backgroundColor: "#E0E0E0",
            padding: 8,
          }}
        >
          <Text style={{ backgroundColor: "#E0E0E0" }}>Items</Text>
          <Text style={{ backgroundColor: "#E0E0E0" }}>ble Value</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            marginTop: 10,
          }}
        >
          <View>
            <Text>Convenience and Platform Fee</Text>
            <Text style={{ fontSize: 9, color: "gray", marginTop: 2 }}>
              SAC: 999799
            </Text>
          </View>

          <View style={{ width: "50%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Gross Amount</Text>
              <Text>Rs. {Number(ucPlatformPrice).toFixed(2)}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>Discount</Text>
              <Text>- Rs. 0</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>Taxable Value</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text>Rs. {Number(ucPlatformPrice).toFixed(2)}</Text>
                <Text
                  style={{
                    fontSize: 8,
                    color: "gray",
                    textAlign: "right",
                    marginTop: 2,
                    width: 150,
                  }}
                >
                  ({ucPlatformPriceInWords})
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>IGST @18%</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text>Rs. {ucgstAmount}</Text>
                <Text
                  style={{
                    fontSize: 8,
                    color: "gray",
                    textAlign: "right",
                    marginTop: 2,
                    width: 150,
                  }}
                >
                  ({ucplucPlatformgstInWords})
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 11,
            justifyContent: "space-between",
            marginTop: 20,
            backgroundColor: "#E0E0E0",
            padding: 8,
          }}
        >
          <Text style={{ backgroundColor: "#E0E0E0", fontWeight: "bold" }}>
            Total Amount
          </Text>
          <Text style={{ backgroundColor: "#E0E0E0" }}>
            Rs. {uctotalPlatformFee}
          </Text>
        </View>
        <View style={{ display: "flex", alignItems: "flex-end", fontSize: 9 }}>
          <Image src={signature} style={{ width: 100, marginTop: 20 }} />

          <Text style={{ marginTop: 10 }}>
            Signature of supplier/authorized representation
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Image src={Urban} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <View style={{ fontSize: 10 }}>
            <Text>Plot No 44, Trendz Enclave, Survey No 74 and 75</Text>
            <Text>part, Block-1, jaihindColony</Text>
            <Text style={{ paddingBottom: 10 }}>
              Madhapur, Hyderabad, Telangana, 50081
            </Text>
            <Text>GSTIN: 36AABCU7755Q1ZH</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", width: 200 }}>
              ORIGINAL TAX INVOICE (UC PARTNER INVOICE)
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 10,
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                justifyContent: "space-between",
              }}
            >
              <Text style={{}}>Customer Name</Text>
              <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
                {name}
              </Text>
              {/*add name*/}
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Customer GSTIN
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Invoice no: {InvoiceNo2}
              </Text>
            </View>
            <view style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Delivery Addrress
              </Text>
              <Text style={{ marginBottom: 5, width: 140 }}>{address}</Text>
            </view>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Invoice Date
              </Text>
              <Text style={{ marginBottom: 5 }}>{dateTime}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                State Name & Code
              </Text>
              <Text style={{ marginBottom: 5 }}>Telengana 36</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }}>
                Place of Supply
              </Text>
              <Text style={{ marginBottom: 5 }}>Telengana 36</Text>
            </View>
          </View>
          <View>
            <View style={{ fontWeight: "bold" }}>
              <Text>DELIVERY SERVICES PROVIDER</Text>
            </View>
            <View style={{ borderBottomWidth: 1 }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Business GSTIN
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1 }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                Business Name
              </Text>
              <Text style={{ marginBottom: 5 }}>Venkatesh K</Text>
            </View>
            <View style={{ borderBottomWidth: 1 }}>
              <Text style={{ paddingBottom: 10, paddingTop: 5 }}>Address</Text>
              <Text>house no 1-98/6/67/6, near seasond</Text>
              <Text>swimming pool, arunodaya colony, Madhapur</Text>
              <Text style={{ marginBottom: 5 }}>
                Hyderabad, Telangana, India
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text style={{ paddingBottom: 10 }}>State Name & Code</Text>
              <Text>Telengana 36</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 11,
            justifyContent: "space-between",
            marginTop: 20,
            backgroundColor: "#E0E0E0",
            padding: 8,
          }}
        >
          <Text style={{ backgroundColor: "#E0E0E0" }}>Items</Text>
          <Text style={{ backgroundColor: "#E0E0E0" }}>Taxable Value</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            marginTop: 10,
          }}
        >
          <View>
            <Text>{ucitem}</Text>
            <Text style={{ fontSize: 9, color: "gray", marginTop: 2 }}>
              SAC: 999729
            </Text>
          </View>

          <View style={{ width: "50%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Gross Amount</Text>
              <Text>Rs. {Number(ucprice).toFixed(2)}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>Discount</Text>
              <Text>- Rs. 0</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>Taxable Value</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text>Rs. {Number(ucprice).toFixed(2)}</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>CGST @2.5%</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text>Rs. {ucigstAmount}</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text>IGST @2.5%</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text>Rs. {ucigstAmount}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 11,
            justifyContent: "space-between",
            marginTop: 20,
            backgroundColor: "#E0E0E0",
            padding: 8,
          }}
        >
          <Text style={{ backgroundColor: "#E0E0E0", fontWeight: "bold" }}>
            Total Amount
          </Text>
          <Text style={{ backgroundColor: "#E0E0E0" }}>
            Rs. {ucPartnerTotalFee}
          </Text>
        </View>
        <View style={{ display: "flex", alignItems: "flex-end", fontSize: 9 }}>
          <Image src={signature} style={{ width: 100, marginTop: 20 }} />

          <Text style={{ marginTop: 10 }}>
            Signature of supplier/authorized representation
          </Text>
        </View>
        <View style={{ marginTop: 20, fontSize: 8 }}>
          <Text>
            1. This invoice is issued on behalf of the Service Provider. UC acts
            in the capacity of an Electronics Commerce operator as per Section 9
            {5} of the CGST Act, 2017.
          </Text>

          <Text>
            2. This invoice has been signed by UC only for limited puposes of
            complying as an Electronic Commerce Operator
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default UrbanCompany1Bill;
