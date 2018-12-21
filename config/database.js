if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURL: 'mongodb://kensins:stevK123-=[]@ds013589.mlab.com:13589/notes'
    }
} else {
    module.exports = {
        mongoURL: 'mongodb://localhost:27017/notesIdea'
    }
}