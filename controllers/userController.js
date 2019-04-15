var User = require('../collections/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
var Restaurants = require('../collections/restaurant');
var Dish = require('../collections/dish');

/**
* @api {post} user Create a new user
* @apiName CreateUser
* @apiGroup User
* @apiVersion 0.1.0
*
* @apiParam {String} name First Name
* @apiParam {String} lastname Last Name
* @apiParam {String} phone Phone of the User
* @apiParam {String} password password of the User (min 8 characters)
* @apiParam {String} phone Phone of the User
* @apiParam {String} email Email of the User (unique)
* @apiParam {String} [gender] Phone of the User
* @apiParam {String} [facebookId] Facebook ID of the User
* @apiParam {String} [googleId] Facebook ID of the User
* @apiParam {String} [profile] Url from image profile of the User
* @apiParam {String} [probando] Facebook ID of the User

* @apiSuccess {String} accessToken  Authentication Token
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
*     }
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/
module.exports.recommendDish = function (req,res) {
console.log("adasdas");
  var user = req.headers.user._doc;
  var id = req.params.id;
  console.log(id);
  Dish.findOne({_id:req.params.id},function (err,dishes) {
    if(err) return res.sendStatus(503);
    if(!dishes) return res.sendStatus(503);
    console.log("adasdas");
    dishes.recommendations.push(user._id);
    console.log(user);
    dishes.save(function (err) {
      if(err) return res.sendStatus(503);
      return res.sendStatus(201);
    })
  });
}

module.exports.create = function (req,res) {

    var params = req.body;
    var user = new User();

    user.name = params.name;
    user.lastname = params.lastname;
    user.phone = params.phone;
    user.password = params.password;
    user.gender = params.gender;
    user.facebookId = params.facebookId;
    user.googleId = params.googleId;
    user.birthday = params.birthday;
    user.email = params.email;
    user.profile = params.profile;

    user.save(function (err) {
        if(err){
          console.log(err);
          return res.sendStatus(503)
        }
        login(params,function (err,user) {
          if(err) return res.sendStatus(503);
          if(!user) return res.sendStatus(503);

          var token = jwt.sign(user,config.secret,{
            expiresIn : 60*60*24
          });

          return res.json({accessToken:token});
        });
    });


}

/**
* @api {get} user Retrieve all users registered (authentication)
* @apiName GetAllUser
* @apiGroup User
* @apiVersion 0.1.0

*/

module.exports.getAll = function (req,res) {
    return res.sendStatus(200)
}

module.exports.createSocial = function (req,res) {

}


/**
* @api {put} user/:id Edit a user from Id
* @apiName EditUser
* @apiGroup User
* @apiVersion 0.1.0

*
* @apiParam {Number} id Users unique ID.
* @apiParam {String} phone Phone of the User.
* @apiParam {String} [nationality] Nationality of the User.
*
*
* @apiSuccess {String} accessToken  Authentication Token
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
*     }
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/

module.exports.edit = function (req,res) {
    var params = req.body;
    console.log(params);
    User.findOne({_id:req.params.id},function (err,user) {
      if(err) return res.sendStatus(503);
      if(!user) return res.sendStatus(503);

      user.phone = params.phone;
      user.nationality = params.nationality;
      user.save(function (err) {
        if(err) return res.sendStatus(503);
        console.log('entro aqui');
        var token = jwt.sign(user,config.secret,{
          expiresIn : 60*60*24
        });

        return res.json({accessToken:token});
      })
    })
    // return res.sendStatus(200)
}


/**
* @api {put} user/:id Get a user with Id
* @apiName getUser
* @apiGroup User
* @apiVersion 0.1.0

*/


module.exports.getOne = function (req,res) {
  var ctx = {};
  Restaurants.find().limit(5).populate('photos').exec(function (err,restaurants) {
    ctx.restaurants = restaurants;
    User.findOne({_id:req.params.id})
    .populate('favorites')
    .exec(function (err,user) {
      ctx.user = user;
      if(err) return res.sendStatus(503);
      console.log(ctx);
      return res.json(ctx);
    });
  })
}

/**
* @api {post} login Login for traditional user
* @apiName loginUser
* @apiGroup User
*
* @apiVersion 0.1.0

* @apiParam {String} email Email of the User
* @apiParam {String} password Password of the User
*
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
* @apiSuccess {Object} params.user  User Profile (All information)
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
*       "user": Object
*     }
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/


module.exports.loginUser = function (req,res) {
  var params = req.body;
  console.log(params);
  if(params.email==""|| !Object.keys(params).length) return res.sendStatus(401);

  login(params,function (err,user) {
    if(err) return res.sendStatus(503);
    if(!user) return res.sendStatus(401);

    var token = jwt.sign(user,config.secret,{
      expiresIn : 60*60*24
    });

    return res.json({accessToken:token,user:user});
  });
}

/**
* @api {post} login/restaurant Login for chief of restaurant
* @apiName loginRestaurant
* @apiGroup User
* @apiVersion 0.1.0

*
* @apiParam {String} email Email of the User
* @apiParam {String} password Password of the User
*
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
* @apiSuccess {Object} params.user  User Profile and Restaurant Profile (All information)
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/


module.exports.loginRestaurant = function (req,res) {
  var params = req.body;
  if(params.email==""|| !Object.keys(params).length) return res.sendStatus(401);
  var ctx = {}
  login(params,function (err,user) {
    if(err) return res.sendStatus(503);
    if(!user) return res.sendStatus(401);
    Restaurants.findOne({chiefId:user._id},function (err,restaurant) {
      if(err) return res.sendStatus(503);
      if(!restaurant) return res.sendStatus(503);
      ctx.user = user;
      ctx.restaurant = restaurant;
      // user.restaurant = restaurant;
      var token = jwt.sign(ctx,config.secret,{
        expiresIn : 60*60*24
      });

      return res.json({accessToken:token,user:user});
    });
  });

}

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

/**
* @api {put} user/photo Update profile photo of user
* @apiName updatePhotos
* @apiGroup User
* @apiVersion 0.1.0

*
* @apiParam {String} dataURL Image encode to base64
* @apiParam {String} name Image Name
*
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/

module.exports.updatePhoto = function (req,res) {
  var data = req.body;
  var imageBuffer =  decodeBase64Image(data.dataURL);
  var user = req.headers.user._doc;
  dbx.filesUpload({contents:imageBuffer.data,autorename:true})
  .then(function(response) {
      dbx.sharingCreateSharedLink({path:'/'+data.name})
      .then(function (response) {
          User.findOne({_id:user._id},function (err,user) {
            if(err) return res.sendStatus(503);
            if(!user) return res.sendStatus(503);
            user.profile = response.url.replace("dl=0","raw=1");
            user.save(function (err) {
              if(err) return res.sendStatus(503);

              var token = jwt.sign(user,config.secret,{
                expiresIn : 60*60*24
              });

              return res.json({accessToken:token});
            })
          })

      })
      .catch(function (error) {
        return res.sendStatus(503);
      })
  })
  .catch(function(error) {
      console.log('[ERROR]');
      console.log(error);
  });
}

/**
* @api {post} user/favorites Save a favorite restaurant
* @apiName saveFavorite
* @apiGroup User
* @apiVersion 0.1.0

*
* @apiParam {String} restaurantId Restaurant Id
*
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/


module.exports.saveFavorite = function (req,res) {
  var user = req.headers.user._doc;
  var restaurantId = req.body.restaurantId;
  User.findOne({_id:user._id},function (err,user) {
    if(err) return res.sendStatus(503);
    if(!user) return res.sendStatus(503);
    if(user.favorites.indexOf(restaurantId)>-1) return res.sendStatus(200);
    user.favorites.push(restaurantId);
    user.save(function (err) {
      if(err) return res.sendStatus(503);
      return res.sendStatus(200);
    });
  });
}

/**
* @api {get} user/favorites Get all favorite restaurants of an user
* @apiName userFavorites
* @apiGroup User
* @apiVersion 0.1.0
*
*
*
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/


module.exports.favorites = function (req,res) {
  var user = req.headers.user._doc;
  User.findOne({_id:user._id}).populate('favorites').exec(function (err,user) {
    if(err) return res.sendStatus(503);
    if(!user) return res.sendStatus(503);
    return res.json(user.favorites);
  });
}

function login(params,cb){

  var facebookId = params.facebookId||"";
  var googleId = params.googleId || "";
  var email = params.email || "";
  var password = params.password || "";
  User.findOne({
    $or:[
      {$and:[{email:params.email},{password:params.password}]},
      {$and:[{email:params.email},{facebookId:params.facebookId}]},
      {$and:[{email:params.email},{googleId:params.googleId}]}
    ]} ,cb);

}

module.exports.list = function (req,res) {

    var page = req.query.page || 1;

     User.find({}).exec(function (err,users) {
          if(err) return res.sendStatus(503);
          //console.log(restaurants.chiefId);

            return res.json(users);

       });
}
