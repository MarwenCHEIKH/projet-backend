const SSHService = require("./SSHService");
const service = new SSHService();

class ModelService {
  filterEmptyAttributes(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  generateCommand(comm, commobj, formData) {
    const commandParts = [];

    for (const key in formData) {
      if (key in commobj && commobj[key] && formData[key] === true) {
        commandParts.push(`${commobj[key]}`);
      } else if (
        key in commobj &&
        commobj[key] &&
        typeof formData[key] === "string"
      ) {
        const value = formData[key];
        commandParts.push(`${commobj[key]} "${value}"`);
      }
    }

    const command = `${comm} ${commandParts.join(" ")}`;
    return command;
  }

  async getAllModels() {
    const modelsArray = [];
    try {
      await service.connect(service.getServerConfig("UAT"));
      const commandOutput = await service.executeCommand("peldsp select_model");
      const parsedData = service.parseCommandOutput(commandOutput);
      for (const data of parsedData) {
        const [model_name, protocol] = data;
        modelsArray.push({ model_name, protocol });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      service.closeConnection();
    }
    return modelsArray;
  }

  async getModelsByProtocol(protocol) {
    const modelsArray = [];
    try {
      await service.connect(service.getServerConfig("UAT"));
      const commandOutput = await service.executeCommand(
        `peldsp select_model -pr '${protocol}'`
      );
      const parsedData = service.parseCommandOutput(commandOutput);
      for (const model_name of parsedData) {
        modelsArray.push({ model_name, protocol });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      service.closeConnection();
    }
    return modelsArray;
  }

  async getPurgeModels() {
    const modelsArray = [];
    try {
      await service.connect(service.getServerConfig("UAT"));
      const commandOutput = await service.executeCommand(
        "peldsp select_purge_model"
      );
      const parsedData = service.parseCommandOutput(commandOutput);
      for (const model_name of parsedData) {
        modelsArray.push(model_name);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      service.closeConnection();
    }
    return modelsArray;
  }
}

module.exports = ModelService;
