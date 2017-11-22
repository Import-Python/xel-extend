/**

XEL-EXTEND by Brendan Fuller (Import-Python)
 - A class base way of extending Xel-toolkit
**/

'use strict';


class Icon {
  constructor(element) {
    this.me = element
  }
  setIcon(icon) {
    me.setAttribute("name", icon)
  }
  hide() {
    this.me.style.display = "none"
  }
  show() {
    this.me.style.display = "block"
  }
}

class Label {
  constructor(element) {
    this.me = element
  }
  appenedHTML(html) {
    this.me.insertAdjacentHTML('beforeend', html)
  }
  set value(html) {
    this.me.innerHTML = html
  }
  get value() {
    return this.me.innerHTML
  }
  setAttribute(item, data) {
    this.me.setAttribute(item, data)
  }
  hide() {
    this.me.style.display = "none"
  }
  show() {
    this.me.style.display = "block"
  }
}
class Stepper {
  constructor(element) {
    this.me = element
  }
  setDisabled(bool) {
    this.me.disabled = bool
  }
  onUpEvent(ev, func) {
    this.up = this.me.querySelector("#increment-button")
    this.up.addEventListener(ev, func)
  }
  onDownEvent(ev, func) {
    this.down = this.me.querySelector("#decrement-button")
    this.me.addEventListener()
  }
  hide() {
    this.me.style.display = "none"
  }
  show() {
    this.me.style.display = "block"
  }
}
class Card {
  constructor(element) {
    this.me = element
  }
  setAttribute(item, data) {
    this.me.setAttribute(item, data)
  }
  hide() {
    this.me.style.display = "none"
  }
  show() {
    this.me.style.display = "block"
  }
}
class Button {
  constructor(element) {
    this.me = element
  }
  setDisabled(bool) {
    this.me.disabled = bool
  }
  setAttribute(item, data) {
    this.me.setAttribute(item, data)
  }
  setHTML(html) {
    this.me.innerHTML = html
  }
  appenedHTML(html) {
    this.me.insertAdjacentHTML('beforeend', html)
  }
  hide() {
    this.me.style.display = "none"
  }
  show() {
    this.me.style.display = "block"
  }
  onClick(func) {
    this.me.addEventListener("click", func)
  }
}
class Buttons {
  constructor(element = 0) {
    this.me = element
  }
  setDisabled(bool) {
    this.me.disabled = bool
  }
  setTracking(type) {
    this.me.setAttribute("data-tracking", type)
  }
  listButtons() {
    var buttons = this.me.querySelectorAll('x-buttons')
    return buttons
  }
  hide() {
    this.me.style.display = "none"
  }
  show() {
    this.me.style.display = "block"
  }
}
class Tabs { }
/*---------------------------------------------------*/
class MenuTabs {
  constructor(element) {
    this.me = document.querySelector(element)
    this.name = element

    this.tabs = {}

    this.amount = 0
    this.btn_new = this.me._shadowRoot.querySelector("#open-button")

    this.hasOpened = {}

    this.hasClosed = {}
    this.hasClick = {}

    this.lastSelectedTab = ""
  }
  setupTabs() {
    var tabs = this.me.querySelectorAll('x-doctab')
    for (var i = 0; i < tabs.length; ++i) {
      var tab = tabs[i]
      var id = tab.getAttribute("data-id")
      var name = this.name.replace('#', '')
      this.lastSelectedTab = id
      if (id == null) {
        id = (name + "-" + String(i))
        tab.setAttribute("data-id", id)
      }
      this.tabs[id] = (tab);
      if (this.tabClick != undefined) {
        this._addTabClickEvent()
      }
      if (this.tabClose != undefined) {
        this._addTabCloseEvent()
      }
    }
  }
  onNew(func) {
    var main = this
    var newEvent = function () {
      main._addTab()
      func(null)
    }
    this.onNewFunc = func
    this.btn_new.addEventListener('click', newEvent)
  }
  onTabClick(func) {
    this.tabClick = func
    this._addTabClickEvent()
  }
  onTabClose(func) {
    this.tabClose = func;
    this._addTabCloseEvent()
  }
  addTab(id, type = null) {
    this.me.insertAdjacentHTML('beforeend', '<x-doctab selected=""><x-label>Untitled</x-label></x-doctab>')
    this._removeSelected()
    this._addTab(id)
    var main = this
    var func = this.onNewFunc
    var newTab = function () {
      func(type)
    }
    newTab.call()
  }
  addBlankTab() {
    this.me.insertAdjacentHTML('beforeend', '<x-doctab selected=""><x-label>Untitled</x-label></x-doctab>')
  }
  setName(tab, name) {
    if (this._isTab(tab)) {
      var lbl = tab.querySelector("x-label");
      lbl.innerHTML = name
    }
  }
  setIcon(tab, name) {
    if (this._isTab(tab)) {
      var icon = tab.querySelector("x-icon");
      if (icon == null) {
        tab.insertAdjacentHTML('afterbegin', `<x-icon name="${name}"></x-icon>`)
      } else {
        icon.setAttribute("name", name)
      }
    }
  }
  getName(tab) {
    if (this._isTab(tab)) {
      var lbl = tab.querySelector("x-label")
      return lbl.innerHTML
    } else {
      return null
    }
  }
  getID(tab) {
    if (this._isTab(tab)) {
      var id = String(tab.getAttribute('data-id'))
      return id
    } else {
      return null
    }
  }
  setThisName(name) {
    var tab = this.getSelectedTab();
    this.setName(tab, name)
  }
  setSelectedTab(id) {
    var selected = this.getSelectedTab()
    selected.removeAttribute("selected")
    var tab = this.tabs[id]
    tab.setAttribute("selected", true)
    this.lastSelectedTab = id
  }
  setSelectedEdited(boolean) {
    var selected = this.getSelectedTab()
    if (boolean == false) {
      selected.removeAttribute("edited")
    } else {
      selected.setAttribute("edited", true)
    }
  }
  getSelectedTab() {
    var tabs = this.me.querySelectorAll("x-doctab")
    if (tabs.length == 1) {
      var tab = this.me.querySelector("x-doctab")
      tab.setAttribute("selected", true)
      return tab
    }
    return this.me.querySelector("x-doctab[selected]");
  }
  getSelectedTabID() {
    var sel = this.me.querySelector("x-doctab[selected]");
    return this._getIDByTab(sel)
  }
  removeLastTab() {
    delete this.tabs[this.tabs.length - 1]
  }
  getTabByID(id) {
    var tab = this.tabs[id]
    if (tab != null) {
      return tab
    }
    return null
  }
  changeID(id, old) {
    if (this.tabs[old] != null) {
      this.tabs[id] = this.tabs[old]
      delete this.tabs[old]
      this.tabs[id].setAttribute("data-id", id)
    }
  }
  end(tab) {
    var id = this._getIDByTab(tab)
    this.tabs[id] = null
    this.hasClick[id] = null
    this.hasClosed[id] = null
    tab.ownerTabs.closeTab(tab)
  }
  getLastSelectedTab() {
    return this.lastSelectedTab
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  _isTab(tab) {
    var pass = false
    for (var key in this.tabs) {
      if (this.tabs[key] == tab) {
        pass = true
      }
    }
    if (pass != null) {
      return true
    } else {
      return false
    }
  }
  _addTab(id) {
    this.tabs[id] = this.getSelectedTab()
    var tab = this.getSelectedTab()
    tab.setAttribute("data-id", id)
    if (this.tabClick != undefined) {
      this._addTabClickEvent()
    }
    if (this.tabClose != undefined) {
      this._addTabCloseEvent()
    }
    this.lastSelectedTab = id
  }
  _getLastTab() {
    return this.tabs[this.tabs.length - 1]
  }
  _getIDByTab(tab) {
    for (var key in this.tabs) {
      if (this.tabs[key] == tab) {
        return key
      }
    }
    return null
  }
  _removeSelected() {
    var selected = this.getSelectedTab()
    selected.removeAttribute("selected")
  }
  _addTabClickEvent() {
    var me = this
    for (var key in this.tabs) {
      let tab = this.tabs[key]
      if (!this._clickEventAdded(tab) && tab != undefined) {
        let func = this.tabClick
        var tabClick = function () {
          var id = me._getIDByTab(tab)
          func(id)
          me.lastSelectedTab = id
        }
        this.tabs[key].addEventListener("pointerdown", tabClick)
        this.hasClick[key] = tab
      }
    }
  }

  /**
  Added closed event to tabs not already having the event
  **/
  _addTabCloseEvent() {
    var me = this
    for (var key in this.tabs) {
      let tab = this.tabs[key]
      if (!this._closeEventAdded(tab) && tab != undefined) {
        let func = this.tabClose
        var tabClose = function () {
          var id = me._getIDByTab(tab)
          func(id)
        }
        tab._onCloseButtonClick = function () { }
        var btn = tab._shadowRoot.querySelector("#close-button");
        btn.addEventListener("click", tabClose)
        this.hasClosed[key] = tab
      }
    }
  }
  _closeEventAdded(tab) {
    for (var key in this.hasClosed) {
      if (tab == this.hasClosed[key]) {
        return true
      }
    }
    return false
  }
  _clickEventAdded(tab) {
    for (var key in this.hasClick) {
      if (tab == this.hasClick[key]) {
        return true
      }
    }
    return false
  }
  hideButton() {
    this.btn_new.style.display = "none"
  }
}
/*---------------------------------------------------*/

class MenuItem {
  constructor(element, ex = false) {
    if (ex == false) {
      this.me = document.querySelector(element)
      this.shortcut = this.me.querySelector("x-shortcut")
    } else {
      this.me = element
    }
  }
  onClick(func) {
    this.me.addEventListener("click", func);
    this.shortcut = this.me.querySelector("x-shortcut")
    if (this.shortcut != null && this.shortcut != undefined) {
      this._addShortcut(func)
    }
  }
  setTitle(html) {
    var label = this.me.querySelector("x-label")
    if (label == null) {
      this.me.insertAdjacentHTML("beforeend", `<x-label>${html}</x-label>`)
    } else {
      label.innerHTML = html
    }
  }
  setIcon(name) {
    var icon = this.me.querySelector("x-icon")
    if (icon == null) {
      this.me.insertAdjacentHTML("afterbegin", `<x-icon name="${name}"></x-icon>`)
    } else {
      icon.setAttribute("name", name)
    }
  }
  remove() {
    this.me.remove()
  }
  _addShortcut(func) {
    var ctrl = false
    var alt = false

    if (this.shortcut.getAttribute("ctrl") != null) {
      ctrl = true
    }
    if (this.shortcut.getAttribute("alt") != null) {
      alt = true
    }
    var key = this.shortcut.getAttribute("key").toLowerCase()
    var funcShortcut = function (event) {
      if (ctrl && event.ctrlKey && event.key == key) {
        func()
      }
      if (alt && event.altKey && event.key == key) {
        func()
      }
    }
    window.addEventListener("keydown", (event) => funcShortcut(event))
  }
}
class ContextMenu {
  constructor(element = null) {
    if (element != null) {
      this.me = document.querySelector(element)
      this.html = this.me.innerHTML
    } else {
      this.me = null
    }
  }
  open() {
    this.me.open()
  }
  close() {
    this.me.close()
  }
  openTemp(func) {
    var body = document.querySelector("body")
    if (this.me != null) {
      this.me.insertAdjacentHTML('afterend', '<x-contextmenu id="temp-contextmenu"></x-contextmenu>')
    } else {
      body.insertAdjacentHTML('afterbegin', '<x-contextmenu id="temp-contextmenu"><x-menu opened></x-menu></x-contextmenu>')
    }
    var context = document.querySelector("#temp-contextmenu")
    if (this.me != null) {
      context.innerHTML = this.html;
    }
    var menu = context.querySelector("x-menu")
    menu.removeAttribute("opened");
    var menu_items = menu.querySelectorAll("x-menuitem")
    var menu_objects = {}

    for (var i = 0; i < menu_items.length; ++i) {
      var id = menu_items[i].getAttribute("data-id") //Custom ID
      menu_objects[String(id)] = new MenuItem(menu_items[i], true)
    }
    var temp = {}
    temp.addItemBelow = function (id) {
      menu.insertAdjacentHTML('beforeend', "<x-menuitem></x-menuitem>")
      var nodes = menu.querySelectorAll('x-menuitem')
      var last = nodes[nodes.length - 1]
      var obj = new MenuItem(last, true)
      return obj
    }
    temp.addInput = function () {
      menu.insertAdjacentHTML('beforeend', '<x-input style="margin-left: 15px;"></x-input>')
    }
    temp.addItemAbove = function (id) {
      menu.insertAdjacentHTML('afterbegin', "<x-menuitem></x-menuitem>")
      var nodes = menu.querySelectorAll('x-menuitem')
      var first = nodes[0]
      var obj = new MenuItem(first, true)
      return obj
    }
    temp.addSepAbove = function () {
      menu.insertAdjacentHTML('afterbegin', "<hr>")
    }
    temp.addSepBelow = function () {
      menu.insertAdjacentHTML('beforeend', "<hr>")
    }
    temp.close = function () {
      context.close()
    }
    var run = function () {
      func(temp, menu_objects)
    }
    run.call()
    context.open(event.clientX, event.clientY);

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (context != null) {
          if (mutation.type == "attributes") {
            context.close()
            context.style.display = "none"
            setTimeout(function () {
              context.remove()
              var body
            }, 1000)
          }
        }
      });
    });
    window
    obs.observe(menu, { attributes: true })
  }
}
/**---------------------------------*/
class Dialog {
  constructor(element) {
    if (element != null) {
      this.dialog = element
    } else {
      this.id = this._getID()
      document.querySelector("body").insertAdjacentHTML("beforeend", `<x-dialog id="dialog-${this.id}"></x-dialog>`)
      this.dialog = document.querySelector("body").querySelector(`#dialog-${this.id}`)
    }
  }
  //Open the dialog
  open() {
    this.dialog.opened = true
  }
  //Close the dialog
  close() {
    this.dialog._close()
  }
  //Return opened
  get() {
    return this.dialog.opened
  }
  remove() {
    this.dialog.remove()
  }
  setTop(percent) {
    this.dialog.style.top = percent
  }
  //Disabled close of dialog with overlay
  disableOverlayClose() {
    this.dialog._onOverlayClick = () => { }
  }
  onOverlay(func) {
    this.dialog._onOverlayClick = func;
  }
  onEscape(func) {
    this.dialog._onKeyDown = () => { };
    this.escapeFunc = func;
    this.dialog.addEventListener("keydown", (event) => this._onKeyDown(event));
  }
  /**  'Private' Methods **/
  _getID() {
    return ([1e7] + 1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
  _onKeyDown(event) {
    if (event.key === "Escape") {
      this.escapeFunc.call();
    }
    if (event.key === "Tab") {
      // Prevent user from moving focus outside the dialog
      let focusableElements = [...this.dialog.querySelectorAll("*")].filter($0 => $0.tabIndex >= 0);
      if (focusableElements.length > 0) {
        let firstFocusableElement = focusableElements[0]
        let lastFocusableElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey === false) {
          if (event.target === lastFocusableElement) {
            event.preventDefault()
            firstFocusableElement.focus()
          }
        }
        else if (event.shiftKey === true) {
          if (event.target === firstFocusableElement) {
            event.preventDefault()
            lastFocusableElement.focus()
          }
        }
      } else {
        event.preventDefault()
      }
    }
  }
}
class Drawer {
  constructor() {
    this.id = this._getID()
    document.querySelector("body").insertAdjacentHTML("beforeend", `<x-drawer id="drawer-${this.id}"></x-drawer>`)
    this.drawer = document.querySelector("body").querySelector(`#drawer-${this.id}`)
  }
  setPosition(value) {
    this.drawer.setAttribute("position", value)
  }
  open() {
    this.drawer.opened = true
  }
  close() {
    this.drawer.opened = false
  }
  _getID() {
    return ([1e7] + 1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}
class Popover { }

/**---------------------------------*/
class CheckBox { }
class Radio { }
class Switch { }
class Select {
  constructor(element) {
    this.me = element
    this.menu = this.me.querySelector("x-menu")
    this.items = {}
  }
  addItem(value, name, icon = null, selected = false) {
    if (this.items[value] == null) {
      this.menu.insertAdjacentHTML("beforeend", `<x-menuitem></x-menuitem>`)
      var item = this.me.querySelectorAll("x-menuitem")
      var last = item[item.length - 1]
      this.items[value] = new MenuItem(last, true)
      this.items[value].setTitle(name)

      if (icon != null) {
        this.items[value].setIcon(icon)
      }
      if (selected == true) {
        last.setAttribute("selected", true)
      }
      last.setAttribute("value", value)
    }
  }
  removeAllItems() {
    for (var key in this.items) {
      this.items[key].remove()
      delete this.items[key]
    }
  }
  setSelected(value) {
    var selected = this.menu.querySelector("x-menuitem[selected]")
    selected.removeAttribute("selected")
    if (this.items[value] != null) {
      this.items[value].me.setAttribute("selected", true)
    }
  }
  get value() {
    return this.me.value
  }
  onChange(func) {
    this.me.addEventListener("change", func, true)
  }

}
class ColorSelect { }
class Input {
  constructor(element) {
    this.me = element

    this.input = this.me._shadowRoot.querySelector("#input")
    var me = this
    this.input.addEventListener("input", () => {
      me.me._updateInvalidState()
    }, true)
  }
  clear() {
    this.me.value = ""
  }
  get value() {
    return this.me.value
  }
  set value(data) {
    this.me.value = data
  }
  setHidden(data) {
    var lbl = this.me.querySelector("x-label")
    lbl.innerHTML = data
  }
  setMaxLength(length) {
    this.input.setAttribute("maxlength", length)
  }
  setMinLength(length) {
    this.me.setAttribute("minlength", length)
  }
  onInput(func) {
    this.input.addEventListener("input", func, true)
  }
  setHint(hint) {
    this.me.setAttribute("invalid", "");
    this.me.setAttribute("invalid-hint", hint);
  }
}
class InputNumber {
  constructor(element) {
    this.me = element
  }
  clearIt() {
    this.me.value = null
  }
  get() {
    return this.me.value
  }
  onChange(func) {
    this.me.addEventListener("change", (event) => func(event))
  }
}
class TextArea { }
class Slider { }
/**---------------------------------*/

class ProgressBar { }
class Throbber { }
/**------------------ Electron Based Classes (for XEL)---------------**/
class Window {
  constructor(id) {
    this.win = BrowserWindow.fromId(parseInt(id))
    this.id = id
  }
  maximize() {
    this.win.maximize();
  }
  unmaximize() {
    this.win.unmaximize();
  }
  minimize() {
    this.win.minimize();
  }
  addMaximizeListener(func) {
    this.win.on('maximize', func)
  }
  addUnmaximizeListener(func) {
    this.win.on('unmaximize', func)
  }
  addResizeListener(func) {
    this.win.on('resize', func)
  }
  close() {
    this.win.close();
  }
}
class TitleMenubar extends Window {
  constructor(id, element) {
    super(id)
    console.log("TITLE_ID: " + this.id)
    this.me = document.querySelector(element)

    this.me.insertAdjacentHTML('beforeend', `<x-box class="x-menu-right" style="-webkit-app-region: none;"></x-box>`)
    var boxes = this.me.querySelectorAll("x-box")
    this.box = boxes[boxes.length - 1]

    this.zoom = false;
    this.minimize = false; this.close = false;

    this.sized = false;
  }
  addClose() {
    this.close = true;
  }
  addZoom() {
    this.zoom = true;
  }
  addMinimize() {
    this.minimize = true
  }
  build() {
    var _this = this;
    if (this.minimize) {
      this.box.insertAdjacentHTML('beforeend', `  <x-menuitem class="x-menuitem x-menuitem-right x-minimize">
            <x-icon name="remove" class="x-icon"></x-icon>
        </x-menuitem>`)
      var items = this.box.querySelectorAll('x-menuitem');
      this.minimizeBtn = items[items.length - 1]
      this.minimizeBtn.addEventListener('click', (e) => {
        _this.win.minimize();
      });
    }
    if (this.zoom) {
      this.box.insertAdjacentHTML('beforeend', `<x-menuitem class="x-menuitem x-menuitem-right x-zoom">
            <x-icon name="fullscreen" class="x-icon"></x-icon>
            <x-icon name="fullscreen-exit" class="x-icon"></x-icon>
        </x-menuitem>`)
      var items = this.box.querySelectorAll('x-menuitem')
      this.zoomBtn = items[items.length - 1]
      var icons = this.zoomBtn.querySelectorAll('x-icon')
      this.zoomFullBtn = icons[0]
      this.zoomExitBtn = icons[1]
      this.zoomBtn.addEventListener('click', (e) => {
        _this._toggle()
        _this._updateIcon()
      });
      this._updateIcon()
    }
    if (this.close) {
      this.box.insertAdjacentHTML('beforeend', `  <x-menuitem class="x-menuitem x-menuitem-right x-close">
          <x-icon name="clear" class="x-icon"></x-icon>
      </x-menuitem>`)
      var items = this.box.querySelectorAll('x-menuitem');
      this.closeBtn = items[items.length - 1]
      this.closeBtn.addEventListener('click', (e) => {
        _this.win.close()
      });
    }
    this.win.on('unmaximize', (event) => {
      _this.sized = false
      _this._updateIcon()

    })
    this.win.on('maximize', (event) => {
      _this.sized = true
      _this._updateIcon()
    })
  }
  _toggle() {
    if (this.sized == false) {
      super.maximize()
      this.sized = true;
    } else {
      super.unmaximize()
      this.sized = false;
    }
  }
  _updateIcon() {
    if (this.zoom) {
      if (this.sized == false) {
        this.zoomExitBtn.style.display = "none"
        this.zoomFullBtn.style.display = "block"
      } else {
        this.zoomExitBtn.style.display = "block"
        this.zoomFullBtn.style.display = "none"
      }
    }
  }
}


class TreeNode {
  constructor(element, parent, id) {
    this.me = element
    this.parent = parent
    //Store node-id, id and allow of its nodes
    this.id = id
    this.nodes = {}
    //Setup the main elements
    this._setup()
  }
  //Addes a node to this current node
  addNode(id) {
    this._hasList()
    this.ul.insertAdjacentHTML('beforeend', `<li class="single" id="${this._getID()}-${id}"></li>`)
    var nodes = this.ul.querySelectorAll('li')
    var last = nodes[nodes.length - 1]
    var subNode = new TreeNode(last, this, id)
    this.nodes[id] = subNode
    return subNode
  }
  changeID(id) {
    var old = this.id
    if (!this.parent._isNode(id)) {
      this.id = id
      this.parent._changeID(id, old)
      this._updateID()
      for (var key in this.nodes) {
        this.nodes[key]._updateID()
      }
    }
  }
  //Set an icon to this current node
  setIcon(icon) {
    this.attr_icon = icon
    if (this.icon == null) {
      //Add the icon after the visual (chevron)
      this.visual_hidden.insertAdjacentHTML('afterend', `<x-icon name="${icon}"id="icon"></x-icon>`)
      this.icon = this.box.querySelector("#icon")
    } else {
      this.me.setAttribute("name", icon)
    }
  }
  //Set a title to the current node (html/text)
  setTitle(html) {
    this.attr_title = html
    this.title.innerHTML = "\xa0" + html
  }
  getTitle() {
    return this.attr_title
  }
  //Set a color to the current node
  setColor(color) {
    this.attr_color = color
    this.box.style.color = color
  }
  removeColor() {
    this.box.style.color = null
  }
  setNoSort() {
    this.me.setAttribute("no-sort", true)
  }
  //Add an event click to the current node (left)
  onClick(func) {
    this.box.addEventListener("click", func)
  }
  //Add a right click event (contextmenu) for current node
  onContextMenu(func) {
    this.box.addEventListener("contextmenu", func)

  }
  remove() {
    this.parent._remove(this.id)
    this.me.remove()
  }
  getIcon() {
    return this.icon.getAttribute("name");
  }
  open() {
    this.visual_expand.style.display = "block"
    this.visual_hidden.style.display = "none"
    this.ul.classList.remove("hidden") //Remove the hidde class
    this.open = true
  }
  close() {
    this.visual_expand.style.display = "none"
    this.visual_hidden.style.display = "block"
    this.ul.classList.add("hidden") //Add a hidden class
    this.open = false
  }
  //PRIVATE FUNCTIONS/METHODS
  _remove(id) {
    delete this.nodes[id]
  }
  _isNode(id) {
    if (this.nodes[id] != null) {
      return true
    }
    return false
  }
  _changeID(to, from) {
    if (this.nodes[to] != null && this.nodes[from] != null) {
      this.nodes[to] = this.nodes[from]
      delete this.nodes[from]
    }
  }
  _getID() {
    return this.parent._getID() + "-" + this.id
  }
  _updateID() {
    this.me.id = this._getID()
  }
  _hasList() {
    //Check if this node has a unordered list, because if not create one for addtional nodes
    if (this.ul == null) {
      this.me.insertAdjacentHTML('beforeend', "<ul></ul>") // Add ul tags to this element
      this.ul = this.me.querySelector("ul")  //Select the ul tag
      this.me.classList.remove("single") //Remove the single class
      this.me.classList.add("mutiple") //Add mutiple class
      var this_ = this //Make a local this for use in the listener below
      this.open = true //Add an open variable to tell the state of this
      //Add an event for when click open and or close this node tree view
      this.box.addEventListener('click', () => {
        if (this_.open == true) {
          //Change the visal icon (chevron in this case to right)
          this_.visual_expand.style.display = "none"
          this_.visual_hidden.style.display = "block"
          this_.ul.classList.add("hidden") //Add a hidden class
          this_.open = false
        } else {
          //Change the visal icon (chevron thats upwards // expand icon)
          this_.visual_expand.style.display = "block"
          this_.visual_hidden.style.display = "none"
          this_.ul.classList.remove("hidden") //Remove the hidde class
          this_.open = true
        }
      });
    }
  }
  //Setups this node (as its a sub node)
  _setup() {
    //Add box to NODE (<li><x-box>...)
    this.me.insertAdjacentHTML('beforeend', "<x-box></x-box>")
    this.box = this.me.querySelector("x-box")

    //Add Visual Icon (chevron) and Title
    this.box.insertAdjacentHTML('beforeend', '<x-label id="visual-expand" class="visual" style="padding-right: 5px"><x-icon name="keyboard-arrow-down"></x-icon></x-label>')
    this.box.insertAdjacentHTML('beforeend', '<x-box id="titleBox"><x-label id="visual-hide" class="visual" style="display: none; padding-right: 5px"><x-icon name="keyboard-arrow-right"></x-icon></x-label><x-label id="title"></x-label></x-box>')

    this.visual_expand = this.box.querySelector("#visual-expand")
    this.visual_hidden = this.box.querySelector("#visual-hide")
    this.title = this.box.querySelector("#title")
    this.title_box = this.box.querySelector("#titleBox")
  }
  //Allow for json of this tree view, usually called on by orginal parent
  _json() {
    var node = {}
    node["node-id"] = this.nid
    node["title"] = this.attr_title
    node["icon"] = this.attr_icon
    node["color"] = this.attr_color
    var sub_nodes = {}
    for (var key in this.nodes) {
      if (this.nodes.hasOwnProperty(key)) {
        sub_nodes[key] = this.nodes[key]._json()
      }
    }
    node["nodes"] = sub_nodes
    return node
  }
  sortList() {
    var list, switching, li, shouldSwitch
    switching = true
    while (switching) {
      switching = false
      li = this.ul.childNodes
      for (var i = 0; i < (li.length - 1); i++) {
        shouldSwitch = false;
        if (li[i].querySelector("x-box > #title").innerHTML.toLowerCase() > li[i + 1].querySelector("x-box > #title").innerHTML.toLowerCase()) {
          if (!li[i].getAttribute("no-sort")) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        li[i].parentNode.insertBefore(li[i + 1], li[i]);
        switching = true;
      }
    }
  }
}
class TreeView {
  constructor(element, id) {
    this.me = document.querySelector(element)
    this.me.classList.add("tree-view")
    this.id = id
    //Add UL to the box
    this.me.insertAdjacentHTML('beforeend', '<ul></ul>')
    this.ul = this.me.querySelector('ul')
    this.nodes = {}
  }
  addNode(id) {
    this.ul.insertAdjacentHTML('beforeend', `<li class="single" id="${this.id}-${id}"></li>`)
    var nodes = this.ul.querySelectorAll('li')
    var last = nodes[nodes.length - 1]
    var subNode = new TreeNode(last, this, id)
    this.nodes[id] = subNode
    return subNode
  }
  _remove(id) {
    delete this.nodes[id]
  }
  _getID() {
    return this.id
  }
  getJson() {
    var nodes = {}
    for (var key in this.nodes) {
      if (this.nodes.hasOwnProperty(key)) {
        nodes[key] = this.nodes[key]._json()
      }
    }
    return nodes
  }
}

class DialogInput {
  constructor() {
    this.id = this._getID()
    let template = `<x-dialog id="dialog-input-${this.id}" class="dialog-input" style="border-radius: 20px;">
        <main>
          <x-label id="dialog-input-title"></x-label>
          <x-box style="margin-top: 5px;">
              <x-input id="dialog-input" value="" style="min-width: 100%; margin-right: 5%;">
                <x-label id="dialog-input-place-holder"></x-label>
              </x-input>
          </x-box>
        </main>
    </x-dialog>`
    document.querySelector("body").insertAdjacentHTML("beforeend", template)
    this.dialog = document.querySelector("body").querySelector(`#dialog-input-${this.id}`)
    this.instance = new Dialog(this.dialog)

    this.input = new Input(this.dialog.querySelector("#dialog-input"))
    this.input.me.addEventListener("keydown", (event) => this._keyDown(event))
  }
  open(obj, valid, done) {
    console.log(obj)
    let me = this
    if (obj.title == undefined) { obj["title"] = "" }
    this.dialog.querySelector("#dialog-input-title").innerHTML = obj.title
    if (obj.value == undefined) { obj["value"] = "" }
    this.input.value = obj.value
    if (obj.max_length == undefined) { obj["min_length"] = "" }
    console.log(obj.min_length)
    this.input.setMinLength(obj.min_length)
    if (obj.max_length == undefined) { obj["max_length"] = "" }
    console.log(obj.max_length)
    this.input.setMaxLength(obj.max_length)
    if (obj.place_holder == undefined) { obj["place_holder"] = "" }
    this.input.setHidden(obj.place_holder)

    this.instance.open()

    var validate = {}
    validate.status = false
    validate.hint = ""

    var data = {}
    data.dialog = this.instance
    data.input = this.input

    let onInput = () => {
      var check = valid(data)
      validate.status = check.status
      validate.hint = check.hint
      if (!validate.status) {
        me.input.setHint(validate.hint)
      }
    }
    this.input.onInput(() => {
      onInput()
    })
    var onKeyDown = (event) => {
      if (event.key == "Enter") {
        onInput()
        var pass = true
        if (obj.min_length != "") {
          if (me.input.value.length < obj.min_length) {
            pass = false
          }
        } else {
        }
        if (pass && validate.status) {
          done(data)
          me.instance.close()
        }
      }
    }
    this._keyDown = onKeyDown
  }
  _keyDown(event) { }
  _getID() {
    return ([1e7] + 1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}
class Prompt extends Drawer {
  constructor() {
    super()
    this.drawer.innerHTML = `
    <x-label class="size-40 center" style="height: 30px; margin-top: 60px" id="title"></x-label>
    <div style="height: 100%;padding: 0;margin: 0;display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;align-items: center;justify-content: center;">
        <x-box>
            <x-button id="yes" class="size-40 fg-black bg-green bold" style="margin-left: 15px">
                <x-label>Yes</x-label>
            </x-button>
            <x-button id="no" class="size-40 fg-black bg-red bold" style="margin-left: 15px">
                <x-label>No</x-label>
            </x-button>
            <x-button id="cancel" class="size-40 fg-black bg-orange bold" style="margin-left: 15px">
                <x-label>Cancel</x-label>
            </x-button>
        </x-box>
    </div>
    `;
    this.setPosition("top")

    let me = this //Refrence of THIS object

    //Store all used elements in variables
    this.title = this.drawer.querySelector("#title")
    this.btnYes = this.drawer.querySelector("#yes") 
    this.btnNo = this.drawer.querySelector("#no")
    this.btnCancel = this.drawer.querySelector("#cancel")


    // If CANCEL button is click, just close the dialog
    this.btnCancel.addEventListener("click", () => {
      me.close()
    })
    this.btnYes.addEventListener("click", () => {
      me._finished(true)
      me.close()
    })
    this.btnNo.addEventListener("click", () => {
      me._finished(false)
      me.close()
    })
  }
  /* Shows the Drawer */
  show(question, complete) {
    this.open()
    this.title.innerHTML = question
    this._finished = complete
  }
  /* Internal method that's repalced by users method */
  _finished(response) {}
}

module.exports = {
  Window: Window,
  TitleMenubar: TitleMenubar,
  Dialog: Dialog,
  Select: Select,
  Input: Input,
  InputNumber: InputNumber,
  Button: Button,
  Drawer: Drawer,
  MenuItem: MenuItem,
  MenuTabs: MenuTabs,
  Tabs: Tabs,

  ContextMenu: ContextMenu,
  DialogPreview: DialogPreview,
  DialogInput: DialogInput,
  TreeView: TreeView,
  Prompt: Prompt
}
