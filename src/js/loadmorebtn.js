export default class LOADMORE  {
    constructor(selector, hidden = true) { 
        this.button = this.getButton(selector);
        
        if (hidden) this.hide();
    }

    getButton(selector) {
        return document.querySelector(selector);
    }

    hide() {
        this.button.classList.add("hideBtn")
    }
    show() {
        this.button.classList.remove("hideBtn")
    }
}