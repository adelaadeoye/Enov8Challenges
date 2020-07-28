//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../schema/staffs-router-model");

//Validation
const validation = require("../middleware/validation");

//Get all listings
router.get("/", (req, res) => {
  db.findAllStaff()
    .then(listings => {
      res.status(200).json(listings);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

//Get  listings added by user
router.get("/:id", (req, res) => { 
  const id= req.params.id;
  db.findById(id)
    .then(listings => {
      res.status(200).json(listings);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});


//Add new listings
router.post("/add", (req, res) => {
  let list = req.body;
  
  console.log(list);
  db.addStaff(list)
    .then(data => {
      res.status(201).json({ message: "Staff added successfully", data });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: "Failed to add Staff, Possible reason user not found"
        });
    });
});

// Update Account

router.put("/:id", (req, res) => {
  const id = req.params.id;
  let data = req.body;
 
  db.findById(id).then(listing => {
    if (listing) {
      db.updateStaff(id, data)
        .then(data => {
          res
            .status(202)
            .json({ message: "Listing updated successfully", data });
        })
        .catch(error => {
          res.send({
            message: "Unable to update info Listing does not exist"
          });
        });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});
//Delete Listings
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.removeStaff(id)
    .then(listing => {
      if (listing) {
        res
          .status(200)
          .json({ message: "Listing Deleted Successfully", listing });
      } else {
        res.status(404).json({ message: "Listing not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to connect to server" });
    });
});

module.exports = router;
