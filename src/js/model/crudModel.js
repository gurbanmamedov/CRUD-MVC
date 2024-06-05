export class Model {
  constructor() {
    this.contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  }

  getContacts() {
    return this.contacts;
  }

  addContact(contact) {
    this.contacts.push(contact);
    this._commit();
  }

  editContact(index, updatedContact) {
    this.contacts[index] = updatedContact;
    this._commit();
  }

  deleteContact(index) {
    this.contacts.splice(index, 1);
    this._commit();
  }

  _commit() {
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }
}
