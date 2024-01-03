const SSHService = require("./SSHService");
const service = new SSHService();

class RuleTableService {
  async getRuleTables() {
    const ruleTablesArray = [];

    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand(
        "peldsp select_ruletable -type 'XFER_CHANGE_STATE'"
      );
      // Use parseCommandOutput to get parsed data
      const parsedData = service.parseCommandOutput(commandOutput);
      // Iterate through each parsed line
      for (const data of parsedData) {
        if (data.length >= 1) {
          const table_name = data;
          ruleTablesArray.push(table_name);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }

    return ruleTablesArray;
  }
  async getTableByName(name) {
    const tableObject = {};
    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand(
        `peldsp display_ruletable -n '${name}'`
      );

      // Use parseCommandOutput to get parsed data
      const parsedData = service.parseCommandOutput(commandOutput);

      // Check if both model_name and protocol are present
      if (parsedData.length > 0) {
        parsedData.forEach((item) => {
          const [key, value] = item[0].split("=");

          // Check if key and value are present
          if (key !== undefined && value !== undefined) {
            tableObject[key] = value;
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }
    return tableObject;
  }
}
module.exports = RuleTableService;
