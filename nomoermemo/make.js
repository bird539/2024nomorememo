const mainDiv = document.querySelector('.mainDiv');

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
    lineThic:1.5, winWith:'456px', fontSize:'14pt',
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
    real(){}
}

let newWin = new wob(0);
newWin.setObArr();
let btn = document.createElement("button");

function al(){
    newWin.targetIndex = 3;
    newWin.delete();
}

function ins(){
    newWin.insert()
}
let p = document.createElement("p");
p.innerText = `index : befo : next`;
mainDiv.appendChild(p);
for(let i=0; i<newWin.obArr.length; i++){
    if(newWin.obArr[i]!=null){
        let p = document.createElement("p");
        p.innerText = `${newWin.obArr[i].i.index}:${newWin.obArr[i].i.befo}:${newWin.obArr[i].i.next}`;
        mainDiv.appendChild(p);
    }else{
        let p = document.createElement("p");
        p.innerText = `${i}:null`;
        mainDiv.appendChild(p);
    }
}

btn.addEventListener("click", al);
btn.innerText = 'delete';
mainDiv.appendChild(btn);

let btn2 = document.createElement("button");
btn2.addEventListener("click", ins);
btn2.innerText = 'insert';
mainDiv.appendChild(btn2);
