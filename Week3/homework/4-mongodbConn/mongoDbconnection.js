
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string 
const url = `mongodb+srv://Omer123:Keyboard1.@cluster0.nna6w.mongodb.net/world2?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;

const client = new MongoClient(url);

// The database to use
const dbName = "world2";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const world2 = client.db(dbName);

        // Use the collection "city"
        const cityCol = world2.collection("city");

        //1. Create a new record (document) for a new city (your home town, say)

        // Construct a document                                                                                                                                                              
        let newCity = {
            "Name": "MyCity",
            "CountryCode": "OMD",
            "District": "Degirmen",
            "Population": 112112
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await cityCol.insertOne(newCity);


        //2. Update that record with a new population
        // create a filter to update

        const filter = { Name: "MyCity" };

        // this option instructs the method to create a document if no documents match the filter

        const options = { upsert: true };

        // create a document that sets the plot of the movie

        const updateDoc = {

            $set: {

                Population:

                    122222,

            },

        };

        const result = await cityCol.updateOne(filter, updateDoc, options);


        // 3. Read the document that you just updated in two ways : finding by the city name, and then by the country code


        const findResultCityName = await cityCol.find({
            "Name": "MyCity"
        });
        await findResultCityName.forEach(console.log);

        const findResultCountryCode = await cityCol.find({
            "CountryCode": "OMD"
        });
        await findResultCountryCode.forEach(console.log);

        // 4. Delete the city

        const deleteCity = await cityCol.deleteOne(newCity);


    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);