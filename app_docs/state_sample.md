State sample
```javascript
{
    "errors": ["Incorrect username/password"],
    "entities": {
        "users": {
            "15": {
                "id": 15,
                "username": "stephen",
                "email": "stephen.vu.pham@gmail.com",
                "gender": "Male",
                "age": 23,
                "last_route_location": {
                    "lat": 10.790010681186168,
                    "lng": 106.67978974088756
                }
            }
        },
        "routes": {
            "88": {
                "id": 88,
                "name": "USA run",
                "area_name": "Sanfrancisco",
                "description": "love this world",
                "user_id": 15,
                "privacy": "Friend",
                "activity": "Run",
                "distance": 2637,
                "created_at": "2022-08-09T10:26:59.035Z",
                "thumb": "https://map-n-run-prod.s3.amazonaws.com/jc4pobrnisarg98i9udznbzob06e?response-content-disposition=inline%3B%20filename%3D%22CA%2094117%252CUSA%22%3B%20filename%2A%3DUTF-8%27%27CA%252094117%252CUSA&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASNIEUB234RP2TN2C%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T145809Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d248e63d3e8e6f374912856ce2a087894856670ba5d1e3d316f28457f97eb785"
            },
        },
        "activities": {
            "4": {
                "id": 4,
                "title": "Dizzy run",
                "note": "It was hot in HCM, this run made me dizzy",
                "distance": 1804,
                "privacy": "Friend",
                "starting_time": "2022-08-26",
                "route_id": 98,
                "user_id": 15,
                "duration": "5 Hours, 20 Minutes, 10 Seconds"
            },
        "comments": {
            "10": {
                "24": {
                    "id": 24,
                    "content": "How can you run this fast?",
                    "activity_id": 10,
                    "user_id": 15,
                    "created_at": "2022-09-03T14:28:21.834Z",
                    "author": "stephen"
                },
                
        "likes": {
            "10": {
                "id": 43,
                "user_id": 15,
                "activity_id": 10
            },
            
        "statics": {
            "images": ["https://mapnrun.herokuapp.com/assets/run1-5f2d87cba25a669d24b6461f459dce9bef6e15a74eb97fd4dd929a646e27632c.jpg"]
        }
    },
    "session": {
        "currentUserId": "15"
    },
    "ui": {
        "newRouteId": 11,
        "newActivityId": 12,
        "loading": false/true,
        "feedPage": {
            "feedPage": 0,
            "userFeedPage": {
                "19": 1
            }
        }
    },
    "filters": {
        "relationship": {
            "friends": ["4","5","6"],
            "people": ["3"],
            "requested": ["14","2","8"],
            "pending": ["9","13","11"]
        },
        "myActivities": ["4","5", "6"],
        "userFeed": {
            "19": ["12","13","14"]
        },
        "searchRouteFilters": {
    	"bounds": {
  	    "northEast": {
            		"lat": 10.796903205748285,
                    "lng": 106.68663473829356
        		},
        "southWest": {
                    "lat": 10.78311799860107,
            		"lng": 106.67294474348155
        		}
    	}
} },
        "searchedRouteResults": ['107'],
        userFeed:{
    	"19": ["12","13","14"]
},
    }
}
```