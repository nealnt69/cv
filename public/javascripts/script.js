let listUndoRedo = [];
let indexUndoRedo = 0;
let isUndo = false;

const changeUndoRedo = () => {
  if (listUndoRedo.length > 20) {
    listUndoRedo.shift();
  }
  $("#cv-undo-redo-detect").html($("#cv-document").html());
  $("#cv-undo-redo-detect .cv-element-child-control").remove();
  $("#cv-undo-redo-detect .cv-element-control").remove();
  if (indexUndoRedo === listUndoRedo.length) {
    listUndoRedo.push($("#cv-undo-redo-detect").html());
    indexUndoRedo = listUndoRedo.length;
  } else {
    listUndoRedo = [$("#cv-undo-redo-detect").html()];
    indexUndoRedo = listUndoRedo.length;
  }
  $("#cv-undo-redo-detect").html("");
};

const handleUndo = () => {
  if (indexUndoRedo > 0) {
    if (listUndoRedo.length > 10) {
      listUndoRedo.shift();
    }
    if (indexUndoRedo === listUndoRedo.length) {
      listUndoRedo.push($("#cv-document").html());
    }
    $("#cv-document").html(listUndoRedo[indexUndoRedo - 1]);
    $(".cv-block-drag-drop").sortable({
      connectWith: ".cv-block-drag-drop",
      placeholder: "ui-element-placeholder-highlight",
      cursor: "move",
      handle: "#cv-element-control-move",
      forcePlaceholderSize: true,
      items: `div.cv-element:not("#cv-personal-information")`,
      update: function (e, ui) {
        changeUndoRedo();
      },
    });
    if (indexUndoRedo >= 0) {
      indexUndoRedo--;
    }
  }
};

const handleRedo = () => {
  if (listUndoRedo[indexUndoRedo + 1]) {
    $("#cv-document").html(listUndoRedo[indexUndoRedo + 1]);
    $(".cv-block-drag-drop").sortable({
      connectWith: ".cv-block-drag-drop",
      placeholder: "ui-element-placeholder-highlight",
      cursor: "move",
      handle: "#cv-element-control-move",
      forcePlaceholderSize: true,
      items: `div.cv-element:not("#cv-personal-information")`,
      update: function (e, ui) {
        changeUndoRedo();
      },
    });
    if (indexUndoRedo < listUndoRedo.length) {
      indexUndoRedo += 1;
    }
    if (indexUndoRedo === listUndoRedo.length - 1) {
      listUndoRedo.pop();
    }
  }
};

const elementControlFull = `
<div class='cv-element-control' >
   <div class='cv-element-control-button' id='cv-element-control-menu'>
      <i class="fa fa-bars" aria-hidden="true"></i>
   </div>
   <div class='cv-element-control-button' id='cv-element-control-move'>
   <i class="fa fa-arrows" aria-hidden="true"></i>
</div>
   <div class='cv-element-control-button' id='cv-element-control-up'>
      <i class="fa fa-caret-up" aria-hidden="true"></i>
   </div>
   <div class='cv-element-control-button' id='cv-element-control-down'>
      <i class="fa fa-caret-down" aria-hidden="true"></i>
   </div>
   <div class='cv-element-control-button' id='cv-element-control-hidden'>
      <i class="fa fa-minus" aria-hidden="true"></i> <span>Ẩn mục</span>
   </div>
</div>
`;

const elementControlMenu = `
<div class='cv-element-control' >
<div class='cv-element-control-button' id='cv-element-control-menu'>
<i class="fa fa-bars" aria-hidden="true"></i>
</div>
</div>
`;

const elementChildControl = `
<div class='cv-element-child-control'>
<div class='cv-element-child-control-button' id='cv-element-child-control-move'>
<i class="fa fa-arrows" aria-hidden="true"></i>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-up'>
<i class="fa fa-caret-up" aria-hidden="true"></i>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-down'>
<i class="fa fa-caret-down" aria-hidden="true"></i>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-add'>
<i class="fa fa-plus" aria-hidden="true"></i> <span>Thêm</span>
</div>
</div>
`;

const elementChildControlFull = `
<div class='cv-element-child-control'>
<div class='cv-element-child-control-button' id='cv-element-child-control-move'>
<i class="fa fa-arrows" aria-hidden="true"></i>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-up'>
<i class="fa fa-caret-up" aria-hidden="true"></i>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-down'>
<i class="fa fa-caret-down" aria-hidden="true"></i>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-add'>
<i class="fa fa-plus" aria-hidden="true"></i> <span>Thêm</span>
</div>
<div class='cv-element-child-control-button' id='cv-element-child-control-remove'>
<i class="fa fa-minus" aria-hidden="true"></i> <span>Xóa</span>
</div>
</div>
`;

const cvContainer = $("#cv-layout");

$(document).ready(function () {
  $("#cv-tutorial").hcSticky({
    top: $("#toolbar-container").height() + 16,
    left: 0,
  });

  //cv element control

  $(cvContainer).on("mouseenter", "div.cv-element", function (e) {
    if ($(this).attr("id") === "cv-personal-information") {
      $(this).append(elementControlMenu);
    } else {
      $(this).append(elementControlFull);
    }
  });
  $(cvContainer).on("mouseleave", "div.cv-element", function (e) {
    $(this).children(".cv-element-control").remove();
  });

  // cv element education control

  $(cvContainer).on("mouseenter", "div.cv-child-element", function (e) {
    if (
      $(this).closest(".cv-element").children(".cv-child-element").length > 1
    ) {
      $(this).append(elementChildControlFull);
    } else {
      $(this).append(elementChildControl);
    }
  });
  $(cvContainer).on("mouseleave", "div.cv-child-element", function (e) {
    $(this).children(".cv-element-child-control").remove();
  });

  $(cvContainer).on("click", "div.cv-element", function (e) {
    switch ($(this).attr("id")) {
      case "cv-personal-information":
        $("#cv-tutorial-title").text("Thông tin cá nhân");
        $("#cv-tutorial-content").html(`
        <p>
        • Viết đầy đủ họ tên của bạn.<br>
        • Email cần nghiêm túc nên chứa họ tên bạn.
        </p>
        <p>
        • Chèn ảnh đại diện: <br>
        <b>Nên:</b> chèn ảnh phù hợp với vị trí ứng tuyển,nhìn thấy khuôn mặt trực diện. <br>
        <b>Không nên:</b> ảnh chỉ nhìn thấy một phần khuôn mặt hoặc quay lưng về phía trước.<br>
        </p>
        <p>
        Nếu bạn ứng tuyển cho một số công ty trong nước hoặc các công ty không phải là công ty nước ngoài liên quan đến các nước như Mỹ, Anh bạn cỏ thể thêm một số thông tin cá nhân khác: Ngày sinh, giới tính, tình trạng hôn nhân.
        </p>`);

        $("#cv-tutorial-example-detect").html($("#cv-infomation").html());
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect #cv-infomation-name").text(
          "Nguyễn Văn A"
        );
        $("#cv-tutorial-example-detect #cv-infomation-birthday").text(
          "01/01/1991"
        );
        $("#cv-tutorial-example-detect #cv-infomation-gender").text("Nam");
        $("#cv-tutorial-example-detect #cv-infomation-phonenumber").text(
          "0123456789"
        );
        $("#cv-tutorial-example-detect #cv-infomation-email").text(
          "abc@gmail.com"
        );
        $("#cv-tutorial-example-detect #cv-infomation-address").text(
          "Số 348 Tố Hữu Hà Đông"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-objectives":
        $("#cv-tutorial-title").text("Mục tiêu nghề nghiệp");
        $("#cv-tutorial-content").html(`
        <p><b>Nên:</b></p>
        <p>- Vị trí mong muốn ứng tuyển (có thể đề cập đến công ty ứng tuyển).</p>
        <p>- Thể hiện kỹ năng, kiến thức chuyên môn bạn có thể áp dụng vào vị trí công việc.</p>
        <p>- Có thể phân ra thành mục tiêu ngắn hạn và dài hạn.</p>
        <p><b>Không nên:</b></p>
        <p>- Mục tiêu ngắn hạn: Thành thạo công việc trong vòng … tháng</p><p>- Mục tiêu dài hạn: Thăng tiến đến vị trí ...</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-objectives").html());
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example-detect #cv-objectives-content").text(
          "Bắt đầu bằng chức vụ chuyên môn của bạn để chứng tỏ với nhà tuyển dụng rằng hồ sơ của bạn có liên quan đến vị trí ứng tuyển."
        );

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-education":
        $("#cv-tutorial-title").html("Học vấn");
        $("#cv-tutorial-content").html(`
        <p><b>Nên:</b></p>
        <p>- Ngành học, trường học.</p>
        <p>- Một số môn chuyên ngành có tính ứng dụng cao ở công việc mà bạn đạt kết quả tốt thì bạn có thể đề cập đến.</p>
        <p>- Đề án, nghiên cứu khoa học nếu có…(có liên quan đến vị trí ứng tuyển).</p>
        <p><b>Không nên:</b></p>
        <p>- Đưa quá trình học tập từ cấp 1, cấp 2.</p>`);
        $("#cv-tutorial-example-detect").html($("#cv-education").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();

        $("#cv-tutorial-example-detect .cv-education-start").text("10/2020");
        $("#cv-tutorial-example-detect .cv-education-end").text("10/2020");
        $("#cv-tutorial-example-detect .cv-education-school").text(
          "Đại học bách khoa HN"
        );
        $("#cv-tutorial-example-detect .cv-education-subject").text(
          "Công nghệ thông tin"
        );
        $("#cv-tutorial-example-detect .cv-education-description").text(
          "Học bình thường"
        );
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-experience":
        $("#cv-tutorial-title").html("Kinh nghiệm làm việc");
        $("#cv-tutorial-content").html(`
        <p><b>Nên:</b></p>
        <p>- Viết dưới dạng các gạch đầu dòng, phân chia ý rõ ràng.</p>
        <p>- Liệt kê theo thứ tự thời gian, từ các công việc làm gần đây nhất đến các công việc trong quá khứ.</p>
        <p>- Công việc đã làm (làm full-time hoặc part-time), khóa thực tập có liên quan đến vị trí ứng tuyển.</p>
        <p>- Mô tả trách nhiệm công việc chính, súc tích nhưng đầy đủ kèm theo minh chứng (VD: Link bài báo bạn viết, sản phẩm bạn thiết kế,...).</p>
        <p>- Đưa ra những thành tựu và kỹ năng bạn đạt được (cá nhân bạn học hỏi được cũng như sự cống hiến cho công ty/tổ chức).</p>
        <p>- Nếu bạn chưa có kinh nghiệm làm việc tại các công ty/tổ chức, chỉ tham gia công việc như tình nguyện, các công việc làm thêm như phát tờ rơi, bồi bàn,... bạn vẫn có thể đề cập đến trong mục này. Tuy nhiên, cần chỉ ra những điều bạn học hỏi được để đáp ứng vị trí ứng tuyển.</p>
        <p>- VD: Khả năng làm việc nhóm, sự năng động, sáng tạo và linh hoạt, sự kiên trì, đóng góp cho cộng đồng,...</p>
        <p><b>Không nên:</b></p>
        <p>- Đưa vào các công việc làm ngắn hạn (nhỏ hơn 6 tháng), ngoại trừ khóa thực tập.</p>
        <p>- Đưa quá chi tiết những phần công việc nhỏ nhặt (VD: In giấy tờ, đến công ty sớm dọn dẹp,..).</p>
        <p>- Mô tả dài dòng, không phân chia ý rõ ràng.</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-experience").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();

        $("#cv-tutorial-example-detect .cv-experience-start").text("10/2020");
        $("#cv-tutorial-example-detect .cv-experience-end").text("10/2020");
        $("#cv-tutorial-example-detect .cv-experience-name").text(
          "CTY CP Nhà Đất Mới"
        );
        $("#cv-tutorial-example-detect .cv-experience-position").text(
          "Developer"
        );
        $("#cv-tutorial-example-detect .cv-experience-description").text(
          "Tham gia phát triển sản phẩm cho công ty"
        );

        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-activity":
        $("#cv-tutorial-title").html("Hoạt động");
        $("#cv-tutorial-content").html(`
        <p>- Liệt kê các hoạt động cộng đồng, tình nguyện,...</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-activity").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();

        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-activity-start").text("10/2020");
        $("#cv-tutorial-example-detect .cv-activity-end").text("10/2020");
        $("#cv-tutorial-example-detect .cv-activity-name").text("Tổ chức ABC");
        $("#cv-tutorial-example-detect .cv-activity-position").text(
          "Cộng tác viên"
        );
        $("#cv-tutorial-example-detect .cv-activity-description").text(
          "Tham gia học hỏi các hoạt động tại tổ chức"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-prize":
        $("#cv-tutorial-title").html("Giải thưởng");
        $("#cv-tutorial-content").html(`
        <p>- Các giải thưởng đạt được trong quá trình học tập, công tác.</p>
        <p>- Ví dụ: Học bổng, Danh hiệu Nhân viên xuất sắc năm,...</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-prize").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-prize-time").text("10/2020");
        $("#cv-tutorial-example-detect .cv-prize-description").text(
          "Giaỉ tài năng trẻ xuất sắc"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-more-infomation":
        $("#cv-tutorial-title").html("Thông tin thêm");
        $("#cv-tutorial-content").html(`
        <p>
        - Phần không bắt buộc nhập.<br>
        - Bạn có thể nhập bất kỳ thông tin gì mong muốn mà mẫu CV hiện tại chưa có.
        </p>`);

        $("#cv-tutorial-example-detect").html($("#cv-more-infomation").html());
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect #cv-more-infomation-content").text(
          "Giải 3 toán quốc tế"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-certificate":
        $("#cv-tutorial-title").html("Chứng chỉ");
        $("#cv-tutorial-content").html(`
        <p>- Các khóa đào tạo kỹ năng mềm hay chuyên môn (đề cập thời gian, tổ chức, có thể chỉ ra một vài những vấn đề về chuyên môn khi bạn được học ở khóa học mà có liên quan đến công việc).</p>
        <p>- Chứng chỉ Tin học, Ngoại ngữ…(nếu có).</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-certificate").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-certificate-time").text("10/2020");
        $("#cv-tutorial-example-detect .cv-certificate-name").text(
          "Chứng chỉ PM"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-skill":
        $("#cv-tutorial-title").html("Kỹ năng");
        $("#cv-tutorial-content").html(`
        <p><b>Nên:</b></p>
        <p>- Nêu ra các kỹ năng phù hợp và giúp ích cho vị trí ứng tuyển (tùy thuộc vào vị trí ứng tuyển và những kỹ năng bạn có).</p>
        <p>- Có thể đưa minh chứng ngắn gọn những kỹ năng đạt được qua công việc gì, hoạt động gì,...</p>
        <p><b>Không nên:</b></p>
        <p>- Đưa định nghĩa, quan điểm cá nhân.</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-skill").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-skill-name").text("Javascript");
        $("#cv-tutorial-example-detect .cv-skill-value").text(
          "Thành thạo es5, es6, Async/Await, Promise"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-favorite":
        $("#cv-tutorial-title").html("Sở thích");
        $("#cv-tutorial-content").html(`
        <p>Liệt kê một số sở thích cá nhân để giúp nhà tuyển dụng hiểu hơn về con người bạn.</p>`);

        $("#cv-tutorial-example-detect").html($("#cv-favorite").html());
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect #cv-favorite-content").text(
          `- Bóng đá `
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();
        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-reference":
        $("#cv-tutorial-title").html("Người tham chiếu");
        $("#cv-tutorial-content").html(`
          <p>
          - Có thể đề cập hoặc không. <br>
          - Phần này giúp nhà tuyển dụng đối chiếu thông tin trong CV bạn cung cấp.
          </p>`);

        $("#cv-tutorial-example-detect").html($("#cv-reference").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-reference-name").text("Nhà Đát Mới");
        $("#cv-tutorial-example-detect .cv-reference-position").text(
          "Trưởng phòng"
        );
        $("#cv-tutorial-example-detect .cv-reference-email").text(
          "abc@gmail.com"
        );
        $("#cv-tutorial-example-detect .cv-reference-phonenumber").text(
          "0123456798"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      case "cv-project":
        $("#cv-tutorial-title").html("Dự án");
        $("#cv-tutorial-content").html(`
        <p>
        Liệt kê những dự án bạn đã làm hoặc đã tham gia.
        </p>`);

        $("#cv-tutorial-example-detect").html($("#cv-project").html());
        $("#cv-tutorial-example-detect .cv-child-element:not(:first)").remove();
        $("#cv-tutorial-example-detect *[contenteditable]").removeAttr(
          "contenteditable"
        );

        $("#cv-tutorial-example-detect .cv-project-start").text("10/2020");
        $("#cv-tutorial-example-detect .cv-project-end").text("10/2020");
        $("#cv-tutorial-example-detect .cv-project-name").text("Kết nối việc");
        $("#cv-tutorial-example-detect .cv-project-position").text("Developer");
        $("#cv-tutorial-example-detect .cv-project-description").text(
          "Tham gia phát triển các tính năng của dự án"
        );

        $("#cv-tutorial-example-detect .cv-element-control").remove();
        $("#cv-tutorial-example-detect .cv-element-child-control").remove();

        $("#cv-tutorial-example").html($("#cv-tutorial-example-detect").html());

        $("#cv-tutorial-example-detect").html("");

        break;

      default:
        break;
    }
  });

  // save
  $("#toolbar-save-cv").on("click", function (e) {
    const titleCV = $("#cv-title").text();
    if (titleCV) {
      handleSaveCV(titleCV);
    } else {
      $("#cv-modal-empty-title").show();
      $("#cv-btn-cancel-title").on("click", () => {
        $("#cv-modal-empty-title").hide();
      });

      $("#cv-btn-confirm-title").on("click", () => {
        if ($("#cv-text-empty-titlte").val()) {
          handleSaveCV($("#cv-text-empty-titlte").val());
        } else {
          alert("Bạn cần phải nhập tiêu đề CV để lưu");
        }
      });
    }
  });
});

const handleSaveCV = (titleCV) => {
  const data = getDataCv();
  $("#cv-preview-save-detect").html($("#cv-document").html());
  filterThemeHtml();
  $("#cv-save-loading").css("display","flex");
  if (window.location.href.includes("viet-cv")) {
    axios({
      url: "/api/cv",
      method: "post",
      data: {
        title: titleCV,
        html: $("#cv-preview-save-detect").html(),
        htmlFull: `<div id="cv-document">${$(
          "#cv-document"
        ).html()}</div><div id="cv-preview-save-detect"></div>`,
        height: $("#cv-preview-save-detect").height(),
        data,
      },
    }).then(res=>{
      $("#cv-modal-empty-title").hide();
      $("#cv-save-loading").hide();
      window.location.href = "https://ketnoiviec.net/quan-ly-cv";
    }).catch(err=>console.log(err));
  } else if (window.location.href.includes("sua-cv")) {
    axios({
      url: `/api/cv/${window.location.href.split("/")[4]}`,
      method: "put",
      data: {
        title: titleCV,
        html: $("#cv-preview-save-detect").html(),
        htmlFull: `<div id="cv-document">${$(
          "#cv-document"
        ).html()}</div><div id="cv-preview-save-detect"></div>`,
        height: $("#cv-preview-save-detect").height(),
        data,
      },
    })
      .then((res) =>{
         $("#cv-modal-empty-title").hide();
         $("#cv-save-loading").hide();
         window.location.href = "https://ketnoiviec.net/quan-ly-cv";
      })
      .catch((err) => console.log(err));
  }
  $("#cv-preview-save-detect").html("");
};

// preview

$("#toolbar-preview").on("click", async function (e) {
  $(".preview-modal-header-title").text(
    `Xem CV Online ${$("#cv-title").text()}`
  );
  $(".preview-modal-body .pdf-preview-render").remove();
  $(" body").css({
    overflow: "hidden",
  });
  $(".preview-modal").addClass("preview-modal-show");
  $(".preview-modal-body-loading").css({ display: "block" });

  $("#cv-preview-save-detect").html($("#cv-document").html());
  const titleCV = $("#cv-title").text();
  filterThemeHtml();

  const pdfBase64Preview = await axios({
    url: "/api/cv/preview",
    method: "post",
    data: {
      title: titleCV,
      html: $("#cv-preview-save-detect").html(),
      height: $("#cv-preview-save-detect").height(),
    },
  });
  $("#cv-preview-save-detect").html("");

  $(".preview-modal-body-loading").css({ display: "none" });

  const pdfjsLib = window["pdfjs-dist/build/pdf"];
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//mozilla.github.io/pdf.js/build/pdf.worker.js";

  const pdfDoc = await pdfjsLib.getDocument({
    data: atob(pdfBase64Preview.data.pdf),
  }).promise;

  for (let index = 0; index < pdfDoc.numPages; index++) {
    $(".preview-modal-body").append(
      `<canvas class="pdf-preview-render"></canvas>`
    );
  }

  for (let index = 0; index < pdfDoc.numPages; index++) {
    const canvas = $(".pdf-preview-render")[index];

    const ctx = canvas.getContext("2d");

    pdfDoc.getPage(index + 1).then((page) => {
      const viewport = page.getViewport({ scale: 1.3344090359 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderCtx = {
        canvasContext: ctx,
        viewport,
      };

      page.render(renderCtx).promise.then(() => {});
    });
  }
});

// get data cv

const getDataCv = () => {
  let education = [];
  $("#cv-education .cv-education-element").each(function (e) {
    education.push({
      start: $(this).find(".cv-education-start").html(),
      end: $(this).find(".cv-education-end").html(),
      school: $(this).find(".cv-education-school").html(),
      subject: $(this).find(".cv-education-subject").html(),
      description: $(this).find(".cv-education-description").html(),
    });
  });

  let experience = [];
  $("#cv-experience .cv-experience-element").each(function (e) {
    experience.push({
      start: $(this).find(".cv-experience-start").html(),
      end: $(this).find(".cv-experience-end").html(),
      company: $(this).find(".cv-experience-name").html(),
      position: $(this).find(".cv-experience-position").html(),
      description: $(this).find(".cv-experience-description").html(),
    });
  });

  let activity = [];
  $("#cv-activity .cv-activity-element").each(function (e) {
    activity.push({
      start: $(this).find(".cv-activity-start").html(),
      end: $(this).find(".cv-activity-end").html(),
      name: $(this).find(".cv-activity-name").html(),
      position: $(this).find(".cv-activity-position").html(),
      description: $(this).find(".cv-activity-description").html(),
    });
  });

  let skill = [];
  $(" #cv-skill .cv-skill-element").each(function (e) {
    skill.push({
      name: $(this).find(".cv-skill-name").html(),
      value: $(this).find(".cv-skill-value").html(),
    });
  });

  let reference = [];
  $("#cv-reference .cv-reference-element").each(function (e) {
    reference.push({
      name: $(this).find(".cv-reference-name").html(),
      position: $(this).find(".cv-reference-position").html(),
      email: $(this).find(".cv-reference-email").html(),
      phone: $(this).find(".cv-reference-phonenumber").html(),
    });
  });

  let project = [];
  $("#cv-project .cv-project-element").each(function (e) {
    project.push({
      start: $(this).find(".cv-project-start").html(),
      end: $(this).find(".cv-project-end").html(),
      name: $(this).find(".cv-project-name").html(),
      position: $(this).find(".cv-project-position").html(),
      description: $(this).find(".cv-project-description").html(),
    });
  });

  let prize = [];
  $("#cv-prize .cv-prize-element").each(function (e) {
    prize.push({
      time: $(this).find(".cv-prize-time").html(),
      description: $(this).find(".cv-prize-description").html(),
    });
  });

  let certificate = [];
  $("#cv-certificate .cv-certificate-element").each(function (e) {
    certificate.push({
      time: $(this).find(".cv-certificate-time").html(),
      name: $(this).find(".cv-certificate-name").html(),
    });
  });

  const dataCV = {
    avatar: $("#cv-avatar-img").attr("value"),
    name: $("#cv-infomation-name").html(),
    job_position: $("#cv-infomation-position").html(),
    birthday: $("#cv-infomation-birthday").html(),
    gender: $("#cv-infomation-gender").html(),
    phone: $("#cv-infomation-phonenumber").html(),
    email: $("#cv-infomation-email").html(),
    address: $("#cv-infomation-address").html(),
    objective: $("#cv-objectives-content").html(),
    education,
    experience,
    activity,
    more_infomation: $("#cv-more-infomation-content").html(),
    skill,
    favorite: $("#cv-favorite-content").html(),
    reference,
    project,
    prize,
    certificate,
  };

  return dataCV;
};

const filterThemeHtml = () => {
  if (!$("#cv-preview-save-detect #cv-avatar-img").attr("value")) {
    $("#cv-preview-save-detect #cv-avatar").remove();
  }
  if (!$("#cv-preview-save-detect #cv-infomation-position").text()) {
    $("#cv-preview-save-detect #cv-infomation-position").remove();
  }

  if (!$("#cv-preview-save-detect #cv-infomation-birthday").text()) {
    $("#cv-preview-save-detect #cv-infomation-birthday")
      .closest(".row")
      .remove();
  }

  if (!$("#cv-preview-save-detect #cv-infomation-gender").text()) {
    $("#cv-preview-save-detect #cv-infomation-gender").closest(".row").remove();
  }

  if (!$("#cv-preview-save-detect #cv-infomation-phonenumber").text()) {
    $("#cv-preview-save-detect #cv-infomation-phonenumber")
      .closest(".row")
      .remove();
  }

  if (!$("#cv-preview-save-detect #cv-infomation-email").text()) {
    $("#cv-preview-save-detect #cv-infomation-email").closest(".row").remove();
  }

  if (!$("#cv-preview-save-detect #cv-infomation-address").text()) {
    $("#cv-preview-save-detect #cv-infomation-address")
      .closest(".row")
      .remove();
  }

  if (!$("#cv-preview-save-detect #cv-objectives-content").text()) {
    $("#cv-preview-save-detect #cv-objectives-content").remove();
  }

  $("#cv-preview-save-detect .cv-education-element").each(function (i, elem) {
    // console.log($(this).children());
  });

  $("#cv-preview-save-detect .cv-education-start").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-education-end").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-education-element .cv-element-content").each(
    function (i, elem) {
      if (
        !$(this).find(".cv-education-school").text() &&
        !$(this).find(".cv-education-subject").text() &&
        !$(this).find(".cv-education-description").text()
      ) {
        $(this).html("");
      }
    }
  );

  $("#cv-preview-save-detect .cv-experience-start").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-experience-end").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-experience-element .cv-element-content").each(
    function (i, elem) {
      if (
        !$(this).find(".cv-experience-name").text() &&
        !$(this).find(".cv-experience-position").text() &&
        !$(this).find(".cv-experience-description").text()
      ) {
        $(this).html("");
      }
    }
  );

  $("#cv-preview-save-detect .cv-activity-start").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-activity-end").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-activity-element .cv-element-content").each(
    function (i, elem) {
      if (
        !$(this).find(".cv-activity-name").text() &&
        !$(this).find(".cv-activity-position").text() &&
        !$(this).find(".cv-activity-description").text()
      ) {
        $(this).html("");
      }
    }
  );

  $("#cv-preview-save-detect .cv-prize-time").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-prize-element .cv-element-content").each(
    function (i, elem) {
      if (!$(this).find(".cv-prize-description").text()) {
        $(this).html("");
      }
    }
  );

  if (!$("#cv-preview-save-detect #cv-more-infomation-content").text()) {
    $("#cv-preview-save-detect #cv-more-infomation-content").remove();
  }

  $("#cv-preview-save-detect .cv-certificate-time").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-certificate-element .cv-element-content").each(
    function (i, elem) {
      if (!$(this).find(".cv-certificate-name").text()) {
        $(this).html("");
      }
    }
  );

  $("#cv-preview-save-detect .cv-skill-name").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-child-element").html("");
    }
  });

  $("#cv-preview-save-detect .cv-reference-name").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).remove();
    }
  });

  $("#cv-preview-save-detect .cv-reference-position").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).remove();
    }
  });

  $("#cv-preview-save-detect .cv-reference-email").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).remove();
    }
  });

  $("#cv-preview-save-detect .cv-reference-phonenumber").each(function (
    i,
    elem
  ) {
    if (!$(this).text()) {
      $(this).remove();
    }
  });

  $("#cv-preview-save-detect .cv-project-start").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-project-end").each(function (i, elem) {
    if (!$(this).text()) {
      $(this).closest(".cv-element-time-duration").html("");
    }
  });

  $("#cv-preview-save-detect .cv-project-element .cv-element-content").each(
    function (i, elem) {
      if (
        !$(this).find(".cv-project-name").text() &&
        !$(this).find(".cv-project-position").text() &&
        !$(this).find(".cv-project-description").text()
      ) {
        $(this).html("");
      }
    }
  );

  let pageCount = Math.ceil($("#cv-preview-save-detect").height() / 1122.2);
  let index = 1;

  do {
    const footerPdf = `<div  style="font-size: 13px;color: #888;transform: translateY(2px); position: absolute; top: ${
      1122.2 * index - 30
    }px;right:10px;width:100%;display:flex;justify-content:flex-end;margin-right:16px;align-items:center"><p><img alt="" src="
    data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMxNkI1QTQ7fQ0KCS5zdDF7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8Zz4NCgk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSI4IiBjeT0iOCIgcj0iOCIvPg0KCTxnPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNC44LDEyLjljLTAuMSwwLTAuMiwwLTAuMywwYy0wLjktMC4yLTEuNS0xLjEtMS40LTJjMC0wLjMsMS4yLTYuNSw3LjgtNy44YzAuOS0wLjIsMS44LDAuNCwyLDEuMw0KCQkJYzAuMiwwLjktMC40LDEuOC0xLjMsMmMtNC40LDAuOS01LjEsNS01LjEsNS4xQzYuMywxMi40LDUuNiwxMi45LDQuOCwxMi45eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNC44LDEyLjljLTAuMSwwLTAuMiwwLTAuMywwYy0wLjktMC4yLTEuNS0xLjEtMS40LTJjMC0wLjMsMS4yLTYuNSw3LjgtNy44YzAuOS0wLjIsMS44LDAuNCwyLDEuMw0KCQkJYzAuMiwwLjktMC40LDEuOC0xLjMsMmMtNC40LDAuOS01LjEsNS01LjEsNS4xQzYuMywxMi40LDUuNiwxMi45LDQuOCwxMi45eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy4zLDguMWMwLjUtMSwxLjMtMi4yLDIuNS0zLjNjMC40LTAuNCwwLjMtMS4xLTAuMi0xLjVDNS4zLDMuMSw0LjksMyw0LjUsMy4xQzMuNywzLjIsMy4xLDQsMy4xLDQuOXYzLjENCgkJCUMzLjEsOC4xLDMuMiw4LjEsMy4zLDguMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjcsNy44Yy0wLjItMC4xLTAuNC0wLjItMC43LDBjLTAuOCwwLjQtMS40LDEtMS45LDEuNmMtMC4xLDAuMi0wLjEsMC41LDAuMSwwLjdjMC42LDAuNiwxLjEsMSwxLjMsMS41DQoJCQljMC40LDEuMiwxLjIsMS4zLDEuOCwxLjNjMC42LDAsMi0wLjgsMS41LTIuM0MxMi4zLDkuMywxMS4yLDguMywxMC43LDcuOHoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==
          " style="width:10px;margin-right:4px;margin-top:2px" /></p> <p>Ketnoiviec.net</p> <p> &nbsp; - &nbsp; </p> <p>Trang &nbsp;</> ${index} / ${pageCount} </div>`;

    $("#cv-preview-save-detect #cv-container").append(footerPdf);
    index++;
  } while (index <= pageCount);
};
