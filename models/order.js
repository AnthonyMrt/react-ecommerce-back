const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products : [
        {
            product: {
                type: ObjectId,
                ref:"Product",
            },
            count: Number,
            color: String
        },
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: 'En cours de traitement',
        enum: [
            'En cours de traitement',
            'Paiment à la livraison',
            'Traiter',
            "En cours d'expédition",
            'Expédié',
            'Annuler',
            'Livrer'
        ]
    },
    orderBy: {type: ObjectId, ref: "User" },
},
{timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema)