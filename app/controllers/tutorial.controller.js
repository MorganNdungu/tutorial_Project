const { request } = require("express");
const db=require("../models");
const Tutorial=db.tutorials;

const Op=db.Sequelize.Op;

const getPagination=(page, size)=>{
    const limit= size ?+ size:3
    const offset = page ? page * limit :0;
// offset is separating specific number of records at a page (1-10) then next page (11-20)
    return {limit, offset};
}

const getPagingData=( data, page, limit)=>{
    const {count:totalitems, rows:tutorials}=data;
    const currentPage= page ? + page:0;    // ? check if page is provided
    const totalPages= Math.ceil(totalitems/limit);

    return {totalitems, tutorials, totalPages, currentPage};
};

// create and save new tutorials
exports.create =(req,res)=>{
    //validate request
    if(!req.body.title){
        res.status(400).send({
            message:"Ttle cannot be empty!"
        });
        return;
    }

    //create tutorial
    const tutorial={

        title:req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published:false
    }

    //save tutorials in the DB
    Tutorial.create(tutorial)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "an error occured while creating the tutorial"
        })
    })
    //update tutorial

    //retrieve all tutorials from the DB
    exports.findAll=(req, res)=>{
        const {page, size, title} =req.query;
        var condition = title ? {title: {[Op.like]: `%${title}%`}} :null;

        const {limit, offset} = getPagination(page,size);

        tutorial.findAndCountAll({where: condition, limit, offset})
        .then(data=>{
            const response= getPagingData(data,page, limit);
            res.send(response);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                err.message || "An error occured while retrieving tutorials."
            })
        })
    }
};