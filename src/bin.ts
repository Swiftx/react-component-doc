import { argv,cwd } from 'process';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import * as program from 'commander';

// 读取NPM配置
const packageConfig = JSON.parse(
    readFileSync(
        resolve(__dirname, '../package.json')
    ).toString()
);

// 设置编译参数
program.version(packageConfig.version);
program.option('-c, --config <file>', '组件配置文件', './component.json');

// 加载命令任务
const tasks = readdirSync(__dirname+'/tasks');
for(let file of tasks)
    if(/(.js)$/.test(file)) require('./tasks/'+file);

// 解析参数执行
program.parse(argv);