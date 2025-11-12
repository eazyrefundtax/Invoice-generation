import React, { useState, useEffect } from "react";
import ucRepair from "../assets/ucrepairBill.jpg";
import PKRepair from "../assets/PkrepairBill.jpg";
import { RxCross1 } from "react-icons/rx";
import { pdf } from "@react-pdf/renderer";
import { ToWords } from "to-words";
import TextField from "@mui/material/TextField";
import UrbanCompany1Bill from "../components/urbanCompanyRepairBill";
import PKsupply from "../components/PKrepairBill";

const Repairs = () => {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [ucitem, setucItem] = useState("");
  const [ucPlatformPrice, setucPlatformPrice] = useState("");
  const [ucprice, setucPrice] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [reductions, setReductions] = useState(0);
  const [newFinalAmount, setNewFinalAmount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }]);
  const [interestAmount, setInterestAmount] = useState("");

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

  // UC Bill calculations
  const calcPlatformPrice = Number(ucPlatformPrice) || 0;
  const ucgstAmount = (calcPlatformPrice * 0.18).toFixed(2);
  const uctotalPlatformFee = (calcPlatformPrice + calcPlatformPrice * 0.18).toFixed(2);
  const partnerInvoice = Number(ucprice) || 0;
  const ucigstAmount = (partnerInvoice * 0.025).toFixed(2);
  const ucPartnerTotalFee = (partnerInvoice + partnerInvoice * 0.05).toFixed(2);

  // Item handlers
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

  // Auto calculate totals
  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      const baseAmount = quantity * price;
      const gstAmount = baseAmount * 0.18;
      return sum + baseAmount + gstAmount;
    }, 0);
    setFinalAmount(total);

    const reducedValue = Number(reductions) || 0;
    const afterReduction = total - reducedValue > 0 ? total - reducedValue : 0;
    setNewFinalAmount(afterReduction);
  }, [items, reductions]);


  // Convert number to words
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

  // Random invoice generator
  const generateInvoiceNo = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const letterPart = randomLetter() + randomLetter() + randomLetter() + randomLetter();
    const numberPart = Math.floor(1000000000 + Math.random() * 900000000);
    return letterPart + numberPart;
  };

  {/*1st Bill */ }
  const handleCreateBill1 = async () => {
    if (!ucitem || !ucprice || !ucPlatformPrice || !name || !address) {
      setShowError(true);
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
      <UrbanCompany1Bill
        name={name}
        address={address}
        InvoiceNo={invoiceNumber1}
        InvoiceNo2={invoiceNumber2}
        dueDate={dueDate}
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
    link.download = `UrbanCompany1Bill.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    setOpen(false);
    setSelectedBill(null);
    setName("");
    setucItem("");
    setucPlatformPrice("");
    setucPrice("");
    setAddress("");
    setDueDate("");
    setShowError(false);
  };

  {/*2nd Bill*/ }
  const handleCreateBill2 = async () => {
    if (!name || !address) {
      setShowError(true);
      return;
    }

    const hasEmptyFields = items.some((i) => !i.item || !i.quantity || !i.price);
    if (hasEmptyFields) {
      setShowError(true);
      return;
    }

    const invoiceNumber = generateInvoiceNo();
    console.log("Generated invoice number:", invoiceNumber);
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
        PKheadings={[
          { name: "", width: "3%" },
          { name: "Item", width: "35%" },
          { name: "GST Rate", width: "7%" },
          { name: "Quantity", width: "8%" },
          { name: "Rate", width: "12%" },
          { name: "Amount", width: "12%" },
          { name: "GST", width: "13%" },
          { name: "Total", width: "12%" },
        ]}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PKRepair.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    // Reset
    setOpen(false);
    setSelectedBill(null);
    setName("");
    setAddress("");
    setInterestAmount("");
    setItems([{ item: "", quantity: "", price: "" }]);
    setShowError(false);
  };

  const handleModalOpen = (RepairBill) => {
    setSelectedBill(RepairBill);
    setOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 sm:px-8 md:px-16">
      {repairBill.map((RepairBill) => (
        <img
          key={RepairBill.id}
          src={RepairBill.img}
          className="h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
          onClick={() => handleModalOpen(RepairBill)}
        />
      ))}

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

            {/* Bill 1 - Urban Company */}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-5 mt-4">
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white w-full rounded-md"
                />
                <TextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-white w-full rounded-md"
                />
                <TextField
                  label="Item"
                  value={ucitem}
                  onChange={(e) => setucItem(e.target.value)}
                  className="bg-white w-full rounded-md"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <TextField
                    label="Platform Price"
                    type="text"
                    value={ucPlatformPrice}
                    onChange={(e) =>
                      setucPlatformPrice(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="bg-white w-full sm:w-1/2 rounded-md"
                  />
                  <TextField
                    label="Item Price"
                    type="text"
                    value={ucprice}
                    onChange={(e) =>
                      setucPrice(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="bg-white w-full sm:w-1/2 rounded-md"
                  />
                </div>
                <button
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-2 px-6 rounded mt-4 cursor-pointer hover:bg-gray-900"
                >
                  Create Bill
                </button>
              </div>
            )}


            {/* Bill 2 - PK Supply */}
            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-5 mt-4">
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white w-full rounded-md"
                />
                <div className="flex gap-3">
                  <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white w-full rounded-md"
                  />

                </div>
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
                      <TextField
                        label="GST (%)"
                        type="price"
                        value={item.gst || ""}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "gst",
                            e.target.value.replace(/[^0-9.]/g, "")
                          )}
                        className="bg-white w-full sm:w-1/3 rounded-md" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-4 rounded-md w-fit hover:bg-gray-800 cursor-pointer"
                >
                  + Add Item
                </button>

                <button
                  onClick={handleCreateBill2}
                  className="w-full bg-black text-white py-2 px-6 rounded mt-4 cursor-pointer hover:bg-gray-900"
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

export default Repairs;
