const Volume = require("../model/volumeModel");

module.exports.create = async (req, res, next) => {
    try{
        const { owner, name, private } = req.body;
        const volumeCheck = await Volume.findOne({ owner, name });
        if(volumeCheck)
            return res.json({ msg: "Volume with this name is already present.", status: false });
        const vol = await Volume.create({ owner, name, private });
        return res.json({ status: true, vol })
    } catch (err){
        next(err)
    }
}
module.exports.getVolumes = async (req, res, next) => {
    try {
        const VolumeOwner = await Volume.find({ owner: req.params.user })
        const VolumeMember = await Volume.find({ members: req.params.user })
        const volumes = VolumeOwner.concat(VolumeMember)
        return res.json({ status: true, volumes})
    } catch (err){
        next(err)
    }
}
module.exports.getVol = async (req, res, next) => {
    try {
        const volinfo = await Volume.find({ owner: req.params.user, _id: req.params.id})
        return res.json({ status: true, volinfo})
    } catch (err) {
        next(err)
    }
}