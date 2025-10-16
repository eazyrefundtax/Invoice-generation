import React, { useState } from "react";
import landScaping from "../assets/Land Scaping.jpg";
import { RxCross1 } from "react-icons/rx";
import { pdf } from "@react-pdf/renderer";

import TextField from "@mui/material/TextField";
import LandScaping from "../components/LandScapingBill";

const LandScapings = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(" test1");
  const [phone, setPhone] = useState("9533550364");
  const [address, setAddress] = useState("hyderabad");
  const [dueDate, setDueDate] = useState("25/06/2026");
  const [discription, setDiscription] = useState("data");
  const [items, setItems] = useState([
    { item: "3", quantity: "52", price: "1500" },
  ]);
  const [showError, setShowError] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const HeaderTitles = [
    { name: "date", width: "15%", value: "Date" },
    { name: "Item", width: "50%", value: "Item" },
    { name: "Quantity", width: "9%", value: "Quantity" },
    { name: "Rate", width: "13%", value: "Rate" },
    { name: "Amount", width: "13%", value: "Amount" },
  ];

  const OrderNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  const itemTotal = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const price = Number(item.price || 0);
    const amount = quantity * price;
    return {
      ...item,
      amount,
    };
  });

  const grandtotal = itemTotal
    .reduce((sum, item) => sum + Number(item.amount), 0)
    .toFixed(2);
  const today = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  const currentDate = today.toLocaleDateString("en-US", options);

  const handleModalOpen = (bill) => {
    console.log("Bill", bill);
    setSelectedBill(bill);
    setOpen(true);
  };

  const handleAddItem = () =>
    setItems([...items, { item: "", quantity: "", price: "" }]);

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

  const handleCreateBill = async () => {
    if (!name || !address) {
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
    link.download = `{name}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    setOpen(false);
    setName("");
    setAddress("");
    setPhone("");
    // setDiscription("");
    setDueDate("");
    setItems([{ item: "", Discription: "", quantity: "", price: "" }]);
    setShowError(false);
  };

  return (
    <div className="flex align-items-center sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 md:px-16 gap-6 justify-items-center py-1 ">
      <img
        src={landScaping}
        alt="Land Scaping"
        className=" align-middle mx-auto h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
        onClick={() => handleModalOpen("landScaping")}
      />

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
          <div className="bg-[#EDEDED] rounded-lg shadow-lg w-full sm:w-[600px] md:w-[700px] lg:w-[800px] relative p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <p className="text-xl sm:text-2xl font-semibold">Details</p>
              <button
                className="text-black text-2xl font-bold cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross1 />
              </button>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white w-full rounded-md"
              />
              {name === "" && showError && (
                <p className="text-sm text-red-500 font-medium">
                  *This field is required.
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <TextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-white w-full rounded-md"
                />
                {address === "" && showError && (
                  <p className="text-sm text-red-500 font-medium">
                    *This field is required.
                  </p>
                )}
              </div>
              <div className="flex  sm:flex-row gap-3">
                {/* Phone & Due Date */}
                <div className="flex flex-col w-full sm:flex-row gap-3 justify-between">
                  <TextField
                    label="Phone"
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      if (val.length <= 10) setPhone(val);
                    }}
                    className="bg-white w-full sm:w-1/2 rounded-md"
                  />
                  <TextField
                    label="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    className="bg-white w-full sm:w-1/2 rounded-md"
                  />
                </div>
                {dueDate === "" && showError && (
                  <p className="text-sm text-red-500 font-medium">
                    *This field is required.
                  </p>
                )}
              </div>

              {/* Items */}
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border p-3 rounded-md bg-white"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-base sm:text-lg">
                      Item {index + 1}
                    </p>
                    {items.length > 1 && (
                      <button
                        className="text-red-500 text-sm font-medium cursor-pointer"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <TextField
                    label="Item"
                    value={item.item}
                    onChange={(e) =>
                      handleItemChange(index, "item", e.target.value)
                    }
                    className="bg-white w-full rounded-md"
                  />
                  <TextField
                    label="Discription"
                    value={item.discription}
                    onChange={(e) =>
                      handleItemChange(index, "Discription", e.target.value)
                    }
                    className="bg-white w-full rounded-md"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <TextField
                      label="Quantity"
                      type="text"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          e.target.value.replace(/[^0-9]/g, "")
                        )
                      }
                      className="bg-white w-full sm:w-1/2 rounded-md"
                    />
                    <TextField
                      label="Price"
                      type="text"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          e.target.value.replace(/[^0-9]/g, "")
                        )
                      }
                      className="bg-white w-full sm:w-1/2 rounded-md"
                    />
                  </div>
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

              {/* Add Item */}
              <button
                onClick={handleAddItem}
                className="bg-gray-700 text-white py-2 px-4 rounded-md w-fit hover:bg-gray-800 cursor-pointer"
              >
                + Add Item
              </button>

              {/* Create Bill */}
              <button
                onClick={handleCreateBill}
                className="w-full bg-black text-white py-2 px-6 rounded mt-4 cursor-pointer hover:bg-gray-900"
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
