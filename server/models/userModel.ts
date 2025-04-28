import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface ICoordinates {
  type: string;
  coordinates: [number, number];
}

interface IUserSchema {
  email: string;
  emailVerified: boolean;
  userName?: string;
  emergencyContact?: number;
  emergencyName?: string;
  gender?: string;
  dob?: Date;
  createdAt?: Date;
  idType?: string;
  bloodShare: boolean;
  currCoordinates?: ICoordinates;
  idNumber?: number;
  nameCard?: string;
  namePhysician?: string;
  phno?: number;
  pincode?: number;
  state?: string;
  bloodType?: string;
  age?: number;
  password: string;
}

const UserSchema: Schema<IUserSchema> = new Schema(
  {
    email: { type: String, required: [true, "Email is required"] },
    emailVerified: { type: Boolean, default: false },
    phno: { type: Number },
    userName: { type: String },
    emergencyContact: { type: Number },
    emergencyName: { type: String },
    gender: { type: String, enum: ["Male", "Female", "other"] },
    bloodShare: { type: Boolean },
    currCoordinates: {
      type: { type: String, enum: ["Point"]},
      coordinates: { type: [Number],  index: "2dsphere" },
    },
    dob: { type: Date },
    age: { type: Number },
    createdAt: { type: Date, default: Date.now },
    idType: { type: String },
    idNumber: { type: Number },
    nameCard: { type: String },
    namePhysician: { type: String },

    bloodType: { type: String },
    pincode: { type: Number },
    state: { type: String },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>(
  "User",
  UserSchema
);

export default UserModel;
