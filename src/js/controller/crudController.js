export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddContact(this.handleAddContact);
    this.view.bindDeleteContact(this.handleDeleteContact);
    this.view.bindEditContact(this.handleEditContact);
    this.view.bindSortContacts(this.handleSortContacts);

    this.view.displayContacts(this.model.getContacts());
  }

  handleAddContact = (contact) => {
    this.model.addContact(contact);
    this.view.displayContacts(this.model.getContacts());
  };

  handleDeleteContact = (index) => {
    this.model.deleteContact(index);
    this.view.displayContacts(this.model.getContacts());
  };

  handleEditContact = (index) => {
    const contact = this.model.getContacts()[index];
    this.view.nameInput.value = contact.name;
    this.view.phoneInput.value = contact.phone;
    this.view.emailInput.value = contact.email;

    this.view.submitButton.textContent = "Update Contact";
    this.view.submitButton.onclick = () => {
      const updatedContact = this.view._contactFormValues;
      this.model.editContact(index, updatedContact);
      this.view.displayContacts(this.model.getContacts());
      this.view.submitButton.textContent = "Add Contact";
      this.view.submitButton.onclick = null;
      this.view._resetForm();
    };
  };

  handleSortContacts = (columnIndex) => {
    const contacts = this.model.getContacts();
    const keys = ["name", "phone", "email"];
    const key = keys[columnIndex];

    contacts.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    this.view.displayContacts(contacts);
  };
}
