---
title: 2do parcial ADB-Solucionario
published: true
---

**Utilizando Oracle, SqlPlus y el ususario SYS:**
**1. Crear el perfil denominado “PERF_INICIALES” de acuerdo a los siguientes requerimientos(Realizar la**
**configuración necesaria):**
*   Cuenta bloqueada después de 3 intentos, posteriormente a los 3 intentos fallidos la cuenta se 
deberá bloquear por 48 horas
*   El tiempo máximo de inactividad continua de una sesión deberá ser de 30 minutos 
*   Sólo se permite tres sesiones concurrentes
*   El password expira después de 10 días, tomar en cuenta un periodo de gracia de 5 días.
*   2 cambios requeridos antes de reutilizar el password.
*   Utilizar la función verify_function para verificar la complejidad de la contraseña
**2. Verificar el perfil creado, ejecute la siguiente consulta.**

```sql
SQL> SELECT RESOURCE_NAME, LIMIT FROM DBA_PROFILES WHERE PROFILE=’PERF_INICIALES’;
```

**3. Crear un rol denominado “ROLE_INICIALES” y asignar los siguientes privilegios:**
Privilegios de Sistema
*   CREATE SESSION
*   CREATE TABLE
*   CREATE SEQUENCE
*   CREATE VIEW
Privilegios de Objeto
*   SELECT ON HR.EMPLOYEES
*   SELECT ON HR.DEPARTMENTS
**4. Verificar el rol creado con sus respectivos privilegios, ejecute las consultas:**
```sql
SQL> SELECT GRANTEE, PRIVILEGE FROM DBA_SYS_PRIVS WHERE GRANTEE=’ROLE_INICIALES’;
SQL> SELECT TABLE_NAME, PRIVILEGE FROM DBA_TAB_PRIVS WHERE GRANTEE=’ROLE_INICIALES’;
```
**5. Crear el usuario “USER_INICIALES” considerando los siguientes requerimientos. Posteriormente** 
**asigne el rol creado “ROLE_INICIALES” al usuario “USER_INICIALES”.**
*   Asigne una contraseña
*   Tablespace por defecto USERS, cuota de 50 MB sobre USERS
*   Tablespace Temporal: TEMP
*   Cuenta desbloqueada
*   Perfil: “PERF_INICIALES”
**6. Mostrar el Usuario Creado**
```sql
SQL> SELECT USERNAME, ACCOUNT_STATUS, DEFAULT_TABLESPACE, PROFILE FROM DBA_USERS 
WHERE USERNAME=’USER_INICIALES’;
```

**7. Crear un tablespace UNDO con las siguientes características**
*   Nombre tablespace: UNDOTBSINICIALES
*   Datafile: UNDOTBSINICIALES01.dbf
*   Tamaño: 25MB
*   Autoextend on
*   Next: 10MB
**8. Mostrar el tablespace undo creado**
```sql
SQL> SELECT TABLESPACE_NAME FROM DBA_TABLESPACES;
```
**9. Realizar las siguientes modificaciones:**
*   Periodo de retención del nuevo tablespace undo: 25 minutos
*   Garantizar la retención para el tablespace undo UNDOTBSINICIALES
*   Asignar el nuevo tablespace undo: UNDOTBSINICIALES al sistema
**10. Mostrar los cambios realizados.**
```sql
SQL> SHOW PARAMETER UNDO_RETENTION;
SQL> SHOW PARAMETER UNDO_TABLESPACE;
SQL> SELECT TABLESPACE_NAME, RETENTION
FROM DBA_TABLESPACES 
WHERE TABLESPACE_NAME=’UNDOTBSINICIALES’
```