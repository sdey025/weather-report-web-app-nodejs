const http = require("http");
const fs = require("fs");
let requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal,orgval) => {
    const temp = parseInt(orgval.main.temp - 273.15)
    const min_temp = parseInt(orgval.main.temp_min - 275)
    const max_temp = parseInt(orgval.main.temp_max - 265)
    let temperature = tempVal.replace('{%tempval%}',temp)
    temperature = temperature.replace('{%city%}',orgval.name)
    temperature = temperature.replace('{%country%}',orgval.sys.country)
    temperature = temperature.replace('{%tempmin%}',min_temp)
    temperature = temperature.replace(' {%tempmax%}',max_temp)
/*     temperature = temperature.replace('{%tempval%}',temp) */
return temperature
}
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests("http://api.openweathermap.org/data/2.5/weather?q=Munger&appid=31aa077c1df30d127864ec4cd4b0158c")
      .on("data", (chunk) => {
          const objData = JSON.parse(chunk)
          const arrData = [objData]
        /* console.log(parseInt(arrData[0].main.temp - 273.15)); */
        const realData = arrData.map(list => replaceVal(homeFile,list)).join('')
            res.write(realData)
            console.log(realData)
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end()
        console.log("end");
      });
  }
});

server.listen(4000, "localhost", () => {
  console.log("server listening to the port number 4000");
});
