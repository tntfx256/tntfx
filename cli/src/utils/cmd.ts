import { spawn } from "node:child_process";

type ExecConfig = {
  cwd?: string;
  interactive?: boolean;
};

export function exec(command: string, config?: ExecConfig): Promise<string> {
  const { interactive = false, cwd } = config || {};

  return new Promise<string>((resolve, reject) => {
    const [cmd, ...args] = command.split(/\s+/);

    const proc = spawn(cmd, args, { cwd });

    let error = "";
    let output = "";

    proc.stdout.on("data", (data) => {
      output += data;
      if (interactive) {
        process.stdout.write(data);
      }
    });

    proc.stderr.on("data", (data) => {
      error += data;
      if (interactive) {
        process.stderr.write(data);
      }
    });

    proc.on("close", () => {
      resolve(output);
    });
    proc.on("error", () => {
      reject(error);
    });
  });
}
