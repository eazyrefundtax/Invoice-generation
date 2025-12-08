import React, { useEffect, useState } from "react";
import { ToWords } from "to-words";
import { pdf } from "@react-pdf/renderer";
import WashTog from "../assets/CLEANING SOUMYA_page-0001.jpg";
import PK from "../assets/Cleaning bill 2021_page-0001.jpg";
import UrbanCompany1 from "../assets/JAN - JUNE Cleaning and Maintenance_page-0001.jpg";
import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import WashTogBill from "../components/WashTogBill.jsx";
import UrbanCompany1Bill from "../components/urbanCompany1Bill.jsx";
import CleaningPk from "../components/CleaningPk.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";


const CleaningMaintainces = () => {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [reductions, setReductions] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [newFinalAmount, setNewFinalAmount] = useState(0);
  const [interestTotalAmount, setInterestTotalAmount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [ucitem, setucItem] = useState("");
  const [ucPlatformPrice, setucPlatformPrice] = useState("");
  const [ucprice, setucPrice] = useState("");

  const clearForm = () => {
    setShowError(false);
    setName("");
    setPhone("");
    setInvoiceDate("");
    setAddress("");
    setDueDate("");
    setReductions("");
    setInterestAmount("");
    setItems([{ item: "", quantity: "", price: "" }]);
    setFinalAmount(0);
    setUpdatedAmount(0);
    setNewFinalAmount(0);
    setInterestTotalAmount(0);
    setucItem("");
    setucPlatformPrice("");
    setucPrice("");
  };

  const reSetForm = () => {
    setOpen(false);
    setSelectedBill(null);
    clearForm();
  };

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

  const generateInvoiceNo = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const letterPart = randomLetter() + randomLetter();
    const numberPart = Math.floor(100000 + Math.random() * 900000);
    return letterPart + numberPart;
  };
  const generateInvoiceNo1 = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const letterPart = randomLetter() + randomLetter() + randomLetter() + randomLetter();
    const numberPart = Math.floor(1000000000 + Math.random() * 900000000);
    return letterPart + numberPart;
  };
  const generateInvoiceNo2 = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const letterPart = randomLetter() + randomLetter() + randomLetter() + randomLetter();
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
  const uctotalPlatformFee = (claculationPlatformPrice + claculationPlatformPrice * 0.18).toFixed(2);

  const partenarinvoice = Number(ucprice) || 0;
  const ucigstAmount = (partenarinvoice * 0.025).toFixed(2);
  const ucPartnerTotalFee = (partenarinvoice + partenarinvoice * 0.05).toFixed(2);

  const totalGST = itemsWithTotal.reduce((sum, item) => sum + Number(item.gstAmount), 0).toFixed(2);
  const grandtotalBeforeGST = itemsWithTotal.reduce((sum, item) => sum + Number(item.baseAmount), 0).toFixed(2);
  const onlyCGST = (grandtotalBeforeGST * 0.09).toFixed(2);

  const finalWithInterest = Number(newFinalAmount) + Number(interestAmount || 0);

  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      const baseAmount = quantity * price;
      const gstAmount = baseAmount * 0.18;
      const totalItem = baseAmount + gstAmount;
      return sum + totalItem;
    }, 0);

    setFinalAmount(total);
    const reducedValue = Number(reductions) || 0;
    const afterReduction = total - reducedValue > 0 ? total - reducedValue : 0;
    setNewFinalAmount(afterReduction);
  }, [items, reductions]);

  const handleAddItem = () => setItems((s) => [...s, { item: "", quantity: "", price: "" }]);

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const toWords = new ToWords({ localeCode: "en-IN", converterOptions: { currency: true, ignoreDecimal: false } });
  const convertToWords = (value) => {
    const num = Number(value);
    if (isNaN(num) || value === "" || value == null) return "";
    return toWords.convert(num);
  };

  const amountInWords = convertToWords(finalWithInterest);
  const ucPlatformPriceInWords = convertToWords(ucPlatformPrice);
  const ucplucPlatformgstInWords = convertToWords(ucgstAmount);

  //Bill 1
  const handleCreateBill1 = async () => {
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
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const currentDate = today.toLocaleDateString("en-US", options);

    const blob = await pdf(
      <WashTogBill
        name={name}
        address={address}
        phone={phone}
        InvoiceNo={invoiceNumber}
        invoiceDate={invoiceDate}
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
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    reSetForm();
  };


  //Bill 2
  const handleCreateBill2 = async (e) => {
    e?.preventDefault?.();
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
    const today = new Date();
    const currentDate = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const onlygstAmount = itemsWithTotal.map((item) => item.gstAmount);

    const blob = await pdf(
      <CleaningPk
        name={name}
        address={address}
        InvoiceNo={invoiceNumber}
        invoiceDate={invoiceDate}
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
    link.download = `CleaningPk.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    reSetForm();
  };


  //Bill 3
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
    link.download = `UrbanCompany1Bill.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    reSetForm();
  };

  const handleModalOpen = (bill) => {
    clearForm();
    setSelectedBill(bill);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 md:px-16 gap-6 justify-items-center">
      {Bills.map((bill) => (
        <img
          key={bill.id}
          src={bill.img}
          alt={`bill-${bill.id}`}
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
                onClick={reSetForm}
              >
                <RxCross1 />
              </button>
            </div>

            {/* Bill 1 */}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Wastog</h2>


                {/* Name + Date */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Customer Name"
                      value={name}
                      placeholder="Eg - John"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {name === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Invoice Date"
                        value={invoiceDate ? new Date(invoiceDate) : null}
                        onChange={(newValue) => {
                          if (newValue)
                            setInvoiceDate(format(newValue, "MMM dd, yyyy"));
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
                        <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                      )}
                    </LocalizationProvider>
                  </div>
                </div>

                {/* Address + Reductions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Address"
                      placeholder="Eg - Hyderabad"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {address === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <TextField
                      label="Reductions Amount"
                      placeholder="Eg - 20000"
                      value={reductions}
                      onChange={(e) =>
                        setReductions(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white rounded-md"
                    />

                    {reductions === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                    )}
                  </div>
                </div>

                {/* Items */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg p-4 flex flex-col gap-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-gray-800">
                        Item {index + 1}
                      </p>
                      {items.length > 1 && (
                        <button
                          className="text-red-500 text-sm font-medium hover:underline"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <TextField
                      label="Item Name"
                      placeholder="Eg - House Cleaning plan"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="bg-white rounded-md"
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                      <TextField
                        label="Quantity"
                        type="text"
                        placeholder="Eg - 1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md w-full"
                      />

                      <TextField
                        label="Price"
                        type="text"
                        placeholder="Eg - 25000"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md w-full"
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

                {/* Add Item Button */}
                <button
                  onClick={handleAddItem}
                  className="bg-gray-700 text-white py-2 px-4 rounded-md w-fit hover:bg-gray-800 transition"
                >
                  + Add Item
                </button>

                {/* Create Bill Button */}
                <button
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-3 rounded-lg mt-2 text-lg hover:bg-gray-900 transition"
                >
                  Create Bill
                </button>
              </div>
            )}

            {/* Bill 2 */}
            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">PK Service BIll  </h2>

                {/* Name + Date */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Customer Name"
                      placeholder="Eg - John"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {name === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                    )}
                  </div>

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
                      {invoiceDate === "" && showError && (
                        <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                      )}
                    </LocalizationProvider>
                  </div>
                </div>

                {/* Address + Interest */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Address"
                      placeholder="Hyderabad"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {address === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <TextField
                      label="Interest Amount"
                      value={interestAmount}
                      placeholder="Eg - 25410"
                      onChange={(e) =>
                        setInterestAmount(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white rounded-md"
                    />
                    {interestAmount === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">*This field is required.</p>
                    )}
                  </div>
                </div>

                {/* Items */}
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg p-4 flex flex-col gap-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-gray-800">Item {index + 1}</p>
                      {items.length > 1 && (
                        <button
                          className="text-red-500 text-sm font-medium hover:underline"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <TextField
                      label="Item Name"
                      value={item.item}
                      placeholder="Tiles Cleaning"
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="bg-white rounded-md"
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                      <TextField
                        label="Quantity"
                        type="text"
                        placeholder="4"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md w-full"
                      />

                      <TextField
                        label="Price"
                        type="text"
                        value={item.price}
                        placeholder="Eg - 1500"
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            e.target.value.replace(/[^0-9]/g, "")
                          )
                        }
                        className="bg-white rounded-md w-full"
                      />
                    </div>

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
                  className="bg-gray-700 text-white py-2 px-4 rounded-md w-fit hover:bg-gray-800 transition"
                >
                  + Add Item
                </button>

                {/* Create Bill */}
                <button
                  onClick={handleCreateBill2}
                  className="w-full bg-black text-white py-3 rounded-lg mt-2 text-lg hover:bg-gray-900 transition"
                >
                  Create Bill
                </button>
              </div>
            )}


            {/* Bill 3 */}
            {selectedBill?.id === 3 && (
              <div className="flex flex-col gap-6 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">

                {/* Name + Date */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Customer Name"
                      value={name}
                      placeholder="Eg - John"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {name === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

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
                </div>

                {/* Address + Item */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Address"
                      placeholder="Eg - Hyderabad"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {address === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <TextField
                      label="Item"
                      placeholder="Eg - House Maintenance"
                      value={ucitem}
                      onChange={(e) => setucItem(e.target.value)}
                      className="bg-white rounded-md"
                    />
                    {ucitem === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* Prices */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Platform Price"
                      placeholder="Eg - 1700"
                      type="text"
                      value={ucPlatformPrice}
                      onChange={(e) =>
                        setucPlatformPrice(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white rounded-md w-full"
                    />
                    {ucPlatformPrice === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *This field is required.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <TextField
                      label="Item Price"
                      placeholder="Eg - 52800"
                      type="text"
                      value={ucprice}
                      onChange={(e) =>
                        setucPrice(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="bg-white rounded-md"
                    />
                    {ucprice === "" && showError && (
                      <p className="text-sm text-red-500 mt-1 font-medium">
                        *All this field is required.
                      </p>
                    )}
                  </div>
                </div>


                {/* Submit */}
                <button
                  onClick={handleCreateBill3}
                  className="w-full bg-black text-white py-3 rounded-lg mt-2 text-lg hover:bg-gray-900 transition"
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
