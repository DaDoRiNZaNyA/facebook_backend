"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const prisma_service_1 = require("../prisma.service");
exports.AdminModule = (() => __awaiter(void 0, void 0, void 0, function* () {
    const { AdminModule } = yield import('@adminjs/nestjs');
    const { Database, Resource, getModelByName } = yield import('@adminjs/prisma');
    const AdminJS = (yield import('adminjs')).default;
    AdminJS.registerAdapter({ Database, Resource });
    const { ComponentLoader } = yield import('adminjs');
    const loader = new ComponentLoader();
    const prismaService = new prisma_service_1.PrismaService();
    const Components = {
        Dashboard: loader.add('Dashboard', './components/dashboard'),
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
                                        show: loader.add('UserPostsList', './components/UserPostsList'),
                                    },
                                    position: 110,
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
                    {
                        resource: {
                            model: getModelByName('Comment'),
                            client: prismaService,
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
}))();
//# sourceMappingURL=admin.module.js.map