const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const cvSchema = new mongoose.Schema(
  {
    user_created: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    html: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    pdf: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    job_position: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    objective: {
      type: String,
      default: "",
    },
    education: [
      {
        start: {
          type: String,
          default: "",
        },
        end: {
          type: String,
          default: "",
        },
        school: {
          type: String,
          default: "",
        },
        subject: {
          type: String,
          default: "",
        },
        desciption: {
          type: String,
          default: "",
        },
      },
    ],
    experience: [
      {
        start: {
          type: String,
          default: "",
        },
        end: {
          type: String,
          default: "",
        },
        company: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        desciption: {
          type: String,
          default: "",
        },
      },
    ],
    activity: [
      {
        start: {
          type: String,
          default: "",
        },
        end: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        desciption: {
          type: String,
          default: "",
        },
      },
    ],
    more_infomation: {
      type: String,
      default: "",
    },
    skill: [
      {
        name: {
          type: String,
          default: "",
        },
        value: {
          type: String,
          default: "",
        },
      },
    ],
    favorite: {
      type: String,
      default: "",
    },
    reference: [
      {
        name: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        email: {
          type: String,
          default: "",
        },
        phone: {
          type: String,
          default: "",
        },
      },
    ],
    project: [
      {
        start: {
          type: String,
          default: "",
        },
        end: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    prize: [
      {
        time: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    certificate: [
      {
        time: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
      },
    ],
    status: {
      type: String,
      default: "active",
      enum: ["active", "delete"],
    },
  },
  schemaOptions
);

cvSchema.index({ user_created: 1 });

const cvModel = mongoose.model("cv", cvSchema);
module.exports = cvModel;
