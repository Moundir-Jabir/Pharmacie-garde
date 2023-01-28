const Commentaire = require('../models/Commentaire')
const Joi = require('joi')

exports.createCommentaire = (req, res) => {
    const schema = Joi.object({
        nom_utilisateur: Joi.string().required(),
        commentaire: Joi.string().required()
    })
    const { error } = schema.validate(req.body)
    if (error)
        return res.status(400).json({
            error: error.details[0].message
        })
    req.body.pharmacie = req.params.idPharmacie
    const comment = new Commentaire(req.body)
    comment.save((err, commentaire) => {
        if (err)
            return res.status(400).json({
                error: 'Commentaire non ajouté'
            })
        return res.json({
            message: "Commentaire ajouté",
            commentaire
        })
    })
}