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

### [](#header-3)Consulta de usuarios
La vista administrativa DBA_USERS muestra la lista y configuración de todos los usuarios del sistema. Para observar la estructura de la vista, siempre es conveniente usar DESCRIBE DBA_USERS con el fin de consultar las columnas que nos interesen más:
```sql
--Ejecutamos:
SELECT USERNAME, PASSWORD, ACCOUNT_STATUS, 
    LOCK_DATE, EXPIRY_DATE, 
    DEFAULT_TABLESPACE, TEMPORARY_TABLESPACE, 
    CREATED, PROFILE 
    FROM DBA_USERS;
```

### [](#header-3)Ejercicios:
Crear el usuario LACQ_USERPRUEBA (cambiar LACQ por sus iniciales) con:

*   Password: (numero de carnet)
*   Tablespace por defecto: TBSPRUEBA 
*   Tablespace Temporal por defecto TEMP2 
*   Quota UNLIMITED sobre TBSPRUEBA
*   ACCOUNT: LOCK

### [](#header-3)Control de privilegios en Oracle
Los privilegios son permisos que damos a los usuarios para que puedan realizar ciertas operaciones con la base de datos. En Oracle hay más de cien posibles privilegios. Se dividen en:
*   Privilegios de sistema:Son permisos para modificar el funcionamiento de la base de datos. Son cambios, en definitiva, que afectan a todos los usuarios y usuarias.
*   Privilegios de objeto: Son permisos que se aplican a un objeto concreto de la base de datos.

### [](#header-3)Privilegios de sistema
Se comentan algunos de los privilegios de sistema más importantes:

| PRIVILEGIO        | SIGNIFICADO       |
|:------------------|:------------------|
| CREATE SESSION     | Permite al usuario conectar con la base de datos|
| RESTRICTED SESSION | Permite al usuario establecer sesión con la base de datos en caso de que la base de datos esté en modo restringido|
| ALTER SYSTEM ENABLE RESTRICTED SESSION | Sólo los usuarios con este privilegio puede conectar con la base de datos si ésta se encuentra en este modo.|
| ALTER DATABASE    | Permite modificar la estructura de la base de datos |
| ALTER SYSTEM      | Permite modificar los parámetros y variables del sistema |
| CREATE TABLE      | Permite crear tablas. Incluye la posibilidad de borrarlas. |
| GRANT ANY OBJECT PRIVILEGE | Permite conceder privilegios sobre objetos que no son del usuario (pertenecen a otros usuarios) a terceros usuarios.|
| CREATE ANY TABLE   | Permite crear tablas en otros esquemas de usuario|
| DROP ANY TABLE     | Permite borrar tablas de otros usuarios   |
| SELECT ANY TABLE   | Permite seleccionar datos en tablas de otros usuarios|
| INSERT ANY TABLE   | Permite añadir datos en tablas de otros usuarios |
| UPDATE ANY TABLE   | Permite actualizar datos en tablas de otros usuarios|
| DELETE ANY TABLE   | Permite eliminar datos en tablas de otros usuarios|

En la tabla anterior se ha hecho hincapié en los privilegios referidos a las tablas, para otros objetos el funcionamiento es similar: igual que hay CREATE TABLE, se puede usar CREATE VIEW para las vistas o INDEX, TRIGGER, PROCEDURE, SEQUENCE, SYNONYM, TYPE,... y de esa forma podemos conceder privilegio de creación de otros objetos. 
Lo mismo con el resto de operaciones.

Hay dos privilegios especiales que permiten conceder nivel de DBA, son: SYSDBA y SYSOPER. Se han comentado anteriormente.

### [](#header-3)Privilegios de sistema

La lista completa de privilegios es:

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| ALTER SESSION       | Modificar el funcionamiento de la sesión      |
| ALTER RESOURCE COST | Modifica los parámetros de cálculo de coste de la sesión |
| RESTRICTED SESSION  | Conectar aunque la base de datos se haya iniciado en modo restringido |

### [](#header-3)Base de datos y sistema

La lista completa de privilegios es:

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| ALTER DATABASE      | Modificar la base de datos (privilegio de gran capacidad administrativa) |
| ALTER SYSTEM        | Modificar los parámetros del sistema           |
| AUDIT SYSTEM        | Auditar la base de datos                         |

### [](#header-3)Usuarios, roles, privilegios y perfiles

La lista completa de privilegios es:

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| CREATE USER         | Crear usuarios pudiendo indicar tablespace por defecto, cuotas y perfiles |
| ALTER USER          | Modificar al usuario. Permite cambiar la contraseña y modo de autentificación, tablespace por defecto, cuota de uso de disco, roles y el perfil del usuario |
| DROP USER           | Borrar usuario                                  |
| CREATE PROFILE      | Crear perfiles                                  |
| ALTER PROFILE       | Modificar perfiles                              |
| DROP PROFILE        | Borrar perfiles                                 |
| CREATE ROLE         | Crear roles                                    |
| ALTER ANY ROLE      | Modificar roles                                 |
| GRANT ANY ROLE      | Conceder roles                                  |
| GRANT ANY PRIVILEGE | Conceder privilegios de sistema                |

### [](#header-3)Directorios

La lista completa de privilegios es:

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| CREATE ANY DIRECTORY | Crear directorios                              |
| DROP ANY DIRECTORY  | Eliminar directorios                           |

### [](#header-3)Tablespaces

La lista completa de privilegios es:

| PRIVILEGIO           | SIGNIFICADO                                    |
|:------------------   |:----------------------------------------------|
| CREATE TABLESPACES   | Crear tablespaces                              |
| ALTER TABLESPACES    | Modificar tablespaces                          |
| DROP TABLESPACES     | Borrar tablespaces                             |
| MANAGE TABLESPACE    | Administrar el espacio de tablas para poder hacer copia de seguridad o simplemente quedar online u offline el tablespace |
| UNLIMITED TABLESPACE | Usa cuota ilimitada al escribir en cualquier tablespace. Este privilegio elimina las cuotas establecidas sobre el usuario, si las hubiera. |

### [](#header-3)Tablas

La lista completa de privilegios es:

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| CREATE TABLE        | Crear tablas en el esquema del usuario, incluye insertar, modificar y eliminar datos de la misma; así como eliminar la propia tabla |
| ALTER ANY TABLE     | Modificar tablas de cualquier usuario          |
| BACKUP ANY TABLE    | Utilizar la utilidad Export para copiar datos de otros esquemas |
| CREATE ANY TABLE    | Crear tablas en cualquier esquema               |
| DELETE ANY TABLE    | Borrar filas de tablas en cualquier esquema     |
| DROP ANY TABLE      | Borrar tablas en cualquier esquema              |
| INSERT ANY TABLE    | Añadir datos a cualquier tabla                  |
| SELECT ANY TABLE    | Seleccionar datos de tablas en cualquier esquema |
| UPDATE ANY TABLE    | Modificar datos de tablas de cualquier esquema  |
| LOCK ANY TABLE      | Bloquear tablas, vistas e instantáneas en cualquier esquema |
| FLASHBACK ANY TABLE | Realizar acción de flashback en tablas, vistas e instantáneas en cualquier esquema |

### [](#header-3)Vistas

La lista completa de privilegios es:

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| CREATE VIEW         | Crear vistas en el esquema del usuario         |
| CREATE ANY VIEW     | Crear vistas en cualquier esquema               |
| DROP ANY VIEW       | Borrar cualquier vista en cualquier esquema    |
| UNDER ANY VIEW      | Crear subvistas                                 |

### [](#header-3)Instantáneas (Snapshots o vistas materializadas)

La lista completa de privilegios es:

| PRIVILEGIO                  | SIGNIFICADO                                    |
|:--------------------------  |:----------------------------------------------|
| CREATE MATERIALIZED VIEW   | Crear vistas materializadas (instantáneas)    |
| CREATE ANY MATERIALIZED VIEW | Crear vistas materializadas (instantáneas) en cualquier esquema |
| ALTER ANY MATERIALIZED VIEW | Modificar vistas materializadas (instantáneas) en cualquier esquema |
| DROP ANY MATERIALIZED VIEW  | Borrar vistas materializadas (instantáneas) en cualquier esquema |
| GLOABL QUERY REWRITE        | Permite realizar operaciones de lectura escritura en instantáneas que usan tablas de otros esquemas |
| CREATE SNAPSHOT             | Crear instantáneas (obsoleto)                   |
| ALTER ANY SNAPSHOT          | Modificar instantáneas de cualquier usuario (obsoleto) |
| CREATE ANY SNAPSHOT         | Crear instantáneas a cualquier usuario (obsoleto) |
| DROP ANY SNAPSHOT           | Borrar instantáneas (obsoleto) 
