module.exports= app=>{
    const tutorials=require("../controllers/tutorial.controller");

    var router = require("express").Router();

    //create a new tutorial
    router.post("/", tutorials.create);

    //retrieve all tutorial
    router.get("/", tutorials.findAll);

    app.use('/api/tutorials', router);
}