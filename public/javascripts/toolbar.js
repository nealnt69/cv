$(document).ready(function ($) {
  let preFontSize = 1;

  const pickr = Pickr.create({
    el: "#toolbar-color-picker-btn",
    theme: "classic",
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
    ],

    default: "#fff",

    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        input: true,
        clear: true,
        save: true,
      },
    },
    i18n: {
      "btn:save": "Chọn",
      "btn:clear": "Làm mới",
    },
  });

  pickr
    .on("init", (instance) => {
      const listBackground = $("#cv-document  *").filter(function () {
        return (
          $(this).css("background-color").toLowerCase() !== "rgba(0, 0, 0, 0)"
        );
      });
      if (listBackground.length === 0) {
        $("#toolbar-color-picker-val-text").text("rgba(0, 0, 0, 0)");
        pickr.setColor("rgb(255, 255, 255)");
      } else {
        const theme = $(listBackground[0]).css("background-color");
        $("#toolbar-color-picker-val-text").text(theme);
        pickr.setColor(theme);
      }
    })
    .on("hide", (instance) => {
      console.log("hide", instance);
    })
    .on("show", (color, instance) => {
      console.log("show", color, instance);
    })
    .on("save", (color, instance) => {
      const listBackground = $("#cv-document  *").filter(function () {
        return (
          $(this).css("background-color").toLowerCase() !== "rgba(0, 0, 0, 0)"
        );
      });
      listBackground.css({
        "background-color": color.toRGBA().toString(0),
      });

      switch (instance._representation) {
        case "RGBA":
          $("#toolbar-color-picker-val-text").text(color.toRGBA().toString(0));
          break;
        case "HSLA":
          $("#toolbar-color-picker-val-text").text(color.toHSLA().toString(0));
          break;
        default:
          $("#toolbar-color-picker-val-text").text(color.toHEXA().toString(0));
          break;
      }
    })
    .on("clear", (instance) => {
      // console.log("clear", instance);
    })
    .on("change", (color, instance) => {
      // console.log("change", color, instance);
    })
    .on("changestop", (instance) => {
      // console.log("changestop", instance);
    })
    .on("cancel", (instance) => {
      // console.log("cancel", instance);
    })
    .on("swatchselect", (color, instance) => {
      // console.log("swatchselect", color, instance);
    });

  // change font

  $("#toolbar-select-font  .select-box__input").on("change", function (e) {
    changeUndoRedo();
    switch ($(this).val()) {
      case "Arial":
        $("#cv-document *").css("font-family", `Arial, Helvetica, sans-serif`);
        break;
      case "Times News Roman":
        $("#cv-document *").css(
          "font-family",
          `'Times New Roman', Times, serif`
        );
        break;
      case "Sans-serif":
        $("#cv-document *").css("font-family", `sans-serif`);
        break;
      case "Tahoma":
        $("#cv-document *").css(
          "font-family",
          `'Segoe UI', Tahoma, Geneva, Verdana,
        sans-serif`
        );
        break;

      default:
        break;
    }
  });

  // change font size

  $("#toolbar-select-font-size  .select-box__input").on("change", function (e) {
    changeUndoRedo();

    const val = $(this).val() * 1;

    $("#cv-document *[contenteditable]").each(function (index, e) {
      if ($(this).css("font-size")) {
        const size = parseFloat($(this).css("font-size"));
        $(this).css("font-size", (size / preFontSize) * val);
      }
    });
    preFontSize = val;
  });

  // style text

  $(".toolbar-text-style").on("mousedown", function (e) {
    changeUndoRedo();
    e.stopPropagation();
    $(this).toggleClass("toolbar-text-style--active");
    switch ($(this).attr("id")) {
      case "toolbar-text-bold":
        document.execCommand("bold", false, null);
        break;
      case "toolbar-text-italic":
        document.execCommand("italic", false, null);
        break;
      case "toolbar-text-underline":
        document.execCommand("underline", false, null);
        break;
      case "toolbar-text-left":
        document.execCommand("justifyLeft", false, null);
        break;
      case "toolbar-text-center":
        document.execCommand("justifyCenter", false, null);
        break;
      case "toolbar-text-right":
        document.execCommand("justifyRight", false, null);
        break;
      case "toolbar-text-justify":
        document.execCommand("justifyFull", false, null);
        break;
      default:
        break;
    }
  });

  $(".toolbar-text-align-style").on("mousedown", function (e) {
    changeUndoRedo();
    e.stopPropagation();
    $(".toolbar-text-align-style").css("cursor", "pointer");
    $(".toolbar-text-align-style").removeClass("toolbar-text-style--active");
    $(this).addClass("toolbar-text-style--active");
    switch ($(this).attr("id")) {
      case "toolbar-text-left":
        document.execCommand("justifyLeft", false, null);
        break;
      case "toolbar-text-center":
        document.execCommand("justifyCenter", false, null);
        break;
      case "toolbar-text-right":
        document.execCommand("justifyRight", false, null);
        break;
      case "toolbar-text-justify":
        document.execCommand("justifyFull", false, null);
        break;
      default:
        break;
    }
  });

  // click outside cv layout
  $(document).mousedown(function (e) {
    if (!$(e.target).is("*[contenteditable]")) {
      $(".toolbar-text-style,.toolbar-text-align-style").css(
        "cursor",
        "not-allowed"
      );
      $(".toolbar-text-style,.toolbar-text-align-style").attr("disabled", true);
      if (
        $(".toolbar-text-align-style").hasClass("toolbar-text-style--active")
      ) {
        $(".toolbar-text-align-style").removeClass(
          "toolbar-text-style--active"
        );
      }

      if ($(".toolbar-text-style").hasClass("toolbar-text-style--active")) {
        $(".toolbar-text-style").removeClass("toolbar-text-style--active");
      }
    }
  });

  $("#cv-document").on("mousedown", "*[contenteditable]", function (e) {
    e.stopPropagation();
    if ($(".toolbar-text-style").hasClass("toolbar-text-style--active")) {
      setTimeout(() => {
        $(".toolbar-text-style").removeClass("toolbar-text-style--active");
      }, 100);
    }
  });

  // check text align style
  $("#cv-document").on("mousedown", "*[contenteditable]", function (e) {
    e.stopPropagation();
    $(".toolbar-text-align-style").css("cursor", "pointer");
    $(".toolbar-text-align-style").attr("disabled", false);
    $(".toolbar-text-align-style").removeClass("toolbar-text-style--active");
    const styleTextAlign = $(this).children("div").css("text-align");
    switch (styleTextAlign) {
      case "center":
        $("#toolbar-text-center").addClass("toolbar-text-style--active");
        break;
      case "right":
        $("#toolbar-text-right").addClass("toolbar-text-style--active");
        break;
      case "justify":
        $("#toolbar-text-justify").addClass("toolbar-text-style--active");
        break;
      default:
        $("#toolbar-text-left").addClass("toolbar-text-style--active");
        break;
    }
  });

  $("#cv-document *[contenteditable]").on("input", function (e) {
    if (!$(this).text()) {
      $(this).html("");
      $(".toolbar-text-align-style").removeClass("toolbar-text-style--active");
      $("#toolbar-text-left").addClass("toolbar-text-style--active");
    }
  });

  function handleHighlightText(e) {
    let ele = document.all
      ? document.selection.createRange().text
      : document.getSelection();

    if (ele.type === "Range") {
      const parentElement = $(ele.focusNode.ownerDocument.activeElement);
      const isContentEditable = parentElement.attr("contenteditable");
      $(".toolbar-text-style").css("cursor", "pointer");
      $(".toolbar-text-style").attr("disabled", false);
      if (
        typeof isContentEditable !== typeof undefined &&
        isContentEditable !== false
      ) {
        if (parentElement.find("b").length > 0) {
          $("#toolbar-text-bold").addClass("toolbar-text-style--active");
        }
        if (parentElement.find("i").length > 0) {
          $("#toolbar-text-italic").addClass("toolbar-text-style--active");
        }
        if (parentElement.find("u").length > 0) {
          $("#toolbar-text-underline").addClass("toolbar-text-style--active");
        }
        if (
          parentElement.find("b").length === 0 &&
          parentElement.find("i").length === 0 &&
          parentElement.find("u").length === 0
        ) {
          $("#toolbar-text-underline").removeClass(
            "toolbar-text-style--active"
          );
          $("#toolbar-text-italic").removeClass("toolbar-text-style--active");
          $("#toolbar-text-bold").removeClass("toolbar-text-style--active");
        }
      }
    }
  }

  document.onmouseup = handleHighlightText;
  if (!document.all) document.captureEvents(Event.MOUSEUP);

  // change line height

  switch ($("#cv-document").css("line-height")) {
    case "18.2px":
      $("#toolbar-line-hight-small").addClass(
        "toolbar-line-hight-item--active"
      );
      break;
    case "25.2px":
      $("#toolbar-line-hight-large").addClass(
        "toolbar-line-hight-item--active"
      );
      break;
    default:
      $("#toolbar-line-hight-medium").addClass(
        "toolbar-line-hight-item--active"
      );
      break;
  }

  $(".toolbar-line-hight-item").on("click", function (e) {
    $(".toolbar-line-hight-item--active").removeClass(
      "toolbar-line-hight-item--active"
    );
    $(this).addClass("toolbar-line-hight-item--active");
    switch ($(this).attr("id")) {
      case "toolbar-line-hight-small":
        $("#cv-document").css("line-height", 1.3);

        break;
      case "toolbar-line-hight-medium":
        $("#cv-document").css("line-height", 1.5);

        break;
      case "toolbar-line-hight-large":
        $("#cv-document").css("line-height", 1.8);

        break;
      default:
        break;
    }
  });

  $("#cv-document").on("click", "#cv-element-control-menu", function (e) {
    setTimeout(() => {
      $("#layout-modal").addClass("layout-show").trigger("show-layout-modal");
    }, 100);
  });

  // show modal grid

  $("#toolbar-grid").on("click", function (e) {
    setTimeout(() => {
      $("#layout-modal").addClass("layout-show").trigger("show-layout-modal");
    }, 100);
  });

  // show modal theme

  $("#toolbar-change-theme").on("click", function (e) {
    setTimeout(() => {
      $("#theme-modal").addClass("theme-show").trigger("show-theme-modal");
    }, 100);
  });

  $("#language-vi").on("click", function (e) {
    changeUndoRedo();
    $(".toolbar-language-flag .toolbar-language-active").remove();
    $(this).append(`
    <div class="toolbar-language-active"></div>
    `);
    $("[lang]").attr("lang", "vi");
    $("#cv-title").attr("cv-placeholder", "Tiêu đề CV");
    $("#cv-infomation-name").attr("cv-placeholder", "Tên của bạn");
    $("#cv-infomation-position").attr(
      "cv-placeholder",
      "Công việc bạn mong muốn"
    );
    $("#cv-birthday-title").text("Ngày sinh:");
    $("#cv-gender-title").text("Giới tính:");
    $("#cv-phone-title").text("Điện thoại:");
    $("#cv-email-title").text("Email:");
    $("#cv-address-title").text("Địa chỉ:");

    $("#cv-infomation-birthday").attr("cv-placeholder", "Ngày sinh");
    $("#cv-infomation-gender").attr("cv-placeholder", "Giới tính");
    $("#cv-infomation-phonenumber").attr("cv-placeholder", "Số điện thoại");
    $("#cv-infomation-email").attr("cv-placeholder", "Địa chỉ email");
    $("#cv-infomation-address").attr("cv-placeholder", "Địa chỉ hiện tại");

    $("#cv-objectives-title").text("Mục tiêu nghề nghiệp");
    $("#cv-objectives-content").attr(
      "cv-placeholder",
      "Mục tiêu nghề nghiệp: ngắn hạn, dài hạn"
    );
    $("#cv-education-title").text("Học vấn");
    $(".cv-education-start").attr("cv-placeholder", "Bắt đầu");
    $(".cv-education-end").attr("cv-placeholder", "Kết thúc");
    $(".cv-education-school").attr("cv-placeholder", "Tên trường học");
    $(".cv-education-subject").attr("cv-placeholder", "Ngành học / Môn học");
    $(".cv-education-description").attr("cv-placeholder", "Mô tả chi tiết");

    $("#cv-experience-title").text("Kinh nghiệm làm việc");
    $(".cv-experience-start").attr("cv-placeholder", "Bắt đầu");
    $(".cv-experience-end").attr("cv-placeholder", "Kết thúc");
    $(".cv-experience-name").attr("cv-placeholder", "Tên công ty");
    $(".cv-experience-position").attr("cv-placeholder", "Vị trí công việc");
    $(".cv-experience-description").attr(
      "cv-placeholder",
      "Mô tả chi tiết công việc, những gì đạt được trong quá trình làm việc"
    );

    $("#cv-activity-title").text("Hoạt động");
    $(".cv-activity-start").attr("cv-placeholder", "Bắt đầu");
    $(".cv-activity-end").attr("cv-placeholder", "Kết thúc");
    $(".cv-activity-name").attr("cv-placeholder", "Tên tổ chức");
    $(".cv-activity-position").attr("cv-placeholder", "Vị trí tham gia");
    $(".cv-activity-description").attr(
      "cv-placeholder",
      "Mô tả chi tiết các hoạt động đã tham gia"
    );

    $("#cv-prize-title").text("Giải thưởng");
    $(".cv-prize-time").attr("cv-placeholder", "Ngày nhận giải");
    $(".cv-prize-description").attr("cv-placeholder", "Tên giải thưởng");

    $("#cv-more-infomation-title").text("Thông tin thêm");
    $("#cv-more-infomation-content").attr(
      "cv-placeholder",
      "Điền các thông tin khác nếu có"
    );

    $("#cv-certificate-title").text("Chứng chỉ");
    $(".cv-certificate-time").attr("cv-placeholder", "Năm");
    $(".cv-certificate-name").attr("cv-placeholder", "Tên chứng chỉ");

    $("#cv-skill-title").text("Kỹ năng");
    $(".cv-skill-name").attr("cv-placeholder", "Tên kỹ năng");
    $(".cv-skill-value").attr("cv-placeholder", "Kỹ năng");

    $("#cv-favorite-title").text("Sở thích");
    $("#cv-favorite-content").attr(
      "cv-placeholder",
      "Nói ngắn gọn về sở thích của cá nhân"
    );

    $("#cv-reference-title").text("Người tham chiếu");
    $(".cv-reference-name").attr("cv-placeholder", "Tên người tham chiếu");
    $(".cv-reference-position").attr("cv-placeholder", "Vị trí hiện tại");
    $(".cv-reference-email").attr("cv-placeholder", "Địa chi email");
    $(".cv-reference-phonenumber").attr("cv-placeholder", "Số điện thoại");

    $("#cv-project-title").text("Dự án");
    $(".cv-project-start").attr("cv-placeholder", "Bắt đầu");
    $(".cv-project-end").attr("cv-placeholder", "Kết thúc");
    $(".cv-project-name").attr("cv-placeholder", "Tên dự án");
    $(".cv-project-position").attr("cv-placeholder", "Vị trí tham gia");
    $(".cv-project-description").attr("cv-placeholder", "Mô tả chi tiết");
  });

  // en

  $("#language-en").on("click", function (e) {
    changeUndoRedo();

    $(".toolbar-language-flag .toolbar-language-active").remove();
    $(this).append(`
    <div class="toolbar-language-active"></div>
    `);
    $("[lang]").attr("lang", "en");
    $("#cv-title").attr("cv-placeholder", "CV Title");
    $("#cv-infomation-name").attr("cv-placeholder", "Your name");
    $("#cv-infomation-position").attr("cv-placeholder", "Desired job");
    $("#cv-birthday-title").text("Date of birth:");
    $("#cv-gender-title").text("Gender:");
    $("#cv-phone-title").text("Phone:");
    $("#cv-email-title").text("Email:");
    $("#cv-address-title").text("Address:");

    $("#cv-infomation-birthday").attr("cv-placeholder", "Date of birth");
    $("#cv-infomation-gender").attr("cv-placeholder", "Gender");
    $("#cv-infomation-phonenumber").attr("cv-placeholder", "Phone");
    $("#cv-infomation-email").attr("cv-placeholder", "Email");
    $("#cv-infomation-address").attr("cv-placeholder", "Address");

    $("#cv-objectives-title").text("OBJECTIVE");
    $("#cv-objectives-content").attr(
      "cv-placeholder",
      "Your career's objective"
    );
    $("#cv-education-title").text("EDUCATION");
    $(".cv-education-start").attr("cv-placeholder", "From");
    $(".cv-education-end").attr("cv-placeholder", "To");
    $(".cv-education-school").attr("cv-placeholder", "Shool or University");
    $(".cv-education-subject").attr(
      "cv-placeholder",
      "Degree and Field of study"
    );
    $(".cv-education-description").attr(
      "cv-placeholder",
      "Write the main subject, or profile in your school"
    );

    $("#cv-experience-title").text("WORK EXPERIENCE");
    $(".cv-experience-start").attr("cv-placeholder", "From");
    $(".cv-experience-end").attr("cv-placeholder", "To");
    $(".cv-experience-name").attr("cv-placeholder", "Company Name");
    $(".cv-experience-position").attr("cv-placeholder", "Title / Position");
    $(".cv-experience-description").attr(
      "cv-placeholder",
      "Description about your responsibilities and the results of your work"
    );

    $("#cv-activity-title").text("ACTIVITIES");
    $(".cv-activity-start").attr("cv-placeholder", "From");
    $(".cv-activity-end").attr("cv-placeholder", "To");
    $(".cv-activity-name").attr("cv-placeholder", "Organization Name");
    $(".cv-activity-position").attr("cv-placeholder", "Title / Role");
    $(".cv-activity-description").attr("cv-placeholder", "Description");

    $("#cv-prize-title").text("HONORS & AWARDS");
    $(".cv-prize-time").attr("cv-placeholder", "Time");
    $(".cv-prize-description").attr("cv-placeholder", "Award Name");

    $("#cv-more-infomation-title").text("ADDITIONAL INFORMATION");
    $("#cv-more-infomation-content").attr("cv-placeholder", "Detail");

    $("#cv-certificate-title").text("CERTIFICATIONS");
    $(".cv-certificate-time").attr("cv-placeholder", "Time");
    $(".cv-certificate-name").attr("cv-placeholder", "Certification Name");

    $("#cv-skill-title").text("SKILLS");
    $(".cv-skill-name").attr("cv-placeholder", "Skill Group Name");
    $(".cv-skill-value").attr("cv-placeholder", "Skill Description");

    $("#cv-favorite-title").text("INTERESTS");
    $("#cv-favorite-content").attr(
      "cv-placeholder",
      "I like soccer, music..etc"
    );

    $("#cv-reference-title").text("REFERENCES");
    $(".cv-reference-name").attr("cv-placeholder", "Name");
    $(".cv-reference-position").attr("cv-placeholder", "Position");
    $(".cv-reference-email").attr("cv-placeholder", "Email");
    $(".cv-reference-phonenumber").attr("cv-placeholder", "Phonenumber");

    $("#cv-project-title").text("PROJECTS");
    $(".cv-project-start").attr("cv-placeholder", "From");
    $(".cv-project-end").attr("cv-placeholder", "To");
    $(".cv-project-name").attr("cv-placeholder", "Project name");
    $(".cv-project-position").attr("cv-placeholder", "Project position");
    $(".cv-project-description").attr("cv-placeholder", "Description");
  });

  // undo redo

  $("#toolbar-undo").on("click", function (e) {
    handleUndo();
    document.execCommand("undo", false, null);
  });
  $("#toolbar-redo").on("click", function (e) {
    handleRedo();
    document.execCommand("redo", false, null);
  });

  // const observer = new MutationObserver((mutationsList, observer) => {
  //   for (const mutation of mutationsList) {
  //     if (mutation.type === "childList") {
  //       console.log("A child node has been added or removed.");
  //     } else if (mutation.type === "attributes") {
  //       if ($(mutation.target).hasClass("cv-element")) {
  //       }
  //     }
  //   }
  // });

  // const targetNode = document.getElementById("cv-document");

  // const config = {
  //   characterData: true,
  // };

  // observer.observe(targetNode, config);

  // observer.disconnect();
});
