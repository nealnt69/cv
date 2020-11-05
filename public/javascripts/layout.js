$(document).ready(function ($) {
  // click up
  $("#cv-document").on("click", "#cv-element-control-up", function (e) {
    const elementTarget = $(this).closest(".cv-element");
    const elements = $(".cv-element").filter(function () {
      return $(this).css("display") !== "none";
    });
    const elementTargetIndex = elements.index(elementTarget);
    if (elementTargetIndex > 1) {
      changeUndoRedo();
      elementTarget.insertBefore(elements.eq(elementTargetIndex - 1));
    }
  });

  //click down

  $("#cv-document").on("click", "#cv-element-control-down", function (e) {
    const elementTarget = $(this).closest(".cv-element");
    const elements = $(".cv-element").filter(function () {
      return $(this).css("display") !== "none";
    });
    const elementTargetIndex = elements.index(elementTarget);
    if (elementTargetIndex > 0) {
      changeUndoRedo();
      elementTarget.insertAfter(elements.eq(elementTargetIndex + 1));
    }
  });

  // hidden

  $("#cv-document").on("click", "#cv-element-control-hidden", function (e) {
    $(".cv-element-control").hide();
    changeUndoRedo();
    const elementTarget = $(this).closest(".cv-element");
    const elements = $(".cv-element").filter(function () {
      return $(this).css("display") !== "none";
    });

    elementTarget.insertAfter(elements.eq(elements.length - 1));
    $(elementTarget).css("display", "none");
  });

  //

  $("#cv-document").on("click", "#cv-element-child-control-add", function (e) {
    changeUndoRedo();
    const elementChild = $(this).closest(".cv-child-element");
    $("#cv-element-child-detect").html(elementChild.clone());

    $("#cv-element-child-detect *[contenteditable]").text("");

    $("#cv-element-child-detect .cv-element-child-control").remove();

    $($("#cv-element-child-detect").html()).insertAfter(elementChild);

    $("#cv-element-child-detect").html("");
  });

  $("#cv-document").on("click", "#cv-element-child-control-remove", function (
    e
  ) {
    changeUndoRedo();
    $(this).closest(".cv-child-element").remove();
  });

  $("#cv-document").on("click", "#cv-element-child-control-down", function (e) {
    changeUndoRedo();
    const elementChild = $(this).closest(".cv-child-element");
    elementChild.insertAfter(elementChild.next(".cv-child-element"));
  });

  $("#cv-document").on("click", "#cv-element-child-control-up", function (e) {
    changeUndoRedo();
    const elementChild = $(this).closest(".cv-child-element");
    elementChild.insertBefore(elementChild.prev(".cv-child-element"));
  });

  // modal layout

  $(document).on("click", function (e) {
    if (
      !$("#layout-modal").is(e.target) &&
      $("#layout-modal").has(e.target).length === 0 &&
      $("#layout-modal").hasClass("layout-show")
    ) {
      $("#layout-modal").removeClass("layout-show");
    }
  });

  $("#close-layout-modal").on("click", function (e) {
    $("#layout-modal").removeClass("layout-show");
  });

  $("#layout-modal").on("show-layout-modal", function (e) {
    const listElementVisibleName = [];
    const listElementHiddenName = [];

    const elementsVisible = $(".cv-element").filter(function () {
      return $(this).css("display") !== "none";
    });
    const elementsHidden = $(".cv-element").filter(function () {
      return $(this).css("display") === "none";
    });

    $.each(elementsVisible, function (i, e) {
      const elementName = $(this).attr("id");
      switch (elementName) {
        case "cv-personal-information":
          listElementVisibleName.push("Thông tin cá nhân");
          break;
        case "cv-objectives":
          listElementVisibleName.push("Mục tiêu nghề nghiệp");
          break;
        case "cv-education":
          listElementVisibleName.push("Học vấn");
          break;
        case "cv-experience":
          listElementVisibleName.push("Kinh nghiệm làm việc");
          break;
        case "cv-activity":
          listElementVisibleName.push("Hoạt động");
          break;
        case "cv-prize":
          listElementVisibleName.push("Giải thưởng");
          break;
        case "cv-more-infomation":
          listElementVisibleName.push("Thông tin thêm");
          break;
        case "cv-certificate":
          listElementVisibleName.push("Chứng chỉ");
          break;
        case "cv-skill":
          listElementVisibleName.push("Kỹ năng");
          break;
        case "cv-favorite":
          listElementVisibleName.push("Sở thích");
          break;
        case "cv-reference":
          listElementVisibleName.push("Người tham chiếu");
          break;
        case "cv-project":
          listElementVisibleName.push("Dự án");
          break;
        default:
          break;
      }
    });

    $.each(elementsHidden, function (i, e) {
      const elementName = $(this).attr("id");
      switch (elementName) {
        case "cv-personal-information":
          listElementHiddenName.push("Thông tin cá nhân");
          break;
        case "cv-objectives":
          listElementHiddenName.push("Mục tiêu nghề nghiệp");
          break;
        case "cv-education":
          listElementHiddenName.push("Học vấn");
          break;
        case "cv-experience":
          listElementHiddenName.push("Kinh nghiệm làm việc");
          break;
        case "cv-activity":
          listElementHiddenName.push("Hoạt động");
          break;
        case "cv-prize":
          listElementHiddenName.push("Giải thưởng");
          break;
        case "cv-more-infomation":
          listElementHiddenName.push("Thông tin thêm");
          break;
        case "cv-certificate":
          listElementHiddenName.push("Chứng chỉ");
          break;
        case "cv-skill":
          listElementHiddenName.push("Kỹ năng");
          break;
        case "cv-favorite":
          listElementHiddenName.push("Sở thích");
          break;
        case "cv-reference":
          listElementHiddenName.push("Người tham chiếu");
          break;
        case "cv-project":
          listElementHiddenName.push("Dự án");
          break;
        default:
          break;
      }
    });

    $("#layout-visible-table").html(
      listElementVisibleName.map(
        (item, index) =>
          `<div class='layout-table-item-visible ${
            index === 0 && "ui-state-disabled"
          }'>${item}</div>`
      )
    );
    $("#layout-hidden-table").html(
      listElementHiddenName.map(
        (item) => `<div class='layout-table-item-hidden'>${item}</div>`
      )
    );

    $("#layout-visible-table")
      .sortable({
        connectWith: ".layout-table-sort",
        cursor: "move",
        items: "div:not(.ui-state-disabled)",
        update: function (e, ui) {
          changeUndoRedo();
        },
        receive: function (e, ui) {
          $(e.toElement).removeClass("layout-table-item-hidden");
          $(e.toElement).addClass("layout-table-item-visible");
        },
        stop: function (e, ui) {
          let elementList = [];
          let elementHiddenList = [];

          $(".layout-table-item-visible").each(function (index, e) {
            switch ($(e).text()) {
              case "Thông tin cá nhân":
                elementList.push($("#cv-personal-information"));
                break;
              case "Mục tiêu nghề nghiệp":
                elementList.push($("#cv-objectives"));

                break;
              case "Học vấn":
                elementList.push($("#cv-education"));

                break;
              case "Kinh nghiệm làm việc":
                elementList.push($("#cv-experience"));

                break;
              case "Hoạt động":
                elementList.push($("#cv-activity"));

                break;
              case "Giải thưởng":
                elementList.push($("#cv-prize"));

                break;
              case "Thông tin thêm":
                elementList.push($("#cv-more-infomation"));

                break;
              case "Chứng chỉ":
                elementList.push($("#cv-certificate"));

                break;
              case "Kỹ năng":
                elementList.push($("#cv-skill"));

                break;
              case "Sở thích":
                elementList.push($("#cv-favorite"));

                break;
              case "Người tham chiếu":
                elementList.push($("#cv-reference"));

                break;
              case "Dự án":
                elementList.push($("#cv-project"));
                break;
              default:
                break;
            }
          });

          $(".layout-table-item-hidden").each(function (index, e) {
            switch ($(e).text()) {
              case "Thông tin cá nhân":
                elementHiddenList.push($("#cv-personal-information"));
                break;
              case "Mục tiêu nghề nghiệp":
                elementHiddenList.push($("#cv-objectives"));

                break;
              case "Học vấn":
                elementHiddenList.push($("#cv-education"));

                break;
              case "Kinh nghiệm làm việc":
                elementHiddenList.push($("#cv-experience"));
                break;
              case "Hoạt động":
                elementHiddenList.push($("#cv-activity"));

                break;
              case "Giải thưởng":
                elementHiddenList.push($("#cv-prize"));

                break;
              case "Thông tin thêm":
                elementHiddenList.push($("#cv-more-infomation"));

                break;
              case "Chứng chỉ":
                elementHiddenList.push($("#cv-certificate"));

                break;
              case "Kỹ năng":
                elementHiddenList.push($("#cv-skill"));

                break;
              case "Sở thích":
                elementHiddenList.push($("#cv-favorite"));

                break;
              case "Người tham chiếu":
                elementHiddenList.push($("#cv-reference"));

                break;
              case "Dự án":
                elementHiddenList.push($("#cv-project"));

                break;

              default:
                break;
            }
          });
          elementList.map((item, index) => {
            const elementsVisible = $(".cv-element").filter(function () {
              return $(this).css("display") !== "none";
            });

            $(item).css("display", "block");
            item.insertAfter(elementsVisible.eq(index));
          });

          elementHiddenList.map((item, index) => {
            const elementsHidden = $(".cv-element").filter(function () {
              return $(this).css("display") === "none";
            });
            $(item).css("display", "none");
            item.insertAfter(elementsHidden.eq(elementsHidden.length - 1));
          });
        },
        over: function (e, ui) {
          $(e.toElement).addClass("layout-table-item-visible");
          $(e.toElement).removeClass("layout-table-item-hidden");
        },
      })
      .disableSelection();

    $("#layout-hidden-table")
      .sortable({
        connectWith: ".layout-table-sort",
        cursor: "move",
        receive: function (e, ui) {
          $(e.toElement).removeClass("layout-table-item-visible");
          $(e.toElement).addClass("layout-table-item-hidden");
        },
        update: function (e, ui) {
          changeUndoRedo();
        },
        stop: function (e, ui) {
          let elementList = [];
          let elementHiddenList = [];

          $(".layout-table-item-visible").each(function (index, e) {
            switch ($(e).text()) {
              case "Thông tin cá nhân":
                elementList.push($("#cv-personal-information"));
                break;
              case "Mục tiêu nghề nghiệp":
                elementList.push($("#cv-objectives"));

                break;
              case "Học vấn":
                elementList.push($("#cv-education"));

                break;
              case "Kinh nghiệm làm việc":
                elementList.push($("#cv-experience"));

                break;
              case "Hoạt động":
                elementList.push($("#cv-activity"));

                break;
              case "Giải thưởng":
                elementList.push($("#cv-prize"));

                break;
              case "Thông tin thêm":
                elementList.push($("#cv-more-infomation"));

                break;
              case "Chứng chỉ":
                elementList.push($("#cv-certificate"));

                break;
              case "Kỹ năng":
                elementList.push($("#cv-skill"));

                break;
              case "Sở thích":
                elementList.push($("#cv-favorite"));

                break;
              case "Người tham chiếu":
                elementList.push($("#cv-reference"));

                break;
              case "Dự án":
                elementList.push($("#cv-project"));
                break;
              default:
                break;
            }
          });

          $(".layout-table-item-hidden").each(function (index, e) {
            switch ($(e).text()) {
              case "Thông tin cá nhân":
                elementHiddenList.push($("#cv-personal-information"));
                break;
              case "Mục tiêu nghề nghiệp":
                elementHiddenList.push($("#cv-objectives"));

                break;
              case "Học vấn":
                elementHiddenList.push($("#cv-education"));

                break;
              case "Kinh nghiệm làm việc":
                elementHiddenList.push($("#cv-experience"));
                break;
              case "Hoạt động":
                elementHiddenList.push($("#cv-activity"));

                break;
              case "Giải thưởng":
                elementHiddenList.push($("#cv-prize"));

                break;
              case "Thông tin thêm":
                elementHiddenList.push($("#cv-more-infomation"));

                break;
              case "Chứng chỉ":
                elementHiddenList.push($("#cv-certificate"));

                break;
              case "Kỹ năng":
                elementHiddenList.push($("#cv-skill"));

                break;
              case "Sở thích":
                elementHiddenList.push($("#cv-favorite"));

                break;
              case "Người tham chiếu":
                elementHiddenList.push($("#cv-reference"));

                break;
              case "Dự án":
                elementHiddenList.push($("#cv-project"));

                break;

              default:
                break;
            }
          });

          elementList.map((item, index) => {
            const elementsVisible = $(".cv-element").filter(function () {
              return $(this).css("display") !== "none";
            });
            item.insertAfter(elementsVisible.eq(index));
            $(item).css("display", "block");
          });

          elementHiddenList.map((item, index) => {
            const elementsHidden = $(".cv-element").filter(function () {
              return $(this).css("display") === "none";
            });
            $(item).css("display", "none");
            item.insertAfter(elementsHidden.eq(elementsHidden.length - 1));
          });
        },
        over: function (e, ui) {
          $(e.toElement).removeClass("layout-table-item-visible");
          $(e.toElement).addClass("layout-table-item-hidden");
        },
      })
      .disableSelection();
  });

  $("#cv-document").sortable({
    connectWith: "#cv-education",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-experience",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-activity",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-prize",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-certificate",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-skill",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-reference",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    forcePlaceholderSize: true,
    handle: "#cv-element-child-control-move",
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

  $("#cv-document").sortable({
    connectWith: "#cv-project",
    placeholder: "ui-placeholder-highlight",
    cursor: "move",
    handle: "#cv-element-child-control-move",
    forcePlaceholderSize: true,
    items: `div.cv-child-element:not(".cv-element-title")`,
    animation: 200,
    update: function (e, ui) {
      changeUndoRedo();
    },
  });

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
});
