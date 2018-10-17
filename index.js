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
              "Speech": botResponse
            }
          },
          {
            
		  {
  "tableCard": {
    "title": "AoG Table Card title",
    "subtitle": "AoG Table Card subtitle",
    "image": {
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvxkmJ-Iqk6VBfbUUxsoeY9BoVJJOgwJ0cF0UdV5CEhHgs6YW",
      "accessibilityText": botResponse
    },
    "columnProperties": [
      {
        "header": "Header 1"
      },
      {
        "header": "Header 2",
        "horizontalAlignment": "CENTER"
      },
      {
        "header": "Header 3",
        "horizontalAlignment": "CENTER"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "text": "Cell A1"
          },
          {
            "text": "Cell A2"
          },
          {
            "text": "Cell A3"
          },
      
        ]
      },
      {
        "cells": [
          {
            "text": "Cell B1"
          },
          {
            "text": "Cell B2"
          },
          {
            "text": "Cell B3"
          }
        ]
      },
      {
        "cells": [
          {
            "text": "Cell C1"
          },
          {
            "text": "Cell C2"
          },
          {
            "text": "Cell C3"
          }
        ]
      }
    ],
    "buttons": [
      {
        "title": "Button title",
        "openUrlAction": {
          "url": ""
        }
      }
    ]
  }
}
      },
 
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
