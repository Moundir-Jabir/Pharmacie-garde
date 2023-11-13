const Pharmacie = require("../Models/PharmacieModel");
const asyncHandler = require("express-async-handler");
const Commentair = require("../Models/commentaireModel");

// method  : post
// url     : api/pharmacie/add
// acces   : private
const addPharmacie = asyncHandler(async (req, res) => {
  const {
    Nom,
    Adresse,
    NumeroTele,
    HeurOpen,
    HeurClose,
    Services,
    Status,
    Lon,
    Lat,
  } = req.body;

  if (
    !Lon ||
    !Lat ||
    !Nom ||
    !Adresse ||
    !HeurOpen ||
    !HeurClose ||
    !NumeroTele ||
    !Services ||
    !Status
  ) {
    res.status(400);
    throw new Error("please add all fields");
  } else {
    try {
      const findPharmacie = await Pharmacie.findOne({ Nom: Nom });
      if (!findPharmacie) {
        let filesArray = [];
        req.files.forEach((element) => {
          filesArray.push(element.path);
        });


        const pharmacie = await Pharmacie.create({
          Nom,
          Adresse,
          HeurClose,
          HeurOpen,
          Lon,
          Lat,
          Images: filesArray,
          NumeroTele,
          Services: Services.split(","),
          Status,
        });

        res.send(pharmacie);
      } else {
        throw new Error("pharmacie already exist");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
});
// method  : put
// url     : api/pharmacie/updatePharmacie
// acces   : private

const updatePharmacie = asyncHandler(async (req, res) => {
  const { Nom, Adresse, NumeroTele, HeurOpen, HeurClose, Services } =
    req.body;
  const id = req.params.id;
  if (!Nom || !Adresse || !NumeroTele) {
    return res
      .status(400)
      .json({ message: "Merci de compléter tous les champshh !" });
  }

  const pharmacieExist = await Pharmacie.findOne({ Nom: req.body.Nom });
  if (pharmacieExist && pharmacieExist._id != id) {
    return res.status(400).json({ message: "pharmacie already exist" });
  }

  let filesArray = [];

  if (req.files.length == 0) {
    const pharmacie = await Pharmacie.findById({ _id: id });
    filesArray = pharmacie.Images;
  } else {
    req.files.forEach((element) => {
      filesArray.push(element.path);
    });
  }

  const SearchAndUpdatePharmacie = await Pharmacie.findOneAndUpdate(
    { _id: id },
    {
      Nom,
      Adresse,
      HeurClose,
      HeurOpen,
      Images: filesArray,
      NumeroTele,
      Services: Services.split(","),
    }
  );

  if (SearchAndUpdatePharmacie) {
    return res
      .status(200)
      .json({ message: "Pharmacie mis à jour avec succès !" });
  } else {
    return res
      .status(400)
      .json({ message: "Erreur veuillez réessayer plus tard !" });
  }
});

// method  : get
// url     : api/pharmacie/getAllPharmacie
// acces   : private
const GetAllPharmacie = asyncHandler(async (req, res) => {
  const Allpharmacie = await Pharmacie.find({});
  if (Allpharmacie) {
    return res.status(200).json(Allpharmacie);
  } else {
    return res
      .status(400)
      .json({ message: "Erreur veuillez réessayer plus tard !" });
  }
});

// method  : get
// url     : api/pharmacie/getOnePharmacie
// acces   : private
const GetSinglePharmacie = asyncHandler(async (req, res) => {
  const pharmacie = await Pharmacie.findById(req.params.id)
  const commentair = await Commentair.find({ Pharmacie: req.params.id });

  if (pharmacie) {
    return res.status(200).json({ pharmacie, commentair });
  } else {
    return res
      .status(400)
      .json({ message: "Erreur veuillez réessayer plus tard !" });
  }
});

// method  : get
// url     : api/pharmacie/countPharmacie
// acces   : private
const CountPharmacie = asyncHandler(async (req, res) => {
  const Count = await Pharmacie.find({}).countDocuments();
  return res.status(200).send(Count.toString());
});

// method  : get
// url     : api/pharmacie/GetSinglePha
// acces   : private
const GetSinglePha = asyncHandler(async (req, res) => {
  const pharmacie = await Pharmacie.findById(req.params.id)

  if (pharmacie) {
    return res.status(200).json(pharmacie);
  } else {
    return res
      .status(400)
      .json({ message: "Erreur veuillez réessayer plus tard !" });
  }
});

// method : delete
// url    : api/pharmacie/deletePharmacie/:id
// acces  : private
const deletePharmacie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Pharmacie.findByIdAndDelete(id);
    res.status(200).send("delete success");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//methode : put
//url : api/pharmacie/updateStatus/:id
//acces : private
const updateStatus = asyncHandler(async (req, res) => {
  const { Status } = req.body
  if (!Status) {
    res.status(400).json({ message: "Merci de compléter tous les champs !" })
  }
  const pharmacie_ = await Pharmacie.findByIdAndUpdate({ _id: req.params.id }, { Status: Status })
  res.status(200).json({ pharmacie_ })
}

)

module.exports = {
  addPharmacie,
  updatePharmacie,
  GetSinglePharmacie,
  GetAllPharmacie,
  CountPharmacie,
  deletePharmacie,
  GetSinglePha,
  updateStatus
};
