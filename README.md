-##usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|    string |null: false|
|password| string |null: felse|
|name     |string |null: felse|
###association
-has_many   :tweets
-has_many   :groups, through: :groups_users
-has_many   :groups_users


##tweelsテーブル
Column|Type|Options|
|------|----|-------|
|text     |text   ||
|photo    |text   ||
|user_id  |integer|null: false,foreign_key:true|
|group_id|integer|null: false,foreign_key:true|

###association
-balongs_to :user
-balongs_to :group

##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id  |integer|null: false,foreign_key:true|
|group_id|integer|null: false,foreign_key:true|

###associatino
-belongs_to :user
-belongs_to :group

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string |null: false|
###associatino
-has_many   :users,through: :groups_users
-has_many :groups_users
-has_many :tweels
