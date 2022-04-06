const statik = require("node-static");

const port = 8080;
const file = new statik.Server("./public");
require("http")
  .createServer(function (request, response) {
    request
      .addListener("end", function () {
        //
        // Serve files!
        //
        file.serve(request, response);
      })
      .resume();
  })
  .listen(port);

console.log(`Server running at http://localhost:${port}`);
