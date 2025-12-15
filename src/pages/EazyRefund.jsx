import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { RxCross1 } from "react-icons/rx";
import { pdf } from "@react-pdf/renderer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { format, addDays } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToWords } from "to-words";
import dayjs from "dayjs";
import Ezyrefund from "../assets/EAZYREFUNDCONSULTANCY_LLC_invoice_21_page-0001.jpg";
import Er5 from "../assets/ER5_INVOICE_3_page-0001.jpg";
import EzyRefundBill from "../components/EzyRefundBill";
import ER5 from "../components//ER5";
const EazyRefund = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");
    const [amount, SetAmount] = useState("");
    const [showError, setShowError] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const resetForm = () => {
        setOpen(false);
        setDate("");
        SetAmount("");
        setDate("");
        setSelectedBill(null);
        setShowError(false);
    }

    const clearForm = () => {
        setOpen(false);
        setSelectedBill()
        resetForm();
    }

    const ER = [
        { id: 1, image: Ezyrefund },
        { id: 2, image: Er5 },
    ];

    const InvoiceNumber = Math.floor(10000000 + Math.random() * 90000000);


    const toWords = new ToWords({
        localeCode: "en-US",
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
    const amountInWords = convertToWords(amount);
    const handleModelOpen = (bill) => {
        setSelectedBill(bill);
        setOpen(true);
    };
    // due date after 7 days
    const getDueDate = (date) => {
        if (!date) return "";
        const nextDate = addDays(new Date(date), 7);
        return format(nextDate, "dd MMM, yyyy");
    };


    // Bill one
    const handleCreateBill1 = async () => {
        if (amount === "" || date === "") {
            setShowError(true);
            return;
        }

        const NextDueDate = getDueDate(date);

        const blob = await pdf(
            <EzyRefundBill
                amount={amount}
                date={date}
                dueDate={NextDueDate}
                InvoiceNumber={InvoiceNumber}
                amountInWords={amountInWords}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${InvoiceNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        clearForm("");
    };

    //2nd Bill
    const handleCreateBill2 = async () => {
        if (!amount || !date) {
            setShowError(true);
            return;
        }

        const next7DaysDate = getDueDate(date);

        const blob = await pdf(
            <ER5
                amount={amount}
                date={date}
                dueDate={next7DaysDate}
                InvoiceNumber={InvoiceNumber}
                amountInWords={amountInWords}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${InvoiceNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        clearForm("");
    };



    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 sm:px-8 md:px-16">
            {ER.map((bill) => (
                <img
                    key={bill.id}
                    src={bill.image}
                    alt={`bill-${bill.id}`}
                    className="h-100 w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
                    onClick={() => handleModelOpen(bill)} />
            ))}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
                    <div className="bg-[#EDEDED] rounded-lg shadow-lg w-full sm:w-[600px] md:w-[700px] lg:w-[800px] relative p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <p className="text-xl sm:text-2xl font-semibold">Details</p>
                            <button
                                className="text-black text-2xl font-bold cursor-pointer"
                                onClick={resetForm}
                            >
                                <RxCross1 />
                            </button>
                        </div>

                        {selectedBill?.id === 1 && (

                            <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
                                {/* Title */}
                                <p className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                                    EAZYREFUND CONSULTANCY LLP
                                </p>

                                {/* Amount Field */}
                                <div className="mb-5">
                                    <TextField
                                        label="Enter Amount"
                                        type="text"
                                        placeholder="Eg - 500"
                                        value={amount}
                                        onChange={(e) => SetAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                borderRadius: 2,
                                                backgroundColor: "#f9fafb",
                                            },
                                        }}
                                    />
                                    {!amount && showError && (
                                        <p className="text-sm text-red-500 font-medium mt-1">
                                            *This field is required.
                                        </p>
                                    )}
                                </div>

                                {/* Date Picker */}
                                <div className="mb-6">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Select Date"
                                            value={date ? dayjs(date) : null}
                                            onChange={(newValue) => {
                                                if (newValue) setDate(format(newValue.$d, "MMM dd, yyyy"));
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    sx: {
                                                        backgroundColor: "#f9fafb",
                                                        borderRadius: "8px",
                                                    },
                                                },
                                            }}
                                        />

                                        {!date && showError && (
                                            <p className="text-sm text-red-500 font-medium mt-1">
                                                *This field is required.
                                            </p>
                                        )}
                                    </LocalizationProvider>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleCreateBill1}
                                    className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-3 px-6 rounded-xl font-medium text-lg shadow-md hover:from-black hover:to-gray-700 transition-all duration-200"
                                >
                                    Create Bill
                                </button>
                            </div>

                        )}

                        {selectedBill?.id === 2 && (
                            <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
                                {/* Title */}
                                <p className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                                    ER5 TAXATION                                </p>

                                {/* Amount Field */}
                                <div className="mb-5">
                                    <TextField
                                        label="Enter Amount"
                                        type="text"
                                        placeholder="Eg - 500"
                                        value={amount}
                                        onChange={(e) => SetAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                borderRadius: 2,
                                                backgroundColor: "#f9fafb",
                                            },
                                        }}
                                    />
                                    {amount === "" && showError && (
                                        <p className="text-sm text-red-500 font-medium mt-1">
                                            *This field is required.
                                        </p>
                                    )}
                                </div>

                                {/* Date Picker */}
                                <div className="mb-6">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Select Date"
                                            value={date ? dayjs(date) : null}
                                            onChange={(newValue) => {
                                                if (newValue) setDate(format(newValue.$d, "MMM dd, yyyy"));
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    sx: {
                                                        backgroundColor: "#f9fafb",
                                                        borderRadius: "8px",
                                                    },
                                                },
                                            }}
                                        />

                                        {!date && showError && (
                                            <p className="text-sm text-red-500 font-medium mt-1">
                                                *This field is required.
                                            </p>
                                        )}
                                    </LocalizationProvider>
                                </div>

                                <button
                                    onClick={handleCreateBill2}
                                    className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-3 px-6 rounded-xl font-medium text-lg shadow-md hover:from-black hover:to-gray-700 transition-all duration-200"
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
export default EazyRefund;
