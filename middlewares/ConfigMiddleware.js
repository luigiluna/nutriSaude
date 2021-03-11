var settingsData = require('../settings');
const fs = require('fs');

exports.getAll = async () =>{
    return settingsData;
}

exports.save = (config) => {
    settingsData = JSON.parse(JSON.stringify(config));
    console.log('save', settingsData);
    savePatients();
}




function savePatients(){

    fs.writeFile('./settings.js', 
    `module.exports = ${JSON.stringify(settingsData)}`,{flag: 'w'}, function (err) {
        if (err) throw err;
       
    });

}
