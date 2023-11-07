const createDircomm = {
  alias: "-a",
  comments: "-cts",
  dir_path: "-dp",
  mount_point: "-mp",
  mount_dir_path: "-mdp",
  user_attribute: "-ua",
  mailbox_recording: "-mr",
  filename_display_option: "-fdo",
  filename_duplicate_policy: "-fdp",
};
const updateDircomm = {
  alias: "-a",
  new_alias: "-na",
  comments: "-cts",
  dir_path: "-dp",
  mount_Point: "-mp",
  mount_dir_path: "-mdp",
  user_attribute: "-ua",
  mailbox_recording_option: "-mr",
  filename_display_option: "-fdo",
  filename_duplicate_policy: "-fdp",
};
const moveDircomm = {
  alias: "-a",
  new_dir_path: "-ndp",
  dir_path: "-dp",
};
const deleteDircomm = {
  alias: "-a",
  dir_path: "-dp",
};

module.exports = {
  createDircomm,
  updateDircomm,
  moveDircomm,
};
