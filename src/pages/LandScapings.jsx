import React, { useState } from "react";
import landScaping from "../assets/Land Scaping.jpg";
import { RxCross1 } from "react-icons/rx";
import { pdf } from "@react-pdf/renderer";

import TextField from "@mui/material/TextField";
import LandScaping from "../components/LandScapingBill";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { format } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";


const LandScapings = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);


  const [items, setItems] = useState([{ item: "", Discription: "", quantity: "", price: "" }]);
  const [showError, setShowError] = useState(false);

  const resetform = () => {
    setOpen(false);
    setName("");
    setAddress("");
    setPhone("");
    setDueDate("");
    setInvoiceDate("");
    setItems([{ item: "", description: "", quantity: "", price: "" }]);
    setShowError(false);
  }
  const clearForm = () => {
    resetform();
    setSelectedBill(null);
    setOpen(false);
  }

  const images = [
    { id: 1, image: landScaping },
  ];


  const HeaderTitles = [
    { name: "Date", width: "15%", value: "Date" },
    { name: "Item", width: "50%", value: "Item" },
    { name: "Quantity", width: "9%", value: "Quantity" },
    { name: "Rate", width: "13%", value: "Rate" },
    { name: "Amount", width: "13%", value: "Amount" },
  ];

  const OrderNumber = () => Math.floor(1000 + Math.random() * 9000).toString();

  const itemTotal = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const price = Number(item.price || 0);
    const amount = quantity * price;
    return { ...item, amount };
  });

  const grandtotal = itemTotal
    .reduce((sum, item) => sum + Number(item.amount), 0)
    .toFixed(2);

  const handleAddItem = () => {
    setItems([...items, { item: "", description: "", quantity: "", price: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleCreateBill = async () => {
    if (!name || !address || !dueDate) {
      setShowError(true);
      return;
    }

    const invoiceNo = OrderNumber();
    const blob = await pdf(
      <LandScaping
        name={name}
        phone={phone}
        invoiceDate={invoiceDate}
        dueDate={dueDate}
        Invoice={invoiceNo}
        items={itemTotal}
        HeaderTitles={HeaderTitles}
        grandtotal={grandtotal}
      />
    ).toBlob();


    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name || "Landscaping-Bill"}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    clearForm();
  };

  const handleModalOpen = (bill) => {
    resetform();
    setSelectedBill(bill)
    setOpen(true)
  }

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16">

      {/* Image */}
      {images.map((bill) => (
        <img
          key={bill.id}
          src={bill.image}
          alt="Land Scaping"
          className="h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
          onClick={() => handleModalOpen(bill)}
        />
      ))}

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-3">
          <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[650px] md:w-[750px] lg:w-[900px] relative 
                  p-8 max-h-[90vh] overflow-y-auto transform transition-all animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
              <button
                className="text-gray-700 hover:text-red-600 text-2xl cursor-pointer transition"
                onClick={clearForm}
              >
                <RxCross1 />
              </button>
            </div>
            {selectedBill?.id == 1 && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <TextField
                      label="Name"
                      value={name}
                      placeholder="Eg - John"
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      InputProps={{ className: "bg-gray-50 rounded-lg" }}
                    />
                    {showError && !name && (
                      <p className="text-xs text-red-500 italic">*This field is required.</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <TextField
                      label="Phone"
                      value={phone}
                      placeholder="Eg - 9898989898"
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        if (val.length <= 10) setPhone(val);
                      }}
                      fullWidth
                      InputProps={{ className: "bg-gray-50 rounded-lg" }}
                    />
                    {showError && !phone && (
                      <p className="text-xs text-red-500 italic">*This field is required.</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1">
                  <TextField
                    label="Address"
                    value={address}
                    placeholder="Eg - Hyderabad"
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    InputProps={{ className: "bg-gray-50 rounded-lg" }}
                  />
                  {showError && !address && (
                    <p className="text-xs text-red-500 italic">*This field is required.</p>
                  )}
                </div>

                {/* Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Invoice Date */}
                  <div className="flex flex-col gap-1">
                    <Flatpickr
                      value={invoiceDate}
                      onChange={([selected]) => {
                        if (selected) {
                          const formatted = format(selected, "MMM dd, yyyy");
                          setInvoiceDate(formatted);
                        }
                      }}
                      options={{
                        dateFormat: "M d, Y",
                      }}
                      render={({ ...props }, ref) => (
                        <TextField
                          {...props}
                          inputRef={ref}
                          label="Invoice Date"
                          fullWidth
                          value={invoiceDate}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            backgroundColor: "#f9fafb",
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root > fieldset": { borderColor: "black" },
                            "& .MuiOutlinedInput-root:hover > fieldset": { borderColor: "black" },
                            "& .MuiOutlinedInput-root.Mui-focused > fieldset": { borderColor: "black" },
                            "& .MuiInputLabel-root": { color: "black" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                          }}
                        />
                      )}
                    />

                    {showError && !invoiceDate && (
                      <p className="text-xs text-red-500 italic">*This field is required.</p>
                    )}
                  </div>

                  {/* Due Date */}
                  <div className="flex flex-col gap-1">
                    <Flatpickr
                      value={dueDate}
                      onChange={([selected]) => {
                        if (selected) {
                          const formatted = format(selected, "MMM dd, yyyy");
                          setDueDate(formatted);
                        }
                      }}
                      options={{
                        dateFormat: "M d, Y",
                      }}
                      render={({ ...props }, ref) => (
                        <TextField
                          {...props}
                          inputRef={ref}
                          label="Due Date"
                          fullWidth
                          value={dueDate}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            backgroundColor: "#f9fafb",
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root > fieldset": { borderColor: "black" },
                            "& .MuiOutlinedInput-root:hover > fieldset": { borderColor: "black" },
                            "& .MuiOutlinedInput-root.Mui-focused > fieldset": { borderColor: "black" },
                            "& .MuiInputLabel-root": { color: "black" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                          }}
                        />
                      )}
                    />
                    {showError && !invoiceDate && (
                      <p className="text-xs text-red-500 italic">*This field is required.</p>
                    )}
                  </div>

                </div>

                {/* Items Section */}
                {items.map((item, index) => (
                  <div key={index}
                    className="p-4 border rounded-xl bg-gray-50 flex flex-col gap-4 shadow-sm">
                    {/* Row Header */}
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Item {index + 1}</h3>
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
                      placeholder="Eg - Lawn Maintenance"
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      fullWidth
                      InputProps={{ className: "bg-white rounded-md" }}
                    />

                    {/* Description */}
                    <TextField
                      label="Description"
                      value={item.description}
                      placeholder="Eg - Grass Cutting"
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      fullWidth
                      InputProps={{ className: "bg-white rounded-md" }}
                    />

                    {/* Qty + Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Quantity"
                        value={item.quantity}
                        placeholder="Eg - 1"
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        InputProps={{ className: "bg-white rounded-md" }}
                      />

                      <TextField
                        label="Price"
                        value={item.price}
                        placeholder="Eg - 165899"
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))
                        }
                        InputProps={{ className: "bg-white rounded-md" }}
                      />
                    </div>
                    {showError &&
                      (item.item === "" ||
                        item.description === "" ||
                        item.quantity === "" ||
                        item.price === "") && (
                        <p className="text-xs text-red-500">*All fields are Required</p>
                      )}
                  </div>
                ))}

                {/* Add Item */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800 w-fit"
                >
                  + Add Item
                </button>

                {/* Create Bill Button */}
                <button
                  onClick={handleCreateBill}
                  className="bg-black text-white text-lg py-3 rounded-lg shadow-md
                   hover:bg-gray-900 active:scale-95 transition-all mt-4"
                >
                  Create Bill
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandScapings;
