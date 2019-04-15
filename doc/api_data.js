define({ "api": [
  {
    "type": "post",
    "url": "restaurant",
    "title": "Create a new restaurant",
    "name": "CreateRestaurant",
    "group": "Restaurants",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ruc",
            "description": "<p>RUC of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chiefId",
            "description": "<p>ID of the User (Chief of the restaurant)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Start Time of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end",
            "description": "<p>End Time of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "speciality",
            "description": "<p>Speciality of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "services",
            "description": "<p>Ids of services like &quot;Baño, TV, etc&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/restaurantController.js",
    "groupTitle": "Restaurants"
  },
  {
    "type": "get",
    "url": "restaurant",
    "title": "Restaurants recommendations",
    "name": "RecommendedRestaurants",
    "group": "Restaurants",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Restaurants",
            "description": "<p>Recommended restaurants</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/restaurantController.js",
    "groupTitle": "Restaurants"
  },
  {
    "type": "post",
    "url": "user",
    "title": "Create a new user",
    "name": "CreateUser",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the User (min 8 characters)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User (unique)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Phone of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "facebookId",
            "description": "<p>Facebook ID of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "googleId",
            "description": "<p>Facebook ID of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profile",
            "description": "<p>Url from image profile of the User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Authentication Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "user/:id",
    "title": "Edit a user from Id",
    "name": "EditUser",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nationality",
            "description": "<p>Nationality of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Authentication Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "user",
    "title": "Retrieve all users registered (authentication)",
    "name": "GetAllUser",
    "group": "User",
    "version": "0.1.0",
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "user/:id",
    "title": "Get a user with Id",
    "name": "getUser",
    "group": "User",
    "version": "0.1.0",
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "login/restaurant",
    "title": "Login for chief of restaurant",
    "name": "loginRestaurant",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params",
            "description": "<p>Parameters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "params.accessToken",
            "description": "<p>Authentication Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params.user",
            "description": "<p>User Profile and Restaurant Profile (All information)</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "user/photo",
    "title": "Update profile photo of user",
    "name": "loginRestaurant",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dataURL",
            "description": "<p>Image encode to base64</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Image Name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params",
            "description": "<p>Parameters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "params.accessToken",
            "description": "<p>Authentication Token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "login",
    "title": "Login for traditional user",
    "name": "loginUser",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params",
            "description": "<p>Parameters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "params.accessToken",
            "description": "<p>Authentication Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params.user",
            "description": "<p>User Profile (All information)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\",\n  \"user\": Object\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/favorites",
    "title": "Save a favorite restaurant",
    "name": "saveFavorite",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Restaurant Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params",
            "description": "<p>Parameters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "params.accessToken",
            "description": "<p>Authentication Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "user/favorites",
    "title": "Get all favorite restaurants of an user",
    "name": "userFavorites",
    "group": "User",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "params",
            "description": "<p>Parameters</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "params.accessToken",
            "description": "<p>Authentication Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/userController.js",
    "groupTitle": "User"
  }
] });
