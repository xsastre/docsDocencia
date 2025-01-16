/*

String.prototype.isNif=function()
{
    return /^(\d{8})([A-HJ-NP-TV-Z])$/.test(this) && ("TRWAGMYFPDXBNJZSQVHLCKE"[(RegExp.$1%23)]==RegExp.$2);
};
*/


function calculaLletra(pdni) {
    expressioRegular= new RegExp(/^(\d{8})/);
    if (expressioRegular.test(pdni)==false)
        return "DNI Incorrecte";
    else {
        let resultat= "TRWAGMYFPDXBNJZSQVHLCKE"[(RegExp.$1%23)];
        return resultat;
    }
}

// Exemples
// Prova "12341234" DNI erroni
// Prova "00000000" Tornarà T
let dni="00000000";
console.log(calculaLletra(dni));
