module.exports = function(app, passport, APIStrategy) {

    var attributeOverrideCtrl = require('../controllers/attribute.controller.js');
    var db = require('../config/db.js');
    //DB init
    db.init();

    // Create a new item test result
    app.post('/tripPlanner/create', attributeOverrideCtrl.create);

    // Retrieve all item tests
    app.get('/tripPlanner/getAll', attributeOverrideCtrl.getAll);

    // Retrieve a single item test with id
    app.get('/tripPlanner/get/:testId', attributeOverrideCtrl.get);

    // Update an item test with id
    app.put('/tripPlanner/update/:testId', attributeOverrideCtrl.update);

    // Delete an item test with id
    app.delete('/tripPlanner/delete/:testId', attributeOverrideCtrl.delete);

    //ping db
    app.get('/tripPlanner/status', 
        passport.authenticate(APIStrategy.STRATEGY_NAME, {
            session: false
        }),

        function(req, res) {
            // Get full appIdAuthorizationContext from request object
            var appIdAuthContext = req.appIdAuthorizationContext;
    
            appIdAuthContext.accessToken; // Raw access_token
            appIdAuthContext.accessTokenPayload; // Decoded access_token JSON
            appIdAuthContext.identityToken; // Raw identity_token
            appIdAuthContext.identityTokenPayload; // Decoded identity_token JSON
            appIdAuthContext.refreshToken // Raw refresh_token

            // Or use user object provided by passport.js
            var username = req.user.name || "Anonymous";
            console.log(req.user);
            res.send("Hello from protected resource " + username );

                
            //PING TO DB
            //db.ping()
        });
}