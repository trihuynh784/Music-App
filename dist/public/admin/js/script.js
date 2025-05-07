// Flash Message
function closeFlashMsg() {
  const msg = document.getElementById("flash-msg");
  if (msg) msg.remove();
}
setTimeout(() => {
  const msg = document.getElementById("flash-msg");
  if (msg) msg.classList.add("opacity-0", "transition");
  setTimeout(() => msg?.remove(), 1000);
}, 4000);
// End Flash Message

// Sort Animation
const tableExist = document.querySelector("table");
if (tableExist) {
  const sortingsThead = tableExist.querySelectorAll(".sorting-thead");
  sortingsThead.forEach((sortingThead) => {
    sortingThead.addEventListener("click", () => {
      const elements = sortingThead.querySelectorAll("i");
      elements.forEach((element) => {
        element.classList.toggle("bold");
      });
    });
  });
}
// End Sort Animation

// Checkbox
const tableExist2 = document.querySelector("table");
if (tableExist2) {
  const checkAll = tableExist2.querySelector("input[name='checkAll']");
  const inputsCheckbox = tableExist2.querySelectorAll("input[name='checkbox']");

  if (checkAll) {
    checkAll.addEventListener("click", () => {
      inputsCheckbox.forEach((input) => {
        input.checked = checkAll.checked ? true : false;
      });
    });
  }

  inputsCheckbox.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = tableExist2.querySelectorAll(
        "input[name='checkbox']:checked"
      ).length;

      if (countChecked == inputsCheckbox.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}
// End Checkbox

// Change Status
const tableExist3 = document.querySelector("table");
if (tableExist3) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  const buttonsChangeStatus = tableExist3.querySelectorAll(
    "[button-change-status]"
  );

  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status =
        button.getAttribute("data-status") == "active" ? "inactive" : "active";
      const slug = button.getAttribute("button-change-status");
      const path =
        formChangeStatus.getAttribute("path") +
        `/${status}/${slug}?_method=PATCH`;

      formChangeStatus.action = path;
      formChangeStatus.submit();
    });
  });
}
// End Change Status

// Pagination
const pagination = document.querySelector("[pagination]");
if (pagination) {
  const pageItems = pagination.querySelectorAll(".page-item");
  pageItems.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("button-pagination");
      const url = new URL(window.location.href);

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination

// Delete Record
const tableExist4 = document.querySelector("table");
if (tableExist4) {
  const formDelete = document.querySelector("[form-delete]");
  const buttonsDelete = tableExist4.querySelectorAll("[button-delete]");

  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const slugTopic = button.closest("tr").getAttribute("data-topic");
      const path = formDelete.getAttribute("path");

      formDelete.action = path + `/${slugTopic}?_method=PATCH`;
      formDelete.submit();
    });
  });
}
// End Delete Record

function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

// Sort
const tableExist5 = document.querySelector("table");
if (tableExist5) {
  const sorts = tableExist5.querySelectorAll("[button-sort]");
  sorts.forEach((sortItem) => {
    sortItem.addEventListener("click", () => {
      const element = sortItem.querySelector("i.bold");
      const sortKey = toCamelCase(sortItem.getAttribute("sortKey"));
      const sortValue = element.getAttribute("sortValue");

      const url = new URL(window.location.href);
      url.searchParams.set(sortKey, sortValue);
      window.location.href = url.href;
    });
  });
}
// End Sort

// Data Table Length
const dataTableLength = document.querySelector("[data-table-length]");
if (dataTableLength) {
  const selectLength = dataTableLength.querySelector("select");

  selectLength.addEventListener("change", () => {
    const url = new URL(window.location.href);

    url.searchParams.set("limit", selectLength.value);

    window.location.href = url.href;
  });
}

// End Data Table Length
