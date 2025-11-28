import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { ToWords } from "to-words";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import AnuFurniture from "../components/AnuFurniture";
import NandiSupplyBill from "../components/NandiSupplyBill";
import PkSuppliesbill from "../components/PksuppliesBill";
import JBMBill from "../components/JBMBill";
import VpssBill from "../components/VPSSBill";
import Royal from "../components/Royal";

// import pkSupplyBill 
import Bill1 from "../assets/supplyBill1.jpg";
import Bill2 from "../assets/supplyBill2.jpg";
import Bill3 from "../assets/supplyBill3.jpg";
import Bill4 from "../assets/supplyBill4.jpg";
import Bill5 from "../assets/supplyBill5.jpg";
import Bill6 from "../assets/supplyBill6.jpg";

const Supplies = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [shippedName, setShippedName] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, SetPhone] = useState("");
  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }]);
  const [Discount, setDiscount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [initialPayment, setinitialPayment] = useState("");
  const [finalPayment, setFinalPayment] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [ChallanDate, setChallanDate] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [selectedBill, setSelectedBill] = useState(null);
  const [showError, setShowError] = useState(false);

  const reSetValues = () => {
    setOpen(false);
    setName("");
    setShippedName("");
    setAddress("");
    setShippingAddress("");
    SetPhone("");
    setItems([{ item: "", quantity: "", price: "" }]);
    setDiscount("");
    setDueDate("");
    setinitialPayment("");
    setFinalPayment("");
    setInvoiceDate("");
    setChallanDate("");
    setPaymentDate("");
    setShowError(false);

  }

  const clearForm = () => {
    setOpen(false);
    setSelectedBill(null);
    reSetValues();
  }
  const tableHead = [
    { label: "Item", width: "50%", value: "Item" },
    { label: "Rate", width: "12.5%", value: "Rate" },
    { label: "Qty", width: "12.5%", value: "Qty" },
    { label: "Discount", width: "12.5%", value: "Discount" },
    { label: "Amount", width: "12.5%", value: "Amount" },

  ]

  const VpssHeading = [
    { label: "Description", width: "70%", value: "Description" },
    { label: "Rate", width: "10%", value: "Rate" },
    { label: "Qty", width: "10%", value: "Qty" },
    { label: "Amount", width: "10%", value: "Amount" },

  ]

  const bills = [
    { id: 1, image: Bill1 },
    { id: 2, image: Bill2 },
    { id: 3, image: Bill3 },
    { id: 4, image: Bill4 },
    { id: 5, image: Bill5 },
    { id: 6, image: Bill6 },
  ];

  const generateInvoiceNo = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () =>
      letters[Math.floor(Math.random() * letters.length)];

    const letterPart = randomLetter() + randomLetter() + randomLetter();
    const numberPart = Math.floor(1000 + Math.random() * 9000);

    return letterPart + numberPart;
  };


  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    console.log("value", value)
    console.log("Index", index, field, value);
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () =>
    setItems([...items, { item: "", quantity: "", price: "" }]);

  //1 st bill
  const handleCreateBill1 = async () => {
    console.log("Button clicked");



    const missingItems = items.some(
      (i) => !i.item || !i.quantity || !i.price
    );
    if (missingItems) {
      setShowError(true);
      return;
    }

    const updatedItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const discount = Number(item.discount) || 0;

      const itemTotal = price * quantity;
      const itemTotalAfterDiscount = itemTotal - (itemTotal * discount) / 100;
      const DiscountAmount = (itemTotal * discount) / 100;
      const finalAmount = itemTotal - DiscountAmount;


      return {
        ...item,
        price,
        quantity,
        discount,
        itemTotal,
        itemTotalAfterDiscount,
        DiscountAmount,
        finalAmount,
      };
    });

    const grandtotalBeforeGST = updatedItems
      .reduce((sum, item) => sum + (item.finalAmount || 0), 0)
      .toFixed(2);
    const sgstAmount = (grandtotalBeforeGST * 0.025).toFixed(2);
    const totalAmount = (Number(grandtotalBeforeGST) + (Number(sgstAmount)) * 2).toFixed(2);

    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    console.log("Generating PDF...");
    const blob = await pdf(
      <AnuFurniture
        name={name}
        address={address}
        invoiceNo={invoiceNumber}
        phone={phone}
        dateTime={currentDate}
        invoiceDate={invoiceDate}
        tableHead={tableHead}
        items={updatedItems}
        grandtotalBeforeGST={grandtotalBeforeGST}
        sgstAmount={sgstAmount}
        totalAmount={totalAmount}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AnuFurniture_${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);


    clearForm();
  };

  // 2nd bill
  const handleCreateBill2 = async () => {

    const updatedItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const gstRate = Number(item.gst) || 0;

      const itemTotal = price * quantity;
      const gstAmount = (itemTotal * gstRate) / 100;
      const total = itemTotal + gstAmount;

      return {
        ...item,
        price,
        quantity,
        gstRate,
        itemTotal,
        gstAmount,
        total,
      };
    });


    const missingItems = items.some(
      (i) => !i.item || !i.quantity || !i.price || !i.gst
    );
    if (missingItems) {
      setShowError(true);
      return;
    }
    const totalAmount = updatedItems
      .reduce((sum, item) => sum + Number(item.itemTotal), 0);
    const gstTotal = updatedItems
      .reduce((sum, item) => sum + Number(item.gstAmount), 0);
    const extraCharges = (totalAmount + gstTotal) * 0.18;

    const totalFinalAmount = (totalAmount + gstTotal + extraCharges).toFixed(2);

    const percentPaid = (totalFinalAmount * 0.10).toFixed(2);

    const fullPercenytPaid = (totalFinalAmount * 0.90).toFixed(2);



    const invoiceNumber = generateInvoiceNo();

    const toWords = new ToWords({
      localeCode: "en-IN",
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
      },
    });

    // to words function
    const convertToWords = (value) => {
      const num = Number(value);
      if (isNaN(num) || value === "" || value == null) {
        return "";
      }
      return toWords.convert(num);
    };

    const amountInWords = convertToWords(totalFinalAmount);
    console.log("Generating PDF...");

    const blob = await pdf(
      <NandiSupplyBill
        HeaderTitles={[
          { name: "", width: "3%" },
          { name: "Item", width: "35%" },
          { name: "GST Rate", width: "7%" },
          { name: "Quantity", width: "8%" },
          { name: "Rate", width: "12%" },
          { name: "Amount", width: "12%" },
          { name: "GST", width: "13%" },
          { name: "Total", width: "12%" },
        ]}
        name={name}
        shippedName={shippedName}
        address={address}
        shippingAddress={shippingAddress}
        phone={phone}
        invoiceNo={invoiceNumber}
        tableHead={tableHead}
        items={updatedItems}
        totalAmount={totalAmount}
        gstTotal={gstTotal}
        extraCharges={extraCharges}
        totalFinalAmount={totalFinalAmount}
        amountInWords={amountInWords}
        percentPaid={percentPaid}
        fullPercenytPaid={fullPercenytPaid}
        initialPayment={initialPayment}
        finalPayment={finalPayment}
        invoiceDate={invoiceDate}
        dueDate={dueDate}

      />
    ).toBlob();


    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nandi_${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);


    clearForm();

  };

  {/* 3rd bill */ }
  const handleCreateBill3 = async () => {


    if (items.some(i => !i.item || !i.quantity || !i.price || !i.gst)) {
      setShowError(true);
      return;
    }

    const updatedItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const gstRate = Number(item.gst) || 0;

      const itemTotal = price * quantity;
      const gstAmount = (itemTotal * gstRate) / 100;
      const igst = gstAmount / 2;
      const total = itemTotal + gstAmount;

      return {
        ...item,
        price,
        quantity,
        gstRate,
        itemTotal,
        gstAmount,
        total,
        igst,
      };
    });
    const totalAmount = updatedItems
      .reduce((sum, item) => sum + Number(item.itemTotal), 0);
    const gstTotal = updatedItems
      .reduce((sum, item) => sum + Number(item.gstAmount), 0);
    const totalCGST = updatedItems
      .reduce((sum, item) => sum + Number(item.igst), 0);
    const totalFinalAmount = (totalAmount + gstTotal).toFixed(2);


    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    const toWords = new ToWords({
      localeCode: "en-IN",
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
      },
    });

    // to words function
    const convertToWords = (value) => {
      const num = Number(value);
      if (isNaN(num) || value === "" || value == null) {
        return "";
      }
      return toWords.convert(num);
    };

    const amountInWords = convertToWords(totalFinalAmount);
    const blob = await pdf(
      <PkSuppliesbill
        HeaderTitles={[
          { name: "", width: "2%" },
          { name: "Item", width: "30%" },
          { name: "GST Rate", width: "7%" },
          { name: "Quantity", width: "9%" },
          { name: "Rate", width: "11%" },
          { name: "Amount", width: "11%" },
          { name: "CGST", width: "9%" },
          { name: "SGST", width: "9%" },
          { name: "Total", width: "12%" },
        ]}
        name={name}
        address={address}
        phone={phone}
        invoiceNo={invoiceNumber}
        dateTime={currentDate}
        invoiceDate={invoiceDate}
        tableHead={tableHead}
        items={updatedItems}
        totalAmount={totalAmount}
        gstTotal={gstTotal}
        totalFinalAmount={totalFinalAmount}
        amountInWords={amountInWords}
        initialPayment={initialPayment}
        finalPayment={finalPayment}
        totalCGST={totalCGST}
        dueDate={dueDate}
        paymentDate={paymentDate}
        ChallanDate={ChallanDate}
      />
    ).toBlob();


    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    clearForm();
  };

  {/*4th bill */ }
  const handleCreateBill4 = async () => {

    if (items.some(i => !i.item || !i.quantity || !i.price)) {
      setShowError(true);
      return;
    }

    // Convert File objects to Data URLs
    const convertFileToDataUrl = (file) =>
      new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const dataItems = await Promise.all(
      items.map(async (item) => {
        const image = item.image ? await convertFileToDataUrl(item.image) : null;
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;

        const itemTotal = price * quantity;
        const discountRate = itemTotal * 0.10;
        const netRate = itemTotal - discountRate;

        return { ...item, image, quantity, price, netRate };
      })
    );

    const totalNetRate = dataItems.reduce((sum, item) => sum + item.netRate, 0);

    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const getDate = today.toLocaleDateString("en-US", options);

    const blob = await pdf(
      <JBMBill
        name={name}
        phone={phone}
        getDate={getDate}
        items={dataItems}
        totalNetRate={totalNetRate}
        invoiceDate={invoiceDate}
        tableHead={[
          { name: "S.No", width: "6%" },
          { name: "Description", width: "30%" },
          { name: "Image", width: "15%" },
          { name: "Qty", width: "8%" },
          { name: "MRP", width: "13%" },
          { name: "Net Rate", width: "14%" },
          { name: "Amount", width: "14%" },
        ]}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);



    clearForm();
  };

  {/*5th bill*/ }
  const handleCreateBill5 = async () => {


    if (items.some(i => !i.item || !i.quantity || !i.price)) {
      setShowError(true);
      return;
    }

    const updatedItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const discount = Number(item.discount) || 0;

      const itemTotal = price * quantity;
      const itemTotalAfterDiscount = itemTotal - (itemTotal * discount) / 100;
      const DiscountAmount = (itemTotal * discount) / 100;
      const finalAmount = itemTotal - DiscountAmount;

      return {
        ...item,
        price,
        quantity,
        itemTotal,
        itemTotalAfterDiscount,
        finalAmount,
      };
    });

    const grandtotalBeforeGST = updatedItems
      .reduce((sum, item) => sum + (item.finalAmount || 0), 0)
      .toFixed(2);
    const sgstAmount = (grandtotalBeforeGST * 0.025).toFixed(2);
    const totalAmount = (Number(grandtotalBeforeGST) + (Number(sgstAmount)) * 2).toFixed(2);

    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    console.log("Generating PDF...");
    const blob = await pdf(
      <VpssBill
        name={name}
        address={address}
        invoiceNo={invoiceNumber}
        phone={phone}
        dateTime={currentDate}
        VpssHeading={VpssHeading}
        items={updatedItems}
        grandtotalBeforeGST={grandtotalBeforeGST}
        sgstAmount={sgstAmount}
        totalAmount={totalAmount}
        invoiceDate={invoiceDate}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `VpssBill${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    clearForm();
  };

  {/*6th Bill*/ }
  const handleCreateBill6 = async () => {

    if (items.some(i => !i.item || !i.quantity || !i.price)) {
      setShowError(true);
      return;
    }

    const updatedItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      const itemTotal = price * quantity;
      const total = itemTotal * 1.18



      return {
        ...item,
        price,
        quantity,
        itemTotal,
        total,
      };
    });

    const grandtotalBeforeGST = updatedItems
      .reduce((sum, item) => sum + (item.itemTotal || 0), 0)
      .toFixed(2);
    const sgstAmount = (grandtotalBeforeGST * 0.09).toFixed(2);
    const totalAmount = (Number(grandtotalBeforeGST) + (Number(sgstAmount)) * 2).toFixed(2);

    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    const blob = await pdf(
      <Royal
        name={name}
        address={address}
        invoiceNo={invoiceNumber}
        dateTime={currentDate}
        items={updatedItems}
        invoiceDate={invoiceDate}
        grandtotalBeforeGST={grandtotalBeforeGST}
        sgstAmount={sgstAmount}
        totalAmount={totalAmount}
        dueDate={dueDate}
        RoyalTitles={[
          { name: "", width: "4%" },
          { name: "Item", width: "40%" },
          { name: "GST Rate", width: "8%" },
          { name: "Quantity", width: "12%" },
          { name: "Rate", width: "12%" },
          { name: "Amount", width: "13%" },
          { name: "Total", width: "13%" },
        ]}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Royal${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);


    clearForm();
  };

  const handleModalOpen = (bill) => {
    reSetValues();
    setSelectedBill(bill);
    setOpen(true);
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 md:px-16 gap-6 justify-items-center">
      {bills.map((bill) => (
        <img
          key={bill.id}
          src={bill.image}
          alt={`Bill ${bill.id}`}
          className="h-100 w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
          onClick={() => handleModalOpen(bill)}
        />
      ))}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
          <div className="bg-[#EDEDED] rounded-lg shadow-lg w-full sm:w-[600px] md:w-[700px] lg:w-[800px] relative p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <p className="text-xl sm:text-2xl font-semibold">Details</p>
              <button
                className="text-black text-2xl font-bold cursor-pointer"
                onClick={clearForm}
              >
                <RxCross1 />
              </button>
            </div>
            {/*1st bill */}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* NAME + PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />
                    {name === "" && showError && (
                      <p className="text-sm text-red-500 font-medium mt-1">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Phone Number"
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (/^[0-9]*$/.test(input)) SetPhone(input);
                      }}
                      inputProps={{ maxLength: 10 }}
                      className="bg-white rounded-md"
                      fullWidth
                    />
                    {phone === "" && showError && (
                      <p className="text-sm text-red-500 font-medium mt-1">
                        *This field is required.
                      </p>
                    )}
                  </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* INVOICE DATE */}
                  <div className="flex flex-col w-full">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setInvoiceDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              backgroundColor: "white",
                              borderRadius: "8px",
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    {invoiceDate === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />
                    {address === "" && showError && (
                      <p className="text-sm text-red-500 font-medium mt-1">
                        *This field is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* ITEMS */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-4"
                  >
                    {/* Item Header */}
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-gray-800">
                        Item {index + 1}
                      </p>

                      {items.length > 1 && (
                        <button
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item Name */}
                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />

                    {/* Quantity + Price + Discount */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                      {/* Quantity */}
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />

                      {/* Price */}
                      <TextField
                        label="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />

                      {/* Discount */}
                      <TextField
                        label="Discount (%)"
                        value={item.discount || ""}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "discount",
                            e.target.value.replace(/[^0-9.]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />
                    </div>

                    {/* ITEM ERROR */}
                    {showError &&
                      (item.item === "" ||
                        item.quantity === "" ||
                        item.price === "") && (
                        <p className="text-sm text-red-500 font-medium">
                          *All fields are required for this item.
                        </p>
                      )}
                  </div>
                ))}

                {/* ADD ITEM BUTTON */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg w-fit hover:bg-gray-800 transition-all"
                >
                  + Add Item
                </button>

                {/* SUBMIT BUTTON */}
                <button
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-3 rounded-lg mt-4 font-semibold hover:bg-gray-900 active:scale-95 transition-all"
                >
                  Create Bill
                </button>

              </div>
            )}


            {/* 2nd bill */}
            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-6 mt-6">

                {/* BILL TO + SHIP TO SECTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* BILLING TO */}
                  <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Billing To</h2>

                    {/* Name */}
                    <div className="flex flex-col mb-4">
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white rounded-md"
                        fullWidth
                      />
                      {name === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                      <TextField
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-white rounded-md"
                        fullWidth
                      />
                      {address === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </div>

                  {/* SHIPPED TO */}
                  <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Shipped To</h2>

                    {/* Name */}
                    <div className="flex flex-col mb-4">
                      <TextField
                        label="Name"
                        value={shippedName}
                        onChange={(e) => setShippedName(e.target.value)}
                        className="bg-white rounded-md"
                        fullWidth
                      />
                      {shippedName === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                      <TextField
                        label="Address"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="bg-white rounded-md"
                        fullWidth
                      />
                      {shippingAddress === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* DATE FIELDS */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Invoice Date */}
                    <div className="flex flex-col">
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setInvoiceDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: { backgroundColor: "white", borderRadius: "8px" },
                          },
                        }}
                      />
                      {invoiceDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col">
                      <DatePicker
                        label="Due Date"
                        value={dueDate ? new Date(dueDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setDueDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: { backgroundColor: "white", borderRadius: "8px" },
                          },
                        }}
                      />
                      {dueDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    {/* Initial Payment */}
                    <div className="flex flex-col">
                      <DatePicker
                        label="Initial Payment"
                        value={initialPayment ? new Date(initialPayment) : null}
                        onChange={(newValue) => {
                          if (newValue) setinitialPayment(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: { backgroundColor: "white", borderRadius: "8px" },
                          },
                        }}
                      />
                      {initialPayment === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    {/* Final Payment */}
                    <div className="flex flex-col">
                      <DatePicker
                        label="Final Payment"
                        value={finalPayment ? new Date(finalPayment) : null}
                        onChange={(newValue) => {
                          if (newValue) setFinalPayment(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: { backgroundColor: "white", borderRadius: "8px" },
                          },
                        }}
                      />
                      {finalPayment === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                  </div>
                </LocalizationProvider>

                {/* ITEM LIST */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-4"
                  >
                    {/* Item Header */}
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Item {index + 1}</p>

                      {items.length > 1 && (
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item Name */}
                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />

                    {/* Quantity + Price + GST */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="GST (%)"
                        value={item.gst || ""}
                        onChange={(e) =>
                          handleItemChange(index, "gst", e.target.value.replace(/[^0-9.]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />
                    </div>

                    {/* ERROR */}
                    {showError &&
                      (item.item === "" || item.quantity === "" || item.price === "") && (
                        <p className="text-sm text-red-500 font-medium">
                          *All fields are required for this item.
                        </p>
                      )}
                  </div>
                ))}

                {/* ADD ITEM */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-5 rounded-lg w-fit hover:bg-gray-800"
                >
                  + Add Item
                </button>

                {/* CREATE BILL */}
                <button
                  onClick={handleCreateBill2}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 mt-4 font-semibold"
                >
                  Create Bill
                </button>

              </div>
            )}


            {/*  3rd bill */}
            {selectedBill?.id === 3 && (
              <div className="flex flex-col gap-6 mt-6">

                {/* BILL TO + SHIP TO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* BILLING TO */}
                  <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Billing To</h3>

                    <div className="flex flex-col mb-4">
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        className="bg-white rounded-md"
                      />
                      {name === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <TextField
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        className="bg-white rounded-md"
                      />
                      {address === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </div>

                  {/* SHIPPED TO */}
                  <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Shipped To</h3>

                    <div className="flex flex-col mb-4">
                      <TextField
                        label="Name"
                        value={shippedName}
                        onChange={(e) => setShippedName(e.target.value)}
                        fullWidth
                        className="bg-white rounded-md"
                      />
                      {shippedName === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <TextField
                        label="Address"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        fullWidth
                        className="bg-white rounded-md"
                      />
                      {shippingAddress === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* DATES ROW */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setInvoiceDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: { fullWidth: true, sx: { backgroundColor: "white", borderRadius: "8px" } }
                        }}
                      />
                      {invoiceDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <DatePicker
                        label="Due Date"
                        value={dueDate ? new Date(dueDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setDueDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: { fullWidth: true, sx: { backgroundColor: "white", borderRadius: "8px" } }
                        }}
                      />
                      {dueDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <DatePicker
                        label="Challan Date"
                        value={ChallanDate ? new Date(ChallanDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setChallanDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: { fullWidth: true, sx: { backgroundColor: "white", borderRadius: "8px" } }
                        }}
                      />
                      {ChallanDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <DatePicker
                        label="Payment Date"
                        value={paymentDate ? new Date(paymentDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setPaymentDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: { fullWidth: true, sx: { backgroundColor: "white", borderRadius: "8px" } }
                        }}
                      />
                      {paymentDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </div>
                </LocalizationProvider>

                {/* ITEMS */}
                {items.map((item, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Item {index + 1}</p>
                      {items.length > 1 && (
                        <button
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))}
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="Price"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))}
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="GST (%)"
                        value={item.gst || ""}
                        onChange={(e) => handleItemChange(index, "gst", e.target.value.replace(/[^0-9.]/g, ""))}
                        className="bg-white rounded-md"
                      />
                    </div>

                    {showError && (item.item === "" || item.quantity === "" || item.price === "") && (
                      <p className="text-sm text-red-500 font-medium">*All fields are required for this item.</p>
                    )}
                  </div>
                ))}

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddItem}
                    className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                  >
                    + Add Item
                  </button>

                  <button
                    onClick={handleCreateBill3}
                    className="ml-auto bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-900"
                  >
                    Create Bill
                  </button>
                </div>
              </div>
            )}


            {/* 4th bill */}
            {selectedBill?.id === 4 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* NAME + PHONE + INVOICE DATE */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                  {/* Name */}
                  <div className="flex flex-col">
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />
                    {name === "" && showError && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <TextField
                      label="Phone Number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) SetPhone(value);
                      }}
                      inputProps={{ maxLength: 10, inputMode: "numeric" }}
                      fullWidth
                      className="bg-white rounded-md"
                    />
                    {phone === "" && showError && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Invoice Date */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="flex flex-col">
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) =>
                          newValue && setInvoiceDate(format(newValue, "MMM dd, yyyy"))
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: { backgroundColor: "white", borderRadius: "8px" }
                          }
                        }}
                      />
                      {invoiceDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </LocalizationProvider>
                </div>

                {/* ITEMS SECTION */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-5"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Item {index + 1}</p>

                      {items.length > 1 && (
                        <button
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item Name */}
                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />

                    {/* Quantity – Price – Image */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">

                      {/* Quantity */}
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />

                      {/* Price */}
                      <TextField
                        label="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />

                      {/* Image Upload */}
                      <div className="flex flex-col w-full">

                        {!item.image ? (
                          <TextField
                            type="file"
                            accept="image/*"
                            label="Upload Image"
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => handleItemChange(index, "image", e.target.files[0])}
                            className="bg-white rounded-md"
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <img
                              src={URL.createObjectURL(item.image)}
                              className="h-[70px] w-[120px] object-cover rounded-md border"
                              alt="Preview"
                            />
                            <button
                              onClick={() => handleItemChange(index, "image", null)}
                              className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md"
                            >
                              Remove
                            </button>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Field Error */}
                    {showError &&
                      (item.item === "" || item.quantity === "" || item.price === "") && (
                        <p className="text-sm text-red-500">*All fields are required for this item.</p>
                      )}
                  </div>
                ))}

                {/* ADD ITEM BUTTON */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-5 rounded-lg hover:bg-gray-800 transition-all w-fit"
                >
                  + Add Item
                </button>

                {/* SUBMIT */}
                <button
                  onClick={handleCreateBill4}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all"
                >
                  Create Bill
                </button>
              </div>
            )}


            {/*5st bill */}
            {selectedBill?.id === 5 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* NAME + PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}
                  <div className="flex flex-col">
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />
                    {name === "" && showError && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <TextField
                      label="Phone Number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) SetPhone(value);
                      }}
                      inputProps={{ maxLength: 10, inputMode: "numeric" }}
                      fullWidth
                      className="bg-white rounded-md"
                    />
                    {phone === "" && showError && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* ADDRESS */}
                  <div className="flex flex-col">
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />
                    {address === "" && showError && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* INVOICE DATE */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="flex flex-col">
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setInvoiceDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: { backgroundColor: "white", borderRadius: "8px" }
                          }
                        }}
                      />
                      {invoiceDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </LocalizationProvider>
                </div>

                {/* ITEMS */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Item {index + 1}</p>
                      {items.length > 1 && (
                        <button
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item Name */}
                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />

                    {/* Quantity + Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="bg-white rounded-md"
                      />
                    </div>

                    {/* Error */}
                    {showError &&
                      (item.item === "" || item.quantity === "" || item.price === "") && (
                        <p className="text-sm text-red-500 font-medium">
                          *All fields are required for this item.
                        </p>
                      )}
                  </div>
                ))}

                {/* ADD ITEM */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-5 rounded-lg w-fit hover:bg-gray-800 transition-all"
                >
                  + Add Item
                </button>

                {/* CREATE BILL */}
                <button
                  onClick={handleCreateBill5}
                  className="w-full bg-black text-white py-3 rounded-lg mt-3 hover:bg-gray-900 transition-all"
                >
                  Create Bill
                </button>
              </div>
            )}

            {/*6th bill */}
            {selectedBill?.id === 6 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* Name */}
                <div className="flex flex-col">
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white rounded-md"
                    fullWidth
                  />
                  {name === "" && showError && (
                    <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white rounded-md"
                    fullWidth
                  />
                  {address === "" && showError && (
                    <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                  )}
                </div>

                {/* Dates */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Invoice Date */}
                    <div className="flex flex-col">
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setInvoiceDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              backgroundColor: "white",
                              borderRadius: "8px",
                            },
                          },
                        }}
                      />
                      {invoiceDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col">
                      <DatePicker
                        label="Due Date"
                        value={dueDate ? new Date(dueDate) : null}
                        onChange={(newValue) => {
                          if (newValue) setDueDate(format(newValue, "MMM dd, yyyy"));
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              backgroundColor: "white",
                              borderRadius: "8px",
                            },
                          },
                        }}
                      />
                      {dueDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                      )}
                    </div>
                  </div>
                </LocalizationProvider>

                {/* ITEM LIST */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Item {index + 1}</p>
                      {items.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item Name */}
                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />

                    {/* Row: Quantity + Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />
                    </div>

                    {/* Error */}
                    {showError &&
                      (item.item === "" || item.quantity === "" || item.price === "") && (
                        <p className="text-sm text-red-500 font-medium">
                          *All fields are required for this item.
                        </p>
                      )}
                  </div>
                ))}

                {/* Add Item */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-5 rounded-lg w-fit hover:bg-gray-800 transition-all"
                >
                  + Add Item
                </button>

                {/* Submit */}
                <button
                  onClick={handleCreateBill6}
                  className="w-full bg-black text-white py-3 rounded-lg mt-3 hover:bg-gray-900 transition-all"
                >
                  Create Bill
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div >
  );
};

export default Supplies;
