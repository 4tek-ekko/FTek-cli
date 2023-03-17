// Base class for all command handlers
import * as Result from "./command-result";
import { shortName, longName, help, getOptionsDescription, getPositionalOptionsDescription, common } from "./option-decorators";
import { parseOptions, OptionsDescription } from "./option-parser";
import { OutputFormatSupport, setFormatJson, out } from "../interaction";
import { scriptName } from "../misc";
import * as path from "path";
import { runHelp } from "./help";

const debug = require("debug")("appcenter-cli:util:commandline:command");

export interface CommandArgs {
  command: string[];
  commandPath: string;
  args: string[];
}

export class Command {
  constructor(args: CommandArgs) {
    const proto = Object.getPrototypeOf(this);
    const flags = getOptionsDescription(proto);
    const positionals = getPositionalOptionsDescription(proto);
    parseOptions(flags, positionals, this, args.args);
    this.commandPath = args.commandPath;
    this.command = args.command;
    this.commandOptions = flags;
    debug(`Starting command with path ${args.commandPath}, command ${args.command}`);
  }

  protected commandOptions: OptionsDescription;
  // Used by help system to generate help messages
  protected command: string[];
  protected commandPath: string;

  // Additional output formats (except "list" which is used by default) which are supported by this command
  protected readonly additionalSupportedOutputFormats: OutputFormatSupport = {
    json: setFormatJson,
  };

  // Default arguments supported by every command

  @shortName("h")
  @longName("help")
  @help("Display help for current command")
  @common
  public help: boolean;

  @shortName("v")
  @longName("version")
  @help(`Display ${scriptName} version`)
  @common
  public version: boolean;

  // Entry point for runner. DO NOT override in command definition!
  async execute(): Promise<Result.CommandResult> {
    debug(`Initial execution of command`);
    if (this.help) {
      debug(`help switch detected, displaying help for command`);
      runHelp(Object.getPrototypeOf(this), this);
      return Result.success();
    }
    return this.run();
  }

  // Entry point for command author - override this!
  protected run(): Promise<Result.CommandResult> {
    throw new Error("Dev error, should be overridden!");
  }

  protected showVersion(): Result.CommandResult {
    out.text((s) => s, `${scriptName} version ${this.getVersion()}`);
    return Result.success();
  }

  protected getVersion(): string {
    const packageJsonPath = path.join(__dirname, "../../../package.json");
    // eslint-disable-next-line security/detect-non-literal-require
    const packageJson: any = require(packageJsonPath);
    return packageJson.version;
  }

  protected fixArrayParameter(input: any): string[] {
    if (!input) {
      return [];
    } else if (typeof input === "string") {
      return [input];
    }

    return input;
  }
}
