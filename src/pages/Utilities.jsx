import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import UtilitiesBill from "../assets/Utilities.jpg";
import Wifi from "../assets/Act.png";
import { RxCross1 } from "react-icons/rx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import { subMonths, startOfMonth, endOfMonth, format, getDaysInMonth } from "date-fns";
import TextField from "@mui/material/TextField";
import ElectricBill from "../components/ElectricBill";
import ActWifiBill from "../components/ActWifi";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";





const Utilities = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    totalAmount: "",
    phone: "",
  });


  const [addres, setAddres] = useState("");
  const [showError, setShowError] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [invoiceDate, setinvoiceDate] = useState(null);
  const [billedDate, setBilledDate] = useState("");
  const [BillingPeriod, setBillingPeriod] = useState("")
  const [formattedInvoiceDate, setFormattedInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [prevMonthDates, setPrevMonthDates] = useState([]);



  const clearForm = () => {
    setFormData({ name: "", totalAmount: "", phone: "" });
    setOpen(false);
    setBilledDate("");
    setShowError(false);
    setAddres("");
    setinvoiceDate("");
    setBilledDate("");
  }
  const resetform = () => {
    setOpen(false)
    setSelectedBill(null)
    clearForm()
  }
  const images = [
    { id: 1, image: UtilitiesBill },
    { id: 2, image: Wifi },
  ];

  function getRandomPrevMonthDate(date) {
    const prevMonth = subMonths(date, 1);
    const firstDate = startOfMonth(prevMonth);

    const randomDay = Math.floor(Math.random() * 10) + 1;

    const randomDate = new Date(firstDate);
    randomDate.setDate(randomDay);

    return format(randomDate, "dd, MMM, yyyy");
  }


  const handleDateChange = (newValue) => {
    setinvoiceDate(newValue);

    if (newValue) {
      setFormattedInvoiceDate(format(newValue, "dd, MMM, yyyy"));
      setBillingPeriod(format(newValue, "MMM yyyy"));

      const tenDaysLater = addDays(newValue, 10);
      setDueDate(format(tenDaysLater, "dd, MMM, yyyy"));

      const start = startOfMonth(newValue);
      const end = endOfMonth(newValue);

      setStartDate(format(start, "dd, MMM, yyyy"));
      setEndDate(format(end, "dd, MMM, yyyy"));

      const days = getDaysInMonth(newValue);
      setDaysInMonth(days);

      const prevDates = getRandomPrevMonthDate(newValue);
      setPrevMonthDates(prevDates);
    }
  };


  const randomNumber = () => Math.floor(1e10 + Math.random() * 9e10).toString();
  const UserID = () => Math.floor(1e10 + Math.random() * 9e11).toString();
  const ActinvoiceNO = () => Math.floor(100000000 + Math.random() * 999999999);
  const id = () => Math.floor(99999999 + Math.random() * 99999999);


  const totalAmountNum = Number(formData.totalAmount);
  const amountAfterDueDate = totalAmountNum * 0.19;
  const afterDue = totalAmountNum + amountAfterDueDate;
  const gst = totalAmountNum * 0.18;
  const TotalCharges = totalAmountNum - gst;
  const cgst = gst / 2;




  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  {/* 1St Bill */ }
  const handleCreateBill1 = async () => {
    const { name, totalAmount, phone } = formData;

    if (!name || !totalAmount || !phone) {
      setShowError(true);
      return;
    }

    const blob = await pdf(
      <ElectricBill
        name={name}
        totalAmount={totalAmount}
        phone={phone}
        billedDate={billedDate}
        OrderNo={randomNumber()}
        billPaymentOfNumber={randomNumber()}
        generateRandom11Digit={randomNumber()}
        dateTime={new Date().toLocaleString()}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}_${randomNumber()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);


    resetform()

  };

  {/*2nd Bill */ }

  const handleCreateBill2 = async () => {
    const { name, totalAmount, phone } = formData;
    if (!name || !totalAmount || !phone) {
      setShowError(true);
      return;
    }

    const blob = await pdf(
      <ActWifiBill
        name={name}
        totalAmount={totalAmount}
        phone={phone}
        addres={addres}
        invoiceDate={formattedInvoiceDate}
        billedDate={billedDate}
        BillingPeriod={BillingPeriod}
        dueDate={dueDate}
        afterDue={afterDue}
        TotalCharges={TotalCharges}
        gst={gst}
        cgst={cgst}
        startDate={startDate}
        endDate={endDate}
        daysInMonth={daysInMonth}
        id={id()}
        prevMonthDates={prevMonthDates}
        UserID={UserID()}
        ActinvoiceNO={ActinvoiceNO()}
      />

    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    resetform();



  };
  const handleModalOpen = (bill) => {
    clearForm();
    setSelectedBill(bill);
    setOpen(true);
  }



  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 sm:px-8 md:px-16">

      {/* Bill Images */}
      {images.map((bill) => (
        <img
          key={bill.id}
          src={bill.image}
          alt="Bill"
          className="w-75 h-110 rounded-lg border border-black cursor-pointer 
                   hover:scale-105 duration-300 shadow-sm"
          onClick={() => handleModalOpen(bill)}
        />
      ))}

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-[750px] p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-black text-xl"
              onClick={resetform}
            >
              <RxCross1 />
            </button>

            {/* BILL 1 */}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-8 mt-5 bg-white rounded-3xl shadow-xl p-6 sm:p-10 transition-all duration-300">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Urban Company Bill
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Fill in the details below to generate your bill.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Name */}
                  <div className="flex flex-col">
                    <TextField
                      label="Customer Name"
                      fullWidth
                      variant="outlined"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      InputProps={{ className: "bg-gray-50 rounded-xl h-[48px]" }}
                    />
                    {formData.name === "" && showError && (
                      <p className="text-xs text-red-600 mt-1">*This field is required.</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <TextField
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
                        })
                      }
                      InputProps={{ className: "bg-gray-50 rounded-xl h-[48px]" }}
                    />
                    {formData.phone === "" && showError && (
                      <p className="text-xs text-red-600 mt-1">*Phone number is required.</p>
                    )}
                  </div>

                  {/* Total Amount */}
                  <div className="flex flex-col">
                    <TextField
                      label="Total Amount Paid"
                      fullWidth
                      variant="outlined"
                      value={formData.totalAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalAmount: e.target.value.replace(/[^0-9]/g, ""),
                        })
                      }
                      InputProps={{ className: "bg-gray-50 rounded-xl h-[48px]" }}
                    />
                    {formData.totalAmount === "" && showError && (
                      <p className="text-xs text-red-600 mt-1">*Total amount is required.</p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex flex-col">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Due Date"
                        value={billedDate ? new Date(billedDate) : null}
                        onChange={(newValue) =>
                          newValue && setBilledDate(format(newValue, "MMM dd, yyyy"))
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              backgroundColor: "white",
                              borderRadius: "12px",
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>

                    {billedDate === "" && showError && (
                      <p className="text-xs text-red-600 mt-1">*Due date is required.</p>
                    )}
                  </div>

                </div>

                <div className="border-t border-gray-200"></div>

                <div className="flex justify-center">
                  <button
                    onClick={handleCreateBill1}
                    className="w-full sm:w-auto px-8 py-3 bg-black text-white text-lg font-medium rounded-xl 
                             hover:bg-gray-900 shadow-md hover:shadow-lg active:scale-95 transition-all"
                  >
                    Generate Bill
                  </button>
                </div>
              </div>
            )}

            {/* BILL 2 */}
            {selectedBill?.id === 2 && (
              <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-5 mt-6 space-y-10">

                {/* Header */}
                <div className="text-center ">
                  <h2 className="text-3xl font-bold text-gray-900">Customer Details</h2>
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{
                      className:
                        "bg-gray-50 rounded-xl h-[48px] focus-within:border-black",
                    }}
                  />
                  {formData.name === "" && showError && (
                    <p className="text-xs text-red-500 italic">*This Field is Required</p>
                  )}
                </div>

                {/* Total Amount */}
                <div className="flex flex-col gap-1">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Amount"
                    value={formData.totalAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalAmount: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    InputProps={{
                      className:
                        "bg-gray-50 rounded-xl h-[48px] focus-within:border-black",
                    }}
                  />
                  {formData.totalAmount === "" && showError && (
                    <p className="text-xs text-red-500 italic">*This Field is Required</p>
                  )}
                </div>

                {/* Phone + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-800"></label>
                    <TextField
                      fullWidth

                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
                        })
                      }
                      InputProps={{
                        className:
                          "bg-gray-50 rounded-xl h-[48px]  focus-within:border-black",
                      }}
                    />
                    {formData.phone === "" && showError && (
                      <p className="text-xs text-red-500 italic">*This Field is Required</p>
                    )}
                  </div>

                  {/* Due Date - Flatpickr (Styled Date Picker) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-800"></label>

                    <Flatpickr
                      value={invoiceDate || null}
                      placeholder="Invoice Date"
                      onChange={(selectedDates) => {
                        if (selectedDates.length > 0) {
                          handleDateChange(selectedDates[0]);
                        }
                      }}
                      options={{ dateFormat: "M d, Y" }}
                      className="w-full px-4 py-3 bg-gray-50 rounded border border-gray-300 focus:outline-none focus:border-black  text-gray-800 "
                    />

                    {invoiceDate === "" && showError && (
                      <p className="text-xs text-red-500 italic">*This Field is Required</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1">
                  <TextField
                    fullWidth
                    label="Address"
                    value={addres}
                    variant="outlined"
                    onChange={(e) => setAddres(e.target.value)}
                    InputProps={{
                      className:
                        "bg-gray-50 rounded-xl  focus-within:border-black",
                    }}
                  />
                  {addres === "" && showError && (
                    <p className="text-xs text-red-500 italic">*This Field is Required</p>
                  )}
                </div>

                {/* Divider */}
                {/* <div className="border-t border-gray-300"></div> */}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleCreateBill2}
                    className="w-full sm:w-auto px-10 py-3 bg-black text-white 
                   rounded-xl font-semibold shadow-md hover:bg-gray-900 
                   transition-all active:scale-95"
                  >
                    Generate Bill
                  </button>
                </div>

              </div>
            )}


          </div>
        </div>
      )}

    </div>
  );

};

export default Utilities;
