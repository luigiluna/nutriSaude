const mongoose = require('mongoose');
const Queue = mongoose.model('Queue');
const userMiddleware = require('./UserMiddleware');

mongoose.Promise = global.Promise;

exports.getQueue = async () => {
    const data = await Queue.find();

    await Promise.all(data.map (async (item) => {
        item.doctorName = await userMiddleware.getDoctorName(item.doctorKey);
    }));

    
    return data;

}

exports.getQueueByDate = async (date) => {
    const data = await Queue.find({date: date});
    return data;
    
}

exports.

getQueueById = async (id) => {
    const data = await Queue.find({id: id});
    return data;
    
}

exports.addQueue = async (queue, id) =>{
    queue.name = await capitalize(queue.name.toLowerCase());
    const data = new Queue(queue);
    data._id = id;
    await data.save();
    
}

exports.updateQueue = async (queue) => {
    await Queue.updateOne({_id: queue.id}, queue);
}


exports.deleteQueue = async (id) => {
    await Queue.deleteOne({_id: id});
}


async function capitalize(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
} 