import React, { useState } from "react";
import pkTravels from "../assets/pkTravels.png";
import pkTravels1 from "../assets/AutoServicesBill.png";
import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import PkTravel from "../components/pkTravel.jsx";
import AutoServices from "../components/AutoServices.jsx";
import { pdf } from "@react-pdf/renderer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { ToWords } from "to-words";


const AutoTravels = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [pickup, setPickUP] = useState("");
  const [drop, setDrop] = useState("");
  const [amount, setAmount] = useState("");

  const [showError, setShowError] = useState(false);

  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }]);

  const clearForm = () => {
    setName("");
    setInvoiceDate("");
    setPickUP("");
    setDrop("");
    setAmount("");
    setItems([{ item: "", quantity: "", price: "" }]);
    setShowError(false);
  };

  const ResetForm = () => {
    setOpen(false);
    setSelectedBill(null);
    clearForm();
  };

  const Travelbill = [
    { id: 1, img: pkTravels },
    { id: 2, img: pkTravels1 },
  ];
  const HeaderTitles = [
    { name: "S.no", width: "5%", value: "s.no" },
    { name: "Item", width: "40%", value: "item" },
    { name: "GST Rate", width: "7%", value: "gst" },
    { name: "Quantity", width: "12%", value: "quantity" },
    { name: "Rate", width: "12%", value: "price" },
    { name: "Amount", width: "12%", value: "itemtotal" },
    { name: "Total", width: "12%", value: "total" },
  ];

  const handleAddItem = () =>
    setItems((s) => [...s, { item: "", quantity: "", price: "" }]);

  const handleRemoveItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const billNumber = () => Math.floor(1000 + Math.random() * 9000);

  const includingGst = () => {
    const gstRate = 0.18;
    const amt = Number(amount) || 0;

    const gstAmount = amt * gstRate;
    const totalAmount = amt + gstAmount;

    return {
      totalAmount: totalAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
    };
  };

  const processedItems = items.map((i) => {
    const qty = Number(i.quantity) || 0;
    const price = Number(i.price) || 0;

    const baseAmount = qty * price;
    const gst = baseAmount * 0.18;
    const total = baseAmount + gst;

    return {
      ...i,
      baseAmount: baseAmount.toFixed(2),
      gstAmount: gst.toFixed(2),
      total: total.toFixed(2),
    };
  });



  const calculateItemTotals = () => {
    let subtotal = 0;

    items.forEach((i) => {
      const qty = Number(i.quantity) || 0;
      const price = Number(i.price) || 0;
      subtotal += qty * price;
    });

    const gstRate = 0.18;
    const gstAmount = subtotal * gstRate;
    const totalAmount = subtotal + gstAmount;

    return {
      subtotal: subtotal.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  };


  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: { currency: true, ignoreDecimal: false },
  });

  const convertToWords = (value) => {
    const num = Number(value);
    if (isNaN(num) || value === "" || value == null) return "";
    return toWords.convert(num);
  };

  // -------- Bill 1 (Travel) ----------
  const handleCreateBill1 = async () => {
    if (!name || !pickup || !drop || !amount || !invoiceDate) {
      setShowError(true);
      return;
    }

    const BillingNumber = billNumber();
    const { gstAmount, totalAmount } = includingGst();
    const amountInWords = convertToWords(totalAmount);

    const formattedDate = format(invoiceDate, "dd/MM/yyyy");

    const blob = await pdf(
      <PkTravel
        name={name}
        BillingNumber={BillingNumber}
        pickup={pickup}
        drop={drop}
        invoiceDate={formattedDate}
        amount={amount}
        gstAmount={gstAmount}
        totalAmount={totalAmount}
        amountInWords={amountInWords}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    ResetForm();
  };

  // Bill 2
  const handleCreateBill2 = async () => {
    if (!name || !invoiceDate) {
      setShowError(true);
      return;
    }

    const hasEmptyFields = items.some(
      (i) => !i.item || !i.quantity || !i.price
    );

    if (hasEmptyFields) {
      setShowError(true);
      return;
    }

    const BillingNumber = billNumber();
    const { subtotal, gstAmount, totalAmount } = calculateItemTotals();
    const amountInWords = convertToWords(totalAmount);
    const formattedDate = format(invoiceDate, "dd/MM/yyyy");

    const blob = await pdf(
      <AutoServices
        name={name}
        HeaderTitles={HeaderTitles}
        BillingNumber={BillingNumber}
        invoiceDate={formattedDate}
        items={processedItems}
        subtotal={subtotal}
        gstAmount={gstAmount}
        totalAmount={totalAmount}
        amountInWords={amountInWords}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}-Bill2.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    ResetForm();
  };


  const handleModalOpen = (bill) => {
    clearForm();
    setSelectedBill(bill);
    setOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 sm:px-8 md:px-16">
      {Travelbill.map((bill) => (
        <img
          key={bill.id}
          src={bill.img}
          className="h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
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
                onClick={ResetForm}
              >
                <RxCross1 />
              </button>
            </div>
            {selectedBill?.id === 1 && (
              <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 sm:p-8 transition-all duration-300">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Travel Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}
                  <div>
                    <TextField
                      fullWidth
                      label="Customer Name"
                      value={name}
                      placeholder="Eg - John"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {showError && name === "" && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Invoice Date */}
                  <div>
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

                    {showError && invoiceDate === "" && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">

                  {/* PickUp Location */}
                  <div>
                    <TextField
                      fullWidth
                      label="Pickup Location"
                      placeholder="Eg - Hyderabad"
                      value={pickup}
                      onChange={(e) => setPickUP(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {showError && pickup === "" && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Drop Location */}
                  <div>
                    <TextField
                      fullWidth
                      label="Drop Location"
                      placeholder="Eg - vizag"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {showError && drop === "" && (
                      <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>
                </div>


                {/* Amount */}
                <div className="mt-4">
                  <TextField
                    fullWidth
                    label="Amount"
                    placeholder="Eg - 1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                    className="bg-white rounded-md"
                  />
                  {showError && amount === "" && (
                    <p className="text-sm text-red-500 mt-1">*This field is required.</p>
                  )}
                </div>


                {/* Create Button */}
                <button
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-3 px-6 rounded-xl mt-6 
               hover:bg-gray-900 font-semibold transition-all duration-200"
                >
                  Create Bill
                </button>

              </div>

            )}


            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-6 mt-5 bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Repair Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}
                  <div className="flex flex-col">
                    <TextField
                      label="Customer Name"
                      value={name}
                      placeholder="Eg - John"
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />
                    {name === "" && showError && (
                      <p className="text-xs text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Invoice Date */}
                  <div className="flex flex-col">
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
                            sx: { backgroundColor: "white", borderRadius: "8px" },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    {!invoiceDate && showError && (
                      <p className="text-xs text-red-500 mt-1">*This field is required.</p>
                    )}
                  </div>

                </div>

                {items.map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-xl bg-gray-50 shadow-sm flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-gray-800">Item {index + 1}</p>

                      {items.length > 1 && (
                        <button
                          className="text-red-600 text-sm font-medium hover:underline"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Item Field */}
                    <TextField
                      label="Item Name"
                      value={item.item}
                      placeholder="Eg - Oil Change"
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      fullWidth
                      className="bg-white rounded-md"
                    />

                    {/* Quantity & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Quantity"
                        type="text"
                        placeholder="Eg - 2"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        fullWidth
                        className="bg-white rounded-md"
                      />

                      <TextField
                        label="Price"
                        type="text"
                        placeholder="Eg - 600"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        fullWidth
                        className="bg-white rounded-md"
                      />
                    </div>

                    {showError && (item.item === "" || item.quantity === "" || item.price === "") && (
                      <p className="text-xs text-red-500 font-medium">*All item fields are required.</p>
                    )}
                  </div>
                ))}

                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-5 rounded-lg w-fit hover:bg-gray-800 transition"
                >
                  + Add Item
                </button>

                <button
                  onClick={handleCreateBill2}
                  className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
                >
                  Create Bill
                </button>

              </div>
            )}



          </div>

        </div>
      )
      }
    </div >
  );
};

export default AutoTravels;
