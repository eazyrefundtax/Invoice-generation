import React, { useEffect, useState } from "react";
import { ToWords } from "to-words";
import { pdf } from "@react-pdf/renderer";
import WashTog from "../assets/CLEANING SOUMYA_page-0001.jpg";
import PK from "../assets/Cleaning bill 2021_page-0001.jpg";
import UrbanCompany1 from "../assets/JAN - JUNE Cleaning and Maintenance_page-0001.jpg";
import UrbanCompany1Bill from "../components/urbanCompany1Bill";
import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import WashTogBill from "../components/WashTog";
import PkBill from "../components/PkBill";

const CleaningMaintainces = () => {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reductions, setReductions] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [newFinalAmount, setNewFinalAmount] = useState(0);
  const [interestTotalAmount, setInterestTotalAmount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [ucitem, setucItem] = useState("");
  const [ucPlatformPrice, setucPlatformPrice] = useState("");
  const [ucprice, setucPrice] = useState("");


  const reSetForm = () => {
    setOpen(false);
    setSelectedBill(null);
    setShowError(false);
    setName();
    setPhone();
    setAddress();
    setDueDate();
    setReductions();
    setInterestAmount();
    setItems();
    setFinalAmount();
    setUpdatedAmount();
    setNewFinalAmount();
    setInterestTotalAmount();
    setucItem();
    setucPlatformPrice();
    setucPrice();
  }
  const HeaderTitles = [
    { name: "S.no", width: "5%", value: "s.no" },
    { name: "Item", width: "40%", value: "item" },
    { name: "GST Rate", width: "7%", value: "gst" },
    { name: "Quantity", width: "12%", value: "quantity" },
    { name: "Rate", width: "12%", value: "price" },
    { name: "Amount", width: "12%", value: "itemtotal" },
    { name: "Total", width: "12%", value: "total" },
  ];

  const Bills = [
    { id: 1, img: WashTog },
    { id: 2, img: PK },
    { id: 3, img: UrbanCompany1 },
  ];
  {
    /*invoice numbers */
  }
  const generateInvoiceNo = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () =>
      letters[Math.floor(Math.random() * letters.length)];

    const letterPart = randomLetter() + randomLetter();
    const numberPart = Math.floor(100000 + Math.random() * 900000);

    return letterPart + numberPart;
  };
  const generateInvoiceNo1 = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () =>
      letters[Math.floor(Math.random() * letters.length)];

    const letterPart =
      randomLetter() + randomLetter() + randomLetter() + randomLetter();
    const numberPart = Math.floor(1000000000 + Math.random() * 900000000);

    return letterPart + numberPart;
  };
  const generateInvoiceNo2 = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () =>
      letters[Math.floor(Math.random() * letters.length)];

    const letterPart =
      randomLetter() + randomLetter() + randomLetter() + randomLetter();
    const numberPart = Math.floor(1000000000 + Math.random() * 900000000);

    return letterPart + numberPart;
  };

  const itemsWithTotal = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const price = Number(item.price || 0);
    const baseAmount = quantity * price;
    const gstRate = 0.18;
    const gstAmount = baseAmount * gstRate;
    const total = baseAmount + gstAmount;

    return {
      ...item,
      baseAmount: baseAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      total: total.toFixed(2),
      onlyGstAmount: gstAmount.toFixed(2),
    };
  });

  const claculationPlatformPrice = Number(ucPlatformPrice) || 0;
  const ucgstAmount = (claculationPlatformPrice * 0.18).toFixed(2);
  const uctotalPlatformFee = (
    claculationPlatformPrice +
    claculationPlatformPrice * 0.18
  ).toFixed(2);

  const partenarinvoice = Number(ucprice) || 0;
  const ucigstAmount = (partenarinvoice * 0.025).toFixed(2);
  const ucPartnerTotalFee = (partenarinvoice + partenarinvoice * 0.05).toFixed(
    2
  );

  const totalGST = itemsWithTotal
    .reduce((sum, item) => sum + Number(item.gstAmount), 0)
    .toFixed(2);
  const grandtotalBeforeGST = itemsWithTotal
    .reduce((sum, item) => sum + Number(item.baseAmount), 0)
    .toFixed(2);
  const onlyCGST = (grandtotalBeforeGST * 0.09).toFixed(2);

  const finalWithInterest =
    Number(newFinalAmount) + Number(interestAmount || 0);
  useEffect(() => {
    // Calculate total before reduction
    const total = items.reduce((sum, item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      const baseAmount = quantity * price;
      const gstAmount = baseAmount * 0.18;
      const totalItem = baseAmount + gstAmount;
      return sum + totalItem;
    }, 0);

    setFinalAmount(total);

    // Apply reduction
    const reducedValue = Number(reductions) || 0;
    const afterReduction = total - reducedValue > 0 ? total - reducedValue : 0;

    setNewFinalAmount(afterReduction);
  }, [items, reductions]);
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

  const amountInWords = convertToWords(finalWithInterest);
  const ucPlatformPriceInWords = convertToWords(ucPlatformPrice);
  const ucplucPlatformgstInWords = convertToWords(ucgstAmount);


  {/* 1st*/ }
  const handleCreateBill1 = async () => {
    console.log("Button Click");
    if (!name || !address) {
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

    // Generate Invoice
    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    // Generate the PDF
    const blob = await pdf(
      <WashTogBill
        name={name}
        address={address}
        phone={phone}
        InvoiceNo={invoiceNumber}
        dueDate={dueDate}
        dateTime={currentDate}
        items={itemsWithTotal}
        HeaderTitles={HeaderTitles}
        gstAmount={totalGST}
        grandtotalBeforeGST={grandtotalBeforeGST}
        onlyCGST={onlyCGST}
        finalAmount={finalAmount}
        deductedAmount={updatedAmount}
        reductions={reductions}
        newFinalAmount={newFinalAmount}
        amountInWords={amountInWords}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `WashTogBill.pdf`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);

    reSetForm();
  };

  //2nd
  const handleCreateBill2 = async () => {
    if (!name || !address) {
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

    const invoiceNumber = generateInvoiceNo();
    const today = new Date();
    const currentDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const onlygstAmount = itemsWithTotal.map((item) => item.gstAmount);
    const blob = await pdf(
      <PkBill
        name={name}
        address={address}
        InvoiceNo={invoiceNumber}
        dateTime={currentDate}
        items={itemsWithTotal}
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
        interestAmount={interestAmount}
        gstAmount={totalGST}
        grandtotalBeforeGST={grandtotalBeforeGST}
        newFinalAmount={newFinalAmount}
        amountInWords={amountInWords}
        interestTotalAmount={interestTotalAmount}
        finalWithInterest={finalWithInterest}
        onlygstAmount={onlygstAmount}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PkBill.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    reSetForm();
  };

  //3rd
  const handleCreateBill3 = async () => {
    if (!ucitem || !ucprice || !ucPlatformPrice) {
      setShowError(true);
      return;
    }

    const invoiceNumber1 = generateInvoiceNo1();
    const inVoiceNumber2 = generateInvoiceNo2();
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    const blob = await pdf(
      <UrbanCompany1Bill
        name={name}
        address={address}
        InvoiceNo={invoiceNumber1}
        InvoiceNo2={inVoiceNumber2}
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

    reSetForm();
  };

  const handleModalOpen = (bill) => {
    console.log("Bill", bill);
    setSelectedBill(bill);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 md:px-16 gap-6 justify-items-center">
      {Bills.map((bill) => (
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
                onClick={() => setOpen(false)}
              >
                <RxCross1 />
              </button>
            </div>
            {/*1st*/}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-5 mt-4">
                {/* Name */}
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
                <div className=" flex flex-col sm:flex-row gap-3">
                  {/* Address */}
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
                  {/*Reduction amount */}
                  <TextField
                    label="Reductions Amount"
                    value={reductions}
                    onChange={(e) => setReductions(e.target.value)}
                    className="bg-white w-full rounded-md"
                  />
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
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-2 px-6 rounded mt-4 cursor-pointer hover:bg-gray-900"
                >
                  Create Bill
                </button>
              </div>
            )}

            {/*2nd */}
            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-5 mt-4">
                {/* Name */}
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
                <div className="flex gap-3">
                  {/* Address */}
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
                  {/* Address */}
                  <TextField
                    label="Interest"
                    value={interestAmount}
                    onChange={(e) => setInterestAmount(e.target.value)}
                    className="bg-white w-full rounded-md"
                  />
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
                  onClick={handleCreateBill2}
                  className="w-full bg-black text-white py-2 px-6 rounded mt-4 cursor-pointer hover:bg-gray-900"
                >
                  Create Bill
                </button>
              </div>
            )}
            {/*3rd*/}
            {selectedBill?.id === 3 && (
              <div className="flex flex-col gap-5 mt-4">
                {/* Name */}
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

                {/* Address */}
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

                {/* Items */}

                <TextField
                  label="Item"
                  value={ucitem}
                  onChange={(e) => setucItem(e.target.value)}
                  className="bg-white w-full rounded-md"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <TextField
                    label="Platform price"
                    type="text"
                    value={ucPlatformPrice}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setucPlatformPrice(numericValue);
                    }}
                    className="bg-white w-full sm:w-1/2 rounded-md"
                  />

                  <TextField
                    label="Item Price"
                    type="text"
                    value={ucprice}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setucPrice(numericValue);
                    }}
                    className="bg-white w-full sm:w-1/2 rounded-md"
                  />
                </div>

                {showError &&
                  (ucitem === "" ||
                    ucPlatformPrice === "" ||
                    ucprice === "") && (
                    <p className="text-sm text-red-500 font-medium">
                      *All fields are required for this item.
                    </p>
                  )}

                {/* Create Bill */}
                <button
                  onClick={handleCreateBill3}
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

export default CleaningMaintainces;
