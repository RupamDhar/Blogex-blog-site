const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URI;
const database = process.env.DATABASE_NAME;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function getAllBlogs() {
    try {
        await client.connect();
        const result = await client.db(database).collection('Blogs').find({}).toArray();
        return result;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
    }
}

async function getBlog(blogSlug) {
    try {
        await client.connect();
        const result = await client.db(database).collection('Blogs').find({ slug: blogSlug }).toArray();
        console.log(result);
        return result;
    }
    catch(error) {
        console.log(error);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    getAllBlogs,
    getBlog
}