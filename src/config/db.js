var ibmdb = require('ibm_db');
var config = require('./config');
var connString = "";

exports.init = function (){
		var db2;
		var hasConnect = false;
		if (process.env.VCAP_SERVICES) {
			var env = JSON.parse(process.env.VCAP_SERVICES);
			if (env['dashDB']) {
				hasConnect = true;
				db2 = env['dashDB'][0].credentials;
			}   
		}
		if ( hasConnect == false ) {
			db2 = config.db;
		}
		connString = "DRIVER={DB2};DATABASE=" + db2.db + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.hostname + ";port=" + db2.port;
		console.log("Using DB");
		console.log(connString);
	};

exports.ping = function() {
	return function(req, res) {
	ibmdb.open(connString, function(err, conn) {
			if (err ) {
				res.send("error occurred " + err.message);
			}
			else {
				conn.query("SELECT * from VMR85522.STATUS FETCH FIRST 10 ROWS ONLY", function(err, tables, moreResultSets) {		
				//conn.query("SELECT * FROM DASH11229.TEST", function(err, tables, moreResultSets) {	
				if ( !err ) { 
					res.send(tables);		
				} else {
					res.send("error occurred " + err.message);
				}
				/*
					Close the connection to the database
					param 1: The callback function to execute on completion of close function.
				*/
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		});
	}
}

exports.getById = function(table, id) {
	return function(req, res) {
		ibmdb.open(connString, function(err, conn) {
				if (err ) {
					res.send("error occurred " + err.message);
				}
				else {
					conn.query("SELECT FIRST_NAME, LAST_NAME, EMAIL, WORK_PHONE from GOSALESHR.employee FETCH FIRST 10 ROWS ONLY", function(err, tables, moreResultSets) {		
					//conn.query("SELECT * FROM DASH11229.TEST", function(err, tables, moreResultSets) {	
					if ( !err ) { 
						res.send(tables);		
					} else {
						res.send("error occurred " + err.message);
					}
					/*
						Close the connection to the database
						param 1: The callback function to execute on completion of close function.
					*/
					conn.close(function(){
						console.log("Connection Closed");
						});
					});
				}
			});
		}
}