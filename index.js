const Livepeer = require('./src/livepeer');

const livepeerObject = new Livepeer('4ea227ff-e35e-4f12-8945-a4ae7973fa3f');

console.log("Starting...");

livepeerObject.Stream.create(
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
    }).then((stream) => {
    console.log(stream.data.id);
});

