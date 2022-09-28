/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/customerController.js":
/*!***********************************************!*\
  !*** ./src/controllers/customerController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCustomers": () => /* binding */ getCustomers,
/* harmony export */   "getCustomersById": () => /* binding */ getCustomersById,
/* harmony export */   "createNewCustomer": () => /* binding */ createNewCustomer,
/* harmony export */   "updateCustomer": () => /* binding */ updateCustomer,
/* harmony export */   "deleteOneCustomer": () => /* binding */ deleteOneCustomer,
/* harmony export */   "deleteAllCustomers": () => /* binding */ deleteAllCustomers
/* harmony export */ });
/* harmony import */ var _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/dbConnection */ "./src/database/dbConnection.js");


const getCustomers = (req, res) => {

    let sqlQuery = 'SELECT * FROM customers';

    _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__.default.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getCustomersById = (req, res) => {

    const id = parseInt(req.params.id);
    let sqlQuery = `SELECT * FROM customers WHERE id = ${id}`;

    // This method verifies that the id passed by parameter is a number, if it is not, it sends an error message
    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__.default.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

const createNewCustomer = (req, res) => {

    // Declare that I store the request body in a constant
    const customer = req.body;
    // So, I create the object with the table fields by calling the constant customer
    const customerObj = [
        customer.first_name,
        customer.last_name,
        customer.email,
        customer.age
    ];

    // This method verifies that the request body has all the complete fields, otherwise the operation will not be executed and sends an error message
    if (!customer.first_name || !customer.last_name || !customer.email || !customer.age) {
        return res.json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty'
        });
    }

    let sqlQuery = 'INSERT INTO customers (first_name, last_name, email, age) VALUES ( ?,?,?,? )';

    _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__.default.query(sqlQuery, customerObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('Customer created with id: ' + result.insertId);
    });
};

const updateCustomer = (req, res) => {
    
    const id = parseInt(req.params.id);
    const customer = req.body;
    const customerObj = [
        customer.first_name,
        customer.last_name,
        customer.email,
        customer.age
    ];

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    if (!customer.first_name || !customer.last_name || !customer.email || !customer.age) {
        return res.json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty'
        });
    }

    let sqlQuery = `UPDATE customers SET first_name = ?, last_name = ?, email = ?, age = ? WHERE id = ${id}`

    _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__.default.query(sqlQuery, customerObj,  (error, result) => {
        if (error) throw error;
        if (result.affectedRow === 0) {
            res.send('No customer was updated');
        }
        res.json(`Customer with id ${id} updated successfully`);
    });
};

const deleteOneCustomer = (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }
    
    let sqlQuery = `DELETE FROM customers WHERE id = ${id}`;

    _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__.default.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json(`Customer with id ${id} deleted successfully`);
    });
};

const deleteAllCustomers = (req, res) => {

    let sqlQuery = 'TRUNCATE TABLE customers';

    _database_dbConnection__WEBPACK_IMPORTED_MODULE_0__.default.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json('All records have been erased');
    });
};

/***/ }),

/***/ "./src/database/dbConnection.js":
/*!**************************************!*\
  !*** ./src/database/dbConnection.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ "mysql");
/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);
__webpack_require__(/*! dotenv */ "dotenv").config();


const dbConnection =  mysql__WEBPACK_IMPORTED_MODULE_0___default().createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

dbConnection.connect((error) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    } else {
        console.log('Database connected');
    }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnection);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ "./src/router.js");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);






//* Initializations
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
dotenv__WEBPACK_IMPORTED_MODULE_2___default().config();

//* Settings
const port = process.env.NODE_PORT;

//* Middlewares
app.use(morgan__WEBPACK_IMPORTED_MODULE_1___default()('dev'));

//* Enabling cors for all request by usiing cors middleware
app.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());

/**
 * * Parse request of content-type: application/json
 * * Parses inconming request with JSON payloads
 */
app.use( express__WEBPACK_IMPORTED_MODULE_0___default().json());
app.use( express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded( { extended:true } ) );

//* Routes
(0,_router__WEBPACK_IMPORTED_MODULE_3__.default)(app);

//* Starting the server
app.listen( port, () => {
    console.log(`Server running in port ${port}`);
});

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _routes_customers_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/customers.routes */ "./src/routes/customers.routes.js");
//* Import the customers.routes file with all de methods


//* Here I defined the first endpoint
const router = (app) => {
    app.use('/customers', _routes_customers_routes__WEBPACK_IMPORTED_MODULE_0__.default);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./src/routes/customers.routes.js":
/*!****************************************!*\
  !*** ./src/routes/customers.routes.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/customerController */ "./src/controllers/customerController.js");
//* Import express and initialize the routers

const router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();

//* Call the controller with the methods


//* Here I defined the methods 
router.get('/', _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__.getCustomers); //localhost:5000/customers/
router.get('/id/:id', _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__.getCustomersById); //localhost:5000/customers/id/1
router.post('/add', _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__.createNewCustomer); //localhost:5000/customers/add
router.put('/edit/:id', _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__.updateCustomer); //localhost:5000/customers/edit/1
router.delete('/delete/:id', _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__.deleteOneCustomer); //localhost:5000/customers/delete/1
router.delete('/deleteCustomers', _controllers_customerController__WEBPACK_IMPORTED_MODULE_1__.deleteAllCustomers); //localhost:5000/customers/deleteCustomers

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");;

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0LWFwaS1ub2RlanMtbXlzcWwvLi9zcmMvY29udHJvbGxlcnMvY3VzdG9tZXJDb250cm9sbGVyLmpzIiwid2VicGFjazovL3Jlc3QtYXBpLW5vZGVqcy1teXNxbC8uL3NyYy9kYXRhYmFzZS9kYkNvbm5lY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3QtYXBpLW5vZGVqcy1teXNxbC8uL3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsLy4vc3JjL3JvdXRlcy9jdXN0b21lcnMucm91dGVzLmpzIiwid2VicGFjazovL3Jlc3QtYXBpLW5vZGVqcy1teXNxbC9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly9yZXN0LWFwaS1ub2RlanMtbXlzcWwvZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly9yZXN0LWFwaS1ub2RlanMtbXlzcWwvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsL2V4dGVybmFsIFwibXlzcWxcIiIsIndlYnBhY2s6Ly9yZXN0LWFwaS1ub2RlanMtbXlzcWwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Jlc3QtYXBpLW5vZGVqcy1teXNxbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdC1hcGktbm9kZWpzLW15c3FsL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFvRDs7QUFFN0M7O0FBRVA7O0FBRUEsSUFBSSxpRUFBa0I7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFTzs7QUFFUDtBQUNBLHlEQUF5RCxHQUFHOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLGlFQUFrQjtBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBLElBQUksaUVBQWtCO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUEsd0dBQXdHLEdBQUc7O0FBRTNHLElBQUksaUVBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLEdBQUc7QUFDeEMsS0FBSztBQUNMOztBQUVPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1REFBdUQsR0FBRzs7QUFFMUQsSUFBSSxpRUFBa0I7QUFDdEIsK0I7QUFDQSxpREFBaUQsR0FBRztBQUNwRCxLQUFLO0FBQ0w7O0FBRU87O0FBRVA7O0FBRUEsSUFBSSxpRUFBa0I7QUFDdEIsK0I7QUFDQTtBQUNBLEtBQUs7QUFDTCxFOzs7Ozs7Ozs7Ozs7Ozs7O0FDakhBLGtEQUF3QjtBQUNFOztBQUUxQixzQkFBc0IsNkRBQXNCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsWUFBWSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCRztBQUNGO0FBQ0E7QUFDRTtBQUNOOztBQUV4QjtBQUNBLFlBQVksOENBQU87QUFDbkIsb0RBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNkNBQU07O0FBRWQ7QUFDQSxRQUFRLDJDQUFJOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtREFBWTtBQUNyQixTQUFTLHlEQUFrQixHQUFHLGdCQUFnQjs7QUFFOUM7QUFDQSxnREFBTTs7QUFFTjtBQUNBO0FBQ0EsMENBQTBDLEtBQUs7QUFDL0MsQ0FBQyxFOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0Q7QUFDdUQ7O0FBRXZEO0FBQ0E7QUFDQSwwQkFBMEIsNkRBQWM7QUFDeEM7O0FBRUEsaUVBQWUsTUFBTSxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1JyQjtBQUM4QjtBQUM5QixlQUFlLHFEQUFjOztBQUU3QjtBQUM0Sjs7QUFFNUo7QUFDQSxnQkFBZ0IseUVBQVksRUFBRTtBQUM5QixzQkFBc0IsNkVBQWdCLEVBQUU7QUFDeEMsb0JBQW9CLDhFQUFpQixFQUFFO0FBQ3ZDLHdCQUF3QiwyRUFBYyxFQUFFO0FBQ3hDLDZCQUE2Qiw4RUFBaUIsRUFBRTtBQUNoRCxrQ0FBa0MsK0VBQWtCLEVBQUU7O0FBRXRELGlFQUFlLE1BQU0sRTs7Ozs7Ozs7OztBQ2ZyQixrQzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGJDb25uZWN0aW9uIGZyb20gJy4uL2RhdGFiYXNlL2RiQ29ubmVjdGlvbic7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q3VzdG9tZXJzID0gKHJlcSwgcmVzKSA9PiB7XHJcblxyXG4gICAgbGV0IHNxbFF1ZXJ5ID0gJ1NFTEVDVCAqIEZST00gY3VzdG9tZXJzJztcclxuXHJcbiAgICBkYkNvbm5lY3Rpb24ucXVlcnkoc3FsUXVlcnksIChlcnJvciwgcmVzdWx0cykgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0cyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDdXN0b21lcnNCeUlkID0gKHJlcSwgcmVzKSA9PiB7XHJcblxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChyZXEucGFyYW1zLmlkKTtcclxuICAgIGxldCBzcWxRdWVyeSA9IGBTRUxFQ1QgKiBGUk9NIGN1c3RvbWVycyBXSEVSRSBpZCA9ICR7aWR9YDtcclxuXHJcbiAgICAvLyBUaGlzIG1ldGhvZCB2ZXJpZmllcyB0aGF0IHRoZSBpZCBwYXNzZWQgYnkgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLCBpZiBpdCBpcyBub3QsIGl0IHNlbmRzIGFuIGVycm9yIG1lc3NhZ2VcclxuICAgIGlmIChpc05hTihpZCkpIHtcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oJ1lvdSBtdXN0IGVudGVyIGEgdmFsaWQgaWQgYXMgYSBwYXJhbWV0ZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBkYkNvbm5lY3Rpb24ucXVlcnkoc3FsUXVlcnksIChlcnJvciwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHRbMF0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlTmV3Q3VzdG9tZXIgPSAocmVxLCByZXMpID0+IHtcclxuXHJcbiAgICAvLyBEZWNsYXJlIHRoYXQgSSBzdG9yZSB0aGUgcmVxdWVzdCBib2R5IGluIGEgY29uc3RhbnRcclxuICAgIGNvbnN0IGN1c3RvbWVyID0gcmVxLmJvZHk7XHJcbiAgICAvLyBTbywgSSBjcmVhdGUgdGhlIG9iamVjdCB3aXRoIHRoZSB0YWJsZSBmaWVsZHMgYnkgY2FsbGluZyB0aGUgY29uc3RhbnQgY3VzdG9tZXJcclxuICAgIGNvbnN0IGN1c3RvbWVyT2JqID0gW1xyXG4gICAgICAgIGN1c3RvbWVyLmZpcnN0X25hbWUsXHJcbiAgICAgICAgY3VzdG9tZXIubGFzdF9uYW1lLFxyXG4gICAgICAgIGN1c3RvbWVyLmVtYWlsLFxyXG4gICAgICAgIGN1c3RvbWVyLmFnZVxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBUaGlzIG1ldGhvZCB2ZXJpZmllcyB0aGF0IHRoZSByZXF1ZXN0IGJvZHkgaGFzIGFsbCB0aGUgY29tcGxldGUgZmllbGRzLCBvdGhlcndpc2UgdGhlIG9wZXJhdGlvbiB3aWxsIG5vdCBiZSBleGVjdXRlZCBhbmQgc2VuZHMgYW4gZXJyb3IgbWVzc2FnZVxyXG4gICAgaWYgKCFjdXN0b21lci5maXJzdF9uYW1lIHx8ICFjdXN0b21lci5sYXN0X25hbWUgfHwgIWN1c3RvbWVyLmVtYWlsIHx8ICFjdXN0b21lci5hZ2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xyXG4gICAgICAgICAgICBFcnJvckNvZGU6IDIwNCxcclxuICAgICAgICAgICAgTWVzc2FnZTogJ0ZpZWxkcyBjYW5ub3QgYmUgZW1wdHknXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNxbFF1ZXJ5ID0gJ0lOU0VSVCBJTlRPIGN1c3RvbWVycyAoZmlyc3RfbmFtZSwgbGFzdF9uYW1lLCBlbWFpbCwgYWdlKSBWQUxVRVMgKCA/LD8sPyw/ICknO1xyXG5cclxuICAgIGRiQ29ubmVjdGlvbi5xdWVyeShzcWxRdWVyeSwgY3VzdG9tZXJPYmosIChlcnIsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbignQ3VzdG9tZXIgY3JlYXRlZCB3aXRoIGlkOiAnICsgcmVzdWx0Lmluc2VydElkKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUN1c3RvbWVyID0gKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocmVxLnBhcmFtcy5pZCk7XHJcbiAgICBjb25zdCBjdXN0b21lciA9IHJlcS5ib2R5O1xyXG4gICAgY29uc3QgY3VzdG9tZXJPYmogPSBbXHJcbiAgICAgICAgY3VzdG9tZXIuZmlyc3RfbmFtZSxcclxuICAgICAgICBjdXN0b21lci5sYXN0X25hbWUsXHJcbiAgICAgICAgY3VzdG9tZXIuZW1haWwsXHJcbiAgICAgICAgY3VzdG9tZXIuYWdlXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChpc05hTihpZCkpIHtcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oJ1lvdSBtdXN0IGVudGVyIGEgdmFsaWQgaWQgYXMgYSBwYXJhbWV0ZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWN1c3RvbWVyLmZpcnN0X25hbWUgfHwgIWN1c3RvbWVyLmxhc3RfbmFtZSB8fCAhY3VzdG9tZXIuZW1haWwgfHwgIWN1c3RvbWVyLmFnZSkge1xyXG4gICAgICAgIHJldHVybiByZXMuanNvbih7XHJcbiAgICAgICAgICAgIEVycm9yQ29kZTogMjA0LFxyXG4gICAgICAgICAgICBNZXNzYWdlOiAnRmllbGRzIGNhbm5vdCBiZSBlbXB0eSdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3FsUXVlcnkgPSBgVVBEQVRFIGN1c3RvbWVycyBTRVQgZmlyc3RfbmFtZSA9ID8sIGxhc3RfbmFtZSA9ID8sIGVtYWlsID0gPywgYWdlID0gPyBXSEVSRSBpZCA9ICR7aWR9YFxyXG5cclxuICAgIGRiQ29ubmVjdGlvbi5xdWVyeShzcWxRdWVyeSwgY3VzdG9tZXJPYmosICAoZXJyb3IsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvdyA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXMuc2VuZCgnTm8gY3VzdG9tZXIgd2FzIHVwZGF0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzLmpzb24oYEN1c3RvbWVyIHdpdGggaWQgJHtpZH0gdXBkYXRlZCBzdWNjZXNzZnVsbHlgKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZU9uZUN1c3RvbWVyID0gKHJlcSwgcmVzKSA9PiB7XHJcblxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChyZXEucGFyYW1zLmlkKTtcclxuXHJcbiAgICBpZiAoaXNOYU4oaWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCdZb3UgbXVzdCBlbnRlciBhIHZhbGlkIGlkIGFzIGEgcGFyYW1ldGVyJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBzcWxRdWVyeSA9IGBERUxFVEUgRlJPTSBjdXN0b21lcnMgV0hFUkUgaWQgPSAke2lkfWA7XHJcblxyXG4gICAgZGJDb25uZWN0aW9uLnF1ZXJ5KHNxbFF1ZXJ5LCBlcnJvciA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjsgXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYEN1c3RvbWVyIHdpdGggaWQgJHtpZH0gZGVsZXRlZCBzdWNjZXNzZnVsbHlgKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFsbEN1c3RvbWVycyA9IChyZXEsIHJlcykgPT4ge1xyXG5cclxuICAgIGxldCBzcWxRdWVyeSA9ICdUUlVOQ0FURSBUQUJMRSBjdXN0b21lcnMnO1xyXG5cclxuICAgIGRiQ29ubmVjdGlvbi5xdWVyeShzcWxRdWVyeSwgZXJyb3IgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7IFxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKCdBbGwgcmVjb3JkcyBoYXZlIGJlZW4gZXJhc2VkJyk7XHJcbiAgICB9KTtcclxufTsiLCJyZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcclxuaW1wb3J0IG15c3FsIGZyb20gJ215c3FsJztcclxuXHJcbmNvbnN0IGRiQ29ubmVjdGlvbiA9ICBteXNxbC5jcmVhdGVDb25uZWN0aW9uICh7XHJcbiAgICBob3N0OiBwcm9jZXNzLmVudi5EQl9IT1NULFxyXG4gICAgdXNlcjogcHJvY2Vzcy5lbnYuREJfVVNFUixcclxuICAgIHBhc3N3b3JkOnByb2Nlc3MuZW52LkRCX1BBU1NXT1JELFxyXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX05BTUUsXHJcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5EQl9QT1JULFxyXG59KTtcclxuXHJcbmRiQ29ubmVjdGlvbi5jb25uZWN0KChlcnJvcikgPT4ge1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdQUk9UT0NPTF9DT05ORUNUSU9OX0xPU1QnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdFUl9DT05fQ09VTlRfRVJST1InKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGhhcyB0b28gbWFueSBjb25uZWN0aW9ucy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGNvbm5lY3Rpb24gd2FzIHJlZnVzZWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGF0YWJhc2UgY29ubmVjdGVkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0aW9uOyIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XHJcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcic7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5cclxuLy8qIEluaXRpYWxpemF0aW9uc1xyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcbmRvdGVudi5jb25maWcoKTtcclxuXHJcbi8vKiBTZXR0aW5nc1xyXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuTk9ERV9QT1JUO1xyXG5cclxuLy8qIE1pZGRsZXdhcmVzXHJcbmFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XHJcblxyXG4vLyogRW5hYmxpbmcgY29ycyBmb3IgYWxsIHJlcXVlc3QgYnkgdXNpaW5nIGNvcnMgbWlkZGxld2FyZVxyXG5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG4vKipcclxuICogKiBQYXJzZSByZXF1ZXN0IG9mIGNvbnRlbnQtdHlwZTogYXBwbGljYXRpb24vanNvblxyXG4gKiAqIFBhcnNlcyBpbmNvbm1pbmcgcmVxdWVzdCB3aXRoIEpTT04gcGF5bG9hZHNcclxuICovXHJcbmFwcC51c2UoIGV4cHJlc3MuanNvbigpKTtcclxuYXBwLnVzZSggZXhwcmVzcy51cmxlbmNvZGVkKCB7IGV4dGVuZGVkOnRydWUgfSApICk7XHJcblxyXG4vLyogUm91dGVzXHJcbnJvdXRlcihhcHApO1xyXG5cclxuLy8qIFN0YXJ0aW5nIHRoZSBzZXJ2ZXJcclxuYXBwLmxpc3RlbiggcG9ydCwgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYFNlcnZlciBydW5uaW5nIGluIHBvcnQgJHtwb3J0fWApO1xyXG59KTsiLCIvLyogSW1wb3J0IHRoZSBjdXN0b21lcnMucm91dGVzIGZpbGUgd2l0aCBhbGwgZGUgbWV0aG9kc1xyXG5pbXBvcnQgY3VzdG9tZXJSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvY3VzdG9tZXJzLnJvdXRlcyc7XHJcblxyXG4vLyogSGVyZSBJIGRlZmluZWQgdGhlIGZpcnN0IGVuZHBvaW50XHJcbmNvbnN0IHJvdXRlciA9IChhcHApID0+IHtcclxuICAgIGFwcC51c2UoJy9jdXN0b21lcnMnLCBjdXN0b21lclJvdXRlcyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwiLy8qIEltcG9ydCBleHByZXNzIGFuZCBpbml0aWFsaXplIHRoZSByb3V0ZXJzXHJcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuLy8qIENhbGwgdGhlIGNvbnRyb2xsZXIgd2l0aCB0aGUgbWV0aG9kc1xyXG5pbXBvcnQgeyBnZXRDdXN0b21lcnMsIGdldEN1c3RvbWVyc0J5SWQsIGNyZWF0ZU5ld0N1c3RvbWVyLCB1cGRhdGVDdXN0b21lciwgZGVsZXRlT25lQ3VzdG9tZXIsIGRlbGV0ZUFsbEN1c3RvbWVycyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2N1c3RvbWVyQ29udHJvbGxlcidcclxuXHJcbi8vKiBIZXJlIEkgZGVmaW5lZCB0aGUgbWV0aG9kcyBcclxucm91dGVyLmdldCgnLycsIGdldEN1c3RvbWVycyk7IC8vbG9jYWxob3N0OjUwMDAvY3VzdG9tZXJzL1xyXG5yb3V0ZXIuZ2V0KCcvaWQvOmlkJywgZ2V0Q3VzdG9tZXJzQnlJZCk7IC8vbG9jYWxob3N0OjUwMDAvY3VzdG9tZXJzL2lkLzFcclxucm91dGVyLnBvc3QoJy9hZGQnLCBjcmVhdGVOZXdDdXN0b21lcik7IC8vbG9jYWxob3N0OjUwMDAvY3VzdG9tZXJzL2FkZFxyXG5yb3V0ZXIucHV0KCcvZWRpdC86aWQnLCB1cGRhdGVDdXN0b21lcik7IC8vbG9jYWxob3N0OjUwMDAvY3VzdG9tZXJzL2VkaXQvMVxyXG5yb3V0ZXIuZGVsZXRlKCcvZGVsZXRlLzppZCcsIGRlbGV0ZU9uZUN1c3RvbWVyKTsgLy9sb2NhbGhvc3Q6NTAwMC9jdXN0b21lcnMvZGVsZXRlLzFcclxucm91dGVyLmRlbGV0ZSgnL2RlbGV0ZUN1c3RvbWVycycsIGRlbGV0ZUFsbEN1c3RvbWVycyk7IC8vbG9jYWxob3N0OjUwMDAvY3VzdG9tZXJzL2RlbGV0ZUN1c3RvbWVyc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJteXNxbFwiKTs7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==