// Permissions
const tablePermissions = document.querySelector("table[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("button[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");

    rows.forEach((row) => {
      const dataName = row.getAttribute("data-name");

      if (dataName == "id") {
        const inputs = row.querySelectorAll("input");

        inputs.forEach((input) => {
          permissions.push({
            id: input.value,
            permissions: [],
          });
        });
      } else {
        const inputs = row.querySelectorAll("input[type='checkbox']");

        inputs.forEach((input, index) => {
          if (input.checked) {
            permissions[index].permissions.push(dataName);
          }
        });
      }
    });

    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "form#form-change-permissions"
      );
      const input = formChangePermissions.querySelector(
        "input[name='permissions']"
      );

      input.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}
// End Permissions

// Data Default Permissions
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const tablePermissions = document.querySelector("table[table-permissions]");
  const records = JSON.parse(dataRecords.getAttribute("data-records"));

  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach((permission) => {
      const tr = tablePermissions.querySelector(
        `[data-name='${permission}']`
      );
      const input = tr.querySelectorAll("input")[index];

      console.log(tr, input);

      input.checked = true;
    });
  });
}
// End Data Default Permissions
