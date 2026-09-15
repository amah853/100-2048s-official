(function () {
  var art = {
    Transport: { image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/ae79c964c9d7" },
    People: { image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/37939bbacd81" },
    Food: { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/0877df9cc836" },
    Games: { image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/adc38448a05e" },
    Visuals: { image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/cb58502866ab" },
    Animals: { image: "https://images.unsplash.com/photo-1600010649263-68feafeeb74f?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/68feafeeb74f" },
    Chaos: { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/b586d89ba3ee" },
    Science: { image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/b23d57bd21aa" },
    Tech: { image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/10a22c95931a" },
    Sports: { image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/ffe607ba8211" },
    Nature: { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/c6227db76b6e" },
    Culture: { image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/7a46d19cd819" },
    Home: { image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=85", credit: "https://unsplash.com/photos/866a91353ca9" }
  };

  var worldSeeds = [
    ["Cars", "Transport", "#ff825e"], ["Celebrities", "People", "#d6ff5c"], ["Cupcakes", "Food", "#ff9eb5"], ["Video game characters", "Games", "#8c7bff"], ["Colors", "Visuals", "#7db6ff"], ["Food", "Food", "#ffb14e"], ["Desserts", "Food", "#ffcf5b"], ["Overwatch", "Games", "#f99b38"], ["Raccoons", "Animals", "#9ec6a8"], ["Everything", "Chaos", "#d6ff5c"],
    ["Dogs", "Animals", "#e8b47a"], ["Cats", "Animals", "#ffab8f"], ["Birds", "Animals", "#6bd5c8"], ["Ocean animals", "Animals", "#32b6d1"], ["Dinosaurs", "Animals", "#82c85b"], ["Space", "Science", "#8c7bff"], ["Planets", "Science", "#9d8de1"], ["Stars", "Science", "#ffd152"], ["Robots", "Tech", "#83c0d6"], ["Monsters", "Games", "#d66bff"],
    ["Minecraft mobs", "Games", "#78d47b"], ["Pokemon", "Games", "#ffcb45"], ["Nintendo", "Games", "#ea5c5c"], ["Sonic", "Games", "#4c9cf0"], ["Zelda", "Games", "#a4d36b"], ["Mario Kart", "Games", "#ef5757"], ["Animal Crossing", "Games", "#8fcf93"], ["Minecraft blocks", "Games", "#b8895b"], ["Retro consoles", "Games", "#b077f2"], ["Arcade classics", "Games", "#ff7b8b"],
    ["Pizzas", "Food", "#ef6f53"], ["Tacos", "Food", "#f6c454"], ["Sushi", "Food", "#ff8a8a"], ["Burgers", "Food", "#d99b5c"], ["Ramen", "Food", "#e8a154"], ["Breakfast", "Food", "#f3d168"], ["Fruit", "Food", "#6fce71"], ["Vegetables", "Food", "#8acc57"], ["Snacks", "Food", "#f0bb68"], ["Drinks", "Food", "#cd88df"],
    ["Burgers and fries", "Food", "#ed9e4f"], ["Coffee", "Food", "#bd8b6e"], ["Ice cream", "Food", "#f1a7e1"], ["Cookies", "Food", "#d59b70"], ["Donuts", "Food", "#f08cb6"], ["Candy", "Food", "#ff6c9c"], ["Pies", "Food", "#d99376"], ["Breads", "Food", "#dca35d"], ["Cheeses", "Food", "#f6ce5b"], ["Hot sauce", "Food", "#ef534d"],
    ["Skateboards", "Sports", "#7fbcf6"], ["Basketball", "Sports", "#e58c44"], ["Soccer", "Sports", "#d8d8d0"], ["Baseball", "Sports", "#bfc6ce"], ["Football", "Sports", "#9a6e50"], ["Tennis", "Sports", "#b4df4d"], ["Skis", "Sports", "#8fcef1"], ["Surfing", "Sports", "#4dcad4"], ["Gymnastics", "Sports", "#f09bc0"], ["Bikes", "Sports", "#69c489"],
    ["Flowers", "Nature", "#f19aba"], ["Trees", "Nature", "#69b77c"], ["Mushrooms", "Nature", "#e86d6d"], ["Weather", "Nature", "#7bbbed"], ["Volcanoes", "Nature", "#ea654f"], ["Mountains", "Nature", "#8bb4c7"], ["Desert", "Nature", "#e2ae69"], ["Jungle", "Nature", "#66bc8f"], ["Beaches", "Nature", "#6fd2da"], ["Camping", "Nature", "#8cb980"],
    ["Music", "Culture", "#9c82e4"], ["Instruments", "Culture", "#df8b5f"], ["Movies", "Culture", "#d76d76"], ["Books", "Culture", "#b89470"], ["Art supplies", "Culture", "#f08e63"], ["Comics", "Culture", "#e75c6c"], ["Magic", "Culture", "#b47ae7"], ["Travel", "Culture", "#6cb9dc"], ["Fashion", "Culture", "#f181a8"], ["Photography", "Culture", "#a3b4bc"],
    ["Planets and moons", "Science", "#8e93eb"], ["Chemistry", "Science", "#6dd0af"], ["Biology", "Science", "#6fbee3"], ["Math", "Science", "#d6ff5c"], ["Weather science", "Science", "#89a6ed"], ["Dinosaur fossils", "Science", "#d2b37c"], ["Oceans", "Science", "#48c5db"], ["Volcano science", "Science", "#f07e55"], ["Microscopes", "Science", "#86c9b3"], ["Space suits", "Science", "#90b5e9"],
    ["House plants", "Home", "#78bf8e"], ["Furniture", "Home", "#d19572"], ["Tools", "Home", "#d8a343"], ["Kitchen", "Home", "#e2bf5e"], ["Stationery", "Home", "#f09c62"], ["Clocks", "Home", "#f2bc59"], ["Toys", "Home", "#dc8cab"], ["Keys", "Home", "#e3ad4b"], ["Lights", "Home", "#e7d16a"], ["Balloons", "Home", "#ee7084"]
  ];

  var worlds = worldSeeds.map(function (seed, index) {
    return { id: "world-" + (index + 1), number: index + 1, name: seed[0], category: seed[1], accent: seed[2], image: art[seed[1]].image, credit: art[seed[1]].credit };
  });
  var active = worlds[0];
  var gameManager = null;
  var worldGrid = document.getElementById("world-grid");
  var worldSearch = document.getElementById("world-search");

  function restoreTheme() {
    try {
      var savedId = window.localStorage.getItem("100-2048s-active-world");
      var saved = worlds.filter(function (world) { return world.id === savedId; })[0];
      if (saved) active = saved;
    } catch (error) { /* Storage may be disabled. */ }
  }

  function rememberTheme() {
    try { window.localStorage.setItem("100-2048s-active-world", active.id); } catch (error) { /* Storage may be disabled. */ }
  }

  function applyTheme() {
    document.body.classList.add("image-world");
    document.documentElement.style.setProperty("--world-accent", active.accent);
    document.documentElement.style.setProperty("--world-photo", "url(\"" + active.image + "\")");
    document.getElementById("world-label").textContent = "WORLD " + String(active.number).padStart(2, "0") + " / 100";
    document.getElementById("world-name").textContent = active.name;
    document.getElementById("game-intro").innerHTML = "Merge matching <strong>" + active.name + "</strong> image tiles and get to the <strong>2048 tile!</strong>";
    document.title = active.name + " 2048 — 100 2048s";
  }

  function renderWorlds(query) {
    var normalized = (query || "").trim().toLowerCase();
    var visible = worlds.filter(function (world) { return !normalized || (world.name + " " + world.category).toLowerCase().indexOf(normalized) !== -1; });
    document.getElementById("world-count").textContent = visible.length + (visible.length === 1 ? " world" : " worlds");
    worldGrid.innerHTML = "";
    if (!visible.length) {
      worldGrid.innerHTML = '<div class="world-empty">No worlds found. Try a different thing.</div>';
      return;
    }
    visible.forEach(function (world) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "world-card" + (world.id === active.id ? " is-active" : "");
      card.style.setProperty("--world-card-accent", world.accent);
      card.setAttribute("aria-pressed", world.id === active.id ? "true" : "false");
      card.setAttribute("aria-label", "Play " + world.name + " 2048");
      card.innerHTML = '<img src="' + world.image + '" alt="" loading="lazy"><span class="world-card-copy"><span class="world-card-number">WORLD ' + String(world.number).padStart(2, "0") + '</span><span class="world-card-name">' + world.name + "</span></span>";
      card.addEventListener("click", function () { chooseWorld(world.id); });
      worldGrid.appendChild(card);
    });
  }

  function chooseWorld(id) {
    var selected = worlds.filter(function (world) { return world.id === id; })[0];
    if (!selected || selected.id === active.id) return;
    active = selected;
    rememberTheme();
    applyTheme();
    renderWorlds(worldSearch.value);
    if (gameManager) {
      gameManager.storage = new LocalStorageManager();
      gameManager.setup();
    }
    document.getElementById("game").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  restoreTheme();
  applyTheme();
  renderWorlds("");
  worldSearch.addEventListener("input", function () { renderWorlds(worldSearch.value); });

  window.ThemeArcade = {
    getActive: function () { return active; },
    getActiveId: function () { return active.id; },
    attachManager: function (manager) { gameManager = manager; },
    chooseWorld: chooseWorld
  };
}());
