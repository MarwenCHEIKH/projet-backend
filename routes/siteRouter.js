const express = require("express");
const SSHService = require("../services/SSHService");
const { siteCommands } = require("../commands/siteCommands");
const SiteService = require("../services/sitesService");
const router = express.Router();

const service = new SSHService();
const siteservice = new SiteService();

//Local site routes
router.post("/create-loc-site", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm create_loc_site",
      siteCommands,
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
router.post("/update-loc-site", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_loc_site",
      siteCommands,
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
router.post("/delete-loc-site", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_loc_site",
      siteCommands,
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

router.get("/get-loc-sites", async (req, res) => {
  //   const sites = await siteservice.getLocsites();
  const sites = [
    "site1",
    "site2",
    "site3",
    "site4",
    "site5",
    "site6",
    "site7",
    "site8",
    "site9",
    "site10",
    "site12",
    "site13",
    "site14",
    "site15",
    "site16",
    "site17",
    "site18",
    "site19",
  ];
  res.send(sites);
});

//remote site routes
router.post("/create-remote-site", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm create_site",
      siteCommands,
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
router.post("/update-remote-site", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_site",
      siteCommands,
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
router.post("/delete-remote-site", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_site",
      siteCommands,
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

router.get("/get-remote-site", async (req, res) => {
  //   const sites = await siteservice.getRemotesites();
  const sites = [
    "site1",
    "site2",
    "site3",
    "site4",
    "site5",
    "site6",
    "site7",
    "site8",
    "site9",
    "site10",
    "site12",
    "site13",
    "site14",
    "site15",
    "site16",
    "site17",
    "site18",
    "site19",
  ];
  res.send(sites);
});

module.exports = router;
