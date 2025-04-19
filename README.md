# NightmareBox 🎬👻

**NightmareBox** es una aplicación web de gestión de una filmoteca dedicada a películas del género de terror. Permite a los usuarios explorar directores y películas, agregar valoraciones y obtener información detallada sobre cada película. He desarrollado este proyecto tanto con el IDE **IntelliJ** como con el **VSCode**.

## Tecnologías utilizadas 🛠️

- **Backend:** Spring Boot (Java)
- **Frontend:** Angular
- **Base de Datos:** MySQL
- **API Restful:** Spring Web
- **Persistencia:** Spring Data JPA
- **Seguridad:** Spring Security + JWT (JSON WEB TOKEN) 

## Requisitos previos ⚙️

Para ejecutar este proyecto en tu máquina local, necesitas tener las siguientes herramientas instaladas:

- **JDK 17 o superior** (para ejecutar Spring Boot)
- **Node.js y npm** (para Angular)
- **MySQL** (para la base de datos)
- **Spring Boot** (backend)
- **IDE como IntelliJ o VSCode**
  
## Despliegue del proyecto 🚀
```bash
En la ubicacion /src/main/frontend -> **npm run start**
```
```bash
Iniciar spring boot en la propia IDE o navegar a la ubicacion /src/main/java -> **./mvnw spring-boot:run**
```

## Funcionalidades 🔐
**Registro e inicio de sesión con JWT**
- Autenticación segura mediante tokens JWT. El usuario inicia sesión y obtiene un token que le permite hacer funciones relacionadas con la valoracion o sus lista de favoritas.

**Gestión de películas de terror**
- CRUD completo de películas.

**Gestión de directores**
- CRUD para administrar los directores de las películas. Cada película está asociada a un único director.

**Gestión de valoraciones**
- Los usuarios pueden valorar las películas con una nota. Se registra qué usuarios han valorado qué películas.

**Favorito**
- Cada usuario puede tener una lista de películas favoritas. Relación ManyToMany entre usuario y películas.

**Roles de usuario (USER, ADMIN)**
- Diferentes funcionalidades y accesos para administradores y usuarios comunes. Los admins pueden añadir/modificar/eliminar películas y directores. Los usuarios pueden ver películas, marcar sus favoritas si quieren teneras guardas en una lista y valorar todas las películas que hayan visto.

**Diferentes filtros en películas, como el de país con una API externa de banderas**
- Se integra una API externa para mostrar banderas y asociarlas a los países de origen de las películas. El administrador puede seleccionar países al crear películas, y los usuarios pueden filtrar películas por país. Como ves el readme
