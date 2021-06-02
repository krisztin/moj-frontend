function Copy($module) {
  this.$module = $module;
}

Copy.prototype.init = function () {
  let $module = this.$module;
  if (!$module) {
    return;
  }
  let $button = document.createElement("button");
  $button.className = "app-copy-button js-copy-button";
  $button.setAttribute("aria-live", "assertive");
  $button.textContent = "Copy code";

  $module.insertBefore($button, $module.firstChild);
  this.copyAction();
};

Copy.prototype.copyAction = function () {
  // Copy to clipboard
  try {
    new ClipboardJS(".js-copy-button", {
      target: function (trigger) {
        return trigger.nextElementSibling;
      },
    }).on("success", function (e) {
      e.trigger.textContent = "Code copied";
      e.clearSelection();
      setTimeout(function () {
        e.trigger.textContent = "Copy code";
      }, 5000);
    });
  } catch (err) {
    if (err) {
      console.log(err.message);
    }
  }
};

window.Copy = Copy;
