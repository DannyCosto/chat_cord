const moment = require('moment')
//formats message string to object
function formatMessage(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;