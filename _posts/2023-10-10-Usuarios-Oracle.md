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