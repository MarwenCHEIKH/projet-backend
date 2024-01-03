const SSHService = require("./SSHService");
const service = new SSHService();

class RuleService {
  async getRules() {
    const rulesArray = [];

    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand(
        "peldsp select_decisionrule"
      );

      // Use parseCommandOutput to get parsed data
      const parsedData = service.parseCommandOutput(commandOutput);

      // Iterate through each parsed line
      for (const data of parsedData) {
        // Check if both model_name and protocol are present
        if (data.length >= 1) {
          // Extract model_name and protocol from the parsed data
          const rule_name = data;

          // Push the model object into the array
          rulesArray.push(rule_name);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }

    return rulesArray;
  }
  async getRuleByName(name) {
    const ruleObject = {};
    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand(
        `peldsp display_decisionrule  -n '${name}'`
      );

      // Use parseCommandOutput to get parsed data
      const parsedData = service.parseCommandOutput(commandOutput);

      // Check if both model_name and protocol are present
      if (parsedData.length > 0) {
        parsedData.forEach((item) => {
          const [key, value] = item[0].split("=");

          // Check if key and value are present
          if (key !== undefined && value !== undefined) {
            ruleObject[key] = value;
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }
    return ruleObject;
  }
  async getRulesDetails() {
    const ruleDetails = [];
    const rules = await this.getRules();
    for (const rule of rules) {
      const details = await this.getRuleByName(rule.name);
      ruleDetails.push(details);
    }
    return ruleDetails;
  }
}

module.exports = RuleService;
