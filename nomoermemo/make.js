const mainDiv = document.querySelector('.mainDiv');
mainDiv.style.display = 'flex';
mainDiv.style.flexWrap = 'wrap';
mainDiv.style.justifyContent = 'center'

let windowArrLenth = Array.from({length:20}, ()=>null);

const OP = {
    fontThic:[100,200,300,400,500,600,700,800],
    fontType:['serif', 'sans-serif','monospace','cursive','fantasy',
                'system-ui','ui-serif', 'ui-sans-serif','ui-monospace','ui-rounded',
                'emoji','math','fangsong'],
    fontKind:['normal','italic','oblique'],
    showTap:['extend_height','extend_width','tap_top','tap_left'],
    tapType:['memo','calulation','link','calendar','time','draw','percent'],
    colorArr:['yello','blue','pink','green'],
    lightColor:{yello:{back:'#FEF896',font:'#000000',row:'#B8D993',col:'#ff8c82'},
                blue:{back:'#99d6ff',font:'#000000',row:'#B8D993',col:'#ff8c82'},
                pink:{back:'#ffb2ad',font:'#000000',row:'#B8D993',col:'#ff8c82'},
                green:{back:'#ddffb7',font:'#000000',row:'#B8D993',col:'#ff8c82'},
    },   
}
const BA = {
    W:{Wsave:'Wsave', WwArr:0, WcssArr:1},
    lineThic:1.5, winWith:'456', fontSize:14,
    fontThic:0, fontType:2, fontKind:0,
}

function returnOb(ob, arr){
    let ii = 0; let newOb = {};
    for(let key in ob){
        newOb[key] = arr[ii];
        ii+=1;
    }
    return newOb;
}
function justNewOb(ob){
    let newOb = {};
    for(let key in ob){
        newOb[key] = ob[key];
    }
    return newOb;
}


class wob {
    //win atribute
    i = {index:null,befo:null, next:null, 
        className:null, title:null, 
        showWin:null, showTap:null, cssIndex:null, 
    }
    //css atribute
    c = {
        fontSize:null, fontThick:null, fontType:null, fontKind:null,
        back:null, font:null, row:null, col:null, 
        wwidth:null, rowThic:null, colThic:null,
    }
    winArr = []; cssArr = []; 
    saveArr = Array.from({length:20}, ()=>null);
    obArr = Array.from({length:20}, ()=>null);
    targetIndex;
    constructor(n){ this.targetIndex=n; }

    firstSet(){
        //win info
        this.i.befo=null; this.i.next=null; this.i.index = this.targetIndex;
        this.i.className = `${this.i.index}w`; this.i.title=this.i.className; 
        this.i.showWin = true; this.i.showTap = null; this.i.cssIndex = this.i.index; 
        
        //css
        this.c.fontSize=BA.fontSize; this.c.fontThick = OP.fontThic[BA.fontThic];
        this.c.fontType=OP.fontType[BA.fontThic]; this.c.fontKind=OP.fontKind[BA.fontKind];
        
        this.c.back=OP.lightColor.yello.back;
        this.c.font=OP.lightColor.yello.font;
        this.c.row=OP.lightColor.yello.row;
        this.c.col=OP.lightColor.yello.col;

        this.c.with=BA.winWith; this.c.rowThic=BA.lineThic; this.c.colThic=BA.lineThic;
    }
    setObArr(){
        let getArr = localStorage.getItem(BA.W.Wsave);
        if(getArr == null){
            this.firstSet()
            this.intoArray();
            this.intoOb();
            this.save();
        }else{
            this.saveArr = JSON.parse(getArr);
            for(let j=0; j<this.saveArr.length;j++){
                if(this.saveArr[j]!=null){
                    let css = returnOb(this.c, this.saveArr[j][BA.W.WcssArr]);
                    let winfo = returnOb(this.i, this.saveArr[j][BA.W.WwArr]);
                    this.obArr[j] = { i:winfo ,c:css };
                }
            }
        }
    }
    intoArray(){
        this.winArr = Object.values(this.i);
        this.cssArr = Object.values(this.c);
        this.saveArr[this.targetIndex] = [this.winArr, this.cssArr];
    }
    intoOb(){
        let css = justNewOb(this.c);
        let winfo = justNewOb(this.i);
        this.obArr[this.targetIndex] = { i:winfo ,c:css }
    }
    open(){
        this.i = this.obArr[this.targetIndex].i;
        this.c = this.obArr[this.targetIndex].c;
    }
    insert(){
        let colorNum = 0;
        for(let j=0;j<this.saveArr.length;j++){
            colorNum += 1; if(colorNum > 4){ colorNum=0; }
            if(this.saveArr[j]==null){
                this.targetIndex = j;
                this.firstSet();
                let color = OP.colorArr[colorNum];
                for(let key in OP.lightColor[color]){
                    this.c[key] = OP.lightColor[color][key];
                }
                    for(let k=0; k<this.obArr.length;k++){
                        if(this.obArr[k]!=null&&this.obArr[k].i.next == null){
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
    edit(){
        this.intoArray();
        this.intoOb();
        this.save();
    }
    delete(){
        for(let j=0;j<this.obArr.length;j++){
            if(this.obArr[j]!=null&&this.obArr[j].i.index == this.targetIndex){
                let nextI = this.obArr[j].i.next;
                let befoI = this.obArr[j].i.befo;
                if(befoI != null){
                    this.targetIndex = befoI;
                    this.open();
                    if(befoI == null){this.i.next = null}else{
                        this.i.next = nextI;
                    }
                    this.intoArray();
                    this.intoOb();
                }
                if(nextI != null){
                    this.targetIndex = nextI;
                    this.open();
                    if(befoI == null){this.i.befo = null}else{
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
    save(){
        localStorage.setItem(BA.W.Wsave, JSON.stringify(this.saveArr));
    }

    select(){}
    real(){
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
        
        titleBtn.style.fontSize = `${this.c.fontSize}pt`;
        titleBtn.style.fontFamily = this.c.fontKind;
        titleBtn.style.fontStyle = this.c.fontType;
        titleBtn.style.fontWeight = this.c.fontThick;
        titleBtn.style.color = this.c.font;

        titleBtn.style.flexGrow = 1;
        titleBtn.style.textAlign = 'left';
        titleBtn.style.padding = '0';
        titleBtn.style.backgroundColor = 'transparent';
        titleBtn.style.border = 'none';
        titleBtn.style.paddingLeft = '10px'
        //head-title-pls btn
        let plsBtn = document.createElement("button");
        plsBtn.innerText = '+';

        plsBtn.style.display = 'flex';
        plsBtn.style.alignItems = 'center';
        plsBtn.style.justifyContent = 'center';
        plsBtn.style.padding = '0';
        plsBtn.style.paddingBottom = '5px';

        plsBtn.style.fontSize = `${this.c.fontSize}pt`;
        plsBtn.style.fontFamily = this.c.fontKind;
        plsBtn.style.fontStyle = this.c.fontType;
        plsBtn.style.fontWeight = this.c.fontThick;
        plsBtn.style.color = this.c.font;

        plsBtn.style.flexShrink = 0;
        plsBtn.style.width = '40px';
        plsBtn.style.height = '40px';

        plsBtn.style.backgroundColor = 'transparent';
        plsBtn.style.border = 'none';
        //head-tapChoose btns
        let tapChooseDiv = document.createElement('div');
        tapChooseDiv.className = this.i.className+'_tapChoose';
        tapChooseDiv.style.display = 'flex';
        tapChooseDiv.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;

        for(let i=0; i<OP.tapType.length;i++){
            let tapBtn = document.createElement('button');
            tapBtn.className = this.i.className+`_tapBtn_${i}`;
            tapBtn.innerText = OP.tapType[i];

            tapBtn.style.fontSize = `${this.c.fontSize}pt`;
            tapBtn.style.fontFamily = this.c.fontKind;
            tapBtn.style.fontStyle = this.c.fontType;
            tapBtn.style.fontWeight = this.c.fontThick;
            tapBtn.style.color = this.c.font;
            
            tapBtn.style.flexGrow = 1;
            tapBtn.style.backgroundColor = 'transparent';
            tapBtn.style.border = 'none';
            tapBtn.style.textAlign = 'left';
            tapBtn.style.padding = '0';
            tapBtn.style.paddingLeft = '10px';
            tapBtn.style.paddingBottom = '5px';

            tapChooseDiv.appendChild(tapBtn);
        }
        let winPlsBtn = document.createElement('button');
        winPlsBtn.className = this.i.className+`_tapBtn_winPls`;
        winPlsBtn.innerText = '+win';

        winPlsBtn.style.fontSize = `${this.c.fontSize}pt`;
        winPlsBtn.style.fontFamily = this.c.fontKind;
        winPlsBtn.style.fontStyle = this.c.fontType;
        winPlsBtn.style.fontWeight = this.c.fontThick;
        winPlsBtn.style.color = this.c.font;
        
        winPlsBtn.style.flexGrow = 1;
        winPlsBtn.style.backgroundColor = 'transparent';
        winPlsBtn.style.border = 'none';
        winPlsBtn.style.textAlign = 'left';
        winPlsBtn.style.padding = '0';
        winPlsBtn.style.paddingLeft = '10px';
        winPlsBtn.style.paddingBottom = '5px';

        tapChooseDiv.appendChild(winPlsBtn);
        //head-winEdit
        let winEdit = document.createElement('div');
        winEdit.className = this.i.className+'_winEdit';
        winEdit.style.display = 'flex';
        winEdit.style.borderBottom = `${this.c.rowThic}px solid ${this.c.row}`;

        let wEdit = document.createElement('div');


        ////////////////
        title.appendChild(titleBtn);
        title.appendChild(plsBtn);
        head.appendChild(title);
        head.appendChild(tapChooseDiv);
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
let btn = document.createElement('button');
console.log(btn);

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