const express = require("express");
const SSHService = require("../services/SSHService");
const { cGateCommands } = require("../commands/cGateCommands");
const CGateService = require("../services/CGateService");
const router = express.Router();

const service = new SSHService();
const cGateservice = new CGateService();

router.post("/create-cGate", async (req, res) => {
  const formDataObject = req.body;
  console.log(formDataObject);

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm create_cgate",
      cGateCommands,
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
router.post("/update-cGate", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_cgate",
      cGateCommands,
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
router.post("/delete-cGate", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_cgate",
      cGateCommands,
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

router.get("/get-cGates", async (req, res) => {
  // const cGates = await cGateservice.getcGates();
  const cGates = [
    "GAS2",
    "GAS3",
    "GCHECK",
    "GETEBAC3",
    "GETEBAC5",
    "GFTP",
    "GHTTP",
    "GODETTE",
    "GPEL",
    "GPHSD",
    "GPHSE",
    "GRN_HTTP",
    "GSFTP",
    "GSFTP_FRANCHISEES",
    "GSFTP_POCSOC",
    "LOOP_FTP",
    "LOOP_PHSE",
    "SFTP_TEST",
  ];
  res.send(cGates);
});
router.get("/get-cgateDetails", async (req, res) => {
  const name = req.query.name;
  //  const cgateDetails  = await cgateService.getCgateByName(name) ;
  const cgateDetails = {
    cg_name: `${name}`,
    cg_comments: "",
    cg_state: "E",
    cg_parent_group: "GROUP",
    cg_login_user: "*",
    cg_login_password: "",
    cg_change_password_option: "A",
    cg_client_ident: "*",
    cg_client_password: "",
    cg_server_ident: "*",
    cg_tls_sprof: "",
    cg_tls_client_auth: "N",
    cg_tls_sprof_user_param: "",
    cg_root_dir: "",
    cg_home_dir: "",
    cg_http_home_page: "",
    cg_http_list_template: "",
    cg_server_password: "",
    cg_user_param1_1: "g1",
    cg_user_param1_2: "g2",
    cg_user_param1_3: "g3",
    cg_rights_nb: "2",
    cg_path_1: "/",
    cg_file_pattern_1: "",
    cg_subdir_inheritance_1: "N",
    cg_file_rights_1: "RW",
    cg_dir_rights_1: "LC",
    cg_path_2: "/ftp",
    cg_file_pattern_2: "*.*",
    cg_subdir_inheritance_2: "Y",
    cg_file_rights_2: "RW",
    cg_dir_rights_2: "L",
  };
  res.send(cgateDetails);
});

module.exports = router;
