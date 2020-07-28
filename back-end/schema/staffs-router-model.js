const db = require("../database/dbConfig.js");

module.exports = {
  addStaff,
  removeStaff,
  updateStaff,
  findAllStaff,
  findById,
  findByUser
  //   findByReg
};
async function findAllStaff() {
  let staffs = await db("staffs");
  return staffs;
}

async function addStaff(StaffDetails) {
  const [id] = await db("staffs").insert(StaffDetails, "id");
  return findAllStaff();
}

function findById(id) {
  return db("staffs")
    .where({ id })
    .first();
}

function findByUser(id) {
  return db("staffs")
    .where("user_id", "=", id);
    
}

async function removeStaff(id) {
  const removed = await findById(id);

  await db("staffs")
    .where({ id })
    .del();

  return findAllStaff();
}

async function updateStaff(id, changes) {
  await db("staffs")
    .where({ id })
    .update(changes);

    return findAllStaff();

}
