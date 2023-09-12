---
title: Creacion de usuarios basica en Oracle
published: false
---

Para la creacion de usuarios se usa la siguiente sentencia:

```sql
CREATE USER usuario
IDENTIFIED BY password
DEFAULT TABLESPACE tablespace_por_defecto
QUOTA {cantidad de espacio en MB | UNLIMITED} ON tablespace_por_defecto
TEMPORARY TABLESPACE tablespace_temporal
PROFILE perfil
ACCOUNT {LOCK | UNLOCK};
```

*   NOTA: en algunas versiones de Oracle es nesesaria una modificacion de la sesion para la creacion de usuarios, la modificacion es la siguiente: 

```sql
ALTER SESSION SET '_ORACLE_SCRIPT' = TRUE;
```

### [](#header-3)Ejemplo

Crear usuario USRPRUEBA bajo los siguientes parametros:

*   Contraseña: (sus iniciales) lacq
*   Tablespace por defecto: TBSPRUEBA1
*   Cuota de espacio de: 20M
*   Tablespace temporal por defecto: TEMP
*   Cuenta bloqueada

```sql
CREATE USER USRPRUEBA
IDENTIFIED BY lacq
DEFAULT TABLESPACE TBSPRUEBA1
QUOTA 20M ON TBSPRUEBA1
TEMPORARY TABLESPACE TEMP
ACCOUNT LOCK;
```

*   Desbloqueamos el usuario:

```sql
ALTER USER USRPRUEBA ACCOUNT UNLOCK;
```

Para verificar la creacion de usuarios usamos la vista DBA_USERS del diccionario de datos, tambien nos conectamos al usuario:

```sql
DESCRIBE DBA_USERS;
---------------------
SELECT * FROM DBA_USERS;
```

### [](#header-3)Ejercicio

Creamos el usuario `iniciales_user`, con los siguientes parametros:

*   Contraseña: (sus iniciales) 
*   Tablespace por defecto: TBSPRUEBA3
*   Cuota de espacio de: 50M
*   Tablespace temporal por defecto: TEMP
*   Cuenta desbloqueada