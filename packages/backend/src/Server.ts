import {PlatformApplication, Configuration, Inject} from "@tsed/common";
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import "@tsed/typeorm";
import "@tsed/ajv";
import "@tsed/passport"
import * as bodyParser from "body-parser";
import * as path from "path"
import cors = require('cors');
import cookieParser = require('cookie-parser');
import compress = require('compression');
import methodOverride = require('method-override');
import bearerToken = require('express-bearer-token');
import TypeormConfig from './typeormConfig';
import {connect, runMigration, showMigration} from "./dbConnection";
import {AjvErrorObject} from "@tsed/ajv/lib/interfaces/IAjvSettings";

const rootDir = path.resolve(__dirname);
const clientDir = path.join(rootDir, "../../frontend/dist");

let passport = require('passport');
let typeormConfig = new TypeormConfig()

@Configuration({
    rootDir: rootDir,
    acceptMimes: ["application/json", "text/html"],
    httpPort: process.env.PORT || "127.0.0.1:8083",
    httpsPort: false, // CHANGE
    typeorm: [typeormConfig.postgres],
    mount: {
        "/": [
            `${rootDir}/controllers/**/*.ts`
        ]
    },
    exclude: [
        "**/*.spec.ts"
    ],
    statics: {
        "/": clientDir
    },
    componentsScan: [
        `${rootDir}/passport/*{.ts,.js}`,
        `${rootDir}/middlewares/*{.ts,.js}`
    ],
    swagger: [
        {
            path: "/api-docs",
            spec: {
                securityDefinitions: {
                    "auth: basic": {
                        type: "basic"
                    }
                }
            }
        }
    ],
    ajv: {
        errorFormatter: ((error: AjvErrorObject) => `At ${error.modelName}${error.dataPath}, value '${error.data}' ${error.message}`),
        verbose: true
    },
    passport: {}
})
export class Server {
    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    $beforeInit() {
        connect().then(() => {
            if (showMigration()) {
                runMigration();
            }
            console.log('Create connection');
        }).catch((err) => {
            console.log('Error while connecting to the database', err);
        });
    }

    $beforeRoutesInit() {
        this.app
            .use(cors())
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: false
            }))
            .use(passport.initialize())
            .use(passport.session())
            .use(bearerToken())

        return null;
    }

    getSettingsTypeorm() {
        return this.settings.typeorm[0]
    }
}
