const SSHService = require("./SSHService");
const service = new SSHService();

class SiteService {
  async getLocsites() {
    const sitesArray = [];

    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand(
        "peldsp select_loc_site"
      );

      const parsedData = service.parseCommandOutput(commandOutput);
      // Iterate through each parsed line
      for (const data of parsedData) {
        if (data.length >= 1) {
          const site_alias = data;
          sitesArray.push(site_alias);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }

    return sitesArray;
  }

  async getRemotesites() {
    const sitesArray = [];

    try {
      // Connect to the SSH server using the UAT configuration
      await service.connect(service.getServerConfig("UAT"));

      const commandOutput = await service.executeCommand("peldsp select_site");

      const parsedData = service.parseCommandOutput(commandOutput);
      // Iterate through each parsed line
      for (const data of parsedData) {
        if (data.length >= 1) {
          const site_alias = data;
          sitesArray.push(site_alias);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SSH connection
      service.closeConnection();
    }

    return sitesArray;
  }
}
module.exports = SiteService;
