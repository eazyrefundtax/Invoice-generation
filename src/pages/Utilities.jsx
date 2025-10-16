import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import UtilitiesBill from "../assets/Utilities.jpg";
import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import UtilitiesBillDocument from "../components/UtilitiesBillDocument";

const Utilities = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [showError, setShowError] = useState(false);

  const Image = [...Array(8)];

  // Function to generate random 11-digit number
  const OrderNumber = () => {
    return Math.floor(1e10 + Math.random() * 9e10).toString();
  };
  const BillPaymentOfNumber = () => {
    return Math.floor(1e10 + Math.random() * 9e10).toString();
  };
  const GenerateRandom11Digit = () => {
    return Math.floor(1e10 + Math.random() * 9e10).toString();
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleCreateBill = async () => {
    if (!name || !totalAmount || !phone) {
      setShowError(true);
      return;
    }
    //  Generate Bill Number
    const OrderNo = OrderNumber();
    const billPaymentOfNumber = BillPaymentOfNumber();
    const generateRandom11Digit = GenerateRandom11Digit();
    const currentDateTime = new Date().toString().split(" GMT")[0];
    // Pass it to PDF
    const blob = await pdf(
      <UtilitiesBillDocument
        name={name}
        totalAmount={totalAmount}
        phone={phone}
        OrderNo={OrderNo}
        billPaymentOfNumber={billPaymentOfNumber}
        generateRandom11Digit={generateRandom11Digit}
        dateTime={currentDateTime}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}_${OrderNo}.pdf`;
    link.click();

    URL.revokeObjectURL(url);

    setOpen(false);
    setName("");
    setTotalAmount("");
    setPhone("");
  };

  return (
    <div className="grid grid-cols-4 px-[7rem] gap-8 ">
      {Image.map((_, index) => (
        <img
          key={index}
          src={UtilitiesBill}
          alt={`Bill ${index + 1}`}
          className="h-full w-[300px] hover:scale-109 duration-300 cursor-pointer border border-black rounded-lg"
          onClick={() => setOpen(true)}
        />
      ))}

      {open && (
        <div className="fixed h-full inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-[#EDEDED] rounded-lg shadow-lg w-[400px] relative p-10">
            <button
              className="w-full text-black text-xl font-bold cursor-pointer flex justify-end pb-7"
              onClick={() => setOpen(false)}
            >
              <RxCross1 />
            </button>

            <div className="flex flex-col gap-5">
              <div className="w-full">
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    className: "h-13 bg-white w-[320px] rounded-md",
                  }}
                />
                {name === "" && showError && (
                  <p className="text-sm text-red-500 font-medium">
                    *This field is required.
                  </p>
                )}
              </div>

              <div className="w-full">
                <TextField
                  label="Total Amount Paid"
                  type="text"
                  value={totalAmount}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (/^\d*\.?\d*$/.test(val)) {
                      if (val.length <= 50) setTotalAmount(val);
                    }
                  }}
                  InputProps={{
                    className: "h-13 bg-white w-[320px] rounded-md",
                  }}
                />
                {totalAmount === "" && showError && (
                  <p className="text-sm text-red-500 font-medium">
                    *This field is required.
                  </p>
                )}
              </div>

              <div>
                <TextField
                  label="Phone"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length <= 10) setPhone(val);
                  }}
                  InputProps={{
                    className: "h-13 bg-white w-[320px] rounded-md",
                  }}
                />
                {phone === "" && showError && (
                  <p className="text-sm text-red-500 font-medium">
                    *This field is required.
                  </p>
                )}
              </div>

              <button
                onClick={handleCreateBill}
                className="w-full bg-black text-white py-2 px-6 rounded mt-4 cursor-pointer"
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

export default Utilities;
