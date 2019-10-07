-##usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|    string |null: false|
|password| string |null: felse|
|usre_name|string |null: felse|
|when     |integer|null: felde|
|update   |integer|null: felde|
###association
-has_many   :tweets
-has_many   :groups, through: :posts_true|
-has_many   :groups_users


##tweelsテーブル
Column|Type|Options|
|------|----|-------|
|text  |text   |null: false|
|title |text   |null: false|
|when  |integer|null: felde|
|update|integer|null: felde|
###association
-balongs_to :users
-balongs_to :groups

##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id  |integer|null: false,foreign_key:true|
|groups_id|integer|null: false,foreign_key:true|
|when     |integer|null: felde|
|update   |integer|null: felde|
###associatino
-belongs_to :users
-has_many :groupsid

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|adding_members|string |null: false|
|mambaer       |string |null: false|
|when          |integer|null: felde|
|update        |integer|null: felde|
###associatino
-has_many   :users,through: :posts_true|
-balongs_to :groups_users
-balongs_to :groups
