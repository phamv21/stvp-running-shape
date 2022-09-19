# **Postgres Database Schema**
## **`users`**
--------
| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `username`      | string        | not null,indexed,unique   |
| `email`         | string        | not null,indexed, unique  |
| `password_sigest`| string       | not null                  |
| `session_token` | string        | not null, indexed, unique |
| `birthday`      | date          | not null                  |
| `gender`        | string        | default `None`            |
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* index on `username, unique: true`
* index on `email, unique: true`
* index on `session_token, unique: true`
* `has_many routes`
* `has_many pins through routes`
* `has_many user_relationships`
* `has_many activities`
* `has_many comments`
* `has_many likes`
* `has_one_attached avata`


## **`user_relationships`**
-------
| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `user_id`       | interger      | not null,indexed,foreign key|
| `other_user_id` | interger      | not null,indexed,foreign key|
| `relationship_type`| string     | not null, default `Pending` |
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* `user_id` references `users`
* `other_user_id` references `users`
* index on `user_id`
* index on `other_user_id`
* `belongs_to user`
* `belongs_to other_user`

## **`pins`**
------------
| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `route_id`      | integer      | not null,indexed,unique,foreign key|
| `description`   | string        |                            |
| `lat`           | float         | not null                  |
| `lng`           | float         | not null                   |
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* `route_id` references `routes`
* index on `route_id`
* `belongs_to route`

## **`routes`**
-------
| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `user_id`       | integer       | not null,indexed,unique,foreign key|
| `name`          | string        | not null,                 |
| `description`   | string        |                           |
| `privacy`       | string        | not null, default:`Public`|
| `activity`      | string        | not null, default:`Run`   |
| `distance`      | float         |                           |
| `area_name`     | string        |                           |
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* `user_id` references `users`
* index on `user_id`
* `belongs_to user`
* `has_many pins`
* `has_many activities`
* `has_one_attached thumb`

## **`activities`**
--------
| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `user_id`       | integer       | not null,indexed,unique,foreign key|
| `route_id`      | integer       | indexed,unique,foreign key|
| `title`         | string        | not nul                   |
| `note`          | string        |                           |
| `duration`      | integer       | not null                  |
| `starting_time` | date          | not null                  |
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* `user_id` references `users`
* `route_id` references `routes`
* index on `user_id`
* index on `route_id`
* `belongs_to user`
* `belongs_to route`
* `has_many comments`
* `has_many likes`

## **`likes`**
--------

| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `user_id`       | integer       | not null,indexed,unique,foreign key|
| `activity_id`   | integer       | not null,indexed,unique,foreign key|
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* `user_id` references `users`
* `activity_id` references `activities`
* index on `user_id`
* index on `activity_id`
* `belongs_to user`
* `belongs_to activity`

## **`comments`**
--------
| column name   | data type     | details                   |
| ------------- |:-------------:| -------------------------:|
| `id`            | integer       | not null, primary key     |
| `user_id`       | integer       | not null,indexed,unique,foreign key|
| `activity_id`   | integer       | not null,indexed,unique,foreign key|
| `content`       | string        | not nul                   |
| `created_at`    | datetime      | not null                  |
| `updated_at`    | datetime      | not null                  |

* `user_id` references `users`
* `activity_id` references `activities`
* index on `user_id`
* index on `activity_id`
* `belongs_to user`
* `belongs_to activity`

