javascript:(function() {
  // Prevent duplicates if run multiple times
  if (document.getElementById("clickrDiv")) {
    alert("Clicker Game is already running.");
    return;
  }

  // Create main container
  let clickrDiv = document.createElement("div");
  clickrDiv.id = "clickrDiv";
  clickrDiv.style.position = "fixed";
  clickrDiv.style.top = "50px";
  clickrDiv.style.left = "50px";
  clickrDiv.style.padding = "20px";
  clickrDiv.style.background = "#1e1e1e";
  clickrDiv.style.border = "1px solid #444";
  clickrDiv.style.borderRadius = "12px";
  clickrDiv.style.boxShadow = "0 0 20px rgba(255,255,255,0.2)";
  clickrDiv.style.fontFamily = "Segoe UI, sans-serif";
  clickrDiv.style.color = "#fff";
  clickrDiv.style.zIndex = "999999";
  clickrDiv.style.display = "flex";
  clickrDiv.style.flexDirection = "column";
  clickrDiv.style.width = "850px";

  // Title
  let title = document.createElement("h2");
  title.textContent = "⚡ Clicker Game";
  title.style.margin = "0 0 10px 0";
  title.style.textAlign = "center";
  title.style.color = "#00ffff";
  clickrDiv.appendChild(title);

  // Click section
  let clickSection = document.createElement("div");
  clickSection.style.display = "flex";
  clickSection.style.flexDirection = "column";
  clickSection.style.alignItems = "center";
  clickSection.style.marginBottom = "20px";

  let button = document.createElement("button");
  button.textContent = "BAr!";
  button.style.fontSize = "28px";
  button.style.padding = "20px 40px";
  button.style.border = "none";
  button.style.background = "#00ffff";
  button.style.color = "#000";
  button.style.cursor = "pointer";
  button.style.borderRadius = "12px";
  button.style.transition = "transform 0.1s";
  button.onmousedown = () => (button.style.transform = "scale(0.95)");
  button.onmouseup = () => (button.style.transform = "scale(1)");

  let clickCounter = document.createElement("p");
  clickCounter.id = "clickValue";
  clickCounter.textContent = "Clicks: 0";
  clickCounter.style.fontSize = "20px";
  clickCounter.style.marginTop = "15px";

  clickSection.appendChild(button);
  clickSection.appendChild(clickCounter);
  clickrDiv.appendChild(clickSection);

  // Power section
  let powerSection = document.createElement("div");
  powerSection.style.display = "grid";
  powerSection.style.gridTemplateColumns = "repeat(3, 1fr)";
  powerSection.style.gap = "10px";

  let powers = [
    { id: "boostButton", text: "Boost Mode (-50 clicks, 2x click)", background: "#ff4d4d" },
    { id: "autoUpButton", text: "AutoUp (-100 clicks, +5/s)", background: "#3399ff" },
    { id: "autoUpBetterButton", text: "AutoUp Better (-15K clicks, +50/s)", background: "#ffd700" },
    { id: "autoV2Button", text: "AutoV2 (-50K clicks, x10 AutoUp)", background: "#00ffff" },
    { id: "powerClicksButton", text: "Power Clicks (-500 clicks, +10)", background: "#ff9900" },
    { id: "veryPowerfulClicksButton", text: "Very Powerful Clicks (-50K clicks, +500)", background: "#ff3333" },
    { id: "ultraModeButton", text: "Ultra Mode (-1K clicks, 20x click)", background: "#cc66ff" },
    { id: "betterClicksButton", text: "Better Clicks (-60K clicks, x5, max 10)", background: "#66ff66" },
    { id: "rerollButton", text: "Reroll (50/50 gain/loss)", background: "#66cc66" },
    { id: "removeClicksButton", text: "Reset Clicks", background: "#999" },
    { id: "finishButton", text: "FINISH (1 nonillion clicks)", background: "#000", border: "red" },

    // New powers with costs
    { id: "quantumClicksButton", text: "Quantum Clicks (-1M, +1K now)", background: "#9933ff" },
    { id: "timeWarpButton", text: "Time Warp (-5M, 2x auto speed)", background: "#ffcc00" },
    { id: "clickstormButton", text: "Clickstorm (-10M, +10K over 10s)", background: "#ff6600" },
    { id: "cloneArmyButton", text: "Clone Army (-50M, 10x autoUp rate)", background: "#00cc99" },
    { id: "blackHoleButton", text: "Black Hole (-100M, 50/50)", background: "#333333" },
    { id: "clickInsuranceButton", text: "Click Insurance (-250M, 5 shields)", background: "#66ccff" },
    { id: "goldenFingerButton", text: "Golden Finger (-500M, +10K/click for 30s)", background: "#ffd700" },
    { id: "prestigePortalButton", text: "Prestige Portal (-1B, permanent 2x)", background: "#cc0000" },
    { id: "clickMagnetButton", text: "Click Magnet (-5B, 2x passive)", background: "#ff3399" },
    { id: "cosmicUpgradeButton", text: "Cosmic Upgrade (-10B, big boost)", background: "#6600cc" }
  ];

  powers.forEach(power => {
    let btn = document.createElement("button");
    btn.id = power.id;
    btn.textContent = power.text;
    btn.style.fontSize = "14px";
    btn.style.padding = "10px";
    btn.style.border = `2px solid ${power.border || "#fff"}`;
    btn.style.background = power.background;
    btn.style.color = "#fff";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.width = "100%";
    powerSection.appendChild(btn);
  });

  clickrDiv.appendChild(powerSection);
  document.body.appendChild(clickrDiv);

  // ======================
  // Game logic
  // ======================
  let count = 0;
  let clickMultiplier = 1;
  let autoUpRate = 0;
  let autoUpBetterRate = 0;
  let autoV2Multiplier = 1;
  let autoV2Count = 0;
  let autoV2MaxBuys = 3;
  let betterClicksCount = 0;
  let betterClicksMaxBuys = 10;

  // New states
  let autoInterval = null;
  let clickInsuranceUses = 0;
  let prestigeMultiplier = 1;
  let goldenFingerActive = false;

  function formatClicks(num) {
    if (!isFinite(num)) return "∞";
    if (num < 1e6) return Math.floor(num).toLocaleString();
    const units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
    let unitIndex = Math.floor(Math.log10(num) / 3);
    unitIndex = Math.max(0, Math.min(unitIndex, units.length - 1));
    let scaled = num / Math.pow(10, unitIndex * 3);
    return scaled.toFixed(2) + units[unitIndex];
  }

  function updateClickCount() {
    clickCounter.textContent = `Clicks: ${formatClicks(count)}`;
  }

  function autoClicker() {
    count += (autoUpRate + autoUpBetterRate) * autoV2Multiplier;
    updateClickCount();
  }

  // Start passive income
  autoInterval = setInterval(autoClicker, 1000);

  // ======================
  // Original upgrades
  // ======================
  document.getElementById("boostButton").onclick = function () {
    if (count >= 50) {
      count -= 50;
      clickMultiplier *= 2;
      this.disabled = true;
      this.textContent = "Boost Mode (MAXED)";
      updateClickCount();
    }
  };

  document.getElementById("autoUpButton").onclick = function () {
    if (count >= 100) {
      count -= 100;
      autoUpRate += 5;
      updateClickCount();
    }
  };

  document.getElementById("autoUpBetterButton").onclick = function () {
    if (count >= 15000) {
      count -= 15000;
      autoUpBetterRate += 50;
      updateClickCount();
    }
  };

  document.getElementById("autoV2Button").onclick = function () {
    if (count >= 50000 && autoV2Count < autoV2MaxBuys) {
      count -= 50000;
      autoV2Multiplier *= 10;
      autoV2Count++;
      this.textContent = `AutoV2 (${autoV2Count}/${autoV2MaxBuys})`;
      updateClickCount();
    }
    if (autoV2Count === autoV2MaxBuys) {
      this.disabled = true;
      this.textContent = "AutoV2 (MAXED)";
    }
  };

  document.getElementById("powerClicksButton").onclick = function () {
    if (count >= 500) {
      count -= 500;
      clickMultiplier += 10;
      updateClickCount();
    }
  };

  document.getElementById("veryPowerfulClicksButton").onclick = function () {
    if (count >= 50000) {
      count -= 50000;
      clickMultiplier += 500;
      updateClickCount();
    }
  };

  document.getElementById("ultraModeButton").onclick = function () {
    if (count >= 1000) {
      count -= 1000;
      clickMultiplier *= 20;
      this.disabled = true;
      this.textContent = "Ultra Mode (MAXED)";
      updateClickCount();
    }
  };

  document.getElementById("betterClicksButton").onclick = function () {
    if (count >= 60000 && betterClicksCount < betterClicksMaxBuys) {
      count -= 60000;
      clickMultiplier *= 5;
      betterClicksCount++;
      this.textContent = `Better Clicks (${betterClicksCount}/${betterClicksMaxBuys})`;
      updateClickCount();
    }
    if (betterClicksCount === betterClicksMaxBuys) {
      this.disabled = true;
      this.textContent = "Better Clicks (MAXED)";
    }
  };

  document.getElementById("rerollButton").onclick = function () {
    if (clickInsuranceUses > 0) {
      clickInsuranceUses--;
      count = Math.floor(count * 1.5);
    } else {
      count = Math.random() < 0.5 ? Math.floor(count * 0.5) : Math.floor(count * 1.5);
    }
    updateClickCount();
  };

  document.getElementById("removeClicksButton").onclick = function () {
    count = 0;
    updateClickCount();
  };

  document.getElementById("finishButton").onclick = function () {
    if (count >= 1e30) {
      alert("🎉 You reached 1 nonillion clicks! Game complete!");
      try { clearInterval(autoInterval); } catch (e) {}
      if (clickrDiv && clickrDiv.parentNode) clickrDiv.parentNode.removeChild(clickrDiv);
    }
  };

  // ======================
  // New powers
  // ======================
  document.getElementById("quantumClicksButton").onclick = function () {
    if (count >= 1e6) {
      count -= 1e6;
      count += 1000;
      updateClickCount();
    }
  };

  document.getElementById("timeWarpButton").onclick = function () {
    if (count >= 5e6) {
      count -= 5e6;
      try { clearInterval(autoInterval); } catch (e) {}
      autoInterval = setInterval(autoClicker, 500); // 2x faster
      this.disabled = true;
      this.textContent = "Time Warp (Activated)";
      updateClickCount();
    }
  };

  document.getElementById("clickstormButton").onclick = function () {
    if (count >= 1e7) {
      count -= 1e7;
      let ticks = 0;
      let stormInterval = setInterval(() => {
        if (ticks >= 10) return clearInterval(stormInterval);
        count += 1000;
        updateClickCount();
        ticks++;
      }, 1000);
    }
  };

  document.getElementById("cloneArmyButton").onclick = function () {
    if (count >= 5e7) {
      count -= 5e7;
      autoUpRate *= 10;
      updateClickCount();
      this.disabled = true;
      this.textContent = "Clone Army (Deployed)";
    }
  };

  document.getElementById("blackHoleButton").onclick = function () {
    if (count >= 1e8) {
      count -= 1e8;
      count = Math.random() < 0.5 ? Math.floor(count * 0.5) : Math.floor(count * 2);
      updateClickCount();
    }
  };

  document.getElementById("clickInsuranceButton").onclick = function () {
    if (count >= 2.5e8) {
      count -= 2.5e8;
      clickInsuranceUses = 5;
      updateClickCount();
      this.disabled = true;
      this.textContent = "Click Insurance (Active)";
    }
  };

  document.getElementById("goldenFingerButton").onclick = function () {
    if (count >= 5e8) {
      count -= 5e8;
      goldenFingerActive = true;
      this.disabled = true;
      this.textContent = "Golden Finger (Active)";
      setTimeout(() => {
        goldenFingerActive = false;
      }, 30000);
      updateClickCount();
    }
  };

  document.getElementById("prestigePortalButton").onclick = function () {
    if (count >= 1e9) {
      // Reset most progress, keep prestige multiplier
      count = 0;
      clickMultiplier = 1;
      autoUpRate = 0;
      autoUpBetterRate = 0;
      autoV2Multiplier = 1;
      autoV2Count = 0;
      betterClicksCount = 0;
      prestigeMultiplier *= 2;
      // Re-enable buttons that could have been maxed (optional: keep disabled if you prefer)
      const resettable = ["boostButton","ultraModeButton","autoV2Button","betterClicksButton"];
      resettable.forEach(id => {
        const b = document.getElementById(id);
        if (b) {
          b.disabled = false;
          if (id === "boostButton") b.textContent = "Boost Mode (-50 clicks, 2x click)";
          if (id === "ultraModeButton") b.textContent = "Ultra Mode (-1K clicks, 20x click)";
          if (id === "autoV2Button") b.textContent = `AutoV2 (0/${autoV2MaxBuys})`;
          if (id === "betterClicksButton") b.textContent = `Better Clicks (0/${betterClicksMaxBuys})`;
        }
      });
      updateClickCount();
      alert("✨ Prestige activated! Permanent 2x multiplier gained.");
    }
  };

  document.getElementById("clickMagnetButton").onclick = function () {
    if (count >= 5e9) {
      count -= 5e9;
      autoUpRate *= 2;
      autoUpBetterRate *= 2;
      updateClickCount();
      this.disabled = true;
      this.textContent = "Click Magnet (Active)";
    }
  };

  document.getElementById("cosmicUpgradeButton").onclick = function () {
    if (count >= 1e10) {
      count -= 1e10;
      clickMultiplier *= 100;
      autoUpRate += 1000;
      autoUpBetterRate += 5000;
      updateClickCount();
      this.disabled = true;
      this.textContent = "Cosmic Upgrade (MAXED)";
    }
  };

  // Main click
  button.onclick = function () {
    if (goldenFingerActive) {
      count += 10000 * prestigeMultiplier;
    } else {
      count += clickMultiplier * prestigeMultiplier;
    }
    updateClickCount();
  };
})();
