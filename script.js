//import {Cicle} from "./Cicle.js"

let llistatCicles = [];

document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);


class Cicle {
    constructor(nomx,categoriax,numAlumnesx,abreviaturax) {
      this.nom = nomx;
      this.categoria = categoriax;
      this.numAlumnes = numAlumnesx;
      this.abreviatura = abreviaturax;
      this.numEdicions = 0;
      this.fecha = "";
      this.moduls = [];
    }
    setNumEdicions(){
        return(this.numEdicions+=1);
    }
    data(){
        let pro = new Date();
        return (this.fecha = pro.getDate() + "/" + (pro.getMonth() + 1) + "/" + pro.getFullYear() + 
            " Hora: " + pro.getHours() + ":" + pro.getMinutes() + ":" + pro.getSeconds());
    }
    toString(index){
        return `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${this.abreviatura.toUpperCase()}. ${this.nom}</h5>
                    <h6 class="text-gray-700">${this.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${this.numAlumnes}</p>
                    <p class="font-normal text-gray-700">Num d'Edicions: ${this.numEdicions}</p>
                    <p class="font-normal text-gray-700">Data d'Edició: ${this.fecha}</p>

                    <button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" onClick="calculHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;
    }
}  


class Modul {
    constructor(modul_nom, modul_num, modul_hores) {
      this.modul_nom = modul_nom;
      this.modul_num = modul_num;
      this.modul_hores = modul_hores;
    }
    toString(){
        return `MP${modul_num}. ${this.modul_nom} (${this.modul_hores}h)`;
    }
}  


function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    let value = document.getElementById("editCicle").value;

    let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);

    console.log(cicle);

    if(document.getElementById("editCicle").value === "-1"){
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
    }else{
        //Editar cicle
        llistatCicles[value].nom=nom;
        llistatCicles[value].categoria=categoria;
        llistatCicles[value].numAlumnes=numAlumnes;
        llistatCicles[value].abreviatura=abreviatura;
        llistatCicles[value].setNumEdicions();
        llistatCicles[value].data();
        llistatCicles[value].toString();
    }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
}

function afegirModul(){
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = new Modul(modul_nom, modul_num, modul_hores);

    console.log(modul);

    llistatCicles[cicle].moduls.push(modul);
    console.log(llistatCicles);
    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}

//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value=i;
}

//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += element.toString(index);

       
    });

    document.getElementById("llistat").innerHTML=str;
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    llistatCicles.splice(i,1);
    actualitzarSelector();
    printLlistat(llistatCicles);
}


//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}