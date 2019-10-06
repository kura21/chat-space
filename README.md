|
# README
#chat_space cb設計
##userテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: felse|
|usre_name|string|null: felse|
###association
-has_many :comment
-has_many :tweet
-add_index :user
-has_many :groups, through: :posts_true|

##tweelsテーブル
Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|title|text|null: false|
|user_id|integer|null: false, foreign_key: true|
###association
-balongs_to :user
-has_many :comments

##comments
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreingn_key: true|
###association
-belongs_to :user
-balongs_to :tweet

##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key:true|
|adding_members|string|null: false|
|mambaer|string|null: false