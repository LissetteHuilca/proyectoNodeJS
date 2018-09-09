!function(t){t.fn.snapPuzzle=function(a){function s(a){var s="sp_"+(new Date).getTime(),e=a.wrap('<span class="snappuzzle-wrap"/>').closest("span"),i=a.attr("src"),p=a.width()/o.columns,l=a.height()/o.rows,n=t(o.pile).addClass("snappuzzle-pile"),h=n.width()-p,r=n.height()-l;o.puzzle_class=s,a.data("options",o);for(var d=0;d<o.rows;d++)for(var c=0;c<o.columns;c++)t('<div class="snappuzzle-piece '+s+'"/>').data("pos",d+"_"+c).css({width:p,height:l,position:"absolute",left:Math.floor(Math.random()*(h+1)),top:Math.floor(Math.random()*(r+1)),zIndex:Math.floor(10*Math.random()+1),backgroundImage:"url("+i+")",backgroundPosition:-c*p+"px "+-d*l+"px",backgroundSize:a.width()}).draggable({start:function(){t(this).removeData("slot")},stack:".snappuzzle-piece",containment:o.containment}).appendTo(n).data("lastSlot",n),t('<div class="snappuzzle-slot '+s+'"/>').data("pos",d+"_"+c).css({width:p,height:l,left:c*p,top:d*l}).appendTo(e).droppable({accept:"."+s,hoverClass:"snappuzzle-slot-hover",drop:function(e,i){var p=t(this).data("pos");return t(".snappuzzle-piece."+s).each(function(){t(this).data("slot")==p&&(p=!1)}),p?(i.draggable.data("lastSlot",t(this)).data("slot",p),i.draggable.position({of:t(this),my:"left top",at:"left top"}),void(i.draggable.data("pos")==p&&(i.draggable.addClass("correct"),t(this).droppable("disable").css("opacity",1).fadeOut(1e3),i.draggable.css({opacity:0,cursor:"default"}).draggable("disable"),t(".snappuzzle-piece.correct."+s).length==o.rows*o.columns&&o.onComplete(a)))):!1}})}var o=t.extend({pile:"",containment:"document",rows:5,columns:5,onComplete:function(){}},a);return"string"==typeof a?(this.each(function(){var s=t(this),o=s.data("options"),e=s.width()/o.columns,i=s.height()/o.rows,p=t(o.pile),l=p.width()-e,n=p.height()-i,h=s.closest("span").offset(),r=p.offset();"destroy"==a?(t("."+o.puzzle_class).remove(),s.unwrap().removeData("options"),p.removeClass("snappuzzle-pile")):"refresh"==a&&(t(".snappuzzle-slot."+o.puzzle_class).each(function(){var a=t(this).data("pos").split("_"),s=a[0],o=a[1];t(this).css({width:e,height:i,left:o*e,top:s*i})}),t(".snappuzzle-piece."+o.puzzle_class).each(function(){if(t(this).data("slot")){var a=t(this).data("slot").split("_"),o=a[0],p=a[1],a=t(this).data("pos").split("_"),d=a[0],c=a[1];t(this).css({width:e,height:i,left:p*e+h.left-r.left,top:o*i+h.top-r.top,backgroundPosition:-c*e+"px "+-d*i+"px",backgroundSize:s.width()})}else{var a=t(this).data("pos").split("_"),u=a[0],f=a[1];t(this).css({width:e,height:i,left:Math.floor(Math.random()*(l+1)),top:Math.floor(Math.random()*(n+1)),backgroundPosition:-f*e+"px "+-u*i+"px",backgroundSize:s.width()})}}))}),this):this.each(function(){this.complete?s(t(this)):t(this).load(function(){s(t(this))})})}}(jQuery);
// jQuery UI Touch Punch 0.2.3 - must load after jQuery UI
// enables touch support for jQuery UI
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

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
		               <button id='btnLista' onclick='enviar("+objRmp.id+")'>\
		               <h3 id='idh3'>"+ objRmp.titulo + "</h3>\
		               <img class='imgPortada img-fluid' src='" + objRmp.imagen + "'alt=''>\
		               </button>\
		               </div>");
	        });	
        },
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
                    <h4 id='idh2'>Nombre: "+ objUsr.nombre + "</h4>\
                    <h5 id='idh2'>Usuario: "+ objUsr.usuario + "</h5>\
                    <h5 id='idh2'>Contraseña: "+ objUsr.contrasena + "</h5>\
		            <button class='btnAdmin btn'  onclick='editarUsuario("+objUsr.id+")'>Editar</button>\
                    <button class='btnAdmin btn' onclick='eliminarUsuario("+objUsr.id+")'>Eliminar</button>\
		            </table></div>");
	       });	
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error"); 
        }
    });
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

//NIÑO
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
           $("#listarNiños").append("<div class='col-sm-4 ninos'>\
                    <h4 id='idh2'>"+ objNino.nombre + "</h4>\
                    <h5 id='idh2'>Score: "+ objNino.score + "</h5>\
                <img class='imgPortada img-fluid' src='" + objNino.imagen + "'alt=''>\
               <button class='btnAdmin btn' onclick='editarNino("+objNino.id+")'>Editar</button>\
                    <button class='btnAdmin btn' onclick='eliminarNino("+objNino.id+")'>Eliminar</button>\
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
function cambiar(idnino) {
    localStorage.setItem("idnino", idnino);//guardar en cache
    window.location = '/listarRompecabezas';
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
function editarNino(idNino) {
    localStorage.setItem("idNino", idNino);//guardar en cache
    window.location = '/editarNino';
}


//ROMPECABEZA
function enviarPorUsuario(pos) {
    localStorage.setItem("posRmp", pos);//guardar en cache
    window.location = "/rompecabezausuario";
}
function editarRmp(pos) {
    localStorage.setItem("posRmp", pos);//guardar en cache
    window.location = "/editarRompecabeza";
}
function eliminarRmp(pos) {
    $.ajax({
        url: '/eliminarRmp',
        type: 'POST',
        data: {
            id:pos
        },
        cache: false,
        success: function (data) {
	           window.location = "/menuRompecabezas";
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
    
    $.ajax({
        url: '/listarRompecbz',
        type: 'GET',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            rompecabezas=data;              
            var idUsuario = localStorage.getItem("idUser");
            //alert(idUsuario);
            $.each(rompecabezas, function(i, objRmp){
                if(objRmp.idusuario==idUsuario){
                    $("#lista").append("<div class='col-sm-4' id='btnLista'>\
                        <h3 id='idh3'>"+ objRmp.titulo + "</h3>\
                       <button  onclick='enviarPorUsuario("+objRmp.id+")'>\
                       <img class='imgPortada img-fluid' src='" + objRmp.imagen + "'alt=''>\
                       </button>\
                       <button onclick='editarRmp("+objRmp.id+")'>Editar</button>\
                       <button onclick='eliminarRmp("+objRmp.id+")'>Eliminar</button></div>");
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

function enviar(pos) {
    localStorage.setItem("posRmp", pos);//guardar en cache
    window.location = "/rompecabezanino";
}

var intentos=0;
var piezaCorrecta=0;

 function recibirRmpNiño() {
    var recoger = localStorage.getItem("posRmp");
    //var idniño = localStorage.getItem("idniño");
    alert(recoger); 
    $.ajax({
        url: '/listarRompecbzPorId',
        type: 'POST',
        data: {
            id:recoger
        },
        cache: false,
        success: function (data) {
	        $("#titulo").html(data[0].titulo);
            //$("#puntaje").html(usuarios[idUsuario].score);
            $("#intentos").html(intentos);

//            var lista= objRmp.piezas;
//            lista= objRmp.piezas.sort(function() {return Math.random() - 0.5})
//            $.each(lista, function(i, objPieza){//user(respuesta)
//                $(".piezas").append("<div class='col-sm-4'><img id='s"+objPieza.orden+"' class='img-fluid' src='"+objPieza.imagen+"'></div>");
//
//                $("#s"+objPieza.orden).draggable({ revert: true});//si no es compatible con la posisicon se regresa // llama al mismo id
//                $(".fondoRmp").append("<div id='fs"+(i+1)+"' class='col-sm-4 fondoPz'></div>");
//                //que reciban el tablero
//                $("#fs"+(i+1)).droppable({
//                    drop: function (event, ui) {
//                    intentos++;
//
//                    if(intentos>20){
//                        //alert("INTÉNTALO DE NUEVO");
//                        $("#audioDiv").html("<audio id='audioE' controls><source type='audio/mp3' src='..\/audios\/perdiste.mp3'></audio>");
//                        $("#audioE")[0].play();
//                    }
//
//                    $("#intentos").html(intentos);
//                    if ("f"+ui.draggable.attr("id") == $(this).attr("id")) {
//                        $("#audioDiv").html("<audio id='audioA' controls><source type='audio/wav' src='"+objRmp.sonido+"'></audio>");
//                        $("#audioA")[0].play();
//                        piezaCorrecta++;
//
//                        if(piezaCorrecta == objRmp.piezas.length){
//                        //alert("GANASTE!");
//
//
//                        if(intentos<=15){
//                            //alert("PUNTOS!!");
//                            $("#audioDiv").html("<audio id='audioE' controls><source type='audio/mp3' src='..\/audios\/ganaste.mp3'></audio>");
//                            $("#audioE")[0].play();
//                            usuarios[idUsuario].score++;
//                             $("#puntaje").html(usuarios[idUsuario].score);
//                           }else{
//                              $("#audioDiv").html("<audio id='audioE' controls><source type='audio/mp3' src='..\/audios\/loHiciste.mp3'></audio>");
//                            $("#audioE")[0].play(); 
//                           }
//                           $.ajax({
//                                url: 'guardarPuntaje.php',
//                                method: 'POST',
//                                data: {
//                                    "identificador": usuarios
//                                },
//                                success: function (data) {
//                                    setTimeout("location.href='listarRompecabezas.html'", 6000);
//                                },
//                                error: function (data){
//                                    alert("err"+data);
//                                    console.log(data);
//
//                                }
//                            });
//                    }
//                    var url = ui.draggable.attr("src");
//                    $(this).html("<img class='img-fluid' objPieza.orden src='" + url + "'>");
//                     ui.draggable.remove();
//                    }else{
//                        $("#audioDiv").html("<audio id='audioE' controls><source type='audio/wav' src='..\/audios\/incorrecto.mp3'></audio>");
//                        $("#audioE")[0].play();
//                    }
//                }
//             });     
//           });   
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error");
        }
    });    
}

$('.añadirSonido').click(function () {
    var formData = new FormData($(".formularioSonido")[0]);
    $.ajax({
        url: '/subir',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
                $("#divSonido").html("<audio class='styleAudio' controls><source id='sonido' src='../rompecabeza/"+data+"' type='audio/mp3' ></audio>")
        }
    });
});

$('.añadirImagen').click(function () {
    var formData = new FormData($(".formularioImagen")[0]);
    var message = "";
    $.ajax({
        url: '/subir',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $("#divImagen").html("<img id='imagen' class='imgPortada' src='../rompecabeza/"+data+"'></img>")
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
});


function ganar(){
alert("ganaste");
}
function guardarRompecabeza(){
    if($("#titulo").val()!='' && $("#sonido").attr('src')!=undefined && $("#imagen").attr('src')!=undefined && $("#piezas").val()!=undefined){
        var datosRmp = {
            titulo:$("#titulo").val(),
            sonido:$("#sonido").attr('src'),
            imagen:$("#imagen").attr('src'),
            piezas:$("#piezas").val(),
            idusuario:localStorage.getItem("idUser")
        }
        console.log(datosRmp);
        $.ajax({
            url: '/guardarRompecabeza',
            type: 'POST',
            data: datosRmp,
            cache: false,
            success: function (data) {
                   window.location='/menuRompecabezas'
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");
                 alert("error");
            }
        });
    }else{
        alert("Falta llenar");
    }
    
} 
function cargarRompecabeza(){
    var recoger = localStorage.getItem("posRmp");
    //alert(recoger); 
    $.ajax({
        url: '/listarRompecbzPorId',
        type: 'POST',
        data: {
            id:recoger
        },
        cache: false,
        success: function (data) {
            $("#titulo").val(data[0].titulo);
            $("#piezas").val(data[0].piezas);
            $("#divSonido").html("<audio controls><source type='audio/wav' id='sonido' src='"+data[0].sonido+"'></audio>");
            $("#divImagen").html("<img class='imgPortada img-fluid' id='imagen' src='" + data[0].imagen + "' alt=''>");
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("error");
        }
    });
}

function guardarEditarRompecabeza(){
    if($("#titulo").val()!='' && $("#sonido").attr('src')!=undefined && $("#imagen").attr('src')!=undefined && $("#piezas").val()!=undefined){
        var datosRmp = {
            id:localStorage.getItem("posRmp"),
            titulo:$("#titulo").val(),
            sonido:$("#sonido").attr('src'),
            imagen:$("#imagen").attr('src'),
            piezas:$("#piezas").val()
        }
        console.log(datosRmp);
        $.ajax({
            url: '/guardarEditarRompecabeza',
            type: 'POST',
            data: datosRmp,
            cache: false,
            success: function (data) {
                   window.location='/menuRompecabezas'
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");
                 alert("error");
            }
        });
    }else{
        alert("Falta llenar");
    }
} 

//LOGIN
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
                   localStorage.setItem("idUser", res.id);
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


var containment;    
var puzzleContainer_pile;
var puzzle_startTime, puzzle_endTime;//make global
var puzzle_grid;
function visualizar(){
    
    var select = $("#piezas").val();
    //alert(select);
    containment = $('.puzzleX999_paddedWrap');
    puzzleContainer_pile = $('#puzzleX999_Main');
    var snappuzzlePiece = $('.snappuzzle-piece');
    puzzle_grid = select;
     
    
    puzzleContainer_pile.height($('.puzzleX999_img').height());
    start_puzzleX999(puzzle_grid);

    
    
    //update puzzle on resize 
    $(window).resize($.debounce(250, updatePuzzleImageHeight));
    //set puzzle_startTime once puzzlePiece dragged
    $(document).one('drag', snappuzzlePiece, function(){
      console.log('puzzle piece was clicked!');
      puzzle_startTime = Date.parse(new Date());
      console.log(puzzle_startTime);
    });  
//    $(".panel").jigsaw({freq: 0, x: 4, y:4, margin: 2, callbacks: [{event: 'mouseover', func: function() {
//            $(this).data('last_bg', $(this).css('background-image'));
//            $(this).css('background-image', 'none');
//        }}, {event: 'mouseout', func: function() {
//            $(this).css('background-image', $(this).data('last_bg'));
//        }}]});	
//    var select = $("#piezas").val();
//    var ruta=$("#imagen").attr("src");
//    if(ruta!=null){
//        
////        //alert(select);
////        snapfit.defaultForcetouchui = true;
////        snapfit.defaultMixed        = true;
////        //snapfit.defaultCallback     = false;
////        snapfit.defaultAreaimage    = true;
////        snapfit.add($("#imagen"), {level:6, bwide:1});
////        //$("#divImagenRmp").html("<img id='imagenRmp' onload='snapfit.add(this,{callback: function() {alert('You solved the puzzle!');}, aborder:true, aimage:true, polygon:true, space:20});' src='"+ruta+"' width='500' border='0'></img>")
//    }else{
//        alert("Inserta una imagen");
//    }
}

//reset puzzle
$('.restart_puzzleX999').on('click', function(){
      $('.puzzleX999_img').snapPuzzle('destroy');
      start_puzzleX999(puzzle_grid);
});

function updatePuzzleImageHeight(){
    puzzleContainer_pile.height($('.puzzleX999_img').height());
    $('.puzzleX999_img').snapPuzzle('refresh');    
}
function start_puzzleX999(x, y){
    if(!y){
        y = x;
    }
    $('.puzzleX999_img').snapPuzzle({
        rows: x, 
        columns: y,
        pile: puzzleContainer_pile,//where our puzzle while be contained, MUST be defined in the dom
        containment: containment,
        onComplete: function(){
            console.log('puzzle completed!');
            puzzle_endTime = Date.parse(new Date());
            getKompletionTime_str(puzzle_startTime, puzzle_endTime);                    
        }
    });
}
function getKompletionTime_str(puzzle_startTime, puzzle_endTime){
    var timeTaken = puzzle_endTime - puzzle_startTime,
        seconds = Math.floor((timeTaken/1000)%60),
        minutes = Math.floor((timeTaken/1000/60)%60),
        hours = Math.floor((timeTaken/(1000*60*60))%60),
        kompletionTime_str = '';
        console.log(puzzle_endTime);
        kompletionTime_str = 'Wow! You completed the puzzle in ' + setHours_str(hours) +  setMinutes_str(minutes) + seconds + ' seconds!!!'
        console.log(kompletionTime_str);
        setTimeout(function(){
            alert(kompletionTime_str)
        },999);
    //utilities
    function setHours_str(hours){return hours < 1 ? '': hours + ' hrs. ';}
    function setMinutes_str(minutes){return minutes < 1 ? '': minutes + ' mins. ';}   
}