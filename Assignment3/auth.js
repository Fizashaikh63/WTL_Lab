document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('regForm');

    // --- 1. HOME PAGE HEADER LOGIC ---
    const activeUser = localStorage.getItem('activeUser');
    if (authContainer) {
        if (activeUser) {
            authContainer.innerHTML = `
                <span style="margin-right: 15px;">Welcome, <strong>${activeUser}</strong></span>
                <button onclick="logoutUser()" class="logout-btn">Logout</button>
            `;
        }
    }

    // --- 2. REGISTRATION (Save Data) ---
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const pass = document.getElementById('regPass').value;

            // Save user details as a 'database' in the browser
            localStorage.setItem('storedEmail', email);
            localStorage.setItem('storedPass', pass);
            localStorage.setItem('registeredName', name);

            alert('Registration Successful! Now please Login.');
            window.location.href = 'login.html';
        });
    }

    // --- 3. LOGIN (Match Data) ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get what the user just typed
            const typedEmail = document.getElementById('email').value;
            const typedPass = document.getElementById('password').value;

            // Get what we saved during registration
            const savedEmail = localStorage.getItem('storedEmail');
            const savedPass = localStorage.getItem('storedPass');
            const savedName = localStorage.getItem('registeredName');

            // Reset error messages
            document.getElementById('emailErr').style.display = 'none';
            document.getElementById('passErr').style.display = 'none';

            // VALIDATION MATCHING
            if (typedEmail === savedEmail && typedPass === savedPass) {
                // Success!
                localStorage.setItem('activeUser', savedName);
                window.location.href = 'index.html';
            } else {
                // Failure!
                alert("Invalid Email or Password. Please try again or Register.");
                
                // Optional: Show specific red error messages
                if (typedEmail !== savedEmail) {
                    document.getElementById('emailErr').innerText = "Email not found";
                    document.getElementById('emailErr').style.display = 'block';
                } else if (typedPass !== savedPass) {
                    document.getElementById('passErr').innerText = "Incorrect Password";
                    document.getElementById('passErr').style.display = 'block';
                }
            }
        });
    }
});

function logoutUser() {
    localStorage.removeItem('activeUser');
    window.location.href = 'login.html';
}