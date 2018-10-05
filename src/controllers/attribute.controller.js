
exports.create = function(req, res) {
    // Create and Save a new attribute test
    console.log("CREATE");
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({message: "TEST can not be empty"});
    }
    req.body.saved = true;
    console.log(req.body);PerfWidgetExternal
    res.send(req.body);
};

exports.getAll = function(req, res) {
    // Retrieve and return all attribute tests from the database.
    console.log("GET ALL");
    var data = [{ testId: 1, qty: 8, passed: true},
        { testId: 2, qty: 12, passed: false},
        { testId: 3, qty: 4, passed: true},
        { testId: 4, qty: 18, passed: false}]
    res.send(data);
};

exports.get = function(req, res) {
    // Find a single attribute test with a id
    console.log("GET");
    var data = { testId: 1, qty: 8, passed: true};
    res.send(data);
};

exports.update = function(req, res) {
    // Update a attribute test identified by the id in the request
    console.log("UPDATE");
};

exports.delete = function(req, res) {
    // Delete a attribute test with the specified id in the request
    console.log("DELETE");
};
