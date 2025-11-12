import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import UtilitiesBill from "../assets/Utilities.jpg";
import Wifi from "../assets/Act.png";
import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import UtilitiesBillDocument from "../components/UtilitiesBillDocument";
import ActWifiBill from "../components/ActWifi";

const Utilities = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "test",
    totalAmount: "1000",
    phone: "9999999999",
  });
  const [addres, setAddres] = useState("kphb, housingbard, hyderabad, telangana, pin-500072")
  const [showError, setShowError] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const images = [
    { id: 1, image: UtilitiesBill },
    { id: 2, image: Wifi },
  ];

  const randomNumber = () => Math.floor(1e10 + Math.random() * 9e10).toString();
  const UserID = () => Math.floor(1e10 + Math.random() * 9e11).toString();
  const ActinvoiceNO = () => Math.floor(100000000 + Math.random() * 999999999);

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
      <UtilitiesBillDocument
        name={name}
        totalAmount={totalAmount}
        phone={phone}
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

    setFormData({ name: "", totalAmount: "", phone: "" });
    setOpen(false);
    setShowError(false);
    setSelectedBill(null);
  };

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


    setFormData({ name: "", totalAmount: "", phone: "" });
    setOpen(false);
    setShowError(false);
    setAddres("");
    setSelectedBill(null);

  };


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-6 sm:px-10 lg:px-24 gap-6 sm:gap-8">

      {/* Bill Images */}
      {images.map(({ id, image }) => (
        <img
          key={id}
          src={image}
          alt="Bill"
          className="w-75 h-110 rounded-lg border border-black cursor-pointer hover:scale-105 duration-300 shadow-sm"
          onClick={() => {
            setSelectedBill({ id });
            setOpen(true);
          }}
        />
      ))}

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-[420px] p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-black text-xl"
              onClick={() => setOpen(false)}
            >
              <RxCross1 />
            </button>

            {/*BILL 1 */}
            {selectedBill?.id === 1 && (
              <div className="flex flex-col gap-5 mt-2">
                <h2 className="text-xl font-semibold">Details</h2>
                {["name", "totalAmount", "phone"].map((field, i) => (
                  <div key={i}>
                    <TextField
                      label={
                        field === "name"
                          ? "Name"
                          : field === "totalAmount"
                            ? "Total Amount Paid"
                            : "Phone"
                      }
                      value={formData[field]}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (field === "phone") {
                          value = value.replace(/[^0-9]/g, "").slice(0, 10);
                        }
                        setFormData({ ...formData, [field]: value });
                      }}
                      fullWidth
                      InputProps={{ className: "bg-white rounded-md" }}
                    />
                    {formData[field] === "" && showError && (
                      <p className="text-sm text-red-500 mt-1">
                        *This field is required.
                      </p>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleCreateBill1}
                  className="w-full bg-black text-white py-3 rounded-md mt-2 font-semibold hover:bg-gray-800 transition-all"
                >
                  Create Bill
                </button>
              </div>
            )}


            {/*2nd Bill */}
            {selectedBill?.id === 2 && (
              <div className="flex flex-col gap-5 mt-2">
                <div className="text-center text-gray-700">
                  <h2 className="text-xl font-semibold">Details</h2>
                  {["name", "totalAmount", "phone"].map((field, i) => (
                    <div key={i}>
                      <TextField
                        label={
                          field === "name"
                            ? "Name"
                            : field === "totalAmount"
                              ? "Total Amount Paid"
                              : "Phone"
                        }
                        value={formData[field]}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (field === "phone") {
                            value = value.replace(/[^0-9]/g, "").slice(0, 10);
                          }
                          setFormData({ ...formData, [field]: value });
                        }}
                        fullWidth
                        InputProps={{ className: "bg-white rounded-md" }}
                      />
                      {formData[field] === "" && showError && (
                        <p className="text-sm text-red-500 mt-1">
                          *This field is required.
                        </p>
                      )}

                    </div>

                  ))}
                  <div className="flex gap-3">
                    <TextField
                      label="Address"
                      value={addres}
                      onChange={(e) => setAddres(e.target.value)}
                      className="bg-white w-full rounded-md" />

                  </div>

                  <button
                    onClick={handleCreateBill2}
                    className="w-full cursor-pointer bg-black text-white py-3 rounded-md mt-2 font-semibold hover:bg-gray-800 transition-all"
                  >
                    Create Bill
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
