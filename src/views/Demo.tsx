import * as React from 'react';
import { CSSProperties } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const boxStyle : CSSProperties = {
    border : "1px solid #ebedf0"
};

const showBoxStyle : CSSProperties = {
    padding : "42px 24px 50px"
};

const titleBoxStyle : CSSProperties = {
    position: "relative",
    top: "12px",
    marginLeft: "24px",
    background: "#fff",
    display: "inline-block",
    padding: "0 8px"
};

const descriptionStyle : CSSProperties = {
    borderTop : "1px solid #ebedf0",
    padding : "36px 32px 18px"
};

const codeStyle : CSSProperties = {
    borderTop : "1px solid #ebedf0",
    padding : "18px 32px",
    background: "rgb(248, 248, 255)"
};

export interface DemoProps {
    title : string;
    description : string;
    code? : string;
    style? : CSSProperties;
}


export class Demo extends React.Component<DemoProps,any>{

    /**
     * 初始化组件
     * @param props
     */
    public constructor(props){
        super(props);
        this.state = {code:false};
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * 展开关闭
     */
    public handleChange() {
        this.setState({
            code : !this.state.code
        });
    }

    public render() {
        const coderView = this.state.code ? <div style={codeStyle}>
            <SyntaxHighlighter language='javascript' style={docco}>
                {this.props.code}
            </SyntaxHighlighter>
        </div>:null;
        const coderStateText = this.state.code ? "查看代码":"隐藏代码";
        const style = Object.assign({}, boxStyle,this.props.style);
        return (
            <div style={style}>
                <div style={showBoxStyle}>{this.props.children}</div>
                <div style={titleBoxStyle}>
                    {this.props.title}
                    <a onClick={this.handleChange}>&lt;{coderStateText}&gt;</a>
                </div>
                <div style={descriptionStyle} dangerouslySetInnerHTML={{__html: this.props.description}}/>
                {coderView}
            </div>
        );
    }

}