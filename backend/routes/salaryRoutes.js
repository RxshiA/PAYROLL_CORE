const express = require("express");
const router = express.Router();
const salariesController = require("../controllers/salariesController");
let Salary = require("../models/Salary");

//update by id
router.route("/:id").patch(async (req, res) => {
  try {
    const salId = req.params.id;
    const salary = req.body.salary;
    const userId = req.body.user;

    const sal = await Salary.findById(salId);

    if (!sal) {
      return res.status(400).json({ message: "Salary not found" });
    }

    sal.user = userId;
    sal.basicsal = salary;

    const updatedSalary = await sal.save();

    res.json(`${updatedSalary.user} updated`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get by id
router.route("/:id").get((req, res) => {
  let userid = req.params.id;
  Salary.findById(userid)
    .then((salary) => {
      res.json(salary);
      console.log("found the person you are looking for - salaryRoutes.js");
    })
    .catch((err) => {
      res.json("Salary cannot be found");
      console.log(err.message);
    });
});

//get by id and returne basicsal
router.route("/edit/:id").get((req, res) => {
  let salId = req.params.id;
  console.log(salId + "get by id and return basicsal");
  Salary.findById(salId)
      .then((salary) => {
        res.json(salary);
        console.log("basicsal returned - salaryRoutes.js");
      })
      .catch((err) => {
        res.json("Salary cannot be found");
        console.log(err.message);
      });
});

//deleting a salary
router.route("/:id").delete((req, res) => {
  let salId = req.params.id;
  Salary.findByIdAndDelete(salId)
      .then(() => {
        res.json("Salary successfully deleted");
      })
      .catch((err) => {
        res.json("Unsuccessfull delete");
        console.log(err.message);
      });
});
// add
router.route("/").post((req, res) => {
  const user = req.body.user;
  const basicsal = req.body.basicsal;

  const newSalary = new Salary({
    user,
    basicsal,
  });

  newSalary
    .save()
    .then(() => {
      res.json("Salary successfully added");
    })
    .catch((err) => {
      res.json("Unsuccessfull adding");
      console.log(err.message);
    });
});

//get all salaries
router.route("/").get((req, res) => {
  console.log(" get all the salaries - salaryRoutes.js");
  Salary.find()
    .then((salary) => {
      res.json(salary);
    })
    .catch((err) => {
      res.json("Cannot retrieve");
      console.log(err.message);
    });
});

module.exports = router;
