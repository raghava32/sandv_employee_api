
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');



const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/svempdetails', (req, res) => {

    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
//const reqUrl = encodeURI(`http://10.242.212.80:8000/sap/opu/odata/SAP/ZMDG_FIAA_ASSET_SRV/CRequestSet?$format=json`);
	var reqUrl = {
  "hostname": "10.242.212.80",
  "port": "8000",
  "path": "/sap/opu/odata/SAP/ZMDG_FIAA_ASSET_SRV/CRequestSet?%24format=json",
  "headers": {
    "authorization": "Basic cm5pbW1hbGE6Um5pbW1hbGEyMDE5",
    "cache-control": "no-cache",
    "postman-token": "ac62da90-fcb3-6766-cf2e-bf1d12ffae07"
  }
};

	
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
            
        });
        responseFromAPI.on('end', () => {
            var JSONObj = JSON.parse(completeResponse);
        
		
            let botResponse ;
            /// = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
         var JSONObj = JSON.parse(completeResponse);
	     
          if (JSONObj.d.results.length > 0) 
          {
            botResponse = "Employee Data :"
			
            for (var i = 0; i < JSONObj.d.results.length; i++) 
            {
            botResponse += " ";
              botResponse +=  "ChangeReq:-"+JSONObj.d.results[i].UsmdCrequest +" ,UsmdCreqType:- "+ JSONObj.d.results[i].UsmdCreqType +" .";  
		        				 
	           }
          } 
            console.log(botResponse) 
            return res.json({
                speech: botResponse,//dataToSend,
                displayText: botResponse,
                source: 'get-Employee-details'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-Employee-details'
        });
    });
});


server.listen((process.env.PORT || 3000), () => {
    console.log("Server is up and running...");
});
