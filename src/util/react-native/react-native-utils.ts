import * as childProcess from "child_process";
import { out } from "../../util/interaction";
import * as path from "path";
import nodeFetch, { RequestInit as FetchOptions, Response, Request, Headers } from "node-fetch";

function getCliPath(): string {
  if (process.platform === "win32") {
    return path.join("node_modules", "react-native", "local-cli", "cli.js");
  }

  return path.join("node_modules", ".bin", "react-native");
}

function getCliPathWebpack(): string {
  if (process.platform === "win32") {
    return path.join("node_modules", "webpack", "local-cli", "cli.js");
  }

  return path.join("node_modules", ".bin", "webpack");
}

export function runReactNativeBundleCommand(platform: string, development: boolean, entryFile: string): Promise<void> {
  const reactNativeBundleArgs: string[] = [
    getCliPath(),
    "webpack-bundle",
    "--platform",
    platform,
    "--entry-file",
    "./index.js",
    "--dev",
  ];
  Array.prototype.push.apply(reactNativeBundleArgs, reactNativeBundleArgs);
  const reactNativeBundleProcess = childProcess.spawn("node", reactNativeBundleArgs);
  out.text(`node ${reactNativeBundleArgs}`);

  return new Promise<void>((resolve, reject) => {
    reactNativeBundleProcess.stdout.on("data", (data: Buffer) => {
      out.text(data.toString().trim());
    });

    reactNativeBundleProcess.stderr.on("data", (data: Buffer) => {
      console.error(data.toString().trim());
    });

    reactNativeBundleProcess.on("close", (exitCode: number, signal: string) => {
      if (exitCode !== 0) {
        reject(new Error(`command failed (exitCode=${exitCode}, signal=${signal}).`));
      }

      resolve(null as void);
    });
  });
}

export function startServer(host: string, port: string): Promise<void> {
  const reactNativeBundleArgs: string[] = [];
  Array.prototype.push.apply(reactNativeBundleArgs, [getCliPath(), "webpack-start", "--port", port, "--host", host]);
  const reactNativeBundleProcess = childProcess.spawn("node", reactNativeBundleArgs);
  out.text(`node ${reactNativeBundleArgs}`);

  return new Promise<void>((resolve, reject) => {
    reactNativeBundleProcess.stdout.on("data", (data: Buffer) => {
      out.text(data.toString().trim());
    });

    reactNativeBundleProcess.stderr.on("data", (data: Buffer) => {
      console.error(data.toString().trim());
    });

    reactNativeBundleProcess.on("close", (exitCode: number, signal: string) => {
      if (exitCode !== 0) {
        reject(new Error(`command failed (exitCode=${exitCode}, signal=${signal}).`));
      }

      resolve(null as void);
    });
  });
}

export function buildReactNativeBundle(platform: string, development: boolean): Promise<void> {
  const reactNativeBundleArgs: string[] = [
    getCliPathWebpack(),
    "-c",
    "webpack.config.mjs",
    "--env",
    `platform=${platform}`,
    "--env",
    `mode=${development ? "development" : "production"}`,
  ];
  Array.prototype.push.apply(reactNativeBundleArgs, reactNativeBundleArgs);
  const reactNativeBundleProcess = childProcess.spawn("node", reactNativeBundleArgs);
  out.text(`node ${reactNativeBundleArgs}`);

  return new Promise<void>((resolve, reject) => {
    reactNativeBundleProcess.stdout.on("data", (data: Buffer) => {
      out.text(data.toString().trim());
    });

    reactNativeBundleProcess.stderr.on("data", (data: Buffer) => {
      console.error(data.toString().trim());
    });

    reactNativeBundleProcess.on("close", (exitCode: number, signal: string) => {
      if (exitCode !== 0) {
        reject(new Error(`command failed (exitCode=${exitCode}, signal=${signal}).`));
      }

      resolve(null as void);
    });
  });
}

export function initReactNativeMiniApp(appName: string, containerName: string, scriptName: string): Promise<void> {
  // const reactNativeBundleArgs: string[] = [getCliPath(), "init", appName];
  // Array.prototype.push.apply(reactNativeBundleArgs, reactNativeBundleArgs);
  // const initReactNativeMiniAppProcess = childProcess.spawn("node", reactNativeBundleArgs);
  out.text(`node ${appName}} ${process.cwd()} ${containerName} ${scriptName}`);

  return new Promise<void>((resolve, reject) => {
    // initReactNativeMiniAppProcess.stdout.on("data", (data: Buffer) => {
    //   out.text(data.toString().trim());
    // });

    // initReactNativeMiniAppProcess.stderr.on("data", (data: Buffer) => {
    //   console.error(data.toString().trim());
    // });

    // initReactNativeMiniAppProcess.on("close", (exitCode: number, signal: string) => {
    //   if (exitCode !== 0) {
    //     reject(new Error(`command failed (exitCode=${exitCode}, signal=${signal}).`));
    //   }
    //   resolve(null as void);
    // });
    resolve(null as void);
  });
}

export async function isPackagerRunning(
  host: string,
  packagerPort: string | "8181"
): Promise<"running" | "not_running" | "unrecognized"> {
  try {
    const { data } = await fetch(`http://${host}:${packagerPort}/status`);

    return data === "packager-status:running" ? "running" : "unrecognized";
  } catch (_error) {
    return "not_running";
  }
}

const fetch = async (url: string | Request, options?: FetchOptions): Promise<{ status: number; data: any; headers: Headers }> => {
  const result = await nodeFetch(url, options);
  const data = await unwrapFetchResult(result);

  if (result.status >= 400) {
    throw {
      message: `Fetch request failed with status ${result.status}: ${data}.`,
    };
  }

  return {
    status: result.status,
    headers: result.headers,
    data,
  };
};

async function unwrapFetchResult(response: Response) {
  const data = await response.text();

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}
