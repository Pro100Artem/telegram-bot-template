import mongoose from 'mongoose'

async function connectToDb(name) {
    try {
        console.info('Connecting to database')
        mongoose.Promise = global.Promise
        const db = await mongoose.connect(`mongodb://localhost:27017/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.clear()
        console.info('Connected to database')
        // await Users.deleteMany({})
        // await Users.updateMany({}, {
        //     state: 'free'
        // })
        return db
    } catch (e) {
        console.error('Cannot connect to database. Exiting')
        process.exit()
    }
}

const UsersSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    state: {
        type: String,
        default: 'free',
        required: true
    },
    userId: {
        type: Number,
        required: true,
        unique: true
    }
})

class UsersClass {
    static async add(id, isAdmin = false) {
        try {
            const document = {
                isAdmin,
                userId: id
            }
            const user = await Users.create(document)
            return user
        } catch (e) {
            throw Error(e.message || e.description || e)
        }
    }
    static async get(id) {
        try {
            const user = await Users.findOne({
                userId: id
            })
            return user
        } catch (e) {
            throw Error(e.message || e.description || e)
        }
    }
    static async set(id, updates) {
        let user = await Users.get(id)
        user = await user.set(updates)
        return user
    }
    async set(updates) {
        try {
            const user = await Users.findOneAndUpdate(
                {
                    userId: this.userId
                },
                updates,
                {
                    new: true
                }
            )
            return user
        } catch (e) {
            throw Error(e.message || e.description || e)
        }
    }
}

UsersSchema.loadClass(UsersClass)
const Users = mongoose.model('Users', UsersSchema)

export {
    Users,
    connectToDb
}