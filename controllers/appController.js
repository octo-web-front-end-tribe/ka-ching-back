module.exports = {
    getHomePage: function getHomePage(req, res) {

        var Datastore = require('nedb')
            , db = new Datastore({filename: 'path/to/datafile', autoload: true});
        var doc = {
            hello: 'world'
            , n: 5
            , today: new Date()
            , nedbIsAwesome: true
            , notthere: null
            , notToBeSaved: undefined  // Will not be saved
            , fruits: ['apple', 'orange', 'pear']
            , infos: {name: 'nedb'}
        };

        db.insert(doc, function (err, newDoc) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            res.send(newDoc.hello);
        });
        //res.send("this is the homepage");
    }
};