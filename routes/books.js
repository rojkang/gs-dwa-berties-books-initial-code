// Create a new router
const express = require("express")
const router = express.Router()

// ----------------------------
//  SEARCH PAGE
// ----------------------------
router.get('/search', function(req, res, next){
    res.render("search.ejs")
});

router.get('/search_result', function (req, res, next) {
    let keyword = req.query.search_text;


    let sqlquery = "SELECT * FROM books WHERE name = ?";
    
    db.query(sqlquery, [keyword], (err, result) => {
        if (err) return next(err);
        res.render("searchresults.ejs", { results: result });
    });
});



// ----------------------------
//  LIST BOOKS
// ----------------------------
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; 
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("list.ejs", { availableBooks: result });
    });
});


// ----------------------------
//  SHOW ADD BOOK FORM
// ----------------------------
router.get('/addbook', function(req, res, next) {
    res.render("addbook.ejs");
});


// ----------------------------
//  INSERT BOOK INTO DATABASE
// ----------------------------
router.post('/bookadded', function (req, res, next) {

    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    let newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) return next(err);

        res.send(
            'This book is added to database, name: ' +
            req.body.name + ' price ' + req.body.price
        );
    });
});
router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE price < 20";

    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("bargainbooks.ejs", { cheapBooks: result });
    });
});

module.exports = router
