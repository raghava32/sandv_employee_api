const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');



const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/assetdata', (req, res) => {

   let botResponse = " ";
	let reqUrl = "";
	let bt_resp = "";
const numb = req.body.result.parameters;
	const num = numb["crdata"]
	console.log(num);
 switch(num) {
	 case "cr data":
	bt_resp = "please specifiy which type of cr data looking for. pending cr, latest cr, over due cr or priority cr";
	reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pend'&$format=json`);          
		 break;
	 case "cr details":
	bt_resp = "please specifiy which type of cr data looking for. pending cr, latest cr, over due cr or priority cr";
    	reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pend'&$format=json`);          
		 break;
    case "pending cr":
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pend'&$format=json`);          
         break;
    case "latest cr":
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'late'&$format=json`);   
        break;
    case "over due cr":
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'over'&$format=json`);   
        break;	
    case "priority cr":
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'prio'&$format=json`);   
        break;			
}

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
		
		
             if (botResponse.length < 0)
	     {		    		      
		     botResponse = "no data found for the request";
	     }
		  if (bt_resp.length > 1){
		     botResponse = bt_resp;  
		      }
		console.log(botResponse);
            return res.json(
		    {
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "Simple Response"
            }
          },
          {
            "tableCard": {
              "title": "Table Title",
              "subtitle": "Table Subtitle",
              "image": {
                "url": "https://avatars0.githubusercontent.com/u/23533486",
                "accessibilityText": "Actions on Google"
              },
              "rows": [
                {
                  "cells": [
                    {
                      "text": "row 1 item 1"
                    },
                    {
                      "text": "row 1 item 2"
                    },
                    {
                      "text": "row 1 item 3"
                    }
                  ],
                  "dividerAfter": false
                },
                {
                  "cells": [
                    {
                      "text": "row 2 item 1"
                    },
                    {
                      "text": "row 2 item 2"
                    },
                    {
                      "text": "row 2 item 3"
                    }
                  ],
                  "dividerAfter": true
                },
                {
                  "cells": [
                    {
                      "text": "row 2 item 1"
                    },
                    {
                      "text": "row 2 item 2"
                    },
                    {
                      "text": "row 2 item 3"
                    }
                  ]
                }
              ],
              "columnProperties": [
                {
                  "header": "header 1",
                  "horizontalAlignment": "CENTER"
                },
                {
                  "header": "header 2",
                  "horizontalAlignment": "LEADING"
                },
                {
                  "header": "header 3",
                  "horizontalAlignment": "TRAILING"
                }
              ],
              "buttons": [
                {
                  "title": "Button Title",
                  "openUrlAction": {
                    "url": "https://github.com/actions-on-google"
                  }
                }
              ]
            }
          }
        ]
      },
      "userStorage": "{\"data\":{}}"
    }
  }
}
		    
		    
		    
		    
           );
		    
		    
		    
		    
	    
	    
	  
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
