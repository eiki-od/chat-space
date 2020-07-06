$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="Chat-main__message-list__info">
          <div class="Chat-main__message-list__info__user-name">
            ${message.user_name}
            <div class="Chat-main__message-list__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__message-list__coment">
            <p class="Chat-main__message-list__coment__content">
            ${message.content}
            </p>
          <img class="Chat-main__message-list__coment__imag" src="${message.image}">
          </div>
      </div>`
      return html;
    } else {
      let html =
        `<div class="Chat-main__message-list__info">
          <div class="Chat-main__message-list__info__user-name">
            ${message.user_name}
            <div class="Chat-main__message-list__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__message-list__coment">
            <p class="Chat-main__message-list__coment__content">
              ${message.content}
            </p>
            </div>
        </div>`
        return html;
      };
    }
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('.submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});
