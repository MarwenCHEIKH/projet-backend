const express = require("express");
const SSHService = require("../services/SSHService");
const router = express.Router();
const cors = require("cors");
const {
  createDircomm,
  updateDircomm,
  moveDircomm,
} = require("../commands/vfdCommands");
const dbUtils = require("../services/dbUtils");

router.use(cors());
router.use(express.json());

const service = new SSHService();

// Route to create a directory
router.post("/create-directory", async (req, res) => {
  const formDataObject = req.body;
  dbUtils.addToUserField(req.user.username, "VFD", formDataObject);
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "vfdadm create_dir",
      createDircomm,
      formDataObject
    );
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });

    await service.connect(serverConfig);
    await service.executeCommand(commandString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    service.closeConnection();
  }
});

router.post("/update-directory", async (req, res) => {
  const formDataObject = req.body;
  console.log(formDataObject);
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "vfdadm update_dir",
      updateDircomm,
      formDataObject
    );

    const aux = {
      alias: formDataObject.new_alias,
      ...formDataObject,
    };

    // Create a new object with new_alias removed
    const { new_alias, ...updatedFormDataObject } = aux;

    dbUtils.modifyObjectInArray(
      req.user.username,
      "VFD",
      "dir_path",
      updatedFormDataObject
    );

    await service.connect(serverConfig);
    await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    service.closeConnection();
  }
});
router.post("/move-directory", async (req, res) => {
  const formDataObject = req.body;
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "vfdadm move_dir",
      moveDircomm,
      formDataObject
    );

    const updatedFormDataObject = dbUtils.getObjectFromArray(
      req.user.username,
      "VFD",
      "dir_path",
      formDataObject.dir_path
    );
    updatedFormDataObject.dir_path = formDataObject.new_dir_path;

    dbUtils.modifyObjectInArray(
      req.user.username,
      "VFD",
      "dir_path",
      updatedFormDataObject
    );

    await service.connect(serverConfig);
    await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    service.closeConnection();
  }
});
router.post("/delete-directory", async (req, res) => {
  const formDataObject = req.body;
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      `vfdadm delete_dir -mp "N" -mdp ""`,
      moveDircomm,
      formDataObject
    );
    dbUtils.deleteObjectFromArray(
      req.user.username,
      "VFD",
      "dir_path",
      formDataObject.dir_path
    );
    await service.connect(serverConfig);
    await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    service.closeConnection();
  }
});

router.get("/get-directories", (req, res) => {
  const user = dbUtils.getUserByUsername(req.user.username);

  if (!user) {
    res.status(404).send("User not found");
  } else if (!user.VFD) {
    res.send("No directories found for this user");
  } else {
    const directories = user.VFD;
    res.send(directories);
  }
});

module.exports = router;
