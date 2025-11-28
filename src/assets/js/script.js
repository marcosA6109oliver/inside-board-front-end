document.addEventListener("DOMContentLoaded", () => {
  const selectElement = (selector, context = document) =>
    context.querySelector(selector);
  const selectElements = (selector, context = document) =>
    context.querySelectorAll(selector);
  const getElement = (id) => document.getElementById(id);

  // Export Modal
  (function handleExportModal() {
    const exportBtn = getElement("exportBtn");
    const exportModal = getElement("exportModal");
    const closeBtn = exportModal?.querySelector(".close");
    const exportDataBtn = getElement("exportDataBtn");
    const checkboxes = exportModal
      ? selectElements(".checkbox-container .custom-checkbox", exportModal)
      : [];

    if (exportBtn && exportModal && closeBtn && exportDataBtn) {
      exportBtn.addEventListener("click", () => {
        exportModal.style.display = "block";
        updateCheckboxStates();
      });

      closeBtn.addEventListener("click", () => {
        exportModal.style.display = "none";
      });

      window.addEventListener("click", (event) => {
        if (event.target === exportModal) {
          exportModal.style.display = "none";
        }
      });

      exportDataBtn.addEventListener("click", () => {
        const selectedMonths = Array.from(checkboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.nextElementSibling.textContent);
        console.log("Meses Selecionados para Exportação:", selectedMonths);
      });

      function updateCheckboxStates() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const monthNames = [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ];

        checkboxes.forEach((checkbox) => {
          const labelText = checkbox.nextElementSibling?.textContent;
          const monthIndex = monthNames.indexOf(labelText);
          const container = checkbox.parentElement;

          if (monthIndex > currentMonth) {
            checkbox.disabled = true;
            container.classList.add("disabled");
          } else {
            checkbox.disabled = false;
            container.classList.remove("disabled");
          }
        });
      }
    }
  })();

  // Date Inputs (using Flatpickr)
  (function handleDateInputs() {
    const dateInputs = selectElements(".inputCalendar");
    const calendarIcons = selectElements(".calendarIcon");
    const clearButtons = selectElements(".clearDate");
    const fpInstances = [];

    dateInputs.forEach((dateInput, index) => {
      const fp = flatpickr(dateInput, {
        dateFormat: "d/m/Y",
        locale: "pt",
        allowInput: true,
        onChange: () =>
          updateClearButtonVisibility(dateInput, clearButtons[index]),
        onOpen: (selectedDates, dateStr, instance) => {
          adjustPosition(instance);
          window.addEventListener("scroll", onScroll, true);
        },
        onClose: () => {
          updateClearButtonVisibility(dateInput, clearButtons[index]);
          window.removeEventListener("scroll", onScroll, true);
        },
      });
      fpInstances.push(fp);

      if (calendarIcons[index]) {
        calendarIcons[index].addEventListener("click", () => fp.open());
      }

      if (clearButtons[index]) {
        clearButtons[index].addEventListener("click", () => {
          fp.clear();
          dateInput.value = "";
          clearButtons[index].style.display = "none";
        });
      }
    });

    function onScroll() {
      fpInstances.forEach(adjustPosition);
    }

    function adjustPosition(instance) {
      const calendar = instance.calendarContainer;
      const inputRect = instance.input.getBoundingClientRect();

      calendar.style.top = `${inputRect.bottom + window.scrollY}px`;
      calendar.style.left = `${inputRect.left + window.scrollX}px`;
    }

    function updateClearButtonVisibility(input, clearButton) {
      if (input.value.trim() !== "") {
        clearButton.style.display = "block";
      } else {
        clearButton.style.display = "none";
      }
    }
  })();

  const boardContainer = getElement("boardContainer");
  const newBoardBtn = getElement("newBoardBtn");
  const modal = getElement("createCardModal");
  const saveCardBtn = getElement("saveCardBtn");
  const closeBtn = modal?.querySelector(".close");
  let selectedUsers = [];
  let boardCounter = 0;
  let currentCardContainer;

  const suggestions = [
    {
      name: "Marcos Nascimento",
      email: "marcosandre@oliver.agency",
      initials: "MN",
      colorClass: "bg-secondary-orange",
    },
    {
      name: "Orlando Libardi",
      email: "orlandolibardi@oliver.agency",
      initials: "OL",
      colorClass: "bg-support-blue-lt",
    },
    {
      name: "Gabriel Silverio",
      email: "gabrielsilverio@oliver.agency",
      initials: "GS",
      colorClass: "bg-feedback-green",
    },
    {
      name: "Mayara Martins",
      email: "mayaramartins@oliver.agency",
      initials: "MM",
      colorClass: "bg-support-rose",
    },
  ];

  if (newBoardBtn && boardContainer) {
    newBoardBtn.addEventListener("click", () => {
      const columnName = prompt("Digite o nome da nova coluna:");
      if (!columnName) {
        alert("Nome da coluna é obrigatório!");
        return;
      }

      boardCounter++;

      const newColumn = document.createElement("li");
      newColumn.innerHTML = `
          <div class="column">
              <div class="content-head">
                  <div class="card pd-y-12">
                      <div class="card-header d-flex justify-content-between align-items-center">
                          <span class="font-caption-large">${columnName}</span>
                          <button class="btn pd-0">
                              <i class="material-symbols-outlined font-size-title-large fw-bold"> more_horiz </i>
                          </button>
                      </div>
                  </div>
                  <div class="card bg-primary-gray-light-2 btn" id="createCardBtn-${boardCounter}">
                      <div class="card-header d-flex justify-content-center gap-2 align-items-center">
                          <span class="font-caption-large">CRIAR</span>
                          <button class="btn pd-0">
                              <i class="material-symbols-outlined font-size-title-medium fw-bold"> add </i>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="content" id="cardContainer-${boardCounter}"></div>
          </div>
      `;

      boardContainer.appendChild(newColumn);

      setupCreateCardModal(boardCounter);
    });
  }

  function setupCreateCardModal(counter) {
    const btn = getElement(`createCardBtn-${counter}`);
    const cardContainer = getElement(`cardContainer-${counter}`);

    if (!btn || !cardContainer) return;

    btn.onclick = () => {
      modal.style.display = "block";
      currentCardContainer = cardContainer; // Associa o cardContainer atual

      resetModalFields();
      modal.scrollTop = 0; // Garantia que o modal abre no topo
    };

    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    const searchContainer = selectElement(".search-avatar");
    const resultadoAvatar = getElement("resultadoAvatar");
    const buscaAvatar = getElement("buscaAvatar");
    const resultadoUser = selectElement(".resultadoUser");
    const dateInputs = selectElements(".inputCalendar");

    searchContainer.addEventListener("click", () => {
      resultadoAvatar.style.display = "block";
      buscaAvatar.focus();
      renderSuggestions();
    });

    buscaAvatar.addEventListener("input", () => {
      const query = buscaAvatar.value.toLowerCase();
      renderSuggestions(query);
    });

    document.addEventListener("click", (e) => {
      if (!searchContainer.contains(e.target)) {
        resultadoAvatar.style.display = "none";
      }
    });

    saveCardBtn.onclick = () => {
      const taskStatusSelect = getElement("taskStatusSelect");
      const bucketNameSelect = getElement("bucketSelect");
      const taskDate = getElement("taskDate")?.value;

      const taskStatus = taskStatusSelect?.selectedOptions[0]?.text || "";
      const bucketName = bucketNameSelect?.selectedOptions[0]?.text || "";

      if (
        !taskStatus ||
        !bucketName ||
        !taskDate ||
        selectedUsers.length === 0
      ) {
        console.log("Dados incompletos para criar card");
        return;
      }

      const formattedDate = formatDate(taskDate);

      const userAvatars = selectedUsers
        .map(
          (user) => `
        <div class="avatar font-caption-small ${user.colorClass}">
          <span class="color-primary-white">${user.initials}</span>
        </div>`
        )
        .join("");

      const cardHTML = `
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="font-caption-medium">${taskStatus}</span>
            <button class="btn pd-0">
              <i class="material-symbols-outlined font-size-title-large fw-bold"> more_horiz </i>
            </button>
          </div>
          <div class="card-body">
            <div class="card-container">
              <div class="nome-tarefa font-caption-large">
                <span>${bucketName}</span>
              </div>
              <div class="tag bg-primary-yellow bd-r-4 mg-t-16 corner-4">
                <span class="tag-label font-caption-medium">Itaú Shop</span>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="tag-icon pd-0 font-caption-large">
                <i class="material-symbols-outlined"> calendar_today </i>
                <span class="tag-label font-caption-large">${formattedDate}</span>
              </div>
              <div class="avatar-group d-flex gap-1">
                ${userAvatars}
              </div>
            </div>
          </div>
        </div>
      `;

      currentCardContainer.insertAdjacentHTML("beforeend", cardHTML);
      console.log("Card adicionado ao container");

      modal.style.display = "none";
      taskStatusSelect.value = "default";
      bucketNameSelect.value = "default";
      getElement("taskDate").value = "";

      dateInputs.forEach((input) => {
        const clearButton = input.parentElement.querySelector(".clearDate");
        if (clearButton) clearButton.style.display = "none";
      });

      buscaAvatar.value = "";
      selectedUsers = [];
      resultadoUser.innerHTML = "";
    };

    function renderSuggestions(query = "") {
      let suggestionsList = selectElement(".suggestions-list", resultadoAvatar);
      if (!suggestionsList) {
        suggestionsList = document.createElement("div");
        suggestionsList.className = "suggestions-list";
        resultadoAvatar.appendChild(suggestionsList);
      }
      suggestionsList.innerHTML = "";

      const filteredSuggestions = suggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      );

      filteredSuggestions.forEach((item) => {
        const userContainer = document.createElement("div");
        userContainer.className = "avatar-container font-caption-medium";
        userContainer.innerHTML = `
          <div class="avatar ${item.colorClass}">
            <span class="color-primary-white">${item.initials}</span>
          </div>
          <div class="avatar-details">
            <span class="avatar-name">${item.name}</span>
          </div>
        `;
        userContainer.onclick = () => {
          if (!selectedUsers.some((u) => u.name === item.name)) {
            selectedUsers.push(item);
            updateSelectedUsersDisplay();
          }
          buscaAvatar.value = "";
          resultadoAvatar.style.display = "none";
        };
        suggestionsList.appendChild(userContainer);
      });
    }

    function updateSelectedUsersDisplay() {
      resultadoUser.innerHTML = selectedUsers
        .map(
          (user) => `
        <div class="avatar-container font-caption-medium">
          <div class="avatar ${user.colorClass}">
            <span class="color-primary-white">${user.initials}</span>
          </div>
          <div class="avatar-details">
            <span class="avatar-name">${user.name}</span>
          </div>
        </div>`
        )
        .join("");
    }

    function resetModalFields() {
      const taskStatusSelect = getElement("taskStatusSelect");
      const bucketNameSelect = getElement("bucketSelect");
      const taskDate = getElement("taskDate");

      taskStatusSelect.value = "default";
      bucketNameSelect.value = "default";
      taskDate.value = "";
      selectedUsers = []; // Limpa seleção de usuários
      updateSelectedUsersDisplay(); // Atualiza a exibição de avatares

      buscaAvatar.value = "";
      resultadoAvatar.style.display = "none";
    }

    function formatDate(dateStr) {
      const parts = dateStr.split("/");
      const date = new Date(parts[2], parts[1] - 1, parts[0]); // Ajusta o formato para YYYY-MM-DD
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }

  // Date Inputs (using Flatpickr)
  (function handleDateInputs() {
    const dateInputs = selectElements(".inputCalendar");
    const calendarIcons = selectElements(".calendarIcon");
    const clearButtons = selectElements(".clearDate");
    const fpInstances = [];

    dateInputs.forEach((dateInput, index) => {
      const fp = flatpickr(dateInput, {
        dateFormat: "d/m/Y",
        locale: "pt",
        allowInput: true,
        minDate: "today", // Desativa datas passadas
        onChange: () =>
          updateClearButtonVisibility(dateInput, clearButtons[index]),
        onOpen: (selectedDates, dateStr, instance) => {
          adjustPosition(instance);
          window.addEventListener("scroll", onScroll, true);
        },
        onClose: () => {
          updateClearButtonVisibility(dateInput, clearButtons[index]);
          window.removeEventListener("scroll", onScroll, true);
        },
      });
      fpInstances.push(fp);

      if (calendarIcons[index]) {
        calendarIcons[index].addEventListener("click", () => fp.open());
      }

      if (clearButtons[index]) {
        clearButtons[index].addEventListener("click", () => {
          fp.clear();
          dateInput.value = "";
          clearButtons[index].style.display = "none";
        });
      }
    });

    function onScroll() {
      fpInstances.forEach(adjustPosition);
    }

    function adjustPosition(instance) {
      const calendar = instance.calendarContainer;
      const inputRect = instance.input.getBoundingClientRect();

      calendar.style.top = `${inputRect.bottom + window.scrollY}px`;
      calendar.style.left = `${inputRect.left + window.scrollX}px`;
    }

    function updateClearButtonVisibility(input, clearButton) {
      if (input.value.trim() !== "") {
        clearButton.style.display = "block";
      } else {
        clearButton.style.display = "none";
      }
    }
  })();

  // Interactive Containers
  (function handleInteractiveContainers() {
    const interactiveContainers = selectElements(
      ".input-container.interactive"
    );

    interactiveContainers.forEach((container) => {
      const input = selectElement(".input-icon", container);
      const copyButton = selectElement(".copy-btn", container);
      const linkButton = selectElement(".link-btn", container);
      const closeButton = selectElement(".close-btn", container);
      const buttons = selectElement(".button-links", container);

      if (input && copyButton && linkButton && closeButton && buttons) {
        updateButtonVisibility(input, buttons);

        input.addEventListener("input", () => {
          updateButtonVisibility(input, buttons);
        });

        copyButton.addEventListener("click", () => {
          input.select();
          document.execCommand("copy");
        });

        linkButton.addEventListener("click", () => {
          if (isValidURL(input.value)) {
            window.open(input.value, "_blank");
          }
        });

        closeButton.addEventListener("click", () => {
          input.value = "";
          input.disabled = false;
          updateButtonVisibility(input, buttons);
        });
      }

      function updateButtonVisibility(input, buttons) {
        if (isValidURL(input.value)) {
          buttons.style.display = "flex";
          input.disabled = true;
        } else {
          buttons.style.display = "none";
          input.disabled = false;
        }
      }

      function isValidURL(str) {
        return /^https?:\/\/.+\..+/.test(str);
      }
    });
  })();

  // Quill Editor and Comments
  (function handleQuillEditor() {
    if (typeof Quill === "undefined") return; // Verifica se o Quill está carregado

    const quillContainer = selectElement("#editor-container");
    if (!quillContainer) return; // Verifica se o container do Quill existe

    const quill = new Quill(quillContainer, {
      theme: "snow",
      placeholder: "Comentar...",
      modules: {
        toolbar: [["bold", "italic", "underline", "link"]],
        mention: {
          allowedChars: /^[A-Za-z\s]*$/,
          mentionDenotationChars: ["@"],
          source: (searchTerm, renderList) => {
            const values = [
              { id: 1, value: "Marcus Pereira" },
              { id: 2, value: "Maria Silva" },
              { id: 3, value: "João Souza" },
            ];

            if (searchTerm.length === 0) {
              renderList(values, searchTerm);
            } else {
              const matches = values.filter((item) =>
                item.value.toLowerCase().includes(searchTerm.toLowerCase())
              );
              renderList(matches, searchTerm);
            }
          },
        },
      },
    });

    const commentList = selectElement(".comment-items");

    if (commentList) {
      const commentButton = selectElement(".btn-comment");
      if (commentButton) {
        commentButton.addEventListener("click", () => {
          const content = quill.root.innerHTML;
          if (content.trim() !== "<p><br></p>") {
            const newComment = document.createElement("li");
            newComment.innerHTML = content;
            commentList.appendChild(newComment);

            quill.setContents([]);
          }
        });
      }
    }
  })();

  // Filter Dropdown
  (function handleFilterDropdown() {
    const filterBtn = getElement("filterBtn");
    const filterDropdown = getElement("filterDropdown");
    const switches = selectElements(".switch-input");

    if (filterBtn && filterDropdown) {
      filterBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleDropdown();
      });

      document.addEventListener("click", (event) => {
        if (
          !filterDropdown.contains(event.target) &&
          filterDropdown.style.display === "block"
        ) {
          filterDropdown.style.display = "none";
        }
      });

      switches.forEach((sw) => {
        sw.addEventListener("change", applyFilter);
      });

      function toggleDropdown() {
        filterDropdown.style.display =
          filterDropdown.style.display === "block" ? "none" : "block";
      }

      function applyFilter() {
        const enabledFilters = Array.from(switches)
          .filter((sw) => sw.checked)
          .map((sw) => sw.id.replace("filter", ""));
        console.log("Filtros Aplicados:", enabledFilters);
      }
    }
  })();

  // Dropdown Functionality
  (function handleDropdown() {
    const dropdown = selectElement(".user-info");
    const dropdownContent = selectElement(".dropdown-content");

    if (dropdown && dropdownContent) {
      dropdown.addEventListener("click", () => {
        dropdownContent.style.display =
          dropdownContent.style.display === "flex" ? "none" : "flex";
      });

      window.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          dropdownContent.style.display = "none";
        }
      });
    }
  })();

  // Mobile Menu
  (function handleMobileMenu() {
    const btnMenu = selectElement(".btn-menu");
    const menuOverlay = selectElement(".mobile-menu-overlay");
    const btnCloseMenu = selectElement(".btn-close-menu");

    if (btnMenu && menuOverlay && btnCloseMenu) {
      btnMenu.addEventListener(
        "click",
        () => (menuOverlay.style.display = "flex")
      );
      btnCloseMenu.addEventListener(
        "click",
        () => (menuOverlay.style.display = "none")
      );
    }
  })();

  // Toggle Password Visibility
  (function handlePasswordToggle() {
    const toggleVisibility = getElement("toggleVisibility");
    const passwordInput = getElement("passwordInput");

    if (toggleVisibility && passwordInput) {
      toggleVisibility.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        toggleVisibility.textContent =
          type === "password" ? "visibility_off" : "visibility";
      });
    }
  })();

  // Search Functionality
  (function handleSearch() {
    const searchContainers = selectElements(".search-container");

    searchContainers.forEach((container) => {
      const searchInput = selectElement(".input-icon", container);
      const resultsContainer = selectElement(".results-container", container);
      const clearIcon = selectElement(".clear-icon i", container);
      const inputWrapper = selectElement(".input-wrapper", container);

      if (searchInput && resultsContainer && clearIcon && inputWrapper) {
        const data = [
          "Resultado de busca 1",
          "Resultado de busca 2",
          "Resultado de busca 3",
          "Outro resultado",
        ];

        searchInput.addEventListener("input", () =>
          handleInput(
            searchInput,
            resultsContainer,
            inputWrapper,
            clearIcon,
            data
          )
        );
        clearIcon.addEventListener("click", () =>
          clearSearch(searchInput, resultsContainer, inputWrapper, clearIcon)
        );
        document.addEventListener("keydown", (event) =>
          handleKeyPress(
            event,
            searchInput,
            resultsContainer,
            inputWrapper,
            clearIcon
          )
        );

        function handleInput(input, results, wrapper, clear, data) {
          const query = input.value.trim().toLowerCase();
          results.innerHTML = "";

          if (query) {
            const filteredResults = data.filter((item) =>
              item.toLowerCase().includes(query)
            );

            filteredResults.forEach((result) => {
              const resultItem = document.createElement("li");
              resultItem.className = "result-item font-caption-large";
              resultItem.textContent = result;
              resultItem.addEventListener("click", () => {
                input.value = result;
                performSearch(result);
                hideResults(results, wrapper, clear);
              });

              results.appendChild(resultItem);
            });

            results.style.display =
              filteredResults.length > 0 ? "block" : "none";
            wrapper.style.borderBottom =
              filteredResults.length > 0 ? "none" : "";
            clear.style.display = "inline";
          } else {
            hideResults(results, wrapper, clear);
          }
        }

        function clearSearch(input, results, wrapper, clear) {
          input.value = "";
          hideResults(results, wrapper, clear);
          input.focus();
        }

        function hideResults(results, wrapper, clear) {
          results.style.display = "none";
          wrapper.style.borderBottom = "";
          clear.style.display = "none";
        }

        function handleKeyPress(event, input, results, wrapper, clear) {
          if (event.key === "Escape") {
            clearSearch(input, results, wrapper, clear);
          }
        }

        function performSearch(query) {
          console.log("Busca realizada para: ", query);
        }
      }
    });
  })();

  // Tab Switching
  function setupTabSwitch(containerSelector) {
    const buttons = selectElements(containerSelector + " .tab-buttons button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-target");

        buttons.forEach((btn) => btn.classList.remove("active"));
        selectElements(containerSelector + " .tab-content").forEach((tab) =>
          tab.classList.remove("active")
        );

        button.classList.add("active");
        selectElement(`#${target}`).classList.add("active");
      });
    });
  }

  setupTabSwitch(".briefing-container");
  setupTabSwitch(".preview-container");

  // Dark Mode Toggle
  (function handleDarkModeToggle() {
    const darkModeToggle = getElement("darkModeToggle");
    const darkIcon = getElement("darkIcon");
    const lightIcon = getElement("lightIcon");

    if (darkModeToggle && darkIcon && lightIcon) {
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkIcon.style.display =
          darkIcon.style.display === "none" ? "inline" : "none";
        lightIcon.style.display =
          lightIcon.style.display === "none" ? "inline" : "none";
        darkModeToggle.classList.toggle("active");
      });
    }
  })();

  // Focus Textarea
  function focusTextarea() {
    const textarea = getElement("emailTextarea");
    if (textarea) textarea.focus();
  }

  // Styled Select
  (function handleStyledSelect() {
    const styledSelects = selectElements(".styledSelect");

    styledSelects.forEach((selectElement) => {
      selectElement.addEventListener("change", () => {
        selectElement.style.color =
          selectElement.value !== "default" ? "#000000" : "#535353";
      });
    });
  })();
});
