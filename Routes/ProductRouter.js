// const ensureAuthenticated = require('../Middlewares/Auth');

// const router = require('express').Router();

// router.get('/', ensureAuthenticated, (req,res) => {
//     console.log('---logged in user details---', req.user);
    
//     res.status(200).json([
//         {
//             name: "mobile",
//             price: 100000
//         },
//         {
//             name: "Tv",
//             price: 200000
//         }
//     ])
// })

// module.exports = router;


const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

// Route to get products, secured with authentication
router.get('/', ensureAuthenticated, (req, res) => {
    try {
        console.log('---logged in user details---', req.user);

        // Dummy product data
        const products = [
            {
                name: "Mobile",
                price: 100000
            },
            {
                name: "TV",
                price: 200000
            }
        ];

        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message); // Log error details
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
});

module.exports = router;
