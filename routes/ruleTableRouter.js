const express = require("express");
const SSHService = require("../services/SSHService");
const { ruleTableCommands } = require("../commands/ruleTableCommands");
const RuleTableService = require("../services/RuleTableService");
const router = express.Router();

const service = new SSHService();
const ruleTableService = new RuleTableService();

router.post("/create-table", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm create_ruletable",
      ruleTableCommands,
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
router.post("/update-table", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm update_ruletable",
      ruleTableCommands,
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
router.post("/delete-table", async (req, res) => {
  const formDataObject = req.body;

  try {
    const env = formDataObject["env"];
    const serverConfig = service.getServerConfig(env);
    const commandString = service.generateCommand(
      "peladm delete_ruletable",
      ruleTableCommands,
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
router.get("/get-tables", async (req, res) => {
  // const ruleTables  = await ruleTableService.getRuleTables() ;
  const ruleTables = ["DIR_ENDED", "DOWNLOAD_ENDED", "FXFR0268_NPS_FIX_MEXICO"];
  res.send(ruleTables);
});
router.get("/get-tableDetails", async (req, res) => {
  const name = req.query.name;
  //  const ruleTableDetails  = await ruleTableService.getTableByName(name) ;
  const ruleTableDetails = {
    rt_name: `${name}`,
    rt_status: "ACTIVE",
    rt_type_of_rules_table: "XFER_CHANGE_STATE",
    rt_default_execution_type: "NONE",
    rt_link_transfers: "Y",
    rt_comments: "",
    rt_default_model: "",
    rt_default_perl_script: "",
    rt_default_command_line: "",
    rt_decisionrule_1: "DIR_GED_01",
    rt_decisionrule_2: "DIR_CSA_01",
    rt_decisionrule_3: "DIR_SDSIC_01",
    rt_decisionrule_4: "DIR_LVL_1",
    rt_decisionrule_5: "FREQUENT_FLYER_AF_DIR_IN",
    rt_decisionrule_6: "FREQUENT_FLYER_VA_DIRIN_H",
    rt_decisionrule_7: "FREQUENT_FLYER_VA_DIRIN_I",
    rt_decisionrule_8: "FREQUENT_FLYER_ET_DIR_IN",
    rt_decisionrule_9: "FXFR0117_FRANCE_DIR_IN",
    rt_decisionrule_10: "FROM_PSA_DIALOG_DIR",
    rt_decisionrule_11: "FROM_SIXPAY_SFTP_DIR",
    rt_decisionrule_12: "FROM_ASIA_MILES",
    rt_restrict_processing: "Y",
    rt_restrict_processing_on_state: "ENDED",
    rt_restrict_processing_on_direction: "",
    rt_restrict_processing_on_type: "DIR",
    rt_restrict_processing_on_mode: "",
    rt_restrict_processing_on_protocol: "",
    rt_log_level: "2",
    rt_is_rules_table_exclusive: "Y",
    rt_is_user_exits_activated: "Y",
    rt_default_purge_model: "",
  };
  res.send(ruleTableDetails);
});
module.exports = router;
