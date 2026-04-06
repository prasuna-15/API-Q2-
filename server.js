const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend

// Fake Database
let students = [];

// ⏳ Simulate async DB operation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* =========================
   GET Students
========================= */
app.get("/students", async (req, res) => {
    await delay(500); // simulate DB delay
    res.json({ students });
});

/* =========================
   ADD Student
========================= */
app.post("/students", async (req, res) => {
    await delay(500);

    const { name, company } = req.body;

    if (!name || !company) {
        return res.status(400).json({ message: "All fields required" });
    }

    const newStudent = { name, company };
    students.push(newStudent);

    res.json({
        message: "Student added successfully",
        student: newStudent
    });
});

/* =========================
   DELETE Student
========================= */
app.delete("/students/:index", async (req, res) => {
    await delay(500);

    const index = req.params.index;

    if (students[index]) {
        students.splice(index, 1);
        res.json({ message: "Deleted successfully" });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

/* ========================= */
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});