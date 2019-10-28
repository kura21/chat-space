$(document).on('turbolinks:load', function() {
  function addUser(user) {
    //HTMLを作成ユーザー名nameとidにそれぞれDBから取得した情報が表示される
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    //引数に値が入っていなかった場合に、ビューに追加するためのHTMLを作成
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  //文字が入力されるたびにメソッドが実行
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    //入力した文字を含むユーザーを検索し、検索結果をjson形式で返すよう
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    //done関数で受け取った配列型の引数の値１つ１つに対して、処理を行える
    .done(function(users) {
      //emptyメソッドで一度検索結果を空にする
      $("#user-search-result").empty();
      //usersが空かどうかで条件分岐
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
        //配列オブジェクト１つ１つに対する処理
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });


  function addDeleteUser(name, id) {
    // let html = `
    // <div class="ChatMember clearfix" id="${id}">
    // <p class="ChatMember__name">${name}</p>
    // <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
    // <input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />
    // </div>`;

    let html =  ` <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' class="js-user" value=${id}>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
    $("#ChatMembers").append(html);




  }

  $(document).on("click", ".chat-group-user__btn--add", function() {
    const name = $(this).attr("data-user-name");
    const id = $(this).attr("data-user-id");
    $(this).parent().remove();
    // addDeleteUser(name, id);
    });


  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});