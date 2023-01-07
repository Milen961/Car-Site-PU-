const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /https?:\/\/./i;

const carSchema = new Schema({
    title: { type: String, minlength: [2, 'Car title must be at least 4 characters long'] },
    brand: {type: String},
    year: {type: Number},
    registrationPlate: {type: String, minlength:[4, 'Car registrationPlate must be at least 4 characters long']},
    passedKm: {type: Number},
    oilChangedDate: {type: String, minlength:[4]},
    nextDateForOilChange: {type: String, minlength:[4]},
    description: {
        type: String,
        minlength: [10, 'Course description must be at least 20 characters long'],
        maxlength: [100, 'Course description must be at most 50 characters long']
    },
    imageUrl: {
        type: String, 
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
        }
    },
    createdAt: { type: String, required: true, default: () => (new Date()).toISOString().slice(0, 10 ) },
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    userCount: { type: Number, default: 0},
    owner: { type: Types.ObjectId, ref: 'User' }

});

carSchema.index({ title: 1 },{
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Car = model('Car', carSchema);

module.exports = Car