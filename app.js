// Configuration
const API_KEY = "MK_PROD_FLX4P92EDF"; // Replace with your API Key
const SECRET_KEY = "YOUR_SECRET_KEY"; // Replace with your Secret Key
const BASE_URL = "https://api.monnify.com"; // Use sandbox URL for testing: https://sandbox.monnify.com

// Function to generate Basic Auth token
function generateAuthToken() {
    const token = btoa(`${API_KEY}:${SECRET_KEY}`);
    return `Basic ${token}`;
}

// Function to display messages
function showMessage(elementId, text, type = "info") {
    const messageDiv = document.getElementById(elementId);
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type === 'error' ? 'error' : 'success'}`;

        // Clear message after 5 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    }
}

// Function to create a wallet
async function createWallet(walletData) {
    const authToken = generateAuthToken();
    const endpoint = `${BASE_URL}/api/v2/disbursements/wallet`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(walletData)
        });

        const data = await response.json();
        if (data.requestSuccessful) {
            return data.responseBody; // Return wallet details
        } else {
            throw new Error(data.responseMessage);
        }
    } catch (error) {
        console.error("Error creating wallet:", error);
        throw error;
    }
}

// Function to debit the wallet
async function debitWallet(debitData) {
    const authToken = generateAuthToken();
    const endpoint = `${BASE_URL}/api/v2/disbursements/single`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(debitData)
        });

        const data = await response.json();
        if (data.requestSuccessful) {
            return data.responseBody; // Return debit details
        } else {
            throw new Error(data.responseMessage);
        }
    } catch (error) {
        console.error("Error debiting wallet:", error);
        throw error;
    }
}

// Login Functionality
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate login (replace with actual authentication logic)
    if (email === "admin@dexa.com" && password === "admin123") {
        window.location.href = "admin.html"; // Redirect to Admin Page
    } else if (email === "user@dexa.com" && password === "user123") {
        window.location.href = "account-details.html"; // Redirect to Account Details Page
    } else {
        showMessage('message', 'Invalid email or password', 'error');
    }
}

// Admin Actions
function editAccount(accountNumber) {
    alert(`Edit account: ${accountNumber}`);
    // Add logic to edit account
}

function deleteAccount(accountNumber) {
    if (confirm(`Are you sure you want to delete account: ${accountNumber}?`)) {
        alert(`Deleted account: ${accountNumber}`);
        // Add logic to delete account
    }
}

// Account Actions
function handleTransfer() {
    const recipientAccount = document.getElementById('recipientAccount').value;
    const amount = document.getElementById('amount').value;

    const debitData = {
        amount: parseFloat(amount),
        reference: `ref_${Date.now()}`,
        narration: "Wallet Debit",
        destinationBankCode: "058", // Replace with recipient's bank code
        destinationAccountNumber: recipientAccount,
        currency: "NGN",
        sourceAccountNumber: "8193648995" // Replace with the wallet account number
    };

    debitWallet(debitData)
        .then(response => {
            showMessage('message', `Transfer successful! Transaction Reference: ${response.transactionReference}`, "success");
        })
        .catch(error => {
            showMessage('message', `Error transferring funds: ${error.message}`, "error");
        });
}

function handleWithdraw() {
    const amount = document.getElementById('amount').value;

    alert(`Withdraw ₦${amount}`);
    // Add logic to handle withdrawal
}

function handleInvest() {
    const amount = document.getElementById('amount').value;

    alert(`Invest ₦${amount}`);
    // Add logic to handle investment
}

function handleSwap() {
    const amount = document.getElementById('amount').value;

    alert(`Swap ₦${amount}`);
    // Add logic to handle swap
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleLogin();
        });
    }

    // Transfer Form
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        transferForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleTransfer();
        });
    }

    // Withdraw Form
    const withdrawForm = document.getElementById('withdrawForm');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleWithdraw();
        });
    }

    // Invest Form
    const investForm = document.getElementById('investForm');
    if (investForm) {
        investForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleInvest();
        });
    }

    // Swap Form
    const swapForm = document.getElementById('swapForm');
    if (swapForm) {
        swapForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleSwap();
        });
    }
});
