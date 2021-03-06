const contacts = require("../model/contacts.model");


// find a all contacts
exports.findAll = (req, res) => {
  contacts.findContacts((err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving * users ",
      });
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  contacts.findById(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with email " + req.params.email,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findGroups = (req, res) => {
  contacts.findGroupById(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found group with Id ${req.params.Id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving group with Id " + req.params.Id,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findGroupUsers = (req, res) => {
  contacts.findGroupUsersById(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found groupUsers with groupId ${req.params.Id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving group with Id " + req.params.Id,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findRoom = (req, res) => {
  console.log(req.params)
  contacts.findRoom(req.params.senderId, req.params.recieverId, req.params.verif, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving room with senderId " + req.params.senderId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findConversRoom = (req, res) => {
 
  contacts.findConversRoom(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
         // message: `Not found user with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
        //  message: "Error retrieving room with senderId " + req.params.senderId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};



exports.createChat = (req, res) =>{
  if(!req.body){
  res.status(400).send({
    message : "body cannot be empty",
  });
  }

  const chat = {
    senderId : req.body.senderId,
    recieverId : req.body.recieverId,
    chatId : req.body.chatId,
    contact : req.body.contact
  }

  contacts.createChat(chat,(err, data) => {
    if(err)
    res.status(500).send({
      message : err.message || "some error occured while creating chatId"
    })
    else res.send(data)
  })

}

exports.createService = (req, res) =>{
  if(!req.body){
  res.status(400).send({
    message : "body cannot be empty",
  });
  }

  const chat = {
    idDemandeur : req.body.idDemandeur,
    idOffreur : req.body.idOffreur,
    IdService : req.body.IdService,
    
  }

  contacts.createService(chat,(err, data) => {
    if(err)
    res.status(500).send({
      message : err.message || "some error occured while creating chatId"
    })
    else res.send(data)
  })

}


exports.creategroup = (req, res) =>{
  
  if(!req.body){
  res.status(400).send({
    message : "body cannot be empty",
  });
  }
  const group = {
    grpId : req.body.groupId,
    ownerId : req.body.ownerId,
    Name : req.body.Name,
    groupImage : req.body.groupImage,
    members : req.body.members,

  }

  contacts.createGroup(group,(err, data) => {

    if(err)
    res.status(500).send({
      message : err.message || "some error occured while creating chatId"
    })
    else res.send(data)
  })

}

exports.addGroup = (req, res) =>{
  
  if(!req.body){
  res.status(400).send({
    message : "body cannot be empty",
  });
  }
  const group = {
    grpId : req.body.groupId,
    users : req.body.users

  }

  contacts.addGroup(group,(err, data) => {

    if(err)
    res.status(500).send({
      message : err.message || "some error occured while creating chatId"
    })
    else res.send(data)
  })

}
exports.leaveGroup = (req, res) => {
  contacts.leaveGroup(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user  with id " + req.params.userId
        });
      }
    } else res.send({ message: `user removed from group!` });
  });
};
exports.removeGroup = (req, res) => {
  contacts.removeGroup(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user  with id " + req.params.userId
        });
      }
    } else res.send({ message: `group was deleted successfully!` });
  });
};
