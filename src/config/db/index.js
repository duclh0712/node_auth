const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb+srv://lehuynhduck4:nzXgyHfEu1C10L4A@cluster0.fhqqxqm.mongodb.net/users')
        .then(() => console.log('Connected!'))
        .catch(() => console.log('Failed'))
}

module.exports = {connect};