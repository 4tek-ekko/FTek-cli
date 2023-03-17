import {
  CommandResult,
  ErrorCodes,
  failure,
  help,
  AppCommand,
  shortName,
  longName,
  hasArg,
  defaultValue,
  success,
  CommandArgs,
} from "../../util/commandline";
import { out } from "../../util/interaction";
import { getIpEn0 } from "../../util/react-native/ip-utils";
import { isPackagerRunning, runReactNativeBundleCommand } from "../../util/react-native/react-native-utils";
import { startServerInNewWindow } from "../../util/react-native/server-new-windown";
import * as path from "path";

@help("Run a React Native app")
export default class RunAppCommand extends AppCommand {
  @help("Specifies whether to generate a dev or release build")
  @longName("development")
  public development: boolean;

  @help('Path to the app\'s entry JavaScript file. If omitted, "index.<platform>.js" and then "index.js" will be used (if they exist)')
  @shortName("e")
  @longName("entry-file")
  @defaultValue("./index.js")
  @hasArg
  public entryFile: string;

  @help("Platform when build app react native, default platform ios")
  @shortName("p")
  @longName("platform")
  @defaultValue("ios")
  @hasArg
  public platform: string;

  @help("Change server port when start default port 8181")
  @shortName("p")
  @longName("port")
  @defaultValue("8181")
  @hasArg
  public port: string;

  constructor(args: CommandArgs) {
    super(args);
  }

  public async run(): Promise<CommandResult> {
    const host = getIpEn0();
    const result = await isPackagerRunning(host, this.port);
    if (result === "not_running") {
      out.text("Starting JS server...");
      try {
        const fileScript = path.join(__dirname, "start.js");
        startServerInNewWindow(host, this.port, fileScript);
        await runReactNativeBundleCommand(this.platform, this.development, this.entryFile);
        return success();
      } catch (error) {
        return failure(ErrorCodes.Exception, "Failed run app.");
      }
    }
  }
}
