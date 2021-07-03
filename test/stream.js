const Livepeer = require('../src/livepeer');

console.log("Testing Stream...");

const livepeerObject = new Livepeer('4ea227ff-e35e-4f12-8945-a4ae7973fa3f');

async function testCreate(){
    const stream = await livepeerObject.Stream.create(
        {
            'name': 'test_stream',
            'profiles': [
                {
                    'name': '720p',
                    'bitrate': 2000000,
                    'fps': 30,
                    'width': 1280,
                    'height': 720
                },
                {
                    'name': '480p',
                    'bitrate': 1000000,
                    'fps': 30,
                    'width': 854,
                    'height': 480
                },
                {
                    'name': '36p',
                    'bitrate': 500000,
                    'fps': 30,
                    'width': 640,
                    'height': 360
                },
            ]
        });
    console.log(stream.id);
}

async function testGetAll(){
    const streams = await livepeerObject.Stream.getAll(1 );
    for(const stream of streams){
        console.log(stream.id);
    }
}

async function testGet(){
    const stream = await livepeerObject.Stream.get('29cf8929-665c-4280-a080-d00e483a9473');
    console.log(stream.id);
}

async function testRecord(){
    const stream = await livepeerObject.Stream.get('29cf8929-665c-4280-a080-d00e483a9473');
    stream.record(false);
}

// testCreate();
// testGet();
// testGetAll();
testRecord();
