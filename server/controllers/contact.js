let express = require('express');
let router = express.Router();

// create a reference to the db schema
let contactModel = require('../models/contact');

module.exports.displayContactList = (req, res, next) =>{
    contactModel.find((err, contactList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

           return res.json({success:true, msg: 'Contact list displayed successfully', contactList: contactList, user: req.user});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    return res.json({success:true, msg: 'successfully displayed add page'});
}

module.exports.processAddPage = (req, res, next) => {

    let newContact = contactModel({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "age": req.body.age
    });

    contactModel.create(newContact, (err, contactModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.json({success:true, msg: 'successfully added new contact'});
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    contactModel.findById(id, (err, contactObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.json({success:true, msg: 'successfully displayed edit page',contact:contactObject});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = contactModel({
        "_id": id,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "age": req.body.age
    });

    contactModel.update({_id: id}, updatedContact, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.json({success:true, msg: 'successfully edited contact page', contact:updatedContact});
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.json({success:true, msg: 'successfully deleted contact'});
        }
    });
}

