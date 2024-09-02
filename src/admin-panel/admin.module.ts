import { PrismaService } from 'src/prisma.service';

export const AdminModule = (async () => {
  const { AdminModule } = await import('@adminjs/nestjs');
  const { Database, Resource, getModelByName } = await import(
    '@adminjs/prisma'
  );
  const AdminJS = (await import('adminjs')).default;
  AdminJS.registerAdapter({ Database, Resource });
  const { ComponentLoader } = await import('adminjs');

  const loader = new ComponentLoader();
  const prismaService = new PrismaService();
  const Components = {
    Dashboard: loader.add('Dashboard', './components/dashboard.tsx'),
  };

  return AdminModule.createAdminAsync({
    useFactory: () => ({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          {
            resource: {
              model: getModelByName('User'),
              client: prismaService,
            },
            options: {
              properties: {
                password: {
                  isVisible: {
                    list: false,
                    show: false,
                    edit: false,
                    filter: false,
                  },
                },
                posts: {
                  components: {
                    show: loader.add(
                      'UserPostsList',
                      './components/UserPostsList.tsx',
                    ),
                  },
                },
              },
              actions: {
                new: {
                  isVisible: false,
                },
              },
            },
          },
          {
            resource: {
              model: getModelByName('Post'),
              client: prismaService,
            },
            options: {
              properties: {
                password: {
                  isVisible: {
                    list: false,
                    show: false,
                    edit: false,
                    filter: false,
                  },
                },
              },
              actions: {
                new: {
                  isVisible: false,
                },
              },
            },
          },
        ],
        branding: {
          companyName: 'My Company',
          softwareBrothers: false,
        },
        componentLoader: loader,
        dashboard: {
          component: Components.Dashboard,
        },
      },
    }),
  });
})();
