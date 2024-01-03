const express = require("express");
const SSHService = require("../services/SSHService");
const { cGateGroupCommands } = require("../commands/cGategroupCommands");
const CGategroupService = require("../services/CGateGroupService");
const router = express.Router();

const service = new SSHService();
const cgateGroupservice = new CGategroupService();

router.post("/create-cGategroup", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm create_cgategroup",
      cGateGroupCommands,
      formDataObject
    );

    // await service.connect(serverConfig);
    // await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // finally {
  //   service.closeConnection();
  // }
});
router.post("/update-cGategroup", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_cgategroup",
      cGateGroupCommands,
      formDataObject
    );

    // await service.connect(serverConfig);
    // await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // finally {
  //   service.closeConnection();
  // }
});
router.post("/delete-cGategroup", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_cgategroup",
      cGateGroupCommands,
      formDataObject
    );

    // await service.connect(serverConfig);
    // await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // finally {
  //   service.closeConnection();
  // }
});

router.get("/get-cgateGroups", async (req, res) => {
  // const cgateGroups = await cgateGroupservice.getcgateGroups();
  const cgateGroups = [
    "GAS2",
    "GAS3",
    "GCHECK",
    "GETEBAC3",
    "GETEBAC5",
    "GFTP",
    "GHTTP",
    "GODETTE",
    "GPEL",
    "GPHSD",
    "GPHSE",
    "GRN_HTTP",
    "GSFTP",
    "GSFTP_FRANCHISEES",
    "GSFTP_POCSOC",
    "LOOP_FTP",
    "LOOP_PHSE",
    "SFTP_TEST",
  ];
  res.send(cgateGroups);
});

module.exports = router;
