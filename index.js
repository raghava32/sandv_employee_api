const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');



const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/asset', (req, res) => {

 //const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI('http://80.227.35.222:50000/sap/opu/odata/SAP/ZMM_EMP_SRV_01/CRequestSet?$format=json');
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
            
        });
        responseFromAPI.on('end', () => {
            var JSONObj = JSON.parse(completeResponse);

			//////////////////////
		
		//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}


var js = JSON.parse(completeResponse);

//grabbing objects that match some key and value in JSON
//console.log(getObjects(js, 'Empid','5'));
//console.log(getObjects(js, 'UsmdCreqText','demo sv check notes'));


let cr_response;
let reqparams;

 reqparams = req.body.queryResult;
console.log(reqparams);
if  ((req.body.queryResult.parameters['CR_Details']) == "Pending CR");{
	
   cr_response =  getObjects(js, 'UsmdCreqStatus','04');
}
elseif ((req.body.queryResult.parameters['CR_Details']) == "Priority CR");{
cr_response =  getObjects(js, 'UsmdPriority','01');
}
elseif ((req.body.queryResult.parameters['CR_Details']) == "Latest CR");{
cr_response =  getObjects(js, 'UsmdPriority','01');
}


//var name = cr_response[1];
//returns 1 object where a key names ID has the value SGML



console.log(cr_response.length);
  
let text;
 text = "USMD CRequest :- ";
for (let l = 0; l < cr_response.length; l++) {

 text += "  " + cr_response[l].UsmdCrequest + ". ";
   //text += " USMD CRequestSet :- " + cr_response[l].UsmdCrequest + ", ";
}  


            return res.json({
                speech: text,//dataToSend,
                displayText: text,
                source: 'webhook-echo-sample'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'webhook-echo-sample'
        });
    });
});


server.listen((process.env.PORT || 3000), () => {
    console.log("Server is up and running...");
});
