import * as program from "commander";
import * as Koa from 'koa';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { open } from "../utils/browser";
import * as webpack from 'webpack';
import MemoryFS = require("memory-fs");
import * as config from '../compiler';
import { error,warn, success } from 'Console';
import { resolve } from "path";
import { cwd } from "process";
import {readFileSync} from "fs";


const runCompiler = (compiler) => new Promise(function(resolve, reject){
    compiler.run((err, stats) => {
        if (stats.hasWarnings()) reject(stats);
        if (err || stats.hasErrors) reject(stats);
        else resolve(compiler.outputFileSystem);
    });
});

program.command('debug <file>').description('执行文档构建').action(function (file:string) {
    const app = new Koa();
    const port : number = 3000;

    const compiler = webpack(<any>{
        ... config,
        mode : "development",
        entry : resolve(cwd(), file),
        output :{
            path: '/',
            filename: 'bundle.js'
        }
    });

    compiler.apply(new HtmlWebpackPlugin({
        filename : 'index.html',
        favicon  : resolve(__dirname, '../../assets/favicon.ico'),
        template : resolve(__dirname, '../../assets/index.ejs'),
        title    : '组件调试器'
    }));

    let browser = false;
    const mfs = new MemoryFS();
    compiler.outputFileSystem = mfs;
    mfs.mkdirSync('/styles');
    mfs.writeFileSync('/styles/antd.min.css',readFileSync(
        resolve(__dirname,'../../node_modules/antd/dist/antd.min.css')
    ));

    compiler.watch({
        aggregateTimeout: 300
    }, (err, stats) => {
        const info = stats.toJson();
        if (err || stats.hasErrors()) {
            for(let message of info.errors)
                error(message);
            return;
        }
        if (stats.hasWarnings())
            warn(info.warnings);
        success("webpack compiler success");
        if(!browser){
            browser = true;
            open(`http://localhost:${port}`);
        }
    });

    app.use(async (ctx) => {
        if(ctx.request.path === '/')
            ctx.request.path += 'index.html';
        if(mfs.existsSync(ctx.request.path)) {
            ctx.body = mfs.readFileSync(ctx.request.path).toString();
        } else {
            ctx.body = "404 File No Found!";
        }
    });

    app.listen(port, 'localhost', () => {
        console.log(`HMR Listening at http://localhost:${port}`);
    });

});