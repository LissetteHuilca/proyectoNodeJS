class Usuario{
    constructor(objUser){
        this.nombre=objUser.nombre;//parte derecha Json
        this.usuario=objUser.usuario;
        this.pass=objUser.pass;
        this.score=objUser.score;
        
        var rompecabezas=[];
         $.each(objUser.rompecabezas, function(i, rmp){//rompecabeza(respuesta)
           rompecabezas.push(new Rompecabeza(rmp));
        });
        
        
        this.rompecabezas= rompecabezas;
    }
}
class Rompecabeza{
    constructor(objRmp){
        this.titulo=objRmp.titulo;
        this.portada=objRmp.portada;
        this.sonido=objRmp.sonido;
        
        var piezas=[];
         $.each(objRmp.piezas, function(i, pieza){//pieza(respuesta)
           piezas.push(new Pieza(pieza));
        });
        
        this.piezas=piezas;
        
    }
}

class Pieza{
    constructor(objPieza){
        this.imagen=objPieza.imagen;
        this.orden=objPieza.orden;
    }
}

function listarRompecabezas(){
   var rompecabezas=[];
    
    $("#audioFondo").append("<audio loop id='audioF' controls><source type='audio/wav' src='..\/audios\/lagranja.mp3'></audio>");
    $("#audioF")[0].play();
    $("#audioFondo").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='..\/audios\/eligeRompecabezas.mp3'></audio>");
    $("#audioP")[0].play();
    
    $.ajax({
        url: '/listarRompecbz',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
	  rompecabezas=data;              
	var idNino = localStorage.getItem("idnino");
	$.each(rompecabezas, function(i, objRmp){
	
		   $("#lista").append("<div class='col-sm-4'>\
		               <button id='btnLista' onclick='enviar("+i+")'>\
		               <h3 id='idh3'>"+ objRmp.titulo + "</h3>\
		               <img class='imgPortada img-fluid' src='" + objRmp.portada + "'alt=''>\
		               </button>\
		               </div>"); 
	        
	
	});	
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("eror"); 
           
        }
    });

};

function listarNiños(){
   var niños=[];
    
    $("#audioFondo").append("<audio loop id='audioF' controls><source type='audio/wav' src='..\/audios\/lagranja.mp3'></audio>");
    $("#audioF")[0].play();
    $("#audioFondo").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='..\/audios\/eligeRompecabezas.mp3'></audio>");
    $("#audioP")[0].play();
    
    $.ajax({
        url: '/listarNinos',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
	  niños=data;              
	//var idUsuario = localStorage.getItem("idUser");
	$.each(niños, function(i, objNino){
	
		   $("#listaNiños").append("<div class='col-sm-4'>\
		               <button id='btnLista' onclick='cambiar("+objNino.id+")'>\
		               <h3 id='idh3'>"+ objNino.nombre + "</h3>\
		               <img class='imgPortada img-fluid' src='" + objNino.imagen + "'alt=''>\
		               </button>\
		               </div>"); 
	        
	
	});	
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });

    
}

function guardarUsuario(){
    var usuario = {
        usuario:$("#usuario").val(),
        pass:$("#contraseña").val(),
        nombre:$("#nombre").val()
    }
    
    $.ajax({
        url: '/guardarUsuarios',
        type: 'POST',
        data: usuario,
        cache: false,
        
        success: function (data) {
	           window.location='/menuUsuarios'
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
  }  

function guardarEditarUsuario(){
    var usuario = {
        id:localStorage.getItem("idUsuario"),
        usuario:$("#usuario").val(),
        pass:$("#contraseña").val(),
        nombre:$("#nombre").val()
    }
    
    $.ajax({
        url: '/guardarEditarUsuario',
        type: 'POST',
        data: usuario,
        cache: false,
        
        success: function (data) {
	           window.location='/menuUsuarios'
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
  }  

function eliminarUsuario(idUsuario){
    var usuario = {
        idUsr:idUsuario
    }
    
    $.ajax({
        url: '/eliminarUsuarios',
        type: 'POST',
        data: usuario,
        cache: false,
        
        success: function (data) {
	           window.location='/menuUsuarios'
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
  }  

function listarMenuUsuarios(){
   var usuarios=[];
    
    $("#audioFondo").append("<audio loop id='audioF' controls><source type='audio/wav' src='..\/audios\/lagranja.mp3'></audio>");
    $("#audioF")[0].play();
    $("#audioFondo").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='..\/audios\/eligeRompecabezas.mp3'></audio>");
    $("#audioP")[0].play();
    
    $.ajax({
        url: '/listarUsuarios',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
	  usuarios=data;              
	//var idUsuario = localStorage.getItem("idUser");
	$.each(usuarios, function(i, objUsr){
	
		   $("#listaUsuarios").append("<div class='col-sm-4'>\
                    <h2 id='idh2'>"+ objUsr.nombre + "</h2>\
                    <h3 id='idh3'>"+ objUsr.usuario + "</h3>\
                    <h3 id='idh3'>"+ objUsr.contrasena + "</h3>\
		            <button id='btnLista' onclick='editarUsuario("+objUsr.id+")'>Editar</button>\
                    <button id='btnLista' onclick='eliminarUsuario("+objUsr.id+")'>Eliminar</button>\
		               </div>"); 
	        
	
	});	
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });

    
}

function listarMenuNinos(){
   var niños=[];
    
    $("#audioFondo").append("<audio loop id='audioF' controls><source type='audio/wav' src='..\/audios\/lagranja.mp3'></audio>");
    $("#audioF")[0].play();
    $("#audioFondo").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='..\/audios\/eligeRompecabezas.mp3'></audio>");
    $("#audioP")[0].play();
    
    $.ajax({
        url: '/listarNinos',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
	  niños=data;              
	//var idUsuario = localStorage.getItem("idUser");
	$.each(niños, function(i, objNino){
	$("#listarNiños").append("<div class='col-sm-4'>\
                    <h2 id='idh2'>"+ objNino.nombre + "</h2>\
                    <h3 id='idh3'>"+ objNino.score + "</h3>\
                    <img class='imgPortada img-fluid' src='" + objNino.imagen + "'alt=''>\
		            <button id='btnLista' onclick='editarNino("+objNino.id+")'>Editar</button>\
                    <button id='btnLista' onclick='eliminarNino("+objNino.id+")'>Eliminar</button>\
		               </div>");
	        
	
	});	
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
    
}

function guardarNino(){
    var nino = {
        nombre:$("#nombre").val(),
        score:$("#score").val(),
        imagen:$("#imagen").val()
    }
    
    $.ajax({
        url: '/guardarNinos',
        type: 'POST',
        data: nino,
        cache: false,
        
        success: function (data) {
	           window.location='/menuNinos'
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
  } 


function guardarEditarNino(){
    var nino = {
        id:localStorage.getItem("idNino"),
        
        nombre:$("#nombre").val(),
        score:$("#score").val(),
        imagen:$("#imagen").val()
        
    }
    
    $.ajax({
        url: '/guardarEditarNino',
        type: 'POST',
        data: nino,
        cache: false,
        
        success: function (data) {
	           window.location='/menuNinos'
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
  } 

function eliminarNino(idNino){
    var nino = {
        idN:idNino
    }
    
    $.ajax({
        url: '/eliminarNinos',
        type: 'POST',
        data: nino,
        cache: false,
        
        success: function (data) {
	           window.location='/menuNinos'
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
  }  

function listarRompecabezasPorUsuario(){
   var rompecabezas=[];
    
    $("#audioFondo").append("<audio loop id='audioF' controls><source type='audio/wav' src='..\/audios\/lagranja.mp3'></audio>");
    $("#audioF")[0].play();
    $("#audioFondo").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='..\/audios\/eligeRompecabezas.mp3'></audio>");
    $("#audioP")[0].play();
    
    $.ajax({
        url: '/listarRompecbz',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
	  rompecabezas=data;              
	var idUsuario = localStorage.getItem("idUser");
	$.each(rompecabezas, function(i, objRmp){
	if(objRmp.idusuario==idUsuario){
		   $("#lista").append("<div class='col-sm-4'>\
		               <button id='btnLista' onclick='enviar("+i+")'>\
		               <h3 id='idh3'>"+ objRmp.titulo + "</h3>\
		               <img class='imgPortada img-fluid' src='" + objRmp.portada + "'alt=''>\
		               </button>\
		               </div>"); 
	        
	}
	});	
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("eror"); 
           
        }
    });

}

function cambiar(idnino) {
    localStorage.setItem("idnino", idnino);//guardar en cache
    window.location = '/listarRompecabezas';
}

function cargarUsuario() {
    var idUsuario = localStorage.getItem("idUsuario");//guardar en cache
    var usuario={
        idUsr:idUsuario
        }
    $.ajax({
        url: '/listarUsuarioPorId',
        type: 'POST',
        data: usuario,
        cache: false,
        
        success: function (data) {
	  
    $("#usuario").val(data[0].usuario);
    $("#contraseña").val(data[0].contrasena);
    $("#nombre").val(data[0].nombre);
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
    
}

function editarUsuario(idUsuario) {
    localStorage.setItem("idUsuario", idUsuario);//guardar en cache
    window.location = '/editarUsuario';
}

function cargarNino() {
    var idNino = localStorage.getItem("idNino");//guardar en cache
    var nino={
        idN:idNino
        }
    $.ajax({
        url: '/listarNinoPorId',
        type: 'POST',
        data: nino,
        cache: false,
        
        success: function (data) {
	  
    $("#nombre").val(data[0].nombre);
    $("#score").val(data[0].score);
    $("#imagen").val(data[0].imagen);
            
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
           
        }
    });
    
}

function editarNino(idNino) {
    localStorage.setItem("idNino", idNino);//guardar en cache
    window.location = '/editarNino';
}

 function enviar(pos) {
    localStorage.setItem("posRmp", pos);//guardar en cache
    window.location = "rompecabeza.html";
}


var intentos=0;
var piezaCorrecta=0;

 function recibir() {
     
    
     var usuarios=[];
     
     console.log(usuarios);
     
    var recoger = localStorage.getItem("posRmp");//guardar 
    //alert(recoger);
     
     var idUsuario = localStorage.getItem("idUser");
      
    $.getJSON('info.json', function(data){
     
        $.each(data, function(i, user){//user(respuesta)
           usuarios.push(new Usuario(user));
        });
        //obteniendo los datos de cada rompecabezas
            $.each(usuarios[idUsuario].rompecabezas, function(i, objRmp){//rompecabeza(respuesta)

        if(i==recoger){
            
            $("#titulo").html(objRmp.titulo);
             $("#puntaje").html(usuarios[idUsuario].score);
             $("#intentos").html(intentos);
            
            var lista= objRmp.piezas;
            lista= objRmp.piezas.sort(function() {return Math.random() - 0.5})
      
            
         $.each(lista, function(i, objPieza){//user(respuesta)
           $(".piezas").append("<div class='col-sm-4'><img id='s"+objPieza.orden+"' class='img-fluid' src='"+objPieza.imagen+"'></div>");
             
            $("#s"+objPieza.orden).draggable({ revert: true});//si no es compatible con la posisicon se regresa // llama al mismo id
             
             
             
             $(".fondoRmp").append("<div id='fs"+(i+1)+"' class='col-sm-4 fondoPz'></div>");
             
             
             //que reciban el tablero
             $("#fs"+(i+1)).droppable({
        drop: function (event, ui) {
            intentos++;
            
            if(intentos>20){
                         //alert("INTÉNTALO DE NUEVO");
                        $("#audioDiv").html("<audio id='audioE' controls><source type='audio/mp3' src='..\/audios\/perdiste.mp3'></audio>");
                        $("#audioE")[0].play();
                         
                         
            }
        
             $("#intentos").html(intentos);
            if ("f"+ui.draggable.attr("id") == $(this).attr("id")) {
                $("#audioDiv").html("<audio id='audioA' controls><source type='audio/wav' src='"+objRmp.sonido+"'></audio>");
                                    $("#audioA")[0].play();
                piezaCorrecta++;
                
                if(piezaCorrecta == objRmp.piezas.length){
                   
                   //alert("GANASTE!");
                    
                                       
                    if(intentos<=15){
                        //alert("PUNTOS!!");
                        $("#audioDiv").html("<audio id='audioE' controls><source type='audio/mp3' src='..\/audios\/ganaste.mp3'></audio>");
                        $("#audioE")[0].play();
                        usuarios[idUsuario].score++;
                         $("#puntaje").html(usuarios[idUsuario].score);
                       }else{
                          $("#audioDiv").html("<audio id='audioE' controls><source type='audio/mp3' src='..\/audios\/loHiciste.mp3'></audio>");
                        $("#audioE")[0].play(); 
                       }
                    
                    
                       $.ajax({
                                        url: 'guardarPuntaje.php',
                                        method: 'POST',
                                        data: {
                                            "identificador": usuarios
                                        },
                                        success: function (data) {
                                            setTimeout("location.href='listarRompecabezas.html'", 6000);
                                        },
                                        error: function (data){
                                            alert("err"+data);
                                            console.log(data);
                                            
                                        }
                                    });
                    
                    
              
            }
                
                
                
                var url = ui.draggable.attr("src");
                $(this).html("<img class='img-fluid' objPieza.orden src='" + url + "'>");
                 ui.draggable.remove();

                
                
                }else{
                    $("#audioDiv").html("<audio id='audioE' controls><source type='audio/wav' src='..\/audios\/incorrecto.mp3'></audio>");
                    $("#audioE")[0].play();
                }
            
            
            
            }
         });     
       });   
      }            
    });
 });
}


function validar(){
     var usuarios=[];    
 
	$.ajax({
        url: '/listarUsuarios',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
	  usuarios=data;              
		var user = $("#username").val();
	        var pass = $("#password").val();
	        var flag = 0;
	        $.each(usuarios, function(i, res){
		   if(user == res.usuario && pass == res.contrasena){
		       localStorage.setItem("idUser", i);
		       flag++;
		       window.location = '/menu'
		   }
	        });
	        
	        if(flag==0){
		   $("#audioError").html("<audio id='audioE' controls><source type='audio/wav' src='..\/audios\/datosincorrectos.mp3'></audio>");
		   $("#audioE")[0].play();
	        }
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("eror"); 
           
        }
    });

         
}
       $('#validar').click(validar);       
              
        
    
    





