import chalk from "chalk";

import SERVER from "@root//config/server.config";

const logger = {
  error: (...arguments_: unknown[]) => {
    console.log(chalk.hex(SERVER.colors.error)(...arguments_));
  },

  info: (...arguments_: unknown[]) => {
    console.log(chalk.hex(SERVER.colors.info)(...arguments_));
  },

  success: (...arguments_: unknown[]) => {
    console.log(chalk.hex(SERVER.colors.success)(...arguments_));
  },
};

export default logger;
