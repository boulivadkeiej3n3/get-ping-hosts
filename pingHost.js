const HTTP   = require("http");
const Mongoose = require("mongoose");

const ServersDB = Mongoose.model(`RenderServers`, new Mongoose.Schema({url:String}));
let ServersList;

/*     INITIALIZE THE SERVER     */
(async function  (){
    Mongoose.connect(`mongodb+srv://maximous:123MONGODB.com@m001.cmsqx.mongodb.net/?retryWrites=true&w=majority`).then((connection)=>{
        connection ? console.log(`Database Connected!`): console.log(`Error Occured during connection to database`);
    });
        ServersList = await ServersDB.find({url:{$regex:/.+/}},{__v:0,_id:0});
})();
/********************** **/
async function Router(req, res){
 
    const serverURL = req.url.match(/(?<=\/getPing\/).+/);
   //Add the newely created to the local database and return back the previosu and the next index:
   ServersList.push(serverURL);
   console.log(ServersList.indexOf(serverURL) -1)
   res.end (JSON.stringify({previousServer: (ServersList.indexOf(serverURL) -1 >= 0)? ServersList[ServersList.indexOf(serverURL) -1]:ServersList[ServersList.indexOf(serverURL)]}));

 
}

HTTP.createServer(Router).listen(3000);
