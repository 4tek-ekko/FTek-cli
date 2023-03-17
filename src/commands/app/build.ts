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
import { buildReactNativeBundle } from "../../util/react-native/react-native-utils";

@help("Build a react native app")
export default class BuildAppCommand extends AppCommand {
  @help("Specifies whether to generate a dev or release build")
  @longName("development")
  public development: boolean;

  @help("Platform when build app react native, default platform ios")
  @shortName("p")
  @longName("platform")
  @defaultValue("ios")
  @hasArg
  public platform: string;

  public async run(): Promise<CommandResult> {
    try {
      await buildReactNativeBundle(this.platform, this.development);
      return success();
    } catch (error) {
      return failure(ErrorCodes.Exception, "Failed build app.");
    }
  }
}
