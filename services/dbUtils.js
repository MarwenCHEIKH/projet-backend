const fs = require("fs");
const path = require("path");

// Read user data from db.json
function getUsersFromDb() {
  const dbData = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");
  return JSON.parse(dbData).users || [];
}

// Write user data to db.json
function writeUsersToDb(users) {
  const dbData = { users };
  fs.writeFileSync(
    path.join(__dirname, "../db.json"),
    JSON.stringify(dbData, null, 2)
  );
}
function getUserByUsername(username) {
  // Load the user data from the db.json file
  const dbData = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");
  const db = JSON.parse(dbData);

  // Find the user by their username
  const user = db.users.find((u) => u.username === username);

  return user;
}

function addToUserField(username, fieldName, data) {
  // Get the user data from the database
  const db = getUsersFromDb();

  // Find the user by their username
  const userIndex = db.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    // Add the data to the specified field of the user object
    db[userIndex][fieldName].push(data);

    // Save the updated user data to the db.json file
    writeUsersToDb(db);

    return true; // Data added successfully
  }

  return false; // User not found
}
function modifyObjectInArray(username, fieldName, objectKey, updatedObject) {
  // Get the user data from the database
  const db = getUsersFromDb();

  // Find the user by their username
  const userIndex = db.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    const user = db[userIndex];

    // Check if the specified field exists and is an array
    if (user.hasOwnProperty(fieldName) && Array.isArray(user[fieldName])) {
      const array = user[fieldName];

      // Find the object within the array by its key
      const objectIndex = array.findIndex(
        (item) => item.objectKey === updatedObject.objectKey
      );

      if (objectIndex !== -1) {
        // Update the object in the array with the updated object
        array[objectIndex] = updatedObject;

        // Save the updated user data to the db.json file
        writeUsersToDb(db);

        return true; // Object modified successfully
      }
    }
  }

  return false; // User or object not found
}

function getObjectFromArray(username, fieldName, objectKey, objectValue) {
  // Get the user data from the database
  const db = getUsersFromDb();

  // Find the user by their username
  const userIndex = db.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    const user = db[userIndex];

    // Check if the specified field exists and is an array
    if (user.hasOwnProperty(fieldName) && Array.isArray(user[fieldName])) {
      const array = user[fieldName];

      const object = array.find((item) => item[objectKey] === objectValue);

      if (object) {
        // Return the found object
        return object;
      }
    }
  }

  return null; // User or object not found
}
function deleteObjectFromArray(username, fieldName, objectKey, objectValue) {
  // Get the user data from the database
  const db = getUsersFromDb();

  // Find the user by their username
  const userIndex = db.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    const user = db[userIndex];

    // Check if the specified field exists and is an array
    if (user.hasOwnProperty(fieldName) && Array.isArray(user[fieldName])) {
      const array = user[fieldName];

      const objectIndex = array.findIndex(
        (item) => item[objectKey] === objectValue
      );

      if (objectIndex !== -1) {
        // Remove the object from the array
        array.splice(objectIndex, 1);

        // Save the updated user data to the db.json file
        writeUsersToDb(db);

        return true; // Object deleted successfully
      }
    }
  }

  return false; // User or object not found
}
module.exports = {
  getUsersFromDb,
  writeUsersToDb,
  addToUserField,
  getUserByUsername,
  modifyObjectInArray,
  getObjectFromArray,
  deleteObjectFromArray,
};
