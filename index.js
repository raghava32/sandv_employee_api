
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');


var gv_var;


const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/svempdetails', (req, res) => {

    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMM_EMP_SRV_01/EmployeeSet?$format=json`);
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
              botResponse +=  JSONObj.d.results[i].Empid +" "+ JSONObj.d.results[i].Empname;  
			 
	           }
          } 
             
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


server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});
