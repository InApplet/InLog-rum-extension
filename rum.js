// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming

function showBar(){
    performance.getEntriesByType("navigation").forEach((navigation) => {
        console.log(navigation);

        data = []

        // Redirect
        data.push({
            metric: navigation.redirectEnd - navigation.redirectStart,
            name: "Redirect",
        });

        // DNS
        data.push({
            metric: navigation.domainLookupEnd - navigation.domainLookupStart,
            name: "DNS",
        });

        // TCP
        data.push({
            metric: navigation.secureConnectionStart - navigation.connectStart,
            name: "TCP",
        });

        // SSL
        data.push({
            metric: navigation.connectEnd - navigation.secureConnectionStart,
            name: "SSL",
        });

        // Request
        data.push({
            metric: navigation.responseStart - navigation.requestStart,
            name: "Request",
        });

        // Response
        data.push({
            metric: navigation.responseEnd - navigation.responseStart,
            name: "Response",
        });

        // DOM Interactive
        data.push({
            metric: navigation.domInteractive - navigation.responseEnd,
            name: "DOM Interactive",
        });

        // DOM Ready
        data.push({
            metric: navigation.domComplete - navigation.domInteractive,
            name: "DOM Ready",
        });

        // OnLoad
        data.push({
            metric: navigation.loadEventEnd - navigation.loadEventStart,
            name: "OnLoad",
        });

        const rumBar = document.createElement("div");
        rumBar.classList.add("inrum-bar");
        document.body.appendChild(rumBar);

        data.forEach((item) => {
            
            const rumContent = document.createElement("div");
            rumContent.classList.add("inrum-content");
            rumBar.appendChild(rumContent);

            const metricInt = item.metric;
            rumContent.style.flexGrow = metricInt;

            const metric = document.createElement("span");
            metric.classList.add("metric");

            metric.innerText = item.metric.toFixed(1) + "ms";
            rumContent.appendChild(metric);

            rum_name = document.createElement("span");
            rum_name.classList.add("name");
            rum_name.innerText = item.name;
            rumContent.appendChild(rum_name);
        });

        const rumLogo = document.createElement("a");
        rumLogo.href = "https://www.inapplet.com/";
        rumLogo.target = "_blank";
        rumLogo.classList.add("inrum-logo");
        rumBar.appendChild(rumLogo);

        const logo = document.createElement("img");
        logo.src = "https://www.inapplet.com/assets/images/logo-color.svg";
        rumLogo.appendChild(logo);

    });
}

if (document.readyState === 'complete') {
    showBar()
} else {
    window.addEventListener('load', (event) => {
        setTimeout(() => {
            showBar()
        }, 0)
    })
}