const SSHService = require("../services/SSHService");
const service = new SSHService();

function filterEmptyAttributes(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Only include non-empty attributes in the new object
    if (value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
}

function generateCommand(comm, commobj, formData) {
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
async function getModels() {
  const modelsArray = [];

  try {
    // Connect to the SSH server using the UAT configuration
    await service.connect(service.getServerConfig("UAT"));

    // Execute the command and get the output
    const commandOutput = await service.executeCommand("peldsp select_model");

    // Use parseCommandOutput to get parsed data
    const parsedData = service.parseCommandOutput(commandOutput);

    // Iterate through each parsed line
    for (const data of parsedData) {
      // Check if both model_name and protocol are present
      if (data.length >= 2) {
        // Extract model_name and protocol from the parsed data
        const [model_name, protocol] = data;

        // Push the model object into the array
        modelsArray.push({ model_name, protocol });
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the SSH connection
    service.closeConnection();
  }

  return modelsArray;
}

module.exports = { filterEmptyAttributes, generateCommand, getModels };
