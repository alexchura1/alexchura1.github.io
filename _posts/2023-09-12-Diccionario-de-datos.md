---
title: Diccionario de datos Oracle
published: true
---

## [](#header-2)Diccionario de datos Oracle

Las tablas de usuario son tablas creadas por el usuario y contienen datos de negocio; un ejemplo sería `EMPLOYEES`. Hay otra recopilación de tablas y vistas en la base de datos Oracle conocida como diccionario de datos. Esta recopilación la crea y la mantiene Oracle Server y contiene información sobre la base de datos. El diccionario de datos se estructura en tablas y vistas, exactamente igual que otros datos de diccionario. El diccionario de datos no sólo es parte central de cada base de datos Oracle, sino que se trata además de una herramienta importante para todos los usuarios, desde los usuarios finales hasta los diseñadores de aplicaciones y los administradores de base de datos.
  
Las sentencias SQL se utilizan para acceder al diccionario de datos. Como el diccionario de datos es de sólo lectura, sólo se pueden emitir consultas en las tablas y vistas.  

Puede consultar las vistas de diccionario que se basen en las tablas de diccionario para buscar información como: 

*   Definiciones de todos los objetos de esquema de la base de datos (tablas, vistas, índices, sinónimos, secuencias, procedimientos, funciones, paquetes, disparadores, etc)
*   Valores por defecto de las columnas.
*   Información acerca de las restricciones de integridad.
*   Nombres de usuarios Oracle.
*   Privilegios y roles que se han otorgado a cada usuario.
*   Otra información general de la base de datos.

### [](#header-3)Estructura del diccionario de datos

Las tablas base subyacentes almacenan información sobre la base de datos asociada. Oracle Server es el único que debe escribir y leer estas tablas. Rara vez se accede a ellas directamente.

Hay varias vistas que resumen y muestran la información almacenada en las tablas base del diccionario de datos. Estas vistas descodifican los datos de la tabla base en información útil (como nombres de usuario o de tabla), mediante uniones y cláusulas `WHERE` para simplificar la información. A la mayoría de los usuarios se le proporciona acceso a las vistas más que a las tablas base.

El usuario `Oracle SYS` es propietario de todas las tablas base y las vistas accesibles para usuarios de los diccionarios de datos. Ningún usuario `Oracle` debe modificar nunca (`UPDATE`, `DELETE` o `INSERT`) ninguna fila ni objeto de esquema contenido en el esquema `SYS`, ya que tal actividad puede comprometer la integridad de datos.

### [](#header-3)Nomenclatura de vistas

| Prefijo de vista      | Obajetivo                             |
|:----------------------|:--------------------------------------|
| **USER**              | Vista del usuario (lo que está en el esquema; lo que es de su propiedad)|
| **ALL**               | Vista del usuario ampliada (a lo que puede acceder)|
| **DBA**               | Vista del administrador de la base de datos (lo que hay en los esquemas de todos)|
| **V$**                |Datos relacionados con el rendimiento  |