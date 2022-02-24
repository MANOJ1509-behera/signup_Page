const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const pmail=req.body.ename;
  const pnam=req.body.nme;

      const data={
        members:[
          {
            email_address:pmail,
            status:"subscribed",
            merge_fields:{
              FNMAE:pnam,
            }
            }
          ]
      }
      const jsonData=JSON.stringify(data);
      const url="https://us14.api.mailchimp.com/3.0/lists/cd9e46c68e"
      const options={
        method:"POST",
        auth:"manoj:36d1696e407e25bc0484f14ca6205678-us14"
      }
    const request= https.request(url,options,function(response){
        response.on("data",function(data){
          console.log(JSON.parse(data));
        });
      });
      request.write(jsonData);
      request.end();

    });


app.listen(3000,function(){
  console.log("port is running in the port 3000");
});




//  cd9e46c68e
 //79136a0402249afdc744fede5
