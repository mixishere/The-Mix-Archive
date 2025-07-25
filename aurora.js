(function () {
  // 🔍 Auto-skip Halo if already on Google
  if (location.hostname.includes("google")) {
    runAurora();
    return;
  }

  // 🌟 HALO PROMPT
  const halo = document.createElement("div");
  halo.style = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: #000; color: #ffd700; padding: 28px;
    font-family: 'Courier New', monospace; font-size: 16px;
    border: 2px solid #ffd700; border-radius: 12px;
    box-shadow: 0 0 25px #ffd700, inset 0 0 10px #222;
    text-align: center; z-index: 99999;
  `;
  halo.innerHTML = `
    <p>This GUI works best on <b>google.com</b>.<br>Would you like to go there?</p>
    <div style="margin-top: 15px;">
      <button id="haloYes">Yes</button>
      <button id="haloNo">No</button>
      <div style="margin-top: 10px; font-size: 13px; color: #aaa;">
        If you're already on google.com, click No
      </div>
    </div>
  `;
  document.body.appendChild(halo);

  document.getElementById("haloYes").onclick = () => {
    halo.remove();
    window.location.href = "https://www.google.com";
  };

  document.getElementById("haloNo").onclick = () => {
    halo.remove();
    runAurora();
  };

  // 🧠 Core Aurora Logic
  function runAurora() {
    const versionLabel = document.createElement("div");
    versionLabel.textContent = "Aurora v3.4-CoreOnly";
    versionLabel.style = `
      position: fixed; top: 40px; left: 0; width: 100%;
      text-align: center; font-family: monospace;
      font-size: 16px; color: #00ff88;
      z-index: 10001;
    `;
    document.body.appendChild(versionLabel);

    function makeDraggable(el) {
      let isDragging = false, offsetX, offsetY;
      el.addEventListener("mousedown", (e) => {
        const bounds = el.getBoundingClientRect();
        const edgeSize = 10;
        const isNearEdge = (
          e.clientX - bounds.left <= edgeSize ||
          bounds.right - e.clientX <= edgeSize ||
          e.clientY - bounds.top <= edgeSize ||
          bounds.bottom - e.clientY <= edgeSize
        );
        if (isNearEdge) {
          isDragging = true;
          offsetX = e.clientX - el.offsetLeft;
          offsetY = e.clientY - el.offsetTop;
          el.style.cursor = "move";
        }
      });
      document.addEventListener("mouseup", () => {
        isDragging = false;
        el.style.cursor = "default";
      });
      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          el.style.left = (e.clientX - offsetX) + "px";
          el.style.top = (e.clientY - offsetY) + "px";
        }
      });
    }

    function logEvent(entry) {
      const viewer = document.getElementById("logsGUI");
      if (!viewer) return;
      const timestamp = new Date().toISOString();
      viewer.textContent += `[${timestamp}] ${entry}\n`;
      viewer.scrollTop = viewer.scrollHeight;
    }

    function createAuroraTab({ id, label, color, fileURL, posLeft, posTop }) {
      const viewer = document.createElement("div");
      viewer.id = `${id}GUI`;
      viewer.style = `
        position: fixed; top: ${posTop}px; left: ${posLeft}px; width: 600px; height: 400px;
        background: #1e1e1e; color: ${color}; padding: 20px;
        font-family: monospace; font-size: 14px;
        border-radius: 12px; box-shadow: 0 0 20px ${color};
        overflow: auto; white-space: pre-wrap; z-index: 9998;
        display: none;
      `;
      document.body.appendChild(viewer);
      makeDraggable(viewer);

      const tabBtn = document.createElement("button");
      tabBtn.textContent = label;
      tabBtn.style = `
        display: block; width: 60px; margin: 10px auto;
        padding: 10px; font-size: 14px;
        background: ${color}; color: #000;
        border-radius: 10px; border: none;
        font-family: 'Comfortaa', cursive;
        cursor: pointer; box-shadow: 0 0 8px ${color};
      `;
      tabBtn.onclick = () => {
        if (viewer.style.display === "none") {
          viewer.textContent = `🔄 Initializing ${label}...`;
          viewer.style.display = "block";
          fetch(fileURL)
            .then(res => res.ok ? res.text() : Promise.reject("Failed to load"))
            .then(code => {
              logEvent(`${id} viewer opened`);
              if (id === "core") {
                try {
                  eval(code);
                } catch (err) {
                  viewer.textContent = `❌ Error running core: ${err}`;
                  logEvent(`core execution failed`);
                }
              } else {
                viewer.textContent = code;
                logEvent(`${id} viewer initialized (display only)`);
              }
            })
            .catch(err => viewer.textContent = `❌ Error loading code: ${err}`);
        } else {
          viewer.style.display = "none";
        }
      };

      document.getElementById("auroraTabs").appendChild(tabBtn);
    }

    let tabBar = document.getElementById("auroraTabs");
    if (!tabBar) {
      tabBar = document.createElement("div");
      tabBar.id = "auroraTabs";
      tabBar.style = `
        position: fixed; top: 80px; left: 0; width: 80px;
        background: #0d0d0d; padding-top: 20px;
        border-right: 2px solid white; z-index: 10000;
      `;
      document.body.appendChild(tabBar);
    }

    const tabs = [
      { id: "disk", label: "💾 disk", color: "#ff77e9", posLeft: 100, posTop: 100 },
      { id: "labs", label: "🧪 labs", color: "#cc66ff", posLeft: 100, posTop: 550 },
      { id: "clickr", label: "🎮 clickr", color: "#00ffff", posLeft: 750, posTop: 100 },
      { id: "console", label: "🧠 console", color: "#00ff88", posLeft: 1400, posTop: 100 },
      { id: "logs", label: "📜 logs", color: "#ffaa00", posLeft: 1400, posTop: 550 },
      { id: "codes", label: "🔐 codes", color: "#f4f442", posLeft: 750, posTop: 550 },
      { id: "dread", label: "🖤 dread", color: "#ff4444", posLeft: 2100, posTop: 100 },
      { id: "core", label: "🧿 core", color: "#00ffaa", posLeft: 2100, posTop: 1000 },
      { id: "credits", label: "🎖️ credits", color: "#ffcc00", posLeft: 100, posTop: 1000 }
    ];
    tabs.forEach(tab => {
      tab.fileURL = `https://raw.githubusercontent.com/mixishere/The-Mix-Archive/main/${tab.id}`;
      createAuroraTab(tab);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "\\") {
        const viewers = document.querySelectorAll("[id$='GUI']");
        const tabBar = document.getElementById("auroraTabs");
        viewers.forEach(view => {
          view.style.display = (view.style.display === "none") ? "block" : "none";
        });
        if (tabBar) {
          tabBar.style.display = (tabBar.style.display === "none") ? "block" : "none";
        }
        const logs = document.getElementById("logsGUI");
        if (logs) {
          const timestamp = new Date().toISOString();
          logs.textContent += `[${timestamp}] 🔒 Stealth mode toggled (tabs + viewers)\n`;
          logs.scrollTop = logs.scrollHeight;
        }
      }
    });
  }
})();
``
