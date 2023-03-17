import * as childProcess from "child_process";
const path = require("path");

export function startServerInNewWindow(host: string, port: string, fileScript: string) {
  const root = path.join(__dirname, "../dist/scripts");
  const scriptFile = "launchServer.command";
  try {
    return childProcess.spawn("open", ["-a", "terminal", path.join(root, scriptFile)]);
  } catch (error) {
    return childProcess.spawn("open");
  }
}
