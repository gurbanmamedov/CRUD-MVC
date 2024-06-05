export class View {
  constructor() {
    this.app = document.getElementById("app");

    this.form = document.getElementById("contact-form");
    this.nameInput = document.getElementById("name");
    this.phoneInput = document.getElementById("phone");
    this.emailInput = document.getElementById("email");
    this.submitButton = this.form.querySelector("button");

    this.table = document.getElementById("contact-table");
    this.tbody = this.table.querySelector("tbody");

    this._initLocalListeners();
  }

  get _contactFormValues() {
    return {
      name: this.nameInput.value,
      phone: this.phoneInput.value,
      email: this.emailInput.value,
    };
  }

  _resetForm() {
    this.nameInput.value = "";
    this.phoneInput.value = "";
    this.emailInput.value = "";
  }

  displayContacts(contacts) {
    while (this.tbody.firstChild) {
      this.tbody.removeChild(this.tbody.firstChild);
    }

    contacts.forEach((contact, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.phone}</td>
          <td>${contact.email}</td>
          <td>
            <button data-action="edit" data-index="${index}">Edit</button>
            <button data-action="delete" data-index="${index}">Delete</button>
          </td>
        `;
      this.tbody.appendChild(row);
    });
  }

  _initLocalListeners() {
    this.tbody.addEventListener("click", (event) => {
      const { action, index } = event.target.dataset;
      if (action) {
        this[action](index);
      }
    });
  }

  bindAddContact(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (
        this.nameInput.value &&
        this.phoneInput.value &&
        this.emailInput.value
      ) {
        handler(this._contactFormValues);
        this._resetForm();
      }
    });
  }

  bindDeleteContact(handler) {
    this.delete = handler;
  }

  bindEditContact(handler) {
    this.edit = handler;
  }

  bindSortContacts(handler) {
    this.table.querySelectorAll("th").forEach((header, index) => {
      header.addEventListener("click", () => {
        handler(index);
      });
    });
  }
}
