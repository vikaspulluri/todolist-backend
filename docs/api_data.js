define({ "api": [
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "creatorName",
            "description": "<p>UserName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List ID</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/item/create",
    "title": "Create Item",
    "name": "CreateItem",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Item created successfully!!!\",\n  \"data\": {\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"creator\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"listId\": \"OJWMsA\",\n      \"id\": \"YUoPKQ\",\n      \"addedOn\": \"2019-02-11T18:34:13.697Z\",\n      \"parent\": \"OJWMsA\",\n      \"status\": \"open\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"IC-CI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"IC-CI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/item-routes.js",
    "groupTitle": "Item"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Item ID</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/item/delete",
    "title": "Delete Item",
    "name": "DeleteItem",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Item deleted successfully!!!\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"IC-DI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"IC-DI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/item-routes.js",
    "groupTitle": "Item"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "itemsToSkip",
            "description": "<p>Numer Of Items To Skip</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/item/all",
    "title": "Get All Items",
    "name": "GetItems",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Items fetched successfully!!!\",\n  \"data\": {\n      \"items\": [\n          {\n               \"title\": \"Some random title\",\n               \"description\": \"Some random description\",\n               \"creator\": \"XKAZUIp\",\n               \"creatorName\": \"Vikas\",\n               \"listId\": \"OJWMsA\",\n               \"id\": \"YUoPKQ\",\n               \"addedOn\": \"2019-02-11T18:34:13.697Z\",\n               \"parent\": \"OJWMsA\",\n               \"status\": \"open\"\n          }\n      ],\n      \"subItems\": [\n          {\n               \"title\": \"Some random title\",\n               \"description\": \"Some random description\",\n               \"creator\": \"XKAZUIp\",\n               \"creatorName\": \"Vikas\",\n               \"listId\": \"OJWMsA\",\n               \"id\": \"ALnIKw\",\n               \"addedOn\": \"2019-02-11T18:34:13.697Z\",\n               \"parent\": \"YUoPKQ\",\n               \"status\": \"open\"\n          }\n      ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"IC-GIBLI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"IC-GIBLI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/item-routes.js",
    "groupTitle": "Item"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Item ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>UserID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>Parent ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editedOn",
            "description": "<p>EditedOn Date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>EditedBy User ID</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/item/update",
    "title": "Update Item",
    "name": "UpdateItem",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Item updated successfully!!!\",\n  \"data\": {\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"creator\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"listId\": \"OJWMsA\",\n      \"id\": \"YUoPKQ\",\n      \"addedOn\": \"2019-02-11T18:34:13.697Z\",\n      \"parent\": \"OJWMsA\",\n      \"status\": \"open\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"IC-EI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"IC-EI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/item-routes.js",
    "groupTitle": "Item"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Item ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "completedBy",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>EditedBy User ID</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/item/update-status",
    "title": "Update Item Status",
    "name": "UpdateItemStatus",
    "group": "Item",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Item updated successfully!!!\",\n  \"data\": {\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"creator\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"listId\": \"OJWMsA\",\n      \"id\": \"YUoPKQ\",\n      \"addedOn\": \"2019-02-11T18:34:13.697Z\",\n      \"parent\": \"OJWMsA\",\n      \"status\": \"done\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"IC-UIS-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"IC-UIS-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/item-routes.js",
    "groupTitle": "Item"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/list/create",
    "title": "Create List",
    "name": "CreateList",
    "group": "List",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"List created successfully!!!\",\n  \"data\": {\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"owner\": \"XKAZUIp\",\n      \"name\": \"Vikas\",\n      \"id\": \"YUoPKQ\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"LC-CL-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"LC-CL-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/list-routes.js",
    "groupTitle": "List"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List ID</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/list/delete",
    "title": "Delete List By Id",
    "name": "DeleteList",
    "group": "List",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"List deleted successfully!!!\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"LC-DLBI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"LC-DLBI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/list-routes.js",
    "groupTitle": "List"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/api/list/all",
    "title": "Get All Own Lists",
    "name": "GetOwnLists",
    "group": "List",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"List fetched successfully!!!\",\n  \"data\": [{\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"owner\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"id\": \"YUoPKQ\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\",\n      \"status\": \"open\",\n      \"completionDate\": \"\",\n      \"completedByName\": \"\"\n     },\n     {\n      \"title\": \"Another random title\",\n      \"description\": \"Another random description\",\n      \"owner\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"id\": \"AoIIREw\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\",\n      \"status\": \"done\",\n      \"completionDate\": \"2019-02-11T18:34:13.697Z\",\n      \"completedByName\": \"Noothana P\"\n      }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"LC-GOL-1\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/list-routes.js",
    "groupTitle": "List"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "friends",
            "description": "<p>Friends ID's</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/list/friends-lists",
    "title": "Get User Friends Lists",
    "name": "GetUserFriendsLists",
    "group": "List",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"List created successfully!!!\",\n  \"data\": [{\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"owner\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"id\": \"YUoPKQ\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\",\n      \"status\": \"open\",\n      \"completionDate\": \"\",\n      \"completedByName\": \"\"\n     },\n     {\n      \"title\": \"Another random title\",\n      \"description\": \"Another random description\",\n      \"owner\": \"XKAZUIp\",\n      \"creatorName\": \"Vikas\",\n      \"id\": \"AoIIREw\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\",\n      \"status\": \"done\",\n      \"completionDate\": \"2019-02-11T18:34:13.697Z\",\n      \"completedByName\": \"Noothana P\"\n      }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"LC-GFL-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"LC-CL-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/list-routes.js",
    "groupTitle": "List"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List ID</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/list/update/:id",
    "title": "Update List By Id",
    "name": "UpdateList",
    "group": "List",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"List Updated successfully!!!\",\n  \"data\": {\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"owner\": \"XKAZUIp\",\n      \"name\": \"Vikas\",\n      \"id\": \"YUoPKQ\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\",\n      \"lastModifiedBy\": \"Vikas Pulluri\",\n      \"lastModifiedOn\": \"2019-02-11T18:34:13.697Z\",\n      \"status\": \"open\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"LC-ULBI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"LC-ULBI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/list-routes.js",
    "groupTitle": "List"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "completedByName",
            "description": "<p>Username</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/list/update/:id",
    "title": "Update List By Id",
    "name": "UpdateList",
    "group": "List",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"List Updated successfully!!!\",\n  \"data\": {\n      \"title\": \"Some random title\",\n      \"description\": \"Some random description\",\n      \"owner\": \"XKAZUIp\",\n      \"name\": \"Vikas\",\n      \"id\": \"YUoPKQ\",\n      \"createdDate\": \"2019-02-11T18:34:13.697Z\",\n      \"lastModifiedBy\": \"Vikas Pulluri\",\n      \"lastModifiedOn\": \"2019-02-11T18:34:13.697Z\",\n      \"status\": \"done\",\n      \"completionDate\": \"2019-02-11T18:34:13.697Z\",\n      \"completedByName\": \"Noothana P\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"LC-ULSBI-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An Unknown Error Occured!!!\",\n  \"errorCode\": \"LC-ULSBI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/list-routes.js",
    "groupTitle": "List"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/api/user/create",
    "title": "Create New User",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "phone",
            "description": "<p>Phone Numbers</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "isadmin",
            "description": "<p>Create an account with admin previleges</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 201 OK\n{\n  \"error\": false,\n  \"message\": \"User created successfully!!!\",\n  \"data\": {\n      \"userId\": \"5b9ff8f4558ca01054196469\",\n      \"firstName\": \"Vikas\",\n      \"lastName\": \"Pulluri\",\n      \"email\": \"vikasiiitn@gmail.com\",\n      \"country\": \"India\",\n      \"phone\": [91 9494336401]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response-1",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"UC-CU-1\",\n  \"errorType\": \"DataValidationError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response-2",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"error\": true,\n  \"message\": \"An account already exists with the provided email Id\",\n  \"errorCode\": \"UV-1\",\n  \"errorType\": \"DuplicateDataError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response-3",
          "content": "HTTP/1.1 500 INTERNAL SERVER ERROR\n{\n  \"error\": true,\n  \"message\": \"Something went wrong, please try again later...\",\n  \"errorCode\": \"UC-CU-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/api/user/@self",
    "title": "Get User",
    "name": "GetUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization Token prepended with (Bearer )</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"User Data Fetched Successfully!!!\",\n  \"data\": {\n      \"userId\": \"5b9ff8f4558ca01054196469\",\n      \"firstName\": \"Vikas\",\n      \"lastName\": \"Pulluri\",\n      \"email\": \"vikasiiitn@gmail.com\",\n      \"createdOn\": \"2018-09-10T18:28:32.000Z\",\n      \"country\": \"India\",\n      \"phone\": [\n          9494336401\n       ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/api/user/friends",
    "title": "Get User Friends",
    "name": "GetUserFriends",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization Token prepended with (Bearer )</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"User friends fetched successfully!!!\",\n  \"data\": [\n      {\"_id\":\"THS4eX6xH\",\"firstName\":\"Vikas\",\"lastName\":\"Pulluri\"},\n      {\"_id\":\"Uu_yqqHgR\",\"firstName\":\"Karthik\",\"lastName\":\"G\"}\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An unknown error occured\",\n  \"errorCode\": \"UC-GUF-1\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/api/user/notifications",
    "title": "Get User Notifications",
    "name": "GetUserNotifications",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization Token prepended with (Bearer )</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"User Data Fetched Successfully!!!\",\n  \"data\": [\n      {\"arrived\":\"2018-11-24T08:26:47.457Z\",\"_id\":\"5bf90b475150c51564ea9167\",\"message\":\"You have received a friend request from Noothana P\"},\n      {\"arrived\":\"2018-11-24T08:27:41.682Z\",\"_id\":\"5bf90b7d5150c51564ea9168\",\"message\":\"You have accepted friend request of Noothana P\"},\n      {\"arrived\":\"2018-11-24T09:39:01.950Z\",\"_id\":\"5bf91c35e32e760fdcaf485e\"}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An unknown error occured\",\n  \"errorCode\": \"UC-GUN-1\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/api/user/login",
    "title": "Login User",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"User Logged In Successfully...\",\n  \"data\": {\n      \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2FzaWlpdG5AZ21haWwuY29tIiwiaWQiOiI1Yjk2YWRjNDc0NGQ0ZTFhMzhjZjJhOGEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMTMwNjQsImV4cCI6MTUzNzIxNjY2NH0.2U_A27fPZPgkqN1DaS9fg_C6qr5AUeU7rRsO6yQk1uQ\",\n      \"username\": \"Vikas Pulluri\",\n      \"email\": \"vikasiiitn@gmail.com\",\n      \"expiryDuration\": 3600,\n      \"userId\": \"5b96adc4744d4e1a38cf2a8a\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response-1",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"UC-LU-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response-2",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Invalid username provided\",\n  \"errorCode\": \"UC-LU-2\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response-3",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Invalid Authentication Credentials\",\n  \"errorCode\": \"UC-LU-3\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response-4",
          "content": "HTTP/1.1 500 INTERNAL SERVER ERROR\n{\n  \"error\": true,\n  \"message\": \"Something went wrong, please try again later...\",\n  \"errorCode\": \"UC-LU-4\",\n  \"errorType\": \"UknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experience",
            "description": "<p>Experience with app</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "feedback",
            "description": "<p>Feedback/Suggestions text</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/user/feedback",
    "title": "Post Feedback",
    "name": "PostUserFeedback",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization Token prepended with (Bearer )</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Thanks for your time!!!\",\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"UC-SUF-1\",\n  \"errorType\": \"DataValidationError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An unknown error occured\",\n  \"errorCode\": \"UC-SUF-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User Firstname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Lastname</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/user/update",
    "title": "User Personal Info Update",
    "name": "UpdateUserPersonalInfo",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization Token prepended with (Bearer )</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Successfully Updated!!!\",\n  \"data\": {\n      \"firstName\": \"Vikas\",\n      \"lastName\": \"Pulluri\" \n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"error\": true,\n  \"message\": \"Authentication Failed\",\n  \"errorCode\": \"CA-1\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"UC-UUPI-1\",\n  \"errorType\": \"DataValidationError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"Unable to update your details!!! Please try again later...\",\n  \"errorCode\": \"UC-UUPI-2\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An unknown error occured\",\n  \"errorCode\": \"UC-UUPI-3\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Registered E-mail</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/user/request-password",
    "title": "User Request Password",
    "name": "UserRequestPassword",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"We have sent a revocery code to your registered mail. Please check your mail and follow the steps mentioned!!!\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": true,\n  \"message\": \"Invalid Request\",\n  \"errorCode\": \"UC-RUP-1\",\n  \"errorType\": \"DataValidationError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"message\": \"No user found with the provided email Id, please check again the email provided!!!\",\n  \"errorCode\": \"UC-RUP-2\",\n  \"errorType\": \"DataNotFoundError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"An unknown error occured\",\n  \"errorCode\": \"UC-RUP-3\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  },
  {
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "verificationCode",
            "description": "<p>Verification code sent to Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New password</p>"
          }
        ]
      }
    },
    "type": "post",
    "url": "/api/user/reset-password",
    "title": "User Reset Password",
    "name": "UserResetPassword",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"message\": \"Password updated successfully!!! Please login with your new password...\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"error\": true,\n  \"message\": \"Please provide correct verification code!!!\",\n  \"errorCode\": \"UC-RP-3\",\n  \"errorType\": \"OAuthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": true,\n  \"message\": \"Something went wrong, please try again later!!!\",\n  \"errorCode\": \"UC-RP-3\",\n  \"errorType\": \"UnknownError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/user-routes.js",
    "groupTitle": "User"
  }
] });
