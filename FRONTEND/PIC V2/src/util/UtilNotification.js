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
                    cName
                );
                break;
            case "secondary":
                NotificationManager.secondary(
                    tittle,
                    message,
                    3000,
                    null,
                    null,
                    cName
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
                    cName
                );
                break;
            case "warning":
                NotificationManager.warning(
                    tittle,
                    message,
                    3000,
                    null,
                    null,
                    cName
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
                    cName
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
