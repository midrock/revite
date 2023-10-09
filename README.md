# Revite

The Revite is the easy way to implement the application bootstrap through configurations. Approach borrowed
from [Laravel Framework](https://laravel.com/docs/master/providers).

[![npm latest version](https://img.shields.io/npm/v/revite)](https://www.npmjs.com/package/revite)

# Contents

- [Installation](#installation)
- [Getting started](#getting-started)
- [Purpose of Revite development](#purpose-of-revite-development)
- [Basic Concepts](#basic-concepts)
  - [Contracts](#contracts)
  - [Configurations](#configurations)
  - [Service Providers](#service-providers)
  - [Services](#services)
  - [Events and Listeners](#events-and-listeners)
  - [Packages](#packages)
  - [Extensions](#extensions)
  - [Boot scenarios](#boot-scenarios)
- [Built-in contracts](#built-in-contracts)
- [Dependencies](#dependencies)

# Installation

```shell
yarn add revite
```

tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["revite"]
  }
}
```

# Getting Started

1. [Create services](#services) and [providers](#service-providers).
2. Add these providers to the [configuration](#configurations).
3. Load configuration via Revite

```ts
import { revite } from "revite";
import config from "@revite/config";

revite.bootstrap(config);
```

See [Demo Application](./demo)

# Purpose of Revite development

- Divide application to the separate isolated abstractions.
- Remove direct dependencies on external packages and environment variables to simplify further support, refactoring,
  and upgrade.
- Give the developer a tool to configure application parts.
- Simplify understanding of file locations in a project.
- Allow different versions of the application to run on the same codebase.
- Simplify testing of application parts through mocked services.

# Basic Concepts

## Contracts

Contracts are the only one way to get the service instance. Abstract classes are used as contracts.

```ts
export abstract class NotesServiceContract {
  notes: Service.Notes.Note[] = [];

  abstract get isEmpty(): boolean;

  abstract createNote(note: Service.Notes.Note): Promise<void>;

  abstract deleteNote(noteId: string): Promise<void>;
}
```

```ts
import { revite } from "revite";
import { NotesServiceContract } from "/~/services/notes";

async function getNotes() {
  const notesService = await revite.resolve(NotesServiceContract);

  return notesService.notes;
}
```

## Configurations

- Each service can contain its configuration in a separate config file or `config` section in `main.ts`.
- Configuration is a set of files:

```
config
- production
-- main.ts
-- auth.ts
- test
-- main.ts
-- auth.ts
```

- `main.ts` is a required file for the Revite bootstrap and should look like this:

```ts
// "~/services/reactivity/versions/vue";
import { ReactivityServiceContract } from "revite";
import { reactive, shallowReactive } from "vue";

export class VueReactivityService extends ReactivityServiceContract {
  makeReactive(target: any) {
    return shallowReactive(target);
  }

  makeDeepReactive(target: any) {
    return reactive(target);
  }
}
```

```ts
import { defineConfig } from "revite";
import { VueReactivityService } from "~/services/reactivity/versions/vue";

export default defineConfig({
  logger: {
    level: "debug",
  },
  reactivity: {
    service: VueReactivityService,
  },
  packages: [import("/~/packages/ViewsPackage")],
  providers: [
    import("/~/providers/EventServiceProvider"),
    import("/~/services/render/RenderServiceProvider"),
    import("/~/services/router/RouterServiceProvider"),
    import("/~/services/auth/AuthServiceProvider"),
  ],
  config: {
    router: {
      service: () => import("/~/services/router/versions/VueRouterService"),
    } as Service.Router.Config,
  },
});
```

config/prod/manifest.ts

```ts
export const config: Service.Manifest.Config = {
  service: () => import("/~/services/manifest/versions/ManifestServiceV1"),
  env: import.meta.env.VITE_ENV,
  keys: {
    recaptcha: "000",
  },
};
```

There are two ways to load the configuration into Revite.

- Directly Load directory in source code.

```ts
import { revite } from "revite";

revite.bootstrap(import.meta.globEager("./config/default/*.ts"));
```

- Apply Vite plugin

vite.config.ts

```ts
import { defineConfig } from "vite";
import revite from "revite/plugin";

export default defineConfig({
  plugins: [
    revite({
      root: "/src/config",
      use: process.env.TARGET_CONFIG as string,
    }),
  ],
});
```

main.ts

```ts
import { revite } from "revite";
import config from "@revite/config";

revite.bootstrap(config);
```

Then start the application with:

```shell
env TARGET_CONFIG=prod yarn dev
```

`config/prod` directory will be loaded

## Service Providers

- Service providers are designed to link contracts to the services.
- Also, they can be used to bootstrap any code that you need.

```ts
import {
  BootContext,
  BeforeBootContext,
  RegisterContext,
  ServiceProvider,
} from "revite";
import { AuthServiceContract } from "/~/services/auth";
import { UiServiceContract } from "/~/services/ui";

export class AuthServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config: Service.Auth.Config = ctx.config("auth");

    ctx.bind(AuthServiceContract).to({
      service: config.service,
      reactive: true,
      singleton: true,
    });
  }

  async beforeBoot(ctx: BeforeBootContext) {
    const uiService = await ctx.resolve(UiServiceContract);

    await uiService.setFetchStatus();
  }

  async boot(ctx: BootContext) {
    const authService = await ctx.resolve(AuthServiceContract);

    return authService.fetchUser();
  }
}
```

`ServiceProvider.register`

Synchronous method to register services, bind events, and configuration to them.

```ts
export interface ResolveOptions {
  loaded?: boolean;
}

interface RegisterContext {
  resolve<T extends AbstractConstructor>(
    contract: T,
    options?: ResolveOptions
  ): Promise<InstanceType<T>>;

  resolveIfExist<T extends AbstractConstructor>(
    contract: T,
    options?: ResolveOptions
  ): Promise<InstanceType<T> | undefined>;

  on(
    event: EventConstructor,
    listen: ListenerConstructor | ListenerConstructor[]
  ): void;

  config<T>(name: string): T;

  bind<T extends AbstractConstructor>(contract: T): BindContext<T>;
}
```

`ctx.bind` usage

```ts
// The service itself is a contract
ctx.bind(HomeState).to({
  reactive: true,
  singleton: true,
  // The factory is used when service contain links to other
  async factory({Service}) {
    const dashboardService = await ctx.resolve(DashboardService)

    return () => new Service({
      dashboardService,
    })
  },
})

ctx.bind(AuthServiceContract).to({
  service: () => import('/~/services/auth/versions/AuthServiceV1')
  reactive: true,
})
```

`ServiceProvider.beforeBoot`

Asynchronous method to inject any code to other services before providers start booting. For example, we want to inject
routes to RouterService before it starts routing.

```ts
interface BeforeBootContext {
  resolve<T extends AbstractConstructor>(
    contract: T,
    options?: ResolveOptions
  ): Promise<InstanceType<T>>;

  resolveIfExist<T extends AbstractConstructor>(
    contract: T,
    options?: ResolveOptions
  ): Promise<InstanceType<T> | undefined>;

  config<T>(name: string): T;
}
```

`ServiceProvider.boot`

Asynchronous method to call any code after all providers will be registered and preloaded.

```ts
interface BootContext {
  resolve<T extends AbstractConstructor>(
    contract: T,
    options?: ResolveOptions
  ): Promise<InstanceType<T>>;

  resolveIfExist<T extends AbstractConstructor>(
    contract: T,
    options?: ResolveOptions
  ): Promise<InstanceType<T> | undefined>;
}
```

## Services

- Services should be extended from contracts.
- There are situations when the service itself does not contain any connections and can act as a contract.

```ts
import {NotesServiceContract} from '../'

export class MockNotesService extends NotesServiceContract {
...
}
```

## Events and Listeners

```ts
import { Event } from "revite";

export class NoteCreatedEvent extends Event {
  constructor(public note: Service.Notes.Note) {
    super();
  }
}
```

```ts
import { Listener, revite } from "revite";
import { NoteCreatedEvent } from "/~/events/NoteCreatedEvent";
import { NotifyServiceContract } from "/~/services/notify";

export class NoteCreatedNotify extends Listener {
  async handle(event: NoteCreatedEvent) {
    const notifyService = await revite.resolve(NotifyServiceContract);

    notifyService.show({
      title: "Note created",
      type: "success",
      text: "ID " + event.note.id,
    });
  }
}

export class NoteCreatedNotifyWithError extends Listener {
  async handle(event: NoteCreatedEvent) {
    const notifyService = await revite.resolve(NotifyServiceContract);

    notifyService.show({
      title: "Note created",
      type: "success",
      text: "ID " + event.note.id,
    });
  }

  handleError(event: NoteCreatedEvent, error: unknown) {
    // handle error
  }
}
```

```ts
import { RegisterContext, ServiceProvider } from "revite";
import { NoteCreatedEvent } from "/~/events/NoteCreatedEvent";
import { NoteCreatedNotify } from "/~/listeners/NoteCreatedNotify";

export class EventServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.on(NoteCreatedEvent, [
      NoteCreatedNotify,
      (event: NoteCreatedEvent) => {
        // use event
      },
      () => import("/~/events/NoteCreatedEvent"),
    ]);

    /**
     * Sequential execution of listeners.
     * If some of listeners will throw an error the next execution will be stopped
     */
    ctx.on(NoteCreatedEvent, [NoteCreatedNotify], {
      sequential: true,
      onError(event: NoteCreatedEvent, error) {
        // use error
        // use event
      },
    });

    /**
     * Listeners will be executed one time in 500 ms
     */
    ctx.on(NoteCreatedEvent, [NoteCreatedNotify], {
      wait: 500,
    });
  }
}
```

# Packages

```ts
import { Package } from "revite";

export class ViewsPackage extends Package {
  providers = [
    import("/~/views/home/VueHomeViewProvider"),
    import("/~/views/terms/vue/TermsViewProvider"),
    import("/~/views/notes/VueNotesViewProvider"),
    import("/~/views/report/VueReportViewProvider"),
  ];
}
```

# Extensions

Extensions will be loaded only when service requested.

```ts
import { defineConfig } from "revite";

export default defineConfig({
  config: {
    dashboard: {
      extend: [() => import("/~/providers/ImageWidgetProvider")],
    } as Service.Dashboard.Config,
  },
});
```

The `extend` method called with resolved service as argument.

```ts
import { Extension, revite } from "revite";
import { DashboardService } from "/~/services/dashboard";
import { NotesView } from "/~/views/notes/NotesView";

export class ImageWidgetProvider extends Extension {
  async extend(service: DashboardService) {
    const notesView = await revite.resolve(NotesView);

    service.registerLink({
      route: notesView.getRootRoute(),
      title: "Extended image",
      description:
        "Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.",
      icon: {
        name: "pencil",
        class: "text-green-500 bg-green-50",
      },
      order: 100,
    });
  }
}
```

# Boot scenarios

```ts
import { defineConfig } from "revite";

export default defineConfig({
  preload: [
    import("/~/services/auth/AuthServiceProvider"),
    /**
     * this provider will load next scenario
     */
    import("/~/providers/BootstrapProvider"),
  ],
  providers: [
    import("/~/services/ui/UiServiceProvider"),
    import("/~/services/notify/NotifyServiceProvider"),
  ],
  next: {
    authorized: () => ({
      preload: [
        import("/~/services/router/RouterServiceProvider"),
        import("/~/services/render/RenderServiceProvider"),
      ],
      packages: [import("/~/packages/ViewsPackage")],
      providers: [
        import("/~/services/dashboard/DashboardServiceProvider"),
        import("/~/providers/EventServiceProvider"),
        import("/~/services/notes/NotesServiceProvider"),
      ],
    }),
    unauthorized: () => ({
      preload: [
        import("/~/services/router/RouterServiceProvider"),
        import("/~/services/render/RenderServiceProvider"),
      ],
      providers: [
        import("/~/services/dashboard/DashboardServiceProvider"),
        import("/~/views/home/VueHomeViewProvider"),
        import("/~/views/report/VueReportViewProvider"),
      ],
    }),
  },
  config: {
    router: {
      service: () => import("/~/services/router/versions/VueRouterService"),
    } as Service.Router.Config,
    render: {
      service: () => import("/~/services/render/versions/vue/VueRenderService"),
    } as Service.Render.Config,
    notes: {
      service: () => import("/~/services/notes/versions/MockNotesService"),
    } as Service.Notes.Config,
    auth: {
      service: () => import("/~/services/auth/versions/MockLoggedAuthService"),
    } as Service.Auth.Config,
  },
});
```

```ts
import { revite, ServiceProvider } from "revite";
import { AuthServiceContract } from "/~/services/auth";

export class BootstrapProvider extends ServiceProvider {
  async boot(ctx) {
    const authService = await ctx.resolve(AuthServiceContract);

    if (authService.isLoggedIn) {
      return revite.next("authorized");
    }

    return revite.next("unauthorized");
  }
}
```

# Built-in contracts

These contracts are parts of Revite and can be configured in the main section.

## LoggerServiceContract

- Default service uses console.log.
- The logger level can be configured.
- See [LoggerServiceContract](./src/contracts/LoggerServiceContract.ts)

```ts
import { defineConfig } from "revite";
import { CustomLoggerService } from "/~/services/logger";

export default defineConfig({
  logger: {
    service: CustomLoggerService,
    level: "debug", // 'info' | 'warn' | 'error'
  },
});
```

## ReactivityServiceContract

- Optional service.
- See [ReactivityServiceContract](./src/contracts/ReactivityServiceContract.ts)

```ts
import { defineConfig } from "revite";
import { VueReactivityService } from "revite/services/VueReactivityService";

export default defineConfig({
  reactivity: {
    service: VueReactivityService,
  },
});
```
