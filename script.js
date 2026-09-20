import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* =========================
SUPABASE
========================= */

const SUPABASE_URL =
  "https://jkubmddvuhxzoixlsgkw.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_64E-Ab03jnXyMQoDQXHr9g_oYQB8MdR";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


/* =========================
SCREEN ELEMENTS
========================= */

const welcomeScreen =
  document.getElementById("welcomeScreen");

const authScreen =
  document.getElementById("authScreen");

const dashboardScreen =
  document.getElementById("dashboardScreen");

const categoryScreen =
  document.getElementById("categoryScreen");

const searchScreen =
  document.getElementById("searchScreen");

const recordScreen =
  document.getElementById("recordScreen");
  
  const adminScreen =
  document.getElementById("adminScreen");

const adminBackButton =
  document.getElementById("adminBackButton");
  const settingsScreen =
  document.getElementById("settingsScreen");

const settingsBackButton =
  document.getElementById("settingsBackButton");

const logoutButton =
  document.getElementById("logoutButton");

const getStartedButton =
  document.getElementById("getStartedButton");

const backButton =
  document.getElementById("backButton");

const loginTab =
  document.getElementById("loginTab");

const signupTab =
  document.getElementById("signupTab");

const authForm =
  document.getElementById("authForm");

const authTitle =
  document.getElementById("authTitle");

const nameField =
  document.getElementById("nameField");

const nameInput =
  document.getElementById("nameInput");

const emailInput =
  document.getElementById("emailInput");

const passwordInput =
  document.getElementById("passwordInput");

const categoryTitle =
  document.getElementById("categoryTitle");

const categoryHeading =
  document.getElementById("categoryHeading");

const categoryBackButton =
  document.getElementById("categoryBackButton");

const recordBackButton =
  document.getElementById("recordBackButton");

const recordCategoryTitle =
  document.getElementById("recordCategoryTitle");

const recordForm =
  document.getElementById("recordForm");

const totalRecords =
  document.getElementById("totalRecords");

const searchNavButton =
  document.getElementById("searchNavButton");

const homeNavButton =
  document.getElementById("homeNavButton");

const settingsNavButton =
  document.getElementById("settingsNavButton");

const searchBackButton =
  document.getElementById("searchBackButton");

const searchInput =
  document.getElementById("searchInput");

const searchResults =
  document.getElementById("searchResults");

const menuButton =
  document.getElementById("menuButton");
  
  const adminButton =
  document.getElementById("adminButton");
  
   adminButton.addEventListener(
  "click",
  async () => {

    const {
      data: {
        user
      }
    } =
      await supabase.auth.getUser();

    if (!user || user.id !== ADMIN_USER_ID) {

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

  }
);

/* =========================
STATE
========================= */

let signupMode = false;

let selectedCategory =
  "Bank Details";

let userRecords = [];
const ADMIN_USER_ID = "cbeab3b8-b717-4020-8b9a-7e26596ca946";


/* =========================
SCREEN CONTROL
========================= */

function hideAllScreens() {

  welcomeScreen.style.display = "none";
  authScreen.style.display = "none";
  dashboardScreen.style.display = "none";
  categoryScreen.style.display = "none";
  searchScreen.style.display = "none";
  recordScreen.style.display = "none";
  adminScreen.style.display = "none";
settingsScreen.style.display = "none";
}

function showScreen(screen) {

  hideAllScreens();

  screen.style.display = "block";

}


/* =========================
WELCOME
========================= */

getStartedButton.addEventListener(
  "click",
  () => {

    showScreen(authScreen);

  }
);


backButton.addEventListener(
  "click",
  () => {

    showScreen(welcomeScreen);

  }
);


/* =========================
AUTH TABS
========================= */

loginTab.addEventListener(
  "click",
  () => {

    signupMode = false;

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    nameField.style.display = "none";
    nameInput.required = false;

    authTitle.textContent =
      "Welcome back";

  }
);


signupTab.addEventListener(
  "click",
  () => {

    signupMode = true;

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    nameField.style.display = "block";
    nameInput.required = true;

    authTitle.textContent =
      "Create account";

  }
);


/* =========================
AUTHENTICATION
========================= */

authForm.addEventListener(
  "submit",
  async (event) => {

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

    if (signupMode && !name) {

      alert(
        "Please enter your name."
      );

      return;
    }

    const submitButton =
      authForm.querySelector(
        "button[type='submit']"
      );

    submitButton.disabled = true;

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
                full_name: name
              }
            }

          });

        if (error) {
          throw error;
        }

        if (data.session) {

          await openDashboard();

        } else {

          alert(
            "Account created. Check your email if Supabase asks you to confirm your account."
          );

          signupMode = false;

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

        await openDashboard();

      }

    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Authentication failed."
      );

    } finally {

      submitButton.disabled = false;

      submitButton.textContent =
        "Continue";

    }

  }
);


/* =========================
DASHBOARD
========================= */

async function openDashboard() {
  
  const {
  data: {
    user
  }
} = await supabase.auth.getUser();

if (user && user.id === ADMIN_USER_ID) {
  adminButton.style.display = "block";
} else {
  adminButton.style.display = "none";
}

  showScreen(
    dashboardScreen
  );

  await loadRecords();

}


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

    console.error(error);

    alert(
      "Could not load your records."
    );

    return;

  }

  userRecords =
    data || [];

  updateDashboardCounts();

}

async function loadAdminRecords() {

  const {
    data: {
      user
    }
  } =
    await supabase.auth.getUser();

  if (!user || user.id !== ADMIN_USER_ID) {

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

    console.error(error);

    adminRecords.innerHTML =
      "Could not load user records.";

    return;

  }

  if (!data || !data.length) {

    adminRecords.innerHTML =
      "No user records have been saved yet.";

    return;

  }

  adminRecords.innerHTML =
    data
      .map(
        record => `

          <div
            style="
              margin-bottom:14px;
              padding:18px;
              border-radius:22px;
              background:#0d1a15;
              border:1px solid rgba(255,255,255,.06);
            "
          >

            <h3
              style="
                margin:0 0 12px;
              "
            >
              ${escapeHtml(
                record.title || "Record"
              )}
            </h3>

            <div
              style="
                color:#718078;
                font-size:12px;
                margin-bottom:10px;
              "
            >
              Category:
              ${escapeHtml(
                record.category || "—"
              )}
            </div>

            <div
              style="
                color:#718078;
                font-size:12px;
                margin-bottom:10px;
                overflow-wrap:anywhere;
              "
            >
              User ID:
              ${escapeHtml(
                record.user_id || "—"
              )}
            </div>

            <div
              style="
                color:#d8e0dc;
                font-size:14px;
                line-height:1.6;
                white-space:pre-wrap;
                overflow-wrap:anywhere;
              "
            >
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
DASHBOARD COUNTS
========================= */

function updateDashboardCounts() {

  totalRecords.textContent =
    userRecords.length;

  document
    .querySelectorAll(".category")
    .forEach(categoryButton => {

      const category =
        categoryButton.dataset.category;

      const count =
        userRecords.filter(
          record =>
            record.category === category
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

    });

}


/* =========================
CATEGORY BUTTONS
========================= */

document
  .querySelectorAll(".category")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        selectedCategory =
          button.dataset.category;

        categoryTitle.textContent =
          selectedCategory;

        categoryHeading.textContent =
          selectedCategory;

        renderCategoryRecords();

        showScreen(
          categoryScreen
        );

        const categoryPage =
          document.getElementById(
            "categoryPage"
          );

        if (categoryPage) {

          categoryPage.classList.add(
            "morphed-in"
          );

        }

      }
    );

  });


/* =========================
DISPLAY SAVED RECORDS
========================= */

function renderCategoryRecords() {

  const categoryBody =
    categoryScreen.querySelector(
      ".category-body"
    );

  const records =
    userRecords.filter(
      record =>
        record.category ===
        selectedCategory
    );

  let html = `

    <div class="category-intro">

      <h2>
        ${escapeHtml(selectedCategory)}
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
          Add your first information
          to this category.
        </p>

      </div>

    `;

  } else {

    html += `

      <div id="categoryRecords">

    `;


    records.forEach(
      record => {

        const details =
          formatRecordContent(
            record.content
          );


        html += `

          <div
            class="record-card"
            style="
              width:100%;
              margin-bottom:14px;
              padding:20px;
              border-radius:26px;
              background:#0d1a15;
              border:1px solid rgba(255,255,255,.06);
              color:white;
              box-sizing:border-box;
            "
          >

            <h3
              style="
                margin:0 0 16px;
                font-size:18px;
              "
            >
              ${escapeHtml(
                record.title || "Record"
              )}
            </h3>

            <div>

              ${details}

            </div>

            <div
              style="
                margin-top:16px;
                color:#718078;
                font-size:12px;
              "
            >
              Saved:
              ${
                record.created_at
                  ? new Date(
                      record.created_at
                    ).toLocaleString()
                  : "—"
              }
            </div>

          </div>

        `;

      }
    );


    html += `

      </div>

    `;

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


  document
    .getElementById(
      "addRecordButton"
    )
    .addEventListener(
      "click",
      openAddRecord
    );

}


/* =========================
FORMAT RECORD DETAILS
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
    .map(line => {

      const separator =
        line.indexOf(":");


      if (separator === -1) {

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
          .slice(0, separator)
          .trim();

      const value =
        line
          .slice(separator + 1)
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

    })
    .join("");

}


/* =========================
OPEN ADD RECORD
========================= */

function openAddRecord() {
  recordForm.style.display = "block";

  recordCategoryTitle.textContent =
    selectedCategory;


  /* =========================
  BANK DETAILS
  ========================= */

  if (
    selectedCategory ===
    "Bank Details"
  ) {

    recordForm.innerHTML = `

      <div class="input-group">

        <label>
          Bank / Institution Name
        </label>

        <input
          id="recordBankName"
          type="text"
          placeholder="e.g. Access Bank"
          required
        >

      </div>


      <div class="input-group">

        <label>
          Account Name
        </label>

        <input
          id="recordAccountName"
          type="text"
          placeholder="e.g. John Doe"
          required
        >

      </div>


      <div class="input-group">

        <label>
          Account Type
        </label>

        <input
          id="recordAccountType"
          type="text"
          placeholder="e.g. Savings or Current"
        >

      </div>


      <div class="input-group">

        <label>
          Branch / Location
        </label>

        <input
          id="recordBranch"
          type="text"
          placeholder="e.g. Ikeja Branch"
        >

      </div>


      <div class="input-group">

        <label>
          Notes
        </label>

        <input
          id="recordNotes"
          type="text"
          placeholder="Additional information"
        >

      </div>


      <button
        class="primary-button"
        type="submit"
      >
        Save Record
      </button>

    `;

  }


  /* =========================
  CARDS
  ========================= */

  else if (
    selectedCategory ===
    "Cards"
  ) {

    recordForm.innerHTML = `

      <div class="input-group">

        <label>
          Card Name
        </label>

        <input
          id="recordCardName"
          type="text"
          placeholder="e.g. Personal Debit Card"
          required
        >

      </div>


      <div class="input-group">

        <label>
          Bank / Issuer
        </label>

        <input
          id="recordCardIssuer"
          type="text"
          placeholder="e.g. Access Bank"
          required
        >

      </div>


      <div class="input-group">

        <label>
          Card Type
        </label>

        <input
          id="recordCardType"
          type="text"
          placeholder="e.g. Debit, Credit or Prepaid"
        >

      </div>


      <div class="input-group">

        <label>
          Card Network
        </label>

        <input
          id="recordCardNetwork"
          type="text"
          placeholder="e.g. Visa, Mastercard or Verve"
        >

      </div>


      <div class="input-group">

        <label>
          Notes
        </label>

        <input
          id="recordCardNotes"
          type="text"
          placeholder="Additional information"
        >

      </div>


      <button
        class="primary-button"
        type="submit"
      >
        Save Record
      </button>

    `;

  }


  /* =========================
  CRYPTO
  ========================= */

  else if (
    selectedCategory ===
    "Crypto"
  ) {

    recordForm.innerHTML = `

      <div class="input-group">

        <label>
          Cryptocurrency Name
        </label>

        <input
          id="recordCryptoName"
          type="text"
          placeholder="e.g. Bitcoin"
          required
        >

      </div>


      <div class="input-group">

        <label>
          Network
        </label>

        <input
          id="recordCryptoNetwork"
          type="text"
          placeholder="e.g. Bitcoin Network"
        >

      </div>


      <div class="input-group">

        <label>
          Public Address / Identifier
        </label>

        <input
          id="recordCryptoAddress"
          type="text"
          placeholder="Public address only"
        >

      </div>


      <div class="input-group">

        <label>
          Asset Type
        </label>

        <input
          id="recordCryptoAssetType"
          type="text"
          placeholder="e.g. Coin or Token"
        >

      </div>


      <div class="input-group">

        <label>
          Notes
        </label>

        <input
          id="recordCryptoNotes"
          type="text"
          placeholder="Additional information"
        >

      </div>


      <button
        class="primary-button"
        type="submit"
      >
        Save Record
      </button>

    `;

  }


  /* =========================
  DIGITAL WALLETS
  ========================= */

  else if (
    selectedCategory ===
    "Digital Wallets"
  ) {

    recordForm.innerHTML = `

      <div class="input-group">

        <label>
          Wallet Name
        </label>

        <input
          id="recordWalletName"
          type="text"
          placeholder="e.g. My Main Wallet"
          required
        >

      </div>


      <div class="input-group">

        <label>
          Provider
        </label>

        <input
          id="recordWalletProvider"
          type="text"
          placeholder="e.g. PayPal"
        >

      </div>


      <div class="input-group">

        <label>
          Wallet Type
        </label>

        <input
          id="recordWalletType"
          type="text"
          placeholder="e.g. Mobile Wallet"
        >

      </div>


      <div class="input-group">

        <label>
          Website / App
        </label>

        <input
          id="recordWalletWebsite"
          type="text"
          placeholder="e.g. paypal.com"
        >

      </div>


      <div class="input-group">

        <label>
          Notes
        </label>

        <input
          id="recordWalletNotes"
          type="text"
          placeholder="Additional information"
        >

      </div>


      <button
        class="primary-button"
        type="submit"
      >
        Save Record
      </button>

    `;

  }


  showScreen(
    recordScreen
  );

}


/* =========================
CATEGORY BACK
========================= */

categoryBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

  }
);


/* =========================
RECORD BACK
========================= */

recordBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      categoryScreen
    );

  }
);


/* =========================
SAVE RECORD
========================= */

recordForm.addEventListener(
  "submit",
  async (event) => {

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


    let title = "";

    let contentParts = [];


    /* =========================
    BANK DETAILS
    ========================= */

    if (
      selectedCategory ===
      "Bank Details"
    ) {

      const bankName =
        document
          .getElementById(
            "recordBankName"
          )
          .value
          .trim();


      const accountName =
        document
          .getElementById(
            "recordAccountName"
          )
          .value
          .trim();


      const accountType =
        document
          .getElementById(
            "recordAccountType"
          )
          .value
          .trim();


      const branch =
        document
          .getElementById(
            "recordBranch"
          )
          .value
          .trim();


      const notes =
        document
          .getElementById(
            "recordNotes"
          )
          .value
          .trim();


      if (!bankName) {

        alert(
          "Please enter a bank or institution name."
        );

        return;

      }


      title =
        bankName;


      if (accountName) {

        contentParts.push(
          `Account Name: ${accountName}`
        );

      }


      if (accountType) {

        contentParts.push(
          `Account Type: ${accountType}`
        );

      }


      if (branch) {

        contentParts.push(
          `Branch / Location: ${branch}`
        );

      }


      if (notes) {

        contentParts.push(
          `Notes: ${notes}`
        );

      }

    }


    /* =========================
    CARDS
    ========================= */

    else if (
      selectedCategory ===
      "Cards"
    ) {

      const cardName =
        document
          .getElementById(
            "recordCardName"
          )
          .value
          .trim();


      const cardIssuer =
        document
          .getElementById(
            "recordCardIssuer"
          )
          .value
          .trim();


      const cardType =
        document
          .getElementById(
            "recordCardType"
          )
          .value
          .trim();


      const cardNetwork =
        document
          .getElementById(
            "recordCardNetwork"
          )
          .value
          .trim();


      const cardNotes =
        document
          .getElementById(
            "recordCardNotes"
          )
          .value
          .trim();


      if (!cardName) {

        alert(
          "Please enter a card name."
        );

        return;

      }


      title =
        cardName;


      if (cardIssuer) {

        contentParts.push(
          `Bank / Issuer: ${cardIssuer}`
        );

      }


      if (cardType) {

        contentParts.push(
          `Card Type: ${cardType}`
        );

      }


      if (cardNetwork) {

        contentParts.push(
          `Card Network: ${cardNetwork}`
        );

      }


      if (cardNotes) {

        contentParts.push(
          `Notes: ${cardNotes}`
        );

      }

    }


    /* =========================
    CRYPTO
    ========================= */

    else if (
      selectedCategory ===
      "Crypto"
    ) {

      const cryptoName =
        document
          .getElementById(
            "recordCryptoName"
          )
          .value
          .trim();


      const cryptoNetwork =
        document
          .getElementById(
            "recordCryptoNetwork"
          )
          .value
          .trim();


      const cryptoAddress =
        document
          .getElementById(
            "recordCryptoAddress"
          )
          .value
          .trim();


      const cryptoAssetType =
        document
          .getElementById(
            "recordCryptoAssetType"
          )
          .value
          .trim();


      const cryptoNotes =
        document
          .getElementById(
            "recordCryptoNotes"
          )
          .value
          .trim();


      if (!cryptoName) {

        alert(
          "Please enter a cryptocurrency name."
        );

        return;

      }


      title =
        cryptoName;


      if (cryptoNetwork) {

        contentParts.push(
          `Network: ${cryptoNetwork}`
        );

      }


      if (cryptoAddress) {

        contentParts.push(
          `Public Address / Identifier: ${cryptoAddress}`
        );

      }


      if (cryptoAssetType) {

        contentParts.push(
          `Asset Type: ${cryptoAssetType}`
        );

      }


      if (cryptoNotes) {

        contentParts.push(
          `Notes: ${cryptoNotes}`
        );

      }

    }


    /* =========================
    DIGITAL WALLETS
    ========================= */

    else if (
      selectedCategory ===
      "Digital Wallets"
    ) {

      const walletName =
        document
          .getElementById(
            "recordWalletName"
          )
          .value
          .trim();


      const walletProvider =
        document
          .getElementById(
            "recordWalletProvider"
          )
          .value
          .trim();


      const walletType =
        document
          .getElementById(
            "recordWalletType"
          )
          .value
          .trim();


      const walletWebsite =
        document
          .getElementById(
            "recordWalletWebsite"
          )
          .value
          .trim();


      const walletNotes =
        document
          .getElementById(
            "recordWalletNotes"
          )
          .value
          .trim();


      if (!walletName) {

        alert(
          "Please enter a wallet name."
        );

        return;

      }


      title =
        walletName;


      if (walletProvider) {

        contentParts.push(
          `Provider: ${walletProvider}`
        );

      }


      if (walletType) {

        contentParts.push(
          `Wallet Type: ${walletType}`
        );

      }


      if (walletWebsite) {

        contentParts.push(
          `Website / App: ${walletWebsite}`
        );

      }


      if (walletNotes) {

        contentParts.push(
          `Notes: ${walletNotes}`
        );

      }

    }

/* =========================
SAVE TO SUPABASE
========================= */

const content =
  contentParts.join("\n");

const saveButton =
  recordForm.querySelector(
    "button[type='submit']"
  );

saveButton.disabled = true;

saveButton.textContent =
  "Saving...";

try {

  const {
    error
  } =
    await supabase
      .from("user_items")
      .insert({
        category: selectedCategory,
        title: title,
        content: content,
        user_id: user.id
      });

  if (error) {
    throw error;
  }

  alert(
    "Record saved."
  );

  await loadRecords();

  renderCategoryRecords();

  showScreen(
    categoryScreen
  );

  const categoryPage =
    document.getElementById(
      "categoryPage"
    );

  if (categoryPage) {

    categoryPage.classList.add(
      "morphed-in"
    );

  }

} catch (error) {

  console.error(error);

  alert(
    error.message ||
    "Could not save the record."
  );

} finally {

  saveButton.disabled =
    false;

  saveButton.textContent =
    "Save Record";

}

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

    searchInput.value =
      "";

    searchResults.innerHTML =
      "";

    searchInput.focus();

  }
);


searchBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
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
              .includes(query)

            ||

            String(
              record.category || ""
            )
              .toLowerCase()
              .includes(query)

            ||

            String(
              record.content || ""
            )
              .toLowerCase()
              .includes(query)

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

            <div
              class="empty-state"
              style="
                margin-bottom:12px;
                text-align:left;
              "
            >

              <h3>
                ${escapeHtml(
                  record.title
                )}
              </h3>

              <p>
                ${escapeHtml(
                  record.category
                )}
              </p>

              <p>
                ${escapeHtml(
                  record.content || ""
                )}
              </p>

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

  }
);

settingsBackButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

  }
);

 logoutButton.addEventListener(
  "click",
  async () => {

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
      "Bank Vault\n\nStore and organize ordinary financial information. Do not store passwords, PINs, seed phrases, private keys, authentication codes, card numbers, CVV codes, or other secrets."
    );

  }
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

  const {
    data: {
      session
    }
  } =
    await supabase.auth.getSession();


  if (session) {

    await openDashboard();

  } else {

    showScreen(
      welcomeScreen
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
      event === "SIGNED_OUT" ||
      !session
    ) {

      showScreen(
        welcomeScreen
      );

    }

  }
);


/* =========================
START
========================= */

checkExistingSession();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Bank Vault notification service ready");
      })
      .catch((error) => {
        console.error(
          "Notification service failed:",
          error
        );
      });
  });
}

 function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map(char => char.charCodeAt(0))
  );
}


window.enableBankVaultNotifications = async function () {
  try {
    if (!("Notification" in window)) {
      alert("Notifications are not supported on this device.");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      alert("Service workers are not supported.");
      return;
    }

    if (!("PushManager" in window)) {
      alert("Push notifications are not supported on this device.");
      return;
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Please log in first.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      if (permission === "denied") {
        alert(
          "Notifications are blocked. Enable them in your browser settings."
        );
      } else {
        alert("Notification permission was not granted.");
      }

      return;
    }

    const registration = await navigator.serviceWorker.ready;

    let subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,

          applicationServerKey:
            urlBase64ToUint8Array(
              "BI7n11elHSW2ommddDiRJHzLq5E-KlvH8orqxSU3bqMxnzhHYSJVWj11vtRGcXfC6C1xWsp9fVBynQajtAmC5R4"
            )
        });
    }

    const subscriptionJson =
      subscription.toJSON();

    const { error: saveError } =
      await supabase
        .from("push_subscriptions")
        .upsert(
          {
            user_id: user.id,
            endpoint: subscriptionJson.endpoint,
            p256dh: subscriptionJson.keys.p256dh,
            auth: subscriptionJson.keys.auth
          },
          {
            onConflict: "endpoint"
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

    console.log(
      "Bank Vault push subscription saved:",
      subscriptionJson
    );

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
};
window.sendBankVaultTestNotification = async function () {
  try {
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      alert("Please log in first.");
      return;
    }

    const { data, error } =
      await supabase.functions.invoke(
        "send-push",
        {
          body: {
            title: "Bank Vault",
            body: "Your Bank Vault push notifications are working.",
            url: "/"
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
  (error?.message || "Unknown error")
);

      return;
    }

    console.log(
      "Push notification result:",
      data
    );

    alert(
      "Notification sent successfully."
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
};