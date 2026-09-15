// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  window.gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  if (window.ThemeArcade) window.ThemeArcade.attachManager(window.gameManager);
});
