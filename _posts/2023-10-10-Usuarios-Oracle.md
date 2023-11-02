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

### [](#header-3)Propiedades de los usuarios de oracle

*   Abierta
*   Bloqueada
*   Expirada
*   Expirada y bloqueada
*   Expirada en periodo de gracia

### [](#header-3)Gestion de usuarios en Oracle

La sentencia de creación de usuarios (que es compatible con SQL estándar) es:

```sql
CREATE USER name_user
IDENTIFIED BY password;
```

Las sentencias SQL por SGBD son: 

```sql
--mysql
CREATE USER 'USUARIO'@'localhost' IDENTIFIED BY 'CONTRASEÑA';

--PostgreSQL
CREATE USER USUARIO WITH PASSWORD 'CONTRASEÑA';

--SQL server
CREATE LOGIN USUARIO WITH PASSWORD = 'CONTRASEÑA';
```

El formato completo en Oracle de la instrucción con todas sus cláusulas es:

```sql
CREATE USER nombre {IDENTIFIED BY password}
    [DEFAULT TABLESPACE tableSpacePorDefecto]
    [TEMPORARY TABLESPACE tableSpacetTemporal]
    [QUOTA {cantidad [K|M] | UNLIMITED} ON tablespace]
    [PASSWORD EXPIRE]
    [ACCOUNT {UNLOCK|LOCK}];
    [PROFILE {perfil | DEFAULT}]
```

### [](#header-3)Ejemplos
```sql
CREATE USER lchura IDENTIFIED BY lchura 
    DEFAULT TABLESPACE USERS
    QUOTA 15M ON USERS //Se dan 15MBytes de espacio en el tablespace
    ACCOUNT LOCK; //La cuenta estara bloqueada
```
La contraseña, si no se usan comillas dobles, no puede tener ni espacios en blanco ni caracteres nacionales como la eñe. En caso de querer usar estos símbolos se usan comillas dobles, lo que permitirá establecer contraseñas más complejas.

### [](#header-3)Modificacion de usuarios

Cada parámetro indicado anteriormente se puede modificar mediante la instrucción ALTER USER que se utiliza igual que CREATE USER. 
Ejemplo:

```sql
ALTER USER nombre
    DEFAULT TABLESPACE USERS
    QUOTA UNLIMITED ON USERS;
```

### [](#header-3)Borrado de usuarios
Se realiza mediante:
```sql
DROP USER usuario [CASCADE]
```
 La opción CASCADE elimina los objetos del esquema del usuario antes de eliminar al propio usuario. Es obligatorio si el esquema contiene objetos.

 