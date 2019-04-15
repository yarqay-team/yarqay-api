var Comment = require('../collections/comment');
var xss = require('xss');
var _  = require('underscore');

/**
* @api {post} comment Create a new comments
* @apiName CreateComment
* @apiGroup Comments
* @apiVersion 0.1.0
*
* @apiParam {String} user ID of the User (User of the comment)
* @apiParam {String} restaurantId ID of the Restaurant (Restaurant own)
* @apiParam {String} text Text of the restaurant

* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/
module.exports.create = function (req,res) {

    var params = req.body;

    var comment = new Comment();
    comment.user =  req.headers.user._doc._id;
    comment.restaurantId = params.restaurantId;
    comment.text = xss(params.text);
    getFeel(comment.text,function (value) {
        comment.feel= value;
        comment.save(function (err) {
          if(err){
            console.log(err);
            return res.sendStatus(503);
          }
          console.log(comment);
          return res.send(comment._id).status(200);
        })
    });

}

/**
* @api {put} comment Edit a comment from Restaurant
* @apiName EditComment
* @apiGroup Comments
* @apiVersion 0.1.0
*
* @apiParam {String} text Text of the restaurant

* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/

module.exports.edit = function (req,res) {

  var user = req.headers.user._doc;

  Comment.findOne({_id:req.params.id,user:user._id},function (err,comment) {
    if(err) return res.sendStatus(503);
    if(!comment) return res.sendStatus(503);

    comment.text = req.body.text;
    comment.save(function (err) {
      if(err) return res.sendStatus(503);
      return res.sendStatus(200);
    })

  });
};

/**
* @api {delete} comment Delete a comment from Restaurant
* @apiName DeleteComment
* @apiGroup Comments
* @apiVersion 0.1.0
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
* @apiErrorExample {json} Error-Response:
*     HTTP/1.1 503 Service unavailable
*/


module.exports.delete = function (req,res) {
  var user = req.headers.user._doc;
  Comment.remove({_id:req.params.id,user:user._id},function (err) {
    if(err) return res.sendStatus(503);
    return res.sendStatus(200);
  })
}


module.exports.addReaction = function (req,res) {
  var type = req.body.type,
      _id = req.headers.user._doc._id,
      reaction = {
        user:  _id,
        type: type
      }


    Comment.update(
      {_id:req.params.id},
      { $pull: { 'reactions': { user: _id } } },
      function (err,numAffected) {
        console.log('entro aqui');
        if(err) return res.sendStatus(503);
        Comment.update(
          {_id:req.params.id, 'reactions.user' : { $nin: [_id] }},
          {$push:{reactions: reaction }},function (err,numAffected) {
            console.log(numAffected);
            if(err||numAffected.n==0) return res.sendStatus(503)

            Comment.findOne({_id:req.params.id},function (err,comment) {
              if(err) return res.sendStatus(503);
              return res.json({id:comment._id,reactions:comment.reactions});
            });
          });
        });
}

module.exports.getBestComment = function (req,res) {

  var restaurant = req.query.q;

  console.log('bestComment');
  Comment.find({restaurantId:restaurant,'reactions.type':1},function (err,comment) {
    if(err) return res.sendStatus(503);
    if(!comment) return res.sendStatus(503);
    console.log(comment);
    var types = _(comment).map(function(comments){
      var j,cont=0,idcommend;
      idcommend = comments._id;
      for(j=0;j<comments.reactions.length;j++)
        {
          if(comments.reactions[j].type == 1)
          {
            cont=cont +1;
          }
          //console.log(comments.reactions[j].type);
        }
      return {
        idcommend: idcommend,
        count:cont
      };

  })
//   var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// _.max(stooges, function(stooge){ return stooge.age; });
    var bCommend = _.max(types, function(bComends){ return bComends.count; });
    console.log(bCommend);
    return res.json(bCommend);

    //comment.text = req.body.text;
    //comment.save(function (err) {
      //if(err) return res.sendStatus(503);
      //return res.sendStatus(200);
    //})

  });
};



module.exports.getWorseComment = function (req,res) {

  var restaurant = req.query.q;

  console.log('worseComment');
  Comment.find({restaurantId:restaurant,'reactions.type':2},function (err,comment) {
    if(err) return res.sendStatus(503);
    if(!comment) return res.sendStatus(503);
    console.log(comment);
    var types = _(comment).map(function(comments){
      var j,cont=0,idcommend;
      idcommend = comments._id;
      for(j=0;j<comments.reactions.length;j++)
        {
          if(comments.reactions[j].type == 2)
          {
            cont=cont +1;
          }

        }
      return {
        idcommend: idcommend,
        count:cont
      };

  })
    var wCommend = _.max(types, function(wComends){ return wComends.count; });
    console.log(wCommend);
    return res.json(wCommend);
  });
};

function getFeel (textFeel,cb){

  translate(textFeel,function (res) {
      getSent(res,cb);//este cb es la funcion guardar el comentario
  })

};

function translate(text,cb){

  const translate = require('google-translate-api');
  translate(text, {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    cb(res.text);
    //console.log(res.from.language.iso);
    //=> nl
  }).catch(err => {
    console.error(err);
  })
}

function getSent(values,cb){

  var AYLIENTextAPI = require('aylien_textapi');
  var textapi = new AYLIENTextAPI({
    application_id: "6b68a69c",
    application_key: "723a0e324a78fb794354d1c19a7fce23"
  });

  textapi.sentiment({
        'text': values
      }, function(error, response) {
        if (error === null) {
          console.log(response);
          cb(response.polarity);
        }
      });
  }
