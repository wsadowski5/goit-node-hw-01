const colors = require("colors");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const baseDir = __dirname;
const contactsFolder = "db";
const contactsFile = "contacts.json";
const contactsPath = path.join(baseDir, contactsFolder, contactsFile);

const getContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message.red.underline);
  }
};

const listContacts = async () => {
  try {
    const contacts = await getContacts();
    console.log(contacts);
  } catch (error) {
    console.log(error.message.red.underline);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);

    if (foundContact) {
      console.log(foundContact);
    } else {
      console.log(`There is no contact with ID ${contactId}`.red);
    }
  } catch (error) {
    console.log(error.message.red.underline);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      const contactsJson = JSON.stringify(contacts, null, 2);
      await fs.writeFile(contactsPath, contactsJson, "utf-8");
      console.log(`Contact with ID ${contactId} has been removed`.blue);
    } else {
      console.log(`There is no contact with ID ${contactId}`.red);
    }
  } catch (error) {
    console.log(error.message.red.underline);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await getContacts();
    const id = uuidv4();
    const newContact = {
      id,
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    const contactsJson = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, contactsJson, "utf-8");
    console.log(`New contact ${name} has been added`.blue);
  } catch (error) {
    console.log(error.message.red.underline);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
