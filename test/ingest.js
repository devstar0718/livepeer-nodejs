const Livepeer = require('../src/livepeer');

console.log("**********     Testing Ingest...    ***************");

const livepeerObject = new Livepeer('4ea227ff-e35e-4f12-8945-a4ae7973fa3f');

async function testGetAll(){
    const ingests = await livepeerObject.Ingest.getAll();
    for(const ingest of ingests){
        // console.log(ingest.playback);
    }
}

async function testGetClosest(){
    const ingest = await livepeerObject.Ingest.getClosest();
    // console.log(ingest.playback);
}

testGetAll();
testGetClosest();
