import { NotificationManager } from "../components/common/react-notifications";

function createNotification(type, className, tittle, message) {
    let cName = className || "";
    return () => {
        switch (type) {
            case "primary":
                NotificationManager.primary(
                    tittle,
                    message,
                    3000,
                    null,
                    null,
                    'filled'
                );
                break;
            case "secondary":
                NotificationManager.secondary(
                    tittle,
                    message,
                    3000,
                    null,
                    null,
                    'filled'
                );
                break;
            case "info":
                NotificationManager.info("Info message", "", 3000, null, null, cName);
                break;
            case "success":
                NotificationManager.success(
                    tittle,
                    message,
                    3000,
                    null,
                    null,
                    'filled'
                );
                break;
            case "warning":
                NotificationManager.warning(
                    tittle,
                    message,
                    3000,
                    null,
                    null,
                    'filled'
                );
                break;
            case "error":
                NotificationManager.error(
                    tittle,
                    message,
                    5000,
                    () => {
                        alert("callback");
                    },
                    null,
                    'filled'
                );
                break;
            default:
                NotificationManager.info("Info message");
                break;
        }
    };
}


module.exports = {
    createNotification: createNotification
};
