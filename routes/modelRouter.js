const express = require("express");
const SSHService = require("../services/SSHService");
const router = express.Router();
const { modelcomm } = require("../commands/modelCommands");
const {
  filterEmptyAttributes,
  generateCommand,
} = require("../services/modelService");
const dbUtils = require("../services/dbUtils");

router.use(express.json());
const service = new SSHService();

router.post("/create-model", async (req, res) => {
  const formDataObject = req.body;

  if (
    formDataObject.protocol == "GENERAL" &&
    dbUtils.getObjectFromArray(
      req.user.username,
      "models",
      "model_name",
      formDataObject.model_name
    )
  ) {
    return res.status(400).json({ error: "Model name already used" });
  } else {
    dbUtils.addToUserField(req.user.username, "models", formDataObject);
    try {
      const env = formDataObject["env"];
      const serverConfig = service.getServerConfig(env);
      const commandString = service.generateCommand(
        "peladm create_model",
        modelcomm,
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
  }
});

router.post("/update-model", async (req, res) => {
  const formDataObject = filterEmptyAttributes(req.body);
  console.log(formDataObject);
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_model",
      modelcomm,
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

router.post("/delete-model-attributes", async (req, res) => {
  const formDataObject = req.body;
  console.log(formDataObject);
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = generateCommand(
      "peladm update_model",
      modelcomm,
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
router.post("/delete-model", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = generateCommand(
      "peladm delete_model",
      modelcomm,
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

router.get("/get-models", (req, res) => {
  // replace this with the getModels() function from modelService example usage:
  // modelService.getModels().then((models) => {
  //   console.log('Models:', models);
  // });
  const user = dbUtils.getUserByUsername(req.user.username);

  if (!user) {
    res.status(404).send("User not found");
  } else if (!user.models) {
    res.send("No directories found for this user");
  } else {
    const models = user.models;
    res.send(models);
  }
});

module.exports = router;
