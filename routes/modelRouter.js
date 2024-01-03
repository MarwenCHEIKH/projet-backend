const express = require("express");
const SSHService = require("../services/SSHService");
const router = express.Router();
const { modelcomm } = require("../commands/modelCommands");
const ModelService = require("../services/ModelService");

const dbUtils = require("../services/dbUtils");

router.use(express.json());
const service = new SSHService();
const modelService = new ModelService();

router.post("/create-model", async (req, res) => {
  const formDataObject = req.body;
  // const models = await modelService.getModels("GENERAL") ;
  const models = ["model1", "model2", "model3", "model4", "model5"];

  if (models.find((m) => m == formDataObject.model_name)) {
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

router.post("/delete-model-attributes", async (req, res) => {
  const formDataObject = req.body;
  console.log(formDataObject);
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_model",
      modelcomm,
      formDataObject
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
router.post("/delete-model", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_model",
      modelcomm,
      formDataObject
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

router.get("/get-models", (req, res) => {
  const protocol = req.query.protocol;

  if (!protocol) {
    // modelService.getAllModels().then((models) => {
    //   res.send(models);
    // });
    const models = [
      { model_name: "model1", protocol: "GENERAL" },
      { model_name: "model2", protocol: "HTTP" },
      { model_name: "model3", protocol: "GENERAL" },
      { model_name: "model4", protocol: "FTP" },
      { model_name: "model5", protocol: "GENERAL" },
    ];
    return res.status(200).send(models);
  }

  // modelService.getModels(protocol).then((models) => {
  //   res.send(models);
  // });
  switch (protocol) {
    case "GENERAL":
      models = ["gmodel1", "gmodel2", "gmodel3", "gmodel4", "gmodel5"];
      break;
    case "TO_GTW":
      models = ["xmodel1", "xmodel2", "xmodel3", "xmodel4", "xmodel5"];
      break;
    default:
      // Handle the case where an unsupported protocol is provided
      return res.status(400).send("Unsupported protocol");
  }

  res.send(models);
});

router.get("/get-purgeModels", (req, res) => {
  // modelService.getPurgeModels().then((models) => {
  //   res.send(models);
  // });
  const purgeModels = ["pmodel1", "pmodel2", "pmodel3", "pmodel4", "pmodel5"];

  res.send(purgeModels);
});

module.exports = router;
