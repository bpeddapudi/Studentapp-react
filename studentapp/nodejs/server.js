const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// To support cors. 
app.use(cors())

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get("/list", (req, res) => {
    fs.readFile("./data/students.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        res.send(jsonString);
    });
})

app.post("/save", (req, res) => {
    
    fs.readFile("./data/students.json", "utf8", (err, jsonString) => {

        if (err) {
          console.log("File read failed:", err);
          return;
        }
        let id = req.body.id;
        let name = req.body.name;
        jsonString = jsonString || [];

        let json = JSON.parse(jsonString);

        json.push({"name": name, "id": id});
        fs.writeFile("./data/students.json", JSON.stringify(json), (err, jsonString) => {
            if (err) {
                console.log("File write failed:", err);
                return;
            }
        });
        res.sendStatus(200);
    });
});

app.delete("/delete", (req, res) => {
    
    fs.readFile("./data/students.json", "utf8", (err, jsonString) => {

        if (err) {
          console.log("File read failed:", err);
          return;
        }
        
        let json = JSON.parse(jsonString);
        let id = req.body.id;
        let result = json.filter((student) => student.id != id);
   
        fs.writeFile("./data/students.json", JSON.stringify(result), (err, jsonString) => {
            if (err) {
                console.log("File write failed:", err);
                return;
            }
        });
        res.sendStatus(200);
    });
});

app.put("/edit", (req, res) => {
    
    fs.readFile("./data/students.json", "utf8", (err, jsonString) => {

        if (err) {
          console.log("File read failed:", err);
          return;
        }
        
        let json = JSON.parse(jsonString);
        let id = req.body.id;
        
        let result = json.map((student) => {
            console.log("id is " +  id + "student.id " + student.id + "name is " + req.body.name);
            if (student.id == id) {
                student.name = req.body.name;
            }
            return student;
        });
        fs.writeFile("./data/students.json", JSON.stringify(result), (err, jsonString) => {
                if (err) {
                    console.log("File write failed:", err);
                    return;
                }
        });
        
        res.sendStatus(200);
    });
});

app.listen(8000);