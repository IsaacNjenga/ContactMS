import express from "express";
import { Register, Login, Auth } from "../controllers/userController.js";
const router = express.Router();
import { body } from "express-validator";
import { VerifyUser } from "../middleware/verifyUser.js";
import {
  createContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

router.post(
  "/register",
  [
    (body("name")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("Invalid e-mail address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password length should be 8-30 characters")),
  ],
  Register
);

router.post(
  "/login",
  [
    (body("email")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("Invalid e-mail address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password length should be 8-30 characters")),
  ],
  Login
);

router.get("/verify", VerifyUser, Auth);

//contact Routes
router.post("/addContact", VerifyUser, createContact);
router.get("/contacts", VerifyUser, getContacts); //fetches all the contacts
router.get("/contact/:id", VerifyUser, getContact); //fetches a single contact to update
router.put("/update-contact/:id", VerifyUser, updateContact);
router.delete("/contact/:id", VerifyUser, deleteContact);
export { router as Router };
