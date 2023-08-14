module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: String
        }
    )

    return mongoose.model('favorite', schema)
}

