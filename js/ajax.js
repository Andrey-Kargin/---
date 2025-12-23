$(document).ready(function () {


  $("#btn1").click(
    function () {
      let userName = document.querySelector('input[name="userName"]');
      let userSurname = document.querySelector('input[name="userSurname"]');
      let userPhone = document.querySelector('input[name="userPhone"]');
      let userCompany = document.querySelector('input[name="userCompany"]');
      let userContext = document.querySelector('textarea[name="userContext"]');
      userName = userName.value.length;
      userSurname = userSurname.value.length;
      userPhone = userPhone.value.length;
      userCompany = userCompany.value.length;
      userContext = userContext.value.length;
      if (userName > 0 && userSurname > 0 && userPhone > 0 && userContext > 0 && userCompany > 0) {
        sendAjaxForm('result_form', 'ajax_form', 'send.php');
        // sendMailForm('result_form', 'ajax_form', 'send-mail.php');
        return false;
      }
    }
  );

  $("#btn2").click(
    function () {
      let userName1 = document.querySelector('input[name="userName1"]');
      let userSurname1 = document.querySelector('input[name="userSurname1"]');
      let userPhone1 = document.querySelector('input[name="userPhone1"]');
      let userCompany1 = document.querySelector('input[name="userCompany1"]');
      let userContext1 = document.querySelector('textarea[name="userContext1"]');
      userName1 = userName1.value.length;
      userSurname1 = userSurname1.value.length;
      userPhone1 = userPhone1.value.length;
      userCompany1 = userCompany1.value.length;
      userContext1 = userContext1.value.length;
      if (userName1 > 0 && userSurname1 > 0 && userPhone1 > 0 && userContext1 > 0 && userCompany1 > 0) {
        sendAjaxForm1('result_form1', 'ajax_form1', 'send.php');
        // sendMailForm1('result_form1', 'ajax_form1', 'send-mail.php');
        return false;
      }
    }
  );

  function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
      url: url,
      type: "POST", //метод отправки
      dataType: "html", //формат данных
      data: $("#" + ajax_form).serialize(),  // Сеарилизуем объект
      success: function (response) { //Данные отправлены успешно
        $('#ajax_form .form-btn').html('Спасибо!');
        $('.send-form p').html('Мы получили вашу заявку, и свяжемся с вами в ближайшее время');
      },
      error: function (response) { // Данные не отправлены
        $('#ajax_form .form-btn').html('Ошибка!');
        $('.send-form p').html('Свяжитесь пожалуйста с нами.');
      }
    });
  }

  function sendAjaxForm1(result_form1, ajax_form1, url) {
    $.ajax({
      url: url,
      type: "POST", //метод отправки
      dataType: "html", //формат данных
      data: $("#" + ajax_form1).serialize(),  // Сеарилизуем объект
      success: function (response) { //Данные отправлены успешно
        $('#ajax_form1 .form-btn').html('Спасибо!');
        $('.send-form1 p').html('Мы получили вашу заявку, и свяжемся с вами в ближайшее время');
      },
      error: function (response) { // Данные не отправлены
        $('#ajax_form1 .form-btn').html('Ошибка!');
        $('.send-form1 p').html('Свяжитесь пожалуйста с нами.');
      }
    });
  }

  // function sendMailForm(result_form, ajax_form, url) {
  //   $.ajax({
  //     url: url,
  //     type: "POST", //метод отправки
  //     dataType: "html", //формат данных
  //     data: $("#" + ajax_form).serialize()
  //   });
  // }

  // function sendMailForm1(result_form1, ajax_form1, url) {
  //   $.ajax({
  //     url: url,
  //     type: "POST", //метод отправки
  //     dataType: "html", //формат данных
  //     data: $("#" + ajax_form1).serialize()
  //   });
  // }

});


