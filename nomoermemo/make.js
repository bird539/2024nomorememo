const html = document.querySelector('html');
//html.style.backgroundColor = 'black'

const mainDiv = document.querySelector('.mainDiv');
mainDiv.style.display = 'flex';
mainDiv.style.flexWrap = 'wrap';
mainDiv.style.justifyContent = 'center'

let windowArrLenth = Array.from({ length: 20 }, () => null);

const OP = {
    fontThic: [100, 200, 300, 400, 500, 600, 700, 800],
    fontType: ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy',
        'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded',
        'emoji', 'math', 'fangsong'],
    fontKind: ['normal', 'italic', 'oblique'],
    showTap: ['extend_height', 'extend_width', 'tap_top', 'tap_left'],
    tapType: ['memo', 'calulation', 'link', 'calendar', 'time', 'draw', 'percent'],
    colorArr: ['yello', 'blue', 'pink', 'green'],
    lightColor: {
        yello: { back: '#FEF896', font: '#000000', row: '#B8D993', col: '#ff8c82' },
        blue: { back: '#99d6ff', font: '#000000', row: '#B8D993', col: '#ff8c82' },
        pink: { back: '#ffb2ad', font: '#000000', row: '#B8D993', col: '#ff8c82' },
        green: { back: '#ddffb7', font: '#000000', row: '#B8D993', col: '#ff8c82' },
    },
    btnPaddingSide: '10px', btnPaddingBottom: '5px',
    winBtnHeight: '40px',
}
const BA = {
    W: { Wsave: 'Wsave', WwArr: 0, WcssArr: 1 },
    lineThic: 1.5, winWith: '456', fontSize: 14,
    fontThic: 0, fontType: 2, fontKind: 0,
}

function returnOb(ob, arr) {
    let ii = 0; let newOb = {};
    for (let key in ob) {
        newOb[key] = arr[ii];
        ii += 1;
    }
    return newOb;
}
function justNewOb(ob) {
    let newOb = {};
    for (let key in ob) {
        newOb[key] = ob[key];
    }
    return newOb;
}


class wob {
    //win atribute
    i = {
        index: null, befo: null, next: null,
        className: null, title: null,
        showWin: null, showTap: null, cssIndex: null,
    }
    //css atribute
    c = {
        fontSize: null, fontThick: null, fontType: null, fontKind: null,
        back: null, font: null, row: null, col: null,
        wwidth: null, rowThic: null, colThic: null,
    }
    winArr = []; cssArr = [];
    saveArr = Array.from({ length: 20 }, () => null);
    obArr = Array.from({ length: 20 }, () => null);
    targetIndex;
    constructor(n) { this.targetIndex = n; }

    firstSet() {
        //win info
        this.i.befo = null; this.i.next = null; this.i.index = this.targetIndex;
        this.i.className = `${this.i.index}w`; this.i.title = this.i.className;
        this.i.showWin = true; this.i.showTap = null; this.i.cssIndex = this.i.index;

        //css
        this.c.fontSize = BA.fontSize; this.c.fontThick = OP.fontThic[BA.fontThic];
        this.c.fontType = OP.fontType[BA.fontThic]; this.c.fontKind = OP.fontKind[BA.fontKind];

        this.c.back = OP.lightColor.yello.back;
        this.c.font = OP.lightColor.yello.font;
        this.c.row = OP.lightColor.yello.row;
        this.c.col = OP.lightColor.yello.col;

        this.c.with = BA.winWith; this.c.rowThic = BA.lineThic; this.c.colThic = BA.lineThic;
    }
    setObArr() {
        let getArr = localStorage.getItem(BA.W.Wsave);
        if (getArr == null) {
            this.firstSet()
            this.intoArray();
            this.intoOb();
            this.save();
        } else {
            this.saveArr = JSON.parse(getArr);
            for (let j = 0; j < this.saveArr.length; j++) {
                if (this.saveArr[j] != null) {
                    let css = returnOb(this.c, this.saveArr[j][BA.W.WcssArr]);
                    let winfo = returnOb(this.i, this.saveArr[j][BA.W.WwArr]);
                    this.obArr[j] = { i: winfo, c: css };
                }
            }
        }
    }
    intoArray() {
        this.winArr = Object.values(this.i);
        this.cssArr = Object.values(this.c);
        this.saveArr[this.targetIndex] = [this.winArr, this.cssArr];
    }
    intoOb() {
        let css = justNewOb(this.c);
        let winfo = justNewOb(this.i);
        this.obArr[this.targetIndex] = { i: winfo, c: css }
    }
    open() {
        this.i = this.obArr[this.targetIndex].i;
        this.c = this.obArr[this.targetIndex].c;
    }
    insert() {
        let colorNum = 0;
        for (let j = 0; j < this.saveArr.length; j++) {
            colorNum += 1; if (colorNum > 4) { colorNum = 0; }
            if (this.saveArr[j] == null) {
                this.targetIndex = j;
                this.firstSet();
                let color = OP.colorArr[colorNum];
                for (let key in OP.lightColor[color]) {
                    this.c[key] = OP.lightColor[color][key];
                }
                for (let k = 0; k < this.obArr.length; k++) {
                    if (this.obArr[k] != null && this.obArr[k].i.next == null) {
                        this.i.befo = k;
                        this.intoArray();
                        this.intoOb();

                        this.targetIndex = k;
                        this.open();
                        this.i.next = j;
                        this.intoArray();
                        this.intoOb();

                        break;
                    }
                }

                break;
            }
        }
        this.save();
    }
    edit() {
        this.intoArray();
        this.intoOb();
        this.save();
    }
    delete() {
        for (let j = 0; j < this.obArr.length; j++) {
            if (this.obArr[j] != null && this.obArr[j].i.index == this.targetIndex) {
                let nextI = this.obArr[j].i.next;
                let befoI = this.obArr[j].i.befo;
                if (befoI != null) {
                    this.targetIndex = befoI;
                    this.open();
                    if (befoI == null) { this.i.next = null } else {
                        this.i.next = nextI;
                    }
                    this.intoArray();
                    this.intoOb();
                }
                if (nextI != null) {
                    this.targetIndex = nextI;
                    this.open();
                    if (befoI == null) { this.i.befo = null } else {
                        this.i.befo = befoI;
                    }
                    this.intoArray();
                    this.intoOb();
                }
                this.saveArr[j] = null;
                this.obArr[j] = null;
                break;
            }
        }
        this.save();
    }
    save() {
        localStorage.setItem(BA.W.Wsave, JSON.stringify(this.saveArr));
    }
    select() { }
    basicFontSet(ob) {
        ob.style.fontSize = `${this.c.fontSize}pt`;
        ob.style.fontFamily = this.c.fontKind;
        ob.style.fontStyle = this.c.fontType;
        ob.style.fontWeight = this.c.fontThick;
        ob.style.color = this.c.font;
    }
    basicBtnSet(ob) {
        ob.style.border = 'none';
        ob.style.padding = '0';
        ob.style.backgroundColor = 'transparent';
        ob.style.marginLeft = OP.btnPaddingSide;
        ob.style.height = OP.winBtnHeight;
    }
    basicEditPage(ob, exOb) {
        let page = document.createElement('div');
        page.style.width = '90%';
        ob.style.display = 'flex';
        ob.style.width = '100%';

        for (let i = 0; i < exOb.length; i++) {
            let form = document.createElement('form');
            form.style.display = 'flex';
            form.style.flexDirection = 'row';

            let text = document.createElement('div');
            text.innerText = exOb[i].text;
            text.style.width = '50%';
            text.style.height = OP.winBtnHeight;
            this.basicFontSet(text);

            if (exOb[i].type == 'input') {
                let input = document.createElement('input');
                input.style.width = '50%';
                input.value = exOb[i].value;
                input.type = exOb[i].inputType;
                this.basicBtnSet(input);

                form.appendChild(text);
                form.appendChild(input);
            } else if (exOb[i].type == 'select') {
                let select = document.createElement('select');
                for (let j = 0; j < exOb[i].selectText.length; j++) {
                    let option = document.createElement('option');
                    option.innerText = exOb[i].selectText[j];
                    option.value = j;
                    select.appendChild(option);

                }
                select.selectedIndex = exOb[i].selectedIndex;
                this.basicBtnSet(select);
                this.basicFontSet(select);
                select.style.width = '50%';
                form.appendChild(text);
                form.appendChild(select);
            }
            form.style.flexGrow = 2;
            page.appendChild(form);
        }

        let befoBtn = document.createElement('button');
        befoBtn.innerText = '<';
        befoBtn.style.width = '5%';
        this.basicFontSet(befoBtn);
        this.basicBtnSet(befoBtn);
        befoBtn.style.height = '100%';
        befoBtn.style.marginRight = OP.btnPaddingSide;

        let nextBtn = document.createElement('button');
        nextBtn.innerText = '>';
        nextBtn.style.width = '5%';
        this.basicFontSet(nextBtn);
        this.basicBtnSet(nextBtn);
        nextBtn.style.marginRight = OP.btnPaddingSide;
        nextBtn.style.height = '100%';

        ob.appendChild(befoBtn);
        ob.appendChild(page);
        ob.appendChild(nextBtn);

    }

    real() {
        let winDiv = document.createElement("div");
        winDiv.className = this.i.className;
        winDiv.style.backgroundColor = this.c.back;
        winDiv.style.width = '600px';
        winDiv.style.display = 'flex';
        winDiv.style.flexWrap = 'wrap';
        winDiv.style.flexDirection = 'column';
        //windiv-head
        let head = document.createElement("div");
        head.className = this.i.className + "_head";
        //head-title
        let title = document.createElement("div");
        title.className = this.i.className + "_title";
        title.style.display = 'flex';
        title.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;
        //head-title-titlebtn
        let titleBtn = document.createElement("button");
        titleBtn.className = this.i.className + "_titleBtn";
        titleBtn.innerText = this.i.title;
        this.basicFontSet(titleBtn);
        this.basicBtnSet(titleBtn);
        titleBtn.style.flexGrow = 1;
        titleBtn.style.textAlign = 'left';

        //head-title-pls btn
        let plsBtn = document.createElement("button");
        plsBtn.innerText = '+';
        this.basicFontSet(plsBtn);

        plsBtn.style.display = 'flex';
        plsBtn.style.alignItems = 'center';
        plsBtn.style.justifyContent = 'center';

        this.basicBtnSet(plsBtn);
        plsBtn.style.paddingBottom = OP.btnPaddingBottom;
        plsBtn.style.flexShrink = 0;
        plsBtn.style.width = OP.winBtnHeight;

        //head-title-edit 
        let titleEdit = document.createElement("div");
        titleEdit.className = this.i.className + "_titleEdit";
        titleEdit.style.display = 'flex';
        titleEdit.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;

        let winTitleInput = document.createElement('input');
        winTitleInput.value = this.i.title;
        this.basicBtnSet(winTitleInput);
        winTitleInput.style.height = '100%'
        winTitleInput.style.width = '100%';

        this.basicFontSet(winTitleInput);
        let winTitleForm = document.createElement('form');
        winTitleForm.style.flexGrow = 1;
        winTitleForm.appendChild(winTitleInput);

        let winCancelBtn = document.createElement('button');
        this.basicBtnSet(winCancelBtn);
        winCancelBtn.innerText = 'done';
        winCancelBtn.style.width = '15%'

        this.basicFontSet(winCancelBtn);

        let winDelBtn = document.createElement('button');
        winDelBtn.innerText = 'win_del';
        this.basicBtnSet(winDelBtn);
        winDelBtn.style.width = '15%';
        this.basicFontSet(winDelBtn);

        let winBefoBtn = document.createElement('button');
        winBefoBtn.innerText = '<';
        this.basicBtnSet(winBefoBtn);
        winBefoBtn.style.width = '5%';
        winBefoBtn.style.marginLeft = OP.btnPaddingSide;
        this.basicFontSet(winBefoBtn);

        let winNextBtn = document.createElement('button');
        winNextBtn.innerText = '>';
        this.basicBtnSet(winNextBtn);
        winNextBtn.style.marginRight = OP.btnPaddingSide;
        winNextBtn.style.width = '5%';
        this.basicFontSet(winNextBtn);

        titleEdit.appendChild(winBefoBtn);
        titleEdit.appendChild(winTitleForm);
        titleEdit.appendChild(winDelBtn);
        titleEdit.appendChild(winCancelBtn);
        titleEdit.appendChild(winNextBtn);

        //head-tapChoose btns
        let tapChooseDiv = document.createElement('div');
        tapChooseDiv.className = this.i.className + '_tapChoose';
        tapChooseDiv.style.display = 'flex';
        tapChooseDiv.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;

        for (let i = 0; i < OP.tapType.length; i++) {
            let tapBtn = document.createElement('button');
            tapBtn.className = this.i.className + `_tapBtn_${i}`;
            tapBtn.innerText = OP.tapType[i];
            this.basicFontSet(tapBtn);

            this.basicBtnSet(tapBtn);
            tapBtn.style.flexGrow = 1;
            tapBtn.style.textAlign = 'left';
            tapBtn.style.paddingBottom = OP.btnPaddingBottom;

            tapChooseDiv.appendChild(tapBtn);
        }
        let winPlsBtn = document.createElement('button');
        winPlsBtn.className = this.i.className + `_tapBtn_winPls`;
        winPlsBtn.innerText = '+win';
        this.basicFontSet(winPlsBtn);

        this.basicBtnSet(winPlsBtn);
        winPlsBtn.style.flexGrow = 1;
        winPlsBtn.style.textAlign = 'left';
        winPlsBtn.style.marginRight = OP.btnPaddingSide;
        winPlsBtn.style.paddingBottom = OP.btnPaddingBottom;

        tapChooseDiv.appendChild(winPlsBtn);
        //head-winEdit
        let winEdit = document.createElement('div');
        winEdit.className = this.i.className + '_winEdit';
        winEdit.style.display = 'flex';
        winEdit.style.flexWrap = 'wrap'
        winEdit.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;

        //select page
        let editTitle = ['1. window color', '2. window font', '3. window size','4. recent delete'];
        let editPageSelect = document.createElement('select');
        for (let i = 0; i < editTitle.length; i++) {
            let editTitleOption = document.createElement('option');
            editTitleOption.innerText = editTitle[i];
            editTitleOption.value = i;
            editPageSelect.appendChild(editTitleOption);
        }
        this.basicFontSet(editPageSelect);
        this.basicBtnSet(editPageSelect);
        editPageSelect.style.width = '100%'
        editPageSelect.style.marginRight = OP.btnPaddingSide;

        //book
        let editBook = document.createElement('div');
        editBook.style.width = '100%';
        editBook.style.display = 'flex';

        let editPage1 = document.createElement('div');
        let exOb1 = [
            { text: 'background', type: 'input', inputType: 'color', value: this.c.back },
            { text: 'font', type: 'input', inputType: 'color', value: this.c.font },
            { text: 'line', type: 'input', inputType: 'color', value: this.c.row },
        ];
        this.basicEditPage(editPage1, exOb1);

        let editPage2 = document.createElement('div');
        let exOb2 = [
            { text: 'fontSize', type: 'input', inputType: 'number', value: this.c.fontSize },
            { text: 'fontThick', type: 'select', selectText: OP.fontThic, selectedIndex: this.c.fontThick },
            { text: 'fontType', type: 'select', selectText: OP.fontType, selectedIndex: this.c.fontType },
            { text: 'fontKind', type: 'select', selectText: OP.fontKind, selectedIndex: this.c.fontKind },
            //{text, type,inputType, value, selectText, selectedIndex},
        ];
        this.basicEditPage(editPage2, exOb2);
        //this.basicEditPage(ob,textArray,Types,inputTypes,values,selectedIndexs)

        let editPage3 = document.createElement('div');
        let exOb3 = [
            { text: 'window width', type: 'input', inputType: 'number', value: this.c.wwidth },
            { text: 'line thick', type: 'input', inputType: 'number', value: this.c.rowThic },
        ];
        this.basicEditPage(editPage3, exOb3);

        editBook.appendChild(editPage1);
        editBook.appendChild(editPage2);
        editPage2.style.display = 'none';
        editBook.appendChild(editPage3);
        editPage3.style.display = 'none';

        winEdit.appendChild(editPageSelect);
        winEdit.appendChild(editBook);
        //end edit book

        ////////////////
        title.appendChild(titleBtn);
        title.appendChild(plsBtn);

        head.appendChild(title);
        head.appendChild(titleEdit);
        head.appendChild(tapChooseDiv);
        head.appendChild(winEdit);

        winDiv.appendChild(head);

        //windiv-body
        let body = document.createElement("div");
        body.className = this.i.className + "_body";
        body.innerText = 'body~';
        winDiv.appendChild(body);

        return winDiv;
    }
}


let newWin = new wob(0);
newWin.setObArr();
newWin.targetIndex = 0;
newWin.open();


mainDiv.appendChild(newWin.real());
//ex HTML ========================================================================


//make HTML ========================================================================
/*
function makeEvent(ob, option) {
    let option1 = option.split(':')[0];
    let clickOption = option.split(':')[1];
    if (option1 == 'NextShowEvent') {
        ob.addEventListener(`${clickOption}`, NextShowEvent);
    } else if (option1 == 'NextShowEvent2') {
        ob.addEventListener(`${clickOption}`, NextShowEvent2);
    }
    return ob;
}

function makeOb(ob) {
    let newOb = document.createElement(ob);
    return newOb;
}
function makeAppend(parents, child) {
    let dd = parents;
    let bb = child;
    dd.appendChild(bb);
    return dd;
}
function makeClassName(ob, name) {
    ob.className = `${name}`;
    return ob;
}
function makeType(ob, kind) {
    ob.type = kind;
    return ob;
}
function makeValue(ob, key) {
    ob.value = key;
    return ob;
}
function makeInnerText(ob, text) {
    ob.innerText = text;
    return ob;
}
function makeFunction(ob, option, value) {
    ob[`${option}`] = value;
    return ob;
}
function makeStyle(ob, option, value) {
    ob.style[option] = value;
    return ob;
}

function makeHtml(ob, set) {
    let newOb;
    let child;
    for (const key in ob) {
        let keySorce = `${key}`
        let keyy = keySorce.split('_')[0];
        let sett = keySorce.split('_')[1];
        const target = typeof ob[key];
        //makeFunction(ob, option, value)
        if (target == 'object') {
            if (key == 'basic') {
                continue
            }
            child = makeHtml(ob[key], set);
            newOb = makeAppend(newOb, child);
        } else if (target == 'string' && keyy == 'type') {
            newOb = makeOb(ob[key]);
        } else if (target == 'string' && keyy == 'kind') {
            newOb = makeFunction(newOb, 'type', ob[key]);
        } else if (target == 'string' && keyy == 'value') {

            newOb = makeFunction(newOb, keyy, set[sett]);

        } else if (target == 'string' && keyy == 'event') {
            newOb = makeEvent(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'style') {
                let op = ob[key].split(':')[0];
                let va = ob[key].split(':')[1];
                newOb = makeStyle(newOb, op, va);
        } else {
                newOb = makeFunction(newOb, keyy, ob[key]);
        }
    }
    return newOb;
}
*/
//end make HTML ========================================================================