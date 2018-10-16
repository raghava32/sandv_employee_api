const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');



const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/assetdata', (req, res) => {

   let botResponse ;
	//let cr_str;
 // const cr_sel = req.body.queryResult.queryText;
	const cr_sel = req.body.queryResult.parameters['number'];
       switch (cr_sel)  
    { 
	    case  '24':   //'pending cr': 
	    //cr_str = "'" + cr_sel + "'";
		 var cr_str = "'" + pend + "'";
           botResponse = 'Pending Changerequest : ';
           break; 
       case 'priority cr': 
		    cr_str = "'" + cr_sel + "'";
           botResponse = 'Priority Changerequest : ';
           break; 
       case 'latest cr': 
		    cr_str = "'" + cr_sel + "'";
           botResponse = 'Latest Changerequest : ';
           break; 
	   case 'over due cr': 
		    cr_str = "'" + cr_sel + "'";
           botResponse = 'Over Due cr Changerequest : ';
           break; 
       default: 
           botResponse = 'Changerequest : ';
    }  


		
   
    const reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq ${cr_str}&$format=json`);
	///sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pending cr'&$format=json
	//const reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pending cr'&$format=json`);
		
	console.log(reqUrl);
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
			
            
        });
        responseFromAPI.on('end', () => {
            var JSONObj = JSON.parse(completeResponse);        
	     
          if (JSONObj.d.results.length > 0) 
          {
			 
            		
            for (var i = 0; i < JSONObj.d.results.length; i++) 
            {
            botResponse += " ";
              botResponse +=  JSONObj.d.results[i].UsmdCrequest +" "+" .";  
			  
	           }
          } 
             console.log(botResponse);
            return res.json({
                speech: botResponse,//dataToSend,
                displayText: botResponse,
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
