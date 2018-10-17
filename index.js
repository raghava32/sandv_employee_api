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
            	   	  
		  
            for (var i = 0; i < JSONObj.d.results.length; i++) 
            {
            botResponse += " ";
              botResponse +=  JSONObj.d.results[i].UsmdCrequest +" "+" .";  
		    switch(i) 
		   { 
                    case 0: 
	             cr_1 = JSONObj.d.results[i].UsmdCrequest;
		     cr_1d = JSONObj.d.results[i].UsmdCreqText;
				   break;
		     case 1:		   
                     cr_2 = JSONObj.d.results[i].UsmdCrequest;
		     cr_2d = JSONObj.d.results[i].UsmdCreqText;
				   break;
                     case 2:				   
                     cr_3 = JSONObj.d.results[i].UsmdCrequest;
		     cr_3d = JSONObj.d.results[i].UsmdCreqText;
				   break;
		   case 3:		   
                     cr_4 = JSONObj.d.results[i].UsmdCrequest;
		     cr_4d = JSONObj.d.results[i].UsmdCreqText;
				   break;
		    case 4:		   
                     cr_5 = JSONObj.d.results[i].UsmdCrequest;
		     cr_5d = JSONObj.d.results[i].UsmdCreqText;
				    break;
		    }	
	           }
          } 
		
		
		
		if (cr_1 < 0) {
		cr_1 = "no data";
		cr_1d = "no data"	
		}
		else if (cr_2 < 0) {
		cr_2 = "no data";
		cr_2d = "no data";	
		}
		else if (cr_3 < 0) {
		cr_3 = "no data";
		cr_3d = "no data";	
		}
		else if (cr_4 < 0) {
		cr_4 = "no data";
		cr_4d = "no data";	
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
		console.log(cr_1);
		console.log(cr_2);
		console.log(cr_3);
		console.log(cr_4);
		
		
		if (bt_resp.length > 1 ){ 
			      return res.json( 
				  { 
                speech: botResponse,     
                displayText: botResponse,
                source: 'webhook-echo-sample'
            }
                              );	
		}
		else{
		return res.json( 
                              
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
            "title": num + "Change Request List",
            "type": "list_card",
            "items": [
                {
                    "description": cr_1d,
                    "image": {
                        "accessibilityText": "Item 1 image fallback",
                        "url": "https://www.corelogs.com/media/images/thumbnails/logo233x233.png"
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
                        "url": "https://www.corelogs.com/media/images/thumbnails/logo233x233.png"
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
                        "url": "https://www.corelogs.com/media/images/thumbnails/logo233x233.png"
                    },
                    "optionInfo": {
                        "key": cr_3,
                        "synonyms": [
                            "third",
                            "number three", "three",
                            "bottom"
                        ]
                    },
                    "title": cr_3
                },
		         {
                    "description": cr_4d,
                    "image": {
                        "accessibilityText": "Item 3 image fallback",
                        "url": "https://www.corelogs.com/media/images/thumbnails/logo233x233.png"
                    },
                    "optionInfo": {
                        "key": cr_4,
                        "synonyms": [
                            "fourth",
                            "number four", "four",
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

			
							  
							  
			  );	
		
		}
			  
		    
		    
		    
	    
	    
	  
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
