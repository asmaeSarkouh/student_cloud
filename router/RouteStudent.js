
const express=require('express')
const app=express.Router()
const Student = require("../student");

//***********CRUD***************//

//CREATE:
app.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const database = new Student(data);
    const save_db = await database.save();
    res.status(201).json({ message: "Saved", data: save_db });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

//READ:
app.get("/", async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
});

// Detail(Read=>code)
app.get("/:code", async (req, res) => {
  try {
    const student = await Student.findOne({ code: req.params.code });
    student
      ? res.status(200).json({ data: student })
      : res.status(404).json({ Error: "Not Found!" });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
});

// Update :
app.put("/:code/edit", async (req, res) => {
  try {
    const data = req.body;
    const code = req.params.code;

    const student = await Student.findOneAndUpdate({ code }, data);
    student
      ? res.status(200).send({ message: "Updated", student: data })
      : res.status(404).send({ message: "Not Found" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

// delete :
app.delete("/:code", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ code:req.params.code });
    student
      ? res.status(200).json({ message: "Deleted" })
      : res.status(404).json({ Error: "Not Found!" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

module.exports=app