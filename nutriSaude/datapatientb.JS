[
    {
    'repeat(30, 30)': {
       name:'{{firstName()}} {{surname()}}',
       cpf: '{{integer(11111111111, 99999999999)}}',
       doctor: '{{random("Medica 1", "Medica 2", "Medica 3")}}',
       price: '130',
       bioimpedancia: '{{bool()}}',
       date: '{{integer(2020,2021 )}}-{{integer(0,10)}}-{{integer(1,31)}}',
       id:'{{index()}}'
     }
    }
   ]