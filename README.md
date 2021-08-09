Hola, Erik. Espero les esté yendo muy bien en su presentación en Bogotá.
Esta será la guia descriptiva y documentada del proyecto que decidí hacerle varios plus extra para que fuera lo más listo para usar a produccón posible.
PD: verifica database_shema.sql para que puedas ver el esquema de base de datos que hice de acuerdo a 
lo pedido en la prueba.

#####################################################################################
---------Services====>
1) Sistema principal requerido de tabulación de clientes con validación de registro, lectura, listamiento filtros y actualización de clientes.

2) Sistema de administración para administradores de la empresa del sistema principal, seguridad, privilegios
capacidades, autenticaciones, registro, actualización etc.

3) Sistema de generación de codigos para el registro de administrador a la interfaz. 

4) Interfaz web free friendly para el manejo del aplicativo dependiendo al rol del administrador.

5) Sistema de testing usando metodologias rápidas para un sistema escalable y mantenible

6) Sistema por microservicios para escalonabilidad de aplicativo

7) Sistema de caché con redis para mayor velocidad de aplicativo

8) Documentación swagger e identamiento con slint para mejor trabajo en equipo
##########################################################################################################
=============> Database Intalatión
Para este caso usé postgress 13 que estaba en la computadora. Los parametros se encuentran en el .env que te envié para mayor seguridad del proyecto.

#####################################
steps:
1) instalar paquetes => npm intall
2) adjuntar .env en la raiz de todo el proyecto 
3) Debes tener nodemon instalado globalmente "npm install nodemon -g"
4) tener instalado redis ya que maneja caché con redis y llama a funcions en ciertas request, es necesario instalarlo
5) instalar postgresSQL y crear una base de datos teniendo en cuenta el archivo database_sheme.sql con las credenciales mostradas en el .env
############################
-----Warning!
Es necesario tener una cuenta administrador, puedes usar una que te mandé por correo o crear una nueva
Iba a crear un microservicios de codigos que se restablescan cada cierto tiempo para usarlos en el momento
de creacion de cuenta de administrador, pero sería algo para majorar el software.

################################################
ruta principal http://localhost/api/
ruta para request de ususarios http://localhost/api/user/
ruta para request de administradors http://localhost/api/admin
ruta de logeo para obtener el token que permitirá realizar el manejo del software===>
 http://localhost/api/auth/login