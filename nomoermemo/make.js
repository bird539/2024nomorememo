const html = document.querySelector('html');
html.style.height = '100%';
//html.style.flexDirection = 'row';
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
    btnPaddingSide: '10px', btnPaddingBottom: '0px',
    winBtnHeight: '40px',
}
const BA = {
    W: { Wsave: 'Wsave', WwArr: 0, WcssArr: 1 },
    lineThic: 1.5, winWith: '456', fontSize: 14,
    fontThic: 0, fontType: 2, fontKind: 0,
    H: { Hsave: 'Hsave', }
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

class likeQueue {
    array = [];
    ob = {value:null, next:null, befo:null}
    outValue = null;
    constructor(long) {
        this.array = Array.from({ length: long }, () => null);
    }
    saveArr;

    setObArr() {
        for (let j = 0; j < this.saveArr.length; j++) {
            if (this.saveArr[j] != null) {
                let target = returnOb(this.ob, this.saveArr[j]);
                this.array[j] = target;
            }
        }
    }
    intoArray() {
        for (let j = 0; j < this.array.length; j++) {
            if (this.array[j] != null) {
                let target = Object.values(this.array[j]);
                this.saveArr[j] = target;
            }
        }
    }

    insert(value) {
        let ob = { value: value, next: null, befo: null };
        let targetIndex = null; let nowBefo = null; let nowNext = null; let nowNull = null;
        for (let j = 0; j < this.array.length; j++) {
            if (this.array[j] == null) {
                nowNull = j;
            } else if (this.array[j] != null && this.array[j].befo == null) {
                if (targetIndex != null) {
                    targetIndex = j;
                    nowBefo = j;
                }
            }
            
            if (this.array[j] != null && this.array[j].next == null) {
                nowNext = j;
            }
        }

        if (nowBefo != null) {
            if (nowNull == null) {
                let nextDelTarget = this.array[nowBefo].next;
                this.array[nextDelTarget].befo = null;
            }
            ob.befo = nowNext;
        }
        if(nowNull!=null){ targetIndex = nowNull; }
        if (nowNext != null) {
            this.array[nowNext].next = targetIndex;
        }
        this.array[targetIndex] = ob;
    }

    del(delIndex){
        let befo = this.array[delIndex].befo;
        let next = this.array[delIndex].next;
        if(befo!=null){this.array[befo].next = next;}
        if(next!=null){this.array[next].befo = befo;}

        this.outValue = array[delIndex].value; 

        this.array[delIndex] = null;
    }
}

class HTMLController {
    option = {
        //basicFontWidth: { font:null, width:null }, //font, width
        basicDarkLightMode: { not:true, mode:false }, //not mode(false) or mode(true) | not, dark(true), light(false) 
        backColor: { free:null, dark:null, light:null}, //basic, dark, light
        trash: {
            text: new likeQueue(60),
            tap: new likeQueue(20),
            win: new likeQueue(20),
        },
        thisBtnOption:{ 
            backColor:null, fontColor:null, lineColor:null, 
            fontStyle:null, fontFamily:null, fontThick:null, fontSize:null,
            height:null, title:null
        }
    }
    saveArr;
    constructor() { this.htmlsave = 'htmlSet', this.setObArr() };

    save() {
        localStorage.setItem(BA.H.Hsave, JSON.stringify(this.saveArr));
    }
    firstSet(){
        this.option.backColor.free = '#FFFFFF';
        this.option.backColor.free = '#000000';
        this.option.backColor.free = '#FFFFFF';

        this.option.thisBtnOption.backColor = OP.lightColor.green.back;
        this.option.thisBtnOption.fontColor = OP.lightColor.green.font;
        this.option.thisBtnOption.lineColor = OP.lightColor.green.row;

        this.option.thisBtnOption.fontStyle = BA.fontType;
        this.option.thisBtnOption.fontFamily = BA.fontKind
        this.option.thisBtnOption.fontThick = BA.fontThic;
        this.option.thisBtnOption.fontSize = BA.fontSize;
        
        this.option.thisBtnOption.height = '40';
    }
    setObArr() {
        let getArr = localStorage.getItem(BA.H.Hsave);
        if (getArr == null) {
            this.firstSet()
            this.intoArray();
            this.save();
        } else {
            this.saveArr = JSON.parse(getArr);
            this.option.basicDarkLightMode = returnOb(this.option.basicDarkLightMode, this.saveArr[0]);
            this.option.backColor = returnOb(this.option.backColor, this.saveArr[1]);

            this.option.trash.text.saveArr = this.saveArr[2][0];
            this.option.trash.text.setObArr();
            this.option.trash.tap.saveArr = this.saveArr[2][1];
            this.option.trash.tap.setObArr();
            this.option.trash.win.saveArr = this.saveArr[2][2];
            this.option.trash.win.setObArr();

            this.option.thisBtnOption = returnOb(this.option.thisBtnOption, this.saveArr[3]);
        }
    }
    intoArray() {
        let array = [null,null,null];
        array[0] = Object.values(this.option.basicDarkLightMode);
        array[1] = Object.values(this.option.backColor);
        let tt1 = Object.values(this.option.trash.tap.array);
        let tt2 = Object.values(this.option.trash.text.array);
        let tt3 = Object.values(this.option.trash.win.array);
        array[2] = [tt1,tt2,tt3];
        array[3] = Object.values(this.option.thisBtnOption);
        this.saveArr = array;
    }

    basicFontSet(ob) {
        ob.style.fontSize = `${this.option.thisBtnOption.fontSize}pt`;
        ob.style.fontFamily = OP.fontKind[this.option.thisBtnOption.fontFamily];
        ob.style.fontStyle = OP.fontType[this.option.thisBtnOption.fontStyle];
        ob.style.fontWeight = OP.fontThic[this.option.thisBtnOption.fontThick];
        ob.style.color = this.option.thisBtnOption.fontColor;
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
        ob.style.display = 'block';
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
        this.basicFontSet(befoBtn);
        this.basicBtnSet(befoBtn);
        befoBtn.style.width = '40%';
        befoBtn.style.height = '100%';
        befoBtn.style.marginRight = OP.btnPaddingSide;
    //plsBtn.className = this.i.className+'_plsBtn .target:'className'_tapChoose:flex:index';

        let nextBtn = document.createElement('button');
        nextBtn.innerText = '>';
        nextBtn.style.width = '40%';
        this.basicFontSet(nextBtn);
        this.basicBtnSet(nextBtn);
        nextBtn.style.marginRight = OP.btnPaddingSide;
        nextBtn.style.height = '100%';
        if(exOb[0].befoNextBtnNot){
            befoBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
        if(exOb[0].now){
            befoBtn.className = exOb[0].className+`:${now-1}`
            nextBtn.className = exOb[0].className+`:${now-1}`
            befoBtn.addEventListener('click', targePageShow);//===
            nextBtn.addEventListener('click', befoNextToSelectClick);
        }

        ob.appendChild(page);
        ob.appendChild(befoBtn);
        ob.appendChild(nextBtn);
    }

    real(){
        let htmlDiv = document.createElement('div');
        htmlDiv.style.backgroundColor = this.option.thisBtnOption.backColor;
        htmlDiv.className = 'htmlDiv';
        htmlDiv.style.width = '40px';
        htmlDiv.style.marginRight = '10px'
        //htmlDiv.style.float = 'left';
        htmlDiv.style.display = 'flex';
        htmlDiv.style.flexDirection ='column'
        //htmlDiv.style.flexFlow = 'wrap-reverse';
        //htmlDiv.style.flexDirection = 'row-reverse';

        let classNameBook = { //5555
            showBtn : 'htmlshowBtn .target:html_secdonHead:block .target:html_bodyDiv:block',
            basicColorBtn:'basicColorBtn .target:basicmodePage1:block',
            thisBtnSetBen:'basicColorBtn .target:thisBtnSetBook:block',
            secondHead: 'html_secdonHead',
            bodyDiv:'html_bodyDiv',
            basicmodePage1:'basicmodePage1',
            thisBtnSetBook:'html_thisBtnSetBook',

        };


        htmlDiv.style.bottom = 0;
        htmlDiv.style.position = 'absolute';
        let headDiv = document.createElement('div');
        let showBtn = document.createElement('button');
        this.basicFontSet(showBtn);
        this.basicBtnSet(showBtn);
        //showBtn.style.paddingRight ='30px';
        showBtn.style.width = '40px';
        showBtn.style.display = 'block';
        showBtn.innerText = 'm';
        showBtn.style.float = 'right';
        showBtn.className = classNameBook.showBtn;
        showBtn.addEventListener('click', targetShow);
        if(this.option.thisBtnOption.title!=null){ showBtn.innerText = this.option.thisBtnOption.title };
        
//plsBtn.className = this.i.className+'_plsBtn .target:'+this.i.className+'_tapChoose:flex';


        //headDiv.style.display = 'flex';
        //headDiv.style.flexDirection = 'row-reverse';
        //secondHead.style.float = 'left';

        let secondHead = document.createElement('div');
        let trashBtn = document.createElement('button');
        trashBtn.innerText = 'trash';
        this.basicFontSet(trashBtn);
        this.basicBtnSet(trashBtn);
        let basicColorBtn = document.createElement('button');
        this.basicFontSet(basicColorBtn);
        this.basicBtnSet(basicColorBtn);
        basicColorBtn.innerText = 'colorMode';
        let thisBtnSetBen = document.createElement('button');
        thisBtnSetBen.innerText = 'btnColor';
        this.basicFontSet(thisBtnSetBen);
        this.basicBtnSet(thisBtnSetBen);
        
        trashBtn.style.float = 'right';
        basicColorBtn.style.float = 'right';
        thisBtnSetBen.style.float = 'right';
        trashBtn.style.backgroundColor = this.option.thisBtnOption.backColor;
        basicColorBtn.style.backgroundColor = this.option.thisBtnOption.backColor;
        thisBtnSetBen.style.backgroundColor = this.option.thisBtnOption.backColor;
        
        trashBtn.style.paddingRight = '10px';
        basicColorBtn.style.paddingRight = '10px';
        thisBtnSetBen.style.paddingRight ='10px';

        trashBtn.style.paddingLeft = '10px';
        basicColorBtn.style.paddingLeft = '10px';
        thisBtnSetBen.style.paddingLeft ='10px';

        trashBtn.style.display = 'block';
        basicColorBtn.style.display = 'block';
        thisBtnSetBen.style.display ='block';

        //trashBtn.className = 'basicColorBtn .target:basicmodePage1:block';
        //trashBtn.addEventListener('click', targetShow);
        basicColorBtn.className = classNameBook.basicColorBtn;
        basicColorBtn.addEventListener('click', targetShow);
        thisBtnSetBen.className = classNameBook.thisBtnSetBen;
        thisBtnSetBen.addEventListener('click', targetShow);
    
        secondHead.style.display = 'none'; 
        secondHead.appendChild(trashBtn); 
        secondHead.appendChild(basicColorBtn); 
        secondHead.appendChild(thisBtnSetBen);
        secondHead.style.display = 'none';
        secondHead.className = classNameBook.secondHead;
        
        headDiv.appendChild(secondHead);
        headDiv.appendChild(showBtn);


        let bodyDiv = document.createElement('div');//
        bodyDiv.className = classNameBook.bodyDiv
        //trash

        //basic mode - checkbox, checkbox;
        let basicmodePage1 = document.createElement('div');
        let basicMode = [
            { text: 'free or mode', type: 'input', inputType: 'checkbox', value: this.option.basicDarkLightMode.not, befoNextBtnNot:true },
            { text: 'light mode or darkmode', type: 'input', inputType: 'checkbox', value: this.option.basicDarkLightMode.mode },
        ];
        this.basicEditPage(basicmodePage1, basicMode);
        basicmodePage1.className = classNameBook.basicmodePage1;
        basicmodePage1.style.width = '300px';
        basicmodePage1.style.display = 'none';
        //showBtn.className = 'htmlshowBtn .target:html_secdonHead:block';
        basicmodePage1.style.backgroundColor = this.option.thisBtnOption.backColor;
        basicmodePage1.style.float = 'right';

        bodyDiv.appendChild(basicmodePage1);

        //editBtn
        let thisBtnSetBook = document.createElement('div');
        thisBtnSetBook.style.display = 'none';
        thisBtnSetBook.className = classNameBook.thisBtnSetBook;
        let editPage1 = document.createElement('div');
        let exOb1 = [ //===
            { text: 'background', type: 'input', inputType: 'color', value: this.option.thisBtnOption.backColor, className:'editPage1 .target:html_thisBtnSetBook:block:', now:0 },
            { text: 'font', type: 'input', inputType: 'color', value: this.option.thisBtnOption.fontColor },
            { text: 'line', type: 'input', inputType: 'color', value: this.option.thisBtnOption.lineColor },
        ];
        this.basicEditPage(editPage1, exOb1);
        editPage1.style.backgroundColor = this.option.thisBtnOption.backColor;
        editPage1.style.display = 'block';
        editPage1.style.width = '300px';
        editPage1.style.float = 'right';

        let editPage2 = document.createElement('div');
        let exOb2 = [
            { text: 'fontSize', type: 'input', inputType: 'number', value: this.option.thisBtnOption.fontSize },
            { text: 'fontThick', type: 'select', selectText: OP.fontThic, selectedIndex: this.option.thisBtnOption.fontThick },
            { text: 'fontType', type: 'select', selectText: OP.fontType, selectedIndex: this.option.thisBtnOption.fontStyle },
            { text: 'fontKind', type: 'select', selectText: OP.fontKind, selectedIndex: this.option.thisBtnOption.fontFamily },
            //{text, type,inputType, value, selectText, selectedIndex},
        ];
        this.basicEditPage(editPage2, exOb2);
        editPage2.style.display = 'none';
        //this.basicEditPage(ob,textArray,Types,inputTypes,values,selectedIndexs)

        let editPage3 = document.createElement('div');
        let exOb3 = [
            { text: 'size', type: 'input', inputType: 'number', value: this.option.thisBtnOption.height },
            { text: 'title', type: 'input', inputType: 'text', value: this.option.thisBtnOption.title },
        ];
        this.basicEditPage(editPage3, exOb3);
        editPage3.style.display = 'none';

        thisBtnSetBook.appendChild(editPage1);
        thisBtnSetBook.appendChild(editPage2);
        thisBtnSetBook.appendChild(editPage3);
        bodyDiv.appendChild(thisBtnSetBook);

        bodyDiv.style.display = 'none'; 
        htmlDiv.appendChild(bodyDiv);
        htmlDiv.appendChild(headDiv);

        return htmlDiv;
    }
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
        this.i.className = `w${this.i.index}`; this.i.title = this.i.className;
        this.i.showWin = true; this.i.showTap = null; this.i.cssIndex = this.i.index;

        //css
        this.c.fontSize = BA.fontSize; this.c.fontThick = BA.fontThic;
        this.c.fontType = BA.fontType; this.c.fontKind = BA.fontKind

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
        ob.style.fontFamily = OP.fontKind[this.c.fontKind];
        ob.style.fontStyle = OP.fontType[this.c.fontType];
        ob.style.fontWeight = OP.fontThic[this.c.fontThick];
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

        befoBtn.className = this.i.className + '_befoBtn .target:' + this.i.className + '_editPageSelect:flex:3';
        befoBtn.addEventListener('click', befoNextToSelectClick);

        let nextBtn = document.createElement('button');
        nextBtn.innerText = '>';
        nextBtn.style.width = '5%';
        this.basicFontSet(nextBtn);
        this.basicBtnSet(nextBtn);
        nextBtn.style.marginRight = OP.btnPaddingSide;
        nextBtn.style.height = '100%';

        nextBtn.className = this.i.className + '_befoBtn .target:' + this.i.className + '_editPageSelect:flex:3';
        nextBtn.addEventListener('click', befoNextToSelectClick);

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
        let editBtn = document.createElement("button");
        editBtn.innerText = 'e';
        editBtn.className = this.i.className + '_plsBtn .target:' + this.i.className + '_winEdit:flex .target:' + this.i.className + '_title:flex .target:' + this.i.className + '_tapChoose:none  .target:' + this.i.className + '_titleEdit:flex';//
        editBtn.addEventListener('click', targetShow);
        this.basicFontSet(editBtn);

        editBtn.style.display = 'flex';
        editBtn.style.alignItems = 'center';
        editBtn.style.justifyContent = 'center';

        this.basicBtnSet(editBtn);
        editBtn.style.paddingBottom = OP.btnPaddingBottom;
        editBtn.style.flexShrink = 0;
        editBtn.style.width = OP.winBtnHeight;

        //head-title-pls btn
        let plsBtn = document.createElement("button");
        plsBtn.innerText = '+';
        plsBtn.className = this.i.className + '_plsBtn .target:' + this.i.className + '_tapChoose:flex';
        plsBtn.addEventListener('click', targetShow);
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
        titleEdit.style.display = 'none'//'flex';
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
        this.basicFontSet(winCancelBtn);
        winCancelBtn.style.width = '15%'
        winCancelBtn.className = this.i.className + '_plsBtn .target:' + this.i.className + '_winEdit:flex .target:' + this.i.className + '_title:flex .target:' + this.i.className + '_tapChoose:none  .target:' + this.i.className + '_titleEdit:flex';//
        winCancelBtn.addEventListener('click', targetShow);

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
        tapChooseDiv.style.display = 'none';//'flex';
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
        winEdit.style.display = 'none';//'flex';
        winEdit.style.flexWrap = 'wrap';
        winEdit.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;

        //select page
        let editTitle = ['1. window color', '2. window font', '3. window size', '4. recent delete'];
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
        editPageSelect.className = this.i.className + '_editPageSelect .target:' + this.i.className + '_editBook:flex';
        editPageSelect.addEventListener('change', targePageShow);

        //book
        let editBook = document.createElement('div');
        editBook.style.width = '100%';
        editBook.style.display = 'flex';
        editBook.className = this.i.className + '_editBook';

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

        let editPage4 = document.createElement('div');
        let exOb4 = [
            { text: 'not yet done...', type: 'input', inputType: 'number', value: this.c.wwidth },
            //{ text: 'line thick', type: 'input', inputType: 'number', value: this.c.rowThic },
        ];
        this.basicEditPage(editPage4, exOb4);

        editBook.appendChild(editPage1);
        editBook.appendChild(editPage2);
        editPage2.style.display = 'none';
        editBook.appendChild(editPage3);
        editPage3.style.display = 'none';
        editBook.appendChild(editPage4);
        editPage4.style.display = 'none';

        winEdit.appendChild(editPageSelect);
        winEdit.appendChild(editBook);
        //end edit book

        ////////////////
        title.appendChild(titleBtn);
        title.appendChild(editBtn);
        title.appendChild(plsBtn);

        head.appendChild(title);
        head.appendChild(titleEdit);
        head.appendChild(tapChooseDiv);
        head.appendChild(winEdit);

        winDiv.appendChild(head);

        //windiv-body
        let body = document.createElement("div");
        body.className = this.i.className + "_body";
        body.innerText = 'body~\n\n\n\n\n\n\n\n\n\nkdkdkdkdkdkdkdk\n\n\n\n\ndksdkdk';
        winDiv.appendChild(body);

        return winDiv;
    }
}
function targetShow(event) {
    //plsBtn.className = this.i.className+'_plsBtn .target:'+this.i.className+'_tapChoose:flex';
    let eventClassName = event.target.className.split('.');
    const check = 'target';
    for (let i = 1; i < eventClassName.length; i++) {
        if (eventClassName[i].includes(check)) {
            let t = eventClassName[i].split(':');
            let targetClassName = t[1]
            let targetDisplayType = t[2]
            let target = document.querySelector(`.${targetClassName}`);
            if (target.style.display == 'none') {
                target.style.display = targetDisplayType;
            } else {
                target.style.display = 'none'
            }
        }
    }
}
function targetAllShow(event) {
    //plsBtn.className = this.i.className+'_plsBtn .target:'+this.i.className+'_tapChoose:flex';
    let eventClassName = event.target.className.split('.');
    const check = 'target';
    for (let i = 1; i < eventClassName.length; i++) {
        if (eventClassName[i].includes(check)) {
            let t = eventClassName[i].split(':');
            let targetClassName = t[1]
            let targetDisplayType = t[2]
            let target = document.querySelector(`.${targetClassName}`);
            if (target.style.display == 'none') {
                target.style.display = targetDisplayType;
            }
        }
    }
}
function targePageShow(event) { //===
    //plsBtn.className = this.i.className+'_plsBtn .target:'className'_tapChoose:flex:index';
    let eventClassName = event.target.className.split('.');
    let index = event.target.selectedIndex;
    const check = 'target';
    if (eventClassName[1].includes(check)) {
        let t = eventClassName[1].split(':');
        let targetClassName = t[1];
        let targetDisplayType = t[2];
        console.log(t);
        let target = document.querySelector(`.${targetClassName}`);
        for (let j = 0; j < target.childNodes.length; j++) {
            target.childNodes[j].style.display = 'none';
        }
        if(index != null ){ target.childNodes[index].style.display = targetDisplayType; }
        else if(index == null && t[3] != null){ target.childNodes[t[3]].style.display = targetDisplayType; }
    }
}
function befoNextToSelectClick(event) {
    //befoBtn.className =this.i.className+'_befoBtn .target:'+ this.i.className+'_editPageSelect:flex:3' ;
    let eventClassName = event.target.className.split('.');
    let t = eventClassName[1].split(':');
    let select = document.querySelector(`.${t[1]}`);
    let index = select.selectedIndex;
    let lastIndex = t[3];
    if (event.target.innerText == '<') {
        select.selectedIndex = index > 0 ? index - 1 : lastIndex;
    } else if (event.target.innerText == '>') {
        select.selectedIndex = index < lastIndex ? index + 1 : 0;
    }
    select.dispatchEvent(new Event('change'));
}

let newWin = new wob(0);
newWin.setObArr();
newWin.targetIndex = 0;
newWin.open();

let newHtml = new HTMLController();
let newHtmlBottom = document.createElement('div');
newHtmlBottom.style.display = 'flex';
newHtmlBottom.style.flexDirection = 'row-reverse';

newHtmlBottom.appendChild(newHtml.real());
mainDiv.appendChild(newWin.real());
html.appendChild(newHtmlBottom);