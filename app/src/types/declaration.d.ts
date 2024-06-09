declare module "*.scss";

interface Window {
    SERVER_STATUS: {
        code: number;
        message: string;
        success: boolean;
    }
}