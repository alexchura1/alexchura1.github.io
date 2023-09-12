---
title: Tablespaces en Oracle
published: true
---

### [](#header-3)Concepto sobre tablespaces

Los Espacios de Tablas o Tablespaces permiten agrupar lógicamente los datafiles o archivos de datos donde se almacenan físicamente los datos de las tablas de usuarios y del sistema. Oracle en todas sus ediciones cuenta por defecto con 5 tablespaces:

*   SYSAUX
*   SYSTEM
*   UNDO
*   TEMP
*   USERS

### [](#header-3)Funciones tablespaces default

| Tablespace        | Descripción           |
|:------------------|:----------------------|
| SYSTEM            | Este es el tablespace principal de la base de datos, que almacena el diccionario de datos y los objetos del sistema.|
| SYSAUX            | Este tablespace almacena objetos de la base de datos que no son críticos para el funcionamiento del sistema, pero que son necesarios para algunas funcionalidades de Oracle Database.|
| TEMP              | Este tablespace se utiliza para almacenar datos temporales generados durante la ejecución de consultas y otras operaciones en la base de datos.|
| UNDO              | Este tablespace se utiliza para almacenar información de deshacer para las transacciones que se están realizando actualmente.|
| USERS             | Este tablespace se utiliza para almacenar los objetos de usuario, es decir, aquellos objetos creados por los usuarios de la base de datos, como tablas, índices, vistas, etc.|