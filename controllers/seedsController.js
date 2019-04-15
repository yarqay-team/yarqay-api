var _ = require('underscore');
var Comment = require('../collections/comment');


module.exports.commentsSeed = function (cb) {
  Restaurants.find({},function (err,restaurants) {
    var restaurantsIds =_(restaurants).map(function (restaurant) {
      return restaurant._id;
    });

    Users.find({},function (err,users) {
      var usersIds = _(users).map(function (user) {
        return user._id;
      })
      for (var i = 0; i < array.length; i++) {
        var comment = new Comment();
        comment.restaurantId = restaurantsIds[Math.floor((Math.random() * restaurantsIds.length) + 1)];
        comment.userId = usersIds[Math.floor((Math.random() * usersIds.length) + 1)];
        comment.text = "Lorem ipsun lfiwk lapdsadskq lw wldalsld qlw ldwla lwadaawldw aldsadlasdaldadal asldsd ladlsad lsald asldlasld sadlasldaldsldlad";

        comment.save(function (err) {
        })
      }
    })
  })
}
