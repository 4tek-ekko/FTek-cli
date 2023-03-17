import {
  CommandResult,
  ErrorCodes,
  failure,
  help,
  AppCommand,
  shortName,
  longName,
  defaultValue,
  hasArg,
  success,
} from "../../util/commandline";
import { out } from "../../util/interaction";
import { getIpEn0 } from "../../util/react-native/ip-utils";
import { isPackagerRunning, startServer } from "../../util/react-native/react-native-utils";

@help("Start a Server app")
export default class StartAppCommand extends AppCommand {
  @help("Change server port when start default port 8181")
  @shortName("p")
  @longName("port")
  @defaultValue("8181")
  @hasArg
  public port: string;

  public async run(): Promise<CommandResult> {
    const host = getIpEn0();
    const result = await isPackagerRunning(host, this.port);
    if (result === "running") {
      return failure(ErrorCodes.Exception, "JS server already running.");
    } else if (result === "unrecognized") {
      return failure(ErrorCodes.Exception, "JS server not recognized, continuing with build...");
    } else {
      // result == 'not_running'
      out.text("Starting JS server...");
      try {
        await startServer(host, this.port);
        return success();
      } catch (error) {
        return failure(ErrorCodes.Exception, "Failed run app.");
      }
    }
  }
}
