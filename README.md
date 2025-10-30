# Streamy Player

Este proyecto es un agregador de películas y contenido de video legal y gratuito disponible en internet, construido sobre un monorepo de **Nx** con **Angular** y **Express**.

## Arquitectura

La arquitectura está diseñada para ser escalable y mantenible, separando responsabilidades:

- **Nginx**: Actúa como proxy reverso, siendo el único punto de entrada.
- **Angular**: Es la Single-Page Application (SPA) que consume los datos.
- **Express**: Servirá como la API/Gateway para la lógica de negocio.

Para una explicación detallada de la arquitectura y la configuración, consulta el archivo INSTRUCTIONS.md.

## 🚀 Iniciar el Entorno de Desarrollo

Para levantar el entorno completo, necesitarás 3 terminales:

1.  **Terminal 1: Iniciar el Proxy Reverso (Nginx)**
    ```sh
    nginx -p . -c nginx.dev.conf
    ```
2.  **Terminal 2: Iniciar la API (Express)**
    ```sh
    nx serve api
    ```
3.  **Terminal 3: Iniciar el Frontend (Angular)**
    ```sh
    nx serve streamy-player
    ```

Una vez que todo esté en ejecución, abre tu navegador en **`http://localhost:8080`**.

## Comandos Útiles de Nx

```sh
# Generar una nueva librería
nx g @nx/angular:lib my-lib

# Ver el grafo de dependencias del proyecto
nx graph
```

To create a production bundle:

```sh
npx nx build streamy-player
```

To see all available targets to run for a project, run:

```sh
npx nx show project streamy-player
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
