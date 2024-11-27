const admin = require('../utils/firebase');


const sendNotification = async (deviceToken, title, body) => {
    const message = {
        notification: {
            title,
            body,
        },
        token: deviceToken,
    };
    try {
        const response = await admin.messaging().send(message);
        return response;
    } catch (error) {
        throw error
    }
}

module.exports = { sendNotification };