import React, { useState } from "react";
import landScaping from "../assets/Land Scaping.jpg";
import { RxCross1 } from "react-icons/rx";
import { pdf } from "@react-pdf/renderer";

import TextField from "@mui/material/TextField";
import LandScaping from "../components/LandScapingBill";

const LandScapings = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [items, setItems] = useState([{ item: "", Discription: "", quantity: "", price: "" }]);
  const [showError, setShowError] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleModalOpen = () => {
    setSelectedBill("landScaping");
    setOpen(true);
  };

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
        address={address}
        phone={phone}
        issueDate={currentDate}
        items={itemTotal}
        Invoice={invoiceNo}
        dueDate={dueDate}
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

    setOpen(false);
    setName("");
    setAddress("");
    setPhone("");
    setDueDate("");
    setItems([{ item: "", description: "", quantity: "", price: "" }]);
    setShowError(false);
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16">

      {/* Image */}
      <img
        src={landScaping}
        alt="Land Scaping"
        className="h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
        onClick={handleModalOpen}
      />

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
          <div className="bg-[#EDEDED] rounded-lg shadow-lg w-full sm:w-[650px] md:w-[750px] lg:w-[900px] relative p-8 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-semibold">Customer Details</p>
              <button
                className="text-black text-2xl font-bold cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross1 />
              </button>
            </div>

            <div className="flex flex-col gap-5">

              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white w-full rounded-md"
              />
              {showError && !name && (
                <p className="text-sm text-red-500 font-medium">*Required</p>
              )}

              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white w-full rounded-md"
              />
              {showError && !address && (
                <p className="text-sm text-red-500 font-medium">*Required</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length <= 10) setPhone(val);
                  }}
                  className="bg-white w-full rounded-md"
                />

                <TextField
                  label="Due Date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  className="bg-white w-full rounded-md"
                />
              </div>
              {showError && !dueDate && (
                <p className="text-sm text-red-500 font-medium">*Required</p>
              )}

              {items.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 border p-3 rounded-md bg-white">

                  <div className="flex justify-between">
                    <p className="font-semibold">Item {index + 1}</p>

                    {items.length > 1 && (
                      <button
                        className="text-red-500 font-medium"
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
                    className="bg-white w-full rounded-md"
                  />

                  <TextField
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "Discription", e.target.value)}
                    className="bg-white w-full rounded-md"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      label="Quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white w-full rounded-md"
                    />

                    <TextField
                      label="Price"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white w-full rounded-md"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddItem}
                className="bg-gray-700 text-white py-2 px-4 rounded-md w-fit hover:bg-gray-800"
              >
                + Add Item
              </button>

              <button
                onClick={handleCreateBill}
                className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-900"
              >
                Create Bill
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandScapings;
