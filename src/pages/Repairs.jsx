import React, { useState } from "react";
import ucRepair from "../assets/ucrepairBill.jpg";
import PKRepair from "../assets/PkrepairBill.jpg";
import { RxCross1 } from "react-icons/rx";
import { pdf } from "@react-pdf/renderer";
import { ToWords } from "to-words";
import TextField from "@mui/material/TextField";
import PKsupply from "../components/PKrepairBill";
import UrbanRepairBill from "../components/UrbanRepairBill";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
const Repairs = () => {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [ucitem, setucItem] = useState("");
  const [ucPlatformPrice, setucPlatformPrice] = useState("");
  const [ucprice, setucPrice] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }]);
  const [interestAmount, setInterestAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [invoiceDate, setInvoiceDate] = useState("");


  const HeaderTitles = [
    { name: "", width: "3%" },
    { name: "Item", width: "35%" },
    { name: "GST Rate", width: "7%" },
    { name: "Quantity", width: "8%" },
    { name: "Rate", width: "12%" },
    { name: "Amount", width: "12%" },
    { name: "IGST", width: "13%" },
    { name: "Total", width: "12%" },
  ];

  const repairBill = [
    { id: 1, img: ucRepair },
    { id: 2, img: PKRepair },
  ];

  // UC Bill Calculations
  const calcPlatformPrice = Number(ucPlatformPrice) || 0;
  const ucgstAmount = (calcPlatformPrice * 0.18).toFixed(2);
  const uctotalPlatformFee = (calcPlatformPrice + calcPlatformPrice * 0.18).toFixed(2);
  const partnerInvoice = Number(ucprice) || 0;
  const ucigstAmount = (partnerInvoice * 0.025).toFixed(2);
  const ucPartnerTotalFee = (partnerInvoice + partnerInvoice * 0.025).toFixed(2);

  // Item Management
  const handleAddItem = () => setItems([...items, { item: "", quantity: "", price: "" }]);
  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Convert to Words
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: { currency: true, ignoreDecimal: false },
  });
  const convertToWords = (value) => {
    const num = Number(value);
    if (isNaN(num) || value === "" || value == null) return "";
    return toWords.convert(num);
  };

  const ucPlatformPriceInWords = convertToWords(ucPlatformPrice);
  const ucplucPlatformgstInWords = convertToWords(ucgstAmount);

  // Generate Random Invoice Number
  const generateInvoiceNo = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const letterPart = randomLetter() + randomLetter() + randomLetter() + randomLetter();
    const numberPart = Math.floor(1000000000 + Math.random() * 900000000);
    return letterPart + numberPart;
  };

  const resetForm = () => {
    setOpen(false);
    setSelectedBill(null);
    setName("");
    setAddress("");
    setucItem("");
    setucPlatformPrice("");
    setucPrice("");
    setDueDate("");
    setInvoiceDate("");
    setInterestAmount("");
    setItems([{ item: "", quantity: "", price: "" }]);
    setErrors(false);
  };

  const clearForm = () => {
    setOpen(false);
    setSelectedBill()
    resetForm();
  }


  // 1st Bill - Urban Company
  const handleCreateBill1 = async () => {

    if (!ucitem || !ucprice || !ucPlatformPrice) {
      setErrors(true);
      return;
    }

    const invoiceNumber1 = generateInvoiceNo();
    const invoiceNumber2 = generateInvoiceNo();
    const today = new Date();
    const currentDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const blob = await pdf(
      <UrbanRepairBill
        name={name}
        address={address}
        InvoiceNo={invoiceNumber1}
        InvoiceNo2={invoiceNumber2}
        dueDate={dueDate}
        invoiceDate={invoiceDate}

        dateTime={currentDate}
        ucitem={ucitem}
        ucPlatformPrice={ucPlatformPrice}
        ucprice={ucprice}
        ucgstAmount={ucgstAmount}
        uctotalPlatformFee={uctotalPlatformFee}
        ucPartnerTotalFee={ucPartnerTotalFee}
        ucigstAmount={ucigstAmount}
        ucPlatformPriceInWords={ucPlatformPriceInWords}
        ucplucPlatformgstInWords={ucplucPlatformgstInWords}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `UrbanRepairBill.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    clearForm();
  };

  //  2nd Bill - PK Repair
  const handleCreateBill2 = async () => {
    if (!name || !address || !invoiceDate || !items) {
      setErrors(true);
      return;
    }



    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const currentDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const itemsWithTotal = items.map((item) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      const gstRate = Number(item.gst) || 0;

      const baseAmount = quantity * price;
      const gstAmount = (baseAmount * gstRate) / 100;
      const total = baseAmount + gstAmount;
      return { ...item, baseAmount, gstAmount, total };
    });

    const onlyAmount = itemsWithTotal.reduce((sum, item) => sum + item.baseAmount, 0);
    const totalGST = itemsWithTotal.reduce((sum, item) => sum + item.gstAmount, 0);
    const grandTotal = itemsWithTotal.reduce((sum, item) => sum + item.total, 0);
    const finalAmountWithInterest = grandTotal + Number(interestAmount || 0);

    const blob = await pdf(
      <PKsupply
        name={name}
        address={address}
        PKInvoiceNo={invoiceNumber}
        onlyAmount={onlyAmount}
        dateTime={currentDate}
        HeaderTitles={HeaderTitles}
        items={itemsWithTotal}
        totalGST={totalGST}
        grandTotal={grandTotal}
        finalAmountWithInterest={finalAmountWithInterest}
        amountInWords={convertToWords(finalAmountWithInterest)}
        PKheadings={HeaderTitles}
        invoiceDate={invoiceDate}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PKRepair.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    clearForm();
  };
  const handleModelOpen = (RepairBill) => {
    resetForm();
    setSelectedBill(RepairBill);
    setOpen(true);
  }
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 sm:px-8 md:px-16">
      {repairBill.map((RepairBill) => (
        <img
          key={RepairBill.id}
          src={RepairBill.img}
          className="h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
          onClick={() => {
            handleModelOpen(RepairBill)
          }}
        />
      ))}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40   z-50 px-3">
          <div className="bg-[#f5f5f7] rounded-2xl shadow-2xl w-full sm:w-[600px] md:w-[720px] lg:w-[850px] relative p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto transition-all duration-300">

            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <p className="text-2xl font-semibold tracking-tight text-gray-900">Customer Details</p>
              <button
                className="text-black text-2xl hover:text-red-600 transition"
                onClick={resetForm}
              >
                <RxCross1 />
              </button>
            </div>

            {/* Urban Company Bill */}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* Name + Date */}
                <div className="flex flex-col sm:flex-row gap-4">

                  {/* Customer Name */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Customer Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {name === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  {/* Invoice Date */}
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
                            fillWidth: true,
                            sx: {
                              backgroundColor: "white",
                              borderRadius: "8px"
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                    {invoiceDate === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>



                </div>

                {/* Address + Item */}
                <div className="flex flex-col sm:flex-row gap-4">

                  {/* Address */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {address === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  {/* Item */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Item"
                      value={ucitem}

                      onChange={(e) => setucItem(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {ucitem === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* Prices */}
                <div className="flex flex-col sm:flex-row gap-4">

                  {/* Platform Price */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Platform Price"
                      type="text"
                      value={ucPlatformPrice}
                      onChange={(e) =>
                        setucPlatformPrice(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white rounded-md"
                    />
                    {ucPlatformPrice === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  {/* Item Price */}
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Item Price"
                      type="text"
                      value={ucprice}
                      onChange={(e) => setucPrice(e.target.value.replace(/[^0-9]/g, ""))}
                      className="bg-white rounded-md"
                    />
                    {ucprice === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-3 rounded-lg mt-2 
                 font-semibold tracking-wide hover:bg-gray-900 
                 active:scale-[0.98] transition-all"
                >
                  Generate Bill
                </button>
              </div>
            )}



            {/* PK Repair Bill */}
            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* Customer Name */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Customer Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />
                    {name === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  {/* Invoice Date */}
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

                    {invoiceDate === "" && errors && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col w-full">
                  <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white rounded-md"
                    fullWidth
                  />
                  {address === "" && errors && (
                    <p className="text-sm text-red-500 mt-1 font-medium">
                      *This field is required.
                    </p>
                  )}
                </div>



                {/* ITEM REPEATER */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-5"
                  >
                    {/* Header */}
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
                      label="Item Name"
                      value={item.item}
                      error={!!errors[`item-${index}`]}
                      helperText={errors[`item-${index}`]}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="bg-white rounded-md"
                      fullWidth
                    />

                    {/* Quantity + Price + GST */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        error={!!errors[`quantity-${index}`]}
                        helperText={errors[`quantity-${index}`]}
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
                        error={!!errors[`price-${index}`]}
                        helperText={errors[`price-${index}`]}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="GST (%)"
                        value={item.gst || ""}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "gst",
                            e.target.value.replace(/[^0-9.]/g, "")
                          )
                        }
                        className="bg-white rounded-md"
                      />
                    </div>

                    {/* Field Required Message */}
                    {errors &&
                      (item.item === "" ||
                        item.quantity === "" ||
                        item.price === "" ||
                        item.gst === "") && (
                        <p className="text-sm text-red-500 font-medium">
                          *All fields are required for this item.
                        </p>
                      )}
                  </div>
                ))}

                {/* Add Item Button */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-800 text-white py-2 px-4 rounded-lg w-fit hover:bg-gray-900 transition-all"
                >
                  + Add Item
                </button>

                {/* Submit */}
                <button
                  onClick={handleCreateBill2}
                  className="w-full bg-black text-white py-3 rounded-lg mt-3 font-semibold tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all"
                >
                  Generate Bill
                </button>
              </div>
            )}


          </div>
        </div >

      )
      }
    </div >
  );
};

export default Repairs;
