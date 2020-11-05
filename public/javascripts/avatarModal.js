$(document).ready(function ($) {
  let cropper;

  $("#avatar-modal")
    .on("show.bs.modal", function (e) {
      $("#upload-avatar-input").val("");
      $("#choose-image").show();
      $("#crop-image").hide();
    })
    .on("hidden.bs.modal", function () {
      $("#crop-image").hide();

      if (cropper) {
        cropper.destroy();
      }

      cropper = null;
    });

  $("#upload-avatar-input").on("change", function (e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      $("#image-crop").attr("src", URL.createObjectURL(files[0]));
      $("#choose-image").hide();
      $("#crop-image").show();
      const avatarFrame = $("#cv-avatar-img");

      cropper = new Cropper(document.getElementById("image-crop"), {
        aspectRatio:
          avatarFrame.css("border-radius") === "50%"
            ? 1
            : avatarFrame.width() / avatarFrame.height(),
        viewMode: 1,
        dragMode: "move",
        rotatable: false,
        scalable: false,
        cropBoxResizable: false,
        cropBoxMovable: false,
        minContainerHeight: 220,
        background: false,
        guides: false,
        highlight: false,
        toggleDragModeOnDblclick: false,
        ready() {
          if (avatarFrame.css("border-radius") === "50%") {
            $("#crop-image span.cropper-view-box").css("border-radius", "50%");
          }
        },
      });
    }
  });

  $(".your-avatar-item img").on("click", function (e) {
    $("#choose-image").hide();
    $("#crop-image").show();

    $("#image-crop").attr("src", $(this).attr("src"));

    const avatarFrame = $("#cv-avatar-img");

    cropper = new Cropper(document.getElementById("image-crop"), {
      aspectRatio:
        avatarFrame.css("border-radius") === "50%"
          ? 1
          : avatarFrame.width() / avatarFrame.height(),
      viewMode: 1,
      dragMode: "move",
      rotatable: false,
      scalable: false,
      cropBoxResizable: false,
      cropBoxMovable: false,
      minContainerHeight: 220,
      background: false,
      guides: false,
      highlight: false,
      toggleDragModeOnDblclick: false,
      ready() {
        if (avatarFrame.css("border-radius") === "50%") {
          $("#crop-image span.cropper-view-box").css("border-radius", "50%");
        }
      },
    });
  });

  $("#save-crop").on("click", function (e) {
    let croppedCanvas;
    let roundedCanvas;
    let roundedImage;
    const avatarFrame = $("#cv-avatar-img");

    croppedCanvas = cropper.getCroppedCanvas();

    if (avatarFrame.css("border-radius") === "50%") {
      croppedCanvas = getRoundedCanvas(croppedCanvas);
    }

    $("#cv-avatar-img").attr("src", croppedCanvas.toDataURL());
    $("#cv-avatar-img").attr("value", croppedCanvas.toDataURL());

    $("#avatar-modal").modal("hide");
  });
});

function getRoundedCanvas(sourceCanvas) {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let width = sourceCanvas.width;
  let height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}
