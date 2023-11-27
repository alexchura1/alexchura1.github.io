---
title: Solucionario Examen auxiliatura regular
published: true
---

*   Que es un tablespace
**Es un espacio lógico donde se almacenan los datos de los objetos en una base de datos**

*   Escriba la sentencia completa de la creacion de un tablespace en oracle
```sql
CREATE TABLESPACE TBS_ABRAHAM
DATAFILE 'C:\TBS_ABRAHAM.DBF'
SIZE 100M
AUTOEXTEND ON
NEXT 20M
MAXSIZE UNLIMITED;
```

*   El diccionario de datos es de propiedad de todos los usuarios de nuestra base de datos Oracle?
**Falso**

*   Cuantos y cuales son los prefijos principales de vistas y tablas que tenemos en el diccionario de datos (pista: son 4) 
1. DBA Para administradores de base de datos.
2. ALL_Para usuarios con acceso.
3. USER_ Para objetos del usuario actual.
4. V$: Para vistas dinámicas de rendimiento.

*   Escriba la sentencia larga SQL de creacion de usuarios en Oracle
```sql
CREATE USER nombre_usuario IDENTIFIED BY contraseña
DEFAULT TABLESPACE nombre_tablespace
TEMPORARY TABLESPACE nombre_tablespace_temp
QUOTA cantidad_en_mb ON nombre_tablespace
PROFILE nombre_perfil;
```

*   Cuantos tipos de tablespaces tenemos en Oracle y cuales son?, Explique sus diferencias

**Temporales (Que solo funcionan por un tiempo)**
**Permanentes (Que su funcionalidad es de manera permanente)**
**Deshacer (Permite almacenar información que permita deshacer cambios)**

*   Con que vista del diccionario de datos vemos el nombre de nuestra base de datos, escriba la sentencia SQL correspondiente
```sql
SELECT NAME FROM V$DATABASE;
```