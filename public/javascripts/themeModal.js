$(document).on("click", function (e) {
  if (
    !$("#theme-modal").is(e.target) &&
    $("#theme-modal").has(e.target).length === 0 &&
    $("#theme-modal").hasClass("theme-show")
  ) {
    $("#theme-modal").removeClass("theme-show");
  }
});

$("#close-theme-modal").on("click", function (e) {
  $("#theme-modal").removeClass("theme-show");
});

$("#theme-modal").on("show-theme-modal", async function (e) {
  const listTheme = await axios({
    url: "/api/theme?page=1&size=10",
    method: "get",
  });
  $("#list-theme").html(
    listTheme.data.themes.map(
      (
        theme
      ) => `<div class="theme-item" onclick='handleClickTheme(${JSON.stringify(
        theme
      )})'>
    <img  src=${theme.image}  alt="" class="theme-item-image">
    </img>
    <div class="theme-item-title">${theme.title}</div>
    </div>`
    )
  );
});

const handleClickTheme = (theme) => {
  const dataCV = getDataCv();
  $("#cv-change-theme-detect").html(theme.html);
  $("#cv-document").html(
    $("#cv-change-theme-detect").find("#cv-document").html()
  );
  $("#cv-change-theme-detect").html("");

  $("#cv-infomation-name").html(dataCV.name);
  // $("#cv-avatar-img").attr("src", dataCV.avatar);
  // $("#cv-avatar-img").attr("value", dataCV.avatar);
  $("#cv-infomation-position").html(dataCV.job_position);
  $("#cv-infomation-birthday").html(dataCV.birthday);
  $("#cv-infomation-gender").html(dataCV.gender);
  $("#cv-infomation-phonenumber").html(dataCV.phone);
  $("#cv-infomation-email").html(dataCV.email);
  $("#cv-infomation-address").html(dataCV.address);
  $("#cv-objectives-content").html(dataCV.objective);
  $("#cv-more-infomation-content").html(dataCV.more_infomation);
  $("#cv-favorite-content").html(dataCV.favorite);

  const dataEdu = dataCV.education.map((item) => {
    const eleClone = $("#cv-education .cv-education-element").clone();
    eleClone.find(".cv-education-start").html(item.start);
    eleClone.find(".cv-education-end").html(item.end);
    eleClone.find(".cv-education-school").html(item.school);
    eleClone.find(".cv-education-subject").html(item.subject);
    eleClone.find(".cv-education-description").html(item.description);
    return eleClone;
  });
  $("#cv-education .cv-education-element").remove();
  $("#cv-education").append(dataEdu);

  const dataExp = dataCV.experience.map((item) => {
    const eleClone = $("#cv-experience .cv-experience-element").clone();
    eleClone.find(".cv-experience-start").html(item.start);
    eleClone.find(".cv-experience-end").html(item.end);
    eleClone.find(".cv-experience-name").html(item.company);
    eleClone.find(".cv-experience-position").html(item.position);
    eleClone.find(".cv-experience-description").html(item.description);
    return eleClone;
  });
  $("#cv-experience .cv-experience-element").remove();
  $("#cv-experience").append(dataExp);

  const dataActi = dataCV.activity.map((item) => {
    const eleClone = $("#cv-activity .cv-activity-element").clone();
    eleClone.find(".cv-activity-start").html(item.start);
    eleClone.find(".cv-activity-end").html(item.end);
    eleClone.find(".cv-activity-name").html(item.name);
    eleClone.find(".cv-activity-position").html(item.position);
    eleClone.find(".cv-activity-description").html(item.description);
    return eleClone;
  });
  $("#cv-activity .cv-activity-element").remove();
  $("#cv-activity").append(dataActi);

  const dataSkill = dataCV.skill.map((item) => {
    const eleClone = $("#cv-skill .cv-skill-element").clone();
    eleClone.find(".cv-skill-name").html(item.name);
    eleClone.find(".cv-skill-value").html(item.value);
    return eleClone;
  });
  $("#cv-skill .cv-skill-element").remove();
  $("#cv-skill").append(dataSkill);

  const dataRefer = dataCV.reference.map((item) => {
    const eleClone = $("#cv-reference .cv-reference-element").clone();
    eleClone.find(".cv-reference-name").html(item.name);
    eleClone.find(".cv-reference-position").html(item.position);
    eleClone.find(".cv-reference-email").html(item.email);
    eleClone.find(".cv-reference-phonenumber").html(item.phone);
    return eleClone;
  });
  $("#cv-reference .cv-reference-element").remove();
  $("#cv-reference").append(dataRefer);

  const dataProj = dataCV.project.map((item) => {
    const eleClone = $("#cv-project .cv-project-element").clone();
    eleClone.find(".cv-project-start").html(item.start);
    eleClone.find(".cv-project-end").html(item.end);
    eleClone.find(".cv-project-name").html(item.name);
    eleClone.find(".cv-project-position").html(item.position);
    eleClone.find(".cv-project-description").html(item.description);
    return eleClone;
  });
  $("#cv-project .cv-project-element").remove();
  $("#cv-project").append(dataProj);

  const dataPrize = dataCV.prize.map((item) => {
    const eleClone = $("#cv-prize .cv-prize-element").clone();
    eleClone.find(".cv-prize-time").html(item.time);
    eleClone.find(".cv-prize-description").html(item.description);
    return eleClone;
  });
  $("#cv-prize .cv-prize-element").remove();
  $("#cv-prize").append(dataPrize);

  const dataCerti = dataCV.certificate.map((item) => {
    const eleClone = $("#cv-certificate .cv-certificate-element").clone();
    eleClone.find(".cv-certificate-time").html(item.time);
    eleClone.find(".cv-certificate-name").html(item.name);
    return eleClone;
  });
  $("#cv-certificate .cv-certificate-element").remove();
  $("#cv-certificate").append(dataCerti);

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
};
