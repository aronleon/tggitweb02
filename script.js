async function getTabsFromLink() {

    const convertButton = document.getElementById('convertlink');
    const userAreaDiv= document.getElementById('userAreaDiv');


    const updatedLoadingScreen=`
        <style>
            .loadingdiv{
                margin-top: 50px;
                align-items: center;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin: 50px, auto;
                width: 50%;
                height: 250px;
                border: solid;
                border-radius: 50px;
                border-width: 2px;
            }
            .TextLarge{
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight: 700;
                font-size: xx-large;
                margin-bottom: 50px;
            }
            .dot-wave {
                --uib-size: 50px;
                --uib-speed: 0.6s;
                --uib-color: #0d0909;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
                width: var(--uib-size);
                height: calc(var(--uib-size) * 0.17);
                padding-top: calc(var(--uib-size) * 0.34);
            }
            .dot-wave__dot {
                flex-shrink: 0;
                width: calc(var(--uib-size) * 0.17);
                height: calc(var(--uib-size) * 0.17);
                border-radius: 50%;
                background-color: var(--uib-color);
                will-change: transform;
            }
            .dot-wave__dot:nth-child(1) {
                animation: jump824 var(--uib-speed) ease-in-out
                    calc(var(--uib-speed) * -0.45) infinite;
            }
            .dot-wave__dot:nth-child(2) {
                animation: jump824 var(--uib-speed) ease-in-out
                    calc(var(--uib-speed) * -0.3) infinite;
            }
            .dot-wave__dot:nth-child(3) {
                animation: jump824 var(--uib-speed) ease-in-out
                    calc(var(--uib-speed) * -0.15) infinite;
            }
            .dot-wave__dot:nth-child(4) {
                animation: jump824 var(--uib-speed) ease-in-out infinite;
            }
            @keyframes jump824 {
                0%,
                100% {
                    transform: translateY(0px);
                }

                50% {
                    transform: translateY(-200%);
                }
            }
        </style>
        <div class="loadingdiv" id="loadingscreen">
            <p1 class="TextLarge">Converting Tabs:</p1>
            <div class="dot-wave">
                <div class="dot-wave__dot"></div>
                <div class="dot-wave__dot"></div>
                <div class="dot-wave__dot"></div>
                <div class="dot-wave__dot"></div>
            </div>
        </div>
    `;

    //const updatedLoadingScreen= "<div class='loadingdiv' id='loadingscreen'></div>";
    const originalContent = userAreaDiv.innerHTML;
    const linkInput = document.getElementById('linkput');
    const link = linkInput.value;
    const t1Input = document.getElementById('starttime');
    const dtInput = document.getElementById('dtime');
    const t1 = t1Input.value;
    const dt = dtInput.value;

    if (link) {
        // Change the button to an image to indicate the process is running
        userAreaDiv.innerHTML=updatedLoadingScreen;
        convertButton.innerHTML = '<img src="loading-spinner.gif" alt="Loading" style="height: 30px;">';
        convertButton.disabled = true;  // Disable button to prevent multiple submissions

        const formData = new FormData();
        formData.append('link', link);
        formData.append('t1', t1);
        formData.append('dt', dt);

        try {
            const response = await fetch('https://9821-37-46-167-35.ngrok-free.app/convertLink', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();

                if (data.tabs && Array.isArray(data.tabs)) {
                    // Store the tabs in localStorage so the next page can access them
                    localStorage.setItem('guitarTabs', JSON.stringify(data.tabs));

                    // Redirect to the results page
                    window.location.href = 'results.html';
                } else {
                    document.getElementById('output').innerText = 'Error: Invalid response structure.';
                }
            } else {
                document.getElementById('output').innerText = 'Error: Unable to convert the file.';
            }
        } catch (error) {
            document.getElementById('output').innerText = 'Error: ' + error.message;
        } finally {
            // Restore the button after process is complete
            userAreaDiv.innerHTML=originalContent;
            convertButton.innerHTML = 'Convert';
            convertButton.disabled = false;
        }
    }
}

function updateDT(val) {
    document.getElementById('dtimed').value = val;
}
