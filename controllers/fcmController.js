var FCM = require('fcm-node');
var serverKey = "AIzaSyBideRQ59EfQOOqCQvt1Lo-SRw1H5ZHW7k";
var fcm = new FCM(serverKey);
var SENDER_ID = "996992134837";
var notification_key = "AAAA6CFcrrU:APA91bHwJjb9O35BZSXwhTNHoJcp_znCTVK9P15gLzuxamUpq0DXffzanAGcfby6PMQNVH8G4cGw_4ula_OVpWdnocKb1mtlamWLgKaFh8k8P7JZGvbys_qFTPZBwrTHRNxU8GVK4B-6TGdK_eX4Z2lzLZXfvx6h4Q";
// var notification_key_name = "appUser-Passengers";

module.exports.sendMessage = function (params,cb) {
  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to:"/topics/restaurants",
      "priority":"high", //If not set, notification won't be delivered on completely closed iOS app
      "restricted_package_name":"",
      notification: {
          title: params.title,
          body: params.message,
          "sound":"default", //If you want notification sound
          "click_action":"FCM_PLUGIN_ACTIVITY",  //Must be present for Android
          "icon":"fcm_push_icon"  //White icon Android resource
      },
      data: params.data
  };

  fcm.send(message, cb);

}

module.exports.addToGroup = function (id) {

  var options = {
    url: 'https://android.googleapis.com/gcm/notification',
    headers:{
      'Content-Type':'application/json',
      Authorization:'key='+serverKey,
      project_id:SENDER_ID
    },
    formData:{
      "operation":"add",
      "notification_key_name": notification_key_name,
      "notification_key":notification_key,
      "registration_ids": [id]
    }
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

    }
})
}
