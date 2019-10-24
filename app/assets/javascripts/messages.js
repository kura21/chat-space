$(function() {

var search_list = $("#user-search-result");
var member_list = $("#member_search_result");

function appendUsers(user) {
var html =`<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.name }</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
        </div>`

　　 search_list.append(html);
return html;
}

function appendMembers(name, user_id) {
var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
          <input name='group[user_ids][]' type='hidden' value=${ user_id }>
          <p class='c hat-group-user__name'>${ name }</p>
          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`

　　 member_list.append(html);
}

function appendNoUsers(info) {
var html =`<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ info }</p>
        </div>`

search_list.append(html);
}

$(function(){
$("#user-search-field").on("keyup", function() {
var input = $("#user-search-field").val();

$.ajax({
  type: 'GET',
  url: '/users',
  data: { keyword: input },
  dataType: 'json'
})

.done(function(users) {
  $("#user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
      appendUsers(user);
      });
    }
    else {
      appendNoUsers("一致するユーザーはいません");
    }
  })
.fail(function() {
  alert('ユーザー検索に失敗しました');
})
});

$(function(){
$(document).on('click', '.user-search-add', function() {
  var name = $(this).data("user-name");
  var user_id = $(this).data("user-id");
  $(this).parent().remove();
  appendMembers(name, user_id);
});

　    $(document).on("click", '.user-search-remove', function() {
  $(this).parent().remove();
});
});
});
$(function () {

function buildHTML(message) {

image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : ""; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。

var html = `<div class="message" data-message-id="${message.id}"> 
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-meesage">
        <p class="lower-message__content">
          ${message.content}
        </p>
        ${image}
      </div>
    </div>`
return html;
}
}) 
// 自動更新はここから。 
var reloadMessages = function () {
if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
  var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
  // var group_id = $(".group").data("group-id");

  $.ajax({ //ajax通信で以下のことを行う
    url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
    type: 'get', //メソッドを指定
    dataType: 'json', //データはjson形式
    data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
  })
  .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
    var insertHTML = '';//追加するHTMLの入れ物を作る
    messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
      $('.messages').append(insertHTML);//メッセージを追加
    })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
  })
  .fail(function () {
    alert('自動更新に失敗しました');//ダメだったらアラートを出す
  });
}
};
setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});