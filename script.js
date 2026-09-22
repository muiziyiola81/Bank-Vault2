import {
  createClient
} from "https://esm.sh/@supabase/supabase-js@2";


/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
  "https://jkubmddvuhxzoixlsgkw.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_64E-Ab03jnXyMQoDQXHr9g_oYQB8MdR";

const supabase =
  createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


/* =========================
   ADMIN
========================= */

const ADMIN_USER_ID =
  "cbeab3b8-b717-4020-8b9a-7e26596ca946";


/* =========================
   SCREEN ELEMENTS
========================= */

const welcomeScreen =
  document.getElementById("welcomeScreen");

const authScreen =
  document.getElementById("authScreen");

const dashboardScreen =
  document.getElementById("dashboardScreen");

const masterPasswordScreen =
  document.getElementById("masterPasswordScreen");

const categoryScreen =
  document.getElementById("categoryScreen");

const searchScreen =
  document.getElementById("searchScreen");

const recordScreen =
  document.getElementById("recordScreen");

const adminScreen =
  document.getElementById("adminScreen");

const settingsScreen =
  document.getElementById("settingsScreen");

const profileScreen =
  document.getElementById("profileScreen");


/* =========================
   MASTER PASSWORD ELEMENTS
========================= */

const masterPasswordForm =
  document.getElementById(
    "masterPasswordForm"
  );

const masterPasswordInput =
  document.getElementById(
    "masterPasswordInput"
  );

const confirmMasterPasswordInput =
  document.getElementById(
    "confirmMasterPasswordInput"
  );

const confirmMasterPasswordGroup =
  document.getElementById(
    "confirmMasterPasswordGroup"
  );

const masterPasswordTitle =
  document.getElementById(
    "masterPasswordTitle"
  );

const masterPasswordDescription =
  document.getElementById(
    "masterPasswordDescription"
  );

const masterPasswordSubmit =
  document.getElementById(
    "masterPasswordSubmit"
  );

const masterPasswordError =
  document.getElementById(
    "masterPasswordError"
  );


/* =========================
   AUTH ELEMENTS
========================= */

const logoutButton =
  document.getElementById(
    "logoutButton"
  );

const getStartedButton =
  document.getElementById(
    "getStartedButton"
  );

const backButton =
  document.getElementById(
    "backButton"
  );

const loginTab =
  document.getElementById(
    "loginTab"
  );

const signupTab =
  document.getElementById(
    "signupTab"
  );

const authForm =
  document.getElementById(
    "authForm"
  );

const authTitle =
  document.getElementById(
    "authTitle"
  );

const nameField =
  document.getElementById(
    "nameField"
  );

const nameInput =
  document.getElementById(
    "nameInput"
  );

const emailInput =
  document.getElementById(
    "emailInput"
  );

const passwordInput =
  document.getElementById(
    "passwordInput"
  );


/* =========================
   CATEGORY ELEMENTS
========================= */

const categoryTitle =
  document.getElementById(
    "categoryTitle"
  );

const categoryBackButton =
  document.getElementById(
    "categoryBackButton"
  );

const categoryBody =
  categoryScreen.querySelector(
    ".category-body"
  );


/* =========================
   RECORD ELEMENTS
========================= */

const recordBackButton =
  document.getElementById(
    "recordBackButton"
  );

const recordCategoryTitle =
  document.getElementById(
    "recordCategoryTitle"
  );

const recordForm =
  document.getElementById(
    "recordForm"
  );


/* =========================
   DASHBOARD ELEMENTS
========================= */

const totalRecords =
  document.getElementById(
    "totalRecords"
  );

const searchNavButton =
  document.getElementById(
    "searchNavButton"
  );

const homeNavButton =
  document.getElementById(
    "homeNavButton"
  );

const settingsNavButton =
  document.getElementById(
    "settingsNavButton"
  );

const searchBackButton =
  document.getElementById(
    "searchBackButton"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const searchResults =
  document.getElementById(
    "searchResults"
  );

const menuButton =
  document.getElementById(
    "menuButton"
  );

const adminButton =
  document.getElementById(
    "adminButton"
  );

const adminBackButton =
  document.getElementById(
    "adminBackButton"
  );

const notificationButton =
  document.getElementById(
    "notificationButton"
  );


/* =========================
   SETTINGS / PROFILE
========================= */

const settingsBackButton =
  document.getElementById(
    "settingsBackButton"
  );

const profileButton =
  document.getElementById(
    "profileButton"
  );

const profileBackButton =
  document.getElementById(
    "profileBackButton"
  );

const enableNotificationsButton =
  document.getElementById(
    "enableNotificationsButton"
  );

const testNotificationButton =
  document.getElementById(
    "testNotificationButton"
  );


/* =========================
   STATE
========================= */

let signupMode = false;

let selectedCategory =
  "Bank Details";

let userRecords = [];

let editingRecordId = null;

let masterPasswordMode =
  "setup";


/* =========================
   CATEGORY CONFIGURATION
========================= */

const categoryConfigs = {

  "Bank Details": {
    titleField: "recordBankName",
    fields: [
      {
        id: "recordBankName",
        label: "Bank / Institution Name",
        placeholder: "e.g. Access Bank",
        required: true
      },
      {
        id: "recordAccountName",
        label: "Account Name",
        placeholder: "e.g. John Doe"
      },
      {
        id: "recordAccountType",
        label: "Account Type",
        placeholder: "e.g. Savings or Current"
      },
      {
        id: "recordBranch",
        label: "Branch / Location",
        placeholder: "e.g. Ikeja Branch"
      },
      {
        id: "recordNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Cards": {
    titleField: "recordCardName",
    fields: [
      {
        id: "recordCardName",
        label: "Card Name",
        placeholder: "e.g. Personal Debit Card",
        required: true
      },
      {
        id: "recordCardIssuer",
        label: "Bank / Issuer",
        placeholder: "e.g. Access Bank",
        required: true
      },
      {
        id: "recordCardType",
        label: "Card Type",
        placeholder: "e.g. Debit, Credit or Prepaid"
      },
      {
        id: "recordCardNetwork",
        label: "Card Network",
        placeholder: "e.g. Visa, Mastercard or Verve"
      },
      {
        id: "recordCardNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Crypto": {
    titleField: "recordCryptoName",
    fields: [
      {
        id: "recordCryptoName",
        label: "Cryptocurrency Name",
        placeholder: "e.g. Bitcoin",
        required: true
      },
      {
        id: "recordCryptoNetwork",
        label: "Network",
        placeholder: "e.g. Bitcoin Network"
      },
      {
        id: "recordCryptoAddress",
        label: "Secret phrase/Private key",
        placeholder: "Your secret phrase or private key"
      },
      {
        id: "recordCryptoAssetType",
        label: "Wallet password",
        placeholder: "e.g. Your wallet password"
      },
      {
        id: "recordCryptoNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Digital Wallets": {
    titleField: "recordWalletName",
    fields: [
      {
        id: "recordWalletName",
        label: "Wallet Name",
        placeholder: "e.g. My Main Wallet",
        required: true
      },
      {
        id: "recordWalletProvider",
        label: "Provider",
        placeholder: "e.g. PayPal"
      },
      {
        id: "recordWalletType",
        label: "Wallet Type",
        placeholder: "e.g. Mobile Wallet"
      },
      {
        id: "recordWalletWebsite",
        label: "Website / App",
        placeholder: "e.g. paypal.com"
      },
      {
        id: "recordWalletNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Loans": {
    titleField: "loanName",
    fields: [
      {
        id: "loanName",
        label: "Loan Name",
        placeholder: "e.g. Personal Loan",
        required: true
      },
      {
        id: "loanProvider",
        label: "Lender / Institution",
        placeholder: "e.g. GTBank"
      },
      {
        id: "loanAmount",
        label: "Amount",
        placeholder: "e.g. ₦1,000,000"
      },
      {
        id: "loanRate",
        label: "Interest Rate",
        placeholder: "e.g. 15%"
      },
      {
        id: "loanDueDate",
        label: "Due Date",
        placeholder: "e.g. 2027-05-10"
      },
      {
        id: "loanNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Savings & Investments": {
    titleField: "investmentName",
    fields: [
      {
        id: "investmentName",
        label: "Account / Investment Name",
        placeholder: "e.g. Fixed Deposit",
        required: true
      },
      {
        id: "investmentProvider",
        label: "Provider",
        placeholder: "e.g. Access Bank"
      },
      {
        id: "investmentType",
        label: "Type",
        placeholder: "e.g. Savings, Fixed Deposit, Stocks"
      },
      {
        id: "investmentAmount",
        label: "Amount",
        placeholder: "e.g. ₦500,000"
      },
      {
        id: "investmentDate",
        label: "Maturity / Review Date",
        placeholder: "e.g. 2027-01-01"
      },
      {
        id: "investmentNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Bank Contacts": {
    titleField: "contactName",
    fields: [
      {
        id: "contactName",
        label: "Contact Name",
        placeholder: "e.g. Bank Support",
        required: true
      },
      {
        id: "contactBank",
        label: "Bank / Institution",
        placeholder: "e.g. Access Bank"
      },
      {
        id: "contactPhone",
        label: "Phone",
        placeholder: "e.g. +234..."
      },
      {
        id: "contactEmail",
        label: "Email",
        placeholder: "e.g. support@example.com"
      },
      {
        id: "contactNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Bank Branches": {
    titleField: "branchName",
    fields: [
      {
        id: "branchName",
        label: "Branch Name",
        placeholder: "e.g. Ikeja Branch",
        required: true
      },
      {
        id: "branchBank",
        label: "Bank / Institution",
        placeholder: "e.g. Access Bank"
      },
      {
        id: "branchAddress",
        label: "Address",
        placeholder: "Branch address"
      },
      {
        id: "branchPhone",
        label: "Phone",
        placeholder: "Branch phone number"
      },
      {
        id: "branchNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Beneficiaries": {
    titleField: "beneficiaryName",
    fields: [
      {
        id: "beneficiaryName",
        label: "Beneficiary Name",
        placeholder: "e.g. John Doe",
        required: true
      },
      {
        id: "beneficiaryBank",
        label: "Bank",
        placeholder: "e.g. Access Bank"
      },
      {
        id: "beneficiaryAccount",
        label: "Account / Reference",
        placeholder: "Beneficiary account or reference"
      },
      {
        id: "beneficiaryRelationship",
        label: "Relationship",
        placeholder: "e.g. Family"
      },
      {
        id: "beneficiaryNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Payment Details": {
    titleField: "paymentName",
    fields: [
      {
        id: "paymentName",
        label: "Payment Name",
        placeholder: "e.g. Electricity Bill",
        required: true
      },
      {
        id: "paymentProvider",
        label: "Provider",
        placeholder: "e.g. Ikeja Electric"
      },
      {
        id: "paymentReference",
        label: "Payment Reference",
        placeholder: "Reference number"
      },
      {
        id: "paymentWebsite",
        label: "Website / App",
        placeholder: "Provider website or app"
      },
      {
        id: "paymentNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Financial Documents": {
    titleField: "documentName",
    fields: [
      {
        id: "documentName",
        label: "Document Name",
        placeholder: "e.g. Bank Statement",
        required: true
      },
      {
        id: "documentType",
        label: "Document Type",
        placeholder: "e.g. Statement, Receipt"
      },
      {
        id: "documentInstitution",
        label: "Institution",
        placeholder: "e.g. Access Bank"
      },
      {
        id: "documentDate",
        label: "Document Date",
        placeholder: "e.g. 2026-09-22"
      },
      {
        id: "documentLocation",
        label: "Storage / Location",
        placeholder: "Where the document is stored"
      },
      {
        id: "documentNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  },


  "Other Information": {
    titleField: "otherName",
    fields: [
      {
        id: "otherName",
        label: "Title",
        placeholder: "e.g. Financial Information",
        required: true
      },
      {
        id: "otherType",
        label: "Type",
        placeholder: "e.g. General Information"
      },
      {
        id: "otherValue",
        label: "Information",
        placeholder: "Enter information"
      },
      {
        id: "otherNotes",
        label: "Notes",
        placeholder: "Additional information"
      }
    ]
  }

};


/* =========================
   SCREEN CONTROL
========================= */

function hideAllScreens() {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

}


function showScreen(screen) {

  hideAllScreens();

  if (!screen) {
    console.error("Screen not found.");
    return;
  }

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

}


function setBottomNav(activeButton) {

  document
    .querySelectorAll(".bottom-nav-button")
    .forEach(button => {
      button.classList.remove("active");
    });

  if (activeButton) {
    activeButton.classList.add("active");
  }

}


/* =========================
   MASTER PASSWORD
========================= */

function getMasterPasswordKey(userId) {

  return `bankVaultMasterPassword_${userId}`;

}


async function hashMasterPassword(password) {

  const encoder =
    new TextEncoder();

  const data =
    encoder.encode(password);

  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  const hashArray =
    Array.from(
      new Uint8Array(hashBuffer)
    );

  return hashArray
    .map(
      byte =>
        byte
          .toString(16)
          .padStart(2, "0")
    )
    .join("");

}


async function hasMasterPassword(userId) {

  if (!userId) {
    return false;
  }

  return Boolean(
    localStorage.getItem(
      getMasterPasswordKey(userId)
    )
  );

}


function showMasterPasswordError(message) {

  masterPasswordError.textContent =
    message;

  masterPasswordError.style.display =
    message ? "block" : "none";

}


function showMasterPasswordSetup() {

  masterPasswordMode =
    "setup";

  masterPasswordTitle.textContent =
    "Create your Master Password";

  masterPasswordDescription.textContent =
    "Your Master Password will be required whenever you want to access Bank Vault.";

  masterPasswordInput.value =
    "";

  confirmMasterPasswordInput.value =
    "";

  confirmMasterPasswordGroup.style.display =
    "block";

  confirmMasterPasswordInput.required =
    true;

  masterPasswordSubmit.textContent =
    "Create Master Password";

  showMasterPasswordError("");

  showScreen(
    masterPasswordScreen
  );

  setTimeout(() => {
    masterPasswordInput.focus();
  }, 100);

}


function showMasterPasswordUnlock() {

  masterPasswordMode =
    "unlock";

  masterPasswordTitle.textContent =
    "Enter your Master Password";

  masterPasswordDescription.textContent =
    "Enter your Master Password to access Bank Vault.";

  masterPasswordInput.value =
    "";

  confirmMasterPasswordInput.value =
    "";

  confirmMasterPasswordGroup.style.display =
    "none";

  confirmMasterPasswordInput.required =
    false;

  masterPasswordSubmit.textContent =
    "Unlock Bank Vault";

  showMasterPasswordError("");

  showScreen(
    masterPasswordScreen
  );

  setTimeout(() => {
    masterPasswordInput.focus();
  }, 100);

}


masterPasswordForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    try {

      const password =
        masterPasswordInput.value;

      if (!password) {

        showMasterPasswordError(
          "Please enter your Master Password."
        );

        return;
      }


      const {
        data: {
          user
        },
        error: userError
      } =
        await supabase.auth.getUser();


      if (userError || !user) {

        showMasterPasswordError(
          "Your session has expired. Please log in again."
        );

        return;
      }


      if (
        masterPasswordMode ===
        "setup"
      ) {

        const confirmation =
          confirmMasterPasswordInput.value;

        if (password.length < 8) {

          showMasterPasswordError(
            "Your Master Password must be at least 8 characters."
          );

          return;
        }

        if (
          password !==
          confirmation
        ) {

          showMasterPasswordError(
            "The passwords do not match."
          );

          return;
        }


        const hash =
          await hashMasterPassword(
            password
          );


        localStorage.setItem(
          getMasterPasswordKey(
            user.id
          ),
          hash
        );


        masterPasswordInput.value =
          "";

        confirmMasterPasswordInput.value =
          "";


        await openDashboardAfterMasterPassword();

        return;
      }


      const savedHash =
        localStorage.getItem(
          getMasterPasswordKey(
            user.id
          )
        );


      if (!savedHash) {

        showMasterPasswordSetup();

        return;
      }


      const enteredHash =
        await hashMasterPassword(
          password
        );


      if (
        enteredHash !==
        savedHash
      ) {

        showMasterPasswordError(
          "Incorrect Master Password."
        );

        masterPasswordInput.value =
          "";

        masterPasswordInput.focus();

        return;
      }


      masterPasswordInput.value =
        "";

      showMasterPasswordError("");

      await openDashboardAfterMasterPassword();

    } catch (error) {

      console.error(
        "Master Password error:",
        error
      );

      showMasterPasswordError(
        error.message ||
        "Unable to unlock Bank Vault."
      );

    }

  }
);


/* =========================
   SESSION
========================= */

async function open() {

  const {
    data: {
      user
    },
    error
  } =
    await supabase.auth.getUser();

  if (error || !user) {

    showScreen(
      authScreen
    );

    return;
  }


  const passwordExists =
    await hasMasterPassword(
      user.id
    );


  if (passwordExists) {

    showMasterPasswordUnlock();

  } else {

    showMasterPasswordSetup();

  }

}


async function openDashboardAfterMasterPassword() {

  const {
    data: {
      user
    }
  } =
    await supabase.auth.getUser();


  if (!user) {

    showScreen(
      authScreen
    );

    return;
  }


  if (
    user.id ===
    ADMIN_USER_ID
  ) {

    adminButton.style.display =
      "flex";

  } else {

    adminButton.style.display =
      "none";

  }


  showScreen(
    dashboardScreen
  );

  setBottomNav(
    homeNavButton
  );

  await loadRecords();

}


/* =========================
   WELCOME
========================= */

getStartedButton.addEventListener(
  "click",
  () => {

    showScreen(
      authScreen
    );

  }
);


backButton.addEventListener(
  "click",
  () => {

    showScreen(
      welcomeScreen
    );

  }
);


/* =========================
   AUTH TABS
========================= */

loginTab.addEventListener(
  "click",
  () => {

    signupMode =
      false;

    loginTab.classList.add(
      "active"
    );

    signupTab.classList.remove(
      "active"
    );

    nameField.style.display =
      "none";

    nameInput.required =
      false;

    passwordInput.autocomplete =
      "current-password";

    authTitle.textContent =
      "Welcome back";

  }
);


signupTab.addEventListener(
  "click",
  () => {

    signupMode =
      true;

    signupTab.classList.add(
      "active"
    );

    loginTab.classList.remove(
      "active"
    );

    nameField.style.display =
      "block";

    nameInput.required =
      true;

    passwordInput.autocomplete =
      "new-password";

    authTitle.textContent =
      "Create account";

  }
);


/* =========================
   AUTHENTICATION
========================= */

authForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;

    const name =
      nameInput.value.trim();


    if (!email || !password) {

      alert(
        "Please enter your email and password."
      );

      return;
    }


    if (
      signupMode &&
      !name
    ) {

      alert(
        "Please enter your name."
      );

      return;
    }


    const submitButton =
      authForm.querySelector(
        "button[type='submit']"
      );


    submitButton.disabled =
      true;

    submitButton.textContent =
      "Please wait...";


    try {

      if (signupMode) {

        const {
          data,
          error
        } =
          await supabase.auth.signUp({

            email,
            password,

            options: {
              data: {
                full_name: name,
                name: name
              }
            }

          });


        if (error) {
          throw error;
        }


        if (data.session) {

          const {
            data: {
              user
            }
          } =
            await supabase.auth.getUser();


          if (user) {

            const passwordExists =
              await hasMasterPassword(
                user.id
              );


            if (passwordExists) {

              showMasterPasswordUnlock();

            } else {

              showMasterPasswordSetup();

            }

          }

        } else {

          alert(
            "Account created. Check your email if Supabase asks you to confirm your account."
          );

          signupMode =
            false;

          loginTab.click();

        }

      } else {

        const {
          error
        } =
          await supabase.auth.signInWithPassword({

            email,
            password

          });


        if (error) {
          throw error;
        }


        await open();

      }

    } catch (error) {

      console.error(
        error
      );

      alert(
        error.message ||
        "Authentication failed."
      );

    } finally {

      submitButton.disabled =
        false;

      submitButton.textContent =
        "Continue";

    }

  }
);


/* =========================
   LOAD RECORDS
========================= */

async function loadRecords() {

  const {
    data: {
      user
    }
  } =
    await supabase.auth.getUser();


  if (!user) {
    return;
  }


  const {
    data,
    error
  } =
    await supabase
      .from("user_items")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      error
    );

    alert(
      "Could not load your records."
    );

    return;
  }


  userRecords =
    data || [];

  updateCounts();


  if (selectedCategory) {

    renderCategoryRecords();

  }

}


/* =========================
   ADMIN RECORDS
========================= */

async function loadAdminRecords() {

  const {
    data: {
      user
    }
  } =
    await supabase.auth.getUser();


  if (
    !user ||
    user.id !== ADMIN_USER_ID
  ) {

    alert(
      "Admin access only."
    );

    showScreen(
      dashboardScreen
    );

    return;
  }


  const adminRecords =
    document.getElementById(
      "adminRecords"
    );


  adminRecords.innerHTML =
    "Loading...";


  const {
    data,
    error
  } =
    await supabase
      .from("user_items")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      error
    );

    adminRecords.innerHTML =
      "Could not load user records.";

    return;
  }


  if (
    !data ||
    !data.length
  ) {

    adminRecords.innerHTML =
      `
        <div class="empty-state">
          <h3>No user records</h3>
          <p>No records have been saved yet.</p>
        </div>
      `;

    return;
  }


  adminRecords.innerHTML =
    data
      .map(
        record => `
          <div class="admin-record-card">

            <h3>
              ${escapeHtml(
                record.title ||
                "Record"
              )}
            </h3>

            <div class="admin-meta">
              Category:
              ${escapeHtml(
                record.category ||
                "—"
              )}
            </div>

            <div class="admin-meta">
              User ID:
              ${escapeHtml(
                record.user_id ||
                "—"
              )}
            </div>

            <div class="admin-meta">
              Created:
              ${
                record.created_at
                  ? new Date(
                      record.created_at
                    ).toLocaleString()
                  : "—"
              }
            </div>

            <div class="admin-content">
              ${escapeHtml(
                record.content ||
                "No additional information."
              )}
            </div>

          </div>
        `
      )
      .join("");

}


/* =========================
   COUNTS
========================= */

function updateCounts() {

  totalRecords.textContent =
    userRecords.length;


  document
    .querySelectorAll(
      ".category"
    )
    .forEach(
      categoryButton => {

        const category =
          categoryButton.dataset.category;


        const count =
          userRecords.filter(
            record =>
              record.category ===
              category
          ).length;


        const countElement =
          categoryButton.querySelector(
            ".category-count"
          );


        if (countElement) {

          countElement.textContent =
            `${count} ${
              count === 1
                ? "record"
                : "records"
            }`;

        }

      }
    );

}


/* =========================
   CATEGORY BUTTONS
========================= */

document
  .querySelectorAll(
    ".category"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category;

          categoryTitle.textContent =
            selectedCategory;

          renderCategoryRecords();

          showScreen(
            categoryScreen
          );

        }
      );

    }
  );


/* =========================
   RENDER CATEGORY
========================= */

function renderCategoryRecords() {

  const records =
    userRecords.filter(
      record =>
        record.category ===
        selectedCategory
    );


  let html = `

    <div class="category-intro">

      <h2>
        ${escapeHtml(
          selectedCategory
        )}
      </h2>

      <p>
        Your saved records in this category.
      </p>

    </div>

  `;


  if (!records.length) {

    html += `

      <div class="empty-state">

        <div class="empty-icon">
          +
        </div>

        <h3>
          No records yet
        </h3>

        <p>
          Add your first information to this category.
        </p>

      </div>

    `;

  } else {

    html +=
      `<div id="categoryRecords">`;


    records.forEach(
      record => {

        html += `

          <div class="record-card">

            <div class="record-card-header">

              <div class="record-action-box">

                <button
                  class="record-edit-button"
                  type="button"
                  data-record-id="${escapeHtml(record.id)}"
                  aria-label="Edit record"
                >
                  ✎
                </button>

                <button
                  class="record-delete-button"
                  type="button"
                  data-record-id="${escapeHtml(record.id)}"
                  aria-label="Delete record"
                >
                  ×
                </button>

              </div>


              <div class="record-card-title">

                ${escapeHtml(
                  record.title ||
                  "Record"
                )}

              </div>


              <div class="record-card-category">

                ${escapeHtml(
                  record.category ||
                  "Record"
                )}

              </div>

            </div>


            <div class="record-card-details">

              ${formatRecordContent(
                record.content
              )}

            </div>


            <div class="record-card-footer">

              <span>
                Saved
              </span>

              <span>
                ${
                  record.created_at
                    ? new Date(
                        record.created_at
                      ).toLocaleString()
                    : "—"
                }
              </span>

            </div>

          </div>

        `;

      }
    );


    html +=
      `</div>`;

  }


  html += `

    <button
      id="addRecordButton"
      class="add-record-button"
      type="button"
    >
      Add Record
    </button>

  `;


  categoryBody.innerHTML =
    html;


  const addRecordButton =
    document.getElementById(
      "addRecordButton"
    );


  if (addRecordButton) {

    addRecordButton.addEventListener(
      "click",
      () => {

        editingRecordId =
          null;

        openAddRecord();

      }
    );

  }


  document
    .querySelectorAll(
      ".record-edit-button"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const recordId =
              button.dataset.recordId;


            const record =
              userRecords.find(
                item =>
                  String(item.id) ===
                  String(recordId)
              );


            if (!record) {
              return;
            }


            editingRecordId =
              record.id;


            openAddRecord(
              record
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".record-delete-button"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async () => {

            const recordId =
              button.dataset.recordId;


            await deleteRecord(
              recordId
            );

          }
        );

      }
    );

}


/* =========================
   FORMAT RECORD
========================= */

function formatRecordContent(
  content
) {

  if (!content) {

    return `
      <div
        style="
          color:#718078;
          font-size:14px;
        "
      >
        No additional information.
      </div>
    `;

  }


  const lines =
    String(content)
      .split("\n")
      .filter(
        line =>
          line.trim() !== ""
      );


  return lines
    .map(
      line => {

        const separator =
          line.indexOf(":");


        if (
          separator === -1
        ) {

          return `
            <div
              style="
                margin-bottom:10px;
                line-height:1.6;
                color:#d8e0dc;
              "
            >
              ${escapeHtml(line)}
            </div>
          `;

        }


        const label =
          line
            .slice(
              0,
              separator
            )
            .trim();


        const value =
          line
            .slice(
              separator + 1
            )
            .trim();


        return `
          <div
            style="
              margin-bottom:12px;
            "
          >

            <div
              style="
                color:#718078;
                font-size:12px;
                margin-bottom:4px;
              "
            >
              ${escapeHtml(label)}
            </div>

            <div
              style="
                color:#ffffff;
                font-size:14px;
                line-height:1.5;
                overflow-wrap:anywhere;
              "
            >
              ${escapeHtml(value)}
            </div>

          </div>
        `;

      }
    )
    .join("");

}


/* =========================
   OPEN ADD / EDIT
========================= */

function openAddRecord(
  record = null
) {

  const config =
    categoryConfigs[
      selectedCategory
    ];


  if (!config) {

    alert(
      "This category is not configured."
    );

    return;
  }


  recordCategoryTitle.textContent =
    record
      ? `Edit ${selectedCategory}`
      : selectedCategory;


  recordForm.innerHTML =
    config.fields
      .map(
        field => `

          <div class="input-group">

            <label for="${field.id}">
              ${escapeHtml(field.label)}
            </label>

            <input
              id="${field.id}"
              type="text"
              placeholder="${escapeHtml(field.placeholder || "")}"
              ${field.required ? "required" : ""}
              autocomplete="off"
              spellcheck="false"
            >

          </div>

        `
      )
      .join("") + `

        <button
          class="primary-button"
          type="submit"
        >
          ${record ? "Update Record" : "Save Record"}
        </button>

      `;


  if (record) {

    const values =
      parseRecordValues(
        record.content
      );


    config.fields.forEach(
      field => {

        const input =
          document.getElementById(
            field.id
          );


        if (!input) {
          return;
        }


        if (
          field.id ===
          config.titleField
        ) {

          input.value =
            record.title || "";

        } else {

          input.value =
            values[field.label] ||
            "";

        }

      }
    );

  }


  showScreen(
    recordScreen
  );

}


/* =========================
   PARSE RECORD CONTENT
========================= */

function parseRecordValues(
  content
) {

  const values = {};

  String(
    content || ""
  )
    .split("\n")
    .forEach(
      line => {

        const separator =
          line.indexOf(":");


        if (
          separator === -1
        ) {
          return;
        }


        const label =
          line
            .slice(
              0,
              separator
            )
            .trim();


        const value =
          line
            .slice(
              separator + 1
            )
            .trim();


        values[label] =
          value;

      }
    );


  return values;

}


/* =========================
   DELETE RECORD
========================= */

async function deleteRecord(
  recordId
) {

  const record =
    userRecords.find(
      item =>
        String(item.id) ===
        String(recordId)
    );


  if (!record) {
    return;
  }


  const confirmed =
    confirm(
      `Delete "${record.title || "this record"}"?`
    );


  if (!confirmed) {
    return;
  }


  const {
    data: {
      user
    }
  } =
    await supabase.auth.getUser();


  if (!user) {

    alert(
      "Please log in again."
    );

    showScreen(
      authScreen
    );

    return;
  }


  const {
    error
  } =
    await supabase
      .from("user_items")
      .delete()
      .eq(
        "id",
        recordId
      )
      .eq(
        "user_id",
        user.id
      );


  if (error) {

    console.error(
      error
    );

    alert(
      error.message ||
      "Could not delete the record."
    );

    return;
  }


  userRecords =
    userRecords.filter(
      item =>
        String(item.id) !==
        String(recordId)
    );


  updateCounts();

  renderCategoryRecords();

  alert(
    "Record deleted."
  );

}


/* =========================
   SAVE RECORD
========================= */

recordForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const {
      data: {
        user
      }
    } =
      await supabase.auth.getUser();


    if (!user) {

      alert(
        "Please log in again."
      );

      showScreen(
        authScreen
      );

      return;
    }


    const config =
      categoryConfigs[
        selectedCategory
      ];


    if (!config) {

      alert(
        "This category is not configured."
      );

      return;
    }


    const titleInput =
      document.getElementById(
        config.titleField
      );


    const title =
      titleInput
        ? titleInput.value.trim()
        : "";


    if (!title) {

      alert(
        "Please complete the required title field."
      );

      return;
    }


    const contentParts = [];


    config.fields.forEach(
      field => {

        if (
          field.id ===
          config.titleField
        ) {
          return;
        }


        const input =
          document.getElementById(
            field.id
          );


        if (!input) {
          return;
        }


        const value =
          input.value.trim();


        if (value) {

          contentParts.push(
            `${field.label}: ${value}`
          );

        }

      }
    );


    const content =
      contentParts.join("\n");


    const saveButton =
      recordForm.querySelector(
        "button[type='submit']"
      );


    if (saveButton) {

      saveButton.disabled =
        true;

      saveButton.textContent =
        editingRecordId
          ? "Updating..."
          : "Saving...";

    }


    try {

      if (editingRecordId) {

        const {
          data,
          error
        } =
          await supabase
            .from("user_items")
            .update({
              category:
                selectedCategory,
              title,
              content
            })
            .eq(
              "id",
              editingRecordId
            )
            .eq(
              "user_id",
              user.id
            )
            .select()
            .single();


        if (error) {
          throw error;
        }


        const recordIndex =
          userRecords.findIndex(
            record =>
              String(record.id) ===
              String(editingRecordId)
          );


        if (
          recordIndex !==
          -1
        ) {

          userRecords[
            recordIndex
          ] = data;

        }


        editingRecordId =
          null;


        alert(
          "Record updated."
        );

      } else {

        const {
          data,
          error
        } =
          await supabase
            .from("user_items")
            .insert({
              category:
                selectedCategory,
              title,
              content,
              user_id:
                user.id
            })
            .select()
            .single();


        if (error) {
          throw error;
        }


        userRecords.unshift(
          data
        );


        alert(
          "Record saved."
        );

      }


      updateCounts();

      renderCategoryRecords();

      showScreen(
        categoryScreen
      );

    } catch (error) {

      console.error(
        error
      );

      alert(
        error.message ||
        "Could not save the record."
      );

    } finally {

      if (saveButton) {

        saveButton.disabled =
          false;

        saveButton.textContent =
          editingRecordId
            ? "Update Record"
            : "Save Record";

      }

    }

  }
);


/* =========================
   CATEGORY BACK
========================= */

categoryBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

    setBottomNav(
      homeNavButton
    );

  }
);


/* =========================
   RECORD BACK
========================= */

recordBackButton.addEventListener(
  "click",
  () => {

    editingRecordId =
      null;

    showScreen(
      categoryScreen
    );

  }
);


/* =========================
   SEARCH
========================= */

searchNavButton.addEventListener(
  "click",
  () => {

    showScreen(
      searchScreen
    );

    setBottomNav(
      searchNavButton
    );

    searchInput.value =
      "";

    searchResults.innerHTML =
      "";

    setTimeout(() => {
      searchInput.focus();
    }, 100);

  }
);


searchBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

    setBottomNav(
      homeNavButton
    );

  }
);


searchInput.addEventListener(
  "input",
  () => {

    const query =
      searchInput.value
        .trim()
        .toLowerCase();


    if (!query) {

      searchResults.innerHTML =
        "";

      return;
    }


    const results =
      userRecords.filter(
        record => {

          return (

            String(
              record.title || ""
            )
              .toLowerCase()
              .includes(
                query
              )

            ||

            String(
              record.category || ""
            )
              .toLowerCase()
              .includes(
                query
              )

            ||

            String(
              record.content || ""
            )
              .toLowerCase()
              .includes(
                query
              )

          );

        }
      );


    if (!results.length) {

      searchResults.innerHTML = `

        <div class="empty-state">

          <h3>
            No records found
          </h3>

          <p>
            Try another search.
          </p>

        </div>

      `;

      return;
    }


    searchResults.innerHTML =
      results
        .map(
          record => `

            <div class="search-result-card">

              <h3>
                ${escapeHtml(
                  record.title ||
                  "Record"
                )}
              </h3>

              <div class="search-result-category">
                ${escapeHtml(
                  record.category ||
                  ""
                )}
              </div>

              <div class="search-result-content">
                ${escapeHtml(
                  record.content ||
                  "No additional information."
                )}
              </div>

            </div>

          `
        )
        .join("");

  }
);


/* =========================
   HOME
========================= */

homeNavButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

    setBottomNav(
      homeNavButton
    );

  }
);


/* =========================
   SETTINGS
========================= */

settingsNavButton.addEventListener(
  "click",
  () => {

    showScreen(
      settingsScreen
    );

    setBottomNav(
      settingsNavButton
    );

  }
);


settingsBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

    setBottomNav(
      homeNavButton
    );

  }
);


/* =========================
   PROFILE
========================= */

profileButton.addEventListener(
  "click",
  async () => {

    showScreen(
      profileScreen
    );

    await loadProfileData();

  }
);


profileBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      settingsScreen
    );

  }
);


async function loadProfileData() {

  const {
    data: {
      user
    },
    error
  } =
    await supabase.auth.getUser();


  if (
    error ||
    !user
  ) {
    return;
  }


  const profileName =
    document.getElementById(
      "profileName"
    );

  const profileEmail =
    document.getElementById(
      "profileEmail"
    );

  const profileUserId =
    document.getElementById(
      "profileUserId"
    );


  if (profileName) {

    profileName.textContent =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "Bank Vault User";

  }


  if (profileEmail) {

    profileEmail.textContent =
      user.email ||
      "No email available";

  }


  if (profileUserId) {

    profileUserId.textContent =
      user.id ||
      "Unavailable";

  }

}


/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener(
  "click",
  async () => {

    const confirmed =
      confirm(
        "Are you sure you want to log out?"
      );


    if (!confirmed) {
      return;
    }


    const {
      error
    } =
      await supabase.auth.signOut();


    if (error) {

      alert(
        error.message ||
        "Could not log out."
      );

      return;
    }


    userRecords = [];

    editingRecordId =
      null;

    showScreen(
      welcomeScreen
    );

  }
);


/* =========================
   MENU
========================= */

menuButton.addEventListener(
  "click",
  () => {

    alert(
      "Bank Vault\n\nOrganize and store your financial information using your own account. Your records are stored in Supabase and are available after authentication."
    );

  }
);


/* =========================
   ADMIN
========================= */

adminButton.addEventListener(
  "click",
  async () => {

    const {
      data: {
        user
      }
    } =
      await supabase.auth.getUser();


    if (
      !user ||
      user.id !==
      ADMIN_USER_ID
    ) {

      alert(
        "Admin access only."
      );

      return;
    }


    showScreen(
      adminScreen
    );

    await loadAdminRecords();

  }
);


adminBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

    setBottomNav(
      homeNavButton
    );

  }
);


/* =========================
   NOTIFICATIONS
========================= */

function urlBase64ToUint8Array(
  base64String
) {

  const padding =
    "=".repeat(
      (
        4 -
        (
          base64String.length %
          4
        )
      ) % 4
    );


  const base64 =
    (
      base64String +
      padding
    )
      .replace(
        /-/g,
        "+"
      )
      .replace(
        /_/g,
        "/"
      );


  const rawData =
    window.atob(
      base64
    );


  return Uint8Array.from(
    [...rawData]
      .map(
        char =>
          char.charCodeAt(0)
      )
  );

}


async function enableBankVaultNotifications() {

  try {

    if (
      !("Notification" in window)
    ) {

      alert(
        "Notifications are not supported on this device."
      );

      return;
    }


    if (
      !("serviceWorker" in navigator)
    ) {

      alert(
        "Service workers are not supported."
      );

      return;
    }


    if (
      !("PushManager" in window)
    ) {

      alert(
        "Push notifications are not supported on this device."
      );

      return;
    }


    const {
      data: {
        user
      },
      error: userError
    } =
      await supabase.auth.getUser();


    if (
      userError ||
      !user
    ) {

      alert(
        "Please log in first."
      );

      return;
    }


    const permission =
      await Notification.requestPermission();


    if (
      permission !==
      "granted"
    ) {

      if (
        permission ===
        "denied"
      ) {

        alert(
          "Notifications are blocked. Enable them in your browser settings."
        );

      } else {

        alert(
          "Notification permission was not granted."
        );

      }

      return;
    }


    const registration =
      await navigator.serviceWorker.ready;


    let subscription =
      await registration.pushManager.getSubscription();


    if (!subscription) {

      subscription =
        await registration.pushManager.subscribe({

          userVisibleOnly:
            true,

          applicationServerKey:
            urlBase64ToUint8Array(
              "BI7n11elHSW2ommddDiRJHzLq5E-KlvH8orqxSU3bqMxnzhHYSJVWj11vtRGcXfC6C1xWsp9fVBynQajtAmC5R4"
            )

        });

    }


    const subscriptionJson =
      subscription.toJSON();


    const {
      error: saveError
    } =
      await supabase
        .from(
          "push_subscriptions"
        )
        .upsert(
          {
            user_id:
              user.id,

            endpoint:
              subscriptionJson.endpoint,

            p256dh:
              subscriptionJson.keys?.p256dh,

            auth:
              subscriptionJson.keys?.auth
          },
          {
            onConflict:
              "endpoint"
          }
        );


    if (saveError) {

      console.error(
        "Subscription save error:",
        saveError
      );

      alert(
        "Notification permission worked, but the device subscription could not be saved."
      );

      return;
    }


    alert(
      "Bank Vault notifications are enabled on this device."
    );

  } catch (error) {

    console.error(
      "Notification subscription error:",
      error
    );

    alert(
      "Unable to enable notifications."
    );

  }

}


async function sendBankVaultTestNotification() {

  try {

    const {
      data: {
        session
      },
      error: sessionError
    } =
      await supabase.auth.getSession();


    if (
      sessionError ||
      !session
    ) {

      alert(
        "Please log in first."
      );

      return;
    }


    const {
      data,
      error
    } =
      await supabase.functions.invoke(
        "send-push",
        {
          body: {
            title:
              "Bank Vault",
            body:
              "Your Bank Vault push notifications are working.",
            url:
              "./"
          }
        }
      );


    if (error) {

      console.error(
        "Push function error:",
        error
      );

      alert(
        "Push error: " +
        (
          error.message ||
          "Unknown error"
        )
      );

      return;
    }


    console.log(
      "Push notification result:",
      data
    );


    alert(
      "Test notification sent."
    );

  } catch (error) {

    console.error(
      "Test notification error:",
      error
    );

    alert(
      "Unable to send the notification."
    );

  }

}


window.enableBankVaultNotifications =
  enableBankVaultNotifications;

window.sendBankVaultTestNotification =
  sendBankVaultTestNotification;


notificationButton.addEventListener(
  "click",
  enableBankVaultNotifications
);


enableNotificationsButton.addEventListener(
  "click",
  enableBankVaultNotifications
);


testNotificationButton.addEventListener(
  "click",
  sendBankVaultTestNotification
);


/* =========================
   HTML SAFETY
========================= */

function escapeHtml(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================
   EXISTING SESSION
========================= */

async function checkExistingSession() {

  try {

    const {
      data: {
        session
      },
      error
    } =
      await supabase.auth.getSession();


    if (error) {
      throw error;
    }


    if (session) {

      await open();

    } else {

      showScreen(
        welcomeScreen
      );

    }

  } catch (error) {

    console.error(
      "Bank Vault startup error:",
      error
    );

    alert(
      "Bank Vault startup error: " +
      (
        error.message ||
        "Unknown error"
      )
    );

  }

}


/* =========================
   AUTH STATE
========================= */

supabase.auth.onAuthStateChange(
  async (
    event,
    session
  ) => {

    if (
      event ===
      "SIGNED_OUT" ||
      !session
    ) {

      showScreen(
        welcomeScreen
      );

    }

  }
);


/* =========================
   SERVICE WORKER
========================= */

if (
  "serviceWorker" in navigator
) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register(
          "./sw.js"
        )
        .then(
          registration => {

            console.log(
              "Bank Vault notification service ready.",
              registration.scope
            );

          }
        )
        .catch(
          error => {

            console.error(
              "Notification service failed:",
              error
            );

          }
        );

    }
  );

}


/* =========================
   START
========================= */

checkExistingSession();