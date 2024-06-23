class htmlControl {
    html_backgroundColor = "";
    html_ligthDarkMode = "";

    #control_backgroundColor = "";

    #control_fontSize = "";
    #control_fontFamily = "";
    #control_fontStyle = "";
    #control_fontWeight = "";

    #trash_window = {};
    #trash_tabInfo = {};
    #trash_tab = {};

    constructor(builder) {
        this.html_backgroundColor = builder.get_html_backgroundColor();
        this.html_ligthDarkMode = builder.get_html_ligthDarkMode();
    }
    get_html_backgroundColor() { return this.html_backgroundColor; }
    get_html_ligthDarkMode() { return this.html_ligthDarkMode; }

    static Builder = class {
        #html_backgroundColor = "";
        #html_ligthDarkMode = "";

        get_html_backgroundColor() { return this.#html_backgroundColor; }
        set_html_backgroundColor(color) {
            this.#html_backgroundColor = color; return this;
        }

        get_html_ligthDarkMode() { return this.#html_ligthDarkMode; }
        set_html_ligthDarkMode(color) {
            this.#html_ligthDarkMode = color; return this;
        }

        build() { return new htmlControl(this); }
    }
}

class htmlContol_Model {
    #htmlControlOb;
    constructor() {
        this.#htmlControlOb = new htmlControl.Builder()
        .set_html_backgroundColor("black")
        .set_html_ligthDarkMode("light")
        .build();
    }
    firstPageOpen() {
        let getOb = localStorage.getItem("htmlControlDB");
        if (getOb == null) {
            this.#htmlControlOb.html_backgroundColor = "white";
            this.#htmlControlOb.html_ligthDarkMode = "black";
            localStorage.setItem("htmlControlDB", JSON.stringify(this.#htmlControlOb));
        } else {
            let saveDB = JSON.parse(getOb);
            this.#htmlControlOb.html_backgroundColor = saveDB.html_backgroundColor;
            this.#htmlControlOb.html_ligthDarkMode = saveDB.html_ligthDarkMode;
        }
    }
}

const newhtmlContol_Model = new htmlContol_Model();
newhtmlContol_Model.firstPageOpen();
//const htmlContolOne = new 

class Window {

}

class TabInfo {

}

class Tab_Memo {

}

let mainDiv = document.querySelector(".main");
mainDiv.innerHTML = "hello world!";