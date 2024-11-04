// var modal_corrects = [2, 1, 4];
var modal_answers = [];
var modal_current_step = 1;
var modal_try_count = 0;
var reading_complete = [false, false];

function showPage(target) {
  $('section.page').removeClass('active');
  $('.indicator').removeClass('active');
  $('section[id="reading-page-' + target + '"]').addClass('active');
  $('li[id="goto-page-' + target + '"]').addClass('active');
  $('.page ul').scrollTop(0);
}

function modalQuizInit() {
  has_add_quiz = true;
  modal_try_count = 0;
  // modal_current_step = 1;
  modal_answers = [];
  // $('#result').hide();
  // $('#assessment').show();
  $('.result-area').hide();
  // $('.next-area').hide();
  $('.check-v').hide();
  $('.choices li').removeClass('selected');
  $('.choices li.disabled').removeClass('disabled');
  $('.check-area').hide();
  // $('.next-btn').hide();
  // $('.result-btn').hide();

  $('.modal-add-question .choices li').removeClass('correct_li');
  $('.modal-add-question .notice').hide();
  // $('.check-btn').show();
}

function makeAddQuiz(step) {
  var quiz_html = '\
      <div class="modal-background"></div>\
      <div class="modal-content">\
        <div class="box">\
          <div class="rubric">\
            <div class="quiz-number q-' + step + '">\
              <p class="notice notice-correct"><span>O</span><br/>맞았습니다.</p>\
              <p class="notice notice-incorrect"><span>X</span><br/>틀렸습니다.</p>\
            </div>\
            <p class="quiz-title">정서 발달과 관련하여 올바른 설명은 무엇인가?</p>\
          </div>\
          <div class="choices">\
            <ul>\
              <li id="add-' + step + '_choice-1" class="choice_1"><span>1</span> </li>\
              <li id="add-' + step + '_choice-2" class="choice_2"><span>2</span> </li>\
              <li id="add-' + step + '_choice-3" class="choice_3"><span>3</span> </li>\
              <li id="add-' + step + '_choice-4" class="choice_4"><span>4</span> </li>\
            </ul>\
            <div class="check-v">v</div>\
          </div>\
          <div class="check">\
            <button class="check-btn quiz-buttons animated flipInX">정답확인</button>\
          </div>\
          <div class="result-area">\
            <div class="correct-area">\
              <p class="correct-title">정답</p>\
              <p class="correct-number"></p>\
            </div>\
            <div class="explain-area">\
              <p class="explain-title">해설</p>\
              <p class="explain-body"></p>\
            </div>\
          </div>\
        </div>\
      </div>\
      <button class="modal-close is-large" aria-label="close"></button>\
  ';
  return quiz_html;
}

$(document).ready(function () {

  for (var i = 0; i < 3; i++) {
    // $('#modal-add-' + i).append(makeAddQuiz((i + 1)));

    $('#modal-add-' + (i + 1) + ' .quiz-title').html(quiz_modal_obj[i].question);
    $('#modal-add-' + (i + 1) + ' .correct-number').html(quiz_modal_obj[i].answer);
    $('#modal-add-' + (i + 1) + ' .explain-body').html(quiz_modal_obj[i].explain);
    for (var j = 0; j < 4; j++) $('#modal-add-' + (i + 1) + ' .choice_' + (j + 1)).append(quiz_modal_obj[i].choices[j]);
  }
  
  $('.modal-add-question .choices li').click(function () {
    var selected = $(this).attr('id').split('_');
    var selected_step = parseInt(selected[0].split('-')[1], 10) - 1;
    var selected_choice = parseInt(selected[1].split('-')[1], 10);
    modal_answers[selected_step] = selected_choice;
    modal_current_step = selected_step;
    $('#modal-add-' + (modal_current_step + 1)).find('.choices li').removeClass('selected');
    $(this).addClass('selected');
    $('button.check-btn').show();
  });

  $('.modal-add-question button.check-btn').click(function () {
    // console.log(modal_answers[modal_current_step]);
    $('.notice').hide();
    var modal_current_step_selector = $('.modal-add-question#modal-add-' + (modal_current_step + 1));
    var required_count = 0;
    required_add[modal_current_step] = false;

    if (modal_answers[modal_current_step] !== undefined && modal_answers[modal_current_step] !== 'undefined') {

      modal_try_count++;

      if (modal_corrects[modal_current_step] === modal_answers[modal_current_step]) {
        // console.log('C');
        $('#sound_o')[0].play();
        $('#modal-add-correct').addClass('is-active');
        setTimeout(function () {
          $('#modal-add-correct').removeClass('is-active');
        }, 3000);
        $(modal_current_step_selector).find('.result-area').show();

        $(modal_current_step_selector).find('.rubric .notice-correct').show();
        $(modal_current_step_selector).find('.check-btn').hide();
        $(modal_current_step_selector).find('.choices li').addClass('disabled');
        if (modal_current_step < 2) {
          $(modal_current_step_selector).find('.next-btn').show();
        } else {
          $(modal_current_step_selector).find('.result-btn').show();
        }
      } else {
        $('#sound_x')[0].play();
        $('button.check-btn').fadeOut();
        $(modal_current_step_selector).find('.rubric .notice-incorrect').show();
        if (modal_try_count <= 1) {
          $('#modal-alert').addClass('is-active');
          setTimeout(function () {
            $('#modal-alert').removeClass('is-active');
            // $('.choices .check-v').hide();
            $(modal_current_step_selector).find('.rubric .notice-incorrect').hide();
          }, 3000);
        } else {
          $(modal_current_step_selector).find('.result-area').show();

          $(modal_current_step_selector).find('.check-btn').hide();
          $(modal_current_step_selector).find('.choices li').addClass('disabled');
          if (modal_current_step < 2) {
            $(modal_current_step_selector).find('.next-btn').show();
          } else {
            $(modal_current_step_selector).find('.result-btn').show();
            
          }
          $('#modal-add-incorrect').addClass('is-active');
          $('#modal-add-incorrect p.comment').html(comments[modal_current_step]);
          $('#modal-add-incorrect p.comment').scrollTop(0);
          // setTimeout(function () {
          //   $('#modal-add-incorrect').removeClass('is-active');
            
          // }, 1000);
        }
        // console.log('I');
      }

      $('.modal-add-question .choices .check-v').show();
      $('.modal-add-question .choices .check-v').css('top', (30 * modal_answers[modal_current_step] - 40));

      if (modal_try_count >= 2 || modal_corrects[modal_current_step] === modal_answers[modal_current_step]) {
        $(modal_current_step_selector).find('.choices li.choice_' + modal_corrects[modal_current_step]).addClass('correct_li');
        for (var i = 0; i < required_add.length; i++) {
          if (required_add[i] === false) required_count++;
        }

        if (required_count === 3) {
          has_block = false;
          has_add_quiz = false;
          $('#next-notice').show();
        }
      }

    } else {
      alert('답안을 선택해주세요.');
    }
  });

  $('button.result-add').click(function() {
    var id = $(this).attr('id').split('button-add-')[1];
    modalQuizInit();
    modal_current_step = id;
    // alert(id);
  });

  $('#goto-page-1').click(function () {
    showPage(1);
  });

  $('#goto-page-2').click(function () {
    showPage(2);
    reading_complete[0] = true;
    if (reading_complete[1]) {
      has_block = false;
      has_reading = false;
      $('#next-notice').show();
    }
  });

  $('#goto-page-3').click(function () {
    showPage(3);
    reading_complete[1] = true;
    if (reading_complete[0]) {
      has_block = false;
      has_reading = false;
      $('#next-notice').show();
    }
  });

  $('button#btn-down-reading').click(function() {
    window.open('../common/download/reference_'+currentChapter+'.pdf', '_blank');
  });
});