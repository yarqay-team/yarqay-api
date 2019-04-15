  var Restaurant = require('../collections/restaurant');
var Photo = require('../collections/photo');
var Comment = require('../collections/comment');
var User = require('../collections/user');
var restaurantSeeds = require('../seeds/restaurants');
var User = require('../collections/user');
var Service = require('../collections/services');
var Dish = require('../collections/dish');
var _  = require('underscore');
var fcmController = require('./fcmController');
var slug = require('slug');
var mongoose = require('mongoose');
/**
* @api {post} restaurant Create a new restaurant
* @apiName CreateRestaurant
* @apiGroup Restaurants
* @apiVersion 0.1.0
*
* @apiParam {String} name Name of the restaurant
* @apiParam {String} address Address of the restaurant
* @apiParam {String} ruc RUC of the restaurant
* @apiParam {String} phone Phone of the restaurant
* @apiParam {String} chiefId ID of the User (Chief of the restaurant)
* @apiParam {String} start Start Time of the restaurant
* @apiParam {String} end End Time of the restaurant
* @apiParam {String} speciality Speciality of the restaurant
* @apiParam {String} city City of the restaurant
* @apiParam {Number} latitude Latitude of the restaurant
* @apiParam {Number} longitude Longitude of the restaurant
* @apiParam {Array} services Ids of services like "Baño, TV, etc"
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/

module.exports.create = function (req,res) {
    var params = req.body;
    var restaurant = new Restaurant();
    console.log(params);
    restaurant.name = params.nameRest;
    restaurant.slug = slug(params.name);
    restaurant.address = params.address;
    restaurant.ruc = params.ruc;
    restaurant.phone = params.cellphoneRest;
    restaurant.chiefId = params.chiefId;
    restaurant.start = params.start;
    restaurant.end = params.end;
    restaurant.speciality = params.speciality;
    restaurant.city = params.cityRest;
    restaurant.latitude = params.latitude;
    restaurant.longitude = params.longitude;
    restaurant.services = params['services[]'];
    //restaurant.services = JSON.parse(params.services);
    console.log('LLega aqui');

    restaurant.save(function (err) {
        if(err){
            console.log(err);
            return res.sendStatus(503);
        }
        else {
            console.log('registro exitoso');
          return res.sendStatus(200);
        }
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

module.exports.updatePhoto = function (req,res) {
  var data = req.body;
  var imageBuffer =  decodeBase64Image(data.dataURL);
  var user = req.headers.user._doc;
  dbx.filesUpload({path: '/'+data.name,contents:imageBuffer.data,autorename:true})
  .then(function(response) {
      dbx.sharingCreateSharedLink()
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
* @api {get} restaurant Restaurants recommendations
* @apiName RecommendedRestaurants
* @apiGroup Restaurants
* @apiVersion 0.1.0
*
*
* @apiSuccess {Array} Restaurants Recommended restaurants
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/


module.exports.recommendations = function (req,res) {
  Restaurant.find({}).limit(5).exec(function (err,restaurants) {
    if(err) return res.sendStatus(503);
    return res.json(restaurants);
  })
}

/**
* @api {get} restaurant Restaurants Comments
* @apiName CommentsRestaurants
* @apiGroup Restaurants
* @apiVersion 0.1.0
*
*
* @apiSuccess {Array} Restaurants Comments restaurants
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/
module.exports.comments = function (req,res) {
  var id = req.params.id;
  Comment.find({restaurantId:id})
  .populate('user')
  .sort({createdAt: 'desc'})
  .exec(function (err,comments) {
    if(err) return res.sendStatus(503);
    if(!comments) return res.sendStatus(503);
    return res.json(comments);
  });
}

/**
* @api {get} restaurant Create a new Restaurants Chief
* @apiName ChiefsRestaurants
* @apiGroup Restaurants
* @apiVersion 0.1.0
* @apiParam {String} name First Name
* @apiParam {String} lastname Last Name
* @apiParam {String} phone Phone of the User
* @apiParam {String} password password of the User (min 8 characters)
* @apiParam {String} cellphone Cellphone of the User
* @apiParam {String} dni Dni of the User
* @apiParam {String} email Email of the User (unique)
* @apiParam {String} city City of the User
* @apiParam {String} country Country of the User
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/

module.exports.createChief = function (req,res) {
  var params = req.body;
  // var error = undefined;
  console.log(params);
  var user = new User();
  user.name = params.name;
  user.lastname = params.lastname;
  user.phone = params.phone;
  user.email = params.email;
  user.dni= params.dni;
  user.city=params.city;
  user.country = params.country;
  user.password = params.password;
  user.cellphone= params.cellphone;
  user.save(function (err) {
    console.log(err);
    console.log(user._id);
    if(err) return res.sendStatus(503);
    return res.send({_id:user._id});
  })

}

module.exports.updateChiefRestaurant = function (req,res) {
  var params = req.body;
  var id = req.params.id;
  // var error = undefined;
  console.log(params);
  User.findOne({_id:id},function (err,user) {
      if(err) return res.sendStatus(503);
      if(!user) return res.sendStatus(503);

      user.name = params.name;
      user.lastname = params.lastname;
      user.phone = params.phone;
      user.email = params.email;
      user.dni = params.dni;
      user.city = params.city;
      user.country = params.country;
      user.password = params.password;
      user.cellphone= params.cellphone;
      console.log(user);
      user.save(function (err) {
        console.log(err);
        if(err) return res.sendStatus(503);
        console.log('retornando id ',user._id);
        return res.send({_id:user._id});
      })
  })

}


module.exports.updateRestaurant = function (req,res) {
  var params = req.body;
  var id = req.params.id;
  // var error = undefined;
  console.log(params);
  Restaurant.findOne({_id:id},function (err,restaurant) {
      if(err) return res.sendStatus(503);
      if(!restaurant) return res.sendStatus(503);

      restaurant.name = params.nameRest;
      restaurant.address = params.address;
      restaurant.ruc = params.ruc;
      restaurant.phone = params.cellphoneRest;
      restaurant.chiefId = params.chiefId;
      restaurant.start = params.start;
      restaurant.end = params.end;
      restaurant.speciality = params.speciality;
      restaurant.city = params.cityRest;
      restaurant.latitude = params.latitude;
      restaurant.longitude = params.longitude;
      restaurant.services = params['services[]'];
      //restaurant.services = JSON.parse(params.services);
      //console.log('LLega aqui');

      restaurant.save(function (err) {
          if(err){
              console.log(err);
              return res.sendStatus(503);
          }
          //console.log('registro exitoso');
          else {

            return res.sendStatus(200);
          }
      });

  })

}

module.exports.edit = function (req,res) {
    return res.sendStatus(200)
}

module.exports.getAll = function (req,res) {
    return res.sendStatus(200)
}

/**
* @api {put} restaurant/:id Get a restaurant with Id
* @apiName getRestaurant
* @apiGroup Restaurant
* @apiVersion 0.1.0

*/


module.exports.getOne = function (req,res) {

    Restaurant.findOne({slug:req.params.slug},{photos:0},function (err,restaurant) {
        if(err) return res.sendStatus(503);
        if(!restaurant) return res.sendStatus(503);
        var ctx = {};
        ctx.restaurant = restaurant;
        console.log(restaurant._id);
        Photo.find({entityId:restaurant._id},function (err,photos) {
          if(err) return res.sendStatus(503);
          ctx.photos = photos;
          return res.json(ctx);
        })
    })
}


module.exports.genSlugs = function (req,res) {
  Restaurant.find({},function (err,restaurants) {
    for (var i = 0,restaurant; restaurant = restaurants[i]; i++) {
      restaurant.slug = slug(restaurant.name);
      restaurant.save();
    }
  });
}


/**
* @api {put} restaurant/:id Get a restaurant with Id
* @apiName getRestaurantSlugs
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.getProfile = function (req,res) {
      console.log(req.params.slug);
      //return res.json(dataservice);

    Restaurant.findOne({slug:req.params.slug}).populate('services').exec(function (err,restaurant) {
        if(err) return res.sendStatus(503);
        if(!restaurant) return res.sendStatus(503);
        var ctx = {};
        ctx.restaurant = restaurant;
        console.log(restaurant);
        Dish.find({restaurantId:restaurant._id},function(err,dishes){
        console.log('recuperando datos');
        ctx.dishes  = dishes;
        //console.log(ctx.dishes[0].name);
        Photo.find({entityId:restaurant._id},function (err,photos) {
            if(err) return res.sendStatus(503);
            ctx.photos = photos;

            Comment
            .find({ restaurantId: restaurant._id })
            .populate('user')
            .sort({createdAt: 'desc'})
            .exec(function (err,comments) {
              if(err) return res.sendStatus(503);
              console.log('Entro aqui');
              ctx.comments = comments;
              //console.log(ctx.restaurant.services);
              //ctx.restaurant.dish = nameDish;
              //console.log(ctx);
              console.log(ctx);
              return res.json(ctx);
            })
        })
    })
  })

}

function formatDate(date) {
  date = new Date(date);
  return date.getDate()+ "-" + date.getMonth() + "-" + date.getFullYear();
}


module.exports.seed = function (req,res) {
  restaurantSeeds.forEach(function (_restaurant) {
    var restaurant = new Restaurant();
    restaurant.name = _restaurant.name;
    restaurant.city = _restaurant.city;
    restaurant.speciality = _restaurant.speciality;
    restaurant.end = _restaurant.end;
    restaurant.start = _restaurant.start;
    restaurant.phone = _restaurant.phone;
    restaurant.ruc = _restaurant.ruc;
    restaurant.address = _restaurant.address;

    restaurant.save(function (err) {

    })
  });

  return res.send(200);
}


/**
* @api {put} restaurant Get For Locations
* @apiName getForLocations
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.getForLocations = function (req,res) {
  Restaurant.find({},{latitude:1,longitude:1,name:1,slug:1,address:1,speciality:1,start:1,end:1},function (err,restaurants) {
    if(err) return res.sendStatus(503);
// <<<<<<< HEAD
//       console.log(restaurants);
//       return res.json(restaurants);
//     }
//   );
// =======
    console.log(restaurants);
    var ctx={};
    ctx.restaurants = restaurants;

    return res.json(restaurants);
  }
);
//>>>>>>> a56237177cbb37f755882979dc9b7b063c6ba2d2
}

/**
* @api {get} restaurant Get Service from Restaurant
* @apiName search
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.search = function (req,res) {
  console.log('parametosa');
    //console.log(req.body);
    //console.log(req);
    var page = req.query.page;
    console.log(req.body);
    //console.log(req);

    console.log(page);

    Service.find({name: new RegExp(req.query.q,"i")},function(err,services){
       var ids = _(services).map(function(service){
         return service._id;
       });

       Restaurant.find({$or:[{name:new RegExp(req.query.q,"i")},{speciality:new RegExp(req.query.q,"i")},{services:{$in:ids}}]}).limit(6).skip(6*page).
        populate('photos').exec(function (err,restaurants) {
          if(err) return res.sendStatus(503);

          //console.log(restaurants);
          return res.json(restaurants);
       });
    })
}

/**
* @api {get} restaurant Get list photos from Restaurant
* @apiName list
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.list = function (req,res) {

    var page = req.query.page || 1;

     Restaurant.find({}).populate('user').exec(function (err,restaurants) {
          if(err) return res.sendStatus(503);
          //console.log(restaurants.chiefId);

            // User.findOne({ _id: restaurants.chiefId },{name:1,lastname:1},  function (err,users) {
            //   console.log('Entro aqui');
            //   console.log(users);
            //   // restaurants.user_name = users.name;
            //   // restaurants.user_lastname = users.lastname;
            //   //if(err) return res.sendStatus(503);
            //   //console.log(restaurants);
            //
            //
            // });
            console.log("Restaurants", restaurants);
            return res.json(restaurants);

       });
}



module.exports.login = function (req,res) {
  User.findOne({ email:req.body.email, password:req.body.password },function (err,user) {
    if(err) return res.sendStatus(503);
    if(!user) return res.sendStatus(503);
    return res.sendStatus(200);
  })
}

/**
* @api {get} restaurant Send notification at user
* @apiName findOne
* @apiGroup Restaurant
* @apiVersion 0.1.0
*
* @apiParam {String} title restaurant's name
* @apiParam {String} message message of the restaurant
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/


module.exports.sendNotification = function (req,res) {
  var user = req.headers.user;
  console.log(user);
  var restaurantId = user.restaurant._id;


  Restaurant.findOne({_id:restaurantId},function (err,restaurant) {
    var params = {
      title: restaurant.name,
      message: req.body.message,
      data:{
        title:restaurant.name,
        id:restaurant._id,
        message:req.body.message
      }
    }
    fcmController.sendMessage(params,function (err) {
      console.log(err);
      if(err) return res.sendStatus(503);
      return res.sendStatus(200);
    })

  })
}

/**
* @api {put} restaurant Count Feel of the comment Restaurant's
* @apiName countFeel
* @apiGroup Restaurant
* @apiVersion 0.1.0
*
* @apiParam {String} positives Comment positives
* @apiParam {String} negatives Comment negatives
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/

module.exports.countFeel = function (req,res) {
  var user = req.headers.user;
  console.log(user);
  var restaurantId = user.restaurant._id;
  Comment.find({restaurantId:restaurantId},function (err, comments) {
    if(err) return res.sendStatus(503);
    if(!comments) return res.sendStatus(503);
    var positives = 0,
        negatives = 0;
    comments.forEach(function (comment) {
      if(comment.feel == "positive"){
        positives++;

      }else if (comment.feel == "negative") {

        negatives++;
      }
    })
    return res.json({
        positive: positives,
        negative: negatives
    })
  })
}

function savePhoto(data) {
  return new Promise(function (resolve,reject) {
    var photo = new Photo;
    photo.url = data.url;
    photo.entityId = data.entityId;
    photo.save(function (err) {
      if(err) return reject(err);
      return resolve(photo._id);
    })
  })
}
/**
* @api {put} restaurant/photo Update profile photo of restaurant
* F@apiName updatePhotos
* @apiGroup Restaurant
* @apiVersion 0.1.0
*
* @apiParam {String} dataURL Image encode to base64
* @apiParam {String} entity Image Id
*
* @apiSuccess {Object} params  Parameters
* @apiSuccess {String} params.accessToken  Authentication Token
*
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
**/
module.exports.updatePhotos = function (req,res) {
  var id = req.params.id;
  var urls = req.body.urls;
  var photos = req.body.photos;
  Restaurant.findOne({_id:id},function (err,restaurant) {
    if(err) return res.sendStatus(503);
    if(!restaurant) return res.sendStatus(503);
    var savePhotos = []
    for (var i = 0; i < photos.length; i++) {
      var data = {
        url: photos[i],
        entityId: restaurant._id
      }
      savePhotos.push(savePhoto(data));
    }
    Promise.all(savePhotos).then(function (values) {
      console.log(values);
      restaurant.photos = values;
      restaurant.save(function (err) {
        if(err) return res.sendStatus(503);
        return res.sendStatus(201);
      })
    });
  })
}
/**
* @api {put} restaurant Autocomplete services
* @apiName autocomplete
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.autocomplete = function (req,res) {
    Service.find({},{name:1},function(err,services){
      var dataservice = services;
      //console.log(services);

    Restaurant.find({},{name:1,speciality:1},function (err,restaurants) {
        if(err) return res.sendStatus(503);
        var data = restaurants.concat(dataservice);
        return res.json(data);
    }
  );
  });
}

/**
* @api {get} restaurant Get services from Restaurant
* @apiName services
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.services = function (req,res) {
  Restaurant.findOne({_id:req.params.id}).populate('services').exec(function (err,restaurant) {
    if(err) return res.sendStatus(503);
    if(!restaurant) return res.sendStatus(503);
    console.log(restaurant.services);
    return res.json(restaurant.services);
  })
  // Service.find({restaurantId:req.params.id},function (err,services) {
  //
  // })
}

/**
* @api {get} restaurant Get services
* @apiName getService
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/
module.exports.getService = function (req,res) {
    Service.find({},{_id:1,name:1},function(err,services){
      console.log(services);
      return res.json(services);

  });
}



//para el perfil de cada restaurante
// module.exports.getServicesRest = function (req,res) {
//     Service.find({},{name:1},function(err,services){
//       console.log('recuperando servicios');
//       var dataservice = services;
//       console.log(dataservice);
//       return res.json(dataservice);
//
//   });
// }

/**
* @api {put} restaurant Add Service at Restaurant
* @apiName addService
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/

module.exports.addService = function (req,res) {
    var params = req.body;
    console.log('hola');
    console.log(params);
    var service = new Service();

    service.name = params.name;
    // console.log('LLega aqui');
    service.save(function (err) {
        if(err){
            console.log(err);
            return res.sendStatus(503);
        }
        return res.sendStatus(200);
    })

}

/**
* @api {put} restaurant Add dish at Restaurant
* @apiName addDish
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/
module.exports.addDish = function (req,res) {
    var params = req.body;
    console.log('llego a add');
    console.log(params);
    var dish = new Dish();
    dish.name = 'ceviche';
    dish.restaurantId = '582dee640f4932001297f121';
//    dish.name = params.name;
//    dish.restaurantId = params.restaurantId;
     console.log('LLega aqui');
    dish.save(function (err) {
        if(err){
            console.log(err);
            return res.sendStatus(503);
        }
        console.log(dish);
        return res.sendStatus(200);
    })
}

/**
* @api {post} restaurant Recommend Dish
* @apiName recommendDish
* @apiGroup Restaurant
* @apiVersion 0.1.0
*/
module.exports.recommendDish = function (req,res) {

  var user = req.headers.user._doc;

  Dish.findOne({_id:req.params.dish,restaurantId:req.params.restaurantId},function (err,dishes) {
    if(err) return res.sendStatus(503);
    if(!dishes) return res.sendStatus(503);

    dishes.recommendations.push(user._id);
    dishes.save(function (err) {
      if(err) return res.sendStatus(503);
      return res.sendStatus(200);
    })

  });
}


module.exports.editData = function (req,res) {
    Restaurant.findOne({_id:req.params.id}).populate('services').exec(function (err,restaurant) {
        if(err) return res.sendStatus(503);
        if(!restaurant) return res.sendStatus(503);
        var ctx = {};
        ctx.restaurant = restaurant;
        Dish.find({restaurantId:req.params.id},function(err,dishes){
        console.log('recuperando datos');
        ctx.dishes  = dishes;
        //console.log(ctx.dishes[0].name);
        Photo.find({entityId:restaurant._id},function (err,photos) {
            if(err) return res.sendStatus(503);
            ctx.photos = photos;

            User
            .findOne({ _id: restaurant.chiefId })
            .exec(function (err,users) {
              if(err) return res.sendStatus(503);
              console.log('Entro aqui');
              ctx.user = users;
              //console.log(ctx.restaurant.services);
              //ctx.restaurant.dish = nameDish;
              //console.log(ctx);

              console.log(ctx.user);
              Service.find({},{_id:1,name:1},function(err,services){
                console.log(services);
                ctx.services = services;
                return res.json(ctx);

              });

            })
        })
    })
  })

}
// module.exports.viewServices = function (req,res) {
//     Services.find({name: new regex(req.query.q,"i")},function(err,services){
//           var ids = _(services).map(function(service){
//             return service._id;
//           }
//           Restaurants.find({services:{$in:ids})
//         })
//     }
//   );
// }
