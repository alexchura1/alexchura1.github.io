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

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| ALTER DATABASE      | Modificar la base de datos (privilegio de gran capacidad administrativa) |
| ALTER SYSTEM        | Modificar los parámetros del sistema           |
| AUDIT SYSTEM        | Auditar la base de datos                         |

### [](#header-3)Usuarios, roles, privilegios y perfiles

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

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| CREATE ANY DIRECTORY | Crear directorios                              |
| DROP ANY DIRECTORY  | Eliminar directorios                           |

### [](#header-3)Tablespaces

| PRIVILEGIO           | SIGNIFICADO                                    |
|:------------------   |:----------------------------------------------|
| CREATE TABLESPACES   | Crear tablespaces                              |
| ALTER TABLESPACES    | Modificar tablespaces                          |
| DROP TABLESPACES     | Borrar tablespaces                             |
| MANAGE TABLESPACE    | Administrar el espacio de tablas para poder hacer copia de seguridad o simplemente quedar online u offline el tablespace |
| UNLIMITED TABLESPACE | Usa cuota ilimitada al escribir en cualquier tablespace. Este privilegio elimina las cuotas establecidas sobre el usuario, si las hubiera. |

### [](#header-3)Tablas

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

| PRIVILEGIO          | SIGNIFICADO                                    |
|:------------------  |:----------------------------------------------|
| CREATE VIEW         | Crear vistas en el esquema del usuario         |
| CREATE ANY VIEW     | Crear vistas en cualquier esquema               |
| DROP ANY VIEW       | Borrar cualquier vista en cualquier esquema    |
| UNDER ANY VIEW      | Crear subvistas                                 |

### [](#header-3)Instantáneas (Snapshots o vistas materializadas)

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
| DROP ANY SNAPSHOT           | Borrar instantáneas (obsoleto)                  |

### [](#header-3)PL/SQL

| PRIVILEGIO            | SIGNIFICADO                                       |
|:------------------    |:-------------------------------------------------|
| CREATE PROCEDURE      | Crear procedimientos y funciones PL/SQL         |
| ALTER ANY PROCEDURE   | Modificar procedimientos y funciones de cualquier usuario |
| CREATE ANY PROCEDURE  | Crear funciones y procedimientos en cualquier esquema |
| DROP ANY PROCEDURE    | Borrar cualquier procedimiento en cualquier esquema |
| EXECUTE ANY PROCEDURE | Ejecutar cualquier procedimiento en cualquier esquema |
| CREATE TRIGGER       | Crear triggers                                    |
| ALTER ANY TRIGGER     | Modificar triggers de cualquier usuario           |
| CREATE ANY TRIGGER    | Crear triggers en cualquier esquema                |
| DROP ANY TRIGGER      | Borrar triggers de cualquier esquema               |
| ADMINISTER DATABASE TRIGGER | Crear triggers de sistema (requiere además el privilegio CREATE TRIGGER) |
| CREATE LIBRARY        | Crear librerías de procedimientos y funciones en el esquema de usuario |
| DROP LIBRARY          | Borrar librería de procedimientos y funciones en el esquema de usuario |
| DROP ANY LIBRARY      | Borrar librerías de procedimientos y funciones en cualquier esquema |
| EXECUTE ANY LIBRARY   | Ejecutar cualquier librería                       |

### [](#header-3)Tipos de datos

| PRIVILEGIO          | SIGNIFICADO                                           |
|:------------------  |:-----------------------------------------------------|
| CREATE TYPE         | Crear tipos de datos personales                      |
| ALTER ANY TYPE      | Modificar tipos de datos personales en cualquier usuario |
| CREATE ANY TYPE     | Crear tipos de datos en cualquier esquema           |
| DROP ANY TYPE       | Borrar tipos de datos de cualquier esquema           |
| EXECUTE ANY TYPE    | Permite invocar a tipos de datos personales presentes en cualquier esquema |

### [](#header-3)Indices

| PRIVILEGIO          | SIGNIFICADO                                           |
|:------------------  |:-----------------------------------------------------|
| ALTER ANY INDEX     | Modificar índices de la base de datos (incluye modificar claves primarias, secundarias,…) |
| CREATE ANY INDEX    | Crear índices en cualquier esquema                   |
| DROP ANY INDEX      | Borrar índices en cualquier esquema                   |

### [](#header-3)Secuencias y sinonimos

| PRIVILEGIO             | SIGNIFICADO                                           |
|:------------------     |:-----------------------------------------------------|
| ALTER ANY SEQUENCE     | Modificar secuencias de cualquier usuario             |
| CREATE ANY SEQUENCE    | Crear secuencias en cualquier esquema                 |
| CREATE ANY SYNONYM     | Crear sinónimos en cualquier esquema                  |
| CREATE SEQUENCE        | Crear secuencias                                      |
| CREATE SYNONYM         | Crear sinonimos                                      |
| CREATE PUBLIC SYNONYM  | Crear sinónimos públicos                             |
| DROP PUBLIC SYNONYM    | Borrar sinónimos públicos                            |
| CREATE ANY SEQUENCE    | Crear secuencias en cualquier esquema                 |
| DROP ANY SEQUENCE      | Borrar secuencias en cualquier esquema                 |
| DROP ANY SYNONYM       | Borrar sinónimos en cualquier esquema                  |
| SELECT ANY SEQUENCE    | Seleccionar cualquier secuencia de cualquier esquema  |

### [](#header-3)Segmentos de rollback

| PRIVILEGIO              | SIGNIFICADO                                     |
|:------------------      |:-----------------------------------------------|
| CREATE ROLLBACK SEGMENT | Crear segmentos de rollback                    |
| ALTER ROLLBACK SEGMENT  | Modificar segmentos de rollback                |
| DROP ROLLBACK SEGMENT   | Borrar segmentos de rollback                   |

### [](#header-3)Varios

| PRIVILEGIO               | SIGNIFICADO                                  |
|:------------------       |:--------------------------------------------|
| ANALYZE ANY              | Analizar cualquier tabla, clúster o índice en cualquier esquema. |
| ANALYZE ANY DICTIONARY   | Analizar cualquier elemento del diccionario de datos |
| SELECT ANY DICTIONARY    | Realizar SELECT sobre las vistas del diccionario de datos |
| AUDIT ANY                | Auditar a cualquier objeto de la base de datos |
| COMMENT ANY TABLE        | Realizar comentarios sobre tablas, columnas y vistas en cualquier esquema de la base de datos |
| SELECT ANY TRANSACTION   | Seleccionar los datos de la vista `FLASHBACK_TRANSACTION_QUERY` que controla el proceso de la actual operación flashback |
| FORCE ANY TRANSACTION    | Forzar aceptar (COMMIT) las transacciones en duda en un sistema distribuido de bases de datos en cualquier conexión |
| SYSDBA                   | Privilegio general de administrador           |
| SYSOPER                  | Privilegio general de administrador (más bajo que el anterior) |
| FLASHBACK ARCHIVE ADMINISTER | Crea, elimina o modifica cualquier archivo de flashback |
| DEBUG CONNECT SESSION    | Conectar la sesión a un depurador              |
| DEBUG ANY PROCEDURE      | Conectar procedimientos, funciones y/o código Java a un depurador |

### [](#header-3)Varios

| PRIVILEGIO               | SIGNIFICADO                                  |
|:------------------       |:--------------------------------------------|
| ANALYZE ANY              | Analizar cualquier tabla, clúster o índice en cualquier esquema. |
| ANALYZE ANY DICTIONARY   | Analizar cualquier elemento del diccionario de datos |
| SELECT ANY DICTIONARY    | Realizar SELECT sobre las vistas del diccionario de datos |
| AUDIT ANY                | Auditar a cualquier objeto de la base de datos |
| COMMENT ANY TABLE        | Realizar comentarios sobre tablas, columnas y vistas en cualquier esquema de la base de datos |
| SELECT ANY TRANSACTION   | Seleccionar los datos de la vista `FLASHBACK_TRANSACTION_QUERY` que controla el proceso de la actual operación flashback |
| FORCE ANY TRANSACTION    | Forzar aceptar (COMMIT) las transacciones en duda en un sistema distribuido de bases de datos en cualquier conexión |
| SYSDBA                   | Privilegio general de administrador           |
| SYSOPER                  | Privilegio general de administrador (más bajo que el anterior) |
| FLASHBACK ARCHIVE ADMINISTER | Crea, elimina o modifica cualquier archivo de flashback |
| DEBUG CONNECT SESSION    | Conectar la sesión a un depurador              |
| DEBUG ANY PROCEDURE      | Conectar procedimientos, funciones y/o código Java a un depurador |

### [](#header-3) Conceder privilegios

Se usa con la instrucción GRANT que funciona así:

```sql
GRANT privilegio1 TO usuario 
[WITH ADMIN OPTION];
```
La opción WITH ADMIN OPTION permite que el usuario al que se le concede el privilegio puede conceder dicho privilegio a otros usuarios. Es, por tanto, una opción a utilizar con cautela.

### [](#header-3) Ejemplo

```sql
GRANT CREATE SESSION, ALTER SESSION, CREATE TABLE,  
CREATE VIEW, CREATE SYNONYM, CREATE SEQUENCE,
CREATE TRIGGER, CREATE PROCEDURE, CREATE TYPE
TO "USUARIO";
```
La opción WITH ADMIN OPTION permite que el usuario al que se le concede el privilegio puede conceder dicho privilegio a otros usuarios. Es, por tanto, una opción a utilizar con cautela.

### [](#header-3) Revocar privilegios
Retira privilegios concedidos a un usuario. Se realiza con la instrucción REVOKE que funciona de esta forma:

```sql
REVOKE privilegio1 [,privilegio2] FROM usuario;
```
Al revocar los privilegios, las acciones llevadas a cabo con ellos (borrar, modificar,...) no se anulan.

### [](#header-3) Privilegios de objetos

Las instrucciones vistas anteriormente otorgan o quitan permisos generales, es decir dictan qué operaciones, en general, puede realizar un usuario.

Los privilegios de objeto marcan qué operaciones le están permitidas a un usuario realizar sobre el objeto.

Sintaxis:

```sql
GRANT {privilegio [(listaColumnas)]  
[,privilegio [(listaColumnas)] ] |
ALL [PRIVILEGES]}
ON [esquema.]objeto
TO {usuario | rol | PUBLIC} [,{usuario | rol | PUBLIC}]
[WITH GRANT OPTION]
```

### [](#header-3)
La opción ALL concede todos los privilegios posibles sobre el objeto. Se pueden asignar varios privilegios a la vez y también varios posibles usuarios. La opción WITH GRANT OPTION permite al usuario al que se le conceden los privilegios, que pueda, a su vez, conceder esos mismos privilegios a otro usuario.

### [](#header-3) Ejemplo
Ejemplo de uso de GRANT con privilegios de objeto:

```sql
GRANT UPDATE, INSERT ON hr.employees TO "usuario";
```

En la siguiente tabla se enumeran los posibles privilegios que se pueden aplicar a un determinado objeto:

| Privilegio | Aplicable a |
|:-------|:------------| 
| SELECT | Tablas, vistas, instantáneas, secuencias |
| INSERT | Tablas, vistas |
| UPDATE | Tablas, vistas |  
| DELETE | Tablas, vistas |
| ALTER | Tablas, secuencias |
| EXECUTE | Procedimientos, funciones, paquetes, sinónimos, programas en directorios |
| INDEX | Tablas (para crear índices en la misma) |
| REFERENCES | Tablas (para crear claves secundarias, FOREIGN KEY) |
| UNDER | Vistas, para crear subvistas |
| DEBUG | Depurar procedimientos y funciones mediante programa externo |
| ON COMMIT REFRESH | Actualizar la vista materializada (o instantánea) al realizar un COMMIT |
| QUERY REWRITE | Escribir en la vista materializada (o instantánea) |
| READ | Directorios | 
| WRITE | Directorios |
| FLASHBACK ARCHIVE | Archivos de datos flashback (activar o desactivar) |

### [](#header-3)Quitar privilegios de objetos

Para quitar privilegios de objetos, se utiliza la siguiente sintaxis:

```sql
-- Ejecutamos:
REVOKE {privilegio1  [,privilegio2]  | 
ALL [PRIVILEGES]} 
ON [esquema.]objeto
FROM {usuario | rol | PUBLIC} 
[, {usuario | rol | PUBLIC}]
[CASCADE CONSTRAINTS]
```
El uso de CASCADE CONSTRAINTS elimina cualquier restricción que impida el borrado del privilegio.

Solo el usuario que concedió los privilegios puede revocarlos.

### [](#header-3) Roles 

Los roles son privilegios aglutinados sobre un mismo nombre, bajo la idea de que ese conjunto denote un uso habitual sobre la base de datos. Gracias a los roles se facilita la asignación de privilegios a los usuarios. Un usuario puede tener asignados varios roles y viceversa.

### [](#header-3) Creación de roles

Los roles se crean usando esta sintaxis:

```sql
CREATE ROLE rol [NOT IDENTIFIED |
IDENTIFIED {BY password | EXTERNALLY | 
GLOBALLY | USING package}];
```
La opción IDENTIFIED hace que el rol sólo pueda utilizarse si el usuario se identifica con el método que indiquemos en esta instrucción. Las formas de identificarse son las mismas formas que se utilizan al identificar un usuario (vistas anteriormente), salvo que ahora disponemos de una nueva: la opción PACKAGE que hace que el rol sólo se pueda utilizar si usamos el paquete de aplicaciones indicado.

Por defecto un rol no requiere identificación.

### [](#header-3) Modificación de roles
Disponemos de la instrucción ALTER ROLE permite modificar la configuración del rol. Tiene las mismas opciones que CREATE ROLE y sólo se usa si deseamos establecer un nuevo método para autentificarnos.

### [](#header-3) Asignar y retirar privilegios a roles
Se realiza con la instrucción GRANT y se usa igual que cuando establecemos permisos a los usuarios, en la sintaxis de los comandos GRANT y REVOKE vistas anteriormente, simplemente se indicaría un nombre de rol en lugar de un nombre de usuario. Por ejemplo si deseamos asignar los privilegios CREATE TABLE y CONNECT a un rol llamado rol1. Se haría:

```sql
GRANT CREATE TABLE, CONNECT TO rol1;
```

De la misma forma, podemos quitar privilegios asignados a un rol mediante el comandol REVOKE:

```sql
REVOKE CREATE TABLE FROM rol1;
```

### [](#header-3) Asignar roles a usuarios
La sintaxis completa para asignar roles a un usuario es:

```sql
GRANT rol1 [,rol2 ] 
TO {usuario|rol|PUBLIC ,{usuario|rol|PUBLIC} }
[WITH ADMIN OPTION];
```

Al igual que en las instrucciones anteriores, PUBLIC asigna el rol a todos los usuarios y WITH ADMIN OPTION permite al usuario al que se le concede el rol, conceder él dicho rol a otros usuarios/as.

### [](#header-3) Roles predefinidos

| Rol | Significado |  
|:-----------|:------------|
| CONNECT | Permite crear sesiones. Se mantiene por compatibilidad |
| RESOURCE | Permite crear tablas y código PL/SQL del tipo que sea. Se mantiene por compatibilidad |
| DBA | Permite casi todo, excepto manejar la instancia de la base de datos |


### [](#header-3) Borrar roles  

Lo hace la instrucción **DROP ROLE**, seguida del rol a borrar. Desde ese momento a los usuarios a los que se habían asignado el rol se les revoca.

### [](#header-3) Mostrar información sobre privilegios

| Vista | Significado |
|:-----------|:------------|
| DBA_ROLES | Permite crear sesiones. Se mantiene por compatibilidad |
| DBA_ROLES_PRIVS | Permite crear tablas y código PL/SQL del tipo que sea. Se mantiene por compatibilidad |
| ROLE_ROLES_PRIVS | Permite casi todo, excepto manejar la instancia de la base de datos |
| DBA_SYS_PRIVS | Permite crear sesiones. Se mantiene por compatibilidad |
| ROLE_SYS_PRIVS | Permite crear tablas y código PL/SQL del tipo que sea. Se mantiene por compatibilidad |
| ROLE_TAB_PRIVS | Permite casi todo, excepto manejar la instancia de la base de datos |
| SESSION_ROLES | Permite casi todo, excepto manejar la instancia de la base de datos |

### [](#header-3) Perfiles

Los perfiles permiten limitar los recursos que los usuarios usan de la base de datos. Hay un perfil llamado **DEFAULT** que se aplica automáticamente a todos los usuarios y que les da recursos ilimitados sobre la base de datos. Para limitar el número de recursos se debe de activar (poniéndola el valor **TRUE**) la variable de sistema **RESOURCE_LIMIT** (que por defecto está a **FALSE**). Con la siguiente sentencia:

```sql
ALTER SYSTEM RESOURCE_LIMIT = TRUE SCOPE='OPCION';
Al igual que en las instrucciones anteriores, PUBLIC asigna el rol a todos los usuarios y WITH ADMIN OPTION permite al usuario al que se le concede el rol, conceder él dicho rol a otros usuarios/as.
```

### [](#header-3) Parámetros de manejo de contraseñas
En realidad hay dos tipos de parámetros de los perfiles:

Parámetros de manejo de contraseñas que gestionan el funcionamiento de las contraseñas para el usuario.
| Variable de perfil | Significado |
|:-----------|:------------|
| FAILED_LOGIN_ATTEMPTS | Número consecutivo de errores en las contraseñas antes de bloquear la cuenta. Por defecto son 10 |
| PASSWORD_LOCK_TIME | Número de días hasta que se bloquea una cuenta si se supera el límite de intentos al meter una contraseña. Por defecto es uno |
| PASSWORD_LIFE_TIME | Números de días que tiene vigencia una contraseña. Por defecto es 180 |
| PASSWORD_GRACE_TIME | Días que la contraseña se la concede un periodo extra de gracia tras consumir su tiempo de vida. Por defecto es 7 |
| PASSWORD_REUSE_TIME | Número de días que una contraseña puede ser reutilizada |
| PASSWORD_VERIFY_FUNCTION | Función a la que se invoca cuando se modifica una contraseña con el fin de verificar su validez en base a las reglas de complejidad que deseemos |

### [](#header-3) Parámetros relacionados con el uso de recursos
En realidad hay dos tipos de parámetros de los perfiles:

Parámetros relacionados con el uso de recursos Establecen el máximo o mínimo uso de recursos de la base de datos por parte del usuario.

| Variable de perfil | Significado |
|:-----------|:------------|
| SESSIONS_PER_USER | Número de conexiones de usuario concurrentes que se permiten. |
| CPU_PER_SESSION | Límite de tiempo (en centésimas de segundo) que se permite a un usuario utilizar la CPU antes de ser echado del sistema. De esa forma se evitan peligros de rendimiento |
| CPU_PER_CALL | Como la anterior pero referida a cada proceso |
| PRIVATE_SGA | Para conexiones en instalaciones de servidor compartido, número de KB que puede consumir cada sesión en la zona de memoria compartida (SGA) |
| CONNECT_TIME | Minutos como máximo que se permite a una sesión |
| IDLE_TIME | Minutos máximos de inactividad de una sesión |
| LOGICAL_READS_PER_SESSION | Máximo número de bloques leídos en una sesión |
| LOGICAL_READS_PER_CALL | Máximo número de bloques leídos por un proceso |
| COMPOSITE_LIMIT | Máximo número de recursos consumidos por una sesión. Es la media ponderada de varios parámetros anteriores |

### [](#header-3) Crear perfiles
La creacion de perfiles sigue la siguiente sintaxis:

```sql
CREATE PROFILE perfil 
LIMIT 
parametro1 valor1 
[parametro2 valor];
```
Los parámetros a especificar son los que aparecen en la tabla anterior. A cada parámetro se le indica un valor, o bien la palabra DEFAULT si deseamos que tome su valor por defecto, o bien UNLIMITED para indicar que el parámetro tomará un valor de infinito.

### [](#header-3) Ejemplo

```sql
CREATE PROFILE programador LIMIT
            SESSIONS_PER_USER UNLIMITED
            CPU_PER_SESSION UNLIMITED		
            IDLE_TIME 15
            CONNECT_TIME 150
            FAILED_LOGIN_ATTEMPTS 5
            PASSWORD_LOCK_TIME 2;
```

### [](#header-3) Modificar perfiles
La instrucción ALTER PROFILE funciona igual que CREATE PROFILE y es la encargada de hacer modificaciones a un perfil creado.

```sql
ALTER PROFILE programador LIMIT
            FAILED_LOGIN_ATTEMPTS 2
            PASSWORD_LOCK_TIME 5;
```