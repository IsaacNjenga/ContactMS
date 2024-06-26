import express from "express";
import { ContactModel } from "../models/Contact.js";

const createContact = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const newContact = new ContactModel({
      name,
      email,
      phone,
      address,
      postedBy: req.user._id,
    });

    const result = await newContact.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

//fetching contact to update based on id

const getContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json({
      success: true,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      },
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    const deleteRecord = await ContactModel.findByIdAndDelete({ _id: id });
    const contacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "No ID specified" });
  }
  try {
    const result = await ContactModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};
export { createContact, getContact, getContacts, updateContact, deleteContact };
