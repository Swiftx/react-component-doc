import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Demo } from "./Demo";
require('antd/dist/antd.css');

export class Debug {

    /**
     * 组件标题
     */
    public title : string;

    /**
     * 组件Demo
     */
    public demo : React.ReactElement<any>;

    /**
     * 描述内容
     */
    public description : string;

    /**
     * 代码范例
     */
    public code : string;

    /**
     * 导出组件
     * @returns {any}
     */
    public export() {
        return <Demo
            title={this.title}
            description={this.description}
            code={this.code}>
            {this.demo}
        </Demo>;
    }

    /**
     * 运行页面
     */
    public run(){
        const pageStyle : React.CSSProperties = {
            padding:"32px"
        };
        ReactDOM.render(
            <div style={pageStyle}>{this.export()}</div>,
            document.getElementById('mountNode')
        );
    }

}