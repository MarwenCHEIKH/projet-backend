const SSHService = require("./SSHService");
const service = new SSHService();

class cGateService {
  async getcGates() {
    const cGatesArray = [];
    try {
      await service.connect(service.getServerConfig("UAT"));
      const commandOutput = await service.executeCommand("peldsp select_cgate");

      const parsedData = service.parseCommandOutput(commandOutput);
      for (const data of parsedData) {
        // Extract model_name and protocol from the parsed data
        const cGate_name = data;

        // Push the model object into the array
        cGatesArray.push(cGate_name);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }

    return cGatesArray;
  }
  async getCgateByName(name) {
    const cgateObject = {};
    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand(
        `peldsp display_cgate -n '${name}'`
      );

      // Use parseCommandOutput to get parsed data
      const parsedData = service.parseCommandOutput(commandOutput);

      // Check if both model_name and protocol are present
      if (parsedData.length > 0) {
        parsedData.forEach((item) => {
          const [key, value] = item[0].split("=");

          // Check if key and value are present
          if (key !== undefined && value !== undefined) {
            cgateObject[key] = value;
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }
    return cgateObject;
  }
}
module.exports = cGateService;
