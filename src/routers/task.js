const Task = require("../models/task");
const express = require("express");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const task = await Task.findById(_id);

    updates.forEach((update) => task[update] = req.body[update])
    await task.save();

    if (!task) {
      return res.status(404).send("Task Not Found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send("Task Not Found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;