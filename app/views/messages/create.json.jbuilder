json.id  @message.id
json.content   @message.content
json.dete      @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @mwssage.user.name
json.image     @message.image.url