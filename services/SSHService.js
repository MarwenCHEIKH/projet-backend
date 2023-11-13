const Client = require("ssh2").Client;

class SSHService {
  constructor() {
    this.conn = new Client();
  }
  getServerConfig(environment) {
    // Define your server configurations here
    const uatConfig = {
      host: "uat-server-ip",
      port: 22,
      username: "your_uat_username",
      password: "your_uat_password",
    };

    const prodConfig = {
      host: "prod-server-ip",
      port: 22,
      username: "your_prod_username",
      password: "your_prod_password",
    };

    return environment === "UAT" ? uatConfig : prodConfig;
  }

  connect(config) {
    return new Promise((resolve, reject) => {
      this.conn.on("ready", () => {
        console.log("Connected to the remote server via SSH");
        resolve();
      });

      this.conn.on("error", (err) => {
        reject(err);
      });

      this.conn.connect(config);
    });
  }

  executeCommand(command) {
    return new Promise((resolve, reject) => {
      this.conn.exec(command, (err, stream) => {
        if (err) {
          reject(err);
          return;
        }

        let result = "";
        stream.on("data", (data) => {
          result += data.toString();
        });

        stream.on("end", () => {
          resolve(result);
        });

        stream.on("close", (code) => {
          if (code !== 0) {
            reject(`Command exited with code ${code}`);
          }
        });
      });
    });
  }

  parseCommandOutput(output) {
    const lines = output.split("\n");
    const parsedData = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        parsedData.push(trimmedLine.split(/\s+/));
      }
    }

    return parsedData;
  }
  generateCommand(comm, commobj, formData) {
    const commandParts = [];

    for (const key in formData) {
      if (key in commobj && formData[key] !== "") {
        const value = formData[key];
        const formattedValue = typeof value === "string" ? `"${value}"` : value;
        commandParts.push(`${commobj[key]} ${formattedValue}`);
      }
    }

    const command = `${comm} ${commandParts.join(" ")}`;
    return command;
  }

  closeConnection() {
    this.conn.end();
  }
}

module.exports = SSHService;
