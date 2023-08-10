import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", (req, res)=>{
//     res.render("index.ejs", {content: "hlo"});
// });

app.get("/",  async (req, res) => {
    try {
      const result = await axios.get(`https://api.humorapi.com/jokes/random?api-key=f36eb35de38a4576863a1d7573667e91`);
      res.render("index.ejs", { content: result.data.joke });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
    }
  });

app.get("/search", (req, res)=>{
    res.render("index.ejs", {search: "done Searching"});
});

app.post("/search", async (req, res) => {
    const exclude = req.body["exclude-tags"];
    const include = req.body["include-tags"]
        try {
          const result = await axios.get(`https://api.humorapi.com/jokes/search?api-key=f36eb35de38a4576863a1d7573667e91&keywords=${req.body.keywords}&include-tags=${include}&exclude-tags=${exclude}`);
          console.log(result.data.jokes);
          
          res.render("index.ejs", { 
            content: result.data.jokes[0].joke,
            search: "hi",
        });
        } catch (error) {
            console.error("Failed to make request:", error.message);
            res.render("index.ejs", {
              error: error.message,
            });
        }
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})