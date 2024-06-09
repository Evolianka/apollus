declare module "*.scss";

declare global {
  interface Window {
    SERVER_STATUS: {
      code: number;
      message: string;
      success: boolean;
    };
  }

  namespace NodeJs {
    interface ProcessEnv {
      ROOT_DIR: string;
      MODE: "development" | "production";
      BUILD_TARGET: string;
    }
  }
}
