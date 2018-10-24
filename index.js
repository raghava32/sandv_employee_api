
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
 let completeResponse = '';
   
   let botResponse = "";
	let reqUrl = "";
	let bt_resp = "";
const numb = req.body.result.parameters;
const res_query = req.body.result.resolvedQuery;	
const dtype = numb["crdata"];
const quer = numb["number"];
	
	console.log("resolvedQuery :- " + res_query);
	console.log("dtype :- "+ dtype);
        
	if (dtype != null){ 
	switch (dtype) {
		 
	 case "cr data":
	 case "change request data":
	 case "cr details":
	 case "change request details":	 
	bt_resp = "please specifiy which type of cr data looking for. pending cr, latest cr, over due cr or priority cr";
	reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$format=json`);          
             break;	
   /*
			// case 'pending cr':
			
     // reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pend'&$format=json`);          
			
       //  break;
    case 'latest cr':
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'late'&$format=json`);   

			break;
    case 'over due cr':
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'over'&$format=json`);   

			break;	
    case 'priority cr':
      reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'prio'&$format=json`);   

			break;		
	*/		
	
}// switch case

		
		if dtype.includes("pending") {
		reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'pend'&$format=json`);          
		} else if dtype.includes("latest") {
			reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'late'&$format=json`);   
		} else if dtype.includes("over") {
			reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'over'&$format=json`);   
		} else if dtype.includes("priority") {
			reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/CRequestSet?$filter= Zfval eq 'prio'&$format=json`);   
		}
		
		
console.log("!!!!!! requrl " + reqUrl);		
	}
	
	
	
console.log("checking quer" + quer); //3418
	if (quer != null) { 
		
	    reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/taxonmySet(Zfval=${"'"+quer+"'"})?$format=json`);   
	console.log("quer url for data :- "+ reqUrl);
	}//end else if query cr number / activate cr
	
	
	if (res_query.includes("approve") || res_query.includes("reject")){
		
		
	    reqUrl = encodeURI(`http://80.227.35.222:50000/sap/opu/odata/SAP/ZMDG_TAXNMY_BOT_SRV/taxonmySet(Zfval=${"'"+res_query+"'"})?$format=json`);   
	}
	
	
	
    http.get(reqUrl, (responseFromAPI) => {
        console.log( "http Call :-  " + reqUrl);
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;    
		console.log(completeResponse);
        });
	    
        responseFromAPI.on('end', () => {
            var JSONObj = JSON.parse(completeResponse);        
     

		if (dtype != null && JSONObj != null ) {
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
		}
	    // for if condition if (num.length > 1) 
		  //console.log("quer != null checking");
		 if (quer != null && JSONObj.d.Zfval.length < 1 ) {	  
	             cr_1 = "Material :" + JSONObj.d.Matnr;
		     cr_1d = "Desc:" + JSONObj.d.Txtmi;
	             cr_2 =  "Noun :" + JSONObj.d.NounName;
		     cr_2d = "Modifier :" + JSONObj.d.ModiName;   
		     cr_3 = "Material Type :" + JSONObj.dMtart;
		     cr_3d = "Material Group :" + JSONObj.d.Matkl;
		     cr_4 = "Base UOM :" + JSONObj.d.Meins;
                     cr_4d =  "Net Weight:" + JSONObj.d.Ntgew + JSONObj.d.GeweiMat;
		     cr_5 = "Gross Weight: " + JSONObj.d.Brgewmara + JSONObj.d.GeweiMat;
                     cr_5d = "Industry sector :" + JSONObj.d.Mbrsh

		  
		  } //else if (quer.length >1) 
		  
		     
		     if (res_query.includes("approve") || res_query.includes("reject") ){
		 
		        botResponse = JSONObj.d.Zfval;
		 
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
			
             
		  if (bt_resp.length > 1){
		     botResponse = bt_resp;  
		      }
		if (botResponse == null || JSONObj.d.results.length < 0 )
	     {				      
		     botResponse = "no data found for the request";
	     }
		
					
	if (bt_resp.length > 1 || botResponse.includes("no data found") || res_query.includes("approve") || res_query.includes("reject") ){ 
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
            "title": dtype + "Change Request List",
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
                        "accessibilityText": "Item 3 image fallback",
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
                        "accessibilityText": "Item 4 image fallback",
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

reqUrl = botResponse = bt_resp = numb = dtype = null;

server.listen((process.env.PORT || 3000), () => {
    console.log("Server is up and running...");
});
