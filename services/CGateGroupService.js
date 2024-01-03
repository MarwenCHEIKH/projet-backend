const SSHService = require("./SSHService");
const service = new SSHService();

class CGategroupService {
  async getcgateGroups() {
    const cGategroupsArray = [];
    try {
      await service.connect(service.getServerConfig("UAT"));
      const commandOutput = await service.executeCommand(
        "peldsp select_cgategroup"
      );

      const parsedData = service.parseCommandOutput(commandOutput);
      for (const data of parsedData) {
        // Extract model_name and protocol from the parsed data
        const cGategroup_name = data;

        // Push the model object into the array
        cGategroupsArray.push(cGategroup_name);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }

    return cGategroupsArray;
  }
}
module.exports = CGategroupService;
