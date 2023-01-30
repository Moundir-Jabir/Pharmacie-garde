const Pharmacie = require('../models/PharmacieModel')
const Comment = require('../models/CommentModel')


exports.addComment = async (req,res)=> {
    //check if data Exists
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  
  const id = req.body.commentID
//   const pharmacieID = await Pharmacie.findOne({ id }) 
  const addComment = {
    clientname: req.body.clientname,
    clientcomment :req.body.clientcomment,
    commentID: id
  };
  try {
    await Comment.create(addComment)
    return res.json({ status:201 , message: "New comment  Inserted succefully" })
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}



exports.getComment= async(req,res)=> {
    const id = req.params.id
    console.log(id);
    const comment = await Comment.find({"commentID": id})
    console.log(comment);

    if(comment){
        res.status(200)
        .json(comment)
    }else{
        res.status(404)
        .json({message: " Not Found"})
    }   
  
  }