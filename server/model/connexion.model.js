const sql = require("./db");
const connexion = function () {
   
  };
 

connexion.create = (con, result) => {
    let rechsql = 'SELECT Mail from Utilisateurs';
let spotted = true;
sql.query(rechsql, (err, res)=> {
  
  for(let i = 0;i<res.length;i++){
    if(res[i].Mail==con.Mail){
        spotted = false;
        
    }
}
if(spotted){
    const req = 'INSERT INTO Utilisateurs(Nom , Prenom , Adresse , CodePostal,Mail,password) VALUES ? ';
    const values = [[con.nom,con.prenom,con.adresse,con.codePostal,con.Mail,con.password]];
    sql.query(req , [values])
    
let rechid = 'SELECT Id from Utilisateurs where Mail = "'+con.Mail+'"';
sql.query(rechid, function (err, resu, fields) {
  console.log(resu);
if(resu == undefined){
    result(null , { message: 'erreur interne'});
}else{
    result(null , { message: 'inscription finie', id : resu[0].Id });
}
});

}else{
    result(null , { message: 'error'});
}

})



    //result(null , 'Values inserted')


  }



  connexion.access = (cons, result) => {
console.log(cons.Mail);
    let rechsql = 'SELECT * from Utilisateurs where Mail = "'+cons.Mail+'"';
    sql.query(rechsql, function (err, res) {
        console.log(res);
if(res[0] == undefined){
    result(null , {message:'erreur de mot de passe'});
}else{
      

    result(null , {message: "entrée dans l'appli" , id : res[0].Id, hash: res[0].password});
      

}
  })


}
  module.exports = connexion;