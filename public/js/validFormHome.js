function validateForm() {

    let name = document.getElementById('name');
    let telephone = document.getElementById('telephone');
    let price= document.getElementById('price');
    let aux = true;

    if(name.value == ""){
        name.classList.add('is-invalid');
        aux = false;
    } 
    else {
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
    }

    if(telephone.value == "" || telephone.value.length < 14){
        telephone.classList.add('is-invalid');
        aux = false;
    }
    else {
        telephone.classList.remove('is-invalid');
        telephone.classList.add('is-valid');
    }

    if(price.value=="" || isNaN(price.value)){
        price.classList.add('is-invalid');
        aux = false;
    }
    else {
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
    }
    



   return aux;
    
}