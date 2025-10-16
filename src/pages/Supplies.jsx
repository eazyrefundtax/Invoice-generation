import React, { useState } from "react";
import Bill1 from "../assets/supplyBill1.jpg";
import Bill2 from "../assets/supplyBill2.jpg";
import Bill3 from "../assets/supplyBill3.jpg";
import Bill4 from "../assets/supplyBill4.jpg";
import Bill5 from "../assets/supplyBill5.jpg";
import Bill6 from "../assets/supplyBill6.jpg";

const Supplies = () => {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const bills = [
    { id: 1, image: Bill1 },
    { id: 2, image: Bill2 },
    { id: 3, image: Bill3 },
    { id: 4, image: Bill4 },
    { id: 5, image: Bill5 },
    { id: 6, image: Bill6 },
  ];

  const handleModalOpen = (bill) => {
    console.log(bill);
    setSelectedBill(bill);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-16 gap-6 justify-items-center">
      {bills.map((bill) => (
        <img
          key={bill.id}
          src={bill.image}
          alt={`Bill ${bill.id}`}
          className="h-auto w-[250px] md:w-[300px] hover:scale-105 duration-300 cursor-pointer border border-black rounded-lg"
          onClick={() => handleModalOpen(bill)}
        />
      ))}
    </div>
  );
};

export default Supplies;
