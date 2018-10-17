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
    "items": [
      {
        "description": "Item One Description",
        "image": {
          "url": "https://images.serenataassets.com/image/upload/f_auto,q_auto/t_Product290s/v1/Raw/108081_standing"
          "accessibilityText": "Image description for screen readers"
        },
        "optionInfo": {
          "key": "itemOne",
          "synonyms": [
            "thing one",
            "object one"
          ]
        },
        "title": "Item One"
      },
      {
        "description": "Item Two Description",
        "image": {
          "url": "https://images.serenataassets.com/image/upload/f_auto,q_auto/t_Product290s/v1/Raw/108081_standing"
          "accessibilityText": "Image description for screen readers"
        },
        "optionInfo": {
          "key": "itemTwo",
          "synonyms": [
            "thing two",
            "object two"
          ]
        },
        "title": "Item Two"
      }
    ],
    "platform": "google",
    "title": "Title",
    "type": "list_card"
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
