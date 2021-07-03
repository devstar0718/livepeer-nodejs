const Livepeer = require('../src/livepeer');

console.log("**********     Testing Session...    **************");

const livepeerObject = new Livepeer('4ea227ff-e35e-4f12-8945-a4ae7973fa3f');

async function testGetAll(){
    const sessions = await livepeerObject.Session.getAll();
    for(const session of sessions){
        // console.log(session.id);
    }
}

async function testGet(){
    const session = await livepeerObject.Session.get('29cfbe24-6206-4590-b1e0-c05c0b676b2d');
    // console.log(session.sourceSegmentsDuration);
}

testGetAll();
testGet();
