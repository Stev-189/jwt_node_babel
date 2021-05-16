import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/simplejwt', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(db=> console.log('Database is connected'))