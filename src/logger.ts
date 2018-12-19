import chalk from "chalk";

export function logErrors(message: string, data?: string) {
  let error;

  if (!data) {
    error = message;
  } else {
    const shouldBreakLine = message.length + data.length > 80;
    const errorParts = [`${message}:`, chalk.yellow(data)];
    error = shouldBreakLine ? errorParts.join("\n") : errorParts.join(" ");
  }

  console.error(`${error}\n`);
}
