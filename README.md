## pushbullet-node-server

Simple node web server to do simple pushbullet api calls from the web. 

### Supported URIs:

#### GET
- `/pushbullet` -- returns status info
- `/pushbullet/devices` -- returns list of active devices
- `/pushbullet/test` -- sends test message to self

#### POST
- `/pushbullet` -- sends message. 
 - consumes json (title, message, device).
 - if no device is provided, calls default device

### Installation
- Copy pushbullet-example.env to pushbullet.env
- fill in the apikey from your pushbullet account ([link](https://docs.pushbullet.com/#api-quick-start))
- fill in the device id ([link](https://github.com/alexwhitman/node-pushbullet-api#target-devices))
- run start.sh `./start.sh 2727`

### Test curl
```
curl -H "Content-Type: application/json" -X POST -d '{"title":"test","message":"hi there"}' http://localhost:2727/pushbullet/
```