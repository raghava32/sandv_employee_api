const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');



const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/assetdata', (req, res) => {
  let cr_1,cr_2,cr_3,cr_4,cr_5,cr_1d,cr_2d,cr_3d,cr_4d,cr_5d;
 
   
   let botResponse = " ";
	let reqUrl = "";
	let bt_resp = "";
const numb = req.body.result.parameters;
	const num = numb["crdata"]
	console.log(num);
 switch(num) {
	 case "cr data":
	 case "change request data":
	 case "cr details":
	 case "change request details":	 
	bt_resp = "please specifiy which type of cr data looking for. pending cr, latest cr, over due cr or priority cr";
	reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$format=json`);          
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
            	     cr_1 = JSONObj.d.results[0].UsmdCrequest;
		     cr_1d = JSONObj.d.results[0].UsmdCreqText
                     cr_2 = JSONObj.d.results[1].UsmdCrequest;
		     cr_2d = JSONObj.d.results[1].UsmdCreqText
                     cr_3 = JSONObj.d.results[2].UsmdCrequest;
		     cr_3d = JSONObj.d.results[2].UsmdCreqText
                     cr_4 = JSONObj.d.results[3].UsmdCrequest;
		     cr_4d = JSONObj.d.results[3].UsmdCreqText
                     cr_5 = JSONObj.d.results[4].UsmdCrequest;
		     cr_5d = JSONObj.d.results[4].UsmdCreqText	
		  
		  
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
		console.log("rag"+ req.body.result.parameters);
            return res.json(   
		    
		    if (bt_resp !== null){
	    { 
                speech: botResponse,     
                displayText: botResponse,
                source: 'webhook-echo-sample'
            }
		    
	    }
		else{ 

 {
    "contextOut": [],
    "data": {
        "google": {
            "expect_user_response": true,
            "is_ssml": true,
            "permissions_request": null
        }
    },
    "messages": [
        {
            "speech": botResponse,
            "type": 0
        },
      
        {
            "displayText": "MDG Bot",
            "platform": "google",
            "textToSpeech": botResponse,
            "type": botResponse
        },
        {
            "platform": "google",
            "title": "Change Request List",
            "type": "list_card",
            "items": [
                {
                    "description": cr_1d,
                    "image": {
                        "accessibilityText": "Item 1 image fallback",
                        "url": "http://image1.example.png"
                    },
                    "optionInfo": {
                        "key": cr_1,
                        "synonyms": [
                            "first",
                            "number one", "one",
                            "top"
                        ]
                    },
                    "title": cr_1
                },
                {
                    "description": cr_2d,
                    "image": {
                        "accessibilityText": "Item 2 image fallback",
                        "url": "http://image2.example.png"
                    },
                    "optionInfo": {
                        "key": cr_2,
                        "synonyms": [
                            "second",
                            "number two", "two",
                            "bottom"
                        ]
                    },
                    "title": cr_2
                },
		     {
                    "description": cr_3d,
                    "image": {
                        "accessibilityText": "Item 2 image fallback",
                        "url": "http://image2.example.png"
                    },
                    "optionInfo": {
                        "key": cr_3,
                        "synonyms": [
                            "second",
                            "number two", "two",
                            "bottom"
                        ]
                    },
                    "title": cr_3
                },
		         {
                    "description": cr_4d,
                    "image": {
                        "accessibilityText": "Item 2 image fallback",
                        "url": "http://image2.example.png"
                    },
                    "optionInfo": {
                        "key": cr_4,
                        "synonyms": [
                            "second",
                            "number two", "two",
                            "bottom"
                        ]
                    },
                    "title": cr_4
                },
            ]

        }
    ],
    source: 'webhook-echo-sample',
    "speech": botResponse
}
		    
		}//else condition
		    
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
