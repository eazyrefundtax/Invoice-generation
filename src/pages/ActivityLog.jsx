import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { FaFileExcel } from "react-icons/fa";

const ActivityLogGenerator = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [year, setYear] = useState("");

  const generateSortedDates = (year) => {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    const dates = new Set();
    while (dates.size < 79) {
      const t = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      const d = new Date(t);
      dates.add(d.toISOString().split("T")[0]);
    }
    return Array.from(dates)
      .map((s) => new Date(s))
      .sort((a, b) => a - b);
  };

  const handleGenerateAndDownload = async () => {
    if (!address || !year) {
      alert("Please enter both address and year.");
      return;
    }

    try {
      const response = await fetch("/Activity Log for Rental Property (1).xlsx");
      const buffer = await response.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const ws = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", blankrows: true });

      const addressRowIndex = data.findIndex((r) =>
        r.some((c) => typeof c === "string" && c.toLowerCase().includes("business/property"))
      );
      const headerRowIndex = data.findIndex(
        (r) => r[0] && r[0].toString().toLowerCase().includes("date")
      );

      if (headerRowIndex === -1) {
        alert("Could not find 'Date' header in your template.");
        return;
      }


      const addressText = `Business/Property: ${address} (Year: ${year})`;
      if (addressRowIndex !== -1) {
        data[addressRowIndex][0] = addressText;
      } else {
        data.splice(headerRowIndex, 0, [addressText]);
      }

      const headers = data[headerRowIndex];
      const topRows = data.slice(0, headerRowIndex);
      const templateRows = data.slice(headerRowIndex + 1);
      const template = templateRows.find((r) => r[0]) || ["", "", ""];

      const dates = generateSortedDates(year);

      const rows = dates.map((d, i) => {
        const temp = templateRows[i % templateRows.length] || template;
        const hours = parseFloat(temp[1]) || Math.floor(Math.random() * 8) + 1;
        const desc = temp[2] || "Routine maintenance / inspection";
        return [d, hours, desc];
      });

      const totalHours = rows.reduce(
        (sum, r) => sum + (typeof r[1] === "number" ? r[1] : parseFloat(r[1]) || 0),
        0
      );

      const newSheet = [
        ...topRows,
        headers,
        ...rows,
        [],
        ["Total Hours", totalHours],
      ];

      const newWs = XLSX.utils.aoa_to_sheet(newSheet);

      const baseWidth = 20;
      const extraWidth = Math.ceil(address.length / 10);
      newWs["!cols"] = [
        { wch: baseWidth + extraWidth },
        { wch: 15 },
        { wch: 60 },
      ];

      const addrRowIndex = addressRowIndex !== -1 ? addressRowIndex : headerRowIndex;
      newWs["!merges"] = [
        { s: { r: addrRowIndex, c: 0 }, e: { r: addrRowIndex, c: 2 } },
      ];

      const headerRow = topRows.length;
      headers.forEach((_, i) => {
        const ref = XLSX.utils.encode_cell({ r: headerRow, c: i });
        if (newWs[ref]) {
          newWs[ref].s = { font: { bold: true } };
        }
      });

      const totalRow = newSheet.length - 1;
      const totalLabelRef = XLSX.utils.encode_cell({ r: totalRow, c: 0 });
      const totalValueRef = XLSX.utils.encode_cell({ r: totalRow, c: 1 });
      if (newWs[totalLabelRef]) newWs[totalLabelRef].s = { font: { bold: true } };
      if (newWs[totalValueRef]) newWs[totalValueRef].s = { font: { bold: true } };


      newWs["!rows"] = Array(newSheet.length).fill({ hpt: 22 });

      const newWb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWb, newWs, "Updated Activity Log");

      const out = XLSX.write(newWb, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([out], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `Updated_Activity_Log_${year}.xlsx`
      );

      setOpen(false);
    } catch (err) {
      console.error("Excel generation failed:", err);
      alert("Error while generating Excel. Check console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-8 bg-[#F9FAFB]">
      <div className="bg-white rounded-2xl shadow-lg p-10 sm:p-14 flex flex-col items-center justify-center border border-gray-200 hover:shadow-xl transition duration-300">
        <FaFileExcel size={100} className="text-[#217346] mb-6 " />

        <p className="text-gray-600 text-center mb-8 max-w-md">
          Click the button below to download your Excel file.
        </p>

        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            padding: "10px 24px",
            textTransform: "none",
            borderRadius: "12px",
          }}
        >
          Generate Excel
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <div style={{ fontWeight: "bold" }}>
            <DialogContent>Enter Details</DialogContent>
          </div>
          <DialogContent>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 420 }}>
              <TextField
                label="Address"
                fullWidth
                value={address}
                placeholder="Eg - Hyderabad"
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                label="Year"
                type="price"
                placeholder="Eg - 2026"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleGenerateAndDownload} variant="contained" color="success">
              Download
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ActivityLogGenerator;
