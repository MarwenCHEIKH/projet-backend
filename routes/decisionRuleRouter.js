const express = require("express");
const SSHService = require("../services/SSHService");
const DecisionRuleService = require("../services/DecisionRuleService");
const { decisionRuleCommands } = require("../commands/decisionRulecommands");

const router = express.Router();

const service = new SSHService();
const ruleService = new DecisionRuleService();

router.post("/create-rule", async (req, res) => {
  const formDataObject = req.body;
  // const rules  = await ruleService.getRules() ;
  const rules = ["rule1", "rule2", "rule3", "rule4", "rule5"];

  if (rules.find((m) => m == formDataObject.name)) {
    return res.status(400).json({ error: "decision rule name already used" });
  }
  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm create_decisionrule",
      decisionRuleCommands,
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

router.post("/update-rule", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_decisionrule",
      decisionRuleCommands,
      formDataObject
    );
    console.log(commandString);
    // await service.connect(serverConfig);
    // await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  //  finally {
  //   service.closeConnection();
  // }
});

router.post("/delete-rule", async (req, res) => {
  const formDataObject = req.body;
  console.log(formDataObject);

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_decisionrule ",
      decisionRuleCommands,
      formDataObject
    );
    console.log(commandString);
    // await service.connect(serverConfig);
    // await service.executeCommand(commandString);
    res
      .status(200)
      .json({ message: "Command executed successfully", commandString });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  //  finally {
  //   service.closeConnection();
  // }
});

router.get("/get-rules", async (req, res) => {
  // const rules  = await ruleService.getRules() ;
  const rules = ["rule1", "rule2", "rule3"];
  res.send(rules);
});
router.get("/get-rule", (req, res) => {
  const name = req.query.name;
  // ruleService.getRuleByName(name).then((ruleObject)=>{
  //   res.send(ruleObject)
  // });
  res.send({
    rd_name: `${name}`,
    rd_type_of_decisionrules: "XFER_CHANGE_STATE",
    rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
    rd_execution_type: "MODEL",
    rd_link_transfers: "Y",
    rd_model: "M_ADPGSI_TO_HQ_FR",
    rd_expression: "",
    rd_prop_list_name: "",
    rd_perl_script: "",
    rd_command_line: "",
    rd_xms_connector_out_name: "",
    rd_purge_model: "",
    rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
    rd_cond_2: "originator=ftp_adpgsi_fr",
    rd_cond_3: "protocol=FTP",
  });
});

router.get("/get-rules-details", (req, res) => {
  //  ruleService.getRulesDetails.then((ruleDetails) => {
  //   res.send(ruleDetails);
  //  });
  res.send([
    {
      rd_name: "ADPGSI_TO_HQ_FR_LOCAL",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "DIR_GED_01",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
      rd_cond_4: "direction=In",
    },
    {
      rd_name: "DIR_CSA_01",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "DIR_SDSIC_01",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "DIR_LVL_1",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FREQUENT_FLYER_AF_DIR_IN",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FREQUENT_FLYER_VA_DIRIN_H",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FREQUENT_FLYER_VA_DIRIN_I",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FREQUENT_FLYER_ET_DIR_IN",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FXFR0117_FRANCE_DIR_IN",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FROM_PSA_DIALOG_DIR",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FROM_SIXPAY_SFTP_DIR",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "FROM_ASIA_MILES",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
    {
      rd_name: "rule13",
      rd_type_of_decisionrules: "XFER_CHANGE_STATE",
      rd_comments: "FXFR0033 - LOCAL_TO_HQ_FR - 23JUN09",
      rd_execution_type: "MODEL",
      rd_link_transfers: "Y",
      rd_model: "M_ADPGSI_TO_HQ_FR",
      rd_expression: "",
      rd_prop_list_name: "",
      rd_perl_script: "",
      rd_command_line: "",
      rd_xms_connector_out_name: "",
      rd_purge_model: "",
      rd_cond_1: "dir_name=/ftp/HQAC/FR/ADPGSI/in",
      rd_cond_2: "originator=ftp_adpgsi_fr",
      rd_cond_3: "protocol=FTP",
    },
  ]);
});

module.exports = router;
