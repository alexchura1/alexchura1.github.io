---
title: Gestion de usuarios en Oracle
published: true
---

### [](#header-3)Introduccion

Todo acceso a una base de datos requiere conectar mediante un usuario y contraseña. Dicho usuario dará derecho a utilizar ciertos objetos de la base de datos, pero tendrá restringido (salvo que se trate de un superadministrador) el uso de otros.

A los usuarios se les asigna una serie de privilegios que son los que dan permiso de uso a ciertos objetos. Estos privilegios suelen agruparse en lo que se conoce como roles, que permiten estructurar mejor los permisos que se conceden a los usuarios. El perfil del usuario será el conjunto de permisos y restricciones que se aplican a dicho usuario.

Por ello cuando un usuario conecta debe probar que es quien dice ser (normalmente mediante una contraseña), es decir se autentifica. Por otro lado esta autentificación dará lugar a unos privilegios (unos derechos) y unas restricciones

Todo lo que se explica en esta unidad se refiere a la gestión de usuarios en la base de datos Oracle 11g.

### [](#header-3)Cuentas y permisos administrativos

Durante la instalación de Oracle se instalan dos cuentas administrativas y otras dos con permisos especiales para tareas de optimización y monitorización de la base de datos:

#### [](#header-4)SYS 

Inicialmente posee la contraseña CHANGE ON INSTALL que, lógicamente, hay que cambiar inmediatamente en la instalación. SYS toma rol de DBA (es decir, de superadministrador) y es en su esquema donde se crea el diccionario de datos; por lo que no conviene de ninguna manera crear otro tipo de elementos en su esquema; es decir, el usuario SYS no debe crear tablas, ni vistas no ningún otro objeto de la base de datos.

#### [](#header-4)SYSTEM

Posee también el rol DBA y se crea durante la instalación. Como antes, la contraseña MANAGER que tiene por defecto se debería cambiar en la instalación. En su esquema se suelen crear tablas y vistas administrativas (pero no se deberían crear otro tipo de tablas).

#### [](#header-4)SYSMAN

Usado para realizar tareas administrativas con la aplicación Database Control del Enterprise Manager.

#### [](#header-4)DBSNMP 

Usuario que tiene permisos para monitorizar Enterprise Manager.

### [](#header-3)Privilegios administrativos

#### [](#header-4)SYSDBA 

Con capacidad de parar e iniciar (instrucciones SHUTDOWN y STARTUP) la instancia de base de datos; modificar la base de datos (ALTER DATABASE), crear y borrar bases de datos (CREATE y DROP DATABASE), Crear el archivo de parámetros (CREATE SPFILE), cambiar el modo de archivado de la base de datos, recuperar la base de datos y además incluye el privilegio de sistema RESTRICTED SESSION. En la práctica sus capacidades son las asociadas al usuario SYS.

#### [](#header-4)SYSOPER

Permite lo mismo que el anterior salvo: crear y borrar la base de datos y recuperar en todas las formas la base de datos (hay modos de recuperación que requieren el privilegio anterior).