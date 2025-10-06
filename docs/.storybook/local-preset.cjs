/** loads built addon */
const path = require("path");

function previewAnnotations(entry = []) {
  const previewPath = path.resolve(__dirname, "../../dist/preview.js");
  return [...entry, previewPath];
}

function managerEntries(entry = []) {
  const managerPath = path.resolve(__dirname, "../../dist/manager.js");
  return [...entry, managerPath];
}

module.exports = {
  managerEntries,
  previewAnnotations,
};
